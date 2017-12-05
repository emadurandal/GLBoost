import Shader from '../../low_level/shaders/Shader';

export default class SkeletalShaderSource {

  VSDefine_SkeletalShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText = '';
    shaderText += `${in_} vec4 aVertex_joint;\n`;
    shaderText += `${in_} vec4 aVertex_weight;\n`;
    shaderText += 'uniform mat4 skinTransformMatrices[' + extraData.jointN  + '];\n';
//    shaderText += 'uniform vec4 quatArray[' + extraData.jointN  + '];\n';
//    shaderText += 'uniform vec2 quatArray[' + extraData.jointN  + '];\n';
//    shaderText += 'uniform vec3 transArray[' + extraData.jointN  + '];\n';
    //shaderText += 'uniform vec4 quatTranslationArray[' + extraData.jointN  + '];\n';
    //shaderText += 'uniform vec3 translationScale;\n';
    
    return shaderText;
  }

  VSMethodDefine_SkeletalShaderSource(f, lights, material, extraData) {
    let shaderText = '';
    shaderText += `
    mat3 toNormalMatrix(mat4 m) {
      float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3];
    
      float b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32;
    
      float determinantVal = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    
      return mat3(
        a11 * b11 - a12 * b10 + a13 * b09, a12 * b08 - a10 * b11 - a13 * b07, a10 * b10 - a11 * b08 + a13 * b06,
        a02 * b10 - a01 * b11 - a03 * b09, a00 * b11 - a02 * b08 + a03 * b07, a01 * b08 - a00 * b10 - a03 * b06,
        a31 * b05 - a32 * b04 + a33 * b03, a32 * b02 - a30 * b05 - a33 * b01, a30 * b04 - a31 * b02 + a33 * b00) / determinantVal;
    }

    `;

    return shaderText;
  }

  /**
   * @return {string}
   */
  VSPreProcess_SkeletalShaderSource(existCamera_f, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'vec4 weightVec = normalize(aVertex_weight);\n';
    
    shaderText += 'mat4 skinMat = weightVec.x * skinTransformMatrices[int(aVertex_joint.x)];\n';
    shaderText += 'skinMat += weightVec.y * skinTransformMatrices[int(aVertex_joint.y)];\n';
    shaderText += 'skinMat += weightVec.z * skinTransformMatrices[int(aVertex_joint.z)];\n';
    shaderText += 'skinMat += weightVec.w * skinTransformMatrices[int(aVertex_joint.w)];\n';

    /*
    shaderText += 'mat4 skinMat = weightVec.x * createMatrixFromQuaternionTransform(quatArray[int(aVertex_joint.x)], transArray[int(aVertex_joint.x)]);\n';
    shaderText += 'skinMat += weightVec.y * createMatrixFromQuaternionTransform(quatArray[int(aVertex_joint.y)], transArray[int(aVertex_joint.y)]);\n';
    shaderText += 'skinMat += weightVec.z * createMatrixFromQuaternionTransform(quatArray[int(aVertex_joint.z)], transArray[int(aVertex_joint.z)]);\n';
    shaderText += 'skinMat += weightVec.w * createMatrixFromQuaternionTransform(quatArray[int(aVertex_joint.w)], transArray[int(aVertex_joint.w)]);\n';
*/
/*
    shaderText += `float criteria = 4096.0;\n`;
    shaderText += `mat4 skinMat = weightVec.x * createMatrixFromQuaternionTransform(
      unpackedVec2ToNormalizedVec4(quatArray[int(aVertex_joint.x)], criteria),
      transArray[int(aVertex_joint.x)]);\n`;
    shaderText += `skinMat += weightVec.y * createMatrixFromQuaternionTransform(
      unpackedVec2ToNormalizedVec4(quatArray[int(aVertex_joint.y)], criteria),
      transArray[int(aVertex_joint.y)]);\n`;
    shaderText += `skinMat += weightVec.z * createMatrixFromQuaternionTransform(
      unpackedVec2ToNormalizedVec4(quatArray[int(aVertex_joint.z)], criteria),
      transArray[int(aVertex_joint.z)]);\n`;
    shaderText += `skinMat += weightVec.w * createMatrixFromQuaternionTransform(
      unpackedVec2ToNormalizedVec4(quatArray[int(aVertex_joint.w)], criteria),
      transArray[int(aVertex_joint.w)]);\n`;
      */

/*
shaderText += `vec2 criteria = vec2(4096.0, 4096.0);\n`;
shaderText += `mat4 skinMat = weightVec.x * createMatrixFromQuaternionTransform(
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.x)].xy, criteria.x),
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.x)].zw, criteria.y).xyz*translationScale);\n`;
shaderText += `skinMat += weightVec.y * createMatrixFromQuaternionTransform(
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.y)].xy, criteria.x),
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.y)].zw, criteria.y).xyz*translationScale);\n`;
shaderText += `skinMat += weightVec.z * createMatrixFromQuaternionTransform(
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.z)].xy, criteria.x),
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.z)].zw, criteria.y).xyz*translationScale);\n`;
shaderText += `skinMat += weightVec.w * createMatrixFromQuaternionTransform(
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.w)].xy, criteria.x),
  unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.w)].zw, criteria.y).xyz*translationScale);\n`;
*/

    shaderText += 'position_world = worldMatrix * skinMat * position_local;\n';
//shaderText += 'position_world = skinMat * position_local;\n';

    /*
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += 'mat3 skinNormalMatrix = toNormalMatrix(skinMat);\n';
      shaderText += 'normal_local = normalize(skinNormalMatrix * normal_local);\n';
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += 'tangent_local = normalize(skinNormalMatrix * tangent_local);\n';
      }
    }
    */

    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += 'mat3 normalMatrix = toNormalMatrix(skinMat);\n';
      shaderText += 'normal_world = normalize(normalMatrix * normal_local);\n';
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += 'tangent_world = normalize(normalMatrix * tangent_local);\n';
      }
    }

    shaderText += 'isSkinning = true;\n';

    return shaderText;
  }

  prepare_SkeletalShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
    let vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'joint' || attribName === 'weight') {
        vertexAttribsAsResult.push(attribName);
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
      }
    });

    let skinTransformMatricesUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'skinTransformMatrices');
    material.setUniform(shaderProgram, 'uniform_skinTransformMatrices', skinTransformMatricesUniformLocation);
    material._semanticsDic['JOINTMATRIX'] = 'skinTransformMatrices';

/*
    let quatArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'quatArray');
    material.setUniform(shaderProgram, 'uniform_quatArray', quatArrayUniformLocation);
    material._semanticsDic['JOINT_QUATERNION'] = 'quatArray';
    let transArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'transArray');
    material.setUniform(shaderProgram, 'uniform_transArray', transArrayUniformLocation);
    material._semanticsDic['JOINT_TRANSLATION'] = 'transArray';
*/
/*
    let quatArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'quatTranslationArray');
    material.setUniform(shaderProgram, 'uniform_quatTranslationArray', quatArrayUniformLocation);
    material._semanticsDic['JOINT_QUATTRANSLATION'] = 'quatTranslationArray';
    let transArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'translationScale');
    material.setUniform(shaderProgram, 'uniform_translationScale', transArrayUniformLocation);
*/
        

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
    gl.uniformMatrix4fv(skinTransformMatricesUniformLocation, false, new Float32Array(identityMatrices));

    return vertexAttribsAsResult;
  }
}
