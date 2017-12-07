import M_AbstractLight from './M_AbstractLight';
import MathUtil from '../../../low_level/math/MathUtil';

/**
 * This is a Spot Light class.
 */
export default class M_SpotLight extends M_AbstractLight {

  /**
   * The constructor of SpotLight class.
   * @param {Vector4} intensity intensity as Vector4 Color
   * @param {Vector4} direction the light (traveling) direction
   * @param {HTMLCanvas|string} canvas canvas or canvas' id string.
   */
  constructor(glBoostContext, intensity, direction) {
    super(glBoostContext);

    this._intensity = intensity;
    
    this._isLightType = 'spot';
    this._direction = direction;

    this._spotExponent = 1.0;
    this._spotCutoffInDegree = 30;
    
  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

  set direction(vec) {
    this._direction = vec;
    if (this._camera) {
      if (this._camera.customFunction) {
        this._camera.customFunction(this);
      }
    }
  }

  get direction() {
    return this._direction;
  }

  set spotExponent(val) {
    this._spotExponent = val;
  }

  get spotExponent() {
    return this._spotExponent;
  }

  set spotCutoffInDegree(val) {
    this._spotCutoffInDegree = val;
  }

  get spotCutoffInDegree() {
    return this._spotCutoffInDegree;
  }

  get spotCosCutoff() {
    return Math.cos(MathUtil.degreeToRadian(this._spotCutoffInDegree));
  }

}
