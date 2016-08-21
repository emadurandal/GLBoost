import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import VertexWorldShadowShaderSource from './VertexWorldShadowShader';
import {FragmentSimpleShaderSource} from './FragmentSimpleShader';

export class DecalShaderSource {
  VSDefine_DecalShaderSource(in_, out_, f) {
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

  VSTransform_DecalShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = aVertex_color;\n';
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    return shaderText;
  }

  FSDefine_DecalShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 texcoord;\n\n`;
    }
    if (material.diffuseTexture !== null) {
      shaderText += 'uniform sampler2D uTexture;\n';
    }
    shaderText += 'uniform vec4 materialBaseColor;\n';

    return shaderText;
  }

  FSShade_DecalShaderSource(f, gl, lights, material, extraData) {
    var shaderText = '';
    var textureFunc = Shader._texture_func(gl);
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  rt0 *= color;\n';
    }
    shaderText += '    rt0 *= materialBaseColor;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD) && material.diffuseTexture !== null) {
      shaderText += `  rt0 *= ${textureFunc}(uTexture, texcoord);\n`;
    }
    //shaderText += '    float shadowRatio = 0.0;\n';

    //shaderText += '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';
    return shaderText;
  }

  prepare_DecalShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {

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
        shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, 'uTexture');
      // set texture unit 0 to the sampler
      gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);
    }

    return vertexAttribsAsResult;
  }
}

export default class DecalShader extends Shader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext);

    DecalShader.mixin(basicShader);
    if (basicShader === VertexWorldShaderSource) {
      DecalShader.mixin(VertexWorldShadowShaderSource);
    }
    DecalShader.mixin(FragmentSimpleShaderSource);
    DecalShader.mixin(DecalShaderSource);
  }

  setUniforms(gl, glslProgram, material) {

    var baseColor = material.baseColor;
    gl.uniform4f(glslProgram.materialBaseColor, baseColor.x, baseColor.y, baseColor.z, baseColor.w);
  }
}

GLBoost['DecalShader'] = DecalShader;
