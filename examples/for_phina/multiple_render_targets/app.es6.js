var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

var SCREEN_WIDTH = 512;
var SCREEN_HEIGHT = 512;

phina.globalize();


class MyCustomShaderSource {

  FSShade_MyCustomShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  rt0 = vec4(rt0.x, rt0.y, rt0.z, 1.0);\n';
    shaderText += '  rt1 = vec4(1.0 - rt0.x, 1.0 - rt0.y, 1.0 - rt0.z, 1.0);\n';

    return shaderText;
  }

}


class MyCustomShader extends GLBoost.DecalShader {
  constructor(glBoostContext, basicShader) {
    super(glBoostContext, basicShader);
    MyCustomShader.mixin(MyCustomShaderSource);
  }

}


phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function(options) {
    this.superInit(options);

    var layer = phina.display.GLBoostLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);

    var glBoostContext = layer.glBoostContext;
    var renderTextures = glBoostContext.createTexturesForRenderTarget(SCREEN_WIDTH, SCREEN_HEIGHT, 2);
    var renderPasses = glBoostContext.createRenderPasses(2);

    var positions = [
      new GLBoost.Vector3(-0.5, -0.5, 0.0),
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      new GLBoost.Vector3(-0.5,  0.5, 0.0),

      new GLBoost.Vector3(-0.5, 0.5, 0.0),
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      new GLBoost.Vector3(0.5,  0.5, 0.0)
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
    var texcoords = [
      new GLBoost.Vector2(0.0, 1.0),
      new GLBoost.Vector2(1.0, 1.0),
      new GLBoost.Vector2(0.0, 0.0),

      new GLBoost.Vector2(0.0, 0.0),
      new GLBoost.Vector2(1.0, 1.0),
      new GLBoost.Vector2(1.0, 0.0)
    ];

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

    var geometry = glBoostContext.createBlendShapeGeometry();
    var texture = glBoostContext.createTexture('resources/texture.png');
    var material = glBoostContext.createClassicMaterial();
    material.shaderClass = MyCustomShader;
    material.diffuseTexture = texture;
    var mesh = glBoostContext.createMesh(geometry, material);
    geometry.setVerticesData({
      position: positions,
      texcoord: texcoords,
      shapetarget_1: shapetarget_1,
      shapetarget_2: shapetarget_2
    });
    var scene = glBoostContext.createScene();
    scene.addChild( camera );
    scene.addChild( mesh );

    renderPasses[0].setClearColor(new GLBoost.Vector4(0, 0, 0, 1));
    renderPasses[0].specifyRenderTargetTextures(renderTextures);
    renderPasses[0].scene = scene;

    var scene2 = glBoostContext.createScene();
    scene2.addChild( camera );
    var geometry2_1 = glBoostContext.createCube(new GLBoost.Vector3(1,1,1), new GLBoost.Vector4(1,1,1,1));
    var material2_1 = glBoostContext.createClassicMaterial();
    material2_1.diffuseTexture = renderTextures[0];
    var mesh2_1 = glBoostContext.createMesh(geometry2_1, material2_1);
    scene2.addChild( mesh2_1 );
    mesh2_1.translate = new GLBoost.Vector3(-1, 0, 0);

    var geometry2_2 = glBoostContext.createCube(new GLBoost.Vector3(1,1,1), new GLBoost.Vector4(1,1,1,1));
    var material2_2 = glBoostContext.createClassicMaterial();
    material2_2.diffuseTexture = renderTextures[1];
    var mesh2_2 = glBoostContext.createMesh(geometry2_2, material2_2);
    scene2.addChild( mesh2_2 );

    mesh2_2.translate = new GLBoost.Vector3(1, 0, 0);

    renderPasses[1].setClearColor(new GLBoost.Vector4(1, 0, 0, 1));
    renderPasses[1].scene = scene2;

    layer.expression.clearRenderPasses();
    layer.expression.addRenderPasses(renderPasses);
    layer.expression.prepareToRender();


    var label = Label('phina.jsとGLBoostの\n夢の共演！').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();

    var tweener = phina.accessory.Tweener();
    tweener.setTarget(geometry);
    tweener
      .set({blendWeight_1: 0.0}).to({blendWeight_1: 1.0}, 500, 'easeInCirc')
      .set({blendWeight_2: 0.0}).to({blendWeight_2: 1.0}, 500, 'easeOutElastic')
      .to({blendWeight_1: 0.0}, 500, 'easeInOutBack')
      .to({blendWeight_2: 0.0}, 500, 'easeOutCirc')
      .setLoop(true);

    let angleDelta = 0;
    layer.update = function(app){
      tweener.update(app);
      mesh2_1.rotate = new GLBoost.Vector3(0, angleDelta, 0);
      mesh2_2.rotate = new GLBoost.Vector3(0, angleDelta, 0);

      angleDelta += 1.0;
    };
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
