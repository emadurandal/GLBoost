import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export default class Arrow extends Geometry {
  constructor(glBoostContext, length) {
    super(glBoostContext);

    this._setupVertexData(length);
  }

  _setupVertexData(length) {

    let arrowheadWidth = length/10;
    let arrowheadLength = length/7.5;
    let stickLength = length - arrowheadLength;
    let halfLength = length/2;

    let positions = [
      // Stick part
      new Vector3(0, 0, 0+halfLength),
      new Vector3(0, 0, -stickLength+halfLength),

      // 1st line of a triangle
      new Vector3(arrowheadWidth, 0, -stickLength+halfLength),
      new Vector3(-arrowheadWidth, 0, -stickLength+halfLength),

      // 2nd line of a triangle
      new Vector3(-arrowheadWidth, 0, -stickLength+halfLength),
      new Vector3(0, 0, -length+halfLength),

      // 3rd line of a triangle
      new Vector3(0, 0, -length+halfLength),
      new Vector3(arrowheadWidth, 0, -stickLength+halfLength),
    ];

    this.setVerticesData({
      position: positions
    }, null, GLBoost.LINES);
  }

}

GLBoost["Arrow"] = Arrow;
