import M_AbstractCamera from './M_AbstractCamera';
import L_FrustumCamera from '../../../low_level/elements/cameras/L_FrustumCamera';

export default class M_FrustumCamera extends M_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, perspective) {
    super(glBoostContext, toRegister);

    this._lowLevelCamera = new L_FrustumCamera(this, false, lookat, perspective);
    this._lowLevelCamera._middleLevelCamera = this;
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

  set top(value) {
    this._lowLevelCamera.top = value;
  }

  get top() {
    return this._lowLevelCamera.top;
  }

  set bottom(value) {
    this._lowLevelCamera.bottom = value;
  }

  get bottom() {
    return this._lowLevelCamera.bottom;
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

  get aspect() {
    return (this._lowLevelCamera.right - this._lowLevelCamera.left) / (this._lowLevelCamera.top - this._lowLevelCamera.bottom);
  }
}
