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
    return BlendShapeShader.getInstance(this.canvas).getShaderProgram(result, existCamera_f);
  }

  set blendWeight_1(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET1], weight);
  }
  set blendWeight_2(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET2], weight);
  }
  set blendWeight_3(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET3], weight);
  }
  set blendWeight_4(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET4], weight);
  }
  set blendWeight_5(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET5], weight);
  }
  set blendWeight_6(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET6], weight);
  }
  set blendWeight_7(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET7], weight);
  }
  set blendWeight_8(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET8], weight);
  }
  set blendWeight_9(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET9], weight);
  }
  set blendWeight_10(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET10], weight);
  }

}

GLBoost["BlendShapeMesh"] = BlendShapeMesh;
