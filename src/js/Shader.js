import GLContext from './GLContext'

export default class Shader {
  constructor(canvas, childClass) {
    if (typeof canvas === 'string') {
      var canvas = window.document.querySelector(canvas);
    }

    this._gl = GLContext.getInstance(canvas).gl;

    Shader._instances[canvas.id] = this;

  }

  _getShader(gl, theSource, type) {
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

  _initShaders(gl, vertexShaderStr, fragmentShaderStr) {
    var vertexShader = this._getShader(gl, vertexShaderStr, 'x-shader/x-vertex');
    var fragmentShader = this._getShader(gl, fragmentShaderStr, 'x-shader/x-fragment');

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

  isThisGLVersion_2(gl) {
    if (typeof WebGL2RenderingContext === "undefined") {
      return false;
    }
    return gl instanceof WebGL2RenderingContext;
  }

  _glslVer(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? '#version 300 es\n' : '';
  }

  _in_onVert(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'in' : 'attribute';
  }
  _out_onVert(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'out' : 'varying';
  }
  _in_onFrag(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'in' : 'varying';
  }

  _texture_func(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'texture' : 'texture2D';
  }

  _set_outColor_onFrag(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'layout(location = 0) out vec4 rt1;' : 'vec4 rt1;';
  }

  _set_glFragColor_inGLVer1(gl) {
    return !GLBoost.isThisGLVersion_2(gl) ? 'gl_FragColor = rt1;' : '';
  }
}

Shader._instances = new Object();
