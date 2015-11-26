import GLBoost from './../globals'
import GLContext from './../GLContext'
import AbstractTexture from './AbstractTexture'

export default class MutableTexture extends AbstractTexture {
  constructor(canvas, width, height) {
    super(canvas);

    this._isTextureReady = false;
    this._texture = null;
    this._width = width;
    this._height = height;

    var gl = this._gl;

    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

  }

  set colorAttachiment(attachmentId) {
    this._attachmentId = attachmentId;
  }

  get colorAttachiment() {
    return this._attachmentId;
  }
}

GLBoost["MutableTexture"] = MutableTexture;
