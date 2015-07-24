import GLBoost from './globals'

export default class Vector2 {

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }

}

GLBoost["Vector2"] = Vector2;
