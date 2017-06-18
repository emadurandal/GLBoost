import M_AbstractLight from './M_AbstractLight';
//import M_PointLightGizmo from '../gizmos/M_PointLightGizmo';
import M_PointLightGizmo from '../gizmos/M_PointLightGizmo';

/**
 * [en] This is a Directional Light class.<br>
 * [ja] 平行光源クラスです。
 */
export default class M_DirectionalLight extends M_AbstractLight {

  /**
   * [en] The constructor of DirectionalLight class. <br>
   * [ja] DirectionalLightクラスのコンストラクタ
   * @param {Vector4} intensity [en] intensity as Vector4 Color [ja] Vector4による色情報で指定する光の強度
   * @param {Vector4} direction [en] the light (traveling) direction [ja] 光が向かう方向
   */
  constructor(glBoostContext, intensity, direction) {
    super(glBoostContext);

    this._intensity = intensity;
    this._direction = direction;

    let gizmo = new M_PointLightGizmo(glBoostContext, 1);
    gizmo.masterElement = this;
    this._gizmos.push(gizmo);

  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

  set direction(vec) {
    this._direction = vec;
    if (this._camera) {
      if (this._camera.customFunction) {
        this._camera.customFunction(this);
      }
    }
  }

  get direction() {
    return this._direction;
  }

}
