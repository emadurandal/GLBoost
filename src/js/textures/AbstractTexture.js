import GLBoost from './../globals';
import GLContext from './../GLContext';

export default class AbstractTexture {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    if (this.constructor === AbstractTexture) {
      throw new TypeError('Cannot construct AbstractTexture instances directly.');
    }

    this._glContext = GLContext.getInstance(canvas);
    this._name = '';
  }

  get glTextureResource() {
    return this._texture;
  }

  setUp() {
    var gl = this._glContext.gl;
    if (this._texture === null) {
      return false;
    }
    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    return true;
  }

  tearDown() {
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  isPowerOfTwo(x) {
    return (x & (x - 1)) == 0;
  }

}

GLBoost['AbstractTexture'] = AbstractTexture;
