import GLContextImpl from './GLContextImpl'

export default class GLContextWebGL1Impl extends GLContextImpl {

  constructor(canvas, parent) {
    super(canvas, parent);

    var gl = canvas.getContext("webgl");

    if (!gl) {
      throw new Error("This platform doesn't support WebGL.");
    }

    //if (!gl instanceof WebGL2RenderingContext)
    if (!gl instanceof WebGLRenderingContext) {
      throw new Error("Unexpected rendering context.");
    }

    canvas._gl = gl;

  }

  get gl() {
    return this._canvas._gl;
  }

}
