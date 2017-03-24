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

  prepare_WireframeShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    shaderProgram['vertexAttribute_barycentricCoord'] = gl.getAttribLocation(shaderProgram, 'aVertex_barycentricCoord');
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_barycentricCoord']);
    vertexAttribsAsResult.push('barycentricCoord');

    material.uniform_isWireframe = gl.getUniformLocation(shaderProgram, 'isWireframe');
    gl.uniform1i( material.uniform_isWireframe, 0);

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

    this._unfoldUVRatio = 0.0;

  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);
    let isWifeframe = false;

    if (typeof material.isWireframe !== 'undefined') {
      isWifeframe = material.isWireframe;
    }

    gl.uniform1i( material.uniform_isWireframe, isWifeframe);

    let uniformLocationAABBLengthCenterToCorner = material.getUniform(glslProgram.hashId, 'uniform_AABBLengthCenterToCorner');
    if (uniformLocationAABBLengthCenterToCorner) {
      gl.uniform1f(uniformLocationAABBLengthCenterToCorner, mesh.geometry.AABB.lengthCenterToCorner);
    }
    let uniformLocationAABBCenterPosition = material.getUniform(glslProgram.hashId, 'uniform_AABBCenterPosition');
    if (uniformLocationAABBCenterPosition) {
      gl.uniform4f(uniformLocationAABBCenterPosition, mesh.geometry.AABB.centerPoint.x, mesh.geometry.AABB.centerPoint.y, mesh.geometry.AABB.centerPoint.z, 0.0);
    }
    let uniformLocationUnfoldUVRatio = material.getUniform(glslProgram.hashId, 'uniform_unfoldUVRatio');
    if (uniformLocationUnfoldUVRatio) {
      gl.uniform1f(uniformLocationUnfoldUVRatio, this._unfoldUVRatio);
    }


  }

  set unfoldUVRatio(value) {
    this._unfoldUVRatio = value;
  }

  get unfoldUVRatio() {
    return this._unfoldUVRatio;
  }

}

GLBoost['WireframeShader'] = WireframeShader;
