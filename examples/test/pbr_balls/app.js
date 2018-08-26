var canvas = document.getElementById("world");
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

var renderer = glBoostContext.createRenderer({
  clearColor: {
    red: 0.0,
    green: 0.0,
    blue: 0.0,
    alpha: 1
  }
});

// make a scene
var scene = glBoostContext.createScene();

// createSphere(radius, widthSegments, heightSegments, vertexColor)
var geometrySphere = glBoostContext.createSphere(0.5, 24, 24, null);


// ・縦軸
//   [Metal]
//      ↑
//      ↓
//   [Non-metal]
// 
// ・横軸
//   [Smooth]←→[Rough]
//
for(var r = 0.0; r <= 1.0; r += 0.25) {
    for(var m = 0.0; m <= 1.0; m += 0.25) {
        // setup material
        var material = glBoostContext.createPBRMetallicRoughnessMaterial();
        //var texture = glBoostContext.createTexture('http://jsrun.it/assets/U/L/K/7/ULK7v.jpg');
        //material.setTexture(texture);
        material.baseColor = new GLBoost.Vector3(1.0, 1.0, 1.0);
        material.metallic = m;
        material.roughness = r;
        
        var meshSphere = glBoostContext.createMesh(geometrySphere, material);
        meshSphere.translate = new GLBoost.Vector3((r-0.5)*4, (m-0.5)*4, 0);
        
        scene.addChild(meshSphere);
    }
}


//var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(0, 0, -1));
var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(90, 0, 0));
//directionalLight.rotate = new GLBoost.Vector3(90,0,0);
scene.addChild( directionalLight );


var camera = glBoostContext.createOrthoCamera({
  eye: new GLBoost.Vector3(0.0, 0.0, 10.0),
  center: new GLBoost.Vector3(0.0, 0.0, 0.0),
  up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
  left: -2.5,
  right: 2.5,
  top: 2.5,
  bottom: -2.5,
  zNear: 10.0,
  zFar: 1000.0
});

/*
var camera = glBoostContext.createPerspectiveCamera({
  eye: new GLBoost.Vector3(0.0, 0.0, 2.6),
  center: new GLBoost.Vector3(0.0, 0.0, 0.0),
  up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
  fovy: 45.0,
  aspect: 1.0,
  zNear: 0.1,
  zFar: 1000.0
});
*/
camera.cameraController = glBoostContext.createCameraController();
scene.addChild(camera);

var expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

var angle = 0;
var axis = new GLBoost.Vector3(0,1,0);

var render = function() {
  renderer.clearCanvas();
  renderer.draw(expression);

  //meshSphere.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));

  angle += 0.02;
    
  requestAnimationFrame(render);
};

render();