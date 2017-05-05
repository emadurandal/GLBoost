import GLBoost from '../../globals';

export default class Vector2 {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  multiply(val) {
    this.x *= val;
    this.y *= val;

    return this;
  }

  static multiply(vec2, val) {
    return new Vector2(vec2.x * val, vec2.y * val);
  }

}

GLBoost["Vector2"] = Vector2;
