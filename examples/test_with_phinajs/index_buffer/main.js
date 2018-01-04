var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.VALUE_TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

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

    var indices = [
      0, 1, 3, 3, 1, 2
    ];

    var positions = [
      new GLBoost.Vector3(-1.5, -0.5, 0.0),
      new GLBoost.Vector3(-0.5, -0.5, 0.0),
      new GLBoost.Vector3(-0.5,  0.5, 0.0),
      new GLBoost.Vector3(-1.5, 0.5, 0.0)
    ];
    var colors = [
      new GLBoost.Vector3(0.0, 1.0, 1.0),
      new GLBoost.Vector3(1.0, 1.0, 0.0),
      new GLBoost.Vector3(1.0, 0.0, 0.0),
      new GLBoost.Vector3(0.0, 0.0, 1.0)
    ];

    var geometry1 = glBoostContext.createGeometry();
    geometry1.setVerticesData({
      position: positions,
      color: colors
    }, [indices]);
    var mesh1 = glBoostContext.createMesh(geometry1, null);
    layer.scene.addChild( mesh1 );

    var positions = [
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      new GLBoost.Vector3(1.5, -0.5, 0.0),
      new GLBoost.Vector3(1.5,  0.5, 0.0),
      new GLBoost.Vector3(0.5, 0.5, 0.0)
      ];
    var texcoords = [
      new GLBoost.Vector2(0.0, 1.0),
      new GLBoost.Vector2(1.0, 1.0),
      new GLBoost.Vector2(1.0, 0.0),
      new GLBoost.Vector2(0.0, 0.0)
      ];

    var geometry2 = glBoostContext.createGeometry();
    var texture = glBoostContext.createTexture('//cdn.rawgit.com/emadurandal/GLBoost/master/examples/for_phina/index_buffer/resources/texture.png');
    var material = glBoostContext.createClassicMaterial();
    material.setTexture(texture);
    geometry2.setVerticesData({
      position: positions,
      texcoord: texcoords
    }, [indices]);
    var mesh2 = glBoostContext.createMesh(geometry2, material);
    layer.scene.addChild( mesh2 );

    var camera = glBoostContext.createPerspectiveCamera({
      eye: new GLBoost.Vector3(0.0, 0, 5.0),
      center: new GLBoost.Vector3(0.0, 0.0, 0.0),
      up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
      fovy: 45.0,
      aspect: 1.0,
      zNear: 0.1,
      zFar: 1000.0
    });
    layer.scene.addChild( camera );

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

