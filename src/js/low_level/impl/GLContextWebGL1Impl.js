import GLContextImpl from './GLContextImpl'

export default class GLContextWebGL1Impl extends GLContextImpl {

  constructor(canvas, parent, initParameter, gl) {
    super(canvas, parent, initParameter);

    if (gl) {
      super.init('webgl', null, initParameter, gl);
    } else {
      super.init('webgl', WebGLRenderingContext, initParameter, gl);
    }
  }

}
