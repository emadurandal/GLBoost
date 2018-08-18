"use strict";

var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.VALUE_TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

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


var objLoader = GLBoost.ObjLoader.getInstance();
var promise = objLoader.loadObj(glBoostContext, 'resources/teapot/teapot.obj');

promise.then(function(mesh) {
//            console.log(mesh);

  scene.addChild( mesh );

  mesh.getAppropriateMaterials().forEach(function(material){
    const texture = material.getOneTexture();

    const freeShader = glBoostContext.createFreeShader(
      `
    precision highp float;
    attribute vec3 aVertex_position;
    attribute vec2 aVertex_texcoord;
    varying vec2 v_texcoord;
     
    uniform mat4 worldMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;
    uniform float u_time;
    
    void main(void) {
    vec4 position_local = vec4(aVertex_position, 1.0);
    mat4 pvwMatrix = projectionMatrix * viewMatrix * worldMatrix;
    gl_Position = pvwMatrix * position_local;
    gl_Position.x = gl_Position.x + sin(u_time + gl_Position.y) * 2.0;
    v_texcoord = aVertex_texcoord;
  }
    `,
    
      `
      precision highp float;
      varying vec2 v_texcoord;
      uniform sampler2D uTexture;

      void main(void) {
        vec4 rt0 = texture2D(uTexture, v_texcoord);
        gl_FragColor = vec4(1.0 - rt0.x, 1.0 - rt0.y, 1.0 - rt0.z, 1.0);
      }
      `,
      {
        'aVertex_position': 'POSITION',
        'aVertex_texcoord': 'TEXCOORD'
      },
      {
        'worldMatrix': 'WORLD',
        'viewMatrix': 'VIEW',
        'projectionMatrix': 'PROJECTION',
        'uTexture': 'TEXTURE',
        'u_time': 0,
      },
      {
        'uTexture': texture.userFlavorName
      }
    );
    

    material.shaderInstance = freeShader;
  });

  var expression = glBoostContext.createExpressionAndRenderPasses(1);
  expression.renderPasses[0].scene = scene;
  expression.prepareToRender();


  let lastRealTime = Date.now();
  var render = function(){
    renderer.clearCanvas();
    renderer.draw(expression);

    var rotateMatrix = GLBoost.Matrix33.rotateY(-1.0);
    var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    mesh.getAppropriateMaterials().forEach(function(material){
      let time = (Date.now() - lastRealTime)/100;
      material.shaderParameters.u_time = time;
    });

    requestAnimationFrame(render);
  };
  render();

});
