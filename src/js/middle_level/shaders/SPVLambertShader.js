import Shader from '../../low_level/shaders/Shader';
import SPVDecalShader from './SPVDecalShader';
import Matrix44 from '../../low_level/math/Matrix44';

export class SPVLambertShaderSource {

  FSDefine_SPVLambertShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    //shaderText += `uniform vec4 Ka;\n`;

    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;

    shaderText += `${in_} vec4 v_shadowCoord[${lights.length}];\n`;

    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;

    return shaderText;
  }

  FSShade_SPVLambertShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';
    for (let i=0; i<lights.length; i++) {
      let isShadowEnabledAsTexture = (lights[i].camera && lights[i].camera.texture) ? true:false;
      shaderText += `  {\n`;
      // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
      shaderText += `    vec3 light = normalize(lightPosition[${i}].xyz - position.xyz * lightPosition[${i}].w);\n`;
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
      shaderText += `    float diffuse = max(dot(light, normal), 0.0);\n`;
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `  }\n`;
    }

    //shaderText +=   `rt0 += vec4(Ka.x, Ka.y, Ka.z, 1.0);\n`;

    //shaderText += '  rt0.a = 1.0;\n';
    //shaderText += '  rt0 = vec4(v_shadowCoord[0].x, v_shadowCoord[0].y, 0.0, 1.0);\n';


    return shaderText;
  }

  prepare_SPVLambertShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram.hashId, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));

    return vertexAttribsAsResult;
  }
}



export default class SPVLambertShader extends SPVDecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    SPVLambertShader.mixin(SPVLambertShaderSource);
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let Kd = material.diffuseColor;
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);

  }
}

GLBoost['SPVLambertShader'] = SPVLambertShader;
