import GLContextWebGL1Impl from '../impl/GLContextWebGL1Impl';
import GLContextWebGL2Impl from '../impl/GLContextWebGL2Impl';
import GLExtensionsManager from './GLExtensionsManager';
import GLBoostMonitor from './GLBoostMonitor';

export default class GLContext {

  constructor(canvas) {
    if (GLContext._instances[canvas.id] instanceof GLContext) {
      return GLContext._instances[canvas.id];
    }

    if (GLBoost.TARGET_WEBGL_VERSION === 1) {
      this.impl = new GLContextWebGL1Impl(canvas, this);
    } else if (GLBoost.TARGET_WEBGL_VERSION === 2) {
      this.impl = new GLContextWebGL2Impl(canvas, this);
    }

    GLContext._instances[canvas.id] = this;
    this._monitor = GLBoostMonitor.getInstance();
  }

  static getInstance(canvas) {
    if (typeof canvas === 'string') {
      canvas = window.document.querySelector(canvas);
    }
    return new GLContext(canvas);
  }

  get gl() {
    return this.impl.gl;
  }

  get canvas() {
    return this.impl.canvas;
  }

  createVertexArray(glBoostObject) {
    var gl = this.gl;
    var glem = GLExtensionsManager.getInstance(this);
    var glResource = glem.createVertexArray(gl);
    this._monitor.registerWebGLResource(glBoostObject, glResource);
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

  createRenderbuffer(glBoostObject) {
    var glResource = this.gl.createRenderbuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  createShader(glBoostObject, shaderType) {
    var glResource = this.gl.createShader(shaderType);
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  createProgram(glBoostObject) {
    var glResource = this.gl.createProgram();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

  createTexture(glBoostObject) {
    var glResource = this.gl.createTexture();
    this._monitor.registerWebGLResource(glBoostObject, glResource);
    return glResource;
  }

}
GLContext._instances = new Object();
