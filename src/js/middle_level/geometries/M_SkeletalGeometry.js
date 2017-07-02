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
    var globalJointTransform = [];

    let areThereAnyJointsWhichHaveAnimation = false;
    for (let i=0; i<joints.length; i++) {
      if (joints[i].parent._getCurrentAnimationInputValue(joints[i].parent._activeAnimationLineName) >= 0) {
        areThereAnyJointsWhichHaveAnimation = true;
      }
    }

    if (areThereAnyJointsWhichHaveAnimation) {

      for (let i=0; i<joints.length; i++) {
        let tempMatrices = [];

        for (let j = 0; j < joints[i].jointsOfParentHierarchies.length; j++) {
          let thisLoopMatrix = joints[i].jointsOfParentHierarchies[j].parent.transformMatrix;
          if (j > 0) {

            tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);

            if (j === joints[i].jointsOfParentHierarchies.length - 1) {
              joints[i].jointsOfParentHierarchies[j].isVisible = false;
            } else {
              joints[i].jointsOfParentHierarchies[j].isVisible = true;
            }
          } else {
            let upperGroupsAccumulatedMatrix = Matrix44.identity();
            if (typeof joints[i].jointsOfParentHierarchies[0].parent.parent !== 'undefined' && joints[i].jointsOfParentHierarchies[0].parent.parent instanceof M_Group) {
              // if there are group hierarchies above the root joint ...
              upperGroupsAccumulatedMatrix = skeletalMesh.transformMatrixAccumulatedAncestry;
            }
            tempMatrices[j] = upperGroupsAccumulatedMatrix.multiply(thisLoopMatrix);
          }

        }

        globalJointTransform[i] = tempMatrices[joints[i].jointsOfParentHierarchies.length - 1];
      }

      for (let i=0; i<joints.length; i++) {

        let backOfJointMatrix = globalJointTransform[i].clone();
        let tipOfJointMatrix = null;
        let childJoints = joints[i].childJoints;
        if (childJoints.length > 0) {
          tipOfJointMatrix = Matrix44.multiply(backOfJointMatrix, childJoints[0].parent.transformMatrix);
        } else {
          tipOfJointMatrix = backOfJointMatrix.clone();
        }
        let tipOfJointPos = tipOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();
        let backOfJointPos = backOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();
        let length = Vector3.lengthBtw(backOfJointPos, tipOfJointPos);

        joints[i].length = new Vector3(length, length, length);

      }

      for (let i=0; i<joints.length; i++) {
        matrices[i] = Matrix44.multiply(Matrix44.invert(skeletalMesh.transformMatrixAccumulatedAncestry), globalJointTransform[i]);
        let inverseBindMatrix = (typeof skeletalMesh.inverseBindMatrices[i] !== 'undefined') ? skeletalMesh.inverseBindMatrices[i] : Matrix44.identity();
        matrices[i] = Matrix44.multiply(matrices[i], inverseBindMatrix);
        matrices[i] = Matrix44.multiply(matrices[i], skeletalMesh.bindShapeMatrix);
      }
    } else {
      for (let i=0; i<joints.length; i++) {
        matrices[i] = skeletalMesh.bindShapeMatrix;
      }
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
