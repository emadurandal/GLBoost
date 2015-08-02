import GLBoost from './globals'

export default class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * 長さ
   */
  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }

  /**
   * 長さ（static版）
   */
  static length(vec3) {
    return Math.sqrt(vec3.x*vec3.x + vec3.y*vec3.y + vec3.z*vec3.z);
  }

  /**
   * 長さの2乗
   */
  lengthSquared() {
    return this.x*this.x + this.y*this.y + this.z*this.z;
  }

  /**
   * 長さの2乗（static版）
   */
  lengthSquared(vec3) {
    return vec3.x*vec3.x + vec3.y*vec3.y + vec3.z*vec3.z;
  }

  /**
   * 内積
   */
  dot(vec3) {
      return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  /**
   * 内積（static版）
   */
  static dot(lv, rv) {
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
    this.div(length);

    return this;
  }

  /**
   * 正規化（static版）
   */
  static normalize(vec3) {
    var length = vec3.length();
    vec3.div(length);

    return vec3;
  }

}

GLBoost["Vector3"] = Vector3;
