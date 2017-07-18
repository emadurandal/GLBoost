import GLBoost from '../../../globals';
import M_Gizmo from './M_Gizmo';
import JointPrimitive from '../../../low_level/primitives/JointPrimitive';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Mesh from '../meshes/M_Mesh';
import Vector3 from '../../../low_level/math/Vector3';
import Vector4 from '../../../low_level/math/Vector4';
import MathUtil from '../../../low_level/math/MathUtil';
import Matrix44 from '../../../low_level/math/Matrix44';

export default class M_JointGizmo extends M_Gizmo {
  constructor(glBoostContext, joint, length) {
    super(glBoostContext, null, null);
    this._init(glBoostContext, joint, length);

//    this.isVisible = false;

    this.baseColor = new Vector4(0.0, 1.0, 1.0, 0.25);
  }

  _init(glBoostContext, joint, length) {
    this._joint = joint;
    this._material = new ClassicMaterial(this._glBoostContext);
    this._mesh = new M_Mesh(glBoostContext,
      new JointPrimitive(this._glBoostContext, length, 1),
      this._material);
    this._mesh.masterElement = this;
//    this._mesh.rotate = new Vector3(-Math.PI/2, 0, 0);

    this._material.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_IGNORE;
    this._material.states = [
      3042, // gl.BLEND
    ];

    this.addChild(this._mesh);
  }
/*
  set rotate(rotateVec3) {
    this._mesh.rotate = rotateVec3;
  }

  get rotate() {
    return this._mesh.rotate;
  }
*/
  set baseColor(colorVec) {
    this._material.baseColor = colorVec;
  }

  get baseColor() {
    return this._material.baseColor;
  }

  // Use master element's transformMatrixAccumulatedAncestry.
  get _transformMatrixAccumulatedAncestry() {
    let backToTipVec3 = this._joint.relativeVectorToJointTip;
    let length = backToTipVec3.length();


    let theta = MathUtil.radianToDegree(Math.atan((backToTipVec3.y)/(Math.abs(backToTipVec3.x))));
    let phi = MathUtil.radianToDegree((Math.atan(Math.sqrt(backToTipVec3.x*backToTipVec3.x+backToTipVec3.y*backToTipVec3.y)/Math.abs(backToTipVec3.z))));


//    let theta = MathUtil.radianToDegree(Math.atan((backToTipVec3.y)/((backToTipVec3.x))));
//    let phi = - MathUtil.radianToDegree((Math.atan(Math.sqrt(backToTipVec3.x*backToTipVec3.x+backToTipVec3.y*backToTipVec3.y)/(backToTipVec3.z))));
//    let theta = 0;
//    let phi = 0;
    let mat = Matrix44.rotateZ(theta).multiply(Matrix44.rotateY(phi)).multiply(Matrix44.scale(new Vector3(length, length, length)));

    return Matrix44.multiply(this._joint.jointPoseMatrix, mat);
  }
}

GLBoost['M_JointGizmo'] = M_JointGizmo;
