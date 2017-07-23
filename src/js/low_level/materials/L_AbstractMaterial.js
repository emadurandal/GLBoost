import GLBoost from '../../globals';
import AbstractTexture from '../textures/AbstractTexture';
import Vector4 from '../math/Vector4';
import DecalShader from '../../middle_level/shaders/DecalShader';
import GLBoostObject from '../core/GLBoostObject';

export default class L_AbstractMaterial extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    if (this.constructor === L_AbstractMaterial) {
      throw new TypeError('Cannot construct L_AbstractMaterial instances directly.');
    }

    this._textureDic = {};
    this._texturePurposeDic = [];
    this._textureContributionRateDic = {};
    this._gl = this._glContext.gl;
    this._baseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._diffuseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._specularColor = new Vector4(0.5, 0.5, 0.5, 1.0);
    this._ambientColor = new Vector4(0.0, 0.0, 0.0, 1.0);
    this._name = '';
    this._shaderClass = DecalShader;
    this._shaderInstance = null;
    this._vertexNofGeometries = {};
    this._states = null;
    this._shaderUniformLocationsOfExpressions = {};
    this._isVisibleForGeometiesAssginedByThisMaterial = true;
    this._globalStatesUsage = null;
    this._shaderParametersForShaderInstance = {};
    this._semanticsDic = {};

    this._stateFunctionsToReset = {
      "blendColor": [0.0, 0.0, 0.0, 0.0],
      "blendEquationSeparate": [
        32774,
        32774
      ],
      "blendFuncSeparate": [1, 0, 1, 0],
      "colorMask": [true, true, true, true],
      "cullFace": [1029],
      "depthFunc": [513],
      "depthMask": [true],
      "depthRange": [0.0, 1.0],
      "frontFace": [2305],
      "lineWidth": [1.0],
      "polygonOffset": [0.0, 0.0]
    };

    this._countOfUpdate = 0;
  }

  clone() {
    var material = new ClassicMaterial(this._glBoostContext);
    material._baseColor = this._baseColor;
    material._diffuseColor = this._diffuseColor;
    material._specularColor = this._specularColor;
    material._ambientColor = this._ambientColor;
    material._shaderClass = this._shaderClass;
    material._shaderInstance = this._shaderInstance;

    for (let geom in this._vertexNofGeometries) {
      material._vertexNofGeometries[geom] = this._vertexNofGeometries[geom];
    }

    return material;
  }

  _updateCount() {
    this._countOfUpdate += 1;
  }

  getUpdateStateString() {
    return this.toString() + '_updateCount_' + this._countOfUpdate;
  }

  setShaderClassWithForceUpdate(shaderClass) {
    this._shaderClass = shaderClass;
    if (this._shaderInstance) {
      this._shaderInstance.readyForDiscard();
    }
    this._shaderInstance = null;
  }

  set shaderClass(shaderClass) {
    if (this._shaderClass === shaderClass) {
      return;
    }
    this.setShaderClassWithForceUpdate(shaderClass);
  }

  get shaderClass() {
    return this._shaderClass;
  }

  set shaderInstance(shaderInstance) {
    this._shaderInstance = shaderInstance;
    this._updateCount();
  }

  get shaderInstance() {
    return this._shaderInstance;
  }

  setTexture(texture, purpose) {
    if (!texture) {
      return;
    }
    this._textureDic[texture.userFlavorName] = texture;
    let index = (typeof purpose !== 'undefined' ? purpose:GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    this._texturePurposeDic[index] = texture.userFlavorName;
    this._textureContributionRateDic[texture.userFlavorName] = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._updateCount();
  }

  removeTexture(userFlavorName) {
    delete this._textureDic[userFlavorName];
    delete this._textureContributionRateDic[userFlavorName];
    this._updateCount();
  }

  setTexturePurpose(userFlavorNameOfTexture, purpose) {
    this._texturePurposeDic[purpose] = userFlavorNameOfTexture;
    this._updateCount();
  }

  getTexture(userFlavorName) {
    return this._textureDic[userFlavorName];
  }

  getTextureFromPurpose(purpose) {
    let userFlavorName = this._texturePurposeDic[purpose];
    return this.getTexture(userFlavorName);
  }

  getOneTexture() {
    for (let userFlavorName in this._textureDic) {
      return this._textureDic[userFlavorName];
    }
    return null;
  }

  getTextureNum() {
    let count = 0;
    for (let userFlavorName in this._textureDic) {
      if (this._textureDic[userFlavorName] instanceof AbstractTexture) {
        count += 1;
      }
    }
    return count;
  }

  getTextureUserFlavorNames() {
    return Object.keys(this._textureDic);
  }

  setAllTextureContributionRate(rateVec4) {
    for (let userFlavorName in this._textureContributionRateDic) {
      this._textureContributionRateDic[userFlavorName] = rateVec4;
    }
    this._updateCount();
  }

  setTextureContributionRate(textureUserFlavorName, rateVec4) {
    this._textureContributionRateDic[textureUserFlavorName] = rateVec4;
    this._updateCount();
  }

  getTextureContributionRate(textureUserFlavorName) {
    return this._textureContributionRateDic[textureUserFlavorName];
  }


  hasAnyTextures() {
    let result = false;
    for (let userFlavorName in this._textureDic) {
      result = true;
    }

    return result;
  }

  set baseColor(vec) {
    if (!vec) {
      return;
    }

    this._baseColor = vec;
    this._updateCount();
  }

  get baseColor() {
    return this._baseColor;
  }

  set diffuseColor(vec) {
    if (!vec) {
      return;
    }

    this._diffuseColor = vec;
    this._updateCount();
  }

  get diffuseColor() {
    return this._diffuseColor;
  }

  set specularColor(vec) {
    if (!vec) {
      return;
    }

    this._specularColor = vec;
    this._updateCount();
  }

  get specularColor() {
    return this._specularColor;
  }

  set ambientColor(vec) {
    if (!vec) {
      return;
    }

    this._ambientColor = vec;
    this._updateCount();
  }

  get ambientColor() {
    return this._ambientColor;
  }

  set states(states) {
    this._states = states;
    this._updateCount();
  }

  get states() {
    return this._states;
  }

  isTransparent() {
    let isTransparent = false;
    if (this._states) {
      if (this._states.enable) {
        this._states.enable.forEach((state) => {
          if (state === 3042) {
            isTransparent = true;
          }
        });
      }
    }

    return isTransparent;
  }

  set name(name) {
    this._name = name;
    this._updateCount();
  }

  get name() {
    return this._name;
  }

  setVertexN(geom, num) {
    this._vertexNofGeometries[geom] = num;
    this._updateCount();
  }

  getVertexN(geom) {
    return (typeof this._vertexNofGeometries[geom] === 'undefined') ? 0 : this._vertexNofGeometries[geom];
  }

  /**
   * [en] bind the texture. For any value, it returns true if we call WebGL's bindTexture function, false otherwise.<br />
   * [ja] テクスチャをバインドします。どんな値にせよ、WebGLのbindTexture関数を呼んだ場合はtrueを、そうでなければfalseを返します。
   */
  setUpTexture(textureName, textureUnitIndex) {
    var gl = this._gl;
    let texture = this.getTexture(textureName);
    let isCalledWebGLBindTexture = true;

    if (texture) {
      isCalledWebGLBindTexture = texture.setUp(textureUnitIndex);
      return isCalledWebGLBindTexture;
    } else {
      this._glBoostContext.defaultDummyTexture.setUp(0);

//      gl.bindTexture(gl.TEXTURE_2D, null);
      isCalledWebGLBindTexture = true;
      return isCalledWebGLBindTexture;
    }
  }

  tearDownTexture(textureName, textureUnitIndex) {
    let texture = this.getTexture(textureName);
    if (texture) {
      texture.tearDown(textureUnitIndex);
    }
  }

  _setUpMaterialStates(states) {
    let gl = this._gl;

    if (states) {
      if (states.enable) {
        states.enable.forEach((state)=>{
          gl.enable(state);
        });
      }
      if (states.functions) {
        for (let functionName in states.functions) {
          gl[functionName].apply(gl, states.functions[functionName]);
        }
      }
    }
  }

  setUpStates() {
    let globalStatesUsage = this._glBoostContext.globalStatesUsage;
    if (this._globalStatesUsage) {
      globalStatesUsage = this._globalStatesUsage;
    }
    switch (globalStatesUsage) {
      case GLBoost.GLOBAL_STATES_USAGE_DO_NOTHING:
        break;
      case GLBoost.GLOBAL_STATES_USAGE_IGNORE:
        this._setUpMaterialStates(this._states);
        break;
      case GLBoost.GLOBAL_STATES_USAGE_INCLUSIVE:
        this._glBoostContext.reflectGlobalGLState();
        this._setUpMaterialStates(this._states);
        break;
      case GLBoost.GLOBAL_STATES_USAGE_EXCLUSIVE:
        this._glBoostContext.reflectGlobalGLState();
        break;
      default:
        break;
    }
  }

  tearDownStates() {
    this._glBoostContext.disableAllGLState();
    this._setUpMaterialStates({
      functions : this._stateFunctionsToReset
    });
  }

  setUniform(hashIdOfGLSLProgram, uniformLocationName, uniformLocation) {
    if (!this._shaderUniformLocationsOfExpressions[hashIdOfGLSLProgram]) {
      this._shaderUniformLocationsOfExpressions[hashIdOfGLSLProgram] = {};
    }

    this._shaderUniformLocationsOfExpressions[hashIdOfGLSLProgram][uniformLocationName] = uniformLocation;

    this._updateCount();
  }

  getUniform(hashIdOfGLSLProgram, uniformLocationName) {
    return this._shaderUniformLocationsOfExpressions[hashIdOfGLSLProgram][uniformLocationName];
  }

  set isVisible(flg) {
    this._isVisibleForGeometiesAssginedByThisMaterial = flg;
    this._updateCount();
  }

  get isVisible() {
    return this._isVisibleForGeometiesAssginedByThisMaterial;
  }

  set globalStatesUsage(usage) {
    this._globalStatesUsage = usage;
    this._updateCount();
  }

  get globalStatesUsage() {
    return this._globalStatesUsage;
  }

  get shaderParameters() {
    return this._shaderParametersForShaderInstance;
  }

  addSemanticsDic(uniform, uniformName) {
    if (typeof this._semanticsDic[uniform] === 'undefined') {
      this._semanticsDic[uniform] = uniformName;
    } else if (typeof this._semanticsDic[uniform] === 'string') {
      let tmpSemanticsStr = this._semanticsDic[uniform];
      this._semanticsDic[uniform] = [];
      this._semanticsDic[uniform].push(tmpSemanticsStr);
      this._semanticsDic[uniform].push(uniformName);
    } else {
      // it must be Array
      this._semanticsDic[uniform].push(uniformName);
    }
  }

  removeSemanticsDic(uniform) {
    delete this._semanticsDic[uniform];
  }


}

GLBoost['L_AbstractMaterial'] = L_AbstractMaterial;
