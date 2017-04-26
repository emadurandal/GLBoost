import GLBoost from '../../globals';
import Vector3 from './Vector3';

export default class Vector4 {

  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  isEqual(vec) {
    if (this.x === vec.x && this.y === vec.y && this.z === vec.z && this.w === vec.w) {
      return true;
    } else {
      return false;
    }
  }

  clone() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  /**
   * Zero Vector
   */
  static zero() {
    return new Vector4(0, 0, 0, 1);
  }

  toVector3() {
    return new Vector3(this.x, this.y, this.z);
  }

  divide(val) {
    console.assert(val != 0, "0 division!");
    this.x /= val;
    this.y /= val;
    this.z /= val;
    this.w /= val;

    return this;
  }

  static divide(vec4, val) {
    console.assert(val != 0, "0 division!");
    return new Vector4(vec4.x / val, vec4.y / val, vec4.z / val, vec4.w / val);
  }

  divideVector(vec4) {
    this.x /= vec4.x;
    this.y /= vec4.y;
    this.z /= vec4.z;
    this.w /= vec4.w;

    return this;
  }

  static divideVector(lvec4, rvec4) {
    return new Vector4(lvec4.x / rvec4.x, lvec4.y / rvec4.y, lvec4.z / rvec4.z, lvec4.w / rvec4.w);
  }
}

GLBoost["Vector4"] = Vector4;
