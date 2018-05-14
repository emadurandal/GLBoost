import M_AbstractLight from './M_AbstractLight';
import MathUtil from '../../../low_level/math/MathUtil';
import Vector3 from '../../../low_level/math/Vector3';
import Matrix33 from '../../../low_level/math/Matrix33';
import Quaternion from '../../../low_level/math/Quaternion';

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
  constructor(glBoostContext, intensity, rotation) {
    super(glBoostContext);

    this._intensity = intensity;
    
    this._isLightType = 'spot';
    this._direction = new Vector3(0.0, 0.0, 1.0);

    this.rotation = rotation;

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
    console.error("Not supported Now!");
  }

  set rotate(vec3) {
    super.rotate = vec3;

    if (this._camera) {
      if (this._camera.customFunction) {
        this._camera.customFunction(this);
      }
    }
  }

  get rotate() {
    return super.rotate;
  } 


  get direction() {
    let result = super.quaternion.rotationMatrix33.multiplyVector(this._direction);
    return result;
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
