import GLExtensionsManager from '../low_level/core/GLExtensionsManager';
import GLBoostObject from '../low_level/core/GLBoostObject';
import M_SkeletalMesh from './elements/meshes/M_SkeletalMesh';

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

    gl.clearColor( _clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha );
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
      if (renderPass.fbo && renderPass.isRenderTargetTexturesIfSet) {
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderPass.fbo);
      } else {
        glem.drawBuffers(gl, [gl.BACK]);
      }
      */
      if (renderPass.fbo && renderPass.isRenderTargetTexturesIfSet) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderPass.fbo);
      }

      glem.drawBuffers(gl, renderPass.buffersToDraw);
      //glem.readBuffer(gl, renderPass.buffersToDraw);

      if (renderPass.viewport) {
        gl.viewport(renderPass.viewport.x, renderPass.viewport.y, renderPass.viewport.z, renderPass.viewport.w)
      } else {
        if (camera) {
          let deltaWidth = glContext.canvasHeight*camera.aspect - glContext.canvasWidth;
          gl.viewport(-deltaWidth/2, 0, glContext.canvasHeight*camera.aspect, glContext.canvasHeight);
        } else {
          gl.viewport(0, 0, glContext.canvasWidth, glContext.canvasHeight);
        }
      }

      this._clearBuffer(gl, renderPass);

      // draw opacity meshes.
      var opacityMeshes = renderPass.opacityMeshes;
      opacityMeshes.forEach((mesh)=> {
        if (mesh.isVisible) {
          mesh.draw(expression, lights, camera, renderPass.scene, index);
        }
      });

      if (camera) {
        renderPass.sortTransparentMeshes(camera);
      }
      // draw transparent meshes.
      var transparentMeshes = renderPass.transparentMeshes;
      transparentMeshes.forEach((mesh)=> {
        if (mesh.isVisible) {
          mesh.draw(expression, lights, camera, renderPass.scene, index);
        }
      });

      const globalStatesUsageBackup = this._glBoostContext.globalStatesUsage;
      this._glBoostContext.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_EXCLUSIVE;
      this._glBoostContext.currentGlobalStates = [
        3042, // gl.BLEND
      ];
      let gizmos = renderPass.gizmos;
      for (let gizmo of gizmos) {
        if (gizmo.isVisible) {
          gizmo.mesh.draw(expression, lights, camera, renderPass.scene, index);
        }
      }
      this._glBoostContext.globalStatesUsage = globalStatesUsageBackup;
      this._glBoostContext.restoreGlobalStatesToDefault();

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
//      glem.drawBuffers(gl, [gl.BACK]);

      renderPass.postRender(camera ? true:false, lights);

    });
  }

  _clearBuffer(gl, renderPass) {
    var clearColor = renderPass.clearColor;
    var clearDepth = renderPass.clearDepth;
    if (clearColor) {
      gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w);
    }
    if (clearDepth) {
      gl.clearDepth(clearDepth);
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

}
