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
    functions.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderText+='attribute vec3 aVertex_' + attribName  + ';\n';
        shaderText+='uniform float blendWeight_' + attribName  + ';\n';
      }
    });
    shaderText +=   'void main(void) {\n';
    shaderText +=     'float sumOfWeights = 0.0;\n';
    functions.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderText += 'sumOfWeights += blendWeight_' + attribName +';\n';
      }
    });
    var numOfShapeTargets = this._numberOfShapeTargets(functions);
    shaderText += '    vec3 blendedPosition = aVertex_position * max(1.0 - sumOfWeights/float(' + numOfShapeTargets + '), 0.0);\n';
    functions.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderText += 'blendedPosition += aVertex_' + attribName + ' * blendWeight_' + attribName + '/float(' + numOfShapeTargets + ');\n';
      }
    });

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

  _numberOfShapeTargets(attributes) {
    var count = 0;
    attributes.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        count += 1;
      }
    });
    return count;
  }

  _isShapeTarget(attribName) {
    return !this._exist(attribName, GLBoost.POSITION) && !this._exist(attribName, GLBoost.COLOR) && !this._exist(attribName, GLBoost.TEXCOORD);
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

    functions.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderProgram['uniformFloatSampler_blendWeight_' + attribName] = gl.getUniformLocation(shaderProgram, 'blendWeight_' + attribName);
        // とりあえずゼロ初期化
        gl.uniform1f(shaderProgram['uniformFloatSampler_blendWeight_' + attribName], 0.0);
      }
    });

    return shaderProgram;
  }

  static getInstance() {
    return new BlendShapeShader();
  }

}

BlendShapeShader._instance = null;
