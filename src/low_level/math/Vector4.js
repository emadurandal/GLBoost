/* @flow */

import GLBoost from '../../globals';
import Vector3 from './Vector3';

type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array |
Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export default class Vector4 {
  v: TypedArray;

  constructor(x:number|TypedArray, y?:number, z?:number, w?:number) {
    if (ArrayBuffer.isView(x)) {
      this.v = ((x:any):TypedArray);
      return;
    } else {
      this.v = new Float32Array(4)
    }

    this.x = ((x:any):number);
    this.y = ((y:any):number);
    this.z = ((z:any):number);
    this.w = ((w:any):number);
  }

  isEqual(vec:Vector4): boolean {
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

  static normalize(vec4:Vector4) {
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
  add(v:Vector4) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    
    return this;
  }

  /**
   * add value（static version）
   */
  static add(lv:Vector4, rv:Vector4) {
    return new Vector4(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z, lv.z + rv.z);
  }

  /**
   * add value except w component
   */
  addWithOutW(v:Vector4|Vector3) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    
    return this;
  }

  subtract(v:Vector4) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;

    return this;
  }

  static subtract(lv:Vector4, rv:Vector4) {
    return new Vector4(lv.x - rv.x, lv.y - rv.y, lv.z - rv.z, lv.w  - rv.w);
  }
  /**
   * add value except w component（static version）
   */
  static addWithOutW(lv:Vector4, rv:Vector4) {
    return new Vector4(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z, lv.z);
  }

  multiply(val:number) {
    this.x *= val;
    this.y *= val;
    this.z *= val;
    this.w *= val;
    
    return this;
  }

  multiplyVector(vec:Vector4) {
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;
    this.w *= vec.w;
    
    return this;
  }

  static multiply(vec4:Vector4, val:number) {
    return new Vector4(vec4.x * val, vec4.y * val, vec4.z * val, vec4.w * val);
  }

  static multiplyVector(vec4:Vector4, vec:Vector4) {
    return new Vector4(vec4.x * vec.x, vec4.y * vec.y, vec4.z * vec.z, vec4.w * vec.w);
  }


  divide(val:number) {
    console.assert(val != 0, "0 division!");
    if (val !== 0) {
      this.x /= val;
      this.y /= val;
      this.z /= val;
      this.w /= val;
    }
    return this;
  }

  static divide(vec4:Vector4, val:number) {
    console.assert(val != 0, "0 division!");
    return new Vector4(vec4.x / val, vec4.y / val, vec4.z / val, vec4.w / val);
  }

  divideVector(vec4:Vector4) {
    this.x /= vec4.x;
    this.y /= vec4.y;
    this.z /= vec4.z;
    this.w /= vec4.w;

    return this;
  }

  static divideVector(lvec4:Vector4, rvec4:Vector4) {
    return new Vector4(lvec4.x / rvec4.x, lvec4.y / rvec4.y, lvec4.z / rvec4.z, lvec4.w / rvec4.w);
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
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

  get z() {
    return this.v[2];
  }

  set z(z:number) {
    this.v[2] = z;
  }

  get w() {
    return this.v[3];
  }

  set w(w:number) {
    this.v[3] = w;
  }

  get raw() {
    return this.v;
  }
}

GLBoost["Vector4"] = Vector4;
