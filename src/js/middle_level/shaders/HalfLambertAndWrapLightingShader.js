import DecalShader from './DecalShader';
import Vector3 from '../../low_level/math/Vector3';

export class HalfLambertAndWrapLightingShaderSource {

  FSDefine_HalfLambertAndWrapLightingShaderSource(in_, f, lights) {
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec3 wrap;\n`;

    return shaderText;
  }

  FSShade_HalfLambertAndWrapLightingShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';

    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
    shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
    shaderText += '    float halfLambert = max(dot(light, normal), 0.0)*0.5+0.5;\n';
    shaderText += '    float diffuse = halfLambert*halfLambert;\n';
    shaderText += '    vec3 diffuseVec = vec3(diffuse, diffuse, diffuse);\n';
    shaderText += '    diffuseVec = (diffuseVec+wrap) / (1.0 + wrap);\n';
    shaderText += '    rt0 += Kd * lightDiffuse[i] * vec4(diffuseVec, 1.0) * surfaceColor;\n';
    shaderText += '  }\n';

    return shaderText;
  }

  prepare_HalfLambertAndWrapLightingShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram.hashId, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram.hashId, 'uniform_wrap', this._glContext.getUniformLocation(shaderProgram, 'wrap'));

    return vertexAttribsAsResult;
  }
}



export default class HalfLambertAndWrapLightingShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    HalfLambertAndWrapLightingShader.mixin(HalfLambertAndWrapLightingShaderSource);

    this._wrap = new Vector3(0.6, 0.3, 0.0);
  }

  setUniforms(gl, glslProgram, expression, material) {
    super.setUniforms(gl, glslProgram, expression, material);

    var Kd = material.diffuseColor;
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform3f(material.getUniform(glslProgram.hashId, 'uniform_wrap'), this._wrap.x, this._wrap.y, this._wrap.z, true);
  }

  set wrap(value) {
    this._wrap = value;
  }

  get wrap() {
    return this._wrap;
  }
}

GLBoost['HalfLambertAndWrapLightingShader'] = HalfLambertAndWrapLightingShader;
