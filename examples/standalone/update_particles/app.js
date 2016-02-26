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

var directionalLight = new GLBoost.DirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(0, 0, -10));
scene.add( directionalLight );


var wide = 10;
var particlesPosition = [];
for (let i=0; i<100; i++) {
  particlesPosition.push(new GLBoost.Vector3((Math.random() - 0.5)*wide, (Math.random() - 0.5)*wide, (Math.random() - 0.5)*wide));
}

var particleGeometry = new GLBoost.Particle(
  {
    position: particlesPosition
  }, 0.5, 0.5, null, GLBoost.DYNAMIC_DRAW);

var material = new GLBoost.ClassicMaterial();
var texture = new GLBoost.Texture('resources/iceball.png');
material.diffuseTexture = texture;
var particle = new GLBoost.Mesh(particleGeometry, material);

scene.add(particle);

scene.prepareForRender();


var render = function(){
  renderer.clearCanvas();
  renderer.draw(scene);

  var rotateMatrix = GLBoost.Matrix33.rotateY(-5.0);
  var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
  camera.eye = rotatedVector;

  for (let i=0; i<100; i++) {
    particlesPosition[i].y -= 0.1;
    if (particlesPosition[i].y < -1.0) {
      particlesPosition[i].y = 5.0;
    }
  }
  particleGeometry.updateVerticesData({
    position: particlesPosition
  }, 0.5, 0.5, null);


  requestAnimationFrame(render);
};
render();
