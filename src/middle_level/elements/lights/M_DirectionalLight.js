import M_AbstractLight from './M_AbstractLight';
import M_DirectionalLightGizmo from '../gizmos/M_DirectionalLightGizmo';
import Vector3 from '../../../low_level/math/Vector3';
import Matrix33 from '../../../low_level/math/Matrix33';
import Quaternion from '../../../low_level/math/Quaternion';
import Matrix44 from '../../../low_level/math/Matrix44';


/**
 * [en] This is a Directional Light class.<br>
 * [ja] 平行光源クラスです。
 */
export default class M_DirectionalLight extends M_AbstractLight {

  /**
   * The constructor of DirectionalLight class. 
   * @param {Vector4} intensity intensity as Vector4 Color
   */
  constructor(glBoostContext, intensity, rotate, length = 1.0) {
    super(glBoostContext);

    this._intensity = intensity;
    this._direction = new Vector3(0.0, 0.0, 1.0);
//    this._direction = direction;

    this._gizmo = new M_DirectionalLightGizmo(glBoostContext, length);
    this._gizmos.push(this._gizmo);

    //this.direction = direction;
    this.rotate = rotate;

    //this._gizmo._mesh.masterElement = this._gizmo;
    this._isLightType = 'directional';
    
  }

  set multiplyMatrixGizmo(mat4) {
    this._gizmo.matrix = mat4;
  }

  get multiplyMatrixGizmo() {
    return this._gizmo.getMatrixNotAnimated();
  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

  set rotate(vec3) {
    this._gizmo._mesh.rotate = vec3;
    super.rotate = vec3;

    this.callCameraCustomFunction();
  }

  set translate(vec3) {
    this._gizmo._mesh.translate = vec3;

    this.callCameraCustomFunction();
  }

  get translate() {
    return this._gizmo.translate;
  }

  get rotate() {
    return super.rotate;
  }

  set matrix(vec3) {
    this._gizmo._mesh.matrix = vec3;
    super.matrix = vec3;

    this.callCameraCustomFunction();
  }

  get matrix() {
    return super.matrix;
  }

  set quaternion(vec3) {
    this._gizmo._mesh.quaternion = vec3;
    super.quaternion = vec3;

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
    let zDir = Vector3.cross(yDir, xDir);
  
    let result = Matrix44.identity();
    result.m11 = xDir.x;
    result.m21 = xDir.y;
    result.m31 = xDir.z;
  
    result.m12 = yDir.x;
    result.m22 = yDir.y;
    result.m32 = yDir.z;
  
    result.m13 = zDir.x;
    result.m23 = zDir.y;
    result.m33 = zDir.z;

    super.matrix = result;
    this._gizmo._mesh.matrix = result;

    this.callCameraCustomFunction();
  }


  get direction() {
    //return Matrix33.rotate(super.rotate).multiplyVector(this._direction);
    let result = super.quaternion.rotationMatrix33.multiplyVector(this._direction);
    return result;
  }

}
