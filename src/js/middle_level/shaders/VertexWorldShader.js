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
    shaderText += `     uniform highp ivec2 objectIds;\n`;

    shaderText += `${out_} vec3 v_position_world;\n`;

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

    // Calculate only when No skinning. If skinning, these have already been calculated by SkeletalShader.
    shaderText += '  if (!isSkinning) {\n';
    shaderText += '    position_world = worldMatrix * position_local;\n';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  normal_world = normalMatrix * normal_local;\n';
    }
    shaderText += '  }\n';

    // calc Projection * View * World matrix
    shaderText += '  mat4 pvwMatrix = projectionMatrix * viewMatrix * worldMatrix;\n';

    // calc vertex position in world space
    shaderText += '  v_position_world = position_world.xyz;\n';

    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);

    // Send normal, tangent, binormal vectors in world space to the rasterizer
    if (Shader._exist(f, GLBoost.NORMAL)) {
      // calc Normal vector in world space
      shaderText += '  v_normal_world = normal_world;\n';
      if (Shader._exist(f, GLBoost.TANGENT) && !material.isFlatShading && normalTexture) {
        // calc BiNormal vector and Tangent vector in world space
        
        {
          // Calculate only when No skinning. If skinning, it has already been calculated by SkeletalShader.
          shaderText += '  if (!isSkinning) {\n';
          shaderText += '    tangent_world = normalMatrix * tangent_local;\n';
          shaderText += '  }\n';
        }

        shaderText += '  v_binormal_world = cross(normal_world, tangent_world);\n';
        shaderText += '  v_tangent_world = cross(v_binormal_world, normal_world);\n';

      }
    }

    // Calc vertex positions in clip coordinate space.
    // (These will be converted in Normalized Device Coordinates by divided gl_Posiiton.w in after stage.)
    shaderText += '  gl_Position =  pvwMatrix * position_local;\n';

    return shaderText;
  }

  FSDefine_VertexWorldShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += `uniform highp ivec2 objectIds;\n`;
    shaderText += `uniform vec3 viewPosition_world;\n`;

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;    
    if(lightNumExceptAmbient > 0) {
      shaderText += `uniform vec4 lightDiffuse[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec3 lightSpotInfo[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec3 lightPosition_world[${lightNumExceptAmbient}];\n`;
      shaderText += `uniform vec3 lightDirection_world[${lightNumExceptAmbient}];\n`;
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
        if (shaderProgram['vertexAttribute_' + attribName] !== -1) {
          gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
          vertexAttribsAsResult.push(attribName);
        }
      }
    });

    material.setUniform(shaderProgram, 'uniform_objectIds', this._glContext.getUniformLocation(shaderProgram, 'objectIds'));

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

    for(let i=0; i<lights.length; i++) {
      material.setUniform(shaderProgram, 'uniform_lightPosition_'+i, this._glContext.getUniformLocation(shaderProgram, `lightPosition_world[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightDirection_'+i, this._glContext.getUniformLocation(shaderProgram, `lightDirection_world[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightDiffuse_'+i, this._glContext.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`));
      material.setUniform(shaderProgram, 'uniform_lightSpotInfo_'+i, this._glContext.getUniformLocation(shaderProgram, `lightSpotInfo[${i}]`));
    }


    return vertexAttribsAsResult;
  }
}

GLBoost['VertexWorldShaderSource'] = VertexWorldShaderSource;
