import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector4 from '../../low_level/math/Vector4';

export class PBRPrincipledShaderSource {

  FSDefine_PBRPrincipledShaderSource(in_, f, lights) {
    
    var shaderText = '';
    shaderText += 'uniform vec2 uMetallicRoughnessFactors;\n';
    shaderText += 'uniform vec3 uBaseColorFactor;\n';

    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights

    var sampler2D = this._sampler2DShadow_func();
    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;    
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

    return shaderText;
  }

  FSShade_PBRPrincipledShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += `
vec3 surfaceColor = rt0.rgb;
rt0 = vec4(0.0, 0.0, 0.0, 0.0);

// BaseColor
vec3 baseColor = srgbToLinear(surfaceColor) * uBaseColorFactor.rgb;

// Metallic & Roughness
float userRoughness = uMetallicRoughnessFactors.y;
float metallic = uMetallicRoughnessFactors.x;

userRoughness = clamp(userRoughness, c_MinRoughness, 1.0);
metallic = clamp(metallic, 0.0, 1.0);
float alphaRoughness = userRoughness * userRoughness;

// F0
vec3 diffuseMatAverageF0 = vec3(0.04);
vec3 F0 = mix(diffuseMatAverageF0, baseColor.rgb, metallic);

// Albedo
//vec3 albedo = baseColor.rgb * (vec3(1.0) - F0);
vec3 albedo = baseColor.rgb * (1.0 - metallic);

`;
    for (let i=0; i<lights.length; i++) {
      let light = lights[i];
      let isShadowEnabledAsTexture = (light.camera && light.camera.texture) ? true:false;
      shaderText += `  {\n`;
      shaderText +=      Shader._generateLightStr(i);
      // Light
      shaderText += `    vec4 incidentLight = spotEffect * lightDiffuse[${i}];\n`;
      shaderText += `    incidentLight.rgb *= M_PI;\n`; // This light is assumed as punctual light

      // Fresnel
      shaderText += `    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n`;
      shaderText += '    vec3 halfVector = normalize(lightDirection + viewDirection);\n';
      shaderText += '    float LH = clamp(dot(lightDirection, halfVector), 0.0, 1.0);\n';
      shaderText += '    vec3 F = fresnel(F0, LH);\n';

      // Diffuse
      shaderText += `    vec3 diffuseContrib = (vec3(1.0) - F) * diffuse_brdf(albedo);\n`;
       
      // Specular
      shaderText += '    float NL = clamp(dot(normal, lightDirection), 0.001, 1.0);\n';
      shaderText += '    float NV = clamp(dot(normal, viewDirection), 0.001, 1.0);\n';
      shaderText += '    float NH = clamp(dot(normal, halfVector), 0.0, 1.0);\n';
      shaderText += '    float VH = clamp(dot(viewDirection, halfVector), 0.0, 1.0);\n';
      shaderText += `    vec3 specularContrib = cook_torrance_specular_brdf(NH, NL, NV, F, alphaRoughness);\n`;

      shaderText += `    vec3 reflect = (diffuseContrib + specularContrib) * vec3(NL) * incidentLight.rgb;\n`;

      // Light Visibility (Shadow Effect)
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);

      // Add this light contribute to the amount of light
      shaderText += `    rt0.xyz += reflect * visibility;\n`;

      shaderText += `  }\n`;
    }
    shaderText += '  rt0.xyz += ambient.xyz;\n';
    shaderText += '  rt0.xyz = linearToSrgb(rt0.xyz);\n';
     
    shaderText += '  rt0.a = 1.0;\n';



    return shaderText;
  }

  prepare_PBRPrincipledShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_MetallicRoughnessFactors', this._glContext.getUniformLocation(shaderProgram, 'uMetallicRoughnessFactors'));
    material.setUniform(shaderProgram, 'uniform_BaseColorFactor', this._glContext.getUniformLocation(shaderProgram, 'uBaseColorFactor'));
    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));
    
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

    var baseColor = material.baseColor;
    var metallic = material.metallic;
    let roughness = material.roughness;
    this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_MetallicRoughnessFactors'), metallic, roughness, true);
    this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_BaseColorFactor'), baseColor.x, baseColor.y, baseColor.z, true);

    let ambient = Vector4.multiplyVector(new Vector4(1.0, 1.0, 1.0, 1.0), scene.getAmountOfAmbientLightsIntensity());
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);    

  }

}

GLBoost['PBRPrincipledShader'] = PBRPrincipledShader;
