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
var gl = renderer.glContext;
gl.disable(gl.DEPTH_TEST);
gl.blendFunc( gl.SRC_ALPHA, gl.ONE );

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


var attributeName = 'particlesVelocity';
class MyCustomShaderSource {

  VSDefine_MyCustomShaderSource(in_, out_, f, lights) {
    var shaderText = '';

    shaderText += `${in_} vec3 aVertex_${attributeName};\n`;
    shaderText += `uniform float time;\n`;
    shaderText += `uniform float endHeight;\n`;

    return shaderText;
  }

  VSTransform_MyCustomShaderSource(existCamera_f, f, lights) {
    var shaderText = '';
    shaderText += '  vec3 gravity = vec3(0.0, -9.8, 0.0);\n';
    shaderText += '  float t = -1.0 * aVertex_particlesVelocity.y / gravity.y + sqrt(2.0/gravity.y * (endHeight - cameraCenterPos.y + 1.0/2.0 * aVertex_particlesVelocity.y * aVertex_particlesVelocity.y / gravity.y));\n';
    shaderText += '  float cycleTime = time - floor(time/t) * t;\n';
    shaderText += '  vec3 cameraPos = cameraEachPointPos.xyz + aVertex_particlesVelocity * cycleTime + 1.0/2.0 * gravity * cycleTime * cycleTime;\n';
    //shaderText += '  vec3 cameraPos = cameraEachPointPos.xyz + aVertex_particlesVelocity * time + 1.0/2.0 * gravity * time * time;\n';
    shaderText += '  gl_Position = projectionMatrix * vec4(cameraPos, 1.0);\n';

    return shaderText;
  }

  FSShade_MyCustomShaderSource(f, gl, lights) {
    var shaderText = '';

//    shaderText += '  rt0 = vec4(1.0 - rt0.x, 1.0 - rt0.y, 1.0 - rt0.z, 1.0);\n';


    return shaderText;
  }

  prepare_MyCustomShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

    var vertexAttribsAsResult = [];

    shaderProgram['vertexAttribute_' + attributeName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attributeName);
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attributeName]);
    vertexAttribsAsResult.push(attributeName);

    shaderProgram.time = gl.getUniformLocation(shaderProgram, 'time');
    shaderProgram.endHeight = gl.getUniformLocation(shaderProgram, 'endHeight');

    return vertexAttribsAsResult;
  }
}


class MyCustomShader extends GLBoost.HalfLambertShader {
  constructor(glBoostContext, basicShader, ParticleShaderSource) {
    super(glBoostContext, basicShader);
    if (ParticleShaderSource) {
      MyCustomShader.mixin(ParticleShaderSource);
      MyCustomShader.mixin(MyCustomShaderSource);
    }

    this._time = 0;
  }

  setUniforms(gl, glslProgram, material) {
    super.setUniforms(gl, glslProgram, material);

    gl.uniform1f(glslProgram.time, this._time);
    gl.uniform1f(glslProgram.endHeight, -3.5);

    return true;
  }

  increaseTime(delta) {
    this._time += delta;
  }
}




var particlesPosition = [];
var particlesVelocity = [];

for (let i=0; i<100; i++) {
  particlesPosition.push(new GLBoost.Vector3(Math.random(), Math.random(), Math.random()));
  particlesVelocity.push(new GLBoost.Vector3((Math.random()-0.5)*4, Math.random()*10, (Math.random()-0.5)*4));
}

var particleGeometry = glBoostContext.createParticle(
  {
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


var render = function(){
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
