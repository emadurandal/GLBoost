import GLBoost from './globals'
import Element from './Element'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import BlendShapeShaderSource from './shaders/BlendShapeShader'
import Geometry from './Geometry'

export default class BlendShapeGeometry extends Geometry {
  constructor(canvas) {
    super(canvas);

    if (this.constructor === BlendShapeGeometry) {
      BlendShapeGeometry._instanceCount = (typeof BlendShapeGeometry._instanceCount === "undefined") ? 0 : (BlendShapeGeometry._instanceCount + 1);
      this._instanceName = BlendShapeGeometry.name + '_' + BlendShapeGeometry._instanceCount;
    }
  }

  prepareForRender(existCamera_f, pointLight, meshMaterial) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
    var canvas = this._canvas;

    if (meshMaterial) {
      this._materialForBlend = meshMaterial;
    } else {
      this._materialForBlend = this._defaultMaterial;
    }

    class BlendShapeShader extends this._materialForBlend.shader.constructor {
      constructor(canvas) {
        super(canvas);
        BlendShapeShader.mixin(BlendShapeShaderSource);
      }
    }

    if (meshMaterial) {
      meshMaterial.shader = new BlendShapeShader(canvas);
      } else {
      this._defaultMaterial.shader = new BlendShapeShader(canvas);
    }

    /*
    let materials = this._materials;
    if (materials) {
      for (let i=0; i<materials.length;i++) {
        materials[i].shader = new BlendShapeShader(this._canvas);
      }
    }
    */

    super.prepareForRender(existCamera_f, pointLight, meshMaterial);
  }

  _setBlendWeightToGlslProgram(blendTarget, weight) {
    var materials = [this._materialForBlend];
    if (materials) {
      for (let i=0; i<materials.length;i++) {
        this._gl.useProgram(materials[i].glslProgram);
        this._gl.uniform1f(materials[i].glslProgram['uniformFloatSampler_blendWeight_' + blendTarget], weight);
      }
    } else {
      this._gl.useProgram(this._glslProgram);
      this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + blendTarget], weight);
    }
  }

  set blendWeight_1(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET1, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_2(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET2, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_3(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET3, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_4(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET4, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_5(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET5, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_6(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET6, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_7(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET7, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_8(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET8, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_9(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET9, weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_10(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET10, weight);
    gl.useProgram(currentProgram);
  }

  toString() {
    return this._instanceName;
  }
}

GLBoost["BlendShapeGeometry"] = BlendShapeGeometry;
