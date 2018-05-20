/* @flow */

import GLBoost from '../../globals';



export default class Vector2 {
  v: Float32Array;

  constructor(x:number|Float32Array, y:number) {
    if (x instanceof Float32Array) {
      this.v = x;
      return;
    } else {
      this.v = new Float32Array(2);
    }

    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  multiply(val:number) {
    this.x *= val;
    this.y *= val;

    return this;
  }

  static multiply(vec2:Vector2, val:number) {
    return new Vector2(vec2.x * val, vec2.y * val);
  }

  get x() {
    return this.v[0];
  }

  set x(x:number) {
    this.v[0] = x;
  }

  get y() {
    return this.v[1];
  }

  set y(y:number) {
    this.v[1] = y;
  }

  get raw() {
    return this.v;
  }
}

GLBoost["Vector2"] = Vector2;