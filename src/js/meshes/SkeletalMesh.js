import GLBoost from './../globals';
import Mesh from './Mesh';

export default class SkeletalMesh extends Mesh {
  constructor(geometry, material, jointName) {
    super(geometry, material, jointName);
    this._rootJointName = jointName;
    this._jointsHierarchy = null;
    this._inverseBindMatrices = [];
  }

  set jointsHierarchy(jointsHierarchy) {
    this._jointsHierarchy = jointsHierarchy;
  }

  get rootJointName() {
    return this._rootJointName;
  }

  set inverseBindMatrices(inverseBindMatrices) {
    this._inverseBindMatrices = inverseBindMatrices;
  }
}

GLBoost['SkeletalMesh'] = SkeletalMesh;
