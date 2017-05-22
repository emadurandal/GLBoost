import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import WireframeShader from './WireframeShader';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Matrix44 from '../../low_level/math/Matrix44';


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

    material.setUniform(shaderProgram.hashId, 'uniform_materialBaseColor', this._glContext.getUniformLocation(shaderProgram, 'materialBaseColor'));
    material.setUniform(shaderProgram.hashId, 'uniform_textureContributionRate', this._glContext.getUniformLocation(shaderProgram, 'textureContributionRate'));
    material.setUniform(shaderProgram.hashId, 'uniform_gamma', this._glContext.getUniformLocation(shaderProgram, 'gamma'));

    if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
      if (diffuseTexture) {
        material.uniformTextureSamplerDic['uTexture'] = {};
        let uTexture = this._glContext.getUniformLocation(shaderProgram, 'uTexture');
        material.setUniform(shaderProgram.hashId, 'uTexture', uTexture);
        material.uniformTextureSamplerDic['uTexture'].textureUnitIndex = 0;

        material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;

        // set texture unit 0 to the sampler
        this._glContext.uniform1i( uTexture, 0, true);
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
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_materialBaseColor'), baseColor.x, baseColor.y, baseColor.z, baseColor.w, true);

    var texture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);

    var rateVec4 = new Vector4(1, 1, 1, 1);
    if (texture) {
      rateVec4 = material.getTextureContributionRate(texture.userFlavorName);
    }

    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_textureContributionRate'), rateVec4.x, rateVec4.y, rateVec4.z, rateVec4.w, true);

    let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    if (diffuseTexture) {
      material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;
    }


    // For Shadow
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        let cameraMatrix = lights[i].camera.lookAtRHMatrix();
        let viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf);
        let projectionMatrix = lights[i].camera.projectionRHMatrix();
        gl.uniformMatrix4fv(material.getUniform(glslProgram.hashId, 'uniform_depthPVMatrix_'+i), false, Matrix44.multiply(projectionMatrix, viewMatrix).flatten());
      }

      if (lights[i].camera && lights[i].camera.texture && lights[i].isCastingShadow) {
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_isShadowCasting' + i), 1, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_isShadowCasting' + i), 0, true);
      }

      if (lights[i].camera && lights[i].camera.texture) {
        let uniformLocation = material.getUniform(glslProgram.hashId, 'uniform_DepthTextureSampler_' + i);
        let index = lights[i].camera.texture.textureUnitIndex;

        this._glContext.uniform1i(uniformLocation, index, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_DepthTextureSampler_' + i), 0, true);
      }
    }


    let sourceGamma = this.getShaderParameter(material, 'sourceGamma') || new Vector4(1, 1, 1, 1);
    let targetGamma = this.getShaderParameter(material, 'targetGamma') || new Vector4(1, 1, 1, 1);
    let gamma = Vector4.divideVector(this.handleArgument(sourceGamma), this.handleArgument(targetGamma));
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_gamma'), gamma.x, gamma.y, gamma.z, gamma.w, true);
  }

  setUniformsAsTearDown(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniformsAsTearDown(gl, glslProgram, expression, material, camera, mesh, lights);
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_DepthTextureSampler_' + i), 0, true);  // +1 because 0 is used for diffuse texture
      }
    }
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
