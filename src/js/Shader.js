import GLContext from './GLContext'

export default class ShaderManager {
  constructor() {
    if (ShaderManager._instance) {
        return ShaderManager._instance;
    }

    this._gl = GLContext.getInstance().gl;;

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

  _exist(functions, attribute) {
    return functions.indexOf(attribute) >= 0
  }

  getSimpleVertexShaderString(functions) {
    var f = functions;
    var shaderText = '';

    shaderText +=   'precision mediump float;\n';
    shaderText +=   'attribute vec3 aVertex_position;\n';
    if (this._exist(f, GLBoost.COLOR)) {
      shaderText += 'attribute vec3 aVertex_color;\n';
      shaderText += 'varying vec4 color;\n';
    }
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += 'attribute vec2 aVertex_texcoord;\n';
      shaderText += 'varying vec2 texcoord;\n';
    }
    shaderText +=   'void main(void) {\n';
    shaderText +=   '  gl_Position = vec4(aVertex_position, 1.0);\n';
    if (this._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = vec4(aVertex_color, 1.0);\n';
    }
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    shaderText +=   '}\n';

    return shaderText;
  }

  getSimpleFragmentShaderString(functions) {
    var f = functions;
    var shaderText = '';

    shaderText +=   'precision mediump float;\n';
    if (this._exist(f, GLBoost.COLOR)) {
      shaderText += 'varying vec4 color;\n';
    }
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += 'varying vec2 texcoord;\n\n';
      shaderText += 'uniform sampler2D texture;\n';
    }
    shaderText +=   'void main(void) {\n';

    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  gl_FragColor = texture2D(texture, texcoord);\n';
    } else if (this._exist(f, GLBoost.COLOR)) {
      shaderText += '  gl_FragColor = color;\n';
    } else {
      shaderText += '  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n';
    }

    shaderText +=   '}\n';

    return shaderText;

  }

  getSimpleShaderPrograms(functions) {
    var gl = this._gl;
    var shaderProgram = this.initShaders(gl, this.getSimpleVertexShaderString(functions), this.getSimpleFragmentShaderString(functions));

    functions.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
      gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
    });

    if (functions.indexOf("texcoord") >= 0) {
      shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
      // サンプラーにテクスチャユニット０を指定する
      gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
    }

    return shaderProgram;
  }

  static getInstance(canvas) {
    return new ShaderManager(canvas);
  }

}

ShaderManager._instance = null;
