import M_Gizmo from './M_Gizmo';
import Arrow from '../../../low_level/primitives/Arrow';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';

export default class M_DirectionalLightGizmo extends M_Gizmo {
  constructor(glBoostContext, length) {
    super(glBoostContext, null, null);
    this._init(length);

//    this.isVisible = false;
  }

  _init(length) {
    this.geometry = new Arrow(this._glBoostContext, length);
    this.material = new ClassicMaterial(this._glBoostContext);
  }

  set baseColor(colorVec) {
    this.material.baseColor = colorVec;
  }

  get baseColor() {
    return this.material.baseColor;
  }
}
