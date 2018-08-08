import L_AbstractCamera from './L_AbstractCamera';
import Matrix44 from '../../math/Matrix44';

export default class L_OrthoCamera extends L_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, ortho) {
    super(glBoostContext, toRegister, lookat);

    this._left = (typeof ortho.left === "undefined") ? -1:ortho.left;
    this._right = (typeof ortho.right === "undefined") ? 1:ortho.right;
    this._bottom = (typeof ortho.bottom === "undefined") ? -1:ortho.bottom;
    this._top = (typeof ortho.top === "undefined") ? 1:ortho.top;
    this._zNear = ortho.zNear;
    this._zFar = ortho.zFar;
    this._xmag = ortho.xmag;
    this._ymag = ortho.ymag;

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
      this._projectionMatrix = L_OrthoCamera.orthoRHMatrix(this._left, this._right, this._bottom, this._top, this._zNear, this._zFar, this._xmag, this._ymag);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static orthoRHMatrix(left, right, bottom, top, near, far, xmag, ymag) {

    if (xmag && ymag) {
      return new Matrix44(
        1/xmag, 0.0, 0.0, 0,
        0.0, 1/ymag, 0.0, 0,
        0.0, 0.0, -2/(far-near), -(far+near)/(far-near),
        0.0, 0.0, 0.0, 1.0
      );
    } else {
      return new Matrix44(
        2/(right-left), 0.0, 0.0, -(right+left)/(right-left),
        0.0, 2/(top-bottom), 0.0, -(top+bottom)/(top-bottom),
        0.0, 0.0, -2/(far-near), -(far+near)/(far-near),
        0.0, 0.0, 0.0, 1.0
      );
    }
  }

  set left(value) {
    if (this._left === value) {
      return;
    }
    this._left = value;
    this._needUpdateProjection();
  }

  get left() {
    return this._left;
  }

  set right(value) {
    if (this._right === value) {
      return;
    }
    this._right = value;
    this._needUpdateProjection();
  }

  get right() {
    return this._right;
  }

  set bottom(value) {
    if (this._bottom === value) {
      return;
    }
    this._bottom = value;
    this._needUpdateProjection();
  }

  get bottom() {
    return this._bottom;
  }

  set top(value) {
    if (this._top === value) {
      return;
    }
    this._top = value;
    this._needUpdateProjection();
  }

  get top() {
    return this._top;
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

  set xmag(value) {
    if (this._xmag === value) {
      return;
    }
    this._xmag = value;
    this._needUpdateProjection();
  }

  get xmag() {
    return this._xmag;
  }

  set ymag(value) {
    if (this._ymag === value) {
      return;
    }
    this._ymag = value;
    this._needUpdateProjection();
  }

  get ymag() {
    return this._ymag;
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
//    info.zFarInner = this.zFarInner;
    info.zNear = this.zNear;
//    info.zNearInner = this.zNearInner;
    info.xmag = this.xmag;
    info.ymag = this.ymag;

    return info;
  }

  set allInfo(info) {
    super.allInfo = info;
  }
}
