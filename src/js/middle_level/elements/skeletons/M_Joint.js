import M_Element from '../M_Element';

export default class M_Joint extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);

  }

  clone() {
    let instance = new M_Joint(this._glBoostContext);
    this._copy(instance);
    return instance;
  }

  _copy(instance) {
    super._copy(instance);
  }
}
