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
    shaderText += '  vec3 normal = normalize(v_normal);\n';

    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0

    shaderText += `    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n`;
    shaderText += `    float diffuse = max(dot(light, normal), 0.0);\n`;
    shaderText += `    rt0 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
    shaderText += `    vec3 view = normalize(viewPosition - position.xyz);\n`;
    shaderText += `    vec3 halfVec = normalize(light + view);\n`;
    shaderText += `    float specular = pow(max(dot(halfVec, normal), 0.0), power);\n`;
    shaderText += `    rt0 += Ks * lightDiffuse[i] * vec4(specular, specular, specular, 0.0);\n`;

    shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
    //shaderText += '  rt0.a = 1.0;\n';



    return shaderText;
  }

  prepare_BlinnPhongShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {

    var vertexAttribsAsResult = [];

    material.uniform_Kd = gl.getUniformLocation(shaderProgram, 'Kd');
    material.uniform_Ks = gl.getUniformLocation(shaderProgram, 'Ks');
    material.uniform_power = gl.getUniformLocation(shaderProgram, 'power');

    material['uniform_viewPosition'] = gl.getUniformLocation(shaderProgram, 'viewPosition');

    return vertexAttribsAsResult;
  }
}



export default class BlinnPhongShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    BlinnPhongShader.mixin(BlinnPhongShaderSource);

    this._power = 64.0;

  }

  setUniforms(gl, glslProgram, material) {
    super.setUniforms(gl, glslProgram, material);

    var Kd = material.diffuseColor;
    var Ks = material.specularColor;
    gl.uniform4f(material.uniform_Kd, Kd.x, Kd.y, Kd.z, Kd.w);
    gl.uniform4f(material.uniform_Ks, Ks.x, Ks.y, Ks.z, Ks.w);
    gl.uniform1f(material.uniform_power, this._power);
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
