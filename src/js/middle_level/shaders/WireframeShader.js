
import Shader from '../../low_level/shaders/Shader';
import FragmentSimpleShader from './FragmentSimpleShader';
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

    // for Unfold UV
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText +=      'uniform float AABBLengthCenterToCorner;\n';
      shaderText +=      'uniform vec4 AABBCenterPositionAndRatio;\n';
    }
    return shaderText;
  }

  VSTransform_WireframeShaderSource(existCamera_f, f) {
    var shaderText = '';


    // UV Unfold
    shaderText += '  vec4 interpolatedPosition_world = position_world;\n';
    shaderText +=   '  gl_Position = position_world;\n';
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  vec3 AABBCenterPosition = AABBCenterPositionAndRatio.xyz;\n';      
      shaderText += '  float unfoldUVRatio = AABBCenterPositionAndRatio.w;\n';      
      shaderText += '  vec2 uvScaled = vec2((aVertex_texcoord-0.5)*AABBLengthCenterToCorner*2.0);\n';
      shaderText += '  uvScaled.y = - uvScaled.y;\n';
      shaderText += '  vec4 uvPosition = vec4(uvScaled + AABBCenterPosition.xy, AABBCenterPosition.z, 1.0);\n';
      shaderText += '  interpolatedPosition_world = uvPosition * unfoldUVRatio + position_world * (1.0-unfoldUVRatio);\n';
    }

    if (existCamera_f) {
      shaderText +=   '  mat4 pvMatrix = projectionMatrix * viewMatrix;\n';
      shaderText +=   '  gl_Position = pvMatrix * interpolatedPosition_world;\n';
    }

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
    float edge_ratio(vec3 bary3, float wireframeWidthInner, float wireframeWidthRelativeScale) {     
        vec3 d = fwidth(bary3);
        vec3 x = bary3+vec3(1.0 - wireframeWidthInner)*d;
        vec3 a3 = smoothstep(vec3(0.0), d, x);
        float factor = min(min(a3.x, a3.y), a3.z);
        
        return clamp((1.0 - factor), 0.0, 1.0);
    }
    `;

    return shaderText;
  }

  FSShade_WireframeShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'bool isWireframeInner = false;\n';
    shaderText += 'float wireframeWidthRelativeScale = 1.0;\n';
    
    return shaderText;
  }

  FSPostEffect_WireframeShaderSource(f, gl, lights, material, extraData) {
    let shaderText = '';

    shaderText += 'float wireframeWidthInner = wireframeWidth;\n';
    shaderText += 'float threshold = 0.001;\n';
    shaderText += 'vec4 wireframeResult = rt0;\n';
    shaderText += 'if ( isWireframeInner || isWireframe ) {\n';
    shaderText += '  vec4 wireframeColor = vec4(0.2, 0.75, 0.0, 1.0);\n';
    shaderText += '  float edgeRatio = edge_ratio(barycentricCoord, wireframeWidthInner, wireframeWidthRelativeScale);\n';
    shaderText += '  float edgeRatioModified = mix(step(0.001, edgeRatio), clamp(edgeRatio*4.0, 0.0, 1.0), wireframeWidthInner / wireframeWidthRelativeScale/4.0);\n';
    // if r0.a is 0.0, it is wireframe not on shaded
    shaderText += '  wireframeResult.rgb = wireframeColor.rgb * edgeRatioModified + rt0.rgb * (1.0 - edgeRatioModified);\n';
    shaderText += '  wireframeResult.a = max(rt0.a, wireframeColor.a * mix(edgeRatioModified, pow(edgeRatioModified, 100.0), wireframeWidthInner / wireframeWidthRelativeScale/1.0));\n';
    shaderText += '}\n';

    shaderText += 'if ( isWireframe ) {\n';
    shaderText += '  rt0 = wireframeResult;\n';
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
    material.setUniform(shaderProgram, 'uniform_isWireframe', uniform_isWireframe);
    this._glContext.uniform1i( uniform_isWireframe, 0, true);

    let uniform_wireframeWidth = material._glContext.getUniformLocation(shaderProgram, 'wireframeWidth');
    material.setUniform(shaderProgram, 'uniform_wireframeWidth', uniform_wireframeWidth);
    this._glContext.uniform1f( uniform_wireframeWidth, 1.0, true);

    let uniform_wireframeWidthRelativeScale = material._glContext.getUniformLocation(shaderProgram, 'wireframeWidthRelativeScale');
    material.setUniform(shaderProgram, 'uniform_wireframeWidthRelativeScale', uniform_wireframeWidthRelativeScale);
    this._glContext.uniform1f( uniform_wireframeWidthRelativeScale, 1.0, true);

    if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
      material.setUniform(shaderProgram, 'uniform_AABBLengthCenterToCorner', this._glContext.getUniformLocation(shaderProgram, 'AABBLengthCenterToCorner'));
      material.setUniform(shaderProgram, 'uniform_AABBCenterPositionAndRatio', this._glContext.getUniformLocation(shaderProgram, 'AABBCenterPositionAndRatio'));
    }

    return vertexAttribsAsResult;
  }
}

export default class WireframeShader extends FragmentSimpleShader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext);

    if (basicShader === VertexWorldShaderSource) {
      WireframeShader.mixin(VertexWorldShadowShaderSource);
    }
    WireframeShader.mixin(WireframeShaderSource);

    this._unfoldUVRatio = void 0;

    this._AABB = null;

  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    let isWifeframe = false;
    let isWireframeOnShade = false;
    let wireframeWidth = 0.0;
    let wireframeWidthRelativeScale = 0.0;

    if (typeof material.isWireframe !== 'undefined') {
      isWifeframe = material.isWireframe;
      isWireframeOnShade = material.isWireframeOnShade;
      wireframeWidth = material.wireframeWidth;
      wireframeWidthRelativeScale = material.wireframeWidthRelativeScale;
    }

    let uniformLocationIsWireframe = material.getUniform(glslProgram, 'uniform_isWireframe');
    if (uniformLocationIsWireframe) {
      this._glContext.uniform1i(uniformLocationIsWireframe, isWifeframe, true);
    }
    if (isWifeframe && !isWireframeOnShade) {
      material._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_opacity'), 0.0, true);
    }
    let uniformLocationWireframeWidth = material.getUniform(glslProgram, 'uniform_wireframeWidth');
    if (uniformLocationWireframeWidth) {
      this._glContext.uniform1f(uniformLocationWireframeWidth, wireframeWidth, true);
    }
    let uniformLocationWireframeWidthRelativeScale = material.getUniform(glslProgram, 'uniform_wireframeWidthRelativeScale');
    if (uniformLocationWireframeWidthRelativeScale) {
      this._glContext.uniform1f(uniformLocationWireframeWidthRelativeScale, wireframeWidthRelativeScale, true);
    }

    let AABB = (this._AABB !== null) ? this._AABB : mesh.geometry.AABB;

    let uniformLocationAABBLengthCenterToCorner = material.getUniform(glslProgram, 'uniform_AABBLengthCenterToCorner');
    if (uniformLocationAABBLengthCenterToCorner) {
      this._glContext.uniform1f(uniformLocationAABBLengthCenterToCorner, AABB.lengthCenterToCorner, true);
    }
    let uniformLocationAABBCenterPositionAndRatio = material.getUniform(glslProgram, 'uniform_AABBCenterPositionAndRatio');
    if (uniformLocationAABBCenterPositionAndRatio) {
      let unfoldUVRatioParameter = this.getShaderParameter(material, 'unfoldUVRatio', 0.0);
      this._glContext.uniform4f(uniformLocationAABBCenterPositionAndRatio, AABB.centerPoint.x, AABB.centerPoint.y, AABB.centerPoint.z, unfoldUVRatioParameter, true);
    }

    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

    let uniformLocationDepthBias = material.getUniform(glslProgram, 'uniform_depthBias');
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
