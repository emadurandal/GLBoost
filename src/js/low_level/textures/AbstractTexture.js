import GLBoost from '../../globals';
import GLContext from './../GLContext';

/**
 * [en] This is the abstract class for all texture classes. Don't use this class directly.<br>
 * [ja] 全てのテクスチャクラスのための抽象クラスです。直接このクラスは使わないでください。
 */
export default class AbstractTexture {

  /**
   * [en] The constructor of PointLight class. Do not construct this class directly.<br>
   * [ja] PointLightクラスのコンストラクタ。直接このクラスを生成しようとしないでください。
   *
   * * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   */
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    if (this.constructor === AbstractTexture) {
      throw new TypeError('Cannot construct AbstractTexture instances directly.');
    }

    this._glContext = GLContext.getInstance(canvas);
    this._name = '';
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
  setUp() {
    var gl = this._glContext.gl;
    if (this._texture === null) {
      return false;
    }
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

GLBoost['AbstractTexture'] = AbstractTexture;
