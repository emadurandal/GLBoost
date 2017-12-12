import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector4 from '../../low_level/math/Vector4';

export class PhongShaderSource {

  FSDefine_PhongShaderSource(in_, f, lights) {
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;
    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights    
    var sampler2D = this._sampler2DShadow_func();

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;    
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lightNumExceptAmbient}];\n`;
    shaderText += `${in_} vec4 v_shadowCoord[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform int isShadowCasting[${lightNumExceptAmbient}];\n`;

    return shaderText;
  }

  FSShade_PhongShaderSource(f, gl, lights) {
    var shaderText = '';

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
      shaderText += `    vec3 reflect = reflect(-lightDirection, normal);\n`;
      shaderText += `    float specular = pow(max(dot(reflect, viewDirection), 0.0), power);\n`;
      shaderText += `    rt0 += spotEffect * vec4(visibilitySpecular, visibilitySpecular, visibilitySpecular, 1.0) * Ks * lightDiffuse[${i}] * vec4(specular, specular, specular, 0.0);\n`;
      shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
      //shaderText += '  rt0.a = 1.0;\n';
    }
    shaderText += '  rt0.xyz += ambient.xyz;\n';
    /*
    shaderText += 'if ( isWireframe ) {\n';
    shaderText += '  if ( barycentricCoord[0] > wireframeThicknessThreshold && barycentricCoord[1] > wireframeThicknessThreshold && barycentricCoord[2] > wireframeThicknessThreshold ) {\n';
    shaderText += '  } else {\n';
    shaderText += '    rt0.xyz = grayColor;\n';
    shaderText += '  }\n';
    shaderText += '}\n';

//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
    //shaderText += '  rt0.a = 1.0;\n';

*/

    return shaderText;
  }

  prepare_PhongShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));

    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));    

    return vertexAttribsAsResult;
  }
}



export default class PhongShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    PhongShader.mixin(PhongShaderSource);

    this._power = 64.0;

  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    var Kd = material.diffuseColor;
    var Ks = material.specularColor;
    let Ka = material.ambientColor;
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w, true);
    this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_power'), this._power, true);

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

GLBoost['PhongShader'] = PhongShader;
