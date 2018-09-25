import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';
import Matrix44 from '../../low_level/math/Matrix44';
import Vector4 from '../../low_level/math/Vector4';
//import FragmentSimpleShader from './FragmentSimpleShader';

export class EnvironmentMapShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.
  VSDefine_EnvironmentMapShaderSource(in_, out_, f) {
    let shaderText =      `${out_} vec3 vPosition_world;\n`;
    shaderText +=      'uniform mat4 worldMatrix;\n';
    shaderText +=      'uniform mat4 viewMatrix;\n';
    shaderText +=      'uniform mat4 projectionMatrix;\n';
    return shaderText;
  }

  VSTransform_EnvironmentMapShaderSource(existCamera_f, f) {
    var shaderText = '';

    if (existCamera_f) {
      shaderText +=   '  gl_Position = projectionMatrix * viewMatrix * worldMatrix * position_local;\n';
    } else {
      shaderText +=   '  gl_Position = worldMatrix * position_local;\n';
    }
    shaderText +=   '  vPosition_world = normalize(worldMatrix * position_local).xyz;\n';

    return shaderText;
  }

  FSDefine_EnvironmentMapShaderSource(in_, f) {
    let shaderText =      `${in_} vec3 vPosition_world;\n`;
    shaderText +=      `uniform samplerCube uEnvTexture;\n`;

    return shaderText;
  }

  FSShade_EnvironmentMapShaderSource(f, gl) {
    let shaderText =   "";

    shaderText += `rt0 = textureCube(uEnvTexture, normalize(vPosition_world));\n`;
//    shaderText += `rt0 = vec4((normalize(vPosition_world)+1.0)*0.5, 1.0);\n`;

    return shaderText;
  }

  prepare_EnvironmentMapShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'position' || attribName === 'normal' || attribName === 'tangent') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        if (shaderProgram['vertexAttribute_' + attribName] !== -1) {
          gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
          vertexAttribsAsResult.push(attribName);
        }
      }
    });
    material.setUniform(shaderProgram, 'uniform_worldMatrix', this._glContext.getUniformLocation(shaderProgram, 'worldMatrix'));
    material._semanticsDic['WORLD'] = 'worldMatrix';
    if (existCamera_f) {
      material.setUniform(shaderProgram, 'uniform_viewMatrix', this._glContext.getUniformLocation(shaderProgram, 'viewMatrix'));
      material._semanticsDic['VIEW'] = 'viewMatrix';
      material.setUniform(shaderProgram, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
      material._semanticsDic['PROJECTION'] = 'projectionMatrix';
    }

    material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_ENV_CUBE, shaderProgram, 'uEnvTexture'); 


    return vertexAttribsAsResult;
  }
  
}

export default class EnvironmentMapShader extends Shader {
  constructor(glBoostContext) {
    super(glBoostContext);

    EnvironmentMapShader.mixin(EnvironmentMapShaderSource);

  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);
    material.updateTextureInfo(GLBoost.TEXTURE_PURPOSE_ENV_CUBE, 'uEnvTexture');
  }

  setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);
  }
}

GLBoost['EnvironmentMapShader'] = EnvironmentMapShader;
