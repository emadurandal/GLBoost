import GLBoost from './globals'

export default class Vector3 {

  constructor(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

}

GLBoost["Vector3"] = Vector3;
