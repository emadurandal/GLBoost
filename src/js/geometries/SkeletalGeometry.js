import GLBoost from './../globals';
import SkeletalShaderSource from './../shaders/SkeletalShader';
import Geometry from './Geometry';

export default class SkeletalGeometry extends Geometry {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    super(canvas);

  }

  draw(lights, camera, mesh, scene, renderPass_index) {
    super.draw(lights, camera, mesh, scene, renderPass_index);
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

    /*
     let materials = this._materials;
     if (materials) {
     for (let i=0; i<materials.length;i++) {
     materials[i].shader = new BlendShapeShader(this._canvas);
     }
     }
     */

    super.prepareForRender(existCamera_f, pointLight, meshMaterial, renderPasses, skeletalMesh);
  }
}

GLBoost['SkeletalGeometry'] = SkeletalGeometry;
