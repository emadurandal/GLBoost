import Shader from '../../low_level/shaders/Shader';
import Vector2 from '../../low_level/math/Vector2';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export default class FreeShader extends Shader {
  constructor(glBoostContext, vertexShaderText, fragmentShaderText, attributes, uniforms) {
    super(glBoostContext);

    this._vertexShaderText = vertexShaderText;
    this._fragmentShaderText = fragmentShaderText;

    let newAttributes = {};
    for (let attributeName in attributes) {
      switch (attributes[attributeName]) {
        case 'POSITION':
          newAttributes.position = attributeName;
          break;
        case 'NORMAL':
          newAttributes.normal = attributeName;
          break;
        case 'COLOR':
          newAttributes.color = attributeName;
          break;
        case 'TEXCOORD_0':
          newAttributes.texcoord = attributeName;
          break;
        case 'JOINT':
          newAttributes.joint = attributeName;
          break;
        case 'WEIGHT':
          newAttributes.weight = attributeName;
          break;
        default:
          newAttributes[attributes[attributeName]] = attributeName;
          break;
      }
    }

    this._attributes = newAttributes;
    this._uniforms = uniforms;
  }

  _getVertexShaderString(gl, functions, existCamera_f, lights, material, extraData) {
    return this._vertexShaderText;
  }

  _getFragmentShaderString(gl, functions, lights, material, extraData) {
    return this._fragmentShaderText;
  }

  _prepareAssetsForShaders(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {
    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, this._attributes[attribName]);
      if (shaderProgram['vertexAttribute_' + attribName] >= 0) {
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    for (let uniformName in this._uniforms) {
      if (this._uniforms[uniformName] === 'TEXTURE') {
        shaderProgram.uniformTextureSampler_0 = gl.getUniformLocation(shaderProgram, uniformName);
        // set texture unit 0 to the sampler
        gl.uniform1i(shaderProgram.uniformTextureSampler_0, 0);

        continue;
      }

      switch (this._uniforms[uniformName]) {
        case 'MODELVIEW':
        case 'MODELVIEWINVERSETRANSPOSE':
        case 'PROJECTION':
        case 'JOINTMATRIX':
          if (typeof shaderProgram._semanticsDic[this._uniforms[uniformName]] === 'undefined') {
            shaderProgram._semanticsDic[this._uniforms[uniformName]] = uniformName;
          } else if (typeof shaderProgram._semanticsDic[this._uniforms[uniformName] === 'string'] ) {
            let tmpSemanticsStr = shaderProgram._semanticsDic[this._uniforms[uniformName]];
            shaderProgram._semanticsDic[this._uniforms[uniformName]] = [];
            shaderProgram._semanticsDic[this._uniforms[uniformName]].push(tmpSemanticsStr);
            shaderProgram._semanticsDic[this._uniforms[uniformName]].push(uniformName);
          } else {
            // it must be Array
            shaderProgram._semanticsDic[this._uniforms[uniformName]].push(uniformName);
          }
          shaderProgram[uniformName] = gl.getUniformLocation(shaderProgram, uniformName);
          continue;
      }
    }

    return vertexAttribsAsResult;
  }

  get attributes() {
    return this._attributes;
  }

  setUniforms(gl, glslProgram, material) {

    for (let uniformName in this._uniforms) {
      glslProgram['uniform_' + uniformName] = gl.getUniformLocation(glslProgram, uniformName);
      let value = this._uniforms[uniformName];

      gl.useProgram(glslProgram);

      if (typeof value === 'number') {
        gl.uniform1f(glslProgram['uniform_' + uniformName], value);
      } else if (value instanceof Vector2) {
        gl.uniform2f(glslProgram['uniform_' + uniformName], value.x, value.y);
      } else if (value instanceof Vector3) {
        gl.uniform3f(glslProgram['uniform_' + uniformName], value.x, value.y, value.z);
      } else if (value instanceof Vector4) {
        gl.uniform4f(glslProgram['uniform_' + uniformName], value.x, value.y, value.z, value.w);
      }
    }
  }
}

GLBoost['FreeShader'] = FreeShader;
