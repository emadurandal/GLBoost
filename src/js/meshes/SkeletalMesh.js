import Mesh from './Mesh';

export default class SkeletalMesh extends Mesh {
  constructor(geometry, material, jointName) {
    super(geometry, material, jointName);
    this._rootJointName = jointName;
  }

}