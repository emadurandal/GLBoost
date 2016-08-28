import M_Element from '../M_Element';

/**
 * [en] This is the abstract class for all lights classes. Don't use this class directly.<br>
 * [ja] 全ての光源クラスのための抽象クラスです。直接このクラスは使わないでください。
 */
export default class M_AbstractLight extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);

    if (this.constructor === M_AbstractLight) {
      throw new TypeError('Cannot construct AbstractLight instances directly.');
    }

    this._gl = this._glContext.gl;
  }

  prepareToRender() {
    if (this._camera) {
      if (this._camera.customFunction) {
        this._camera.customFunction(this);
      }
    }
  }
}
