# GLBoost

![GLBoost](https://github.com/emadurandal/GLBoost/raw/master/logo.png "GLBoost")

[![Join the chat at https://gitter.im/emadurandal/GLBoost](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/emadurandal/GLBoost?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<a href="https://zenhub.io"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>

A New WebGL Rendering Library for 3D Graphics Geeks

Our concept is ...

### "__Convenience like Three.js, Infinite Flexibility like raw WebGL, We get both.__"

## Attention

[en]
This library is now the earliest stage of development.
Please wait until it becomes usable level.

[ja]
このライブラリはまだ開発の最初期段階です。
使い物になる状態になるまで、もうしばらくお待ちください。

## Concept

[en]
GLBoost is a new WebGL library for realtime 3D graphics geeks. It’s a low-level library that takes away the pain of having to deal with routine WebGL API tasks without limiting your expressive power.
Use this library to spend your time doing cool stuff instead of fighting WebGL.

[ja]
GLBoostはWebGLライブラリです。
WebGLの面倒くさい部分を肩代わりしつつ、それでいて表現の幅を制約することのない、
3Dグラフィックス開発の玄人向けのライブラリを目指しています。

## Demo

[Check our examples page!](https://gitcdn.xyz/repo/emadurandal/GLBoost/master/examples/index.html)

If you want to watch examples in local. Go to GLBoost top directory by terminal and start local web server up.

```
$ cd GLBoost
$ ruby -run -e httpd -- --port 3000 ./
```

Then, access http://localhost:3000/examples by your web browser.

## Key features

* ECMAScript 2015 based library (using Babel)
* Shader classes Mixin mechanism (You can customize your shader like LEGO bricks!)
* WebGL2.0 Ready (Currently, Firefox nightly and Chrome Canary)
* User's Custom Shader Support

## Supported Browsers

* Google Chrome (even WebGL 2.0 mode)
* Firefox (even WebGL 2.0 mode)
* Safari
* iOS Safari
* Microsoft Edge (Xbox One included)
* Internet Explorer 11 (note that [browser-polyfill.min.js](https://cdnjs.com/libraries/babel-core/5.8.34) is required)

## How to use

`1.` Include `build/glboost.js` in your html file.

```html
<script src="./glboost.js"></script>
```

`2.` Put canvas tag in body element.

```html
<body>
  <canvas id="world" width="600" height="600"></canvas>
</body>
```

`3.` Write your codes.

```javascript
// setup GLBoost renderer
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

// setup material
var material = glBoostContext.createClassicMaterial();
var texture = glBoostContext.createTexture('resources/texture.png');
material.diffuseTexture = texture;
material.shaderClass = GLBoost.PhongShader;

// make a Sphere geometry
var geometry = glBoostContext.createSphere(20, 24, 24, null);

// set Sphere geometry and material to make a Mesh.
var earth = glBoostContext.createMesh(geometry, material);
// add the earth mesh to the scene
scene.addChild(earth);

// make a directonal light
var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -1, -1));
// add the light to the scene
scene.addChild( directionalLight );

// setup camera
var camera = glBoostContext.createCamera({
  eye: new GLBoost.Vector3(0.0, 0.0, 60.0),
  center: new GLBoost.Vector3(0.0, 0.0, 0.0),
  up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
  fovy: 45.0,
  aspect: 1.0,
  zNear: 0.1,
  zFar: 1000.0
});
// add the camera to the scene
scene.addChild(camera);

// create an expression (which is composed of several rendering passes)
var expression = glBoostContext.createExpressionAndRenderPasses(1);

// set scene to render pass of expression
expression.renderPasses[0].scene = scene;

// call this method before rendering
expression.prepareToRender();

// rendering loop
var render = function() {
  // clear canvas
  renderer.clearCanvas();

  // render the expression
  renderer.draw(expression);

  // rotate camera
  var rotateMatrixY = GLBoost.Matrix33.rotateY(-1.0);
  rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
  camera.eye = rotatedVector;

  requestAnimationFrame(render);
};

render();

```

for other usage, check [examples](https://gitcdn.xyz/repo/emadurandal/GLBoost/master/examples/index.html)!

## How to Install npm packages to build library, examples and API document

```
$ npm install
```

### Build of GLBoost Library

```
$ npm run build
```

### Build of examples

[en]
Some examples needs to be built by Babel because they are written ECMAScript 2015.
The following command builds them all.

[ja]
いくつかのサンプルはECMAScript 2015で書かれているため、Babelでのビルドを必要とします。
次のコマンドでそれら全てをビルドできます。

```
$ npm run build-examples
```

### Build of API Document

```
$ npm run esdoc
```

(Note: The documentation coverage is still very low. We address the resolution of this problem.)

### Test

`1.` launch local web server. for example...

```bash
$ ruby -run -e httpd -- --port 3000 ./
```

`2.` Run Test command.

```bash
$ npm run test
```

(Note: The test coverage is still very low. We address the resolution of this problem.)

## Roadmap

### Coming Soon

* Allow access to WebGL Context and Resources

### Near Future

* Physically Based Rendering
* Both Forward Rendering and Deferred Rendering Support
* High-level API for beginners

## License

This library is released under the MIT License, see `LICENSE` file.
