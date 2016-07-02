import GLBoost from './../../globals';
import Vector4 from './Vector4';

export default class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  isEqual(vec) {
    if (this.x === vec.x && this.y === vec.y && this.z === vec.z) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Zero Vector
   */
  static zero() {
    return new Vector3(0, 0, 0);
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }

  /*
   * disabled for now because Safari's Function.prototype.length is not configurable yet.
   */
  /*
  static length(vec3) {
    return Math.sqrt(vec3.x*vec3.x + vec3.y*vec3.y + vec3.z*vec3.z);
  }
  */

  /**
   * 長さの2乗
   */
  lengthSquared() {
    return this.x*this.x + this.y*this.y + this.z*this.z;
  }

  /**
   * 長さの2乗（static版）
   */
  static lengthSquared(vec3) {
    return vec3.x*vec3.x + vec3.y*vec3.y + vec3.z*vec3.z;
  }

  lengthTo(vec3) {
    var deltaX = vec3.x - this.x;
    var deltaY = vec3.y - this.y;
    var deltaZ = vec3.z - this.z;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);
  }

  static lengthBtw(lhv, rhv) {
    var deltaX = rhv.x - lhv.x;
    var deltaY = rhv.y - lhv.y;
    var deltaZ = rhv.z - lhv.z;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);
  }

  /**
   * 内積
   */
  dotProduct(vec3) {
      return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  /**
   * 内積（static版）
   */
  static dotProduct(lv, rv) {
    return lv.x * rv.x + lv.y * rv.y + lv.z * rv.z;
  }

  /**
   * 外積
   */
  cross(v) {
    var x = this.y*v.z - this.z*v.y;
    var y = this.z*v.x - this.x*v.z;
    var z = this.x*v.y - this.y*v.x;

    this.setComponents(x, y, z);

    return this;
  }

  /**
  * 外積(static版)
  */
  static cross(lv, rv) {
    var x = lv.y*rv.z - lv.z*rv.y;
    var y = lv.z*rv.x - lv.x*rv.z;
    var z = lv.x*rv.y - lv.y*rv.x;

    return new Vector3(x, y, z);
  }

  /**
   * 正規化
   */
  normalize() {
    var length = this.length();
    this.divide(length);

    return this;
  }

  /**
   * 正規化（static版）
   */
  static normalize(vec3) {
    var length = vec3.length();
    var newVec = new Vector3(vec3.x, vec3.y, vec3.z);
    newVec.divide(length);

    return newVec;
  }

  /**
   * 加算
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  /**
   * 加算（static版）
   */
  static add(lv, rv) {
    return new Vector3(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z);
  }

  /**
   * 減算
   */
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;
  }

  /**
   * 減算（static版）
   */
  static subtract(lv, rv) {
    return new Vector3(lv.x - rv.x, lv.y - rv.y, lv.z - rv.z);
  }

  /**
   * 除算
   */
  divide(val) {
    console.assert(val != 0, "0 division!");
    this.x /= val;
    this.y /= val;
    this.z /= val;

    return this;
  }

  /**
   * 除算（static版）
   */
  static divide(vec3, val) {
    console.assert(val != 0, "0 division!");
    return new Vector3(vec3.x / val, vec3.y / val, vec3.z / val);
  }

  multiply(val) {
    this.x *= val;
    this.y *= val;
    this.z *= val;

    return this;
  }

  /**
   * 除算（static版）
   */
  static multiply(vec3, val) {
    return new Vector3(vec3.x * val, vec3.y * val, vec3.z * val);
  }

  toVector4() {
    return new Vector4(this.x, this.y, this.z, 1.0);
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ', ' + this.z +')';
  }
}

GLBoost['Vector3'] = Vector3;
