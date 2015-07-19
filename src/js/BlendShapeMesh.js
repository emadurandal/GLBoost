import GLBoost from './globals'
import Element from './Element'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import BlendShapeShader from './BlendShapeShader'
import Mesh from './Mesh'

export default class BlendShapeMesh extends Mesh {
  constructor() {
    super();
  }

  _getSheder(result) {
    return BlendShapeShader.getInstance().getShaderProgram(result);
  }

  set blendWeight_1(weight) {
    this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET1], weight);
  }
}

GLBoost["BlendShapeMesh"] = BlendShapeMesh;
