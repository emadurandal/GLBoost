import GLContextImpl from './GLContextImpl'

export default class GLContextWebGL2Impl extends GLContextImpl {

  constructor(canvas, parent) {
    super(canvas, parent);

    super.init('webgl2', WebGL2RenderingContext);

  }

}
