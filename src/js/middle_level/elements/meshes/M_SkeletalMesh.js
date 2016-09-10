import GLBoost from '../../../globals';
import M_Mesh from './M_Mesh';
import M_Joint from '../skeletons/M_Joint';
import Matrix44 from '../../../low_level/math/Matrix44';

export default class M_SkeletalMesh extends M_Mesh {
  constructor(glBoostContext, geometry, material, rootJointName) {
    super(glBoostContext, geometry, material, rootJointName);
    this._rootJointName = rootJointName;
    this._jointsHierarchy = null;
    this._inverseBindMatrices = [];
    this._bindShapeMatrix = Matrix44.identity();
    this._jointNames = [];
    this._joints = [];
  }

  prepareToRender(existCamera_f, lights, renderPasses) {
    this.bakeTransformToGeometry();
    this.multiplyMatrix(Matrix44.identity());
    let joints = this.jointsHierarchy.searchElementsByType(M_Joint);

    this._joints = [];

    for (let i=0; i<this._jointNames.length; i++) {
      for (let j=0; j<joints.length; j++) {
        if (this._jointNames[i] === joints[j]._userFlavorName) {
          this._joints.push(joints[j]);
          //this._inverseBindMatrices.push(this._rawInverseBindMatrices[j]);
        }
      }
    }
    //this._joints = joints;

    super.prepareToRender(existCamera_f, lights, renderPasses);
  }

  set jointsHierarchy(jointsHierarchy) {
    this._jointsHierarchy = jointsHierarchy;
  }

  get jointsHierarchy() {
    return this._jointsHierarchy;
  }

  get rootJointName() {
    return this._rootJointName;
  }

  set inverseBindMatrices(inverseBindMatrices) {
    this._inverseBindMatrices = inverseBindMatrices;
    this._geometry.setExtraDataForShader('jointN', (inverseBindMatrices.length < 4) ? 4 : inverseBindMatrices.length);
  }

  get inverseBindMatrices() {
    return this._inverseBindMatrices;
  }

  set bindShapeMatrix(matrix) {
    this._bindShapeMatrix = matrix;
  }
  get bindShapeMatrix() {
    return this._bindShapeMatrix;
  }

  set jointNames(names) {
    this._jointNames = names;
  }
  get jointNames() {
    return this._jointNames;
  }
}

GLBoost['M_SkeletalMesh'] = M_SkeletalMesh;
