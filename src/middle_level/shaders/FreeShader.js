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

  _prepareAssetsForShaders(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
    var vertexAttribsAsResult = [];

    vertexAttribs.forEach((attribName)=>{
      shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, this._attributes[attribName]);
      if (shaderProgram['vertexAttribute_' + attribName] >= 0) {
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
        vertexAttribsAsResult.push(attribName);
      }
    });

    let textureCount = 0;
    this._glContext.useProgram(shaderProgram);

    for (let uniformName in this._uniforms) {
      if (this._uniforms[uniformName] === 'TEXTURE') {
        material.uniformTextureSamplerDic[uniformName] = {};
        let textureUniformLocation = this._glContext.getUniformLocation(shaderProgram, uniformName);
        if (textureUniformLocation < 0) {
          continue;
        }
        material.uniformTextureSamplerDic[uniformName].textureName = this._textureNames[uniformName];
        material.uniformTextureSamplerDic[uniformName].textureUnitIndex = textureCount;

        this._glContext.uniform1i(textureUniformLocation, textureCount, true);

        textureCount++;
      }

      switch (this._uniforms[uniformName]) {
        case 'WORLD':
        case 'VIEW':
        case 'MODELVIEW':
        case 'MODELVIEWINVERSETRANSPOSE':
        case 'PROJECTION':
        case 'JOINTMATRIX':
          material.setUniform(shaderProgram, 'uniform_' + uniformName, this._glContext.getUniformLocation(shaderProgram, uniformName));
        case 'TEXTURE':
          material.addSemanticsDic(this._uniforms[uniformName], uniformName);
          continue;
      }

      material.setUniform(shaderProgram, 'uniform_' + uniformName, this._glContext.getUniformLocation(shaderProgram, uniformName));

    }

    return vertexAttribsAsResult;
  }

  get attributes() {
    return this._attributes;
  }

  setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
    super.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);
    
    for (let uniformName in this._uniforms) {
      let value = this._uniforms[uniformName];

      if (typeof value === 'number') {
        this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_' + uniformName), value, true);
      } else if (value instanceof Vector2) {
        this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, true);
      } else if (value instanceof Vector3) {
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, value.z, true);
      } else if (value instanceof Vector4) {
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, value.z, value.w, true);
      }
    }

    for (let parameterName in material.shaderParameters) {
      let value = material.shaderParameters[parameterName];

      if (typeof value === 'number') {
        this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_' + parameterName), value, true);
      } else if (value instanceof Vector2) {
        this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_' + parameterName), value.x, value.y, true);
      } else if (value instanceof Vector3) {
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_' + parameterName), value.x, value.y, value.z, true);
      } else if (value instanceof Vector4) {
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_' + parameterName), value.x, value.y, value.z, value.w, true);
      }
    }
  }
}

GLBoost['FreeShader'] = FreeShader;
