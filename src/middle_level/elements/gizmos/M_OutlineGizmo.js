import Grid from '../../../low_level/primitives/Grid';
import Vector4 from '../../../low_level/math/Vector4';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Gizmo from './M_Gizmo';
import M_Mesh from '../meshes/M_Mesh';
import Vector3 from '../../../low_level/math/Vector3';
import Matrix44 from '../../../low_level/math/Matrix44';

export default class M_OutlineGizmo extends M_Gizmo {
  constructor(glBoostSystem, mesh, scale = 0.05) {
    super(glBoostSystem, null, null);

    if (mesh.className === 'M_Mesh') {
      this._init(glBoostSystem, mesh, scale);
    }
  }

  _init(glBoostSystem, mesh, scale) {

    this._mesh = mesh.clone();
    this.isPreDraw = true;
    this._material = new ClassicMaterial(glBoostSystem);
    this._material.baseColor = new Vector4(0, 1, 0, 1);

    
    this._material.states.enable = [2884]; // gl.CULL_FACE
    this._material.states.functions.cullFace = [1028]; // gl.front
    this._material.states.functions.depthMask = [true]; // Write depth value
    this._material.userFlavorName = "OutlineGizmoMaterial";

    this._forceThisMaterial = this._material;

    //this._mesh.material = this._material;
    this._group = glBoostSystem._glBoostContext.createGroup();
    this.updateMatrix(mesh);
    this._group.addChild(this._mesh);
    this.addChild(this._group);

    const centerPoint = mesh.AABBInWorld.updateAllInfo().centerPoint;

  }

  updateMatrix(mesh) {
    if (mesh.className === 'M_Mesh') {
      this._group.matrix = mesh.worldMatrix;
    }
  }
}
