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
      shaderText += `    float visibility = 1.0; // ${i}\n`;
      shaderText += `    float visibilitySpecular = 1.0; // ${i}\n`;
      shaderText += `    if (isShadowCasting[${i}] == 1) {// ${i}\n`;
      shaderText += `      float depth = ${textureProjFunc}(uDepthTexture[${i}], v_shadowCoord[${i}]).r;\n`;
      shaderText += `      if (depth < (v_shadowCoord[${i}].z - depthBias) / v_shadowCoord[${i}].w) {\n`;
      shaderText += `        visibility *= 0.25;\n`;
      shaderText += `        visibilitySpecular *= 0.0;\n`;
      shaderText += `      }\n`;
      shaderText += `    }\n`;

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


    return shaderText;
  }

  prepare_SPVPhongShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram.hashId, 'uniform_Kd', gl.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram.hashId, 'uniform_Ks', gl.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram.hashId, 'uniform_power', gl.getUniformLocation(shaderProgram, 'power'));

    material.setUniform(shaderProgram.hashId, 'uniform_viewPosition', gl.getUniformLocation(shaderProgram, 'viewPosition'));

    for (let i=0; i<lights.length; i++) {

      material.setUniform(shaderProgram.hashId, 'uniform_isShadowCasting' + i, gl.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']'));
      if (lights[i].camera && lights[i].camera.texture) {
        // depthTexture
        let depthTextureUniformLocation = gl.getUniformLocation(shaderProgram, `uDepthTexture[${i}]`);
        material.setUniform(shaderProgram.hashId, 'uniform_DepthTextureSampler_' + i, depthTextureUniformLocation);
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

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material);

    let Kd = material.diffuseColor;
    let Ks = material.specularColor;
    gl.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w);
    gl.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w);
    gl.uniform1f(material.getUniform(glslProgram.hashId, 'uniform_power'), this._power);

    for (let j = 0; j < lights.length; j++) {
      if (lights[j].camera && lights[j].camera.texture) {
        let cameraMatrix = lights[j].camera.lookAtRHMatrix();
        let projectionMatrix = lights[j].camera.projectionRHMatrix();
        gl.uniformMatrix4fv(material.getUniform(glslProgram.hashId, 'uniform_depthPVMatrix_'+j), false, Matrix44.multiply(projectionMatrix, cameraMatrix).flatten());
      }
    }

    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        gl.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_isShadowCasting' + i), 1);
      } else {
        gl.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_isShadowCasting' + i), 0);
      }
    }

    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        gl.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_DepthTextureSampler_' + i), i+1);  // +1 because 0 is used for diffuse texture
      }
    }
  }

  setUniformsAsTearDown(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniformsAsTearDown(gl, glslProgram, expression, material);
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        gl.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_DepthTextureSampler_' + i), 0);  // +1 because 0 is used for diffuse texture
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
