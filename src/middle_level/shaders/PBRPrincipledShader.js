import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector4 from '../../low_level/math/Vector4';

export class PBRPrincipledShaderSource {

  FSDefine_PBRPrincipledShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += 'uniform vec4 Kd;\n';
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
    float cook_torrance_specular_brdf(float f0, float NH, float NL, float NV, float alphaRoughness) {    
      float D = d_ggx(NH, alphaRoughness);
      float G = g_shielding(NL, NV, alphaRoughness);
      float F = fresnel(f0, LH);
      return D*G*F/(4.0*NL*NV);
    }
    `;

    return shaderText;
  }

  FSShade_PBRPrincipledShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    
    for (let i=0; i<lights.length; i++) {
      let light = lights[i];
      let isShadowEnabledAsTexture = (light.camera && light.camera.texture) ? true:false;
      shaderText += `  {\n`;
      shaderText +=      Shader._generateLightStr(i);
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
      shaderText += `    float diffuse = max(dot(lightDirection, normal), 0.0);\n`;
      shaderText += `    rt0 += spotEffect * vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n`;
      shaderText += '    vec3 halfVector = normalize(lightDirection + viewDirection);\n';
      shaderText += '    float NH = dot(normal, halfVector);\n';
      shaderText += '    float NV = dot(normal, viewDirection);\n';
      shaderText += '    float NL = dot(normal, lightDirection);\n';
      shaderText += '    float VH = dot(viewDirection, halfVector);\n';

      shaderText += `    float specular = cook_torrance_specular_brdf(f0, NH, NL, NV, alphaRoughness);\n`;
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
