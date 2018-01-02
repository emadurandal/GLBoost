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

    this._skeletalShaderSpecified = null;
    this._skeletalShaderNormal = null;
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
        globalJointTransform = joints[i].getTransformMatrixAccumulatedAncestryAt(input);
      } else {
        globalJointTransform = skeletalMesh.getTransformMatrixAccumulatedAncestryAt(input);
        skeletalMeshTransformMatrixAccumulatedAncestry = globalJointTransform;
        let inverseMat = Matrix44.invert(inverseBindMatrix);
        globalJointTransform = Matrix44.multiply(skeletalMeshTransformMatrixAccumulatedAncestry, inverseMat);
      }
      if (i === 0) {
        jointZeroTransformMatrixAccumulatedAncestry = globalJointTransform;
      }
//      if (true) {
      if (this._materialForSkeletals[0].shaderInstance.constructor === FreeShader) {
        matrices[i] = Matrix44.invert(skeletalMeshTransformMatrixAccumulatedAncestry);
      } else {
        matrices[i] = Matrix44.identity();
      }
      matrices[i] = Matrix44.multiply(matrices[i], globalJointTransform);
      joints[i].jointPoseMatrix = Matrix44.multiply(Matrix44.identity(), globalJointTransform);
      matrices[i] = Matrix44.multiply(matrices[i], inverseBindMatrix);
      matrices[i] = Matrix44.multiply(matrices[i], skeletalMesh.bindShapeMatrix);
    }

    if (joints[0].isVisible) {
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
      skeletalMesh._jointMatrices = flatMatrices;

    } else {
      /*

      {
        // no comporess

        skeletalMesh._qArray = new Float32Array(matrices.length * 4);
        skeletalMesh._tArray = new Float32Array(matrices.length * 3);

        for (let i=0; i<matrices.length; i++) {
          let q = (Quaternion.quaternionFromRotationMatrix(matrices[i]));
          q.normalize();
          skeletalMesh._qArray[i*4+0] = q.x;
          skeletalMesh._qArray[i*4+1] = q.y;
          skeletalMesh._qArray[i*4+2] = q.z;
          skeletalMesh._qArray[i*4+3] = q.w;
          let t = matrices[i].getTranslate();
          tskeletalMeshis._tArray[i*3+0] = t.x;
          skeletalMesh._tArray[i*3+1] = t.y;
          skeletalMesh._tArray[i*3+2] = t.z;
        }
      }
      */
      /*
      {
        // comporess quaternion only

        skeletalMesh._qArray = new Float32Array(matrices.length * 2);
        skeletalMesh._tArray = new Float32Array(matrices.length * 3);

        for (let i=0; i<matrices.length; i++) {
          let q = (Quaternion.quaternionFromRotationMatrix(matrices[i]));
          q.normalize();
          let vec2QPacked = MathUtil.packNormalizedVec4ToVec2(q.x, q.y, q.z, q.w, 4096);
          skeletalMesh._qArray[i*2+0] = vec2QPacked[0];
          skeletalMesh._qArray[i*2+1] = vec2QPacked[1];
          let t = matrices[i].getTranslate();
          skeletalMesh._tArray[i*3+0] = t.x;
          skeletalMesh._tArray[i*3+1] = t.y;
          skeletalMesh._tArray[i*3+2] = t.z;
        }
      }
      */

      
      {
        // comporess both of quaternion and traslation

        skeletalMesh._qtArray = new Float32Array(matrices.length * 4);
        let tXArray = [];
        let tYArray = [];
        let tZArray = [];
        for (let i=0; i<matrices.length; i++) {
          let t = matrices[i].getTranslate();        
          tXArray.push(Math.abs(t.x));
          tYArray.push(Math.abs(t.y));
          tZArray.push(Math.abs(t.z));
        }

        skeletalMesh._translationScale = new Vector3();
        let maxX = Math.max.apply(null, tXArray);
        let maxY = Math.max.apply(null, tYArray);
        let maxZ = Math.max.apply(null, tZArray);
        skeletalMesh._translationScale.x = maxX*1.1;
        skeletalMesh._translationScale.y = maxY*1.1;
        skeletalMesh._translationScale.z = maxZ*1.1;

        // console.log('getScale are ...');
        for (let i=0; i<matrices.length; i++) {
          let s = matrices[i].getScale();
          // console.log(s.toString());


          let q = (Quaternion.quaternionFromRotationMatrix(matrices[i]));
          q.normalize();
          let vec2QPacked = MathUtil.packNormalizedVec4ToVec2(q.x, q.y, q.z, q.w, 4096);
          let t = matrices[i].getTranslate();
          skeletalMesh._qtArray[i*4+0] = vec2QPacked[0];
          skeletalMesh._qtArray[i*4+1] = vec2QPacked[1];
          let vec2TPacked = MathUtil.packNormalizedVec4ToVec2(
            t.x/skeletalMesh._translationScale.x, t.y/skeletalMesh._translationScale.y,
            t.z/skeletalMesh._translationScale.z, 0.0, 4096);
            skeletalMesh._qtArray[i*4+2] = vec2TPacked[0];
            skeletalMesh._qtArray[i*4+3] = vec2TPacked[1];
        }
      }
    }    

  }

  drawIntermediate(gl, glslProgram, skeletalMesh, material) {
    if (skeletalMesh._jointMatrices === null && skeletalMesh._qtArray === null) {
      return;
    }
/*
    var gl = this._glContext.gl;
    if (this._materials.length > 0) {
      var materials = this._materials;
    } else if (skeletalMesh.material){
      var materials = [skeletalMesh.material];
    } else {
      var materials = [];
    }
    */

//    for (let i=0; i<materials.length;i++) {
      //var glslProgram = materials[i].shaderInstance.glslProgram;
//      this._glContext.useProgram(glslProgram);
      
      if (!GLBoost.VALUE_TARGET_IS_MOBILE) {
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'JOINTMATRIX', new Float32Array(skeletalMesh._jointMatrices));
      } else {
 //     Shader.trySettingVec4ArrayToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINT_QUATERNION', skeletalMesh._qArray);
//      Shader.trySettingVec2ArrayToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINT_QUATERNION', skeletalMesh._qArray);
 //     Shader.trySettingVec3ArrayToUniform(gl, glslProgram, materials[i], materials[i]._semanticsDic, 'JOINT_TRANSLATION', skeletalMesh._tArray);      
        Shader.trySettingVec4ArrayToUniform(gl, glslProgram, material, material._semanticsDic, 'JOINT_QUATTRANSLATION', skeletalMesh._qtArray);//
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_translationScale'),
        skeletalMesh._translationScale.x, skeletalMesh._translationScale.y, skeletalMesh._translationScale.z, true);
      }
  //  }

    //super.draw(expression, lights, camera, skeletalMesh, scene, renderPass_index);
  }

  prepareToRender(expression, existCamera_f, pointLight, meshMaterial, skeletalMesh, shaderClassSpecified = void 0, argMaterials = void 0) {

    if (argMaterials !== void 0) {
      this._materialForSkeletals = argMaterials;
    } else {
      if (this._materials.length > 0) {
        this._materialForSkeletals = this._materials;
      } else if (meshMaterial) {
        this._materialForSkeletals = [meshMaterial];
      } else {
        this._materialForSkeletals = [this._defaultMaterial];
      }  
    }

      let derrivedClass = null;    
      if (!(this._materialForSkeletals[0].shaderInstance && this._materialForSkeletals[0].shaderInstance.constructor === FreeShader)) {
    
        let baseClass = null;
        if (shaderClassSpecified) {
          baseClass = shaderClassSpecified;
          class SkeletalShader extends baseClass {
            constructor(glBoostContext, basicShader) {
              super(glBoostContext, basicShader);
              SkeletalShader.mixin(SkeletalShaderSource);
            }
          }
          derrivedClass = SkeletalShader;
          this._skeletalShaderSpecified = derrivedClass;
        } else {
          for (let materialForSkeletal of this._materialForSkeletals) {
            
            baseClass = materialForSkeletal.shaderClass;
            class SkeletalShader extends baseClass {
              constructor(glBoostContext, basicShader) {
                super(glBoostContext, basicShader);
                SkeletalShader.mixin(SkeletalShaderSource);
              }
            }
            derrivedClass = SkeletalShader;
          }
          
          this._skeletalShaderNormal = derrivedClass;
        }

        for (let i = 0; i < this._materialForSkeletals.length; i++) {
          if (shaderClassSpecified) {
//            derrivedClass = SkeletalShader;
          } else {
            if (this._materialForSkeletals[i].shaderClass.name !== derrivedClass.name) {
              this._materialForSkeletals[i].shaderClass = derrivedClass;
            }
          }
        }
      }

      return super.prepareToRender(expression, existCamera_f, pointLight, meshMaterial, skeletalMesh, derrivedClass, argMaterials);
    }
}
