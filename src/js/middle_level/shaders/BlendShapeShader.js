import Shader from '../../low_level/shaders/Shader';

export default class BlendShapeShaderSource {

  VSDefine_BlendShapeShaderSource(in_, out_, f) {
    var shaderText = '';
    f.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        shaderText+=`${in_} vec3 aVertex_${attribName};\n`;
        shaderText+='uniform float blendWeight_' + attribName  + ';\n';
      }
    });
    return shaderText;
  }

  VSTransform_BlendShapeShaderSource(existCamera_f, f, lights, material, extraData) {
    var shaderText = '';
    shaderText +=     'float sumOfWeights = 0.0;\n';
    f.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        shaderText += 'sumOfWeights += blendWeight_' + attribName +';\n';
      }
    });
    var numOfShapeTargets = this.BlendShapeShaderSource_numberOfShapeTargets(f);
    shaderText += '    vec3 blendedPosition = aVertex_position * max(1.0 - sumOfWeights/float(' + numOfShapeTargets + '), 0.0);\n';
    f.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        shaderText += 'blendedPosition += aVertex_' + attribName + ' * blendWeight_' + attribName + '/float(' + numOfShapeTargets + ');\n';
      }
    });
    if (existCamera_f) {
      shaderText += '  gl_Position = pvwMatrix * vec4(blendedPosition, 1.0);\n';
    } else {
      shaderText += '  gl_Position = vec4(blendedPosition, 1.0);\n';
    }
    return shaderText;
  }

  prepare_BlendShapeShaderSource(gl, shaderProgram, vertexAttribs) {
    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) { // if POSITION and ShapeTargets...
        vertexAttribsAsResult.push(attribName);
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
      }
    });

    vertexAttribs.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        shaderProgram['uniformFloatSampler_blendWeight_' + attribName] = gl.getUniformLocation(shaderProgram, 'blendWeight_' + attribName);
        // とりあえずゼロ初期化
        gl.uniform1f(shaderProgram['uniformFloatSampler_blendWeight_' + attribName], 0.0);
      }
    });

    return vertexAttribsAsResult;
  }

  BlendShapeShaderSource_isShapeTarget(attribName) {
    return !Shader._exist(attribName, GLBoost.POSITION) && !Shader._exist(attribName, GLBoost.COLOR) && !Shader._exist(attribName, GLBoost.TEXCOORD);
  }

  BlendShapeShaderSource_numberOfShapeTargets(attributes) {
    var count = 0;
    attributes.forEach((attribName)=>{
      if (this.BlendShapeShaderSource_isShapeTarget(attribName)) {
        count += 1;
      }
    });
    return count;
  }
}
