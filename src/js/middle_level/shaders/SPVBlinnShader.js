import SkeletalShader from './SkeletalShader';
import GLBoost from '../../globals';
import Shader from '../../low_level/shaders/Shader';
import VertexWorldShaderSource from './VertexWorldShader';
import WireframeShader from './WireframeShader';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Matrix44 from '../../low_level/math/Matrix44';


export class SPVBlinnShaderSource {
  FSDefine_SPVBlinnShaderSource(in_, f, lights) {
    let shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;

    var sampler2D = this._sampler2DShadow_func();
    shaderText += `uniform mediump ${sampler2D} uDepthTexture[${lights.length}];\n`;
    shaderText += `uniform int isShadowCasting[${lights.length}];\n`;
    shaderText += `uniform bool toUseSurfaceColorAsSpecularMap;\n`;

    return shaderText;
  }

  FSMethodDefine_SPVBlinnShaderSource(in_, f, lights, material, extraData) {
    
  }

  FSShade_SPVBlinnShaderSource(f, gl, lights, material, extraData) {
    var textureProjFunc = Shader._textureProj_func(gl);

    var shaderText = '';
    shaderText += '  float depthBias = 0.005;\n';
    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += Shader._getNormalStr(gl, material, f);

    for (let i=0; i<lights.length; i++) {
      let isShadowEnabledAsTexture = (lights[i].camera && lights[i].camera.texture) ? true:false;
      shaderText += `  {\n`;
      shaderText += `    vec3 lightDirection = normalize(v_lightDirection[${i}]);\n`;
      shaderText +=      Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
      shaderText += `    float diffuse = max(dot(lightDirection, normal), 0.0);\n`;
      shaderText += `    rt0 += vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[${i}] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n`;
      shaderText += `    vec3 viewDirection = normalize(v_viewDirection);\n`;
      shaderText += `    vec3 reflect = reflect(-lightDirection, normal);\n`;

      shaderText += `    float specular = pow(max(dot(reflect, viewDirection), 0.0), power);\n`;
      shaderText += `    if (toUseSurfaceColorAsSpecularMap) {\n`;
      shaderText += `      specular *= grayscale(surfaceColor) + 0.5;\n`;
      shaderText += `    };\n`;


      shaderText += `    vec4 enlighten = Ks * lightDiffuse[${i}];\n`;
      shaderText += `    enlighten *= vec4(specular, specular, specular, 0.0);\n`;
      shaderText += `    enlighten *= vec4(visibilitySpecular, visibilitySpecular, visibilitySpecular, 1.0);\n`;
      shaderText += `    rt0 += enlighten;\n`;
      shaderText += `  }\n`;
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
      //shaderText += '  rt0.a = 1.0;\n';
    }


    return shaderText;
  }

  prepare_SPVBlinnShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

    var vertexAttribsAsResult = [];

    material.setUniform(shaderProgram.hashId, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
    material.setUniform(shaderProgram.hashId, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
    material.setUniform(shaderProgram.hashId, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));
    material.setUniform(shaderProgram.hashId, 'uniform_toUseSurfaceColorAsSpecularMap', this._glContext.getUniformLocation(shaderProgram, 'toUseSurfaceColorAsSpecularMap'));

    return vertexAttribsAsResult;
  }
}

export default class SPVBlinnShader extends SPVDecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);

    SPVBlinnShader.mixin(SPVBlinnShaderSource);

  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);


  }
}
