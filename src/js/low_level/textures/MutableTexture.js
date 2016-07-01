import GLBoost from '../../globals';
import AbstractTexture from './AbstractTexture';

export default class MutableTexture extends AbstractTexture {
  constructor(glBoostContext, width, height, level = 0,
              internalFormat = 0x1908, // gl.RGBA
              format = 0x1908, //gl.RGBA
              type = 0x1401, // gl.UNSIGNED_BYTE
              magFileter = 0x2601, //gl.LINEAR
              minFilter = 0x2601, //gl.LINEAR
              wrapS = 0x812F, // gl.CLAMP_TO_EDGE
              wrapT = 0x812F) { // gl.CLAMP_TO_EDGE
    super(glBoostContext);

    this._isTextureReady = false;
    this._texture = null;
    this._width = width;
    this._height = height;
    this._fbo = null;
    this._attachmentId = null;

    var gl = this._glContext.gl;

    //var glem = GLExtensionsManager.getInstance(gl);

    this._texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFileter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

  }

  set attachment(attachmentId) {
    this._attachmentId = attachmentId;
  }

  get attachment() {
    return this._attachmentId;
  }

  set frameBufferObject(fbo) {
    this._fbo = fbo;
  }

  get frameBufferObject() {
    return this._fbo;
  }
}
