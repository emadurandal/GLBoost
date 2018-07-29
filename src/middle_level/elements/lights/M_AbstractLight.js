import GLBoost from '../../../globals';
import M_Element from '../M_Element';

/**
 * This is the abstract class for all lights classes. Don't use this class directly.<br>
 */
export default class M_AbstractLight extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);

    if (this.constructor === M_AbstractLight) {
      throw new TypeError('Cannot construct AbstractLight instances directly.');
    }

    this._gl = this._glContext.gl;

    this._isCastingShadow = true;
    this._isLightType = '';
    this._camera = null;
  }

  prepareToRender() {
    if (this._camera) {
      if (this._camera.customFunction) {
        this._camera.customFunction(this);
      }
    }
  }

  set isCastingShadow(flg) {
    this._isCastingShadow = flg;
  }

  get isCastingShadow() {
    return this._isCastingShadow;
  }

  get lightType() {
    return this._isLightType;
  }

  isTypeAmbient() {
    return this._isLightType === 'ambient';
  }

  isTypeDirectional() {
    return this._isLightType === 'directional';
  }

  isTypePoint() {
    return this._isLightType === 'point';
  }

  isTypeSpot() {
    return this._isLightType === 'spot';
  }

  set camera(camera) {
    this._camera = camera;
  }

  get camera() {
    return this._camera;
  }
}

GLBoost['M_AbstractLight'] = M_AbstractLight;
