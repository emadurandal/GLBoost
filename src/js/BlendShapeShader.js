import Shader from './Shader'

export default class BlendShapeShader extends Shader {
  constructor(canvas) {

    super(canvas, BlendShapeShader);

  }

  _getBlendShapeVertexShaderString(gl, functions, existCamera_f) {
    var f = functions;
    var shaderText = '';

    var in_ = super._in_onVert(gl);
    var out_ = super._out_onVert(gl);

    shaderText +=   super._glslVer(gl);
    shaderText +=   'precision mediump float;\n';
    shaderText +=   `${in_} vec3 aVertex_position;\n`;
    if (this._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec3 aVertex_color;\n`;
      shaderText += `${out_} vec4 color;\n`;
    }
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 aVertex_texcoord;\n`;
      shaderText += `${out_} vec2 texcoord;\n`;
    }
    functions.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderText+=`${in_} vec3 aVertex_${attribName};\n`;
        shaderText+='uniform float blendWeight_' + attribName  + ';\n';
      }
    });
    if (existCamera_f) {
      shaderText += 'uniform mat4 projectionAndViewMatrix;\n';
    }

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
    if (existCamera_f) {
      shaderText += '  gl_Position = projectionAndViewMatrix * vec4(blendedPosition, 1.0);\n';
    } else {
      shaderText += '  gl_Position = vec4(blendedPosition, 1.0);\n';
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

  _getBlendShapeFragmentShaderString(gl, functions) {
    var f = functions;
    var shaderText = '';

    var in_ = super._in_onFrag(gl);

    shaderText +=   super._glslVer(gl);
    shaderText +=   'precision mediump float;\n';
    shaderText +=   super._set_outColor_onFrag(gl);
    if (this._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 color;\n`;
    }
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 texcoord;\n\n`;
      shaderText += 'uniform sampler2D uTexture;\n';
    }
    shaderText +=   'void main(void) {\n';

    var textureFunc = super._texture_func(gl);
    if (this._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `  rt1 = ${textureFunc}(uTexture, texcoord);\n`;
    } else if (this._exist(f, GLBoost.COLOR)) {
      shaderText += '  rt1 = color;\n';
    } else {
      shaderText += '  rt1 = vec4(1.0, 1.0, 1.0, 1.0);\n';
    }
    shaderText +=   super._set_glFragColor_inGLVer1(gl);

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

  getShaderProgram(vertexAttribs, existCamera_f) {
    var gl = this._gl;
    var shaderProgram = this._initShaders(gl,
      this._getBlendShapeVertexShaderString(gl, vertexAttribs, existCamera_f),
      this._getBlendShapeFragmentShaderString(gl, vertexAttribs)
    );

    vertexAttribs.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
      gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
    });

    if (this._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
      // サンプラーにテクスチャユニット０を指定する
      gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
    }

    vertexAttribs.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderProgram['uniformFloatSampler_blendWeight_' + attribName] = gl.getUniformLocation(shaderProgram, 'blendWeight_' + attribName);
        // とりあえずゼロ初期化
        gl.uniform1f(shaderProgram['uniformFloatSampler_blendWeight_' + attribName], 0.0);
      }
    });

    if (existCamera_f) {
      shaderProgram.projectionAndViewMatrix = gl.getUniformLocation(shaderProgram, 'projectionAndViewMatrix');
    }


    return shaderProgram;
  }

  static getInstance(canvas) {
    return new BlendShapeShader(canvas);
  }

}
