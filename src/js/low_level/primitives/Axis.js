import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';

export default class Axis extends Geometry {
  constructor(glBoostContext, length) {
    super(glBoostContext);

    this._setupVertexData(length);
  }

  _setupVertexData(length) {

    // to avoid z fighting with GridGizmo
    let nearZeroValue = 0.0001;

    let positions = [
      // X Axis
      new Vector3(0, nearZeroValue, nearZeroValue),
      new Vector3(length,  nearZeroValue, nearZeroValue),

      // Y Axis
      new Vector3(nearZeroValue, 0, nearZeroValue),
      new Vector3(nearZeroValue, length, nearZeroValue),

      // Z Axis
      new Vector3(nearZeroValue, nearZeroValue, 0),
      new Vector3(nearZeroValue, nearZeroValue, length),
    ];

    let colors = [
      // X Axis
      new Vector4(1, 0, 0, 1),
      new Vector4(1, 0, 0, 1),

      // Y Axis
      new Vector4(0, 1, 0, 1),
      new Vector4(0, 1, 0, 1),

      // Z Axis
      new Vector4(0, 0, 1, 1),
      new Vector4(0, 0, 1, 1),
    ];

    this.setVerticesData({
      position: positions,
      color: colors
    }, null, GLBoost.LINES);
  }

}

GLBoost["Axis"] = Axis;
