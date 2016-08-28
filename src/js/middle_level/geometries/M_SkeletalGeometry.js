import GLBoost from '../../globals';
import SkeletalShaderSource from '../shaders/SkeletalShader';
import Geometry from '../../low_level/geometries/Geometry';
import M_Joint from '../elements/skeletons/M_Joint';
import Matrix44 from '../../low_level/math/Matrix44';

export default class M_SkeletalGeometry extends Geometry {
  constructor(glBoostContext) {
    super(glBoostContext);

  }

  draw(lights, camera, skeletalMesh, scene, renderPass_index) {
    var gl = this._glContext.gl;
    if (this._materials.length > 0) {
      var materials = this._materials;
    } else if (skeletalMesh.material){
      var materials = [skeletalMesh.material];
    } else {
      var materials = [];
    }


    var calcParentJointsMatricesRecursively = (joint)=> {
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

    var joints = skeletalMesh.jointsHierarchy.searchElementsByType(M_Joint);
    var matrices = [];

    for (let i=0; i<joints.length; i++) {

      let jointsHierarchy = calcParentJointsMatricesRecursively(joints[i]);
      if (jointsHierarchy == null) {
        jointsHierarchy = [];
      }
      jointsHierarchy.push(joints[i]);
      //console.log(jointsHierarchy);
      let tempMatrices = [];

      let mapTable = [];
      for (let j = 0; j < jointsHierarchy.length; j++) {
        for (let k = 0; k < joints.length; k++) {
          if (jointsHierarchy[j].userFlavorName === joints[k].userFlavorName) {
            mapTable[j] = k;
          }
        }
      }

      // skip if there are incomplete joint data
      let doContinue = false;
      for (let j = 0; j < jointsHierarchy.length; j++) {
        if (typeof mapTable[j] === 'undefined') {
          doContinue = true;
          break;
        }
      }
      if (doContinue) {
        matrices[i] = Matrix44.identity();
        continue;
      }

      for (let j = 0; j < jointsHierarchy.length; j++) {

        let pivotJoint = joints[mapTable[j]];

        let inverseBindPoseMatrix = null;
        if (typeof pivotJoint.inverseBindPoseMatrix === 'undefined') {
          inverseBindPoseMatrix = joints[mapTable[Math.max(j-1, 0)]].inverseBindPoseMatrix;
          if (!inverseBindPoseMatrix) {
            inverseBindPoseMatrix = Matrix44.identity();
          }
        } else {
          inverseBindPoseMatrix = pivotJoint.inverseBindPoseMatrix;
        }

        let rotateMatrix = Matrix44.multiply(Matrix44.invert(jointsHierarchy[j].parent.getTransformMatrixOnlyRotateNotAnimated()), (jointsHierarchy[j].parent.transformMatrixOnlyRotate));
        //let rotateMatrix = (jointsHierarchy[j].parent.transformMatrixOnlyRotate);

        let thisLoopMatrix = Matrix44.multiply(Matrix44.invert(inverseBindPoseMatrix), Matrix44.multiply(rotateMatrix, inverseBindPoseMatrix));

        if (j > 0) {
          tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);

        } else {
          tempMatrices[j] = thisLoopMatrix;
        }

      }
      matrices[i] = tempMatrices[jointsHierarchy.length - 1];

    }
    var flatMatrices = [];
    for (let i=0; i<matrices.length; i++) {
      Array.prototype.push.apply(flatMatrices, matrices[i].flattenAsArray());
    }

    if (matrices.length < 4) {
      let identityMatrices = [];
      for (let i=0; i<(4 - matrices.length); i++) {
        Array.prototype.push.apply(identityMatrices,
          [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]
        );
      }
      Array.prototype.push.apply(flatMatrices, identityMatrices);
    }

    for (let i=0; i<materials.length;i++) {
      var glslProgram = materials[i].shaderInstance.glslProgram;
      gl.useProgram(glslProgram);
      gl.uniformMatrix4fv(glslProgram.skinTransformMatrices, false, new Float32Array(flatMatrices));
    }

    super.draw(lights, camera, skeletalMesh, scene, renderPass_index);
  }

  prepareToRender(existCamera_f, pointLight, meshMaterial, skeletalMesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.

    if (this._materials.length > 0) {
      this._materialForSkeletal = this._materials[0];
    } else if (meshMaterial) {
      this._materialForSkeletal = meshMaterial;
    } else {
      this._materialForSkeletal = this._defaultMaterial;
    }

    class SkeletalShader extends this._materialForSkeletal.shaderClass {
      constructor(glBoostContext, basicShader) {
        super(glBoostContext, basicShader);
        SkeletalShader.mixin(SkeletalShaderSource);
      }
    }

    if (this._materials.length > 0) {
      for (let i=0; i<this._materials.length; i++) {
        this._materials[i].shaderClass = SkeletalShader;
      }
    } else if (meshMaterial) {
      meshMaterial.shaderClass = SkeletalShader;
    } else {
      this._defaultMaterial.shaderClass = SkeletalShader;
    }


    let joints = skeletalMesh.jointsHierarchy.searchElementsByType(M_Joint);
    for (let i=0; i<joints.length; i++) {
      //skeletalMesh.inverseBindMatrices[i] = Matrix44.invert(joints[i].transformMatrixAccumulatedAncestry);
      let matrix = joints[i].parent.transformMatrixOnlyRotateOnInit;
      joints[i].inverseMatrix = Matrix44.invert(matrix);
      //joints[i].inverseMatrix = Matrix44.identity();
    }

    var calcParentJointsMatricesRecursively = (joint)=> {
      let children = joint.parent.parent._elements;
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

    for (let i=0; i<joints.length; i++) {

      let jointsHierarchy = calcParentJointsMatricesRecursively(joints[i]);
      if (jointsHierarchy == null) {
        jointsHierarchy = [];
      }
      jointsHierarchy.push(joints[i]);
      //console.log(jointsHierarchy);
      let tempMatrices = [];


      let mapTable = [];
      for (let j = 0; j < jointsHierarchy.length; j++) {
        for (let k = 0; k < joints.length; k++) {
          if (jointsHierarchy[j].userFlavorName === joints[k].userFlavorName) {
            mapTable[j] = k;
          }
        }
      }

      // skip if there are incomplete joint data
      let doContinue = false;
      for (let j = 0; j < jointsHierarchy.length; j++) {
        if (typeof mapTable[j] === 'undefined') {
          doContinue = true;
          break;
        } else if (mapTable[j] >= skeletalMesh.inverseBindMatrices.length) {
          doContinue = true;
          break;
        }
      }
      if (doContinue) {
        continue;
      }

      for (let j = 0; j < jointsHierarchy.length; j++) {

        let thisLoopMatrix = null;

        //thisLoopMatrix = Matrix44.invert(joints[mapTable[j]].parent.transformMatrixOnlyRotateOnInit);

        //if (j==0) {
        if (false) {
          thisLoopMatrix = Matrix44.identity();
        } else if (typeof skeletalMesh.inverseBindMatrices[mapTable[j]] === 'undefined') {
          thisLoopMatrix = Matrix44.identity();
        } else {
          thisLoopMatrix = (skeletalMesh.inverseBindMatrices[mapTable[j]].clone());
        }

        thisLoopMatrix.m03 = 0;
        thisLoopMatrix.m13 = 0;
        thisLoopMatrix.m23 = 0;
        thisLoopMatrix.m30 = 0;
        thisLoopMatrix.m31 = 0;
        thisLoopMatrix.m32 = 0;

        if (j > 0) {
//        if (false) {
          //tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);
        } else {
          tempMatrices[j] = thisLoopMatrix;
          //tempMatrices[j] = Matrix44.identity();
        }
      }
      joints[i].inverseRotateMatrix = Matrix44.invert(tempMatrices[tempMatrices.length - 1]);

      joints[i].inverseBindPoseMatrix = skeletalMesh.inverseBindMatrices[mapTable[jointsHierarchy.length - 1]];
      /*
      joints[i].inverseBindPoseMatrix.m03 = 10;
      joints[i].inverseBindPoseMatrix.m13 = 10;
      joints[i].inverseBindPoseMatrix.m23 = 10;
      joints[i].inverseBindPoseMatrix.m30 *= 0.01;
      joints[i].inverseBindPoseMatrix.m31 *= 0.01;
      joints[i].inverseBindPoseMatrix.m32 *= 0.01;
      */

    }


    super.prepareToRender(existCamera_f, pointLight, meshMaterial, skeletalMesh);
  }
}
