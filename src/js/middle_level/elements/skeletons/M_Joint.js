import M_Element from '../M_Element';
import M_JointGizmo from '../gizmos/M_JointGizmo';
import Vector3 from '../../../low_level/math/Vector3';


export default class M_Joint extends M_Element {
  constructor(glBoostContext, length = 1.0) {
    super(glBoostContext);

    this._gizmo = new M_JointGizmo(glBoostContext, length);
    this._gizmos.push(this._gizmo);

    this._gizmo._mesh.masterElement = this;

    M_Joint._calculatedTransforms = {};
    M_Joint._calculatedTranslates = {};
    this._childJoints = [];
    this._jointsOfParentHierarchies = [];

    this.length = new Vector3(length, length, length);
  }

  set length(vec3) {
    this._gizmo._mesh.scale = vec3;
  }

  get length() {
    return this._gizmo._mesh.scale.clone().x;
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

  clone() {
    let instance = new M_Joint(this._glBoostContext);
    this._copy(instance);
    return instance;
  }

  _copy(instance) {
    super._copy(instance);
  }
}
