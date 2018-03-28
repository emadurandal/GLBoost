import GLBoost from '../../../globals';
import M_Mesh from './M_Mesh';
import M_Joint from '../skeletons/M_Joint';
import Matrix44 from '../../../low_level/math/Matrix44';
import Vector4 from '../../../low_level/math/Vector4';
import Vector3 from '../../../low_level/math/Vector3';
import AABB from '../../../low_level/math/AABB';


export default class M_SkeletalMesh extends M_Mesh {
  constructor(glBoostContext, geometry, material, rootJointName) {
    super(glBoostContext, geometry, material, rootJointName);
    this._rootJointName = rootJointName;
    this._jointsHierarchy = null;
    this._inverseBindMatrices = [];
    this._bindShapeMatrix = Matrix44.identity();
    this._jointNames = [];
    this._joints = [];

    // these are calculated by M_SkeletalGeometry
    this._jointMatrices = null;
    this._qArray = null;
    this._tArray = null;    
    this._qtArray = null;
    this._translationScale = 0;

  }

  prepareToRender(expression, existCamera_f, lights, renderPasses) {
    let joints = this.jointsHierarchy.searchElementsByType(M_Joint);

    this._joints = [];

    // sort & choice joints according to jointNames for skinning
    let jointCount=0;
    for (let i=0; i<this._jointNames.length; i++) {
      for (let j=0; j<joints.length; j++) {
        if (this._jointNames[i] === joints[j]._userFlavorName) {
          this._joints.push(joints[j]);
          joints[j].skeletalMesh = this;
//          joints[j].isVisible = true;
          let inverseBindMatrix = (this._inverseBindMatrices[jointCount] !== void 0) ? this._inverseBindMatrices[jointCount] : Matrix44.identity(); 
          joints[j].inverseBindMatrix = inverseBindMatrix;
          joints[j].bindMatrix = Matrix44.invert(inverseBindMatrix);
          jointCount++;
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

        for (let jointName of this._jointNames) {
          if (parentJoint.userFlavorName === jointName) {
            results.push(parentJoint);
            return results;
          }
        }

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
      //jointsParentHierarchies.push(this._joints[i]);

      this._joints[i].jointsOfParentHierarchies = jointsParentHierarchies;
    }
    super.prepareToRender(expression, existCamera_f, lights, renderPasses);


    let lengthCenterToCorner = AABB.multiplyMatrix(this._joints[0].worldMatrix,
      this.rawAABBInLocal).lengthCenterToCorner;
    for (let i=0; i<this._joints.length; i++) {
      this._joints[i].width = lengthCenterToCorner / 100;
    }
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

  set isSkeletonVisible(flg) {
    for (let joint of this._joints) {
      joint.isGizmoVisible = flg;
    }
  }

  get isSkeletonVisible() {
    return this._joints[0].isGizmoVisible;
  }

  
  get rootJointsWorldPosition() {
    if (this._joints.length > 0) {
      const rootJointMatrix = this._joints[0].worldMatrix;
      let rootJointPosWorld = rootJointMatrix.multiplyVector(Vector4.zero()).toVector3();
      return rootJointPosWorld;
    }
    return Vector3.zero();
  }
  

  getRootJointsWorldPositionAt(inputValue) {
    if (this._joints.length > 0) {
      const rootJointMatrix = this._joints[0].getWorldMatrixAt(inputValue);
      let rootJointPosWorld = rootJointMatrix.multiplyVector(Vector4.zero()).toVector3();
      return rootJointPosWorld;
    }

    return Vector3.zero();
  }

  /*
  get rootJointsWorldPositionAsBindPose() {
    if (this._joints.length > 0) {
      const rootJointMatrix = this._joints[0].worldMatrixAsForJointsBindPose;
      let rootJointPosWorld = rootJointMatrix.multiplyVector(Vector4.zero()).toVector3();
      return rootJointPosWorld;
    }

    return Vector3.zero();
  }
  */
}

GLBoost['M_SkeletalMesh'] = M_SkeletalMesh;
