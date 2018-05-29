import GLExtensionsManager from '../low_level/core/GLExtensionsManager';
import GLBoostObject from '../low_level/core/GLBoostObject';
import Matrix44 from '../low_level/math/Matrix44';
import Vector3 from '../low_level/math/Vector3';

/**
 * en: This class take a role as operator of rendering process. In order to render images to canvas, this Renderer class gathers other elements' data, decides a plan of drawing process, and then just execute it.<br>
 * ja: このクラスはレンダリングプロセスの制御を司ります。Canvasにイメージをレンダリングするために、このRendererクラスは他の要素のデータを集め、描画プロセスの計画を決定し、実行します。
 */
export default class Renderer extends GLBoostObject {
  constructor(glBoostContext, parameters) {
    super(glBoostContext);
    var _clearColor = parameters.clearColor;

    var gl = this._glContext.gl;

    this._glBoostContext.reflectGlobalGLState();

    if (_clearColor) {
      gl.clearColor( _clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha );
    }

    this.__animationFrameId = -1;
    this.__isWebVRMode = false;
    this.__webvrFrameData = null;
    this.__webvrDisplay = null;
    this.__switchAnimationFrameFunctions(window);
    this.__defaultUserSittingPositionInVR = new Vector3(0.0, 1.1, 1.5);
    this.__requestedToEnterWebVR = false;
    this.__isReadyForWebVR = false;
  }

  __switchAnimationFrameFunctions(object) {
    this.__requestAnimationFrame = object !== void 0 ? object.requestAnimationFrame.bind(object) : null;
    this.__cancelAnimationFrame = object !== void 0 ? object.cancelAnimationFrame.bind(object) : null;
  }

  /**
   * en: update things of elements of the expression.<br>
   * @param {Expression} expression a instance of Expression class
   */
  update(expression) {
    
    let skeletalMeshes = [];
    // gather scenes as unique
    for (let renderPass of expression.renderPasses) {
      skeletalMeshes = skeletalMeshes.concat(renderPass._skeletalMeshes);
      renderPass.scene.updateAmountOfAmbientLightsIntensity();
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
   * en: draw elements of the expression.<br>
   * ja: sceneが持つオブジェクトを描画します
   * @param {Expression} expression a instance of Expression class
   */
  draw(expression) {
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

      if (this.isWebVRMode) {
        this.__webvrDisplay.getFrameData(this.__webvrFrameData);
        if (this.__webvrDisplay.stageParameters) {
          this.__webvrFrameData.sittingToStandingTransform = this.__webvrDisplay.stageParameters.sittingToStandingTransform;
        } else {
          this.__webvrFrameData.sittingToStandingTransform = Matrix44.translate(this.__defaultUserSittingPositionInVR).flatten();
        }
      }


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
//      console.log("START!!");
      transparentMeshes.forEach((mesh)=> {
        //console.log(mesh.userFlavorName);
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
//      console.log("END!!");
      
      const globalStatesUsageBackup = this._glBoostContext.globalStatesUsage;
      this._glBoostContext.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_EXCLUSIVE;
      this._glBoostContext.currentGlobalStates = [
        3042, // gl.BLEND
      ];
      let gizmos = renderPass.gizmos;
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
            webvrFrameData: this.__webvrFrameData
          });
        }
      }
      this._glBoostContext.globalStatesUsage = globalStatesUsageBackup;
      this._glBoostContext.restoreGlobalStatesToDefault();

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
//      glem.drawBuffers(gl, [gl.BACK]);

      if (typeof effekseer !== "undefined") {
        effekseer.setProjectionMatrix(camera.projectionRHMatrix().m);
        effekseer.setCameraMatrix(camera.inverseWorldMatrix.m);
        effekseer.draw();
      }

      renderPass.postRender(camera ? true:false, lights);

    });
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
   * en: clear color/depth/stencil of canvas.<br>
   * ja: canvasのカラー、デプス、ステンシルのいずれか又は全てをクリアします。
   * @param {boolean} color_flg true: clear color, false: don't clear color
   * @param {boolean} depth_flg true: clear depth, false: don't clear depth
   * @param {boolean} stencil_flg  true: clear stencil, false: don't clear stencil
   */
  clearCanvas( color_flg, depth_flg, stencil_flg ) {

    var gl = this._glContext.gl;

    var bufferBits = 0;

    if ( color_flg === void 0 || color_flg ) bufferBits |= gl.COLOR_BUFFER_BIT;
    if ( depth_flg === void 0 || depth_flg ) bufferBits |= gl.DEPTH_BUFFER_BIT;
    if ( stencil_flg === void 0 || stencil_flg ) bufferBits |= gl.STENCIL_BUFFER_BIT;

    gl.clear( bufferBits );

  }

  /**
   * en: Get WebGL context.<br>
   * ja: WebGLコンテキストを取得します。
   * @returns {webglcontext} a context of WebGL
   */
  get glContext() {
    return this._glContext.gl;
  }


  /**
   * en: resize canvas and viewport.<br>
   * ja: canvasとビューポートをリサイズします。
   * @param {number} width en: width to resize, ja: リサイズする幅
   * @param {number} height en: height to resize, ja:リサイズする高さ
   */
  resize(width, height) {
    this._glContext.canvasWidth = width;
    this._glContext.canvasHeight = height;
  }

  /**
   * This method treats the given callback function as a render loop and call it every frame.
   */
  doRenderLoop(renderLoopFunc, ...args) {

    renderLoopFunc.apply(renderLoopFunc, args);

    this.__animationFrameId = this.__requestAnimationFrame(()=>{
      this.doRenderLoop(renderLoopFunc, ...args);
      if (this.__requestedToEnterWebVR) {
        this.__isWebVRMode = true;
      }
    });
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

    if (this.isWebVRMode) {
      this.__webvrDisplay.submitFrame();
    }

    this.__animationFrameId = this.__requestAnimationFrame(()=>{
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
  async enterWebVR(initialUserSittingPositionIfStageParametersDoNotExist) {
    if (initialUserSittingPositionIfStageParametersDoNotExist) {
      this.__defaultUserSittingPositionInVR = initialUserSittingPositionIfStageParametersDoNotExist;
    }
    return new Promise((resolve, reject)=> {
      this.__webvrDisplay.requestPresent([{source: this._glContext.canvas}]).then(() => {
        this.__switchAnimationFrameFunctions(this.__webvrDisplay);
        const leftEye = this.__webvrDisplay.getEyeParameters("left");
        const rightEye = this.__webvrDisplay.getEyeParameters("right");
        this.resize(Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2, Math.max(leftEye.renderHeight, rightEye.renderHeight));
        this.__requestedToEnterWebVR = true;
        resolve();
      }).catch(() => {
        console.error('Failed to requestPresent. Please check your VR Setting, or something wrong with your VR system?');
        reject();
      });
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

  async disableWebVR() {
    await this.__webvrDisplay.exitPresent();
    this.__switchAnimationFrameFunctions(window);
    this.__webvrDisplay = null;
    this.__isWebVRMode = false;
    this.__requestedToEnterWebVR = false;
    this.__isReadyForWebVR = false;
  }

  get isWebVRMode() {
    return this.__isWebVRMode;
  }

  get isReadyForWebVR() {
    return this.__isReadyForWebVR;
  }

  webVrSubmitFrame() {
    this.__webvrDisplay.submitFrame();
  }
}
