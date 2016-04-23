import GLBoost from './../globals'
import GLContext from './../GLContext'
import AbstractLight from './AbstractLight'

/**
 * [en] This is a Point Light class.<br>
 * [ja] 点光源クラスです。
 */
export default class PointLight extends AbstractLight {

  /**
   * [en] The constructor of PointLight class. <br>
   * [ja] PointLightクラスのコンストラクタ
   * @param {Vector4} intensity [en] intensity as Vector4 Color [ja] Vector4による色情報で指定する光の強度
   * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   */
  constructor(intensity, canvas = GLBoost.CURRENT_CANVAS_ID) {
    super(canvas);

    this._gl = GLContext.getInstance(canvas).gl;
    this._name = "";
    this._intensity = intensity;

  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

}

GLBoost["PointLight"] = PointLight;
