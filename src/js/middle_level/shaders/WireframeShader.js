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
    shaderText += 'uniform bool isWireframeOnShade;\n';
    shaderText += 'uniform float wireframeWidth;\n';

    return shaderText;
  }

  FSMethodDefine_WireframeShaderSource(in_, f, lights, material, extraData) {
    var shaderText = '';

    //shaderText += 'float mesh_width = 1.0;\n';

    shaderText += `
    float edge_factor(vec3 bary3, float wireframeWidth) {     
        vec3 d = fwidth(bary3);
        vec3 a3 = smoothstep(vec3(0.0,0.0,0.0), d*wireframeWidth, bary3);  
        return min(min(a3.x, a3.y), a3.z);                             
    }
    `;

    return shaderText;
  }

  FSShade_WireframeShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'if ( isWireframe ) {\n';
    shaderText += '  vec4 mesh_color = vec4(0.0, 0.0, 0.0, 1.0);\n';
    shaderText += '  float factor = edge_factor(barycentricCoord, wireframeWidth);\n';
    shaderText += '  rt0 = mix(mesh_color, rt0, factor);\n';
    shaderText += '}\n';

    return shaderText;
  }

  prepare_WireframeShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];
    shaderProgram['vertexAttribute_barycentricCoord'] = gl.getAttribLocation(shaderProgram, 'aVertex_barycentricCoord');
    gl.enableVertexAttribArray(shaderProgram['vertexAttribute_barycentricCoord']);
    vertexAttribsAsResult.push('barycentricCoord');

    let uniform_isWireframe = material._glContext.getUniformLocation(shaderProgram, 'isWireframe');
    material.setUniform(shaderProgram.hashId, 'uniform_isWireframe', uniform_isWireframe);
    this._glContext.uniform1i( uniform_isWireframe, 0, true);

    let uniform_isWireframeOnShade = material._glContext.getUniformLocation(shaderProgram, 'isWireframeOnShade');
    material.setUniform(shaderProgram.hashId, 'uniform_isWireframeOnShade', uniform_isWireframeOnShade);
    this._glContext.uniform1i( uniform_isWireframeOnShade, 0, true);

    let uniform_wireframeWidth = material._glContext.getUniformLocation(shaderProgram, 'wireframeWidth');
    material.setUniform(shaderProgram.hashId, 'uniform_wireframeWidth', uniform_wireframeWidth);
    this._glContext.uniform1f( uniform_wireframeWidth, 1.0, true);

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

    this._AABB = null;

  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let isWifeframe = false;
    let isWireframeOnShade = false;

    if (typeof material.isWireframe !== 'undefined') {
      isWifeframe = material.isWireframe;
    }

    if (typeof material.isWireframeOnShade !== 'undefined') {
      isWireframeOnShade = material.isWireframeOnShade;
    }

    let uniformLocationIsWireframe = material.getUniform(glslProgram.hashId, 'uniform_isWireframe');
    if (uniformLocationIsWireframe) {
      this._glContext.uniform1i(uniformLocationIsWireframe, isWifeframe, true);
    }
    let uniformLocationIsWireframeOnShade = material.getUniform(glslProgram.hashId, 'uniform_isWireframeOnShade');
    if (uniformLocationIsWireframeOnShade) {
      this._glContext.uniform1i(uniformLocationIsWireframeOnShade, isWireframeOnShade, true);
    }

    let AABB = (this._AABB !== null) ? this._AABB : mesh.geometry.AABB;

    let uniformLocationAABBLengthCenterToCorner = material.getUniform(glslProgram.hashId, 'uniform_AABBLengthCenterToCorner');
    if (uniformLocationAABBLengthCenterToCorner) {
      this._glContext.uniform1f(uniformLocationAABBLengthCenterToCorner, AABB.lengthCenterToCorner, true);
    }
        let uniformLocationAABBCenterPosition = material.getUniform(glslProgram.hashId, 'uniform_AABBCenterPosition');
    if (uniformLocationAABBCenterPosition) {
      this._glContext.uniform4f(uniformLocationAABBCenterPosition, AABB.centerPoint.x, AABB.centerPoint.y, AABB.centerPoint.z, 0.0, true);
    }
    let uniformLocationUnfoldUVRatio = material.getUniform(glslProgram.hashId, 'uniform_unfoldUVRatio');
    if (uniformLocationUnfoldUVRatio) {
      this._glContext.uniform1f(uniformLocationUnfoldUVRatio, this._unfoldUVRatio, true);
    }

    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);

    let uniformLocationDepthBias = material.getUniform(glslProgram.hashId, 'uniform_depthBias');
    if (uniformLocationDepthBias) {
      let depthBias = this.getShaderParameter(material, 'depthBias');
      if (depthBias) {
        this._glContext.uniform1f(uniformLocationDepthBias, depthBias, true);
      }
    }
  }

  set unfoldUVRatio(value) {
    this._unfoldUVRatio = value;
  }

  get unfoldUVRatio() {
    return this._unfoldUVRatio;
  }

  set AABB(aabb) {
    this._AABB = aabb;
  }

  get AABB() {
    return this._AABB;
  }

}

GLBoost['WireframeShader'] = WireframeShader;
