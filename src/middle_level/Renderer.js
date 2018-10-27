// @flow

import GLExtensionsManager from '../low_level/core/GLExtensionsManager';
import GLBoostObject from '../low_level/core/GLBoostObject';
import Matrix44 from '../low_level/math/Matrix44';
import Vector3 from '../low_level/math/Vector3';
import EffekseerElement from './plugins/EffekseerElement';

/**
 * This class take a role as operator of rendering process. In order to render images to canvas, this Renderer class gathers other elements' data, decides a plan of drawing process, and then just execute it.
 */
export default class Renderer extends GLBoostObject {
  constructor(glBoostContext, parameters) {
    super(glBoostContext);
    var _clearColor = parameters.clearColor;

    this._glBoostSystem._glBoostContext.reflectGlobalGLState();
    const glContext = this._glContext;
    const gl = glContext.gl;

    if (_clearColor) {
      gl.clearColor( _clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha );
    }

    this.__animationFrameId = -1;
    this.__isWebVRMode = false;
    this.__webvrFrameData = null;
    this.__webvrDisplay = null;
    this.__canvasWidthBackup = null;
    this.__canvasHeightBackup = null;
    this.__defaultUserSittingPositionInVR = new Vector3(0.0, 1.1, 1.5);
    this.__requestedToEnterWebVR = false;
    this.__isReadyForWebVR = false;
    this.__animationFrameObject = window;
  }


  /**
   * update things of elements of the expression.
   * @param expression a instance of Expression class
   */
  update(expression: Expression) {
    
    let skeletalMeshes = [];
    let effekseerElements = [];
    // gather scenes as unique
    for (let renderPass of expression.renderPasses) {
      skeletalMeshes = skeletalMeshes.concat(renderPass._skeletalMeshes);
//      effekseerElements = effekseerElements.concat(renderPass._effekseerElements);
      effekseerElements = effekseerElements.concat(renderPass.scene.searchElementsByType(EffekseerElement));
      renderPass.scene.updateAmountOfAmbientLightsIntensity();
      let camera = renderPass.scene.getMainCamera();
      for (let effekseerElement of effekseerElements) {
        effekseerElement.update(camera);
      }
    }

    let unique = function(array) {
      return array.reduce(function(a, b) {
        if (a.instanceName !== b.instanceName) {
          a.push(b);
        }
        return a;
      }, []);
    };
    skeletalMeshes = unique(skeletalMeshes);
    
    for (let mesh of skeletalMeshes) {
      mesh.geometry.update(mesh);
    }

    if (typeof effekseer !== "undefined") {
      effekseer.update();
    }

  }

  /**
   * draw elements of the expression.
   * @param expression a instance of Expression class
   */
  draw(expression: Expression) {
    let renderPassTag = '';
    expression.renderPasses.forEach((renderPass, index)=>{
      if (!renderPass.isEnableToDraw || !renderPass.scene) {
        return;
      }

      if (renderPassTag !== renderPass.tag) {
        renderPass.clearAssignShaders();
      }
      renderPassTag = renderPass.tag;

      var camera = renderPass.scene.getMainCamera();

      let lights = renderPass.scene.lightsExceptAmbient;

      renderPass.preRender(camera ? true:false, lights);

      var glContext = this._glContext;
      var gl = glContext.gl;
      var glem = GLExtensionsManager.getInstance(this._glContext);


      // set render target buffers for each RenderPass.
      /*
      if (renderPass.fbo && renderPass.isRenderTargetAttachedTextures) {
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderPass.fbo);
      } else {
        glem.drawBuffers(gl, [gl.BACK]);
      }
      */
      if (renderPass.fbo && renderPass.isRenderTargetAttachedTextures) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderPass.fbo);
      }

      glem.drawBuffers(gl, renderPass.buffersToDraw);
      //glem.readBuffer(gl, renderPass.buffersToDraw);

      let viewport = null;
      if (renderPass.viewport) {
        viewport = [renderPass.viewport.x, renderPass.viewport.y, renderPass.viewport.z, renderPass.viewport.w];
      } else {
        if (this.isWebVRMode) {
          viewport = [0, 0, glContext.canvasWidth, glContext.canvasHeight];
        } else if (camera) {
          let deltaWidth = glContext.canvasHeight*camera.aspect - glContext.canvasWidth;
          viewport = [-deltaWidth/2, 0, glContext.canvasHeight*camera.aspect, glContext.canvasHeight];
        } else {
          viewport = [0, 0, glContext.canvasWidth, glContext.canvasHeight];
        }
      }
      if (!this.isWebVRMode) {
        gl.viewport.apply(gl, viewport);
      }

      this._clearBuffer(gl, renderPass);

      if (this.__animationFrameObject === this.__webvrDisplay) {
        this.__webvrDisplay.getFrameData(this.__webvrFrameData);
        if (this.__webvrDisplay.stageParameters) {
          this.__webvrFrameData.sittingToStandingTransform = this.__webvrDisplay.stageParameters.sittingToStandingTransform;
        } else {
          this.__webvrFrameData.sittingToStandingTransform = Matrix44.translate(this.__defaultUserSittingPositionInVR).flatten();
        }
      }

      // draw pre gizmos
      this._drawGizmos(renderPass.preGizmos, expression, lights, camera, renderPass, index, viewport, true);

      // draw opacity meshes.
      const opacityMeshes = renderPass.opacityMeshes;
      opacityMeshes.forEach((mesh)=> {
        if (mesh.isVisible) {
          mesh.draw({
            expression: expression,
            lights: lights,
            camera: camera,
            renderPass: renderPass,
            renderPassIndex: index,
            viewport: viewport,
            isWebVRMode: this.isWebVRMode,
            webvrFrameData: this.__webvrFrameData
          });
        }
      });

      if (camera) {
        renderPass.sortTransparentMeshes(camera);
      }
      // draw transparent meshes.
      const transparentMeshes = (renderPass.transparentMeshesAsManualOrder) ? renderPass.transparentMeshesAsManualOrder : renderPass.transparentMeshes;

      transparentMeshes.forEach((mesh)=> {
        //console.log(mesh.userFlavorName);
        if (mesh.isVisible && mesh.isTransparent) {
          mesh.draw({
            expression: expression,
            lights: lights,
            camera: camera,
            renderPass: renderPass,
            renderPassIndex: index,
            viewport: viewport,
            isWebVRMode: this.isWebVRMode,
            webvrFrameData: this.__webvrFrameData
          });
        }
      });
      
      // draw post gizmos
      this._drawGizmos(renderPass.postGizmos, expression, lights, camera, renderPass, index, viewport, false);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
//      glem.drawBuffers(gl, [gl.BACK]);

      if (typeof effekseer !== "undefined" && camera != null) {
        const projection = camera.projectionRHMatrix().m;
        const viewing = camera.lookAtRHMatrix().multiply(camera.inverseWorldMatrixWithoutMySelf).m; 
        effekseer.setProjectionMatrix(projection);
        effekseer.setCameraMatrix(viewing);
        effekseer.draw();
      }

      renderPass.postRender(camera ? true:false, lights);

    });
  }

  _drawGizmos(gizmos, expression, lights, camera, renderPass, index, viewport, isDepthTest) {
    const globalStatesUsageBackup = this._glBoostSystem._glBoostContext.globalStatesUsage;
    this._glBoostSystem._glBoostContext.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_INCLUSIVE;
    this._glBoostSystem._glBoostContext.currentGlobalStates = [
      3042, // gl.BLEND
    ];
    if (isDepthTest) {
      this._glBoostSystem._glBoostContext.currentGlobalStates.push(2929); // gl.DEPTH_TEST
    }

    for (let gizmo of gizmos) {
      if (gizmo.isVisible) {
        gizmo.mesh.draw({
          expression: expression,
          lights: lights,
          camera: camera,
          renderPass: renderPass,
          renderPassIndex: index,
          viewport: viewport,
          isWebVRMode: this.isWebVRMode,
          webvrFrameData: this.__webvrFrameData,
          forceThisMaterial: gizmo.forceThisMaterial
        });
      }
    }

    this._glBoostSystem._glBoostContext.globalStatesUsage = globalStatesUsageBackup;
    this._glBoostSystem._glBoostContext.restoreGlobalStatesToDefault();

  }

  _clearBuffer(gl, renderPass) {
    const clearColor = renderPass.clearColor;
    const clearDepth = renderPass.clearDepth;
    const colorMask = renderPass.colorMask;

    if (clearColor) {
      gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w);
    }
    if (clearDepth) {
      gl.clearDepth(clearDepth);
    }
    if (colorMask) {
      gl.colorMask.apply(null, [colorMask]);
    }

    if (renderPass.buffersToDraw[0] === gl.NONE) {
      {
        gl.clear(gl.DEPTH_BUFFER_BIT);
      }
    } else if (clearColor || clearDepth) {
      gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    } else if (clearColor) {
      gl.clear( gl.COLOR_BUFFER_BIT );
    }
  }

  /**
   * clear color/depth/stencil of canvas.
   * @param color_flg true: clear color, false: don't clear color
   * @param depth_flg true: clear depth, false: don't clear depth
   * @param stencil_flg  true: clear stencil, false: don't clear stencil
   */
  clearCanvas( color_flg: boolean, depth_flg: boolean, stencil_flg: boolean ) {
    const gl = this._glContext.gl;

    var bufferBits = 0;

    if ( color_flg === void 0 || color_flg ) bufferBits |= gl.COLOR_BUFFER_BIT;
    if ( depth_flg === void 0 || depth_flg ) bufferBits |= gl.DEPTH_BUFFER_BIT;
    if ( stencil_flg === void 0 || stencil_flg ) bufferBits |= gl.STENCIL_BUFFER_BIT;

    gl.clear( bufferBits );

  }

  /**
   * Get WebGL context.
   * @returns a context of WebGL
   */
  get glContext(): webglcontext {
    return this._glContext.gl;
  }


  /**
   * resize canvas and viewport.
   * @param width width to resize.
   * @param height height to resize.
   */
  resize(width: number, height: number) {
    this._glContext.canvasWidth = width;
    this._glContext.canvasHeight = height;
  }

  /**
   * This method treats the given callback function as a render loop and call it every frame.
   */
  doRenderLoop(renderLoopFunc, time, ...args) {
    args.splice(0, 0, time);
    renderLoopFunc.apply(renderLoopFunc, args);

    this.__animationFrameId = this.__animationFrameObject.requestAnimationFrame((_time)=>{
      this.doRenderLoop(renderLoopFunc, _time, args[1]);
      if (this.__requestedToEnterWebVR) {
        this.__isWebVRMode = true;
      }
    }, time);
  }

  doConvenientRenderLoop(expression, beforeCallback, afterCallback, ...args) {

    if (beforeCallback) {
      beforeCallback.apply(beforeCallback, args);
    }

    this.clearCanvas();
    this.update(expression);
    this.draw(expression);

    if (afterCallback) {
      afterCallback.apply(afterCallback, args);
    }

    if (this.__webvrDisplay && this.__webvrDisplay.isPresenting) {
      this.__webvrDisplay.submitFrame();
    }

    this.__animationFrameId = this.__animationFrameObject.requestAnimationFrame(()=>{
      this.doConvenientRenderLoop(expression, beforeCallback, afterCallback, ...args);
      if (this.__requestedToEnterWebVR) {
        this.__isWebVRMode = true;
      }
    });
  }

  stopRenderLoop() {
    this.__cancelAnimationFrame(this.__animationFrameId);
    this.__animationFrameId = -1;
  }



  // WebVR
  async enterWebVR(initialUserSittingPositionIfStageParametersDoNotExist, minRenderWidth = null, minRenderHeight = null) {
    if (initialUserSittingPositionIfStageParametersDoNotExist) {
      this.__defaultUserSittingPositionInVR = initialUserSittingPositionIfStageParametersDoNotExist;
    }
    this.__minRenderWidthFromUser = minRenderWidth;
    this.__minRenderHeightFromUser = minRenderHeight;

    return new Promise((resolve, reject)=> {
      if (!this.__webvrDisplay.isPresenting) {
        this.__animationFrameObject = this.__webvrDisplay;
        const leftEye = this.__webvrDisplay.getEyeParameters("left");
        const rightEye = this.__webvrDisplay.getEyeParameters("right");

        this.__canvasWidthBackup = this._glContext.canvasWidth;
        this.__canvasHeightBackup = this._glContext.canvaHeight;

        if (this.__minRenderWidthFromUser > leftEye.renderWidth && this.__minRenderHeightFromUser > rightEye.renderWidth) {
          this.resize(this.__minRenderWidthFromUser * 2, this.__minRenderHeightFromUser);
        } else {
          this.resize(Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2, Math.max(leftEye.renderHeight, rightEye.renderHeight));
        }
        this.__webvrDisplay.requestPresent([{source: this._glContext.canvas}]).then(() => {
          //this.__switchAnimationFrameFunctions(this.__webvrDisplay);
          this.__requestedToEnterWebVR = true;
          resolve();
        }).catch(() => {
          console.error('Failed to requestPresent. Please check your VR Setting, or something wrong with your VR system?');
          reject();
        });
      }
    });
  }

  async readyForWebVR(requestButtonDom) {
    if ( window.VRFrameData ) {
      this.__webvrFrameData = new window.VRFrameData();
    }

    return new Promise((resolve, reject)=> {
      if ( navigator.getVRDisplays ) {
        navigator.getVRDisplays()
          .then((vrDisplays)=>{
            if (vrDisplays.length > 0) {
              const webvrDisplay = vrDisplays[vrDisplays.length - 1];
              webvrDisplay.depthNear = 0.01;
              webvrDisplay.depthFar = 10000;

              if (webvrDisplay.capabilities.canPresent) {
                this.__webvrDisplay = webvrDisplay;

                if (requestButtonDom) {
                  requestButtonDom.style.display = 'block';
                } else {
                  const paragrach = document.createElement("p");
                  const anchor = document.createElement("a");
                  anchor.setAttribute("id", 'enter-vr');
                  const enterVr = document.createTextNode("Enter VR");

                  anchor.appendChild(enterVr);
                  paragrach.appendChild(anchor);

                  const canvas = this.glContext.canvas;
                  canvas.parent.insertBefore(paragrach, canvas);
                  window.addEventListener('click', this.enterWebVR.bind(this));
                }

                this.__isReadyForWebVR = true;
                resolve();
              } else {
                console.error("Can't requestPresent now. try again.");
                reject();
              }
            } else {
              console.error('Failed to get VR Display. Please check your VR Setting, or something wrong with your VR system?');
              reject();
            }
          })
          .catch(()=>{
            console.error('Failed to get VR Displays. Please check your VR Setting.');
            reject();
          });
      } else {
        console.error('Your browser does not support WebVR. Or it is disabled. Check again.');
        reject();
      }
    });
  }

  async exitWebVR() {
    this.__isWebVRMode = false;
    if (this.__webvrDisplay && this.__webvrDisplay.isPresenting) {
      await this.__webvrDisplay.exitPresent();
    }
    this.resize(this.__canvasWidthBackup, this.__canvasHeightBackup);
    this.__isReadyForWebVR = false;
    this.__animationFrameObject = window;
  }


  async disableWebVR() {
    this.__isWebVRMode = false;
    this.__requestedToEnterWebVR = false;
    this.__isReadyForWebVR = false;
    if (this.__webvrDisplay && this.__webvrDisplay.isPresenting) {
      await this.__webvrDisplay.exitPresent();
    }
    this.__animationFrameObject = window;
    this.__webvrDisplay = null;
  }

  get isWebVRMode() {
    return this.__isWebVRMode;
  }

  get isReadyForWebVR() {
    return this.__isReadyForWebVR;
  }

  webVrSubmitFrame() {
    if (this.__webvrDisplay && this.__webvrDisplay.isPresenting) {
      this.__webvrDisplay.submitFrame();
    }
  }
}
