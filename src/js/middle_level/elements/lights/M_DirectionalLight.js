import M_AbstractLight from './M_AbstractLight';
import M_DirectionalLightGizmo from '../gizmos/M_DirectionalLightGizmo';
import Vector3 from '../../../low_level/math/Vector3';

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
  constructor(glBoostContext, intensity, direction, length = 1.0) {
    super(glBoostContext);

    this._intensity = intensity;
    this._direction = direction;

    this._gizmo = new M_DirectionalLightGizmo(glBoostContext, length);
    this._gizmos.push(this._gizmo);

    //this._gizmo._mesh.masterElement = this._gizmo;

  }

  set multiplyMatrixGizmo(mat4) {
    this._gizmo.multiplyMatrix(mat4);
  }

  get multiplyMatrixGizmo() {
    return this._gizmo.matrix;
  }

  set translate(vec3) {
    this._gizmo._mesh.translate = vec3;
  }

  get translate() {
    return this._gizmo.translate;
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
