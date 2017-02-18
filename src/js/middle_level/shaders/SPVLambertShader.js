import Shader from '../../low_level/shaders/Shader';
import SPVDecalShader from './SPVDecalShader';
import Matrix44 from '../../low_level/math/Matrix44';

export class SPVLambertShaderSource {

  FSDefine_SPVLambertShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ka;\n`;

    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;

    shaderText += `${in_} vec4 v_shadowCoord[${lights.length}];\n`;

    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;

    return shaderText;
  }

  FSShade_SPVLambertShaderSource(f, gl, lights) {
    var shaderText = '';

    var textureProjFunc = Shader._textureProj_func(gl);

    shaderText += '  float depthBias = 0.005;\n';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';
    for (let i=0; i<lights.length; i++) {
      shaderText += `  {\n`;
      // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
      shaderText += `    vec3 light = normalize(lightPosition[${i}].xyz - position.xyz * lightPosition[${i}].w);\n`;
      shaderText += `    float visibility = 1.0; // ${i}\n`;
      shaderText += `    if (isShadowCasting[${i}] == 1) {// ${i}\n`;
      shaderText += `      float depth = ${textureProjFunc}(uDepthTexture[${i}], v_shadowCoord[${i}]).r;\n`;
      shaderText += `      if (depth < (v_shadowCoord[${i}].z - depthBias) / v_shadowCoord[${i}].w) {\n`;
      shaderText += `        visibility *= 0.25;\n`;
      shaderText += `      }\n`;
      shaderText += `    }\n`;

      shaderText += `    float diffuse = max(dot(light, normal), 0.0);\n`;
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `  }\n`;
    }

    //shaderText +=   `rt0 += vec4(Ka.x, Ka.y, Ka.z, 1.0);\n`;

    //shaderText += '  rt0.a = 1.0;\n';
    //shaderText += '  rt0 = vec4(v_shadowCoord[0].x, v_shadowCoord[0].y, 0.0, 1.0);\n';


    return shaderText;
  }

  prepare_SPVLambertShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.uniform_Kd = gl.getUniformLocation(shaderProgram, 'Kd');
    material.uniform_Ka = gl.getUniformLocation(shaderProgram, 'Ka');

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      material['uniform_isShadowCasting' + i] = gl.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']');
      // depthTexture
      material['uniform_DepthTextureSampler_' + i] = gl.getUniformLocation(shaderProgram, `uDepthTexture[${i}]`);
      // set texture unit i+1 to the sampler
      gl.uniform1i(material['uniform_DepthTextureSampler_' + i], i+1);  // +1 because 0 is used for diffuse texture

      if (lights[i].camera && lights[i].camera.texture) {
        lights[i].camera.texture.textureUnitIndex = i + 1;  // +1 because 0 is used for diffuse texture
      }
    }

    return vertexAttribsAsResult;
  }
}



export default class SPVLambertShader extends SPVDecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    SPVLambertShader.mixin(SPVLambertShaderSource);
  }

  setUniforms(gl, glslProgram, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, material);

    var Kd = material.diffuseColor;
    gl.uniform4f(material.uniform_Kd, Kd.x, Kd.y, Kd.z, Kd.w);

    var Ka = material.ambientColor;
    gl.uniform4f(material.uniform_Ka, Ka.x, Ka.y, Ka.z, Ka.w);

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
}

GLBoost['SPVLambertShader'] = SPVLambertShader;
