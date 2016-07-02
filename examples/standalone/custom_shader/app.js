(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
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
  }();

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

  babelHelpers;

  var arg = new Object();
  var pair = location.search.substring(1).split('&');
  for (var i = 0; pair[i]; i++) {
    var kv = pair[i].split('=');
    arg[kv[0]] = kv[1];
  }

  GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

  var canvas = document.getElementById("world");

  var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

  var renderer = glBoostContext.createRenderer({ clearColor: { red: 0.5, green: 0.5, blue: 0.5, alpha: 1 } });

  var scene = glBoostContext.createScene();

  var camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 1.5, 10.0),
    center: new GLBoost.Vector3(0.0, 1.5, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
  }, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 500.0
  });
  scene.addChild(camera);

  var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(0, 0, -10));
  scene.addChild(directionalLight);

  var MyCustomShaderSource = function () {
    function MyCustomShaderSource() {
      babelHelpers.classCallCheck(this, MyCustomShaderSource);
    }

    babelHelpers.createClass(MyCustomShaderSource, [{
      key: 'VSDefine_MyCustomShaderSource',
      value: function VSDefine_MyCustomShaderSource(in_, out_, f, lights) {
        var shaderText = '';

        shaderText += 'uniform float time;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_MyCustomShaderSource',
      value: function VSTransform_MyCustomShaderSource(existCamera_f, f, lights) {
        var shaderText = '';
        shaderText += '  gl_Position.x = gl_Position.x + sin(time + gl_Position.y) * 2.0;\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_MyCustomShaderSource',
      value: function FSShade_MyCustomShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  rt0 = vec4(1.0 - rt0.x, 1.0 - rt0.y, 1.0 - rt0.z, 1.0);\n';

        return shaderText;
      }
    }, {
      key: 'prepare_MyCustomShaderSource',
      value: function prepare_MyCustomShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

        var vertexAttribsAsResult = [];

        shaderProgram.time = gl.getUniformLocation(shaderProgram, 'time');

        return vertexAttribsAsResult;
      }
    }]);
    return MyCustomShaderSource;
  }();

  var MyCustomShader = function (_GLBoost$HalfLambertS) {
    babelHelpers.inherits(MyCustomShader, _GLBoost$HalfLambertS);

    function MyCustomShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, MyCustomShader);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MyCustomShader).call(this, glBoostContext, basicShader));

      MyCustomShader.mixin(MyCustomShaderSource);

      _this._time = 0;
      return _this;
    }

    babelHelpers.createClass(MyCustomShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, material) {
        babelHelpers.get(Object.getPrototypeOf(MyCustomShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, material);

        gl.uniform1f(glslProgram.time, this._time);
      }
    }, {
      key: 'increaseTime',
      value: function increaseTime(delta) {
        this._time += delta;
      }
    }]);
    return MyCustomShader;
  }(GLBoost.HalfLambertShader);

  var objLoader = GLBoost.ObjLoader.getInstance();
  var promise = objLoader.loadObj(glBoostContext, 'resources/teapot/teapot.obj', MyCustomShader, null);
  promise.then(function (mesh) {
    //            console.log(mesh);

    scene.addChild(mesh);

    var expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    var render = function render() {
      renderer.clearCanvas();
      renderer.draw(expression);

      var rotateMatrix = GLBoost.Matrix33.rotateY(-1.0);
      var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
      camera.eye = rotatedVector;

      mesh.geometry._materials.forEach(function (material) {
        var myCustomShader = material.shaderInstance;
        myCustomShader.increaseTime(0.16);
        myCustomShader.dirty = true;
      });

      requestAnimationFrame(render);
    };
    render();
  });

}));