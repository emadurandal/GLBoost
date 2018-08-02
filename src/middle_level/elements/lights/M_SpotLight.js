import GLBoost from '../../../globals';
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
  constructor(glBoostContext, intensity, rotate = new Vector3(0, 0, 0)) {
    super(glBoostContext);

    this._intensity = intensity;
    
    this._isLightType = 'spot';
    this._direction = new Vector3(0.0, 1.0, 0.0);

    this.rotate = rotate;

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

  get translate() {
    return this._gizmo.translate;
  }

  set rotate(vec3) {
    super.rotate = vec3;
  
    this.callCameraCustomFunction();
  }

  get rotate() {
    return super.rotate;
  }

  set matrix(vec3) {
    super.matrix = vec3;
    this._gizmo._mesh.matrix = vec3;

    this.callCameraCustomFunction();
  }

  get matrix() {
    return super.matrix;
  }

  set quaternion(vec3) {
    super.quaternion = vec3;
    this._gizmo._mesh.quaternion = vec3;

    this.callCameraCustomFunction();
  }

  get quaternion() {
    return super.quaternion;
  }

  callCameraCustomFunction() {
    if (this._camera) {
      if (this._camera.customFunction) {
        this._camera.customFunction(this);
      }
    }
  }

  set direction(_zDir) {
    let yDir = new Vector3(0, 1, 0);
    let xDir = Vector3.cross(yDir, _zDir);
    let zDir = Vector3.cross(xDir, yDir);
  
    let result = Matrix44.identity();

    
    result.m00 = xDir.x;
    result.m10 = xDir.y;
    result.m20 = xDir.z;
  
    result.m01 = yDir.x;
    result.m11 = yDir.y;
    result.m21 = yDir.z;
  
    result.m02 = zDir.x;
    result.m12 = zDir.y;
    result.m22 = zDir.z;
/*

    result.m00 = xDir.x;
    result.m01 = xDir.y;
    result.m02 = xDir.z;

    result.m10 = yDir.x;
    result.m11 = yDir.y;
    result.m12 = yDir.z;

    result.m20 = zDir.x;
    result.m21 = zDir.y;
    result.m22 = zDir.z;
*/

    this.matrix = result;

    this.callCameraCustomFunction();
  }

  get direction() {
    let result = this.quaternion.rotationMatrix33.multiplyVector(this._direction);
    return result;
  }

  get directionInWorld() {
    let direction = this.worldMatrixWithoutMySelf.getRotate().multiplyVector(this.direction.toVector4()).toVector3();
    return direction;
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

GLBoost['M_SpotLight'] = M_SpotLight;
