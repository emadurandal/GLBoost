import Shader from '../../low_level/shaders/Shader';
import SPVDecalShader from './SPVDecalShader';
import Matrix44 from '../../low_level/math/Matrix44';

export class SPVPhongShaderSource {

  FSDefine_SPVPhongShaderSource(in_, f, lights) {
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;

    var sampler2D = this._sampler2DShadow_func();
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;
    shaderText += `${in_} vec4 v_shadowCoord[${lights.length}];\n`;
    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;
    shaderText += `uniform bool toUseSurfaceColorAsSpecularMap;\n`;

    return shaderText;
  }

  FSShade_SPVPhongShaderSource(f, gl, lights, material, extraData) {
    var textureProjFunc = Shader._textureProj_func(gl);

    var shaderText = '';
    shaderText += '  float depthBias = 0.005;\n';
    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += Shader._getNormalStr(gl, material, f);

    for (let i=0; i<lights.length; i++) {
      let isShadowEnabledAsTexture = (lights[i].camera && lights[i].camera.texture) ? true:false;
      shaderText += `  {\n`;
      shaderText += `    vec3 lightDirection = normalize(v_lightDirection[${i}]);\n`;
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
      shaderText += `    float diffuse = max(dot(lightDirection, normal), 0.0);\n`;
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `    vec3 viewDirection = normalize(v_viewDirection);\n`;
      shaderText += `    vec3 reflect = reflect(-lightDirection, normal);\n`;

      shaderText += `    float specular = pow(max(dot(reflect, viewDirection), 0.0), power);\n`;
      shaderText += `    if (toUseSurfaceColorAsSpecularMap) {\n`;
      shaderText += `      specular *= grayscale(surfaceColor) + 0.5;\n`;
      shaderText += `    };\n`;


      shaderText += `    vec4 enlighten = Ks * lightDiffuse[${i}];\n`;
      shaderText += `    enlighten *= vec4(specular, specular, specular, 0.0);\n`;
      shaderText += `    enlighten *= vec4(visibilitySpecular, visibilitySpecular, visibilitySpecular, 1.0);\n`;
      shaderText += `    rt0 += enlighten;\n`;
      shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
    //shaderText += '  rt0.a = 1.0;\n';
    }


    return shaderText;
  }

  prepare_SPVPhongShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram.hashId, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram.hashId, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram.hashId, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));
    material.setUniform(shaderProgram.hashId, 'uniform_toUseSurfaceColorAsSpecularMap', this._glContext.getUniformLocation(shaderProgram, 'toUseSurfaceColorAsSpecularMap'));

    return vertexAttribsAsResult;
  }
}



export default class SPVPhongShader extends SPVDecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    SPVPhongShader.mixin(SPVPhongShaderSource);

    this._power = 64.0;
    this._toUseSurfaceColorAsSpecularMap = true;
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let Kd = material.diffuseColor;
    let Ks = material.specularColor;
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w, true);
    this._glContext.uniform1f(material.getUniform(glslProgram.hashId, 'uniform_power'), this._power, true);
    this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_toUseSurfaceColorAsSpecularMap'), this._toUseSurfaceColorAsSpecularMap, true);
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
