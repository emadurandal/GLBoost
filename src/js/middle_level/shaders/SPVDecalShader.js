import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import WireframeShader from './WireframeShader';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Matrix44 from '../../low_level/math/Matrix44';


export class SPVDecalShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

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

    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);
    if (normalTexture) {
      shaderText += `uniform mediump sampler2D uNormalTexture;\n`;
    }

    shaderText += 'uniform vec4 materialBaseColor;\n';
    shaderText += 'uniform vec4 textureContributionRate;\n';
    shaderText += 'uniform vec4 gamma;\n';
    shaderText += 'uniform vec4 splitParameter;\n';

    return shaderText;
  }

  FSMethodDefine_SPVDecalShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += `
    float grayscale(vec4 color) {     
      float r = color.r * 0.22;
      float g = color.g * 0.66;
      float b = color.b * 0.11;
        
      return r + g + b;
    }
    `;

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

    shaderText += '  rt0.xyz = gamma.w > 0.5 ? pow(rt0.xyz, gamma.xyz) : rt0.xyz;\n';

    //shaderText += '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';
    return shaderText;
  }

  FSPostEffect_SPVDecalShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';
    shaderText += 'float splitCount = 4.0;\n';
    shaderText += 'float slope = splitParameter.y/splitParameter.x;\n';
    shaderText += 'float aspect = splitParameter.x/splitParameter.y;\n';
    shaderText += 'float animationRatio = splitParameter.w;\n';
    shaderText += 'float inverseAnimationRatio = 1.0 -splitParameter.w;\n';

    shaderText += 'if (gl_FragCoord.y > slope * (gl_FragCoord.x - (splitParameter.x*-0.5*aspect)/aspect*animationRatio + gl_FragCoord.x*1.5*inverseAnimationRatio)) {\n';
    shaderText += '  rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';
    shaderText += '} else \n';
    shaderText += 'if (gl_FragCoord.y > slope * (gl_FragCoord.x - (splitParameter.x*0.0*aspect)/aspect*animationRatio + gl_FragCoord.x*1.5*inverseAnimationRatio)) {\n';
    shaderText += '  rt0 = vec4(normalize(v_normal), 1.0);\n';
    shaderText += '} else \n';
    shaderText += 'if (gl_FragCoord.y > slope * (gl_FragCoord.x - (splitParameter.x*0.5*aspect)/aspect*animationRatio + gl_FragCoord.x*1.5*inverseAnimationRatio)) {\n';
    shaderText += '  rt0 = vec4(1.0, 0.0, 1.0, 1.0);\n';
    shaderText += '}\n';
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
    material.setUniform(shaderProgram.hashId, 'uniform_splitParameter', this._glContext.getUniformLocation(shaderProgram, 'splitParameter'));

    let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    if (!diffuseTexture) {
      diffuseTexture = this._glBoostContext.defaultDummyTexture;
    }

    let uTexture = this._glContext.getUniformLocation(shaderProgram, 'uTexture');
    material.setUniform(shaderProgram.hashId, 'uTexture', uTexture);
    // set texture unit 0 to the decal texture sampler
    this._glContext.uniform1i( uTexture, 0, true);

    material._semanticsDic['TEXTURE'] = [];

    material.uniformTextureSamplerDic['uTexture'] = {};
    if (material.hasAnyTextures() || diffuseTexture) {
      material.uniformTextureSamplerDic['uTexture'].textureUnitIndex = 0;
      material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;
      material._semanticsDic['TEXTURE'].push('uTexture');
    }

    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);
    let uNormalTexture = this._glContext.getUniformLocation(shaderProgram, 'uNormalTexture');
    if (uNormalTexture) {
      material.setUniform(shaderProgram.hashId, 'uNormalTexture', normalTexture);
      // set texture unit 1 to the normal texture sampler
      this._glContext.uniform1i( uNormalTexture, 1, true);

      material.uniformTextureSamplerDic['uNormalTexture'] = {};
      if (material.hasAnyTextures()) {
        material.uniformTextureSamplerDic['uNormalTexture'].textureUnitIndex = 1;
        material.uniformTextureSamplerDic['uNormalTexture'].textureName = normalTexture.userFlavorName;
        material._semanticsDic['TEXTURE'].push('uNormalTexture');
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

    /*
    let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    if (diffuseTexture) {
      material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;
    }
    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);
    if (normalTexture) {
      material.uniformTextureSamplerDic['uNormalTexture'].textureName = normalTexture.userFlavorName;
    }*/


    // For Shadow
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        let cameraMatrix = lights[i].camera.lookAtRHMatrix();
//        let viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf);
        let viewMatrix = cameraMatrix.clone();
        let projectionMatrix = lights[i].camera.projectionRHMatrix();

//        gl.uniformMatrix4fv(material.getUniform(glslProgram.hashId, 'uniform_depthPVMatrix_'+i), false, Matrix44.multiply(projectionMatrix, viewMatrix).flatten());
        gl.uniformMatrix4fv(material.getUniform(glslProgram.hashId, 'uniform_depthPVMatrix_'+i), false, lights[i].camera._lastPVMatrixFromLight.flatten());
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


    let sourceGamma = this.getShaderParameter(material, 'sourceGammaForCorrection', new Vector3(1, 1, 1));
    let targetGamma = this.getShaderParameter(material, 'targetGammaForCorrection', new Vector3(1, 1, 1));
    let isGammaEnable = this.getShaderParameter(material, 'isGammaEnable', true);

    let gamma = Vector3.divideVector(this.handleArgument(targetGamma), this.handleArgument(sourceGamma));
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_gamma'), gamma.x, gamma.y, gamma.z, isGammaEnable ? 1 : 0, true);

    let splitParameter = this.getShaderParameter(material, 'splitParameter', new Vector3(1, 1, 1, 1));
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_splitParameter'), this._glContext.canvasWidth, this._glContext.canvasHeight, splitParameter.z, 0.5, true);

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

  set sourceGammaForCorrection(value) {
    this._sourceGamma = value;
  }

  get sourceGammaForCorrection() {
    return this._sourceGamma;
  }

  set targetGammaForCorrection(value) {
    this._targetGamma = value;
  }

  get targetGammaForCorrection() {
    return this._targetGamma;
  }
}

GLBoost['SPVDecalShader'] = SPVDecalShader;
