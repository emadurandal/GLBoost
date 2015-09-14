import GLContextWebGL1Impl from './impl/GLContextWebGL1Impl'

export default class GLContext {

  constructor(canvas) {
    if (GLContext._instance) {
        return GLContext._instance;
    }

    this.impl = new GLContextWebGL1Impl(canvas, this);

    GLContext._instance = this;
  }

  static getInstance(canvas) {
    return new GLContext(canvas);
  }

  get gl() {
    return this.impl._gl;
  }

}
GLContext._instance = null;
