import GLContext from '../GLContext'

export default class GLContextImpl {

  constructor(canvas, parent) {
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
    this._gl = null; // ここでnullを入れておかないと、後段のthis.gl === undefinedのチェックがうまくいかない

    if (this.gl === undefined) {
      throw new TypeError("Must override method.");
    }

  }

}
