import Shader from './Shader';
import MiscUtil from '../misc/MiscUtil';

export default class VertexViewShaderSource {
  VSDefine_VertexViewShaderSource(in_, out_, f, lights, extraData) {
    var shaderText =   `${in_} vec3 aVertex_position;\n`;
    if(MiscUtil.isDefinedAndTrue(extraData.transformLightPositionInVertex) && lights.length > 0) {
      shaderText += `uniform vec4 lightPosition[${lights.length}];\n`;
    }
    shaderText +=      'uniform mat4 worldMatrix;\n';
    shaderText +=      'uniform mat4 viewMatrix;\n';
    shaderText +=      'uniform mat4 projectionMatrix;\n';
    return shaderText;
  }

  VSTransform_VertexViewShaderSource(existCamera_f, f, lights, extraData) {
    var shaderText = '';
    if (existCamera_f) {
      shaderText +=   '  gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(aVertex_position, 1.0);\n';
    } else {
      shaderText +=   '  gl_Position = vec4(aVertex_position, 1.0);\n';
    }
    return shaderText;
  }

  FSDefine_VertexViewShaderSource(in_, f, lights, extraData) {
    var shaderText = '';
    if(lights.length > 0) {
      if (!MiscUtil.isDefinedAndTrue(extraData.transformLightPositionInVertex)) {
        shaderText += `uniform vec4 lightPosition[${lights.length}];\n`;
      }
      shaderText += `uniform vec4 lightDiffuse[${lights.length}];\n`;
    }

    return shaderText;
  }

  prepare_VertexViewShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, extraData, canvas) {

    var vertexAttribsAsResult = [];

    var attribName = 'position';
    shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
    vertexAttribsAsResult.push(attribName);

    shaderProgram.worldMatrix = gl.getUniformLocation(shaderProgram, 'worldMatrix');
    if (existCamera_f) {
      shaderProgram.viewMatrix = gl.getUniformLocation(shaderProgram, 'viewMatrix');
      shaderProgram.projectionMatrix = gl.getUniformLocation(shaderProgram, 'projectionMatrix');
    }

    lights = Shader.getDefaultPointLightIfNotExsist(gl, lights, canvas);

    for(let i=0; i<lights.length; i++) {
      shaderProgram['lightPosition_'+i] = gl.getUniformLocation(shaderProgram, `lightPosition[${i}]`);
      shaderProgram['lightDiffuse_'+i] = gl.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`);
    }

    return vertexAttribsAsResult;
  }
}

GLBoost['VertexViewShaderSource'] = VertexViewShaderSource;
