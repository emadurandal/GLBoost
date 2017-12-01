import GLBoost from '../../../globals';
import M_Element from '../M_Element';
import M_JointGizmo from '../gizmos/M_JointGizmo';
import Vector3 from '../../../low_level/math/Vector3';
import Matrix44 from '../../../low_level/math/Matrix44';


export default class M_Joint extends M_Element {
  constructor(glBoostContext, length = 1.0) {
    super(glBoostContext);

    this._gizmo = new M_JointGizmo(glBoostContext, this, length);
    this._gizmos.push(this._gizmo);

    M_Joint._calculatedTransforms = {};
    M_Joint._calculatedTranslates = {};
    this._childJoints = [];
    this._jointsOfParentHierarchies = [];

    this.length = new Vector3(length, length, length);

    this._isCalculatedJointGizmo = false;
    this._jointPoseMatrix = Matrix44.identity();
    this._length = 1;

    this._inverseBindMatrix = Matrix44.identity();

    this._skeletalMesh = null;

  }

  set inverseBindMatrix(mat4) {
    this._inverseBindMatrix = mat4;
  }

  get inverseBindMatrix() {
    return this._inverseBindMatrix;
  }

  set skeletalMesh(skeletalMesh) {
    this._skeletalMesh = skeletalMesh;
  }

  get skeletalMesh() {
    return this._skeletalMesh;
  }

  set worldPositionOfThisJoint(vec) {
    this._gizmo.worldPositionOfThisJoint = vec;
  }

  get worldPositionOfThisJoint() {
    return this._gizmo.worldPositionOfThisJoint;
  }

  set worldPositionOfParentJoint(vec) {
    this._gizmo.worldPositionOfParentJoint = vec;
  }

  get worldPositionOfParentJoint() {
    return this._gizmo.worldPositionOfParentJoint;
  }

  set width(value) {
    this._gizmo.width = value;
  }

  get width() {
    return this._gizmo.width;
  }

  set jointPoseMatrix(matrix) {
    this._jointPoseMatrix = matrix;
  }

  get jointPoseMatrix() {
    return this._jointPoseMatrix;
  }


  clearIsCalculatedLengthFlag() {
    this._isCalculatedJointGizmo = false;
  }

  get isCalculatedJointGizmo() {
    return this._isCalculatedJointGizmo;
  }

  set isVisible(flg) {
    this._gizmo.isVisible = flg;
  }

  get isVisible() {
    return this._gizmo.isVisible;
  }

  set childJoints(joints) {
    this._childJoints = joints;
  }

  get childJoints() {
    return this._childJoints;
  }

  set jointsOfParentHierarchies(joints) {
    this._jointsOfParentHierarchies = joints;
  }

  get jointsOfParentHierarchies() {
    return this._jointsOfParentHierarchies;
  }

  updateGizmoDisplay() {
    this._gizmo.update();
  }

  clone() {
    let instance = new M_Joint(this._glBoostContext);
    this._copy(instance);
    return instance;
  }

  _copy(instance) {
    super._copy(instance);
  }

}

GLBoost['M_Joint'] = M_Joint;
