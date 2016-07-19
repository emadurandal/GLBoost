import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';

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

  prepare_DecalShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f) {

    var vertexAttribsAsResult = [];
    /*
    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.COLOR || attribName === GLBoost.TEXCOORD) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });
    */
    return vertexAttribsAsResult;
  }
}

export default class PassThroughShader extends Shader {
  constructor(glBoostContext, basicShader = VertexWorldShaderSource) {

    super(glBoostContext);

    PassThroughShader.mixin(basicShader);
    PassThroughShader.mixin(PassThroughShaderSource);
  }

}


GLBoost['PassThroughShader'] = PassThroughShader;
