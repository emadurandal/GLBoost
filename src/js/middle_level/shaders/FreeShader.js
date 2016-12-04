import Shader from '../../low_level/shaders/Shader';

export default class FreeShader extends Shader {
  constructor(glBoostContext, vertexShaderText, fragmentShaderText) {
    super(glBoostContext);

  }

  setUniforms(gl, glslProgram, material) {

    var baseColor = material.baseColor;
    gl.uniform4f(glslProgram.materialBaseColor, baseColor.x, baseColor.y, baseColor.z, baseColor.w);
  }
}

GLBoost['FreeShader'] = FreeShader;
