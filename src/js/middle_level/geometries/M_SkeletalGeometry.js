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
import Quaternion from '../../low_level/math/Quaternion';
import MathUtil from '../../low_level/math/MathUtil';


export default class M_SkeletalGeometry extends Geometry {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._jointMatrices = null;
    this._qArray = null;
    this._tArray = null;    
    this._qtArray = null;
    this._translationScale = 0;
  }

  update(skeletalMesh) {

    var joints = skeletalMesh._joints;
    var matrices = [];

    let areThereAnyJointsWhichHaveAnimation = false;

    for (let i=0; i<joints.length; i++) {
      if (typeof joints[i].parent._getCurrentAnimationInputValue(joints[i].parent._activeAnimationLineName) !== 'undefined') {
        areThereAnyJointsWhichHaveAnimation = true;
      }
    }

    let input = joints[0]._getCurrentAnimationInputValue('time');

    let jointZeroTransformMatrixAccumulatedAncestry = null;
    let skeletalMeshTransformMatrixAccumulatedAncestry = null;
    for (let i=joints.length-1; i>=0; i--) {
      let globalJointTransform = null;
      let inverseBindMatrix = (typeof skeletalMesh.inverseBindMatrices[i] !== 'undefined') ? skeletalMesh.inverseBindMatrices[i] : Matrix44.identity();
      if (areThereAnyJointsWhichHaveAnimation) {
        globalJointTransform = joints[i].getTransformMatrixAccumulatedAncestryForJointsAt(input);
      } else {
        globalJointTransform = skeletalMesh.getTransformMatrixAccumulatedAncestryAt(input);
        skeletalMeshTransformMatrixAccumulatedAncestry = globalJointTransform;
        let inverseMat = Matrix44.multiply(Matrix44.invert(skeletalMesh.bindShapeMatrix), Matrix44.invert(inverseBindMatrix));
        globalJointTransform = Matrix44.multiply(skeletalMeshTransformMatrixAccumulatedAncestry, inverseMat);
      }
      if (i === 0) {
        jointZeroTransformMatrixAccumulatedAncestry = globalJointTransform;
      }
//      if (true) {
      if (this._materialForSkeletal.shaderInstance.constructor === FreeShader) {
        matrices[i] = Matrix44.invert(skeletalMeshTransformMatrixAccumulatedAncestry);
      } else {
        matrices[i] = Matrix44.identity();
      }
      matrices[i] = Matrix44.multiply(matrices[i], globalJointTransform);
      joints[i].jointPoseMatrix = Matrix44.multiply(Matrix44.identity(), globalJointTransform);
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
        backOfJointMatrix = jointZeroTransformMatrixAccumulatedAncestry;
      }


      let backOfJointPos = backOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();
      let tipOfJointPos = tipOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();

      joints[i].worldPositionOfThisJoint = tipOfJointPos.clone();
      joints[i].worldPositionOfParentJoint = backOfJointPos.clone();


      joints[i].updateGizmoDisplay();
    }

/*
      let s = matrices[i].getScale();
      
      matrices[i].m00 /= s.x;
      matrices[i].m01 /= s.x;
      matrices[i].m02 /= s.x;
      matrices[i].m10 /= s.y;
      matrices[i].m11 /= s.y;
      matrices[i].m12 /= s.y;
      matrices[i].m20 /= s.z;
      matrices[i].m21 /= s.z;
      matrices[i].m22 /= s.z;
      
      let q = (Quaternion.quaternionFromRotationMatrix(matrices[i]));
      q.normalize();
      let t = matrices[i].getTranslate();
      let matrix = q.rotationMatrix;
      
      matrix.m00 *= s.x;
      matrix.m01 *= s.x;
      matrix.m02 *= s.x;
      matrix.m10 *= s.y;
      matrix.m11 *= s.y;
      matrix.m12 *= s.y;
      matrix.m20 *= s.z;
      matrix.m21 *= s.z;
      matrix.m22 *= s.z;
      
      matrix.putTranslate(t);
      matrices[i] = matrix;
    }
    */

    if (!GLBoost.VALUE_TARGET_IS_MOBILE) {

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
      this._jointMatrices = flatMatrices;

    } else {
      /*

      {
        // no comporess

        this._qArray = new Float32Array(matrices.length * 4);
        this._tArray = new Float32Array(matrices.length * 3);

        for (let i=0; i<matrices.length; i++) {
          let q = (Quaternion.quaternionFromRotationMatrix(matrices[i]));
          q.normalize();
          this._qArray[i*4+0] = q.x;
          this._qArray[i*4+1] = q.y;
          this._qArray[i*4+2] = q.z;
          this._qArray[i*4+3] = q.w;
          let t = matrices[i].getTranslate();
          this._tArray[i*3+0] = t.x;
          this._tArray[i*3+1] = t.y;
          this._tArray[i*3+2] = t.z;
        }
      }
      */
      /*
      {
        // comporess quaternion only

        this._qArray = new Float32Array(matrices.length * 2);
        this._tArray = new Float32Array(matrices.length * 3);

        for (let i=0; i<matrices.length; i++) {
          let q = (Quaternion.quaternionFromRotationMatrix(matrices[i]));
          q.normalize();
          let vec2QPacked = MathUtil.packNormalizedVec4ToVec2(q.x, q.y, q.z, q.w, 4096);
          this._qArray[i*2+0] = vec2QPacked[0];
          this._qArray[i*2+1] = vec2QPacked[1];
          let t = matrices[i].getTranslate();
          this._tArray[i*3+0] = t.x;
          this._tArray[i*3+1] = t.y;
          this._tArray[i*3+2] = t.z;
        }
      }
      */

      
      {
        // comporess both of quaternion and traslation

        this._qtArray = new Float32Array(matrices.length * 4);
        let tXArray = [];
        let tYArray = [];
        let tZArray = [];
        for (let i=0; i<matrices.length; i++) {
          let t = matrices[i].getTranslate();        
          tXArray.push(Math.abs(t.x));
          tYArray.push(Math.abs(t.y));
          tZArray.push(Math.abs(t.z));
        }

        this._translationScale = new Vector3();
        let maxX = Math.max.apply(null, tXArray);
        let maxY = Math.max.apply(null, tYArray);
        let maxZ = Math.max.apply(null, tZArray);
        this._translationScale.x = maxX*1.1;
        this._translationScale.y = maxY*1.1;
        this._translationScale.z = maxZ*1.1;

        // console.log('getScale are ...');
        for (let i=0; i<matrices.length; i++) {
          let s = matrices[i].getScale();
          // console.log(s.toString());


          let q = (Quaternion.quaternionFromRotationMatrix(matrices[i]));
          q.normalize();
          let vec2QPacked = MathUtil.packNormalizedVec4ToVec2(q.x, q.y, q.z, q.w, 4096);
          let t = matrices[i].getTranslate();
          this._qtArray[i*4+0] = vec2QPacked[0];
          this._qtArray[i*4+1] = vec2QPacked[1];
          let vec2TPacked = MathUtil.packNormalizedVec4ToVec2(
            t.x/this._translationScale.x, t.y/this._translationScale.y,
            t.z/this._translationScale.z, 0.0, 4096);
          this._qtArray[i*4+2] = vec2TPacked[0];
          this._qtArray[i*4+3] = vec2TPacked[1];
        }
      }
    }    

  }

  draw(expression, lights, camera, skeletalMesh, scene, renderPass_index) {
    if (this._jointMatrices === null && this._qtArray === null) {
      return;
    }
    var gl = this._glContext.gl;
    if (this._materials.length > 0) {
      var materials = this._materials;
    } else if (skeletalMesh.material){
      var materials = [skeletalMesh.material];
    } else {
      var materials = [];
    }

    for (let i=0; i<materials.length;i++) {
      var glslProgram = materials[i].shaderInstance.glslProgram;
      this._glContext.useProgram(glslProgram);
      
      if (!GLBoost.VALUE_TARGET_IS_MOBILE) {
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINTMATRIX', new Float32Array(this._jointMatrices));
      } else {
 //     Shader.trySettingVec4ArrayToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINT_QUATERNION', this._qArray);
//      Shader.trySettingVec2ArrayToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINT_QUATERNION', this._qArray);
 //     Shader.trySettingVec3ArrayToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINT_TRANSLATION', this._tArray);      
        Shader.trySettingVec4ArrayToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINT_QUATTRANSLATION', this._qtArray);//
        this._glContext.uniform3f(materials[i].getUniform(glslProgram, 'uniform_translationScale'),
          this._translationScale.x, this._translationScale.y, this._translationScale.z, true);
      }
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

    return super.prepareToRender(expression, existCamera_f, pointLight, meshMaterial, skeletalMesh);
  }
}
