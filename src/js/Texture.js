import GLBoost from './globals'
import GLContext from './GLContext'

export default class Texture {
  constructor(imageUrl) {
    this._isTextureReady = false;
    this._gl = GLContext.getInstance().gl;
    var img = new Image();
    this._texture = null;
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
    }

    img.src = imageUrl;
  }

  get isTextureReady() {
    return this._isTextureReady;
  }

  get glTextureResource() {
    return this._texture;
  }

  setUp() {
    this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
  }

  tearDown() {
    this._gl.bindTexture(this._gl.TEXTURE_2D, null);
  }

}

GLBoost["Texture"] = Texture;
