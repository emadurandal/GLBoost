import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector3 from '../../low_level/math/Vector3';

export default class Line extends Geometry {
  constructor(glBoostContext, startPos = Vector3.zero(), endPos = Vector3.zero()) {
    super(glBoostContext);

    this.__startPos = startPos;
    this.__endPos = endPos;

    this._color = new GLBoost.Vector4(1, 1, 1, 1);
    this._setupVertexData(startPos, endPos);
  }

  _setupVertexData(startPos, endPos) {

    let positions = [];

    positions.push(startPos);
    positions.push(endPos);

    let colors = [];

    colors.push(this._color);
    colors.push(this._color);

    this.setVerticesData({
      position: positions,
      color: colors
    }, null, GLBoost.LINES);
  }

  update() {
    this._vertexData = this._setupVertexData(this.__startPos, this.__endPos);
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
