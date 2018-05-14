import GLContext from '../core/GLContext'

export default class GLContextImpl {

  constructor(canvas, parent, initParameter) {
//    if (new.target === GLContextImpl) {
    if (this.constructor === GLContextImpl) {
      throw new TypeError("Cannot construct GLContextImpl instances directly");
    }

    if (!(parent instanceof GLContext)) {
      throw new Error("This concrete class can only be instantiated from the 'GLContext' class.");
    }

    if (canvas === void 0) {
      throw new Error("Failed to create WebGL Context due to no canvas object.");
    }

    this._canvas = canvas;

  }

  init(glVersionString, ContextType, initParameter = { antialias: true, premultipliedAlpha: true }, gl) {

    if (gl) {
      this._gl = gl;
    } else {

      let gl = this._canvas.getContext(glVersionString, initParameter);

      if (!gl) {
        gl = this._canvas.getContext('experimental-' + glVersionString);
        if (!gl) {
          throw new Error("This platform doesn't support WebGL.");
        }
      }

      if (!gl instanceof ContextType) {
        throw new Error("Unexpected rendering context.");
      }

      this._gl = gl;
    }
  }

  get gl() {
    return this._gl;
  }

  set gl(gl) {
    this._gl = gl;
  }

  get canvas() {
    return this._canvas;
  }

}
