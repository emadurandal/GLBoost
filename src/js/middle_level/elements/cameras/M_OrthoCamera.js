import M_AbstractCamera from './M_AbstractCamera';
import L_OrthoCamera from '../../../low_level/elements/cameras/L_OrthoCamera';

export default class M_OrthoCamera extends M_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, ortho) {
    super(glBoostContext, toRegister);

    this._lowLevelCamera = new L_OrthoCamera(this, false, lookat, ortho);
  }

  // ===================== delegate to low level class ========================

  _needUpdateProjection() {
    this._lowLevelCamera._needUpdateProjection();
  }

  get updateCountAsCameraProjection() {
    return this._lowLevelCamera.updateCountAsCameraProjection;
  }

  projectionRHMatrix() {
    return this._lowLevelCamera.projectionRHMatrix();
  }

  set left(value) {
    this._lowLevelCamera.left = value;
  }

  get left() {
    return this._lowLevelCamera.left;
  }

  set right(value) {
    this._lowLevelCamera.right = value;
  }

  get right() {
    return this._lowLevelCamera.right;
  }

  set bottom(value) {
    this._lowLevelCamera.bottom = value;
  }

  get bottom() {
    return this._lowLevelCamera.bottom;
  }

  set top(value) {
    this._lowLevelCamera.top = value;
  }

  get top() {
    return this._lowLevelCamera.top;
  }

  set zNear(value) {
    this._lowLevelCamera.zNear = value;
  }

  get zNear() {
    return this._lowLevelCamera.zNear;
  }

  set zFar(value) {
    this._lowLevelCamera.zFar = value;
  }

  get zFar() {
    return this._lowLevelCamera.zFar;
  }
}
