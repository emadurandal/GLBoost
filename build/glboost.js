/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _Renderer = __webpack_require__(2);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _Scene = __webpack_require__(57);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _Vector2 = __webpack_require__(58);

	var _Vector22 = _interopRequireDefault(_Vector2);

	var _Vector3 = __webpack_require__(12);

	var _Vector32 = _interopRequireDefault(_Vector3);

	var _Vector4 = __webpack_require__(10);

	var _Vector42 = _interopRequireDefault(_Vector4);

	var _ClassicMaterial = __webpack_require__(59);

	var _ClassicMaterial2 = _interopRequireDefault(_ClassicMaterial);

	var _Texture = __webpack_require__(60);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _Camera = __webpack_require__(53);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _BlendShapeMesh = __webpack_require__(61);

	var _BlendShapeMesh2 = _interopRequireDefault(_BlendShapeMesh);

	var _ObjLoader = __webpack_require__(63);

	var _ObjLoader2 = _interopRequireDefault(_ObjLoader);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Mesh = __webpack_require__(13);

	var _Mesh2 = _interopRequireDefault(_Mesh);

	var _Camera = __webpack_require__(53);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Matrix4x4 = __webpack_require__(3);

	var _Matrix4x42 = _interopRequireDefault(_Matrix4x4);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _GLExtentionsManager = __webpack_require__(43);

	var _GLExtentionsManager2 = _interopRequireDefault(_GLExtentionsManager);

	var _MutableTexture = __webpack_require__(54);

	var _MutableTexture2 = _interopRequireDefault(_MutableTexture);

	var _RenderPass = __webpack_require__(56);

	var _RenderPass2 = _interopRequireDefault(_RenderPass);

	var _AbstractLight = __webpack_require__(51);

	var _AbstractLight2 = _interopRequireDefault(_AbstractLight);

	var Renderer = (function () {
	  function Renderer(parameters) {
	    _classCallCheck(this, Renderer);

	    var _canvas = parameters.canvas;
	    var _clearColor = parameters.clearColor;

	    this._gl = _GLContext2['default'].getInstance(_canvas).gl;

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

	  _createClass(Renderer, [{
	    key: 'draw',
	    value: function draw(scene) {
	      var _this = this;

	      var projectionAndViewMatrix = null;
	      var modelViewMatrix = null;
	      var invNormalMatrix = null;
	      scene.elements.forEach(function (elm) {
	        if (elm instanceof _Camera2['default']) {
	          if (elm.isMainCamera) {
	            projectionAndViewMatrix = _Matrix4x42['default'].multiply(elm.perspectiveRHMatrix(), elm.lookAtRHMatrix());
	            projectionAndViewMatrix = _Matrix4x42['default'].transpose(projectionAndViewMatrix);
	            modelViewMatrix = elm.lookAtRHMatrix();
	            invNormalMatrix = modelViewMatrix.toMatrix3x3();
	            invNormalMatrix = invNormalMatrix.invert();
	            //invNormalMatrix = invNormalMatrix.transpose();
	            modelViewMatrix = modelViewMatrix.transpose();
	          }
	        }
	      });

	      var gl = this._gl;
	      var glem = _GLExtentionsManager2['default'].getInstance(gl);

	      var lights = [];
	      scene.elements.forEach(function (elm) {
	        if (elm instanceof _AbstractLight2['default']) {
	          lights.push(elm);
	        }
	      });

	      // if you didn't setup RenderPasses, all meshes are drawn to the backbuffer of framebuffer (gl.BACK).
	      if (this._renderPasses === null) {
	        glem.drawBuffers(gl, [gl.BACK]);

	        scene.elements.forEach(function (elm) {
	          if (elm instanceof _Mesh2['default']) {
	            elm.draw(projectionAndViewMatrix, modelViewMatrix, invNormalMatrix, lights);
	          }
	        });
	      } else {
	        // if you did setup RenderPasses, drawing meshes are executed for each RenderPass.
	        this._renderPasses.forEach(function (renderPass) {

	          if (renderPass.buffersToDraw[0] !== gl.BACK) {
	            gl.bindFramebuffer(gl.FRAMEBUFFER, _this._fbo);
	          }
	          glem.drawBuffers(gl, renderPass.buffersToDraw); // set render target buffers for each RenderPass.

	          if (renderPass.clearColor) {
	            var color = renderPass.clearColor;
	            gl.clearColor(color[0], color[1], color[2], color[3]);
	            gl.clear(gl.COLOR_BUFFER_BIT);
	          }

	          var meshes = renderPass.getMeshes();
	          meshes.forEach(function (mesh) {
	            mesh.draw(projectionAndViewMatrix, modelViewMatrix, invNormalMatrix, lights);
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

	      var glem = _GLExtentionsManager2['default'].getInstance(gl);

	      if (this._fbo) {
	        gl.deleteFramebuffers(1, this._fbo);
	      }
	      // Create FBO
	      this._fbo = gl.createFramebuffer();
	      gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
	      this._fbo.width = width ? width : gl._canvas.width;
	      this._fbo.height = height ? height : gl._canvas.height;

	      for (var i = 0; i < textureNum; i++) {
	        var texture = new _MutableTexture2['default'](gl._canvas, this._fbo.width, this._fbo.height);
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
	        this._renderPasses.push(new _RenderPass2['default'](this._gl));
	      }

	      return this._renderPasses;
	    }
	  }]);

	  return Renderer;
	})();

	_globals2['default']["Renderer"] = Renderer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Vector4 = __webpack_require__(10);

	var _Vector42 = _interopRequireDefault(_Vector4);

	var _Matrix3x3 = __webpack_require__(11);

	var _Matrix3x32 = _interopRequireDefault(_Matrix3x3);

	var Matrix4x4 = (function () {
	  function Matrix4x4() {
	    _classCallCheck(this, Matrix4x4);

	    this.m = [];
	    if (arguments.length >= 16) {
	      this.setComponents.apply(this, arguments);
	    } else {
	      this.identity();
	    }
	  }

	  _createClass(Matrix4x4, [{
	    key: 'setComponents',
	    value: function setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	      this.m00 = m00;this.m01 = m01;this.m02 = m02;this.m03 = m03;
	      this.m10 = m10;this.m11 = m11;this.m12 = m12;this.m13 = m13;
	      this.m20 = m20;this.m21 = m21;this.m22 = m22;this.m23 = m23;
	      this.m30 = m30;this.m31 = m31;this.m32 = m32;this.m33 = m33;

	      return this;
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
	    key: 'rotateY',

	    /**
	     * Create Y oriented Rotation Matrix
	     */
	    value: function rotateY(radian) {
	      var cos = Math.cos(radian);
	      var sin = Math.sin(radian);
	      this.setComponents(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
	      return this;
	    }

	    /**
	     * Create Y oriented Rotation Matrix
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

	      return new _Vector42['default'](x, y, z, w);
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
	    key: 'toMatrix3x3',
	    value: function toMatrix3x3() {
	      return new _Matrix3x32['default'](this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22);
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
	      return new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	    }
	  }, {
	    key: 'rotateY',
	    value: function rotateY(radian) {
	      var cos = Math.cos(radian);
	      var sin = Math.sin(radian);
	      return new Matrix4x4(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
	    }
	  }, {
	    key: 'zero',
	    value: function zero() {
	      return new Matrix4x4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	    }
	  }, {
	    key: 'transpose',
	    value: function transpose(mat) {

	      var mat_t = new Matrix4x4(mat.m00, mat.m10, mat.m20, mat.m30, mat.m01, mat.m11, mat.m21, mat.m31, mat.m02, mat.m12, mat.m22, mat.m32, mat.m03, mat.m13, mat.m23, mat.m33);

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

	      return new Matrix4x4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
	    }
	  }, {
	    key: 'toMatrix3x3',
	    value: function toMatrix3x3(mat) {
	      return new _Matrix3x32['default'](mat.m00, mat.m01, mat.m02, mat.m10, mat.m11, mat.m12, mat.m20, mat.m21, mat.m22);
	    }
	  }]);

	  return Matrix4x4;
	})();

	exports['default'] = Matrix4x4;

	_globals2['default']["Matrix4x4"] = Matrix4x4;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	window.GLBoost = window.GLBoost || { REVISION: '1' };

	var global = window;
	global.GLBoost["TARGET_WEBGL_VERSION"] = 1;
	global.GLBoost["POSITION"] = 'position';
	global.GLBoost["COLOR"] = 'color';
	global.GLBoost["NORMAL"] = 'normal';
	global.GLBoost["TEXCOORD"] = 'texcoord';
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

	exports["default"] = global.GLBoost;

	global.GLBoost.isThisGLVersion_2 = function (gl) {
	  if (typeof WebGL2RenderingContext === "undefined") {
	    return false;
	  }
	  return gl instanceof WebGL2RenderingContext;
	};
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(6)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _classCallCheck = __webpack_require__(9)["default"];

	var _interopRequireDefault = __webpack_require__(1)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var Vector4 = function Vector4(x, y, z, w) {
	  _classCallCheck(this, Vector4);

	  this.x = x;
	  this.y = y;
	  this.z = z;
	  this.w = w;
	};

	exports["default"] = Vector4;

	_globals2["default"]["Vector4"] = Vector4;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Vector3 = __webpack_require__(12);

	var _Vector32 = _interopRequireDefault(_Vector3);

	var Matrix3x3 = (function () {
	  function Matrix3x3() {
	    _classCallCheck(this, Matrix3x3);

	    this.m = [];
	    if (arguments.length >= 9) {
	      this.setComponents.apply(this, arguments);
	    } else {
	      this.identity();
	    }
	  }

	  _createClass(Matrix3x3, [{
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

	      return new _Vector32['default'](x, y, z);
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

	      return new Matrix3x3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
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
	      return new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1);
	    }
	  }, {
	    key: 'rotateY',
	    value: function rotateY(radian) {
	      var cos = Math.cos(radian);
	      var sin = Math.sin(radian);
	      return new Matrix3x3(cos, 0, sin, 0, 1, 0, -sin, 0, cos);
	    }
	  }, {
	    key: 'zero',
	    value: function zero() {
	      return new Matrix3x3(0, 0, 0, 0, 0, 0, 0, 0, 0);
	    }
	  }, {
	    key: 'transpose',
	    value: function transpose(mat) {

	      var mat_t = new Matrix3x3(mat.m00, mat.m10, mat.m20, mat.m01, mat.m11, mat.m21, mat.m02, mat.m12, mat.m22);

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

	      return new Matrix3x3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
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

	      return new Matrix3x3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
	    }
	  }]);

	  return Matrix3x3;
	})();

	exports['default'] = Matrix3x3;

	_globals2['default']["Matrix3x3"] = Matrix3x3;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(5)["default"];

	var _classCallCheck = __webpack_require__(9)["default"];

	var _interopRequireDefault = __webpack_require__(1)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var Vector3 = (function () {
	  function Vector3(x, y, z) {
	    _classCallCheck(this, Vector3);

	    this.x = x;
	    this.y = y;
	    this.z = z;
	  }

	  /**
	   * Zero Vector
	   */

	  _createClass(Vector3, [{
	    key: "length",

	    /**
	     * 長さ
	     */
	    value: function length() {
	      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	    }

	    /**
	     * 長さ（static版）
	     */
	  }, {
	    key: "lengthSquared",

	    /**
	     * 長さの2乗
	     */
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
	    key: "length",
	    value: function length(vec3) {
	      return Math.sqrt(vec3.x * vec3.x + vec3.y * vec3.y + vec3.z * vec3.z);
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

	exports["default"] = Vector3;

	_globals2["default"]["Vector3"] = Vector3;
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Element2 = __webpack_require__(38);

	var _Element3 = _interopRequireDefault(_Element2);

	var _Matrix4x4 = __webpack_require__(3);

	var _Matrix4x42 = _interopRequireDefault(_Matrix4x4);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _GLExtentionsManager = __webpack_require__(43);

	var _GLExtentionsManager2 = _interopRequireDefault(_GLExtentionsManager);

	var _Shader = __webpack_require__(44);

	var _Shader2 = _interopRequireDefault(_Shader);

	var _SimpleShader = __webpack_require__(49);

	var _SimpleShader2 = _interopRequireDefault(_SimpleShader);

	var _PointLight = __webpack_require__(50);

	var _PointLight2 = _interopRequireDefault(_PointLight);

	var _DirectionalLight = __webpack_require__(52);

	var _DirectionalLight2 = _interopRequireDefault(_DirectionalLight);

	var Mesh = (function (_Element) {
	  _inherits(Mesh, _Element);

	  function Mesh(canvas) {
	    _classCallCheck(this, Mesh);

	    _get(Object.getPrototypeOf(Mesh.prototype), 'constructor', this).call(this);
	    this._gl = _GLContext2['default'].getInstance(canvas).gl;
	    this._canvas = canvas;
	    this._material = null;
	    this._vertexN = 0;
	    this._stride = 0;
	    this._glslProgram = null;
	    this._vertices = null;
	    this._shader_for_non_material = new _SimpleShader2['default'](this._canvas);
	  }

	  /**
	   * データとして利用する頂点属性を判断し、そのリストを返す
	   * 不必要な頂点属性のデータは無視する。
	   */

	  _createClass(Mesh, [{
	    key: '_decideNeededVertexAttribs',
	    value: function _decideNeededVertexAttribs(vertices) {
	      var attribNameArray = [];
	      for (var attribName in vertices) {
	        if (attribName === _globals2['default'].TEXCOORD) {
	          // texcoordの場合は、テクスチャ付きのマテリアルをちゃんと持っているときに限り、'texcoord'が有効となる
	          if (this._materials[0] !== null && this._materials[0].diffuseTexture !== null) {
	            attribNameArray.push(attribName);
	          } else {
	            delete vertices[_globals2['default'].TEXCOORD];
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
	  }, {
	    key: '_getSheder',
	    value: function _getSheder(result, existCamera_f, lights) {
	      return this._shader_for_non_material.getShaderProgram(result, existCamera_f, lights);
	    }
	  }, {
	    key: 'setVerticesData',
	    value: function setVerticesData(vertices) {
	      this._vertices = vertices;
	    }
	  }, {
	    key: 'prepareForRender',
	    value: function prepareForRender(existCamera_f, lights) {
	      var _this = this;

	      var vertices = this._vertices;
	      var gl = this._gl;

	      var glem = _GLExtentionsManager2['default'].getInstance(gl);

	      var optimizedVertexAttribs = this._decideNeededVertexAttribs(vertices);

	      // create VAO
	      var vao = glem.createVertexArray(gl);
	      glem.bindVertexArray(gl, vao);

	      // create VBO
	      var verticesBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

	      var setVerticesLayout = function setVerticesLayout(glslProgram) {
	        optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

	        _this._stride = 0;
	        optimizedVertexAttribs.forEach(function (attribName) {
	          var numberOfComponentOfVector = vertices[attribName][0].z === void 0 ? 2 : 3;
	          _this._stride += numberOfComponentOfVector * 4;
	        });

	        // 頂点レイアウト設定
	        var offset = 0;
	        optimizedVertexAttribs.forEach(function (attribName) {
	          gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
	          var numberOfComponentOfVector = vertices[attribName][0].z === void 0 ? 2 : 3;
	          gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName], numberOfComponentOfVector, gl.FLOAT, gl.FALSE, _this._stride, offset);
	          offset += numberOfComponentOfVector * 4;
	        });
	      };

	      var materials = this._materials;
	      if (materials) {
	        for (var i = 0; i < materials.length; i++) {
	          // GLSLプログラム作成。
	          var glslProgram = materials[i].shader.getShaderProgram(optimizedVertexAttribs, existCamera_f, lights);
	          setVerticesLayout(glslProgram);
	          materials[i].glslProgram = glslProgram;
	        }
	      } else {
	        var glslProgram = this._getSheder(optimizedVertexAttribs, existCamera_f, lights);
	        setVerticesLayout(glslProgram);
	        this._glslProgram = glslProgram;
	      }

	      this._vertexN = vertices.position.length;

	      var vertexData = [];

	      vertices.position.forEach(function (elem, index, array) {
	        optimizedVertexAttribs.forEach(function (attribName) {
	          var element = vertices[attribName][index];
	          vertexData.push(element.x);
	          vertexData.push(element.y);
	          if (element.z !== void 0) {
	            vertexData.push(element.z);
	          }
	        });
	      });

	      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

	      gl.bindBuffer(gl.ARRAY_BUFFER, null);

	      this._indicesBuffers = [];
	      this._indicesNArray = [];
	      if (vertices.indices) {
	        // create Index Buffer
	        for (var i = 0; i < vertices.indices.length; i++) {
	          this._indicesBuffers[i] = gl.createBuffer();
	          this._indicesNArray[i] = vertices.indices[i].length;
	          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffers[i]);
	          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices.indices[i]), gl.STATIC_DRAW);
	          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	        }
	      }
	      glem.bindVertexArray(gl, null);

	      this._vao = vao;

	      // if this mesh has only one material...
	      if (this._materials && this._materials.length === 1 && this._materials[0].faceN === 0) {
	        if (vertices.indices && vertices.indices.length > 0) {
	          this._materials[0].faceN = vertices.indices[0].length / 3;
	        } else {
	          this._materials[0].faceN = this._vertexN / 3;
	        }
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(projectionAndViewMatrix, modelViewMatrix, invNormalMatrix, lights) {
	      var gl = this._gl;
	      var glem = _GLExtentionsManager2['default'].getInstance(gl);
	      var materials = this._materials;

	      glem.bindVertexArray(gl, this._vao);

	      if (materials) {
	        for (var i = 0; i < materials.length; i++) {
	          var glslProgram = materials[i].glslProgram;
	          gl.useProgram(glslProgram);

	          if (projectionAndViewMatrix) {
	            var pv_m = projectionAndViewMatrix;
	            gl.uniformMatrix4fv(glslProgram.projectionAndViewMatrix, false, new Float32Array(pv_m.flatten()));
	          }

	          if (typeof glslProgram.modelViewMatrix !== "undefined") {
	            var mv_m = modelViewMatrix;
	            gl.uniformMatrix4fv(glslProgram.modelViewMatrix, false, new Float32Array(mv_m.flatten()));
	          }

	          if (typeof glslProgram.invNormalMatrix !== "undefined") {
	            var in_m = invNormalMatrix;
	            gl.uniformMatrix3fv(glslProgram.invNormalMatrix, false, new Float32Array(in_m.flatten()));
	          }

	          if (lights.length !== 0) {
	            for (var _i = 0; _i < lights.length; _i++) {
	              if (lights[_i] instanceof _PointLight2['default']) {
	                gl.uniform4f(glslProgram['lightPosition_' + _i], lights[_i].translate.x, lights[_i].translate.y, lights[_i].translate.z, 1.0);
	              } else if (lights[_i] instanceof _DirectionalLight2['default']) {
	                gl.uniform4f(glslProgram['lightPosition_' + _i], -lights[_i].direction.x, -lights[_i].direction.y, -lights[_i].direction.z, 0.0);
	              }

	              gl.uniform4f(glslProgram['lightDiffuse_' + _i], lights[_i].intensity.x, lights[_i].intensity.y, lights[_i].intensity.z, 1.0);
	            }
	          }

	          if (materials[i]) {
	            materials[i].setUp();
	          }

	          if (this._indicesBuffers.length > 0) {
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffers[i]);
	            gl.drawElements(gl.TRIANGLES, materials[i].faceN * 3, gl.UNSIGNED_SHORT, 0);
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	          } else {
	            gl.drawArrays(gl.TRIANGLES, 0, this._vertexN);
	          }

	          if (materials[i]) {
	            materials[i].tearDown();
	          }
	        }
	      } else {
	        gl.useProgram(this._glslProgram);

	        if (projectionAndViewMatrix) {
	          var pv_m = projectionAndViewMatrix;
	          gl.uniformMatrix4fv(this._glslProgram.projectionAndViewMatrix, false, new Float32Array(pv_m.flatten()));
	        }

	        if (this._indicesBuffers.length > 0) {
	          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffers[0]);
	          gl.drawElements(gl.TRIANGLES, this._indicesNArray[0], gl.UNSIGNED_SHORT, 0);
	          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	        } else {
	          gl.drawArrays(gl.TRIANGLES, 0, this._vertexN);
	        }
	      }

	      glem.bindVertexArray(gl, null);
	    }
	  }, {
	    key: 'materials',
	    set: function set(materials) {
	      this._materials = materials;
	    }
	  }]);

	  return Mesh;
	})(_Element3['default']);

	exports['default'] = Mesh;

	_globals2['default']["Mesh"] = Mesh;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(15)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
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
	  }
	};

	exports.__esModule = true;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(16), __esModule: true };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	__webpack_require__(17);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(18);

	__webpack_require__(22)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(19)
	  , defined = __webpack_require__(21);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(20);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(23)
	    , fn   = (__webpack_require__(25).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(26)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(24)
	  , core      = __webpack_require__(25)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 24 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 25 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(28)["default"];

	var _Object$setPrototypeOf = __webpack_require__(30)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	module.exports = __webpack_require__(25).Object.setPrototypeOf;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(23);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(33).set});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(8).getDesc
	  , isObject = __webpack_require__(34)
	  , anObject = __webpack_require__(35);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line no-proto
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(36)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(34);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(37);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Vector3 = __webpack_require__(12);

	var _Vector32 = _interopRequireDefault(_Vector3);

	var Element = (function () {
	  function Element() {
	    _classCallCheck(this, Element);

	    this.children = [];
	    this._translate = _Vector32['default'].zero();
	  }

	  _createClass(Element, [{
	    key: 'translate',
	    set: function set(vec) {
	      this._translate = vec;
	    },
	    get: function get() {
	      return this._translate;
	    }
	  }]);

	  return Element;
	})();

	exports['default'] = Element;

	_globals2['default']["Element"] = Element;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _implGLContextWebGL1Impl = __webpack_require__(40);

	var _implGLContextWebGL1Impl2 = _interopRequireDefault(_implGLContextWebGL1Impl);

	var _implGLContextWebGL2Impl = __webpack_require__(42);

	var _implGLContextWebGL2Impl2 = _interopRequireDefault(_implGLContextWebGL2Impl);

	var GLContext = (function () {
	  function GLContext(canvas) {
	    _classCallCheck(this, GLContext);

	    if (GLContext._instances[canvas.id] instanceof GLContext) {
	      return GLContext._instances[canvas.id];
	    }

	    if (GLBoost.TARGET_WEBGL_VERSION === 1) {
	      this.impl = new _implGLContextWebGL1Impl2['default'](canvas, this);
	    } else if (GLBoost.TARGET_WEBGL_VERSION === 2) {
	      this.impl = new _implGLContextWebGL2Impl2['default'](canvas, this);
	    }

	    GLContext._instances[canvas.id] = this;
	  }

	  _createClass(GLContext, [{
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

	exports['default'] = GLContext;

	GLContext._instances = new Object();
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _GLContextImpl2 = __webpack_require__(41);

	var _GLContextImpl3 = _interopRequireDefault(_GLContextImpl2);

	var GLContextWebGL1Impl = (function (_GLContextImpl) {
	  _inherits(GLContextWebGL1Impl, _GLContextImpl);

	  function GLContextWebGL1Impl(canvas, parent) {
	    _classCallCheck(this, GLContextWebGL1Impl);

	    _get(Object.getPrototypeOf(GLContextWebGL1Impl.prototype), 'constructor', this).call(this, canvas, parent);

	    _get(Object.getPrototypeOf(GLContextWebGL1Impl.prototype), 'init', this).call(this, 'webgl', WebGLRenderingContext);
	  }

	  _createClass(GLContextWebGL1Impl, [{
	    key: 'gl',
	    get: function get() {
	      return this._canvas._gl;
	    }
	  }]);

	  return GLContextWebGL1Impl;
	})(_GLContextImpl3['default']);

	exports['default'] = GLContextWebGL1Impl;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(5)["default"];

	var _classCallCheck = __webpack_require__(9)["default"];

	var _interopRequireDefault = __webpack_require__(1)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var GLContextImpl = (function () {
	  function GLContextImpl(canvas, parent) {
	    _classCallCheck(this, GLContextImpl);

	    //    if (new.target === GLContextImpl) {
	    if (this.constructor === GLContextImpl) {
	      throw new TypeError("Cannot construct GLContextImpl instances directly");
	    }

	    if (!(parent instanceof _GLContext2["default"])) {
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

	  _createClass(GLContextImpl, [{
	    key: "init",
	    value: function init(glVersionString, ContextType) {

	      var gl = this._canvas.getContext(glVersionString);

	      if (!gl) {
	        throw new Error("This platform doesn't support WebGL.");
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

	exports["default"] = GLContextImpl;
	module.exports = exports["default"];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _GLContextImpl2 = __webpack_require__(41);

	var _GLContextImpl3 = _interopRequireDefault(_GLContextImpl2);

	var GLContextWebGL2Impl = (function (_GLContextImpl) {
	  _inherits(GLContextWebGL2Impl, _GLContextImpl);

	  function GLContextWebGL2Impl(canvas, parent) {
	    _classCallCheck(this, GLContextWebGL2Impl);

	    _get(Object.getPrototypeOf(GLContextWebGL2Impl.prototype), 'constructor', this).call(this, canvas, parent);

	    _get(Object.getPrototypeOf(GLContextWebGL2Impl.prototype), 'init', this).call(this, 'webgl2', WebGL2RenderingContext);
	  }

	  _createClass(GLContextWebGL2Impl, [{
	    key: 'gl',
	    get: function get() {
	      return this._canvas._gl;
	    }
	  }]);

	  return GLContextWebGL2Impl;
	})(_GLContextImpl3['default']);

	exports['default'] = GLContextWebGL2Impl;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(5)["default"];

	var _classCallCheck = __webpack_require__(9)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var GLExtentionsManager = (function () {
	  function GLExtentionsManager(gl) {
	    _classCallCheck(this, GLExtentionsManager);

	    if (GLExtentionsManager._instance) {
	      return GLExtentionsManager._instance;
	    }

	    this._extVAO = gl.getExtension("OES_vertex_array_object");
	    if (!GLBoost.isThisGLVersion_2(gl) && !this._extVAO) {
	      throw new Error("OES_vertex_array_objectをサポートしていません");
	    }

	    this._extDBs = gl.getExtension("WEBGL_draw_buffers");
	    //    if (!this._extDBs)
	    //      throw("WEBGL_draw_buffersをサポートしていません");

	    GLExtentionsManager._instance = this;
	  }

	  _createClass(GLExtentionsManager, [{
	    key: "createVertexArray",
	    value: function createVertexArray(gl) {
	      return GLBoost.isThisGLVersion_2(gl) ? gl.createVertexArray() : this._extVAO.createVertexArrayOES();
	    }
	  }, {
	    key: "bindVertexArray",
	    value: function bindVertexArray(gl, vao) {
	      return GLBoost.isThisGLVersion_2(gl) ? gl.bindVertexArray(vao) : this._extVAO.bindVertexArrayOES(vao);
	    }
	  }, {
	    key: "drawBuffers",
	    value: function drawBuffers(gl, buffers) {
	      return this._extDBs ? this.extDBs.drawBuffersWEBGL(buffers) : gl.drawBuffers(buffers);
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
	  }], [{
	    key: "getInstance",
	    value: function getInstance(gl) {
	      return new GLExtentionsManager(gl);
	    }
	  }]);

	  return GLExtentionsManager;
	})();

	exports["default"] = GLExtentionsManager;

	GLExtentionsManager._instance = null;
	module.exports = exports["default"];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _Object$getOwnPropertyNames = __webpack_require__(45)['default'];

	var _Object$defineProperty = __webpack_require__(6)['default'];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(15)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var Shader = (function () {
	  function Shader(canvas) {
	    _classCallCheck(this, Shader);

	    if (typeof canvas === 'string') {
	      var canvas = window.document.querySelector(canvas);
	    }

	    this._gl = _GLContext2['default'].getInstance(canvas).gl;
	  }

	  _createClass(Shader, [{
	    key: '_getVertexShaderString',
	    value: function _getVertexShaderString(gl, functions, existCamera_f, lights) {
	      var _this = this;

	      var f = functions;
	      var shaderText = '';

	      var in_ = Shader._in_onVert(gl);
	      var out_ = Shader._out_onVert(gl);

	      shaderText += Shader._glslVer(gl);
	      shaderText += 'precision mediump float;\n';

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

	      // Uniform projectionAndViewMatrix
	      if (existCamera_f) {
	        shaderText += 'uniform mat4 projectionAndViewMatrix;\n';
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
	        shaderText += '  gl_Position = projectionAndViewMatrix * vec4(aVertex_position, 1.0);\n';
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
	      var shaderText = 'rt1 = vec4(1.0, 0.0, 0.0, 1.0);\n';
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
	        shaderProgram.projectionAndViewMatrix = gl.getUniformLocation(shaderProgram, 'projectionAndViewMatrix');
	      }

	      return 'position';
	    }
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
	      var shaderProgram = this._initShaders(gl, this._getVertexShaderString(gl, vertexAttribs, existCamera_f, lights), this._getFragmentShaderString(gl, vertexAttribs, lights));

	      shaderProgram.optimizedVertexAttribs = this._prepareAssetsForShaders(gl, shaderProgram, vertexAttribs, existCamera_f, lights);

	      return shaderProgram;
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
	      _Object$getOwnPropertyNames(source).forEach(function (name) {
	        if (name !== "constructor") _Object$defineProperty(target, name, _Object$getOwnPropertyDescriptor(source, name));
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
	      _Object$getOwnPropertyNames(newone).forEach(function (name) {
	        if (name !== "constructor") _Object$defineProperty(target, name, _Object$getOwnPropertyDescriptor(newone, name));
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

	exports['default'] = Shader;

	Shader._instances = new Object();
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	__webpack_require__(47);
	module.exports = function getOwnPropertyNames(it){
	  return $.getNames(it);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(22)('getOwnPropertyNames', function(){
	  return __webpack_require__(48).get;
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toString  = {}.toString
	  , toIObject = __webpack_require__(18)
	  , getNames  = __webpack_require__(8).getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _Shader2 = __webpack_require__(44);

	var _Shader3 = _interopRequireDefault(_Shader2);

	var SimpleShaderSource = (function () {
	  function SimpleShaderSource() {
	    _classCallCheck(this, SimpleShaderSource);
	  }

	  _createClass(SimpleShaderSource, [{
	    key: 'VSDefine_SimpleShaderSource',
	    value: function VSDefine_SimpleShaderSource(in_, out_, f) {
	      var shaderText = '';
	      if (_Shader3['default']._exist(f, GLBoost.COLOR)) {
	        shaderText += in_ + ' vec3 aVertex_color;\n';
	        shaderText += out_ + ' vec4 color;\n';
	      }
	      if (_Shader3['default']._exist(f, GLBoost.TEXCOORD)) {
	        shaderText += in_ + ' vec2 aVertex_texcoord;\n';
	        shaderText += out_ + ' vec2 texcoord;\n';
	      }
	      return shaderText;
	    }
	  }, {
	    key: 'VSTransform_SimpleShaderSource',
	    value: function VSTransform_SimpleShaderSource(existCamera_f, f) {
	      var shaderText = '';
	      if (_Shader3['default']._exist(f, GLBoost.COLOR)) {
	        shaderText += '  color = vec4(aVertex_color, 1.0);\n';
	      }
	      if (_Shader3['default']._exist(f, GLBoost.TEXCOORD)) {
	        shaderText += '  texcoord = aVertex_texcoord;\n';
	      }
	      return shaderText;
	    }
	  }, {
	    key: 'FSDefine_SimpleShaderSource',
	    value: function FSDefine_SimpleShaderSource(in_, f) {
	      var shaderText = '';
	      if (_Shader3['default']._exist(f, GLBoost.COLOR)) {
	        shaderText += in_ + ' vec4 color;\n';
	      }
	      if (_Shader3['default']._exist(f, GLBoost.TEXCOORD)) {
	        shaderText += in_ + ' vec2 texcoord;\n\n';
	        shaderText += 'uniform sampler2D uTexture;\n';
	      }
	      return shaderText;
	    }
	  }, {
	    key: 'FSShade_SimpleShaderSource',
	    value: function FSShade_SimpleShaderSource(f, gl) {
	      var shaderText = '';
	      var textureFunc = _Shader3['default']._texture_func(gl);
	      if (_Shader3['default']._exist(f, GLBoost.TEXCOORD)) {
	        shaderText += '  rt1 = ' + textureFunc + '(uTexture, texcoord);\n';
	      } else if (_Shader3['default']._exist(f, GLBoost.COLOR)) {
	        shaderText += '  rt1 = color;\n';
	      }
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

	      if (_Shader3['default']._exist(vertexAttribs, GLBoost.TEXCOORD)) {
	        shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
	        // サンプラーにテクスチャユニット０を指定する
	        gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
	      }

	      return vertexAttribsAsResult;
	    }
	  }]);

	  return SimpleShaderSource;
	})();

	exports.SimpleShaderSource = SimpleShaderSource;

	var SimpleShader = (function (_Shader) {
	  _inherits(SimpleShader, _Shader);

	  function SimpleShader(canvas) {
	    _classCallCheck(this, SimpleShader);

	    _get(Object.getPrototypeOf(SimpleShader.prototype), 'constructor', this).call(this, canvas);
	    SimpleShader.mixin(SimpleShaderSource);
	  }

	  return SimpleShader;
	})(_Shader3['default']);

	exports['default'] = SimpleShader;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _AbstractLight2 = __webpack_require__(51);

	var _AbstractLight3 = _interopRequireDefault(_AbstractLight2);

	var PointLight = (function (_AbstractLight) {
	  _inherits(PointLight, _AbstractLight);

	  function PointLight(intensity, canvas) {
	    _classCallCheck(this, PointLight);

	    _get(Object.getPrototypeOf(PointLight.prototype), 'constructor', this).call(this, canvas);

	    this._gl = _GLContext2['default'].getInstance(canvas).gl;
	    this._name = "";
	    this._intensity = intensity;
	  }

	  _createClass(PointLight, [{
	    key: 'intensity',
	    set: function set(vec) {
	      this._intensity = vec;
	    },
	    get: function get() {
	      return this._intensity;
	    }
	  }]);

	  return PointLight;
	})(_AbstractLight3['default']);

	exports['default'] = PointLight;

	_globals2['default']["PointLight"] = PointLight;
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _Element2 = __webpack_require__(38);

	var _Element3 = _interopRequireDefault(_Element2);

	var AbstractLight = (function (_Element) {
	  _inherits(AbstractLight, _Element);

	  function AbstractLight(canvas) {
	    _classCallCheck(this, AbstractLight);

	    _get(Object.getPrototypeOf(AbstractLight.prototype), 'constructor', this).call(this, canvas);

	    if (this.constructor === AbstractLight) {
	      throw new TypeError("Cannot construct AbstractLight instances directly.");
	    }

	    this._gl = _GLContext2['default'].getInstance(canvas).gl;
	    this._name = "";
	  }

	  return AbstractLight;
	})(_Element3['default']);

	exports['default'] = AbstractLight;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _AbstractLight2 = __webpack_require__(51);

	var _AbstractLight3 = _interopRequireDefault(_AbstractLight2);

	var DirectionalLight = (function (_AbstractLight) {
	  _inherits(DirectionalLight, _AbstractLight);

	  function DirectionalLight(intensity, direction, canvas) {
	    _classCallCheck(this, DirectionalLight);

	    _get(Object.getPrototypeOf(DirectionalLight.prototype), 'constructor', this).call(this, canvas);

	    this._gl = _GLContext2['default'].getInstance(canvas).gl;
	    this._name = "";
	    this._intensity = intensity;
	    this._direction = direction;
	  }

	  _createClass(DirectionalLight, [{
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
	})(_AbstractLight3['default']);

	exports['default'] = DirectionalLight;

	_globals2['default']["DirectionalLight"] = DirectionalLight;
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Vector3 = __webpack_require__(12);

	var _Vector32 = _interopRequireDefault(_Vector3);

	var _Element2 = __webpack_require__(38);

	var _Element3 = _interopRequireDefault(_Element2);

	var _Matrix4x4 = __webpack_require__(3);

	var _Matrix4x42 = _interopRequireDefault(_Matrix4x4);

	var Camera = (function (_Element) {
	  _inherits(Camera, _Element);

	  function Camera(lookat, perspective) {
	    _classCallCheck(this, Camera);

	    _get(Object.getPrototypeOf(Camera.prototype), 'constructor', this).call(this);

	    this._translate = lookat.eye;
	    this._center = lookat.center;
	    this._up = lookat.up;

	    this._fovy = perspective.fovy;
	    this._aspect = perspective.aspect;
	    this._zNear = perspective.zNear;
	    this._zFar = perspective.zFar;

	    this.setAsMainCamera();
	  }

	  _createClass(Camera, [{
	    key: 'lookAtRHMatrix',
	    value: function lookAtRHMatrix() {
	      //    return Matrix4x4.identity();
	      return Camera.lookAtRHMatrix(this._translate, this._center, this._up);
	    }
	  }, {
	    key: 'perspectiveRHMatrix',
	    value: function perspectiveRHMatrix() {
	      //    return Matrix4x4.identity();
	      return Camera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNear, this._zFar);
	    }
	  }, {
	    key: 'setAsMainCamera',
	    value: function setAsMainCamera() {
	      Camera._mainCamera = this;
	    }
	  }, {
	    key: 'isMainCamera',
	    get: function get() {
	      return Camera._mainCamera === this;
	    }
	  }, {
	    key: 'eye',
	    set: function set(vec) {
	      this._translate = vec;
	    },
	    get: function get() {
	      return this._translate;
	    }
	  }, {
	    key: 'center',
	    set: function set(vec) {
	      this._center = vec;
	    },
	    get: function get() {
	      return this._center;
	    }
	  }, {
	    key: 'up',
	    set: function set(vec) {
	      this._up = vec;
	    },
	    get: function get() {
	      return this._up;
	    }
	  }, {
	    key: 'fovy',
	    set: function set(value) {
	      this._fovy = value;
	    },
	    get: function get() {
	      return this._fovy;
	    }
	  }, {
	    key: 'aspect',
	    set: function set(value) {
	      this._aspect = value;
	    },
	    get: function get() {
	      return this._aspect;
	    }
	  }, {
	    key: 'zNear',
	    set: function set(value) {
	      this._zNear = value;
	    },
	    get: function get() {
	      return this._zNear;
	    }
	  }, {
	    key: 'zFar',
	    set: function set(value) {
	      this._zFar = value;
	    },
	    get: function get() {
	      return this._zFar;
	    }
	  }], [{
	    key: 'lookAtRHMatrix',
	    value: function lookAtRHMatrix(eye, center, up) {

	      var f = _Vector32['default'].normalize(_Vector32['default'].subtract(center, eye));
	      var s = _Vector32['default'].normalize(_Vector32['default'].cross(f, up));
	      var u = _Vector32['default'].cross(s, f);

	      return new _Matrix4x42['default'](s.x, s.y, s.z, -_Vector32['default'].dotProduct(s, eye), u.x, u.y, u.z, -_Vector32['default'].dotProduct(u, eye), -f.x, -f.y, -f.z, _Vector32['default'].dotProduct(f, eye), 0, 0, 0, 1);
	    }
	  }, {
	    key: 'perspectiveRHMatrix',
	    value: function perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

	      var yscale = 1.0 / Math.tan(0.5 * fovy * Math.PI / 180);
	      var xscale = yscale / aspect;

	      return new _Matrix4x42['default'](xscale, 0.0, 0.0, 0.0, 0.0, yscale, 0.0, 0.0, 0.0, 0.0, -(zFar + zNear) / (zFar - zNear), -(2.0 * zFar * zNear) / (zFar - zNear), 0.0, 0.0, -1.0, 0.0);
	    }
	  }]);

	  return Camera;
	})(_Element3['default']);

	exports['default'] = Camera;

	Camera._mainCamera = null;

	_globals2['default']["Camera"] = Camera;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _AbstractTexture2 = __webpack_require__(55);

	var _AbstractTexture3 = _interopRequireDefault(_AbstractTexture2);

	var MutableTexture = (function (_AbstractTexture) {
	  _inherits(MutableTexture, _AbstractTexture);

	  function MutableTexture(canvas, width, height) {
	    _classCallCheck(this, MutableTexture);

	    _get(Object.getPrototypeOf(MutableTexture.prototype), 'constructor', this).call(this, canvas);

	    this._isTextureReady = false;
	    this._texture = null;
	    this._width = width;
	    this._height = height;

	    var gl = this._gl;

	    this._texture = gl.createTexture();
	    gl.bindTexture(gl.TEXTURE_2D, this._texture);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	    gl.bindTexture(gl.TEXTURE_2D, null);
	  }

	  _createClass(MutableTexture, [{
	    key: 'colorAttachiment',
	    set: function set(attachmentId) {
	      this._attachmentId = attachmentId;
	    },
	    get: function get() {
	      return this._attachmentId;
	    }
	  }]);

	  return MutableTexture;
	})(_AbstractTexture3['default']);

	exports['default'] = MutableTexture;

	_globals2['default']["MutableTexture"] = MutableTexture;
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var AbstractTexture = (function () {
	  function AbstractTexture(canvas) {
	    _classCallCheck(this, AbstractTexture);

	    if (this.constructor === AbstractTexture) {
	      throw new TypeError("Cannot construct AbstractTexture instances directly.");
	    }

	    this._gl = _GLContext2['default'].getInstance(canvas).gl;
	    this._name = "";
	  }

	  _createClass(AbstractTexture, [{
	    key: 'setUp',
	    value: function setUp() {
	      this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
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

	exports['default'] = AbstractTexture;

	_globals2['default']["AbstractTexture"] = AbstractTexture;
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _Mesh = __webpack_require__(13);

	var _Mesh2 = _interopRequireDefault(_Mesh);

	var RenderPass = (function () {
	  function RenderPass(gl) {
	    _classCallCheck(this, RenderPass);

	    this._meshes = [];
	    this._drawBuffers = [gl.BACK];
	    this._clearColor = null;
	  }

	  _createClass(RenderPass, [{
	    key: 'addMeshes',
	    value: function addMeshes(meshes) {
	      var _this = this;

	      meshes.forEach(function (mesh) {
	        if (!(mesh instanceof _Mesh2['default'])) {
	          throw new TypeError("RenderPass accepts Mesh objects only.");
	        }
	        _this._meshes.push(mesh);
	      });
	    }
	  }, {
	    key: 'getMeshes',
	    value: function getMeshes() {
	      return this._meshes;
	    }
	  }, {
	    key: 'specifyRenderTargetTextures',
	    value: function specifyRenderTargetTextures(canvas, renderTargetTextures) {
	      var _this2 = this;

	      var gl = _GLContext2['default'].getInstance(canvas).gl;

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

	exports['default'] = RenderPass;

	_globals2['default']["RenderPass"] = RenderPass;
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Element2 = __webpack_require__(38);

	var _Element3 = _interopRequireDefault(_Element2);

	var _Camera = __webpack_require__(53);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _AbstractLight = __webpack_require__(51);

	var _AbstractLight2 = _interopRequireDefault(_AbstractLight);

	var _Mesh = __webpack_require__(13);

	var _Mesh2 = _interopRequireDefault(_Mesh);

	var Scene = (function (_Element) {
	  _inherits(Scene, _Element);

	  function Scene() {
	    _classCallCheck(this, Scene);

	    _get(Object.getPrototypeOf(Scene.prototype), 'constructor', this).call(this);
	    this._elements = [];
	  }

	  _createClass(Scene, [{
	    key: 'add',
	    value: function add(mesh) {
	      this._elements.push(mesh);
	    }
	  }, {
	    key: 'prepareForRender',
	    value: function prepareForRender() {
	      // カメラが最低１つでも存在しているか確認
	      var existCamera_f = false;
	      this._elements.forEach(function (elm) {
	        if (elm instanceof _Camera2['default']) {
	          existCamera_f = true;
	        }
	      });

	      var lights = [];
	      this._elements.forEach(function (elm) {
	        if (elm instanceof _AbstractLight2['default']) {
	          lights.push(elm);
	        }
	      });

	      // レンダリングの準備をさせる。
	      this._elements.forEach(function (elm) {
	        if (elm.prepareForRender === void 0) return; // prepareForRenderメソッドを持っていないエレメントは処理しない
	        if (elm instanceof _Mesh2['default']) {
	          elm.prepareForRender(existCamera_f, lights);
	        }
	      });
	    }
	  }, {
	    key: 'elements',
	    get: function get() {
	      return this._elements;
	    }
	  }]);

	  return Scene;
	})(_Element3['default']);

	exports['default'] = Scene;

	_globals2['default']["Scene"] = Scene;
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _classCallCheck = __webpack_require__(9)["default"];

	var _interopRequireDefault = __webpack_require__(1)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var Vector2 = function Vector2(x, y) {
	  _classCallCheck(this, Vector2);

	  this.x = x;
	  this.y = y;
	};

	exports["default"] = Vector2;

	_globals2["default"]["Vector2"] = Vector2;
	module.exports = exports["default"];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _Vector3 = __webpack_require__(12);

	var _Vector32 = _interopRequireDefault(_Vector3);

	var _SimpleShader = __webpack_require__(49);

	var _SimpleShader2 = _interopRequireDefault(_SimpleShader);

	var ClassicMaterial = (function () {
	  function ClassicMaterial(canvas) {
	    _classCallCheck(this, ClassicMaterial);

	    this._diffuseTexture = null;
	    this._gl = _GLContext2['default'].getInstance(canvas).gl;
	    this._diffuseColor = new _Vector32['default'](1.0, 1.0, 1.0);
	    this._specularColor = new _Vector32['default'](1.0, 1.0, 1.0);
	    this._ambientColor = new _Vector32['default'](0.0, 0.0, 0.0);
	    this._name = "";
	    this._faceN = 0;
	    this._shader = new _SimpleShader2['default'](canvas);
	  }

	  _createClass(ClassicMaterial, [{
	    key: 'setUp',
	    value: function setUp() {
	      var gl = this._gl;
	      if (this._diffuseTexture) {
	        // テクスチャユニット０にテクスチャオブジェクトをバインドする
	        gl.activeTexture(gl.TEXTURE0);
	        this._diffuseTexture.setUp();
	      }
	    }
	  }, {
	    key: 'tearDown',
	    value: function tearDown() {
	      if (this._diffuseTexture) {
	        this._diffuseTexture.tearDown();
	      }
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
	  }, {
	    key: 'faceN',
	    set: function set(num) {
	      this._faceN = num;
	    },
	    get: function get() {
	      return this._faceN;
	    }
	  }]);

	  return ClassicMaterial;
	})();

	exports['default'] = ClassicMaterial;

	_globals2['default']["ClassicMaterial"] = ClassicMaterial;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _AbstractTexture2 = __webpack_require__(55);

	var _AbstractTexture3 = _interopRequireDefault(_AbstractTexture2);

	var Texture = (function (_AbstractTexture) {
	  _inherits(Texture, _AbstractTexture);

	  function Texture(imageUrl, canvas) {
	    var _this = this;

	    _classCallCheck(this, Texture);

	    _get(Object.getPrototypeOf(Texture.prototype), 'constructor', this).call(this, canvas);

	    this._isTextureReady = false;
	    this._texture = null;

	    var img = new Image();
	    img.onload = function () {
	      var gl = _this._gl;
	      var texture = gl.createTexture();
	      gl.bindTexture(gl.TEXTURE_2D, texture);
	      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
	      gl.generateMipmap(gl.TEXTURE_2D);
	      gl.bindTexture(gl.TEXTURE_2D, null);

	      _this._texture = texture;
	      _this._isTextureReady = true;
	      _this._width = img.width;
	      _this._height = img.width;
	    };

	    img.src = imageUrl;
	  }

	  _createClass(Texture, [{
	    key: 'isTextureReady',
	    get: function get() {
	      return this._isTextureReady;
	    }
	  }]);

	  return Texture;
	})(_AbstractTexture3['default']);

	exports['default'] = Texture;

	_globals2['default']["Texture"] = Texture;
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Element = __webpack_require__(38);

	var _Element2 = _interopRequireDefault(_Element);

	var _GLContext = __webpack_require__(39);

	var _GLContext2 = _interopRequireDefault(_GLContext);

	var _GLExtentionsManager = __webpack_require__(43);

	var _GLExtentionsManager2 = _interopRequireDefault(_GLExtentionsManager);

	var _BlendShapeShader = __webpack_require__(62);

	var _BlendShapeShader2 = _interopRequireDefault(_BlendShapeShader);

	var _Mesh2 = __webpack_require__(13);

	var _Mesh3 = _interopRequireDefault(_Mesh2);

	var BlendShapeMesh = (function (_Mesh) {
	  _inherits(BlendShapeMesh, _Mesh);

	  function BlendShapeMesh(canvas) {
	    _classCallCheck(this, BlendShapeMesh);

	    _get(Object.getPrototypeOf(BlendShapeMesh.prototype), 'constructor', this).call(this, canvas);

	    var BlendShapeShader = (function (_shader_for_non_material$constructor) {
	      _inherits(BlendShapeShader, _shader_for_non_material$constructor);

	      function BlendShapeShader(canvas) {
	        _classCallCheck(this, BlendShapeShader);

	        _get(Object.getPrototypeOf(BlendShapeShader.prototype), 'constructor', this).call(this, canvas);
	        BlendShapeShader.mixin(_BlendShapeShader2['default']);
	      }

	      return BlendShapeShader;
	    })(this._shader_for_non_material.constructor);

	    this._shader_for_non_material = new BlendShapeShader(canvas);
	    this._shaderClass = BlendShapeShader;
	  }

	  _createClass(BlendShapeMesh, [{
	    key: 'prepareForRender',
	    value: function prepareForRender(existCamera_f, pointLight) {

	      // before prepareForRender of 'Mesh' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
	      var materials = this._materials;
	      if (materials) {
	        for (var i = 0; i < materials.length; i++) {
	          materials[i].shader = new this._shaderClass(this._canvas);
	        }
	      }

	      _get(Object.getPrototypeOf(BlendShapeMesh.prototype), 'prepareForRender', this).call(this, existCamera_f, pointLight);
	    }
	  }, {
	    key: '_setBlendWeightToGlslProgram',
	    value: function _setBlendWeightToGlslProgram(blendTarget, weight) {
	      var materials = this._materials;
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
	    key: 'blendWeight_1',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET1, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_2',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET2, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_3',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET3, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_4',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET4, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_5',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET5, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_6',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET6, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_7',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET7, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_8',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET8, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_9',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET9, weight);
	      gl.useProgram(currentProgram);
	    }
	  }, {
	    key: 'blendWeight_10',
	    set: function set(weight) {
	      var gl = this._gl;
	      var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	      this._setBlendWeightToGlslProgram(_globals2['default'].BLENDTARGET10, weight);
	      gl.useProgram(currentProgram);
	    }
	  }]);

	  return BlendShapeMesh;
	})(_Mesh3['default']);

	exports['default'] = BlendShapeMesh;

	_globals2['default']["BlendShapeMesh"] = BlendShapeMesh;
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _Shader = __webpack_require__(44);

	var _Shader2 = _interopRequireDefault(_Shader);

	var _SimpleShader = __webpack_require__(49);

	var _SimpleShader2 = _interopRequireDefault(_SimpleShader);

	var BlendShapeShaderSource = (function () {
	  function BlendShapeShaderSource() {
	    _classCallCheck(this, BlendShapeShaderSource);
	  }

	  _createClass(BlendShapeShaderSource, [{
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
	        shaderText += '  gl_Position = projectionAndViewMatrix * vec4(blendedPosition, 1.0);\n';
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
	      return !_Shader2['default']._exist(attribName, GLBoost.POSITION) && !_Shader2['default']._exist(attribName, GLBoost.COLOR) && !_Shader2['default']._exist(attribName, GLBoost.TEXCOORD);
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

	exports['default'] = BlendShapeShaderSource;
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _Symbol = __webpack_require__(64)['default'];

	var _Promise = __webpack_require__(80)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _globals = __webpack_require__(4);

	var _globals2 = _interopRequireDefault(_globals);

	var _Vector3 = __webpack_require__(12);

	var _Vector32 = _interopRequireDefault(_Vector3);

	var _Vector2 = __webpack_require__(58);

	var _Vector22 = _interopRequireDefault(_Vector2);

	var _ClassicMaterial = __webpack_require__(59);

	var _ClassicMaterial2 = _interopRequireDefault(_ClassicMaterial);

	var _Texture = __webpack_require__(60);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _Mesh = __webpack_require__(13);

	var _Mesh2 = _interopRequireDefault(_Mesh);

	var _LambertShader = __webpack_require__(110);

	var _LambertShader2 = _interopRequireDefault(_LambertShader);

	var singleton = _Symbol();
	var singletonEnforcer = _Symbol();

	var ObjLoader = (function () {
	  function ObjLoader(enforcer) {
	    _classCallCheck(this, ObjLoader);

	    if (enforcer !== singletonEnforcer) {
	      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
	    }
	  }

	  _createClass(ObjLoader, [{
	    key: 'loadObj',
	    value: function loadObj(url, canvas) {
	      var _this = this;

	      this._numMaterial = 0;
	      return new _Promise(function (resolve, reject) {
	        var xmlHttp = new XMLHttpRequest();
	        xmlHttp.onreadystatechange = function () {
	          if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	            var gotText = xmlHttp.responseText;
	            var partsOfPath = url.split('/');
	            var basePath = '';
	            for (var i = 0; i < partsOfPath.length - 1; i++) {
	              basePath += partsOfPath[i] + '/';
	            }
	            var mesh = _this.constructMesh(gotText, basePath, canvas);
	            resolve(mesh);
	          }
	        };

	        xmlHttp.open("GET", url, true);
	        xmlHttp.send(null);
	      });
	    }
	  }, {
	    key: 'loadMaterialFromFile',
	    value: function loadMaterialFromFile(basePath, fileName, canvas) {

	      var xmlHttp = new XMLHttpRequest();
	      xmlHttp.open("GET", basePath + fileName, false);
	      xmlHttp.send(null);

	      var mtlTextRows = xmlHttp.responseText.split('\n');

	      // checking the number of material
	      for (var i = 0; i < mtlTextRows.length; i++) {
	        var matchArray = mtlTextRows[i].match(/^(\w+) (\w+)/);
	        if (matchArray === null) {
	          continue;
	        }

	        if (matchArray[1] === "newmtl") {
	          this._numMaterial++;
	        }
	      }

	      var materials = new Array(this._numMaterial);
	      var iMCount = -1;

	      // main loading
	      for (var i = 0; i < mtlTextRows.length; i++) {
	        var matchArray = mtlTextRows[i].match(/^(\w+) (\w+)/);

	        if (matchArray === null) {
	          continue;
	        }

	        if (matchArray[1] === "newmtl") {
	          iMCount++;
	          materials[iMCount] = new _ClassicMaterial2['default'](canvas);
	          materials[iMCount].shader = new _LambertShader2['default'](canvas);
	          materials[iMCount].name = matchArray[2];
	        }

	        if (matchArray[1] === "Ka") {
	          matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
	          materials[iMCount].ambientColor.x = parseFloat(matchArray[2]);
	          materials[iMCount].ambientColor.y = parseFloat(matchArray[3]);
	          materials[iMCount].ambientColor.z = parseFloat(matchArray[4]);
	        }

	        if (matchArray[1] === "Kd") {
	          matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
	          materials[iMCount].diffuseColor.x = parseFloat(matchArray[2]);
	          materials[iMCount].diffuseColor.y = parseFloat(matchArray[3]);
	          materials[iMCount].diffuseColor.z = parseFloat(matchArray[4]);
	        }

	        if (matchArray[1] === "Ks") {
	          matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
	          materials[iMCount].specularColor.x = parseFloat(matchArray[2]);
	          materials[iMCount].specularColor.y = parseFloat(matchArray[3]);
	          materials[iMCount].specularColor.z = parseFloat(matchArray[4]);
	        }

	        if (matchArray[1] === "map_Kd") {
	          matchArray = mtlTextRows[i].match(/^(\w+) (\w+.\w+)/);
	          var texture = new _Texture2['default'](basePath + matchArray[2], canvas);
	          texture.name = matchArray[2];
	          materials[iMCount].diffuseTexture = texture;
	        }
	      }
	      this._materials = materials;
	    }
	  }, {
	    key: 'constructMesh',
	    value: function constructMesh(objText, basePath, canvas) {

	      console.log(basePath);

	      var objTextRows = objText.split('\n');

	      var vCount = 0;
	      var fCount = 0;
	      var vnCount = 0;
	      var vtCount = 0;

	      var outputRows = [];
	      for (var i = 0; i < objTextRows.length; i++) {
	        var matchArray = objTextRows[i].match(/^(\w+) (\w+)/);
	        if (matchArray === null) {
	          continue;
	        }

	        // material file
	        if (matchArray[1] === "mtllib") {
	          this.loadMaterialFromFile(basePath, matchArray[2] + '.mtl', canvas);
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
	          fCount++;
	        }
	        outputRows.push(matchArray[1] + ' ' + matchArray[2]);
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
	          matchArray = objTextRows[i].match(/^(\w+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+)/);
	          //          pvCoord[vCount].x=-x;//OBJは右手、Direct3Dは左手座標系。
	          pvCoord[vCount] = new _Vector32['default']();
	          pvCoord[vCount].x = parseFloat(matchArray[2]);
	          pvCoord[vCount].y = parseFloat(matchArray[3]);
	          pvCoord[vCount].z = parseFloat(matchArray[4]);
	          vCount++;
	        }

	        //法線 読み込み
	        if (matchArray[1] === "vn") {
	          matchArray = objTextRows[i].match(/^(\w+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+)/);
	          //          pvNormal[vnCount].x=-x;//OBJは右手、Direct3Dは左手座標系。
	          pvNormal[vnCount] = new _Vector32['default']();
	          pvNormal[vnCount].x = parseFloat(matchArray[2]);
	          pvNormal[vnCount].y = parseFloat(matchArray[3]);
	          pvNormal[vnCount].z = parseFloat(matchArray[4]);
	          vnCount++;
	        }

	        //テクスチャー座標 読み込み
	        if (matchArray[1] === "vt") {
	          matchArray = objTextRows[i].match(/^(\w+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+)/);
	          pvTexture[vtCount] = new _Vector22['default']();
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

	      this._indexBuffers = new Array(this._materials); //GLuint[g_dwNumMaterial];

	      var boFlag = false;

	      this._FaceN = fCount;
	      var iFaceBufferArray = new Array(this._FaceN * 3);
	      fCount = 0;
	      var partFCount = 0;

	      for (var i = 0; i < this._materials.length; i++) {
	        partFCount = 0;

	        for (var j = 0; j < objTextRows.length && fCount < this._FaceN; j++) {
	          var matchArray = objTextRows[j].match(/^(\w+) (\w+)/);

	          if (matchArray === null) {
	            continue;
	          }

	          if (matchArray[1] === "usemtl") {
	            if (matchArray[2] === this._materials[i].name) {
	              boFlag = true;
	            } else {
	              boFlag = false;
	            }
	          }

	          if (matchArray[1] === "f" && boFlag) {
	            var v1 = 0,
	                v2 = 0,
	                v3 = 0;
	            var vn1 = 0,
	                vn2 = 0,
	                vn3 = 0;
	            var vt1 = 0,
	                vt2 = 0,
	                vt3 = 0;

	            if (this._materials[i].diffuseTexture) {

	              var _matchArray = objTextRows[j].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
	              v1 = _matchArray[2];
	              vt1 = _matchArray[3];
	              vn1 = _matchArray[4];
	              v2 = _matchArray[5];
	              vt2 = _matchArray[6];
	              vn2 = _matchArray[7];
	              v3 = _matchArray[8];
	              vt3 = _matchArray[9];
	              vn3 = _matchArray[10];

	              if (vn1) {
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
	                var _matchArray2 = objTextRows[j].match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
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
	            } else {
	              var _matchArray3 = objTextRows[j].match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
	              v1 = _matchArray3[2];
	              vn1 = _matchArray3[3];
	              v2 = _matchArray3[4];
	              vn2 = _matchArray3[5];
	              v3 = _matchArray3[6];
	              vn3 = _matchArray3[7];

	              if (vn1) {
	                positions[fCount * 3] = pvCoord[v1 - 1];
	                positions[fCount * 3 + 1] = pvCoord[v2 - 1];
	                positions[fCount * 3 + 2] = pvCoord[v3 - 1];
	                normals[fCount * 3] = pvNormal[vn1 - 1];
	                normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
	                normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
	              } else {
	                var _matchArray4 = objTextRows[j].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
	                v1 = _matchArray4[2];
	                vt1 = _matchArray4[3];
	                vn1 = _matchArray4[4];
	                v2 = _matchArray4[5];
	                vt2 = _matchArray4[6];
	                vn2 = _matchArray4[7];
	                v3 = _matchArray4[8];
	                vt3 = _matchArray4[9];
	                vn3 = _matchArray4[10];

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

	            iFaceBufferArray[partFCount * 3] = fCount * 3;
	            iFaceBufferArray[partFCount * 3 + 1] = fCount * 3 + 1;
	            iFaceBufferArray[partFCount * 3 + 2] = fCount * 3 + 2;

	            partFCount++;
	            fCount++;
	          }
	        }

	        if (fCount === 0) //使用されていないマテリアル対策
	          {
	            this._indexBuffers[i] = null;
	            continue;
	          }

	        this._materials[i].faceN = partFCount;

	        indices[i] = iFaceBufferArray.concat();
	      }

	      var mesh = new _Mesh2['default'](canvas);
	      mesh.materials = this._materials;
	      mesh.setVerticesData({
	        position: positions,
	        texcoord: texcoords,
	        normal: normals,
	        indices: indices
	      });

	      return mesh;
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

	exports['default'] = ObjLoader;

	_globals2['default']["ObjLoader"] = ObjLoader;
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	module.exports = __webpack_require__(25).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(8)
	  , global         = __webpack_require__(24)
	  , has            = __webpack_require__(70)
	  , SUPPORT_DESC   = __webpack_require__(71)
	  , $def           = __webpack_require__(23)
	  , $redef         = __webpack_require__(72)
	  , $fails         = __webpack_require__(26)
	  , shared         = __webpack_require__(68)
	  , setTag         = __webpack_require__(75)
	  , uid            = __webpack_require__(69)
	  , wks            = __webpack_require__(67)
	  , keyOf          = __webpack_require__(76)
	  , $names         = __webpack_require__(48)
	  , enumKeys       = __webpack_require__(77)
	  , isArray        = __webpack_require__(78)
	  , isObject       = __webpack_require__(34)
	  , anObject       = __webpack_require__(35)
	  , toIObject      = __webpack_require__(18)
	  , createDesc     = __webpack_require__(74)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = SUPPORT_DESC && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  var args = [it]
	    , i    = 1
	    , replacer, $replacer;
	  while(arguments.length > i)args.push(arguments[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(SUPPORT_DESC && !__webpack_require__(79)){
	    $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = wks(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);

	setter = true;

	$def($def.G + $def.W, {Symbol: $Symbol});

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $def($def.S + $def.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(68)('wks')
	  , Symbol = __webpack_require__(24).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(69))('Symbol.' + name));
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(24)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(26)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(8)
	  , createDesc = __webpack_require__(74);
	module.exports = __webpack_require__(71) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(70)
	  , hide = __webpack_require__(73)
	  , TAG  = __webpack_require__(67)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(8)
	  , toIObject = __webpack_require__(18);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(8);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(20);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	__webpack_require__(83);
	__webpack_require__(89);
	__webpack_require__(93);
	module.exports = __webpack_require__(25).Promise;

/***/ },
/* 82 */
/***/ function(module, exports) {

	

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(84)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(86)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(85)
	  , defined   = __webpack_require__(21);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 85 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(79)
	  , $def            = __webpack_require__(23)
	  , $redef          = __webpack_require__(72)
	  , hide            = __webpack_require__(73)
	  , has             = __webpack_require__(70)
	  , SYMBOL_ITERATOR = __webpack_require__(67)('iterator')
	  , Iterators       = __webpack_require__(87)
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(88)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(8).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(75)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(8)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(73)(IteratorPrototype, __webpack_require__(67)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(74)(1,next)});
	  __webpack_require__(75)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	var Iterators = __webpack_require__(87);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(91)
	  , step       = __webpack_require__(92)
	  , Iterators  = __webpack_require__(87)
	  , toIObject  = __webpack_require__(18);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(86)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(8)
	  , LIBRARY    = __webpack_require__(79)
	  , global     = __webpack_require__(24)
	  , ctx        = __webpack_require__(36)
	  , classof    = __webpack_require__(94)
	  , $def       = __webpack_require__(23)
	  , isObject   = __webpack_require__(34)
	  , anObject   = __webpack_require__(35)
	  , aFunction  = __webpack_require__(37)
	  , strictNew  = __webpack_require__(95)
	  , forOf      = __webpack_require__(96)
	  , setProto   = __webpack_require__(33).set
	  , same       = __webpack_require__(101)
	  , species    = __webpack_require__(102)
	  , SPECIES    = __webpack_require__(67)('species')
	  , RECORD     = __webpack_require__(69)('record')
	  , asap       = __webpack_require__(103)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(71)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var isPromise = function(it){
	  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
	};
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    this[RECORD] = record;
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(108)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = anObject(anObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
	        fail: typeof onRejected == 'function'  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = res;
	        react.rej = rej;
	      });
	      aFunction(react.res);
	      aFunction(react.rej);
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	__webpack_require__(75)(P, PROMISE);
	species(P);
	species(Wrapper = __webpack_require__(25)[PROMISE]);

	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new this(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(109)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(20)
	  , TAG = __webpack_require__(67)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(36)
	  , call        = __webpack_require__(97)
	  , isArrayIter = __webpack_require__(98)
	  , anObject    = __webpack_require__(35)
	  , toLength    = __webpack_require__(99)
	  , getIterFn   = __webpack_require__(100);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(35);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(87)
	  , ITERATOR  = __webpack_require__(67)('iterator');
	module.exports = function(it){
	  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(85)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(94)
	  , ITERATOR  = __webpack_require__(67)('iterator')
	  , Iterators = __webpack_require__(87);
	module.exports = __webpack_require__(25).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(8)
	  , SPECIES = __webpack_require__(67)('species');
	module.exports = function(C){
	  if(__webpack_require__(71) && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(24)
	  , macrotask = __webpack_require__(104).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , isNode    = __webpack_require__(20)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    if(domain)domain.enter();
	    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	}

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx                = __webpack_require__(36)
	  , invoke             = __webpack_require__(106)
	  , html               = __webpack_require__(107)
	  , cel                = __webpack_require__(105)
	  , global             = __webpack_require__(24)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(20)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(34)
	  , document = __webpack_require__(24).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24).document && document.documentElement;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(72);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(67)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(9)['default'];

	var _get = __webpack_require__(14)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _Shader = __webpack_require__(44);

	var _Shader2 = _interopRequireDefault(_Shader);

	var _SimpleShader2 = __webpack_require__(49);

	var _SimpleShader3 = _interopRequireDefault(_SimpleShader2);

	var LambertShaderSource = (function () {
	  function LambertShaderSource() {
	    _classCallCheck(this, LambertShaderSource);
	  }

	  _createClass(LambertShaderSource, [{
	    key: 'VSDefine_LambertShaderSource',
	    value: function VSDefine_LambertShaderSource(in_, out_, f, lights) {
	      var shaderText = '';
	      if (_Shader2['default']._exist(f, GLBoost.NORMAL)) {
	        shaderText += in_ + ' vec3 aVertex_normal;\n';
	        shaderText += out_ + ' vec3 normal;\n';
	      }
	      shaderText += out_ + ' vec4 position;\n';
	      shaderText += 'uniform mat4 modelViewMatrix;\n';
	      shaderText += 'uniform mat3 invNormalMatrix;\n';
	      shaderText += 'uniform vec4 lightPosition[' + lights.length + '];\n';
	      shaderText += out_ + ' vec4 lightPos[' + lights.length + '];\n';

	      return shaderText;
	    }
	  }, {
	    key: 'VSTransform_LambertShaderSource',
	    value: function VSTransform_LambertShaderSource(existCamera_f, f, lights) {
	      var shaderText = '';
	      shaderText += '  position = modelViewMatrix * vec4(aVertex_position, 1.0);\n';
	      if (_Shader2['default']._exist(f, GLBoost.NORMAL)) {
	        if (existCamera_f) {
	          shaderText += '  normal = normalize(invNormalMatrix * aVertex_normal);\n';
	        } else {
	          shaderText += '  normal = aVertex_normal;\n';
	        }
	      }
	      for (var i = 0; i < lights.length; i++) {
	        if (existCamera_f) {
	          shaderText += '  lightPos[' + i + '].xyz = mat3(modelViewMatrix) * lightPosition[' + i + '].xyz;\n';
	          shaderText += '  lightPos[' + i + '].w = lightPosition[' + i + '].w;\n';
	        } else {
	          shaderText += '  lightPos[' + i + '] = lightPosition[' + i + '];\n';
	        }
	      }
	      return shaderText;
	    }
	  }, {
	    key: 'FSDefine_LambertShaderSource',
	    value: function FSDefine_LambertShaderSource(in_, f, lights) {
	      var shaderText = '';
	      if (_Shader2['default']._exist(f, GLBoost.NORMAL)) {
	        shaderText += in_ + ' vec3 normal;\n';
	      }
	      shaderText += in_ + ' vec4 position;\n';
	      shaderText += in_ + ' vec4 lightPos[' + lights.length + '];\n';
	      shaderText += 'uniform vec4 lightDiffuse[' + lights.length + '];\n';

	      return shaderText;
	    }
	  }, {
	    key: 'FSShade_LambertShaderSource',
	    value: function FSShade_LambertShaderSource(f, gl, lights) {
	      var shaderText = '';

	      shaderText += '  vec4 surfaceColor = rt1;\n';
	      shaderText += '  rt1 = vec4(0.0, 0.0, 0.0, 1.0);\n';

	      shaderText += '  for (int i=0; i<' + lights.length + '; i++) {\n';
	      // if PointLight: lightPos[i].w === 1.0      if DirecitonalLight: lightPos[i].w === 0.0
	      shaderText += '    vec3 light = normalize(lightPos[i].xyz - position.xyz * lightPos[i].w);\n';
	      shaderText += '    float diffuse = max(dot(light, normal), 0.0);\n';
	      shaderText += '    rt1.rgb += lightDiffuse[i].rgb * diffuse * surfaceColor.rgb;\n';
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

	      if (existCamera_f) {
	        shaderProgram.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'modelViewMatrix');
	        shaderProgram.invNormalMatrix = gl.getUniformLocation(shaderProgram, 'invNormalMatrix');
	      }
	      for (var i = 0; i < lights.length; i++) {
	        shaderProgram['lightPosition_' + i] = gl.getUniformLocation(shaderProgram, 'lightPosition[' + i + ']');
	        shaderProgram['lightDiffuse_' + i] = gl.getUniformLocation(shaderProgram, 'lightDiffuse[' + i + ']');
	      }

	      return vertexAttribsAsResult;
	    }
	  }]);

	  return LambertShaderSource;
	})();

	exports.LambertShaderSource = LambertShaderSource;

	var LambertShader = (function (_SimpleShader) {
	  _inherits(LambertShader, _SimpleShader);

	  function LambertShader(canvas) {
	    _classCallCheck(this, LambertShader);

	    _get(Object.getPrototypeOf(LambertShader.prototype), 'constructor', this).call(this, canvas);
	    LambertShader.mixin(LambertShaderSource);
	  }

	  return LambertShader;
	})(_SimpleShader3['default']);

	exports['default'] = LambertShader;

/***/ }
/******/ ]);