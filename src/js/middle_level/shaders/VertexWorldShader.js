import Shader from '../../low_level/shaders/Shader';

export default class VertexWorldShaderSource {
  VSDefine_VertexWorldShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText =   `${in_} vec3 aVertex_position;\n`;

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 v_normal;\n`;
    }
    shaderText += `${out_} vec4 position;\n`;

    shaderText +=      'uniform mat4 worldMatrix;\n';
    shaderText +=      'uniform mat4 viewMatrix;\n';
    shaderText +=      'uniform mat4 projectionMatrix;\n';
    shaderText +=      'uniform mat3 normalMatrix;\n';

    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText +=      'uniform float AABBLengthCenterToCorner;\n';
      shaderText +=      'uniform vec4 AABBCenterPosition;\n';
      shaderText +=      'uniform float unfoldUVRatio;\n';
    }

    return shaderText;
  }

  VSTransform_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';

    shaderText += '  gl_Position = worldMatrix * vec4(aVertex_position, 1.0);\n';
    shaderText += '  position = gl_Position;\n';

    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  vec2 uvScaled = vec2((aVertex_texcoord-0.5)*AABBLengthCenterToCorner*2.0);\n';
      shaderText += '  uvScaled.y = - uvScaled.y;\n';
      shaderText += '  vec4 uvPosition = vec4(uvScaled + AABBCenterPosition.xy, AABBCenterPosition.z, 1.0);\n';
      shaderText += '  gl_Position = uvPosition * unfoldUVRatio + gl_Position * (1.0-unfoldUVRatio);\n';
    }

    if (existCamera_f) {
      shaderText +=   '  mat4 pvMatrix = projectionMatrix * viewMatrix;\n';
      shaderText +=   '  gl_Position = pvMatrix * gl_Position;\n';
    }

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  v_normal = normalMatrix * aVertex_normal;\n';
    }

    return shaderText;
  }

  FSDefine_VertexWorldShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';

    if(lights.length > 0) {
      shaderText += `uniform vec4 lightPosition[${lights.length}];\n`;
      shaderText += `uniform vec4 lightDiffuse[${lights.length}];\n`;
    }

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 v_normal;\n`;
    }
    shaderText += `${in_} vec4 position;\n`;

    return shaderText;
  }


  FSShade_VertexWorldShaderSource(f, gl, lights) {
    var shaderText = '';
    return shaderText;
  }

  prepare_VertexWorldShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'position' || attribName === 'normal') {
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

    for(let i=0; i<lights.length; i++) {
      material.setUniform(shaderProgram.hashId, 'uniform_lightPosition_'+i, this._glContext.getUniformLocation(shaderProgram, `lightPosition[${i}]`));
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
