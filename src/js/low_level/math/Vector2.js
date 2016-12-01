import GLBoost from '../../globals';

export default class Vector2 {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }
}

GLBoost["Vector2"] = Vector2;
