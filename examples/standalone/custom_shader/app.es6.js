"use strict";

var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

var canvas = document.getElementById("world");

var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

var renderer = glBoostContext.createRenderer({ clearColor: {red:0.5, green:0.5, blue:0.5, alpha:1}});

var scene = glBoostContext.createScene();

var camera = glBoostContext.createPerspectiveCamera(
  {
    eye: new GLBoost.Vector3(0.0, 1.5, 10.0),
    center: new GLBoost.Vector3(0.0, 1.5, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
  },
  {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 500.0
  }
);
scene.addChild( camera );

var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(0, 0, -10));
scene.addChild( directionalLight );



class MyCustomShaderSource {

  VSDefine_MyCustomShaderSource(in_, out_, f, lights) {
    var shaderText = '';

    shaderText += `uniform float time;\n`;

    return shaderText;
  }

  VSTransform_MyCustomShaderSource(existCamera_f, f, lights) {
    var shaderText = '';
    shaderText += '  gl_Position.x = gl_Position.x + sin(time + gl_Position.y) * 2.0;\n';

    return shaderText;
  }

  FSShade_MyCustomShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  rt0 = vec4(1.0 - rt0.x, 1.0 - rt0.y, 1.0 - rt0.z, 1.0);\n';


    return shaderText;
  }

  prepare_MyCustomShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

    var vertexAttribsAsResult = [];

    shaderProgram.time = gl.getUniformLocation(shaderProgram, 'time');

    return vertexAttribsAsResult;
  }
}


class MyCustomShader extends GLBoost.HalfLambertShader {
  constructor(glBoostContext, basicShader) {
    super(glBoostContext, basicShader);
    MyCustomShader.mixin(MyCustomShaderSource);

    this._time = 0;
  }

  setUniforms(gl, glslProgram, material) {
    super.setUniforms(gl, glslProgram, material);

    gl.uniform1f(glslProgram.time, this._time);
  }

  increaseTime(delta) {
    this._time += delta;
  }
}



var objLoader = GLBoost.ObjLoader.getInstance();
var promise = objLoader.loadObj(glBoostContext, 'resources/teapot/teapot.obj', MyCustomShader, null);
promise.then(function(mesh) {
//            console.log(mesh);

  scene.addChild( mesh );

  var expression = glBoostContext.createExpressionAndRenderPasses(1);
  expression.renderPasses[0].scene = scene;
  expression.prepareToRender();



  var render = function(){
    renderer.clearCanvas();
    renderer.draw(expression);

    var rotateMatrix = GLBoost.Matrix33.rotateY(-1.0);
    var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    mesh.geometry._materials.forEach(function(material){
      var myCustomShader = material.shaderInstance;
      myCustomShader.increaseTime(0.16);
      myCustomShader.dirty = true;

    });

    requestAnimationFrame(render);
  };
  render();

});
