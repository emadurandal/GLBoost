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

  VSTransform_SPVDecalShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = aVertex_color;\n';
    }
    if (Shader._exist(f, GLBoost.TEXCOORD) && material.hasAnyTextures()) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    return shaderText;
  }

  FSDefine_SPVDecalShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost.TEXCOORD) && material.hasAnyTextures()) {
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
    shaderText += 'uniform vec4 splitControlParameter;\n';
    shaderText += 'uniform bool isColorAberration;\n';
    shaderText += 'uniform bool isVignette;\n';
    shaderText += 'uniform vec4 uvTransform;\n';
    
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

    shaderText += this._getNormalStr(gl, material, f);

    var textureFunc = Shader._texture_func(gl);
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  rt0 *= color;\n';
    }
    shaderText += '    rt0 *= materialBaseColor;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD) && material.hasAnyTextures()) {
      shaderText += `vec2 texcoordTransformed = vec2(texcoord.x * uvTransform.x + uvTransform.z, 1.0 - ((1.0-texcoord.y) * uvTransform.y + uvTransform.w));\n`;      
      shaderText += 'if (isColorAberration) {\n';
      shaderText += `  float offsetTexel = 2.0;\n`;
      shaderText += `  vec4 leftDecal = ${textureFunc}(uTexture, vec2(texcoordTransformed.x - offsetTexel/splitParameter.x, texcoordTransformed.y));\n`;
      shaderText += `  leftDecal = leftDecal * vec4(1.0, 0.0, 0.0, 1.0);\n`;
      shaderText += `  vec4 centerDecal = ${textureFunc}(uTexture, texcoordTransformed * uvTransform.xy + uvTransform.zw);\n`;
      shaderText += `  centerDecal = centerDecal * vec4(0.0, 1.0, 0.0, 1.0);\n`;
      shaderText += `  vec4 rightDecal = ${textureFunc}(uTexture, vec2(texcoordTransformed.x + offsetTexel/splitParameter.x, texcoordTransformed.y));\n`;
      shaderText += `  rightDecal = rightDecal * vec4(0.0, 0.0, 1.0, 1.0);\n`;
      shaderText += `  vec4 decalAberration = leftDecal + centerDecal - (leftDecal * centerDecal);\n`;
      shaderText += `  rt0 *= decalAberration + rightDecal - (decalAberration * rightDecal);\n`;
      shaderText += '} else {\n';
      shaderText += `  rt0 *= ${textureFunc}(uTexture, texcoordTransformed) * textureContributionRate + (vec4(1.0, 1.0, 1.0, 1.0) - textureContributionRate);\n`;
      shaderText += '}\n';

      shaderText += 'rt0 = rt0 * textureContributionRate + (vec4(1.0, 1.0, 1.0, 1.0) - textureContributionRate);\n';

      shaderText += 'if (isVignette) {\n';
      shaderText += '  vec2 pixelPos = vec2((gl_FragCoord.x*2.0/splitParameter.x - 1.0), (gl_FragCoord.y*2.0/splitParameter.y - 1.0));\n';
      shaderText += '  float lengthPixel = length(pixelPos);\n';
      shaderText += `  rt0.xyz = rt0.xyz * max((1.0 - pow(lengthPixel/1.5, 2.2)), 0.0);\n`;
      shaderText += '}\n';

    }

    shaderText += '  rt0.xyz = gamma.w > 0.5 ? pow(rt0.xyz, gamma.xyz) : rt0.xyz;\n';

    //shaderText += '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';

    shaderText += 'if (splitParameter.w > 0.5) {\n';
    shaderText += '  isWireframeInner = true;\n';
    shaderText += '}\n';

    return shaderText;
  }

  FSPostEffect_SPVDecalShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';
    shaderText += 'vec4 borderColor = vec4(0.2, 0.1, 0.1, 1.0);\n';
    shaderText += 'float animationRatio = splitParameter.w;\n';
    shaderText += 'float slope = splitParameter.y/splitParameter.x/(animationRatio*animationRatio);\n';
    shaderText += 'float aspect = splitParameter.x/splitParameter.y;\n';
    shaderText += 'float borderMode = splitParameter.z;\n';
    shaderText += 'float inverseAnimationRatio = 1.0 - splitParameter.w;\n';
    shaderText += 'float tanTheta = splitControlParameter.x;\n';
    shaderText += 'float theta = splitControlParameter.y;\n';
    shaderText += 'float offsetX = splitControlParameter.z;\n';
    shaderText += 'float offsetY = splitControlParameter.w;\n';

//    shaderText += 'float angle = mix(1.0, splitParameter.y/splitParameter.x*tanTheta, animationRatio);\n';
//    shaderText += 'float slope = tanTheta;\n';

    shaderText += 'float offsetValue = splitParameter.x*1.5*(inverseAnimationRatio)*tanTheta;\n';

    shaderText += 'float borderWidth = -0.001;\n';
    shaderText += 'float borderWidth2 = -borderWidth;\n';
    shaderText += 'if (theta < 0.0) {\n';
    shaderText += '  borderWidth *= -1.0;\n';
    shaderText += '}\n';


    shaderText += 'float angle1 = tanTheta * (gl_FragCoord.x - splitParameter.x/2.0 + offsetX - (splitParameter.x*0.0)*animationRatio + offsetValue) + splitParameter.y/2.0 + offsetY;\n';
    shaderText += 'float angle2 = tanTheta * (gl_FragCoord.x - splitParameter.x/2.0 + offsetX - (splitParameter.x*borderWidth)*animationRatio + offsetValue) + splitParameter.y/2.0 + offsetY;\n';
    shaderText += 'float angle3 = tanTheta * (gl_FragCoord.x - splitParameter.x/2.0 + offsetX - (splitParameter.x*0.0)*animationRatio + offsetValue) + splitParameter.y/2.0 + offsetY;\n';

    shaderText += 'if (borderMode < 0.5) {\n';
    shaderText += '  if (theta > 3.141592/2.0|| theta < -3.141592/2.0) {\n';
    shaderText += '    if (gl_FragCoord.y < angle1) {\n';
    shaderText += '      rt0 = vec4(normal_world*0.5+0.5, 1.0);\n';
    shaderText += '    }\n';
    shaderText += '  } else \n';
    shaderText += '  if (gl_FragCoord.y > angle1) {\n';
    shaderText += '    rt0 = vec4(normal_world*0.5+0.5, 1.0);\n';
    shaderText += '  }\n';
    shaderText += '}\n';


    shaderText += '  if (theta > 3.141592/2.0 || theta < -3.141592/2.0) {\n';
    shaderText += '    if (gl_FragCoord.y < angle2) {\n';
    shaderText += '    } else\n';
    shaderText += '    if (gl_FragCoord.y < angle3 + splitParameter.y*borderWidth2 * aspect) {\n';
    shaderText += '      rt0 = borderColor;\n';
    shaderText += '      if (gl_FragCoord.x > splitParameter.x/2.0 - offsetX && gl_FragCoord.x < splitParameter.x/2.0 + splitParameter.x*borderWidth2*3.0 - offsetX) {\n';
    shaderText += '        rt0.xyz = (vec3(1.0) - borderColor.xyz);\n';
    shaderText += '      }\n';
    shaderText += '    }\n';
    shaderText += '  } else\n';

    shaderText += '  if (gl_FragCoord.y > angle2) {\n';
    shaderText += '  } else\n';
    shaderText += '  if (gl_FragCoord.y > angle3 - splitParameter.y*borderWidth2 * aspect) {\n';
    shaderText += '    rt0 = borderColor;\n';
    shaderText += '    if (gl_FragCoord.x > splitParameter.x/2.0 - offsetX && gl_FragCoord.x < splitParameter.x/2.0 + splitParameter.x*borderWidth2*3.0 - offsetX) {\n';
    shaderText += '      rt0.xyz = (vec3(1.0) - borderColor.xyz);\n';
    shaderText += '    }\n';
    shaderText += '  }\n';

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

    material.setUniform(shaderProgram, 'uniform_materialBaseColor', this._glContext.getUniformLocation(shaderProgram, 'materialBaseColor'));
    material.setUniform(shaderProgram, 'uniform_textureContributionRate', this._glContext.getUniformLocation(shaderProgram, 'textureContributionRate'));
    material.setUniform(shaderProgram, 'uniform_gamma', this._glContext.getUniformLocation(shaderProgram, 'gamma'));
    material.setUniform(shaderProgram, 'uniform_splitParameter', this._glContext.getUniformLocation(shaderProgram, 'splitParameter'));
    material.setUniform(shaderProgram, 'uniform_splitControlParameter', this._glContext.getUniformLocation(shaderProgram, 'splitControlParameter'));
    material.setUniform(shaderProgram, 'uniform_isColorAberration', this._glContext.getUniformLocation(shaderProgram, 'isColorAberration'));
    material.setUniform(shaderProgram, 'uniform_isVignette', this._glContext.getUniformLocation(shaderProgram, 'isVignette'));


    let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    if (!diffuseTexture) {
      diffuseTexture = this._glBoostContext.defaultDummyTexture;
    }

    let uTexture = this._glContext.getUniformLocation(shaderProgram, 'uTexture');
    material.setUniform(shaderProgram, 'uTexture', uTexture);
    // set texture unit 0 to the decal texture sampler
    this._glContext.uniform1i( uTexture, 0, true);

    let uvTransform = this._glContext.getUniformLocation(shaderProgram, 'uvTransform');
    material.setUniform(shaderProgram, 'uniform_uvTransform', uvTransform);

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
      material.setUniform(shaderProgram, 'uNormalTexture', normalTexture);
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

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    let baseColor = material.baseColor;
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_materialBaseColor'), baseColor.x, baseColor.y, baseColor.z, baseColor.w, true);

    var texture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);

    var rateVec4 = new Vector4(1, 1, 1, 1);
    let uvTransform = this._glBoostContext.defaultDummyTexture.uvTransform;
    if (texture) {
      rateVec4 = material.getTextureContributionRate(texture.userFlavorName);
      uvTransform = texture.uvTransform;
    }
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_uvTransform'), uvTransform.x, uvTransform.y, uvTransform.z, uvTransform.w, true);
    
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_textureContributionRate'), rateVec4.x, rateVec4.y, rateVec4.z, rateVec4.w, true);

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

//        gl.uniformMatrix4fv(material.getUniform(glslProgram, 'uniform_depthPVMatrix_'+i), false, Matrix44.multiply(projectionMatrix, viewMatrix).flatten());
        gl.uniformMatrix4fv(material.getUniform(glslProgram, 'uniform_depthPVMatrix_'+i), false, lights[i].camera._lastPVMatrixFromLight.flatten());
      }

      if (lights[i].camera && lights[i].camera.texture && lights[i].isCastingShadow) {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 1, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 0, true);
      }

      if (lights[i].camera && lights[i].camera.texture) {
        let uniformLocation = material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i);
        let index = lights[i].camera.texture.textureUnitIndex;

        this._glContext.uniform1i(uniformLocation, index, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i), 0, true);
      }
    }


    let sourceGamma = this.getShaderParameter(material, 'sourceGammaForCorrection', new Vector3(1, 1, 1));
    let targetGamma = this.getShaderParameter(material, 'targetGammaForCorrection', new Vector3(1, 1, 1));
    let isGammaEnable = this.getShaderParameter(material, 'isGammaEnable', true);

    let gamma = Vector3.divideVector(this.handleArgument(targetGamma), this.handleArgument(sourceGamma));
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_gamma'), gamma.x, gamma.y, gamma.z, isGammaEnable ? 1 : 0, true);

    let splitParameter = this.getShaderParameter(material, 'splitParameter', new Vector4(1, 1, 1, 0));
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_splitParameter'), this._glContext.canvasWidth, this._glContext.canvasHeight, splitParameter.z, splitParameter.w, true);

    let splitControlParameter = this.getShaderParameter(material, 'splitControlParameter', new Vector4(Math.PI/4, Math.PI/4, 0, 0));
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_splitControlParameter'), Math.tan(splitControlParameter.x), splitControlParameter.x, splitControlParameter.z, splitControlParameter.w, true);

    let isColorAberration = this.getShaderParameter(material, 'isColorAberration', false);
    this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isColorAberration'), isColorAberration, true);

    let isVignette = this.getShaderParameter(material, 'isVignette', false);
    this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isVignette'), isVignette, true);

  }

  setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i), 0, true);  // +1 because 0 is used for diffuse texture
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
