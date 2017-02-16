import Shader from '../../low_level/shaders/Shader';
import SPVDecalShader from './SPVDecalShader';
import Matrix44 from '../../low_level/math/Matrix44';

export class SPVPhongShaderSource {

  FSDefine_SPVPhongShaderSource(in_, f, lights) {
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

  FSShade_SPVPhongShaderSource(f, gl, lights) {
    var textureProjFunc = Shader._textureProj_func(gl);

    var shaderText = '';
    shaderText += '  float depthBias = 0.005;\n';
    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';

    for (let i=0; i<lights.length; i++) {
      shaderText += `  {\n`;
      // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
      shaderText += `    vec3 light = normalize(lightPosition[${i}].xyz - position.xyz * lightPosition[${i}].w);\n`;

      shaderText += `    if (isShadowCasting[${i}] == 1) {// ${i}\n`;
      shaderText += `      float depth = ${textureProjFunc}(uDepthTexture[${i}], v_shadowCoord[${i}]).r;\n`;
      shaderText += `      if (depth < (v_shadowCoord[${i}].z - depthBias) / v_shadowCoord[${i}].w) {\n`;
      shaderText += `        light *= 0.5;\n`;
      shaderText += `      }\n`;
      shaderText += `    }\n`;

      shaderText += `    float diffuse = max(dot(light, normal), 0.0);\n`;
      shaderText += `    rt0 += Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `    vec3 view = normalize(viewPosition - position.xyz);\n`;
      shaderText += `    vec3 reflect = reflect(-light, normal);\n`;
      shaderText += `    float specular = pow(max(dot(reflect, view), 0.0), power);\n`;
      shaderText += `    rt0 += Ks * lightDiffuse[${i}] * vec4(specular, specular, specular, 0.0);\n`;
      shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
    //shaderText += '  rt0.a = 1.0;\n';
    }


    return shaderText;
  }

  prepare_SPVPhongShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.uniform_Kd = gl.getUniformLocation(shaderProgram, 'Kd');
    material.uniform_Ks = gl.getUniformLocation(shaderProgram, 'Ks');
    material.uniform_power = gl.getUniformLocation(shaderProgram, 'power');

    material['uniform_viewPosition'] = gl.getUniformLocation(shaderProgram, 'viewPosition');

    for (let i=0; i<lights.length; i++) {
      material['uniform_isShadowCasting' + i] = gl.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']');
      // depthTexture
      material['uniform_DepthTextureSampler_' + i] = gl.getUniformLocation(shaderProgram, `uDepthTexture[${i}]`);
      // set texture unit i+1 to the sampler
      gl.uniform1i(material['uniform_DepthTextureSampler_' + i], i + 1);  // +1 because 0 is used for diffuse texture

      if (lights[i].camera && lights[i].camera.texture) {
        lights[i].camera.texture.textureUnitIndex = i + 1;  // +1 because 0 is used for diffuse texture
      }
    }

    return vertexAttribsAsResult;
  }
}



export default class SPVPhongShader extends SPVDecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    SPVPhongShader.mixin(SPVPhongShaderSource);

    this._power = 64.0;

  }

  setUniforms(gl, glslProgram, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, material);

    var Kd = material.diffuseColor;
    var Ks = material.specularColor;
    gl.uniform4f(material.uniform_Kd, Kd.x, Kd.y, Kd.z, Kd.w);
    gl.uniform4f(material.uniform_Ks, Ks.x, Ks.y, Ks.z, Ks.w);
    gl.uniform1f(material.uniform_power, this._power);

    for (let j = 0; j < lights.length; j++) {
      if (lights[j].camera && lights[j].camera.texture) {
        let cameraMatrix = lights[j].camera.lookAtRHMatrix();
        let projectionMatrix = lights[j].camera.projectionRHMatrix();
        gl.uniformMatrix4fv(material['uniform_depthPVMatrix_'+j], false, Matrix44.multiply(projectionMatrix, cameraMatrix).flatten());
      }
    }

    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        gl.uniform1i(material['uniform_isShadowCasting' + i], 1);
      } else {
        gl.uniform1i(material['uniform_isShadowCasting' + i], 0);
      }
    }
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
