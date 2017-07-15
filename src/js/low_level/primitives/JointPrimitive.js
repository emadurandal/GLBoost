import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export default class JointPrimitive extends Geometry {
  constructor(glBoostContext, length, lineCount = 1) {
    super(glBoostContext);

    this._setupVertexData(length, lineCount);
  }

  _setupVertexData(length, lineCount) {

    let arrowheadWidth = length/15;
    let arrowheadLength = length/7.5;
    let stickLength = length - arrowheadLength;
    let halfLength = 0;//length/2;

    let positions = [];

    for (let i=0; i<lineCount; i++) {
/*
      // Short Pyramid
      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(arrowheadLength, arrowheadWidth, arrowheadWidth));

      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, arrowheadWidth));

      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(arrowheadLength, arrowheadWidth, -arrowheadWidth));

      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth , -arrowheadWidth));

      // Plane
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, -arrowheadWidth));
      positions.push(new Vector3(arrowheadLength, arrowheadWidth, -arrowheadWidth));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, -arrowheadWidth));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, arrowheadWidth));
      positions.push(new Vector3(arrowheadLength, arrowheadWidth, -arrowheadWidth));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, -arrowheadWidth));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, arrowheadWidth));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, -arrowheadWidth));

      // Long Pyramid
      positions.push(new Vector3(length, 0, 0));
      positions.push(new Vector3(arrowheadLength, arrowheadWidth, arrowheadWidth));

      positions.push(new Vector3(length, 0, 0));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, arrowheadWidth));

      positions.push(new Vector3(length, 0, 0));
      positions.push(new Vector3(arrowheadLength, arrowheadWidth, -arrowheadWidth));

      positions.push(new Vector3(length, 0, 0));
      positions.push(new Vector3(arrowheadLength, -arrowheadWidth, -arrowheadWidth));

*/

      // Short Pyramid
      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(arrowheadWidth, arrowheadWidth, arrowheadLength));

      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(-arrowheadWidth, arrowheadWidth, arrowheadLength));

      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(arrowheadWidth, -arrowheadWidth, arrowheadLength));

      positions.push(new Vector3(0, 0, 0));
      positions.push(new Vector3(-arrowheadWidth, -arrowheadWidth, arrowheadLength));

      // Plane
      positions.push(new Vector3(-arrowheadWidth, -arrowheadWidth, arrowheadLength));
      positions.push(new Vector3(arrowheadWidth, -arrowheadWidth, arrowheadLength));
      positions.push(new Vector3(-arrowheadWidth, -arrowheadWidth, arrowheadLength));
      positions.push(new Vector3(-arrowheadWidth, arrowheadWidth, arrowheadLength));
      positions.push(new Vector3(arrowheadWidth, -arrowheadWidth, arrowheadLength));
      positions.push(new Vector3(-arrowheadWidth, -arrowheadWidth, arrowheadLength));
      positions.push(new Vector3(-arrowheadWidth, arrowheadWidth, arrowheadLength));
      positions.push(new Vector3(-arrowheadWidth, -arrowheadWidth, arrowheadLength));

      // Long Pyramid
      positions.push(new Vector3(0, 0, length));
      positions.push(new Vector3(arrowheadWidth, arrowheadWidth, arrowheadLength));

      positions.push(new Vector3(0, 0, length));
      positions.push(new Vector3(-arrowheadWidth, arrowheadWidth, arrowheadLength));

      positions.push(new Vector3(0, 0, length));
      positions.push(new Vector3(arrowheadWidth, -arrowheadWidth, arrowheadLength));

      positions.push(new Vector3(0, 0, length));
      positions.push(new Vector3(-arrowheadWidth, -arrowheadWidth, arrowheadLength));
    }

    this.setVerticesData({
      position: positions
    }, null, GLBoost.LINES);
  }

}

GLBoost["JointPrimitive"] = JointPrimitive;
