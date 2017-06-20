import Grid from '../../../low_level/primitives/Grid';
import Vector4 from '../../../low_level/math/Vector4';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Gizmo from './M_Gizmo';
import M_Mesh from '../meshes/M_Mesh';


export default class M_GridGizmo extends M_Gizmo {
  constructor(glBoostContext, length, division, isXZ = true, isXY = false, isYZ = false, colorVec = new Vector4(0.5, 0.5, 0.5, 1)) {
    super(glBoostContext, null, null);
    this._init(glBoostContext, length, division, isXZ, isXY, isYZ, colorVec);
  }

  _init(glBoostContext, length, division, isXZ, isXY, isYZ, colorVec) {
    this._material = new ClassicMaterial(glBoostContext);
    this._material.baseColor = colorVec;
    this.addChild(new M_Mesh(glBoostContext, new Grid(glBoostContext, length, division, isXZ, isXY, isYZ, colorVec), this._material));
  }
}
