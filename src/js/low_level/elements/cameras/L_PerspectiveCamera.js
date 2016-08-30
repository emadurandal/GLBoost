import L_AbstractCamera from './L_AbstractCamera';
import Matrix44 from '../../math/Matrix44';

export default class L_PerspectiveCamera extends L_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, perspective) {
    super(glBoostContext, toRegister, lookat);

    this._fovy = perspective.fovy;
    this._aspect = perspective.aspect;
    this._zNear = perspective.zNear;
    this._zFar = perspective.zFar;

    this._dirtyProjection = true;
    this._updateCountAsCameraProjection = 0;
  }

  _needUpdateProjection() {
    this._dirtyProjection = true;
    this._updateCountAsCameraProjection++;
  }

  get updateCountAsCameraProjection() {
    return this._updateCountAsCameraProjection;
  }

  projectionRHMatrix() {
    if (this._dirtyProjection) {
      this._projectionMatrix = L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNear, this._zFar);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

    var yscale = 1.0 / Math.tan(0.5*fovy*Math.PI/180);
    var xscale = yscale / aspect;

    return new Matrix44(
      xscale, 0.0, 0.0, 0.0,
      0.0, yscale, 0.0, 0.0,
      0.0, 0.0, - (zFar + zNear) / (zFar - zNear), - (2.0 * zFar * zNear) / (zFar - zNear),
      0.0, 0.0, -1.0, 0.0
    );

  }

  set fovy(value) {
    if (this._fovy === value) {
      return;
    }
    this._fovy = value;
    this._needUpdateProjection();
  }

  get fovy() {
    return this._fovy;
  }

  set aspect(value) {
    if (this._aspect === value) {
      return;
    }
    this._aspect = value;
    this._needUpdateProjection();
  }

  get aspect() {
    return this._aspect;
  }

  set zNear(value) {
    if (this._zNear === value) {
      return;
    }
    this._zNear = value;
    this._needUpdateProjection();
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value) {
    if (this._zFar === value) {
      return;
    }
    this._zFar = value;
    this._needUpdateProjection();
  }

  get zFar() {
    return this._zFar;
  }

}
