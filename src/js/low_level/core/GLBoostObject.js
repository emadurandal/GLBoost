import L_GLBoostMonitor from './L_GLBoostMonitor';

export default class GLBoostObject {
  constructor(glBoostContext, toRegister = true) {
    if (this.constructor === GLBoostObject) {
      throw new TypeError('Cannot construct GLBoostObject instances directly.');
    }
    this._setName();
    this._glBoostContext = glBoostContext;
    this._glContext = glBoostContext.glContext;
    this._glBoostMonitor = glBoostContext._glBoostMonitor;
    this._toRegister = toRegister;
    if (this._toRegister) {
      this._glBoostMonitor.registerGLBoostObject(this);
    }
    this._userFlavorName = '';
    this._readyForDiscard = false;

  }

  _setName() {
    if (typeof GLBoostObject.classInfoDic[this.constructor.name] === 'undefined') {
      GLBoostObject.classInfoDic[this.constructor.name] = {};
    }
    GLBoostObject.classInfoDic[this.constructor.name]._instanceCount = (typeof GLBoostObject.classInfoDic[this.constructor.name]._instanceCount === 'undefined') ? 0 : (GLBoostObject.classInfoDic[this.constructor.name]._instanceCount + 1);
    this._instanceName = this.constructor.name + '_' + GLBoostObject.classInfoDic[this.constructor.name]._instanceCount;
  }

  /**
   * [en] Return instance name.
   * [ja] インスタンス名を返します。
   * @returns {string} [en] the instance name. [ja] インスタンス名
   */
  toString() {
    return this._instanceName;
  }

  get instanceName() {
    return this._instanceName;
  }

  get belongingCanvasId() {
    return this._glBoostContext.belongingCanvasId;
  }

  set userFlavorName(name) {
    this._userFlavorName = name;
  }

  get userFlavorName() {
    return this._userFlavorName;
  }

  get instanceNameWithUserFlavor() {
    return this._instanceName + '__' + this._userFlavorName;
  }

  readyForDiscard() {
    if (this._toRegister) {
      this._glBoostMonitor.deregisterGLBoostObject(this);
    }
    this._readyForDiscard = true;
  }

  get isReadyForDiscard() {
    return this._readyForDiscard;
  }

  _copy(instance) {
    instance._userFlavorName = this._userFlavorName;
  }
}

GLBoostObject.classInfoDic = {};
