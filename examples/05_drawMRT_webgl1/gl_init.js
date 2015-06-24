(function () {  
  function createWebGL2Context(canvasId)
  {
    var canvas = document.getElementById(canvasId);
    canvas.width = 500;
    canvas.height = 500;
//    var gl = canvas.getContext("experimental-webgl2");
    var gl = canvas.getContext("webgl");

    if (!gl)
    {
       // WebGL 2 not supported
       return false;
    }

//    if (!gl instanceof WebGL2RenderingContext)
    if (!gl instanceof WebGLRenderingContext)
    {
       // unexpected rendering context.
       return false;
    }
    return gl;
  }
  window.gl = createWebGL2Context("webgl-canvas");

  function getShader(gl, theSource, type) {
    var shader;
        
    if (type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
       // Unknown shader type
       return null;
    }
    
    gl.shaderSource(shader, theSource);
    
    // Compile the shader program
    gl.compileShader(shader);  

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
      alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
      return null;  
    }

    return shader;
  }
    
  function initShaders(vertexShaderStr, fragmentShaderStr) {
    var vertexShader = getShader(gl, vertexShaderStr, 'x-shader/x-vertex');
    var fragmentShader = getShader(gl, fragmentShaderStr, 'x-shader/x-fragment');

    // Create the shader program

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);
    
    return shaderProgram;
  }
  
  var shader_vs_1 = (function () {/*
precision mediump float;
attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
varying vec4 color;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  color = vec4(aVertexColor, 1.0);
}    
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

  var shader_vs = (function () {/*
#version 300 es
#extension GL_OES_standard_derivatives : enable
precision mediump float;
in vec3 aVertexPosition;
in vec3 aVertexColor;
out vec4 color;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  color = vec4(aVertexColor, 1.0);
}    
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

  var shader_fs_1 = (function () {/*
#extension GL_EXT_draw_buffers : require
precision mediump float;
varying vec4 color;

void main(void) {
//  gl_FragColor = color;

  gl_FragData[0] = color;
  gl_FragData[1] = vec4(1.0, 1.0, 1.0, 1.0) - color;
  gl_FragData[1].a = 1.0;
//  gl_FragData[1] = vec4(1.0, 1.0, 0.0, 1.0);
}  
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

  var shader_fs = (function () {/*
#version 300 es
#extension GL_EXT_draw_buffers : require
precision highp float;
out vec4 fc1;
out vec4 fc2;


void main() {
    fc1 = vec4(1.0, 0.0, 0.0, 1.0);
    fc2 = vec4(0.0, 1.0, 0.0, 1.0);
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
   
  
  var displayFBO_vs_1 = (function () {/*
precision mediump float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

void main(void) {
  gl_Position = vec4(aVertexPosition/2.0, 1.0);
  vTextureCoord = aTextureCoord;
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

  var displayFBO_vs = (function () {/*
#version 300 es
precision mediump float;
in vec3 aVertexPosition;
in vec2 aTextureCoord;
out vec2 vTextureCoord;

void main(void) {
  gl_Position = vec4(aVertexPosition/2.0, 1.0);
  vTextureCoord = aTextureCoord;
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

  var displayFBO_fs_1 = (function () {/*
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
//  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

  var displayFBO_fs = (function () {/*
#version 300 es
precision mediump float;
in vec2 vTextureCoord;
uniform sampler2D uSampler;

out vec4 fc;
void main(void) {
  fc = texture(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
  
  window.extVAO = gl.getExtension("OES_vertex_array_object");
  if (!extVAO)
    throw("OES_vertex_array_objectをサポートしていません");

  window.extDBs = gl.getExtension("WEBGL_draw_buffers");
  if (!extDBs)
    throw("WEBGL_draw_buffersをサポートしていません");

  window.shaderProgram = initShaders(shader_vs_1, shader_fs_1);
  shaderProgram.vertexPositionAttributePosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  shaderProgram.vertexPositionAttributeColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttributePosition);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttributeColor);

  window.shaderFBOProgram = initShaders(displayFBO_vs_1, displayFBO_fs_1);
  shaderFBOProgram.vertexPositionAttributePosition = gl.getAttribLocation(shaderFBOProgram, "aVertexPosition");
  shaderFBOProgram.vertexPositionAttributeTexCoord = gl.getAttribLocation(shaderFBOProgram, "aTextureCoord");
  gl.enableVertexAttribArray(shaderFBOProgram.vertexPositionAttributePosition);
  gl.enableVertexAttribArray(shaderFBOProgram.vertexPositionAttributeTexCoord);
  shaderFBOProgram.samplerUniform = gl.getUniformLocation(shaderFBOProgram, "uSampler");
})();

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
} 


gl.clearColor(1, 0, 0, 1);
gl.clearDepth(1.0);

  