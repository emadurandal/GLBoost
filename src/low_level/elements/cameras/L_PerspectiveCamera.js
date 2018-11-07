/* @flow */

import L_AbstractCamera from './L_AbstractCamera';
import Matrix44 from '../../math/Matrix44';

export default class L_PerspectiveCamera extends L_AbstractCamera {
  _fovy: number;
  _aspect: number;
  _zNear: number;
  _zFar: number;
  _zNearInner: number;
  _zFarInner: number;
  _xscale: number;
  _yscale: number;
  _dirtyProjection: boolean;
  _updateCountAsCameraProjection: number;

  constructor(glBoostContext, toRegister, lookat, perspective) {
    super(glBoostContext, toRegister, lookat);

    this._fovy = perspective.fovy;
    this._aspect = perspective.aspect;
    this._zNear = perspective.zNear;
    this._zFar = perspective.zFar;

    this._zNearInner = perspective.zNear;
    this._zFarInner = perspective.zFar;

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
      this._projectionMatrix = L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNearInner, this._zFarInner);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static perspectiveRHMatrix(fovy: number, aspect: number, zNear: number, zFar: number) {

    var yscale = 1.0 / Math.tan(0.5*fovy*Math.PI/180);
    var xscale = yscale / aspect;

    if (zFar) {
      return new Matrix44(
        xscale, 0.0, 0.0, 0.0,
        0.0, yscale, 0.0, 0.0,
        0.0, 0.0, - (zFar + zNear) / (zFar - zNear), - (2.0 * zFar * zNear) / (zFar - zNear),
        0.0, 0.0, -1.0, 0.0
      );
    } else {
      return new Matrix44(
        xscale, 0.0, 0.0, 0.0,
        0.0, yscale, 0.0, 0.0,
        0.0, 0.0, -1,0, -2*zNear,
        0.0, 0.0, -1.0, 0.0
      );
    }

    this._yscale = yscale;
    this._xscale = xscale;
  }

  set fovy(value: number) {
    if (this._fovy === value) {
      return;
    }
    this._fovy = value;
    this._needUpdateProjection();
  }

  get fovy() {
    return this._fovy;
  }

  set aspect(value: number) {
    if (this._aspect === value) {
      return;
    }
    this._aspect = value;
    this._needUpdateProjection();
  }

  get aspect() {
    return this._aspect;
  }

  set zNear(value: number) {
    if (this._zNear === value) {
      return;
    }
    this._zNear = value;
    this._needUpdateProjection();
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value: number) {
    if (this._zFar === value) {
      return;
    }
    this._zFar = value;
    this._needUpdateProjection();
  }

  get zFar() {
    return this._zFar;
  }

  get left() {
    if (this._xscale != null) {
      L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNearInner, this._zFarInner);
    }
    return -this._zNear/this._xscale;
  }

  get right() {
    return -this.left;
  }

  get top() {
    return -this.bottom;
  }

  get bottom() {
    if (this._xscale != null) {
      L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNearInner, this._zFarInner);
    }
    return this._zNear/this._yscale;
  }

  get allInfo() {
    const info = super.allInfo;

    info.fovy = this.fovy;
    info.aspect = this.aspect;
    info.zFar = this.zFar;
    info.zFarInner = this.zFarInner;
    info.zNear = this.zNear;
    info.zNearInner = this.zNearInner;

    return info;
  }

  get allInfoExceptInnerData() {
    const info = super.allInfoExceptInnerData;

    info.fovy = this.fovy;
    info.aspect = this.aspect;
    info.zFar = this.zFar;
    info.zNear = this.zNear;

    return info;
  }
  
  get allInfoAsInnerData() {
    const info = super.allInfoAsInnerData;

    info.fovy = this.fovy;
    info.aspect = this.aspect;
    info.zFar = this.zFarInner;
    info.zNear = this.zNearInner;

    return info;
  }

  set allInfo(info: Object) {
    super.allInfo = info;
  }
}
