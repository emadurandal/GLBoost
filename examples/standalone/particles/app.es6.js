

"use strict";

var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:0.5, green:0.5, blue:0.5, alpha:1}});
var gl = renderer.glContext;
gl.disable(gl.DEPTH_TEST);
gl.blendFunc( gl.SRC_ALPHA, gl.ONE );

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

//    shaderText += '  rt1 = vec4(1.0 - rt1.x, 1.0 - rt1.y, 1.0 - rt1.z, 1.0);\n';


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
  constructor(canvas, ParticleShaderSource) {
    super(canvas);
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

var particleGeometry = new GLBoost.Particle(
  {
    position: particlesPosition,
    particlesVelocity: particlesVelocity
  }, 0.5, 0.5, null, GLBoost.STATIC_DRAW, '#world');

var material = new GLBoost.ClassicMaterial('#world');
material.shader = new MyCustomShader('#world');
var texture = new GLBoost.Texture('resouces/iceball.png', '#world');
material.diffuseTexture = texture;
var particle = new GLBoost.Mesh(particleGeometry, material);

scene.add(particle);

scene.prepareForRender();


var render = function(){
  renderer.clearCanvas();
  renderer.draw(scene);

  var rotateMatrix = GLBoost.Matrix33.rotateY(-0.10);
  var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
  camera.eye = rotatedVector;

  var myCustomShader = particle.material.shader;
  myCustomShader.increaseTime(0.016);
  //myCustomShader.dirty = true;

  requestAnimationFrame(render);
};
render();
