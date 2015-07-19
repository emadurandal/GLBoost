export default class ShaderManager {
  constructor(gl) {
    if (ShaderManager._instance) {
        return ShaderManager._instance;
    }
    if (gl === void 0 || !gl instanceof WebGLRenderingContext) {
      throw new Error("Failed to create ShaderManager due to no WebGL Context.");
    }

    this._simpleProgram = this.getSimpleShaderPrograms(gl);

    ShaderManager._instance = this;
  }

  getShader(gl, theSource, type) {
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

  initShaders(gl, vertexShaderStr, fragmentShaderStr) {
    var vertexShader = this.getShader(gl, vertexShaderStr, 'x-shader/x-vertex');
    var fragmentShader = this.getShader(gl, fragmentShaderStr, 'x-shader/x-fragment');

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

  getSimpleVertexShaderString() {
    return `
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
attribute vec2 aVertexTexcoord;
varying vec4 color;
varying vec2 texcoord;

void main(void) {
  gl_Position = vec4(aVertexPosition, 1.0);
  color = vec4(aVertexColor, 1.0);
  texcoord = aVertexTexcoord;
}
`;
  }

  getSimpleFragmentShaderString() {
    return `
precision mediump float;
varying vec4 color;
varying vec2 texcoord;
uniform sampler2D texture;

void main(void){
  //gl_FragColor = color;
  gl_FragColor = texture2D(texture, texcoord);
//  gl_FragColor = vec4(texcoord, 0.0, 1.0);
}
`;
  }

  getSimpleShaderPrograms(gl) {
    var shaderProgram = this.initShaders(gl, this.getSimpleVertexShaderString(), this.getSimpleFragmentShaderString());
    shaderProgram.vertexAttributePosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexAttributePosition);
    shaderProgram.vertexAttributeColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexAttributeColor);
    shaderProgram.vertexAttributeTexcoord = gl.getAttribLocation(shaderProgram, "aVertexTexcoord");
    gl.enableVertexAttribArray(shaderProgram.vertexAttributeTexcoord);
    shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
    // サンプラーにテクスチャユニット０を指定する
    gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);

    return shaderProgram;
  }

  static getInstance(canvas) {
    return new ShaderManager(canvas);
  }

  get simpleProgram() {
    return this._simpleProgram;
  }
}
ShaderManager._instance = null;
