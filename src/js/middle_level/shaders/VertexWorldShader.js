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
    return shaderText;
  }

  VSTransform_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    if (existCamera_f) {
      shaderText +=   '  mat4 pvwMatrix = projectionMatrix * viewMatrix * worldMatrix;\n';
      shaderText +=   '  gl_Position = pvwMatrix * vec4(aVertex_position, 1.0);\n';
    } else {
      shaderText +=   '  gl_Position = worldMatrix * vec4(aVertex_position, 1.0);\n';
    }
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  v_normal = normalMatrix * aVertex_normal;\n';
    }
    shaderText += '  position = worldMatrix * vec4(aVertex_position, 1.0);\n';

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
      if (attribName === GLBoost.POSITION || attribName === GLBoost.NORMAL) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    material.setUniform(expression.toString(), 'uniform_worldMatrix', gl.getUniformLocation(shaderProgram, 'worldMatrix'));
    material._semanticsDic['WORLD'] = 'worldMatrix';
    material.setUniform(expression.toString(), 'uniform_normalMatrix', gl.getUniformLocation(shaderProgram, 'normalMatrix'));
    material._semanticsDic['MODELVIEWINVERSETRANSPOSE'] = 'normalMatrix';
    if (existCamera_f) {
      material.setUniform(expression.toString(), 'uniform_viewMatrix', gl.getUniformLocation(shaderProgram, 'viewMatrix'));
      material._semanticsDic['VIEW'] = 'viewMatrix';
      material.setUniform(expression.toString(), 'uniform_projectionMatrix', gl.getUniformLocation(shaderProgram, 'projectionMatrix'));
      material._semanticsDic['PROJECTION'] = 'projectionMatrix';
    }

    for(let i=0; i<lights.length; i++) {
      material.setUniform(expression.toString(), 'uniform_lightPosition_'+i, gl.getUniformLocation(shaderProgram, `lightPosition[${i}]`));
      material.setUniform(expression.toString(), 'uniform_lightDiffuse_'+i, gl.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`));
    }

    return vertexAttribsAsResult;
  }
}

GLBoost['VertexWorldShaderSource'] = VertexWorldShaderSource;
