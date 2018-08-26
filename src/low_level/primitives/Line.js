import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector3 from '../../low_level/math/Vector3';

export default class Line extends Geometry {
  constructor(glBoostContext, startPos = Vector3.zero(), endPos = Vector3.zero(), haveTerminalMark = false) {
    super(glBoostContext);

    this.__startPos = startPos;
    this.__endPos = endPos;

    this.__haveTerminalMark = haveTerminalMark;

    this._color = new GLBoost.Vector4(1, 1, 1, 1);
    this._vertexData = this._setupVertexData(this.__startPos, this.__endPos, haveTerminalMark);
    this.setVerticesData(this._vertexData, null, GLBoost.LINES);
  }

  _setupVertexData(startPos, endPos, haveTerminalMark) {

    let positions = [];

    positions.push(startPos);
    positions.push(endPos);

    let colors = [];

    colors.push(this._color);
    colors.push(this._color);

    if (haveTerminalMark) {
      const length = startPos.lengthTo(endPos);
      const markSize = length*0.1;

      positions.push(new Vector3(startPos.x - markSize, startPos.y, startPos.z));
      positions.push(new Vector3(startPos.x + markSize, startPos.y, startPos.z));

      positions.push(new Vector3(startPos.x, startPos.y, startPos.z - markSize));
      positions.push(new Vector3(startPos.x, startPos.y, startPos.z + markSize));

      positions.push(new Vector3(endPos.x - markSize, endPos.y, endPos.z));
      positions.push(new Vector3(endPos.x + markSize, endPos.y, endPos.z));

      positions.push(new Vector3(endPos.x, endPos.y, endPos.z - markSize));
      positions.push(new Vector3(endPos.x, endPos.y, endPos.z + markSize));

      colors.push(this._color);
      colors.push(this._color);
      colors.push(this._color);
      colors.push(this._color);
      colors.push(this._color);
      colors.push(this._color);
      colors.push(this._color);
      colors.push(this._color);
    }

    this._vertexData = {
      position: positions,
      color: colors
    };

    return this._vertexData;
  }

  update() {
    this._vertexData = this._setupVertexData(this.__startPos, this.__endPos, this.__haveTerminalMark);
    this.updateVerticesData(this._vertexData, true);
  }

  set startPosition(startPos) {
    this.__startPos = startPos;
  }

  get startPosition() {
    return this.__startPos;
  }
  
  set endPosition(endPos) {
    this.__endPos = endPos;
  }

  get endPosition() {
    return this.__endPos;
  }

  set color(vec) {
    this._color = vec;

    this._colors = [];
    for(let i=0; i<2; i++) {
      this._colors.push(this._color);
    }
  }

  get color() {
    return this._color;
  }

}

GLBoost["Line"] = Line;
