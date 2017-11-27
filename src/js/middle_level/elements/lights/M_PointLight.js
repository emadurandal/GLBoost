import M_AbstractLight from './M_AbstractLight';

/**
 * This is a Point Light class.
 */
export default class M_PointLight extends M_AbstractLight {

  /**
   * The constructor of PointLight class.
   * @param {Vector4} intensity intensity as Vector4 Color
   * @param {HTMLCanvas|string} canvas canvas or canvas' id string.
   */
  constructor(glBoostContext, intensity) {
    super(glBoostContext);

    this._intensity = intensity;

  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

}
