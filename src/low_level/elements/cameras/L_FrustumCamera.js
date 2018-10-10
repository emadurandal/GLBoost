/* @flow */

import L_AbstractCamera from './L_AbstractCamera';
import Matrix44 from '../../math/Matrix44';

export default class L_FrustumCamera extends L_AbstractCamera {
  _left: number;
  _right: number;
  _top: number;
  _bottom: number;
  _zNear: number;
  _zFar: number;
  _zNearInner: number;
  _zFarInner: number;
  _dirtyProjection: boolean;
  _updateCountAsCameraProjection: number;
  _projectionMatrix: Matrix44;
  
  constructor(glBoostContext, toRegister, lookat, frustum) {
    super(glBoostContext, toRegister, lookat);

    this._left = frustum.left;
    this._right = frustum.right;
    this._top = frustum.top;
    this._bottom = frustum.bottom;
    this._zNear = frustum.zNear;
    this._zFar = frustum.zFar;

    this._zNearInner = frustum.zNear;
    this._zFarInner = frustum.zFar;

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
      this._projectionMatrix = L_FrustumCamera.frustumRHMatrix(this._leftInner, this._rightInner, this._topInner, this._bottomInner, this._zNearInner, this._zFarInner);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static frustumRHMatrix(left: number, right: number, top: number, bottom: number, zNear: number, zFar: number) {
    return new Matrix44(
      2*zNear/(right-left), 0.0, (right+left)/(right-left), 0.0,
      0.0, 2*zNear/(top-bottom), (top+bottom)/(top-bottom), 0.0,
      0.0, 0.0, - (zFar+zNear)/(zFar-zNear), -1*2*zFar*zNear/(zFar-zNear),
      0.0, 0.0, -1.0, 0.0
    );
  }

  set left(value: number) {
    if (this._left === value) {
      return;
    }
    this._left = value;
    this._needUpdateProjection();
  }

  get left() {
    return this._left;
  }

  set right(value: number) {
    if (this._right === value) {
      return;
    }
    this._right = value;
    this._needUpdateProjection();
  }

  get right() {
    return this._right;
  }

  set top(value: number) {
    if (this._top === value) {
      return;
    }
    this._top = value;
    this._needUpdateProjection();
  }

  get top() {
    return this._top;
  }

  set bottom(value: number) {
    if (this._bottom === value) {
      return;
    }
    this._bottom = value;
    this._needUpdateProjection();
  }

  get bottom() {
    return this._bottom;
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

  get aspect() {
    return (this.right - this.left) / (this.top - this.bottom);
  }

  get allInfo() {
    const info = super.allInfo;

    info.left = this.left;
    info.right = this.right;
    info.top = this.top;
    info.bottom = this.bottom;
    info.zFar = this.zFar;
    info.zFarInner = this.zFarInner;
    info.zNear = this.zNear;
    info.zNearInner = this.zNearInner;

    return info;
  }

  get allInfoExceptInnerData() {
    const info = super.allInfoExceptInnerData;

    info.left = this.left;
    info.right = this.right;
    info.top = this.top;
    info.bottom = this.bottom;
    info.zFar = this.zFar;
    info.zNear = this.zNear;

    return info;
  }

  get allInfoAsInnerData() {
    const info = super.allInfoAsInnerData;
    
    info.left = this.left;
    info.right = this.right;
    info.top = this.top;
    info.bottom = this.bottom;
    info.zFar = this.zFarInner;
    info.zNear = this.zNearInner;

    return info;
  }

  set allInfo(info: Object) {
    super.allInfo = info;
  }
}
