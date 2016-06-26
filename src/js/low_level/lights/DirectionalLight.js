import GLBoost from '../../globals';
import GLContext from '../core/GLContext';
import AbstractLight from './AbstractLight';

/**
 * [en] This is a Directional Light class.<br>
 * [ja] 平行光源クラスです。
 */
export default class DirectionalLight extends AbstractLight {

  /**
   * [en] The constructor of DirectionalLight class. <br>
   * [ja] DirectionalLightクラスのコンストラクタ
   * @param {Vector4} intensity [en] intensity as Vector4 Color [ja] Vector4による色情報で指定する光の強度
   * @param {Vector4} direction [en] the light (traveling) direction [ja] 光が向かう方向
   * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   */
  constructor(intensity, direction, canvas = GLBoost.CURRENT_CANVAS_ID) {
    super(canvas);

    this._gl = GLContext.getInstance(canvas).gl;
    this._name = "";
    this._intensity = intensity;
    this._direction = direction;
  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

  set direction(vec) {
    this._direction = vec;
  }

  get direction() {
    return this._direction;
  }

}

GLBoost["DirectionalLight"] = DirectionalLight;
