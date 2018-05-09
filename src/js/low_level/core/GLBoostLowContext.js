import GLContext from './GLContext';
import L_GLBoostMonitor from './L_GLBoostMonitor';
import GLExtensionsManager from './GLExtensionsManager';
import Geometry from '../geometries/Geometry';
import BlendShapeGeometry from '../geometries/BlendShapeGeometry';
import ClassicMaterial from '../materials/ClassicMaterial';
import L_PerspectiveCamera from '../elements/cameras/L_PerspectiveCamera';
import L_FrustumCamera from '../elements/cameras/L_FrustumCamera';
import L_OrthoCamera from '../elements/cameras/L_OrthoCamera';
import L_CameraController from '../auxiliaries/camera_controllers/L_CameraController'
import MutableTexture from '../textures/MutableTexture';
import Texture from '../textures/Texture';
import PhinaTexture from '../textures/PhinaTexture';
import Cube from '../primitives/Cube';
import Plane from '../primitives/Plane';
import Sphere from '../primitives/Sphere';
import Axis from '../primitives/Axis';
import Particle from '../primitives/Particle';
import Screen from '../primitives/Screen';
import GLBoost from '../../globals';

export default class GLBoostLowContext {
  constructor(canvas, initParameter, gl, width, height) {
    this._setName();

    console.log('*** GLBoost revision ' + GLBoost.REVISION + ' ***');

    if (gl) {
      this._glContext = GLContext.getInstance(null, initParameter, gl, width, height);
    } else {
      this._glContext = GLContext.getInstance(canvas, initParameter);
    }

    this._globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_INCLUSIVE;

    this._defaultGlobalStates = [
      3042, // gl.BLEND
      2929  // gl.DEPTH_TEST
    ];

    this.restoreGlobalStatesToDefault();

    this._glBoostMonitor = L_GLBoostMonitor.getInstance();

    let dummyWhite1x1ImageDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REY4MUVGRjk0QzMyMTFFN0I2REJDQTc4QjEyOEY2RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REY4MUVGRkE0QzMyMTFFN0I2REJDQTc4QjEyOEY2RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERjgxRUZGNzRDMzIxMUU3QjZEQkNBNzhCMTI4RjZFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERjgxRUZGODRDMzIxMUU3QjZEQkNBNzhCMTI4RjZFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvTp+QkAAAAPSURBVHjaYvj//z9AgAEABf4C/i3Oie4AAAAASUVORK5CYII=';
    this._defaultDummyTexture = this.createTexture(dummyWhite1x1ImageDataUrl, "GLBoost_dummyWhite1x1Texture");

    this._defaultMaterial = this.createClassicMaterial();

    // effekseer
    if (typeof effekseer !== "undefined") {
      effekseer.init(this._glContext.gl);
    }
  }

  get defaultDummyTexture() {
    return this._defaultDummyTexture;
  }

  _setName() {
    this.constructor._instanceCount = (typeof this.constructor._instanceCount === 'undefined') ? 0 : (this.constructor._instanceCount + 1);
    this._instanceName = this.constructor.name + '_' + this.constructor._instanceCount;
  }

  toString() {
    return this._instanceName;
  }

  get glContext() {
    return this._glContext;
  }

  createGeometry() {
    return new Geometry(this);
  }

  createBlendShapeGeometry() {
    return new BlendShapeGeometry(this);
  }

  createCube(widthVector, vertexColor) {
    return new Cube(this, widthVector, vertexColor);
  }

  createPlane(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat) {
    return new Plane(this, width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat);
  }

  createSphere(radius, widthSegments, heightSegments, vertexColor) {
    return new Sphere(this, radius, widthSegments, heightSegments, vertexColor);
  }

  createAxis(length) {
    return new Axis(length);
  }

  createParticle(centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint) {
    return new Particle(this, centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint);
  }

  createClassicMaterial() {
    return new ClassicMaterial(this);
  }

  createPerspectiveCamera(lookat, perspective) {
    return new L_PerspectiveCamera(this, true, lookat, perspective);
  }

  createFrustumCamera(lookat, perspective) {
    return new L_FrustumCamera(this, true, lookat, perspective);
  }

  createOrthoCamera(lookat, ortho) {
    return new L_OrthoCamera(this, true, lookat, ortho);
  }

  createCameraController(options) {
    return new L_CameraController(this, options);
  }

  createTexture(src, userFlavorName, parameters = null) {
    return new Texture(this, src, userFlavorName, parameters);
  }

  createPhinaTexture(width, height, fillStyle, parameters = null) {
    return new PhinaTexture(this, width, height, fillStyle, parameters);
  }

  createScreen(screen, customVertexAttributes) {
    return new Screen(this, screen, customVertexAttributes);
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
  createTexturesForRenderTarget(width, height, textureNum) {
    var glContext = this._glContext;
    var gl = glContext.gl;

    var glem = GLExtensionsManager.getInstance(glContext);

    // Create FBO
    var fbo = glContext.createFramebuffer(this);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width;
    fbo.height = height;
    fbo._glboostTextures = [];

    for(let i=0; i<textureNum; i++) {
      let texture = new MutableTexture(this, fbo.width, fbo.height);
      texture.fbo = fbo;
      fbo._glboostTextures.push(texture);
    }

    // Create RenderBuffer
    var renderBuffer = glContext.createRenderbuffer(this);
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbo.width, fbo.height);
    fbo.renderBuffer = renderBuffer;

    // Attach Buffers
    fbo._glboostTextures.forEach((texture, i)=>{
      var glTexture = texture.glTextureResource;
      var attachimentId = glem.colorAttachiment(gl, i);
      texture.colorAttachment = attachimentId;
      gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
    });
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return fbo._glboostTextures.concat();
  }

  createDepthTexturesForRenderTarget(width, height) {
    var glContext = this._glContext;

    var gl = glContext.gl;

    var glem = GLExtensionsManager.getInstance(glContext);

    // Create FBO
    var fbo = glContext.createFramebuffer(this);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width;
    fbo.height = height;

    /*
    // Create color RenderBuffer
    var colorBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, colorBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, fbo.width, fbo.width);
*/

    // Create MutableTexture for Depth Texture
    let format = gl.DEPTH_COMPONENT;
    let internalFormat = gl.DEPTH_COMPONENT;
    let type = gl.UNSIGNED_INT;
    if (GLBoost.isThisGLVersion_2(gl)) {
      type = gl.UNSIGNED_INT;
      format = gl.DEPTH_COMPONENT;
      internalFormat = gl.DEPTH_COMPONENT24;
    } else if (glem.extDepthTex) {
      type = glem.extDepthTex.UNSIGNED_INT_24_8_WEBGL;
      format = gl.DEPTH_STENCIL;
      internalFormat = gl.DEPTH_STENCIL;
    }

    let depthTexture = new MutableTexture(this, fbo.width, fbo.height, 0,
      internalFormat, format, type,
      gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
    depthTexture.fbo = fbo;

    /// Attach Buffers
    // color
//    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, colorBuffer);
    //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, null);

    // depth
    var glTexture = depthTexture.glTextureResource;
    var attachimentId = gl.DEPTH_ATTACHMENT;
    if (GLBoost.isThisGLVersion_2(gl)) {
      attachimentId = gl.DEPTH_ATTACHMENT;
    } else if (glem.extDepthTex) {
      attachimentId = gl.DEPTH_STENCIL_ATTACHMENT;
    }
    depthTexture.depthAttachment = attachimentId;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);

//    console.log('FBO', gl.checkFramebufferStatus(gl.FRAMEBUFFER));

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return depthTexture;
  }

  get belongingCanvasId() {
    return this._glContext.belongingCanvasId;
  }

  set globalStatesUsage(usageMode) {
    this._globalStatesUsage = usageMode;
  }

  get globalStatesUsage() {
    return this._globalStatesUsage;
  }

  reflectGlobalGLState() {
    let gl = this._glContext.gl;

    this.currentGlobalStates.forEach((state)=>{
      gl.enable(state);
    });

    gl.depthFunc( gl.LEQUAL );

    gl.blendEquation( gl.FUNC_ADD );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

    gl.clearDepth( 1 );
    gl.clearStencil( 0 );
  }

  disableAllGLState() {
    let states = [
      3042, // gl.BLEND
      2884, // gl.CULL_FACE
      2929, // gl.DEPTH_TEST
      32823, // gl.POLYGON_OFFSET_FILL
      32926, // gl.SAMPLE_ALPHA_TO_COVERAGE
    ];

    let glContext = this._glContext;
    let gl = glContext.gl;

    states.forEach((state)=>{
      gl.disable(state);
    });
  }

  set currentGlobalStates(states) {
    this._currentGlobalStates = states.concat();
  }

  get currentGlobalStates() {
    return this._currentGlobalStates.concat();
  }

  restoreGlobalStatesToDefault() {
    this._currentGlobalStates = this._defaultGlobalStates.concat();
  }

}

GLBoost['GLBoostLowContext'] = GLBoostLowContext;
