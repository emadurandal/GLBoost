import GLContext from './GLContext';
import L_GLBoostMonitor from './L_GLBoostMonitor';
import GLExtensionsManager from './GLExtensionsManager';
import Geometry from '../geometries/Geometry';
import BlendShapeGeometry from '../geometries/BlendShapeGeometry';
import ClassicMaterial from '../ClassicMaterial';
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
import MiscUtil from '../misc/MiscUtil';
import GLBoost from '../../globals';
import L_SPVCameraController from '../auxiliaries/camera_controllers/L_SPVCameraController';
import SPVClassicMaterial from '../SPVClassicMaterial';

export default class GLBoostLowContext {
  constructor(canvas, gl, width, height) {
    this._setName();

    console.log('*** GLBoost revision ' + GLBoost.REVISION + ' ***');

    if (gl) {
      this._glContext = GLContext.getInstance(null, gl, width, height);
    } else {
      this._glContext = GLContext.getInstance(canvas);
    }

    this._globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_INCLUSIVE;

    this._defaultGlobalStates = [
      3042, // gl.BLEND
      2929  // gl.DEPTH_TEST
    ];

    this.restoreGlobalStatesToDefault();

    this._glBoostMonitor = L_GLBoostMonitor.getInstance();

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

  createCameraController(isSymmetryMode, doResetWhenCameraSettingChanged, isForceGrab, efficiency) {
    return new L_CameraController(this, isSymmetryMode, doResetWhenCameraSettingChanged, isForceGrab, efficiency);
  }

  createTexture(src, userFlavorName, parameters = null) {
    return new Texture(this, src, userFlavorName, parameters);
  }

  createPhinaTexture(width, height, fillStyle, parameters = null) {
    return new PhinaTexture(this, width, height, fillStyle, parameters);
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

    var renderTargetTextures = [];
    for(let i=0; i<textureNum; i++) {
      let texture = new MutableTexture(this, fbo.width, fbo.height);
      texture.fbo = fbo;
      renderTargetTextures.push(texture);
    }

    // Create RenderBuffer
    var renderbuffer = glContext.createRenderbuffer(this);
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbo.width, fbo.height);

    // Attach Buffers
    renderTargetTextures.forEach((texture, i)=>{
      var glTexture = texture.glTextureResource;
      var attachimentId = glem.colorAttachiment(gl, i);
      texture.colorAttachment = attachimentId;
      gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
    });
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return renderTargetTextures;
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

    // Create color RenderBuffer
    var colorBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, colorBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, fbo.width, fbo.width);

    // Create MutableTexture for Depth Texture
    let depthTexture = new MutableTexture(this, fbo.width, fbo.height, 0,
      gl.DEPTH_COMPONENT, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT,
      gl.NEAREST, gl.NEAREST, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
    depthTexture.fbo = fbo;

    /// Attach Buffers
    // color
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, colorBuffer);

    // depth
    var glTexture = depthTexture.glTextureResource;
    var attachimentId = gl.DEPTH_ATTACHMENT;
    depthTexture.depthAttachment = attachimentId;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);

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

  createSPVCameraController(isSymmetryMode, doResetWhenCameraSettingChanged, isForceGrab, efficiency) {
    return new L_SPVCameraController(this, isSymmetryMode, doResetWhenCameraSettingChanged, isForceGrab, efficiency);
  }

  createSPVClassicMaterial() {
    return new SPVClassicMaterial(this);
  }
}

GLBoost['GLBoostLowContext'] = GLBoostLowContext;
