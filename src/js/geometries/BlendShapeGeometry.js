import GLBoost from './../globals';
import BlendShapeShaderSource from './../shaders/BlendShapeShader';
import Geometry from './Geometry';

export default class BlendShapeGeometry extends Geometry {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    super(canvas);

    this._blendWeight_1  = 0.0;
    this._blendWeight_2  = 0.0;
    this._blendWeight_3  = 0.0;
    this._blendWeight_4  = 0.0;
    this._blendWeight_5  = 0.0;
    this._blendWeight_6  = 0.0;
    this._blendWeight_7  = 0.0;
    this._blendWeight_8  = 0.0;
    this._blendWeight_9  = 0.0;
    this._blendWeight_10 = 0.0;

    this._currentRenderPassIndex = 0;

  }


  draw(lights, camera, mesh, scene, renderPass_index) {
    this._currentRenderPassIndex = renderPass_index;
    super.draw(lights, camera, mesh, scene, renderPass_index);
  }

  prepareForRender(existCamera_f, pointLight, meshMaterial, renderPasses, mesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
    var canvas = this._canvas;

    if (meshMaterial) {
      this._materialForBlend = meshMaterial;
    } else {
      this._materialForBlend = this._defaultMaterial;
    }

    class BlendShapeShader extends this._materialForBlend.shaderClass {
      constructor(canvas) {
        super(canvas);
        BlendShapeShader.mixin(BlendShapeShaderSource);
      }
    }

    if (meshMaterial) {
      meshMaterial.shaderClass = BlendShapeShader;
    } else {
      this._defaultMaterial.shaderClass = BlendShapeShader;
    }

    /*
    let materials = this._materials;
    if (materials) {
      for (let i=0; i<materials.length;i++) {
        materials[i].shader = new BlendShapeShader(this._canvas);
      }
    }
    */

    super.prepareForRender(existCamera_f, pointLight, meshMaterial, renderPasses, mesh);
  }

  _setBlendWeightToGlslProgram(blendTarget, weight) {
    var gl = this._glContext.gl;
    var materials = [this._materialForBlend];
    if (materials) {
      for (let i=0; i<materials.length;i++) {
        gl.useProgram(materials[i].glslProgramOfPasses[this._currentRenderPassIndex]);
        gl.uniform1f(materials[i].glslProgramOfPasses[this._currentRenderPassIndex]['uniformFloatSampler_blendWeight_' + blendTarget], weight);
      }
    } else {
      gl.useProgram(this.glslProgramOfPasses[this._currentRenderPassIndex]);
      gl.uniform1f(this.glslProgramOfPasses[this._currentRenderPassIndex]['uniformFloatSampler_blendWeight_' + blendTarget], weight);
    }
  }

  set blendWeight_1(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET1, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_1 = weight;
  }
  get blendWeight_1() {
    return this._blendWeight_1;
  }

  set blendWeight_2(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET2, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_2 = weight;
  }
  get blendWeight_2() {
    return this._blendWeight_2;
  }

  set blendWeight_3(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET3, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_3 = weight;
  }
  get blendWeight_3() {
    return this._blendWeight_3;
  }

  set blendWeight_4(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET4, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_4 = weight;
  }
  get blendWeight_4() {
    return this._blendWeight_4;
  }

  set blendWeight_5(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET5, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_5 = weight;
  }
  get blendWeight_5() {
    return this._blendWeight_5;
  }

  set blendWeight_6(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET6, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_6 = weight;
  }
  get blendWeight_6() {
    return this._blendWeight_6;
  }

  set blendWeight_7(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET7, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_7 = weight;
  }
  get blendWeight_7() {
    return this._blendWeight_7;
  }

  set blendWeight_8(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET8, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_8 = weight;
  }
  get blendWeight_8() {
    return this._blendWeight_8;
  }

  set blendWeight_9(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET9, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_9 = weight;
  }
  get blendWeight_9() {
    return this._blendWeight_9;
  }

  set blendWeight_10(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET10, weight);
    gl.useProgram(currentProgram);
    this._blendWeight_10 = weight;
  }
  get blendWeight_10() {
    return this._blendWeight_10;
  }

}

GLBoost['BlendShapeGeometry'] = BlendShapeGeometry;
