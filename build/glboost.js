(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.typeof = function (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers;
  window.GLBoost = window.GLBoost || { REVISION: '1' };

  var global = window;

  global.GLBoost["POSITION"] = 'position';
  global.GLBoost["COLOR"] = 'color';
  global.GLBoost["NORMAL"] = 'normal';
  global.GLBoost["TEXCOORD"] = 'texcoord';
  global.GLBoost["POINTS"] = 'POINTS';
  global.GLBoost["LINES"] = 'LINES';
  global.GLBoost["LINE_STRIP"] = 'LINE_STRIP';
  global.GLBoost["LINE_LOOP"] = 'LINE_LOOP';
  global.GLBoost["TRIANGLES"] = 'TRIANGLES';
  global.GLBoost["TRIANGLE_STRIP"] = 'TRIANGLE_STRIP';
  global.GLBoost["BLENDTARGET1"] = 'shapetarget_1';
  global.GLBoost["BLENDTARGET2"] = 'shapetarget_2';
  global.GLBoost["BLENDTARGET3"] = 'shapetarget_3';
  global.GLBoost["BLENDTARGET4"] = 'shapetarget_4';
  global.GLBoost["BLENDTARGET5"] = 'shapetarget_5';
  global.GLBoost["BLENDTARGET6"] = 'shapetarget_6';
  global.GLBoost["BLENDTARGET7"] = 'shapetarget_7';
  global.GLBoost["BLENDTARGET8"] = 'shapetarget_8';
  global.GLBoost["BLENDTARGET9"] = 'shapetarget_9';
  global.GLBoost["BLENDTARGET10"] = 'shapetarget_10';

  var GLBoost$1 = global.GLBoost;

  global.GLBoost.isThisGLVersion_2 = function (gl) {
    if (typeof WebGL2RenderingContext === "undefined") {
      return false;
    }
    return gl instanceof WebGL2RenderingContext;
  };

  var Vector3 = (function () {
    function Vector3(x, y, z) {
      babelHelpers.classCallCheck(this, Vector3);

      this.x = x;
      this.y = y;
      this.z = z;
    }

    babelHelpers.createClass(Vector3, [{
      key: "isEqual",
      value: function isEqual(vec) {
        if (this.x === vec.x && this.y === vec.y && this.z === vec.z) {
          return true;
        } else {
          return false;
        }
      }

      /**
       * Zero Vector
       */

    }, {
      key: "length",
      value: function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
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

    }, {
      key: "lengthSquared",
      value: function lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      }

      /**
       * 長さの2乗（static版）
       */

    }, {
      key: "lengthSquared",
      value: function lengthSquared(vec3) {
        return vec3.x * vec3.x + vec3.y * vec3.y + vec3.z * vec3.z;
      }

      /**
       * 内積
       */

    }, {
      key: "dotProduct",
      value: function dotProduct(vec3) {
        return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
      }

      /**
       * 内積（static版）
       */

    }, {
      key: "cross",

      /**
       * 外積
       */
      value: function cross(v) {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;

        this.setComponents(x, y, z);

        return this;
      }

      /**
      * 外積(static版)
      */

    }, {
      key: "normalize",

      /**
       * 正規化
       */
      value: function normalize() {
        var length = this.length();
        this.divide(length);

        return this;
      }

      /**
       * 正規化（static版）
       */

    }, {
      key: "add",

      /**
       * 加算
       */
      value: function add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
      }

      /**
       * 加算（static版）
       */

    }, {
      key: "subtract",

      /**
       * 減算
       */
      value: function subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
      }

      /**
       * 減算（static版）
       */

    }, {
      key: "divide",

      /**
       * 除算
       */
      value: function divide(val) {
        console.assert(val != 0, "0 division!");
        this.x /= val;
        this.y /= val;
        this.z /= val;

        return this;
      }

      /**
       * 除算（static版）
       */

    }], [{
      key: "zero",
      value: function zero() {
        return new Vector3(0, 0, 0);
      }
    }, {
      key: "dotProduct",
      value: function dotProduct(lv, rv) {
        return lv.x * rv.x + lv.y * rv.y + lv.z * rv.z;
      }
    }, {
      key: "cross",
      value: function cross(lv, rv) {
        var x = lv.y * rv.z - lv.z * rv.y;
        var y = lv.z * rv.x - lv.x * rv.z;
        var z = lv.x * rv.y - lv.y * rv.x;

        return new Vector3(x, y, z);
      }
    }, {
      key: "normalize",
      value: function normalize(vec3) {
        var length = vec3.length();
        vec3.divide(length);

        return vec3;
      }
    }, {
      key: "add",
      value: function add(lv, rv) {
        return new Vector3(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z);
      }
    }, {
      key: "subtract",
      value: function subtract(lv, rv) {
        return new Vector3(lv.x - rv.x, lv.y - rv.y, lv.z - rv.z);
      }
    }, {
      key: "divide",
      value: function divide(vec3, val) {
        console.assert(val != 0, "0 division!");
        return new Vector3(vec3.x / val, vec3.y / val, vec3.z / val);
      }
    }]);
    return Vector3;
  })();

  GLBoost$1["Vector3"] = Vector3;

  var Matrix33 = (function () {
    function Matrix33() {
      babelHelpers.classCallCheck(this, Matrix33);

      this.m = [];
      if (arguments.length >= 9) {
        this.setComponents.apply(this, arguments);
      } else {
        this.identity();
      }
    }

    babelHelpers.createClass(Matrix33, [{
      key: 'setComponents',
      value: function setComponents(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        this.m00 = m00;this.m01 = m01;this.m02 = m02;
        this.m10 = m10;this.m11 = m11;this.m12 = m12;
        this.m20 = m20;this.m21 = m21;this.m22 = m22;

        return this;
      }

      /**
       * 単位行列にする
       */

    }, {
      key: 'identity',
      value: function identity() {
        this.setComponents(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
      }

      /**
       * 単位行列にする（static版）
       */

    }, {
      key: 'rotateX',

      /**
       * Create X oriented Rotation Matrix
       */
      value: function rotateX(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(1, 0, 0, 0, cos, -sin, 0, sin, cos);
      }
      /**
       * Create X oriented Rotation Matrix
       */

    }, {
      key: 'rotateY',

      /**
       * Create Y oriented Rotation Matrix
       */
      value: function rotateY(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        this.setComponents(cos, 0, sin, 0, 1, 0, -sin, 0, cos);
        return this;
      }
      /**
       * Create Y oriented Rotation Matrix
       */

    }, {
      key: 'rotateZ',

      /**
       * Create Z oriented Rotation Matrix
       */
      value: function rotateZ(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
      }
      /**
       * Create Z oriented Rotation Matrix
       */

    }, {
      key: 'zero',

      /**
       * ゼロ行列
       */
      value: function zero() {
        this.setComponents(0, 0, 0, 0, 0, 0, 0, 0, 0);
        return this;
      }
    }, {
      key: 'flatten',
      value: function flatten() {
        return this.m;
      }
    }, {
      key: '_swap',
      value: function _swap(l, r) {
        this.m[r] = [this.m[l], this.m[l] = this.m[r]][0]; // Swap
      }

      /**
       * 転置
       */

    }, {
      key: 'transpose',
      value: function transpose() {
        this._swap(1, 3);
        this._swap(2, 6);
        this._swap(5, 8);

        return this;
      }

      /**
       * 転置（static版）
       */

    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec) {
        var x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z;
        var y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z;
        var z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z;

        return new Vector3(x, y, z);
      }

      /**
       * 行列同士の乗算
       */

    }, {
      key: 'multiply',
      value: function multiply(mat) {
        var m00 = this.m00 * mat.m00 + this.m01 * mat.m10 + this.m02 * mat.m20;
        var m01 = this.m00 * mat.m01 + this.m01 * mat.m11 + this.m02 * mat.m21;
        var m02 = this.m00 * mat.m02 + this.m01 * mat.m12 + this.m02 * mat.m22;

        var m10 = this.m10 * mat.m00 + this.m11 * mat.m10 + this.m12 * mat.m20;
        var m11 = this.m10 * mat.m01 + this.m11 * mat.m11 + this.m12 * mat.m21;
        var m12 = this.m10 * mat.m02 + this.m11 * mat.m12 + this.m12 * mat.m22;

        var m20 = this.m20 * mat.m00 + this.m21 * mat.m10 + this.m22 * mat.m20;
        var m21 = this.m20 * mat.m01 + this.m21 * mat.m11 + this.m22 * mat.m21;
        var m22 = this.m20 * mat.m02 + this.m21 * mat.m12 + this.m22 * mat.m22;

        return this.setComponents(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }

      /**
       * 行列同士の乗算（static版）
       */

    }, {
      key: 'determinant',
      value: function determinant() {
        return this.m00 * this.m11 * this.m22 + this.m10 * this.m21 * this.m02 + this.m20 * this.m01 * this.m12 - this.m00 * this.m21 * this.m12 - this.m20 * this.m11 * this.m02 - this.m10 * this.m01 * this.m22;
      }
    }, {
      key: 'invert',
      value: function invert() {
        var det = this.determinant();
        var m00 = (this.m11 * this.m22 - this.m12 * this.m21) / det;
        var m01 = (this.m02 * this.m21 - this.m01 * this.m22) / det;
        var m02 = (this.m01 * this.m12 - this.m02 * this.m11) / det;
        var m10 = (this.m12 * this.m20 - this.m10 * this.m22) / det;
        var m11 = (this.m00 * this.m22 - this.m02 * this.m20) / det;
        var m12 = (this.m02 * this.m10 - this.m00 * this.m12) / det;
        var m20 = (this.m10 * this.m21 - this.m11 * this.m20) / det;
        var m21 = (this.m01 * this.m20 - this.m00 * this.m21) / det;
        var m22 = (this.m00 * this.m11 - this.m01 * this.m10) / det;

        return this.setComponents(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }
    }, {
      key: 'm00',
      set: function set(val) {
        this.m[0] = val;
      },
      get: function get() {
        return this.m[0];
      }
    }, {
      key: 'm01',
      set: function set(val) {
        this.m[1] = val;
      },
      get: function get() {
        return this.m[1];
      }
    }, {
      key: 'm02',
      set: function set(val) {
        this.m[2] = val;
      },
      get: function get() {
        return this.m[2];
      }
    }, {
      key: 'm10',
      set: function set(val) {
        this.m[3] = val;
      },
      get: function get() {
        return this.m[3];
      }
    }, {
      key: 'm11',
      set: function set(val) {
        this.m[4] = val;
      },
      get: function get() {
        return this.m[4];
      }
    }, {
      key: 'm12',
      set: function set(val) {
        this.m[5] = val;
      },
      get: function get() {
        return this.m[5];
      }
    }, {
      key: 'm20',
      set: function set(val) {
        this.m[6] = val;
      },
      get: function get() {
        return this.m[6];
      }
    }, {
      key: 'm21',
      set: function set(val) {
        this.m[7] = val;
      },
      get: function get() {
        return this.m[7];
      }
    }, {
      key: 'm22',
      set: function set(val) {
        this.m[8] = val;
      },
      get: function get() {
        return this.m[8];
      }
    }], [{
      key: 'identity',
      value: function identity() {
        return new Matrix33(1, 0, 0, 0, 1, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateX',
      value: function rotateX(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix33(1, 0, 0, 0, cos, -sin, 0, sin, cos);
      }
    }, {
      key: 'rotateY',
      value: function rotateY(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix33(cos, 0, sin, 0, 1, 0, -sin, 0, cos);
      }
    }, {
      key: 'rotateZ',
      value: function rotateZ(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix33(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
      }
    }, {
      key: 'zero',
      value: function zero() {
        return new Matrix33(0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    }, {
      key: 'transpose',
      value: function transpose(mat) {

        var mat_t = new Matrix33(mat.m00, mat.m10, mat.m20, mat.m01, mat.m11, mat.m21, mat.m02, mat.m12, mat.m22);

        return mat_t;
      }
    }, {
      key: 'multiply',
      value: function multiply(l_m, r_m) {
        var m00 = l_m.m00 * r_m.m00 + l_m.m01 * r_m.m10 + l_m.m02 * r_m.m20;
        var m10 = l_m.m10 * r_m.m00 + l_m.m11 * r_m.m10 + l_m.m12 * r_m.m20;
        var m20 = l_m.m20 * r_m.m00 + l_m.m21 * r_m.m10 + l_m.m22 * r_m.m20;

        var m01 = l_m.m00 * r_m.m01 + l_m.m01 * r_m.m11 + l_m.m02 * r_m.m21;
        var m11 = l_m.m10 * r_m.m01 + l_m.m11 * r_m.m11 + l_m.m12 * r_m.m21;
        var m21 = l_m.m20 * r_m.m01 + l_m.m21 * r_m.m11 + l_m.m22 * r_m.m21;

        var m02 = l_m.m00 * r_m.m02 + l_m.m01 * r_m.m12 + l_m.m02 * r_m.m22;
        var m12 = l_m.m10 * r_m.m02 + l_m.m11 * r_m.m12 + l_m.m12 * r_m.m22;
        var m22 = l_m.m20 * r_m.m02 + l_m.m21 * r_m.m12 + l_m.m22 * r_m.m22;

        return new Matrix33(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }
    }, {
      key: 'determinant',
      value: function determinant(mat) {
        return mat.m00 * mat.m11 * mat.m22 + mat.m10 * mat.m21 * mat.m02 + mat.m20 * mat.m01 * mat.m12 - mat.m00 * mat.m21 * mat.m12 - mat.m20 * mat.m11 * mat.m02 - mat.m10 * mat.m01 * mat.m22;
      }
    }, {
      key: 'invert',
      value: function invert(mat) {
        var det = mat.determinant();
        var m00 = (mat.m11 * mat.m22 - mat.m12 * mat.m21) / det;
        var m01 = (mat.m02 * mat.m21 - mat.m01 * mat.m22) / det;
        var m02 = (mat.m01 * mat.m12 - mat.m02 * mat.m11) / det;
        var m10 = (mat.m12 * mat.m20 - mat.m10 * mat.m22) / det;
        var m11 = (mat.m00 * mat.m22 - mat.m02 * mat.m20) / det;
        var m12 = (mat.m02 * mat.m10 - mat.m00 * mat.m12) / det;
        var m20 = (mat.m10 * mat.m21 - mat.m11 * mat.m20) / det;
        var m21 = (mat.m01 * mat.m20 - mat.m00 * mat.m21) / det;
        var m22 = (mat.m00 * mat.m11 - mat.m01 * mat.m10) / det;

        return new Matrix33(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }
    }]);
    return Matrix33;
  })();

  GLBoost$1["Matrix33"] = Matrix33;

  var Vector4 = (function () {
    function Vector4(x, y, z, w) {
      babelHelpers.classCallCheck(this, Vector4);

      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }

    babelHelpers.createClass(Vector4, [{
      key: "isEqual",
      value: function isEqual(vec) {
        if (this.x === vec.x && this.y === vec.y && this.z === vec.z && this.w === vec.w) {
          return true;
        } else {
          return false;
        }
      }
    }]);
    return Vector4;
  })();

  GLBoost$1["Vector4"] = Vector4;

  var Matrix44 = (function () {
    function Matrix44() {
      babelHelpers.classCallCheck(this, Matrix44);

      this.m = [];
      if (arguments.length >= 16) {
        this.setComponents.apply(this, arguments);
      } else {
        this.identity();
      }
    }

    babelHelpers.createClass(Matrix44, [{
      key: 'setComponents',
      value: function setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        this.m00 = m00;this.m01 = m01;this.m02 = m02;this.m03 = m03;
        this.m10 = m10;this.m11 = m11;this.m12 = m12;this.m13 = m13;
        this.m20 = m20;this.m21 = m21;this.m22 = m22;this.m23 = m23;
        this.m30 = m30;this.m31 = m31;this.m32 = m32;this.m33 = m33;

        return this;
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Matrix44(this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33);
      }

      /**
       * 単位行列にする
       */

    }, {
      key: 'identity',
      value: function identity() {
        this.setComponents(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
      }

      /**
       * 単位行列にする（static版）
       */

    }, {
      key: 'translate',
      value: function translate(vec) {
        return this.setComponents(1, 0, 0, vec.x, 0, 1, 0, vec.y, 0, 0, 1, vec.z, 0, 0, 0, 1);
      }
    }, {
      key: 'scale',
      value: function scale(vec) {
        return this.setComponents(vec.x, 0, 0, 0, 0, vec.y, 0, 0, 0, 0, vec.z, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateX',

      /**
       * Create X oriented Rotation Matrix
       */
      value: function rotateX(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1);
      }
      /**
       * Create X oriented Rotation Matrix
      */

    }, {
      key: 'rotateY',

      /**
       * Create Y oriented Rotation Matrix
       */
      value: function rotateY(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
      }
      /**
       * Create Y oriented Rotation Matrix
       */

    }, {
      key: 'rotateZ',

      /**
       * Create Z oriented Rotation Matrix
       */
      value: function rotateZ(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      /**
       * Create Z oriented Rotation Matrix
       */

    }, {
      key: 'zero',

      /**
       * ゼロ行列
       */
      value: function zero() {
        this.setComponents(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        return this;
      }
    }, {
      key: 'flatten',
      value: function flatten() {
        return this.m;
      }
    }, {
      key: '_swap',
      value: function _swap(l, r) {
        this.m[r] = [this.m[l], this.m[l] = this.m[r]][0]; // Swap
      }

      /**
       * 転置
       */

    }, {
      key: 'transpose',
      value: function transpose() {
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

    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec) {
        var x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vec.w;
        var y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vec.w;
        var z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vec.w;
        var w = this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vec.w;

        return new Vector4(x, y, z, w);
      }

      /**
       * 行列同士の乗算
       */

    }, {
      key: 'multiply',
      value: function multiply(mat) {
        var m00 = this.m00 * mat.m00 + this.m01 * mat.m10 + this.m02 * mat.m20 + this.m03 * mat.m30;
        var m01 = this.m00 * mat.m01 + this.m01 * mat.m11 + this.m02 * mat.m21 + this.m03 * mat.m31;
        var m02 = this.m00 * mat.m02 + this.m01 * mat.m12 + this.m02 * mat.m22 + this.m03 * mat.m32;
        var m03 = this.m00 * mat.m03 + this.m01 * mat.m13 + this.m02 * mat.m23 + this.m03 * mat.m33;

        var m10 = this.m10 * mat.m00 + this.m11 * mat.m10 + this.m12 * mat.m20 + this.m13 * mat.m30;
        var m11 = this.m10 * mat.m01 + this.m11 * mat.m11 + this.m12 * mat.m21 + this.m13 * mat.m31;
        var m12 = this.m10 * mat.m02 + this.m11 * mat.m12 + this.m12 * mat.m22 + this.m13 * mat.m32;
        var m13 = this.m10 * mat.m03 + this.m11 * mat.m13 + this.m12 * mat.m23 + this.m13 * mat.m33;

        var m20 = this.m20 * mat.m00 + this.m21 * mat.m10 + this.m22 * mat.m20 + this.m23 * mat.m30;
        var m21 = this.m20 * mat.m01 + this.m21 * mat.m11 + this.m22 * mat.m21 + this.m23 * mat.m31;
        var m22 = this.m20 * mat.m02 + this.m21 * mat.m12 + this.m22 * mat.m22 + this.m23 * mat.m32;
        var m23 = this.m20 * mat.m03 + this.m21 * mat.m13 + this.m22 * mat.m23 + this.m23 * mat.m33;

        var m30 = this.m30 * mat.m00 + this.m31 * mat.m10 + this.m32 * mat.m20 + this.m33 * mat.m30;
        var m31 = this.m30 * mat.m01 + this.m31 * mat.m11 + this.m32 * mat.m21 + this.m33 * mat.m31;
        var m32 = this.m30 * mat.m02 + this.m31 * mat.m12 + this.m32 * mat.m22 + this.m33 * mat.m32;
        var m33 = this.m30 * mat.m03 + this.m31 * mat.m13 + this.m32 * mat.m23 + this.m33 * mat.m33;

        return this.setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }

      /**
       * 行列同士の乗算（static版）
       */

    }, {
      key: 'toMatrix33',
      value: function toMatrix33() {
        return new Matrix33(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22);
      }
    }, {
      key: 'determinant',
      value: function determinant() {
        return this.m00 * this.m11 * this.m22 * this.m33 + this.m00 * this.m12 * this.m23 * this.m31 + this.m00 * this.m13 * this.m21 * this.m32 + this.m01 * this.m10 * this.m23 * this.m32 + this.m01 * this.m12 * this.m20 * this.m33 + this.m01 * this.m13 * this.m22 * this.m30 + this.m02 * this.m10 * this.m21 * this.m33 + this.m02 * this.m11 * this.m23 * this.m30 + this.m02 * this.m13 * this.m20 * this.m31 + this.m03 * this.m10 * this.m22 * this.m31 + this.m03 * this.m11 * this.m20 * this.m32 + this.m03 * this.m12 * this.m21 * this.m30 - this.m00 * this.m11 * this.m23 * this.m32 - this.m00 * this.m12 * this.m21 * this.m33 - this.m00 * this.m13 * this.m22 * this.m31 - this.m01 * this.m10 * this.m22 * this.m33 - this.m01 * this.m12 * this.m23 * this.m30 - this.m01 * this.m13 * this.m20 * this.m32 - this.m02 * this.m10 * this.m23 * this.m31 - this.m02 * this.m11 * this.m20 * this.m33 - this.m02 * this.m13 * this.m21 * this.m30 - this.m03 * this.m10 * this.m21 * this.m32 - this.m03 * this.m11 * this.m22 * this.m30 - this.m03 * this.m12 * this.m20 * this.m31;
      }
    }, {
      key: 'invert',
      value: function invert() {
        var det = this.determinant();
        var m00 = (this.m11 * this.m22 * this.m33 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32 - this.m11 * this.m23 * this.m32 - this.m12 * this.m21 * this.m33 - this.m13 * this.m22 * this.m31) / det;
        var m01 = (this.m01 * this.m23 * this.m32 + this.m02 * this.m21 * this.m33 + this.m03 * this.m22 * this.m31 - this.m01 * this.m22 * this.m33 - this.m02 * this.m23 * this.m31 - this.m03 * this.m21 * this.m32) / det;
        var m02 = (this.m01 * this.m12 * this.m33 + this.m02 * this.m13 * this.m31 + this.m03 * this.m11 * this.m32 - this.m01 * this.m13 * this.m32 - this.m02 * this.m11 * this.m33 - this.m03 * this.m12 * this.m31) / det;
        var m03 = (this.m01 * this.m13 * this.m22 + this.m02 * this.m11 * this.m23 + this.m03 * this.m12 * this.m21 - this.m01 * this.m12 * this.m23 - this.m02 * this.m13 * this.m21 - this.m03 * this.m11 * this.m22) / det;
        var m10 = (this.m10 * this.m23 * this.m32 + this.m12 * this.m20 * this.m33 + this.m13 * this.m22 * this.m30 - this.m10 * this.m22 * this.m33 - this.m12 * this.m23 * this.m30 - this.m13 * this.m20 * this.m32) / det;
        var m11 = (this.m00 * this.m22 * this.m33 + this.m02 * this.m23 * this.m30 + this.m03 * this.m20 * this.m32 - this.m00 * this.m23 * this.m32 - this.m02 * this.m20 * this.m33 - this.m03 * this.m22 * this.m30) / det;
        var m12 = (this.m00 * this.m13 * this.m32 + this.m02 * this.m10 * this.m33 + this.m03 * this.m12 * this.m30 - this.m00 * this.m12 * this.m33 - this.m02 * this.m13 * this.m30 - this.m03 * this.m10 * this.m32) / det;
        var m13 = (this.m00 * this.m12 * this.m23 + this.m02 * this.m13 * this.m20 + this.m03 * this.m10 * this.m22 - this.m00 * this.m13 * this.m22 - this.m02 * this.m10 * this.m23 - this.m03 * this.m12 * this.m20) / det;
        var m20 = (this.m10 * this.m21 * this.m33 + this.m11 * this.m23 * this.m30 + this.m13 * this.m20 * this.m31 - this.m10 * this.m23 * this.m31 - this.m11 * this.m20 * this.m33 - this.m13 * this.m21 * this.m30) / det;
        var m21 = (this.m00 * this.m23 * this.m31 + this.m01 * this.m20 * this.m33 + this.m03 * this.m21 * this.m30 - this.m00 * this.m21 * this.m33 - this.m01 * this.m23 * this.m30 - this.m03 * this.m20 * this.m31) / det;
        var m22 = (this.m00 * this.m11 * this.m33 + this.m01 * this.m13 * this.m30 + this.m03 * this.m10 * this.m31 - this.m00 * this.m13 * this.m31 - this.m01 * this.m10 * this.m33 - this.m03 * this.m11 * this.m30) / det;
        var m23 = (this.m00 * this.m13 * this.m21 + this.m01 * this.m10 * this.m23 + this.m03 * this.m11 * this.m20 - this.m00 * this.m11 * this.m23 - this.m01 * this.m13 * this.m20 - this.m03 * this.m10 * this.m21) / det;
        var m30 = (this.m10 * this.m22 * this.m31 + this.m11 * this.m20 * this.m32 + this.m12 * this.m21 * this.m30 - this.m10 * this.m21 * this.m32 - this.m11 * this.m22 * this.m30 - this.m12 * this.m20 * this.m31) / det;
        var m31 = (this.m00 * this.m21 * this.m32 + this.m01 * this.m22 * this.m30 + this.m02 * this.m20 * this.m31 - this.m00 * this.m22 * this.m31 - this.m01 * this.m20 * this.m32 - this.m02 * this.m21 * this.m30) / det;
        var m32 = (this.m00 * this.m12 * this.m31 + this.m01 * this.m10 * this.m32 + this.m02 * this.m11 * this.m30 - this.m00 * this.m11 * this.m32 - this.m01 * this.m12 * this.m30 - this.m02 * this.m10 * this.m31) / det;
        var m33 = (this.m00 * this.m11 * this.m22 + this.m01 * this.m12 * this.m20 + this.m02 * this.m10 * this.m21 - this.m00 * this.m12 * this.m21 - this.m01 * this.m10 * this.m22 - this.m02 * this.m11 * this.m20) / det;

        return this.setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }, {
      key: 'm00',
      set: function set(val) {
        this.m[0] = val;
      },
      get: function get() {
        return this.m[0];
      }
    }, {
      key: 'm01',
      set: function set(val) {
        this.m[1] = val;
      },
      get: function get() {
        return this.m[1];
      }
    }, {
      key: 'm02',
      set: function set(val) {
        this.m[2] = val;
      },
      get: function get() {
        return this.m[2];
      }
    }, {
      key: 'm03',
      set: function set(val) {
        this.m[3] = val;
      },
      get: function get() {
        return this.m[3];
      }
    }, {
      key: 'm10',
      set: function set(val) {
        this.m[4] = val;
      },
      get: function get() {
        return this.m[4];
      }
    }, {
      key: 'm11',
      set: function set(val) {
        this.m[5] = val;
      },
      get: function get() {
        return this.m[5];
      }
    }, {
      key: 'm12',
      set: function set(val) {
        this.m[6] = val;
      },
      get: function get() {
        return this.m[6];
      }
    }, {
      key: 'm13',
      set: function set(val) {
        this.m[7] = val;
      },
      get: function get() {
        return this.m[7];
      }
    }, {
      key: 'm20',
      set: function set(val) {
        this.m[8] = val;
      },
      get: function get() {
        return this.m[8];
      }
    }, {
      key: 'm21',
      set: function set(val) {
        this.m[9] = val;
      },
      get: function get() {
        return this.m[9];
      }
    }, {
      key: 'm22',
      set: function set(val) {
        this.m[10] = val;
      },
      get: function get() {
        return this.m[10];
      }
    }, {
      key: 'm23',
      set: function set(val) {
        this.m[11] = val;
      },
      get: function get() {
        return this.m[11];
      }
    }, {
      key: 'm30',
      set: function set(val) {
        this.m[12] = val;
      },
      get: function get() {
        return this.m[12];
      }
    }, {
      key: 'm31',
      set: function set(val) {
        this.m[13] = val;
      },
      get: function get() {
        return this.m[13];
      }
    }, {
      key: 'm32',
      set: function set(val) {
        this.m[14] = val;
      },
      get: function get() {
        return this.m[14];
      }
    }, {
      key: 'm33',
      set: function set(val) {
        this.m[15] = val;
      },
      get: function get() {
        return this.m[15];
      }
    }], [{
      key: 'identity',
      value: function identity() {
        return new Matrix44(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'translate',
      value: function translate(vec) {
        return new Matrix44(1, 0, 0, vec.x, 0, 1, 0, vec.y, 0, 0, 1, vec.z, 0, 0, 0, 1);
      }
    }, {
      key: 'scale',
      value: function scale(vec) {
        return new Matrix44(vec.x, 0, 0, 0, 0, vec.y, 0, 0, 0, 0, vec.z, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateX',
      value: function rotateX(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix44(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateY',
      value: function rotateY(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix44(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateZ',
      value: function rotateZ(radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix44(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'zero',
      value: function zero() {
        return new Matrix44(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    }, {
      key: 'transpose',
      value: function transpose(mat) {

        var mat_t = new Matrix44(mat.m00, mat.m10, mat.m20, mat.m30, mat.m01, mat.m11, mat.m21, mat.m31, mat.m02, mat.m12, mat.m22, mat.m32, mat.m03, mat.m13, mat.m23, mat.m33);

        return mat_t;
      }
    }, {
      key: 'multiply',
      value: function multiply(l_m, r_m) {
        var m00 = l_m.m00 * r_m.m00 + l_m.m01 * r_m.m10 + l_m.m02 * r_m.m20 + l_m.m03 * r_m.m30;
        var m10 = l_m.m10 * r_m.m00 + l_m.m11 * r_m.m10 + l_m.m12 * r_m.m20 + l_m.m13 * r_m.m30;
        var m20 = l_m.m20 * r_m.m00 + l_m.m21 * r_m.m10 + l_m.m22 * r_m.m20 + l_m.m23 * r_m.m30;
        var m30 = l_m.m30 * r_m.m00 + l_m.m31 * r_m.m10 + l_m.m32 * r_m.m20 + l_m.m33 * r_m.m30;

        var m01 = l_m.m00 * r_m.m01 + l_m.m01 * r_m.m11 + l_m.m02 * r_m.m21 + l_m.m03 * r_m.m31;
        var m11 = l_m.m10 * r_m.m01 + l_m.m11 * r_m.m11 + l_m.m12 * r_m.m21 + l_m.m13 * r_m.m31;
        var m21 = l_m.m20 * r_m.m01 + l_m.m21 * r_m.m11 + l_m.m22 * r_m.m21 + l_m.m23 * r_m.m31;
        var m31 = l_m.m30 * r_m.m01 + l_m.m31 * r_m.m11 + l_m.m32 * r_m.m21 + l_m.m33 * r_m.m31;

        var m02 = l_m.m00 * r_m.m02 + l_m.m01 * r_m.m12 + l_m.m02 * r_m.m22 + l_m.m03 * r_m.m32;
        var m12 = l_m.m10 * r_m.m02 + l_m.m11 * r_m.m12 + l_m.m12 * r_m.m22 + l_m.m13 * r_m.m32;
        var m22 = l_m.m20 * r_m.m02 + l_m.m21 * r_m.m12 + l_m.m22 * r_m.m22 + l_m.m23 * r_m.m32;
        var m32 = l_m.m30 * r_m.m02 + l_m.m31 * r_m.m12 + l_m.m32 * r_m.m22 + l_m.m33 * r_m.m32;

        var m03 = l_m.m00 * r_m.m03 + l_m.m01 * r_m.m13 + l_m.m02 * r_m.m23 + l_m.m03 * r_m.m33;
        var m13 = l_m.m10 * r_m.m03 + l_m.m11 * r_m.m13 + l_m.m12 * r_m.m23 + l_m.m13 * r_m.m33;
        var m23 = l_m.m20 * r_m.m03 + l_m.m21 * r_m.m13 + l_m.m22 * r_m.m23 + l_m.m23 * r_m.m33;
        var m33 = l_m.m30 * r_m.m03 + l_m.m31 * r_m.m13 + l_m.m32 * r_m.m23 + l_m.m33 * r_m.m33;

        return new Matrix44(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }, {
      key: 'toMatrix33',
      value: function toMatrix33(mat) {
        return new Matrix33(mat.m00, mat.m01, mat.m02, mat.m10, mat.m11, mat.m12, mat.m20, mat.m21, mat.m22);
      }
    }, {
      key: 'determinant',
      value: function determinant(mat) {
        return mat.m00 * mat.m11 * mat.m22 * mat.m33 + mat.m00 * mat.m12 * mat.m23 * mat.m31 + mat.m00 * mat.m13 * mat.m21 * mat.m32 + mat.m01 * mat.m10 * mat.m23 * mat.m32 + mat.m01 * mat.m12 * mat.m20 * mat.m33 + mat.m01 * mat.m13 * mat.m22 * mat.m30 + mat.m02 * mat.m10 * mat.m21 * mat.m33 + mat.m02 * mat.m11 * mat.m23 * mat.m30 + mat.m02 * mat.m13 * mat.m20 * mat.m31 + mat.m03 * mat.m10 * mat.m22 * mat.m31 + mat.m03 * mat.m11 * mat.m20 * mat.m32 + mat.m03 * mat.m12 * mat.m21 * mat.m30 - mat.m00 * mat.m11 * mat.m23 * mat.m32 - mat.m00 * mat.m12 * mat.m21 * mat.m33 - mat.m00 * mat.m13 * mat.m22 * mat.m31 - mat.m01 * mat.m10 * mat.m22 * mat.m33 - mat.m01 * mat.m12 * mat.m23 * mat.m30 - mat.m01 * mat.m13 * mat.m20 * mat.m32 - mat.m02 * mat.m10 * mat.m23 * mat.m31 - mat.m02 * mat.m11 * mat.m20 * mat.m33 - mat.m02 * mat.m13 * mat.m21 * mat.m30 - mat.m03 * mat.m10 * mat.m21 * mat.m32 - mat.m03 * mat.m11 * mat.m22 * mat.m30 - mat.m03 * mat.m12 * mat.m20 * mat.m31;
      }
    }, {
      key: 'invert',
      value: function invert(mat) {
        var det = mat.determinant();
        var m00 = (mat.m11 * mat.m22 * mat.m33 + mat.m12 * mat.m23 * mat.m31 + mat.m13 * mat.m21 * mat.m32 - mat.m11 * mat.m23 * mat.m32 - mat.m12 * mat.m21 * mat.m33 - mat.m13 * mat.m22 * mat.m31) / det;
        var m01 = (mat.m01 * mat.m23 * mat.m32 + mat.m02 * mat.m21 * mat.m33 + mat.m03 * mat.m22 * mat.m31 - mat.m01 * mat.m22 * mat.m33 - mat.m02 * mat.m23 * mat.m31 - mat.m03 * mat.m21 * mat.m32) / det;
        var m02 = (mat.m01 * mat.m12 * mat.m33 + mat.m02 * mat.m13 * mat.m31 + mat.m03 * mat.m11 * mat.m32 - mat.m01 * mat.m13 * mat.m32 - mat.m02 * mat.m11 * mat.m33 - mat.m03 * mat.m12 * mat.m31) / det;
        var m03 = (mat.m01 * mat.m13 * mat.m22 + mat.m02 * mat.m11 * mat.m23 + mat.m03 * mat.m12 * mat.m21 - mat.m01 * mat.m12 * mat.m23 - mat.m02 * mat.m13 * mat.m21 - mat.m03 * mat.m11 * mat.m22) / det;
        var m10 = (mat.m10 * mat.m23 * mat.m32 + mat.m12 * mat.m20 * mat.m33 + mat.m13 * mat.m22 * mat.m30 - mat.m10 * mat.m22 * mat.m33 - mat.m12 * mat.m23 * mat.m30 - mat.m13 * mat.m20 * mat.m32) / det;
        var m11 = (mat.m00 * mat.m22 * mat.m33 + mat.m02 * mat.m23 * mat.m30 + mat.m03 * mat.m20 * mat.m32 - mat.m00 * mat.m23 * mat.m32 - mat.m02 * mat.m20 * mat.m33 - mat.m03 * mat.m22 * mat.m30) / det;
        var m12 = (mat.m00 * mat.m13 * mat.m32 + mat.m02 * mat.m10 * mat.m33 + mat.m03 * mat.m12 * mat.m30 - mat.m00 * mat.m12 * mat.m33 - mat.m02 * mat.m13 * mat.m30 - mat.m03 * mat.m10 * mat.m32) / det;
        var m13 = (mat.m00 * mat.m12 * mat.m23 + mat.m02 * mat.m13 * mat.m20 + mat.m03 * mat.m10 * mat.m22 - mat.m00 * mat.m13 * mat.m22 - mat.m02 * mat.m10 * mat.m23 - mat.m03 * mat.m12 * mat.m20) / det;
        var m20 = (mat.m10 * mat.m21 * mat.m33 + mat.m11 * mat.m23 * mat.m30 + mat.m13 * mat.m20 * mat.m31 - mat.m10 * mat.m23 * mat.m31 - mat.m11 * mat.m20 * mat.m33 - mat.m13 * mat.m21 * mat.m30) / det;
        var m21 = (mat.m00 * mat.m23 * mat.m31 + mat.m01 * mat.m20 * mat.m33 + mat.m03 * mat.m21 * mat.m30 - mat.m00 * mat.m21 * mat.m33 - mat.m01 * mat.m23 * mat.m30 - mat.m03 * mat.m20 * mat.m31) / det;
        var m22 = (mat.m00 * mat.m11 * mat.m33 + mat.m01 * mat.m13 * mat.m30 + mat.m03 * mat.m10 * mat.m31 - mat.m00 * mat.m13 * mat.m31 - mat.m01 * mat.m10 * mat.m33 - mat.m03 * mat.m11 * mat.m30) / det;
        var m23 = (mat.m00 * mat.m13 * mat.m21 + mat.m01 * mat.m10 * mat.m23 + mat.m03 * mat.m11 * mat.m20 - mat.m00 * mat.m11 * mat.m23 - mat.m01 * mat.m13 * mat.m20 - mat.m03 * mat.m10 * mat.m21) / det;
        var m30 = (mat.m10 * mat.m22 * mat.m31 + mat.m11 * mat.m20 * mat.m32 + mat.m12 * mat.m21 * mat.m30 - mat.m10 * mat.m21 * mat.m32 - mat.m11 * mat.m22 * mat.m30 - mat.m12 * mat.m20 * mat.m31) / det;
        var m31 = (mat.m00 * mat.m21 * mat.m32 + mat.m01 * mat.m22 * mat.m30 + mat.m02 * mat.m20 * mat.m31 - mat.m00 * mat.m22 * mat.m31 - mat.m01 * mat.m20 * mat.m32 - mat.m02 * mat.m21 * mat.m30) / det;
        var m32 = (mat.m00 * mat.m12 * mat.m31 + mat.m01 * mat.m10 * mat.m32 + mat.m02 * mat.m11 * mat.m30 - mat.m00 * mat.m11 * mat.m32 - mat.m01 * mat.m12 * mat.m30 - mat.m02 * mat.m10 * mat.m31) / det;
        var m33 = (mat.m00 * mat.m11 * mat.m22 + mat.m01 * mat.m12 * mat.m20 + mat.m02 * mat.m10 * mat.m21 - mat.m00 * mat.m12 * mat.m21 - mat.m01 * mat.m10 * mat.m22 - mat.m02 * mat.m11 * mat.m20) / det;

        return new Matrix44(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }]);
    return Matrix44;
  })();

  GLBoost$1["Matrix44"] = Matrix44;

  var Element = (function () {
    function Element() {
      babelHelpers.classCallCheck(this, Element);

      this.children = []; // this is compatibility for tmlib. Actually this is NOT used.
      this._parent = null;
      this._translate = Vector3.zero();
      this._rotate = Vector3.zero();
      this._scale = new Vector3(1, 1, 1);
      this._matrix = Matrix44.identity();
      this._invMatrix = Matrix44.identity();
      this._dirtyAsElement = false;
      this._calculatedInverseMatrix = false;
      this._updateCountAsElement = 0;
    }

    babelHelpers.createClass(Element, [{
      key: '_needUpdate',
      value: function _needUpdate() {
        this._dirtyAsElement = true;
        this._calculatedInverseMatrix = false;
        this._updateCountAsElement++;
      }
    }, {
      key: '_multiplyMyAndParentTransformMatrices',
      value: function _multiplyMyAndParentTransformMatrices(currentElem, withMySelf) {
        if (currentElem._parent === null) {
          if (withMySelf) {
            return currentElem.transformMatrix;
          } else {
            return Matrix44.identity();
          }
        } else {
          var currentMatrix = Matrix44.identity();
          if (withMySelf) {
            currentMatrix = currentElem.transformMatrix;
          }
          return this._multiplyMyAndParentTransformMatrices(currentElem._parent, true).multiply(currentMatrix);
        }
      }
    }, {
      key: '_multiplyMyAndParentTransformMatricesInInverseOrder',
      value: function _multiplyMyAndParentTransformMatricesInInverseOrder(currentElem, withMySelf) {
        if (currentElem._parent === null) {
          if (withMySelf) {
            return currentElem.transformMatrix;
          } else {
            return Matrix44.identity();
          }
        } else {
          var currentMatrix = Matrix44.identity();
          if (withMySelf) {
            currentMatrix = currentElem.transformMatrix;
          }
          return currentMatrix.multiply(this._multiplyMyAndParentTransformMatricesInInverseOrder(currentElem._parent, true));
        }
      }
    }, {
      key: 'updateCountAsElement',
      get: function get() {
        return this._updateCountAsElement;
      }
    }, {
      key: 'translate',
      set: function set(vec) {
        if (this._translate.isEqual(vec)) {
          return;
        }
        this._translate = vec;
        this._needUpdate();
      },
      get: function get() {
        return this._translate;
      }
    }, {
      key: 'rotate',
      set: function set(vec) {
        if (this._rotate.isEqual(vec)) {
          return;
        }
        this._rotate = vec;
        this._needUpdate();
      },
      get: function get() {
        return this._rotate;
      }
    }, {
      key: 'scale',
      set: function set(vec) {
        if (this._scale.isEqual(vec)) {
          return;
        }
        this._scale = vec;
        this._needUpdate();
      },
      get: function get() {
        return this._scale;
      }
    }, {
      key: 'transformMatrix',
      get: function get() {
        if (this._dirtyAsElement) {
          var matrix = Matrix44.identity();
          this._matrix = matrix.multiply(Matrix44.scale(this._scale)).multiply(Matrix44.rotateX(this._rotate.x)).multiply(Matrix44.rotateY(this._rotate.y)).multiply(Matrix44.rotateZ(this._rotate.z));
          this._matrix.m03 = this._translate.x;
          this._matrix.m13 = this._translate.y;
          this._matrix.m23 = this._translate.z;

          this._dirtyAsElement = false;
        }

        return this._matrix.clone();
      }
    }, {
      key: 'inverseTransformMatrix',
      get: function get() {
        if (!this._calculatedInverseMatrix) {
          this._invMatrix = this.transformMatrix.invert();
          this._calculatedInverseMatrix = true;
        }
        return this._invMatrix.clone();
      }
    }, {
      key: 'transformMatrixAccumulatedAncestry',
      get: function get() {
        return this._multiplyMyAndParentTransformMatrices(this, true);
      }
    }, {
      key: 'inverseTransformMatrixAccumulatedAncestryWithoutMySelf',
      get: function get() {
        if (this._parent === null) {
          return Matrix44.identity();
        }
        return this._multiplyMyAndParentTransformMatricesInInverseOrder(this, false).invert();
      }
    }, {
      key: 'rotateMatrixAccumulatedAncestry',
      get: function get() {
        var mat = this._multiplyMyAndParentTransformMatrices(this);
        var scaleX = Math.sqrt(mat.m00 * mat.m00 + mat.m10 * mat.m10 + mat.m20 * mat.m20);
        var scaleY = Math.sqrt(mat.m01 * mat.m01 + mat.m11 * mat.m11 + mat.m21 * mat.m21);
        var scaleZ = Math.sqrt(mat.m02 * mat.m02 + mat.m12 * mat.m12 + mat.m22 * mat.m22);

        return new Matrix44(mat.m00 / scaleX, mat.m01 / scaleY, mat.m02 / scaleZ, 0, mat.m10 / scaleX, mat.m11 / scaleY, mat.m12 / scaleZ, 0, mat.m20 / scaleX, mat.m21 / scaleY, mat.m22 / scaleZ, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'inverseTransformMatrixAccumulatedAncestry',
      get: function get() {
        return this._multiplyMyAndParentTransformMatrices(this, true).invert();
      }
    }, {
      key: 'dirty',
      set: function set(flg) {
        this._dirtyAsElement = flg;
        if (flg) {
          this._needUpdate();
        }
      }
    }, {
      key: 'parent',
      get: function get() {
        return this._parent;
      }
    }]);
    return Element;
  })();

  GLBoost$1["Element"] = Element;

  var Mesh = (function (_Element) {
    babelHelpers.inherits(Mesh, _Element);

    function Mesh(geometry, material) {
      babelHelpers.classCallCheck(this, Mesh);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Mesh).call(this));

      _this.geometry = geometry;
      _this.material = material;

      if (_this.constructor === Mesh || _this.__proto__.__proto__ && _this.__proto__.__proto__.constructor == Mesh) {
        Mesh._instanceCount = typeof Mesh._instanceCount === "undefined" ? 0 : Mesh._instanceCount + 1;
        _this._instanceName = Mesh.name + '_' + Mesh._instanceCount;
      }
      return _this;
    }

    babelHelpers.createClass(Mesh, [{
      key: 'prepareForRender',
      value: function prepareForRender(existCamera_f, lights) {
        this._geometry.prepareForRender(existCamera_f, lights, this._material);
        if (this._geometry._materials.length === 0 && this._material) {
          //if (this._material) {
          this._material = this._geometry.prepareGLSLProgramAndSetVertexNtoMaterial(this._material, existCamera_f, lights);
        }
      }
    }, {
      key: 'draw',
      value: function draw(lights, camera) {
        this._geometry.draw(lights, camera, this);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this._instanceName;
      }
    }, {
      key: 'geometry',
      set: function set(geometry) {
        this._geometry = geometry;
        geometry._parent = this;
        Mesh._geometries[geometry.toString()] = geometry;
      },
      get: function get() {
        return this._geometry;
      }
    }, {
      key: 'material',
      set: function set(material) {
        /*
        if (typeof this._geometry === "undefined") {
          console.assert(false, "set a geometry before a material.");
        }
        if (this._geometry._materials.length === 0 && material) {
          this._geometry.materials = [material];
          this._material = material;
        } else {
          this._material = null;
        }
        */

        this._material = material;
      },
      get: function get() {
        return this._material;
      }
    }]);
    return Mesh;
  })(Element);

  Mesh._geometries = {};

  GLBoost$1["Mesh"] = Mesh;

  var Group = (function (_Element) {
    babelHelpers.inherits(Group, _Element);

    function Group() {
      babelHelpers.classCallCheck(this, Group);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Group).call(this));

      _this._children = [];
      return _this;
    }

    babelHelpers.createClass(Group, [{
      key: 'addChild',
      value: function addChild(element) {
        this.removeChild(element);
        this._children.push(element);
        element._parent = this;
      }
    }, {
      key: 'removeChild',
      value: function removeChild(element) {
        this._children = this._children.filter(function (elem) {
          if (elem === element) {
            element._parent = null;
          }
          return elem !== element;
        });
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return this._children;
      }
    }]);
    return Group;
  })(Element);

  GLBoost$1["Group"] = Group;

  var GLContextImpl = (function () {
    function GLContextImpl(canvas, parent) {
      babelHelpers.classCallCheck(this, GLContextImpl);

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
      this._canvas._gl = null; // ここでnullを入れておかないと、後段のthis.gl === undefinedのチェックがうまくいかない

      if (this.gl === undefined) {
        throw new TypeError("Must override gl getter.");
      }
    }

    babelHelpers.createClass(GLContextImpl, [{
      key: "init",
      value: function init(glVersionString, ContextType) {

        var gl = this._canvas.getContext(glVersionString);

        if (!gl) {
          gl = this._canvas.getContext('experimental-' + glVersionString);
          if (!gl) {
            throw new Error("This platform doesn't support WebGL.");
          }
        }

        if (!gl instanceof ContextType) {
          throw new Error("Unexpected rendering context.");
        }

        gl._canvas = this._canvas;
        this._canvas._gl = gl;
      }
    }]);
    return GLContextImpl;
  })();

  var GLContextWebGL2Impl = (function (_GLContextImpl) {
    babelHelpers.inherits(GLContextWebGL2Impl, _GLContextImpl);

    function GLContextWebGL2Impl(canvas, parent) {
      babelHelpers.classCallCheck(this, GLContextWebGL2Impl);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(GLContextWebGL2Impl).call(this, canvas, parent));

      babelHelpers.get(Object.getPrototypeOf(GLContextWebGL2Impl.prototype), 'init', _this).call(_this, 'webgl2', WebGL2RenderingContext);

      return _this;
    }

    babelHelpers.createClass(GLContextWebGL2Impl, [{
      key: 'gl',
      get: function get() {
        return this._canvas._gl;
      }
    }]);
    return GLContextWebGL2Impl;
  })(GLContextImpl);

  var GLContextWebGL1Impl = (function (_GLContextImpl) {
    babelHelpers.inherits(GLContextWebGL1Impl, _GLContextImpl);

    function GLContextWebGL1Impl(canvas, parent) {
      babelHelpers.classCallCheck(this, GLContextWebGL1Impl);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(GLContextWebGL1Impl).call(this, canvas, parent));

      babelHelpers.get(Object.getPrototypeOf(GLContextWebGL1Impl.prototype), 'init', _this).call(_this, 'webgl', WebGLRenderingContext);

      return _this;
    }

    babelHelpers.createClass(GLContextWebGL1Impl, [{
      key: 'gl',
      get: function get() {
        return this._canvas._gl;
      }
    }]);
    return GLContextWebGL1Impl;
  })(GLContextImpl);

  var GLContext = (function () {
    function GLContext(canvas) {
      babelHelpers.classCallCheck(this, GLContext);

      if (GLContext._instances[canvas.id] instanceof GLContext) {
        return GLContext._instances[canvas.id];
      }

      if (GLBoost.TARGET_WEBGL_VERSION === 1) {
        this.impl = new GLContextWebGL1Impl(canvas, this);
      } else if (GLBoost.TARGET_WEBGL_VERSION === 2) {
        this.impl = new GLContextWebGL2Impl(canvas, this);
      }

      GLContext._instances[canvas.id] = this;
    }

    babelHelpers.createClass(GLContext, [{
      key: 'gl',
      get: function get() {
        return this.impl.gl;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance(canvas) {
        if (typeof canvas === 'string') {
          var canvas = window.document.querySelector(canvas);
        }
        return new GLContext(canvas);
      }
    }]);
    return GLContext;
  })();

  GLContext._instances = new Object();

  var RenderPass = (function () {
    function RenderPass(gl) {
      babelHelpers.classCallCheck(this, RenderPass);

      this._elements = [];
      this._meshes = [];
      this._drawBuffers = [gl.BACK];
      this._clearColor = null;
    }

    babelHelpers.createClass(RenderPass, [{
      key: 'addElements',
      value: function addElements(elements) {
        var _this = this;

        elements.forEach(function (elem) {
          if (!(elem instanceof Mesh || elem instanceof Group)) {
            throw new TypeError("RenderPass accepts Mesh or Group element only.");
          }
          _this._elements.push(elem);
        });
      }
    }, {
      key: 'specifyRenderTargetTextures',
      value: function specifyRenderTargetTextures(canvas, renderTargetTextures) {
        var _this2 = this;

        var gl = GLContext.getInstance(canvas).gl;

        if (renderTargetTextures) {
          this._drawBuffers = [];
          renderTargetTextures.forEach(function (texture) {
            _this2._drawBuffers.push(texture.colorAttachiment);
          });
        } else {
          this._drawBuffers = [gl.BACK];
        }
      }
    }, {
      key: 'setClearColor',
      value: function setClearColor(color) {
        this._clearColor = color;
      }
    }, {
      key: 'prepareForRender',
      value: function prepareForRender() {
        var _this3 = this;

        var collectMeshes = function collectMeshes(elem) {
          if (elem instanceof Group) {
            var children = elem.getChildren();
            var meshes = [];
            children.forEach(function (child) {
              var childMeshes = collectMeshes(child);
              meshes = meshes.concat(childMeshes);
            });
            return meshes;
          } else if (elem instanceof Mesh) {
            return [elem];
          } else {
            return [];
          }
        };

        this._meshes = [];
        this._elements.forEach(function (elm) {
          _this3._meshes = _this3._meshes.concat(collectMeshes(elm));
        });
      }
    }, {
      key: 'elements',
      get: function get() {
        return this._elements;
      }
    }, {
      key: 'meshes',
      get: function get() {
        return this._meshes;
      }
    }, {
      key: 'buffersToDraw',
      get: function get() {
        return this._drawBuffers;
      }
    }, {
      key: 'clearColor',
      get: function get() {
        return this._clearColor;
      }
    }]);
    return RenderPass;
  })();

  GLBoost$1["RenderPass"] = RenderPass;

  var AbstractTexture = (function () {
    function AbstractTexture(canvas) {
      babelHelpers.classCallCheck(this, AbstractTexture);

      if (this.constructor === AbstractTexture) {
        throw new TypeError("Cannot construct AbstractTexture instances directly.");
      }

      this._gl = GLContext.getInstance(canvas).gl;
      this._name = "";
    }

    babelHelpers.createClass(AbstractTexture, [{
      key: 'setUp',
      value: function setUp() {
        if (this._texture === null) {
          return false;
        }
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);

        return true;
      }
    }, {
      key: 'tearDown',
      value: function tearDown() {
        this._gl.bindTexture(this._gl.TEXTURE_2D, null);
      }
    }, {
      key: 'glTextureResource',
      get: function get() {
        return this._texture;
      }
    }, {
      key: 'name',
      set: function set(name) {
        this._name = name;
      },
      get: function get() {
        return this._name;
      }
    }, {
      key: 'width',
      get: function get() {
        return this._width;
      }
    }, {
      key: 'height',
      get: function get() {
        return this._height;
      }
    }]);
    return AbstractTexture;
  })();

  GLBoost$1["AbstractTexture"] = AbstractTexture;

  var MutableTexture = (function (_AbstractTexture) {
    babelHelpers.inherits(MutableTexture, _AbstractTexture);

    function MutableTexture(canvas, width, height) {
      babelHelpers.classCallCheck(this, MutableTexture);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MutableTexture).call(this, canvas));

      _this._isTextureReady = false;
      _this._texture = null;
      _this._width = width;
      _this._height = height;

      var gl = _this._gl;

      _this._texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, _this._texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindTexture(gl.TEXTURE_2D, null);

      return _this;
    }

    babelHelpers.createClass(MutableTexture, [{
      key: 'colorAttachiment',
      set: function set(attachmentId) {
        this._attachmentId = attachmentId;
      },
      get: function get() {
        return this._attachmentId;
      }
    }]);
    return MutableTexture;
  })(AbstractTexture);

  GLBoost$1["MutableTexture"] = MutableTexture;

  var GLExtentionsManager = (function () {
    function GLExtentionsManager(gl) {
      babelHelpers.classCallCheck(this, GLExtentionsManager);

      if (GLExtentionsManager._instance) {
        return GLExtentionsManager._instance;
      }

      this._extVAO = gl.getExtension("OES_vertex_array_object");
      /*    if (!GLBoost.isThisGLVersion_2(gl) && !this._extVAO) {
              throw new Error("OES_vertex_array_objectをサポートしていません");
          }
      */
      this._extDBs = gl.getExtension("WEBGL_draw_buffers");
      //    if (!this._extDBs)
      //      throw("WEBGL_draw_buffersをサポートしていません");

      this._extTFA = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");

      GLExtentionsManager._instance = this;
    }

    babelHelpers.createClass(GLExtentionsManager, [{
      key: "createVertexArray",
      value: function createVertexArray(gl) {
        if (GLBoost.isThisGLVersion_2(gl)) {
          return gl.createVertexArray();
        } else if (this._extVAO) {
          return this._extVAO.createVertexArrayOES();
        } else {
          return null;
        }
      }
    }, {
      key: "bindVertexArray",
      value: function bindVertexArray(gl, vao) {
        if (GLBoost.isThisGLVersion_2(gl)) {
          gl.bindVertexArray(vao);
          return true;
        } else if (this._extVAO) {
          this._extVAO.bindVertexArrayOES(vao);
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "drawBuffers",
      value: function drawBuffers(gl, buffers) {
        return this._extDBs ? this.extDBs.drawBuffersWEBGL(buffers) : false;
      }
    }, {
      key: "colorAttachiment",
      value: function colorAttachiment(gl, index) {
        return this._extDBs ? this._extDBs["COLOR_ATTACHMENT" + index + "_WEBGL"] : gl["COLOR_ATTACHMENT" + index];
      }
    }, {
      key: "extVAO",
      get: function get() {
        return this._extVAO;
      }
    }, {
      key: "extDBs",
      get: function get() {
        return this._extDBs;
      }
    }, {
      key: "extTFA",
      get: function get() {
        return this._extTFA;
      }
    }], [{
      key: "getInstance",
      value: function getInstance(gl) {
        return new GLExtentionsManager(gl);
      }
    }]);
    return GLExtentionsManager;
  })();

  GLExtentionsManager._instance = null;

  var AbstractLight = (function (_Element) {
    babelHelpers.inherits(AbstractLight, _Element);

    function AbstractLight(canvas) {
      babelHelpers.classCallCheck(this, AbstractLight);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AbstractLight).call(this, canvas));

      if (_this.constructor === AbstractLight) {
        throw new TypeError("Cannot construct AbstractLight instances directly.");
      }

      _this._gl = GLContext.getInstance(canvas).gl;
      _this._name = "";
      return _this;
    }

    return AbstractLight;
  })(Element);

  var DirectionalLight = (function (_AbstractLight) {
    babelHelpers.inherits(DirectionalLight, _AbstractLight);

    function DirectionalLight(intensity, direction, canvas) {
      babelHelpers.classCallCheck(this, DirectionalLight);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalLight).call(this, canvas));

      _this._gl = GLContext.getInstance(canvas).gl;
      _this._name = "";
      _this._intensity = intensity;
      _this._direction = direction;
      return _this;
    }

    babelHelpers.createClass(DirectionalLight, [{
      key: 'intensity',
      set: function set(vec) {
        this._intensity = vec;
      },
      get: function get() {
        return this._intensity;
      }
    }, {
      key: 'direction',
      set: function set(vec) {
        this._direction = vec;
      },
      get: function get() {
        return this._direction;
      }
    }]);
    return DirectionalLight;
  })(AbstractLight);

  GLBoost$1["DirectionalLight"] = DirectionalLight;

  var PointLight = (function (_AbstractLight) {
    babelHelpers.inherits(PointLight, _AbstractLight);

    function PointLight(intensity, canvas) {
      babelHelpers.classCallCheck(this, PointLight);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PointLight).call(this, canvas));

      _this._gl = GLContext.getInstance(canvas).gl;
      _this._name = "";
      _this._intensity = intensity;
      return _this;
    }

    babelHelpers.createClass(PointLight, [{
      key: 'intensity',
      set: function set(vec) {
        this._intensity = vec;
      },
      get: function get() {
        return this._intensity;
      }
    }]);
    return PointLight;
  })(AbstractLight);

  GLBoost$1["PointLight"] = PointLight;

  var Hash = (function () {
    function Hash() {
      babelHelpers.classCallCheck(this, Hash);
    }

    babelHelpers.createClass(Hash, null, [{
      key: "toCRC32",
      value: function toCRC32(str) {
        var crc = 0,
            x = 0,
            y = 0;
        var table = Hash._crc32table;

        crc = crc ^ -1;
        for (var i = 0, iTop = str.length; i < iTop; ++i) {
          y = (crc ^ str.charCodeAt(i)) & 0xff;
          x = "0x" + table[y];
          crc = crc >>> 8 ^ x;
        }

        return (crc ^ -1) >>> 0;
      }
    }]);
    return Hash;
  })();

  Hash._crc32table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(' ');

  var Shader = (function () {
    function Shader(canvas) {
      babelHelpers.classCallCheck(this, Shader);

      if (typeof canvas === 'string') {
        var canvas = window.document.querySelector(canvas);
      }

      this._gl = GLContext.getInstance(canvas).gl;

      this._dirty = true;
    }

    babelHelpers.createClass(Shader, [{
      key: '_getVertexShaderString',
      value: function _getVertexShaderString(gl, functions, existCamera_f, lights) {
        var _this = this;

        var f = functions;
        var shaderText = '';

        var in_ = Shader._in_onVert(gl);
        var out_ = Shader._out_onVert(gl);

        shaderText += Shader._glslVer(gl);
        shaderText += 'precision highp float;\n';

        var foundExclusive = false;

        /// define variables
        // start defining variables. first, BasicShader, then, sub class Shader, ...
        shaderText += this.VSDefine(in_, out_, f, lights);
        // and define variables as mixin shaders
        this._classNamesOfVSDefine.forEach(function (className) {
          var method = _this['VSDefine_' + className];
          if (method) {
            shaderText += method.bind(_this, in_, out_, f, lights)();
          }
        });

        // Uniform modelViewProjectionMatrix
        if (existCamera_f) {
          shaderText += 'uniform mat4 modelViewProjectionMatrix;\n';
        }

        // begin of main function
        shaderText += 'void main(void) {\n';

        /// Transform
        // start transforming. first, BasicShader, then, sub class Shader, ...
        shaderText += this.VSTransform(existCamera_f, f, lights);
        // and transform as mixin Shaders
        this._classNamesOfVSTransform.forEach(function (className) {
          var method = _this['VSTransform_' + className];
          if (method) {
            shaderText += method.bind(_this, existCamera_f, f, lights)();
          }
        });

        /// Shading
        // start shading. first, BasicShader, then, sub class Shader, ...
        shaderText += this.VSShading(f);
        // and shade as mixin Shaders
        this._classNamesOfVSShade.forEach(function (className) {
          var method = _this['VSShade_' + className];
          if (method) {
            shaderText += method.bind(_this, existCamera_f, f)();
          }
        });

        // end of main function

        shaderText += '}\n';

        return shaderText;
      }
    }, {
      key: '_getFragmentShaderString',
      value: function _getFragmentShaderString(gl, functions, lights) {
        var _this2 = this;

        var f = functions;
        var shaderText = '';

        var in_ = Shader._in_onFrag(gl);

        shaderText += Shader._glslVer(gl);
        shaderText += 'precision mediump float;\n';
        shaderText += Shader._set_outColor_onFrag(gl);

        var foundExclusive = false;

        /// define variables
        // start defining variables. first, BasicShader, then, sub class Shader, ...
        shaderText += this.FSDefine(in_, f, lights);
        // and define variables as mixin shaders
        this._classNamesOfFSDefine.forEach(function (className) {
          var method = _this2['FSDefine_' + className];
          if (method) {
            shaderText += method.bind(_this2, in_, f, lights)();
          }
        });

        // begin of main function
        shaderText += 'void main(void) {\n';

        /// Shading
        // start shading. first, BasicShader, then, sub class Shader, ...
        shaderText += this.FSShading(f, gl, lights);
        // and shade as mixin Shaders
        this._classNamesOfFSShade.forEach(function (className) {
          var method = _this2['FSShade_' + className];
          if (method) {
            shaderText += method.bind(_this2, f, gl, lights)();
          }
        });

        // end of main function
        shaderText += Shader._set_glFragColor_inGLVer1(gl);
        shaderText += '}\n';

        return shaderText;
      }
    }, {
      key: 'VSDefine',
      value: function VSDefine(in_, out_, f) {
        var shaderText = in_ + ' vec3 aVertex_position;\n';
        return shaderText;
      }
    }, {
      key: 'VSTransform',
      value: function VSTransform(existCamera_f, f) {
        var shaderText = '';
        if (existCamera_f) {
          shaderText += '  gl_Position = modelViewProjectionMatrix * vec4(aVertex_position, 1.0);\n';
        } else {
          shaderText += '  gl_Position = vec4(aVertex_position, 1.0);\n';
        }
        return shaderText;
      }
    }, {
      key: 'VSShading',
      value: function VSShading() {
        return '';
      }
    }, {
      key: 'FSDefine',
      value: function FSDefine(in_, f) {
        var shaderText = in_ + ' vec3 aVertex_position;\n';
        return shaderText;
      }
    }, {
      key: 'FSShading',
      value: function FSShading(f, gl) {
        var shaderText = 'rt1 = vec4(1.0, 1.0, 1.0, 1.0);\n';
        return shaderText;
      }
    }, {
      key: '_prepareAssetsForShaders',
      value: function _prepareAssetsForShaders(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {
        var _this3 = this;

        var vertexAttribsAsResult = [];
        var position = this.prepare(gl, shaderProgram, vertexAttribs, existCamera_f, lights);
        vertexAttribsAsResult.push(position);
        // and shade as mixin Prepare Functions
        this._classNamesOfPrepare.forEach(function (className) {
          var method = _this3['prepare_' + className];
          if (method) {
            var verAttirbs = method.bind(_this3, gl, shaderProgram, vertexAttribs, existCamera_f, lights)();
            vertexAttribsAsResult = vertexAttribsAsResult.concat(verAttirbs);
          }
        });

        return vertexAttribsAsResult;
      }
    }, {
      key: 'prepare',
      value: function prepare(gl, shaderProgram, vertexAttribs, existCamera_f) {
        shaderProgram['vertexAttribute_position'] = gl.getAttribLocation(shaderProgram, 'aVertex_position');
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_position']);

        if (existCamera_f) {
          shaderProgram.modelViewProjectionMatrix = gl.getUniformLocation(shaderProgram, 'modelViewProjectionMatrix');
        }

        return 'position';
      }
    }, {
      key: 'setUniforms',
      value: function setUniforms() {}
    }, {
      key: '_getShader',
      value: function _getShader(gl, theSource, type) {
        var shader;

        if (type == "x-shader/x-fragment") {
          shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (type == "x-shader/x-vertex") {
          shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
          // Unknown shader type
          return null;
        }

        gl.shaderSource(shader, theSource);

        // Compile the shader program
        gl.compileShader(shader);

        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
          return null;
        }

        return shader;
      }
    }, {
      key: '_initShaders',
      value: function _initShaders(gl, vertexShaderStr, fragmentShaderStr) {
        console.log("Vertex Shader:");
        console.log(vertexShaderStr);
        console.log("Fragment Shader:");
        console.log(fragmentShaderStr);

        var vertexShader = this._getShader(gl, vertexShaderStr, 'x-shader/x-vertex');
        var fragmentShader = this._getShader(gl, fragmentShaderStr, 'x-shader/x-fragment');

        // Create the shader program
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert("Unable to initialize the shader program.");
        }

        gl.useProgram(shaderProgram);

        return shaderProgram;
      }
    }, {
      key: 'getShaderProgram',
      value: function getShaderProgram(vertexAttribs, existCamera_f, lights) {
        var gl = this._gl;

        lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);

        var vertexShaderText = this._getVertexShaderString(gl, vertexAttribs, existCamera_f, lights);
        var fragmentShaderText = this._getFragmentShaderString(gl, vertexAttribs, lights);

        // lookup shaderHashTable
        var baseText = vertexShaderText + '\n###SPLIT###\n' + fragmentShaderText;
        var hash = Hash.toCRC32(baseText);
        if (!Shader._shaderHashTable[gl._canvas.id]) {
          Shader._shaderHashTable[gl._canvas.id] = {};
        }
        var programToReturn = null;
        var hashTable = Shader._shaderHashTable[gl._canvas.id];
        if (hash in hashTable) {
          if (hashTable[hash].code === baseText) {
            programToReturn = hashTable[hash].program;
          } else {
            for (var i = 0; i < hashTable[hash].collisionN; i++) {
              if (hashTable[hash + '_' + i].code === baseText) {
                programToReturn = hashTable[hash + '_' + i].program;
                break;
              }
            }
            hashTable[hash].collisionN++;
          }
        }

        if (programToReturn === null) {
          // if the current shader codes is not in shaderHashTable, create GLSL Shader Program.
          programToReturn = this._initShaders(gl, vertexShaderText, fragmentShaderText);

          // register it to shaderHashTable.
          var indexStr = null;
          if (typeof hashTable[hash] !== "undefined" && hashTable[hash].collisionN > 0) {
            indexStr = hash + '_' + hashTable[hash].collisionN;
          } else {
            indexStr = hash;
          }
          hashTable[indexStr] = { code: baseText, program: programToReturn, collisionN: 0 };
          Shader._shaderHashTable[gl._canvas.id] = hashTable;
        } else {
          //gl.useProgram(programToReturn);
        }
        programToReturn.optimizedVertexAttribs = this._prepareAssetsForShaders(gl, programToReturn, vertexAttribs, existCamera_f, lights);

        return programToReturn;
      }
    }, {
      key: 'dirty',
      get: function get() {
        return this._dirty;
      },
      set: function set(flg) {
        this._dirty = flg;
      }
    }], [{
      key: 'initMixinMethodArray',
      value: function initMixinMethodArray() {
        this.prototype._classNamesOfVSDefine = this.prototype._classNamesOfVSDefine ? this.prototype._classNamesOfVSDefine : [];
        this.prototype._classNamesOfVSTransform = this.prototype._classNamesOfVSTransform ? this.prototype._classNamesOfVSTransform : [];
        this.prototype._classNamesOfVSShade = this.prototype._classNamesOfVSShade ? this.prototype._classNamesOfVSShade : [];

        this.prototype._classNamesOfFSDefine = this.prototype._classNamesOfFSDefine ? this.prototype._classNamesOfFSDefine : [];
        this.prototype._classNamesOfFSShade = this.prototype._classNamesOfFSShade ? this.prototype._classNamesOfFSShade : [];

        this.prototype._classNamesOfPrepare = this.prototype._classNamesOfPrepare ? this.prototype._classNamesOfPrepare : [];
      }
    }, {
      key: 'mixin',
      value: function mixin(source) {

        // create mixin method Array
        this.initMixinMethodArray();

        // register mixin methods to Array
        if (this.prototype._classNamesOfVSDefine.indexOf(source.name) === -1) {
          this.prototype._classNamesOfVSDefine.push(source.name);
        }
        if (this.prototype._classNamesOfVSTransform.indexOf(source.name) === -1) {
          this.prototype._classNamesOfVSTransform.push(source.name);
        }
        if (this.prototype._classNamesOfVSShade.indexOf(source.name) === -1) {
          this.prototype._classNamesOfVSShade.push(source.name);
        }
        if (this.prototype._classNamesOfFSDefine.indexOf(source.name) === -1) {
          this.prototype._classNamesOfFSDefine.push(source.name);
        }
        if (this.prototype._classNamesOfFSShade.indexOf(source.name) === -1) {
          this.prototype._classNamesOfFSShade.push(source.name);
        }
        if (this.prototype._classNamesOfPrepare.indexOf(source.name) === -1) {
          this.prototype._classNamesOfPrepare.push(source.name);
        }

        // mixin
        var target = this.prototype;source = source.prototype;
        Object.getOwnPropertyNames(source).forEach(function (name) {
          if (name !== "constructor") Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
        });
      }
    }, {
      key: 'swapMixin',
      value: function swapMixin(current, newone) {
        // register mixin methods to Array
        var matchIdx = this.prototype._classNamesOfVSDefine.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSDefine[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfVSTransform.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSTransform[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfVSShade.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSShade[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfFSDefine.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSDefine[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfFSShade.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSShade[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfPrepare.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfPrepare[matchIdx] = newone.name;
        }

        // mixin
        var target = this.prototype;newone = newone.prototype;
        Object.getOwnPropertyNames(newone).forEach(function (name) {
          if (name !== "constructor") Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(newone, name));
        });
      }
    }, {
      key: 'removeMixin',
      value: function removeMixin(source) {
        var matchIdx = this.prototype._classNamesOfVSDefine.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSDefine.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfVSTransform.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSTransform.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfVSShade.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSShade.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfFSDefine.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSDefine.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfFSShade.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSShade.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfPrepare.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfPrepare.splice(matchIdx, 1);
        }
      }
    }, {
      key: 'getDefaultPointLightIfNotExsist',
      value: function getDefaultPointLightIfNotExsist(gl, lights) {
        if (lights.length === 0) {
          return [new PointLight(GLBoost.DEFAULT_POINTLIGHT_INTENSITY, gl._canvas)];
        } else {
          return lights;
        }
      }
    }, {
      key: '_exist',
      value: function _exist(functions, attribute) {
        return functions.indexOf(attribute) >= 0;
      }
    }, {
      key: 'isThisGLVersion_2',
      value: function isThisGLVersion_2(gl) {
        if (typeof WebGL2RenderingContext === "undefined") {
          return false;
        }
        return gl instanceof WebGL2RenderingContext;
      }
    }, {
      key: '_glslVer',
      value: function _glslVer(gl) {
        return GLBoost.isThisGLVersion_2(gl) ? '#version 300 es\n' : '';
      }
    }, {
      key: '_in_onVert',
      value: function _in_onVert(gl) {
        return GLBoost.isThisGLVersion_2(gl) ? 'in' : 'attribute';
      }
    }, {
      key: '_out_onVert',
      value: function _out_onVert(gl) {
        return GLBoost.isThisGLVersion_2(gl) ? 'out' : 'varying';
      }
    }, {
      key: '_in_onFrag',
      value: function _in_onFrag(gl) {
        return GLBoost.isThisGLVersion_2(gl) ? 'in' : 'varying';
      }
    }, {
      key: '_texture_func',
      value: function _texture_func(gl) {
        return GLBoost.isThisGLVersion_2(gl) ? 'texture' : 'texture2D';
      }
    }, {
      key: '_set_outColor_onFrag',
      value: function _set_outColor_onFrag(gl) {
        return GLBoost.isThisGLVersion_2(gl) ? 'layout(location = 0) out vec4 rt1;' : 'vec4 rt1;';
      }
    }, {
      key: '_set_glFragColor_inGLVer1',
      value: function _set_glFragColor_inGLVer1(gl) {
        return !GLBoost.isThisGLVersion_2(gl) ? '  gl_FragColor = rt1;\n' : '';
      }
    }]);
    return Shader;
  })();

  Shader._instances = new Object();
  Shader._shaderHashTable = {};

  var SimpleShaderSource = (function () {
    function SimpleShaderSource() {
      babelHelpers.classCallCheck(this, SimpleShaderSource);
    }

    babelHelpers.createClass(SimpleShaderSource, [{
      key: 'VSDefine_SimpleShaderSource',
      value: function VSDefine_SimpleShaderSource(in_, out_, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.COLOR)) {
          shaderText += in_ + ' vec4 aVertex_color;\n';
          shaderText += out_ + ' vec4 color;\n';
        }
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += in_ + ' vec2 aVertex_texcoord;\n';
          shaderText += out_ + ' vec2 texcoord;\n';
        }
        return shaderText;
      }
    }, {
      key: 'VSTransform_SimpleShaderSource',
      value: function VSTransform_SimpleShaderSource(existCamera_f, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.COLOR)) {
          shaderText += '  color = aVertex_color;\n';
        }
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += '  texcoord = aVertex_texcoord;\n';
        }
        return shaderText;
      }
    }, {
      key: 'FSDefine_SimpleShaderSource',
      value: function FSDefine_SimpleShaderSource(in_, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.COLOR)) {
          shaderText += in_ + ' vec4 color;\n';
        }
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += in_ + ' vec2 texcoord;\n\n';
          shaderText += 'uniform sampler2D uTexture;\n';
        }
        shaderText += 'uniform vec4 materialBaseColor;\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_SimpleShaderSource',
      value: function FSShade_SimpleShaderSource(f, gl) {
        var shaderText = '';
        var textureFunc = Shader._texture_func(gl);
        if (Shader._exist(f, GLBoost.COLOR)) {
          shaderText += '  rt1 = color;\n';
        }
        shaderText += '    rt1 *= materialBaseColor;\n';
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += '  rt1 *= ' + textureFunc + '(uTexture, texcoord);\n';
        }
        //shaderText += '    rt1 = vec4(1.0, 0.0, 0.0, 1.0);\n';
        return shaderText;
      }
    }, {
      key: 'prepare_SimpleShaderSource',
      value: function prepare_SimpleShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (attribName === GLBoost.COLOR || attribName === GLBoost.TEXCOORD) {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
            vertexAttribsAsResult.push(attribName);
          }
        });

        shaderProgram.materialBaseColor = gl.getUniformLocation(shaderProgram, 'materialBaseColor');

        if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
          shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
          // サンプラーにテクスチャユニット０を指定する
          gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
        }

        return vertexAttribsAsResult;
      }
    }]);
    return SimpleShaderSource;
  })();

  var SimpleShader = (function (_Shader) {
    babelHelpers.inherits(SimpleShader, _Shader);

    function SimpleShader(canvas) {
      babelHelpers.classCallCheck(this, SimpleShader);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SimpleShader).call(this, canvas));

      SimpleShader.mixin(SimpleShaderSource);
      return _this;
    }

    babelHelpers.createClass(SimpleShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, material) {

        var baseColor = material.baseColor;
        gl.uniform4f(glslProgram.materialBaseColor, baseColor.x, baseColor.y, baseColor.z, baseColor.w);
      }
    }]);
    return SimpleShader;
  })(Shader);

  GLBoost["SimpleShader"] = SimpleShader;

  var ClassicMaterial = (function () {
    function ClassicMaterial(canvas) {
      babelHelpers.classCallCheck(this, ClassicMaterial);

      this._diffuseTexture = null;
      this._gl = GLContext.getInstance(canvas).gl;
      this._baseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
      this._diffuseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
      this._specularColor = new Vector4(1.0, 1.0, 1.0, 1.0);
      this._ambientColor = new Vector4(0.0, 0.0, 0.0, 1.0);
      this._name = "";
      this._shader = new SimpleShader(canvas);
      this._vertexNofGeometries = {};

      if (this.constructor === ClassicMaterial) {
        ClassicMaterial._instanceCount = typeof ClassicMaterial._instanceCount === "undefined" ? 0 : ClassicMaterial._instanceCount + 1;
        this._instanceName = ClassicMaterial.name + '_' + ClassicMaterial._instanceCount;
      }
    }

    babelHelpers.createClass(ClassicMaterial, [{
      key: 'setVertexN',

      /*
      set faceN(num) {
        this._faceN = num;
      }
       get faceN() {
        return this._faceN;
      }
      */

      value: function setVertexN(geom, num) {
        this._vertexNofGeometries[geom] = num;
      }
    }, {
      key: 'getVertexN',
      value: function getVertexN(geom) {
        return typeof this._vertexNofGeometries[geom] === "undefined" ? 0 : this._vertexNofGeometries[geom];
      }
    }, {
      key: 'setUp',
      value: function setUp() {
        var gl = this._gl;
        var result = false;
        if (this._diffuseTexture) {
          // テクスチャユニット０にテクスチャオブジェクトをバインドする
          gl.activeTexture(gl.TEXTURE0);
          result = this._diffuseTexture.setUp();
        } else {
          gl.bindTexture(gl.TEXTURE_2D, null);
          result = true;
        }

        return result;
      }
    }, {
      key: 'tearDown',
      value: function tearDown() {
        if (this._diffuseTexture) {
          this._diffuseTexture.tearDown();
        }
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this._instanceName;
      }
    }, {
      key: 'shader',
      set: function set(shader) {
        this._shader = shader;
      },
      get: function get() {
        return this._shader;
      }
    }, {
      key: 'diffuseTexture',
      set: function set(tex) {
        this._diffuseTexture = tex;
      },
      get: function get() {
        return this._diffuseTexture;
      }
    }, {
      key: 'baseColor',
      set: function set(vec) {
        this._baseColor = vec;
      },
      get: function get() {
        return this._baseColor;
      }
    }, {
      key: 'diffuseColor',
      set: function set(vec) {
        this._diffuseColor = vec;
      },
      get: function get() {
        return this._diffuseColor;
      }
    }, {
      key: 'specularColor',
      set: function set(vec) {
        this._specularColor = vec;
      },
      get: function get() {
        return this._specularColor;
      }
    }, {
      key: 'ambientColor',
      set: function set(vec) {
        this._ambientColor = vec;
      },
      get: function get() {
        return this._ambientColor;
      }
    }, {
      key: 'name',
      set: function set(name) {
        this._name = name;
      },
      get: function get() {
        return this._name;
      }
    }]);
    return ClassicMaterial;
  })();

  GLBoost$1["ClassicMaterial"] = ClassicMaterial;

  var Geometry = (function () {
    function Geometry(canvas) {
      babelHelpers.classCallCheck(this, Geometry);

      this._gl = GLContext.getInstance(canvas).gl;
      this._canvas = canvas;
      this._materials = [];
      this._vertexN = 0;
      this._glslProgram = null;
      this._vertices = null;
      this._vertexAttribComponentNDic = {};
      //this._shader_for_non_material = new SimpleShader(this._canvas);
      this._defaultMaterial = new ClassicMaterial(this._canvas);

      if (this.constructor === Geometry) {
        Geometry._instanceCount = typeof Geometry._instanceCount === "undefined" ? 0 : Geometry._instanceCount + 1;
        this._instanceName = Geometry.name + '_' + Geometry._instanceCount;
      }
    }

    /**
     * データとして利用する頂点属性を判断し、そのリストを返す
     * 不必要な頂点属性のデータは無視する。
     */

    babelHelpers.createClass(Geometry, [{
      key: '_decideNeededVertexAttribs',
      value: function _decideNeededVertexAttribs(vertices, material) {
        if (material) {
          var _material = material;
        } else {
          var _material = this._materials[0];
        }

        var attribNameArray = [];
        for (var attribName in vertices) {
          if (attribName === GLBoost$1.TEXCOORD) {
            // texcoordの場合は、テクスチャ付きのマテリアルをちゃんと持っているときに限り、'texcoord'が有効となる
            if (_material !== void 0 && _material.diffuseTexture !== null) {
              attribNameArray.push(attribName);
            } else {
              //delete vertices[GLBoost.TEXCOORD];
            }
          } else {
              if (attribName !== 'indices') {
                // && attribName !== 'normal') {
                attribNameArray.push(attribName);
              }
            }
        }

        return attribNameArray;
      }

      /**
       * インデックス以外の全ての頂点属性のリストを返す
       */

    }, {
      key: '_allVertexAttribs',
      value: function _allVertexAttribs(vertices) {
        var attribNameArray = [];
        for (var attribName in vertices) {
          if (attribName !== 'indices') {
            // && attribName !== 'normal') {
            attribNameArray.push(attribName);
          }
        }

        return attribNameArray;
      }

      /*
      _getSheder(result, existCamera_f, lights) {
        return this._shader_for_non_material.getShaderProgram(result, existCamera_f, lights);
      }
      */

    }, {
      key: 'setVerticesData',
      value: function setVerticesData(vertices, primitiveType) {
        this._vertices = vertices;
        this._primitiveType = primitiveType ? primitiveType : GLBoost$1.TRIANGLES;
      }
    }, {
      key: 'setUpVertexAttribs',
      value: function setUpVertexAttribs(gl, glslProgram, _allVertexAttribs) {
        var _this = this;

        var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

        var stride = 0;
        _allVertexAttribs.forEach(function (attribName) {
          stride += _this._vertexAttribComponentNDic[attribName] * 4;
        });

        // 頂点レイアウト設定
        var offset = 0;
        _allVertexAttribs.forEach(function (attribName) {
          if (optimizedVertexAttribs.indexOf(attribName) != -1) {
            gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
            gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName], _this._vertexAttribComponentNDic[attribName], gl.FLOAT, gl.FALSE, stride, offset);
          }
          offset += _this._vertexAttribComponentNDic[attribName] * 4;
        });
      }
    }, {
      key: 'prepareGLSLProgramAndSetVertexNtoMaterial',
      value: function prepareGLSLProgramAndSetVertexNtoMaterial(material, existCamera_f, lights) {
        var _this2 = this;

        var gl = this._gl;
        var vertices = this._vertices;

        var glem = GLExtentionsManager.getInstance(gl);
        var _optimizedVertexAttribs = this._decideNeededVertexAttribs(vertices, material);
        glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);
        gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);

        var allVertexAttribs = this._allVertexAttribs(vertices);
        allVertexAttribs.forEach(function (attribName) {
          _this2._vertexAttribComponentNDic[attribName] = vertices[attribName][0].z === void 0 ? 2 : vertices[attribName][0].w === void 0 ? 3 : 4;
        });

        var glslProgram = material.shader.getShaderProgram(_optimizedVertexAttribs, existCamera_f, lights);
        this.setUpVertexAttribs(gl, glslProgram, allVertexAttribs);

        glem.bindVertexArray(gl, null);

        var materials = [material];
        materials = this._setVertexNtoSingleMaterial(materials);
        materials[0].glslProgram = glslProgram;

        return materials[0];
      }
    }, {
      key: '_setVertexNtoSingleMaterial',
      value: function _setVertexNtoSingleMaterial(materials) {
        // if this mesh has only one material...
        var vertices = this._vertices;
        if (materials && materials.length === 1 && materials[0].getVertexN(this) === 0) {
          if (vertices.indices && vertices.indices.length > 0) {
            materials[0].setVertexN(this, vertices.indices[0].length);
          } else {
            materials[0].setVertexN(this, this._vertexN);
          }
        }

        return materials;
      }
    }, {
      key: 'prepareForRender',
      value: function prepareForRender(existCamera_f, lights, meshMaterial) {

        var vertices = this._vertices;
        var gl = this._gl;

        var glem = GLExtentionsManager.getInstance(gl);

        var optimizedVertexAttribs = null;

        this._vertexN = vertices.position.length;

        // create VAO
        if (Geometry._vaoDic[this.toString()]) {
          return;
        }
        var vao = glem.createVertexArray(gl);
        glem.bindVertexArray(gl, vao);
        Geometry._vaoDic[this.toString()] = vao;

        // create VBO
        if (Geometry._vboDic[this.toString()]) {
          return;
        }
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        Geometry._vboDic[this.toString()] = vbo;

        var materials = this._materials;

        if (materials.length > 0) {
          for (var i = 0; i < materials.length; i++) {
            // GLSLプログラム作成。
            var material = this.prepareGLSLProgramAndSetVertexNtoMaterial(materials[i], existCamera_f, lights);
            materials[i].glslProgram = material.glslProgram;
            optimizedVertexAttribs = materials[i].glslProgram.optimizedVertexAttribs;
          }
        } else if (!meshMaterial) {
          var material = this.prepareGLSLProgramAndSetVertexNtoMaterial(this._defaultMaterial, existCamera_f, lights);
          this._glslProgram = material.glslProgram;
          optimizedVertexAttribs = material.glslProgram.optimizedVertexAttribs;
        }

        var vertexData = [];
        var allVertexAttribs = this._allVertexAttribs(vertices);
        vertices.position.forEach(function (elem, index, array) {
          allVertexAttribs.forEach(function (attribName) {
            var element = vertices[attribName][index];
            vertexData.push(element.x);
            vertexData.push(element.y);
            if (element.z !== void 0) {
              vertexData.push(element.z);
            }
            if (element.w !== void 0) {
              vertexData.push(element.w);
            }
          });
        });

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        //this._ibo = [];
        //this._indicesNArray = [];
        Geometry._iboArrayDic[this.toString()] = [];
        Geometry._idxNArrayDic[this.toString()] = [];
        if (vertices.indices) {
          // create Index Buffer
          for (var i = 0; i < vertices.indices.length; i++) {
            //this._ibo[i] = gl.createBuffer();
            //this._indicesNArray[i] = vertices.indices[i].length;
            var ibo = gl.createBuffer();
            //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo[i] );
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices.indices[i]), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            Geometry._iboArrayDic[this.toString()][i] = ibo;
            Geometry._idxNArrayDic[this.toString()][i] = vertices.indices[i].length;
          }
        }
        glem.bindVertexArray(gl, null);

        return true;
      }
    }, {
      key: 'draw',
      value: function draw(lights, camera, mesh) {
        var gl = this._gl;
        var glem = GLExtentionsManager.getInstance(gl);

        if (this._materials.length > 0) {
          var materials = this._materials;
        } else if (mesh.material) {
          var materials = [mesh.material];
        } else {
          var materials = [];
        }

        var thisName = this.toString();

        var isVAOBound = false;
        if (Geometry._lastGeometry !== thisName) {
          isVAOBound = glem.bindVertexArray(gl, Geometry._vaoDic[thisName]);
        }

        if (materials.length > 0) {
          for (var i = 0; i < materials.length; i++) {
            var materialName = materials[i].toString();
            if (materialName !== Geometry._lastMaterial) {
              this._glslProgram = materials[i].glslProgram;
              gl.useProgram(this._glslProgram);
            }
            var glslProgram = this._glslProgram;

            if (!isVAOBound) {
              if (Geometry._lastGeometry !== thisName) {
                gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[thisName]);
                this.setUpVertexAttribs(gl, glslProgram, this._allVertexAttribs(this._vertices));
              }
            }

            if (camera) {
              var viewMatrix = camera.lookAtRHMatrix();
              var projectionMatrix = camera.perspectiveRHMatrix();
              var mvp_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(mesh.transformMatrixAccumulatedAncestry);
              gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.transpose().flatten()));
            }

            if (glslProgram['lightPosition_0']) {
              lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);
              if (glslProgram['viewPosition']) {
                if (camera) {
                  var cameraPos = new Vector4(0, 0, 0, 1);
                  cameraPos = camera.transformMatrixAccumulatedAncestry.multiplyVector(cameraPos);
                  var cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(cameraPos.x, cameraPos.y, cameraPos.z, 1));
                } else {
                  var cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(0, 0, 1, 1));
                }
                gl.uniform3f(glslProgram['viewPosition'], cameraPosInLocalCoord.x, cameraPosInLocalCoord.y, cameraPosInLocalCoord.z);
              }

              for (var j = 0; j < lights.length; j++) {
                if (glslProgram['lightPosition_' + j] && glslProgram['lightDiffuse_' + j]) {
                  var lightVec = null;
                  var isPointLight = -9999;
                  if (lights[j] instanceof PointLight) {
                    lightVec = new Vector4(0, 0, 0, 1);
                    lightVec = lights[j].transformMatrixAccumulatedAncestry.multiplyVector(lightVec);
                    isPointLight = 1.0;
                  } else if (lights[j] instanceof DirectionalLight) {
                    lightVec = new Vector4(-lights[j].direction.x, -lights[j].direction.y, -lights[j].direction.z, 1);
                    lightVec = lights[j].rotateMatrixAccumulatedAncestry.multiplyVector(lightVec);
                    lightVec.w = 0.0;
                    isPointLight = 0.0;
                  }

                  var lightVecInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(lightVec);
                  gl.uniform4f(glslProgram['lightPosition_' + j], lightVecInLocalCoord.x, lightVecInLocalCoord.y, lightVecInLocalCoord.z, isPointLight);

                  gl.uniform4f(glslProgram['lightDiffuse_' + j], lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0);
                }
              }
            }

            var isMaterialSetupDone = true;

            if (materials[i].shader.dirty || materialName !== Geometry._lastMaterial) {
              var needTobeStillDirty = materials[i].shader.setUniforms(gl, glslProgram, materials[i], camera, mesh);
              materials[i].shader.dirty = needTobeStillDirty ? true : false;
            }

            if (materialName !== Geometry._lastMaterial) {
              if (materials[i]) {
                isMaterialSetupDone = materials[i].setUp();
              }
            }

            //if (this._ibo.length > 0) {
            if (Geometry._iboArrayDic[thisName].length > 0) {
              //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo[i] );
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[thisName][i]);
              gl.drawElements(gl[this._primitiveType], materials[i].getVertexN(this), gl.UNSIGNED_SHORT, 0);
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            } else {
              gl.drawArrays(gl[this._primitiveType], 0, this._vertexN);
            }

            /*
            if (materials[i].toString() !== Geometry._lastMaterial) {
              if (materials[i]) {
                materials[i].tearDown();
              }
            }
            */

            Geometry._lastMaterial = isMaterialSetupDone ? materialName : null;
          }
        } else {
          var glslProgram = this._glslProgram;
          gl.useProgram(glslProgram);

          if (!isVAOBound) {
            if (Geometry._lastGeometry !== thisName) {
              gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[thisName]);
              this.setUpVertexAttribs(gl, glslProgram, this._allVertexAttribs(this._vertices));
            }
          }

          if (camera) {
            var viewMatrix = camera.lookAtRHMatrix();
            var projectionMatrix = camera.perspectiveRHMatrix();
            var mvp_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(mesh.transformMatrixAccumulatedAncestry);
            gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.transpose().flatten()));
          }

          if (typeof this._defaultMaterial.shader.setUniforms !== "undefined") {
            this._defaultMaterial.shader.setUniforms(gl, glslProgram, this._defaultMaterial, camera, mesh);
          }

          //if (this._ibo.length > 0) {
          if (Geometry._iboArrayDic[thisName].length > 0) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[thisName][0]);
            gl.drawElements(gl[this._primitiveType], Geometry._idxNArrayDic[thisName][0], gl.UNSIGNED_SHORT, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
          } else {
            gl.drawArrays(gl[this._primitiveType], 0, this._vertexN);
          }

          Geometry._lastMaterial = null;
        }

        //glem.bindVertexArray(gl, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        Geometry._lastGeometry = thisName;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this._instanceName;
      }
    }, {
      key: 'materials',
      set: function set(materials) {
        this._materials = materials;
      }
    }], [{
      key: 'clearMaterialCache',
      value: function clearMaterialCache() {
        Geometry._lastMaterial = null;
      }
    }]);
    return Geometry;
  })();

  Geometry._vaoDic = {};
  Geometry._vboDic = {};
  Geometry._iboArrayDic = {};
  Geometry._idxNArrayDic = {};
  Geometry._lastGeometry = null;
  Geometry._lastMaterial = null;

  GLBoost$1["Geometry"] = Geometry;

  var Camera = (function (_Element) {
    babelHelpers.inherits(Camera, _Element);

    function Camera(lookat, perspective) {
      babelHelpers.classCallCheck(this, Camera);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Camera).call(this));

      _this._translate = lookat.eye;
      _this._center = lookat.center;
      _this._up = lookat.up;

      _this._fovy = perspective.fovy;
      _this._aspect = perspective.aspect;
      _this._zNear = perspective.zNear;
      _this._zFar = perspective.zFar;

      _this.setAsMainCamera();

      _this._dirtyView = true;
      _this._dirtyAsElement = true;
      _this._updateCountAsCameraView = 0;
      _this._dirtyProjection = true;
      _this._updateCountAsCameraProjection = 0;
      return _this;
    }

    babelHelpers.createClass(Camera, [{
      key: '_needUpdateView',
      value: function _needUpdateView() {
        this._dirtyView = true;
        this._updateCountAsCameraView++;
      }
    }, {
      key: '_needUpdateProjection',
      value: function _needUpdateProjection() {
        this._dirtyProjection = true;
        this._updateCountAsCameraProjection++;
      }
    }, {
      key: 'lookAtRHMatrix',
      value: function lookAtRHMatrix() {
        if (this._dirtyView) {
          this._viewMatrix = Camera.lookAtRHMatrix(this._translate, this._center, this._up);
          this._dirtyView = false;
          return this._viewMatrix.clone();
        } else {
          return this._viewMatrix.clone();
        }
      }
    }, {
      key: 'perspectiveRHMatrix',
      value: function perspectiveRHMatrix() {
        if (this._dirtyProjection) {
          this._projectionMatrix = Camera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNear, this._zFar);
          this._dirtyProjection = false;
          return this._projectionMatrix.clone();
        } else {
          return this._projectionMatrix.clone();
        }
      }
    }, {
      key: 'setAsMainCamera',
      value: function setAsMainCamera() {
        Camera._mainCamera = this;
      }
    }, {
      key: 'updateCountAsCameraView',
      get: function get() {
        return this._updateCountAsCameraView;
      }
    }, {
      key: 'updateCountAsCameraProjection',
      get: function get() {
        return this._updateCountAsCameraProjection;
      }
    }, {
      key: 'isMainCamera',
      get: function get() {
        return Camera._mainCamera === this;
      }
    }, {
      key: 'translate',
      set: function set(vec) {
        babelHelpers.set(Object.getPrototypeOf(Camera.prototype), 'translate', vec, this);
        this._needUpdateView();
      }
    }, {
      key: 'eye',
      set: function set(vec) {
        babelHelpers.set(Object.getPrototypeOf(Camera.prototype), 'translate', vec, this);
        this._needUpdateView();
      },
      get: function get() {
        return this._translate;
      }
    }, {
      key: 'center',
      set: function set(vec) {
        if (this._center.isEqual(vec)) {
          return;
        }
        this._center = vec;
        this._needUpdateView();
      },
      get: function get() {
        return this._center;
      }
    }, {
      key: 'up',
      set: function set(vec) {
        if (this._up.isEqual(vec)) {
          return;
        }
        this._up = vec;
        this._needUpdateView();
      },
      get: function get() {
        return this._up;
      }
    }, {
      key: 'fovy',
      set: function set(value) {
        if (this._fovy === value) {
          return;
        }
        this._fovy = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._fovy;
      }
    }, {
      key: 'aspect',
      set: function set(value) {
        if (this._aspect === value) {
          return;
        }
        this._aspect = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._aspect;
      }
    }, {
      key: 'zNear',
      set: function set(value) {
        if (this._zNear === value) {
          return;
        }
        this._zNear = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zNear;
      }
    }, {
      key: 'zFar',
      set: function set(value) {
        if (this._zFar === value) {
          return;
        }
        this._zFar = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zFar;
      }
    }], [{
      key: 'lookAtRHMatrix',
      value: function lookAtRHMatrix(eye, center, up) {

        var f = Vector3.normalize(Vector3.subtract(center, eye));
        var s = Vector3.normalize(Vector3.cross(f, up));
        var u = Vector3.cross(s, f);

        return new Matrix44(s.x, s.y, s.z, -Vector3.dotProduct(s, eye), u.x, u.y, u.z, -Vector3.dotProduct(u, eye), -f.x, -f.y, -f.z, Vector3.dotProduct(f, eye), 0, 0, 0, 1);
      }
    }, {
      key: 'perspectiveRHMatrix',
      value: function perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

        var yscale = 1.0 / Math.tan(0.5 * fovy * Math.PI / 180);
        var xscale = yscale / aspect;

        return new Matrix44(xscale, 0.0, 0.0, 0.0, 0.0, yscale, 0.0, 0.0, 0.0, 0.0, -(zFar + zNear) / (zFar - zNear), -(2.0 * zFar * zNear) / (zFar - zNear), 0.0, 0.0, -1.0, 0.0);
      }
    }]);
    return Camera;
  })(Element);

  Camera._mainCamera = null;

  GLBoost$1["Camera"] = Camera;

  var Renderer = (function () {
    function Renderer(parameters) {
      babelHelpers.classCallCheck(this, Renderer);

      var _canvas = parameters.canvas;
      var _clearColor = parameters.clearColor;

      this._gl = GLContext.getInstance(_canvas).gl;

      var gl = this._gl;

      var setDefaultGLStates = function setDefaultGLStates() {
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.enable(gl.CULL_FACE);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clearColor(_clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha);
        gl.clearDepth(1);
        gl.clearStencil(0);
      };

      setDefaultGLStates();

      this._currentRenderTargetTextures = [];
      this._renderPasses = null;
    }

    babelHelpers.createClass(Renderer, [{
      key: 'draw',
      value: function draw(scene) {
        var _this = this;

        var camera = false;
        var viewMatrix = null;
        var projectionMatrix = null;
        scene.cameras.forEach(function (elm) {
          if (elm.isMainCamera) {
            camera = elm;
          }
        });

        var gl = this._gl;
        var glem = GLExtentionsManager.getInstance(gl);

        var lights = scene.lights;

        // if you didn't setup RenderPasses, all meshes are drawn to the backbuffer of framebuffer (gl.BACK).
        if (this._renderPasses === null) {
          glem.drawBuffers(gl, [gl.BACK]);

          scene.meshes.forEach(function (mesh) {
            mesh.draw(lights, camera);
          });
        } else {
          // if you did setup RenderPasses, drawing meshes are executed for each RenderPass.
          this._renderPasses.forEach(function (renderPass) {

            var meshes = renderPass.meshes;

            if (renderPass.buffersToDraw[0] !== gl.BACK) {
              gl.bindTexture(gl.TEXTURE_2D, null);
              Geometry.clearMaterialCache();
              gl.bindFramebuffer(gl.FRAMEBUFFER, _this._fbo);
            }
            glem.drawBuffers(gl, renderPass.buffersToDraw); // set render target buffers for each RenderPass.

            if (renderPass.clearColor) {
              var color = renderPass.clearColor;
              gl.clearColor(color[0], color[1], color[2], color[3]);
              gl.clear(gl.COLOR_BUFFER_BIT);
            }

            meshes.forEach(function (mesh) {
              mesh.draw(lights, camera);
            });

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            glem.drawBuffers(gl, [gl.BACK]);
          });
        }
      }
    }, {
      key: 'clearCanvas',
      value: function clearCanvas(color_flg, depth_flg, stencil_flg) {

        var gl = this._gl;

        var bufferBits = 0;

        if (color_flg === void 0 || color_flg) bufferBits |= gl.COLOR_BUFFER_BIT;
        if (depth_flg === void 0 || depth_flg) bufferBits |= gl.DEPTH_BUFFER_BIT;
        if (stencil_flg === void 0 || stencil_flg) bufferBits |= gl.STENCIL_BUFFER_BIT;

        gl.clear(bufferBits);
      }
    }, {
      key: 'createTexturesForRenderTarget',
      value: function createTexturesForRenderTarget(width, height, textureNum) {

        var gl = this._gl;

        var glem = GLExtentionsManager.getInstance(gl);

        if (this._fbo) {
          gl.deleteFramebuffers(1, this._fbo);
        }
        // Create FBO
        this._fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
        this._fbo.width = width ? width : gl._canvas.width;
        this._fbo.height = height ? height : gl._canvas.height;

        for (var i = 0; i < textureNum; i++) {
          var texture = new MutableTexture(gl._canvas, this._fbo.width, this._fbo.height);
          this._currentRenderTargetTextures.push(texture);
        }

        // Create RenderBuffer
        var renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._fbo.width, this._fbo.height);

        // Attach Buffers
        this._currentRenderTargetTextures.forEach(function (texture, i) {
          var glTexture = texture.glTextureResource;
          var attachimentId = glem.colorAttachiment(gl, i);
          texture.colorAttachiment = attachimentId;
          gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
        });
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return this._currentRenderTargetTextures;
      }
    }, {
      key: 'createRenderPasses',
      value: function createRenderPasses(number) {
        this._renderPasses = [];
        for (var i = 0; i < number; i++) {
          this._renderPasses.push(new RenderPass(this._gl));
        }

        return this._renderPasses;
      }
    }, {
      key: 'prepareRenderPassesForRender',
      value: function prepareRenderPassesForRender() {
        this._renderPasses.forEach(function (renderPass) {
          renderPass.prepareForRender();
        });
      }
    }, {
      key: 'resize',
      value: function resize(width, height) {
        this._gl._canvas.width = width;
        this._gl._canvas.height = height;

        this._gl.viewport(0, 0, width, height);
      }
    }, {
      key: 'glContext',
      get: function get() {
        return this._gl;
      }
    }]);
    return Renderer;
  })();

  GLBoost$1["Renderer"] = Renderer;

  var Scene = (function (_Element) {
    babelHelpers.inherits(Scene, _Element);

    function Scene() {
      babelHelpers.classCallCheck(this, Scene);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Scene).call(this));

      _this._elements = [];
      _this._meshes = [];
      _this._lights = [];
      _this._cameras = [];
      return _this;
    }

    babelHelpers.createClass(Scene, [{
      key: 'add',
      value: function add(mesh) {
        this._elements.push(mesh);
      }
    }, {
      key: 'prepareForRender',
      value: function prepareForRender() {
        var _this2 = this;

        // カメラが最低１つでも存在しているか確認
        var existCamera_f = false;
        this._elements.forEach(function (elm) {
          if (elm instanceof Camera) {
            existCamera_f = true;
          }
        });

        var collectMeshes = function collectMeshes(elem) {
          if (elem instanceof Group) {
            var children = elem.getChildren();
            var meshes = [];
            children.forEach(function (child) {
              var childMeshes = collectMeshes(child);
              meshes = meshes.concat(childMeshes);
            });
            return meshes;
          } else if (elem instanceof Mesh) {
            return [elem];
          } else {
            return [];
          }
        };

        this._meshes = [];
        this._elements.forEach(function (elm) {
          _this2._meshes = _this2._meshes.concat(collectMeshes(elm));
        });

        var collectLights = function collectLights(elem) {
          if (elem instanceof Group) {
            var children = elem.getChildren();
            var lights = [];
            children.forEach(function (child) {
              var childLights = collectLights(child);
              lights = lights.concat(childLights);
            });
            return lights;
          } else if (elem instanceof AbstractLight) {
            return [elem];
          } else {
            return [];
          }
        };

        this._lights = [];
        this._elements.forEach(function (elm) {
          _this2._lights = _this2._lights.concat(collectLights(elm));
        });

        var existCamera_f = false;
        var collectCameras = function collectCameras(elem) {
          if (elem instanceof Group) {
            var children = elem.getChildren();
            var cameras = [];
            children.forEach(function (child) {
              var childCameras = collectCameras(child);
              cameras = cameras.concat(childCameras);
            });
            return cameras;
          } else if (elem instanceof Camera) {
            existCamera_f = true;
            return [elem];
          } else {
            return [];
          }
        };

        this._cameras = [];
        this._elements.forEach(function (elm) {
          _this2._cameras = _this2._cameras.concat(collectCameras(elm));
        });

        // レンダリングの準備をさせる。
        this._meshes.forEach(function (elm) {
          elm.prepareForRender(existCamera_f, _this2._lights);
        });
      }
    }, {
      key: 'elements',
      get: function get() {
        return this._elements;
      }
    }, {
      key: 'meshes',
      get: function get() {
        return this._meshes;
      }
    }, {
      key: 'lights',
      get: function get() {
        return this._lights;
      }
    }, {
      key: 'cameras',
      get: function get() {
        return this._cameras;
      }
    }]);
    return Scene;
  })(Element);

  GLBoost$1["Scene"] = Scene;

  var Vector2 = function Vector2(x, y) {
    babelHelpers.classCallCheck(this, Vector2);

    this.x = x;
    this.y = y;
  };

  GLBoost$1["Vector2"] = Vector2;

  var Texture = (function (_AbstractTexture) {
    babelHelpers.inherits(Texture, _AbstractTexture);

    function Texture(imageUrl, canvas) {
      babelHelpers.classCallCheck(this, Texture);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Texture).call(this, canvas));

      _this._isTextureReady = false;
      _this._texture = null;

      _this._img = new Image();
      _this._img.crossOrigin = "Anonymous";
      _this._img.onload = function () {
        var gl = _this._gl;
        var glem = GLExtentionsManager.getInstance(gl);

        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        if (glem.extTFA) {
          gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _this._img);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

        _this._texture = texture;
        _this._isTextureReady = true;
        _this._width = _this._img.width;
        _this._height = _this._img.width;
      };

      _this._img.src = imageUrl;
      return _this;
    }

    babelHelpers.createClass(Texture, [{
      key: 'isTextureReady',
      get: function get() {
        return this._isTextureReady;
      }
    }, {
      key: 'isImageAssignedForTexture',
      get: function get() {
        return typeof this._img.src !== "undefined";
      }
    }]);
    return Texture;
  })(AbstractTexture);

  GLBoost$1["Texture"] = Texture;

  var BlendShapeShaderSource = (function () {
    function BlendShapeShaderSource() {
      babelHelpers.classCallCheck(this, BlendShapeShaderSource);
    }

    babelHelpers.createClass(BlendShapeShaderSource, [{
      key: 'VSDefine_BlendShapeShaderSource',
      value: function VSDefine_BlendShapeShaderSource(in_, out_, f) {
        var _this = this;

        var shaderText = '';
        f.forEach(function (attribName) {
          if (_this.BlendShapeShaderSource_isShapeTarget(attribName)) {
            shaderText += in_ + ' vec3 aVertex_' + attribName + ';\n';
            shaderText += 'uniform float blendWeight_' + attribName + ';\n';
          }
        });
        return shaderText;
      }
    }, {
      key: 'VSTransform_BlendShapeShaderSource',
      value: function VSTransform_BlendShapeShaderSource(existCamera_f, f) {
        var _this2 = this;

        var shaderText = '';
        shaderText += 'float sumOfWeights = 0.0;\n';
        f.forEach(function (attribName) {
          if (_this2.BlendShapeShaderSource_isShapeTarget(attribName)) {
            shaderText += 'sumOfWeights += blendWeight_' + attribName + ';\n';
          }
        });
        var numOfShapeTargets = this.BlendShapeShaderSource_numberOfShapeTargets(f);
        shaderText += '    vec3 blendedPosition = aVertex_position * max(1.0 - sumOfWeights/float(' + numOfShapeTargets + '), 0.0);\n';
        f.forEach(function (attribName) {
          if (_this2.BlendShapeShaderSource_isShapeTarget(attribName)) {
            shaderText += 'blendedPosition += aVertex_' + attribName + ' * blendWeight_' + attribName + '/float(' + numOfShapeTargets + ');\n';
          }
        });
        if (existCamera_f) {
          shaderText += '  gl_Position = modelViewProjectionMatrix * vec4(blendedPosition, 1.0);\n';
        } else {
          shaderText += '  gl_Position = vec4(blendedPosition, 1.0);\n';
        }
        return shaderText;
      }
    }, {
      key: 'prepare_BlendShapeShaderSource',
      value: function prepare_BlendShapeShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {
        var _this3 = this;

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (_this3.BlendShapeShaderSource_isShapeTarget(attribName)) {
            // if POSITION and ShapeTargets...
            vertexAttribsAsResult.push(attribName);
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
          }
        });

        vertexAttribs.forEach(function (attribName) {
          if (_this3.BlendShapeShaderSource_isShapeTarget(attribName)) {
            shaderProgram['uniformFloatSampler_blendWeight_' + attribName] = gl.getUniformLocation(shaderProgram, 'blendWeight_' + attribName);
            // とりあえずゼロ初期化
            gl.uniform1f(shaderProgram['uniformFloatSampler_blendWeight_' + attribName], 0.0);
          }
        });

        return vertexAttribsAsResult;
      }
    }, {
      key: 'BlendShapeShaderSource_isShapeTarget',
      value: function BlendShapeShaderSource_isShapeTarget(attribName) {
        return !Shader._exist(attribName, GLBoost.POSITION) && !Shader._exist(attribName, GLBoost.COLOR) && !Shader._exist(attribName, GLBoost.TEXCOORD);
      }
    }, {
      key: 'BlendShapeShaderSource_numberOfShapeTargets',
      value: function BlendShapeShaderSource_numberOfShapeTargets(attributes) {
        var _this4 = this;

        var count = 0;
        attributes.forEach(function (attribName) {
          if (_this4.BlendShapeShaderSource_isShapeTarget(attribName)) {
            count += 1;
          }
        });
        return count;
      }
    }]);
    return BlendShapeShaderSource;
  })();

  var BlendShapeGeometry = (function (_Geometry) {
    babelHelpers.inherits(BlendShapeGeometry, _Geometry);

    function BlendShapeGeometry(canvas) {
      babelHelpers.classCallCheck(this, BlendShapeGeometry);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BlendShapeGeometry).call(this, canvas));

      if (_this.constructor === BlendShapeGeometry) {
        BlendShapeGeometry._instanceCount = typeof BlendShapeGeometry._instanceCount === "undefined" ? 0 : BlendShapeGeometry._instanceCount + 1;
        _this._instanceName = BlendShapeGeometry.name + '_' + BlendShapeGeometry._instanceCount;
      }
      return _this;
    }

    babelHelpers.createClass(BlendShapeGeometry, [{
      key: 'prepareForRender',
      value: function prepareForRender(existCamera_f, pointLight, meshMaterial) {
        // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
        var canvas = this._canvas;

        if (meshMaterial) {
          this._materialForBlend = meshMaterial;
        } else {
          this._materialForBlend = this._defaultMaterial;
        }

        var BlendShapeShader = (function (_materialForBlend$sha) {
          babelHelpers.inherits(BlendShapeShader, _materialForBlend$sha);

          function BlendShapeShader(canvas) {
            babelHelpers.classCallCheck(this, BlendShapeShader);

            var _this2 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BlendShapeShader).call(this, canvas));

            BlendShapeShader.mixin(BlendShapeShaderSource);
            return _this2;
          }

          return BlendShapeShader;
        })(this._materialForBlend.shader.constructor);

        if (meshMaterial) {
          meshMaterial.shader = new BlendShapeShader(canvas);
        } else {
          this._defaultMaterial.shader = new BlendShapeShader(canvas);
        }

        /*
        let materials = this._materials;
        if (materials) {
          for (let i=0; i<materials.length;i++) {
            materials[i].shader = new BlendShapeShader(this._canvas);
          }
        }
        */

        babelHelpers.get(Object.getPrototypeOf(BlendShapeGeometry.prototype), 'prepareForRender', this).call(this, existCamera_f, pointLight, meshMaterial);
      }
    }, {
      key: '_setBlendWeightToGlslProgram',
      value: function _setBlendWeightToGlslProgram(blendTarget, weight) {
        var materials = [this._materialForBlend];
        if (materials) {
          for (var i = 0; i < materials.length; i++) {
            this._gl.useProgram(materials[i].glslProgram);
            this._gl.uniform1f(materials[i].glslProgram['uniformFloatSampler_blendWeight_' + blendTarget], weight);
          }
        } else {
          this._gl.useProgram(this._glslProgram);
          this._gl.uniform1f(this._glslProgram['uniformFloatSampler_blendWeight_' + blendTarget], weight);
        }
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this._instanceName;
      }
    }, {
      key: 'blendWeight_1',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET1, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_2',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET2, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_3',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET3, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_4',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET4, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_5',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET5, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_6',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET6, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_7',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET7, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_8',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET8, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_9',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET9, weight);
        gl.useProgram(currentProgram);
      }
    }, {
      key: 'blendWeight_10',
      set: function set(weight) {
        var gl = this._gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET10, weight);
        gl.useProgram(currentProgram);
      }
    }]);
    return BlendShapeGeometry;
  })(Geometry);

  GLBoost$1["BlendShapeGeometry"] = BlendShapeGeometry;

  var PhongShaderSource = (function () {
    function PhongShaderSource() {
      babelHelpers.classCallCheck(this, PhongShaderSource);
    }

    babelHelpers.createClass(PhongShaderSource, [{
      key: 'VSDefine_PhongShaderSource',
      value: function VSDefine_PhongShaderSource(in_, out_, f, lights) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += in_ + ' vec3 aVertex_normal;\n';
          shaderText += out_ + ' vec3 normal;\n';
        }
        shaderText += out_ + ' vec4 position;\n';
        return shaderText;
      }
    }, {
      key: 'VSTransform_PhongShaderSource',
      value: function VSTransform_PhongShaderSource(existCamera_f, f, lights) {
        var shaderText = '';
        shaderText += '  position = vec4(aVertex_position, 1.0);\n';
        shaderText += '  normal = aVertex_normal;\n';

        return shaderText;
      }
    }, {
      key: 'FSDefine_PhongShaderSource',
      value: function FSDefine_PhongShaderSource(in_, f, lights) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += in_ + ' vec3 normal;\n';
        }
        shaderText += in_ + ' vec4 position;\n';
        shaderText += 'uniform vec3 viewPosition;\n';
        shaderText += 'uniform vec4 lightPosition[' + lights.length + '];\n';
        shaderText += 'uniform vec4 lightDiffuse[' + lights.length + '];\n';
        shaderText += 'uniform vec4 Kd;\n';
        shaderText += 'uniform vec4 Ks;\n';
        shaderText += 'uniform float power;\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_PhongShaderSource',
      value: function FSShade_PhongShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  vec4 surfaceColor = rt1;\n';
        shaderText += '  rt1 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        shaderText += '  for (int i=0; i<' + lights.length + '; i++) {\n';
        // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
        shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
        shaderText += '    float diffuse = max(dot(light, normal), 0.0);\n';
        shaderText += '    rt1 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
        shaderText += '    vec3 view = normalize(viewPosition - position.xyz);\n';
        shaderText += '    vec3 reflect = -view + 2.0 * dot(normal, view) * normal;\n';
        shaderText += '    float specular = pow(max(dot(light, reflect), 0.0), power);\n';
        shaderText += '    rt1 += Ks * lightDiffuse[i] * vec4(specular, specular, specular, 1.0);\n';
        shaderText += '  }\n';
        //shaderText += '  rt1.a = 1.0;\n';
        //shaderText += '  rt1 = vec4(position.xyz, 1.0);\n';

        return shaderText;
      }
    }, {
      key: 'prepare_PhongShaderSource',
      value: function prepare_PhongShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (attribName === GLBoost.NORMAL) {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
            vertexAttribsAsResult.push(attribName);
          }
        });

        shaderProgram.Kd = gl.getUniformLocation(shaderProgram, 'Kd');
        shaderProgram.Ks = gl.getUniformLocation(shaderProgram, 'Ks');
        shaderProgram.power = gl.getUniformLocation(shaderProgram, 'power');

        lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);

        shaderProgram['viewPosition'] = gl.getUniformLocation(shaderProgram, 'viewPosition');

        for (var i = 0; i < lights.length; i++) {
          shaderProgram['lightPosition_' + i] = gl.getUniformLocation(shaderProgram, 'lightPosition[' + i + ']');
          shaderProgram['lightDiffuse_' + i] = gl.getUniformLocation(shaderProgram, 'lightDiffuse[' + i + ']');
        }

        return vertexAttribsAsResult;
      }
    }]);
    return PhongShaderSource;
  })();

  var PhongShader = (function (_SimpleShader) {
    babelHelpers.inherits(PhongShader, _SimpleShader);

    function PhongShader(canvas) {
      babelHelpers.classCallCheck(this, PhongShader);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PhongShader).call(this, canvas));

      PhongShader.mixin(PhongShaderSource);

      _this._power = 5.0;

      return _this;
    }

    babelHelpers.createClass(PhongShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, material) {
        babelHelpers.get(Object.getPrototypeOf(PhongShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, material);

        var Kd = material.diffuseColor;
        var Ks = material.specularColor;
        gl.uniform4f(glslProgram.Kd, Kd.x, Kd.y, Kd.z, Kd.w);
        gl.uniform4f(glslProgram.Ks, Ks.x, Ks.y, Ks.z, Ks.w);
        gl.uniform1f(glslProgram.power, this._power);
      }
    }, {
      key: 'Kd',
      set: function set(value) {
        this._Kd = value;
      },
      get: function get() {
        return this._Kd;
      }
    }, {
      key: 'Ks',
      set: function set(value) {
        this._Ks = value;
      },
      get: function get() {
        return this._Ks;
      }
    }, {
      key: 'power',
      set: function set(value) {
        this._power = value;
      },
      get: function get() {
        return this._power;
      }
    }]);
    return PhongShader;
  })(SimpleShader);

  GLBoost["PhongShader"] = PhongShader;

  var LambertShaderSource = (function () {
    function LambertShaderSource() {
      babelHelpers.classCallCheck(this, LambertShaderSource);
    }

    babelHelpers.createClass(LambertShaderSource, [{
      key: 'VSDefine_LambertShaderSource',
      value: function VSDefine_LambertShaderSource(in_, out_, f, lights) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += in_ + ' vec3 aVertex_normal;\n';
          shaderText += out_ + ' vec3 normal;\n';
        }
        shaderText += out_ + ' vec4 position;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_LambertShaderSource',
      value: function VSTransform_LambertShaderSource(existCamera_f, f, lights) {
        var shaderText = '';
        shaderText += '  position = vec4(aVertex_position, 1.0);\n';
        shaderText += '  normal = aVertex_normal;\n';

        return shaderText;
      }
    }, {
      key: 'FSDefine_LambertShaderSource',
      value: function FSDefine_LambertShaderSource(in_, f, lights) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += in_ + ' vec3 normal;\n';
        }
        shaderText += in_ + ' vec4 position;\n';
        shaderText += 'uniform vec4 lightPosition[' + lights.length + '];\n';
        shaderText += 'uniform vec4 lightDiffuse[' + lights.length + '];\n';
        shaderText += 'uniform vec4 Kd;\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_LambertShaderSource',
      value: function FSShade_LambertShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  vec4 surfaceColor = rt1;\n';
        shaderText += '  rt1 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        shaderText += '  for (int i=0; i<' + lights.length + '; i++) {\n';
        // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
        shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
        shaderText += '    float diffuse = max(dot(light, normal), 0.0);\n';
        shaderText += '    rt1 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
        shaderText += '  }\n';
        //shaderText += '  rt1.a = 1.0;\n';
        //shaderText += '  rt1 = vec4(position.xyz, 1.0);\n';

        return shaderText;
      }
    }, {
      key: 'prepare_LambertShaderSource',
      value: function prepare_LambertShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (attribName === GLBoost.NORMAL) {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
            vertexAttribsAsResult.push(attribName);
          }
        });

        shaderProgram.Kd = gl.getUniformLocation(shaderProgram, 'Kd');

        lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);

        for (var i = 0; i < lights.length; i++) {
          shaderProgram['lightPosition_' + i] = gl.getUniformLocation(shaderProgram, 'lightPosition[' + i + ']');
          shaderProgram['lightDiffuse_' + i] = gl.getUniformLocation(shaderProgram, 'lightDiffuse[' + i + ']');
        }

        return vertexAttribsAsResult;
      }
    }]);
    return LambertShaderSource;
  })();

  var LambertShader = (function (_SimpleShader) {
    babelHelpers.inherits(LambertShader, _SimpleShader);

    function LambertShader(canvas) {
      babelHelpers.classCallCheck(this, LambertShader);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LambertShader).call(this, canvas));

      LambertShader.mixin(LambertShaderSource);
      return _this;
    }

    babelHelpers.createClass(LambertShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, material) {
        babelHelpers.get(Object.getPrototypeOf(LambertShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, material);

        var Kd = material.diffuseColor;
        gl.uniform4f(glslProgram.Kd, Kd.x, Kd.y, Kd.z, Kd.w);
      }
    }]);
    return LambertShader;
  })(SimpleShader);

  GLBoost["LambertShader"] = LambertShader;

  var HalfLambertShaderSource = (function () {
    function HalfLambertShaderSource() {
      babelHelpers.classCallCheck(this, HalfLambertShaderSource);
    }

    babelHelpers.createClass(HalfLambertShaderSource, [{
      key: 'VSDefine_HalfLambertShaderSource',
      value: function VSDefine_HalfLambertShaderSource(in_, out_, f, lights) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += in_ + ' vec3 aVertex_normal;\n';
          shaderText += out_ + ' vec3 normal;\n';
        }
        shaderText += out_ + ' vec4 position;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_HalfLambertShaderSource',
      value: function VSTransform_HalfLambertShaderSource(existCamera_f, f, lights) {
        var shaderText = '';

        shaderText += '  position = vec4(aVertex_position, 1.0);\n';
        shaderText += '  normal = aVertex_normal;\n';

        return shaderText;
      }
    }, {
      key: 'FSDefine_HalfLambertShaderSource',
      value: function FSDefine_HalfLambertShaderSource(in_, f, lights) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += in_ + ' vec3 normal;\n';
        }
        shaderText += in_ + ' vec4 position;\n';
        shaderText += 'uniform vec4 lightPosition[' + lights.length + '];\n';
        shaderText += 'uniform vec4 lightDiffuse[' + lights.length + '];\n';
        shaderText += 'uniform vec4 Kd;\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_HalfLambertShaderSource',
      value: function FSShade_HalfLambertShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  vec4 surfaceColor = rt1;\n';
        shaderText += '  rt1 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        shaderText += '  for (int i=0; i<' + lights.length + '; i++) {\n';
        // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
        shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
        shaderText += '    float halfLambert = dot(light, normal)*0.5+0.5;\n';
        shaderText += '    float diffuse = halfLambert*halfLambert;\n';
        shaderText += '    rt1 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
        shaderText += '  }\n';
        //shaderText += '  rt1.a = 1.0;\n';
        //shaderText += '  rt1 = vec4(position.xyz, 1.0);\n';

        return shaderText;
      }
    }, {
      key: 'prepare_HalfLambertShaderSource',
      value: function prepare_HalfLambertShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (attribName === GLBoost.NORMAL) {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
            vertexAttribsAsResult.push(attribName);
          }
        });

        shaderProgram.Kd = gl.getUniformLocation(shaderProgram, 'Kd');

        lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);

        for (var i = 0; i < lights.length; i++) {
          shaderProgram['lightPosition_' + i] = gl.getUniformLocation(shaderProgram, 'lightPosition[' + i + ']');
          shaderProgram['lightDiffuse_' + i] = gl.getUniformLocation(shaderProgram, 'lightDiffuse[' + i + ']');
        }

        return vertexAttribsAsResult;
      }
    }]);
    return HalfLambertShaderSource;
  })();

  var HalfLambertShader = (function (_SimpleShader) {
    babelHelpers.inherits(HalfLambertShader, _SimpleShader);

    function HalfLambertShader(canvas) {
      babelHelpers.classCallCheck(this, HalfLambertShader);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(HalfLambertShader).call(this, canvas));

      HalfLambertShader.mixin(HalfLambertShaderSource);
      return _this;
    }

    babelHelpers.createClass(HalfLambertShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, material) {
        babelHelpers.get(Object.getPrototypeOf(HalfLambertShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, material);

        var Kd = material.diffuseColor;
        gl.uniform4f(glslProgram.Kd, Kd.x, Kd.y, Kd.z, Kd.w);
      }
    }]);
    return HalfLambertShader;
  })(SimpleShader);

  GLBoost["HalfLambertShader"] = HalfLambertShader;

  var singleton = Symbol();
  var singletonEnforcer = Symbol();

  var ObjLoader = (function () {
    function ObjLoader(enforcer) {
      babelHelpers.classCallCheck(this, ObjLoader);

      if (enforcer !== singletonEnforcer) {
        throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
      }
    }

    babelHelpers.createClass(ObjLoader, [{
      key: 'loadObj',
      value: function loadObj(url, canvas) {
        var _this = this;

        var defaultShader = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
        var mtlString = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

        return new Promise(function (resolve, reject) {
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
              var gotText = xmlHttp.responseText;
              var partsOfPath = url.split('/');
              var basePath = '';
              for (var i = 0; i < partsOfPath.length - 1; i++) {
                basePath += partsOfPath[i] + '/';
              }
              var mesh = _this._constructMesh(gotText, basePath, canvas, defaultShader, mtlString);
              resolve(mesh);
            }
          };

          xmlHttp.open("GET", url, true);
          xmlHttp.send(null);
        });
      }
    }, {
      key: '_loadMaterialFromString',
      value: function _loadMaterialFromString(mtlString, canvas, defaultShader) {
        var basePath = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

        var mtlTextRows = mtlString.split('\n');

        var numMaterial = 0;
        // checking the number of material
        for (var i = 0; i < mtlTextRows.length; i++) {
          var matchArray = mtlTextRows[i].match(/^(\w+) (\w+)/);
          if (matchArray === null) {
            continue;
          }

          if (matchArray[1] === "newmtl") {
            numMaterial++;
          }
        }

        var materials = new Array(numMaterial);
        var iMCount = -1;

        // main loading
        for (var i = 0; i < mtlTextRows.length; i++) {
          var matchArray = mtlTextRows[i].match(/^(\w+) ([\w:\/\-\.]+)/);

          if (matchArray === null) {
            continue;
          }

          if (matchArray[1] === "newmtl") {
            iMCount++;
            materials[iMCount] = new ClassicMaterial(canvas);
            if (defaultShader) {
              materials[iMCount].shader = new defaultShader(canvas);
            } else {
              materials[iMCount].shader = new PhongShader(canvas);
            }
            materials[iMCount].name = matchArray[2];
          }

          if (matchArray[1].toLowerCase() === "ka") {
            matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
            materials[iMCount].ambientColor.x = parseFloat(matchArray[2]);
            materials[iMCount].ambientColor.y = parseFloat(matchArray[3]);
            materials[iMCount].ambientColor.z = parseFloat(matchArray[4]);
          }

          if (matchArray[1].toLowerCase() === "kd") {
            matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
            materials[iMCount].diffuseColor.x = parseFloat(matchArray[2]);
            materials[iMCount].diffuseColor.y = parseFloat(matchArray[3]);
            materials[iMCount].diffuseColor.z = parseFloat(matchArray[4]);
          }

          if (matchArray[1].toLowerCase() === "ks") {
            matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
            materials[iMCount].specularColor.x = parseFloat(matchArray[2]);
            materials[iMCount].specularColor.y = parseFloat(matchArray[3]);
            materials[iMCount].specularColor.z = parseFloat(matchArray[4]);
          }

          if (matchArray[1].toLowerCase() === "map_kd") {
            matchArray = mtlTextRows[i].match(/^(\w+) ([\w:\/\-\.]+)/);
            var texture = new Texture(basePath + matchArray[2], canvas);
            texture.name = matchArray[2];
            materials[iMCount].diffuseTexture = texture;
          }
        }
        return materials;
      }
    }, {
      key: '_loadMaterialFromFile',
      value: function _loadMaterialFromFile(basePath, fileName, canvas, defaultShader) {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", basePath + fileName, false);
        xmlHttp.send(null);

        return this._loadMaterialFromString(xmlHttp.responseText, canvas, defaultShader, basePath);
      }
    }, {
      key: '_constructMesh',
      value: function _constructMesh(objText, basePath, canvas, defaultShader, mtlString) {

        console.log(basePath);

        var objTextRows = objText.split('\n');
        var materials = null;
        var vCount = 0;
        var fCount = 0;
        var vnCount = 0;
        var vtCount = 0;

        if (mtlString) {
          materials = this._loadMaterialFromString(mtlString, canvas, defaultShader);
        }

        for (var i = 0; i < objTextRows.length; i++) {
          var matchArray = objTextRows[i].match(/^(\w+) (\w+)/);
          if (matchArray === null) {
            continue;
          }

          // material file
          if (matchArray[1] === "mtllib" && mtlString === null) {
            materials = this._loadMaterialFromFile(basePath, matchArray[2] + '.mtl', canvas, defaultShader);
          }
          // Vertex
          if (matchArray[1] === "v") {
            vCount++;
          }
          // Vertex Normal
          if (matchArray[1] === "vn") {
            vnCount++;
          }
          // Texcoord
          if (matchArray[1] === "vt") {
            vtCount++;
          }
          // Face
          if (matchArray[1] === "f") {
            matchArray = objTextRows[i].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
            if (matchArray !== null) {
              // if this is a Quad Polygon
              fCount += 2;
            } else {
              fCount++;
            }
          }
        }

        var pvCoord = new Array(vCount);
        var pvNormal = new Array(vnCount);
        var pvTexture = new Array(vtCount);

        vCount = 0;
        vnCount = 0;
        vtCount = 0;

        for (var i = 0; i < objTextRows.length; i++) {
          //キーワード 読み込み
          var matchArray = objTextRows[i].match(/^(\w+) /);

          if (matchArray === null) {
            continue;
          }

          //頂点 読み込み
          if (matchArray[1] === "v") {
            matchArray = objTextRows[i].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+) (-?[0-9\.]+)/);
            //          pvCoord[vCount].x=-x;//OBJは右手、Direct3Dは左手座標系。
            pvCoord[vCount] = new Vector3();
            pvCoord[vCount].x = parseFloat(matchArray[2]);
            pvCoord[vCount].y = parseFloat(matchArray[3]);
            pvCoord[vCount].z = parseFloat(matchArray[4]);
            vCount++;
          }

          //法線 読み込み
          if (matchArray[1] === "vn") {
            matchArray = objTextRows[i].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+) (-?[0-9\.]+)/);
            //          pvNormal[vnCount].x=-x;//OBJは右手、Direct3Dは左手座標系。
            pvNormal[vnCount] = new Vector3();
            pvNormal[vnCount].x = parseFloat(matchArray[2]);
            pvNormal[vnCount].y = parseFloat(matchArray[3]);
            pvNormal[vnCount].z = parseFloat(matchArray[4]);
            vnCount++;
          }

          //テクスチャー座標 読み込み
          if (matchArray[1] === "vt") {
            matchArray = objTextRows[i].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+)/);
            pvTexture[vtCount] = new Vector2();
            pvTexture[vtCount].x = parseFloat(matchArray[2]);
            pvTexture[vtCount].y = parseFloat(matchArray[3]);
            pvTexture[vtCount].y = 1 - pvTexture[vtCount].y; //Y成分が逆なので合わせる

            vtCount++;
          }
        }

        var positions = new Array(fCount);
        var texcoords = new Array(fCount);
        var normals = new Array(fCount);
        var indices = [];

        var boFlag = false;

        var FaceN = fCount;
        var iFaceBufferArray = new Array(FaceN * 3);
        fCount = 0;
        var partFCount = 0;

        var geometry = new Geometry(canvas);

        for (var i = 0; i < materials.length; i++) {
          partFCount = 0;

          for (var j = 0; j < objTextRows.length && fCount < FaceN; j++) {
            var matchArray = objTextRows[j].match(/^(\w+) (\w+)/);

            if (matchArray === null) {
              continue;
            }

            if (matchArray[1] === "usemtl") {
              if (matchArray[2] === materials[i].name) {
                boFlag = true;
              } else {
                boFlag = false;
              }
            }

            if (matchArray[1] === "f" && boFlag) {
              var isQuad = true;
              var _matchArray = objTextRows[j].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);if (_matchArray === null) {
                _matchArray = objTextRows[j].match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
              }
              if (_matchArray === null) {
                isQuad = false;
              }

              if (materials[i].diffuseTexture) {

                if (isQuad) {
                  this._addQuadDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                } else {
                  this._addTriangleDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                }
              } else {
                if (isQuad) {
                  this._addQuadDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                } else {
                  this._addTriangleDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                }
              }

              iFaceBufferArray[partFCount * 3] = fCount * 3;
              iFaceBufferArray[partFCount * 3 + 1] = fCount * 3 + 1;
              iFaceBufferArray[partFCount * 3 + 2] = fCount * 3 + 2;
              if (isQuad) {
                iFaceBufferArray[partFCount * 3 + 3] = fCount * 3 + 3;
                iFaceBufferArray[partFCount * 3 + 4] = fCount * 3 + 4;
                iFaceBufferArray[partFCount * 3 + 5] = fCount * 3 + 5;
                partFCount += 2;
                fCount += 2;
              } else {
                partFCount++;
                fCount++;
              }
            }
          }

          if (fCount === 0) //使用されていないマテリアル対策
            {
              continue;
            }

          materials[i].setVertexN(geometry, partFCount * 3);

          indices[i] = iFaceBufferArray.concat();
        }

        var mesh = new Mesh(geometry);
        geometry.materials = materials;
        geometry.setVerticesData({
          position: positions,
          texcoord: texcoords,
          normal: normals,
          indices: indices
        });

        return mesh;
      }
    }, {
      key: '_addTriangleDataToArraysWithTexture',
      value: function _addTriangleDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);

        if (matchArray !== null) {
          v1 = matchArray[2];
          vt1 = matchArray[3];
          vn1 = matchArray[4];
          v2 = matchArray[5];
          vt2 = matchArray[6];
          vn2 = matchArray[7];
          v3 = matchArray[8];
          vt3 = matchArray[9];
          vn3 = matchArray[10];
          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];
        } else {
          var _matchArray2 = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
          v1 = _matchArray2[2];
          vn1 = _matchArray2[3];
          v2 = _matchArray2[4];
          vn2 = _matchArray2[5];
          v3 = _matchArray2[6];
          vn3 = _matchArray2[7];
          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
        }
      }
    }, {
      key: '_addTriangleDataToArraysWithoutTexture',
      value: function _addTriangleDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);

        if (matchArray !== null) {
          v1 = matchArray[2];
          vn1 = matchArray[3];
          v2 = matchArray[4];
          vn2 = matchArray[5];
          v3 = matchArray[6];
          vn3 = matchArray[7];

          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
        } else {
          var _matchArray3 = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
          v1 = _matchArray3[2];
          vt1 = _matchArray3[3];
          vn1 = _matchArray3[4];
          v2 = _matchArray3[5];
          vt2 = _matchArray3[6];
          vn2 = _matchArray3[7];
          v3 = _matchArray3[8];
          vt3 = _matchArray3[9];
          vn3 = _matchArray3[10];

          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];
        }
      }
    }, {
      key: '_addQuadDataToArraysWithTexture',
      value: function _addQuadDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0,
            v4 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0,
            vn4 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0,
            vt4 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);

        if (matchArray !== null) {
          v1 = matchArray[2];
          vt1 = matchArray[3];
          vn1 = matchArray[4];
          v2 = matchArray[5];
          vt2 = matchArray[6];
          vn2 = matchArray[7];
          v3 = matchArray[8];
          vt3 = matchArray[9];
          vn3 = matchArray[10];
          v4 = matchArray[11];
          vt4 = matchArray[12];
          vn4 = matchArray[13];

          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 3] = pvTexture[vt3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          texcoords[fCount * 3 + 4] = pvTexture[vt4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
          texcoords[fCount * 3 + 5] = pvTexture[vt1 - 1];
        } else {
          var _matchArray4 = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
          v1 = _matchArray4[2];
          vn1 = _matchArray4[3];
          v2 = _matchArray4[4];
          vn2 = _matchArray4[5];
          v3 = _matchArray4[6];
          vn3 = _matchArray4[7];
          v4 = _matchArray4[8];
          vn4 = _matchArray4[9];

          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
        }
      }
    }, {
      key: '_addQuadDataToArraysWithoutTexture',
      value: function _addQuadDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0,
            v4 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0,
            vn4 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0,
            vt4 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
        if (matchArray !== null) {
          v1 = matchArray[2];
          vn1 = matchArray[3];
          v2 = matchArray[4];
          vn2 = matchArray[5];
          v3 = matchArray[6];
          vn3 = matchArray[7];
          v4 = matchArray[8];
          vn4 = matchArray[9];
          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
        } else {
          var _matchArray5 = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
          v1 = _matchArray5[2];
          vt1 = _matchArray5[3];
          vn1 = _matchArray5[4];
          v2 = _matchArray5[5];
          vt2 = _matchArray5[6];
          vn2 = _matchArray5[7];
          v3 = _matchArray5[8];
          vt3 = _matchArray5[9];
          vn3 = _matchArray5[10];
          v4 = _matchArray5[11];
          vt4 = _matchArray5[12];
          vn4 = _matchArray5[13];

          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 3] = pvTexture[vt3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          texcoords[fCount * 3 + 4] = pvTexture[vt4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
          texcoords[fCount * 3 + 5] = pvTexture[vt1 - 1];
        }
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton]) {
          this[singleton] = new ObjLoader(singletonEnforcer);
        }
        return this[singleton];
      }
    }]);
    return ObjLoader;
  })();

  GLBoost$1["ObjLoader"] = ObjLoader;

  GLBoost$1["TARGET_WEBGL_VERSION"] = 1;
  GLBoost$1["DEFAULT_POINTLIGHT_INTENSITY"] = new Vector3(1, 1, 1);

  var ArrayUtil = (function () {
    function ArrayUtil() {
      babelHelpers.classCallCheck(this, ArrayUtil);
    }

    babelHelpers.createClass(ArrayUtil, null, [{
      key: 'merge',
      value: function merge() {
        var key,
            result = false;
        if (arguments && arguments.length > 0) {
          result = [];
          for (var i = 0, len = arguments.length; i < len; i++) {
            if (arguments[i] && babelHelpers.typeof(arguments[i]) === 'object') {
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
    }]);
    return ArrayUtil;
  })();

  var Plane = (function (_Geometry) {
    babelHelpers.inherits(Plane, _Geometry);

    function Plane(width, height, uSpan, vSpan, customVertexAttributes, canvas) {
      babelHelpers.classCallCheck(this, Plane);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Plane).call(this, canvas));

      Plane._instanceCount = typeof Plane._instanceCount === "undefined" ? 0 : Plane._instanceCount + 1;

      _this._setupVertexData(width, height, uSpan, vSpan, customVertexAttributes);
      return _this;
    }

    babelHelpers.createClass(Plane, [{
      key: '_setupVertexData',
      value: function _setupVertexData(width, height, uSpan, vSpan, customVertexAttributes) {

        var positions = [];

        for (var i = 0; i <= vSpan; i++) {
          for (var j = 0; j <= uSpan; j++) {
            positions.push(new Vector3((j / uSpan - 1 / 2) * width, 0, (i / vSpan - 1 / 2) * height));
          }
        }

        var indices = [];
        for (var i = 0; i < vSpan; i++) {
          var degenerate_left_index = 0;
          var degenerate_right_index = 0;
          for (var j = 0; j <= uSpan; j++) {
            indices.push(i * (uSpan + 1) + j);
            indices.push((i + 1) * (uSpan + 1) + j);
            if (j === 0) {
              degenerate_left_index = (i + 1) * (uSpan + 1) + j;
            } else if (j === uSpan) {
              degenerate_right_index = (i + 1) * (uSpan + 1) + j;
            }
          }
          indices.push(degenerate_right_index);
          indices.push(degenerate_left_index);
        }

        var colors = [];
        var vertexColor = new Vector4(1, 1, 1, 1);
        for (var i = 0; i <= vSpan; i++) {
          for (var j = 0; j <= uSpan; j++) {
            colors.push(vertexColor);
          }
        }

        var texcoords = [];
        for (var i = 0; i <= vSpan; i++) {
          for (var j = 0; j <= uSpan; j++) {
            texcoords.push(new Vector2(j / uSpan, i / vSpan));
          }
        }

        var normal = new Vector3(0, 1, 0);
        var normals = [];
        for (var i = 0; i <= vSpan; i++) {
          for (var j = 0; j <= uSpan; j++) {
            normals.push(normal);
          }
        }

        var object = {
          position: positions,
          color: colors,
          texcoord: texcoords,
          normal: normals,
          indices: [indices]
        };

        var completeAttributes = ArrayUtil.merge(object, customVertexAttributes);
        this.setVerticesData(completeAttributes, GLBoost$1.TRIANGLE_STRIP);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return 'Plane_' + Plane._instanceCount;
      }
    }]);
    return Plane;
  })(Geometry);

  GLBoost$1["Plane"] = Plane;

  var Cube = (function (_Geometry) {
    babelHelpers.inherits(Cube, _Geometry);

    function Cube(widthVector, vertexColor, canvas) {
      babelHelpers.classCallCheck(this, Cube);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Cube).call(this, canvas));

      Cube._instanceCount = typeof Cube._instanceCount === "undefined" ? 0 : Cube._instanceCount + 1;

      _this._setupVertexData(widthVector.divide(2.0), vertexColor);
      return _this;
    }

    babelHelpers.createClass(Cube, [{
      key: '_setupVertexData',
      value: function _setupVertexData(widthVector, vertexColor) {
        var indices = [3, 1, 0, 2, 1, 3, 4, 5, 7, 7, 5, 6, 8, 9, 11, 11, 9, 10, 15, 13, 12, 14, 13, 15, 19, 17, 16, 18, 17, 19, 20, 21, 23, 23, 21, 22];

        var positions = [
        // upper
        new Vector3(-widthVector.x, widthVector.y, -widthVector.z), new Vector3(widthVector.x, widthVector.y, -widthVector.z), new Vector3(widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, widthVector.z),
        // lower
        new Vector3(-widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, widthVector.z), new Vector3(-widthVector.x, -widthVector.y, widthVector.z),
        // front
        new Vector3(-widthVector.x, -widthVector.y, widthVector.z), new Vector3(widthVector.x, -widthVector.y, widthVector.z), new Vector3(widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, widthVector.z),
        // back
        new Vector3(-widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, widthVector.y, -widthVector.z), new Vector3(-widthVector.x, widthVector.y, -widthVector.z),
        // right
        new Vector3(widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, widthVector.z), new Vector3(widthVector.x, widthVector.y, widthVector.z), new Vector3(widthVector.x, widthVector.y, -widthVector.z),
        // left
        new Vector3(-widthVector.x, -widthVector.y, -widthVector.z), new Vector3(-widthVector.x, -widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, -widthVector.z)];
        var colors = [new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w)];
        var texcoords = [new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0)];

        var normals = [
        // upper
        new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 0),
        // lower
        new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0),
        // front
        new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, 1),
        // back
        new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(0, 0, -1),
        // right
        new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 0),
        // left
        new Vector3(-1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0)];

        this.setVerticesData({
          position: positions,
          color: colors,
          normal: normals,
          texcoord: texcoords,
          indices: [indices]
        });
      }
    }, {
      key: 'toString',
      value: function toString() {
        return 'Cube_' + Cube._instanceCount;
      }
    }]);
    return Cube;
  })(Geometry);

  GLBoost$1["Cube"] = Cube;

  var ParticleShaderSource = (function () {
    function ParticleShaderSource() {
      babelHelpers.classCallCheck(this, ParticleShaderSource);
    }

    babelHelpers.createClass(ParticleShaderSource, [{
      key: 'VSDefine_ParticleShaderSource',
      value: function VSDefine_ParticleShaderSource(in_, out_, f) {
        var shaderText = '';
        shaderText += in_ + ' vec3 aVertex_particleCenterPos;\n';
        shaderText += 'uniform mat4 projectionMatrix;\n';
        shaderText += 'uniform mat4 modelViewMatrix;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_ParticleShaderSource',
      value: function VSTransform_ParticleShaderSource(existCamera_f, f) {
        var shaderText = '';

        shaderText += '  vec4 cameraCenterPos = modelViewMatrix * vec4(aVertex_particleCenterPos, 1.0);\n';
        shaderText += '  vec4 cameraEachPointPos = cameraCenterPos + vec4(aVertex_position - aVertex_particleCenterPos, 1.0);\n';
        shaderText += '  gl_Position = projectionMatrix * cameraEachPointPos;\n';

        return shaderText;
      }
    }, {
      key: 'prepare_ParticleShaderSource',
      value: function prepare_ParticleShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {
        var vertexAttribsAsResult = [];

        shaderProgram['vertexAttribute_' + 'particleCenterPos'] = gl.getAttribLocation(shaderProgram, 'aVertex_' + 'particleCenterPos');
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + 'particleCenterPos']);
        vertexAttribsAsResult.push('particleCenterPos');

        shaderProgram.projectionMatrix = gl.getUniformLocation(shaderProgram, 'projectionMatrix');
        shaderProgram.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'modelViewMatrix');

        return vertexAttribsAsResult;
      }
    }]);
    return ParticleShaderSource;
  })();

  /**
   * This Particle class handles particles expressions.
   * You can define particles behaviors in a custom vertex shader.
   * These particles are processed in GPU, so this is a very fast solution of particles expressions.
   */

  var Particle = (function (_Geometry) {
    babelHelpers.inherits(Particle, _Geometry);

    /**
     * This is Particle class's constructor
     *
     * @param {Array} centerPointData position array and the other data
     * @param {Number} particleWidth Width of each particle
     * @param {Number} particleHeight Height of each particle
     * @param {Object} JSON which has other vertex attribute arrays you want
     * @param {CanvasElement or String} Canvas Element which is generation source of WebGL context in current use or String which indicates the Canvas Element in jQuery like query string
     */

    function Particle(centerPointData, particleWidth, particleHeight, customVertexAttributes, canvas) {
      babelHelpers.classCallCheck(this, Particle);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Particle).call(this, canvas));

      Particle._instanceCount = typeof Particle._instanceCount === "undefined" ? 0 : Particle._instanceCount + 1;

      _this._setupVertexData(centerPointData, particleWidth / 2.0, particleHeight / 2.0, customVertexAttributes);
      return _this;
    }

    babelHelpers.createClass(Particle, [{
      key: '_setupVertexData',
      value: function _setupVertexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes) {
        var indices = [];
        var positionArray = centerPointData.position;

        for (var i = 0; i < positionArray.length; i++) {
          var offset = i * 4;
          indices.push(offset); // start Quad
          indices.push(offset + 1); //
          indices.push(offset + 2); // end Quad
          indices.push(offset + 3); //
          if (i === positionArray.length - 1) {
            break;
          }
          indices.push(offset + 3); // degenerated
          indices.push(offset + 4); // move another Particle
        }

        var positions = [];
        for (var i = 0; i < positionArray.length; i++) {
          positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
          positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
          positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
          positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
        }

        var centerPositions = [];
        for (var i = 0; i < positionArray.length; i++) {
          centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
          centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
          centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
          centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
        }

        var colors = [];
        var vertexColor = new Vector4(1, 1, 1, 1);
        for (var i = 0; i < positionArray.length; i++) {
          for (var j = 0; j < 4; j++) {
            colors.push(vertexColor);
          }
        }

        var texcoords = [];
        for (var i = 0; i < positionArray.length; i++) {
          texcoords.push(new Vector2(0, 0));
          texcoords.push(new Vector2(0, 1));
          texcoords.push(new Vector2(1, 0));
          texcoords.push(new Vector2(1, 1));
        }

        var normals = [];
        var normal = new Vector3(0, 0, 1);
        for (var i = 0; i < positionArray.length; i++) {
          for (var j = 0; j < 4; j++) {
            normals.push(normal);
          }
        }

        var pointData = {};
        for (var type in centerPointData) {
          if (type !== 'position') {
            pointData[type] = [];
            for (var i = 0; i < positionArray.length; i++) {
              for (var j = 0; j < 4; j++) {
                pointData[type].push(centerPointData[type][i]);
              }
            }
          }
        }

        var object = {
          position: positions,
          color: colors,
          texcoord: texcoords,
          normal: normals,
          particleCenterPos: centerPositions,
          indices: [indices]
        };

        var tempAttributes = ArrayUtil.merge(object, pointData);
        var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

        this.setVerticesData(completeAttributes, GLBoost$1.TRIANGLE_STRIP);
      }
    }, {
      key: 'prepareForRender',
      value: function prepareForRender(existCamera_f, pointLight, meshMaterial) {
        // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
        var canvas = this._canvas;

        if (meshMaterial) {
          this._materialForBillboard = meshMaterial;
        } else {
          this._materialForBillboard = this._defaultMaterial;
        }

        var ParticleShader = (function (_materialForBillboard) {
          babelHelpers.inherits(ParticleShader, _materialForBillboard);

          function ParticleShader(canvas) {
            babelHelpers.classCallCheck(this, ParticleShader);

            var _this2 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ParticleShader).call(this, canvas, ParticleShaderSource));

            ParticleShader.mixin(ParticleShaderSource);

            _this2._meshTransformUpdateCount = -9999;
            _this2._cameraViewUpdateCount = -9999;
            _this2._cameraProjectionUpdateCount = -9999;
            return _this2;
          }

          babelHelpers.createClass(ParticleShader, [{
            key: 'setUniforms',
            value: function setUniforms(gl, glslProgram, material, camera, mesh) {
              babelHelpers.get(Object.getPrototypeOf(ParticleShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, material, camera, mesh);

              if (this._cameraProjectionUpdateCount !== mesh.updateCountAsCameraProjection) {
                gl.uniformMatrix4fv(glslProgram.projectionMatrix, false, new Float32Array(camera.perspectiveRHMatrix().transpose().flatten()));
              }

              if (this._cameraViewUpdateCount !== mesh.updateCountAsCameraView || this._meshTransformUpdateCount !== mesh.updateCountAsElement) {
                gl.uniformMatrix4fv(glslProgram.modelViewMatrix, false, new Float32Array(camera.lookAtRHMatrix().multiply(mesh.transformMatrix).transpose().flatten()));
              }

              this._meshTransformUpdateCount = mesh.updateCountAsElement;
              this._cameraViewUpdateCount = camera.updateCountAsCameraView;
              this._cameraProjectionUpdateCount = camera.updateCountAsCameraProjection;

              return true; // still dirty
            }
          }]);
          return ParticleShader;
        })(this._materialForBillboard.shader.constructor);

        if (meshMaterial) {
          meshMaterial.shader = new ParticleShader(canvas);
        } else {
          this._defaultMaterial.shader = new ParticleShader(canvas);
        }

        /*
         let materials = this._materials;
         if (materials) {
         for (let i=0; i<materials.length;i++) {
         materials[i].shader = new BlendShapeShader(this._canvas);
         }
         }
         */

        babelHelpers.get(Object.getPrototypeOf(Particle.prototype), 'prepareForRender', this).call(this, existCamera_f, pointLight, meshMaterial);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return Particle.name + '_' + Particle._instanceCount;
      }
    }]);
    return Particle;
  })(Geometry);

  GLBoost$1["Particle"] = Particle;

}));