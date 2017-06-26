import M_Element from '../M_Element';
import M_JointGizmo from '../gizmos/M_JointGizmo';
import Matrix44 from '../../../low_level/math/Matrix44';
import Vector3 from '../../../low_level/math/Vector3';


export default class M_Joint extends M_Element {
  constructor(glBoostContext, length = 0.32) {
    super(glBoostContext);

    this._gizmo = new M_JointGizmo(glBoostContext, length);
    this._gizmos.push(this._gizmo);

    this._gizmo._mesh.masterElement = this;

    M_Joint._calculatedTransforms = {};
    M_Joint._calculatedTranslates = {};
  }

  static registerCalculatedTransforms(instanceNameOfJoint, mat4) {
    M_Joint._calculatedTransforms[instanceNameOfJoint] = mat4;
  }

  static getCalculatedTransforms(instanceNameOfJoint) {
    return M_Joint._calculatedTransforms[instanceNameOfJoint];
  }

  get transformMatrixAccumulatedAncestry() {
    let matrix =  M_Joint.getCalculatedTransforms(this.instanceName);
    if (!matrix) {
      return super.transformMatrixAccumulatedAncestry;
    }
    return matrix;
//    return Matrix44.multiply(M_Joint.getCalculatedTransforms(this.instanceName), Matrix44.rotateX(Math.PI/2));
  }

  set scale(vec3) {
    this._gizmo._mesh.scale = vec3;
  }

  get scale() {
    return this._gizmo._mesh.scale.clone();
  }

  set childJointTransformMatrix(mat4) {
    this._gizmo._mesh.multiplyMatrix(mat4);
  }

  get childJointTransformMatrix() {
    return this._gizmo._mesh._matrixAccumulatedAncestry();
  }

  set isVisible(flg) {
    this._gizmo.isVisible = flg;
  }

  get isVisible() {
    return this._gizmo.isVisible;
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
