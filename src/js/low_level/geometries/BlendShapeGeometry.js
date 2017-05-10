import GLBoost from '../../globals';
import BlendShapeShaderSource from '../../middle_level/shaders/BlendShapeShader';
import Geometry from './Geometry';

export default class BlendShapeGeometry extends Geometry {
  constructor(glBoostContext) {
    super(glBoostContext);

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
    this._materialForBlend = null;
  }


  draw(lights, camera, mesh, scene, renderPass_index) {
    this._currentRenderPassIndex = renderPass_index;
    super.draw(lights, camera, mesh, scene, renderPass_index);
  }

  prepareToRender(expression, existCamera_f, pointLight, meshMaterial, mesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.

    if (meshMaterial) {
      this._materialForBlend = meshMaterial;
    } else {
      this._materialForBlend = this._defaultMaterial;
    }


    class BlendShapeShader extends this._materialForBlend.shaderClass {
      constructor(glBoostContext, basicShader) {
        super(glBoostContext, basicShader);
        BlendShapeShader.mixin(BlendShapeShaderSource);
      }
    }

    this._materialForBlend.shaderClass = BlendShapeShader;

    super.prepareToRender(expression, existCamera_f, pointLight, meshMaterial, mesh);
  }

  _setBlendWeightToGlslProgram(blendTarget, weight) {
    let gl = this._glContext.gl;
    let materials = [this._materialForBlend];
    for (let i=0; i<materials.length;i++) {
      this._glContext.useProgram(materials[i].shaderInstance.glslProgram);
      gl.uniform1f(materials[i]['uniform_FloatSampler_blendWeight_' + blendTarget], weight);
    }
  }

  set blendWeight_1(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET1, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_1 = weight;
  }
  get blendWeight_1() {
    return this._blendWeight_1;
  }

  set blendWeight_2(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET2, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_2 = weight;
  }
  get blendWeight_2() {
    return this._blendWeight_2;
  }

  set blendWeight_3(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET3, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_3 = weight;
  }
  get blendWeight_3() {
    return this._blendWeight_3;
  }

  set blendWeight_4(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET4, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_4 = weight;
  }
  get blendWeight_4() {
    return this._blendWeight_4;
  }

  set blendWeight_5(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET5, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_5 = weight;
  }
  get blendWeight_5() {
    return this._blendWeight_5;
  }

  set blendWeight_6(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET6, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_6 = weight;
  }
  get blendWeight_6() {
    return this._blendWeight_6;
  }

  set blendWeight_7(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET7, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_7 = weight;
  }
  get blendWeight_7() {
    return this._blendWeight_7;
  }

  set blendWeight_8(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET8, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_8 = weight;
  }
  get blendWeight_8() {
    return this._blendWeight_8;
  }

  set blendWeight_9(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET9, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_9 = weight;
  }
  get blendWeight_9() {
    return this._blendWeight_9;
  }

  set blendWeight_10(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost.BLENDTARGET10, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_10 = weight;
  }
  get blendWeight_10() {
    return this._blendWeight_10;
  }

}

GLBoost['BlendShapeGeometry'] = BlendShapeGeometry;
