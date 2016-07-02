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
    zFar: 300.0
  }
);
scene.addChild( camera );

var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(0, 0, -10));
scene.addChild( directionalLight );

var attributeName = 'heightpoints';

class MyCustomShaderSource {

  VSDefine_MyCustomShaderSource(in_, out_, f, lights) {
    var shaderText = '';

    shaderText += `${in_} vec3 aVertex_${attributeName};\n`;
    shaderText += `uniform float time;\n`;

    return shaderText;
  }

  VSTransform_MyCustomShaderSource(existCamera_f, f, lights) {
    var shaderText = '';
    shaderText += `  gl_Position.y = gl_Position.y + sin(time + aVertex_${attributeName}.y) * aVertex_${attributeName}.y * 0.8;\n`;
    shaderText += `  gl_Position.x = gl_Position.x + sin(time + aVertex_${attributeName}.x) * aVertex_${attributeName}.x * 0.03 * aVertex_${attributeName}.y;\n`;
    shaderText += `  gl_Position.z = gl_Position.z + sin(time + aVertex_${attributeName}.z) * aVertex_${attributeName}.z * 0.03 * aVertex_${attributeName}.y;\n`;
    shaderText += `  color.r = aVertex_${attributeName}.y*0.1+0.1;\n`;
    shaderText += `  color.g = aVertex_${attributeName}.y*0.1+0.1;\n`;
    shaderText += `  color.b = ((sin(aVertex_${attributeName}.b) + 1.0) * 0.5) * aVertex_${attributeName}.y + 0.2;\n`;

    return shaderText;
  }

  prepare_MyCustomShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

    var vertexAttribsAsResult = [];

    shaderProgram['vertexAttribute_' + attributeName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attributeName);
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attributeName]);
    vertexAttribsAsResult.push(attributeName);

    shaderProgram.time = gl.getUniformLocation(shaderProgram, 'time');

    return vertexAttribsAsResult;
  }
}


class MyCustomShader extends GLBoost.DecalShader {
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

var uSpan = 40;
var vSpan = 40;

var additionalAttributes = {};
additionalAttributes[attributeName] = [];
for(let i=0; i<=vSpan; i++) {
  for(let j=0; j<=uSpan; j++) {
    additionalAttributes.heightpoints.push(new GLBoost.Vector3(Math.random(), Math.random(), Math.random()));
  }
}

var material = glBoostContext.createClassicMaterial();
material.shaderClass = MyCustomShader;
var planeGeometry = glBoostContext.createPlane(10, 10, uSpan, vSpan, additionalAttributes);
var plane = glBoostContext.createMesh(planeGeometry, material);
scene.addChild( plane );

var expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

var render = function(){
  renderer.clearCanvas();
  renderer.draw(expression);

  var rotateMatrix = GLBoost.Matrix33.rotateY(-0.2);
  var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
  camera.eye = rotatedVector;

  var myCustomShader = material.shaderInstance;
  myCustomShader.increaseTime(0.016);
  myCustomShader.dirty = true;

  requestAnimationFrame(render);
};
render();
