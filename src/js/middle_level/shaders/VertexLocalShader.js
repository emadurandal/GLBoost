import Shader from '../../low_level/shaders/Shader';

export default class VertexLocalShaderSource {
  VSDefine_VertexLocalShaderSource(in_, out_, f) {
    var shaderText =   `${in_} vec3 aVertex_position;\n`;
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 v_normal;\n`;
    }
    shaderText += `${out_} vec4 position;\n`;
    shaderText +=      'uniform mat4 modelViewProjectionMatrix;\n';
    return shaderText;
  }

  VSTransform_VertexLocalShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (existCamera_f) {
      shaderText +=   '  gl_Position = modelViewProjectionMatrix * vec4(aVertex_position, 1.0);\n';
      shaderText +=   '  mat4 pvwMatrix = modelViewProjectionMatrix;\n';
    } else {
      shaderText +=   '  gl_Position = vec4(aVertex_position, 1.0);\n';
    }
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  v_normal = aVertex_normal;\n';
    }
    shaderText += '  position = vec4(aVertex_position, 1.0);\n';

    return shaderText;
  }

  FSDefine_VertexLocalShaderSource(in_, f, lights, material, extraData) {
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

  prepare_VertexLocalShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.POSITION || attribName === GLBoost.NORMAL) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    if (existCamera_f) {
      shaderProgram.modelViewProjectionMatrix = gl.getUniformLocation(shaderProgram, 'modelViewProjectionMatrix');
    }

    for(let i=0; i<lights.length; i++) {
      shaderProgram['lightPosition_'+i] = gl.getUniformLocation(shaderProgram, `lightPosition[${i}]`);
      shaderProgram['lightDiffuse_'+i] = gl.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`);
    }

    return vertexAttribsAsResult;
  }
}

GLBoost['VertexLocalShaderSource'] = VertexLocalShaderSource;
