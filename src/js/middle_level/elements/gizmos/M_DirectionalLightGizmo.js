import M_Gizmo from './M_Gizmo';
import Arrow from '../../../low_level/primitives/Arrow';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Mesh from '../meshes/M_Mesh';

export default class M_DirectionalLightGizmo extends M_Gizmo {
  constructor(glBoostContext, length) {
    super(glBoostContext, null, null);
    this._init(glBoostContext, length);

//    this.isVisible = false;
  }

  _init(glBoostContext, length) {
    this._material = new ClassicMaterial(this._glBoostContext);
    this._mesh = new M_Mesh(glBoostContext,
      new Arrow(this._glBoostContext, length, 3),
      this._material);

    this.addChild(this._mesh);
  }

  set rotate(rotateVec3) {
    this._mesh.rotate = rotateVec3;
  }

  get rotate() {
    return this._mesh.rotate;
  }

  set baseColor(colorVec) {
    this._material.baseColor = colorVec;
  }

  get baseColor() {
    return this._material.baseColor;
  }
}
