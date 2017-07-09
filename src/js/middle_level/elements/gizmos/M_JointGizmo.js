import GLBoost from '../../../globals';
import M_Gizmo from './M_Gizmo';
import JointPrimitive from '../../../low_level/primitives/JointPrimitive';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Mesh from '../meshes/M_Mesh';
import Vector4 from '../../../low_level/math/Vector4';
import Vector3 from '../../../low_level/math/Vector3';

export default class M_JointGizmo extends M_Gizmo {
  constructor(glBoostContext, length) {
    super(glBoostContext, null, null);
    this._init(glBoostContext, length);

//    this.isVisible = false;

    this.baseColor = new Vector4(0.0, 1.0, 1.0, 0.25);
  }

  _init(glBoostContext, length) {
    this._material = new ClassicMaterial(this._glBoostContext);
    this._mesh = new M_Mesh(glBoostContext,
      new JointPrimitive(this._glBoostContext, length, 1),
      this._material);

//    this._mesh.rotate = new Vector3(-Math.PI/2, 0, 0);

    this._material.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_IGNORE;
    this._material.states = [
      3042, // gl.BLEND
    ];

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
