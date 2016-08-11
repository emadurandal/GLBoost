import GLBoost from '../../globals';
import SkeletalShaderSource from '../../middle_level/shaders/SkeletalShader';
import Geometry from './Geometry';
import Joint from '../skeletons/Joint';
import Matrix44 from '../../low_level/math/Matrix44';

export default class SkeletalGeometry extends Geometry {
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
        if (children[i] instanceof Joint) {
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

    var joints = skeletalMesh.jointsHierarchy.searchElementsByType(Joint);
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
      for (let j = 0; j < jointsHierarchy.length; j++) {

        let thisLoopMatrix = null;

        let pivotJoint = joints[mapTable[j]];
        let rotateMatrix = Matrix44.multiply(joints[mapTable[j]].inverseMatrix, jointsHierarchy[j].parent.transformMatrixOnlyRotate);
        //rotateMatrix = Matrix44.multiply(jointsHierarchy[j].parent.transformMatrixOnlyRotate, rotateMatrix);

        //let rotateMatrix = Matrix44.multiply(joints[mapTable[j]].inverseRotateMatrix, jointsHierarchy[j].parent.transformMatrixOnlyRotate);
        //let rotateMatrix = Matrix44.multiply(jointsHierarchy[j].parent.transformMatrixOnlyRotate, Matrix44.invert(joints[mapTable[j]].inverseMatrix));
        //let rotateMatrix = Matrix44.multiply(jointsHierarchy[j].parent.transformMatrixOnlyRotate, (joints[mapTable[j]].inverseMatrix));
        //let rotateMatrix = Matrix44.multiply(jointsHierarchy[j].parent.transformMatrixOnlyRotate, joints[mapTable[j]].inverseRotateMatrix);
        //let rotateMatrix = jointsHierarchy[j].parent.transformMatrixOnlyRotate;
        //thisLoopMatrix = Matrix44.multiply(Matrix44.invert(skeletalMesh.inverseBindMatrices[mapTable[j]]), Matrix44.multiply(rotateMatrix, skeletalMesh.inverseBindMatrices[mapTable[j]]));

        thisLoopMatrix = Matrix44.multiply(Matrix44.invert(pivotJoint.inverseBindPoseMatrix), Matrix44.multiply(rotateMatrix, pivotJoint.inverseBindPoseMatrix));
        //thisLoopMatrix = pivotJoint.inverseBindPoseMatrix;


        if (j > 0) {
          tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);
          //tempMatrices[j] = Matrix44.multiply(Matrix44.multiply(tempMatrices[j - 1], joints[mapTable[j-1]].inverseMatrix), thisLoopMatrix);

        } else {
          tempMatrices[j] = thisLoopMatrix;
        }

        /*
        let tempRotateMatrix = thisLoopMatrix.clone();
        tempRotateMatrix.m03 = 0;
        tempRotateMatrix.m13 = 0;
        tempRotateMatrix.m23 = 0;
        tempRotateMatrix.m30 = 0;
        tempRotateMatrix.m31 = 0;
        tempRotateMatrix.m32 = 0;
        let tempTranslateMatrix = new Matrix44(
          1, 0, 0, thisLoopMatrix.m03,
          0, 1, 0, thisLoopMatrix.m13,
          0, 0, 1, thisLoopMatrix.m23,
          0, 0, 0, 1
        );

        tempMatrices[j] = Matrix44.multiply(tempTranslateMatrix, tempRotateMatrix);
        */
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
      gl.uniformMatrix4fv(glslProgram.skinTransformMatrices, false, new Float32Array(flatMatrices));
    }

    super.draw(lights, camera, skeletalMesh, scene, renderPass_index);
  }

  prepareToRender(existCamera_f, pointLight, meshMaterial, skeletalMesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
    var canvas = this._canvas;

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


    let joints = skeletalMesh.jointsHierarchy.searchElementsByType(Joint);
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
        if (children[i] instanceof Joint) {
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


    //var joints = skeletalMesh.jointsHierarchy.searchElementsByType(Joint);
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
      for (let j = 0; j < jointsHierarchy.length; j++) {

        let thisLoopMatrix = null;

//        thisLoopMatrix = joints[mapTable[j]].parent.transformMatrixOnlyRotateOnInit;
        thisLoopMatrix = (skeletalMesh.inverseBindMatrices[mapTable[j]].clone());
        thisLoopMatrix.m03 = 0;
        thisLoopMatrix.m13 = 0;
        thisLoopMatrix.m23 = 0;
        thisLoopMatrix.m30 = 0;
        thisLoopMatrix.m31 = 0;
        thisLoopMatrix.m32 = 0;
        if (j > 0) {
          tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);
        } else {
          tempMatrices[j] = thisLoopMatrix;
        }
      }
      //joints[i].inverseRotateMatrix = (tempMatrices[tempMatrices.length - 1]);
      joints[i].inverseBindPoseMatrix = skeletalMesh.inverseBindMatrices[mapTable[jointsHierarchy.length - 1]];
      joints[i].inverseRotateMatrix = (joints[i].inverseBindPoseMatrix.clone());
      joints[i].inverseRotateMatrix.m03 = 0;
      joints[i].inverseRotateMatrix.m13 = 0;
      joints[i].inverseRotateMatrix.m23 = 0;
      joints[i].inverseRotateMatrix.m30 = 0;
      joints[i].inverseRotateMatrix.m31 = 0;
      joints[i].inverseRotateMatrix.m32 = 0;

    }


    super.prepareToRender(existCamera_f, pointLight, meshMaterial, skeletalMesh);
  }
}

GLBoost['SkeletalGeometry'] = SkeletalGeometry;
