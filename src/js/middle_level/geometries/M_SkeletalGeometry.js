import GLBoost from '../../globals';
import SkeletalShaderSource from '../shaders/SkeletalShader';
import Geometry from '../../low_level/geometries/Geometry';
import M_Joint from '../elements/skeletons/M_Joint';
import M_Group from '../elements/M_Group';
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

    var joints = skeletalMesh._joints;//skeletalMesh.jointsHierarchy.searchElementsByType(M_Joint);
    var matrices = [];
    var globalJointTransform = [];
    var inverseBindPoseMatrices = [];
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
        globalJointTransform[i] = Matrix44.identity();
        continue;
      }

      for (let j = 0; j < jointsHierarchy.length; j++) {
        let thisLoopMatrix = jointsHierarchy[j].parent.transformMatrix;
        inverseBindPoseMatrices[mapTable[j]] = skeletalMesh.inverseBindMatrices[mapTable[j]];//joints[mapTable[j]].inverseBindPoseMatrix;
        if (j > 0) {
          tempMatrices[j] = Matrix44.multiply(tempMatrices[j - 1], thisLoopMatrix);
        } else {
          tempMatrices[j] = thisLoopMatrix;
        }
      }
      globalJointTransform[i] = tempMatrices[jointsHierarchy.length - 1];

      //matrices[i] = Matrix44.multiply(globalJointTransform[i], inverseBindPoseMatrices[i]);
    }
    for (let i=0; i<joints.length; i++) {

      matrices[i] = Matrix44.multiply(Matrix44.invert(skeletalMesh.transformMatrixAccumulatedAncestry), globalJointTransform[i]);
      matrices[i] = Matrix44.multiply(matrices[i], skeletalMesh.inverseBindMatrices[i]);
      matrices[i] = Matrix44.multiply(matrices[i], skeletalMesh.bindShapeMatrix);
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

    super.prepareToRender(existCamera_f, pointLight, meshMaterial, skeletalMesh);
  }
}
