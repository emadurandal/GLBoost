import GLBoost from './../globals'
import GLContext from './../GLContext'
import AbstractTexture from './AbstractTexture'
import GLExtentionsManager from '../GLExtentionsManager'

export default class Texture extends AbstractTexture {
  constructor(imageUrl, canvas) {
    super(canvas);

    this._isTextureReady = false;
    this._texture = null;

    this._img = new Image();
    this._img.crossOrigin = "Anonymous";
    this._img.onload = ()=> {
      var gl = this._gl;
      var glem = GLExtentionsManager.getInstance(gl);

      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      if (glem.extTFA) {
        gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);

      this._texture = texture;
      this._isTextureReady = true;
      this._width = this._img.width;
      this._height = this._img.width;
    };

    this._img.src = imageUrl;
  }

  get isTextureReady() {
    return this._isTextureReady;
  }

  get isImageAssignedForTexture() {
    return typeof this._img.src !== "undefined";
  }

}

GLBoost["Texture"] = Texture;
