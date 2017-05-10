import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import WireframeShader from './WireframeShader';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';

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
    shaderText += 'uniform vec4 gamma;\n';

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
    shaderText += '    if (rt0.a < 0.05) {\n';
    shaderText += '      discard;\n';
    shaderText += '    }\n';

    shaderText += '  rt0 = pow(rt0, gamma);\n';

    //shaderText += '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';
    return shaderText;
  }

  prepare_SPVDecalShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'color' || attribName === 'texcoord') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    material.setUniform(shaderProgram.hashId, 'uniform_materialBaseColor', gl.getUniformLocation(shaderProgram, 'materialBaseColor'));
    material.setUniform(shaderProgram.hashId, 'uniform_textureContributionRate', gl.getUniformLocation(shaderProgram, 'textureContributionRate'));
    material.setUniform(shaderProgram.hashId, 'uniform_gamma', gl.getUniformLocation(shaderProgram, 'gamma'));

    if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
      if (diffuseTexture) {
        material.uniformTextureSamplerDic['uTexture'] = {};
        let uTexture = gl.getUniformLocation(shaderProgram, 'uTexture');
        material.setUniform(shaderProgram.hashId, 'uTexture', uTexture);
        material.uniformTextureSamplerDic['uTexture'].textureUnitIndex = 0;

        material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;

        // set texture unit 0 to the sampler
        gl.uniform1i( uTexture, 0);
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

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let baseColor = material.baseColor;
    gl.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_materialBaseColor'), baseColor.x, baseColor.y, baseColor.z, baseColor.w);

    var texture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);

    var rateVec4 = new Vector4(1, 1, 1, 1);
    if (texture) {
      rateVec4 = material.getTextureContributionRate(texture.userFlavorName);
    }

    gl.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_textureContributionRate'), rateVec4.x, rateVec4.y, rateVec4.z, rateVec4.w);

    let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    if (diffuseTexture) {
      material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;
    }

    let sourceGamma = this.getShaderParameter(material, 'sourceGamma') || new Vector4(1, 1, 1, 1);
    let targetGamma = this.getShaderParameter(material, 'targetGamma') || new Vector4(1, 1, 1, 1);
    let gamma = Vector4.divideVector(this.handleArgument(sourceGamma), this.handleArgument(targetGamma));
    gl.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_gamma'), gamma.x, gamma.y, gamma.z, gamma.w);
  }

  handleArgument(value) {
    if (value instanceof Vector4) {
      return value;
    } else if (value instanceof Vector3) {
      return new Vector4(value.x, value.y, value.z, 1);
    } else {
      return new Vector4(value, value, value, 1);
    }
  }

  set sourceGamma(value) {
    this._sourceGamma = value;
  }

  get sourceGamma() {
    return this._sourceGamma;
  }

  set targetGamma(value) {
    this._targetGamma = value;
  }

  get targetGamma() {
    return this._targetGamma;
  }
}

GLBoost['SPVDecalShader'] = SPVDecalShader;
