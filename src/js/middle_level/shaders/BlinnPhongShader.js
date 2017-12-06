import DecalShader from './DecalShader';

export class BlinnPhongShaderSource {

  FSDefine_BlinnPhongShaderSource(in_, f, lights) {
    var shaderText = '';
    shaderText += `uniform vec3 viewPosition;\n`;
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;

    return shaderText;
  }

  FSShade_BlinnPhongShaderSource(f, gl, lights) {
    var shaderText = '';
    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';

    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
    shaderText += `    vec3 lightObjectDirection_world = lightPosition_world[${i}].xyz;\n`;
    shaderText += `    vec3 lightDirection_world = normalize(lightPosition_world[${i}].xyz) - normalize(v_position_world.xyz) * lightPosition_world[${i}].w;\n`;
    shaderText += `    float diffuse = max(dot(lightDirection_world, normal), 0.0);\n`;
    shaderText += `    rt0 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
    shaderText += `    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n`;
    shaderText += `    vec3 halfVec = normalize(lightDirection_world + viewDirection);\n`;
    shaderText += `    float specular = pow(max(dot(halfVec, normal), 0.0), power);\n`;
    shaderText += `    rt0 += Ks * lightDiffuse[i] * vec4(specular, specular, specular, 0.0);\n`;

    shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
    //shaderText += '  rt0.a = 1.0;\n';



    return shaderText;
  }

  prepare_BlinnPhongShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));

    return vertexAttribsAsResult;
  }
}



export default class BlinnPhongShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    BlinnPhongShader.mixin(BlinnPhongShaderSource);

    this._power = 64.0;

  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    var Kd = material.diffuseColor;
    var Ks = material.specularColor;
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w, true);
    this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_power'), this._power, true);
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

GLBoost['BlinnPhongShader'] = BlinnPhongShader;
