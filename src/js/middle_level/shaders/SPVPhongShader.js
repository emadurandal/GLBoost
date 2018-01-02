import Shader from '../../low_level/shaders/Shader';
import SPVDecalShader from './SPVDecalShader';
import Vector4 from '../../low_level/math/Vector4';

export class SPVPhongShaderSource {

  FSDefine_SPVPhongShaderSource(in_, f, lights) {
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;
    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights
    
    var sampler2D = this._sampler2DShadow_func();
    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;
    shaderText += `uniform highp ${sampler2D} uDepthTexture[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform int isShadowCasting[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform bool toUseSurfaceColorAsSpecularMap;\n`;

    return shaderText;
  }

  FSShade_SPVPhongShaderSource(f, gl, lights, material, extraData) {
    var textureProjFunc = Shader._textureProj_func(gl);

    var shaderText = '';
    shaderText += '  float depthBias = 0.005;\n';
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
      shaderText += `    vec3 reflect = reflect(-lightDirection, normal);\n`;

      shaderText += `    float specular = pow(max(dot(reflect, viewDirection), 0.0), power);\n`;
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
    shaderText += '  rt0.xyz += ambient.xyz;\n';
    

    return shaderText;
  }

  prepare_SPVPhongShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));
    material.setUniform(shaderProgram, 'uniform_toUseSurfaceColorAsSpecularMap', this._glContext.getUniformLocation(shaderProgram, 'toUseSurfaceColorAsSpecularMap'));
    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));    
    
    return vertexAttribsAsResult;
  }
}



export default class SPVPhongShader extends SPVDecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    SPVPhongShader.mixin(SPVPhongShaderSource);

    this._power = 38.0;
    this._toUseSurfaceColorAsSpecularMap = true;
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    let Kd = material.diffuseColor;
    let Ks = material.specularColor;
    let Ka = material.ambientColor;    
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w, true);
    this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_power'), this._power, true);
    this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_toUseSurfaceColorAsSpecularMap'), this._toUseSurfaceColorAsSpecularMap, true);

    let ambient = Vector4.multiplyVector(Ka, scene.getAmountOfAmbientLightsIntensity());
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
}

GLBoost['SPVPhongShader'] = SPVPhongShader;
