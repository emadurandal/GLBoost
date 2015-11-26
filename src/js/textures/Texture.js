import GLBoost from './../globals'
import GLContext from './../GLContext'
import AbstractTexture from './AbstractTexture'

export default class Texture extends AbstractTexture {
  constructor(imageUrl, canvas) {
    super(canvas);

    this._isTextureReady = false;
    this._texture = null;

    var img = new Image();
    img.onload = ()=> {
      var gl = this._gl;
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);

      this._texture = texture;
      this._isTextureReady = true;
      this._width = img.width;
      this._height = img.width;
    };

    img.src = imageUrl;
  }

  get isTextureReady() {
    return this._isTextureReady;
  }

}

GLBoost["Texture"] = Texture;
