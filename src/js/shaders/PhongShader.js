import Shader from './Shader';
import SimpleShader from './SimpleShader';

export class PhongShaderSource {
  VSDefine_PhongShaderSource(in_, out_, f, lights) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 aVertex_normal;\n`;
      shaderText += `${out_} vec3 v_normal;\n`;
    }
    shaderText += `${out_} vec4 position;\n`;
    return shaderText;
  }

  VSTransform_PhongShaderSource(existCamera_f, f, lights) {
    var shaderText = '';
    shaderText += '  position = vec4(aVertex_position, 1.0);\n';
    shaderText += '  v_normal = aVertex_normal;\n';

    return shaderText;
  }

  FSDefine_PhongShaderSource(in_, f, lights) {
    var shaderText = '';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `${in_} vec3 v_normal;\n`;
    }
    shaderText += `${in_} vec4 position;\n`;
    shaderText += `uniform vec3 viewPosition;\n`;
    shaderText += `uniform vec4 lightPosition[${lights.length}];\n`;
    shaderText += `uniform vec4 lightDiffuse[${lights.length}];\n`;
    shaderText += `uniform vec4 Kd;\n`;
    shaderText += `uniform vec4 Ks;\n`;
    shaderText += `uniform float power;\n`;

    return shaderText;
  }

  FSShade_PhongShaderSource(f, gl, lights) {
    var shaderText = '';

    shaderText += '  vec4 surfaceColor = rt0;\n';
    shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';
    shaderText += '  vec3 normal = normalize(v_normal);\n';

    shaderText += `  for (int i=0; i<${lights.length}; i++) {\n`;
    // if PointLight: lightPosition[i].w === 1.0      if DirectionalLight: lightPosition[i].w === 0.0
    shaderText += '    vec3 light = normalize(lightPosition[i].xyz - position.xyz * lightPosition[i].w);\n';
    shaderText += '    float diffuse = max(dot(light, normal), 0.0);\n';
    shaderText += '    rt0 += Kd * lightDiffuse[i] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
    shaderText += '    vec3 view = normalize(viewPosition - position.xyz);\n';
    shaderText += '    vec3 reflect = -view + 2.0 * dot(normal, view) * normal;\n';
    shaderText += '    float specular = pow(max(dot(light, reflect), 0.0), power);\n';
    shaderText += '    rt0 += Ks * lightDiffuse[i] * vec4(specular, specular, specular, 0.0);\n';
    shaderText += '  }\n';
    //shaderText += '  rt0.a = 1.0;\n';
    //shaderText += '  rt0 = vec4(position.xyz, 1.0);\n';


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
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {

    super(canvas);
    PhongShader.mixin(PhongShaderSource);

    this._power = 5.0;

  }

  setUniforms(gl, glslProgram, material) {
    super.setUniforms(gl, glslProgram, material);

    var Kd = material.diffuseColor;
    var Ks = material.specularColor;
    gl.uniform4f(glslProgram.Kd, Kd.x, Kd.y, Kd.z, Kd.w);
    gl.uniform4f(glslProgram.Ks, Ks.x, Ks.y, Ks.z, Ks.w);
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

GLBoost['PhongShader'] = PhongShader;
