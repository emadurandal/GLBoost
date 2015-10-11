import GLBoost from './globals'
import Element from './Element'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import BlendShapeShader from './BlendShapeShader'
import Mesh from './Mesh'

export default class BlendShapeMesh extends Mesh {
  constructor(canvas) {
    super(canvas);
  }

  _getSheder(result, existCamera_f) {
    var blendShapeShader = BlendShapeShader.getInstance(this.canvas);
    return blendShapeShader.getShaderProgram(result, existCamera_f);
  }

  set blendWeight_1(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET1], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_2(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET2], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_3(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET3], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_4(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET4], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_5(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET5], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_6(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET6], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_7(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET7], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_8(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET8], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_9(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET9], weight);
    gl.useProgram(currentProgram);
  }
  set blendWeight_10(weight) {
    var gl = this._gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(this._glslProgram);
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET10], weight);
    gl.useProgram(currentProgram);
  }

}

GLBoost["BlendShapeMesh"] = BlendShapeMesh;
