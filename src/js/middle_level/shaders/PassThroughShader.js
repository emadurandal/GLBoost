import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import VertexWorldShadowShaderSource from './VertexWorldShadowShader';

export class PassThroughShaderSource {

  VSDefine_PassThroughShaderSource(in_, out_, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 aVertex_color;\n`;
      shaderText += `${out_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 aVertex_texcoord;\n`;
      shaderText += `${out_} vec2 texcoord;\n`;
    }

    shaderText += `${in_} vec3 aVertex_barycentricCoord;\n`;
    shaderText += `${out_} vec3 barycentricCoord;\n`;

    return shaderText;
  }

  VSTransform_PassThroughShaderSource(existCamera_f, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += '  color = aVertex_color;\n';
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord = aVertex_texcoord;\n';
    }
    
    if (existCamera_f) {
      shaderText +=   '  gl_Position = projectionMatrix * viewMatrix * position_world;\n';
    } else {
      shaderText +=   '  gl_Position = position_world;\n';
    }
    
    shaderText += '  barycentricCoord = aVertex_barycentricCoord;\n';

    
    return shaderText;
  }

  VSTransform_FragmentSimpleShaderSource(existCamera_f, f) {
    var shaderText = '';


    return shaderText;
  }

  FSDefine_PassThroughShaderSource(in_, f) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.COLOR)) {
      shaderText += `${in_} vec4 color;\n`;
    }
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += `${in_} vec2 texcoord;\n\n`;
    }

    return shaderText;
  }

  FSShade_PassThroughShaderSource(f, gl) {

    var shaderText = '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';
    return shaderText;
  }

  prepare_PassThroughShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    return vertexAttribsAsResult;
  }
}

export default class PassThroughShader extends Shader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext);

    PassThroughShader.mixin(basicShader);
    PassThroughShader.mixin(PassThroughShaderSource);
  }
  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);
  }
}


GLBoost['PassThroughShader'] = PassThroughShader;
