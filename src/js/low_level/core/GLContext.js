import GLContextWebGL1Impl from '../impl/GLContextWebGL1Impl';
import GLContextWebGL2Impl from '../impl/GLContextWebGL2Impl';
import GLExtensionsManager from './GLExtensionsManager';
import L_GLBoostMonitor from './L_GLBoostMonitor';

export default class GLContext {

  constructor(canvas, gl, width, height) {

    if (typeof gl !== 'undefined' && gl !== null) {
      this.impl = new GLContextWebGL1Impl(canvas, this, gl);
      this._canvasWidth = width;
      this._canvasHeight = height;
      GLContext._instances['nocanvas'] = this;
    } else {
      if (GLContext._instances[canvas.id] instanceof GLContext) {
        return GLContext._instances[canvas.id];
      }

      if (GLBoost.VALUE_TARGET_WEBGL_VERSION === 1) {
        this.impl = new GLContextWebGL1Impl(canvas, this);
      } else if (GLBoost.VALUE_TARGET_WEBGL_VERSION === 2) {
        this.impl = new GLContextWebGL2Impl(canvas, this);
      }

      GLContext._instances[canvas.id] = this;
      this._canvasWidth = canvas.width;
      this._canvasHeight = canvas.height;
    }

    this._monitor = L_GLBoostMonitor.getInstance();
  }

  static getInstance(canvas, gl, width, height) {
    if (typeof canvas === 'string') {
      canvas = window.document.querySelector(canvas);
    }
    return new GLContext(canvas, gl, width, height);
  }

  get gl() {
    return this.impl.gl;
  }

  set gl(gl) {
    this.impl.gl = gl;
  }

  get belongingCanvasId() {
    if (this.impl.canvas) {
      return this.impl.canvas.id;
    } else {
      return 'nocanvas';
    }
  }

  get canvas() {
    return this.impl.canvas;
  }

  createVertexArray(glBoostObject) {
    var gl = this.gl;
    var glem = GLExtensionsManager.getInstance(this);
    var glResource = glem.createVertexArray(gl);
    if (glResource) {
      this._monitor.registerWebGLResource(glBoostObject, glResource);
    }

    return glResource;
  }

  createBuffer(glBoostObject) {
    var glResource = this.gl.createBuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  createFramebuffer(glBoostObject) {
    var glResource = this.gl.createFramebuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  deleteFramebuffer(glBoostObject, frameBuffer) {
    this._monitor.deregisterWebGLResource(glBoostObject, frameBuffer);
    this.gl.deleteFramebuffer(frameBuffer);
    frameBuffer = null;
  }

  createRenderbuffer(glBoostObject) {
    var glResource = this.gl.createRenderbuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  deleteRenderbuffer(glBoostObject, renderBuffer) {
    this._monitor.deregisterWebGLResource(glBoostObject, renderBuffer);
    this.gl.deleteRenderbuffer(renderBuffer);
    renderBuffer = null;
  }

  createShader(glBoostObject, shaderType) {
    var glResource = this.gl.createShader(shaderType);
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  deleteShader(glBoostObject, shader) {
    this._monitor.deregisterWebGLResource(glBoostObject, shader);
    this.gl.deleteShader(shader);
    shader = null;
  }

  createProgram(glBoostObject) {
    var glResource = this.gl.createProgram();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  deleteProgram(glBoostObject, program) {
    this._monitor.deregisterWebGLResource(glBoostObject, program);
    this.gl.deleteProgram(program);
  }

  createTexture(glBoostObject) {
    var glResource = this.gl.createTexture();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  deleteTexture(glBoostObject, texture) {
    this._monitor.deregisterWebGLResource(glBoostObject, texture);
    this.gl.deleteTexture(texture);
    texture = null;
  }

  get canvasWidth() {
    return this._canvasWidth;
  }

  set canvasWidth(width) {
    if (this.impl.canvas) {
      this.impl.canvas.width = width;
    }
    this._canvasWidth = width;
  }

  get canvasHeight() {
    return this._canvasHeight;
  }

  set canvasHeight(height) {
    if (this.impl.canvas) {
      this.impl.canvas.height = height;
    }
    this._canvasHeight = height;
  }

}
GLContext._instances = new Object();
