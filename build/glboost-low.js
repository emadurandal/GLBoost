(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var global = ('global',eval)('this');

(function (global) {
  let GLBoost = typeof global.GLBoost !== 'undefined' ? global.GLBoost : { REVISION: 'r3-dev' };

  if (typeof define === 'function' && define.amd) {
    define(function() { return GLBoost; });
  } else if (typeof exports === 'object') {
    module.exports = GLBoost;
    global.GLBoost = GLBoost;
  } else {
    global.GLBoost = GLBoost;
  }

  (function(){
    GLBoost.GLBOOST_CONSTANT_NAMES = [];
    GLBoost.GLBOOST_CONSTANT_VALUES = [];
    let c = {
      count: 0,
      define: function (constantName, constantValue) {
        let count = this.count;
        GLBoost[constantName] = count;
        GLBoost.GLBOOST_CONSTANT_NAMES[count] = constantName;
        GLBoost.GLBOOST_CONSTANT_VALUES[count] =
          (typeof constantValue !== 'undefined') ? constantValue:constantName;
        this.count++;
      }
    };

    /// Define GLBoost Constants.
    // Do not directly use integers set in these constants.
    // These may be changed each time constants are added in the future.
    c.define('POSITION', 'position');
    c.define('COLOR', 'color');
    c.define('NORMAL', 'normal');
    c.define('TEXCOORD', 'texcoord');
    c.define('TANGENT', 'tangent');
    c.define('JOINT', 'joint');
    c.define('WEIGHT', 'weight');
    c.define('POINTS');
    c.define('LINES');
    c.define('LINE_STRIP');
    c.define('LINE_LOOP');
    c.define('TRIANGLES');
    c.define('TRIANGLE_STRIP');
    c.define('STATIC_DRAW');
    c.define('STREAM_DRAW');
    c.define('DYNAMIC_DRAW');
    c.define('BLENDTARGET1', 'shapetarget_1');
    c.define('BLENDTARGET2', 'shapetarget_2');
    c.define('BLENDTARGET3', 'shapetarget_3');
    c.define('BLENDTARGET4', 'shapetarget_4');
    c.define('BLENDTARGET5', 'shapetarget_5');
    c.define('BLENDTARGET6', 'shapetarget_6');
    c.define('BLENDTARGET7', 'shapetarget_7');
    c.define('BLENDTARGET8', 'shapetarget_8');
    c.define('BLENDTARGET9', 'shapetarget_9');
    c.define('BLENDTARGET10', 'shapetarget_10');
    c.define('RADIAN', 'radian');
    c.define('DEGREE', 'degree');
    c.define('RENDER_TARGET_NONE_COLOR', 0); // gl.NONE
    c.define('COLOR_ATTACHMENT0', 0x8CE0); // gl.COLOR_ATTACHMENT0
    c.define('UNPACK_FLIP_Y_WEBGL');
    c.define('TEXTURE_MAG_FILTER');
    c.define('TEXTURE_MIN_FILTER');
    c.define('LINEAR');
    c.define('LINEAR_MIPMAP_LINEAR');
    c.define('NEAREST');
    c.define('TEXTURE_WRAP_S');
    c.define('TEXTURE_WRAP_T');
    c.define('REPEAT');
    c.define('CLAMP_TO_EDGE');
    c.define('MIRRORED_REPEAT');
    c.define('TEXTURE_PURPOSE_DIFFUSE', 'diffuse');
    c.define('TEXTURE_PURPOSE_NORMAL', 'normal');
    c.define('QUERY_TYPE_INSTANCE_NAME');
    c.define('QUERY_TYPE_USER_FLAVOR_NAME');
    c.define('QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR');
    c.define('QUERY_FORMAT_STRING');
    c.define('QUERY_FORMAT_REGEXP');

    c.define('WORLD_MATRIX');

    c.define('SHADER_PARAMETER_TYPE_OBJECT');
    c.define('SHADER_PARAMETER_TYPE_MATERIAL');
    c.define('SHADER_PARAMETER_TYPE_LIGHT');
    c.define('SHADER_PARAMETER_TYPE_JOINTSET');
    c.define('SHADER_PARAMETER_TYPE_MORPH');
    
    c.define('GLOBAL_STATES_USAGE_DO_NOTHING');
    c.define('GLOBAL_STATES_USAGE_IGNORE');
    c.define('GLOBAL_STATES_USAGE_INCLUSIVE');
    c.define('GLOBAL_STATES_USAGE_EXCLUSIVE');

    c.define('LOG_GENERAL');
    c.define('LOG_SHADER_CODE');
    c.define('LOG_GLBOOST_OBJECT_LIFECYCLE');
    c.define('LOG_GL_RESOURCE_LIFECYCLE');
    c.define('LOG_GL_ERROR');
    c.define('LOG_OMISSION_PROCESSING');

  })();


  GLBoost.isThisGLVersion_2 = function(gl) {
    if (typeof WebGL2RenderingContext === 'undefined') {
      return false;
    }
    return gl instanceof WebGL2RenderingContext;
  };

  GLBoost.getNameOfGLBoostConstant = function(glboostConstant) {
    return GLBoost.GLBOOST_CONSTANT_NAMES[glboostConstant];
  };
  GLBoost.getValueOfGLBoostConstant = function(glboostConstant) {
    return GLBoost.GLBOOST_CONSTANT_VALUES[glboostConstant];
  };

})(global);

var GLBoost$1 = global.GLBoost;

class Vector2 {

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

GLBoost$1["Vector2"] = Vector2;

class Vector4 {

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

GLBoost$1["Vector4"] = Vector4;

class Matrix33 {

  constructor(m, isColumnMajor = false,
    shaderParameterType = void 0, shaderParameterEntityIndex = void 0, shaderParameterName = void 0
  ) {
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
   * Make this identity matrix（static method version）
   */
  static identity() {
    return new Matrix33(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
  }

  clone() {
    return new Matrix33(
      this.m[0], this.m[3], this.m[6],
      this.m[1], this.m[4], this.m[7],
      this.m[2], this.m[5], this.m[8]
    );
  }

  /**
   * Create X oriented Rotation Matrix
   */
  rotateX(angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
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
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
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
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
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
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
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
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
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
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
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

  scale(vec) {
    return this.setComponents(
      vec.x, 0, 0,
      0, vec.y, 0,
      0, 0, vec.z
    );
  }

  static scale(vec) {
    return new Matrix33(
      vec.x, 0, 0,
      0, vec.y, 0,
      0, 0, vec.z
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

  toString() {
    return this.m00 + ' ' + this.m01 + ' ' + this.m02 + '\n' +
      this.m10 + ' ' + this.m11 + ' ' + this.m12 + '\n' +
      this.m20 + ' ' + this.m21 + ' ' + this.m22 + '\n';
  }

  nearZeroToZero(value) {
    if (Math.abs(value) < 0.00001) {
      value = 0;
    } else if (0.99999 < value && value < 1.00001) {
      value = 1;
    } else if (-1.00001 < value && value < -0.99999) {
      value = -1;
    }
    return value;
  }

  toStringApproximately() {
    return this.nearZeroToZero(this.m00) + ' ' + this.nearZeroToZero(this.m01) + ' ' + this.nearZeroToZero(this.m02) + '\n' +
      this.nearZeroToZero(this.m10) + ' ' + this.nearZeroToZero(this.m11) + ' ' + this.nearZeroToZero(this.m12) + ' \n' +
      this.nearZeroToZero(this.m20) + ' ' + this.nearZeroToZero(this.m21) + ' ' + this.nearZeroToZero(this.m22) + '\n';
  }

  toMatrix44() {
    return new Matrix44$1(
      this.m00, this.m01, this.m02, 0,
      this.m10, this.m11, this.m12, 0,
      this.m20, this.m21, this.m22, 0,
      0, 0, 0, 1
    );
  }

  static toMatrix44(mat) {
    return new Matrix44$1(
      mat.m00, mat.m01, mat.m02, 0,
      mat.m10, mat.m11, mat.m12, 0,
      mat.m20, mat.m21, mat.m22, 0,
      0, 0, 0, 1
    );
  }

  getScale() {
    return new Vector3(
      Math.sqrt(this.m00 * this.m00 + this.m01 * this.m01 + this.m02 * this.m02),
      Math.sqrt(this.m10 * this.m10 + this.m11 * this.m11 + this.m12 * this.m12),
      Math.sqrt(this.m20 * this.m20 + this.m21 * this.m21 + this.m22 * this.m22)
    );
  }

  addScale(vec) {
    this.m00 *= vec.x;
    this.m11 *= vec.y;
    this.m22 *= vec.z;

    return this;
  }
}

GLBoost$1['Matrix33'] = Matrix33;

class Matrix44$1 {

  constructor(m, isColumnMajor = false, notCopyFloat32Array = false
  ) {
    if (arguments.length >= 16) {
      this.m = new Float32Array(16);
      if (isColumnMajor === true) {
        let m = arguments;
        this.setComponents(
          m[0], m[4], m[8], m[12],
          m[1], m[5], m[9], m[13],
          m[2], m[6], m[10], m[14],
          m[3], m[7], m[11], m[15]);
      } else {
        this.setComponents.apply(this, arguments);  // arguments[0-15] must be row major values if isColumnMajor is false
      }
    } else if (Array.isArray(m)) {
      this.m = new Float32Array(16);
      if (isColumnMajor === true) {
        this.setComponents(
          m[0], m[4], m[8], m[12],
          m[1], m[5], m[9], m[13],
          m[2], m[6], m[10], m[14],
          m[3], m[7], m[11], m[15]);
      } else {
        this.setComponents.apply(this, m); // 'm' must be row major array if isColumnMajor is false
      }
    } else if (m instanceof Float32Array) {
      this.m = new Float32Array(16);
      if (notCopyFloat32Array) {
        this.m = m;
      } else {
        this.m = new Float32Array(16);
        if (isColumnMajor === true) {
          this.setComponents(
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15]);
        } else {
          this.setComponents.apply(this, m); // 'm' must be row major array if isColumnMajor is false
        }  
      }
    } else {
      this.m = new Float32Array(16);
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

  copyComponents(mat4) {
    //this.m.set(mat4.m);
    this.setComponents.apply(this, mat4.m); // 'm' must be row major array if isColumnMajor is false    
  }

  clone() {
    return new Matrix44$1(
      this.m[0], this.m[4], this.m[8], this.m[12],
      this.m[1], this.m[5], this.m[9], this.m[13],
      this.m[2], this.m[6], this.m[10], this.m[14],
      this.m[3], this.m[7], this.m[11], this.m[15]
    );
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
   * 単位行列にする（static版）
   */
  static identity() {
    return new Matrix44$1(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
  }

  translate(vec) {
    return this.setComponents(
      1, 0, 0, vec.x,
      0, 1, 0, vec.y,
      0, 0, 1, vec.z,
      0, 0, 0, 1
    );
  }

  putTranslate(vec) {
    this.m03 = vec.x;
    this.m13 = vec.y;
    this.m23 = vec.z;
  }

  getTranslate() {
    return new Vector3(this.m03, this.m13, this.m23);
  }

  static translate(vec) {
    return new Matrix44$1(
      1, 0, 0, vec.x,
      0, 1, 0, vec.y,
      0, 0, 1, vec.z,
      0, 0, 0, 1
    );
  }

  scale(vec) {
    return this.setComponents(
      vec.x, 0, 0, 0,
      0, vec.y, 0, 0,
      0, 0, vec.z, 0,
      0, 0, 0, 1
    );
  }

  static scale(vec) {
    return new Matrix44$1(
      vec.x, 0, 0, 0,
      0, vec.y, 0, 0,
      0, 0, vec.z, 0,
      0, 0, 0, 1
    );
  }

  addScale(vec) {
    this.m00 *= vec.x;
    this.m11 *= vec.y;
    this.m22 *= vec.z;

    return this;
  }

  /**
   * Create X oriented Rotation Matrix
   */
  rotateX(angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return this.setComponents(
      1, 0, 0, 0,
      0, cos, -sin, 0,
      0, sin, cos, 0,
      0, 0, 0, 1
    );
  }
  /**
   * Create X oriented Rotation Matrix
  */
  static rotateX(angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return new Matrix44$1(
      1, 0, 0, 0,
      0, cos, -sin, 0,
      0, sin, cos, 0,
      0, 0, 0, 1
    );
  }

  /**
   * Create Y oriented Rotation Matrix
   */
  rotateY(angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return this.setComponents(
      cos, 0, sin, 0,
      0, 1, 0, 0,
      -sin, 0, cos, 0,
      0, 0, 0, 1
    );
  }
  /**
   * Create Y oriented Rotation Matrix
   */
  static rotateY(angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return new Matrix44$1(
      cos, 0, sin, 0,
      0, 1, 0, 0,
      -sin, 0, cos, 0,
      0, 0, 0, 1
    );
  }

  /**
   * Create Z oriented Rotation Matrix
   */
  rotateZ(angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return this.setComponents(
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }
  /**
   * Create Z oriented Rotation Matrix
   */
  static rotateZ(angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }

    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return new Matrix44$1(
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }

  /**
   * ゼロ行列
   */
  zero() {
    this.setComponents(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return this;
  }

  static zero() {
    return new Matrix44$1(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  flatten() {
    return this.m;
  }

  flattenAsArray() {
    return [this.m[0], this.m[1], this.m[2], this.m[3],
      this.m[4], this.m[5], this.m[6], this.m[7],
      this.m[8], this.m[9], this.m[10], this.m[11],
      this.m[12], this.m[13], this.m[14], this.m[15]];
  }

  _swap(l, r) {
    this.m[r] = [this.m[l], this.m[l] = this.m[r]][0]; // Swap
  }

  /**
   * 転置
   */
  transpose() {
    this._swap(1, 4);
    this._swap(2, 8);
    this._swap(3, 12);
    this._swap(6, 9);
    this._swap(7, 13);
    this._swap(11, 14);

    return this;
  }

  /**
   * 転置（static版）
   */
  static transpose(mat) {

    var mat_t = new Matrix44$1(
      mat.m00, mat.m10, mat.m20, mat.m30,
      mat.m01, mat.m11, mat.m21, mat.m31,
      mat.m02, mat.m12, mat.m22, mat.m32,
      mat.m03, mat.m13, mat.m23, mat.m33
    );

    return mat_t;
  }

  multiplyVector(vec) {
    var x = this.m00*vec.x + this.m01*vec.y + this.m02*vec.z + this.m03*vec.w;
    var y = this.m10*vec.x + this.m11*vec.y + this.m12*vec.z + this.m13*vec.w;
    var z = this.m20*vec.x + this.m21*vec.y + this.m22*vec.z + this.m23*vec.w;
    var w = this.m30*vec.x + this.m31*vec.y + this.m32*vec.z + this.m33*vec.w;

    return new Vector4(x, y, z, w);
  }

  /**
   * 行列同士の乗算
   */
  multiply(mat) {
    var m00 = this.m00*mat.m00 + this.m01*mat.m10 + this.m02*mat.m20 + this.m03*mat.m30;
    var m01 = this.m00*mat.m01 + this.m01*mat.m11 + this.m02*mat.m21 + this.m03*mat.m31;
    var m02 = this.m00*mat.m02 + this.m01*mat.m12 + this.m02*mat.m22 + this.m03*mat.m32;
    var m03 = this.m00*mat.m03 + this.m01*mat.m13 + this.m02*mat.m23 + this.m03*mat.m33;

    var m10 = this.m10*mat.m00 + this.m11*mat.m10 + this.m12*mat.m20 + this.m13*mat.m30;
    var m11 = this.m10*mat.m01 + this.m11*mat.m11 + this.m12*mat.m21 + this.m13*mat.m31;
    var m12 = this.m10*mat.m02 + this.m11*mat.m12 + this.m12*mat.m22 + this.m13*mat.m32;
    var m13 = this.m10*mat.m03 + this.m11*mat.m13 + this.m12*mat.m23 + this.m13*mat.m33;

    var m20 = this.m20*mat.m00 + this.m21*mat.m10 + this.m22*mat.m20 + this.m23*mat.m30;
    var m21 = this.m20*mat.m01 + this.m21*mat.m11 + this.m22*mat.m21 + this.m23*mat.m31;
    var m22 = this.m20*mat.m02 + this.m21*mat.m12 + this.m22*mat.m22 + this.m23*mat.m32;
    var m23 = this.m20*mat.m03 + this.m21*mat.m13 + this.m22*mat.m23 + this.m23*mat.m33;

    var m30 = this.m30*mat.m00 + this.m31*mat.m10 + this.m32*mat.m20 + this.m33*mat.m30;
    var m31 = this.m30*mat.m01 + this.m31*mat.m11 + this.m32*mat.m21 + this.m33*mat.m31;
    var m32 = this.m30*mat.m02 + this.m31*mat.m12 + this.m32*mat.m22 + this.m33*mat.m32;
    var m33 = this.m30*mat.m03 + this.m31*mat.m13 + this.m32*mat.m23 + this.m33*mat.m33;

    return this.setComponents(
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33
    );
  }

  multiplyByLeft(mat) {
    var m00 = mat.m00*this.m00 + mat.m01*this.m10 + mat.m02*this.m20 + mat.m03*this.m30;
    var m01 = mat.m00*this.m01 + mat.m01*this.m11 + mat.m02*this.m21 + mat.m03*this.m31;
    var m02 = mat.m00*this.m02 + mat.m01*this.m12 + mat.m02*this.m22 + mat.m03*this.m32;
    var m03 = mat.m00*this.m03 + mat.m01*this.m13 + mat.m02*this.m23 + mat.m03*this.m33;

    var m10 = mat.m10*this.m00 + mat.m11*this.m10 + mat.m12*this.m20 + mat.m13*this.m30;
    var m11 = mat.m10*this.m01 + mat.m11*this.m11 + mat.m12*this.m21 + mat.m13*this.m31;
    var m12 = mat.m10*this.m02 + mat.m11*this.m12 + mat.m12*this.m22 + mat.m13*this.m32;
    var m13 = mat.m10*this.m03 + mat.m11*this.m13 + mat.m12*this.m23 + mat.m13*this.m33;

    var m20 = mat.m20*this.m00 + mat.m21*this.m10 + mat.m22*this.m20 + mat.m23*this.m30;
    var m21 = mat.m20*this.m01 + mat.m21*this.m11 + mat.m22*this.m21 + mat.m23*this.m31;
    var m22 = mat.m20*this.m02 + mat.m21*this.m12 + mat.m22*this.m22 + mat.m23*this.m32;
    var m23 = mat.m20*this.m03 + mat.m21*this.m13 + mat.m22*this.m23 + mat.m23*this.m33;

    var m30 = mat.m30*this.m00 + mat.m31*this.m10 + mat.m32*this.m20 + mat.m33*this.m30;
    var m31 = mat.m30*this.m01 + mat.m31*this.m11 + mat.m32*this.m21 + mat.m33*this.m31;
    var m32 = mat.m30*this.m02 + mat.m31*this.m12 + mat.m32*this.m22 + mat.m33*this.m32;
    var m33 = mat.m30*this.m03 + mat.m31*this.m13 + mat.m32*this.m23 + mat.m33*this.m33;

    return this.setComponents(
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33
    );
  }

  /**
   * 行列同士の乗算（static版）
   */
  static multiply(l_m, r_m) {
    var m00 = l_m.m00*r_m.m00 + l_m.m01*r_m.m10 + l_m.m02*r_m.m20 + l_m.m03*r_m.m30;
    var m10 = l_m.m10*r_m.m00 + l_m.m11*r_m.m10 + l_m.m12*r_m.m20 + l_m.m13*r_m.m30;
    var m20 = l_m.m20*r_m.m00 + l_m.m21*r_m.m10 + l_m.m22*r_m.m20 + l_m.m23*r_m.m30;
    var m30 = l_m.m30*r_m.m00 + l_m.m31*r_m.m10 + l_m.m32*r_m.m20 + l_m.m33*r_m.m30;

    var m01 = l_m.m00*r_m.m01 + l_m.m01*r_m.m11 + l_m.m02*r_m.m21 + l_m.m03*r_m.m31;
    var m11 = l_m.m10*r_m.m01 + l_m.m11*r_m.m11 + l_m.m12*r_m.m21 + l_m.m13*r_m.m31;
    var m21 = l_m.m20*r_m.m01 + l_m.m21*r_m.m11 + l_m.m22*r_m.m21 + l_m.m23*r_m.m31;
    var m31 = l_m.m30*r_m.m01 + l_m.m31*r_m.m11 + l_m.m32*r_m.m21 + l_m.m33*r_m.m31;

    var m02 = l_m.m00*r_m.m02 + l_m.m01*r_m.m12 + l_m.m02*r_m.m22 + l_m.m03*r_m.m32;
    var m12 = l_m.m10*r_m.m02 + l_m.m11*r_m.m12 + l_m.m12*r_m.m22 + l_m.m13*r_m.m32;
    var m22 = l_m.m20*r_m.m02 + l_m.m21*r_m.m12 + l_m.m22*r_m.m22 + l_m.m23*r_m.m32;
    var m32 = l_m.m30*r_m.m02 + l_m.m31*r_m.m12 + l_m.m32*r_m.m22 + l_m.m33*r_m.m32;

    var m03 = l_m.m00*r_m.m03 + l_m.m01*r_m.m13 + l_m.m02*r_m.m23 + l_m.m03*r_m.m33;
    var m13 = l_m.m10*r_m.m03 + l_m.m11*r_m.m13 + l_m.m12*r_m.m23 + l_m.m13*r_m.m33;
    var m23 = l_m.m20*r_m.m03 + l_m.m21*r_m.m13 + l_m.m22*r_m.m23 + l_m.m23*r_m.m33;
    var m33 = l_m.m30*r_m.m03 + l_m.m31*r_m.m13 + l_m.m32*r_m.m23 + l_m.m33*r_m.m33;

    return new Matrix44$1(
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33
    );
  }

  toMatrix33() {
    return new Matrix33(
      this.m00, this.m01, this.m02,
      this.m10, this.m11, this.m12,
      this.m20, this.m21, this.m22
    );
  }

  static toMatrix33(mat) {
    return new Matrix33(
      mat.m00, mat.m01, mat.m02,
      mat.m10, mat.m11, mat.m12,
      mat.m20, mat.m21, mat.m22
    );
  }

  determinant() {
    return this.m00*this.m11*this.m22*this.m33 + this.m00*this.m12*this.m23*this.m31 + this.m00*this.m13*this.m21*this.m32 +
      this.m01*this.m10*this.m23*this.m32 + this.m01*this.m12*this.m20*this.m33 + this.m01*this.m13*this.m22*this.m30 +
      this.m02*this.m10*this.m21*this.m33 + this.m02*this.m11*this.m23*this.m30 + this.m02*this.m13*this.m20*this.m31 +
      this.m03*this.m10*this.m22*this.m31 + this.m03*this.m11*this.m20*this.m32 + this.m03*this.m12*this.m21*this.m30 -

      this.m00*this.m11*this.m23*this.m32 - this.m00*this.m12*this.m21*this.m33 - this.m00*this.m13*this.m22*this.m31 -
      this.m01*this.m10*this.m22*this.m33 - this.m01*this.m12*this.m23*this.m30 - this.m01*this.m13*this.m20*this.m32 -
      this.m02*this.m10*this.m23*this.m31 - this.m02*this.m11*this.m20*this.m33 - this.m02*this.m13*this.m21*this.m30 -
      this.m03*this.m10*this.m21*this.m32 - this.m03*this.m11*this.m22*this.m30 - this.m03*this.m12*this.m20*this.m31;
  }

  static determinant(mat) {
    return mat.m00*mat.m11*mat.m22*mat.m33 + mat.m00*mat.m12*mat.m23*mat.m31 + mat.m00*mat.m13*mat.m21*mat.m32 +
      mat.m01*mat.m10*mat.m23*mat.m32 + mat.m01*mat.m12*mat.m20*mat.m33 + mat.m01*mat.m13*mat.m22*mat.m30 +
      mat.m02*mat.m10*mat.m21*mat.m33 + mat.m02*mat.m11*mat.m23*mat.m30 + mat.m02*mat.m13*mat.m20*mat.m31 +
      mat.m03*mat.m10*mat.m22*mat.m31 + mat.m03*mat.m11*mat.m20*mat.m32 + mat.m03*mat.m12*mat.m21*mat.m30 -

      mat.m00*mat.m11*mat.m23*mat.m32 - mat.m00*mat.m12*mat.m21*mat.m33 - mat.m00*mat.m13*mat.m22*mat.m31 -
      mat.m01*mat.m10*mat.m22*mat.m33 - mat.m01*mat.m12*mat.m23*mat.m30 - mat.m01*mat.m13*mat.m20*mat.m32 -
      mat.m02*mat.m10*mat.m23*mat.m31 - mat.m02*mat.m11*mat.m20*mat.m33 - mat.m02*mat.m13*mat.m21*mat.m30 -
      mat.m03*mat.m10*mat.m21*mat.m32 - mat.m03*mat.m11*mat.m22*mat.m30 - mat.m03*mat.m12*mat.m20*mat.m31;
  }

  invert() {
    var det = this.determinant();
    var m00 = (this.m11*this.m22*this.m33 + this.m12*this.m23*this.m31 + this.m13*this.m21*this.m32 - this.m11*this.m23*this.m32 - this.m12*this.m21*this.m33 - this.m13*this.m22*this.m31) / det;
    var m01 = (this.m01*this.m23*this.m32 + this.m02*this.m21*this.m33 + this.m03*this.m22*this.m31 - this.m01*this.m22*this.m33 - this.m02*this.m23*this.m31 - this.m03*this.m21*this.m32) / det;
    var m02 = (this.m01*this.m12*this.m33 + this.m02*this.m13*this.m31 + this.m03*this.m11*this.m32 - this.m01*this.m13*this.m32 - this.m02*this.m11*this.m33 - this.m03*this.m12*this.m31) / det;
    var m03 = (this.m01*this.m13*this.m22 + this.m02*this.m11*this.m23 + this.m03*this.m12*this.m21 - this.m01*this.m12*this.m23 - this.m02*this.m13*this.m21 - this.m03*this.m11*this.m22) / det;
    var m10 = (this.m10*this.m23*this.m32 + this.m12*this.m20*this.m33 + this.m13*this.m22*this.m30 - this.m10*this.m22*this.m33 - this.m12*this.m23*this.m30 - this.m13*this.m20*this.m32) / det;
    var m11 = (this.m00*this.m22*this.m33 + this.m02*this.m23*this.m30 + this.m03*this.m20*this.m32 - this.m00*this.m23*this.m32 - this.m02*this.m20*this.m33 - this.m03*this.m22*this.m30) / det;
    var m12 = (this.m00*this.m13*this.m32 + this.m02*this.m10*this.m33 + this.m03*this.m12*this.m30 - this.m00*this.m12*this.m33 - this.m02*this.m13*this.m30 - this.m03*this.m10*this.m32) / det;
    var m13 = (this.m00*this.m12*this.m23 + this.m02*this.m13*this.m20 + this.m03*this.m10*this.m22 - this.m00*this.m13*this.m22 - this.m02*this.m10*this.m23 - this.m03*this.m12*this.m20) / det;
    var m20 = (this.m10*this.m21*this.m33 + this.m11*this.m23*this.m30 + this.m13*this.m20*this.m31 - this.m10*this.m23*this.m31 - this.m11*this.m20*this.m33 - this.m13*this.m21*this.m30) / det;
    var m21 = (this.m00*this.m23*this.m31 + this.m01*this.m20*this.m33 + this.m03*this.m21*this.m30 - this.m00*this.m21*this.m33 - this.m01*this.m23*this.m30 - this.m03*this.m20*this.m31) / det;
    var m22 = (this.m00*this.m11*this.m33 + this.m01*this.m13*this.m30 + this.m03*this.m10*this.m31 - this.m00*this.m13*this.m31 - this.m01*this.m10*this.m33 - this.m03*this.m11*this.m30) / det;
    var m23 = (this.m00*this.m13*this.m21 + this.m01*this.m10*this.m23 + this.m03*this.m11*this.m20 - this.m00*this.m11*this.m23 - this.m01*this.m13*this.m20 - this.m03*this.m10*this.m21) / det;
    var m30 = (this.m10*this.m22*this.m31 + this.m11*this.m20*this.m32 + this.m12*this.m21*this.m30 - this.m10*this.m21*this.m32 - this.m11*this.m22*this.m30 - this.m12*this.m20*this.m31) / det;
    var m31 = (this.m00*this.m21*this.m32 + this.m01*this.m22*this.m30 + this.m02*this.m20*this.m31 - this.m00*this.m22*this.m31 - this.m01*this.m20*this.m32 - this.m02*this.m21*this.m30) / det;
    var m32 = (this.m00*this.m12*this.m31 + this.m01*this.m10*this.m32 + this.m02*this.m11*this.m30 - this.m00*this.m11*this.m32 - this.m01*this.m12*this.m30 - this.m02*this.m10*this.m31) / det;
    var m33 = (this.m00*this.m11*this.m22 + this.m01*this.m12*this.m20 + this.m02*this.m10*this.m21 - this.m00*this.m12*this.m21 - this.m01*this.m10*this.m22 - this.m02*this.m11*this.m20) / det;

    return this.setComponents(
      m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33
    );
  }

  static invert(mat) {
    var det = mat.determinant();
    var m00 = (mat.m11*mat.m22*mat.m33 + mat.m12*mat.m23*mat.m31 + mat.m13*mat.m21*mat.m32 - mat.m11*mat.m23*mat.m32 - mat.m12*mat.m21*mat.m33 - mat.m13*mat.m22*mat.m31) / det;
    var m01 = (mat.m01*mat.m23*mat.m32 + mat.m02*mat.m21*mat.m33 + mat.m03*mat.m22*mat.m31 - mat.m01*mat.m22*mat.m33 - mat.m02*mat.m23*mat.m31 - mat.m03*mat.m21*mat.m32) / det;
    var m02 = (mat.m01*mat.m12*mat.m33 + mat.m02*mat.m13*mat.m31 + mat.m03*mat.m11*mat.m32 - mat.m01*mat.m13*mat.m32 - mat.m02*mat.m11*mat.m33 - mat.m03*mat.m12*mat.m31) / det;
    var m03 = (mat.m01*mat.m13*mat.m22 + mat.m02*mat.m11*mat.m23 + mat.m03*mat.m12*mat.m21 - mat.m01*mat.m12*mat.m23 - mat.m02*mat.m13*mat.m21 - mat.m03*mat.m11*mat.m22) / det;
    var m10 = (mat.m10*mat.m23*mat.m32 + mat.m12*mat.m20*mat.m33 + mat.m13*mat.m22*mat.m30 - mat.m10*mat.m22*mat.m33 - mat.m12*mat.m23*mat.m30 - mat.m13*mat.m20*mat.m32) / det;
    var m11 = (mat.m00*mat.m22*mat.m33 + mat.m02*mat.m23*mat.m30 + mat.m03*mat.m20*mat.m32 - mat.m00*mat.m23*mat.m32 - mat.m02*mat.m20*mat.m33 - mat.m03*mat.m22*mat.m30) / det;
    var m12 = (mat.m00*mat.m13*mat.m32 + mat.m02*mat.m10*mat.m33 + mat.m03*mat.m12*mat.m30 - mat.m00*mat.m12*mat.m33 - mat.m02*mat.m13*mat.m30 - mat.m03*mat.m10*mat.m32) / det;
    var m13 = (mat.m00*mat.m12*mat.m23 + mat.m02*mat.m13*mat.m20 + mat.m03*mat.m10*mat.m22 - mat.m00*mat.m13*mat.m22 - mat.m02*mat.m10*mat.m23 - mat.m03*mat.m12*mat.m20) / det;
    var m20 = (mat.m10*mat.m21*mat.m33 + mat.m11*mat.m23*mat.m30 + mat.m13*mat.m20*mat.m31 - mat.m10*mat.m23*mat.m31 - mat.m11*mat.m20*mat.m33 - mat.m13*mat.m21*mat.m30) / det;
    var m21 = (mat.m00*mat.m23*mat.m31 + mat.m01*mat.m20*mat.m33 + mat.m03*mat.m21*mat.m30 - mat.m00*mat.m21*mat.m33 - mat.m01*mat.m23*mat.m30 - mat.m03*mat.m20*mat.m31) / det;
    var m22 = (mat.m00*mat.m11*mat.m33 + mat.m01*mat.m13*mat.m30 + mat.m03*mat.m10*mat.m31 - mat.m00*mat.m13*mat.m31 - mat.m01*mat.m10*mat.m33 - mat.m03*mat.m11*mat.m30) / det;
    var m23 = (mat.m00*mat.m13*mat.m21 + mat.m01*mat.m10*mat.m23 + mat.m03*mat.m11*mat.m20 - mat.m00*mat.m11*mat.m23 - mat.m01*mat.m13*mat.m20 - mat.m03*mat.m10*mat.m21) / det;
    var m30 = (mat.m10*mat.m22*mat.m31 + mat.m11*mat.m20*mat.m32 + mat.m12*mat.m21*mat.m30 - mat.m10*mat.m21*mat.m32 - mat.m11*mat.m22*mat.m30 - mat.m12*mat.m20*mat.m31) / det;
    var m31 = (mat.m00*mat.m21*mat.m32 + mat.m01*mat.m22*mat.m30 + mat.m02*mat.m20*mat.m31 - mat.m00*mat.m22*mat.m31 - mat.m01*mat.m20*mat.m32 - mat.m02*mat.m21*mat.m30) / det;
    var m32 = (mat.m00*mat.m12*mat.m31 + mat.m01*mat.m10*mat.m32 + mat.m02*mat.m11*mat.m30 - mat.m00*mat.m11*mat.m32 - mat.m01*mat.m12*mat.m30 - mat.m02*mat.m10*mat.m31) / det;
    var m33 = (mat.m00*mat.m11*mat.m22 + mat.m01*mat.m12*mat.m20 + mat.m02*mat.m10*mat.m21 - mat.m00*mat.m12*mat.m21 - mat.m01*mat.m10*mat.m22 - mat.m02*mat.m11*mat.m20) / det;

    return new Matrix44$1(
      m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33
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

  set m30(val) {
    this.m[3] = val;
  }

  get m30() {
    return this.m[3];
  }

  set m01(val) {
    this.m[4] = val;
  }

  get m01() {
    return this.m[4];
  }

  set m11(val) {
    this.m[5] = val;
  }

  get m11() {
    return this.m[5];
  }

  set m21(val) {
    this.m[6] = val;
  }

  get m21() {
    return this.m[6];
  }

  set m31(val) {
    this.m[7] = val;
  }

  get m31() {
    return this.m[7];
  }

  set m02(val) {
    this.m[8] = val;
  }

  get m02() {
    return this.m[8];
  }

  set m12(val) {
    this.m[9] = val;
  }

  get m12() {
    return this.m[9];
  }

  set m22(val) {
    this.m[10] = val;
  }

  get m22() {
    return this.m[10];
  }

  set m32(val) {
    this.m[11] = val;
  }

  get m32() {
    return this.m[11];
  }

  set m03(val) {
    this.m[12] = val;
  }

  get m03() {
    return this.m[12];
  }

  set m13(val) {
    this.m[13] = val;
  }

  get m13() {
    return this.m[13];
  }

  set m23(val) {
    this.m[14] = val;
  }

  get m23() {
    return this.m[14];
  }

  set m33(val) {
    this.m[15] = val;
  }

  get m33() {
    return this.m[15];
  }

  toString() {
    return this.m00 + ' ' + this.m01 + ' ' + this.m02 + ' ' + this.m03 + ' \n' +
      this.m10 + ' ' + this.m11 + ' ' + this.m12 + ' ' + this.m13 + ' \n' +
      this.m20 + ' ' + this.m21 + ' ' + this.m22 + ' ' + this.m23 + ' \n' +
      this.m30 + ' ' + this.m31 + ' ' + this.m32 + ' ' + this.m33 + ' \n';
  }

  nearZeroToZero(value) {
    if (Math.abs(value) < 0.00001) {
      value = 0;
    } else if (0.99999 < value && value < 1.00001) {
      value = 1;
    } else if (-1.00001 < value && value < -0.99999) {
      value = -1;
    }
    return value;
  }

  toStringApproximately() {
    return this.nearZeroToZero(this.m00) + ' ' + this.nearZeroToZero(this.m01) + ' ' + this.nearZeroToZero(this.m02) + ' ' + this.nearZeroToZero(this.m03) + ' \n' +
      this.nearZeroToZero(this.m10) + ' ' + this.nearZeroToZero(this.m11) + ' ' + this.nearZeroToZero(this.m12) + ' ' + this.nearZeroToZero(this.m13) + ' \n' +
      this.nearZeroToZero(this.m20) + ' ' + this.nearZeroToZero(this.m21) + ' ' + this.nearZeroToZero(this.m22) + ' ' + this.nearZeroToZero(this.m23) + ' \n' +
      this.nearZeroToZero(this.m30) + ' ' + this.nearZeroToZero(this.m31) + ' ' + this.nearZeroToZero(this.m32) + ' ' + this.nearZeroToZero(this.m33) + ' \n';
  }

  getScale() {
    return new Vector3(
      Math.sqrt(this.m00 * this.m00 + this.m01 * this.m01 + this.m02 * this.m02),
      Math.sqrt(this.m10 * this.m10 + this.m11 * this.m11 + this.m12 * this.m12),
      Math.sqrt(this.m20 * this.m20 + this.m21 * this.m21 + this.m22 * this.m22)
    );
  }
}

GLBoost$1["Matrix44"] = Matrix44$1;

class Quaternion {

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
    return new Quaternion(this.x, this.y, this.z, this.w);
  }

  static invert(quat) {
    return new Quaternion(-quat.x, -quat.y, -quat.z, quat.w).multiply(1.0/(quat.x*quat.x + quat.y*quat.y + quat.z*quat.z + quat.w*quat.w));
  }

  static qlerp(lhq, rhq, ratio) {

    var q = new Quaternion(0, 0, 0, 1);
    var qr = lhq.w * rhq.w + lhq.x * rhq.x + lhq.y * rhq.y + lhq.z * rhq.z;
    var ss = 1.0 - qr * qr;

    if (ss === 0.0) {
      q.w = lhq.w;
      q.x = lhq.x;
      q.y = lhq.y;
      q.z = lhq.z;

      return q;
    } else {

      if (qr > 1) {
        qr = 0.999;
      } else if (qr < -1) {
        qr = -0.999;
      }

      let ph = Math.acos(qr);
      let s2;
      if(qr < 0.0 && ph > Math.PI / 2.0){
        qr = - lhq.w * rhq.w - lhq.x * rhq.x - lhq.y * rhq.y - lhq.z * rhq.z;
        ph = Math.acos(qr);
        s2 = -1 * Math.sin(ph * ratio) / Math.sin(ph);
      } else {
        s2 = Math.sin(ph * ratio) / Math.sin(ph);
      }
      let s1 = Math.sin(ph * (1.0 - ratio)) / Math.sin(ph);

      q.x = lhq.x * s1 + rhq.x * s2;
      q.y = lhq.y * s1 + rhq.y * s2;
      q.z = lhq.z * s1 + rhq.z * s2;
      q.w = lhq.w * s1 + rhq.w * s2;

      return q;
    }
  }

  get rotationMatrix() {
    var sx = this.x * this.x;
    var sy = this.y * this.y;
    var sz = this.z * this.z;
    var cx = this.y * this.z;
    var cy = this.x * this.z;
    var cz = this.x * this.y;
    var wx = this.w * this.x;
    var wy = this.w * this.y;
    var wz = this.w * this.z;

    return new Matrix44$1(
      1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), 0.0,
      2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), 0.0,
      2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), 0.0,
      0.0, 0.0, 0.0, 1.0
    );
  }

  axisAngle(axisVec3, angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }
    var halfAngle = 0.5 * radian;
    var sin = Math.sin(halfAngle);

    var axis = Vector3.normalize(axisVec3);
    this.w = Math.cos(halfAngle);
    this.x = sin * axis.x;
    this.y = sin * axis.y;
    this.z = sin * axis.z;

    return this;
  }

  static axisAngle(axisVec3, angle) {
    var radian = 0;
    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      radian = MathUtil.degreeToRadian(angle);
    } else {
      radian = angle;
    }
    var halfAngle = 0.5 * radian;
    var sin = Math.sin(halfAngle);

    var axis = Vector3.normalize(axisVec3);
    return new Quaternion(
      sin * axis.x,
      sin * axis.y,
      sin * axis.z,
      Math.cos(halfAngle));
  }

  add(q) {
    this.x += q.x;
    this.y += q.y;
    this.z += q.z;
    this.w += q.w;

    return this;
  }

  multiply(q) {
    let result = new Quaternion(0, 0, 0, 1);
    result.w = this.w*q.w - this.x*q.x - this.y*q.y - this.z*q.z;
    result.x = this.w*q.x + this.x*q.w + this.y*q.z - this.z*q.y;
    result.y = this.w*q.y + this.y*q.w + this.x*q.z - this.z*q.x;
    result.z = this.w*q.z + this.z*q.w + this.x*q.y - this.y*q.x;
    this.x = result.x;
    this.y = result.y;
    this.z = result.z;
    this.w = result.w;
    
    return this;
  }

  static multiply(q1, q2) {
    let result = new Quaternion(0, 0, 0, 1);
    result.w = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
    result.x = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
    result.y = q1.w*q2.y + q1.y*q2.w + q1.x*q2.z - q1.z*q2.x;
    result.z = q1.w*q2.z + q1.z*q2.w + q1.x*q2.y - q1.y*q2.x;
    return result;
  }

  static quaternionFromRotationMatrix(m) {
    
    let q = new Quaternion();
    let tr = m.m00 + m.m11 + m.m22;

    if (tr > 0) { 
      let S = 0.5 / Math.sqrt(tr+1.0);
      q.w = 0.25 / S;
      q.x = (m.m21 - m.m12) * S;
      q.y = (m.m02 - m.m20) * S; 
      q.z = (m.m10 - m.m01) * S; 
    } else if ((m.m00 > m.m11) && (m.m00 > m.m22)) { 
      let S = Math.sqrt(1.0 + m.m00 - m.m11 - m.m22) * 2;
      q.w = (m.m21 - m.m12) / S;
      q.x = 0.25 * S;
      q.y = (m.m01 + m.m10) / S; 
      q.z = (m.m02 + m.m20) / S; 
    } else if (m.m11 > m.m22) { 
      let S = Math.sqrt(1.0 + m.m11 - m.m00 - m.m22) * 2;
      q.w = (m.m02 - m.m20) / S;
      q.x = (m.m01 + m.m10) / S; 
      q.y = 0.25 * S;
      q.z = (m.m12 + m.m21) / S; 
    } else { 
      let S = Math.sqrt(1.0 + m.m22 - m.m00 - m.m11) * 2;
      q.w = (m.m10 - m.m01) / S;
      q.x = (m.m02 + m.m20) / S;
      q.y = (m.m12 + m.m21) / S;
      q.z = 0.25 * S;
    }

    return q;
  }

  at(i) {
    switch (i%4) {
    case 0: return this.x;
    case 1: return this.y;
    case 2: return this.z;
    case 3: return this.w;
    }
  }

  setAt(i, val) {
    switch (i%4) {
    case 0: this.x = val; break;
    case 1: this.y = val; break;
    case 2: this.z = val; break;
    case 3: this.w = val; break;
    }
  }

  normalize() {
    let norm = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w);
    this.x /= norm;
    this.y /= norm;
    this.z /= norm;
    this.w /= norm;
    return this;
  }

}

GLBoost$1["Quaternion"] = Quaternion;

class MathUtil {

  constructor() {

  }

  static radianToDegree(rad) {
    return rad * 180 / Math.PI;
  }

  static degreeToRadian(deg) {
    return deg * Math.PI / 180;
  }

  static arrayToVector(element) {
    if (Array.isArray(element)) {
      if(typeof(element[3]) !== 'undefined') {
        return new Vector4(element[0], element[1], element[2], element[3]);
      } else if (typeof(element[2]) !== 'undefined') {
        return new Vector3(element[0], element[1], element[2]);
      } else {
        return new Vector2(element[0], element[1]);
      }
    } else {
      return element;
    }
  }

  static makeSubArray(array, componentN) {
    if (componentN === 4) {
      return [array[0], array[1], array[2], array[3]];
    } else if (componentN === 3) {
      return [array[0], array[1], array[2]];
    } else if (componentN === 2) {
      return [array[0], array[1]];
    } else {
      return array[0];
    }
  }

  static vectorToArray(element) {
    if(element instanceof Vector2) {
      return [element.x, element.y];
    } else if (element instanceof Vector3) {
      return [element.x, element.y, element.z];
    } else if (element instanceof Vector4 || element instanceof Quaternion) {
      return [element.x, element.y, element.z, element.w];
    } else {
      return element;
    }
  }

  static compomentNumberOfVector(element) {
    if(element instanceof Vector2) {
      return 2;
    } else if (element instanceof Vector3) {
      return 3;
    } else if (element instanceof Vector4 || element instanceof Quaternion) {
      return 4;
    } else if (Array.isArray(element)) {
      return element.length;
    } else {
      return 0;
    }
  }

  // values range must be [-1, 1]
  static packNormalizedVec4ToVec2(x, y, z, w, criteria) {
    let v0 = 0.0;
    let v1 = 0.0;
    
    x = (x + 1)/2.0;
    y = (y + 1)/2.0;
    z = (z + 1)/2.0;
    w = (w + 1)/2.0;

    let ir = Math.floor(x*(criteria-1.0));
    let ig = Math.floor(y*(criteria-1.0));
    let irg = ir*criteria + ig;
    v0 = irg / criteria; 

    let ib =  Math.floor(z*(criteria-1.0));
    let ia =  Math.floor(w*(criteria-1.0));
    let iba = ib*criteria + ia;
    v1 =iba / criteria; 
    
    return [v0, v1];
  }
}

GLBoost$1["MathUtil"] = MathUtil;

class Vector3 {

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

    this.x = x;
    this.y = y;
    this.z = z;

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
   * add value
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  /**
   * add value（static version）
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

  multiplyVector(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;

    return this;
  }

  static multiply(vec3, val) {
    return new Vector3(vec3.x * val, vec3.y * val, vec3.z * val);
  }

  static multiplyVector(vec3, vec) {
    return new Vector3(vec3.x * vec.x, vec3.y * vec.y, vec3.z * vec.z);
  }

  static angleOfVectors(lhv, rhv) {
    let cos_sita = Vector3.dotProduct(lhv, rhv) / ( lhv.length() * rhv.length() );

    let sita = Math.acos(cos_sita);

    if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
      sita = MathUtil.radianToDegree(sita);
    }

    return sita;
  }

  divideVector(vec3) {
    this.x /= vec3.x;
    this.y /= vec3.y;
    this.z /= vec3.z;

    return this;
  }

  static divideVector(lvec3, rvec3) {
    return new Vector3(lvec3.x / rvec3.x, lvec3.y / rvec3.y, lvec3.z / rvec3.z);
  }


  toVector4() {
    return new Vector4(this.x, this.y, this.z, 1.0);
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ', ' + this.z +')';
  }

  at(i) {
    switch (i%3) {
    case 0: return this.x;
    case 1: return this.y;
    case 2: return this.z;
    }
  }
}

GLBoost$1['Vector3'] = Vector3;

class MiscUtil {

  constructor() {

  }

  static isDefinedAndTrue(value) {
    return !!(typeof value !== 'undefined' && value);
  }

  static getTheValueOrAlternative(value, alternativeIfTheValueIsNullOrUndefined) {
    if (typeof value !== 'undefined' && value != null) {
      return value;
    } else {
      return alternativeIfTheValueIsNullOrUndefined;
    }
  }

  static isJavaScriptObjectType(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }
  
  static consoleLog(logType, text) {
    if (GLBoost$1.VALUE_CONSOLE_OUT_FOR_DEBUGGING && GLBoost$1.valueOfGLBoostConstants[logType]) {
      console.log(text);
    }
  }
}

GLBoost$1['MiscUtil'] = MiscUtil;

class GLContextImpl {

  constructor(canvas, parent) {
//    if (new.target === GLContextImpl) {
    if (this.constructor === GLContextImpl) {
      throw new TypeError("Cannot construct GLContextImpl instances directly");
    }

    if (!(parent instanceof GLContext)) {
      throw new Error("This concrete class can only be instantiated from the 'GLContext' class.");
    }

    if (canvas === void 0) {
      throw new Error("Failed to create WebGL Context due to no canvas object.");
    }

    this._canvas = canvas;

  }

  init(glVersionString, ContextType, gl) {

    if (gl) {
      this._gl = gl;
    } else {

      let gl = this._canvas.getContext(glVersionString, { antialias: true, premultipliedAlpha: false });

      if (!gl) {
        gl = this._canvas.getContext('experimental-' + glVersionString);
        if (!gl) {
          throw new Error("This platform doesn't support WebGL.");
        }
      }

      if (!gl instanceof ContextType) {
        throw new Error("Unexpected rendering context.");
      }

      this._gl = gl;
    }
  }

  get gl() {
    return this._gl;
  }

  set gl(gl) {
    this._gl = gl;
  }

  get canvas() {
    return this._canvas;
  }

}

class GLContextWebGL1Impl extends GLContextImpl {

  constructor(canvas, parent, gl) {
    super(canvas, parent);

    if (gl) {
      super.init('webgl', null, gl);
    } else {
      super.init('webgl', WebGLRenderingContext, gl);
    }
  }

}

class GLContextWebGL2Impl extends GLContextImpl {

  constructor(canvas, parent, gl) {
    super(canvas, parent);

    super.init('webgl2', WebGL2RenderingContext, gl);

  }

}

class GLExtensionsManager {

  constructor(glContext) {
    var gl = glContext.gl;

    if (GLBoost$1.VALUE_WEBGL_ONE_USE_EXTENSIONS) {
      this._extVAO = gl.getExtension('OES_vertex_array_object');

      this._extDBs = gl.getExtension('WEBGL_draw_buffers');

      this._extTFA = gl.getExtension('EXT_texture_filter_anisotropic') ||
        gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
        gl.getExtension('MOZ_EXT_texture_filter_anisotropic');

      this._extEIUI = gl.getExtension('OES_element_index_uint');

      this._extDepthTex = gl.getExtension('WEBGL_depth_texture');

      this._extStdDerivatives = gl.getExtension("OES_standard_derivatives");

      this._extTFL = gl.getExtension("OES_texture_float_linear");
    }

    GLExtensionsManager._instances[glContext.belongingCanvasId] = this;

    this._glContext = glContext;
  }
  static getInstance(glContext) {
    if (GLExtensionsManager._instances[glContext.belongingCanvasId]) {
      return GLExtensionsManager._instances[glContext.belongingCanvasId];
    }
    return new GLExtensionsManager(glContext);
  }

  get extVAO() {
    return this._extVAO;
  }

  get extDBs() {
    return this._extDBs;
  }

  get extTFA() {
    return this._extTFA;
  }

  get extDepthTex() {
    return this._extDepthTex;
  }

  createVertexArray(gl) {
    if (GLBoost$1.isThisGLVersion_2(gl)) {
      return gl.createVertexArray();
    } else if (this._extVAO) {
      return this._extVAO.createVertexArrayOES();
    } else {
      return null;
    }

    this._glContext.checkGLError();
  }

  bindVertexArray(gl, vao) {
    if (GLBoost$1.isThisGLVersion_2(gl)) {
      gl.bindVertexArray(vao);
      return true;
    } else if (this._extVAO) {
      this._extVAO.bindVertexArrayOES(vao);
      return true;
    } else {
      return false;
    }

    this._glContext.checkGLError();
  }

  drawBuffers(gl, buffers) {
    let buffer = buffers;
    if (GLBoost$1.isThisGLVersion_2(gl)) {
      gl.drawBuffers(buffers);
      buffer = buffer[0];
    } else if (this._extDBs) {
      this.extDBs.drawBuffersWEBGL(buffers);
      buffer = buffer[0];
    }

    if (buffer === gl.NONE) {
      gl.colorMask(false, false, false, false);
    } else {
      gl.colorMask(true, true, true, true);
    }

    this._glContext.checkGLError();
  }

  readBuffer(gl, buffers) {
    let buffer = buffers;
    if (GLBoost$1.isThisGLVersion_2(gl)) {
      buffer = buffer[0];
    } else if (this._extDBs) {
      buffer = buffer[0];
    }

    gl.readBuffer(buffer);

    this._glContext.checkGLError();
  }


  colorAttachiment(gl, index) {
    return this._extDBs ?
      this._extDBs[`COLOR_ATTACHMENT${index}_WEBGL`] :
      gl[`COLOR_ATTACHMENT${index}`];
  }

  elementIndexBitSizeGLConstant(gl) {
    if (GLBoost$1.isThisGLVersion_2(gl) || this._extEIUI) {
      return gl.UNSIGNED_INT;
    } else {
      return gl.UNSIGNED_SHORT;
    }
  }

  elementIndexByteSizeNumber(gl) {
    if (GLBoost$1.isThisGLVersion_2(gl) || this._extEIUI) {
      return 4;
    } else {
      return 2;
    }
  }

  createUintArrayForElementIndex(gl, array) {
    if (GLBoost$1.isThisGLVersion_2(gl) || this._extEIUI) {
      return new Uint32Array(array);
    } else {
      return new Uint16Array(array);
    }
  }

}
GLExtensionsManager._instances = new Object();

GLBoost$1['GLExtensionsManager'] = GLExtensionsManager;

let singleton = Symbol();

class L_GLBoostMonitor {
  constructor(enforcer) {
    if (enforcer !== L_GLBoostMonitor._singletonEnforcer || !(this instanceof L_GLBoostMonitor)) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    this._glBoostObjects = {};
    this._glResources = [];
    L_GLBoostMonitor._singletonEnforcer = Symbol();
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new L_GLBoostMonitor(L_GLBoostMonitor._singletonEnforcer);
    }
    return this[singleton];
  }

  registerGLBoostObject(glBoostObject) {
    this._glBoostObjects[glBoostObject.toString()] = glBoostObject;
    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, 'GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was created.');
  }

  deregisterGLBoostObject(glBoostObject) {
    delete this._glBoostObjects[glBoostObject.toString()];
    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, 'GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was ready for discard.');
  }


  getGLBoostObjects(partOfGlBoostObjectClassName) {
    let glBoostObjects = [];
    for (let instanceName in this._glBoostObjects) {
      if (instanceName.indexOf(partOfGlBoostObjectClassName)>0) {
        glBoostObjects.push(this._glBoostObjects[instanceName]);
      }
    }

    return glBoostObjects;
  }

  getGLBoostObjectWhichHasThisObjectId(objectId) {
    for (let instanceName in this._glBoostObjects) {
      if (this._glBoostObjects[instanceName].objectIndex === objectId) {
        return this._glBoostObjects[instanceName];
      }
    }

    return null;
  }

  printGLBoostObjects() {
    var objects = this._glBoostObjects;
    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [begin] ==========');
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        MiscUtil.consoleLog(key + '(' + objects[key].belongingCanvasId + ')');
      }
    }
    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [end] ==========');
  }

  printGLBoostObjectsOrderByName() {
    var objects = this._glBoostObjects;
    var objectArray = [];
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        objectArray.push(objects[key]);
      }
    }
    objectArray.sort(
      function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
      }
    );
    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [begin] ==========');
    objectArray.forEach((object)=>{
      MiscUtil.consoleLog(object.toString() + ' (' + object.belongingCanvasId + ')');
    });
    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [end] ==========');
  }

  registerWebGLResource(glBoostObject, glResource) {
    var glResourceName = glResource.constructor.name;
    this._glResources.push([glBoostObject, glResource]);
    MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, 'WebGL Resource: ' + glResourceName + ' was created by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
  }

  deregisterWebGLResource(glBoostObject, glResource) {
    var glResourceName = glResource.constructor.name;
    this._glResources.forEach((glResource, i)=>{
      if (glResource[0] === glBoostObject && glResource[1].constructor.name === glResourceName) {
        this._glResources.splice(i,1);
      }
    });
    MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, 'WebGL Resource: ' + glResourceName + ' was deleted by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
  }

  getWebGLResources(webglResourceName) {
    let webglResources = this._glResources.filter((glResourceArray)=>{
      if (glResourceArray[1].constructor.name === webglResourceName) {
        return true;
      } else {
        return false;
      }
    });//.map((glReourceArray)=>{return glReourceArray[1]});

    return webglResources;
  }

  printWebGLResources() {
    var glResources = this._glResources;
    glResources.sort(
      function(a,b){
        if( a[0] < b[0] ) return -1;
        if( a[0] > b[0] ) return 1;
        return 0;
      }
    );
    MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, '========== WebGL Resource Lists [begin] ==========');
    glResources.forEach((glResource, i)=>{
      MiscUtil.consoleLog(i+1 +': ' + glResource[0].toString() + ' (' + glResource[0].belongingCanvasId + ') created ' + glResource[1]);
    });
    MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, '========== WebGL Resource Lists [end] ==========');
  }

  printHierarchy() {
    var glBoostObjects = this._glBoostObjects;
    var scenes = [];
    for (var key in glBoostObjects) {
      if (glBoostObjects.hasOwnProperty(key)) {
        if ( key.match(/Scene/)) {
          scenes.push(glBoostObjects[key]);
        }
      }
    }

    function putWhiteSpace(level) {
      var str = '';
      for(var i=0; i<level; i++)  {
        str += '  ';
      }
      return str;
    }

    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Objects Hierarchy of Scenes [begin] ==========');
    scenes.forEach((scene)=> {
      var outputText = (function searchRecursively(element, level) {
        var outputText = '';
        outputText += putWhiteSpace(level) + element.toString() + ' (' + element.belongingCanvasId + ')\n';
        if (typeof element.getChildren === 'undefined') {
          return outputText;
        }
        var children = element.getChildren();
        children.forEach((child)=>{
          outputText += searchRecursively(child, level+1);
        });
        return outputText += '\n';
      })(scene, 0);

      outputText = outputText.replace( /\n+/g , '\n');
      MiscUtil.consoleLog(outputText);
    });
    MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Objects Hierarchy of Scenes [end] ==========');

  }

}

GLBoost$1['L_GLBoostMonitor'] = L_GLBoostMonitor;

class GLContext {

  constructor(canvas, gl, width, height) {

    if (typeof gl !== 'undefined' && gl !== null) {
      this.impl = new GLContextWebGL1Impl(canvas, this, gl);
      this._canvasWidth = width;
      this._canvasHeight = height;
      GLContext._instances['nocanvas'] = this;
    } else {
      if (GLContext._instances[canvas.id] instanceof GLContext) {
        return GLContext._instances[canvas.id];
      }

      if (GLBoost$1.VALUE_TARGET_WEBGL_VERSION === 1) {
        this.impl = new GLContextWebGL1Impl(canvas, this);
      } else if (GLBoost$1.VALUE_TARGET_WEBGL_VERSION === 2) {
        this.impl = new GLContextWebGL2Impl(canvas, this);
      }

      GLContext._instances[canvas.id] = this;
      this._canvasWidth = canvas.width;
      this._canvasHeight = canvas.height;
    }

    this._monitor = L_GLBoostMonitor.getInstance();
    this._glslProgramsLatestUsageCount = 0;
  }

  static getInstance(canvas, gl, width, height) {
    if (typeof canvas === 'string') {
      canvas = window.document.querySelector(canvas);
    }
    return new GLContext(canvas, gl, width, height);
  }

  get gl() {
    return this.impl.gl;
  }

  set gl(gl) {
    this.impl.gl = gl;
  }

  get belongingCanvasId() {
    if (this.impl.canvas) {
      return this.impl.canvas.id;
    } else {
      return 'nocanvas';
    }
  }

  get canvas() {
    return this.impl.canvas;
  }

  checkGLError() {
    if (GLBoost$1.VALUE_CONSOLE_OUT_FOR_DEBUGGING === false) {
      return;
    }
    if (GLBoost$1.valueOfGLBoostConstants[GLBoost$1.LOG_GL_ERROR] === false) {
      return;
    }

    let gl = this.impl.gl;
    let errorCode = gl.getError();
    if (errorCode !== 0) {
      let errorTypes = ['INVALID_ENUM', 'INVALID_VALUE', 'INVALID_OPERATION', 'INVALID_FRAMEBUFFER_OPERATION',
        'OUT_OF_MEMORY', 'CONTEXT_LOST_WEBGL'];
      let errorMessages = [
        'An unacceptable value has been specified for an enumerated argument. The command is ignored and the error flag is set.',
        'A numeric argument is out of range. The command is ignored and the error flag is set.',
        'The specified command is not allowed for the current state. The command is ignored and the error flag is set.',
        'The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.',
        'Not enough memory is left to execute the command.',
        'If the WebGL context is lost, this error is returned on the first call to getError. Afterwards and until the context has been restored, it returns gl.NO_ERROR.'
      ];

      errorTypes.forEach((errorType, i)=>{
        if (gl[errorType] === errorCode) {
          MiscUtil.consoleLog(GLBoost$1.LOG_GL_ERROR, 'WebGL Error: gl.' + errorCode + '\n' + 'Meaning:' + errorMessages[i]);
        }
      });
    }
  }

  createVertexArray(glBoostObject) {
    var gl = this.gl;
    var glem = GLExtensionsManager.getInstance(this);
    var glResource = glem.createVertexArray(gl);
    if (glResource) {
      this._monitor.registerWebGLResource(glBoostObject, glResource);
    }

    this.checkGLError();

    return glResource;
  }

  createBuffer(glBoostObject) {
    var glResource = this.gl.createBuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  createFramebuffer(glBoostObject) {
    var glResource = this.gl.createFramebuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteFramebuffer(glBoostObject, frameBuffer) {
    this._monitor.deregisterWebGLResource(glBoostObject, frameBuffer);
    this.gl.deleteFramebuffer(frameBuffer);

    this.checkGLError();

    frameBuffer = null;
  }

  createRenderbuffer(glBoostObject) {
    var glResource = this.gl.createRenderbuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteRenderbuffer(glBoostObject, renderBuffer) {
    this._monitor.deregisterWebGLResource(glBoostObject, renderBuffer);
    this.gl.deleteRenderbuffer(renderBuffer);

    this.checkGLError();

    renderBuffer = null;
  }

  createShader(glBoostObject, shaderType) {
    var glResource = this.gl.createShader(shaderType);
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteShader(glBoostObject, shader) {
    this._monitor.deregisterWebGLResource(glBoostObject, shader);
    this.gl.deleteShader(shader);

    this.checkGLError();

    shader = null;
  }

  createProgram(glBoostObject) {
    var glResource = this.gl.createProgram();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  useProgram(program) {
//    if (!program) {
      this.gl.useProgram(program);
      this._currentProgramInuse = program;

      this.checkGLError();
      this._glslProgramsLatestUsageCount++;
/*
      return;
    }

    if (program.glslProgramsSelfUsageCount < this.glslProgramsLatestUsageCount) {
      this.gl.useProgram(program);
      this.checkGLError();
      this._glslProgramsLatestUsageCount++;
      program.glslProgramsSelfUsageCount = this._glslProgramsLatestUsageCount;

      return;
    }

    MiscUtil.consoleLog(GLBoost.LOG_OMISSION_PROCESSING,
      'LOG_OMISSION_PROCESSING: gl.useProgram call has been omitted since this glsl program is already in use.');
      */
  }

  deleteProgram(glBoostObject, program) {
    this._monitor.deregisterWebGLResource(glBoostObject, program);
    this.gl.deleteProgram(program);

    this.checkGLError();
  }

  deleteAllPrograms() {
    let programObjs = this._monitor.getWebGLResources('WebGLProgram');
    for (let programObj of programObjs) {
      this.deleteProgram(programObj[0], programObj[1]);
    }
  }

  getUniformLocation(glslProgram, uniformVariableName) {
    let uniformLocation = this.gl.getUniformLocation(glslProgram, uniformVariableName);
    this.checkGLError();
    if (uniformLocation) {
      uniformLocation.glslProgram = glslProgram;
      uniformLocation.glslProgramUsageCountWhenLastSet = -1;
    }

    return uniformLocation;
  }

  _setUniformValues(uniformFuncStr, args, forceUpdate) {
    let uniformLocation = args[0];
    if (!uniformLocation) {
      MiscUtil.consoleLog(GLBoost$1.LOG_OMISSION_PROCESSING,
        'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation is falsy (undefined or something)');

      return;
    }

//    this.gl[uniformFuncStr].apply(this.gl, args);
/*
    if (uniformLocation.glslProgram.glslProgramsSelfUsageCount < this._glslProgramsLatestUsageCount) {
      MiscUtil.consoleLog(GLBoost.LOG_OMISSION_PROCESSING,
        'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation.glslProgram is not in use.');

      return;
    }
*/
    if (this._currentProgramInuse.createdAt !== uniformLocation.glslProgram.createdAt) {
//       console.error('missmatch!')
      return;
    }

    if (uniformLocation.glslProgramUsageCountWhenLastSet < this._glslProgramsLatestUsageCount) {
      // Since I have never sent a uniform value to glslProgram which is currently in use, update it.
      this.gl[uniformFuncStr].apply(this.gl, args);
      this.checkGLError();

      return;
    }

    if (forceUpdate) {
      this.gl[uniformFuncStr].apply(this.gl, args);
      this.checkGLError();
    } else {
      MiscUtil.consoleLog(GLBoost$1.LOG_OMISSION_PROCESSING,
        'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation.glslProgram is not in use.');
    }
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z, w) change from the previous states or not.
  uniform4f(uniformLocation, x, y, z, w, forceUpdate) {
    this._setUniformValues('uniform4f', [uniformLocation, x, y, z, w], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z) change from the previous states or not.
  uniform3f(uniformLocation, x, y, z, forceUpdate) {
    this._setUniformValues('uniform3f', [uniformLocation, x, y, z], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y) change from the previous states or not.
  uniform2f(uniformLocation, x, y, forceUpdate) {
    this._setUniformValues('uniform2f', [uniformLocation, x, y], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the value x changes from the previous state or not.
  uniform1f(uniformLocation, x, forceUpdate) {
    this._setUniformValues('uniform1f', [uniformLocation, x], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z, w) change from the previous states or not.
  uniform4i(uniformLocation, x, y, z, w, forceUpdate) {
    this._setUniformValues('uniform4i', [uniformLocation, x, y, z, w], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z) change from the previous states or not.
  uniform3i(uniformLocation, x, y, z, forceUpdate) {
    this._setUniformValues('uniform3i', [uniformLocation, x, y, z], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y) change from the previous states or not.
  uniform2i(uniformLocation, x, y, forceUpdate) {
    this._setUniformValues('uniform2i', [uniformLocation, x, y], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the value x changes from the previous state or not.
  uniform1i(uniformLocation, x, forceUpdate) {
    this._setUniformValues('uniform1i', [uniformLocation, x], forceUpdate);
  }


  createTexture(glBoostObject) {
    var glResource = this.gl.createTexture();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteTexture(glBoostObject, texture) {
    this._monitor.deregisterWebGLResource(glBoostObject, texture);
    this.gl.deleteTexture(texture);

    this.checkGLError();

    texture = null;
  }

  get canvasWidth() {
    return this._canvasWidth;
  }

  set canvasWidth(width) {
    if (this.impl.canvas) {
      this.impl.canvas.width = width;
    }
    this._canvasWidth = width;
  }

  get canvasHeight() {
    return this._canvasHeight;
  }

  set canvasHeight(height) {
    if (this.impl.canvas) {
      this.impl.canvas.height = height;
    }
    this._canvasHeight = height;
  }

  get glslProgramsLatestUsageCount() {
    return this._glslProgramsLatestUsageCount;
  }

}
GLContext._instances = new Object();

/*       */

class GLBoostObject {
                                     
                        
                       
                                    
                       
                          
                            
                             
                      

  constructor(glBoostContext                  , toRegister         = true) {
    if (this.constructor === GLBoostObject) {
      throw new TypeError('Cannot construct GLBoostObject instances directly.');
    }
    this._setName();
    this._glBoostContext = glBoostContext;
    this._glContext = glBoostContext.glContext;
    this._glBoostMonitor = glBoostContext._glBoostMonitor;
    this._toRegister = toRegister;
    if (this._toRegister) {
      this._glBoostMonitor.registerGLBoostObject(this);
    }
    this._userFlavorName = '';
    this._readyForDiscard = false;

    // generate the simple class-specific number.
    this._classUniqueNumber = 0;
    for(let i=0; i<this.className.length; i++) {
      this._classUniqueNumber += this.className.charCodeAt(i);
    }

    this.setupExistIndexAndArray();
  }

  setupExistIndexAndArray() {
    this._objectIndex = -1;
    this._materialIndex = -1;
    this._lightIndex = -1;
    this._jointSetIndex = -1;
    this._morphIndex = -1;

    const seekSpaceOfArrayAndSetIndexThere = (typeName)=>{
      let array = GLBoostObject['_' + typeName + 'ExistArray'];
      for (let i=0; i<array.length; i++) {
        if (array[i] === void 0) {
          this['_' + typeName + 'Index'] = i;
          array[i] = true;
          return;
        }
      }
      this['_' + typeName + 'Index'] = array.length;
      array[array.length] = true;
    };

    if (this.className.indexOf('Mesh') !== -1) {
      seekSpaceOfArrayAndSetIndexThere('object');
      if (this.className.indexOf('SkeletalMesh') !== -1) {
        seekSpaceOfArrayAndSetIndexThere('jointSet');
      }
    } else if (this.className.indexOf('Light') !== -1) {
      seekSpaceOfArrayAndSetIndexThere('light');
    } else if (this.className.indexOf('Material') !== -1) {
      seekSpaceOfArrayAndSetIndexThere('material');
    }

  }

  tearDownExistIndexAndArray() {
    const deleteIndex = (typeName)=>{
      let array = GLBoostObject['_' + typeName + 'ExistArray'];
      delete array[this['_' + typeName + 'Index']];
      this['_' + typeName + 'Index'] = -1;
    };

    if (this.className.indexOf('Mesh') !== -1) {
      deleteIndex('object');
      if (this.className.indexOf('SkeltalMesh') !== -1) {
        deleteIndex('jointSet');
      }
    } else if (this.className.indexOf('Light') !== -1) {
      deleteIndex('light');
    } else if (this.className.indexOf('Material') !== -1) {
      deleteIndex('material');
    }
  }

  _setName() {
    if (typeof GLBoostObject.classInfoDic[this.constructor.name] === 'undefined') {
      GLBoostObject.classInfoDic[this.constructor.name] = {};
    }
    GLBoostObject.classInfoDic[this.constructor.name]._instanceCount = (typeof GLBoostObject.classInfoDic[this.constructor.name]._instanceCount === 'undefined') ? 0 : (GLBoostObject.classInfoDic[this.constructor.name]._instanceCount + 1);
    this._instanceName = this.constructor.name + '_' + GLBoostObject.classInfoDic[this.constructor.name]._instanceCount;
  }

  /**
   * [en] Return instance name.
   * [ja] インスタンス名を返します。
   * @returns {string} [en] the instance name. [ja] インスタンス名
   */
  toString()        {
    return this._instanceName;
  }

  /**
   * Return the simple class-specific number.
   */
  get classUniqueNumber()        {
    return this._classUniqueNumber;
  }

  get className()        {
    return this.constructor.name;
  }

  get instanceName()        {
    return this._instanceName;
  }

  get belongingCanvasId() {
    return this._glBoostContext.belongingCanvasId;
  }

  set userFlavorName(name       ) {
    this._userFlavorName = name;
  }

  get userFlavorName()        {
    return this._userFlavorName;
  }

  get instanceNameWithUserFlavor()        {
    return this._instanceName + '__' + this._userFlavorName;
  }

  readyForDiscard() {
    if (this._toRegister) {
      this._glBoostMonitor.deregisterGLBoostObject(this);
    }

    this.tearDownExistIndexAndArray();

    this._readyForDiscard = true;
  }

  get isReadyForDiscard()         {
    return this._readyForDiscard;
  }

  _copy(instance) {
    instance._userFlavorName = this._userFlavorName;
  }

  get objectIndex()        {
    return this._objectIndex;
  }
}

GLBoostObject.classInfoDic = {};
GLBoostObject._objectExistArray = [];
GLBoostObject._materialExistArray = [];
GLBoostObject._lightExistArray = [];
GLBoostObject._jointSetExistArray = [];
GLBoostObject._morphExistArray = [];

GLBoost$1['GLBoostObject'] = GLBoostObject;

class AnimationUtil {

  constructor() {

  }

  static lerp(start, end, ratio, componentN) {
    if (componentN === 1) {
      return start * (1 - ratio) + end * ratio;
    } else {
      if (start instanceof Quaternion) {
        return Quaternion.qlerp(start, end, ratio);
      } else {
        return start.multiply((1 - ratio)).add(end.multiply(ratio));
      }
    }
  }

  static interpolate(inputArray, outputArray, input, componentN) {
    if (input < inputArray[0]) {
      return outputArray[0].clone(); // out of range!
    }
    if (inputArray[inputArray.length-1] <= input) {
      return outputArray[outputArray.length-1].clone(); // out of range!
    }

    for (let i = 0; i<inputArray.length; i++) {
      if (typeof inputArray[i+1] === "undefined") {
        break;
      }
      if (inputArray[i] <= input && input < inputArray[i+1]) {
        let ratio = (input - inputArray[i]) / (inputArray[i+1] - inputArray[i]);
        let resultValue = this.lerp(outputArray[i].clone(), outputArray[i+1].clone(), ratio, componentN);
        return resultValue;
      }
    }
    return outputArray[0].clone(); // out of range!
  }
}

class L_Element extends GLBoostObject {
  constructor(glBoostContext, toRegister = true) {
    super(glBoostContext, toRegister);

    this._translate = Vector3.zero();
    this._scale = new Vector3(1, 1, 1);

    this._rotate = Vector3.zero();
    this._quaternion = new Quaternion(0, 0, 0, 1);
    this._matrix = Matrix44$1.identity();

    this._translateOnInit = this._translate.clone();
    this._scaleOnInit = this._scale.clone();

    this._rotateOnInit = this._rotate.clone();
    this._quaternionOnInit = this._quaternion.clone();
    this._matrixOnInit = this._matrix.clone();


    this._finalMatrix = Matrix44$1.identity();

    this._dirtyAsElement = true;
    this._currentCalcMode = 'euler'; // true: calc rotation matrix using quaternion. false: calc rotation matrix using Euler

  }

  _needUpdate() {
    this._dirtyAsElement = true;
  }

  set translate(vec) {
    if (this._translate.isEqual(vec)) {
      return;
    }
    if (this._currentCalcMode === 'matrix') {
      this.matrix.m03 = vec.x;
      this.matrix.m13 = vec.y;
      this.matrix.m23 = vec.z;
    }
    this._translate = vec;
    this._needUpdate();
  }

  get translate() {
    return this._translate;
  }

  set rotate(vec) {
    if (this._currentCalcMode !== 'euler') {
      this._currentCalcMode = 'euler';
      this._needUpdate();
    }
    if (this._rotate.isEqual(vec)) {
      return;
    }
    this._rotate = vec;
    this._needUpdate();
  }

  get rotate() {
    return this._rotate;
  }


  set scale(vec) {
    if (this._scale.isEqual(vec)) {
      return;
    }
    this._scale = vec;
    this._needUpdate();
  }

  get scale() {
    return this._scale;
  }

  multiplyMatrix(mat) {
    this._matrix = mat.clone();
    this._currentCalcMode = 'matrix';
//    this._translate = new Vector3(mat.m03, mat.m03, mat.m03);
    this._needUpdate();
  }

  get matrix() {
    return this._matrix;
  }

  set quaternion(quat) {
    if (this._currentCalcMode !== 'quaternion') {
      this._currentCalcMode = 'quaternion';
      this._needUpdate();
    }
    if (this._quaternion.isEqual(quat)) {
      return;
    }
    this._quaternion = quat;
    this._needUpdate();
  }

  get quaternion() {
    return this._quaternion;
  }

  get transformMatrix() {
    if (this._dirtyAsElement) {
      var matrix = Matrix44$1.identity();
      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix = matrix.multiply(this.matrix);
        this._dirtyAsElement = false;
        return this._finalMatrix.clone();
      }

      var rotationMatrix = null;
      if (this._currentCalcMode === 'quaternion') {
        rotationMatrix = this.quaternion.rotationMatrix;
      } else {
        rotationMatrix = Matrix44$1.rotateX(this.rotate.x).
        multiply(Matrix44$1.rotateY(this.rotate.y)).
        multiply(Matrix44$1.rotateZ(this.rotate.z));
      }

      this._finalMatrix = matrix.multiply(Matrix44$1.scale(this.scale)).multiply(rotationMatrix);
      this._finalMatrix.m03 = this.translate.x;
      this._finalMatrix.m13 = this.translate.y;
      this._finalMatrix.m23 = this.translate.z;

      this._dirtyAsElement = false;
    }

    return this._finalMatrix.clone();
  }

  get normalMatrix() {
    return Matrix44$1.invert(this.transformMatrix).transpose().toMatrix33();
  }

  set currentCalcMode(mode) {
    this._currentCalcMode = mode;
  }

  get currentCalcMode() {
    return this._currentCalcMode;
  }

  _copy(instance) {
    super._copy(instance);

    instance._translate = this._translate.clone();
    instance._scale = this._scale.clone();
    instance._rotate = this._rotate.clone();
    instance._quaternion = this._quaternion.clone();
    instance._matrix = this._matrix.clone();
    instance._finalMatrix = this._finalMatrix.clone();
    instance._dirtyAsElement = this._dirtyAsElement;
    instance._currentCalcMode = this._currentCalcMode;
  }
}

class M_Element extends L_Element {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._parent = null;
    this._invMatrix = Matrix44$1.identity();
    this._matrixGetMode = ''; // 'notanimated', 'animate_<input_value>'
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement = 0;
    this._accumulatedAncestryObjectUpdateNumber = -Math.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberWithoutMySelf = -Math.MAX_VALUE;    
    this._accumulatedAncestryObjectUpdateNumberNormal = -Math.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberInv = -Math.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberJoint = -Math.MAX_VALUE;
    this._animationLine = {};
    this._transparentByUser = false;
    this._opacity = 1.0;
    this._isAffectedByWorldMatrix = true;
    this._isAffectedByWorldMatrixAccumulatedAncestry = true;
    this._isAffectedByViewMatrix = true;
    this._isAffectedByProjectionMatrix = true;

    this._activeAnimationLineName = null;
    this._currentAnimationInputValues = {};
    this._toInheritCurrentAnimationInputValue = true;

    this._camera = null;
    this._customFunction = null;
    this._isVisible = true;

    this._gizmos = [];
    this._masterElement = null;

    this._transformMatrixAccumulatedAncestry = new Matrix44$1();
  }


  _needUpdate() {
    this._dirtyAsElement = true;
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement++;
  }

  get updateCountAsElement() {
    return this._updateCountAsElement;
  }

  set toInheritCurrentAnimationInputValue(flg) {
    this._toInheritCurrentAnimationInputValue = flg;
  }

  get toInheritCurrentAnimationInputValue() {
    return this._toInheritCurrentAnimationInputValue;
  }

  /**
   * [en] Set animation input value (for instance frame value), This value affect all child elements in this scene graph (recursively).<br>
   * [ja] アニメーションのための入力値（例えばフレーム値）をセットします。この値はシーングラフに属する全ての子孫に影響します。
   * @param {string} inputName [en] inputName name of input value. [ja] 入力値の名前
   * @param {number|Vector2|Vector3|Vector4|*} inputValue [en] input value of animation. [ja] アニメーションの入力値
   */
  setCurrentAnimationValue(inputName, inputValue) {
    this._setDirtyToAnimatedElement(inputName);
    this._currentAnimationInputValues[inputName] = inputValue;
  }

  _getCurrentAnimationInputValue(inputName) {
    let value = this._currentAnimationInputValues[inputName];
    if (typeof(value) === 'number') {
      return value;
    } else if (this._toInheritCurrentAnimationInputValue && this._parent) {
      let val = this._parent._getCurrentAnimationInputValue(inputName);
      if (val === void 0) {
        val = null;
      }
      return val;
    } else {
      return null;
    }
  }

  removeCurrentAnimationValue(inputName) {
    delete this._currentAnimationInputValues[inputName];
  }

  _setDirtyToAnimatedElement(inputName) {
    if (this.hasAnimation(inputName)) {
      this._needUpdate();
    }
  }

  _getAnimatedTransformValue(value, animation, type) {
    if (typeof animation !== 'undefined' && animation[type]) {
      return AnimationUtil.interpolate(animation[type].input, animation[type].output, value, animation[type].outputComponentN);
    } else {
      //  console.warn(this._instanceName + 'doesn't have ' + type + ' animation data. GLBoost returned default ' + type + ' value.');
      return this['_' + type];
    }
  }

  set translate(vec) {
    if (this._translate.isEqual(vec)) {
      return;
    }
    if (this._currentCalcMode === 'matrix') {
      this.matrix.m03 = vec.x;
      this.matrix.m13 = vec.y;
      this.matrix.m23 = vec.z;
    }
    this._translate = vec;
    this._needUpdate();
  }

  get translate() {
    if (this._activeAnimationLineName) {
      return this.getTranslateAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._translate;
    }
  }

  getTranslateAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'translate');
  }

  getTranslateNotAnimated() {
    return this._translate;
  }

  set rotate(vec) {
    if (this._currentCalcMode !== 'euler') {
      this._currentCalcMode = 'euler';
      this._needUpdate();
    }
    if (this._rotate.isEqual(vec)) {
      return;
    }
    this._rotate = vec;
    this._needUpdate();
  }

  get rotate() {
    if (this._activeAnimationLineName) {
      return this.getRotateAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._rotate;
    }
  }

  getRotateAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'rotate');
  }

  getRotateNotAnimated() {
    return this._rotate;
  }

  set quaternion(quat) {
    if (this._currentCalcMode !== 'quaternion') {
      this._currentCalcMode = 'quaternion';
      this._needUpdate();
    }
    if (this._quaternion.isEqual(quat)) {
      return;
    }
    this._quaternion = quat;
    this._needUpdate();
  }

  get quaternion() {
    if (this._activeAnimationLineName) {
      return this.getQuaternionAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._quaternion;
    }
  }

  getQuaternionNotAnimated() {
    return this._quaternion;
  }

  getQuaternionAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'quaternion');
  }

  set scale(vec) {
    if (this._scale.isEqual(vec)) {
      return;
    }
    this._scale = vec;
    this._needUpdate();
  }

  get scale() {
    if (this._activeAnimationLineName) {
      return this.getScaleAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._scale;
    }
  }

  getScaleAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'scale');
  }

  getScaleNotAnimated() {
    return this._scale;
  }

  getMatrixAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'matrix');
  }

  get matrix() {
    if (this._activeAnimationLineName) {
      return this.getMatrixAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._matrix;
    }
  }

  getMatrixNotAnimated() {
    return this._matrix;
  }

  get transformMatrix() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    const matrix = this.getTransformMatrixAt(input);

    return matrix;
  }

  getTransformMatrixAt(inputValue, lineName, accumulateMyAndParentNameIsNoUpdate = false) {
    let input = inputValue;
    if (this._dirtyAsElement) {
//    if (true) {

      var matrix = Matrix44$1.identity();

      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix = matrix.multiply(this.getMatrixAt(this._activeAnimationLineName, input));
        this._dirtyAsElement = false;
        return this._finalMatrix.clone();
      }

      var rotationMatrix = Matrix44$1.identity();
      // if input is truly, glTF animation's can be regarded as quaternion
      if (this._currentCalcMode === 'quaternion') {
        rotationMatrix = this.getQuaternionAt(this._activeAnimationLineName, input).rotationMatrix;
      } else {
        let rotateVec = this.getRotateAt(this._activeAnimationLineName, input);
        rotationMatrix.rotateZ(rotateVec.z).
        multiply(Matrix44$1.rotateY(rotateVec.y)).
        multiply(Matrix44$1.rotateX(rotateVec.x));
      }

      this._finalMatrix = matrix.multiply(Matrix44$1.scale(this.getScaleAt(this._activeAnimationLineName, input))).multiply(rotationMatrix);
      let translateVec = this.getTranslateAt(this._activeAnimationLineName, input);
      this._finalMatrix.m03 = translateVec.x;
      this._finalMatrix.m13 = translateVec.y;
      this._finalMatrix.m23 = translateVec.z;

      this._dirtyAsElement = false;
    } else {
     // console.count('Cache')
    }

    return this._finalMatrix.clone();
  }

  get rotateScaleTranslate() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }
    if (this._dirtyAsElement || this._matrixGetMode !== 'animated_' + input) {
      var matrix = Matrix44$1.identity();

      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix = matrix.multiply(this.matrix);
        this._dirtyAsElement = false;
        return this._finalMatrix.clone();
      }

      var rotationMatrix = Matrix44$1.identity();
      // if input is truly, glTF animation's can be regarded as quaternion
      if (this._currentCalcMode === 'quaternion') {
        rotationMatrix = this.quaternion.rotationMatrix;
      } else {
        /*
         rotationMatrix = Matrix44.rotateX(this.rotate.x).
         multiply(Matrix44.rotateY(this.rotate.y)).
         multiply(Matrix44.rotateZ(this.rotate.z));
         */
        rotationMatrix.rotateZ(this.rotate.z).
        multiply(Matrix44$1.rotateY(this.rotate.y)).
        multiply(Matrix44$1.rotateX(this.rotate.x));
      }

      Matrix44$1.translate(this.translate);

      this._finalMatrix = Matrix44$1.translate(this.translate).multiply(Matrix44$1.scale(this.scale)).multiply(rotationMatrix);

      this._dirtyAsElement = false;
      this._matrixGetMode = 'animated_' + input;
    }

    return this._finalMatrix.clone();
  }
/*
  get transformMatrixForJoints() {

    var rotationMatrix = null;
    if (this._currentCalcMode === 'quaternion') {
      rotationMatrix = this.quaternion.rotationMatrix;
    } else if (this._currentCalcMode === 'matrix') {
      rotationMatrix = this.matrix;
      rotationMatrix.m03 = 0;
      rotationMatrix.m13 = 0;
      rotationMatrix.m23 = 0;
      rotationMatrix.m30 = 0;
      rotationMatrix.m31 = 0;
      rotationMatrix.m32 = 0;
    } else {
      rotationMatrix = Matrix44.rotateX(this.rotate.x).
      multiply(Matrix44.rotateY(this.rotate.y)).
      multiply(Matrix44.rotateZ(this.rotate.z));
    }

    return rotationMatrix.clone();
  }

*/

  get transformMatrixOnlyRotate() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    var rotationMatrix = null;
    if (input || this._currentCalcMode === 'quaternion') {
      rotationMatrix = this.quaternion.rotationMatrix;
    } else if (!input && this._currentCalcMode === 'matrix') {
      rotationMatrix = this.matrix;
      rotationMatrix.m03 = 0;
      rotationMatrix.m13 = 0;
      rotationMatrix.m23 = 0;
      rotationMatrix.m30 = 0;
      rotationMatrix.m31 = 0;
      rotationMatrix.m32 = 0;
    } else {
      rotationMatrix = Matrix44$1.rotateX(this.rotate.x).
      multiply(Matrix44$1.rotateY(this.rotate.y)).
      multiply(Matrix44$1.rotateZ(this.rotate.z));
    }

    return rotationMatrix.clone();
  }

  get transformMatrixOnlyRotateOnInit() {
    return this.getTransformMatrixOnlyRotateOn(0);
  }

  getTransformMatrixOnlyRotateOn(value) {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    var rotationMatrix = Matrix44$1.identity();
    if (input || this._currentCalcMode === 'quaternion') {
      rotationMatrix = this.getQuaternionAt('time', value).rotationMatrix;
    } else if (!input && this._currentCalcMode === 'matrix') {
      rotationMatrix = this.getMatrixAt('time', value);
      rotationMatrix.m03 = 0;
      rotationMatrix.m13 = 0;
      rotationMatrix.m23 = 0;
      rotationMatrix.m30 = 0;
      rotationMatrix.m31 = 0;
      rotationMatrix.m32 = 0;
    } else {
      /*
      rotationMatrix = Matrix44.rotateX(this.getRotate('time', value).x).
      multiply(Matrix44.rotateY(this.getRotateAt('time', value).y)).
      multiply(Matrix44.rotateZ(this.getRotateAt('time', value).z));
       */
      rotationMatrix.rotateZ(this.getRotate('time', value).z).
      multiply(Matrix44$1.rotateY(this.getRotateAt('time', value).y)).
      multiply(Matrix44$1.rotateX(this.getRotateAt('time', value).x));
    }

    return rotationMatrix.clone();
  }

  get inverseTransformMatrix() {
    if (!this._calculatedInverseMatrix) {
      this._invMatrix = this.transformMatrix.invert();
      this._calculatedInverseMatrix = true;
    }
    return this._invMatrix.clone();
  }

  _accumulateMyAndParentNameWithUpdateInfo(currentElem) {
    if (currentElem._parent === null) {
      return currentElem.elementUpdateNumber;
    } else {
      return this._accumulateMyAndParentNameWithUpdateInfo(currentElem._parent) + currentElem.elementUpdateNumber;
    }
  }
/*
  _multiplyMyAndParentTransformMatrices(withMySelf, input) {

    if (input === null && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    if (this._parent === null) {
      if (withMySelf) {
        return this.getTransformMatrixAt(input);
      } else {
        return Matrix44.identity();
      }
    } else {

      let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
      if (input === void 0 || this.__cache_input_multiplyMyAndParentTransformMatrices !== input ||
        this.__updateInfoNumber_multiplyMyAndParentTransformMatrices !== tempNumber)
      {
        let currentMatrix = Matrix44.identity();
        if (withMySelf) {
//          this._transformMatrixAccumulatedAncestry.copyComponents(this.getTransformMatrixAt(input));
          let currentMatrix = this.getTransformMatrixAt(input);
        }

//        this._transformMatrixAccumulatedAncestry.multiplyByLeft(this._parent._multiplyMyAndParentTransformMatrices(true, input));
        this._transformMatrixAccumulatedAncestry = Matrix44.multiply(this._parent._multiplyMyAndParentTransformMatrices(true, input), currentMatrix);

        this.__updateInfoNumber_multiplyMyAndParentTransformMatrices = tempNumber;
        this.__cache_input_multiplyMyAndParentTransformMatrices = input;

        return this._transformMatrixAccumulatedAncestry;
      } else {
        return this._transformMatrixAccumulatedAncestry;        
      }
    }
  }
  */

  _multiplyMyAndParentTransformMatricesInInverseOrder(withMySelf, input) {
    if (input === void 0 && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let tempNumber = 0;
    if (this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder !== input ||
      this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) ||
      this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder === void 0)
    {

      let currentMatrix = null;
      if (withMySelf) {
        currentMatrix = this.getTransformMatrixAt(input);
      } else {
        currentMatrix = Matrix44$1.identity();
      }
  
      if (this._parent === null) {
        this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = currentMatrix;
        return currentMatrix;
      }

      this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = Matrix44$1.multiply(currentMatrix, this._parent._multiplyMyAndParentTransformMatricesInInverseOrder(true, input));
      this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder = tempNumber;
      this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder = input;
    }
    return this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder;
  }

  get transformMatrixAccumulatedAncestryWithoutMySelf() {
    var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempNumber);
    if (this._accumulatedAncestryObjectUpdateNumberWithoutMySelf !== tempNumber || typeof this._transformMatrixAccumulatedAncestryWithoutMySelf === 'undefined') {
      this._transformMatrixAccumulatedAncestryWithoutMySelf = this._multiplyMyAndParentTransformMatrices(false, null).clone();
      this._accumulatedAncestryObjectUpdateNumberWithoutMySelf = tempNumber;
    }

    return this._transformMatrixAccumulatedAncestryWithoutMySelf;
  }

  get normalMatrixAccumulatedAncestry() {
    var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempNumber);
    if (this._accumulatedAncestryObjectUpdateNumberNormal !== tempNumber || typeof this._normalMatrixAccumulatedAncestry === 'undefined') {
      let world_m = this._multiplyMyAndParentTransformMatrices(true, null);
      this._normalMatrixAccumulatedAncestry = Matrix44$1.invert(world_m).transpose().toMatrix33();
      this._accumulatedAncestryObjectUpdateNumberNormal = tempNumber;
    }

    return this._normalMatrixAccumulatedAncestry.clone();
  }


  get inverseTransformMatrixAccumulatedAncestryWithoutMySelf() {
    if (this._parent === null) {
      return Matrix44$1.identity();
    }

    return this._multiplyMyAndParentTransformMatricesInInverseOrder(false, null).clone().invert();
  }

  _multiplyMyAndParentRotateMatrices(currentElem, withMySelf) {
    if (currentElem._parent === null) {
      if (withMySelf) {
        return currentElem.transformMatrixOnlyRotate;
      } else {
        return Matrix44$1.identity();
      }
    } else {
      let currentMatrix = Matrix44$1.identity();
      if (withMySelf) {
        currentMatrix = currentElem.transformMatrixOnlyRotate;
      }
      return Matrix44$1.multiply(this._multiplyMyAndParentRotateMatrices(currentElem._parent, true), currentMatrix);
    }
  }

//  get rotateMatrixAccumulatedAncestry() {
    /*
     var mat = this._multiplyMyAndParentTransformMatrices(this);
     var scaleX = Math.sqrt(mat.m00*mat.m00 + mat.m10*mat.m10 + mat.m20*mat.m20);
     var scaleY = Math.sqrt(mat.m01*mat.m01 + mat.m11*mat.m11 + mat.m21*mat.m21);
     var scaleZ = Math.sqrt(mat.m02*mat.m02 + mat.m12*mat.m12 + mat.m22*mat.m22);

     return new Matrix44(
     mat.m00/scaleX, mat.m01/scaleY, mat.m02/scaleZ, 0,
     mat.m10/scaleX, mat.m11/scaleY, mat.m12/scaleZ, 0,
     mat.m20/scaleX, mat.m21/scaleY, mat.m22/scaleZ, 0,
     0, 0, 0, 1
     );*/
//    return this._multiplyMyAndParentRotateMatrices(true, null);
//  }

  get inverseTransformMatrixAccumulatedAncestry() {
    return this._multiplyMyAndParentTransformMatrices(true, null).clone().invert();
  }

  _accumulateMyAndParentOpacity(currentElem) {
    if (currentElem._parent === null) {
      return currentElem.opacity;
    } else {
      return this._accumulateMyAndParentOpacity(currentElem._parent) * currentElem.opacity;
    }
  }

  get opacityAccumulatedAncestry() {
    return this._accumulateMyAndParentOpacity(this);
  }

  set opacity(opacity) {
    this._opacity = opacity;
  }

  get opacity() {
    return this._opacity;
  }

  get isTransparent() {
    return this._transparentByUser;
  }

  set isTransparent(flg) {
    this._transparentByUser = flg;
  }

  set dirty(flg) {
    this._dirtyAsElement = flg;
    if (flg) {
      this._needUpdate();
    }
  }

  get parent() {
    return this._parent;
  }

  get elementUpdateNumber() {
    return this.classUniqueNumber + this._updateCountAsElement;
  }

  // used by library (not Application)
  toStringWithUpdateInfo() {
    //  return '&' + this._instanceName + '#' + this._updateCountAsElement;  // human readable
    return this._instanceName + this._updateCountAsElement;                // faster
  }

  setAnimationAtLine(lineName, attributeName, inputArray, outputArray) {
    var outputComponentN = 0;
    if (outputArray[0] instanceof Vector2) {
      outputComponentN = 2;
    } else if (outputArray[0] instanceof Vector3) {
      outputComponentN = 3;
    } else if (outputArray[0] instanceof Vector4) {
      outputComponentN = 4;
    } else if (outputArray[0] instanceof Quaternion) {
      outputComponentN = 4;
    } else {
      outputComponentN = 1;
    }
    if (!this._animationLine[lineName]) {
      this._animationLine[lineName] = {};
    }
    this._animationLine[lineName][attributeName] = {
      input: inputArray,
      output: outputArray,
      outputAttribute: attributeName,
      outputComponentN: outputComponentN
    };
  }

  setActiveAnimationLine(lineName) {
    this._activeAnimationLineName = lineName;
  }

  hasAnimation(lineName) {
    if (this._animationLine[lineName]) {
      return true;
    } else {
      return false;
    }
  }

  set camera(camera) {
    this._camera = camera;
  }

  get camera() {
    return this._camera;
  }

  set customFunction(func) {
    this._customFunction = func;
  }

  get customFunction() {
    return this._customFunction;
  }

  prepareToRender() {

  }

  _copy(instance) {
    super._copy(instance);

    instance._parent = this._parent;
    instance._invMatrix = this._invMatrix.clone();
    instance._matrixGetMode = this._matrixGetMode;
    instance._calculatedInverseMatrix = this._calculatedInverseMatrix;
    instance._updateCountAsElement = this._updateCountAsElement;
    instance._accumulatedAncestryObjectUpdateNumber = this._accumulatedAncestryObjectUpdateNumber;
    instance._accumulatedAncestryObjectUpdateNumberNormal = this._accumulatedAncestryObjectUpdateNumberNormal;
    instance._accumulatedAncestryObjectUpdateNumberInv = this._accumulatedAncestryObjectUpdateNumberInv;
    instance._animationLine = {};

    for (let lineName in this._animationLine) {
      instance._animationLine[lineName] = {};
      for (let attributeName in this._animationLine[lineName]) {
        instance._animationLine[lineName][attributeName] = {};
        instance._animationLine[lineName][attributeName].input = this._animationLine[lineName][attributeName].input.concat();

        let instanceOutput = [];
        let thisOutput = this._animationLine[lineName][attributeName].output;
        for (let i=0; i<thisOutput.length; i++) {
          instanceOutput.push((typeof thisOutput[i] === 'number') ? thisOutput[i] : thisOutput[i].clone());
        }
        instance._animationLine[lineName][attributeName].output = instanceOutput;

        instance._animationLine[lineName][attributeName].outputAttribute = this._animationLine[lineName][attributeName].outputAttribute;

        instance._animationLine[lineName][attributeName].outputComponentN = this._animationLine[lineName][attributeName].outputComponentN;
      }
    }

    instance._transparentByUser = this._transparentByUser;
    instance.opacity = this.opacity;
    instance._activeAnimationLineName = this._activeAnimationLineName;

    instance._currentAnimationInputValues = {};
    for (let inputName in this._currentAnimationInputValues) {
      instance._currentAnimationInputValues[inputName] = this._currentAnimationInputValues[inputName];
    }

    instance._toInheritCurrentAnimationInputValue = this._toInheritCurrentAnimationInputValue;

    instance._camera = this._camera;
    instance._customFunction = this._customFunction;
  }

  set isVisible(flg) {
    this._isVisible = flg;
  }

  get isVisible() {
    return this._isVisible;
  }

  set isAffectedByWorldMatrix(flg) {
    this._isAffectedByWorldMatrix = flg;
  }

  get isAffectedByWorldMatrix() {
    return this._isAffectedByWorldMatrix;
  }

  set isAffectedByWorldMatrixAccumulatedAncestry(flg) {
    this._isAffectedByWorldMatrixAccumulatedAncestry = flg;
  }

  get isAffectedByWorldMatrixAccumulatedAncestry() {
    return this._isAffectedByWorldMatrixAccumulatedAncestry;
  }

  set isAffectedByViewMatrix(flg) {
    this._isAffectedByViewMatrix = flg;
  }

  get isAffectedByViewMatrix() {
    return this._isAffectedByViewMatrix;
  }

  set isAffectedByProjectionMatrix(flg) {
    this._isAffectedByProjectionMatrix = flg;
  }

  get isAffectedByProjectionMatrix() {
    return this._isAffectedByProjectionMatrix;
  }

  set gizmoScale(scale) {
    for (let gizmo of this._gizmos) {
      gizmo.scale = new Vector3(scale, scale, scale);
    }
  }

  get gizmoScale() {
    if (this._gizmos.length === 0) {
      return 1.0;
    }
    return this._gizmos[0].scale.x;
  }

  set isGizmoVisible(flg) {
    for (let gizmo of this._gizmos) {
      gizmo.isVisible = flg;
    }
  }

  get isGizmoVisible() {
    return this._gizmos[0].isVisible;
  }

  set masterElement(element) {
    this._masterElement = element;
  }

  get masterElement() {
    return this._masterElement;
  }
/*
  // Use master element's transformMatrixAccumulatedAncestry.
  get transformMatrixAccumulatedAncestry() {
    return this.getTransformMatrixAccumulatedAncestryAt(void 0);
  }

  getTransformMatrixAccumulatedAncestryAt(input) {
    
    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);

    if (this._accumulatedAncestryObjectUpdateNumberJoint !== tempNumber || typeof this._matrixAccumulatedAncestryJoint === 'undefined') {
      this._multiplyMyAndParentTransformMatrices(true, input);
      if (this._masterElement) {
  //      return Matrix44.multiply(this._masterElement._multiplyMyAndParentTransformMatrices(true, input), this._multiplyMyAndParentTransformMatrices(true, input));
  //return Matrix44.multiply(this._masterElement._multiplyMyAndParentTransformMatrices(true, input), this._multiplyMyAndParentTransformMatrices(true, input));
        this._transformMatrixAccumulatedAncestry.multiplyByLeft(this._masterElement._multiplyMyAndParentTransformMatrices(true, input));
      }
      this._accumulatedAncestryObjectUpdateNumberJoint = tempNumber;
    }
    
    return this._transformMatrixAccumulatedAncestry;
  }
  */

  getStartInputValueOfAnimation(lineName) {
    let inputLine = this._animationLine[lineName];
    let latestInputValue = Number.MAX_VALUE;
    if (typeof inputLine === 'undefined') {
      return latestInputValue;
    }
    for (let attributeName in inputLine) {
      let inputValueArray = inputLine[attributeName].input;
      let inputLatestValueAtThisAttribute = inputValueArray[0];
      if (inputLatestValueAtThisAttribute < latestInputValue) {
        latestInputValue = inputLatestValueAtThisAttribute;
      }
    }
    return latestInputValue;
  }

  getEndInputValueOfAnimation(lineName) {
    let inputLine = this._animationLine[lineName];
    let latestInputValue = - Number.MAX_VALUE;
    if (typeof inputLine === 'undefined') {
      return latestInputValue;
    }
    for (let attributeName in inputLine) {
      let inputValueArray = inputLine[attributeName].input;
      let inputLatestValueAtThisAttribute = inputValueArray[inputValueArray.length - 1];
      if (inputLatestValueAtThisAttribute > latestInputValue) {
        latestInputValue = inputLatestValueAtThisAttribute;
      }
    }
    return latestInputValue;
  }

  get transformMatrixAccumulatedAncestryForJoints() {
    return this.getTransformMatrixAccumulatedAncestryForJointsAt(void 0);
  }

  getTransformMatrixAccumulatedAncestryForJointsAt(input) {

    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    
    if (this._accumulatedAncestryObjectUpdateNumberForJoints !== tempNumber || this._matrixAccumulatedAncestryForJoints === void 0) {
      this._matrixAccumulatedAncestryForJoints = this._multiplyMyAndParentTransformMatricesForJoints(true, input);
      this._accumulatedAncestryObjectUpdateNumberForJoints = tempNumber;
    }

    return this._matrixAccumulatedAncestryForJoints.clone();
    
  }

  _multiplyMyAndParentTransformMatricesForJoints(withMySelf, input) {
    if (input === void 0 && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let tempNumber = 0;
    if (this.__cache_input_multiplyMyAndParentTransformMatricesForJoints !== input ||
      this.__updateInfoString_multiplyMyAndParentTransformMatricesForJoints !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) ||
      this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints === void 0)
    {

        let currentMatrix = null;
        if (withMySelf) {
          currentMatrix = this.getRotateTranslateAt(input);
        } else {
          currentMatrix = Matrix44$1.identity();
        }
    
        if (this._parent === null) {
          this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints = currentMatrix;
          return currentMatrix;
        }

        this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints = Matrix44$1.multiply(this._parent._multiplyMyAndParentTransformMatricesForJoints(true, input), currentMatrix);
        this.__updateInfoString_multiplyMyAndParentTransformMatricesForJoints = tempNumber;
        this.__cache_input_multiplyMyAndParentTransformMatricesForJoints = input;
    }
    return this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints;
  
  }


  get rotateTranslate() {

    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    const matrix = this.getRotateTranslateAt(input);

    return matrix;

  }

  getRotateTranslateAt(inputValue, lineName) {
    const input = inputValue;
//    if (this._dirtyAsElement || this._matrixGetMode !== 'animated_' + input) {
///     this._finalMatrix_RotateTranslate = void 0;
    {

      const matrix = Matrix44$1.identity();

      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix_RotateTranslate = matrix.multiply(this.getMatrixAt(this._activeAnimationLineName, input));
        this._dirtyAsElement = false;
        return this._finalMatrix_RotateTranslate.clone();
      }

      let rotationMatrix = Matrix44$1.identity();
      if (this._currentCalcMode === 'quaternion') {
        rotationMatrix = this.getQuaternionAt(this._activeAnimationLineName, input).rotationMatrix;
      } else {
        const rotateVec = this.getRotateAt(this._activeAnimationLineName, input);
        rotationMatrix.rotateZ(rotateVec.z).
        multiply(Matrix44$1.rotateY(rotateVec.y)).
        multiply(Matrix44$1.rotateX(rotateVec.x));
      }

      this._finalMatrix_RotateTranslate = rotationMatrix;

      const translateVec = this.getTranslateAt(this._activeAnimationLineName, input);

      this._finalMatrix_RotateTranslate.m03 = translateVec.x;
      this._finalMatrix_RotateTranslate.m13 = translateVec.y;
      this._finalMatrix_RotateTranslate.m23 = translateVec.z;


   //   this._dirtyAsElement = false;
   //   this._matrixGetMode = 'animated_' + input;
    }


    return this._finalMatrix_RotateTranslate.clone();
  }


  get transformMatrixAccumulatedAncestry() {
    return this.getTransformMatrixAccumulatedAncestryAt(void 0);
  }


  getTransformMatrixAccumulatedAncestryAt(input) {

    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
  
    if (this._accumulatedAncestryObjectUpdateNumber !== tempNumber || this._matrixAccumulatedAncestry === void 0) {
      this._matrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatrices(true, input);
      this._accumulatedAncestryObjectUpdateNumber = tempNumber;
    }

    return this._matrixAccumulatedAncestry.clone();
  }

  _multiplyMyAndParentTransformMatrices(withMySelf, input) {
    if (input === void 0 && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    if (this.__updateInfoString_multiplyMyAndParentTransformMatrices !== tempNumber ||
      this.__cache_input_multiplyMyAndParentTransformMatrices !== input ||
      this.__cache_returnValue_multiplyMyAndParentTransformMatrices === void 0)
    {

      let currentMatrix = null;
      if (withMySelf) {
        currentMatrix = this.getTransformMatrixAt(input);
      } else {
        currentMatrix = Matrix44$1.identity();
      }


      if (this._parent === null) {
        this.__cache_returnValue_multiplyMyAndParentTransformMatricesFor = currentMatrix;
        return currentMatrix;
      }

      this.__cache_returnValue_multiplyMyAndParentTransformMatrices = Matrix44$1.multiply(this._parent._multiplyMyAndParentTransformMatrices(true, input), currentMatrix);
      this.__updateInfoString_multiplyMyAndParentTransformMatrices = tempNumber;
      this.__cache_input_multiplyMyAndParentTransformMatrices = input;
    } else {
      let hoge = 10;
    }
    return this.__cache_returnValue_multiplyMyAndParentTransformMatrices;
  
  }
}

/**
 * This is the abstract class for all lights classes. Don't use this class directly.<br>
 */
class M_AbstractLight extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);

    if (this.constructor === M_AbstractLight) {
      throw new TypeError('Cannot construct AbstractLight instances directly.');
    }

    this._gl = this._glContext.gl;

    this._isCastingShadow = true;
    this._isLightType = '';
  }

  prepareToRender() {
    if (this._camera) {
      if (this._camera.customFunction) {
        this._camera.customFunction(this);
      }
    }
  }

  set isCastingShadow(flg) {
    this._isCastingShadow = flg;
  }

  get isCastingShadow() {
    return this._isCastingShadow;
  }

  get lightType() {
    return this._isLightType;
  }

  isTypeAmbient() {
    return this._isLightType === 'ambient';
  }

  isTypeDirectional() {
    return this._isLightType === 'directional';
  }

  isTypePoint() {
    return this._isLightType === 'point';
  }

  isTypeSpot() {
    return this._isLightType === 'spot';
  }
}

/**
 * This is a Point Light class.
 */
class M_PointLight extends M_AbstractLight {

  /**
   * The constructor of PointLight class.
   * @param {Vector4} intensity intensity as Vector4 Color
   * @param {HTMLCanvas|string} canvas canvas or canvas' id string.
   */
  constructor(glBoostContext, intensity) {
    super(glBoostContext);

    this._intensity = intensity;
    
    this._isLightType = 'point';
    
  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

}

class Hash {

  constructor() {

  }


  static toCRC32(str) {
    var crc = 0, x=0, y=0;
    var table = Hash._crc32table;

    crc = crc ^ (-1);
    for (var i=0, iTop=str.length; i<iTop; ++i) {
      y = (crc ^ str.charCodeAt(i)) & 0xff;
      x = "0x" + table[y];
      crc = (crc >>> 8) ^ x;
    }

    return (crc ^ (-1)) >>> 0;
  }
}

Hash._crc32table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(' ');

class VertexWorldShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSDefine_VertexWorldShaderSource(in_, out_, f, lights, material, extraData) {
    let shaderText = '';

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 v_normal_world;\n`;
      
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += `${in_} vec3 aVertex_tangent;\n`;
        if (material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL)) {
          shaderText += `${out_} vec3 v_tangent_world;\n`;
          shaderText += `${out_} vec3 v_binormal_world;\n`;  
        }
      }
    }
    shaderText +=      'uniform mat4 worldMatrix;\n';
    shaderText +=      'uniform mat4 viewMatrix;\n';
    shaderText +=      'uniform mat4 projectionMatrix;\n';
    shaderText +=      'uniform mat3 normalMatrix;\n';
    shaderText += `     uniform highp ivec2 objectIds;\n`;

    shaderText += `${out_} vec3 v_position_world;\n`;

    return shaderText;
  }

  VSPreProcess_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    shaderText += '  vec4 position_world;\n';
    shaderText += '  vec3 normal_world;\n';
    shaderText += '  vec3 tangent_world;\n';
    return shaderText;
  }

  VSTransform_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';

    // Calculate only when No skinning. If skinning, these have already been calculated by SkeletalShader.
    shaderText += '  if (!isSkinning) {\n';
    shaderText += '    position_world = worldMatrix * position_local;\n';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  normal_world = normalMatrix * normal_local;\n';
    }
    shaderText += '  }\n';

    // calc Projection * View * World matrix
    shaderText += '  mat4 pvwMatrix = projectionMatrix * viewMatrix * worldMatrix;\n';

    // calc vertex position in world space
    shaderText += '  v_position_world = position_world.xyz;\n';

    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);

    // Send normal, tangent, binormal vectors in world space to the rasterizer
    if (Shader._exist(f, GLBoost.NORMAL)) {
      // calc Normal vector in world space
      shaderText += '  v_normal_world = normal_world;\n';
      if (Shader._exist(f, GLBoost.TANGENT) && !material.isFlatShading && normalTexture) {
        // calc BiNormal vector and Tangent vector in world space
        
        {
          // Calculate only when No skinning. If skinning, it has already been calculated by SkeletalShader.
          shaderText += '  if (!isSkinning) {\n';
          shaderText += '    tangent_world = normalMatrix * tangent_local;\n';
          shaderText += '  }\n';
        }

        shaderText += '  v_binormal_world = cross(normal_world, tangent_world);\n';
        shaderText += '  v_tangent_world = cross(v_binormal_world, normal_world);\n';

      }
    }

    // Calc vertex positions in clip coordinate space.
    // (These will be converted in Normalized Device Coordinates by divided gl_Posiiton.w in after stage.)
    shaderText += '  gl_Position =  pvwMatrix * position_local;\n';

    return shaderText;
  }

  FSDefine_VertexWorldShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += `uniform highp ivec2 objectIds;\n`;
    shaderText += `uniform vec3 viewPosition_world;\n`;

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;    
    if(lightNumExceptAmbient > 0) {
      shaderText += `uniform vec4 lightDiffuse[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec3 lightSpotInfo[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec3 lightPosition_world[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec3 lightDirection_world[${lightNumExceptAmbient}];\n`;
    }

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 v_normal_world;\n`;
      if (Shader._exist(f, GLBoost.TANGENT) && material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL)) {
        shaderText += `${in_} vec3 v_tangent_world;\n`;
        shaderText += `${in_} vec3 v_binormal_world;\n`;
      }
    }

    shaderText += `${in_} vec3 v_position_world;\n`;

    return shaderText;
  }


  FSShade_VertexWorldShaderSource(f, gl, lights) {
    var shaderText = '';
    return shaderText;
  }

  prepare_VertexWorldShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'position' || attribName === 'normal' || attribName === 'tangent') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    material.setUniform(shaderProgram, 'uniform_objectIds', this._glContext.getUniformLocation(shaderProgram, 'objectIds'));

    material.setUniform(shaderProgram, 'uniform_worldMatrix', this._glContext.getUniformLocation(shaderProgram, 'worldMatrix'));
    material._semanticsDic['WORLD'] = 'worldMatrix';
    material.setUniform(shaderProgram, 'uniform_normalMatrix', this._glContext.getUniformLocation(shaderProgram, 'normalMatrix'));
    material._semanticsDic['MODELVIEWINVERSETRANSPOSE'] = 'normalMatrix';
    if (existCamera_f) {
      material.setUniform(shaderProgram, 'uniform_viewMatrix', this._glContext.getUniformLocation(shaderProgram, 'viewMatrix'));
      material._semanticsDic['VIEW'] = 'viewMatrix';
      material.setUniform(shaderProgram, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
      material._semanticsDic['PROJECTION'] = 'projectionMatrix';
    }

    material.setUniform(shaderProgram, 'uniform_viewPosition', this._glContext.getUniformLocation(shaderProgram, 'viewPosition_world'));

    for(let i=0; i<lights.length; i++) {
      material.setUniform(shaderProgram, 'uniform_lightPosition_'+i, this._glContext.getUniformLocation(shaderProgram, `lightPosition_world[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightDirection_'+i, this._glContext.getUniformLocation(shaderProgram, `lightDirection_world[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightDiffuse_'+i, this._glContext.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightSpotInfo_'+i, this._glContext.getUniformLocation(shaderProgram, `lightSpotInfo[${i}]`));
    }


    return vertexAttribsAsResult;
  }
}

GLBoost['VertexWorldShaderSource'] = VertexWorldShaderSource;

class Shader extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._glslProgram = null;
    this._dirty = true;
  }

  static initMixinMethodArray() {
    this.prototype._classNamesOfVSDefine = this.prototype._classNamesOfVSDefine ? this.prototype._classNamesOfVSDefine : [];
    this.prototype._classNamesOfVSMethodDefine = this.prototype._classNamesOfVSMethodDefine ? this.prototype._classNamesOfVSMethodDefine : [];
    this.prototype._classNamesOfVSPreProcess = this.prototype._classNamesOfVSPreProcess ? this.prototype._classNamesOfVSPreProcess : [];
    this.prototype._classNamesOfVSTransform = this.prototype._classNamesOfVSTransform ? this.prototype._classNamesOfVSTransform : [];

    this.prototype._classNamesOfFSDefine = this.prototype._classNamesOfFSDefine ? this.prototype._classNamesOfFSDefine : [];
    this.prototype._classNamesOfFSMethodDefine = this.prototype._classNamesOfFSMethodDefine ? this.prototype._classNamesOfFSMethodDefine : [];
    this.prototype._classNamesOfFSShade = this.prototype._classNamesOfFSShade ? this.prototype._classNamesOfFSShade : [];
    this.prototype._classNamesOfFSPostEffect = this.prototype._classNamesOfFSPostEffect ? this.prototype._classNamesOfFSPostEffect : [];

    this.prototype._classNamesOfPrepare = this.prototype._classNamesOfPrepare ? this.prototype._classNamesOfPrepare : [];
  }

  static mixin(source) {

    // create mixin method Array
    this.initMixinMethodArray();

    // register mixin methods to Array
    if(this.prototype._classNamesOfVSDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSDefine.push(source.name);
    }
    if(this.prototype._classNamesOfVSMethodDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSMethodDefine.push(source.name);
    }
    if(this.prototype._classNamesOfVSPreProcess.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSPreProcess.push(source.name);
    }
    if(this.prototype._classNamesOfVSTransform.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSTransform.push(source.name);
    }
    if(this.prototype._classNamesOfFSDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSDefine.push(source.name);
    }
    if(this.prototype._classNamesOfFSMethodDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSMethodDefine.push(source.name);
    }
    if(this.prototype._classNamesOfFSShade.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSShade.push(source.name);
    }
    if(this.prototype._classNamesOfFSPostEffect.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSPostEffect.push(source.name);
    }

    if(this.prototype._classNamesOfPrepare.indexOf(source.name) === -1){
      this.prototype._classNamesOfPrepare.push(source.name);
    }

    // mixin
    var target = this.prototype; source = source.prototype;
    Object.getOwnPropertyNames(source).forEach(function (name) {
      if (name !== 'constructor') Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
    });
  }

  static swapMixin(current, newone) {
    // register mixin methods to Array
    let matchIdx = this.prototype._classNamesOfVSDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfVSMethodDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSMethodDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfVSPreProcess.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSPreProcess[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfVSTransform.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSTransform[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSMethodDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSMethodDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSShade.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSShade[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSPostEffect.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSPostEffect[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfPrepare.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfPrepare[matchIdx] = newone.name;
    }

    // mixin
    var target = this.prototype; newone = newone.prototype;
    Object.getOwnPropertyNames(newone).forEach(function (name) {
      if (name !== 'constructor') Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(newone, name));
    });
  }

  static removeMixin(source) {
    let matchIdx = this.prototype._classNamesOfVSDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSDefine.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfVSMethodDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSMethodDefineVSPreProcess.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfVSPreProcess.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSPreProcess.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfVSTransform.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSTransform.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSDefine.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSMethodDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSMethodDefine.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSShade.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSShade.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSPostEffect.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSPostEffect.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfPrepare.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfPrepare.splice(matchIdx, 1);
    }
  }

  static isMixin(source) {

    // create mixin method Array
    this.initMixinMethodArray();

    // register mixin methods to Array
    if (this.prototype._classNamesOfVSDefine.indexOf(source.name) === -1) {
      return false;
    } else {
      return true;
    }
  }

  _removeDuplicatedLine(shaderString) {
    var splittedShaderLines = shaderString.split('\n');
    for (let i=0; i<splittedShaderLines.length; i++) {
      splittedShaderLines[i] += '\n';
      for (let j=0; j<i; j++) {
        if (splittedShaderLines[j] === splittedShaderLines[i]) {
          splittedShaderLines[j] = '//                                                            commented out because of duplicated: ' + splittedShaderLines[i];
        }
      }
    }

    let processedShaderString = '';
    for (let i=0; i<splittedShaderLines.length; i++) {
      processedShaderString += splittedShaderLines[i];
    }

    return processedShaderString;
  }

  _addLineNumber(shaderString) {
    let shaderTextLines = shaderString.split(/\r\n|\r|\n/);
    let shaderTextWithLineNumber = '';
    for (let i=0; i<shaderTextLines.length; i++) {
      let lineIndex = i+1;
      let splitter = ' : ';
      if (lineIndex<10) {
        splitter = '  : ';
      } else if (lineIndex>=100) {
        splitter = ': ';
      }
      shaderTextWithLineNumber += lineIndex + splitter + shaderTextLines[i] + '\n';
    }

    return shaderTextWithLineNumber;
  }

  _getVertexShaderString(gl, functions, existCamera_f, lights, material, extraData) {
    var f = functions;
    var shaderText = '';

    var in_ = Shader._in_onVert(gl);
    var out_ = Shader._out_onVert(gl);

    shaderText =   Shader._glslVer(gl);
    shaderText +=   'precision highp float;\n';
    shaderText +=   `${in_} vec3 aVertex_position;\n`;



    /// define variables
    // start defining variables. first, sub class Shader, ...
    // seconds, define variables as mixin shaders
    let vsDefineShaderText = '';
    this._classNamesOfVSDefine.forEach((className)=> {
      var method = this['VSDefine_' + className];
      if (method) {
        vsDefineShaderText += '//                                                            VSDefine_' + className + ' //\n';
        vsDefineShaderText += method.bind(this, in_, out_, f, lights, material, extraData)();
      }
    });
    shaderText += this._removeDuplicatedLine(vsDefineShaderText);

    /// define methods
    // start defining methods. first, sub class Shader, ...
    // seconds, define methods as mixin Shaders
    this._classNamesOfVSMethodDefine.forEach((className)=> {
      var method = this['VSMethodDefine_' + className];
      if (method) {
        shaderText += '//                                                            VSMethodDefine_' + className + ' //\n';
        shaderText += method.bind(this, existCamera_f, f, lights, material, extraData)();
      }
    });

    // begin of main function
    shaderText +=   'void main(void) {\n';
    shaderText +=   'vec4 position_local = vec4(aVertex_position, 1.0);\n';
    if (Shader._exist(f, GLBoost$1.NORMAL)) {
      shaderText += 'vec3 normal_local = aVertex_normal;\n';
      if (Shader._exist(f, GLBoost$1.TANGENT)) {
        shaderText += 'vec3 tangent_local = aVertex_tangent;\n';
      }
    }
    shaderText +=   'bool isSkinning = false;\n';

    /// PreProcess
    // start pre-processing. first, sub class Shader, ...
    // seconds, pre-process as mixin Shaders
    this._classNamesOfVSPreProcess.forEach((className)=> {
      var method = this['VSPreProcess_' + className];
      if (method) {
        shaderText += '//                                                            VSPreProcess_' + className + ' //\n';
        shaderText += method.bind(this, existCamera_f, f, lights, material, extraData)();
      }
    });

    /// Transform
    // start transforming. first, sub class Shader, ...
    // seconds, transform as mixin Shaders
    this._classNamesOfVSTransform.forEach((className)=> {
      var method = this['VSTransform_' + className];
      if (method) {
        shaderText += '//                                                            VSTransform_' + className + ' //\n';
        shaderText += method.bind(this, existCamera_f, f, lights, material, extraData)();
      }
    });

    // end of main function
    shaderText +=   '}';

    return shaderText;
  }


  _getFragmentShaderString(gl, functions, lights, material, extraData) {
    var f = functions;
    var shaderText = '';

    var in_ = Shader._in_onFrag(gl);

    shaderText +=   Shader._glslVer(gl);
    var maxDrawBuffers = this._getMaxDrawBuffers();
    if (maxDrawBuffers > 1) {
      shaderText += Shader._glsl1DrawBufferExt(gl);
    }
    shaderText += Shader._glsl1StdDerivativeExt(gl);
    shaderText +=   'precision highp float;\n';

    for (let i=0; i<maxDrawBuffers; i++) {
      shaderText +=   Shader._set_outColor_onFrag(gl, i);
    }

    /// define variables
    // start defining variables. first, sub class Shader, ...
    // seconds, define variables as mixin shaders
    let fsDefineShaderText = '';
    this._classNamesOfFSDefine.forEach((className)=> {
      var method = this['FSDefine_' + className];
      if (method) {
        fsDefineShaderText += '//                                                            FSDefine_' + className + ' //\n';
        fsDefineShaderText += method.bind(this, in_, f, lights, material, extraData)();
      }
    });
    shaderText += this._removeDuplicatedLine(fsDefineShaderText);


    /// define methods
    // start defining methods. first, sub class Shader, ...
    // seconds, define methods as mixin Shaders
    this._classNamesOfFSMethodDefine.forEach((className)=> {
      var method = this['FSMethodDefine_' + className];
      if (method) {
        shaderText += '//                                                            FSMethodDefine_' + className + ' //\n';
        shaderText += method.bind(this, in_, f, lights, material, extraData)();
      }
    });


    // begin of main function
    shaderText +=   'void main(void) {\n';


    /// Shading
    // start shading. first, sub class Shaders, ...
    // second, shade as mixin Shaders
    this._classNamesOfFSShade.forEach((className)=> {
      var method = this['FSShade_' + className];
      if (method) {
        shaderText += '//                                                            FSShade_' + className + ' //\n';
        shaderText += method.bind(this, f, gl, lights, material, extraData)();
      }
    });

    /// PostEffect
    // start posteffect. first, sub class Shaders, ...
    // second, shade as mixin Shaders
    this._classNamesOfFSPostEffect.forEach((className)=> {
      let method = this['FSPostEffect_' + className];
      if (method) {
        shaderText += '//                                                            FSPostEffect_' + className + ' //\n';
        shaderText += method.bind(this, f, gl, lights, material, extraData)();
      }
    });

    // end of main function
    if (maxDrawBuffers > 1) {
      for (let i=0; i<maxDrawBuffers; i++) {
        shaderText += Shader._set_glFragData_inGLVer1(gl, i);
      }
    } else {
      shaderText += Shader._set_glFragColor_inGLVer1(gl);
    }
    shaderText +=   '}';

    return shaderText;
  }

  _prepareAssetsForShaders(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {
    var temp = [];

    this._glContext.useProgram(shaderProgram);
    this._classNamesOfPrepare.forEach((className)=> {
      var method = this['prepare_' + className];
      if (method) {
        var verAttirbs = method.bind(this, gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData, canvas)();
        temp = temp.concat(verAttirbs);
      }
    });
    let set = new Set(temp);

    let vertexAttribsAsResult = [];
    for (let elem of set) {
      vertexAttribsAsResult.push(elem);
    }

    return vertexAttribsAsResult;
  }

  get dirty() {
    return this._dirty;
  }

  set dirty(flg) {
    this._dirty = flg;
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    //super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);
  }

  setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
    //super.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);
  }

  _getShader(gl, theSource, type) {
    var shader;

    if (type == 'x-shader/x-fragment') {
      shader = this._glContext.createShader(this, gl.FRAGMENT_SHADER);
    } else if (type == 'x-shader/x-vertex') {
      shader = this._glContext.createShader(this, gl.VERTEX_SHADER);
    } else {
      // Unknown shader type
      return null;
    }

    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  _initShaders(gl, vertexShaderStr, fragmentShaderStr) {
    let vertexShaderStrWithLineNumber = this._addLineNumber(vertexShaderStr);
    let fragmentShaderStrWithLineNumber = this._addLineNumber(fragmentShaderStr);
    MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, 'Vertex Shader:');
    MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, vertexShaderStrWithLineNumber);
    MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, 'Fragment Shader:');
    MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, fragmentShaderStrWithLineNumber);

    var vertexShader = this._getShader(gl, vertexShaderStr, 'x-shader/x-vertex');
    var fragmentShader = this._getShader(gl, fragmentShaderStr, 'x-shader/x-fragment');

    // Create the shader program
    var shaderProgram = this._glContext.createProgram(this);
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    this._glContext.deleteShader(this, vertexShader);
    this._glContext.deleteShader(this, fragmentShader);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      console.error(gl.getProgramInfoLog(shaderProgram));
    }

    this._glContext.useProgram(shaderProgram);


    shaderProgram.vertexShaderSource = vertexShaderStrWithLineNumber;
    shaderProgram.fragmentShaderSource = fragmentShaderStrWithLineNumber;

    return shaderProgram;
  }

  getShaderProgram(expression, vertexAttribs, existCamera_f, lights_, material, extraData = {}) {
    var gl = this._glContext.gl;
    var canvasId = this._glContext.belongingCanvasId;

    let lights = this.getDefaultPointLightIfNotExist(lights_);

    lights = lights.filter((light)=>{return !light.isTypeAmbient();});

    var vertexShaderText = this._getVertexShaderString(gl, vertexAttribs, existCamera_f, lights, material, extraData);
    var fragmentShaderText = this._getFragmentShaderString(gl, vertexAttribs, lights, material,  extraData);

    // lookup shaderHashTable
    var baseText = vertexShaderText + '\n###SPLIT###\n' + fragmentShaderText;
    var hash = Hash.toCRC32(baseText);
    if (!Shader._shaderHashTable[canvasId]) {
      Shader._shaderHashTable[canvasId] = {};
    }
    let programToReturn = null;
    var hashTable = Shader._shaderHashTable[canvasId];
    if (hash in hashTable) {
      if (hashTable[hash].code === baseText) {
        programToReturn = hashTable[hash].program;
      } else {
        for (let i=0; i<hashTable[hash].collisionN; i++) {
          if (hashTable[hash + '_' + i].code === baseText) {
            programToReturn = hashTable[hash + '_' + i].program;
            break;
          }
        }
        hashTable[hash].collisionN++;
      }
    }

    if (programToReturn === null || !gl.isProgram(programToReturn)) {
    // if the current shader codes is not in shaderHashTable, create GLSL Shader Program.

      // register it to shaderHashTable.
      let indexStr = null;
      if (typeof hashTable[hash] !== 'undefined' && hashTable[hash].collisionN > 0) {
        indexStr = hash + '_' + hashTable[hash].collisionN;
      } else {
        indexStr = hash;
      }

      MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, 'ShaderInstance: ' + material.shaderInstance + '   ShaderHashId: ' + indexStr);
      programToReturn = this._initShaders(gl, vertexShaderText, fragmentShaderText);
      programToReturn.createdAt = performance.now();
      programToReturn.hashId = indexStr;
      programToReturn.glslProgramsSelfUsageCount = -1;

      hashTable[indexStr] = {code:baseText, program:programToReturn, collisionN:0};
      Shader._shaderHashTable[canvasId] = hashTable;

    }

    this._glslProgram = programToReturn;

    material._semanticsDic = {_glslProgram:programToReturn};
    material.uniformTextureSamplerDic = {};
    programToReturn._material = material;
    programToReturn.optimizedVertexAttribs = this._prepareAssetsForShaders(gl, programToReturn, expression, vertexAttribs, existCamera_f, lights, material, extraData);

    return programToReturn;
  }

  static _createShaderInstance(glBoostContext, shaderClass) {
    let shaderInstance = new shaderClass(glBoostContext, VertexWorldShaderSource);
    return shaderInstance;
  }

  getDefaultPointLightIfNotExist(lights) {

    if (lights.length === 0) {
      if (Shader._defaultLight === null) {
        Shader._defaultLight = this._glBoostContext.createPointLight(GLBoost$1.VALUE_DEFAULT_POINTLIGHT_INTENSITY);
      }
      return [Shader._defaultLight];
    } else {
      return lights;
    }
  }

  static _exist(functions, glboostConstantForAttributeType) {
    let attribute = GLBoost$1.getValueOfGLBoostConstant(glboostConstantForAttributeType);
    return functions.indexOf(attribute) >= 0;
  }

  _getMaxDrawBuffers() {
    var gl = this._glContext.gl;
    var isWebGL2 = Shader.isThisGLVersion_2(gl);
    if (isWebGL2) {
      return gl.getParameter(gl.MAX_DRAW_BUFFERS);
    }

    var glem = GLExtensionsManager.getInstance(this._glContext);
    if (glem.extDBs) {
      return gl.getParameter(glem.extDBs.MAX_DRAW_BUFFERS_WEBGL);
    } else {
      return 1;
    }
  }

  static isThisGLVersion_2(gl) {
    if (typeof WebGL2RenderingContext === 'undefined') {
      return false;
    }
    return gl instanceof WebGL2RenderingContext;
  }

  static _glslVer(gl) {
    return GLBoost$1.isThisGLVersion_2(gl) ? '#version 300 es\n' : '';
  }

  static _glsl1DrawBufferExt(gl) {
    return !GLBoost$1.isThisGLVersion_2(gl) ? '#extension GL_EXT_draw_buffers : require\n' : '';
  }
  static _glsl1StdDerivativeExt(gl) {
    return !GLBoost$1.isThisGLVersion_2(gl) ? '#extension GL_OES_standard_derivatives : require\n' : '';
  }

  static _in_onVert(gl) {
    return GLBoost$1.isThisGLVersion_2(gl) ? 'in' : 'attribute';
  }
  static _out_onVert(gl) {
    return GLBoost$1.isThisGLVersion_2(gl) ? 'out' : 'varying';
  }
  static _in_onFrag(gl) {
    return GLBoost$1.isThisGLVersion_2(gl) ? 'in' : 'varying';
  }

  static _texture_func(gl) {
    return GLBoost$1.isThisGLVersion_2(gl) ? 'texture' : 'texture2D';
  }

  static _textureProj_func(gl) {
    return GLBoost$1.isThisGLVersion_2(gl) ? 'shadowProj' : 'texture2DProj';
  }

  static _generateLightStr(i) {
    let shaderText = '';
    
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
    shaderText += `    vec3 lightDirection = lightDirection_world[${i}];\n`;    
    shaderText += `    if (0.4 < lightSpotInfo[${i}].x) {\n`; // is pointlight or spotlight
    shaderText += `      lightDirection = normalize(lightPosition_world[${i}] - v_position_world.xyz);\n`;
    shaderText += `    }\n`;
    shaderText += `    float spotEffect = 1.0;\n`;
    shaderText += `    if (lightSpotInfo[${i}].x > 0.8) {\n`; // is spotlight
    shaderText += `      spotEffect = dot(lightDirection_world[${i}], lightDirection);\n`;
    shaderText += `      if (spotEffect > lightSpotInfo[${i}].y) {\n`; // lightSpotInfo[${i}].y == spotCosCutoff
    shaderText += `        spotEffect = pow(spotEffect, lightSpotInfo[${i}].z);\n`; // lightSpotInfo[${i}].z == spotExponent
    shaderText += `      } else {\n`;
    shaderText += `        spotEffect = 0.0;\n`;
    shaderText += `      }\n`;
    shaderText += `    }\n`;

    return shaderText;
  }

  static _generateShadowingStr(gl, i, isShadowEnabledAsTexture) {
    let shadowingText = '';
    shadowingText += `float visibilityForShadow = 0.75;\n`;
    shadowingText += `float visibility = 1.0;\n`;
    shadowingText += `float visibilitySpecular = 1.0;\n`;
    shadowingText += `if (isShadowCasting[${i}] == 1) {// ${i}\n`;
    shadowingText += `vec4 shadowCoord_i = shadowCoord[${i}];\n`;
    shadowingText += `shadowCoord_i.z -= depthBias;\n`;

    if (GLBoost$1.isThisGLVersion_2(gl)) {
      if (isShadowEnabledAsTexture) {
        shadowingText += `visibilitySpecular = textureProj(uDepthTexture[${i}], shadowCoord_i);\n`;
        shadowingText += `visibility = visibilitySpecular + visibilityForShadow;\n`;
      }
    } else {
      if (isShadowEnabledAsTexture) {
//        shadowingText += `  shadowCoord_i.y = 1.0 - shadowCoord_i.y;\n`;
        shadowingText += `float depth = texture2DProj(uDepthTexture[${i}], shadowCoord_i).r;\n`;
        shadowingText += `if (depth < shadowCoord_i.z) {\n`;
//        shadowingText += `if (depth < 0.9) {\n`;
        shadowingText += `  visibility = visibilityForShadow;\n`;
        shadowingText += `  visibilitySpecular = 0.0;\n`;
//        shadowingText += `  visibilityLevel = 0.0;\n`;
        shadowingText += `}\n`;
      }
    }
    shadowingText += `}\n`;

    return shadowingText;
  };

  static _getNormalStr(gl, material, f) {
    let shaderText = '';
    let normalTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_NORMAL);
    if (!normalTexture && Shader._exist(f, GLBoost$1.NORMAL)) {
      shaderText += '  vec3 normal = normalize(v_normal_world);\n';
      shaderText += '  vec3 normal_world = normal;\n';
    } else if (material.isFlatShading || !Shader._exist(f, GLBoost$1.NORMAL)) {
      if (!GLBoost$1.VALUE_TARGET_IS_MOBILE) {
        shaderText += '  vec3 dx = dFdx(v_position_world);\n';
        shaderText += '  vec3 dy = dFdy(v_position_world);\n';

  //      shaderText += '  normal = dot(viewDirection_world, cross(dx, dy)) >= 0.0 ? normalize(cross(dx, dy)) : normalize(cross(dy, dx));\n';
        shaderText += '  vec3 normal = normalize(cross(dx, dy));\n';
        shaderText += '  vec3 normal_world = normal;\n';
      }
      //      shaderText += '  normal *= -1.0;\n';
    } else if (normalTexture && Shader._exist(f, GLBoost$1.TANGENT)) {
      let textureFunc = Shader._texture_func(gl);
      shaderText += `  vec3 normal = ${textureFunc}(uNormalTexture, texcoord).xyz*2.0 - 1.0;\n`;
      shaderText += `  vec3 tangent_world = normalize(v_tangent_world);\n`;
      shaderText += `  vec3 binormal_world = normalize(v_binormal_world);\n`;
      shaderText += `  vec3 normal_world = normalize(v_normal_world);\n`;      

      shaderText += `  mat3 tbnMat_tangent_to_world = mat3(
        tangent_world.x, tangent_world.y, tangent_world.z,
        binormal_world.x, binormal_world.y, binormal_world.z,
        normal_world.x, normal_world.y, normal_world.z
      );\n`;
      
      shaderText += `  normal = normalize(tbnMat_tangent_to_world * normal);\n`;
      shaderText += `  normal_world = normal;\n`;

    }

    return shaderText;
  }

  _sampler2DShadow_func() {
    var gl = this._glContext.gl;
    return GLBoost$1.isThisGLVersion_2(gl) ? 'sampler2DShadow' : 'sampler2D';
  }

  static _set_outColor_onFrag(gl, i) {
    return GLBoost$1.isThisGLVersion_2(gl) ? `layout(location = ${i}) out vec4 rt${i};\n` : `vec4 rt${i};\n`;
  }

  static _set_glFragColor_inGLVer1(gl) {
    return !GLBoost$1.isThisGLVersion_2(gl) ? '  gl_FragColor = rt0;\n' : '';
  }
  static _set_glFragData_inGLVer1(gl, i) {
    return !GLBoost$1.isThisGLVersion_2(gl) ? `  gl_FragData[${i}] = rt${i};\n` : '';
  }

  static trySettingMatrix44ToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, matrixArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniformMatrix4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), false, matrixArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniformMatrix4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), false, matrixArray);
    });
  }

  static trySettingMatrix33ToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, matrixArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniformMatrix3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), false, matrixArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniformMatrix3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), false, matrixArray);
    });
  }

  static trySettingVec4ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniform4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), vecArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniform4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), vecArray);
    });
  }  

  static trySettingVec3ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniform3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), vecArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniform3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), vecArray);
    });
  }  

  static trySettingVec2ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniform2fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), vecArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniform2fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), vecArray);
    });
  } 

  get glslProgram() {
    return this._glslProgram;
  }

  readyForDiscard() {
    if (this._glslProgram) {
      this._glContext.deleteProgram(this, this._glslProgram);
    }
    super.readyForDiscard();
  }

  getShaderParameter(material, parameterName, defaultValue) {
    if (typeof this[parameterName] !== 'undefined') {
      return this[parameterName];
    } else if (typeof material.shaderParameters[parameterName] !== 'undefined') {
      return material.shaderParameters[parameterName];
    }
    return defaultValue;
  }
}

Shader._instances = new Object();
Shader._shaderHashTable = {};
Shader._defaultLight = null;

//import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
let singleton$1 = Symbol();
let singletonEnforcer = Symbol();

class DrawKickerLocal {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }
    this._glslProgram = null;
  }

  static getInstance() {
    if (!this[singleton$1]) {
      this[singleton$1] = new DrawKickerLocal(singletonEnforcer);
    }
    return this[singleton$1];
  }

  draw(gl, glem, expression, mesh, materials, camera, lights, lightsExceptAmbient, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {
    var isVAOBound = false;
    if (DrawKickerLocal._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    for (let i=0; i<materials.length;i++) {
      let material = materials[i];
      if (!material.isVisible) {
        continue;
      }

      let materialUpdateStateString = material.getUpdateStateString();
      if (materialUpdateStateString !== DrawKickerLocal._lastMaterialUpdateStateString) {
        this._glslProgram = material.shaderInstance.glslProgram;
        material._glContext.useProgram(this._glslProgram);
      }
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerLocal._lastGeometry !== geometryName) {
          for (let attribName in vboDic) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[attribName]);
            geometry.setUpVertexAttribs(gl, glslProgram, geometry._allVertexAttribs(vertices));
          }
        }
      }

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      material._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_opacity'), opacity, true);

      if (camera) {
        let world_m;
        if (mesh.isAffectedByWorldMatrix) {
          if (mesh.isAffectedByWorldMatrixAccumulatedAncestry) {
            world_m = mesh.transformMatrixAccumulatedAncestry;
          } else {
            world_m = mesh.transformMatrix;
          }
        } else {
          world_m = Matrix44.identity();
        }
        let viewMatrix;
        if (mesh.isAffectedByViewMatrix) {
          viewMatrix = camera.lookAtRHMatrix();
        } else {
          viewMatrix = Matrix44.identity();
        }
        let projectionMatrix;
        if (mesh.isAffectedByProjectionMatrix) {
          projectionMatrix = camera.projectionRHMatrix();
        } else {
          projectionMatrix = Matrix44.identity();
        }
        let pvm_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(world_m);
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, glslProgram._semanticsDic, 'MODELVIEW', Matrix44.multiply(viewMatrix, world_m.flatten()));
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, glslProgram._semanticsDic, 'MODELVIEWPROJECTION',pvm_m.flatten());
      }

      if (material.getUniform(glslProgram, 'uniform_lightPosition_0')) {
        lights = material.shaderInstance.getDefaultPointLightIfNotExist(lights);
        if (material.getUniform(glslProgram, 'uniform_viewPosition')) {
          let cameraPosInLocalCoord = null;
          if (camera) {
            let cameraPos = camera.transformMatrixAccumulatedAncestryWithoutMySelf.multiplyVector(new Vector4(camera.eyeInner.x, camera.eyeInner.y, camera.eyeInner.z, 1.0));
            cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(cameraPos.x, cameraPos.y, cameraPos.z, 1));
          } else {
            cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(0, 0, 1, 1));
          }
          material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_viewPosition'), cameraPosInLocalCoord.x, cameraPosInLocalCoord.y, cameraPosInLocalCoord.z, true);
        }

        for (let j = 0; j < lights.length; j++) {
          if (material.getUniform(glslProgram, `uniform_lightPosition_${j}`) && material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`)) {
            let lightVec = null;
            let isPointLight = -9999;
            if (lights[j] instanceof M_PointLight) {
              lightVec = new Vector4(0, 0, 0, 1);
              lightVec = lights[j].transformMatrixAccumulatedAncestry.multiplyVector(lightVec);
              isPointLight = 1.0;
            } else if (lights[j].className === 'M_DirectionalLight') {
              lightVec = new Vector4(-lights[j].direction.x, -lights[j].direction.y, -lights[j].direction.z, 1);
              lightVec = lights[j].rotateMatrixAccumulatedAncestry.multiplyVector(lightVec);
              lightVec.w = 0.0;
              isPointLight = 0.0;
            }

            let lightVecInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(lightVec);
            material._glContext.uniform4f(material.getUniform(glslProgram, `uniform_lightPosition_${j}`), lightVecInLocalCoord.x, lightVecInLocalCoord.y, lightVecInLocalCoord.z, isPointLight, true);

            material._glContext.uniform4f(material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`), lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0, true);
          }
        }
      }

      let isMaterialSetupDone = true;

      {
        var needTobeStillDirty = material.shaderInstance.setUniforms(gl, glslProgram, scene, material, camera, mesh);
        material.shaderInstance.dirty = needTobeStillDirty ? true : false;

        isMaterialSetupDone = material.setUpTexture();
        return;
      }

      if (geometry.isIndexed()) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName][i]);
        gl.drawElements(primitiveType, material.getVertexN(geometry), glem.elementIndexBitSize(gl), 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(primitiveType, 0, vertexN);
      }


      DrawKickerLocal._lastMaterialUpdateStateString = isMaterialSetupDone ? materialUpdateStateString : null;
    }

    //gl.bindBuffer(gl.ARRAY_BUFFER, null);

    DrawKickerLocal._lastGeometry = geometryName;
    DrawKickerLocal._lastRenderPassIndex = renderPassIndex;
  }
}

DrawKickerLocal._lastMaterialUpdateStateString = null;
DrawKickerLocal._lastGeometry = null;
DrawKickerLocal._lastRenderPassIndex = -1;

//import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
let singleton$2 = Symbol();
let singletonEnforcer$1 = Symbol();

class DrawKickerWorld {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer$1) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }
    this._glslProgram = null;
  }

  static getInstance() {
    if (!this[singleton$2]) {
      this[singleton$2] = new DrawKickerWorld(singletonEnforcer$1);
    }
    return this[singleton$2];
  }

  draw(gl, glem, expression, mesh, originalMaterials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {

    var isVAOBound = false;
    if (DrawKickerWorld._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    let input = mesh._getCurrentAnimationInputValue('time');

    for (let i=0; i<originalMaterials.length;i++) {
      let material = originalMaterials[i];
      if (!material.isVisible) {
        continue;
      }

      let renderpassSpecificMaterial = material['renderpassSpecificMaterial_' + expression.renderPasses[renderPassIndex].instanceName + '_material_' + i];
      if (renderpassSpecificMaterial) {
        material = renderpassSpecificMaterial;
      }
      this._glslProgram = material.shaderInstance.glslProgram;

      material._glContext.useProgram(this._glslProgram);
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerWorld._lastGeometry !== geometryName) {
          for (let attribName in vboDic) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[attribName]);
            geometry.setUpVertexAttribs(gl, glslProgram, Geometry._allVertexAttribs(vertices));
          }
        }
      }

      material._glContext.uniform2i(material.getUniform(glslProgram, 'uniform_objectIds'), mesh.objectIndex, 0, true);

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      let query_result_uniform_opacity = material.getUniform(glslProgram, 'uniform_opacity');
      material._glContext.uniform1f(query_result_uniform_opacity, opacity, true);

      let world_m;
      let normal_m;
      if (mesh.isAffectedByWorldMatrix) {
        if (mesh.isAffectedByWorldMatrixAccumulatedAncestry) {
          world_m = mesh.getTransformMatrixAccumulatedAncestryAt(input);
          normal_m = mesh.normalMatrixAccumulatedAncestry;
        } else {
          world_m = mesh.getTransformMatrixAt(input);
          normal_m = mesh.normalMatrix;
        }
      } else {
        world_m = Matrix44$1.identity();
        normal_m = Matrix33.identity();
      }

      Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'WORLD', world_m.flatten());
      Shader.trySettingMatrix33ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEWINVERSETRANSPOSE', normal_m.flatten());
      if (camera) {
        let viewMatrix;
        if (mesh.isAffectedByViewMatrix) {
          let cameraMatrix = camera.lookAtRHMatrix();
//          viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf);
          viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestry);
        } else {
          viewMatrix = Matrix44$1.identity();
        }

        let projectionMatrix;
        if (mesh.isAffectedByProjectionMatrix) {
          projectionMatrix = camera.projectionRHMatrix();
        } else {
          projectionMatrix = Matrix44$1.identity();
        }

        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'VIEW', viewMatrix.flatten());
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'PROJECTION', projectionMatrix.flatten());
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEW', Matrix44$1.multiply(viewMatrix, world_m).flatten());

        camera._lastPVMatrixFromLight = Matrix44$1.multiply(projectionMatrix, viewMatrix);
      }

      if (material.getUniform(glslProgram, 'uniform_lightPosition_0')) {
        lights = material.shaderInstance.getDefaultPointLightIfNotExist(lights);
        
        if (material.getUniform(glslProgram, 'uniform_viewPosition')) {
          let cameraPos = new Vector4(0, 0, 1, 1);
          if (camera) {
            cameraPos = camera.transformMatrixAccumulatedAncestryWithoutMySelf.multiplyVector(new Vector4(camera.eyeInner.x, camera.eyeInner.y, camera.eyeInner.z, 1.0));
          //  console.log(cameraPos);
          }
          material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_viewPosition'), cameraPos.x, cameraPos.y, cameraPos.z, true);
        }

        for (let j = 0; j < lights.length; j++) {
          let light = lights[j];
          if (material.getUniform(glslProgram, `uniform_lightPosition_${j}`) && material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`)) {
            let lightPosition = new Vector4(0, 0, 0, 1);            
            let lightDirection = new Vector4(0, 0, 0, 1);
            // Directional: [0.0, 0.4), Point:[0.4, 0.6), Spot:[0.6, 1.0]
            let lightType = 0.0; // M_DirectionalLight
            if (light.className === 'M_PointLight') {
              lightType = 0.5;
            } else if (light.className === 'M_SpotLight') {
              lightType = 1.0;
            }
            if (light.className === 'M_PointLight' || light.className === 'M_SpotLight') {
              lightPosition = light.transformMatrixAccumulatedAncestry.multiplyVector(lightPosition);
            }
            if (light.className === 'M_DirectionalLight' || light.className === 'M_SpotLight') {
              lightDirection = new Vector3(-light.direction.x, -light.direction.y, -light.direction.z);
              //lightDirection = light.rotateMatrixAccumulatedAncestry.multiplyVector(lightDirection).toVector3();
              lightDirection.normalize();
            }
            material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightPosition_${j}`), lightPosition.x, lightPosition.y, lightPosition.z, true);
            material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightDirection_${j}`), lightDirection.x, lightDirection.y, lightDirection.z, true);
            material._glContext.uniform4f(material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`), light.intensity.x, light.intensity.y, light.intensity.z, 1.0, true);
            if (light.className === 'M_SpotLight') {
              material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightSpotInfo_${j}`), lightType, light.spotCosCutoff, light.spotExponent, true);              
            } else {
              material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightSpotInfo_${j}`), lightType, 0, 0, true);              
            }
          }
        }
      }

      let isMaterialSetupDone = true;

      {
        let needTobeStillDirty = material.shaderInstance.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);
        material.shaderInstance.dirty = needTobeStillDirty ? true : false;

        material.setUpStates();

        this._setUpOrTearDownTextures(true, material);
      }
      
      this._setupOtherTextures(lights);

      geometry.drawIntermediate(gl, glslProgram, mesh, material);


      if (geometry.isIndexed()) {
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName]);
        let vertexN = material.getVertexN(geometry);
        let indexBitSizeGLConstant = glem.elementIndexBitSizeGLConstant(gl);
        let indexByteSizeNumber = glem.elementIndexByteSizeNumber(gl);
        let offset = geometry.getIndexStartOffsetArrayAtMaterial(i);
        gl.drawElements(primitiveType, vertexN, indexBitSizeGLConstant, offset*indexByteSizeNumber);
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(primitiveType, 0, vertexN);
      }

      material.shaderInstance.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);

      this._tearDownOtherTextures(lights);

      material.tearDownStates();

      //DrawKickerWorld._lastMaterialUpdateStateString = isMaterialSetupDone ? materialUpdateStateString : null;
    }
    //glem.bindVertexArray(gl, null);

  //  gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //DrawKickerWorld._lastRenderPassIndex = renderPassIndex;
    DrawKickerWorld._lastGeometry = geometryName;
  }

  _setUpOrTearDownTextures(isSetUp, material) {
    let methodName = 'tearDownTexture';
    if (isSetUp) {
      methodName = 'setUpTexture';
    }

    let isTextureProcessDone = true;
    if (typeof material._semanticsDic['TEXTURE'] === 'undefined') {
    } else if (typeof material._semanticsDic['TEXTURE'] === 'string') {
      let textureSamplerDic = material.uniformTextureSamplerDic[material._semanticsDic['TEXTURE']];
      let textureName = textureSamplerDic.textureName;
      let textureUnitIndex = textureSamplerDic.textureUnitIndex;
      isTextureProcessDone = material[methodName](textureName, textureUnitIndex);
    } else {
      // it must be an Array...
      material._semanticsDic['TEXTURE'].forEach((uniformName) => {
        let textureSamplerDic = material.uniformTextureSamplerDic[uniformName];
        let textureName = textureSamplerDic.textureName;
        let textureUnitIndex = textureSamplerDic.textureUnitIndex;
        isTextureProcessDone = material[methodName](textureName, textureUnitIndex);
      });
    }

    return isTextureProcessDone;
  }

  _setupOtherTextures(lights) {
    for(let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {// && lights[i].isCastingShadow) {
        lights[i].camera.texture.setUp();
      }
    }
  }

  _tearDownOtherTextures(lights) {
    for(let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture)  {// && lights[i].isCastingShadow) {
        lights[i].camera.texture.tearDown();
      }
    }
  }
}

//DrawKickerWorld._lastMaterialUpdateStateString = null;
//DrawKickerWorld._lastGeometry = null;
//DrawKickerWorld._lastRenderPassIndex = -1;

class VertexLocalShaderSource {
  VSDefine_VertexLocalShaderSource(in_, out_, f) {
    let shaderText = '';

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 v_normal;\n`;
    }
    shaderText += `${out_} vec4 position;\n`;
    shaderText +=      'uniform mat4 modelViewProjectionMatrix;\n';
    return shaderText;
  }

  VSTransform_VertexLocalShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (existCamera_f) {
      shaderText +=   '  gl_Position = modelViewProjectionMatrix * position_local;\n';
      shaderText +=   '  mat4 pvwMatrix = modelViewProjectionMatrix;\n';
    } else {
      shaderText +=   '  gl_Position = position_local;\n';
    }
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  v_normal = aVertex_normal;\n';
    }
    shaderText += '  position = vec4(aVertex_position, 1.0);\n';

    return shaderText;
  }

  FSDefine_VertexLocalShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';
    if(lights.length > 0) {
      shaderText += `uniform vec4 lightPosition[${lights.length}];\n`;
      shaderText += `uniform vec4 lightDiffuse[${lights.length}];\n`;
    }
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 v_normal;\n`;
    }
    shaderText += `${in_} vec4 position;\n`;

    return shaderText;
  }

  prepare_VertexLocalShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'position' || attribName === 'normal') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    if (existCamera_f) {
      material.setUniform(shaderProgram, 'uniform_modelViewProjectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'modelViewProjectionMatrix'));
      material._semanticsDic['MODELVIEWPROJECTION'] = 'modelViewProjectionMatrix';
    }

    for(let i=0; i<lights.length; i++) {
      material.setUniform(shaderProgram, 'uniform_lightPosition_'+i, this._glContext.getUniformLocation(shaderProgram, `lightPosition[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightDiffuse_'+i, this._glContext.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`));
    }

    return vertexAttribsAsResult;
  }
}

GLBoost['VertexLocalShaderSource'] = VertexLocalShaderSource;

class AABB {

  constructor() {
    this._AABB_min = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    this._AABB_max = new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
    this._centerPoint = null;
    this._lengthCenterToCorner = null;

  }

  clone() {
    let instance = new AABB();
    instance._AABB_max = this._AABB_max.clone();
    instance._AABB_min = this._AABB_min.clone();
    instance._centerPoint = (this._centerPoint !== null) ? this._centerPoint.clone() : null;
    instance._lengthCenterToCorner = this._lengthCenterToCorner;

    return instance;
  }

  isVanilla() {
    if (this._AABB_min.x == Number.MAX_VALUE && this._AABB_min.y == Number.MAX_VALUE && this._AABB_min.z == Number.MAX_VALUE
      && this._AABB_max.x == -Number.MAX_VALUE && this._AABB_max.y == -Number.MAX_VALUE && this._AABB_max.z == -Number.MAX_VALUE) {
      return true;
    } else {
      return false;
    }
  }

  addPosition(positionVector) {
    this._AABB_min.x = (positionVector.x < this._AABB_min.x) ? positionVector.x : this._AABB_min.x;
    this._AABB_min.y = (positionVector.y < this._AABB_min.y) ? positionVector.y : this._AABB_min.y;
    this._AABB_min.z = (positionVector.z < this._AABB_min.z) ? positionVector.z : this._AABB_min.z;
    this._AABB_max.x = (this._AABB_max.x < positionVector.x) ? positionVector.x : this._AABB_max.x;
    this._AABB_max.y = (this._AABB_max.y < positionVector.y) ? positionVector.y : this._AABB_max.y;
    this._AABB_max.z = (this._AABB_max.z < positionVector.z) ? positionVector.z : this._AABB_max.z;

    return positionVector;
  }

  addPositionWithArray(array, index) {
    this._AABB_min.x = (array[index+0] < this._AABB_min.x) ? array[index+0] : this._AABB_min.x;
    this._AABB_min.y = (array[index+1] < this._AABB_min.y) ? array[index+1] : this._AABB_min.y;
    this._AABB_min.z = (array[index+2] < this._AABB_min.z) ? array[index+2] : this._AABB_min.z;
    this._AABB_max.x = (this._AABB_max.x < array[index+0]) ? array[index+0] : this._AABB_max.x;
    this._AABB_max.y = (this._AABB_max.y < array[index+1]) ? array[index+1] : this._AABB_max.y;
    this._AABB_max.z = (this._AABB_max.z < array[index+2]) ? array[index+2] : this._AABB_max.z;

    return array;
  }

  updateAllInfo() {
    this._centerPoint = Vector3.add(this._AABB_min, this._AABB_max).divide(2);
    this._lengthCenterToCorner = Vector3.lengthBtw(this._centerPoint, this._AABB_max);

    return this;
  }

  mergeAABB(aabb) {
    var isUpdated = false;

    if (aabb.isVanilla()) {
      return isUpdated;
    }

    if (this.isVanilla()) {
      this._AABB_min.x = aabb.minPoint.x;
      this._AABB_min.y = aabb.minPoint.y;
      this._AABB_min.z = aabb.minPoint.z;
      this._AABB_max.x = aabb.maxPoint.x;
      this._AABB_max.y = aabb.maxPoint.y;
      this._AABB_max.z = aabb.maxPoint.z;
      isUpdated = true;
      return isUpdated;
    }

    if (aabb.minPoint.x < this._AABB_min.x) {
      this._AABB_min.x = aabb.minPoint.x;
      isUpdated = true;
    }
    if (aabb.minPoint.y < this._AABB_min.y) {
      this._AABB_min.y = aabb.minPoint.y;
      isUpdated = true;
    }
    if (aabb.minPoint.z < this._AABB_min.z) {
      this._AABB_min.z = aabb.minPoint.z;
      isUpdated = true;
    }
    if (this._AABB_max.x < aabb.maxPoint.x) {
      this._AABB_max.x = aabb.maxPoint.x;
      isUpdated = true;
    }
    if (this._AABB_max.y < aabb.maxPoint.y) {
      this._AABB_max.y = aabb.maxPoint.y;
      isUpdated = true;
    }
    if (this._AABB_max.z < aabb.maxPoint.z) {
      this._AABB_max.z = aabb.maxPoint.z;
      isUpdated = true;
    }
    this.updateAllInfo();

    return isUpdated;
  }


  get minPoint() {
    return this._AABB_min;
  }

  get maxPoint() {
    return this._AABB_max;
  }

  get centerPoint() {
    return this._centerPoint;
  }

  get lengthCenterToCorner() {
    return this._lengthCenterToCorner;
  }

  static multiplyMatrix(matrix, aabb) {
     if (aabb.isVanilla()) {
       return aabb.clone();
     }
    var newAabb = new AABB();

    let AABB_0 = new Vector4(aabb._AABB_min.x, aabb._AABB_min.y, aabb._AABB_min.z, 1);
    let AABB_1 = new Vector4(aabb._AABB_max.x, aabb._AABB_min.y, aabb._AABB_min.z, 1);
    let AABB_2 = new Vector4(aabb._AABB_min.x, aabb._AABB_max.y, aabb._AABB_min.z, 1);
    let AABB_3 = new Vector4(aabb._AABB_min.x, aabb._AABB_min.y, aabb._AABB_max.z, 1);
    let AABB_4 = new Vector4(aabb._AABB_min.x, aabb._AABB_max.y, aabb._AABB_max.z, 1);
    let AABB_5 = new Vector4(aabb._AABB_max.x, aabb._AABB_min.y, aabb._AABB_max.z, 1);
    let AABB_6 = new Vector4(aabb._AABB_max.x, aabb._AABB_max.y, aabb._AABB_min.z, 1);
    let AABB_7 = new Vector4(aabb._AABB_max.x, aabb._AABB_max.y, aabb._AABB_max.z, 1);
    newAabb.addPosition(matrix.multiplyVector(AABB_0).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_1).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_2).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_3).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_4).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_5).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_6).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_7).toVector3());
    newAabb.updateAllInfo();

    return newAabb;
  }

  toString() {
    return 'AABB_min: ' + this._AABB_min + '\n' + 'AABB_max: ' + this._AABB_max + '\n'
      + 'centerPoint: ' + this._centerPoint + '\n' + 'lengthCenterToCorner: ' + this._lengthCenterToCorner;
  }
}

GLBoost$1['AABB'] = AABB;

class FreeShader extends Shader {
  constructor(glBoostContext, vertexShaderText, fragmentShaderText, attributes, uniforms, textureNames) {
    super(glBoostContext);

    this._vertexShaderText = vertexShaderText;
    this._fragmentShaderText = fragmentShaderText;


    let newAttributes = {};
    for (let attributeName in attributes) {
      switch (attributes[attributeName]) {
        case 'POSITION':
          newAttributes.position = attributeName;
          break;
        case 'NORMAL':
          newAttributes.normal = attributeName;
          break;
        case 'COLOR':
          newAttributes.color = attributeName;
          break;
        case 'TEXCOORD_0':
          newAttributes.texcoord = attributeName;
          break;
        case 'JOINT':
          newAttributes.joint = attributeName;
          break;
        case 'WEIGHT':
          newAttributes.weight = attributeName;
          break;
        default:
          newAttributes[attributes[attributeName]] = attributeName;
          break;
      }
    }

    this._attributes = newAttributes;
    this._uniforms = uniforms;
    this._textureNames = textureNames;
  }

  _getVertexShaderString(gl, functions, existCamera_f, lights, material, extraData) {
    return this._vertexShaderText;
  }

  _getFragmentShaderString(gl, functions, lights, material, extraData) {
    return this._fragmentShaderText;
  }

  _prepareAssetsForShaders(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, this._attributes[attribName]);
      if (shaderProgram['vertexAttribute_' + attribName] >= 0) {
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    let textureCount = 0;
    this._glContext.useProgram(shaderProgram);

    for (let uniformName in this._uniforms) {
      if (this._uniforms[uniformName] === 'TEXTURE') {
        material.uniformTextureSamplerDic[uniformName] = {};
        let textureUniformLocation = this._glContext.getUniformLocation(shaderProgram, uniformName);
        if (textureUniformLocation < 0) {
          continue;
        }
        material.uniformTextureSamplerDic[uniformName].textureName = this._textureNames[uniformName];
        material.uniformTextureSamplerDic[uniformName].textureUnitIndex = textureCount;

        this._glContext.uniform1i(textureUniformLocation, textureCount, true);

        textureCount++;
      }

      switch (this._uniforms[uniformName]) {
        case 'MODELVIEW':
        case 'MODELVIEWINVERSETRANSPOSE':
        case 'PROJECTION':
        case 'JOINTMATRIX':
          material.setUniform(shaderProgram, 'uniform_' + uniformName, this._glContext.getUniformLocation(shaderProgram, uniformName));
        case 'TEXTURE':
          material.addSemanticsDic(this._uniforms[uniformName], uniformName);
          continue;
      }

      material.setUniform(shaderProgram, 'uniform_' + uniformName, this._glContext.getUniformLocation(shaderProgram, uniformName));

    }

    return vertexAttribsAsResult;
  }

  get attributes() {
    return this._attributes;
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);
    
    for (let uniformName in this._uniforms) {
      let value = this._uniforms[uniformName];

      if (typeof value === 'number') {
        this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_' + uniformName), value, true);
      } else if (value instanceof Vector2) {
        this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, true);
      } else if (value instanceof Vector3) {
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, value.z, true);
      } else if (value instanceof Vector4) {
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, value.z, value.w, true);
      }
    }
  }
}

GLBoost['FreeShader'] = FreeShader;

class Geometry extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._materials = [];
    this._vertexN = 0;
    this._vertices = null;
    this._indicesArray = null;
    this._indexStartOffsetArray = [];
    this._performanceHint = null;
    this._defaultMaterial = null;
    this._vertexData = [];
    this._extraDataForShader = {};
    this._vboObj = {};
    this._AABB = new AABB();
    this._drawKicker = DrawKickerWorld.getInstance();

    if (this._drawKicker instanceof DrawKickerWorld) {

    } else if (this._drawKicker instanceof DrawKickerLocal) {

    }
  }

  /**
   * 全ての頂点属性のリストを返す
   */
  static _allVertexAttribs(vertices) {
    var attribNameArray = [];
    for (var attribName in vertices) {
      if (attribName !== 'components' && attribName !== 'componentBytes' && attribName !== 'componentType') {
        attribNameArray.push(attribName);
      }
    }

    return attribNameArray;
  }

  _checkAndSetVertexComponentNumber(allVertexAttribs) {
    allVertexAttribs.forEach((attribName)=> {
      let element = this._vertices[attribName][0];
      let componentN = MathUtil.compomentNumberOfVector(element);
      if (componentN === 0) {
        // if 0, it must be a number. so users must set components info.
        return;
      }
      if (typeof this._vertices.components === 'undefined') {
        this._vertices.components = {};
      }
      if (typeof this._vertices.componentType === 'undefined') {
        this._vertices.componentType = {};
      }

      this._vertices.components[attribName] = componentN;
      this._vertices.componentType[attribName] = 5126;
    });
  }

  _calcBaryCentricCoord(vertexNum, positionElementNumPerVertex) {
    this._vertices.barycentricCoord = new Float32Array(vertexNum*positionElementNumPerVertex);
    this._vertices.components.barycentricCoord = 3;
    this._vertices.componentType.barycentricCoord = 5126; // gl.FLOAT
    if (!this._indicesArray) {
      for (let i=0; i<vertexNum; i++) {
        this._vertices.barycentricCoord[i*positionElementNumPerVertex+0] = (i % 3 === 0) ? 1 : 0;   // 1 0 0  1 0 0  1 0 0
        this._vertices.barycentricCoord[i*positionElementNumPerVertex+1] = (i % 3 === 1) ? 1 : 0;   // 0 1 0  0 1 0  0 1 0
        this._vertices.barycentricCoord[i*positionElementNumPerVertex+2] = (i % 3 === 2) ? 1 : 0;   // 0 0 1  0 0 1  0 0 1
      }
    } else {
      for (let i=0; i<this._indicesArray.length; i++) {
        let vertexIndices = this._indicesArray[i];
        for (let j=0; j<vertexIndices.length; j++) {
          this._vertices.barycentricCoord[vertexIndices[j]*positionElementNumPerVertex+0] = (j % 3 === 0) ? 1 : 0;   // 1 0 0  1 0 0  1 0 0
          this._vertices.barycentricCoord[vertexIndices[j]*positionElementNumPerVertex+1] = (j % 3 === 1) ? 1 : 0;   // 0 1 0  0 1 0  0 1 0
          this._vertices.barycentricCoord[vertexIndices[j]*positionElementNumPerVertex+2] = (j % 3 === 2) ? 1 : 0;   // 0 0 1  0 0 1  0 0 1
        }
      }
    }
  }

  _calcTangentPerVertex(pos0Vec3, pos1Vec3, pos2Vec3, uv0Vec2, uv1Vec2, uv2Vec2) {
    let cp0 = [
      new Vector3(
        pos0Vec3.x,
        uv0Vec2.x,
        uv0Vec2.y
      ),
      new Vector3(
        pos0Vec3.y,
        uv0Vec2.x,
        uv0Vec2.y
      ),
      new Vector3(
        pos0Vec3.z,
        uv0Vec2.x,
        uv0Vec2.y
      )
    ];

    let cp1 = [
      new Vector3(
        pos1Vec3.x,
        uv1Vec2.x,
        uv1Vec2.y
      ),
      new Vector3(
        pos1Vec3.y,
        uv1Vec2.x,
        uv1Vec2.y
      ),
      new Vector3(
        pos1Vec3.z,
        uv1Vec2.x,
        uv1Vec2.y
      )
    ];

    let cp2 = [
      new Vector3(
        pos2Vec3.x,
        uv2Vec2.x,
        uv2Vec2.y
      ),
      new Vector3(
        pos2Vec3.y,
        uv2Vec2.x,
        uv2Vec2.y
      ),
      new Vector3(
        pos2Vec3.z,
        uv2Vec2.x,
        uv2Vec2.y
      )
    ];

    let u = [];
    let v = [];

    for ( let i = 0; i < 3; i++ ) {
      let v1 = Vector3.subtract(cp1[i], cp0[i]);
      let v2 = Vector3.subtract(cp2[i], cp1[i]);
      let abc = Vector3.cross(v1, v2);

      let validate = Math.abs(abc.x) < Number.EPSILON;
      if (validate) {
        console.assert(validate, "Polygons or polygons on UV are degenerate!");
        return new Vector3(0, 0, 0);
      }

      u[i] = - abc.y / abc.x;
      v[i] = - abc.z / abc.x;
    }

    return (new Vector3(u[0], u[1], u[2])).normalize();
  }

  _calcTangentFor3Vertices(vertexIndices, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, componentNum3) {
    let pos0Vec3 = new Vector3(
      this._vertices.position[pos0IndexBase],
      this._vertices.position[pos0IndexBase + 1],
      this._vertices.position[pos0IndexBase + 2]
    );

    let pos1Vec3 = new Vector3(
      this._vertices.position[pos1IndexBase],
      this._vertices.position[pos1IndexBase + 1],
      this._vertices.position[pos1IndexBase + 2]
    );

    let pos2Vec3 = new Vector3(
      this._vertices.position[pos2IndexBase],
      this._vertices.position[pos2IndexBase + 1],
      this._vertices.position[pos2IndexBase + 2]
    );

    let uv0Vec2 = new Vector2(
      this._vertices.texcoord[uv0IndexBase],
      this._vertices.texcoord[uv0IndexBase + 1]
    );

    let uv1Vec2 = new Vector2(
      this._vertices.texcoord[uv1IndexBase],
      this._vertices.texcoord[uv1IndexBase + 1]
    );

    let uv2Vec2 = new Vector2(
      this._vertices.texcoord[uv2IndexBase],
      this._vertices.texcoord[uv2IndexBase + 1]
    );

    let tan0IndexBase = (i    ) * componentNum3;
    let tan1IndexBase = (i + 1) * componentNum3;
    let tan2IndexBase = (i + 2) * componentNum3;
    if (vertexIndices) {
      tan0IndexBase = vertexIndices[i] * componentNum3;
      tan1IndexBase = vertexIndices[i + 1] * componentNum3;
      tan2IndexBase = vertexIndices[i + 2] * componentNum3;
    }

    let tan0Vec3 = this._calcTangentPerVertex(pos0Vec3, pos1Vec3, pos2Vec3, uv0Vec2, uv1Vec2, uv2Vec2);
    this._vertices.tangent[tan0IndexBase] = tan0Vec3.x;
    this._vertices.tangent[tan0IndexBase + 1] = tan0Vec3.y;
    this._vertices.tangent[tan0IndexBase + 2] = tan0Vec3.z;

    let tan1Vec3 = this._calcTangentPerVertex(pos1Vec3, pos2Vec3, pos0Vec3, uv1Vec2, uv2Vec2, uv0Vec2);
    this._vertices.tangent[tan1IndexBase] = tan1Vec3.x;
    this._vertices.tangent[tan1IndexBase + 1] = tan1Vec3.y;
    this._vertices.tangent[tan1IndexBase + 2] = tan1Vec3.z;

    let tan2Vec3 = this._calcTangentPerVertex(pos2Vec3, pos0Vec3, pos1Vec3, uv2Vec2, uv0Vec2, uv1Vec2);
    this._vertices.tangent[tan2IndexBase] = tan2Vec3.x;
    this._vertices.tangent[tan2IndexBase + 1] = tan2Vec3.y;
    this._vertices.tangent[tan2IndexBase + 2] = tan2Vec3.z;
  }

  _calcTangent(vertexNum, positionElementNumPerVertex, texcoordElementNumPerVertex, primitiveType) {

    this._vertices.tangent = new Float32Array(vertexNum*positionElementNumPerVertex);
    this._vertices.components.tangent = 3;
    this._vertices.componentType.tangent = 5126; // gl.FLOAT

    let incrementNum = 3; // gl.TRIANGLES
    if (primitiveType === GLBoost$1.TRIANGLE_STRIP) { // gl.TRIANGLE_STRIP
      //incrementNum = 1;
    }
    if ( this._vertices.texcoord ) {
      if (!this._indicesArray) {
        for (let i=0; i<vertexNum; i+=incrementNum) {
          let pos0IndexBase = i * positionElementNumPerVertex;
          let pos1IndexBase = (i + 1) * positionElementNumPerVertex;
          let pos2IndexBase = (i + 2) * positionElementNumPerVertex;
          let uv0IndexBase = i * texcoordElementNumPerVertex;
          let uv1IndexBase = (i + 1) * texcoordElementNumPerVertex;
          let uv2IndexBase = (i + 2) * texcoordElementNumPerVertex;

          this._calcTangentFor3Vertices(null, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, incrementNum);

        }
      } else {
        for (let i=0; i<this._indicesArray.length; i++) {
          let vertexIndices = this._indicesArray[i];
          for (let j=0; j<vertexIndices.length; j+=incrementNum) {
            let pos0IndexBase = vertexIndices[j    ] * positionElementNumPerVertex; /// ０つ目の頂点
            let pos1IndexBase = vertexIndices[j + 1] * positionElementNumPerVertex; /// １つ目の頂点
            let pos2IndexBase = vertexIndices[j + 2] * positionElementNumPerVertex; /// ２つ目の頂点
            let uv0IndexBase = vertexIndices[j    ]  * texcoordElementNumPerVertex;
            let uv1IndexBase = vertexIndices[j + 1]  * texcoordElementNumPerVertex;
            let uv2IndexBase = vertexIndices[j + 2]  * texcoordElementNumPerVertex;

            this._calcTangentFor3Vertices(vertexIndices, j, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, incrementNum);

          }
        }
      }
    }


  }

  setVerticesData(vertices, indicesArray, primitiveType = GLBoost$1.TRIANGLES, performanceHint = GLBoost$1.STATIC_DRAW) {
    this._vertices = vertices;
    this._indicesArray = indicesArray;

    let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
    this._checkAndSetVertexComponentNumber(allVertexAttribs);

    let vertexNum = 0;
    let positionElementNum = 0;
    let positionElementNumPerVertex = this._vertices.components.position;
    let texcoordElementNumPerVertex = this._vertices.components.texcoord;

    if (typeof this._vertices.position.buffer !== 'undefined') {
      vertexNum = this._vertices.position.length / positionElementNumPerVertex;
      positionElementNum = this._vertices.position.length;
    } else {
      vertexNum = this._vertices.position.length; // vertices must be type of Vector3
      positionElementNum = this._vertices.position.length * positionElementNumPerVertex;
    }

    // for Wireframe
    this._calcBaryCentricCoord(vertexNum, positionElementNumPerVertex);

    allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
    this._checkAndSetVertexComponentNumber(allVertexAttribs);

    // vector to array
    allVertexAttribs.forEach((attribName)=> {
      if (attribName === 'barycentricCoord') {
        return;
      }
      if (attribName === 'tangent') {
        return;
      }
      if (typeof this._vertices[attribName].buffer !== 'undefined') {
        return;
      }
      let vertexAttribArray = [];
      this._vertices[attribName].forEach((elem, index) => {
        let element = this._vertices[attribName][index];
        Array.prototype.push.apply(vertexAttribArray, MathUtil.vectorToArray(element));
      });
      this._vertices[attribName] = vertexAttribArray;

    });

    // for Tangent
    if (this._vertices.texcoord) {
      this._calcTangent(vertexNum, positionElementNumPerVertex, texcoordElementNumPerVertex, primitiveType);
    }

    // Normal Array to Float32Array
    allVertexAttribs.forEach((attribName)=> {
      if (typeof this._vertices[attribName].buffer === 'undefined') {
        this._vertices[attribName] = new Float32Array(this._vertices[attribName]);
      }
    });


    for (let i=0; i<vertexNum; i++) {
      this._AABB.addPositionWithArray(this._vertices.position, i * positionElementNumPerVertex);
    }

    this._AABB.updateAllInfo();

    let gl = this._glContext.gl;
    let primitiveTypeStr = GLBoost$1.getValueOfGLBoostConstant(primitiveType);
    this._primitiveType = gl[primitiveTypeStr];
    let performanceHintStr = GLBoost$1.getValueOfGLBoostConstant(performanceHint);
    this._performanceHint = gl[performanceHintStr];
  }

  updateVerticesData(vertices, skipUpdateAABB = false) {
    let gl = this._glContext.gl;

    for (let attribName in vertices) {
      let vertexAttribArray = [];
      this._vertices[attribName].forEach((elem, index) => {
        let element = vertices[attribName][index];
        Array.prototype.push.apply(vertexAttribArray, MathUtil.vectorToArray(element));

        if (attribName === 'position' && !(skipUpdateAABB === true)) {
          let componentN = this._vertices.components[attribName];
          this._AABB.addPositionWithArray(vertexAttribArray, index * componentN);
        }
        this._vertices[attribName] = vertexAttribArray;
      });
    }

    if(!(skipUpdateAABB === true)) {
      this._AABB.updateAllInfo();
    }

    for (let attribName in vertices) {
      if (this._vboObj[attribName]) {
        let float32AryVertexData = new Float32Array(this._vertices[attribName]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, float32AryVertexData);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      } else {
        return false;
      }
    }
    return true;

  }

  setUpVertexAttribs(gl, glslProgram, allVertexAttribs) {
    var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

    // setup vertex layouts
    allVertexAttribs.forEach((attribName)=> {
      if (optimizedVertexAttribs.indexOf(attribName) != -1) {
        let vertexAttribName = null;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
          this._vertices.components[attribName], this._vertices.componentType[attribName], false, 0, 0);
      }
    });
  }



  _getVAO() {
    return Geometry._vaoDic[this.toString()];
  }

  _getAllVertexAttribs() {
    return Geometry._allVertexAttribs(this._vertices);
  } 

  prepareGLSLProgramAndSetVertexNtoMaterial(expression, material, index, existCamera_f, lights, doSetupVertexAttribs = true, shaderClass = void 0, argShaderInstance = void 0) {
    let gl = this._glContext.gl;
    let vertices = this._vertices;

   //let glem = GLExtensionsManager.getInstance(this._glContext);
    let _optimizedVertexAttribs = Geometry._allVertexAttribs(vertices, material);

//    if (doSetupVertexAttribs) {
//      glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);
//    }


    let shaderInstance = null;
    if (argShaderInstance) {
      shaderInstance = argShaderInstance;
    } else {
      if (shaderClass) {
        shaderInstance = Shader._createShaderInstance(this._glBoostContext, shaderClass);
      } else {
        shaderInstance = Shader._createShaderInstance(this._glBoostContext, material.shaderClass);
      }  
    }

    let glslProgram = shaderInstance.getShaderProgram(expression, _optimizedVertexAttribs, existCamera_f, lights, material, this._extraDataForShader);
//    if (doSetupVertexAttribs) {
    //  this.setUpVertexAttribs(gl, glslProgram, allVertexAttribs);
//    }

//    if (doSetupVertexAttribs) {
    //  glem.bindVertexArray(gl, null);
//    }

    return shaderInstance;
  }

  _setVertexNtoSingleMaterial(material, index) {
    // if this mesh has only one material...
    //if (material.getVertexN(this) === 0) {
    if (this._indicesArray && this._indicesArray.length > 0) {
      material.setVertexN(this, this._indicesArray[index].length);
    } else {
      material.setVertexN(this, this._vertexN);
    }
    //}
  }

  _getAppropriateMaterials(mesh) {
    let materials = null;
    if (this._materials.length > 0) {
      materials = this._materials;
    } else if (mesh.material){
      materials = [mesh.material];
    } else {
      mesh.material = this._glBoostContext.createClassicMaterial();
      materials = [mesh.material];
    }
    return materials;
  }

  getIndexStartOffsetArrayAtMaterial(i) {
    return this._indexStartOffsetArray[i];
  }

  prepareToRender(expression, existCamera_f, lights, meshMaterial, mesh, shaderClass = void 0, argMaterials = void 0) {

    var vertices = this._vertices;
    var gl = this._glContext.gl;

    var glem = GLExtensionsManager.getInstance(this._glContext);

    this._vertexN = vertices.position.length / vertices.components.position;

    var allVertexAttribs = Geometry._allVertexAttribs(vertices);


    // create VAO
    if (Geometry._vaoDic[this.toString()]) {
    } else {
      var vao = this._glContext.createVertexArray(this);
      Geometry._vaoDic[this.toString()] = vao;
    }
    glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);

    let doAfter = false;

    allVertexAttribs.forEach((attribName)=> {
      // create VBO
      if (this._vboObj[attribName]) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
      } else {
        let vbo = this._glContext.createBuffer(this);
        this._vboObj[attribName] = vbo;

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
//        if (typeof this._vertices[attribName].buffer !== 'undefined') {
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices[attribName], this._performanceHint);
//        } else {
//          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices[attribName]), this._performanceHint);
//        }
      //gl.bindBuffer(gl.ARRAY_BUFFER, null);

        doAfter = true;
      }
    });

    if (doAfter) {
        
      if (Geometry._iboArrayDic[this.toString()]) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[this.toString()] );
      } else {
        if (this._indicesArray) {
          let indices = [];
          for (let i=0; i<this._indicesArray.length; i++) {
            if (i==0) {
              this._indexStartOffsetArray[i] = 0;
            }
            this._indexStartOffsetArray[i+1] = this._indexStartOffsetArray[i] + this._indicesArray[i].length;
            //Array.prototype.push.apply(indices, this._indicesArray[i]);  
            indices = indices.concat(this._indicesArray[i]);
          }
          // create Index Buffer
          var ibo = this._glContext.createBuffer(this);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo );
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glem.createUintArrayForElementIndex(gl, indices), gl.STATIC_DRAW);
          Geometry._iboArrayDic[this.toString()] = ibo;
        }
      }
    }

    let materials = argMaterials;

    if (argMaterials === void 0) {
      materials = this._getAppropriateMaterials(mesh);
    }
    //let materials = this._getAppropriateMaterials(mesh);

    for (let i=0; i<materials.length;i++) {
      let shaderInstance = null;
      if (materials[i].shaderInstance && materials[i].shaderInstance.constructor === FreeShader) {
        shaderInstance = this.prepareGLSLProgramAndSetVertexNtoMaterial(expression, materials[i], i, existCamera_f, lights, doAfter, void 0, materials[i].shaderInstance);
      } else {
        shaderInstance = this.prepareGLSLProgramAndSetVertexNtoMaterial(expression, materials[i], i, existCamera_f, lights, doAfter, shaderClass);
      }
      this._setVertexNtoSingleMaterial(materials[i], i);
      shaderInstance.vao = Geometry._vaoDic[this.toString()];
      this.setUpVertexAttribs(gl, shaderInstance._glslProgram, allVertexAttribs);
      if (argMaterials === void 0) {
        materials[i].shaderInstance = shaderInstance;
      } else {
        argMaterials[i].shaderInstance = shaderInstance;
      }
    }

    glem.bindVertexArray(gl, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return materials;
  }

  _setUpVertexAttibsWrapper(glslProgram) {
    this.setUpVertexAttribs(this._glContext.gl, glslProgram, this._getAllVertexAttribs());    
  }

  draw(expression, lights, camera, mesh, scene, renderPassIndex) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);

    let materials = this._getAppropriateMaterials(mesh);

    let thisName = this.toString();

    this._drawKicker.draw(gl, glem, expression, mesh, materials, camera, lights, scene, this._vertices, Geometry._vaoDic, this._vboObj, Geometry._iboArrayDic, this, thisName, this._primitiveType, this._vertexN, renderPassIndex);

  }

  drawIntermediate() {}

  merge(geometrys) {
    if (Array.isArray(geometrys)) {
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;

        let allGeomLength = 0;
        geometrys.forEach((geometry) => {
          allGeomLength += geometry._vertices[attribName].length;
        });
        typedArrayDic[attribName] = new Float32Array(thisLength + allGeomLength);
      });

      let lastThisLengthDic = {};
      allVertexAttribs.forEach((attribName)=> {
        lastThisLengthDic[attribName] = 0;
      });
      geometrys.forEach((geometry, index) => {
        let typedSubArrayDic = {};
        allVertexAttribs.forEach((attribName)=> {
          let typedArray = typedArrayDic[attribName];

          if (index === 0) {
            lastThisLengthDic[attribName] = geometrys[index]._vertices[attribName].length;
          }

          let end = (typeof geometrys[index+1] !== 'undefined') ? lastThisLengthDic[attribName]  + geometrys[index+1]._vertices[attribName].length : void 0;
          typedSubArrayDic[attribName] = typedArray.subarray(0, end);
          lastThisLengthDic[attribName] = end;
        });
        this.mergeInner(geometry, typedSubArrayDic, (index === 0));
      });
    } else {
      let geometry = geometrys;
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;
        let geomLength = geometry._vertices[attribName].length;

        typedArrayDic[attribName] = new Float32Array(thisLength + geomLength);
      });

      this.mergeInner(geometry, typedArrayDic);
    }
  }

  /**
   *
   * @param geometry
   */
  mergeInner(geometry, typedArrayDic, isFirst = false) {
    let gl = this._glContext.gl;
    let baseLen = this._vertices.position.length / this._vertices.components.position;

    if (this === geometry) {
      console.assert('don\'t merge same geometry!');
    }

    let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);

    allVertexAttribs.forEach((attribName)=> {
      let thisLength = this._vertices[attribName].length;
      let geomLength =  geometry._vertices[attribName].length;

      let float32array = typedArrayDic[attribName];

      if (isFirst) {
        float32array.set(this._vertices[attribName], 0);
      }
      float32array.set(geometry._vertices[attribName], thisLength);

      this._vertices[attribName] = float32array;

      if (typeof this._vboObj[attribName] !== 'undefined') {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices[attribName], this._performanceHint);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      }
    });

    let geometryIndicesN = geometry._indicesArray.length;
    for (let i = 0; i < geometryIndicesN; i++) {
      for (let j = 0; j < geometry._indicesArray[i].length; j++) {
        geometry._indicesArray[i][j] += baseLen;
      }
      this._indicesArray.push(geometry._indicesArray[i]);
      if (geometry._materials[i]) {
        this._materials.push(geometry._materials[i]);
      }
    }
    this._vertexN += geometry._vertexN;
  }

  mergeHarder(geometrys) {
    if (Array.isArray(geometrys)) {
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;

        let allGeomLength = 0;
        geometrys.forEach((geometry) => {
          allGeomLength += geometry._vertices[attribName].length;
        });
        typedArrayDic[attribName] = new Float32Array(thisLength + allGeomLength);
      });

      let lastThisLengthDic = {};
      allVertexAttribs.forEach((attribName)=> {
        lastThisLengthDic[attribName] = 0;
      });
      geometrys.forEach((geometry, index) => {
        let typedSubArrayDic = {};
        allVertexAttribs.forEach((attribName)=> {
          let typedArray = typedArrayDic[attribName];

          if (index === 0) {
            lastThisLengthDic[attribName] = geometrys[index]._vertices[attribName].length;
          }

          let end = (typeof geometrys[index+1] !== 'undefined') ? lastThisLengthDic[attribName]  + geometrys[index+1]._vertices[attribName].length : void 0;
          typedSubArrayDic[attribName] = typedArray.subarray(0, end);
          lastThisLengthDic[attribName] = end;
        });
        this.mergeHarderInner(geometry, typedSubArrayDic, (index === 0));
      });
    } else {
      let geometry = geometrys;
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;
        let geomLength = geometry._vertices[attribName].length;

        typedArrayDic[attribName] = new Float32Array(thisLength + geomLength);
      });

      this.mergeHarderInner(geometry, typedArrayDic);
    }
  }

  /**
   * take no thought geometry's materials
   *
   * @param geometry
   */
  mergeHarderInner(geometry, typedArrayDic, isFirst = false) {
    let gl = this._glContext.gl;
    let baseLen = this._vertices.position.length / this._vertices.components.position;
    if (this === geometry) {
      console.assert('don\'t merge same geometry!');
    }

    let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);

    allVertexAttribs.forEach((attribName)=> {
      let thisLength = this._vertices[attribName].length;
      let geomLength =  geometry._vertices[attribName].length;

      let float32array = typedArrayDic[attribName];

      if (isFirst) {
        float32array.set(this._vertices[attribName], 0);
      }
      float32array.set(geometry._vertices[attribName], thisLength);

      this._vertices[attribName] = float32array;

      if (typeof this._vboObj[attribName] !== 'undefined') {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices[attribName], this._performanceHint);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      }
    });


    for (let i = 0; i < this._indicesArray.length; i++) {
      let len = geometry._indicesArray[i].length;
      for (let j = 0; j < len; j++) {
        let idx = geometry._indicesArray[i][j];
        this._indicesArray[i].push(baseLen + idx);
      }
      if (this._materials[i]) {
        this._materials[i].setVertexN(this, this._materials[i].getVertexN(geometry));
      }
    }
    this._vertexN += geometry._vertexN;
  }


  set materials(materials) {
    this._materials = materials;
  }

  get materials() {
    return this._materials;
  }

  get centerPosition() {
    return this._AABB.centerPoint;
  }

  setExtraDataForShader(name, value) {
    this._extraDataForShader[name] = value;
  }

  getExtraDataForShader(name) {
    return this._extraDataForShader[name];
  }

  isTransparent(mesh) {
    let materials = this._getAppropriateMaterials(mesh);
    let isTransparent = false;
    materials.forEach((material)=>{
      if (material.isTransparent()) {
        isTransparent = true;
      }
    });
    return isTransparent;
  }

  get AABB() {
    return this._AABB;//.clone();
  }

  get rawAABB() {
    return this._AABB;
  }

  isIndexed() {
    return !!Geometry._iboArrayDic[this.toString()];
  }

  getTriangleCount(mesh) {
    let gl = this._glContext.gl;
    let materials = this._getAppropriateMaterials(mesh);
    let count = 0;
    for (let i=0; i<materials.length;i++) {
      let material = materials[i];
      if (this._primitiveType === gl.TRIANGLES) {
        if (this.isIndexed()) {
          count += material.getVertexN(this.toString()) / 3;
        } else {
          count += this._vertexN / 3;
        }
      } else if (this._primitiveType === gl.TRIANGLE_STRIP) {
        if (this.isIndexed()) {
          count += material.getVertexN(this.toString()) - 2;
        } else {
          count += this._vertexN - 2;
        }
      }
    }
    return count;
  }

  getVertexCount() {
    let gl = this._glContext.gl;
    let count = 0;
    if (this._vertices) {
      count = this._vertices.position.length;
    }
    return count;
  }

}
Geometry._vaoDic = {};
Geometry._iboArrayDic = {};

class BlendShapeShaderSource {

  VSDefine_BlendShapeShaderSource(in_, out_, f) {
    var shaderText = '';
    f.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        shaderText+=`${in_} vec3 aVertex_${attribName};\n`;
        shaderText+='uniform float blendWeight_' + attribName  + ';\n';
      }
    });
    return shaderText;
  }

  VSTransform_BlendShapeShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    shaderText +=     'float sumOfWeights = 0.0;\n';
    f.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        shaderText += 'sumOfWeights += blendWeight_' + attribName +';\n';
      }
    });
    var numOfShapeTargets = this.BlendShapeShaderSource_numberOfShapeTargets(f);
    shaderText += '    vec3 blendedPosition = aVertex_position * max(1.0 - sumOfWeights/float(' + numOfShapeTargets + '), 0.0);\n';
    f.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        shaderText += 'blendedPosition += aVertex_' + attribName + ' * blendWeight_' + attribName + '/float(' + numOfShapeTargets + ');\n';
      }
    });
    if (existCamera_f) {
      shaderText += '  gl_Position = pvwMatrix * vec4(blendedPosition, 1.0);\n';
    } else {
      shaderText += '  gl_Position = vec4(blendedPosition, 1.0);\n';
    }
    return shaderText;
  }

  prepare_BlendShapeShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) { // if POSITION and ShapeTargets...
        vertexAttribsAsResult.push(attribName);
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
      }
    });

    vertexAttribs.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        // Specifically, this uniform location is saved directly to the material.
        material['uniform_FloatSampler_blendWeight_' + attribName] = this._glContext.getUniformLocation(shaderProgram, 'blendWeight_' + attribName);
        // Initially zero initialization
        this._glContext.uniform1f(material['uniform_FloatSampler_blendWeight_' + attribName], 0.0, true);
      }
    });

    return vertexAttribsAsResult;
  }

  BlendShapeShaderSource_isShapeTarget(attribName) {
    return !Shader._exist(attribName, GLBoost.POSITION) && !Shader._exist(attribName, GLBoost.COLOR) && !Shader._exist(attribName, GLBoost.TEXCOORD);
  }

  BlendShapeShaderSource_numberOfShapeTargets(attributes) {
    var count = 0;
    attributes.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        count += 1;
      }
    });
    return count;
  }
}

class BlendShapeGeometry extends Geometry {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._blendWeight_1  = 0.0;
    this._blendWeight_2  = 0.0;
    this._blendWeight_3  = 0.0;
    this._blendWeight_4  = 0.0;
    this._blendWeight_5  = 0.0;
    this._blendWeight_6  = 0.0;
    this._blendWeight_7  = 0.0;
    this._blendWeight_8  = 0.0;
    this._blendWeight_9  = 0.0;
    this._blendWeight_10 = 0.0;

    this._currentRenderPassIndex = 0;
    this._materialForBlend = null;
  }


  draw(expression, lights, camera, mesh, scene, renderPass_index) {
    this._currentRenderPassIndex = renderPass_index;
    super.draw(expression, lights, camera, mesh, scene, renderPass_index);
  }

  prepareToRender(expression, existCamera_f, pointLight, meshMaterial, mesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.

    if (meshMaterial) {
      this._materialForBlend = meshMaterial;
    } else {
      this._materialForBlend = this._defaultMaterial;
    }


    class BlendShapeShader extends this._materialForBlend.shaderClass {
      constructor(glBoostContext, basicShader) {
        super(glBoostContext, basicShader);
        BlendShapeShader.mixin(BlendShapeShaderSource);
      }
    }

    this._materialForBlend.shaderClass = BlendShapeShader;

    super.prepareToRender(expression, existCamera_f, pointLight, meshMaterial, mesh);
  }

  _setBlendWeightToGlslProgram(blendTargetNumber, weight) {
    let blendTarget = GLBoost$1.getValueOfGLBoostConstant(blendTargetNumber);
    let materials = [this._materialForBlend];
    for (let i=0; i<materials.length;i++) {
      this._glContext.useProgram(materials[i].shaderInstance.glslProgram);
      this._glContext.uniform1f(materials[i]['uniform_FloatSampler_blendWeight_' + blendTarget], weight, true);
    }
  }

  set blendWeight_1(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET1, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_1 = weight;
  }
  get blendWeight_1() {
    return this._blendWeight_1;
  }

  set blendWeight_2(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET2, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_2 = weight;
  }
  get blendWeight_2() {
    return this._blendWeight_2;
  }

  set blendWeight_3(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET3, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_3 = weight;
  }
  get blendWeight_3() {
    return this._blendWeight_3;
  }

  set blendWeight_4(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET4, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_4 = weight;
  }
  get blendWeight_4() {
    return this._blendWeight_4;
  }

  set blendWeight_5(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET5, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_5 = weight;
  }
  get blendWeight_5() {
    return this._blendWeight_5;
  }

  set blendWeight_6(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET6, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_6 = weight;
  }
  get blendWeight_6() {
    return this._blendWeight_6;
  }

  set blendWeight_7(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET7, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_7 = weight;
  }
  get blendWeight_7() {
    return this._blendWeight_7;
  }

  set blendWeight_8(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET8, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_8 = weight;
  }
  get blendWeight_8() {
    return this._blendWeight_8;
  }

  set blendWeight_9(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET9, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_9 = weight;
  }
  get blendWeight_9() {
    return this._blendWeight_9;
  }

  set blendWeight_10(weight) {
    var gl = this._glContext.gl;
    var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET10, weight);
    this._glContext.useProgram(currentProgram);
    this._blendWeight_10 = weight;
  }
  get blendWeight_10() {
    return this._blendWeight_10;
  }

}

GLBoost$1['BlendShapeGeometry'] = BlendShapeGeometry;

/**
 * [en] This is the abstract class for all texture classes. Don't use this class directly.<br>
 * [ja] 全てのテクスチャクラスのための抽象クラスです。直接このクラスは使わないでください。
 */
class AbstractTexture extends GLBoostObject {

  /**
   * [en] The constructor of PointLight class. Do not construct this class directly.<br>
   * [ja] PointLightクラスのコンストラクタ。直接このクラスを生成しようとしないでください。
   *
   * * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   */
  constructor(glBoostContext) {
    super(glBoostContext);

    if (this.constructor === AbstractTexture) {
      throw new TypeError('Cannot construct AbstractTexture instances directly.');
    }

    this._textureUnitIndex = 0;

    // x,y are uv scale, zw are uv transform. calculation is applied as first scale, second transform
    this._uvTransform = new Vector4(1, 1, 0, 0);
  }

  /**
   * [en] get the WebGL texture resource within this class. <br />
   * [ja] このクラス内部で管理しているWebGLテクスチャリソースを取得します。
   *
   * @returns {null|*} [en] WebGL texture resouce. [ja] WebGLテクスチャリソース
   */
  get glTextureResource() {
    return this._texture;
  }

  /**
   * [en] bind the texture. It calls bindTexture on WebGL only if it has WebGL texture. Otherwise it returns false without doing anything.<br />
   * [ja] テクスチャをバインドします。自身がWebGLテクスチャを持っている場合のみ、WebGLのbindTextureを呼びます。それ以外は何もせずにfalseを返します。
   */
  setUp(textureUnitIndex) {
    var gl = this._glContext.gl;
    if (this._texture === null) {
      return false;
    }
    var index = !(typeof textureUnitIndex === 'undefined') ? textureUnitIndex : this._textureUnitIndex;
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    return true;
  }

  /**
   * [en] unbind the texture. <br />
   * [ja] テクスチャをバインド解除します。
   */
  tearDown(textureUnitIndex) {
    var gl = this._glContext.gl;

    var index = !(typeof textureUnitIndex === 'undefined') ? textureUnitIndex : this._textureUnitIndex;
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set textureUnitIndex(index) {
    this._textureUnitIndex = index;
  }

  get textureUnitIndex() {
    return this._textureUnitIndex;
  }

  getTexturePixelData() {
    let gl = this._glContext.gl;

    // Create a framebuffer backed by the texture
    let framebuffer = this._glContext.createFramebuffer(this);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);

    // Read the contents of the framebuffer (data stores the pixel data)
    let data = new Uint8Array(this.width * this.height * 4);
    gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data);

    //this._glContext.deleteFramebuffer(this, framebuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return data;
  }

  /**
   * Origin is left bottom
   *
   * @param {number} x horizontal pixel position (0 is left)
   * @param {number} y virtical pixel position (0 is bottom)
   * @returns {Vector4} [en] check whether or not the size x is power of two. [ja] xが２の累乗かどうか
   */
  getPixelValueAt(x, y, argByteArray) {
    let byteArray = argByteArray;
    if (!byteArray) {
      byteArray = this.getTexturePixelData();
    }

    let color = new Vector4(
      byteArray[(y*this.width + x) * 4+0],
      byteArray[(y*this.width + x) * 4+1],
      byteArray[(y*this.width + x) * 4+2],
      byteArray[(y*this.width + x) * 4+3]
      );
    return color;
  }

  _getResizedCanvas(image) {
    var canvas = document.createElement("canvas");
    canvas.width = this._getNearestPowerOfTwo(image.width);
    canvas.height = this._getNearestPowerOfTwo(image.height);

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas;
  }
  /**
   * [en] check whether or not this texture size is power of two. <br />
   * [ja] テクスチャサイズが２の累乗かどうかを返します
   *
   * @param {number} x [en] texture size. [ja] テクスチャサイズ
   * @returns {boolean} [en] check whether or not the size x is power of two. [ja] xが２の累乗かどうか
   */
  _isPowerOfTwo(x) {
    return (x & (x - 1)) == 0;
  }

  /**
   * [en] get a value nearest power of two. <br />
   * [ja] 与えられた数から見て２の累乗に最も近い値を返します。
   *
   * @param {number} x [en] texture size. [ja] テクスチャサイズ
   * @returns {number} [en] a value nearest power of two. [ja] xに近い２の累乗の値
   */
  _getNearestPowerOfTwo(x) {
    return Math.pow( 2, Math.round( Math.log( x ) / Math.LN2 ) );
  }

  readyForDiscard() {
    if (this._texture) {
      this._glContext.deleteTexture(this, this._texture);
    }
    if (this.fbo) {
      for (let texture of this.fbo._glboostTextures) {
        this.fbo._glboostTextures = this.fbo._glboostTextures.filter(function(v, i) {
          return (v !== this);
        });
      }
      if (this.fbo._glboostTextures.length === 0) {
        this._glContext.deleteFramebuffer(this._glBoostContext, this.fbo);
        this._glContext.deleteFramebuffer(this._glBoostContext, this.fbo);
        if (this.fbo.renderBuffer) {
          this._glContext.deleteRenderbuffer(this._glBoostContext, this.fbo.renderBuffer);
        }
      }
    }

    super.readyForDiscard();
  }

  get uvTransform() {
    return this._uvTransform;
  }

  set uvTransform(vec4) {
    this._uvTransform = vec4;
  }

}

class FragmentSimpleShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSTransform_FragmentSimpleShaderSource(existCamera_f, f) {
    var shaderText = '';

    if (existCamera_f) {
      shaderText +=   '  gl_Position = projectionMatrix * viewMatrix * position_world;\n';
    } else {
      shaderText +=   '  gl_Position = position_world;\n';
    }

    return shaderText;
  }

  FSDefine_FragmentSimpleShaderSource(in_, f) {
    let shaderText =      'uniform float opacity;\n';
    return shaderText;
  }

  FSShade_FragmentSimpleShaderSource(f, gl) {
    let shaderText =   `rt0 = vec4(1.0, 1.0, 1.0, opacity);\n`;

    return shaderText;
  }

  prepare_FragmentSimpleShaderSource(gl, glslProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(glslProgram, 'uniform_opacity', this._glContext.getUniformLocation(glslProgram, 'opacity'));

    let uniformLocationDepthBias = material.getUniform(glslProgram, 'uniform_depthBias');
    if (uniformLocationDepthBias) {
      let depthBias = this.getShaderParameter(material, 'depthBias', false);
      if (depthBias) {
        this._glContext.uniform1f(uniformLocationDepthBias, depthBias, true);
      }
    }

    return vertexAttribsAsResult;
  }
}

class FragmentSimpleShader extends Shader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext, basicShader);

    FragmentSimpleShader.mixin(basicShader);
    FragmentSimpleShader.mixin(FragmentSimpleShaderSource);
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

  }
}


GLBoost['FragmentSimpleShader'] = FragmentSimpleShader;

class VertexWorldShadowShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSDefine_VertexWorldShadowShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText =   '';
    let textureUnitIndex = 0;
    //for (let i=0; i<lights.length; i++) {
    //if (lights[i].camera && lights[i].camera.texture) {

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;        
        
    //shaderText +=      `uniform mat4 depthPVMatrix[${lightNumExceptAmbient}];\n`;
    //shaderText +=       `${out_} vec4 v_shadowCoord[${lightNumExceptAmbient}];\n`;

    return shaderText;
  }

  VSTransform_VertexWorldShadowShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    let gl = this._glContext.gl;

    return shaderText;
  }

  FSDefine_VertexWorldShadowShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'uniform float depthBias;\n';
    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;
//    shaderText += `${in_} vec4 v_shadowCoord[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform mat4 depthPVMatrix[${lightNumExceptAmbient}];\n`;
    
    return shaderText;
  }

  FSShade_VertexWorldShadowShaderSource(f, gl, lights) {
    let shaderText = '';
    shaderText += 'float visibilityLevel = 1.0;\n';

    
    shaderText += `    vec4 shadowCoord[${lights.length}];\n`;
    for (let i=0; i<lights.length; i++) {
      shaderText += `  { // ${i}\n`;
      shaderText += `    shadowCoord[${i}] = depthPVMatrix[${i}] * vec4(v_position_world, 1.0); // ${i}\n`;
      shaderText += `    shadowCoord[${i}].xyz *= 0.5; // ${i}\n`;
      shaderText += `    shadowCoord[${i}].xyz += 0.5; // ${i}\n`;
      shaderText += `  } // ${i}\n`;
    }
    return shaderText;
  }
  FSPostEffect_VertexWorldShadowShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';

//    shaderText += 'rt0 = vec4(visibilityLevel, 1.0, 1.0, 1.0);\n';

    return shaderText;
  }

  prepare_VertexWorldShadowShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'position' || attribName === 'normal') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    
    for (let i=0; i<lights.length; i++) {
      let light = lights[i];
      
      material.setUniform(shaderProgram, 'uniform_isShadowCasting' + i, this._glContext.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']'));

      if (light.camera && light.camera.texture) {// && light.isCastingShadow) {

        // depthTexture
        let depthTextureUniformLocation = this._glContext.getUniformLocation(shaderProgram, `uDepthTexture[${i}]`);
        material.setUniform(shaderProgram, 'uniform_DepthTextureSampler_' + i, depthTextureUniformLocation);

        let index = i;

        // count for Decal Texture at first
        index++;

        // count for Normal Texture if it exists
        let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);
        if (normalTexture) {
          index++;
        }

        lights[i].camera.texture.textureUnitIndex = index;  // +1 because 0 is used for diffuse texture
      }
    }

    let uniform_depthBias = this._glContext.getUniformLocation(shaderProgram, 'depthBias');
    material.setUniform(shaderProgram, 'uniform_depthBias', uniform_depthBias);
    this._glContext.uniform1f(uniform_depthBias, 0.005, true);

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      //if (lights[i].camera && lights[i].camera.texture) {

      // matrices
      material.setUniform(shaderProgram, 'uniform_depthPVMatrix_' + textureUnitIndex, this._glContext.getUniformLocation(shaderProgram, 'depthPVMatrix[' + textureUnitIndex + ']'));

      textureUnitIndex++;
      //}
      //shaderProgram['isShadowCasting' + i] = this._glContext.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']');
    }

    return vertexAttribsAsResult;
  }

}

GLBoost['VertexWorldShadowShaderSource'] = VertexWorldShadowShaderSource;

class DecalShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSDefine_DecalShaderSource(in_, out_, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost$1.COLOR)) {
      shaderText += `${in_} vec4 aVertex_color;\n`;
      shaderText += `${out_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost$1.TEXCOORD)) {
      shaderText += `${in_} vec2 aVertex_texcoord;\n`;
      shaderText += `${out_} vec2 texcoord;\n`;
    }
    return shaderText;
  }

  VSTransform_DecalShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost$1.COLOR)) {
      shaderText += '  color = aVertex_color;\n';
    }
    if (Shader._exist(f, GLBoost$1.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    return shaderText;
  }

  FSDefine_DecalShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost$1.COLOR)) {
      shaderText += `${in_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost$1.TEXCOORD)) {
      shaderText += `${in_} vec2 texcoord;\n\n`;
    }
    if (material.hasAnyTextures()) {
      shaderText += 'uniform sampler2D uTexture;\n';
    }
    shaderText += 'uniform vec4 materialBaseColor;\n';

    return shaderText;
  }

  FSShade_DecalShaderSource(f, gl, lights, material, extraData) {
    var shaderText = '';

    shaderText += Shader._getNormalStr(gl, material, f);
    
    var textureFunc = Shader._texture_func(gl);
    if (Shader._exist(f, GLBoost$1.COLOR)) {
      shaderText += '  rt0 *= color;\n';
    }
    shaderText += '    rt0 *= materialBaseColor;\n';
    if (Shader._exist(f, GLBoost$1.TEXCOORD) && material.hasAnyTextures()) {
      shaderText += `  rt0 *= ${textureFunc}(uTexture, texcoord);\n`;
    }

    //shaderText += '    float shadowRatio = 0.0;\n';

    //shaderText += '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';

    return shaderText;
  }

  prepare_DecalShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'color' || attribName === 'texcoord') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    material.setUniform(shaderProgram, 'uniform_materialBaseColor', this._glContext.getUniformLocation(shaderProgram, 'materialBaseColor'));

    let diffuseTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE);
    if (!diffuseTexture) {
      diffuseTexture = this._glBoostContext.defaultDummyTexture;
    }

    let uTexture = this._glContext.getUniformLocation(shaderProgram, 'uTexture');
    material.setUniform(shaderProgram, 'uTexture', uTexture);
    // set texture unit 0 to the sampler
    this._glContext.uniform1i( uTexture, 0, true);

    material._semanticsDic['TEXTURE'] = [];

    material.uniformTextureSamplerDic['uTexture'] = {};
    if (material.hasAnyTextures() || diffuseTexture) {
      material.uniformTextureSamplerDic['uTexture'].textureUnitIndex = 0;
      material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;
      material._semanticsDic['TEXTURE'] = 'uTexture';
    }


    let normalTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_NORMAL);
    let uNormalTexture = this._glContext.getUniformLocation(shaderProgram, 'uNormalTexture');
    if (uNormalTexture) {
      material.setUniform(shaderProgram, 'uNormalTexture', normalTexture);
      // set texture unit 1 to the normal texture sampler
      this._glContext.uniform1i( uNormalTexture, 1, true);

      material.uniformTextureSamplerDic['uNormalTexture'] = {};
      if (material.hasAnyTextures()) {
        material.uniformTextureSamplerDic['uNormalTexture'].textureUnitIndex = 1;
        material.uniformTextureSamplerDic['uNormalTexture'].textureName = normalTexture.userFlavorName;
        material._semanticsDic['TEXTURE'].push('uNormalTexture');
      }
    }

    return vertexAttribsAsResult;
  }
}

class DecalShader extends FragmentSimpleShader {
  constructor(glBoostContext) {

    super(glBoostContext);

    DecalShader.mixin(VertexWorldShadowShaderSource);
    DecalShader.mixin(DecalShaderSource);

    this._lut = null;
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    let baseColor = material.baseColor;
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_materialBaseColor'), baseColor.x, baseColor.y, baseColor.z, baseColor.w, true);

    let diffuseTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE);
    if (diffuseTexture) {
      material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;
    }


    // For Shadow
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        let cameraMatrix = lights[i].camera.lookAtRHMatrix();
        let viewMatrix = cameraMatrix.clone();
        let projectionMatrix = lights[i].camera.projectionRHMatrix();
        gl.uniformMatrix4fv(material.getUniform(glslProgram, 'uniform_depthPVMatrix_'+i), false, Matrix44$1.multiply(projectionMatrix, viewMatrix).flatten());
      }

      if (lights[i].camera && lights[i].camera.texture) {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 1, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 0, true);
      }

      if (lights[i].camera && lights[i].camera.texture) {
        let uniformLocation = material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i);
        let index = lights[i].camera.texture.textureUnitIndex;

        this._glContext.uniform1i(uniformLocation, index, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i), 0, true);
      }
    }
  }

  setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i), 0, true);  // +1 because 0 is used for diffuse texture
      }
    }
  }

  set lut(lut) {
    this._lut = lut;
  }

  get lut() {
    return this._lut;
  }
}

GLBoost$1['DecalShader'] = DecalShader;

class L_AbstractMaterial extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    if (this.constructor === L_AbstractMaterial) {
      throw new TypeError('Cannot construct L_AbstractMaterial instances directly.');
    }

    this._textureDic = {};
    this._texturePurposeDic = [];
    this._textureContributionRateDic = {};
    this._gl = this._glContext.gl;
    this._baseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._diffuseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._specularColor = new Vector4(0.5, 0.5, 0.5, 1.0);
    this._ambientColor = new Vector4(0.25, 0.25, 0.25, 1.0);
    this._name = '';
    this._shaderClass = DecalShader;
    this._shaderInstance = null;
    this._vertexNofGeometries = {};
    this._states = {
      enable:[],
      functions:{}
    };
    this._shaderUniformLocationsOfExpressions = {};
    this._isVisibleForGeometiesAssginedByThisMaterial = true;
    this._globalStatesUsage = null;
    this._shaderParametersForShaderInstance = {};
    this._semanticsDic = {};

    this._stateFunctionsToReset = {
      "blendColor": [0.0, 0.0, 0.0, 0.0],
      "blendEquationSeparate": [
        32774,
        32774
      ],
      "blendFuncSeparate": [1, 0, 1, 0],
      "colorMask": [true, true, true, true],
      "cullFace": [1029],
      "depthFunc": [513],
      "depthMask": [true],
      "depthRange": [0.0, 1.0],
      "frontFace": [2305],
      "lineWidth": [1.0],
      "polygonOffset": [0.0, 0.0]
    };

    this._countOfUpdate = 0;
  }

  clone() {
    var material = new ClassicMaterial(this._glBoostContext);
    material._baseColor = this._baseColor;
    material._diffuseColor = this._diffuseColor;
    material._specularColor = this._specularColor;
    material._ambientColor = this._ambientColor;
    material._shaderClass = this._shaderClass;
    material._shaderInstance = this._shaderInstance;

    for (let geom in this._vertexNofGeometries) {
      material._vertexNofGeometries[geom] = this._vertexNofGeometries[geom];
    }

    return material;
  }

  _updateCount() {
    this._countOfUpdate += 1;
  }

  getUpdateStateString() {
    return this.toString() + '_updateCount_' + this._countOfUpdate;
  }

  setShaderClassWithForceUpdate(shaderClass) {
    this._shaderClass = shaderClass;
    if (this._shaderInstance) {
      this._shaderInstance.readyForDiscard();
    }
    this._shaderInstance = null;
  }

  set shaderClass(shaderClass) {
    if (this._shaderClass === shaderClass) {
      return;
    }
    this.setShaderClassWithForceUpdate(shaderClass);
  }

  get shaderClass() {
    return this._shaderClass;
  }

  set shaderInstance(shaderInstance) {
    this._shaderInstance = shaderInstance;
    this._updateCount();
  }

  get shaderInstance() {
    return this._shaderInstance;
  }

  setTexture(texture, purpose) {
    if (!texture) {
      return;
    }
    this._textureDic[texture.userFlavorName] = texture;
    let index = (typeof purpose !== 'undefined' ? purpose:GLBoost$1.TEXTURE_PURPOSE_DIFFUSE);
    this._texturePurposeDic[index] = texture.userFlavorName;
    this._textureContributionRateDic[texture.userFlavorName] = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._updateCount();
  }

  removeTexture(userFlavorName) {
    delete this._textureDic[userFlavorName];
    delete this._textureContributionRateDic[userFlavorName];
    this._updateCount();
  }

  setTexturePurpose(userFlavorNameOfTexture, purpose) {
    this._texturePurposeDic[purpose] = userFlavorNameOfTexture;
    this._updateCount();
  }

  getTexture(userFlavorName) {
    return this._textureDic[userFlavorName];
  }

  getTextureFromPurpose(purpose) {
    let userFlavorName = this._texturePurposeDic[purpose];
    return this.getTexture(userFlavorName);
  }

  getOneTexture() {
    for (let userFlavorName in this._textureDic) {
      return this._textureDic[userFlavorName];
    }
    return null;
  }

  getTextureNum() {
    let count = 0;
    for (let userFlavorName in this._textureDic) {
      if (this._textureDic[userFlavorName] instanceof AbstractTexture) {
        count += 1;
      }
    }
    return count;
  }

  getTextureUserFlavorNames() {
    return Object.keys(this._textureDic);
  }

  setAllTextureContributionRate(rateVec4) {
    for (let userFlavorName in this._textureContributionRateDic) {
      this._textureContributionRateDic[userFlavorName] = rateVec4;
    }
    this._updateCount();
  }

  setTextureContributionRate(textureUserFlavorName, rateVec4) {
    this._textureContributionRateDic[textureUserFlavorName] = rateVec4;
    this._updateCount();
  }

  getTextureContributionRate(textureUserFlavorName) {
    return this._textureContributionRateDic[textureUserFlavorName];
  }


  hasAnyTextures() {
    let result = false;
    for (let userFlavorName in this._textureDic) {
      result = true;
    }

    return result;
  }

  set baseColor(vec) {
    if (!vec) {
      return;
    }

    this._baseColor = vec;
    this._updateCount();
  }

  get baseColor() {
    return this._baseColor;
  }

  set diffuseColor(vec) {
    if (!vec) {
      return;
    }

    this._diffuseColor = vec;
    this._updateCount();
  }

  get diffuseColor() {
    return this._diffuseColor;
  }

  set specularColor(vec) {
    if (!vec) {
      return;
    }

    this._specularColor = vec;
    this._updateCount();
  }

  get specularColor() {
    return this._specularColor;
  }

  set ambientColor(vec) {
    if (!vec) {
      return;
    }

    this._ambientColor = vec;
    this._updateCount();
  }

  get ambientColor() {
    return this._ambientColor;
  }

  set states(states) {
    if (typeof states.functions === 'undefined') {
      states.functions = this._stateFunctionsToReset;
    }
    this._states = states;
    this._updateCount();
  }

  get states() {
    return this._states;
  }

  isTransparent() {
    let isTransparent = false;
    if (this._states) {
      if (this._states.enable) {
        this._states.enable.forEach((state) => {
          if (state === 3042) {
            isTransparent = true;
          }
        });
      }
    }

    return isTransparent;
  }

  set name(name) {
    this._name = name;
    this._updateCount();
  }

  get name() {
    return this._name;
  }

  setVertexN(geom, num) {
    this._vertexNofGeometries[geom] = num;
    this._updateCount();
  }

  getVertexN(geom) {
    return (typeof this._vertexNofGeometries[geom] === 'undefined') ? 0 : this._vertexNofGeometries[geom];
  }

  /**
   * [en] bind the texture. For any value, it returns true if we call WebGL's bindTexture function, false otherwise.<br />
   * [ja] テクスチャをバインドします。どんな値にせよ、WebGLのbindTexture関数を呼んだ場合はtrueを、そうでなければfalseを返します。
   */
  setUpTexture(textureName, textureUnitIndex) {
    var gl = this._gl;
    let texture = this.getTexture(textureName);
    let isCalledWebGLBindTexture = true;

    if (texture) {
      isCalledWebGLBindTexture = texture.setUp(textureUnitIndex);
      return isCalledWebGLBindTexture;
    } else {
      this._glBoostContext.defaultDummyTexture.setUp(0);

//      gl.bindTexture(gl.TEXTURE_2D, null);
      isCalledWebGLBindTexture = true;
      return isCalledWebGLBindTexture;
    }
  }

  tearDownTexture(textureName, textureUnitIndex) {
    let texture = this.getTexture(textureName);
    if (texture) {
      texture.tearDown(textureUnitIndex);
    }
  }

  _setUpMaterialStates(states) {
    let gl = this._gl;

    if (states) {
      if (states.enable) {
        states.enable.forEach((state)=>{
          gl.enable(state);
        });
      }
      if (states.functions) {
        for (let functionName in states.functions) {
          gl[functionName].apply(gl, states.functions[functionName]);
        }
      }
    }
  }

  setUpStates() {
    let globalStatesUsage = this._glBoostContext.globalStatesUsage;
    if (this._globalStatesUsage) {
      globalStatesUsage = this._globalStatesUsage;
    }
    switch (globalStatesUsage) {
      case GLBoost$1.GLOBAL_STATES_USAGE_DO_NOTHING:
        break;
      case GLBoost$1.GLOBAL_STATES_USAGE_IGNORE:
        this._setUpMaterialStates(this._states);
        break;
      case GLBoost$1.GLOBAL_STATES_USAGE_INCLUSIVE:
        this._glBoostContext.reflectGlobalGLState();
        this._setUpMaterialStates(this._states);
        break;
      case GLBoost$1.GLOBAL_STATES_USAGE_EXCLUSIVE:
        this._glBoostContext.reflectGlobalGLState();
        break;
      default:
        break;
    }
  }

  tearDownStates() {
    this._glBoostContext.disableAllGLState();
    this._setUpMaterialStates({
      functions : this._stateFunctionsToReset
    });
  }

  setUniform(glslProgram, uniformLocationName, uniformLocation) {
    if (!this._shaderUniformLocationsOfExpressions[glslProgram.hashId]) {
      this._shaderUniformLocationsOfExpressions[glslProgram.hashId] = {};
    }

    this._shaderUniformLocationsOfExpressions[glslProgram.hashId][uniformLocationName] = uniformLocation;
    glslProgram['uniform_' + uniformLocationName] = uniformLocationName;

    this._updateCount();
  }

  getUniform(glslProgram, uniformLocationName) {
    if (typeof this._shaderUniformLocationsOfExpressions[glslProgram.hashId] !== 'undefined') {
      return this._shaderUniformLocationsOfExpressions[glslProgram.hashId][uniformLocationName];
    }

//    MiscUtil.consoleLog(GLBoost.LOG_GENERAL, 'this._shaderUniformLocationsOfExpressions[hashIdOfGLSLProgram] became undefined. Are you sure of it?');

    return void 0;
  }

  set isVisible(flg) {
    this._isVisibleForGeometiesAssginedByThisMaterial = flg;
    this._updateCount();
  }

  get isVisible() {
    return this._isVisibleForGeometiesAssginedByThisMaterial;
  }

  set globalStatesUsage(usage) {
    this._globalStatesUsage = usage;
    this._updateCount();
  }

  get globalStatesUsage() {
    return this._globalStatesUsage;
  }

  get shaderParameters() {
    return this._shaderParametersForShaderInstance;
  }

  set shaderParameters(shaderParameterDic) {
    this._shaderParametersForShaderInstance = shaderParameterDic;
  }

  addSemanticsDic(uniform, uniformName) {
    if (typeof this._semanticsDic[uniform] === 'undefined') {
      this._semanticsDic[uniform] = uniformName;
    } else if (typeof this._semanticsDic[uniform] === 'string') {
      let tmpSemanticsStr = this._semanticsDic[uniform];
      this._semanticsDic[uniform] = [];
      this._semanticsDic[uniform].push(tmpSemanticsStr);
      this._semanticsDic[uniform].push(uniformName);
    } else {
      // it must be Array
      this._semanticsDic[uniform].push(uniformName);
    }
  }

  removeSemanticsDic(uniform) {
    delete this._semanticsDic[uniform];
  }


}

GLBoost$1['L_AbstractMaterial'] = L_AbstractMaterial;

class ClassicMaterial$1 extends L_AbstractMaterial {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._wireframeWidthRelativeScale = 1.0;

  }

  get wireframeWidthRelativeScale() {
    return this._wireframeWidthRelativeScale;
  }
}

GLBoost$1['ClassicMaterial'] = ClassicMaterial$1;

class L_AbstractCamera extends L_Element {
  constructor(glBoostContext, toRegister, lookat) {
    super(glBoostContext, toRegister);

    if (this.constructor === L_AbstractCamera) {
      throw new TypeError('Cannot construct AbstractCamera instances directly.');
    }

    this._translate = lookat.eye;
    this._center = lookat.center;
    this._up = lookat.up;

    this._cameraController = null;

    this._dirtyView = true;

    this._middleLevelCamera = null;
  }

  set cameraController(controller) {
    this._cameraController = controller;
    if (this._middleLevelCamera !== null) {
      controller.addCamera(this._middleLevelCamera);
    } else {
      controller.addCamera(this);
    }
  }

  get cameraController() {
    return this._cameraController;
  }

  _affectedByCameraController() {
    if (this._cameraController !== null) {
      let results = this._cameraController.convert(this);
      this._translateInner = results[0];
      this._centerInner = results[1];
      this._upInner = results[2];
      this._zNearInner = results[3];
      this._zFarInner = results[4];
      this._leftInner = results[5];
      this._rightInner = results[6];
      this._topInner = results[7];
      this._bottomInner = results[8];
    } else {
      this._translateInner = super.translate.clone();
      this._centerInner = this._center.clone();
      this._upInner = this._up.clone();
      this._zNearInner = this._zNear;
      this._zFarInner = this._zFar;
      this._leftInner = this._left;
      this._rightInner = this._right;
      this._topInner = this._top;
      this._bottomInner = this._bottom;
    }
  }

  get middleLevelCamera() {
    return this._middleLevelCamera;
  }

  _needUpdateView(withTryingResetOfCameraController = true) {
    if (this._cameraController !== null && withTryingResetOfCameraController) {
      this._cameraController.tryReset();
    }
    this._dirtyView = true;
  }

  lookAtRHMatrix() {
    if (this._dirtyView) {
      this._affectedByCameraController();
      this._viewMatrix = L_AbstractCamera.lookAtRHMatrix(this.translateInner, this.centerInner, this.upInner);
      this._dirtyView = false;
      return this._viewMatrix.clone();
    } else {
      return this._viewMatrix.clone();
    }
  }

  static lookAtRHMatrix(eye, center, up) {

    var f = Vector3.normalize(Vector3.subtract(center, eye));
    var s = Vector3.normalize(Vector3.cross(f, up));
    var u = Vector3.cross(s, f);

    return new Matrix44$1(s.x, s.y, s.z, -Vector3.dotProduct(s,eye),
      u.x, u.y, u.z, -Vector3.dotProduct(u,eye),
      -f.x, -f.y, -f.z, Vector3.dotProduct(f,eye),
      0, 0, 0, 1);
  }

  setAsMainCamera(scene) {
    L_AbstractCamera._mainCamera[scene.toString()] = this;
  }

  isMainCamera(scene) {
    return L_AbstractCamera._mainCamera[scene.toString()] === this;
  }

  set translate(vec) {
    super.translate = vec;
    this._needUpdateView();
  }

  get translate() {
    return this._translate;
  }

  get translateInner() {
    return this._translateInner;
  }

  set eye(vec) {
    super.translate = vec;
    this._needUpdateView();
  }

  get eye() {
    return this._translate;
  }

  get eyeInner() {
    return this._translateInner;
  }

  set center(vec) {
    if (this._center.isEqual(vec)) {
      return;
    }
    this._center = vec;
    this._needUpdateView();
  }

  get center() {
    return this._center;
  }

  get centerInner() {
    return this._centerInner;
  }

  set up(vec) {
    if (this._up.isEqual(vec)) {
      return;
    }
    this._up = vec;
    this._needUpdateView();
  }

  get up() {
    return this._up;
  }

  get upInner() {
    return this._upInner;
  }

  set texture(texture) {
    this._texture = texture;
  }

  get texture() {
    return this._texture;
  }
}

L_AbstractCamera._mainCamera = {};

class L_PerspectiveCamera extends L_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, perspective) {
    super(glBoostContext, toRegister, lookat);

    this._fovy = perspective.fovy;
    this._aspect = perspective.aspect;
    this._zNear = perspective.zNear;
    this._zFar = perspective.zFar;

    this._zNearInner = perspective.zNear;
    this._zFarInner = perspective.zFar;

    this._dirtyProjection = true;
    this._updateCountAsCameraProjection = 0;
  }

  _needUpdateProjection() {
    this._dirtyProjection = true;
    this._updateCountAsCameraProjection++;
  }

  get updateCountAsCameraProjection() {
    return this._updateCountAsCameraProjection;
  }

  projectionRHMatrix() {
    if (this._dirtyProjection) {
      this._projectionMatrix = L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNearInner, this._zFarInner);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

    var yscale = 1.0 / Math.tan(0.5*fovy*Math.PI/180);
    var xscale = yscale / aspect;

    if (zFar) {
      return new Matrix44$1(
        xscale, 0.0, 0.0, 0.0,
        0.0, yscale, 0.0, 0.0,
        0.0, 0.0, - (zFar + zNear) / (zFar - zNear), - (2.0 * zFar * zNear) / (zFar - zNear),
        0.0, 0.0, -1.0, 0.0
      );
    } else {
      return new Matrix44$1(
        xscale, 0.0, 0.0, 0.0,
        0.0, yscale, 0.0, 0.0,
        0.0, 0.0, -1,0, -2*zNear,
        0.0, 0.0, -1.0, 0.0
      );
    }

  }

  set fovy(value) {
    if (this._fovy === value) {
      return;
    }
    this._fovy = value;
    this._needUpdateProjection();
  }

  get fovy() {
    return this._fovy;
  }

  set aspect(value) {
    if (this._aspect === value) {
      return;
    }
    this._aspect = value;
    this._needUpdateProjection();
  }

  get aspect() {
    return this._aspect;
  }

  set zNear(value) {
    if (this._zNear === value) {
      return;
    }
    this._zNear = value;
    this._needUpdateProjection();
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value) {
    if (this._zFar === value) {
      return;
    }
    this._zFar = value;
    this._needUpdateProjection();
  }

  get zFar() {
    return this._zFar;
  }

}

class L_FrustumCamera extends L_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, frustum) {
    super(glBoostContext, toRegister, lookat);

    this._left = frustum.left;
    this._right = frustum.right;
    this._top = frustum.top;
    this._bottom = frustum.bottom;
    this._zNear = frustum.zNear;
    this._zFar = frustum.zFar;

    this._zNearInner = frustum.zNear;
    this._zFarInner = frustum.zFar;

    this._dirtyProjection = true;
    this._updateCountAsCameraProjection = 0;
  }

  _needUpdateProjection() {
    this._dirtyProjection = true;
    this._updateCountAsCameraProjection++;
  }

  get updateCountAsCameraProjection() {
    return this._updateCountAsCameraProjection;
  }

  projectionRHMatrix() {
    if (this._dirtyProjection) {
      this._projectionMatrix = L_FrustumCamera.frustumRHMatrix(this._leftInner, this._rightInner, this._topInner, this._bottomInner, this._zNearInner, this._zFarInner);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static frustumRHMatrix(left, right, top, bottom, zNear, zFar) {
    return new Matrix44$1(
      2*zNear/(right-left), 0.0, (right+left)/(right-left), 0.0,
      0.0, 2*zNear/(top-bottom), (top+bottom)/(top-bottom), 0.0,
      0.0, 0.0, - (zFar+zNear)/(zFar-zNear), -1*2*zFar*zNear/(zFar-zNear),
      0.0, 0.0, -1.0, 0.0
    );
  }

  set left(value) {
    if (this._left === value) {
      return;
    }
    this._left = value;
    this._needUpdateProjection();
  }

  get left() {
    return this._left;
  }

  set right(value) {
    if (this._right === value) {
      return;
    }
    this._right = value;
    this._needUpdateProjection();
  }

  get right() {
    return this._right;
  }

  set top(value) {
    if (this._top === value) {
      return;
    }
    this._top = value;
    this._needUpdateProjection();
  }

  get top() {
    return this._top;
  }

  set bottom(value) {
    if (this._bottom === value) {
      return;
    }
    this._bottom = value;
    this._needUpdateProjection();
  }

  get bottom() {
    return this._bottom;
  }

  set zNear(value) {
    if (this._zNear === value) {
      return;
    }
    this._zNear = value;
    this._needUpdateProjection();
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value) {
    if (this._zFar === value) {
      return;
    }
    this._zFar = value;
    this._needUpdateProjection();
  }

  get zFar() {
    return this._zFar;
  }

  get aspect() {
    return (this.right - this.left) / (this.top - this.bottom);
  }
}

class L_OrthoCamera extends L_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, ortho) {
    super(glBoostContext, toRegister, lookat);

    this._left = ortho.left;
    this._right = ortho.right;
    this._bottom = ortho.bottom;
    this._top = ortho.top;
    this._zNear = ortho.zNear;
    this._zFar = ortho.zFar;
    this._xmag = ortho.xmag;
    this._ymag = ortho.ymag;

    this._dirtyProjection = true;
    this._updateCountAsCameraProjection = 0;
  }

  _needUpdateProjection() {
    this._dirtyProjection = true;
    this._updateCountAsCameraProjection++;
  }

  get updateCountAsCameraProjection() {
    return this._updateCountAsCameraProjection;
  }

  projectionRHMatrix() {
    if (this._dirtyProjection) {
      this._projectionMatrix = L_OrthoCamera.orthoRHMatrix(this._left, this._right, this._bottom, this._top, this._zNear, this._zFar, this._xmag, this._ymag);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static orthoRHMatrix(left, right, bottom, top, near, far, xmag, ymag) {

    if (xmag && ymag) {
      return new Matrix44$1(
        1/xmag, 0.0, 0.0, 0,
        0.0, 1/ymag, 0.0, 0,
        0.0, 0.0, -2/(far-near), -(far+near)/(far-near),
        0.0, 0.0, 0.0, 1.0
      );
    } else {
      return new Matrix44$1(
        2/(right-left), 0.0, 0.0, -(right+left)/(right-left),
        0.0, 2/(top-bottom), 0.0, -(top+bottom)/(top-bottom),
        0.0, 0.0, -2/(far-near), -(far+near)/(far-near),
        0.0, 0.0, 0.0, 1.0
      );
    }
  }

  set left(value) {
    if (this._left === value) {
      return;
    }
    this._left = value;
    this._needUpdateProjection();
  }

  get left() {
    return this._left;
  }

  set right(value) {
    if (this._right === value) {
      return;
    }
    this._right = value;
    this._needUpdateProjection();
  }

  get right() {
    return this._right;
  }

  set bottom(value) {
    if (this._bottom === value) {
      return;
    }
    this._bottom = value;
    this._needUpdateProjection();
  }

  get bottom() {
    return this._bottom;
  }

  set top(value) {
    if (this._top === value) {
      return;
    }
    this._top = value;
    this._needUpdateProjection();
  }

  get top() {
    return this._top;
  }

  set zNear(value) {
    if (this._zNear === value) {
      return;
    }
    this._zNear = value;
    this._needUpdateProjection();
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value) {
    if (this._zFar === value) {
      return;
    }
    this._zFar = value;
    this._needUpdateProjection();
  }

  get zFar() {
    return this._zFar;
  }

  set xmag(value) {
    if (this._xmag === value) {
      return;
    }
    this._xmag = value;
    this._needUpdateProjection();
  }

  get xmag() {
    return this._xmag;
  }

  set ymag(value) {
    if (this._ymag === value) {
      return;
    }
    this._ymag = value;
    this._needUpdateProjection();
  }

  get ymag() {
    return this._ymag;
  }

  get aspect() {
    return (this.right - this.left) / (this.top - this.bottom);
  }
}

class M_AbstractCamera extends M_Element {
  constructor(glBoostContext, toRegister) {
    super(glBoostContext, toRegister);

    if (this.constructor === M_AbstractCamera) {
      throw new TypeError('Cannot construct M_AbstractCamera instances directly.');
    }

    this._lowLevelCamera = null;

    this._updateCountAsCameraView = 0;

    this._texture = null; // for example, depth texture
  }

  set cameraController(controller) {
    this._lowLevelCamera.cameraController = controller;
  }

  get cameraController() {
    return this._lowLevelCamera.cameraController;
  }

  _needUpdateView() {
    this._lowLevelCamera._needUpdateView();
    this._updateCountAsCameraView++;
  }

  get updateCountAsCameraView() {
    return this._updateCountAsCameraView;
  }

  get latestViewStateInfoString() {
    var tempString = this._accumulateMyAndParentNameWithUpdateInfo(this);
    tempString += '_updateCountAsCameraView_' + this._updateCountAsCameraView;

    return tempString;
  }

  setAsMainCamera(scene) {
    this._lowLevelCamera.setAsMainCamera(scene);
  }

  isMainCamera(scene) {
    return this._lowLevelCamera.isMainCamera(scene);
  }

  set texture(texture) {
    this._texture = texture;
  }

  get texture() {
    return this._texture;
  }

  lookAtRHMatrix() {
    return this._lowLevelCamera.lookAtRHMatrix();
  }

  set translate(vec) {
    this._lowLevelCamera.translate = vec;
  }

  get translate() {
    return this._lowLevelCamera.translate;
  }

  get translateInner() {
    return this._lowLevelCamera.translateInner;
  }

  set eye(vec) {
    this._lowLevelCamera.eye = vec;
  }

  get eye() {
    return this._lowLevelCamera.eye;
  }

  get eyeInner() {
    return this._lowLevelCamera.eyeInner;
  }

  set center(vec) {
    this._lowLevelCamera.center = vec;
  }

  get center() {
    return this._lowLevelCamera.center;
  }

  get centerInner() {
    return this._lowLevelCamera.centerInner;
  }

  set up(vec) {
    this._lowLevelCamera.up = vec;
  }

  get up() {
    return this._lowLevelCamera.up;
  }

  get upInner() {
    return this._lowLevelCamera.upInner;
  }


}

GLBoost['M_AbstractCamera'] = M_AbstractCamera;

class L_CameraController extends GLBoostObject {
  constructor(glBoostContext, isSymmetryMode = true, doResetWhenCameraSettingChanged = false, isForceGrab = false, efficiency = 1.0) {
    super(glBoostContext);

    this._camaras = new Set();

    this._isKeyUp = true;
    this._isForceGrab = isForceGrab;
    this._isSymmetryMode = isSymmetryMode;

    this._efficiency = 0.5 * efficiency;

    this._rot_bgn_x = 0;
    this._rot_bgn_y = 0;
    this._rot_x = 0;
    this._rot_y = 0;
    this._clickedMouseYOnCanvas = 0;
    this._clickedMouseXOnCanvas = 0;

    this._verticalAngleOfVectors = 0;

    this._verticalAngleThrethold = 90;

    this._wheel_y = 1;
    this._mouse_translate_y = 0;
    this._mouse_translate_x = 0;

    this._mouseTranslateVec = new Vector3(0, 0, 0);

    this._newUpVec = new Vector3(0, 0, 0);

    this._target = null;

    this._lengthCenterToCorner = 10;
    this._lengthOfCenterToEye = 10;
    this._scaleOfTraslation = 5.0;
    this._scaleOfLengthCameraToCenter = 0.5;
    this._foyvBias = 1.0;
    this._zFarAdjustingFactorBasedOnAABB = 1.0;

    this._doResetWhenCameraSettingChanged = doResetWhenCameraSettingChanged;

    this._shiftCameraTo = null;

    this._onMouseDown = (evt) => {
      let rect = evt.target.getBoundingClientRect();
      this._clickedMouseXOnCanvas = evt.clientX - rect.left;
      this._clickedMouseYOnCanvas = evt.clientY - rect.top;
      this._movedMouseYOnCanvas = -1;
      this._movedMouseXOnCanvas = -1;
      this._rot_bgn_x = this._rot_x;
      this._rot_bgn_y = this._rot_y;

      this._isKeyUp = false;

      if (typeof evt.buttons !== 'undefined') {
        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
          camera._needUpdateProjection();
        });
      }
      return false;
    };

    this._onMouseUp = (evt) => {
      this._isKeyUp = true;
      this._movedMouseYOnCanvas = -1;
      this._movedMouseXOnCanvas = -1;
    };

    this._onMouseMove = (evt) => {
      if (this._isKeyUp) {
        return;
      }

      let rect = evt.target.getBoundingClientRect();
      this._movedMouseXOnCanvas = evt.clientX - rect.left;
      this._movedMouseYOnCanvas = evt.clientY - rect.top;

      if (typeof evt.buttons !== 'undefined') {
        let data = evt.buttons;
        let button_l = ((data & 0x0001) ? true : false);
        let button_c = ((data & 0x0004) ? true : false);
        if (button_c) {
          this._mouse_translate_y = (this._movedMouseYOnCanvas - this._clickedMouseYOnCanvas) / 1000 * this._efficiency;
          this._mouse_translate_x = (this._movedMouseXOnCanvas - this._clickedMouseXOnCanvas) / 1000 * this._efficiency;

          let scale = this._lengthOfCenterToEye * this._foyvBias * this._scaleOfTraslation;
          if (evt.shiftKey) {
            this._mouseTranslateVec = Vector3.add(this._mouseTranslateVec, Vector3.normalize(this._newEyeToCenterVec).multiply(-this._mouse_translate_y).multiply(scale));
          } else {
            this._mouseTranslateVec = Vector3.add(this._mouseTranslateVec, Vector3.normalize(this._newUpVec).multiply(this._mouse_translate_y).multiply(scale));
          }
          this._mouseTranslateVec = Vector3.add(this._mouseTranslateVec, Vector3.normalize(this._newTangentVec).multiply(this._mouse_translate_x).multiply(scale));

          this._clickedMouseYOnCanvas = this._movedMouseYOnCanvas;
          this._clickedMouseXOnCanvas = this._movedMouseXOnCanvas;
        }

        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
          camera._needUpdateProjection();
        });

        if (!button_l) {
          return;
        }
      }


      // calc rotation angle
      let delta_y = (this._movedMouseYOnCanvas - this._clickedMouseYOnCanvas) * this._efficiency;
      let delta_x = (this._movedMouseXOnCanvas - this._clickedMouseXOnCanvas) * this._efficiency;
      this._rot_y = this._rot_bgn_y - delta_y;
      this._rot_x = this._rot_bgn_x - delta_x;

      // check if rotation angle is within range
      if (this._verticalAngleThrethold - this._verticalAngleOfVectors < this._rot_y) {
        this._rot_y = this._verticalAngleThrethold + this._verticalAngleOfVectors;
      }

      if (this._rot_y < -this._verticalAngleThrethold + this._verticalAngleOfVectors) {
        this._rot_y = -this._verticalAngleThrethold - this._verticalAngleOfVectors;
      }

      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });

    };

    this._onMouseWheel = (evt) => {
      evt.preventDefault();

      this.dolly += evt.deltaY / 600;
    };

    this._onContexMenu = (evt) => {
      if (evt.preventDefault) {
        evt.preventDefault();
      } else {
        event.returnValue = false;
      }
    };

    this._onMouseDblClick = (evt) => {
      if (evt.shiftKey) {
        this._mouseTranslateVec = new Vector3(0, 0, 0);
      } else {
        this._rot_y = 0;
        this._rot_x = 0;
        this._rot_bgn_y = 0;
        this._rot_bgn_x = 0;
      }
      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });
    };

    if (document) {
      document.addEventListener('mousedown', this._onMouseDown);
      document.addEventListener('mouseup', this._onMouseUp);
      document.addEventListener('mousemove', this._onMouseMove);
      if (window.WheelEvent) {
        document.addEventListener("wheel", this._onMouseWheel);
      }
      document.addEventListener('contextmenu', this._onContexMenu, false);
      document.addEventListener("dblclick", this._onMouseDblClick);
    }
  }

  _getFovyFromCamera(camera) {
    if (camera.fovy) {
      return camera.fovy;
    } else {
      return MathUtil.radianToDegree(2 * Math.atan(Math.abs(camera.top - camera.bottom) / (2 * camera.zNear)));
    }
  }

  convert(camera) {
    let newEyeVec = null;
    let newCenterVec = null;
    let newUpVec = null;

    if (this._isKeyUp || !this._isForceGrab) {
      this._eyeVec = (this._shiftCameraTo !== null) ? Vector3.add(Vector3.subtract(this._shiftCameraTo, camera.center), camera.eye) : camera.eye;
      this._centerVec = (this._shiftCameraTo !== null) ? this._shiftCameraTo : camera.center;
      this._upVec = camera.up;
    }

    let fovy = this._getFovyFromCamera(camera);

    if (this._isSymmetryMode) {
      let centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec).multiply(this._wheel_y * 1.0/Math.tan(MathUtil.degreeToRadian(fovy/2.0)));
      this._lengthOfCenterToEye = centerToEyeVec.length();
      let horizontalAngleOfVectors = Vector3.angleOfVectors(new Vector3(centerToEyeVec.x, 0, centerToEyeVec.z), new Vector3(0, 0, 1));
      let horizontalSign = Vector3.cross(new Vector3(centerToEyeVec.x, 0, centerToEyeVec.z), new Vector3(0, 0, 1)).y;
      if (horizontalSign >= 0) {
        horizontalSign = 1;
      } else {
        horizontalSign = -1;
      }
      horizontalAngleOfVectors *= horizontalSign;
      let rotateM_Reset = Matrix33.rotateY(horizontalAngleOfVectors);
      let rotateM_X = Matrix33.rotateX(this._rot_y);
      let rotateM_Y = Matrix33.rotateY(this._rot_x);
      let rotateM_Revert = Matrix33.rotateY(-horizontalAngleOfVectors);
      let rotateM = Matrix33.multiply(rotateM_Revert, Matrix33.multiply(rotateM_Y, Matrix33.multiply(rotateM_X, rotateM_Reset)));

      newUpVec = rotateM.multiplyVector(this._upVec);
      this._newUpVec = newUpVec;
      newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(this._centerVec);
      newCenterVec = this._centerVec.clone();
      this._newEyeToCenterVec = Vector3.subtract(newCenterVec, newEyeVec);
      this._newTangentVec = Vector3.cross(this._newUpVec, this._newEyeToCenterVec);

      newEyeVec.add(this._mouseTranslateVec);
      newCenterVec.add(this._mouseTranslateVec);

      let horizonResetVec = rotateM_Reset.multiplyVector(centerToEyeVec);
      this._verticalAngleOfVectors = Vector3.angleOfVectors(horizonResetVec, new Vector3(0, 0, 1));
      let verticalSign = Vector3.cross(horizonResetVec, new Vector3(0, 0, 1)).x;
      if (verticalSign >= 0) {
        verticalSign = 1;
      } else {
        verticalSign = -1;
      }
      this._verticalAngleOfVectors *= verticalSign;

    } else {
      let centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec).multiply(this._wheel_y * 1.0/Math.tan(MathUtil.degreeToRadian(fovy/2.0)));
      let rotateM_X = Matrix33.rotateX(this._rot_y);
      let rotateM_Y = Matrix33.rotateY(this._rot_x);
      let rotateM = rotateM_Y.multiply(rotateM_X);

      newUpVec = rotateM.multiplyVector(this._upVec);
      this._newUpVec = newUpVec;
      newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(this._centerVec);
      newCenterVec = this._centerVec.clone();
      this._newEyeToCenterVec = Vector3.subtract(newCenterVec, newEyeVec);
      this._newTangentVec = Vector3.cross(this._newUpVec, this._newEyeToCenterVec);

      newEyeVec.add(this._mouseTranslateVec);
      newCenterVec.add(this._mouseTranslateVec);
    }

    let newZNear = camera.zNear;
    let newZFar = camera.zNear + Vector3.subtract(newCenterVec, newEyeVec).length();
    if (this._target) {
      newZFar += this._getTargetAABB().lengthCenterToCorner * this._zFarAdjustingFactorBasedOnAABB;
    }

    this._foyvBias = Math.tan(MathUtil.degreeToRadian(fovy/2.0));

    return [newEyeVec, newCenterVec, newUpVec, newZNear, newZFar];
  }

  _getTargetAABB() {
    let targetAABB = null;
    if (typeof this._target.updateAABB !== 'undefined') {
      targetAABB = this._target.updateAABB();
    } else {
      targetAABB = this._target.AABB;
    }
    return targetAABB;
  }

  _updateTargeting(camera, eyeVec, centerVec, upVec, fovy) {
    if (this._target === null) {
      return [eyeVec, centerVec, upVec];
    }

    let targetAABB = this._getTargetAABB();

    this._lengthCenterToCorner = targetAABB.lengthCenterToCorner;
    let lengthCameraToObject = targetAABB.lengthCenterToCorner / Math.sin((fovy*Math.PI/180)/2) * this._scaleOfLengthCameraToCenter;

    let newCenterVec = targetAABB.centerPoint;

    let centerToCameraVec = Vector3.subtract(eyeVec, centerVec);
    let centerToCameraVecNormalized = Vector3.normalize(centerToCameraVec);

    let newEyeVec = Vector3.multiply(centerToCameraVecNormalized, lengthCameraToObject).add(newCenterVec);

    let newUpVec = null;
    if (camera instanceof M_AbstractCamera) {
      let mat = camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf;
      newEyeVec = mat.multiplyVector(new Vector4(newEyeVec.x, newEyeVec.y, newEyeVec.z, 1)).toVector3();
      newCenterVec = mat.multiplyVector(new Vector4(newCenterVec.x, newCenterVec.y, newCenterVec.z, 1)).toVector3();
      newUpVec = mat.multiplyVector(new Vector4(upVec.x, upVec.y, upVec.z, 1)).toVector3();
    } else {
      newUpVec = upVec;
    }

    return [newEyeVec, newCenterVec, newUpVec];
  }

  tryReset() {
    if (this._doResetWhenCameraSettingChanged) {
      if (this._isKeyUp) {
        this._rot_y = 0;
        this._rot_x = 0;
        this._rot_bgn_y = 0;
        this._rot_bgn_x = 0;
      }
    }
  }

  reset() {
    this._rot_y = 0;
    this._rot_x = 0;
    this._rot_bgn_y = 0;
    this._rot_bgn_x = 0;
    this._wheel_y = 1;
    this._mouseTranslateVec = new Vector3(0, 0, 0);

    this._camaras.forEach(function (camera) {
      camera._needUpdateView(false);
    });
  }

  updateTargeting() {
    this._camaras.forEach((camera)=>{
      let vectors = this._updateTargeting(camera, camera.eye, camera.center, camera.up, this._getFovyFromCamera(camera));
      camera.eye = vectors[0];
      camera.center = vectors[1];
      camera.up = vectors[2];
    });
  }

  addCamera(camera) {
    this._camaras.add(camera);
  }

  set target(object) {
    this._target = object;
    this.updateTargeting();
  }

  set zFarAdjustingFactorBasedOnAABB(value) {
    this._zFarAdjustingFactorBasedOnAABB = value;
  }

  get zFarAdjustingFactorBasedOnAABB() {
    return this._zFarAdjustingFactorBasedOnAABB;
  }

  set shiftCameraTo(value) {
    this._shiftCameraTo = value;
  }

  get shiftCameraTo() {
    return this._shiftCameraTo;
  }

  resetDolly() {
    this.dolly = 1;

    this._updateCameras();
  }

  set dolly(value) {
    this._wheel_y = value;
    this._wheel_y = Math.min(this._wheel_y, 3);
    this._wheel_y = Math.max(this._wheel_y, 0.01);

    this._camaras.forEach(function (camera) {
      camera._needUpdateView(false);
      camera._needUpdateProjection();
    });
  }

  get dolly() {
    return this._wheel_y;
  }
}

class MutableTexture extends AbstractTexture {
  constructor(glBoostContext, width, height, level = 0,
              internalFormat = 0x1908, // gl.RGBA
              format = 0x1908, //gl.RGBA
              type = 0x1401, // gl.UNSIGNED_BYTE
              magFileter = 0x2601, //gl.LINEAR
              minFilter = 0x2601, //gl.LINEAR
              wrapS = 0x812F, // gl.CLAMP_TO_EDGE
              wrapT = 0x812F) { // gl.CLAMP_TO_EDGE
    super(glBoostContext);

    this._isTextureReady = false;
    this._texture = null;
    this._width = width;
    this._height = height;
    this._fbo = null;
    this._colorAttachmentId = null;
    this._depthAttachmentId = null;

    var gl = this._glContext.gl;

    //var glem = GLExtensionsManager.getInstance(gl);

    this._texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFileter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    if (GLBoost$1.isThisGLVersion_2(gl) &&
      (internalFormat === 6402 || internalFormat === 33189 || internalFormat === 33190 || internalFormat === 33191)
    ) { // gl.DEPTH_COMPONENT
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LESS);
    //gl.LEQUAL);
    }
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

  }

  set colorAttachment(colorAttachmentId) {
    this._colorAttachmentId = colorAttachmentId;
  }

  get colorAttachment() {
    return this._colorAttachmentId;
  }

  set depthAttachment(depthAttachmentId) {
    this._depthAttachmentId = depthAttachmentId;
  }

  get depthAttachment() {
    return this._depthAttachmentId;
  }


  set frameBufferObject(fbo) {
    this._fbo = fbo;
  }

  get frameBufferObject() {
    return this._fbo;
  }
}

class DataUtil {

  constructor() {

  }
  static isNode() {
    let isNode = (window === void 0 && typeof process !== "undefined" && typeof require !== "undefined");
    return isNode;
  }

  static btoa(str) {
    let isNode = DataUtil.isNode();
    if (isNode) {
      let buffer;
      if (Buffer.isBuffer(str)) {
        buffer = str;
      }
      else {
        buffer = new Buffer(str.toString(), 'binary');
      }
      return buffer.toString('base64');
    } else {
      return btoa(str)
    }
  }

  static atob(str) {
    let isNode = DataUtil.isNode();
    if (isNode) {
      return new Buffer(str, 'base64').toString('binary');
    } else {
      return atob(str)
    }
  }

  static base64ToArrayBuffer(dataUri) {
    let splittedDataUri = dataUri.split(',');
    let type = splittedDataUri[0].split(':')[1].split(';')[0];
    let byteString = DataUtil.atob(splittedDataUri[1]);
    let byteStringLength = byteString.length;
    let arrayBuffer = new ArrayBuffer(byteStringLength);
    let uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteStringLength; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return arrayBuffer;
  }

  static arrayBufferToString(arrayBuffer) {
    if (typeof TextDecoder !== 'undefined') {
      let textDecoder = new TextDecoder();
      return textDecoder.decode(arrayBuffer);
    } else {
      let bytes = new Uint8Array(arrayBuffer);
      let result = "";
      let length = bytes.length;
      for (let i = 0; i < length; i++) {
        result += String.fromCharCode(bytes[i]);
      }
      return result;
    }
  }

  static stringToBase64(str) {
    let b64 = null;
    b64 = DataUtil.btoa(str);
    return b64;
  }

  static UInt8ArrayToDataURL(uint8array, width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    let imageData = ctx.createImageData(width, height);

    for(let i = 0; i < imageData.data.length; i+=4) {
      /*
      imageData.data[i + 0] = uint8array[imageData.data.length - i + 0];
      imageData.data[i + 1] = uint8array[imageData.data.length - i + 1];
      imageData.data[i + 2] = uint8array[imageData.data.length - i + 2];
      imageData.data[i + 3] = uint8array[imageData.data.length - i + 3];
      */
      imageData.data[i + 0] = uint8array[(height - Math.floor(i/(4*width)))*(4*width) + i%(4*width) + 0];
      imageData.data[i + 1] = uint8array[(height - Math.floor(i/(4*width)))*(4*width) + i%(4*width) + 1];
      imageData.data[i + 2] = uint8array[(height - Math.floor(i/(4*width)))*(4*width) + i%(4*width) + 2];
      imageData.data[i + 3] = uint8array[(height - Math.floor(i/(4*width)))*(4*width) + i%(4*width) + 3];
    }

    ctx.putImageData(imageData,0,0);
    canvas.remove();
    return canvas.toDataURL("image/png");
  }

  static loadResourceAsync(resourceUri, isBinary, resolveCallback, rejectCallback) {
    return new Promise((resolve, reject)=> {
      let isNode = DataUtil.isNode();

      if (isNode) {
        let fs = require('fs');
        let args = [resourceUri];
        let func = (err, response) => {
          if (err) {
            if (rejectCallback) {
              rejectCallback(reject, err);
            }
            return;
          }
          if (isBinary) {
            let buffer = new Buffer(response, 'binary');
            let uint8Buffer = new Uint8Array(buffer);
            response = uint8Buffer.buffer;
          }
          resolveCallback(resolve, response);
        };

        if (isBinary) {
          args.push(func);
        } else {
          args.push('utf8');
          args.push(func);
        }
        fs.readFile.apply(fs, args);
      } else {
        let xmlHttp = new XMLHttpRequest();
        if (isBinary) {
          xmlHttp.responseType = "arraybuffer";
          xmlHttp.onload = (oEvent) => {
            let response = null;
            if (isBinary) {
              response = xmlHttp.response;
            } else {
              response = xmlHttp.responseText;
            }
            resolveCallback(resolve, response);
          };
        } else {
          xmlHttp.onreadystatechange = ()=> {
            if (xmlHttp.readyState === 4 && (Math.floor(xmlHttp.status/100) === 2 || xmlHttp.status === 0)) {
              let response = null;
              if (isBinary) {
                response = xmlHttp.response;
              } else {
                response = xmlHttp.responseText;
              }
              resolveCallback(resolve, response);
            } else {
              if (rejectCallback) {
                rejectCallback(reject, xmlHttp.status);
              }
            }
          };
        }

        xmlHttp.open("GET", resourceUri, true);
        xmlHttp.send(null);
      }
    });
  }
}

GLBoost$1['DataUtil'] = DataUtil;

class Texture extends AbstractTexture {
  constructor(glBoostContext, src, userFlavorName, parameters = null) {
    super(glBoostContext);

    this._isTextureReady = false;
    this._texture = null;
    if (typeof userFlavorName === 'undefined' || userFlavorName === null) {
      this.userFlavorName = this._instanceName;
    } else {
      this.userFlavorName = userFlavorName;
    }

    this._parameters = (parameters) ? parameters : {};

    if (typeof src === 'undefined' || src === null) {
      // do nothing
    } else if (typeof src === 'string') {
        this.generateTextureFromUri(src);
    } else {
        this._generateTextureFromImageData(src);
    }
  }

  _getParameter(paramNumber) {
    let isParametersExist = false;
    if (this._parameters) {
      isParametersExist = true;
    }
    let params = this._parameters;

    let paramName = GLBoost$1.getNameOfGLBoostConstant(paramNumber);

    let ret = null;
    switch (paramNumber) {
      case GLBoost$1['UNPACK_FLIP_Y_WEBGL']:
      case GLBoost$1['TEXTURE_MAG_FILTER']:
      case GLBoost$1['TEXTURE_MIN_FILTER']:
      case GLBoost$1['TEXTURE_WRAP_S']:
      case GLBoost$1['TEXTURE_WRAP_T']:
        if (isParametersExist && params[paramName]) {
          ret = params[paramName];
        }
        break;
    }
    return ret;
  }

  _getParamWithAlternative(paramNumber, alternative) {
    return MiscUtil.getTheValueOrAlternative(this._getParameter(paramNumber), alternative);
  }

  generateTextureFromUri(imageUri, isKeepBound = false) {
    return new Promise((resolve, reject)=> {
      let isNode = DataUtil.isNode();
      if (isNode) {
        let getPixels = require("get-pixels");

        let results = getPixels(imageUri, (err, pixels) => {
          if (err) {
            console.log("Bad image path");
            reject();
            return;
          }

          this._width = pixels.shape[0];
          this._height = pixels.shape[1];

          let texture = this._generateTextureInnerWithArrayBufferView(pixels.data, this._width, this._height, isKeepBound);

          this._texture = texture;
          this._isTextureReady = true;

          resolve();
        });

      } else {
        this._img = new Image();
        if (!imageUri.match(/^data:/)) {
          this._img.crossOrigin = 'Anonymous';
        }
        this._img.onload = () => {
          let imgCanvas = this._getResizedCanvas(this._img);
          this._width = imgCanvas.width;
          this._height = imgCanvas.height;

          let texture = this._generateTextureInner(imgCanvas, isKeepBound);

          this._texture = texture;
          this._isTextureReady = true;

          resolve();
        };

        this._img.src = imageUri;
      }
    });
  }

  _generateTextureFromImageData(imageData) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);

    var imgCanvas = this._getResizedCanvas(imageData);
    this._width = imgCanvas.width;
    this._height = imgCanvas.height;

    var texture = this._generateTextureInner(imgCanvas, false);

    this._texture = texture;
    this._isTextureReady = true;

    this._img = imageData;

    this._onLoad();
  }

  _generateTextureInnerWithArrayBufferView(imgCanvas, width, height, isKeepBound) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);
    var texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._getParamWithAlternative(GLBoost$1.UNPACK_FLIP_Y_WEBGL, false));
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imgCanvas);

    if (glem.extTFA) {
      gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MAG_FILTER, gl.LINEAR));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_S, gl.REPEAT));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_T, gl.REPEAT));
    gl.generateMipmap(gl.TEXTURE_2D);

    if (!isKeepBound) {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    return texture;
  }

  _generateTextureInner(imgCanvas, isKeepBound) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);
    var texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._getParamWithAlternative(GLBoost$1.UNPACK_FLIP_Y_WEBGL, false));
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgCanvas);

    if (glem.extTFA) {
      gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MAG_FILTER, gl.LINEAR));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_S, gl.REPEAT));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_T, gl.REPEAT));
    gl.generateMipmap(gl.TEXTURE_2D);

    if (!isKeepBound) {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    return texture;
  }


  _onLoad() {

  }

  get isTextureReady() {
    return this._isTextureReady;
  }

  get isImageAssignedForTexture() {
    return typeof this._img == 'undefined';
  }


}

class PhinaTexture extends Texture {
  constructor(glBoostContext, width, height, fillStyle, parameters = null) {
    super(glBoostContext, null, null, parameters);
    this._parameters['UNPACK_FLIP_Y_WEBGL'] = true;

    this._width = width;
    this._height = height;
    this._fillStyle = fillStyle;

    this._phinaObjects = [];
    this._setUpOffscreen();
  }

  _setUpOffscreen() {
    this._offscreen = phina.display.OffScreenLayer({
      width: this.width,
      height: this.height,
      fillStyle: this._fillStyle
    });

    this._offscreen.reset();
  }

  addPhinaObject(object) {
    this._phinaObjects.push(object);
    return this;
  }

  addPhinaObjects(objects) {
    this._phinaObjects = this._phinaObjects.concat(objects);
    return this;
  }

  setPhinaObjects(objects) {
    this._phinaObjects = objects.concat();
    return this;
  }

  clearPhinaObjects() {
    this._phinaObjects.length = 0;
    return this;
  }

  renderPhinaObjects() {
    for (let i=0; i<this._phinaObjects.length; i++) {
      this._offscreen.renderObject(this._phinaObjects[i]);
    }

    this._recreateTexture(this._offscreen.getImageDataURL());
    this._offscreen.reset();
  }

  _recreateTexture(imageDataUri) {
    var oldTexture = this._texture;
    this.generateTextureFromUri(imageDataUri, true);
    if (typeof oldTexture !== 'undefined' && oldTexture !== null) {
      this._glContext.deleteTexture(this, oldTexture);
    }
  }
}

class Cube extends Geometry {
  constructor(glBoostContext, widthVector, vertexColor) {
    super(glBoostContext);

    // if array, convert to vector[2/3/4]
    widthVector = MathUtil.arrayToVector(widthVector);
    vertexColor = MathUtil.arrayToVector(vertexColor);

    this._setupVertexData(widthVector.divide(2.0), vertexColor);
  }

  _setupVertexData(widthVector, vertexColor) {
    var indices = [
      3, 1, 0, 2, 1, 3,
      4, 5, 7, 7, 5, 6,
      8, 9, 11, 11, 9, 10,
      15, 13, 12, 14, 13, 15,
      19, 17, 16, 18, 17, 19,
      20, 21, 23, 23, 21, 22
    ];


    var positions = [
      // upper
      new Vector3(-widthVector.x, widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, widthVector.z),
      // lower
      new Vector3(-widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, -widthVector.y, widthVector.z),
      // front
      new Vector3(-widthVector.x, -widthVector.y, widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, widthVector.z),
      // back
      new Vector3(-widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, -widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, -widthVector.z),
      // right
      new Vector3(widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(widthVector.x, widthVector.y, -widthVector.z),
      // left
      new Vector3(-widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(-widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(-widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, -widthVector.z)
    ];
    var colors = [
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
      new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w)
    ];
    var texcoords = [
      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0)
    ];

    var normals = [
      // upper
      new Vector3(0, 1, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 1, 0),
      // lower
      new Vector3(0, -1, 0),
      new Vector3(0, -1, 0),
      new Vector3(0, -1, 0),
      new Vector3(0, -1, 0),
      // front
      new Vector3(0, 0, 1),
      new Vector3(0, 0, 1),
      new Vector3(0, 0, 1),
      new Vector3(0, 0, 1),
      // back
      new Vector3(0, 0, -1),
      new Vector3(0, 0, -1),
      new Vector3(0, 0, -1),
      new Vector3(0, 0, -1),
      // right
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 0),
      // left
      new Vector3(-1, 0, 0),
      new Vector3(-1, 0, 0),
      new Vector3(-1, 0, 0),
      new Vector3(-1, 0, 0),
    ];

    this.setVerticesData({
      position: positions,
      color: colors,
      normal: normals,
      texcoord: texcoords
    }, [indices]);
  }

}

GLBoost$1["Cube"] = Cube;

class ArrayUtil {

  constructor() {

  }

  static merge() {
    var key, result = false;
    if (arguments && arguments.length > 0) {
      result = [];
      for (var i = 0, len = arguments.length;i < len; i++) {
        if (arguments[i] && typeof arguments[i] === 'object') {
          for (key in arguments[i]) {
            if (isFinite(key)) {
              result.push(arguments[i][key]);
            } else {
              result[key] = arguments[i][key];
            }
          }
        }
      }
    }
    return result;
  }
}

class Plane extends Geometry {
  constructor(glBoostContext, width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat = false) {
    super(glBoostContext);

    this._setupVertexData(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat);
  }

  _setupVertexData(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat) {

    var positions = [];

    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        positions.push(new Vector3((j/uSpan - 1/2)*width, 0, (i/vSpan - 1/2)*height));
      }
    }

    var indices = [];
    for(let i=0; i<vSpan; i++) {
      let degenerate_left_index = 0;
      let degenerate_right_index = 0;
      for(let j=0; j<=uSpan; j++) {
        indices.push(i*(uSpan+1)+j);
        indices.push((i+1)*(uSpan+1)+j);
        if (j === 0) {
          degenerate_left_index = (i + 1) * (uSpan+1) + j;
        } else if (j === uSpan) {
          degenerate_right_index = (i + 1) * (uSpan+1) + j;
        }
      }
      indices.push(degenerate_right_index);
      indices.push(degenerate_left_index);
    }

    var colors = [];
    var vertexColor = new Vector4(1, 1, 1, 1);
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        colors.push(vertexColor);
      }
    }

    var texcoords = [];
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        if (isUVRepeat) {
          texcoords.push(new Vector2(j, i));
        } else {
          texcoords.push(new Vector2(j/uSpan, i/vSpan));
        }
      }
    }

    var normal = new Vector3(0, 1, 0);
    var normals = [];
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        normals.push(normal);
      }
    }


    var object = {
      position: positions,
      color: colors,
      texcoord: texcoords,
      normal: normals
    };

    var completeAttributes = ArrayUtil.merge(object, customVertexAttributes);
    this.setVerticesData(completeAttributes, [indices], GLBoost$1.TRIANGLE_STRIP);
  }

}

GLBoost$1["Plane"] = Plane;

class Sphere extends Geometry {
  constructor(glBoostContext, radius, widthSegments, heightSegments, vertexColor) {
    super(glBoostContext);

    this._setupVertexData(radius, widthSegments, heightSegments, vertexColor);
  }

  _setupVertexData(radius, widthSegments, heightSegments, vertexColor) {

    // See below:
    // WebGL Lesson 11 - spheres, rotation matrices, and mouse events
    // http://learningwebgl.com/blog/?p=1253
    //
    var positions = [];
    var texcoords = [];
    var colors = [];
    var normals = [];

    if (!vertexColor) {
      vertexColor = new Vector4(1, 1, 1, 1);
    }

    for (var latNumber = 0; latNumber <= heightSegments; latNumber++) {
      var theta = latNumber * Math.PI / heightSegments;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber = 0; longNumber <= widthSegments; longNumber++) {
        var phi = longNumber * 2 * Math.PI / widthSegments;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = radius * cosPhi * sinTheta;
        var y = radius * cosTheta;
        var z = radius * sinPhi * sinTheta;
        var position = new Vector3(x, y, z);
        positions.push(position);
        var u = 1 - (longNumber / widthSegments);
        var v = latNumber / heightSegments;
        texcoords.push(new Vector2(u, v));
        colors.push(vertexColor);
        normals.push(Vector3.normalize(position));
      }
    }
    
    // first    first+1
    //    +-------+
    //    |     / |
    //    |   /   |
    //    | /     |
    //    +-------+
    // second   second+1
    //
    var indices = [];
    for (var latNumber = 0; latNumber < heightSegments; latNumber++) {
      for (var longNumber = 0; longNumber < widthSegments; longNumber++) {
        var first = (latNumber * (widthSegments + 1)) + longNumber;
        var second = first + widthSegments + 1;
        
        indices.push(first + 1);
        indices.push(second);
        indices.push(first);
        
        indices.push(first + 1);
        indices.push(second + 1);
        indices.push(second);
      }
    }

    var object = {
      position: positions,
      color: colors,
      texcoord: texcoords,
      normal: normals
    };

    this.setVerticesData(object, [indices], GLBoost$1.TRIANGLES);
  }

}

GLBoost$1["Sphere"] = Sphere;

class Axis extends Geometry {
  constructor(glBoostContext, length) {
    super(glBoostContext);

    this._setupVertexData(length);
  }

  _setupVertexData(length) {

    // to avoid z fighting with GridGizmo
    let nearZeroValue = 0.0001;

    let positions = [
      // X Axis
      new Vector3(0, nearZeroValue, nearZeroValue),
      new Vector3(length,  nearZeroValue, nearZeroValue),

      // Y Axis
      new Vector3(nearZeroValue, 0, nearZeroValue),
      new Vector3(nearZeroValue, length, nearZeroValue),

      // Z Axis
      new Vector3(nearZeroValue, nearZeroValue, 0),
      new Vector3(nearZeroValue, nearZeroValue, length),
    ];

    let colors = [
      // X Axis
      new Vector4(1, 0, 0, 1),
      new Vector4(1, 0, 0, 1),

      // Y Axis
      new Vector4(0, 1, 0, 1),
      new Vector4(0, 1, 0, 1),

      // Z Axis
      new Vector4(0, 0, 1, 1),
      new Vector4(0, 0, 1, 1),
    ];

    this.setVerticesData({
      position: positions,
      color: colors
    }, null, GLBoost$1.LINES);
  }

}

GLBoost$1["Axis"] = Axis;

class ParticleShaderSource {

  VSDefine_ParticleShaderSource(in_, out_, f) {
    var shaderText = '';
    shaderText += `${in_} vec3 aVertex_particleCenterPos;\n`;
    shaderText += 'uniform mat4 projectionMatrix;\n';
    shaderText += 'uniform mat4 modelViewMatrix;\n';

    return shaderText;
  }

  VSTransform_ParticleShaderSource(existCamera_f, f) {
    var shaderText = '';

    shaderText += '  vec4 cameraCenterPos = modelViewMatrix * vec4(aVertex_particleCenterPos, 1.0);\n';
    shaderText += '  vec4 cameraEachPointPos = cameraCenterPos + vec4(aVertex_position - aVertex_particleCenterPos, 1.0);\n';
    shaderText += '  gl_Position = projectionMatrix * cameraEachPointPos;\n';

    return shaderText;
  }

  prepare_ParticleShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
    var vertexAttribsAsResult = [];

    shaderProgram['vertexAttribute_' + 'particleCenterPos'] = gl.getAttribLocation(shaderProgram, 'aVertex_' + 'particleCenterPos');
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + 'particleCenterPos']);
    vertexAttribsAsResult.push('particleCenterPos');

    material.setUniform(shaderProgram, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
    material.setUniform(shaderProgram, 'uniform_modelViewMatrix', this._glContext.getUniformLocation(shaderProgram, 'modelViewMatrix'));
    material._semanticsDic['PROJECTION'] = 'projectionMatrix';
    material._semanticsDic['MODELVIEW'] = 'modelViewMatrix';


    return vertexAttribsAsResult;
  }

}

/**
 * This Particle class handles particles expressions.
 * You can define particles behaviors in a custom vertex shader.
 * These particles are processed in GPU, so this is a very fast solution of particles expressions.
 */
class Particle extends Geometry {

  /**
   * This is Particle class's constructor
   *
   * @param {Object} centerPointData [en] a JSON object consisted of position (by the particle) array and the other data (by the particle) array.
   * @param {Number} particleWidth Width of each particle
   * @param {Number} particleHeight Height of each particle
   * @param {Object} [en] a JSON which has other vertex attribute arrays you want (by the vertex of quad particle).
   * @param {CanvasElement or String} Canvas Element which is generation source of WebGL context in current use or String which indicates the Canvas Element in jQuery like query string
   */
  constructor(glBoostContext, centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint) {
    super(glBoostContext);

    this._setupVertexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes, performanceHint);
  }

  _setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, needDefaultWhiteColor) {
    let indices = this.indices;
    indices = [];
    const positionArray = centerPointData.position;

    for (let i=0; i<positionArray.length; i++) {
      var offset = i*4;
      indices.push(offset);   // start Quad
      indices.push(offset+1); //
      indices.push(offset+2); // end Quad
      indices.push(offset+3); //
      if (i === positionArray.length - 1) {
        break;
      }
      indices.push(offset+3); // degenerated
      indices.push(offset+4); // move another Particle
    }

    this.positions = [];
    let positions = this.positions;

    // if array, convert to vector[2/3/4]
    for (let i=0; i<positionArray.length; i++) {
      positionArray[i] = MathUtil.arrayToVector(positionArray[i]);
    }

    for (let i=0; i<positionArray.length; i++) {
      positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
    }
    this.centerPositions = [];
    let centerPositions = this.centerPositions;

    for (let i=0; i<positionArray.length; i++) {
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
    }
    this.texcoords = [];
    let texcoords = this.texcoords;
    for (let i=0; i<positionArray.length; i++) {
      texcoords.push(new Vector2(0, 0));
      texcoords.push(new Vector2(0, 1));
      texcoords.push(new Vector2(1, 0));
      texcoords.push(new Vector2(1, 1));
    }

    this.normals = [];
    let normals = this.normals;
    var normal = new Vector3(0, 0, 1);
    for (let i=0; i<positionArray.length; i++) {
      for (let j=0; j<4; j++) {
        normals.push(normal);
      }
    }
    this.pointData = {};
    let pointData = this.pointData;

    for (let type in centerPointData) {
      if (type !== 'position') {
        pointData[type] = [];
        for (let i=0; i<positionArray.length; i++) {
          for (let j=0; j<4; j++) {
            pointData[type].push(centerPointData[type][i]);
          }
        }
      }
    }

    var object = {
      position: positions,
      texcoord: texcoords,
      normal: normals,
      particleCenterPos: centerPositions
    };

    if (needDefaultWhiteColor) {
      this.colors = [];
      let colors = this.colors;
      var vertexColor = new Vector4(1, 1, 1, 1);
      for (let i=0; i<positionArray.length; i++) {
        for (let j=0; j<4; j++) {
          colors.push(vertexColor);
        }
      }
      object.color = colors;
    }

    var tempAttributes = ArrayUtil.merge(object, pointData);
    var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

    return {
      vertexAttributes: completeAttributes,
      indexArray: [indices]
    };
  }

  _updateVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, needDefaultWhiteColor) {
    let positionArray = centerPointData.position;
    let idx=0;
    let positions = this.positions;
    for (let i=0; i<positionArray.length; i++) {
      positions[idx+0].x = positionArray[i].x - pHalfWidth;
      positions[idx+0].y = positionArray[i].y + pHalfHeight;
      positions[idx+0].z = positionArray[i].z;
      positions[idx+1].x = positionArray[i].x - pHalfWidth;
      positions[idx+1].y = positionArray[i].y - pHalfHeight;
      positions[idx+1].z = positionArray[i].z;
      positions[idx+2].x = positionArray[i].x + pHalfWidth;
      positions[idx+2].y = positionArray[i].y + pHalfHeight;
      positions[idx+2].z = positionArray[i].z;
      positions[idx+3].x = positionArray[i].x + pHalfWidth;
      positions[idx+3].y = positionArray[i].y - pHalfHeight;
      positions[idx+3].z = positionArray[i].z;
      idx+=4;
    }

    let centerPositions = this.centerPositions;
    idx = 0;
    for (let i=0; i<positionArray.length; i++) {
      centerPositions[idx].x = positionArray[i].x;
      centerPositions[idx].y = positionArray[i].y;
      centerPositions[idx].z = positionArray[i].z;
      centerPositions[idx+1].x = positionArray[i].x;
      centerPositions[idx+1].y = positionArray[i].y;
      centerPositions[idx+1].z = positionArray[i].z;
      centerPositions[idx+2].x = positionArray[i].x;
      centerPositions[idx+2].y = positionArray[i].y;
      centerPositions[idx+2].z = positionArray[i].z;
      centerPositions[idx+3].x = positionArray[i].x;
      centerPositions[idx+3].y = positionArray[i].y;
      centerPositions[idx+3].z = positionArray[i].z;
      idx+=4;
    }
    idx = 0;
    let pointData = this.pointData;
    for (let type in centerPointData) {
      if (type !== 'position') {
        pointData[type] = [];
        for (let i=0; i<positionArray.length; i++) {
          for (let j=0; j<4; j++) {
            pointData[type][idx].x = centerPointData[type][i].x;
            pointData[type][idx].y = centerPointData[type][i].y;
            pointData[type][idx].z = centerPointData[type][i].z;
            idx++;
          }
        }
      }
    }

    var object = {
      position: positions,
      texcoord: this.texcoords,
      normal: this.normals,
      particleCenterPos: centerPositions
    };

    if (needDefaultWhiteColor) {
      object.color = this.colors;
    }

    var tempAttributes = ArrayUtil.merge(object, pointData);
    var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

    return {
      vertexAttributes: completeAttributes,
      indexArray: [this.indices]
    }
  }
  _setupVertexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, performanceHint) {
    var result = this._setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, true);

    this.setVerticesData(result.vertexAttributes, result.indexArray, GLBoost$1.TRIANGLE_STRIP, performanceHint);
  }

  updateVerticesData(centerPointData, particleWidth, particleHeight, customVertexAttributes) {
    //var result = this._setupVertexAndIndexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes, false);
    const result = this._updateVertexAndIndexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes, false);
    super.updateVerticesData(result.vertexAttributes);
  }

  prepareToRender(expression, existCamera_f, pointLight, meshMaterial, renderPasses, mesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.

    if (meshMaterial) {
      this._materialForBillboard = meshMaterial;
    } else {
      this._materialForBillboard = this._defaultMaterial;
    }

    class ParticleShader extends this._materialForBillboard.shaderClass {
      constructor(glBoostContext, basicShader) {
        super(glBoostContext, basicShader, ParticleShaderSource);
        ParticleShader.mixin(ParticleShaderSource);

        this._meshTransformUpdateCount = -9999;
        this._cameraViewUpdateCount = -9999;
        this._cameraProjectionUpdateCount = -9999;
      }

      setUniforms(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
        super.setUniforms(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData);
/*
        if (this._cameraProjectionUpdateCount !== mesh.updateCountAsCameraProjection) {
          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'PROJECTION', camera.projectionRHMatrix().flatten());
        }

        if (this._cameraViewUpdateCount !== mesh.updateCountAsCameraView || this._meshTransformUpdateCount !== mesh.updateCountAsElement) {
          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEW', camera.lookAtRHMatrix().multiply(mesh.transformMatrix).flatten());
        }
        this._meshTransformUpdateCount = mesh.updateCountAsElement;
        this._cameraViewUpdateCount = camera.updateCountAsCameraView;
        this._cameraProjectionUpdateCount = camera.updateCountAsCameraProjection;
*/

        return true; // still dirty
      }
    }

    if (meshMaterial) {
      meshMaterial.shaderClass = ParticleShader;
    } else {
      this._defaultMaterial.shaderClass = ParticleShader;
    }

    /*
     let materials = this._materials;
     if (materials) {
     for (let i=0; i<materials.length;i++) {
     materials[i].shader = new BlendShapeShader(this._canvas);
     }
     }
     */

    super.prepareToRender(expression, existCamera_f, pointLight, meshMaterial, renderPasses, mesh);
  }

}

GLBoost$1["Particle"] = Particle;

class GLBoostLowContext {
  constructor(canvas, gl, width, height) {
    this._setName();

    console.log('*** GLBoost revision ' + GLBoost$1.REVISION + ' ***');

    if (gl) {
      this._glContext = GLContext.getInstance(null, gl, width, height);
    } else {
      this._glContext = GLContext.getInstance(canvas);
    }

    this._globalStatesUsage = GLBoost$1.GLOBAL_STATES_USAGE_INCLUSIVE;

    this._defaultGlobalStates = [
      3042, // gl.BLEND
      2929  // gl.DEPTH_TEST
    ];

    this.restoreGlobalStatesToDefault();

    this._glBoostMonitor = L_GLBoostMonitor.getInstance();

    let dummyWhite1x1ImageDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REY4MUVGRjk0QzMyMTFFN0I2REJDQTc4QjEyOEY2RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REY4MUVGRkE0QzMyMTFFN0I2REJDQTc4QjEyOEY2RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERjgxRUZGNzRDMzIxMUU3QjZEQkNBNzhCMTI4RjZFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERjgxRUZGODRDMzIxMUU3QjZEQkNBNzhCMTI4RjZFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvTp+QkAAAAPSURBVHjaYvj//z9AgAEABf4C/i3Oie4AAAAASUVORK5CYII=';
    this._defaultDummyTexture = this.createTexture(dummyWhite1x1ImageDataUrl, "GLBoost_dummyWhite1x1Texture");



    // effekseer
    if (effekseer !== void 0) {
      effekseer.init(this._glContext.gl);
    }
  }

  get defaultDummyTexture() {
    return this._defaultDummyTexture;
  }

  _setName() {
    this.constructor._instanceCount = (typeof this.constructor._instanceCount === 'undefined') ? 0 : (this.constructor._instanceCount + 1);
    this._instanceName = this.constructor.name + '_' + this.constructor._instanceCount;
  }

  toString() {
    return this._instanceName;
  }

  get glContext() {
    return this._glContext;
  }

  createGeometry() {
    return new Geometry(this);
  }

  createBlendShapeGeometry() {
    return new BlendShapeGeometry(this);
  }

  createCube(widthVector, vertexColor) {
    return new Cube(this, widthVector, vertexColor);
  }

  createPlane(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat) {
    return new Plane(this, width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat);
  }

  createSphere(radius, widthSegments, heightSegments, vertexColor) {
    return new Sphere(this, radius, widthSegments, heightSegments, vertexColor);
  }

  createAxis(length) {
    return new Axis(length);
  }

  createParticle(centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint) {
    return new Particle(this, centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint);
  }

  createClassicMaterial() {
    return new ClassicMaterial$1(this);
  }

  createPerspectiveCamera(lookat, perspective) {
    return new L_PerspectiveCamera(this, true, lookat, perspective);
  }

  createFrustumCamera(lookat, perspective) {
    return new L_FrustumCamera(this, true, lookat, perspective);
  }

  createOrthoCamera(lookat, ortho) {
    return new L_OrthoCamera(this, true, lookat, ortho);
  }

  createCameraController(isSymmetryMode, doResetWhenCameraSettingChanged, isForceGrab, efficiency) {
    return new L_CameraController(this, isSymmetryMode, doResetWhenCameraSettingChanged, isForceGrab, efficiency);
  }

  createTexture(src, userFlavorName, parameters = null) {
    return new Texture(this, src, userFlavorName, parameters);
  }

  createPhinaTexture(width, height, fillStyle, parameters = null) {
    return new PhinaTexture(this, width, height, fillStyle, parameters);
  }

  /**
   * en: create textures as render target. (and attach it to framebuffer object internally.)<br>
   * ja:レンダーターゲットとしてテクスチャを作成します（内部的にframebuffer objectにアタッチされます）。
   * @param {number} width en: width of texture. ja: テクスチャの幅
   * @param {number} height en: height of texture. ja: テクスチャの高さ
   * @param {number} textureNum en: the number of creation. ja:テクスチャを作る個数
   * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   * @returns {Array} en: an array of created textures. ja:作成されたテクスチャの配列
   */
  createTexturesForRenderTarget(width, height, textureNum) {
    var glContext = this._glContext;
    var gl = glContext.gl;

    var glem = GLExtensionsManager.getInstance(glContext);

    // Create FBO
    var fbo = glContext.createFramebuffer(this);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width;
    fbo.height = height;
    fbo._glboostTextures = [];

    for(let i=0; i<textureNum; i++) {
      let texture = new MutableTexture(this, fbo.width, fbo.height);
      texture.fbo = fbo;
      fbo._glboostTextures.push(texture);
    }

    // Create RenderBuffer
    var renderBuffer = glContext.createRenderbuffer(this);
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbo.width, fbo.height);
    fbo.renderBuffer = renderBuffer;

    // Attach Buffers
    fbo._glboostTextures.forEach((texture, i)=>{
      var glTexture = texture.glTextureResource;
      var attachimentId = glem.colorAttachiment(gl, i);
      texture.colorAttachment = attachimentId;
      gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
    });
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return fbo._glboostTextures.concat();
  }

  createDepthTexturesForRenderTarget(width, height) {
    var glContext = this._glContext;

    var gl = glContext.gl;

    var glem = GLExtensionsManager.getInstance(glContext);

    // Create FBO
    var fbo = glContext.createFramebuffer(this);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width;
    fbo.height = height;

    /*
    // Create color RenderBuffer
    var colorBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, colorBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, fbo.width, fbo.width);
*/

    // Create MutableTexture for Depth Texture
    let format = gl.DEPTH_COMPONENT;
    let internalFormat = gl.DEPTH_COMPONENT;
    let type = gl.UNSIGNED_INT;
    if (GLBoost$1.isThisGLVersion_2(gl)) {
      type = gl.UNSIGNED_INT;
      format = gl.DEPTH_COMPONENT;
      internalFormat = gl.DEPTH_COMPONENT24;
    } else if (glem.extDepthTex) {
      type = glem.extDepthTex.UNSIGNED_INT_24_8_WEBGL;
      format = gl.DEPTH_STENCIL;
      internalFormat = gl.DEPTH_STENCIL;
    }

    let depthTexture = new MutableTexture(this, fbo.width, fbo.height, 0,
      internalFormat, format, type,
      gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
    depthTexture.fbo = fbo;

    /// Attach Buffers
    // color
//    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, colorBuffer);
    //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, null);

    // depth
    var glTexture = depthTexture.glTextureResource;
    var attachimentId = gl.DEPTH_ATTACHMENT;
    if (GLBoost$1.isThisGLVersion_2(gl)) {
      attachimentId = gl.DEPTH_ATTACHMENT;
    } else if (glem.extDepthTex) {
      attachimentId = gl.DEPTH_STENCIL_ATTACHMENT;
    }
    depthTexture.depthAttachment = attachimentId;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);

//    console.log('FBO', gl.checkFramebufferStatus(gl.FRAMEBUFFER));

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return depthTexture;
  }

  get belongingCanvasId() {
    return this._glContext.belongingCanvasId;
  }

  set globalStatesUsage(usageMode) {
    this._globalStatesUsage = usageMode;
  }

  get globalStatesUsage() {
    return this._globalStatesUsage;
  }

  reflectGlobalGLState() {
    let gl = this._glContext.gl;

    this.currentGlobalStates.forEach((state)=>{
      gl.enable(state);
    });

    gl.depthFunc( gl.LEQUAL );

    gl.blendEquation( gl.FUNC_ADD );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

    gl.clearDepth( 1 );
    gl.clearStencil( 0 );
  }

  disableAllGLState() {
    let states = [
      3042, // gl.BLEND
      2884, // gl.CULL_FACE
      2929, // gl.DEPTH_TEST
      32823, // gl.POLYGON_OFFSET_FILL
      32926, // gl.SAMPLE_ALPHA_TO_COVERAGE
    ];

    let glContext = this._glContext;
    let gl = glContext.gl;

    states.forEach((state)=>{
      gl.disable(state);
    });
  }

  set currentGlobalStates(states) {
    this._currentGlobalStates = states.concat();
  }

  get currentGlobalStates() {
    return this._currentGlobalStates.concat();
  }

  restoreGlobalStatesToDefault() {
    this._currentGlobalStates = this._defaultGlobalStates.concat();
  }

}

GLBoost$1['GLBoostLowContext'] = GLBoostLowContext;

(function(){
  GLBoost$1.valueOfGLBoostConstants = [];
  let defineValueOfGLBoostConstants = (glboostConstant_or_glboostConstantValueName, value)=> {
    if (isFinite(glboostConstant_or_glboostConstantValueName)) {
      let glboostConstant = glboostConstant_or_glboostConstantValueName;
      let glboostConstantName = GLBoost$1.getNameOfGLBoostConstant(glboostConstant);
      if (glboostConstantName) {
        let glboostConstantValueName = 'VALUE_' + glboostConstantName;
        Object.defineProperty(GLBoost$1, glboostConstantValueName, {
          get: function () {

            return this.valueOfGLBoostConstants[glboostConstant];
          },
          set: function (flg) {
            this.valueOfGLBoostConstants[glboostConstant] = flg;
          },
        });
        GLBoost$1[glboostConstantValueName] = value;
      }
    } else {
      let glboostConstantValueName = glboostConstant_or_glboostConstantValueName;
      GLBoost$1[glboostConstantValueName] = value;
    }
  };

  /// define value of GLBoost global settings.
  let define = defineValueOfGLBoostConstants;
  define('VALUE_TARGET_WEBGL_VERSION', 1);
  define('VALUE_DEFAULT_POINTLIGHT_INTENSITY', new Vector3(1, 1, 1));
  define('VALUE_ANGLE_UNIT', GLBoost$1.DEGREE);
  define('VALUE_WEBGL_ONE_USE_EXTENSIONS', true);
  define('VALUE_CONSOLE_OUT_FOR_DEBUGGING', false);
  define(GLBoost$1.LOG_GENERAL, true);
  define(GLBoost$1.LOG_SHADER_CODE, true);
  define(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, true);
  define(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, true);
  define(GLBoost$1.LOG_GL_ERROR, true);
  define(GLBoost$1.LOG_OMISSION_PROCESSING, false);
})();

})));
