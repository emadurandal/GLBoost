import GLBoost from '../../globals';
import Vector3 from './Vector3';
import MathUtil from './MathUtil';

export default class Matrix33 {

  constructor(m, isColumnMajor = false) {
    this.m = new Float32Array(9);
    if (arguments.length >= 9) {
      if (isColumnMajor === true) {
        let m = arguments;
        this.setComponents(
          m[0], m[3], m[6],
          m[1], m[4], m[7],
          m[2], m[5], m[8]);
      } else {
        this.setComponents.apply(this, arguments);  // arguments[0-8] must be row major values if isColumnMajor is false
      }
    } else if (Array.isArray(m)) {
      if (isColumnMajor === true) {
        this.setComponents(
          m[0], m[3], m[6],
          m[1], m[4], m[7],
          m[2], m[5], m[8]);
      } else {
        this.setComponents.apply(this, m); // 'm' must be row major array if isColumnMajor is false
      }
    } else if (m instanceof Float32Array) {
      if (isColumnMajor === true) {
        this.setComponents(
          m[0], m[3], m[6],
          m[1], m[4], m[7],
          m[2], m[5], m[8]);
      } else {
        this.setComponents.apply(this, m); // 'm' must be row major array if isColumnMajor is false
      }
    } else {
      this.identity();
    }
  }

  setComponents(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    this.m00 = m00; this.m01 = m01; this.m02 = m02;
    this.m10 = m10; this.m11 = m11; this.m12 = m12;
    this.m20 = m20; this.m21 = m21; this.m22 = m22;

    return this;
  }

  /**
   * 単位行列にする
   */
  identity() {
    this.setComponents(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
    return this;
  }

  /**
   * 単位行列にする（static版）
   */
  static identity() {
    return new Matrix33(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
  }

  /**
   * Create X oriented Rotation Matrix
   */
  rotateX(angle) {
    var radian = 0;
    if (GLBoost["ANGLE_UNIT"] === GLBoost.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return this.setComponents(
      1, 0, 0,
      0, cos, -sin,
      0, sin, cos
    );
  }
  /**
   * Create X oriented Rotation Matrix
   */
  static rotateX(angle) {
    var radian = 0;
    if (GLBoost["ANGLE_UNIT"] === GLBoost.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return new Matrix33(
      1, 0, 0,
      0, cos, -sin,
      0, sin, cos
    );
  }

  /**
   * Create Y oriented Rotation Matrix
   */
  rotateY(angle) {
    var radian = 0;
    if (GLBoost["ANGLE_UNIT"] === GLBoost.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    this.setComponents(
      cos, 0, sin,
      0, 1, 0,
      -sin, 0, cos
    );
    return this;
  }
  /**
   * Create Y oriented Rotation Matrix
   */
  static rotateY(angle) {
    var radian = 0;
    if (GLBoost["ANGLE_UNIT"] === GLBoost.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return new Matrix33(
      cos, 0, sin,
      0, 1, 0,
      -sin, 0, cos
    );
  }

  /**
   * Create Z oriented Rotation Matrix
   */
  rotateZ(angle) {
    var radian = 0;
    if (GLBoost["ANGLE_UNIT"] === GLBoost.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return this.setComponents(
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1
    );
  }
  /**
   * Create Z oriented Rotation Matrix
   */
  static rotateZ(angle) {
    var radian = 0;
    if (GLBoost["ANGLE_UNIT"] === GLBoost.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return new Matrix33(
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1
    );
  }

  /**
   * ゼロ行列
   */
  zero() {
    this.setComponents(0, 0, 0, 0, 0, 0, 0, 0, 0);
    return this;
  }

  static zero() {
    return new Matrix33(0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  flatten() {
    return this.m;
  }

  flattenAsArray() {
    return [this.m[0], this.m[1], this.m[2],
      this.m[3], this.m[4], this.m[5],
      this.m[6], this.m[7], this.m[8]];
  }

  _swap(l, r) {
    this.m[r] = [this.m[l], this.m[l] = this.m[r]][0]; // Swap
  }

  /**
   * 転置
   */
  transpose() {
    this._swap(1, 3);
    this._swap(2, 6);
    this._swap(5, 8);

    return this;
  }

  /**
   * 転置（static版）
   */
  static transpose(mat) {

    var mat_t = new Matrix33(
      mat.m00, mat.m10, mat.m20,
      mat.m01, mat.m11, mat.m21,
      mat.m02, mat.m12, mat.m22
    );

    return mat_t;
  }

  multiplyVector(vec) {
    var x = this.m00*vec.x + this.m01*vec.y + this.m02*vec.z;
    var y = this.m10*vec.x + this.m11*vec.y + this.m12*vec.z;
    var z = this.m20*vec.x + this.m21*vec.y + this.m22*vec.z;

    return new Vector3(x, y, z);
  }

  /**
   * 行列同士の乗算
   */
  multiply(mat) {
    var m00 = this.m00*mat.m00 + this.m01*mat.m10 + this.m02*mat.m20;
    var m01 = this.m00*mat.m01 + this.m01*mat.m11 + this.m02*mat.m21;
    var m02 = this.m00*mat.m02 + this.m01*mat.m12 + this.m02*mat.m22;

    var m10 = this.m10*mat.m00 + this.m11*mat.m10 + this.m12*mat.m20;
    var m11 = this.m10*mat.m01 + this.m11*mat.m11 + this.m12*mat.m21;
    var m12 = this.m10*mat.m02 + this.m11*mat.m12 + this.m12*mat.m22;

    var m20 = this.m20*mat.m00 + this.m21*mat.m10 + this.m22*mat.m20;
    var m21 = this.m20*mat.m01 + this.m21*mat.m11 + this.m22*mat.m21;
    var m22 = this.m20*mat.m02 + this.m21*mat.m12 + this.m22*mat.m22;


    return this.setComponents(
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22
    );
  }

  /**
   * 行列同士の乗算（static版）
   */
  static multiply(l_m, r_m) {
    var m00 = l_m.m00*r_m.m00 + l_m.m01*r_m.m10 + l_m.m02*r_m.m20;
    var m10 = l_m.m10*r_m.m00 + l_m.m11*r_m.m10 + l_m.m12*r_m.m20;
    var m20 = l_m.m20*r_m.m00 + l_m.m21*r_m.m10 + l_m.m22*r_m.m20;

    var m01 = l_m.m00*r_m.m01 + l_m.m01*r_m.m11 + l_m.m02*r_m.m21;
    var m11 = l_m.m10*r_m.m01 + l_m.m11*r_m.m11 + l_m.m12*r_m.m21;
    var m21 = l_m.m20*r_m.m01 + l_m.m21*r_m.m11 + l_m.m22*r_m.m21;

    var m02 = l_m.m00*r_m.m02 + l_m.m01*r_m.m12 + l_m.m02*r_m.m22;
    var m12 = l_m.m10*r_m.m02 + l_m.m11*r_m.m12 + l_m.m12*r_m.m22;
    var m22 = l_m.m20*r_m.m02 + l_m.m21*r_m.m12 + l_m.m22*r_m.m22;

    return new Matrix33(
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22
    );
  }

  determinant() {
    return this.m00*this.m11*this.m22 + this.m10*this.m21*this.m02 + this.m20*this.m01*this.m12
      - this.m00*this.m21*this.m12 - this.m20*this.m11*this.m02 - this.m10*this.m01*this.m22;
  }

  static determinant(mat) {
    return mat.m00*mat.m11*mat.m22 + mat.m10*mat.m21*mat.m02 + mat.m20*mat.m01*mat.m12
      - mat.m00*mat.m21*mat.m12 - mat.m20*mat.m11*mat.m02 - mat.m10*mat.m01*mat.m22;
  }

  invert() {
    var det = this.determinant();
    var m00 = (this.m11*this.m22 - this.m12*this.m21) / det;
    var m01 = (this.m02*this.m21 - this.m01*this.m22) / det;
    var m02 = (this.m01*this.m12 - this.m02*this.m11) / det;
    var m10 = (this.m12*this.m20 - this.m10*this.m22) / det;
    var m11 = (this.m00*this.m22 - this.m02*this.m20) / det;
    var m12 = (this.m02*this.m10 - this.m00*this.m12) / det;
    var m20 = (this.m10*this.m21 - this.m11*this.m20) / det;
    var m21 = (this.m01*this.m20 - this.m00*this.m21) / det;
    var m22 = (this.m00*this.m11 - this.m01*this.m10) / det;

    return this.setComponents(
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22
    );
  }

  static invert(mat) {
    var det = mat.determinant();
    var m00 = (mat.m11*mat.m22 - mat.m12*mat.m21) / det;
    var m01 = (mat.m02*mat.m21 - mat.m01*mat.m22) / det;
    var m02 = (mat.m01*mat.m12 - mat.m02*mat.m11) / det;
    var m10 = (mat.m12*mat.m20 - mat.m10*mat.m22) / det;
    var m11 = (mat.m00*mat.m22 - mat.m02*mat.m20) / det;
    var m12 = (mat.m02*mat.m10 - mat.m00*mat.m12) / det;
    var m20 = (mat.m10*mat.m21 - mat.m11*mat.m20) / det;
    var m21 = (mat.m01*mat.m20 - mat.m00*mat.m21) / det;
    var m22 = (mat.m00*mat.m11 - mat.m01*mat.m10) / det;

    return new Matrix33(
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22
    );
  }

  set m00(val) {
    this.m[0] = val;
  }

  get m00() {
    return this.m[0];
  }

  set m10(val) {
    this.m[1] = val;
  }

  get m10() {
    return this.m[1];
  }

  set m20(val) {
    this.m[2] = val;
  }

  get m20() {
    return this.m[2];
  }


  set m01(val) {
    this.m[3] = val;
  }

  get m01() {
    return this.m[3];
  }

  set m11(val) {
    this.m[4] = val;
  }

  get m11() {
    return this.m[4];
  }

  set m21(val) {
    this.m[5] = val;
  }

  get m21() {
    return this.m[5];
  }

  set m02(val) {
    this.m[6] = val;
  }

  get m02() {
    return this.m[6];
  }

  set m12(val) {
    this.m[7] = val;
  }

  get m12() {
    return this.m[7];
  }

  set m22(val) {
    this.m[8] = val;
  }

  get m22() {
    return this.m[8];
  }

}

GLBoost['Matrix33'] = Matrix33;
