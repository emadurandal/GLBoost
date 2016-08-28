import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';
import Matrix44 from '../../low_level/math/Matrix44';

export class LambertShaderSource {
  /*
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
  }*/

  FSDefine_LambertShaderSource(in_, f, lights) {
    
    var sampler2D = this._sampler2DShadow_func();
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;

    let textureUnitIndex = 0;
    //for (let i=0; i<lights.length; i++) {
    //  if (lights[i].camera && lights[i].camera.texture) {
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;

    shaderText += `${in_} vec4 v_shadowCoord[${lights.length}];\n`;

    textureUnitIndex++;
      //}
    //}
    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;
    shaderText += `${in_} vec4 temp[1];\n`;

    return shaderText;
  }

  FSShade_LambertShaderSource(f, gl, lights) {
    var shaderText = '';

    var textureProjFunc = Shader._textureProj_func(gl);

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        textureUnitIndex++;
      }
    }

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

      //shaderText += `        float visibility = texture2DProj(uDepthTexture[${i}], v_shadowCoord[${i}], depthBias).x;\n`;
      //shaderText += `        light *= visibility > 0.5 ? 1.0 : 0.0;\n`;

      shaderText += `    }\n`;

      shaderText += `    float diffuse = max(dot(light, normal), 0.0);\n`;
      shaderText += `    rt0 += Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `  }\n`;
    }
    //shaderText += '  rt0.a = 1.0;\n';
    //shaderText += '  rt0 = vec4(v_shadowCoord[0].x, v_shadowCoord[0].y, 0.0, 1.0);\n';


    return shaderText;
  }

  prepare_LambertShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {

    var vertexAttribsAsResult = [];

    shaderProgram.Kd = gl.getUniformLocation(shaderProgram, 'Kd');

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      shaderProgram['isShadowCasting' + i] = gl.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']');
      // depthTexture
      shaderProgram['uniformDepthTextureSampler_' + i] = gl.getUniformLocation(shaderProgram, `uDepthTexture[${i}]`);
      // set texture unit i+1 to the sampler
      gl.uniform1i(shaderProgram['uniformDepthTextureSampler_' + i], i+1);  // +1 because 0 is used for diffuse texture

      if (lights[i].camera && lights[i].camera.texture) {
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

  setUniforms(gl, glslProgram, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, material);

    var Kd = material.diffuseColor;
    gl.uniform4f(glslProgram.Kd, Kd.x, Kd.y, Kd.z, Kd.w);


    for (let j = 0; j < lights.length; j++) {
      if (lights[j].camera && lights[j].camera.texture) {
        let cameraMatrix = lights[j].camera.lookAtRHMatrix();
        let projectionMatrix = lights[j].camera.projectionRHMatrix();
        gl.uniformMatrix4fv(glslProgram['depthPVMatrix_'+j], false, Matrix44.multiply(projectionMatrix, cameraMatrix).flatten());
      }
    }

    for (let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        gl.uniform1i(glslProgram['isShadowCasting' + i], 1);
      } else {
        gl.uniform1i(glslProgram['isShadowCasting' + i], 0);
      }
    }
  }
}

GLBoost['LambertShader'] = LambertShader;
