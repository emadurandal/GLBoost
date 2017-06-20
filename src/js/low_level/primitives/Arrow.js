import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export default class Arrow extends Geometry {
  constructor(glBoostContext, length, lineCount = 1) {
    super(glBoostContext);

    this._setupVertexData(length, lineCount);
  }

  _setupVertexData(length, lineCount) {

    let arrowheadWidth = length/10;
    let arrowheadLength = length/7.5;
    let stickLength = length - arrowheadLength;
    let halfLength = length/2;

    let positions = [];

    for (let i=0; i<lineCount; i++) {
      let lineOffset = i - lineCount/2;
      // Stick part
      positions.push(new Vector3(0, lineOffset, halfLength));
      positions.push(new Vector3(0, lineOffset, -stickLength+halfLength));

      // 1st line of a triangle
      positions.push(new Vector3(arrowheadWidth, lineOffset, -stickLength+halfLength));
      positions.push(new Vector3(-arrowheadWidth, lineOffset, -stickLength+halfLength));

      // 2nd line of a triangle
      positions.push(new Vector3(-arrowheadWidth, lineOffset, -stickLength+halfLength));
      positions.push(new Vector3(0, lineOffset, -length+halfLength));

      // 3rd line of a triangle
      positions.push(new Vector3(0, lineOffset, -length+halfLength));
      positions.push(new Vector3(arrowheadWidth, lineOffset, -stickLength+halfLength));
    }

    this.setVerticesData({
      position: positions
    }, null, GLBoost.LINES);
  }

}

GLBoost["Arrow"] = Arrow;
