import M_Gizmo from './M_Gizmo';
import Sphere from '../../../low_level/primitives/Sphere';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';

export default class M_PointLightGizmo extends M_Gizmo {
  constructor(glBoostContext, radius) {
    super(glBoostContext, null, null);
    this._init(glBoostContext, radius);

    this.isVisible = false;
  }

  _init(glBoostContext, radius) {
    this._material = new ClassicMaterial(glBoostContext);
    this.addChild(new M_Mesh(glBoostContext, new Sphere(glBoostContext, radius, 10, 10), this._material));
  }

  set baseColor(colorVec) {
    this._material.baseColor = colorVec;
  }

  get baseColor() {
    return this._material.baseColor;
  }
}
