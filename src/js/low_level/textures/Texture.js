import GLBoost from '../../globals';
import AbstractTexture from './AbstractTexture';
import GLExtensionsManager from '../core/GLExtensionsManager';

export default class Texture extends AbstractTexture {
  constructor(glBoostContext, src, parameters = null) {
    super(glBoostContext);

    this._isTextureReady = false;
    this._texture = null;

    this._parameters = parameters;

    if (typeof src === 'string') {
      this.generateTextureFromUri(src);
    } else {
      this.generateTextureFromImageData(src);
    }
  }

  _getParameter(paramName) {
    var isParametersExist = false;
    if (this._parameters != null) {
      isParametersExist = true;
    }
    var params = this._parameters;

    switch (paramName) {
    case 'flipY':
      if (isParametersExist && params[paramName]) {
        return params[paramName];
      } else {
        return false;
      }
    }
  }

  generateTextureFromUri(imageUri) {
    this._img = new Image();
    if ( !imageUri.match(/^data:/) ) {
      this._img.crossOrigin = 'Anonymous';
    }
    this._img.onload = ()=> {
      var gl = this._glContext.gl;
      var glem = GLExtensionsManager.getInstance(this._glContext);

      this._width = this._img.width;
      this._height = this._img.height;

      var texture = this._glContext.createTexture(this);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._getParameter('flipY'));
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._img);

      if (this._isPowerOfTwo(this._width) && this._isPowerOfTwo(this._height)) {
        if (glem.extTFA) {
          gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }
      gl.bindTexture(gl.TEXTURE_2D, null);

      this._texture = texture;
      this._isTextureReady = true;
    };

    this._img.src = imageUri;
  }

  generateTextureFromImageData(imageData) {
    var gl = this.this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);

    this._width = imageData.width;
    this._height = imageData.height;
    var texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    if (this._isPowerOfTwo(this._width) && this._isPowerOfTwo(this._height)) {
      if (glem.extTFA) {
        gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._texture = texture;
    this._isTextureReady = true;

    this._img = imageData;
  }

  get isTextureReady() {
    return this._isTextureReady;
  }

  get isImageAssignedForTexture() {
    return typeof this._img == 'undefined';
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

}
