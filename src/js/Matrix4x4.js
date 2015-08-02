import GLBoost from './globals'

export default class Matrix4x4 {

  constructor() {
    this.m = [];
    if (arguments.length >= 16) {
      this.setComponents.apply(this, arguments);
    }
    else {
      this.identity();
    }
  }

  setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    this.m00 = m00; this.m01 = m01; this.m02 = m02; this.m03 = m03;
    this.m10 = m10; this.m11 = m11; this.m12 = m12; this.m13 = m13;
    this.m20 = m20; this.m21 = m21; this.m22 = m22; this.m23 = m23;
    this.m30 = m30; this.m31 = m31; this.m32 = m32; this.m33 = m33;

    return this;
  }

  /**
   * 単位行列にする
   */
  identity() {
    this.setComponents(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    return this;
  }

  /**
   * ゼロ行列
   */
  zero() {
      this.setComponents(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      return this;
  }

  static zero() {
    return new Matrix4x4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  set m00(val) {
    this.m[0] = val;
  }

  get m00() {
    return this.m[0];
  }

  set m01(val) {
    this.m[1] = val;
  }

  get m01() {
    return this.m[1];
  }

  set m02(val) {
    this.m[2] = val;
  }

  get m02() {
    return this.m[2];
  }

  set m03(val) {
    this.m[3] = val;
  }

  get m03() {
    return this.m[3];
  }

  set m10(val) {
    this.m[4] = val;
  }

  get m10() {
    return this.m[4];
  }

  set m11(val) {
    this.m[5] = val;
  }

  get m11() {
    return this.m[5];
  }

  set m12(val) {
    this.m[6] = val;
  }

  get m12() {
    return this.m[6];
  }

  set m13(val) {
    this.m[7] = val;
  }

  get m13() {
    return this.m[7];
  }

  set m20(val) {
    this.m[8] = val;
  }

  get m20() {
    return this.m[8];
  }

  set m21(val) {
    this.m[9] = val;
  }

  get m21() {
    return this.m[9];
  }

  set m22(val) {
    this.m[10] = val;
  }

  get m22() {
    return this.m[10];
  }

  set m23(val) {
    this.m[11] = val;
  }

  get m23() {
    return this.m[11];
  }

  set m30(val) {
    this.m[12] = val;
  }

  get m30() {
    return this.m[12];
  }

  set m31(val) {
    this.m[13] = val;
  }

  get m31() {
    return this.m[13];
  }

  set m32(val) {
    this.m[14] = val;
  }

  get m32() {
    return this.m[14];
  }

  set m33(val) {
    this.m[15] = val;
  }

  get m33() {
    return this.m[15];
  }
  
}

GLBoost["Matrix4x4"] = Matrix4x4;
