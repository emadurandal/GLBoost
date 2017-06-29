import Shader from '../../low_level/shaders/Shader';

export default class VertexWorldShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSDefine_VertexWorldShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText =   `${in_} vec3 aVertex_position;\n`;

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 v_normal;\n`;
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += `${in_} vec3 aVertex_tangent;\n`;
      }
    }
    shaderText +=      'uniform mat4 worldMatrix;\n';
    shaderText +=      'uniform mat4 viewMatrix;\n';
    shaderText +=      'uniform mat4 projectionMatrix;\n';
    shaderText +=      'uniform mat3 normalMatrix;\n';

    /// These are assumed as in World coordinate
    shaderText += `uniform vec4 viewPosition_world;\n`;
    shaderText += `${out_} vec3 v_viewDirection;\n`;
    shaderText += `${out_} vec3 v_tangent;\n`;

    // for Lighting
    if(lights.length > 0) {
      shaderText += `uniform vec4 lightPosition_world[${lights.length}];\n`;
      shaderText += `${out_} vec3 v_lightDirection[${lights.length}];\n`;
    }

    // for Unfold UV
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText +=      'uniform float AABBLengthCenterToCorner;\n';
      shaderText +=      'uniform vec4 AABBCenterPosition;\n';
      shaderText +=      'uniform float unfoldUVRatio;\n';
    }

    return shaderText;
  }

  VSTransform_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';

    shaderText += '  vec4 positionInWorld = worldMatrix * vec4(aVertex_position, 1.0);\n';
    shaderText += '  vec3 viewDirection_world = viewPosition_world.xyz - positionInWorld.xyz;\n';
    shaderText += '  mat4 pvwMatrix = projectionMatrix * viewMatrix * worldMatrix;\n';

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  vec3 normal_world = normalMatrix * aVertex_normal;\n';

      if (Shader._exist(f, GLBoost.TANGENT)) {

        // world space to tangent space
        shaderText += '  vec3 tangent_world = normalMatrix * aVertex_tangent;\n';
        shaderText += '  vec3 binormal_world = cross(normal_world, tangent_world);\n';
        shaderText += '  tangent_world = cross(binormal_world, normal_world);\n';
        shaderText += '      v_tangent = tangent_world;\n';

        /*
        shaderText += `  mat3 tbnMat_world_to_tangent = mat3(
          tangent_world.x, binormal_world.x, normal_world.x,
          tangent_world.y, binormal_world.y, normal_world.y,
          tangent_world.z, binormal_world.z, normal_world.z
        );
        `;
*/

        shaderText += `  mat3 tbnMat_world_to_tangent = mat3(
          tangent_world.x, tangent_world.y, tangent_world.z,
          binormal_world.x, binormal_world.y, binormal_world.z,
          normal_world.x, normal_world.y, normal_world.z
        );
        `;

        shaderText += '  // move viewDirection_world from World space to Tangent space. \n';

        shaderText += '  vec3 viewDirection_tangent = tbnMat_world_to_tangent * viewDirection_world;\n';

        shaderText += '  v_viewDirection = mix(viewDirection_world, viewDirection_tangent, 0.0);\n';

        shaderText += '  vec3 normal_tangent = tbnMat_world_to_tangent * normal_world;\n';

        shaderText += '  v_normal = mix(normal_world, normal_tangent, 0.0);\n';

      } else {
        shaderText += '  v_viewDirection = viewDirection_world;\n';
        shaderText += '  v_normal = normal_world;\n';
      }
      shaderText += '  v_normal = normalize(v_normal);\n';
//      shaderText +=   '  v_normal = aVertex_tangent;\n';

    }
    shaderText += '  v_viewDirection = normalize(v_viewDirection);\n';


    shaderText += `  vec3 lightDirection_tangent;\n`;
    shaderText += `  vec3 lightDirection_world;\n`;
    for (let i=0; i<lights.length; i++) {
      // if PointLight: lightPosition_world[i].w === 1.0      if DirectionalLight: lightPosition_world[i].w === 0.0
      shaderText += `  lightDirection_world = normalize(lightPosition_world[${i}].xyz - positionInWorld.xyz * lightPosition_world[${i}].w);\n`;
      if (Shader._exist(f, GLBoost.NORMAL)) {
        shaderText += `  // move lightDirection_world from World space to Tangent space. \n`;

        if (Shader._exist(f, GLBoost.TANGENT)) {
          // world space to tangent space
          shaderText += `  lightDirection_tangent = tbnMat_world_to_tangent * lightDirection_world;\n`;
          shaderText += `  v_lightDirection[${i}] = mix(lightDirection_world, lightDirection_tangent, 0.0);\n`;
        } else {
          shaderText += `  v_lightDirection[${i}] = lightDirection_world;\n`;
        }
        shaderText += `  v_lightDirection[${i}] = normalize(v_lightDirection[${i}]);\n`;
      }


    }

    shaderText += '  vec4 interpolatedPositionInWorld = positionInWorld;\n';
    shaderText +=   '  gl_Position = positionInWorld;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  vec2 uvScaled = vec2((aVertex_texcoord-0.5)*AABBLengthCenterToCorner*2.0);\n';
      shaderText += '  uvScaled.y = - uvScaled.y;\n';
      shaderText += '  vec4 uvPosition = vec4(uvScaled + AABBCenterPosition.xy, AABBCenterPosition.z, 1.0);\n';
      shaderText += '  interpolatedPositionInWorld = uvPosition * unfoldUVRatio + positionInWorld * (1.0-unfoldUVRatio);\n';
    }

    if (existCamera_f) {
      shaderText +=   '  mat4 pvMatrix = projectionMatrix * viewMatrix;\n';
      shaderText +=   '  gl_Position = pvMatrix * interpolatedPositionInWorld;\n';
    }


    return shaderText;
  }

  FSDefine_VertexWorldShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';

    shaderText += `${in_} vec3 v_viewDirection;\n`;
    if(lights.length > 0) {
      shaderText += `uniform vec4 lightDiffuse[${lights.length}];\n`;
      shaderText += `${in_} vec3 v_lightDirection[${lights.length}];\n`;
    }

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 v_normal;\n`;
    }
    shaderText += `${in_} vec4 position;\n`;
    shaderText += `${in_} vec3 v_tangent;\n`;

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

    material.setUniform(shaderProgram.hashId, 'uniform_worldMatrix', this._glContext.getUniformLocation(shaderProgram, 'worldMatrix'));
    material._semanticsDic['WORLD'] = 'worldMatrix';
    material.setUniform(shaderProgram.hashId, 'uniform_normalMatrix', this._glContext.getUniformLocation(shaderProgram, 'normalMatrix'));
    material._semanticsDic['MODELVIEWINVERSETRANSPOSE'] = 'normalMatrix';
    if (existCamera_f) {
      material.setUniform(shaderProgram.hashId, 'uniform_viewMatrix', this._glContext.getUniformLocation(shaderProgram, 'viewMatrix'));
      material._semanticsDic['VIEW'] = 'viewMatrix';
      material.setUniform(shaderProgram.hashId, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
      material._semanticsDic['PROJECTION'] = 'projectionMatrix';
    }

    material.setUniform(shaderProgram.hashId, 'uniform_viewPosition', this._glContext.getUniformLocation(shaderProgram, 'viewPosition_world'));

    for(let i=0; i<lights.length; i++) {
      material.setUniform(shaderProgram.hashId, 'uniform_lightPosition_'+i, this._glContext.getUniformLocation(shaderProgram, `lightPosition_world[${i}]`));
      material.setUniform(shaderProgram.hashId, 'uniform_lightDiffuse_'+i, this._glContext.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`));
    }

    if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      material.setUniform(shaderProgram.hashId, 'uniform_AABBLengthCenterToCorner', this._glContext.getUniformLocation(shaderProgram, 'AABBLengthCenterToCorner'));
      material.setUniform(shaderProgram.hashId, 'uniform_AABBCenterPosition', this._glContext.getUniformLocation(shaderProgram, 'AABBCenterPosition'));
      material.setUniform(shaderProgram.hashId, 'uniform_unfoldUVRatio', this._glContext.getUniformLocation(shaderProgram, 'unfoldUVRatio'));
    }

    return vertexAttribsAsResult;
  }
}

GLBoost['VertexWorldShaderSource'] = VertexWorldShaderSource;
