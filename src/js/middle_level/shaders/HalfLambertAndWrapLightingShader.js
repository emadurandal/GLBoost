import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export class HalfLambertAndWrapLightingShaderSource {

  FSDefine_HalfLambertAndWrapLightingShaderSource(in_, f, lights) {
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec3 wrap;\n`;
    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights    
    
    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;        
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lightNumExceptAmbient}];\n`;
    shaderText += `${in_} vec4 v_shadowCoord[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform int isShadowCasting[${lightNumExceptAmbient}];\n`;
    shaderText += `${in_} vec4 temp[1];\n`;
    return shaderText;
  }

  FSShade_HalfLambertAndWrapLightingShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    let lightsExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();});        
    for (let i=0; i<lightsExceptAmbient.length; i++) {
      let light = lightsExceptAmbient[i];      
      let isShadowEnabledAsTexture = (light.camera && light.camera.texture) ? true:false;
      shaderText += '  {\n';
      shaderText +=      Shader._generateLightStr(i);
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
      shaderText += '    float diffuse = max(dot(lightDirection, normal), 0.0)*0.5+0.5;\n';
      shaderText += '    diffuse *= diffuse;\n';
      shaderText += '    vec3 diffuseVec = vec3(diffuse, diffuse, diffuse);\n';
      shaderText += '    diffuseVec = (diffuseVec+wrap) / (1.0 + wrap);\n';  
      shaderText += `    rt0 += spotEffect * vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuseVec, 1.0) * surfaceColor;\n`;
      shaderText += '  }\n';
    }
    shaderText += '  rt0.xyz += ambient.xyz;\n';
    
    return shaderText;
  }

  prepare_HalfLambertAndWrapLightingShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_wrap', this._glContext.getUniformLocation(shaderProgram, 'wrap'));
    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));
    
    return vertexAttribsAsResult;
  }
}



export default class HalfLambertAndWrapLightingShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    HalfLambertAndWrapLightingShader.mixin(HalfLambertAndWrapLightingShaderSource);

    this._wrap = new Vector3(0.6, 0.3, 0.0);
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    var Kd = material.diffuseColor;
    let Ka = material.ambientColor;
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_wrap'), this._wrap.x, this._wrap.y, this._wrap.z, true);

    let ambient = Vector4.multiplyVector(Ka, scene.getAmountOfAmbientLightsIntensity());
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);
  }

  set wrap(value) {
    this._wrap = value;
  }

  get wrap() {
    return this._wrap;
  }
}

GLBoost['HalfLambertAndWrapLightingShader'] = HalfLambertAndWrapLightingShader;
