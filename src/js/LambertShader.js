import Shader from './Shader'
import SimpleShader from './SimpleShader'

export class LambertShaderSource {
  VSDefine_LambertShaderSource(in_, out_, f, lights) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 normal;\n`;
    }
    shaderText += `${out_} vec4 position;\n`;
    shaderText += 'uniform mat4 modelViewMatrix;\n';
    shaderText += 'uniform mat3 invNormalMatrix;\n';
    shaderText += `uniform vec3 lightPosition[${lights.length}];\n`;
    shaderText += `${out_} vec3 lightPos[${lights.length}];\n`;

    return shaderText;
  }

  VSTransform_LambertShaderSource(existCamera_f, f, lights) {
    var shaderText = '';
    shaderText += '  position = modelViewMatrix * vec4(aVertex_position, 1.0);\n';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      if (existCamera_f) {
        shaderText += '  normal = normalize(invNormalMatrix * aVertex_normal);\n';
      } else {
        shaderText += '  normal = aVertex_normal;\n';
      }
    }
    for(let i=0; i<lights.length; i++) {
      if (existCamera_f) {
        shaderText += `  lightPos[${i}] = mat3(modelViewMatrix) * lightPosition[${i}];\n`;
      } else {
        shaderText += `  lightPos[${i}] = lightPosition[${i}];\n`;
      }
    }
    return shaderText;
  }

  FSDefine_LambertShaderSource(in_, f, lights) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 normal;\n`;
    }
    shaderText += `${in_} vec4 position;\n`;
    shaderText += `${in_} vec3 lightPos[${lights.length}];\n`;
    shaderText += `uniform vec4 lightDiffuse[${lights.length}];\n`;

    return shaderText;
  }

  FSShade_LambertShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt1;\n';
    shaderText += '  rt1 = vec4(0.0, 0.0, 0.0, 1.0);\n';
    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    shaderText += '    vec3 light = normalize(lightPos[i] - position.xyz);\n';
    shaderText += '    float diffuse = dot(light, normal);\n';
    shaderText += '    rt1.rgb += lightDiffuse[i].rgb * diffuse * surfaceColor.rgb;\n';
    shaderText += '  }\n';
    //shaderText += '  rt1.a = 1.0;\n';
    //shaderText += '  rt1 = vec4(position.xyz, 1.0);\n';


    return shaderText;
  }

  prepare_LambertShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.NORMAL) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    if (existCamera_f) {
      shaderProgram.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'modelViewMatrix');
      shaderProgram.invNormalMatrix = gl.getUniformLocation(shaderProgram, 'invNormalMatrix');
    }
    for(let i=0; i<lights.length; i++) {
      shaderProgram['lightPosition_'+i] = gl.getUniformLocation(shaderProgram, `lightPosition[${i}]`);
      shaderProgram['lightDiffuse_'+i] = gl.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`);
    }

    return vertexAttribsAsResult;
  }
}



export default class LambertShader extends SimpleShader {
  constructor(canvas) {

    super(canvas);
    LambertShader.mixin(LambertShaderSource);
  }

}
