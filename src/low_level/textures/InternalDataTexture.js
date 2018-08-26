import GLBoost from '../../globals';
import AbstractTexture from './AbstractTexture';
import GLExtensionsManager from '../core/GLExtensionsManager';

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class InternalDataTexture extends AbstractTexture {
  constructor(glBoostContext, enforcer) {
    super(glBoostContext);

    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }

    this._width = 1024;
    this._height = 1024;

    this._isTextureReady = false;
    this._texture = null;
    this.userFlavorName = 'GLBoostInternalDataTexture';

    this._dataTextureBuffer = new Float32Array(4*this._width*this._height);

    this._miscStartIndex = 0;
    this._objectsStartIndex = Math.floor(dataTextureSize*0.05);
    this._materialsStartIndex = Math.floor(dataTextureSize*0.75);
    this._lightsStartIndex = Math.floor(dataTextureSize*0.85);
    this._jointSetStartIndex = Math.floor(dataTextureSize*0.90);
    this._morphsStartIndex = Math.floor(dataTextureSize*0.95);

    this._objectDataLength = 4*10;
    this._materialDataLength = 4*10;
    this._lightDataLength = 4*10;
    this._jointSetDataLength = 4*512;
    this._morphsDataLength = 4*512;

  }

  static getInstance(glBoostContext) {
    if (!this[singleton]) {
      this[singleton] = new InternalDataTexture(glBoostContext, singletonEnforcer);
    }
    return this[singleton];
  }
  
  get dataTextureSize() {
    return 4*this._width*this._height;
  }

  /*
  set objectDataAt(i, worldMatrix, normalMatrix, AABBCenterPosition, AABBLengthCenterToCorner, opacity) {
    this._dataTextureBuffer[this._objectsStartIndex + this._objectDataLength*i + 0] = 
  }
  */

  getObjectDataIndexAt(i, macroConstant) {
    if (macroConstant === GLBoost.WORLD_MATRIX) {
      return this._objectsStartIndex + this._objectDataLength*i;
    }
  }

  generateTextureFromFloat32Array(float32ArrayData, isKeepBound = false) {

    this._width = pixels.shape[0];
    this._height = pixels.shape[1];

    let texture = this._generateTextureInnerWithArrayBufferView(float32ArrayData, this._width, this._height, isKeepBound);

    this._texture = texture;
    this._isTextureReady = true;

  }

  _generateTextureInnerWithArrayBufferView(imgCanvas, width, height, isKeepBound) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);
    var texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._getParamWithAlternative(GLBoost.UNPACK_FLIP_Y_WEBGL, false));
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, width, height, 0, gl.RGBA, gl.FLOAT, imgCanvas);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.TEXTURE_MAG_FILTER, gl.NEAREST));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MIN_FILTER, gl.NEAREST));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_S, gl.REPEAT));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.TEXTURE_WRAP_T, gl.REPEAT));
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
