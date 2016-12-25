import GLBoost from '../../globals';
import AbstractTexture from './AbstractTexture';
import GLExtensionsManager from '../core/GLExtensionsManager';
import MiscUtil from '../misc/MiscUtil';

export default class Texture extends AbstractTexture {
  constructor(glBoostContext, src, userFlavorName, parameters = null) {
    super(glBoostContext);

    this._isTextureReady = false;
    this._texture = null;
    if (typeof userFlavorName === 'undefined' || userFlavorName === null) {
      this.userFlavorName = this._instanceName;
    } else {
      this.userFlavorName = userFlavorName;
    }

    this._parameters = (parameters) ? parameters : {};

    if (typeof src === 'undefined' || src === null) {
      // do nothing
    } else if (typeof src === 'string') {
        this._generateTextureFromUri(src);
    } else {
        this._generateTextureFromImageData(src);
    }
  }

  _getParameter(paramName) {
    var isParametersExist = false;
    if (this._parameters) {
      isParametersExist = true;
    }
    var params = this._parameters;

    var gl = this._glContext.gl;
    let ret = null;
    switch (paramName) {
      case GLBoost['UNPACK_FLIP_Y_WEBGL']:
      case GLBoost['TEXTURE_MAG_FILTER']:
      case GLBoost['TEXTURE_MIN_FILTER']:
      case GLBoost['TEXTURE_WRAP_S']:
      case GLBoost['TEXTURE_WRAP_T']:
        if (isParametersExist && params[paramName]) {
          ret = params[paramName];
        }
        break;
    }
    return ret;
  }

  _getParamWithAlternative(param, alternative) {
    return MiscUtil.getTheValueOrAlternative(this._getParameter(GLBoost[param]), alternative);
  }

  _generateTextureFromUri(imageUri, isKeepBound = false) {
    let isNode = (typeof process !== "undefined" && typeof require !== "undefined");
    if (isNode) {
      let getPixels = require("get-pixels");

      let results = getPixels(imageUri, (err, pixels) => {
        if(err) {
          console.log("Bad image path");
          return;
        }

        let texture = this._generateTextureInner(pixels.data, isKeepBound);

        this._width = pixels.shape[0];
        this._height = pixels.shape[1];

        this._texture = texture;
        this._isTextureReady = true;

        this._onLoad();
      });

    } else {
      this._img = new Image();
      if (!imageUri.match(/^data:/)) {
        this._img.crossOrigin = 'Anonymous';
      }
      this._img.onload = () => {
        let imgCanvas = this._getResizedCanvas(this._img);
        this._width = imgCanvas.width;
        this._height = imgCanvas.height;

        let texture = this._generateTextureInner(imgCanvas, isKeepBound);

        this._texture = texture;
        this._isTextureReady = true;

        this._onLoad();
      };

      this._img.src = imageUri;
    }
  }

  _generateTextureFromImageData(imageData) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);

    var imgCanvas = this._getResizedCanvas(imageData);
    this._width = imgCanvas.width;
    this._height = imgCanvas.height;

    var texture = this._generateTextureInner(imgCanvas, false);

    this._texture = texture;
    this._isTextureReady = true;

    this._img = imageData;

    this._onLoad();
  }

  _generateTextureInner(imgCanvas, isKeepBound) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);
    var texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._getParamWithAlternative('UNPACK_FLIP_Y_WEBGL', false));
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgCanvas);

    if (glem.extTFA) {
      gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._getParamWithAlternative('TEXTURE_MAG_FILTER', gl.LINEAR));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._getParamWithAlternative('TEXTURE_MIN_FILTER', gl.LINEAR_MIPMAP_LINEAR));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._getParamWithAlternative('TEXTURE_WRAP_S', gl.REPEAT));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._getParamWithAlternative('TEXTURE_WRAP_T', gl.REPEAT));
    gl.generateMipmap(gl.TEXTURE_2D);

    if (!isKeepBound) {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    return texture;
  }


  _onLoad() {

  }

  get isTextureReady() {
    return this._isTextureReady;
  }

  get isImageAssignedForTexture() {
    return typeof this._img == 'undefined';
  }


}
