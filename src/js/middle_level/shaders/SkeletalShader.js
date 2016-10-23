
export default class SkeletalShaderSource {

  VSDefine_SkeletalShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText = '';
    shaderText += `${in_} vec4 aVertex_joint;\n`;
    shaderText += `${in_} vec4 aVertex_weight;\n`;
    shaderText+='uniform mat4 skinTransformMatrices[' + extraData.jointN  + '];\n';
//    shaderText += `${out_} vec4 aVertex_color;\n`;
    return shaderText;
  }

  /**
   * @return {string}
   */
  VSTransform_SkeletalShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';

    shaderText += 'mat4 skinMat = aVertex_weight.x * skinTransformMatrices[int(aVertex_joint.x)];\n';
    shaderText += 'skinMat += aVertex_weight.y * skinTransformMatrices[int(aVertex_joint.y)];\n';
    shaderText += 'skinMat += aVertex_weight.z * skinTransformMatrices[int(aVertex_joint.z)];\n';
    shaderText += 'skinMat += aVertex_weight.w * skinTransformMatrices[int(aVertex_joint.w)];\n';
    /*
    shaderText += `mat4 scaleMatrix = mat4(
      100.0, 0.0, 0.0, 0.0,
      0.0, 100.0, 0.0, 0.0,
      0.0, 0.0, 100.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    );\n`;

    shaderText += `mat4 scaleMatrix2 = mat4(
      0.01, 0.0, 0.0, 0.0,
      0.0, 0.01, 0.0, 0.0,
      0.0, 0.0, 0.01, 0.0,
      0.0, 0.0, 0.0, 1.0
    );\n`;
*/
    /*
    shaderText += '  skinMat[3][0] /= 100.0;';
    shaderText += '  skinMat[3][1] /= 100.0;';
    shaderText += '  skinMat[3][2] /= 100.0;';

    shaderText += '  skinMat[0][3] /= 100.0;';
    shaderText += '  skinMat[1][3] /= 100.0;';
    shaderText += '  skinMat[2][3] /= 100.0;';
  */

//    shaderText += '  vec3 newVec = vec3(aVertex_position.x, aVertex_position.y, -aVertex_position.z);';

    if (existCamera_f) {
//      shaderText += '  gl_Position = projectionMatrix * viewMatrix * skinMat * vec4(aVertex_position, 1.0);\n';
      shaderText += '  gl_Position = projectionMatrix * viewMatrix * skinMat * vec4(aVertex_position, 1.0);\n';
    } else {
      shaderText += '  gl_Position = skinMat * vec4(aVertex_position, 1.0);\n';
    }

//    shaderText += 'aVertex_color = vec4(aVertex_joint.x/18.0, aVertex_joint.y/18.0, aVertex_joint.z/18.0, 1.0);\n';
    //shaderText += 'aVertex_color = vec4((int(aVertex_joint.x)%3)/6.0, (int(aVertex_joint.y)%3)/6.0, (int(aVertex_joint.z)%3)/6.0, 1.0);\n';


    return shaderText;
  }

  prepare_SkeletalShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {
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
      Array.prototype.push.apply(identityMatrices,
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
