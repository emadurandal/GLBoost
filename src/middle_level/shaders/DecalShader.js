import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';
import WireframeShader from './WireframeShader';
import VertexWorldShadowShaderSource from './VertexWorldShadowShader';
import Matrix44 from '../../low_level/math/Matrix44';
import Vector4 from '../../low_level/math/Vector4';

export class DecalShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

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
    if (material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE)) {
      shaderText += 'uniform sampler2D uTexture;\n';
    }
    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);
    if (normalTexture) {
      shaderText += `uniform highp sampler2D uNormalTexture;\n`;
    }
    shaderText += 'uniform vec4 materialBaseColor;\n';
    shaderText += 'uniform int uIsTextureToMultiplyAlphaToColorPreviously;\n';
    shaderText += 'uniform vec2 uAlphaTestParameters;\n';
    
    return shaderText;
  }

  FSMethodDefine_DecalShaderSource(f, lights, material, extraData) {
    let shaderText = '';

    shaderText += this._multiplyAlphaToColorOfTexel();

    return shaderText;
  }

  FSShade_DecalShaderSource(f, gl, lights, material, extraData) {
    var shaderText = '';

    shaderText += Shader._getNormalStr(gl, material, f);
    
    var textureFunc = Shader._texture_func(gl);
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  rt0 *= color;\n';
    }
    shaderText += '    rt0 *= materialBaseColor;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD) && material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE)) {
      shaderText += `  rt0 *= multiplyAlphaToColorOfTexel(uTexture, texcoord, uIsTextureToMultiplyAlphaToColorPreviously);\n`;
    }

    //shaderText += '    float shadowRatio = 0.0;\n';

    //shaderText += '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';

    return shaderText;
  }

  FSFinalize_DecalShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';
    shaderText += `
                     if (uAlphaTestParameters.x > 0.5 && rt0.a < uAlphaTestParameters.y) {
                       discard;
                     }
    `;

    return shaderText;
  }

  prepare_DecalShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'color' || attribName === 'texcoord') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        if (shaderProgram['vertexAttribute_' + attribName] !== -1) {
          gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
          vertexAttribsAsResult.push(attribName);  
        }
      }
    });

    material.setUniform(shaderProgram, 'uniform_materialBaseColor', this._glContext.getUniformLocation(shaderProgram, 'materialBaseColor'));

    let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    if (!diffuseTexture) {
      diffuseTexture = this._glBoostSystem._glBoostContext.defaultDummyTexture;
    }

    if (diffuseTexture.toMultiplyAlphaToColorPreviously) {
      let uIsTextureToMultiplyAlphaToColorPreviously = this._glContext.getUniformLocation(shaderProgram, 'uIsTextureToMultiplyAlphaToColorPreviously');
      material.setUniform(shaderProgram, 'uIsTextureToMultiplyAlphaToColorPreviously', uIsTextureToMultiplyAlphaToColorPreviously);
    }
    material.setUniform(shaderProgram, 'uniform_alphaTestParameters', this._glContext.getUniformLocation(shaderProgram, 'uAlphaTestParameters'));

    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_DIFFUSE, shaderProgram, 'uTexture'); 
    
    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_NORMAL, shaderProgram, 'uNormalTexture'); 
    
    return vertexAttribsAsResult;
  }
}

export default class DecalShader extends WireframeShader {
  constructor(glBoostContext) {

    super(glBoostContext);

    DecalShader.mixin(VertexWorldShadowShaderSource);
    DecalShader.mixin(DecalShaderSource);

    this._lut = null;
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    let baseColor = null;
    if (material.className.indexOf('ClassicMaterial') !== -1) {
      baseColor = material.baseColor;
    } else {
      baseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    }
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_materialBaseColor'), baseColor.x, baseColor.y, baseColor.z, baseColor.w, true);

    let diffuseTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    if (diffuseTexture) {
//      material.uniformTextureSamplerDic['uTexture'].textureName = diffuseTexture.userFlavorName;
      material.updateTextureInfo(GLBoost.TEXTURE_PURPOSE_DIFFUSE, 'uTexture'); 
      this._glContext.uniform1i(material.getUniform(glslProgram, 'uIsTextureToMultiplyAlphaToColorPreviously'), diffuseTexture.toMultiplyAlphaToColorPreviously, true);
    }
    
    const alphaCutoff = material.alphaCutoff;
    const isAlphaTestEnable = material.isAlphaTest;
    this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_alphaTestParameters'), isAlphaTestEnable ? 1.0 : 0.0, alphaCutoff, true);

    // For Shadow
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        const index = i + material.getTextureNumAttachedShader();
        lights[i].camera.texture.textureUnitIndex = index;

        let cameraMatrix = lights[i].camera.lookAtRHMatrix();
        let viewMatrix = cameraMatrix.clone();
        let projectionMatrix = lights[i].camera.projectionRHMatrix();
        this._glContext.uniformMatrix4fv(material.getUniform(glslProgram, 'uniform_depthPVMatrix_'+i), false, Matrix44.multiply(projectionMatrix, viewMatrix).flatten(), true);
      }

      if (lights[i].camera && lights[i].camera.texture) {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 1, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 0, true);
      }

      if (lights[i].camera && lights[i].camera.texture) {
        let uniformLocation = material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i);
        let index = lights[i].camera.texture.textureUnitIndex;
        //const index = i + material.getTextureNumAttachedShader();


        this._glContext.uniform1i(uniformLocation, index, true);
      } else {
        //this._glContext.uniform1i(uniformLocation, 0, true);
      }
    }
  }

  setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        //this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i), 0, true);  // +1 because 0 is used for diffuse texture
      }
    }
  }

  set lut(lut) {
    this._lut = lut;
  }

  get lut() {
    return this._lut;
  }
}

GLBoost['DecalShader'] = DecalShader;
