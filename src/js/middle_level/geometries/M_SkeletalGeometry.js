import GLBoost from '../../globals';
import SkeletalShaderSource from '../shaders/SkeletalShader';
import Geometry from '../../low_level/geometries/Geometry';
import M_Joint from '../elements/skeletons/M_Joint';
import M_Group from '../elements/M_Group';
import Matrix44 from '../../low_level/math/Matrix44';
import FreeShader from '../shaders/FreeShader';
import Shader from '../../low_level/shaders/Shader';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export default class M_SkeletalGeometry extends Geometry {
  constructor(glBoostContext) {
    super(glBoostContext);

  }

  draw(expression, lights, camera, skeletalMesh, scene, renderPass_index) {
    var gl = this._glContext.gl;
    if (this._materials.length > 0) {
      var materials = this._materials;
    } else if (skeletalMesh.material){
      var materials = [skeletalMesh.material];
    } else {
      var materials = [];
    }

    var joints = skeletalMesh._joints;
    var matrices = [];

    let areThereAnyJointsWhichHaveAnimation = false;
//    let areThereAnyJointsWhichHaveAnimation = true;
    for (let i=0; i<joints.length; i++) {
      if (typeof joints[i].parent._getCurrentAnimationInputValue(joints[i].parent._activeAnimationLineName) !== 'undefined') {
        areThereAnyJointsWhichHaveAnimation = true;
      }
    }

    // 24 19
    for (let i=0; i<joints.length; i++) {
      if (i != 24) {
        //joints[i].isVisible = false;
      }
      for (let j = 0; j < joints[i].jointsOfParentHierarchies.length; j++) {

        if (j === joints[i].jointsOfParentHierarchies.length - 1) {
//          joints[i].jointsOfParentHierarchies[j].isVisible = false;
        } else {
//          joints[i].jointsOfParentHierarchies[j].isVisible = true;
        }
/*
        if (joints[i].isCalculatedJointGizmo) {
          break;
        }

        if (j>0) {
          let backOfJointMatrix = Matrix44.identity();
          let tipOfJointMatrix = Matrix44.identity();
          let currentJoint = joints[i].jointsOfParentHierarchies[joints[i].jointsOfParentHierarchies.length - 1];
          let parentJoint = joints[i].jointsOfParentHierarchies[joints[i].jointsOfParentHierarchies.length - 2];
          tipOfJointMatrix = currentJoint.parent.transformMatrix;

          let tipOfJointPos = tipOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();
          let backOfJointPos = backOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();
          parentJoint.relativeVectorToJointTip = Vector3.subtract(tipOfJointPos, backOfJointPos);
        }
        */
      }
    }


    for (let i=0; i<joints.length; i++) {
      if (joints[i].isCalculatedJointGizmo) {
        break;
      }

      let backOfJointMatrix = Matrix44.identity();
      let tipOfJointMatrix = null;
      let childJoints = joints[i].childJoints;
      if (childJoints.length > 0) {
        //backOfJointMatrix = childJoints[0].parent.transformMatrixAccumulatedAncestry;
        tipOfJointMatrix = Matrix44.multiply(backOfJointMatrix, childJoints[0].transformMatrix);
        //tipOfJointMatrix = childJoints[0].transformMatrixAccumulatedAncestry;
      } else {
        tipOfJointMatrix = backOfJointMatrix.clone();
      }

      let tipOfJointPos = tipOfJointMatrix.multiplyVector(Vector4.zero());//.toVector3();
      let backOfJointPos = backOfJointMatrix.multiplyVector(Vector4.zero());//.toVector3();
      //let backOfJointPos = joints[i].parent.transformMatrix.multiplyVector(Vector4.zero()).toVector3();
      joints[i].relativeVectorToJointTip = Vector3.subtract(tipOfJointPos, backOfJointPos);
/*
      joints[i].relativeVectorToJointTip = Matrix44.invert(skeletalMesh.transformMatrixAccumulatedAncestry).multiplyVector(
        Vector3.subtract(tipOfJointPos.toVector3(), backOfJointPos.toVector3()).toVector4()).toVector3();
*/
    }

    for (let i=0; i<joints.length; i++) {
//      matrices[i] = Matrix44.invert(skeletalMesh.transformMatrixAccumulatedAncestry);
      matrices[i] = Matrix44.identity();
      let globalJointTransform = null;
      let inverseBindMatrix = (typeof skeletalMesh.inverseBindMatrices[i] !== 'undefined') ? skeletalMesh.inverseBindMatrices[i] : Matrix44.identity();
      if (areThereAnyJointsWhichHaveAnimation) {
        globalJointTransform = joints[i].transformMatrixAccumulatedAncestry;
      } else {
        globalJointTransform = skeletalMesh.transformMatrixAccumulatedAncestry;
        let inverseMat = Matrix44.multiply(Matrix44.invert(skeletalMesh.bindShapeMatrix), Matrix44.invert(inverseBindMatrix));
        globalJointTransform = Matrix44.multiply(skeletalMesh.transformMatrixAccumulatedAncestry, inverseMat);
      }
      matrices[i] = Matrix44.multiply(matrices[i], globalJointTransform);
      joints[i].jointPoseMatrix = matrices[i].clone();
      matrices[i] = Matrix44.multiply(matrices[i], inverseBindMatrix);
      matrices[i] = Matrix44.multiply(matrices[i], skeletalMesh.bindShapeMatrix);
      //joints[i].jointPoseMatrix = matrices[i].clone();
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
      this._glContext.useProgram(glslProgram);
      Shader.trySettingMatrix44ToUniform(gl, glslProgram.hashId, materials[i], materials[i]._semanticsDic, 'JOINTMATRIX', new Float32Array(flatMatrices));
    }

    super.draw(expression, lights, camera, skeletalMesh, scene, renderPass_index);
  }

  prepareToRender(expression, existCamera_f, pointLight, meshMaterial, skeletalMesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.

    if (this._materials.length > 0) {
      this._materialForSkeletal = this._materials[0];
    } else if (meshMaterial) {
      this._materialForSkeletal = meshMaterial;
    } else {
      this._materialForSkeletal = this._defaultMaterial;
    }

    if (!(this._materialForSkeletal.shaderInstance !== null && this._materialForSkeletal.shaderInstance.constructor === FreeShader)) {

      class SkeletalShader extends this._materialForSkeletal.shaderClass {
        constructor(glBoostContext, basicShader) {
          super(glBoostContext, basicShader);
          SkeletalShader.mixin(SkeletalShaderSource);
        }
      }

      if (this._materials.length > 0) {
        for (let i = 0; i < this._materials.length; i++) {
          if (this._materials[i].shaderClass.name !== SkeletalShader.name) {
            this._materials[i].shaderClass = SkeletalShader;
          }
        }
      } else if (meshMaterial) {
        if (meshMaterial.shaderClass.name !== SkeletalShader.name) {
          meshMaterial.shaderClass = SkeletalShader;
        }
      } else {
        if (this._defaultMaterial.shaderClass.name !== SkeletalShader.name) {
          this._defaultMaterial.shaderClass = SkeletalShader;
        }
      }
    }

    super.prepareToRender(expression, existCamera_f, pointLight, meshMaterial, skeletalMesh);
  }
}
