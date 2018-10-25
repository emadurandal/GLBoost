import GLBoost from '../../globals';
import AbstractTexture from '../textures/AbstractTexture';
import Vector4 from '../math/Vector4';
import DecalShader from '../../middle_level/shaders/DecalShader';
import GLBoostObject from '../core/GLBoostObject';
import is from '../misc/IsUtil';

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

    this._name = '';
    this._shaderClass = DecalShader;
    this._shaderInstance = null;
    this._vertexNofGeometries = {};
    this._states = {
      enable:[],
      functions:{}
    };
    this._shaderUniformLocationsOfExpressions = {};
    this._isVisibleForGeometiesAssginedByThisMaterial = true;
    this._globalStatesUsage = null;
    this._shaderParametersForShaderInstance = {};
    this._semanticsDic = {};
    this._textureSemanticsDic = {};

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
    this._isAlphaTestEnable = true;
    this._alphaCutoff = 0.001;

    this._countOfUpdate = 0;
  }

  clone() {
    var material = new ClassicMaterial(this._glBoostContext);

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
    let _purpose = (typeof purpose !== 'undefined' ? purpose:GLBoost.TEXTURE_PURPOSE_DIFFUSE);
    this._texturePurposeDic[_purpose] = texture.userFlavorName;
    texture.purpose = _purpose;
    this._textureContributionRateDic[texture.userFlavorName] = new Vector4(1.0, 1.0, 1.0, 1.0);

    this._updateCount();
  }

  removeTexture(userFlavorName, discardTexture=true) {
    if (discardTexture) {
      this._textureDic[userFlavorName].readyForDiscard();
    }
    delete this._texturePurposeDic[this._textureDic[userFlavorName].purpose];
    delete this._textureDic[userFlavorName];
    delete this._textureContributionRateDic[userFlavorName];
    this._updateCount();
  }

  setTexturePurpose(userFlavorNameOfTexture, purpose) {
    this._texturePurposeDic[purpose] = userFlavorNameOfTexture;
    this._updateCount();
  }

  getTexturePurpose(userFlavorNameOfTexture) {
    let hitPurpose = null;
    for (let purpose in this._texturePurposeDic) {
      if (this._texturePurposeDic[purpose] === userFlavorNameOfTexture) {
        hitPurpose = purpose;
      }
    }
    return hitPurpose;
  }

  getTexture(userFlavorName) {
    return this._textureDic[userFlavorName];
  }

  getTextureFromPurpose(purpose) {
    let userFlavorName = this._texturePurposeDic[purpose];
    let texture = this.getTexture(userFlavorName);
    //if (purpose === GLBoost.TEXTURE_PURPOSE_DIFFUSE && !texture) {
    //  texture = this._glBoostSystem._glBoostContext.defaultDummyTexture;
    //}

    return texture;
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


  set states(states) {
    if (typeof states.functions === 'undefined') {
      states.functions = this._stateFunctionsToReset;
    }
    this._states.enable = states.enable;
    if (typeof states.functions !== 'undefined') {
      this._states.functions = states.functions;
    }
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
          if (state === 3042) { // gl.BLEND
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
      this._glBoostSystem._glBoostContext.defaultDummyTexture.setUp(textureUnitIndex);

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

  setUpStates(mesh) {
    let globalStatesUsage = this._glBoostSystem._glBoostContext.globalStatesUsage;
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
        this._glBoostSystem._glBoostContext.reflectGlobalGLState();
        this._setUpMaterialStates(this._states);
        break;
      case GLBoost.GLOBAL_STATES_USAGE_EXCLUSIVE:
        this._glBoostSystem._glBoostContext.reflectGlobalGLState();
        break;
      default:
        break;
    }

//    if (mesh.isTransparent) {
//      this._gl.disable(2929);
//    }
  }

  tearDownStates() {
    this._glBoostSystem._glBoostContext.disableAllGLState();
    this._setUpMaterialStates({
      functions : this._stateFunctionsToReset
    });
  }

  setUniform(glslProgram, uniformLocationName, uniformLocation) {
    if (!this._shaderUniformLocationsOfExpressions[glslProgram.hashId]) {
      this._shaderUniformLocationsOfExpressions[glslProgram.hashId] = {};
    }

    this._shaderUniformLocationsOfExpressions[glslProgram.hashId][uniformLocationName] = uniformLocation;
    glslProgram['uniform_' + uniformLocationName] = uniformLocationName;
    if (uniformLocation != null) {
      uniformLocation.uniformLocationName = uniformLocationName;
    }

    this._updateCount();
  }

  getUniform(glslProgram, uniformLocationName) {
    if (typeof this._shaderUniformLocationsOfExpressions[glslProgram.hashId] !== 'undefined') {
      return this._shaderUniformLocationsOfExpressions[glslProgram.hashId][uniformLocationName];
    }

    return void 0;
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

  set shaderParameters(shaderParameterDic) {
    this._shaderParametersForShaderInstance = shaderParameterDic;
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

  readyForDiscard() {
    for (let userFlavorName in this._textureDic) {
      this.removeTexture(userFlavorName, true);
    }
    if (this._shaderInstance) {
      this._shaderInstance.readyForDiscard();
    }
    this._shaderInstance = null;
  }

  registerTextureUnitToUniform(texturePurpose, shaderProgram, uniformName) {
    const texture = this.getTextureFromPurpose(texturePurpose);
    if (texture != null) {
      let uTexture = this._glContext.getUniformLocation(shaderProgram, uniformName);
      let index = Object.keys(this._textureSemanticsDic).indexOf(''+texturePurpose);
      index = (index !== -1) ? index : Object.keys(this._textureSemanticsDic).length;
      this._glContext.uniform1i( uTexture, index, true);
      this.setUniform(shaderProgram, uniformName, uTexture);
      this.uniformTextureSamplerDic[uniformName] = {};
      this.uniformTextureSamplerDic[uniformName].textureUnitIndex = index;
      this.uniformTextureSamplerDic[uniformName].textureName = texture.userFlavorName;
      this._textureSemanticsDic[texturePurpose] = uniformName;
    }
  }

  updateTextureInfo(texturePurpose, uniformName) {
    let texture = this.getTextureFromPurpose(texturePurpose);
    if (texture != null) {
      let index = Object.keys(this._textureSemanticsDic).indexOf(''+texturePurpose);
      index = (index !== -1) ? index : Object.keys(this._textureSemanticsDic).length;
      this.uniformTextureSamplerDic[uniformName] = {};
      this.uniformTextureSamplerDic[uniformName].textureUnitIndex = index;
      this.uniformTextureSamplerDic[uniformName].textureName = texture.userFlavorName;
      this._textureSemanticsDic[texturePurpose] = uniformName;
    }
  }

  getTextureNumAttachedShader() {
    return Object.keys(this._textureSemanticsDic).length;
  }

  set alphaCutoff(value) {
    this._alphaCutoff = value;
  }

  get alphaCutoff() {
    return this._alphaCutoff;
  }

}

GLBoost['L_AbstractMaterial'] = L_AbstractMaterial;
