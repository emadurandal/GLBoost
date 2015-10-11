import GLBoost from './globals'
import GLContext from './GLContext'

export default class AbstractTexture {
  constructor(canvas) {
    if (this.constructor === AbstractTexture) {
      throw new TypeError("Cannot construct AbstractTexture instances directly.");
    }

    this._gl = GLContext.getInstance(canvas).gl;
  }

  get glTextureResource() {
    return this._texture;
  }

  setUp() {
    this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
  }

  tearDown() {
    this._gl.bindTexture(this._gl.TEXTURE_2D, null);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

}

GLBoost["AbstractTexture"] = AbstractTexture;
