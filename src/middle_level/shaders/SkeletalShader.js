import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';

export default class SkeletalShaderSource {

  VSDefine_SkeletalShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText = '';
    shaderText += `${in_} vec4 aVertex_joint;\n`;
    shaderText += `${in_} vec4 aVertex_weight;\n`;

    if (!GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
      shaderText += 'uniform mat4 skinTransformMatrices[' + extraData.jointN  + '];\n';
    } else if (GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1){
      shaderText += 'uniform vec4 quatArray[' + extraData.jointN  + '];\n';
      shaderText += 'uniform vec4 transArray[' + extraData.jointN  + '];\n';
      //    shaderText += 'uniform vec2 quatArray[' + extraData.jointN  + '];\n';

    } else if (GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {
      // `OneVec4` Version [Begin]
      shaderText += 'uniform vec4 quatTranslationArray[' + extraData.jointN  + '];\n';
      shaderText += 'uniform vec3 translationScale;\n';
      // `OneVec4` Version [End]
    }
    
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

    mat4 transposeMatrix(mat4 m) {
      return mat4(m[0][0], m[1][0], m[2][0], m[3][0],
                  m[0][1], m[1][1], m[2][1], m[3][1],
                  m[0][2], m[1][2], m[2][2], m[3][2],
                  m[0][3], m[1][3], m[2][3], m[3][3]);
    }

    mat4 createMatrixFromQuaternionTransform( vec4 quaternion, vec3 translation ) {
      vec4 q = quaternion;
      vec3 t = translation;

      float sx = q.x * q.x;
      float sy = q.y * q.y;
      float sz = q.z * q.z;
      float cx = q.y * q.z;
      float cy = q.x * q.z;
      float cz = q.x * q.y;
      float wx = q.w * q.x;
      float wy = q.w * q.y;
      float wz = q.w * q.z;

      
      return mat4(
        1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), 0.0,
        2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), 0.0,
        2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), 0.0,
        t.x, t.y, t.z, 1.0
      );
      /*
     return mat4(
      1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), t.x,
      2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), t.y,
      2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), t.z,
      0.0, 0.0, 0.0, 1.0
    );

   return mat4(
    1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), 0.0,
    2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), 0.0,
    2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), 0.0,
    t.x, t.y, t.z, 1.0
  );

    return mat4(
      1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), t.x,
      2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), t.y,
      2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), t.z,
      0.0, 0.0, 0.0, 1.0
    );
    */
  }

  mat4 createMatrixFromQuaternionTransformUniformScale( vec4 quaternion, vec4 translationUniformScale ) {
    vec4 q = quaternion;
    vec3 t = translationUniformScale.xyz;
    float scale = translationUniformScale.w;

    float sx = q.x * q.x;
    float sy = q.y * q.y;
    float sz = q.z * q.z;
    float cx = q.y * q.z;
    float cy = q.x * q.z;
    float cz = q.x * q.y;
    float wx = q.w * q.x;
    float wy = q.w * q.y;
    float wz = q.w * q.z;

    
    mat4 mat = mat4(
      1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), 0.0,
      2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), 0.0,
      2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), 0.0,
      t.x, t.y, t.z, 1.0
    );
    /*
    mat4 mat = mat4(
    1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), t.x,
    2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), t.y,
    2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), t.z,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 mat = mat4(
  1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), 0.0,
  2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), 0.0,
  2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), 0.0,
  t.x, t.y, t.z, 1.0
);

  mat4 mat = mat4(
    1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), t.x,
    2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), t.y,
    2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), t.z,
    0.0, 0.0, 0.0, 1.0
  );
  */

  mat4 uniformScaleMat = mat4(
    scale, 0.0, 0.0, 0.0,
    0.0, scale, 0.0, 0.0,
    0.0, 0.0, scale, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
 
//  mat[0][0] *= scale;
//  mat[0][1] *= scale;
//  mat[0][2] *= scale;
//  mat[1][0] *= scale;
//  mat[1][1] *= scale;
//  mat[1][2] *= scale;
//  mat[2][0] *= scale;
//  mat[2][1] *= scale;
//  mat[2][2] *= scale;
  
  return mat*uniformScaleMat;
}

/*
  mat4 createMatrixFromQuaternionTransform( vec4 quaternion, vec3 translation ) {
    vec4 q = quaternion;
    vec3 t = translation;
    float x = q.x;
    float y = q.y;
    float z = q.z;
    float w = q.w;
    float x2 = x + x;
    float y2 = y + y;
    float z2 = z + z;
    float xx = x * x2;
    float yx = y * x2;
    float yy = y * y2;
    float zx = z * x2;
    float zy = z * y2;
    float zz = z * z2;
    float wx = w * x2;
    float wy = w * y2;
    float wz = w * z2;
    float m_0 = 1.0 - yy - zz;
    float m_3 = yx - wz;
    float m_6 = zx + wy;
    float m_1 = yx + wz;
    float m_4 = 1.0 - xx - zz;
    float m_7 = zy - wx;
    float m_2 = zx - wy;
    float m_5 = zy + wx;
    float m_8 = 1.0 - xx - yy;

    return mat4(
      m_0, m_3, m_6, 0.0,
      m_1, m_4, m_7, 0.0,
      m_2, m_5, m_8, 0.0,
      t.x, t.y, t.z, 0.0
    );

    return mat4(
    m_0, m_3, m_6, t.x,
    m_1, m_4, m_7, t.y,
    m_2, m_5, m_8, t.z,
    0.0, 0.0, 0.0, 0.0
  );

 
   return mat4(
    m_0, m_1, m_2, 0.0,
    m_3, m_4, m_5, 0.0,
    m_6, m_7, m_8, 0.0,
    t.x, t.y, t.z, 0.0
  );

return mat4(
  m_0, m_1, m_2, t.x,
  m_3, m_4, m_5, t.y,
  m_6, m_7, m_8, t.z,
  0.0, 0.0, 0.0, 0.0
);

  }
  */

    vec4 unpackedVec2ToNormalizedVec4(vec2 vec_xy, float criteria){

      float r;
      float g;
      float b;
      float a;
      
      float ix = floor(vec_xy.x * criteria);
      float v1x = ix / criteria;
      float v1y = ix - floor(v1x) * criteria;
  
      r = ( v1x + 1.0 ) / (criteria-1.0);
      g = ( v1y + 1.0 ) / (criteria-1.0);
  
      float iy = floor( vec_xy.y * criteria);
      float v2x = iy / criteria;
      float v2y = iy - floor(v2x) * criteria;
  
      b = ( v2x + 1.0 ) / (criteria-1.0);
      a = ( v2y + 1.0 ) / (criteria-1.0);
  
      r -= 1.0/criteria;
      g -= 1.0/criteria;
      b -= 1.0/criteria;
      a -= 1.0/criteria;
        
      r = r*2.0-1.0;
      g = g*2.0-1.0;
      b = b*2.0-1.0;
      a = a*2.0-1.0;
  
      return vec4(r, g, b, a);
    }
    `;

    return shaderText;
  }

  /**
   * @return {string}
   */
  VSPreProcess_SkeletalShaderSource(existCamera_f, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'vec4 weightVec = aVertex_weight;\n'; // DO NOT normalize as vec4!

    if (!GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
      shaderText += 'mat4 skinMat = weightVec.x * skinTransformMatrices[int(aVertex_joint.x)];\n';
      shaderText += 'skinMat += weightVec.y * skinTransformMatrices[int(aVertex_joint.y)];\n';
      shaderText += 'skinMat += weightVec.z * skinTransformMatrices[int(aVertex_joint.z)];\n';
      shaderText += 'skinMat += weightVec.w * skinTransformMatrices[int(aVertex_joint.w)];\n';
    } else if (GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1) {

      // `Quaterion (Vec4) Transform(Vec3)` Version
      shaderText += 'mat4 skinMat = weightVec.x * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.x)], transArray[int(aVertex_joint.x)]);\n';
      shaderText += 'skinMat += weightVec.y * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.y)], transArray[int(aVertex_joint.y)]);\n';
      shaderText += 'skinMat += weightVec.z * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.z)], transArray[int(aVertex_joint.z)]);\n';
      shaderText += 'skinMat += weightVec.w * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.w)], transArray[int(aVertex_joint.w)]);\n';
    } else if (GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {

      // `OneVec4` Version
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
    
    }

    // Calc the following...
    // * position_world
    // * normal_world
    // * normalMatrix
    // * tangent_world
    shaderText += 'position_world = skinMat * position_local;\n';    
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += 'mat3 normalMatrix = toNormalMatrix(skinMat);\n';
      shaderText += 'normal_world = normalize(normalMatrix * normal_local);\n';
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += 'tangent_world = normalize(normalMatrix * tangent_local);\n';
      }
    }
    // So, you should not recompute the items in the list above. Check the isSkinning flag to avoid recalculation.
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

    if (!GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
      let skinTransformMatricesUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'skinTransformMatrices');
      material.setUniform(shaderProgram, 'uniform_skinTransformMatrices', skinTransformMatricesUniformLocation);
      material._semanticsDic['JOINTMATRIX'] = 'skinTransformMatrices';
    } else if (GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1) {
      
      let quatArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'quatArray');
      material.setUniform(shaderProgram, 'uniform_quatArray', quatArrayUniformLocation);
      material._semanticsDic['JOINT_QUATERNION'] = 'quatArray';
      let transArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'transArray');
      material.setUniform(shaderProgram, 'uniform_transArray', transArrayUniformLocation);
      material._semanticsDic['JOINT_TRANSLATION'] = 'transArray';
      
    } else if (GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {
      
      // `OneVec4` Version [Begin]
      let quatArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'quatTranslationArray');
      material.setUniform(shaderProgram, 'uniform_quatTranslationArray', quatArrayUniformLocation);
      material._semanticsDic['JOINT_QUATTRANSLATION'] = 'quatTranslationArray';
      let transArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'translationScale');
      material.setUniform(shaderProgram, 'uniform_translationScale', transArrayUniformLocation);
      // `OneVec4` Version [End]
      
    }
    
    /*
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
    //gl.uniformMatrix4fv(skinTransformMatricesUniformLocation, false, new Float32Array(identityMatrices));
    */

    return vertexAttribsAsResult;
  }
}
