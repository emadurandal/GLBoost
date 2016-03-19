import GLContextWebGL1Impl from './impl/GLContextWebGL1Impl';
import GLContextWebGL2Impl from './impl/GLContextWebGL2Impl';

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

}
GLContext._instances = new Object();
