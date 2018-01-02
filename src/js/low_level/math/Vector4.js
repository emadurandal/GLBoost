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

  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w);
  }

  normalize() {
    var length = this.length();
    this.divide(length);

    return this;
  }

  static normalize(vec4) {
    var length = vec4.length();
    var newVec = new Vector4(vec4.x, vec4.y, vec4.z, vec4.w);
    newVec.divide(length);

    return newVec;
  }
  

  toVector3() {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * add value
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    
    return this;
  }

  /**
   * add value（static version）
   */
  static add(lv, rv) {
    return new Vector4(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z, lv.z + rv.z);
  }

  /**
   * add value except w component
   */
  addWithOutW(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    
    return this;
  }

  /**
   * add value except w component（static version）
   */
  static addWithOutW(lv, rv) {
    return new Vector4(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z, lv.z);
  }

  multiply(val) {
    this.x *= val;
    this.y *= val;
    this.z *= val;
    this.w *= val;
    
    return this;
  }

  multiplyVector(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;
    this.w *= vec.w;
    
    return this;
  }

  static multiply(vec4, val) {
    return new Vector4(vec4.x * val, vec4.y * val, vec4.z * val, vec4.w * val);
  }

  static multiplyVector(vec4, vec) {
    return new Vector4(vec4.x * vec.x, vec4.y * vec.y, vec4.z * vec.z, vec4.w * vec.w);
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

  at(i) {
    switch (i%4) {
    case 0: return this.x;
    case 1: return this.y;
    case 2: return this.z;
    case 3: return this.w;
    }
  }
}

GLBoost["Vector4"] = Vector4;
