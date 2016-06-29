import GLContext from './GLContext';
import MutableTexture from '../textures/MutableTexture';
import GLExtensionsManager from './GLExtensionsManager';
import RenderPass from '../../middle_level/expressions/RenderPath';

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class GLBoostContext {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    this._glBoostObjects = {};
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLBoostContext(singletonEnforcer);
    }
    return this[singleton];
  }

  registerGLBoostObject(glBoostObject) {
    this._glBoostObjects[glBoostObject.toString()] = glBoostObject;
  }

  printGLBoostObjects() {
    var objects = this._glBoostObjects;
    console.log('========== GLBoost Object Lists [begin] ==========');
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        console.log(key);
      }
    }
    console.log('========== GLBoost Object Lists [end] ==========');
  }

  /**
   * en: create textures as render target. (and attach it to framebuffer object internally.)<br>
   * ja:レンダーターゲットとしてテクスチャを作成します（内部的にframebuffer objectにアタッチされます）。
   * @param {number} width en: width of texture. ja: テクスチャの幅
   * @param {number} height en: height of texture. ja: テクスチャの高さ
   * @param {number} textureNum en: the number of creation. ja:テクスチャを作る個数
   * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   * @returns {Array} en: an array of created textures. ja:作成されたテクスチャの配列
   */
  createTexturesForRenderTarget(width, height, textureNum, canvas = GLBoost.CURRENT_CANVAS_ID) {
    this._glContext = GLContext.getInstance(canvas);
    var gl = this._glContext.gl;

    var glem = GLExtensionsManager.getInstance(this._glContext);

    // Create FBO
    var fbo = this._glContext.createFramebuffer(GLBoostContext.name);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width ? width : canvas.width;
    fbo.height = height ? height : canvas.height;

    var renderTargetTextures = [];
    for(let i=0; i<textureNum; i++) {
      let texture = new MutableTexture(fbo.width, fbo.height);
      texture.fbo = fbo;
      renderTargetTextures.push(texture);
    }

    // Create RenderBuffer
    var renderbuffer = this._glContext.createRenderbuffer(GLBoostContext.name);
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

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return renderTargetTextures;
  }

  createDepthTexturesForRenderTarget(width, height, canvas = GLBoost.CURRENT_CANVAS_ID) {
    this._glContext = GLContext.getInstance(canvas);
    var gl = this._glContext.gl;

    var glem = GLExtensionsManager.getInstance(this._glContext);

    // Create FBO
    var fbo = this._glContext.createFramebuffer(GLBoostContext.name);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width ? width : canvas.width;
    fbo.height = height ? height : canvas.height;

    let depthTexture = new MutableTexture(fbo.width, fbo.height, canvas);
    depthTexture.fbo = fbo;

    // Attach Buffers
    var glTexture = depthTexture.glTextureResource;
    var attachimentId = gl.DEPTH_ATTACHMENT;
    depthTexture.colorAttachment = attachimentId;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return depthTexture;
  }

  createRenderPasses(number, canvas = GLBoost.CURRENT_CANVAS_ID) {
    this._glContext = GLContext.getInstance(canvas);

    var renderPasses = [];
    for (let i=0; i<number; i++) {
      renderPasses.push(new RenderPass(this._glContext.gl));
    }

    return renderPasses;
  }
}

GLBoost['GLBoostContext'] = GLBoostContext;
