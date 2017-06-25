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

    let arrowheadWidth = length/10;
    let arrowheadLength = length/7.5;
    let stickLength = length - arrowheadLength;
    let halfLength = 0;//length/2;

    let positions = [];

    for (let i=0; i<lineCount; i++) {
      let lineOffset = (i - lineCount/2) * arrowheadWidth;
      let lineOtherOffset = arrowheadWidth;
      if( ( i % 2 ) !== 1 ) {
        lineOtherOffset = -lineOtherOffset;
      }


      // Stick part
      positions.push(new Vector3(-halfLength, lineOtherOffset, lineOffset));
      positions.push(new Vector3(stickLength-halfLength, lineOtherOffset , lineOffset));

      // 1st line of a triangle
      positions.push(new Vector3(stickLength-halfLength, arrowheadWidth+lineOtherOffset, lineOffset));
      positions.push(new Vector3(stickLength-halfLength, -arrowheadWidth+lineOtherOffset, lineOffset));

      // 2nd line of a triangle
      positions.push(new Vector3(stickLength-halfLength, -arrowheadWidth+lineOtherOffset, lineOffset));
      positions.push(new Vector3(length-halfLength, lineOtherOffset, lineOffset));

      // 3rd line of a triangle
      positions.push(new Vector3(length-halfLength, lineOtherOffset, lineOffset));
      positions.push(new Vector3(stickLength-halfLength, arrowheadWidth+lineOtherOffset, lineOffset));

/*
      // Stick part
      positions.push(new Vector3(halfLength, lineOtherOffset, lineOffset));
      positions.push(new Vector3(-stickLength+halfLength, lineOtherOffset , lineOffset));

      // 1st line of a triangle
      positions.push(new Vector3(-stickLength+halfLength, arrowheadWidth+lineOtherOffset, lineOffset));
      positions.push(new Vector3(-stickLength+halfLength, -arrowheadWidth+lineOtherOffset, lineOffset));

      // 2nd line of a triangle
      positions.push(new Vector3(-stickLength+halfLength, -arrowheadWidth+lineOtherOffset, lineOffset));
      positions.push(new Vector3(-length+halfLength, lineOtherOffset, lineOffset));

      // 3rd line of a triangle
      positions.push(new Vector3(-length+halfLength, lineOtherOffset, lineOffset));
      positions.push(new Vector3(-stickLength+halfLength, arrowheadWidth+lineOtherOffset, lineOffset));
/*
      // Stick part
      positions.push(new Vector3(lineOtherOffset, -halfLength, lineOffset));
      positions.push(new Vector3(lineOtherOffset, stickLength-halfLength, lineOffset));

      // 1st line of a triangle
      positions.push(new Vector3(arrowheadWidth+lineOtherOffset, stickLength-halfLength, lineOffset));
      positions.push(new Vector3(-arrowheadWidth+lineOtherOffset, stickLength-halfLength, lineOffset));

      // 2nd line of a triangle
      positions.push(new Vector3(-arrowheadWidth+lineOtherOffset, stickLength-halfLength, lineOffset));
      positions.push(new Vector3(lineOtherOffset, length-halfLength, lineOffset));

      // 3rd line of a triangle
      positions.push(new Vector3(lineOtherOffset, length-halfLength, lineOffset));
      positions.push(new Vector3(arrowheadWidth+lineOtherOffset, stickLength-halfLength, lineOffset));
*/

/*
      // Stick part
      positions.push(new Vector3(lineOtherOffset, lineOffset, halfLength));
      positions.push(new Vector3(lineOtherOffset, lineOffset, -stickLength+halfLength));

      // 1st line of a triangle
      positions.push(new Vector3(arrowheadWidth+lineOtherOffset, lineOffset, -stickLength+halfLength));
      positions.push(new Vector3(-arrowheadWidth+lineOtherOffset, lineOffset, -stickLength+halfLength));

      // 2nd line of a triangle
      positions.push(new Vector3(-arrowheadWidth+lineOtherOffset, lineOffset, -stickLength+halfLength));
      positions.push(new Vector3(lineOtherOffset, lineOffset, -length+halfLength));

      // 3rd line of a triangle
      positions.push(new Vector3(lineOtherOffset, lineOffset, -length+halfLength));
      positions.push(new Vector3(arrowheadWidth+lineOtherOffset, lineOffset, -stickLength+halfLength));
*/
    }

    this.setVerticesData({
      position: positions
    }, null, GLBoost.LINES);
  }

}

GLBoost["JointPrimitive"] = JointPrimitive;
