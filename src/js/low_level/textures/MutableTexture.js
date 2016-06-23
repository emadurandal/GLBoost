import GLBoost from '../../globals';
import AbstractTexture from './AbstractTexture';

export default class MutableTexture extends AbstractTexture {
  constructor(width, height, canvas = GLBoost.CURRENT_CANVAS_ID) {
    super(canvas);

    this._isTextureReady = false;
    this._texture = null;
    this._width = width;
    this._height = height;
    this._fbo = null;

    var gl = this._glContext.gl;

    //var glem = GLExtentionsManager.getInstance(gl);

    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

  }

  set colorAttachiment(attachmentId) {
    this._attachmentId = attachmentId;
  }

  get colorAttachiment() {
    return this._attachmentId;
  }

  set frameBufferObject(fbo) {
    this._fbo = fbo;
  }

  get frameBufferObject() {
    return this._fbo;
  }
}

GLBoost['MutableTexture'] = MutableTexture;
