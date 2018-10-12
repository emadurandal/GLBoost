import GLBoost from '../../globals';
import GLContext from '../core/GLContext';
import GLBoostObject from '../core/GLBoostObject';
import Vector4 from '../math/Vector4';

/**
 * [en] This is the abstract class for all texture classes. Don't use this class directly.<br>
 * [ja] 全てのテクスチャクラスのための抽象クラスです。直接このクラスは使わないでください。
 */
export default class AbstractTexture extends GLBoostObject {

  /**
   * [en] The constructor of PointLight class. Do not construct this class directly.<br>
   * [ja] PointLightクラスのコンストラクタ。直接このクラスを生成しようとしないでください。
   *
   * * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   */
  constructor(glBoostContext) {
    super(glBoostContext);

    if (this.constructor === AbstractTexture) {
      throw new TypeError('Cannot construct AbstractTexture instances directly.');
    }

    this._textureUnitIndex = 0;

    // x,y are uv scale, zw are uv transform. calculation is applied as first scale, second transform
    this._uvTransform = new Vector4(1, 1, 0, 0);

    this._toMultiplyAlphaToColorPreviously = false // same result when UNPACK_PREMULTIPLY_ALPHA_WEBGL is true
  }

  /**
   * [en] get the WebGL texture resource within this class. <br />
   * [ja] このクラス内部で管理しているWebGLテクスチャリソースを取得します。
   *
   * @returns {null|*} [en] WebGL texture resouce. [ja] WebGLテクスチャリソース
   */
  get glTextureResource() {
    return this._texture;
  }

  /**
   * [en] bind the texture. It calls bindTexture on WebGL only if it has WebGL texture. Otherwise it returns false without doing anything.<br />
   * [ja] テクスチャをバインドします。自身がWebGLテクスチャを持っている場合のみ、WebGLのbindTextureを呼びます。それ以外は何もせずにfalseを返します。
   */
  setUp(textureUnitIndex) {
    var gl = this._glContext.gl;
    if (this._texture === null) {
      return false;
    }
    var index = !(typeof textureUnitIndex === 'undefined') ? textureUnitIndex : this._textureUnitIndex;
    gl.activeTexture(gl.TEXTURE0 + index);

    if (this.className.indexOf('Cube') !== -1) {
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
    } else {
      gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    return true;
  }

  /**
   * [en] unbind the texture. <br />
   * [ja] テクスチャをバインド解除します。
   */
  tearDown(textureUnitIndex) {
    var gl = this._glContext.gl;

    var index = !(typeof textureUnitIndex === 'undefined') ? textureUnitIndex : this._textureUnitIndex;
    gl.activeTexture(gl.TEXTURE0 + index);
    if (this.className.indexOf('Cube') !== -1) {
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    } else {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set textureUnitIndex(index) {
    this._textureUnitIndex = index;
  }

  get textureUnitIndex() {
    return this._textureUnitIndex;
  }

  getTexturePixelData() {
    let gl = this._glContext.gl;

    // Create a framebuffer backed by the texture
    let framebuffer = this._glContext.createFramebuffer(this);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);

    // Read the contents of the framebuffer (data stores the pixel data)
    let data = new Uint8Array(this.width * this.height * 4);
    gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data);

    //this._glContext.deleteFramebuffer(this, framebuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return data;
  }

  /**
   * Origin is left bottom
   *
   * @param {number} x horizontal pixel position (0 is left)
   * @param {number} y virtical pixel position (0 is bottom)
   * @param {Uint8Array} argByteArray Pixel Data as Uint8Array
   * @returns {Vector4} Pixel Value in Vector4
   */
  getPixelValueAt(x, y, argByteArray) {
    let byteArray = argByteArray;
    if (!byteArray) {
      byteArray = this.getTexturePixelData();
    }

    let color = new Vector4(
      byteArray[(y*this.width + x) * 4+0],
      byteArray[(y*this.width + x) * 4+1],
      byteArray[(y*this.width + x) * 4+2],
      byteArray[(y*this.width + x) * 4+3]
      );
    return color;
  }

  _getResizedCanvas(image) {
    var canvas = document.createElement("canvas");
    canvas.width = this._getNearestPowerOfTwo(image.width);
    canvas.height = this._getNearestPowerOfTwo(image.height);

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas;
  }
  /**
   * [en] check whether or not this texture size is power of two. <br />
   * [ja] テクスチャサイズが２の累乗かどうかを返します
   *
   * @param {number} x [en] texture size. [ja] テクスチャサイズ
   * @returns {boolean} [en] check whether or not the size x is power of two. [ja] xが２の累乗かどうか
   */
  _isPowerOfTwo(x) {
    return (x & (x - 1)) == 0;
  }

  _isPowerOfTwoTexture() {
    return this._isPowerOfTwo(this.width) && this._isPowerOfTwo(this.height);
  }

  /**
   * [en] get a value nearest power of two. <br />
   * [ja] 与えられた数から見て２の累乗に最も近い値を返します。
   *
   * @param {number} x [en] texture size. [ja] テクスチャサイズ
   * @returns {number} [en] a value nearest power of two. [ja] xに近い２の累乗の値
   */
  _getNearestPowerOfTwo(x) {
    return Math.pow( 2, Math.round( Math.log( x ) / Math.LN2 ) );
  }

  readyForDiscard() {
    if (this._texture) {
      this._glContext.deleteTexture(this, this._texture);
    }
    if (this.fbo) {
      for (let texture of this.fbo._glboostTextures) {
        this.fbo._glboostTextures = this.fbo._glboostTextures.filter(function(v, i) {
          return (v !== this);
        });
      }
      if (this.fbo._glboostTextures.length === 0) {
        this._glContext.deleteFramebuffer(this._glBoostContext, this.fbo);
        this._glContext.deleteFramebuffer(this._glBoostContext, this.fbo);
        if (this.fbo.renderBuffer) {
          this._glContext.deleteRenderbuffer(this._glBoostContext, this.fbo.renderBuffer);
        }
      }
    }

    super.readyForDiscard();
  }

  get uvTransform() {
    return this._uvTransform;
  }

  set uvTransform(vec4) {
    this._uvTransform = vec4;
  }

  get toMultiplyAlphaToColorPreviously() {
    return this._toMultiplyAlphaToColorPreviously;
  }

  set toMultiplyAlphaToColorPreviously(flag) {
    this._toMultiplyAlphaToColorPreviously = flag;
  }
}
