"use strict";

var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:0.5, green:0.5, blue:0.5, alpha:1}});

var scene = new GLBoost.Scene();

var camera = new GLBoost.Camera(
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
scene.add( camera );

var directionalLight = new GLBoost.DirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(0, 0, -10), '#world');
scene.add( directionalLight );



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

    shaderText += '  rt1 = vec4(1.0 - rt1.x, 1.0 - rt1.y, 1.0 - rt1.z, 1.0);\n';


    return shaderText;
  }

  prepare_MyCustomShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

    var vertexAttribsAsResult = [];

    shaderProgram.time = gl.getUniformLocation(shaderProgram, 'time');

    return vertexAttribsAsResult;
  }
}


class MyCustomShader extends GLBoost.HalfLambertShader {
  constructor(canvas) {
    super(canvas);
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
var promise = objLoader.loadObj('resouces/teapot/teapot.obj', '#world', MyCustomShader);
promise.then(function(mesh) {
//            console.log(mesh);

  scene.add( mesh );

  scene.prepareForRender();



  var render = function(){
    renderer.clearCanvas();
    renderer.draw(scene);

    var rotateMatrix = GLBoost.Matrix33.rotateY(-1.0);
    var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    mesh.geometry._materials.forEach(function(material){
      var myCustomShader = material.shader;
      myCustomShader.increaseTime(0.16);
      myCustomShader.dirty = true;

    });

    requestAnimationFrame(render);
  };
  render();

});
