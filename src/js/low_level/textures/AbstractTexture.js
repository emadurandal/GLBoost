import GLBoost from '../../globals';
import GLContext from '../core/GLContext';
import GLBoostObject from '../core/GLBoostObject';

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

    this._name = '';

    this._textureUnitIndex = 0;
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
   * [en] bind the texture. <br />
   * [ja] テクスチャをバインドします。
   */
  setUp(textureUnitIndex) {
    var gl = this._glContext.gl;
    if (this._texture === null) {
      return false;
    }
    var index = !(typeof textureUnitIndex === 'undefined') ? textureUnitIndex : this._textureUnitIndex;
    gl.activeTexture(gl['TEXTURE'+index]);
    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    return true;
  }

  /**
   * [en] unbind the texture. <br />
   * [ja] テクスチャをバインド解除します。
   */
  tearDown() {
    var gl = this._glContext.gl;
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
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

}
