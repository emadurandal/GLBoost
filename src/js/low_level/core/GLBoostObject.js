import GLBoostContext from './GLBoostContext';

export default class GLBoostObject {
  constructor() {
    if (this.constructor === GLBoostObject) {
      throw new TypeError('Cannot construct GLBoostObject instances directly.');
    }
    this._setName();
    this._glBoostContext = GLBoostContext.getInstance();
    this._glBoostContext.registerGLBoostObject(this);
    this._userFlavorName = '';
  }

  _setName() {
    this.constructor._instanceCount = (typeof this.constructor._instanceCount === 'undefined') ? 0 : (this.constructor._instanceCount + 1);
    this._instanceName = this.constructor.name + '_' + this.constructor._instanceCount;
  }

  toString() {
    return this._instanceName;
  }

  set userFlavorName(name) {
    this._userFlavorName = name;
  }

  get userFlavorName() {
    return this._userFlavorName;
  }

  get instanceNameWithUserFlavor() {
    this._instanceName + '_' + this._userFlavorName;
  }

}