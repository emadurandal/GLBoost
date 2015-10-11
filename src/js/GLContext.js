import GLContextWebGL1Impl from './impl/GLContextWebGL1Impl'
import GLContextWebGL2Impl from './impl/GLContextWebGL2Impl'

export default class GLContext {

  constructor(canvas) {
    if (GLContext._instances[canvas.id] instanceof GLContext) {
      return GLContext._instances[canvas.id];
    }

    this.impl = new GLContextWebGL1Impl(canvas, this);

    GLContext._instances[canvas.id] = this;
  }

  static getInstance(canvas) {
    if (typeof canvas === 'string') {
      var canvas = window.document.querySelector(canvas);
    }
    return new GLContext(canvas);
  }

  get gl() {
    return this.impl.gl;
  }

}
GLContext._instances = new Object();
