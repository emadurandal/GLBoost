
export default class VertexWorldShadowShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSDefine_VertexWorldShadowShaderSource(in_, out_, f, lights, material, extraData) {
    var shaderText =   '';
    let textureUnitIndex = 0;
    //for (let i=0; i<lights.length; i++) {
    //if (lights[i].camera && lights[i].camera.texture) {

    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;        
        
    //shaderText +=      `uniform mat4 depthPVMatrix[${lightNumExceptAmbient}];\n`;
    //shaderText +=       `${out_} vec4 v_shadowCoord[${lightNumExceptAmbient}];\n`;

    return shaderText;
  }

  VSTransform_VertexWorldShadowShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    let gl = this._glContext.gl;

    return shaderText;
  }

  FSDefine_VertexWorldShadowShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'uniform float depthBias;\n';
    let lightNumExceptAmbient = lights.filter((light)=>{return !light.isTypeAmbient();}).length;
//    shaderText += `${in_} vec4 v_shadowCoord[${lightNumExceptAmbient}];\n`;
    if (lightNumExceptAmbient > 0) {
      shaderText += `uniform mat4 depthPVMatrix[${lightNumExceptAmbient}];\n`;
    }
    
    return shaderText;
  }

  FSShade_VertexWorldShadowShaderSource(f, gl, lights) {
    let shaderText = '';
    shaderText += 'float visibilityLevel = 1.0;\n';

    if (lights.length > 0) {
      shaderText += `    vec4 shadowCoord[${lights.length}];\n`;
    }    
    for (let i=0; i<lights.length; i++) {
      shaderText += `  { // ${i}\n`;
      shaderText += `    shadowCoord[${i}] = depthPVMatrix[${i}] * vec4(v_position_world, 1.0); // ${i}\n`;
      shaderText += `    shadowCoord[${i}].xyz *= 0.5; // ${i}\n`;
      shaderText += `    shadowCoord[${i}].xyz += 0.5; // ${i}\n`;
      shaderText += `  } // ${i}\n`;
    }
    return shaderText;
  }
  FSPostEffect_VertexWorldShadowShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';

//    shaderText += 'rt0 = vec4(visibilityLevel, 1.0, 1.0, 1.0);\n';

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

    
    for (let i=0; i<lights.length; i++) {
      let light = lights[i];
      
      material.setUniform(shaderProgram, 'uniform_isShadowCasting' + i, this._glContext.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']'));

      if (light.camera && light.camera.texture) {// && light.isCastingShadow) {

        // depthTexture
        let depthTextureUniformLocation = this._glContext.getUniformLocation(shaderProgram, `uDepthTexture[${i}]`);
        material.setUniform(shaderProgram, 'uniform_DepthTextureSampler_' + i, depthTextureUniformLocation);

        let index = i;

        // count for Decal Texture at first
        index++;

        // count for Normal Texture if it exists
        let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);
        if (normalTexture) {
          index++;
        }

        lights[i].camera.texture.textureUnitIndex = index;  // +1 because 0 is used for diffuse texture
      }
    }

    let uniform_depthBias = this._glContext.getUniformLocation(shaderProgram, 'depthBias');
    material.setUniform(shaderProgram, 'uniform_depthBias', uniform_depthBias);
    this._glContext.uniform1f(uniform_depthBias, 0.005, true);

    let textureUnitIndex = 0;
    for (let i=0; i<lights.length; i++) {
      //if (lights[i].camera && lights[i].camera.texture) {

      // matrices
      material.setUniform(shaderProgram, 'uniform_depthPVMatrix_' + textureUnitIndex, this._glContext.getUniformLocation(shaderProgram, 'depthPVMatrix[' + textureUnitIndex + ']'));

      textureUnitIndex++;
      //}
      //shaderProgram['isShadowCasting' + i] = this._glContext.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']');
    }

    return vertexAttribsAsResult;
  }

}

GLBoost['VertexWorldShadowShaderSource'] = VertexWorldShadowShaderSource;
