import Shader from './Shader'

export class SimpleShaderSource {
  VSDefine_SimpleShaderSource(in_, out_, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 aVertex_color;\n`;
      shaderText += `${out_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 aVertex_texcoord;\n`;
      shaderText += `${out_} vec2 texcoord;\n`;
    }
    return shaderText;
  }

  VSTransform_SimpleShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = aVertex_color;\n';
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    return shaderText;
  }

  FSDefine_SimpleShaderSource(in_, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 texcoord;\n\n`;
      shaderText += 'uniform sampler2D uTexture;\n';
    }
    shaderText += 'uniform vec4 materialBaseColor;\n';

    return shaderText;
  }

  FSShade_SimpleShaderSource(f, gl) {
    var shaderText = '';
    var textureFunc = Shader._texture_func(gl);
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  rt1 = color;\n';
    }
    shaderText += '    rt1 *= materialBaseColor;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `  rt1 *= ${textureFunc}(uTexture, texcoord);\n`;
    }
    //shaderText += '    rt1 = vec4(1.0, 0.0, 0.0, 1.0);\n';
    return shaderText;
  }

  prepare_SimpleShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.COLOR || attribName === GLBoost.TEXCOORD) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    shaderProgram.materialBaseColor = gl.getUniformLocation(shaderProgram, 'materialBaseColor');

    if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'texture');
      // サンプラーにテクスチャユニット０を指定する
      gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
    }

    return vertexAttribsAsResult;
  }
}

export default class SimpleShader extends Shader {
  constructor(canvas) {

    super(canvas);
    SimpleShader.mixin(SimpleShaderSource);
  }

  setUniforms(gl, glslProgram, material) {

    var baseColor = material.baseColor;
    gl.uniform4f(glslProgram.materialBaseColor, baseColor.x, baseColor.y, baseColor.z, baseColor.w);
  }
}

GLBoost["SimpleShader"] = SimpleShader;
