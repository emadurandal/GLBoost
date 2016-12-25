import GLContextImpl from './GLContextImpl'

export default class GLContextWebGL1Impl extends GLContextImpl {

  constructor(canvas, parent, gl) {
    super(canvas, parent);

    if (gl) {
      super.init('webgl', null, gl);
    } else {
      super.init('webgl', WebGLRenderingContext, gl);
    }
  }

}
