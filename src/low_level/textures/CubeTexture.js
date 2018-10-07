import GLBoost from '../../globals';
import AbstractTexture from './AbstractTexture';
import GLExtensionsManager from '../core/GLExtensionsManager';
import MiscUtil from '../misc/MiscUtil';
import DataUtil from '../misc/DataUtil';


export default class CubeTexture extends AbstractTexture {
  constructor(glBoostContext, userFlavorName, parameters = null) {
    super(glBoostContext);

    this._isTextureReady = false;
    this._texture = null;
    if (typeof userFlavorName === 'undefined' || userFlavorName === null) {
      this.userFlavorName = this._instanceName;
    } else {
      this.userFlavorName = userFlavorName;
    }

    this._parameters = (parameters) ? parameters : {};

  }

  _getParameter(paramNumber) {
    let isParametersExist = false;
    if (this._parameters) {
      isParametersExist = true;
    }
    let params = this._parameters;

    let paramName = GLBoost.getNameOfGLBoostConstant(paramNumber);

    let ret = null;
    switch (paramNumber) {
      case GLBoost['UNPACK_FLIP_Y_WEBGL']:
      case GLBoost['UNPACK_PREMULTIPLY_ALPHA_WEBGL']:
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

  _getParamWithAlternative(paramNumber, alternative) {
    return MiscUtil.getTheValueOrAlternative(this._getParameter(paramNumber), alternative);
  }

  generateTextureFromSixSideImages(posXimages, negXimages, posYimages, negYimages, posZimages, negZimages) {
      var texture = this._glContext.createTexture(this);
      this._texture = texture;
      const gl = this._glContext.gl;
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

      for (let i=0; i<posXimages.length; i++) {
        const image = new Image();
        image.src = posXimages[i];
        image.onload = ()=>{ gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)};
      }
      for (let i=0; i<negXimages.length; i++) {
        const image = new Image();
        image.src = negXimages[i];
        image.onload = ()=>{ gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)};
      }
      for (let i=0; i<posYimages.length; i++) {
        const image = new Image();
        image.src = posYimages[i];
        image.onload = ()=>{ gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)};
      }
      for (let i=0; i<negYimages.length; i++) {
        const image = new Image();
        image.src = negYimages[i];
        image.onload = ()=>{ gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)};
      }
      for (let i=0; i<posZimages.length; i++) {
        const image = new Image();
        image.src = posZimages[i];
        image.onload = ()=> { gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)};
      }
      for (let i=0; i<negZimages.length; i++) {
        const image = new Image();
        image.src = negZimages[i];
        image.onload = ()=> { gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)};
      }
  }

  async generateTextureFromBaseUri(baseUri, mipLevelNum) {
    return new Promise((resolve, reject)=> {
      var texture = this._glContext.createTexture(this);
      this._texture = texture;
      const gl = this._glContext.gl;

      let loadedCount = 0;

      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (mipLevelNum >= 2) {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      } else {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      }
  
      const onLoadEachCubeImage = (texture, face, image, i)=> {
        return ()=> {
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(face, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          loadedCount++;
          if (loadedCount === 6) {
            this._isTextureReady = true;
            resolve(this);
          }
        };
      }
  
      for (let i = 0; i < mipLevelNum; i++) {
        let faces = [
          [baseUri + "_right_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
          [baseUri + "_left_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
          [baseUri + "_top_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
          [baseUri + "_bottom_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
          [baseUri + "_front_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
          [baseUri + "_back_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
        ];
        for (var j = 0; j < faces.length; j++) {
          var face = faces[j][1];
          var image = new Image();
          image.onload = onLoadEachCubeImage(texture, face, image, i);
          image.src = faces[j][0];
        }
      }
    });
  }

  get isTextureReady() {
    return this._isTextureReady;
  }

}
