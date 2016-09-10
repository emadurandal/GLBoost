import GLBoost from '../../../globals';
import M_Mesh from './M_Mesh';
import Matrix44 from '../../../low_level/math/Matrix44';

export default class M_SkeletalMesh extends M_Mesh {
  constructor(glBoostContext, geometry, material, rootJointName) {
    super(glBoostContext, geometry, material, rootJointName);
    this._rootJointName = rootJointName;
    this._jointsHierarchy = null;
    this._inverseBindMatrices = [];
    this._bindShapeMatrix = Matrix44.identity();
  }

  prepareToRender(existCamera_f, lights, renderPasses) {
    this.bakeTransformToGeometry();
    this.multiplyMatrix(Matrix44.identity());
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
}

GLBoost['M_SkeletalMesh'] = M_SkeletalMesh;
