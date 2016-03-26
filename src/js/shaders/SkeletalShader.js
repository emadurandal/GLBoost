
export default class SkeletalShaderSource {

  VSDefine_SkeletalShaderSource(in_, out_, f, lights, extraData) {
    var shaderText = '';
    shaderText += `${in_} vec4 aVertex_joint;\n`;
    shaderText += `${in_} vec4 aVertex_weight;\n`;
    shaderText+='uniform mat4 skinTransformMatrices[' + extraData.jointN  + '];\n';
    return shaderText;
  }

  VSTransform_SkeletalShaderSource(existCamera_f, f, lights, extraData) {
    var shaderText = '';
    shaderText += 'gl_Position = aVertex_joint + aVertex_weight;\n';
    if (existCamera_f) {
      shaderText += '  gl_Position = modelViewProjectionMatrix * vec4(aVertex_position, 1.0);\n';
    } else {
      shaderText += '  gl_Position = vec4(blendedPosition, 1.0);\n';
    }
    return shaderText;
  }

  prepare_SkeletalShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, extraData, canvas) {
    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.JOINT || attribName === GLBoost.WEIGHT) {
        vertexAttribsAsResult.push(attribName);
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
      }
    });

    shaderProgram['skinTransformMatrices'] = gl.getUniformLocation(shaderProgram, 'skinTransformMatrices');
    // とりあえず単位行列で初期化
    let identityMatrices = [];
    for (let i=0; i<extraData.jointN; i++) {
      identityMatrices.concat(
        [1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1]
      );
    }
    gl.uniformMatrix4fv(shaderProgram['skinTransformMatrices'], false, new Float32Array(identityMatrices));

    return vertexAttribsAsResult;
  }
}
