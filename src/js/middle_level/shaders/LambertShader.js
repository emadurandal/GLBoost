import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector4 from '../../low_level/math/Vector4';

export class LambertShaderSource {

  FSDefine_LambertShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += 'uniform vec4 Kd;\n';
    shaderText += 'uniform vec4 ambient;\n'; // Ka * amount of ambient lights

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lightNumExceptAmbient}];\n`;
    shaderText += `uniform int isShadowCasting[${lightNumExceptAmbient}];\n`;
    shaderText += `${in_} vec4 temp[1];\n`;

    return shaderText;
  }

  FSShade_LambertShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    let lightsExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();});    
    for (let i=0; i<lightsExceptAmbient.length; i++) {
      let light = lightsExceptAmbient[i];
      let isShadowEnabledAsTexture = (light.camera && light.camera.texture) ? true:false;
      shaderText += `  {\n`;
      // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
      shaderText += `    vec3 lightObjectDirection_world = lightPosition_world[${i}].xyz;\n`;
      shaderText += `    vec3 lightDirection_world = normalize(lightPosition_world[${i}].xyz) - normalize(v_position_world.xyz) * lightPosition_world[${i}].w;\n`;
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
      shaderText += `    float diffuse = max(dot(lightDirection_world, normal), 0.0);\n`;
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `  }\n`;
    }
    shaderText += '  rt0 += ambient;\n';
    
    //shaderText += '  rt0.a = 1.0;\n';
    // shaderText += '  rt0 = surfaceColor;\n';
//    shaderText += '  rt0 = vec4(v_shadowCoord[0].xy, 0.0, 1.0);\n';



    return shaderText;
  }

  prepare_LambertShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));
    
    return vertexAttribsAsResult;
  }
}



export default class LambertShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    LambertShader.mixin(LambertShaderSource);
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let Kd = material.diffuseColor;
    let Ka = material.ambientColor;    
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    
    const accumulatedAmbientIntensity = Vector4.zero();
    for (let light of lights) {
      if (light.isTypeAmbient()) {
        accumulatedAmbientIntensity.add(light.intensity.toVector4());
      }
    }
    let ambient = Vector4.multiplyVector(Ka, accumulatedAmbientIntensity);
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);

  }

}

GLBoost['LambertShader'] = LambertShader;
