
export default class ParticleShaderSource {

  VSDefine_ParticleShaderSource(in_, out_, f) {
    var shaderText = '';
    shaderText += `${in_} vec3 aVertex_particleCenterPos;\n`;
    shaderText += 'uniform mat4 projectionMatrix;\n';
    shaderText += 'uniform mat4 modelViewMatrix;\n';

    return shaderText;
  }

  VSTransform_ParticleShaderSource(existCamera_f, f) {
    var shaderText = '';

    shaderText += '  vec4 cameraCenterPos = modelViewMatrix * vec4(aVertex_particleCenterPos, 1.0);\n';
    shaderText += '  vec4 cameraEachPointPos = cameraCenterPos + vec4(aVertex_position - aVertex_particleCenterPos, 1.0);\n';
    shaderText += '  gl_Position = projectionMatrix * cameraEachPointPos;\n';

    return shaderText;
  }

  prepare_ParticleShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {
    var vertexAttribsAsResult = [];

    shaderProgram['vertexAttribute_' + 'particleCenterPos'] = gl.getAttribLocation(shaderProgram, 'aVertex_' + 'particleCenterPos');
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + 'particleCenterPos']);
    vertexAttribsAsResult.push('particleCenterPos');

    shaderProgram.projectionMatrix = gl.getUniformLocation(shaderProgram, 'projectionMatrix');
    shaderProgram.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'modelViewMatrix');

    return vertexAttribsAsResult;
  }

}
