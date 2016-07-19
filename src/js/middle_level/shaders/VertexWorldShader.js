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

  prepare_VertexWorldShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.POSITION || attribName === GLBoost.NORMAL) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    shaderProgram.worldMatrix = gl.getUniformLocation(shaderProgram, 'worldMatrix');
    shaderProgram.normalMatrix = gl.getUniformLocation(shaderProgram, 'normalMatrix');
    if (existCamera_f) {
      shaderProgram.viewMatrix = gl.getUniformLocation(shaderProgram, 'viewMatrix');
      shaderProgram.projectionMatrix = gl.getUniformLocation(shaderProgram, 'projectionMatrix');
    }

    for(let i=0; i<lights.length; i++) {
      shaderProgram['lightPosition_'+i] = gl.getUniformLocation(shaderProgram, `lightPosition[${i}]`);
      shaderProgram['lightDiffuse_'+i] = gl.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`);
    }

    return vertexAttribsAsResult;
  }
}

GLBoost['VertexWorldShaderSource'] = VertexWorldShaderSource;
