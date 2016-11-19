
var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 640;

phina.globalize();

phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function(options) {
    this.superInit();

    var layer = phina.display.GLBoostLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);

    var glBoostContext = layer.glBoostContext;

    var positions = [
      new GLBoost.Vector3(-0.5, -0.5, 0.0),
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      new GLBoost.Vector3(-0.5,  0.5, 0.0),

      new GLBoost.Vector3(-0.5, 0.5, 0.0),
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      new GLBoost.Vector3(0.5,  0.5, 0.0)

    ];
    var colors = [
      new GLBoost.Vector4(0.0, 1.0, 1.0, 1.0),
      new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0),
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),

      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),
      new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0),
      new GLBoost.Vector4(1.0, 0.0, 0.0, 1.0)

    ];
    var normals = [
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),

      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),

    ];
    var shapetarget_1 = [
      new GLBoost.Vector3(-1.0, -0.5, 0.0),
      new GLBoost.Vector3(1.0, -0.5, 0.0),
      new GLBoost.Vector3(-1.0,  0.5, 0.0),

      new GLBoost.Vector3(-1.0, 0.5, 0.0),
      new GLBoost.Vector3(1.0, -0.5, 0.0),
      new GLBoost.Vector3(1.0,  0.5, 0.0)
    ];
    var shapetarget_2 = [
      new GLBoost.Vector3(-0.5, -1.0, 0.0),
      new GLBoost.Vector3(0.5, -1.0, 0.0),
      new GLBoost.Vector3(-0.5,  1.0, 0.0),

      new GLBoost.Vector3(-0.5, 1.0, 0.0),
      new GLBoost.Vector3(0.5, -1.0, 0.0),
      new GLBoost.Vector3(0.5,  1.0, 0.0)
    ];

    var geometry = glBoostContext.createBlendShapeGeometry();
    geometry.setVerticesData({
      position: positions,
      color: colors,
      normal: normals,
      shapetarget_1: shapetarget_1,
      shapetarget_2: shapetarget_2
    });
    var matterial = glBoostContext.createClassicMaterial();
    matterial.shaderClass = GLBoost.PhongShader;
    var mesh = glBoostContext.createMesh(geometry, matterial);
    layer.scene.addChild( mesh );

    var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(0.75, 0.75, 0.75), new GLBoost.Vector3(0, 0, -10));
    layer.scene.addChild( directionalLight );

    layer.expression.prepareToRender();

    var theta = 0.02;
    var value = 0;
    layer.update = function() {
      value += theta;
      geometry.blendWeight_1 = value;
      geometry.blendWeight_2 = 1 - value;

      if (value > 1.0) {
        value = 1.0;
        theta *= -1;
      } else if (theta < 0) {
        value = 0;
        theta *= -1;
      }

    };


    var label = Label('phina.jsとGLBoostの\n夢の共演！').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();
  }
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });

  app.run();
});
