import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector3 from '../../low_level/math/Vector3';

export default class Grid extends Geometry {
  constructor(glBoostContext, length, division, isXZ, isXY, isYZ) {
    super(glBoostContext);

    this._setupVertexData(length, division, isXZ, isXY, isYZ);
  }

  _setupVertexData(length, division, isXZ, isXY, isYZ) {

    let positions = [];

    for (let i = 0; i<division*2+3; i++) {
      let start = -length;
      let oneUnitLength = length/(division + 1);

      // XZ grid
      if (isXZ) {
        positions.push(new Vector3(-length, 0, start + oneUnitLength * i));
        positions.push(new Vector3(length, 0, start + oneUnitLength * i));

        positions.push(new Vector3(start + oneUnitLength * i, 0, -length));
        positions.push(new Vector3(start + oneUnitLength * i, 0, length));
      }

      // XY grid
      if (isXY) {
        positions.push(new Vector3(-length, start + oneUnitLength * i, 0));
        positions.push(new Vector3(length, start + oneUnitLength * i, 0));

        positions.push(new Vector3(start + oneUnitLength * i, -length, 0));
        positions.push(new Vector3(start + oneUnitLength * i, length, 0));
      }

      // YZ grid
      if (isYZ) {
        positions.push(new Vector3(0, -length, start + oneUnitLength * i));
        positions.push(new Vector3(0, length, start + oneUnitLength * i));

        positions.push(new Vector3(0, start + oneUnitLength * i, -length));
        positions.push(new Vector3(0, start + oneUnitLength * i, length));
      }
    }

    this.setVerticesData({
      position: positions
    }, null, GLBoost.LINES);
  }

}

GLBoost["Grid"] = Grid;
