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

    for (let i=0; i<joints.length; i++) {
//      matrices[i] = Matrix44.invert(skeletalMesh.transformMatrixAccumulatedAncestry);
      matrices[i] = Matrix44.identity();
      let globalJointTransform = null;
      let inverseBindMatrix = (typeof skeletalMesh.inverseBindMatrices[i] !== 'undefined') ? skeletalMesh.inverseBindMatrices[i] : Matrix44.identity();
      if (areThereAnyJointsWhichHaveAnimation) {
        globalJointTransform = joints[i].transformMatrixAccumulatedAncestryForJoints;
      } else {
        globalJointTransform = skeletalMesh.transformMatrixAccumulatedAncestry;
        let inverseMat = Matrix44.multiply(Matrix44.invert(skeletalMesh.bindShapeMatrix), Matrix44.invert(inverseBindMatrix));
        globalJointTransform = Matrix44.multiply(skeletalMesh.transformMatrixAccumulatedAncestry, inverseMat);
      }
      matrices[i] = Matrix44.multiply(matrices[i], globalJointTransform);
      joints[i].jointPoseMatrix = matrices[i].clone();
      matrices[i] = Matrix44.multiply(matrices[i], inverseBindMatrix);
      matrices[i] = Matrix44.multiply(matrices[i], skeletalMesh.bindShapeMatrix);
    }

    for (let i=0; i<joints.length; i++) {

      let backOfJointMatrix = Matrix44.identity();
      let tipOfJointMatrix = null;


      tipOfJointMatrix = joints[i].jointPoseMatrix;
      if (i > 0) {
        let backOfJoint = joints[i].jointsOfParentHierarchies[joints[i].jointsOfParentHierarchies.length - 1];
        if (backOfJoint) {
          backOfJointMatrix = backOfJoint.jointPoseMatrix;
        } else {
          joints[i].isVisible = false;
        }
      } else {
        backOfJointMatrix = joints[0].transformMatrixAccumulatedAncestryForJoints;
      }


      let backOfJointPos = backOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();
      let tipOfJointPos = tipOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();

      joints[i].worldPositionOfThisJoint = tipOfJointPos.clone();
      joints[i].worldPositionOfParentJoint = backOfJointPos.clone();


      joints[i].updateGizmoDisplay();
    }

    let flatMatrices = [];
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
