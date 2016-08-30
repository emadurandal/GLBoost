import M_AbstractCamera from './M_AbstractCamera';
import L_PerspectiveCamera from '../../../low_level/elements/cameras/L_PerspectiveCamera';

export default class M_PerspectiveCamera extends M_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, perspective) {
    super(glBoostContext, toRegister);

    this._lowLevelCamera = new L_PerspectiveCamera(this, false, lookat, perspective);
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

  set fovy(value) {
    this._lowLevelCamera.fovy = value;
  }

  get fovy() {
    return this._lowLevelCamera.fovy;
  }

  set aspect(value) {
    this._lowLevelCamera.aspect = value;
  }

  get aspect() {
    return this._lowLevelCamera.aspect;
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
