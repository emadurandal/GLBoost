import GLBoost from '../../globals';
import SkeletalShaderSource from '../shaders/SkeletalShader';
import Geometry from '../../low_level/geometries/Geometry';
import M_Joint from '../elements/skeletons/M_Joint';
import M_Group from '../elements/M_Group';
import Matrix44 from '../../low_level/math/Matrix44';
import FreeShader from '../shaders/FreeShader';
import Shader from '../../low_level/shaders/Shader';

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

    var joints = skeletalMesh._joints;//skeletalMesh.jointsHierarchy.searchElementsByType(M_Joint);
    var matrices = [];
    var globalJointTransform = [];

    if (joints[0].parent._getCurrentAnimationInputValue(joints[0].parent._activeAnimationLineName) < 0) {
      // if not set input value
      for (let i=0; i<joints.length; i++) {
        matrices[i] = skeletalMesh.bindShapeMatrix;
      }
    } else {
      for (let i=0; i<joints.length; i++) {

        let jointsHierarchy = calcParentJointsMatricesRecursively(joints[i]);
        if (jointsHierarchy == null) {
          jointsHierarchy = [];
        }
        jointsHierarchy.push(joints[i]);
        //console.log(jointsHierarchy);
        let tempMatrices = [];

        for (let j = 0; j < jointsHierarchy.length; j++) {
          let thisLoopMatrix = jointsHierarchy[j].parent.transformMatrix;
          //console.log(thisLoopMatrix.toStringApproximately());
          if (j > 0) {
            tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);
          } else {
            let upperGroupsAccumulatedMatrix = Matrix44.identity();
            if (typeof jointsHierarchy[0].parent.parent != 'undefined' && jointsHierarchy[0].parent.parent instanceof M_Group) {
              // if there are group hierarchies above the root joint ...
              upperGroupsAccumulatedMatrix = skeletalMesh.transformMatrixAccumulatedAncestry;
            }
            tempMatrices[j] = upperGroupsAccumulatedMatrix.multiply(thisLoopMatrix);
          }
        }
        globalJointTransform[i] = tempMatrices[jointsHierarchy.length - 1];

      }
      for (let i=0; i<joints.length; i++) {
        matrices[i] = Matrix44.multiply(Matrix44.invert(skeletalMesh.transformMatrixAccumulatedAncestry), globalJointTransform[i]);
        let inverseBindMatrix = (typeof skeletalMesh.inverseBindMatrices[i] !== 'undefined') ? skeletalMesh.inverseBindMatrices[i] : Matrix44.identity();
        matrices[i] = Matrix44.multiply(matrices[i], inverseBindMatrix);
        matrices[i] = Matrix44.multiply(matrices[i], skeletalMesh.bindShapeMatrix);
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
      gl.useProgram(glslProgram);
      Shader.trySettingMatrix44ToUniform(gl, glslProgram, glslProgram._semanticsDic, 'JOINTMATRIX', new Float32Array(flatMatrices));
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

    super.prepareToRender(existCamera_f, pointLight, meshMaterial, skeletalMesh);
  }
}
