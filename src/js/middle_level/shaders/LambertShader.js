import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';

export class LambertShaderSource {

  VSDefine_LambertShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText = '';

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        shaderText += `${out_} vec4 projectedPosByLight[${textureUnitIndex+1}];\n`;
        shaderText +=      `uniform mat4 viewMatrixFromLight[${textureUnitIndex+1}];\n`;
        shaderText +=      `uniform mat4 projectionMatrixFromLight[${textureUnitIndex+1}];\n`;
        textureUnitIndex++;
      }
    }
    return shaderText;
  }

  VSTransform_LambertShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        shaderText += `mat4 pvwLightMatrix = projectionMatrixFromLight[${textureUnitIndex}] * viewMatrixFromLight[${textureUnitIndex}] * worldMatrix;\n`;
        shaderText += `projectedPosByLight[${textureUnitIndex}] = pvwLightMatrix * vec4(aVertex_position, 1.0);\n`;
        textureUnitIndex++;
      }
    }
    return shaderText;
  }

  FSDefine_LambertShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        shaderText += `uniform ${sampler2D} uDepthTexture[${textureUnitIndex+1}];\n`;
        shaderText += `${in_} vec4 projectedPosByLight[${textureUnitIndex+1}];\n`;

        textureUnitIndex++;
      }
    }
    if (textureUnitIndex > 0) {
      shaderText += `uniform int isShadowCasting[${lights.length}];\n`;
    }
    shaderText += `${in_} vec4 temp[1];\n`;

    return shaderText;
  }

  FSShade_LambertShaderSource(f, gl, lights) {
    var shaderText = '';

    var textureFunc = Shader._texture_func(gl);

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        textureUnitIndex++;
      }
    }

    if (textureUnitIndex > 0) {

      shaderText += ` float shadowRatio[${lights.length}];\n`;
      /*
      textureUnitIndex = 0;
      for (let i=0; i<lights.length; i++) {
        if (lights[i].camera && lights[i].camera.texture) {
          shaderText += ` float depth = ${textureFunc}(uDepthTexture[${textureUnitIndex}], projectedPosByLight[${textureUnitIndex}].xy).z;\n`;
          shaderText += ` if (depth < projectedPosByLight[${textureUnitIndex}].z) {\n`;
          shaderText += `   shadowRatio[${textureUnitIndex}] = 0.0;\n`;
          shaderText += ` } else {\n`;
          shaderText += `   shadowRatio[${textureUnitIndex} ] = 1.0;\n`;
          shaderText += ` }\n`;
          textureUnitIndex++;
        }
      }
      */
    }
    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';
    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
    shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
    shaderText += '    float diffuse = max(dot(light, normal), 0.0);\n';
    shaderText += '    rt0 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
    shaderText += '  }\n';
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
    //shaderText += '  rt0.a = 1.0;\n';
    //shaderText += '  rt0 = vec4(position.xyz, 1.0);\n';


    return shaderText;
  }

  prepare_LambertShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {

    var vertexAttribsAsResult = [];

    shaderProgram.Kd = gl.getUniformLocation(shaderProgram, 'Kd');

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        // depthTexture
        shaderProgram['uniformDepthTextureSampler_' + textureUnitIndex] = gl.getUniformLocation(shaderProgram, 'uDepthTexture[' + textureUnitIndex + ']');
        // set texture unit i+1 to the sampler
        gl.uniform1i(shaderProgram['uniformDepthTextureSampler_' + textureUnitIndex], textureUnitIndex+1);  // +1 because 0 is used for diffuse texture
        lights[i].camera.texture.textureUnitIndex = textureUnitIndex+1;  // +1 because 0 is used for diffuse texture


        // matrices
        shaderProgram['viewMatrixFromLight_' + textureUnitIndex] = gl.getUniformLocation(shaderProgram, 'viewMatrixFromLight[' + textureUnitIndex + ']');
        shaderProgram['projectionMatrixFromLight_' + textureUnitIndex] = gl.getUniformLocation(shaderProgram, 'projectionMatrixFromLight[' + textureUnitIndex + ']');

        textureUnitIndex++;
      }
      shaderProgram['isShadowCasting' + i] = gl.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']');
    }

    return vertexAttribsAsResult;
  }
}



export default class LambertShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    LambertShader.mixin(LambertShaderSource);
  }

  setUniforms(gl, glslProgram, material, lights) {
    super.setUniforms(gl, glslProgram, material);

    var Kd = material.diffuseColor;
    gl.uniform4f(glslProgram.Kd, Kd.x, Kd.y, Kd.z, Kd.w);

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        let cameraMatrix = camera.lookAtRHMatrix();
        let projectionMatrix = camera.projectionRHMatrix();
        gl.uniformMatrix4fv(glslProgram['viewMatrixFromLight_' + textureUnitIndex], false, cameraMatrix.flatten());
        gl.uniformMatrix4fv(glslProgram['projectionMatrixFromLight_' + textureUnitIndex], false, projectionMatrix.flatten());
        gl.uniformMatrix1i(glslProgram['isShadowCasting' + i], 1);
      } else {
        gl.uniformMatrix1i(glslProgram['isShadowCasting' + i], 0);
      }
    }
  }
}

GLBoost['LambertShader'] = LambertShader;
