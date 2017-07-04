import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import VertexWorldShadowShaderSource from './VertexWorldShadowShader';
import {FragmentSimpleShaderSource} from './FragmentSimpleShader';

export class WireframeShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

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
    let shaderText = '';

    shaderText += `${in_} vec3 barycentricCoord;\n`;

    shaderText += 'uniform bool isWireframe;\n';
    //shaderText += 'uniform bool isWireframeOnShade;\n';
    shaderText += 'uniform float wireframeWidth;\n';

    return shaderText;
  }

  FSMethodDefine_WireframeShaderSource(in_, f, lights, material, extraData) {
    let shaderText = '';

    shaderText += `
    float edge_ratio(vec3 bary3, float wireframeWidth) {     
        vec3 d = fwidth(bary3);
        vec3 x = bary3+vec3(1.0 - wireframeWidth)*d;
        vec3 a3 = smoothstep(vec3(0.0), d, x);
        float factor = min(min(a3.x, a3.y), a3.z);
        
        return clamp((1.0 - factor), 0.0, 1.0);
    }
    `;

    return shaderText;
  }

  FSPostEffect_WireframeShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'if ( isWireframe ) {\n';
    shaderText += '  vec4 wireframeColor = vec4(0.2, 0.75, 0.0, 1.0);\n';
    shaderText += '  float edgeRatio = edge_ratio(barycentricCoord, wireframeWidth);\n';
    shaderText += '  rt0 = mix(rt0, wireframeColor, vec4(edgeRatio));\n';
    shaderText += '  rt0.a = max(rt0.a, wireframeColor.a * edgeRatio);\n';
    shaderText += '}\n';

    shaderText += '    if (rt0.a < 0.05) {\n';
    shaderText += '      discard;\n';
    shaderText += '    }\n';

    /*
    //shaderText += '  rt0 = vec4((v_tangent+1.0)/2.0, 1.0);\n';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  rt0 = vec4(normalize(v_normal)*0.5+0.5, 1.0);\n';
    }
    */

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

    let uniform_wireframeWidth = material._glContext.getUniformLocation(shaderProgram, 'wireframeWidth');
    material.setUniform(shaderProgram.hashId, 'uniform_wireframeWidth', uniform_wireframeWidth);
    this._glContext.uniform1f( uniform_wireframeWidth, 1.0, true);

    let uniform_wireframeWidthRelativeScale = material._glContext.getUniformLocation(shaderProgram, 'wireframeWidthRelativeScale');
    material.setUniform(shaderProgram.hashId, 'uniform_wireframeWidthRelativeScale', uniform_wireframeWidthRelativeScale);
    this._glContext.uniform1f( uniform_wireframeWidthRelativeScale, 1.0, true);

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
    let wireframeWidth = 0.0;

    if (typeof material.isWireframe !== 'undefined') {
      isWifeframe = material.isWireframe;
      isWireframeOnShade = material.isWireframeOnShade;
      wireframeWidth = material.wireframeWidth;
    }

    let uniformLocationIsWireframe = material.getUniform(glslProgram.hashId, 'uniform_isWireframe');
    if (uniformLocationIsWireframe) {
      this._glContext.uniform1i(uniformLocationIsWireframe, isWifeframe, true);
    }
    if (isWifeframe && !isWireframeOnShade) {
      material._glContext.uniform1f(material.getUniform(glslProgram.hashId, 'uniform_opacity'), 0.0, true);
    }
    let uniformLocationWireframeWidth = material.getUniform(glslProgram.hashId, 'uniform_wireframeWidth');
    if (uniformLocationWireframeWidth) {
      this._glContext.uniform1f(uniformLocationWireframeWidth, wireframeWidth, true);
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
      let depthBias = this.getShaderParameter(material, 'depthBias', false);
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
