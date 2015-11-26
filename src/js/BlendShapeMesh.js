import GLBoost from './globals'
import Element from './Element'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import BlendShapeShaderSource from './shaders/BlendShapeShader'
import Mesh from './Mesh'

export default class BlendShapeMesh extends Mesh {
  constructor(canvas) {
    super(canvas);

    class BlendShapeShader extends this._shader_for_non_material.constructor {
      constructor(canvas) {
        super(canvas);
        BlendShapeShader.mixin(BlendShapeShaderSource);
      }
    }

    this._shader_for_non_material = new BlendShapeShader(canvas);
    this._shaderClass = BlendShapeShader;
  }

  prepareForRender(existCamera_f, pointLight) {

    // before prepareForRender of 'Mesh' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
    let materials = this._materials;
    if (materials) {
      for (let i=0; i<materials.length;i++) {
        materials[i].shader = new this._shaderClass(this._canvas);
      }
    }

    super.prepareForRender(existCamera_f, pointLight);
  }

  _setBlendWeightToGlslProgram(blendTarget, weight) {
    var materials = this._materials;
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

}

GLBoost["BlendShapeMesh"] = BlendShapeMesh;
