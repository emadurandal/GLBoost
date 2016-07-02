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
  var gl = renderer.glContext;
  gl.disable(gl.DEPTH_TEST);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

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

  var attributeName = 'particlesVelocity';

  var MyCustomShaderSource = function () {
    function MyCustomShaderSource() {
      babelHelpers.classCallCheck(this, MyCustomShaderSource);
    }

    babelHelpers.createClass(MyCustomShaderSource, [{
      key: 'VSDefine_MyCustomShaderSource',
      value: function VSDefine_MyCustomShaderSource(in_, out_, f, lights) {
        var shaderText = '';

        shaderText += in_ + ' vec3 aVertex_' + attributeName + ';\n';
        shaderText += 'uniform float time;\n';
        shaderText += 'uniform float endHeight;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_MyCustomShaderSource',
      value: function VSTransform_MyCustomShaderSource(existCamera_f, f, lights) {
        var shaderText = '';
        shaderText += '  vec3 gravity = vec3(0.0, -9.8, 0.0);\n';
        shaderText += '  float t = -1.0 * aVertex_particlesVelocity.y / gravity.y + sqrt(2.0/gravity.y * (endHeight - cameraCenterPos.y + 1.0/2.0 * aVertex_particlesVelocity.y * aVertex_particlesVelocity.y / gravity.y));\n';
        shaderText += '  float cycleTime = time - floor(time/t) * t;\n';
        shaderText += '  vec3 cameraPos = cameraEachPointPos.xyz + aVertex_particlesVelocity * cycleTime + 1.0/2.0 * gravity * cycleTime * cycleTime;\n';
        //shaderText += '  vec3 cameraPos = cameraEachPointPos.xyz + aVertex_particlesVelocity * time + 1.0/2.0 * gravity * time * time;\n';
        shaderText += '  gl_Position = projectionMatrix * vec4(cameraPos, 1.0);\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_MyCustomShaderSource',
      value: function FSShade_MyCustomShaderSource(f, gl, lights) {
        var shaderText = '';

        //    shaderText += '  rt0 = vec4(1.0 - rt0.x, 1.0 - rt0.y, 1.0 - rt0.z, 1.0);\n';

        return shaderText;
      }
    }, {
      key: 'prepare_MyCustomShaderSource',
      value: function prepare_MyCustomShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

        var vertexAttribsAsResult = [];

        shaderProgram['vertexAttribute_' + attributeName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attributeName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attributeName]);
        vertexAttribsAsResult.push(attributeName);

        shaderProgram.time = gl.getUniformLocation(shaderProgram, 'time');
        shaderProgram.endHeight = gl.getUniformLocation(shaderProgram, 'endHeight');

        return vertexAttribsAsResult;
      }
    }]);
    return MyCustomShaderSource;
  }();

  var MyCustomShader = function (_GLBoost$HalfLambertS) {
    babelHelpers.inherits(MyCustomShader, _GLBoost$HalfLambertS);

    function MyCustomShader(glBoostContext, basicShader, ParticleShaderSource) {
      babelHelpers.classCallCheck(this, MyCustomShader);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MyCustomShader).call(this, glBoostContext, basicShader));

      if (ParticleShaderSource) {
        MyCustomShader.mixin(ParticleShaderSource);
        MyCustomShader.mixin(MyCustomShaderSource);
      }

      _this._time = 0;
      return _this;
    }

    babelHelpers.createClass(MyCustomShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, material) {
        babelHelpers.get(Object.getPrototypeOf(MyCustomShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, material);

        gl.uniform1f(glslProgram.time, this._time);
        gl.uniform1f(glslProgram.endHeight, -3.5);

        return true;
      }
    }, {
      key: 'increaseTime',
      value: function increaseTime(delta) {
        this._time += delta;
      }
    }]);
    return MyCustomShader;
  }(GLBoost.HalfLambertShader);

  var particlesPosition = [];
  var particlesVelocity = [];

  for (var _i = 0; _i < 100; _i++) {
    particlesPosition.push(new GLBoost.Vector3(Math.random(), Math.random(), Math.random()));
    particlesVelocity.push(new GLBoost.Vector3((Math.random() - 0.5) * 4, Math.random() * 10, (Math.random() - 0.5) * 4));
  }

  var particleGeometry = glBoostContext.createParticle({
    position: particlesPosition,
    particlesVelocity: particlesVelocity
  }, 0.5, 0.5, null, GLBoost.STATIC_DRAW);

  var material = glBoostContext.createClassicMaterial();
  material.shaderClass = MyCustomShader;
  var texture = glBoostContext.createTexture('resources/iceball.png');
  material.diffuseTexture = texture;
  var particle = glBoostContext.createMesh(particleGeometry, material);

  scene.addChild(particle);

  var expression = glBoostContext.createExpressionAndRenderPasses(1);
  expression.renderPasses[0].scene = scene;
  expression.prepareToRender();

  var render = function render() {
    renderer.clearCanvas();
    renderer.draw(expression);

    var rotateMatrix = GLBoost.Matrix33.rotateY(-5.0);
    var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    var myCustomShader = particle.material.shaderInstance;
    myCustomShader.increaseTime(0.016);
    //myCustomShader.dirty = true;

    requestAnimationFrame(render);
  };
  render();

}));