import Shader from './Shader'

export default class SimpleShader extends Shader {
  constructor(canvas) {

    super(canvas, SimpleShader);

  }

  _getSimpleVertexShaderString(functions, existCamera_f) {
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
    if (existCamera_f) {
      shaderText += 'uniform mat4 projectionAndViewMatrix;\n';
    }
    shaderText +=   'void main(void) {\n';

    if (existCamera_f) {
      shaderText +=   '  gl_Position = projectionAndViewMatrix * vec4(aVertex_position, 1.0);\n';
    } else {
      shaderText +=   '  gl_Position = vec4(aVertex_position, 1.0);\n';
    }
    if (this._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = vec4(aVertex_color, 1.0);\n';
    }
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    shaderText +=   '}\n';

    return shaderText;
  }

  _getSimpleFragmentShaderString(functions) {
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

  getShaderProgram(vertexAttribs, existCamera_f) {
    var gl = this._gl;
    var shaderProgram = this._initShaders(gl, this._getSimpleVertexShaderString(vertexAttribs, existCamera_f), this._getSimpleFragmentShaderString(vertexAttribs));

    vertexAttribs.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
      gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
    });

    if (this._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
      // サンプラーにテクスチャユニット０を指定する
      gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
    }

    if (existCamera_f) {
      shaderProgram.projectionAndViewMatrix = gl.getUniformLocation(shaderProgram, 'projectionAndViewMatrix');
    }

    return shaderProgram;
  }

  static getInstance(canvas) {
    return new SimpleShader(canvas);
  }

}
