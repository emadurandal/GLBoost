import Vector3 from '../math/Vector3';
import Quaternion from '../math/Quaternion';
import Matrix44 from '../math/Matrix44';
import GLBoostObject from '../core/GLBoostObject';

export default class L_Element extends GLBoostObject {
  constructor(glBoostContext, toRegister = true) {
    super(glBoostContext, toRegister);

    this._translate = Vector3.zero();
    this._scale = new Vector3(1, 1, 1);

    this._rotate = Vector3.zero();
    this._quaternion = new Quaternion(0, 0, 0, 1);
    this._matrix = Matrix44.identity();

    this._finalMatrix = Matrix44.identity();

    this._dirtyAsElement = true;
    this._currentCalcMode = 'euler'; // true: calc rotation matrix using quaternion. false: calc rotation matrix using Euler

  }

  _needUpdate() {
    this._dirtyAsElement = true;
  }

  set translate(vec) {
    if (this._translate.isEqual(vec)) {
      return;
    }
    this._translate = vec;
    this._needUpdate();
  }

  get translate() {
    return this._translate;
  }

  set rotate(vec) {
    if (this._currentCalcMode !== 'euler') {
      this._currentCalcMode = 'euler';
      this._needUpdate();
    }
    if (this._rotate.isEqual(vec)) {
      return;
    }
    this._rotate = vec;
    this._needUpdate();
  }

  get rotate() {
    return this._rotate;
  }


  set scale(vec) {
    if (this._scale.isEqual(vec)) {
      return;
    }
    this._scale = vec;
    this._needUpdate();
  }

  get scale() {
    return this._scale;
  }

  multiplyMatrix(mat) {
    this._matrix = mat.clone();
    this._currentCalcMode = 'matrix';
    this._needUpdate();
  }

  set quaternion(quat) {
    if (this._currentCalcMode !== 'quaternion') {
      this._currentCalcMode = 'quaternion';
      this._needUpdate();
    }
    if (this._quaternion.isEqual(quat)) {
      return;
    }
    this._quaternion = quat;
    this._needUpdate();
  }

  get quaternion() {
    return this._quaternion;
  }

  get transformMatrix() {
    if (this._dirtyAsElement) {
      var matrix = Matrix44.identity();
      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix = matrix.multiply(this.matrix);
        this._dirtyAsElement = false;
        return this._finalMatrix.clone();
      }

      var rotationMatrix = null;
      if (this._currentCalcMode === 'quaternion') {
        rotationMatrix = this.quaternion.rotationMatrix;
      } else {
        rotationMatrix = Matrix44.rotateX(this.rotate.x).
        multiply(Matrix44.rotateY(this.rotate.y)).
        multiply(Matrix44.rotateZ(this.rotate.z));
      }

      this._finalMatrix = matrix.multiply(Matrix44.scale(this.scale)).multiply(rotationMatrix);
      this._finalMatrix.m03 = this.translate.x;
      this._finalMatrix.m13 = this.translate.y;
      this._finalMatrix.m23 = this.translate.z;

      this._dirtyAsElement = false;
    }

    return this._finalMatrix.clone();
  }

  set currentCalcMode(mode) {
    this._currentCalcMode = mode;
  }

  get currentCalcMode() {
    return this._currentCalcMode;
  }
}
