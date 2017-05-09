import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';
import DecalShader from './DecalShader';

export class DepthDisplayShaderSource {

  VSTransform_DepthDisplayShaderSource(existCamera_f, f) {
    let shaderText = '';
    if (Shader._exist(f, GLBoost.TEXCOORD)) {
      shaderText += '  texcoord.y = 1.0 - texcoord.y;\n';
    }
    return shaderText;
  }

  FSShade_DepthDisplayShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(surfaceColor.r, surfaceColor.r, surfaceColor.r, 1.0);\n';

    //shaderText += '  rt0.a = 1.0;\n';
    //shaderText += '  rt0 = vec4(position.xyz, 1.0);\n';


    return shaderText;
  }
}



export default class DepthDisplayShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    DepthDisplayShader.mixin(DepthDisplayShaderSource);
  }
}

GLBoost['DepthDisplayShader'] = DepthDisplayShader;
