import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';

export class PBRPrincipledShaderSource {

  FSDefine_PBRPrincipledShaderSource(in_, f, lights, material, extraData) {
    
    let shaderText = '';
    shaderText += 'uniform vec2 uMetallicRoughnessFactors;\n';
    shaderText += 'uniform vec3 uBaseColorFactor;\n';
    shaderText += 'uniform vec2 uOcclusionFactors;'
    shaderText += 'uniform vec3 uEmissiveFactor;'
    shaderText += 'uniform sampler2D uMetallicRoughnessTexture;\n';

    const occlusionTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_OCCLUSION);
    if (occlusionTexture) {
      shaderText += 'uniform sampler2D uOcclusionTexture;\n';
    }
    
    const emissiveTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_EMISSIVE);
    if (emissiveTexture) {
      shaderText += 'uniform sampler2D uEmissiveTexture;\n';
    }

    const diffuseEnvCubeTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE);
    if (diffuseEnvCubeTexture) {
      shaderText += 'uniform sampler2D uBrdfLUTTexture;\n';
      shaderText += 'uniform samplerCube uDiffuseEnvTexture;\n';
      shaderText += 'uniform samplerCube uSpecularEnvTexture;\n';
      shaderText += 'uniform vec3 uIBLParameters;\n'; // Ka * amount of ambient lights
    }
    
    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights
    

    let sampler2D = this._sampler2DShadow_func();
    const lightNumExceptAmbient = lights.filter((light)=>!light.isTypeAmbient()).length;    
    if (lightNumExceptAmbient > 0) {
      shaderText += `uniform highp ${sampler2D} uDepthTexture[${lightNumExceptAmbient}];\n`;
      shaderText += `${in_} vec4 v_shadowCoord[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform int isShadowCasting[${lightNumExceptAmbient}];\n`;
    }

    return shaderText;
  }

  FSMethodDefine_PBRPrincipledShaderSource(f, lights, material, extraData) {
    let shaderText = '';

    shaderText += `
      const float M_PI = 3.141592653589793;
      const float c_MinRoughness = 0.04;
    `;

    shaderText += `
    float angular_n_h(float NH) {
      return acos(NH);
    }
    `;

    shaderText += `
    float sqr(float x) {
      return x*x;
    }
    `;


    shaderText += `
    float d_phong(float NH, float c1) {
      return pow(
        cos(acos(NH))
        , c1
      );
    }
    `;

    shaderText += `
    // GGX NDF
    float d_ggx(float NH, float alphaRoughness) {
      float roughnessSqr = alphaRoughness * alphaRoughness;
      float f = (roughnessSqr - 1.0) * NH * NH + 1.0;
      return roughnessSqr / (M_PI * f * f);
    }
    `;

    shaderText += `
    float d_torrance_reiz(float NH, float c3) {
      float CosSquared = NH*NH;
      float TanSquared = (1.0 - CosSquared)/CosSquared;
      //return (1.0/M_PI) * sqr(c3/(CosSquared * (c3*c3 + TanSquared)));  // gamma = 2, aka GGX
      return (1.0/sqrt(M_PI)) * (sqr(c3)/(CosSquared * (c3*c3 + TanSquared))); // gamma = 1, D_Berry
    }
    `;

    shaderText += `
    float d_beckmann(float NH, float m) {
      float co = 1.0 / (4.0 * m * m * NH * NH * NH * NH);
      float expx = exp((NH * NH - 1.0) / (m * m * NH * NH));
      return co * expx; 
    }
    `;

    shaderText += `
    // the same as glTF WebGL sample
    // https://github.com/KhronosGroup/glTF-WebGL-PBR/blob/88eda8c5358efe03128b72b6c5f5f6e5b6d023e1/shaders/pbr-frag.glsl#L188
    // That is, Unreal Engine based approach, but modified to use alphaRoughness (squared artist's roughness parameter),
    // and based on 'Separable Masking and Shadowing' approximation (propesed by Christophe Schlick)
    // https://www.cs.virginia.edu/~jdl/bib/appearance/analytic%20models/schlick94b.pdf
    float g_shielding(float NL, float NV, float alphaRoughness) {
      float r = alphaRoughness;

      // Local Shadowing using "Schlick-Smith" Masking Function
      float localShadowing = 2.0 * NL / (NL + sqrt(r * r + (1.0 - r * r) * (NL * NL)));
      
      // Local Masking using "Schlick-Smith" Masking Function
      float localMasking = 2.0 * NV / (NV + sqrt(r * r + (1.0 - r * r) * (NV * NV)));
      
      return localShadowing * localMasking;
    }
    `;

    shaderText += `
    // The Schlick Approximation to Fresnel
    vec3 fresnel(vec3 f0, float LH) {
      return vec3(f0) + (vec3(1.0) - f0) * pow(1.0 - LH, 5.0);
    }
    `;

    shaderText += `
    vec3 cook_torrance_specular_brdf(float NH, float NL, float NV, vec3 F, float alphaRoughness) {    
      float D = d_ggx(NH, alphaRoughness);
      float G = g_shielding(NL, NV, alphaRoughness);
      return vec3(D)*vec3(G)*F/vec3(4.0*NL*NV);
    }
    `;

    shaderText += `
    vec3 diffuse_brdf(vec3 albedo)
    {
      return albedo / M_PI;
    }
    `;

    shaderText += `
      vec3 srgbToLinear(vec3 srgbColor) {
        return pow(srgbColor, vec3(2.2));
      }
    `;

    shaderText += `
    vec3 linearToSrgb(vec3 linearColor) {
      return pow(linearColor, vec3(1.0/2.2));
    }
  `;

    const diffuseEnvCubeTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE);
    if (diffuseEnvCubeTexture) {
      shaderText += `
      vec3 IBLContribution(vec3 n, float NV, vec3 reflection, vec3 albedo, vec3 F0, float userRoughness)
      {
        float mipCount = uIBLParameters.x;
        float lod = (userRoughness * mipCount);

        vec3 brdf = srgbToLinear(texture2D(uBrdfLUTTexture, vec2(NV, 1.0 - userRoughness)).rgb);
        vec3 diffuseLight = srgbToLinear(textureCube(uDiffuseEnvTexture, n).rgb);
        `;
      const gl = this._glBoostSystem._glContext.gl;
      const lodExt = gl.getExtension("EXT_shader_texture_lod");
      if (lodExt) {
        shaderText += `vec3 specularLight = srgbToLinear(textureCubeLodEXT(uSpecularEnvTexture, reflection, lod).rgb);`;
      } else {
        shaderText += `vec3 specularLight = srgbToLinear(textureCube(uSpecularEnvTexture, reflection).rgb);`;
      }
      shaderText += `
        vec3 diffuse = diffuseLight * albedo;
        vec3 specular = specularLight * (F0 * brdf.x + brdf.y);

        float IBLDiffuseContribution = uIBLParameters.y;
        float IBLSpecularContribution = uIBLParameters.z;
        diffuse *= IBLDiffuseContribution;
        specular *= IBLSpecularContribution;
        return diffuse + specular;
      }
      `;
    }

    return shaderText;
  }

  FSShade_PBRPrincipledShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';

    shaderText += `
vec3 surfaceColor = rt0.rgb;
rt0 = vec4(0.0, 0.0, 0.0, 0.0);

// BaseColor
vec3 baseColor = srgbToLinear(surfaceColor) * uBaseColorFactor.rgb;

// Metallic & Roughness
float userRoughness = uMetallicRoughnessFactors.y;
float metallic = uMetallicRoughnessFactors.x;
`;

    const metallicRoughnessTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_METALLIC_ROUGHNESS);
    if (metallicRoughnessTexture) {
    shaderText += `
vec4 ormTexel = texture2D(uMetallicRoughnessTexture, texcoord);
userRoughness = ormTexel.g * userRoughness;
metallic = ormTexel.b * metallic;
`;
    }

    shaderText += `
userRoughness = clamp(userRoughness, c_MinRoughness, 1.0);
metallic = clamp(metallic, 0.0, 1.0);
float alphaRoughness = userRoughness * userRoughness;

// F0
vec3 diffuseMatAverageF0 = vec3(0.04);
vec3 F0 = mix(diffuseMatAverageF0, baseColor.rgb, metallic);

// Albedo
vec3 albedo = baseColor.rgb * (vec3(1.0) - diffuseMatAverageF0);
albedo.rgb *= (1.0 - metallic);
`;
    shaderText += `    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n`;
    shaderText += '    float NV = clamp(dot(normal, viewDirection), 0.001, 1.0);\n';

    for (let i=0; i<lights.length; i++) {
      const light = lights[i];
      const isShadowEnabledAsTexture = !!((light.camera && light.camera.texture));
      shaderText += `  {\n`;
      shaderText +=      Shader._generateLightStr(i);
      // Light
      shaderText += `    vec4 incidentLight = spotEffect * lightDiffuse[${i}];\n`;
      shaderText += `    incidentLight.rgb *= M_PI;\n`; // This light is assumed as punctual light

      // Fresnel
      shaderText += '    vec3 halfVector = normalize(lightDirection + viewDirection);\n';
      shaderText += '    float LH = clamp(dot(lightDirection, halfVector), 0.0, 1.0);\n';
      shaderText += '    vec3 F = fresnel(F0, LH);\n';

      // Diffuse
      shaderText += `    vec3 diffuseContrib = (vec3(1.0) - F) * diffuse_brdf(albedo);\n`;
       
      // Specular
      shaderText += '    float NL = clamp(dot(normal, lightDirection), 0.001, 1.0);\n';
      shaderText += '    float NH = clamp(dot(normal, halfVector), 0.0, 1.0);\n';
      shaderText += '    float VH = clamp(dot(viewDirection, halfVector), 0.0, 1.0);\n';
      shaderText += `    vec3 specularContrib = cook_torrance_specular_brdf(NH, NL, NV, F, alphaRoughness);\n`;
      shaderText += `    vec3 diffuseAndSpecular = (diffuseContrib + specularContrib) * vec3(NL) * incidentLight.rgb;\n`;

      // Light Visibility (Shadow Effect)
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);

      // Add this light contribute to the amount of light
      shaderText += `    rt0.xyz += diffuseAndSpecular * visibility;\n`;

      shaderText += `  }\n`;
    }


    // Indirect
    // / IBL
    
    const diffuseEnvCubeTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE);
    if (diffuseEnvCubeTexture) {
      shaderText += `vec3 reflection = reflect(-viewDirection, normal);\n`;
      shaderText += 'vec3 ibl = IBLContribution(normal, NV, reflection, albedo, F0, userRoughness);\n';
    } else {
      shaderText += 'vec3 ibl = vec3(0.0, 0.0, 0.0);\n';
    }
    
// shaderText += 'ibl = vec3(0.0, 0.0, 0.0);\n';
    // calc occlusion
    shaderText += 'float occlusion = 1.0;\n';
    const occlusionTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_OCCLUSION);
    if (occlusionTexture) {
      shaderText += 'occlusion = mix(1.0, texture2D(uOcclusionTexture, texcoord).r, uOcclusionFactors.x);\n';
    }

    // / Enforce Occlution to Directional Lights by occlusionRateForDirectionalLight (Fake effect)
    shaderText += '  float occlusionRateForDirectionalLight = uOcclusionFactors.y;\n';
    shaderText += '  rt0.xyz = mix(rt0.xyz, rt0.xyz * occlusion, occlusionRateForDirectionalLight);\n';
    
    // Occlution to Indirect Lights
    shaderText += '  rt0.xyz += (ambient.xyz + ibl) * occlusion;\n';

    // Emissive
    shaderText += '  vec3 emissive = uEmissiveFactor;\n';
    const emissiveTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_EMISSIVE);
    if (emissiveTexture) {
      shaderText += 'emissive *= srgbToLinear(texture2D(uEmissiveTexture, texcoord).xyz);';
    }
    shaderText += '  rt0.xyz += emissive;\n';

    shaderText += '  rt0.xyz = linearToSrgb(rt0.xyz);\n';
     
    shaderText += '  rt0.a = 1.0;\n';
//    shaderText += '  rt0.xyz = vec3(texture2D(uOcclusionTexture, texcoord).r);\n';


    return shaderText;
  }

  prepare_PBRPrincipledShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    let vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_BaseColorFactor', this._glContext.getUniformLocation(shaderProgram, 'uBaseColorFactor'));
    material.setUniform(shaderProgram, 'uniform_MetallicRoughnessFactors', this._glContext.getUniformLocation(shaderProgram, 'uMetallicRoughnessFactors'));
    material.setUniform(shaderProgram, 'uniform_OcclusionFactors', this._glContext.getUniformLocation(shaderProgram, 'uOcclusionFactors'));
    material.setUniform(shaderProgram, 'uniform_EmissiveFactor', this._glContext.getUniformLocation(shaderProgram, 'uEmissiveFactor'));
    material.setUniform(shaderProgram, 'uniform_IBLParameters', this._glContext.getUniformLocation(shaderProgram, 'uIBLParameters'));
    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));

    material.setTexture(this._glBoostSystem._glBoostContext.brdfLutTexture, GLBoost.TEXTURE_PURPOSE_BRDF_LUT);
    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_METALLIC_ROUGHNESS, shaderProgram, 'uMetallicRoughnessTexture'); 
    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_OCCLUSION, shaderProgram, 'uOcclusionTexture');
    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_EMISSIVE, shaderProgram, 'uEmissiveTexture');
    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_BRDF_LUT, shaderProgram, 'uBrdfLutTexture');
    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE, shaderProgram, 'uDiffuseEnvTexture');
    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_IBL_SPECULAR_ENV_CUBE, shaderProgram, 'uSpecularEnvTexture');

    return vertexAttribsAsResult;
  }
}


export default class PBRPrincipledShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    PBRPrincipledShader.mixin(PBRPrincipledShaderSource);
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    let baseColor = material.baseColor;
    let metallic = (material.metallic !== void 0) ? material.metallic : 1.0;
    const roughness = (material.roughness !== void 0) ? material.roughness : 0.5;
    const occlusion = (material.occlusion !== void 0) ? material.occlusion : 1.0;
    const occlusionRateForDirectionalLight = (material.occlusionRateForDirectionalLight !== void 0) ? material.occlusionRateForDirectionalLight : 0.2;
    const emissive = (material.emissive !== void 0) ? material.emissive : Vector3.zero();
    const IBLSpecularTextureMipmapCount = (material.IBLSpecularTextureMipmapCount !== void 0) ? material.IBLSpecularTextureMipmapCount : 9;
    const IBLDiffuseContribution = (material.IBLDiffuseContribution !== void 0) ? material.IBLDiffuseContribution : 0.2;
    const IBLSpecularContribution = (material.IBLSpecularContribution !== void 0) ? material.IBLSpecularContribution : 0.2;
    this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_MetallicRoughnessFactors'), metallic, roughness, true);
    this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_BaseColorFactor'), baseColor.x, baseColor.y, baseColor.z, true);
    this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_OcclusionFactors'), occlusion, occlusionRateForDirectionalLight, true);
    this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_EmissiveFactor'), emissive.x, emissive.y, emissive.z, true);
    this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_IBLParameters'), IBLSpecularTextureMipmapCount, IBLDiffuseContribution, IBLSpecularContribution, true);

    const ambient = Vector4.multiplyVector(new Vector4(1.0, 1.0, 1.0, 1.0), scene.getAmountOfAmbientLightsIntensity());
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);    

  }

}

GLBoost.PBRPrincipledShader = PBRPrincipledShader;
