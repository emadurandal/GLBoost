import GLContextImpl from './GLContextImpl'

export default class GLContextWebGL2Impl extends GLContextImpl {

  constructor(canvas, parent, initParameter, gl) {
    super(canvas, parent, initParameter);

    super.init('webgl2', WebGL2RenderingContext, initParameter, gl);

  }

}
