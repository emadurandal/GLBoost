import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector4 from '../../low_level/math/Vector4';

export class PBRPrincipledShaderSource {

  FSDefine_PBRPrincipledShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += 'uniform vec4 Kd;\n';
    shaderText += 'uniform vec2 uMetallicRoughness;\n';
    shaderText += 'uniform vec4 uBaseColorFactor;\n';

    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;
    if (lightNumExceptAmbient > 0) {
      shaderText += `uniform highp ${sampler2D} uDepthTexture[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform int isShadowCasting[${lightNumExceptAmbient}];\n`;
    }

    return shaderText;
  }

  VSMethodDefine_PBRPrincipledShaderSource(f, lights, material, extraData) {
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
      float f = (roughnessSqr - 1) * NH * NH + 1.0;
      return roughnessSq / (M_PI * f * f);
    }
    `;

    shaderText += `
    float d_torrance_reiz(float NH, float c3) {
      float CosSquared = NH*NH;
      float TanSquared = (1.0 - CosSquared)/CosSquared;
      //return (1.0/PI) * sqr(c3/(CosSquared * (c3*c3 + TanSquared)));  // gamma = 2, aka GGX
      return (1.0/sqrt(PI)) * (sqr(c3)/(CosSquared * (c3*c3 + TanSquared))); // gamma = 1, D_Berry
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
    float fresnel(float f0, float LH) {
      return f0 + (1.0 - f0) * pow(1.0 - LH, 5);
    }
    `;

    shaderText += `
    float cook_torrance_specular_brdf(float NH, float NL, float NV, float F, float alphaRoughness) {    
      float D = d_ggx(NH, alphaRoughness);
      float G = g_shielding(NL, NV, alphaRoughness);
      return D*G*F/(4.0*NL*NV);
    }
    `;

    shaderText += `
    vec3 diffuse_brdf(vec3 Kd)
    {
      return Kd / M_PI;
    }
    `;


    return shaderText;
  }

  FSShade_PBRPrincipledShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += `
vec4 surfaceColor = rt0;
rt0 = vec4(0.0, 0.0, 0.0, 0.0);
float userRoughness = uMetallicRoughness.y;
float metallic = uMetallicRoughness.x;
userRoughness = clamp(userRoughness, c_MinRoughness, 1.0);
metallic = clamp(metallic, 0.0, 1.0);
float alphaRoughness = userRoughness * userRoughness;
`;
    for (let i=0; i<lights.length; i++) {
      let light = lights[i];
      let isShadowEnabledAsTexture = (light.camera && light.camera.texture) ? true:false;
      shaderText += `  {\n`;
      shaderText +=      Shader._generateLightStr(i);
      // Light
      shaderText += `    vec4 incidentLight = spotEffect * lightDiffuse[${i}];\n`;

      // Diffuse
      shaderText += `    vec3 diffuseContrib = (1.0 - F) * diffuse_brdf(Kd.xyz);\n`;
       
      // Specular
      shaderText += `    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n`;
      shaderText += '    vec3 halfVector = normalize(lightDirection + viewDirection);\n';
      shaderText += '    float NL = clamp(dot(normal, lightDirection), 0.001, 1.0);\n';
      shaderText += '    float NV = clamp(dot(normal, viewDirection), 0.001, 1.0);\n';
      shaderText += '    float NH = clamp(dot(normal, halfVector), 0.0, 1.0);\n';
      shaderText += '    float LH = clamp(dot(lightDirection, halfVector, 0.0, 1.0);\n';
      shaderText += '    float VH = clamp(dot(viewDirection, halfVector, 0.0, 1.0);\n';
      shaderText += '    float F = fresnel(f0, LH);\n';
      shaderText += `    vec3 specularContrib = cook_torrance_specular_brdf(NH, NL, NV, F, alphaRoughness);\n`;

      shaderText += `    vec3 reflect = (diffuseLight + specularContrib) * NL * incidentLight;\n`;

      // Light Visibility (Shadow Effect)
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);

      // Add this light contribute to the amount of light
      shaderText += `    rt0.xyz += reflect * visibility;\n`;

      shaderText += `  }\n`;
    }
    shaderText += '  rt0.xyz += ambient.xyz;\n';
    
    //shaderText += '  rt0.a = 1.0;\n';
    // shaderText += '  rt0 = surfaceColor;\n';
//    shaderText += '  rt0 = vec4(v_shadowCoord[0].xy, 0.0, 1.0);\n';



    return shaderText;
  }

  prepare_PBRPrincipledShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));
    
    return vertexAttribsAsResult;
  }
}


export default class PBRPrincipledShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    LambertShader.mixin(LambertShaderSource);
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

  }

}

GLBoost['PBRPrincipledShader'] = PBRPrincipledShader;
