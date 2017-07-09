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

  prepareToRender(expression, existCamera_f, lights, renderPasses) {
    let joints = this.jointsHierarchy.searchElementsByType(M_Joint);

    this._joints = [];

    // sort joints according to jointNames
    for (let i=0; i<this._jointNames.length; i++) {
      for (let j=0; j<joints.length; j++) {
        if (this._jointNames[i] === joints[j]._userFlavorName) {
          this._joints.push(joints[j]);
          break;
        }
      }
    }

    const calcParentJointsMatricesRecursively = (joint)=> {
      let children = joint.parent.parent.getChildren();
      let parentJoint = null;
      for (let i=0; i<children.length; i++) {
        if (children[i] instanceof M_Joint) {
          parentJoint = children[i];
        }
      }

      let results = [];
      if (parentJoint) {
        let result = calcParentJointsMatricesRecursively(parentJoint);
        if (Array.isArray(result)) {
          Array.prototype.push.apply(results, result);
        }

        results.push(parentJoint);

        return results;
      }

      return null;
    };

    let jointsParentHierarchies = null;
    for (let i=0; i<this._joints.length; i++) {
      jointsParentHierarchies = calcParentJointsMatricesRecursively(this._joints[i]);
      if (jointsParentHierarchies == null) {
        jointsParentHierarchies = [];
      }
      jointsParentHierarchies.push(this._joints[i]);

      let children = this._joints[i].parent.getChildren();
      let childJoints = [];
      for (let child of children) {
        if (child.className === 'M_Group') {
          let childJoint = child.getAnyJointAsChild();
          if (childJoint) {
            childJoints.push(childJoint);
          }
        }
      }
      this._joints[i].childJoints = childJoints;
      this._joints[i].jointsOfParentHierarchies = jointsParentHierarchies;
    }
    super.prepareToRender(expression, existCamera_f, lights, renderPasses);
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

  clone(clonedOriginalRootElement = this, clonedRootElement = null, onCompleteFuncs = []) {
    let instance = new M_SkeletalMesh(this._glBoostContext, this.geometry, this.material, this._rootJointName);
    this._copy(instance, clonedOriginalRootElement, clonedRootElement, onCompleteFuncs);

    return instance;
  }

  _copy(instance, clonedOriginalRootElement, clonedRootElement, onCompleteFuncs) {
    super._copy(instance);

    instance._jointsHierarchy = this._jointsHierarchy.clone();
    instance._inverseBindMatrices = this._inverseBindMatrices;
    instance._bindShapeMatrix = this._bindShapeMatrix;
    instance._jointNames = this._jointNames;
    instance._joints = this._joints;

    onCompleteFuncs.push((function(clonedSkeletalMesh, _clonedRootElement, jointRootGroupUserFlavorName) {
      return function() {
        let clonedJointRootGroup = _clonedRootElement.searchElement(jointRootGroupUserFlavorName);
        clonedSkeletalMesh._jointsHierarchy = clonedJointRootGroup;
      }
    })(instance, clonedRootElement, this._jointsHierarchy.userFlavorName));
  }
}

GLBoost['M_SkeletalMesh'] = M_SkeletalMesh;
