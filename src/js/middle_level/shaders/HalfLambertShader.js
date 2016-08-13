import DecalShader from './DecalShader';

export class HalfLambertShaderSource {

  FSDefine_HalfLambertShaderSource(in_, f, lights) {
    var shaderText = '';
    shaderText += `uniform vec4 Kd;\n`;

    return shaderText;
  }

  FSShade_HalfLambertShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';

    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
    shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
    shaderText += '    float halfLambert = max(dot(light, normal), 0.0)*0.5+0.5;\n';
    shaderText += '    float diffuse = halfLambert*halfLambert;\n';
    shaderText += '    rt0 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
    shaderText += '  }\n';
//    shaderText += '  rt0 *= (1.0 - shadowRatio);\n';
    //shaderText += '  rt0.a = 1.0;\n';
    //shaderText += '  rt0 = vec4(position.xyz, 1.0);\n';


    return shaderText;
  }

  prepare_HalfLambertShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {

    var vertexAttribsAsResult = [];

    shaderProgram.Kd = gl.getUniformLocation(shaderProgram, 'Kd');

    return vertexAttribsAsResult;
  }
}



export default class HalfLambertShader extends DecalShader {
  constructor(glBoostContext, basicShader) {

    super(glBoostContext, basicShader);
    HalfLambertShader.mixin(HalfLambertShaderSource);
  }

  setUniforms(gl, glslProgram, material) {
    super.setUniforms(gl, glslProgram, material);

    var Kd = material.diffuseColor;
    gl.uniform4f(glslProgram.Kd, Kd.x, Kd.y, Kd.z, Kd.w);
  }
}

GLBoost['HalfLambertShader'] = HalfLambertShader;
