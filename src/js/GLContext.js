export default class GLContext {

  constructor(canvas) {
    if (GLContext._instance) {
        return GLContext._instance;
    }

    if (canvas === void 0) {
      throw new Error("Failed to create WebGL Context due to no canvas object.");
    }

    var gl = canvas.getContext("webgl");

    if (!gl) {
        throw new Error("This platform doesn't support WebGL.");
    }

    //if (!gl instanceof WebGL2RenderingContext)
    if (!gl instanceof WebGLRenderingContext) {
        throw new Error("Unexpected rendering context.");
    }

    this._gl = gl;
    this._canvas = canvas;

    GLContext._instance = this;
  }

  static getInstance(canvas) {
    return new GLContext(canvas);
  }

  get gl() {
    return this._gl;
  }

}
GLContext._instance = null;
