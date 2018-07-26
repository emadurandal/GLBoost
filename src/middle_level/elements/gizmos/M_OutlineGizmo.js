import Grid from '../../../low_level/primitives/Grid';
import Vector4 from '../../../low_level/math/Vector4';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Gizmo from './M_Gizmo';
import M_Mesh from '../meshes/M_Mesh';
import Vector3 from '../../../low_level/math/Vector3';
import Matrix44 from '../../../low_level/math/Matrix44';

export default class M_OutlineGizmo extends M_Gizmo {
  constructor(glBoostContext, mesh, scale = 0.05) {
    super(glBoostContext, null, null);

    this._init(glBoostContext, mesh, scale);
  }

  _init(glBoostContext, mesh, scale) {

    this._mesh = mesh.clone();
    this.isPreDraw = true;
    this._material = new ClassicMaterial(glBoostContext);
    this._material.baseColor = new Vector4(0, 1, 0, 1);

    this._forceThisMaterial = this._material;

    this._mesh.material = this._material;
    this._group = this._glBoostContext.createGroup();
    this._group.matrix = mesh.worldMatrix;
    this._group.addChild(this._mesh);
    this.addChild(this._group);

    const centerPoint = mesh.AABBInWorld.updateAllInfo().centerPoint;

    this.scale = new Vector3(1+scale, 1+scale, 1+scale);
    this.translate = Vector3.multiply(centerPoint, -1*scale);
  }
}
