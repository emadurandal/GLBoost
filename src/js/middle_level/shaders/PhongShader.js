import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';

export class PhongShaderSource {

  FSDefine_PhongShaderSource(in_, f, lights) {
    var shaderText = '';
    shaderText += `uniform vec3 viewPosition;\n`;
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;
    var sampler2D = this._sampler2DShadow_func();
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;
    shaderText += `${in_} vec4 v_shadowCoord[${lights.length}];\n`;
    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;

    return shaderText;
  }

  FSShade_PhongShaderSource(f, gl, lights) {
    var shaderText = '';
    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';

    for (let i=0; i<lights.length; i++) {
      shaderText += `  {\n`;
      // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
      shaderText += `    vec3 light = normalize(lightPosition[${i}].xyz - position.xyz * lightPosition[${i}].w);\n`;
      shaderText +=      Shader._generateShadowingStr(gl, i);
      shaderText += `    float diffuse = max(dot(light, normal), 0.0);\n`;
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `    vec3 view = normalize(viewPosition - position.xyz);\n`;
      shaderText += `    vec3 reflect = reflect(-light, normal);\n`;
      shaderText += `    float specular = pow(max(dot(reflect, view), 0.0), power);\n`;
      shaderText += `    rt0 += vec4(visibilitySpecular, visibilitySpecular, visibilitySpecular, 1.0) * Ks * lightDiffuse[${i}] * vec4(specular, specular, specular, 0.0);\n`;
      shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
      //shaderText += '  rt0.a = 1.0;\n';
    }
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

    material.setUniform(shaderProgram.hashId, 'uniform_Kd', gl.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram.hashId, 'uniform_Ks', gl.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram.hashId, 'uniform_power', gl.getUniformLocation(shaderProgram, 'power'));

    material.setUniform(shaderProgram.hashId, 'uniform_viewPosition', gl.getUniformLocation(shaderProgram, 'viewPosition'));

    return vertexAttribsAsResult;
  }
}



export default class PhongShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    PhongShader.mixin(PhongShaderSource);

    this._power = 64.0;

  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    var Kd = material.diffuseColor;
    var Ks = material.specularColor;
    gl.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w);
    gl.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w);
    gl.uniform1f(material.getUniform(glslProgram.hashId, 'uniform_power'), this._power);
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
