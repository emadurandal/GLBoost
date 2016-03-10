import GLBoost from './globals'
import Mesh from './Mesh'
import Camera from './Camera'
import Matrix44 from './math/Matrix44'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import MutableTexture from './textures/MutableTexture'
import RenderPass from './RenderPass'
import AbstractLight from './lights/AbstractLight'
import Geometry from './Geometry'
import Group from './Group'

/**
 * en: This class take a role as operator of rendering process. In order to render images to canvas, this Renderer class gathers other elements' data, decides a plan of drawing process, and then just execute it.<br>
 * ja: このクラスはレンダリングプロセスの制御を司ります。Canvasにイメージをレンダリングするために、このRendererクラスは他の要素のデータを集め、描画プロセスの計画を決定し、実行します。
 */
export default class Renderer {
  constructor(parameters) {
    var _canvas = parameters.canvas;
    var _clearColor = parameters.clearColor;

    GLBoost.CURRENT_CANVAS_ID = '#' + parameters.canvas.id;

    this._gl = GLContext.getInstance(_canvas).gl;

    var gl = this._gl;

    var setDefaultGLStates = function setDefaultGLStates() {

      gl.enable( gl.DEPTH_TEST );
      gl.depthFunc( gl.LEQUAL );

      gl.enable( gl.BLEND );
      gl.blendEquation( gl.FUNC_ADD );
      gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

      gl.clearColor( _clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha );
      gl.clearDepth( 1 );
      gl.clearStencil( 0 );
    };

    setDefaultGLStates();

  }

  /**
   * en: draw elements of the scene.<br>
   * ja: sceneが持つオブジェクトを描画します
   * @param {Scene} scene a instance of Scene class
   */
  draw(scene) {
    var camera = false;
    var viewMatrix = null;
    var projectionMatrix = null;
    scene.cameras.forEach((elm)=> {
      if (elm.isMainCamera) {
        camera = elm;
      }
    });

    var gl = this._gl;
    var glem = GLExtentionsManager.getInstance(gl);

    let lights = scene.lights;

    scene.renderPasses.forEach((renderPass, index)=>{

      var meshes = renderPass.meshes;

      if (renderPass.fboOfRenderTargetTextures) {
        gl.bindTexture(gl.TEXTURE_2D, null);
        Geometry.clearMaterialCache();
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderPass.fboOfRenderTargetTextures);
      }
      glem.drawBuffers(gl, renderPass.buffersToDraw); // set render target buffers for each RenderPass.

      if (renderPass.clearColor) {
        var color = renderPass.clearColor;
        gl.clearColor(color[0], color[1], color[2], color[3]);
        gl.clear( gl.COLOR_BUFFER_BIT );
      }

      meshes.forEach((mesh)=> {
        mesh.draw(lights, camera, scene, index);
      });

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      glem.drawBuffers(gl, [gl.BACK]);

    });
  }

  /**
   * en: clear color/depth/stencil of canvas.<br>
   * ja: canvasのカラー、デプス、ステンシルのいずれか又は全てをクリアします。
   * @param {boolean} color_flg true: clear color, false: don't clear color
   * @param {boolean} depth_flg true: clear depth, false: don't clear depth
   * @param {boolean} stencil_flg  true: clear stencil, false: don't clear stencil
   */
  clearCanvas( color_flg, depth_flg, stencil_flg ) {

    var gl = this._gl;

    var bufferBits = 0;

    if ( color_flg === void 0 || color_flg ) bufferBits |= gl.COLOR_BUFFER_BIT;
    if ( depth_flg === void 0 || depth_flg ) bufferBits |= gl.DEPTH_BUFFER_BIT;
    if ( stencil_flg === void 0 || stencil_flg ) bufferBits |= gl.STENCIL_BUFFER_BIT;

    gl.clear( bufferBits );

  };

  /**
   * en: create textures as render target. (and attach it to framebuffer object internally.)<br>
   * ja:レンダーターゲットとしてテクスチャを作成します（内部的にframebuffer objectにアタッチされます）。
   * @param {number} width en: width of texture. ja: テクスチャの幅
   * @param {number} height en: height of texture. ja: テクスチャの高さ
   * @param {number} textureNum en: the number of creation. ja:テクスチャを作る個数
   * @returns {Array} en: an array of created textures. ja:作成されたテクスチャの配列
   */
  createTexturesForRenderTarget(width, height, textureNum) {

    var gl = this._gl;

    var glem = GLExtentionsManager.getInstance(gl);

    // Create FBO
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width ? width : gl._canvas.width;
    fbo.height = height ? height : gl._canvas.height;

    var renderTargetTextures = [];
    for(let i=0; i<textureNum; i++) {
      let texture = new MutableTexture(fbo.width, fbo.height, gl._canvas);
      texture.fbo = fbo;
      renderTargetTextures.push(texture);
    }

    // Create RenderBuffer
    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbo.width, fbo.height);

    // Attach Buffers
    renderTargetTextures.forEach((texture, i)=>{
      var glTexture = texture.glTextureResource;
      var attachimentId = glem.colorAttachiment(gl, i);
      texture.colorAttachiment = attachimentId;
      gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
    });
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return renderTargetTextures;
  }

  createRenderPasses(number) {
    var renderPasses = [];
    for (let i=0; i<number; i++) {
      renderPasses.push(new RenderPass(this._gl));
    }

    return renderPasses;
  }

  /**
   * en: Get WebGL context.<br>
   * ja: WebGLコンテキストを取得します。
   * @returns {webglcontext} a context of WebGL
   */
  get glContext() {
    return this._gl;
  }


  /**
   * en: resize canvas and viewport.<br>
   * ja: canvasとビューポートをリサイズします。
   * @param {number} width en: width to resize, ja: リサイズする幅
   * @param {number} height en: height to resize, ja:リサイズする高さ
   */
  resize(width, height) {
    this._gl._canvas.width = width;
    this._gl._canvas.height = height;

    this._gl.viewport(0, 0, width, height);
  }

}

GLBoost["Renderer"] = Renderer;
