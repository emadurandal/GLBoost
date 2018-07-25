import Grid from '../../../low_level/primitives/Grid';
import Vector4 from '../../../low_level/math/Vector4';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Gizmo from './M_Gizmo';
import M_Mesh from '../meshes/M_Mesh';
import Vector3 from '../../../low_level/math/Vector3';


export default class M_OutlineGizmo extends M_Gizmo {
  constructor(glBoostContext, mesh) {
    super(glBoostContext, null, null);

    this._mesh = mesh;

    this._init(glBoostContext);
  }

  _init(glBoostContext) {
    this.isPreDraw = true;
    this._material = new ClassicMaterial(glBoostContext);
    this._material.baseColor = new Vector4(0, 1, 0, 1);

    this._mesh.masterElement = this;
    this.scale = new Vector3(1.1, 1.1, 1.1);
  }
}
