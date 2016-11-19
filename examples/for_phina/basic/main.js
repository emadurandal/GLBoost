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

    var geometry = glBoostContext.createGeometry();
    geometry.setVerticesData({
      position: positions,
      color: colors
    });
    var mesh = glBoostContext.createMesh(geometry, null);
    layer.scene.addChild( mesh );

    layer.expression.prepareToRender();

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

