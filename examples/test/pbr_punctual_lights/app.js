var DEPTH_TEXTURE_SIZE = 1024;


var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.VALUE_TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;
GLBoost['WEBGL_ONE_USE_EXTENSIONS'] = true;
GLBoost.VALUE_CONSOLE_OUT_FOR_DEBUGGING = true;


var canvas = document.getElementById("world");

var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

var renderer = glBoostContext.createRenderer({
  clearColor: {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    alpha: 1
  }
});

var expression = glBoostContext.createExpressionAndRenderPasses(3);
var plane = null;
var cube = null;
var planeForDepth = null;
var sphereForDepth = null;
var depthTexture = null;
var depthCamera = null;
var camera = null;
var directionOfDirectionalLight = new GLBoost.Vector3(-60, 30, 0);
var directionalLight = null;
(function commonProcess(){
  var material = glBoostContext.createPBRMetallicRoughnessMaterial();
  //material.shaderClass = GLBoost.PBRPrincipledShader;
  //var texture = glBoostContext.createTexture('resources/texture.png');
  //material.setTexture(texture);
  material.baseColor = new GLBoost.Vector3(1.0, 0.765557, 0.336057);
  material.metallic = 1.0;
  material.roughness = 0.7;

  window._material = material;

  var planeGeometry = glBoostContext.createPlane(10, 10, 10, 10, null);
  var sphereGeometry = glBoostContext.createSphere(1, 100, 100);

  plane = glBoostContext.createMesh(planeGeometry, material);
  sphere = glBoostContext.createMesh(sphereGeometry, material);
  sphere.translate = new GLBoost.Vector3(0,2,0);

  var materialForDepth = glBoostContext.createClassicMaterial();
  materialForDepth.shaderClass = GLBoost.PassThroughShader;

  planeForDepth = glBoostContext.createMesh(planeGeometry, materialForDepth);
  sphereForDepth = glBoostContext.createMesh(sphereGeometry, materialForDepth);
  sphereForDepth.translate = new GLBoost.Vector3(0,2,0);


})();

(function shadowMapPass(){
  depthTexture = glBoostContext.createDepthTexturesForRenderTarget(DEPTH_TEXTURE_SIZE, DEPTH_TEXTURE_SIZE);

  var scene = glBoostContext.createScene();
  scene.addChild( planeForDepth );
  scene.addChild( sphereForDepth );
  //scene.addChild( plane );
  //scene.addChild( cube );

  depthCamera = glBoostContext.createOrthoCamera(
      {
        eye: new GLBoost.Vector3(0.0, 5, 15.0),
        center: new GLBoost.Vector3(0.0, 5.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
      },
      {
        left: -1,
        right: 1,
        bottom: -1,
        top: 1,
        zNear: 1,
        zFar: 1.0
      }
  );
  depthCamera.texture = depthTexture;
  scene.addChild( depthCamera );

  expression.renderPasses[0].scene = scene;
  expression.renderPasses[0].setClearDepth(1.0);
  expression.renderPasses[0].specifyRenderTargetTextures([depthTexture]);
  expression.renderPasses[0].setViewportAsFittingToRenderTarget();

  function updateDepthCamera(light){
    scene.updateAABB();
    var aabb = scene.AABB;
    var centerOfAABB = aabb.centerPoint;
    var lengthBtwCenterToCornerOfAABB = aabb.lengthCenterToCorner;
    var normalizedLightDirection = GLBoost.Vector3.normalize(light.direction.clone().multiply(-1));
    var cameraEye = GLBoost.Vector3.add(centerOfAABB, GLBoost.Vector3.multiply(normalizedLightDirection, -(lengthBtwCenterToCornerOfAABB + depthCamera.zNear)));
    var cameraCenter = centerOfAABB;//GLBoost.Vector3.add(cameraEye, normalizedLightDirection);

    depthCamera.eye = cameraEye;
    depthCamera.center = cameraCenter;
    //    depthCamera.eye = new GLBoost.Vector3(0.0, 10, 0.0);
    //    depthCamera.center = new GLBoost.Vector3(0.0, 0, 0.0);
    //depthCamera.up = new GLBoost.Vector3(1.0, 0, 0.0);

    depthCamera.left = -lengthBtwCenterToCornerOfAABB;
    depthCamera.right = lengthBtwCenterToCornerOfAABB;
    depthCamera.bottom = -lengthBtwCenterToCornerOfAABB;
    depthCamera.top = lengthBtwCenterToCornerOfAABB;
    depthCamera.zFar = lengthBtwCenterToCornerOfAABB * 2 + depthCamera.zNear;
//      console.log(aabb.minPoint + ' ' + aabb.maxPoint);
  }
  //expression.renderPasses[0].customFunction = updateDepthCamera.bind(this);
  depthCamera.customFunction = updateDepthCamera.bind(this);

})();

(function renderingPass() {

  var scene = glBoostContext.createScene();

  scene.addChild( plane );
  scene.addChild( sphere );

  directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), directionOfDirectionalLight);
  directionalLight.camera = depthCamera;
  scene.addChild( directionalLight );

  pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
  pointLight.translate = new GLBoost.Vector3(0, 4, 0);
  scene.addChild(pointLight); 

  camera = glBoostContext.createPerspectiveCamera(
      {
        eye: new GLBoost.Vector3(0.0, 5, 15.0),
        center: new GLBoost.Vector3(0.0, 5.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
      },
      {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 10,
        zFar: 30.0
      }
  );
  scene.addChild( camera );

  expression.renderPasses[1].scene = scene;
  expression.renderPasses[1].setClearColor(new GLBoost.Vector4(1, 0.5, 0.5, 1));
})();

(function debugPass() {

  var scene = glBoostContext.createScene();

  var planeGeometry = glBoostContext.createPlane(1, 1, 1, 1, null);
  var material = glBoostContext.createClassicMaterial();
  material.setTexture(depthTexture);
  material.shaderClass = GLBoost.DepthDisplayShader;
  var plane = glBoostContext.createMesh(planeGeometry, material);
  plane.rotate = new GLBoost.Vector3(90, 0, 0);
  plane.translate = new GLBoost.Vector3(0.4, 0.4, 0);

  scene.addChild(plane);

  expression.renderPasses[2].scene = scene;

})();

expression.prepareToRender();

var glBoostMonitor = GLBoost.M_GLBoostMonitor.getInstance();
glBoostMonitor.printGLBoostObjects();
glBoostMonitor.printWebGLResources();

var render = function() {
  renderer.clearCanvas();
  renderer.draw(expression);

  var rotateMatrixForCamera = GLBoost.Matrix33.rotateY(-1.0);
  camera.eye = rotateMatrixForCamera.multiplyVector(camera.eye);
  directionalLight.rotate = new GLBoost.Vector3(directionalLight.rotate.x, directionalLight.rotate.y - 2.0, directionalLight.rotate.z);

  requestAnimationFrame(render);
};

render();
