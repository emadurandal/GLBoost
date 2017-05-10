import Shader from '../../low_level/shaders/Shader';

export default class VertexWorldShadowShaderSource {
  VSDefine_VertexWorldShadowShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText =   '';
    let textureUnitIndex = 0;
    //for (let i=0; i<lights.length; i++) {
      //if (lights[i].camera && lights[i].camera.texture) {
    shaderText +=      `uniform mat4 depthPVMatrix[${lights.length}];\n`;
    shaderText +=       `${out_} vec4 v_shadowCoord[${lights.length}];\n`;

    return shaderText;
  }

  VSTransform_VertexWorldShadowShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    let gl = this._glContext.gl;

    shaderText += `mat4 biasMatrix = mat4(
      0.5, 0.0, 0.0, 0.0,
      0.0, 0.5, 0.0, 0.0,
      0.0, 0.0, 0.5, 0.0,
      0.5, 0.5, 0.5, 1.0
    );\n`;

    //shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    for (let i=0; i<lights.length; i++) {
      shaderText += `  { // ${i}\n`;
      if (GLBoost.isThisGLVersion_2(gl)) {
        shaderText += `    mat4 depthBiasPV = biasMatrix * depthPVMatrix[${i}]; // ${i}\n`;
      } else {
        shaderText += `    mat4 depthBiasPV = biasMatrix * depthPVMatrix[${i}]; // ${i}\n`;
      }
      //shaderText += `    mat4 depthBiasPV = depthPVMatrix[${i}];\n`;
      shaderText += `    v_shadowCoord[${i}] = depthBiasPV * worldMatrix * vec4(aVertex_position, 1.0); // ${i}\n`;
      //shaderText += `    v_shadowCoord[${i}].y = 1.0 - v_shadowCoord[${i}].y; // ${i}\n`;
      shaderText += `  } // ${i}\n`;
    }

    return shaderText;
  }

  FSDefine_VertexWorldShadowShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += 'uniform float depthBias;\n';

    return shaderText;
  }

  FSShade_VertexWorldShadowShaderSource(f, gl, lights) {
    var shaderText = '';
    return shaderText;
  }

  prepare_VertexWorldShadowShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      if (attribName === 'position' || attribName === 'normal') {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    material.setUniform(shaderProgram.hashId, 'uniform_worldMatrix', gl.getUniformLocation(shaderProgram, 'worldMatrix'));
    material._semanticsDic['WORLD'] = 'worldMatrix';
    material.setUniform(shaderProgram.hashId, 'uniform_normalMatrix', gl.getUniformLocation(shaderProgram, 'normalMatrix'));
    material._semanticsDic['MODELVIEWINVERSETRANSPOSE'] = 'normalMatrix';
    if (existCamera_f) {
      material.setUniform(shaderProgram.hashId, 'uniform_viewMatrix', gl.getUniformLocation(shaderProgram, 'viewMatrix'));
      material._semanticsDic['VIEW'] = 'viewMatrix';
      material.setUniform(shaderProgram.hashId, 'uniform_projectionMatrix', gl.getUniformLocation(shaderProgram, 'projectionMatrix'));
      material._semanticsDic['PROJECTION'] = 'projectionMatrix';
    }

    for(let i=0; i<lights.length; i++) {
      material.setUniform(shaderProgram.hashId, 'uniform_lightPosition_'+i, gl.getUniformLocation(shaderProgram, `lightPosition[${i}]`));
      material.setUniform(shaderProgram.hashId, 'uniform_lightDiffuse_'+i, gl.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`));
    }

    let uniform_depthBias = gl.getUniformLocation(shaderProgram, 'depthBias');
    material.setUniform(shaderProgram.hashId, 'uniform_depthBias', uniform_depthBias);
    gl.uniform1f(uniform_depthBias, 0.005);

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      //if (lights[i].camera && lights[i].camera.texture) {

      // matrices
      material.setUniform(shaderProgram.hashId, 'uniform_depthPVMatrix_' + textureUnitIndex, gl.getUniformLocation(shaderProgram, 'depthPVMatrix[' + textureUnitIndex + ']'));

      textureUnitIndex++;
      //}
      //shaderProgram['isShadowCasting' + i] = gl.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']');
    }

    return vertexAttribsAsResult;
  }

}

GLBoost['VertexWorldShadowShaderSource'] = VertexWorldShadowShaderSource;
