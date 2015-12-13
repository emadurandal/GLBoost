import Shader from './Shader'
import SimpleShader from './SimpleShader'

export class PhongShaderSource {
  VSDefine_PhongShaderSource(in_, out_, f, lights) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 normal;\n`;
    }
    shaderText += `${out_} vec4 position;\n`;
    return shaderText;
  }

  VSTransform_PhongShaderSource(existCamera_f, f, lights) {
    var shaderText = '';
    shaderText += '  position = vec4(aVertex_position, 1.0);\n';
    shaderText += '  normal = aVertex_normal;\n';

    return shaderText;
  }

  FSDefine_PhongShaderSource(in_, f, lights) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 normal;\n`;
    }
    shaderText += `${in_} vec4 position;\n`;
    shaderText += `uniform vec3 viewPosition;\n`;
    shaderText += `uniform vec4 lightPosition[${lights.length}];\n`;
    shaderText += `uniform vec4 lightDiffuse[${lights.length}];\n`;
    shaderText += `uniform float Kd;\n`;
    shaderText += `uniform float Ks;\n`;
    shaderText += `uniform float power;\n`;

    return shaderText;
  }

  FSShade_PhongShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt1;\n';
    shaderText += '  rt1 = vec4(0.0, 0.0, 0.0, 1.0);\n';

    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
    shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
    shaderText += '    float diffuse = max(dot(light, normal), 0.0);\n';
    shaderText += '    rt1.rgb += Kd * lightDiffuse[i].rgb * diffuse * surfaceColor.rgb;\n';
    shaderText += '    vec3 view = normalize(viewPosition - position.xyz);\n';
    shaderText += '    vec3 reflect = -view + 2.0 * dot(normal, view) * normal;\n';
    shaderText += '    float specular = pow(max(dot(light, reflect), 0.0), power);\n';
    shaderText += '    rt1.rgb += Ks * lightDiffuse[i].rgb * specular;\n';
    shaderText += '  }\n';
    //shaderText += '  rt1.a = 1.0;\n';
    //shaderText += '  rt1 = vec4(position.xyz, 1.0);\n';


    return shaderText;
  }

  prepare_PhongShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {

    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (attribName === GLBoost.NORMAL) {
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    shaderProgram.Kd = gl.getUniformLocation(shaderProgram, 'Kd');
    shaderProgram.Ks = gl.getUniformLocation(shaderProgram, 'Ks');
    shaderProgram.power = gl.getUniformLocation(shaderProgram, 'power');

    lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);

    shaderProgram['viewPosition'] = gl.getUniformLocation(shaderProgram, 'viewPosition');

    for(let i=0; i<lights.length; i++) {
      shaderProgram['lightPosition_'+i] = gl.getUniformLocation(shaderProgram, `lightPosition[${i}]`);
      shaderProgram['lightDiffuse_'+i] = gl.getUniformLocation(shaderProgram, `lightDiffuse[${i}]`);
    }

    return vertexAttribsAsResult;
  }
}



export default class PhongShader extends SimpleShader {
  constructor(canvas) {

    super(canvas);
    PhongShader.mixin(PhongShaderSource);

    this._Kd = 0.8;
    this._Ks = 0.5;
    this._power = 5.0;

  }

  setUniforms(gl, glslProgram) {
    gl.uniform1f(glslProgram.Kd, this._Kd);
    gl.uniform1f(glslProgram.Ks, this._Ks);
    gl.uniform1f(glslProgram.power, this._power);
  }

  set Kd(value) {
    this._Kd = value;
  }

  get Kd() {
    return this._Kd;
  }

  set Ks(value) {
    this._Ks = value;
  }

  get Ks() {
    return this._Ks;
  }

  set power(value) {
    this._power = value;
  }

  get power() {
    return this._power;
  }
}

GLBoost["PhongShader"] = PhongShader;
