import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';

export class FragmentSimpleShaderSource {
  // In the context within these member methods,
  // this is the instance of the corresponding shader class.

  VSTransform_FragmentSimpleShaderSource(existCamera_f, f) {
    var shaderText = '';

    if (existCamera_f) {
      shaderText +=   '  mat4 pvMatrix = projectionMatrix * viewMatrix;\n';
      shaderText +=   '  gl_Position = pvMatrix * position_world;\n';
    } else {
      shaderText +=   '  gl_Position = position_world;\n';
    }

    return shaderText;
  }

  FSDefine_FragmentSimpleShaderSource(in_, f) {
    let shaderText =      'uniform float opacity;\n';
    return shaderText;
  }

  FSShade_FragmentSimpleShaderSource(f, gl) {
    let shaderText =   `rt0 = vec4(1.0, 1.0, 1.0, opacity);\n`;

    return shaderText;
  }

  prepare_FragmentSimpleShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram, 'uniform_opacity', this._glContext.getUniformLocation(shaderProgram, 'opacity'));

    return vertexAttribsAsResult;
  }
}

export default class FragmentSimpleShader extends Shader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext);

    FragmentSimpleShader.mixin(basicShader);
    FragmentSimpleShader.mixin(FragmentSimpleShaderSource);
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);

  }
}


GLBoost['FragmentSimpleShader'] = FragmentSimpleShader;
