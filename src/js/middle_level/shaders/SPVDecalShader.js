import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import WireframeShader from './WireframeShader';
import Vector4 from '../../low_level/math/Vector4';

export class SPVDecalShaderSource {
  VSDefine_SPVDecalShaderSource(in_, out_, f) {
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

  VSTransform_SPVDecalShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = aVertex_color;\n';
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    return shaderText;
  }

  FSDefine_SPVDecalShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 texcoord;\n\n`;
    }
    if (material.hasAnyTextures()) {
      shaderText += 'uniform sampler2D uTexture;\n';
    }
    shaderText += 'uniform vec4 materialBaseColor;\n';
    shaderText += 'uniform vec4 textureContributionRate;\n';

    return shaderText;
  }

  FSShade_SPVDecalShaderSource(f, gl, lights, material, extraData) {
    var shaderText = '';
    var textureFunc = Shader._texture_func(gl);
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  rt0 *= color;\n';
    }
    shaderText += '    rt0 *= materialBaseColor;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD) && material.hasAnyTextures()) {
      shaderText += `  rt0 *= ${textureFunc}(uTexture, texcoord) * textureContributionRate + (vec4(1.0, 1.0, 1.0, 1.0) - textureContributionRate);\n`;
    }
    //shaderText += '    float shadowRatio = 0.0;\n';

    //shaderText += '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';
    return shaderText;
  }

  prepare_SPVDecalShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.COLOR || attribName === GLBoost.TEXCOORD) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    material.uniform_materialBaseColor = gl.getUniformLocation(shaderProgram, 'materialBaseColor');
    material.uniform_textureContributionRate = gl.getUniformLocation(shaderProgram, 'textureContributionRate');

    if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      if (material.getOneTexture()) {
        material.uniformTextureSamplerDic['uTexture'] = {};
        material.uniformTextureSamplerDic['uTexture'].uniformLocation = gl.getUniformLocation(shaderProgram, 'uTexture');
        material.uniformTextureSamplerDic['uTexture'].textureUnitIndex = 0;

        material.uniformTextureSamplerDic['uTexture'].textureName = material.getOneTexture().userFlavorName;

        // set texture unit 0 to the sampler
        gl.uniform1i( material.uniformTextureSamplerDic['uTexture'].uniformLocation, 0);
        material._semanticsDic['TEXTURE'] = 'uTexture';
      }
    }

    return vertexAttribsAsResult;
  }
}

export default class SPVDecalShader extends WireframeShader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext);

    SPVDecalShader.mixin(SPVDecalShaderSource);
  }

  setUniforms(gl, glslProgram, material) {
    super.setUniforms(gl, glslProgram, material);
    
    var baseColor = material.baseColor;
    gl.uniform4f(material.uniform_materialBaseColor, baseColor.x, baseColor.y, baseColor.z, baseColor.w);

    var texture = material.getOneTexture();

    var rateVec4 = new Vector4(1, 1, 1, 1);
    if (texture) {
      rateVec4 = material.getTextureContributionRate(texture.userFlavorName);
    }
    gl.uniform4f(material.uniform_textureContributionRate, rateVec4.x, rateVec4.y, rateVec4.z, rateVec4.w);


  }
}

GLBoost['SPVDecalShader'] = SPVDecalShader;
