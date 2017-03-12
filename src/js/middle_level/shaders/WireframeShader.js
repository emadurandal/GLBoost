import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import VertexWorldShadowShaderSource from './VertexWorldShadowShader';
import {FragmentSimpleShaderSource} from './FragmentSimpleShader';

export class WireframeShaderSource {
  VSDefine_WireframeShaderSource(in_, out_, f) {
    var shaderText = '';
    shaderText += `${in_} vec3 aVertex_barycentricCoord;\n`;
    shaderText += `${out_} vec3 barycentricCoord;\n`;

    return shaderText;
  }

  VSTransform_WireframeShaderSource(existCamera_f, f) {
    var shaderText = '';

    shaderText += '  barycentricCoord = aVertex_barycentricCoord;\n';

    return shaderText;
  }

  FSDefine_WireframeShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';

    shaderText += `${in_} vec3 barycentricCoord;\n`;

    shaderText += 'uniform bool isWireframe;\n';
    shaderText += 'uniform float wireframeThicknessThreshold;\n';

    return shaderText;
  }

  FSShade_WireframeShaderSource(f, gl, lights, material, extraData) {
    var shaderText = '';

    shaderText += 'vec3 grayColor = vec3(0.5, 0.5, 0.5);\n';
    shaderText += 'if ( isWireframe ) {\n';
    shaderText += '  if ( barycentricCoord[0] > wireframeThicknessThreshold && barycentricCoord[1] > wireframeThicknessThreshold && barycentricCoord[2] > wireframeThicknessThreshold ) {\n';
    shaderText += '  } else {\n';
    shaderText += '    rt0.xyz = grayColor;\n';
    shaderText += '  }\n';
    shaderText += '}\n';

    return shaderText;
  }

  prepare_WireframeShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    shaderProgram['vertexAttribute_barycentricCoord'] = gl.getAttribLocation(shaderProgram, 'aVertex_barycentricCoord');
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_barycentricCoord']);
    vertexAttribsAsResult.push('barycentricCoord');

    material.uniform_isWireframe = gl.getUniformLocation(shaderProgram, 'isWireframe');
    gl.uniform1i( material.uniform_isWireframe, 1);

    material.uniform_wireframeThicknessThreshold = gl.getUniformLocation(shaderProgram, 'wireframeThicknessThreshold');
    gl.uniform1f( material.uniform_wireframeThicknessThreshold, 0.04);

    return vertexAttribsAsResult;
  }
}

export default class WireframeShader extends Shader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext);

    WireframeShader.mixin(basicShader);
    if (basicShader === VertexWorldShaderSource) {
      WireframeShader.mixin(VertexWorldShadowShaderSource);
    }
    WireframeShader.mixin(FragmentSimpleShaderSource);
    WireframeShader.mixin(WireframeShaderSource);
  }
}

GLBoost['WireframeShader'] = WireframeShader;
