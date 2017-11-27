import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Vector3 from '../../low_level/math/Vector3';

export class HalfLambertAndWrapLightingShaderSource {

  FSDefine_HalfLambertAndWrapLightingShaderSource(in_, f, lights) {
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec3 wrap;\n`;
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;
    shaderText += `${in_} vec4 v_shadowCoord[${lights.length}];\n`;
    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;
    shaderText += `${in_} vec4 temp[1];\n`;
    return shaderText;
  }

  FSShade_HalfLambertAndWrapLightingShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';
    for (let i=0; i<lights.length; i++) {
      let isShadowEnabledAsTexture = (lights[i].camera && lights[i].camera.texture) ? true:false;
      shaderText += '  {\n';
      // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
      shaderText += `    vec3 lightDirection = normalize(v_lightDirection[${i}]);\n`;
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
      shaderText += '    float diffuse = max(dot(lightDirection, normal), 0.0)*0.5+0.5;\n';
      shaderText += '    diffuse *= diffuse;\n';
      shaderText += '    vec3 diffuseVec = vec3(diffuse, diffuse, diffuse);\n';
      shaderText += '    diffuseVec = (diffuseVec+wrap) / (1.0 + wrap);\n';  
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuseVec, 1.0) * surfaceColor;\n`;
      shaderText += '  }\n';
    }

    return shaderText;
  }

  prepare_HalfLambertAndWrapLightingShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_wrap', this._glContext.getUniformLocation(shaderProgram, 'wrap'));

    return vertexAttribsAsResult;
  }
}



export default class HalfLambertAndWrapLightingShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    HalfLambertAndWrapLightingShader.mixin(HalfLambertAndWrapLightingShaderSource);

    this._wrap = new Vector3(0.6, 0.3, 0.0);
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    var Kd = material.diffuseColor;
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_wrap'), this._wrap.x, this._wrap.y, this._wrap.z, true);
  }

  set wrap(value) {
    this._wrap = value;
  }

  get wrap() {
    return this._wrap;
  }
}

GLBoost['HalfLambertAndWrapLightingShader'] = HalfLambertAndWrapLightingShader;
