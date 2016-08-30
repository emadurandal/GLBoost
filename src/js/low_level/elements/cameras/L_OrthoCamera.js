import L_AbstractCamera from './L_AbstractCamera';
import Matrix44 from '../../math/Matrix44';

export default class L_OrthoCamera extends L_AbstractCamera {
  constructor(glBoostContext, toRegister, lookat, ortho) {
    super(glBoostContext, toRegister, lookat);

    this._left = ortho.left;
    this._right = ortho.right;
    this._bottom = ortho.bottom;
    this._top = ortho.top;
    this._zNear = ortho.zNear;
    this._zFar = ortho.zFar;

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
      this._projectionMatrix = L_OrthoCamera.orthoRHMatrix(this._left, this._right, this._bottom, this._top, this._zNear, this._zFar);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static orthoRHMatrix(left, right, bottom, top, near, far) {

    return new Matrix44(
      2/(right-left), 0.0, 0.0, -(right+left)/(right-left),
      0.0, 2/(top-bottom), 0.0, -(top+bottom)/(top-bottom),
      0.0, 0.0, -2/(far-near), -(far+near)/(far-near),
      0.0, 0.0, 0.0, 1.0
    );

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
}
