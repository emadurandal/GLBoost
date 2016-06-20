
export default class VertexLocalShaderSource {
  VSDefine_VertexLocalShaderSource(in_, out_, f) {
    var shaderText =   `${in_} vec3 aVertex_position;\n`;
    shaderText +=      'uniform mat4 modelViewProjectionMatrix;\n';
    return shaderText;
  }

  VSTransform_VertexLocalShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (existCamera_f) {
      shaderText +=   '  gl_Position = modelViewProjectionMatrix * vec4(aVertex_position, 1.0);\n';
    } else {
      shaderText +=   '  gl_Position = vec4(aVertex_position, 1.0);\n';
    }
    return shaderText;
  }

  prepare_VertexLocalShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {

    var vertexAttribsAsResult = [];

    var attribName = 'position';
    shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
    vertexAttribsAsResult.push(attribName);

    if (existCamera_f) {
      shaderProgram.modelViewProjectionMatrix = gl.getUniformLocation(shaderProgram, 'modelViewProjectionMatrix');
    }

    return vertexAttribsAsResult;
  }
}
