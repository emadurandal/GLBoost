import Shader from '../../low_level/shaders/Shader';
import SkeletalShader from './SkeletalShader';

export default class VertexWorldShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSDefine_VertexWorldShaderSource(in_, out_, f, lights, material, extraData) {
    let shaderText = '';

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 v_normal_world;\n`;
      
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += `${in_} vec3 aVertex_tangent;\n`;
        if (material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL)) {
          shaderText += `${out_} vec3 v_tangent_world;\n`;
          shaderText += `${out_} vec3 v_binormal_world;\n`;  
        }
      }
    }
    shaderText +=      'uniform mat4 worldMatrix;\n';
    shaderText +=      'uniform mat4 viewMatrix;\n';
    shaderText +=      'uniform mat4 projectionMatrix;\n';
    shaderText +=      'uniform mat3 normalMatrix;\n';

    shaderText += `${out_} vec3 v_position_world;\n`;

    // for Unfold UV
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText +=      'uniform float AABBLengthCenterToCorner;\n';
      shaderText +=      'uniform vec4 AABBCenterPosition;\n';
      shaderText +=      'uniform float unfoldUVRatio;\n';
    }

    return shaderText;
  }

  VSPreProcess_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    shaderText += '  vec4 position_world;\n';
    shaderText += '  vec3 normal_world;\n';
    shaderText += '  vec3 tangent_world;\n';
    return shaderText;
  }

  VSTransform_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';

    shaderText += '  if (!isSkinning) {\n';
    shaderText += '    position_world = worldMatrix * position_local;\n';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  normal_world = normalMatrix * normal_local;\n';
    }
    shaderText += '  }\n';

    shaderText += '  mat4 pvwMatrix = projectionMatrix * viewMatrix * worldMatrix;\n';

    shaderText += '  v_position_world = position_world.xyz;\n';

    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  v_normal_world = normal_world;\n';
      if (Shader._exist(f, GLBoost.TANGENT) && !material.isFlatShading && normalTexture) {
        // world space to tangent space
        shaderText += '  if (!isSkinning) {\n';
        shaderText += '    tangent_world = normalMatrix * tangent_local;\n';
        shaderText += '  }\n';

        shaderText += '  v_binormal_world = cross(normal_world, tangent_world);\n';
        shaderText += '  v_tangent_world = cross(v_binormal_world, normal_world);\n';

      }
    }

    // UV Unfold
    shaderText += '  vec4 interpolatedPosition_world = position_world;\n';
    shaderText +=   '  gl_Position = position_world;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  vec2 uvScaled = vec2((aVertex_texcoord-0.5)*AABBLengthCenterToCorner*2.0);\n';
      shaderText += '  uvScaled.y = - uvScaled.y;\n';
      shaderText += '  vec4 uvPosition = vec4(uvScaled + AABBCenterPosition.xy, AABBCenterPosition.z, 1.0);\n';
      shaderText += '  interpolatedPosition_world = uvPosition * unfoldUVRatio + position_world * (1.0-unfoldUVRatio);\n';
    }

    if (existCamera_f) {
      shaderText +=   '  mat4 pvMatrix = projectionMatrix * viewMatrix;\n';
      shaderText +=   '  gl_Position = pvMatrix * interpolatedPosition_world;\n';
    }

    return shaderText;
  }

  FSDefine_VertexWorldShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';
    
    shaderText += `uniform vec3 viewPosition_world;\n`;

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;    
    if(lightNumExceptAmbient > 0) {
      shaderText += `uniform vec4 lightDiffuse[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec3 lightSpotInfo[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec4 lightPosition_world[${lightNumExceptAmbient}];\n`;
    }

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 v_normal_world;\n`;
      if (Shader._exist(f, GLBoost.TANGENT) && material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL)) {
        shaderText += `${in_} vec3 v_tangent_world;\n`;
        shaderText += `${in_} vec3 v_binormal_world;\n`;
      }
    }

    shaderText += `${in_} vec3 v_position_world;\n`;

    return shaderText;
  }


  FSShade_VertexWorldShaderSource(f, gl, lights) {
    var shaderText = '';
    return shaderText;
  }

  prepare_VertexWorldShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'position' || attribName === 'normal' || attribName === 'tangent') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    material.setUniform(shaderProgram, 'uniform_worldMatrix', this._glContext.getUniformLocation(shaderProgram, 'worldMatrix'));
    material._semanticsDic['WORLD'] = 'worldMatrix';
    material.setUniform(shaderProgram, 'uniform_normalMatrix', this._glContext.getUniformLocation(shaderProgram, 'normalMatrix'));
    material._semanticsDic['MODELVIEWINVERSETRANSPOSE'] = 'normalMatrix';
    if (existCamera_f) {
      material.setUniform(shaderProgram, 'uniform_viewMatrix', this._glContext.getUniformLocation(shaderProgram, 'viewMatrix'));
      material._semanticsDic['VIEW'] = 'viewMatrix';
      material.setUniform(shaderProgram, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
      material._semanticsDic['PROJECTION'] = 'projectionMatrix';
    }

    material.setUniform(shaderProgram, 'uniform_viewPosition', this._glContext.getUniformLocation(shaderProgram, 'viewPosition_world'));

    let lightsExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();});    
    for(let i=0; i<lightsExceptAmbient.length; i++) {
      material.setUniform(shaderProgram, 'uniform_lightPosition_'+i, this._glContext.getUniformLocation(shaderProgram, `lightPosition_world[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightDiffuse_'+i, this._glContext.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`));
    }

    if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      material.setUniform(shaderProgram, 'uniform_AABBLengthCenterToCorner', this._glContext.getUniformLocation(shaderProgram, 'AABBLengthCenterToCorner'));
      material.setUniform(shaderProgram, 'uniform_AABBCenterPosition', this._glContext.getUniformLocation(shaderProgram, 'AABBCenterPosition'));
      material.setUniform(shaderProgram, 'uniform_unfoldUVRatio', this._glContext.getUniformLocation(shaderProgram, 'unfoldUVRatio'));
    }

    return vertexAttribsAsResult;
  }
}

GLBoost['VertexWorldShaderSource'] = VertexWorldShaderSource;
