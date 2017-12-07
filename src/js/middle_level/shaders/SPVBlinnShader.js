import Shader from '../../low_level/shaders/Shader';
import SPVDecalShader from './SPVDecalShader';
import Vector4 from '../../low_level/math/Vector4';

export class SPVBlinnShaderSource {
  FSDefine_SPVBlinnShaderSource(in_, f, lights) {
    let shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;
    shaderText += `uniform float refractiveIndex;\n`;
    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights
    
    let sampler2D = this._sampler2DShadow_func();
    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform int isShadowCasting[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform bool toUseSurfaceColorAsSpecularMap;\n`;

    return shaderText;
  }

  FSMethodDefine_SPVBlinnShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += `
      const float PI = 3.1415926;
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
    float d_torrance_sparrow(float NH, float c2) {
      float ac2 = acos(NH) * c2;
      return exp(-1.0 * ac2 * ac2);
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
    float g_shielding(float NH, float NV, float NL, float VH) {
      float g1 = 2.0 * NH * NV / VH;
      float g2 = 2.0 * NH * NL / VH;
      return max(0.0, min(1.0, min(g1, g2)));
    }
    `;

    shaderText += `
    float fresnel(float n, float VH) {
      float c = VH;
      float g = sqrt(n * n + c * c - 1.0);
      float f = ((g - c)*(g - c))/((g + c)*(g + c)) * (1.0 + 
      ((c * (g + c) - 1.0)*(c * (g + c) - 1.0))
      /
      ((c * (g - c) - 1.0)*(c * (g - c) - 1.0))
      );
      return f;
    }
    `;

    shaderText += `
    float blinn_specular(float n, float NH, float NV, float NL, float VH, float power) {    
      float D = d_torrance_reiz(NH, power);
      float G = g_shielding(NH, NV, NL, VH);
      float F = fresnel(n, VH);
      return D*G*F/NV;
    }
    `;

    return shaderText;
  }

  FSShade_SPVBlinnShaderSource(f, gl, lights, material, extraData) {
    var textureProjFunc = Shader._textureProj_func(gl);

    let shaderText = '';
    shaderText += '  float depthBias = 0.005;\n';
    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';

    let lightsExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();});
    for (let i=0; i<lightsExceptAmbient.length; i++) {
      let light = lightsExceptAmbient[i];            
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

      shaderText += `    float specular = blinn_specular(refractiveIndex, NH, NV, NL, VH, power);\n`;
      shaderText += `    if (toUseSurfaceColorAsSpecularMap) {\n`;
      shaderText += `      specular *= grayscale(surfaceColor) + 0.5;\n`;
      shaderText += `    };\n`;

      shaderText += `    vec4 enlighten = Ks * lightDiffuse[${i}];\n`;
      shaderText += `    enlighten *= spotEffect * vec4(specular, specular, specular, 0.0);\n`;
      shaderText += `    enlighten *= vec4(visibilitySpecular, visibilitySpecular, visibilitySpecular, 1.0);\n`;
      shaderText += `    rt0 += enlighten;\n`;
      shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
      //shaderText += '  rt0.a = 1.0;\n';
    }
    shaderText += '  rt0 += ambient;\n';    

    return shaderText;
  }

  prepare_SPVBlinnShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    let vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));
    material.setUniform(shaderProgram, 'uniform_refractiveIndex', this._glContext.getUniformLocation(shaderProgram, 'refractiveIndex'));
    material.setUniform(shaderProgram, 'uniform_toUseSurfaceColorAsSpecularMap', this._glContext.getUniformLocation(shaderProgram, 'toUseSurfaceColorAsSpecularMap'));
    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));    
    
    return vertexAttribsAsResult;
  }
}

export default class SPVBlinnShader extends SPVDecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    SPVBlinnShader.mixin(SPVBlinnShaderSource);

    this._power = 0.04;
    this._refractiveIndex = 1.85;
    this._toUseSurfaceColorAsSpecularMap = true;
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let Kd = material.diffuseColor;
    let Ks = material.specularColor;
    let Ka = material.ambientColor;    
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w, true);
    this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_power'), this._power, true);
    this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_refractiveIndex'), this._refractiveIndex, true);
    this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_toUseSurfaceColorAsSpecularMap'), this._toUseSurfaceColorAsSpecularMap, true);
  
    const accumulatedAmbientIntensity = Vector4.zero();
    for (let light of lights) {
      if (light.isTypeAmbient()) {
        accumulatedAmbientIntensity.add(light.intensity.toVector4());
      }
    }
    let ambient = Vector4.multiplyVector(Ka, accumulatedAmbientIntensity);
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);

  }

  set Kd(value) {
    this._Kd = value;
  }

  get Kd() {
    return this._Kd;
  }

  set Ks(value) {
    this._Ks = value;
  }

  get Ks() {
    return this._Ks;
  }

  set power(value) {
    this._power = value;
  }

  get power() {
    return this._power;
  }

  set refractiveIndex(value) {
    this.refractiveIndex = value;
  }

  get refractiveIndex() {
    return this._refractiveIndex;
  }
}

GLBoost['SPVBlinnShader'] = SPVBlinnShader;
