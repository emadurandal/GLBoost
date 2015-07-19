import Shader from './Shader'

export default class BlendShapeShader extends Shader {
  constructor() {
    if (BlendShapeShader._instance) {
        return BlendShapeShader._instance;
    }

    super();

    BlendShapeShader._instance = this;
  }

  _getBlendShapeVertexShaderString(functions) {
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
    shaderText +=   'attribute vec3 aVertex_shapetarget_1;\n';
    shaderText +=   'uniform float blendWeight_shapetarget_1;\n';

    shaderText +=   'void main(void) {\n';

    if (this._exist(f, GLBoost.BLENDTARGET1)) {
      shaderText += '  vec3 blendedPosition = aVertex_position * (1.0 - blendWeight_shapetarget_1) + aVertex_shapetarget_1 * blendWeight_shapetarget_1;\n';
    }
    shaderText +=   '  gl_Position = vec4(blendedPosition, 1.0);\n';
    if (this._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = vec4(aVertex_color, 1.0);\n';
    }
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    shaderText +=   '}\n';

    return shaderText;
  }

  _getBlendShapeFragmentShaderString(functions) {
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

  getShaderProgram(functions) {
    var gl = this._gl;
    var shaderProgram = this._initShaders(gl, this._getBlendShapeVertexShaderString(functions), this._getBlendShapeFragmentShaderString(functions));

    functions.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
      gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
    });

    if (this._exist(functions, GLBoost.TEXCOORD)) {
      shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
      // サンプラーにテクスチャユニット０を指定する
      gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
    }

    if (this._exist(functions, GLBoost.BLENDTARGET1)) {
      shaderProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET1] = gl.getUniformLocation(shaderProgram, 'blendWeight_' + GLBoost.BLENDTARGET1);
      // とりあえずゼロ初期化
      gl.uniform1f(shaderProgram['uniformFloatSampler_blendWeight_' + GLBoost.BLENDTARGET1], 0.0);
    }


    return shaderProgram;
  }

  static getInstance() {
    return new BlendShapeShader();
  }

}

BlendShapeShader._instance = null;
