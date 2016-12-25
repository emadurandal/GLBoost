import Shader from '../../low_level/shaders/Shader';
import Vector2 from '../../low_level/math/Vector2';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export default class FreeShader extends Shader {
  constructor(glBoostContext, vertexShaderText, fragmentShaderText, attributes, uniforms, textureNames) {
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
    this._textureNames = textureNames;
  }

  _getVertexShaderString(gl, functions, existCamera_f, lights, material, extraData) {
    return this._vertexShaderText;
  }

  _getFragmentShaderString(gl, functions, lights, material, extraData) {
    return this._fragmentShaderText;
  }

  _prepareAssetsForShaders(gl, shaderProgram, vertexAttribs, existCamera_f, lights, material, extraData) {
    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, this._attributes[attribName]);
      if (shaderProgram['vertexAttribute_' + attribName] >= 0) {
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    let textureCount = 0;
    gl.useProgram(shaderProgram);

    for (let uniformName in this._uniforms) {
      if (this._uniforms[uniformName] === 'TEXTURE') {
        material.uniformTextureSamplerDic[uniformName] = {};
        let textureUniformLocation = gl.getUniformLocation(shaderProgram, uniformName);
        if (textureUniformLocation < 0) {
          continue;
        }
        material.uniformTextureSamplerDic[uniformName].uniformLocation = textureUniformLocation;
        material.uniformTextureSamplerDic[uniformName].textureName = this._textureNames[uniformName];
        material.uniformTextureSamplerDic[uniformName].textureUnitIndex = textureCount;

        gl.uniform1i(material.uniformTextureSamplerDic[uniformName].uniformLocation, textureCount);

        textureCount++;
      }

      switch (this._uniforms[uniformName]) {
        case 'MODELVIEW':
        case 'MODELVIEWINVERSETRANSPOSE':
        case 'PROJECTION':
        case 'JOINTMATRIX':
          material['uniform_' + uniformName] = gl.getUniformLocation(shaderProgram, uniformName);
        case 'TEXTURE':
          if (typeof material._semanticsDic[this._uniforms[uniformName]] === 'undefined') {
            material._semanticsDic[this._uniforms[uniformName]] = uniformName;
          } else if (typeof material._semanticsDic[this._uniforms[uniformName]] === 'string') {
            let tmpSemanticsStr = material._semanticsDic[this._uniforms[uniformName]];
            material._semanticsDic[this._uniforms[uniformName]] = [];
            material._semanticsDic[this._uniforms[uniformName]].push(tmpSemanticsStr);
            material._semanticsDic[this._uniforms[uniformName]].push(uniformName);
          } else {
            // it must be Array
            material._semanticsDic[this._uniforms[uniformName]].push(uniformName);
          }
          continue;
      }

      material['uniform_' + uniformName] = gl.getUniformLocation(shaderProgram, uniformName);

    }

    return vertexAttribsAsResult;
  }

  get attributes() {
    return this._attributes;
  }

  setUniforms(gl, glslProgram, material) {

    for (let uniformName in this._uniforms) {
      let value = this._uniforms[uniformName];

      if (typeof value === 'number') {
        gl.uniform1f(material['uniform_' + uniformName], value);
      } else if (value instanceof Vector2) {
        gl.uniform2f(material['uniform_' + uniformName], value.x, value.y);
      } else if (value instanceof Vector3) {
        gl.uniform3f(material['uniform_' + uniformName], value.x, value.y, value.z);
      } else if (value instanceof Vector4) {
        gl.uniform4f(material['uniform_' + uniformName], value.x, value.y, value.z, value.w);
      }
    }
  }
}

GLBoost['FreeShader'] = FreeShader;
