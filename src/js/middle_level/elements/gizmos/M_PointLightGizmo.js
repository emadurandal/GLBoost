import M_Gizmo from './M_Gizmo';
import Sphere from '../../../low_level/primitives/Sphere';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';

export default class M_PointLightGizmo extends M_Gizmo {
  constructor(glBoostContext, radius) {
    super(glBoostContext, null, null);
    this._init(radius);
    this._masterElement = null;

    this.isVisible = false;
  }

  _init(radius) {
    this.geometry = new Sphere(this._glBoostContext, radius, 10, 10);
    this.material = new ClassicMaterial(this._glBoostContext);
  }

  set baseColor(colorVec) {
    this.material.baseColor = colorVec;
  }

  get baseColor() {
    return this.material.baseColor;
  }
}
