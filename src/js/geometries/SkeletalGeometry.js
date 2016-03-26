import GLBoost from './../globals';
import SkeletalShaderSource from './../shaders/SkeletalShader';
import Geometry from './Geometry';
import Joint from '../skeletons/Joint';
import Matrix44 from '../math/Matrix44';

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

    var joints = skeletalMesh.jointsHierarchy.searchElementsByType(Joint);
    var matrices = [];

    for (let i=0; i<joints.length; i++) {
      matrices[i] = Matrix44.multiply(Matrix44.invert(skeletalMesh.inverseBindMatrices[i]), Matrix44.multiply(joints[i].rotateMatrixAccumulatedAncestry, skeletalMesh.inverseBindMatrices[i]));
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

    class SkeletalShader extends this._materialForSkeletal.shader.constructor {
      constructor(canvas) {
        super(canvas);
        SkeletalShader.mixin(SkeletalShaderSource);
      }
    }

    if (this._materials.length > 0) {
      for (let i=0; i<this._materials.length; i++) {
        this._materials[i].shader = new SkeletalShader(canvas);
      }
    } else if (meshMaterial) {
      meshMaterial.shader = new SkeletalShader(canvas);
    } else {
      this._defaultMaterial.shader = new SkeletalShader(canvas);
    }


    //skeletalMesh.jointsHierarchy.multiplyMatrix(skeletalMesh.jointsHierarchy.transformMatrix.multiply(Matrix44.invert(skeletalMesh.transformMatrix)));


    super.prepareForRender(existCamera_f, pointLight, meshMaterial, renderPasses, skeletalMesh);
  }
}

GLBoost['SkeletalGeometry'] = SkeletalGeometry;
