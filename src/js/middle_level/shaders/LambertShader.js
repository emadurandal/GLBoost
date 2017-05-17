import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Matrix44 from '../../low_level/math/Matrix44';

export class LambertShaderSource {

  FSDefine_LambertShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;
    shaderText += `${in_} vec4 v_shadowCoord[${lights.length}];\n`;
    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;
    shaderText += `${in_} vec4 temp[1];\n`;

    return shaderText;
  }

  FSShade_LambertShaderSource(f, gl, lights) {
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
      //shaderText +=      'float visibility = 1.0;\n';
      shaderText += `    float diffuse = max(dot(light, normal), 0.0);\n`;
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `  }\n`;
    }
    //shaderText += '  rt0.a = 1.0;\n';
    // shaderText += '  rt0 = surfaceColor;\n';
    //shaderText += '  rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';


    return shaderText;
  }

  prepare_LambertShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram.hashId, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));

    for (let i=0; i<lights.length; i++) {
      material.setUniform(shaderProgram.hashId, 'uniform_isShadowCasting' + i, this._glContext.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']'));

      if (lights[i].camera && lights[i].camera.texture) {
        // depthTexture
        let depthTextureUniformLocation = this._glContext.getUniformLocation(shaderProgram, `uDepthTexture[${i}]`);
        material.setUniform(shaderProgram.hashId, 'uniform_DepthTextureSampler_' + i, depthTextureUniformLocation);
        lights[i].camera.texture.textureUnitIndex = i + 1;  // +1 because 0 is used for diffuse texture
      }
    }

    return vertexAttribsAsResult;
  }
}



export default class LambertShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    LambertShader.mixin(LambertShaderSource);
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let Kd = material.diffuseColor;
    this._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);


    for (let j = 0; j < lights.length; j++) {
      if (lights[j].camera && lights[j].camera.texture) {
        let cameraMatrix = lights[j].camera.lookAtRHMatrix();
        let projectionMatrix = lights[j].camera.projectionRHMatrix();
        gl.uniformMatrix4fv(material.getUniform(glslProgram.hashId, 'uniform_depthPVMatrix_'+j), false, Matrix44.multiply(projectionMatrix, cameraMatrix).flatten());
      }
    }

    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_isShadowCasting' + i), 1, true);
      } else {
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_isShadowCasting' + i), 0, true);
      }
    }

    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_DepthTextureSampler_' + i), i+1, true);  // +1 because 0 is used for diffuse texture
      }
    }
  }

  setUniformsAsTearDown(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniformsAsTearDown(gl, glslProgram, expression, material);
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // set depthTexture unit i+1 to the sampler
        this._glContext.uniform1i(material.getUniform(glslProgram.hashId, 'uniform_DepthTextureSampler_' + i), 0, true);  // +1 because 0 is used for diffuse texture
      }
    }
  }
}

GLBoost['LambertShader'] = LambertShader;
