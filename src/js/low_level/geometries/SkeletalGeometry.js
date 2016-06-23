import GLBoost from '../../globals';
import SkeletalShaderSource from '../../middle_level/shaders/SkeletalShader';
import Geometry from './Geometry';
import Joint from '../skeletons/Joint';
import Matrix44 from '../../low_level/math/Matrix44';

export default class SkeletalGeometry extends Geometry {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    super(canvas);

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
      let children = joint.parent.parent._children;
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
        let rotateMatrix = null;
        //let basicRotateMat = Matrix44.multiply(Matrix44.invert(jointsHierarchy[j].parent.transformMatrixOnlyRotate), (joints[mapTable[j]].inverceMatrix));
        //let basicRotateMat = Matrix44.multiply(Matrix44.invert(jointsHierarchy[j].parent.transformMatrixOnlyRotate), Matrix44.invert(joints[mapTable[j]].inverceMatrix));
        let basicRotateMat = Matrix44.multiply((Matrix44.invert(jointsHierarchy[j].parent.transformMatrixOnlyRotate)), Matrix44.invert(joints[mapTable[j]].inverceMatrix));
        if (j > 0) {
          //let parentMat = Matrix44.multiply(basicRotateMat, jointsHierarchy[j-1].parent.transformMatrixOnlyRotate);
          let parentMat = Matrix44.multiply(Matrix44.multiply(Matrix44.invert(jointsHierarchy[j-1].parent.transformMatrixOnlyRotate), Matrix44.invert(joints[mapTable[j-1]].inverceMatrix)), (basicRotateMat));

          rotateMatrix = Matrix44.multiply(Matrix44.multiply(jointsHierarchy[j].parent.transformMatrixOnlyRotate, joints[mapTable[j]].inverceMatrix), Matrix44.invert(parentMat));
        } else {
          rotateMatrix = Matrix44.multiply(((jointsHierarchy[j].parent.transformMatrixOnlyRotate)), (joints[mapTable[j]].inverceMatrix));
        }
        //let rotateMatrix = jointsHierarchy[j].parent.transformMatrixOnlyRotate;
        thisLoopMatrix = Matrix44.multiply(Matrix44.invert(skeletalMesh.inverseBindMatrices[mapTable[j]]), Matrix44.multiply(rotateMatrix, skeletalMesh.inverseBindMatrices[mapTable[j]]));
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
      Array.prototype.push.apply(flatMatrices, matrices[i].flatten());
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
      var glslProgram = materials[i].glslProgramOfPasses[renderPass_index];
      gl.uniformMatrix4fv(glslProgram.skinTransformMatrices, false, new Float32Array(flatMatrices));
    }

    super.draw(lights, camera, skeletalMesh, scene, renderPass_index);
  }

  prepareForRender(existCamera_f, pointLight, meshMaterial, renderPasses, skeletalMesh) {
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
      constructor(canvas, basicShader) {
        super(canvas, basicShader);
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
      joints[i].inverceMatrix = Matrix44.invert(matrix);
      //joints[i].inverceMatrix = Matrix44.identity();
    }


    /*
    var calcParentJointsMatricesRecursively = (joint)=> {
      let children = joint.parent.parent._children;
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

        thisLoopMatrix = joints[mapTable[j]].parent.transformMatrixOnlyRotateOnInit;
        if (j > 0) {
          tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);
        } else {
          tempMatrices[j] = thisLoopMatrix;
        }
      }
      joints[i].inverceMatrix = Matrix44.invert(tempMatrices[jointsHierarchy.length - 1]);

    }
    */
    super.prepareForRender(existCamera_f, pointLight, meshMaterial, renderPasses, skeletalMesh);
  }
}

GLBoost['SkeletalGeometry'] = SkeletalGeometry;
