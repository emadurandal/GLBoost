import GLBoost from './globals'
import Vector3 from './math/Vector3'
import Matrix44 from './math/Matrix44'

export default class Element {
  constructor() {
    this.children = []; // this is compatibility for tmlib. Actually this is NOT used.
    this._parent = null;
    this._translate = Vector3.zero();
    this._rotate = Vector3.zero();
    this._scale = new Vector3(1, 1, 1);
    this._matrix = Matrix44.identity();
    this._invMatrix = Matrix44.identity();
    this._dirtyAsElement = false;
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement = 0;
  }

  _needUpdate() {
    this._dirtyAsElement = true;
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement++;
  }

  get updateCountAsElement() {
    return this._updateCountAsElement;
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

  get transformMatrix() {
    if (this._dirtyAsElement) {
      var matrix = Matrix44.identity();
      this._matrix = matrix.multiply(Matrix44.scale(this._scale)).
        multiply(Matrix44.rotateX(this._rotate.x)).
        multiply(Matrix44.rotateY(this._rotate.y)).
        multiply(Matrix44.rotateZ(this._rotate.z));
      this._matrix.m03 = this._translate.x;
      this._matrix.m13 = this._translate.y;
      this._matrix.m23 = this._translate.z;

      this._dirtyAsElement = false;
    }

    return this._matrix.clone();
  }

  get inverseTransformMatrix() {
    if (!this._calculatedInverseMatrix) {
      this._invMatrix = this.transformMatrix.invert();
      this._calculatedInverseMatrix = true;
    }
    return this._invMatrix.clone();
  }

  _multiplyMyAndParentTransformMatrices(currentElem) {
    if (currentElem._parent === null) {
      return currentElem.transformMatrix;
    } else {
      return this._multiplyMyAndParentTransformMatrices(currentElem._parent).multiply(currentElem.transformMatrix);
    }
  }

  get transformMatrixAccumulatedAncestry() {
    return this._multiplyMyAndParentTransformMatrices(this);
  }

  get rotateMatrixAccumulatedAncestry() {
    var mat = this._multiplyMyAndParentTransformMatrices(this);
    var scaleX = Math.sqrt(mat.m00*mat.m00 + mat.m10*mat.m10 + mat.m20*mat.m20);
    var scaleY = Math.sqrt(mat.m01*mat.m01 + mat.m11*mat.m11 + mat.m21*mat.m21);
    var scaleZ = Math.sqrt(mat.m02*mat.m02 + mat.m12*mat.m12 + mat.m22*mat.m22);

    return new Matrix44(
      mat.m00/scaleX, mat.m01/scaleY, mat.m02/scaleZ, 0,
      mat.m10/scaleX, mat.m11/scaleY, mat.m12/scaleZ, 0,
      mat.m20/scaleX, mat.m21/scaleY, mat.m22/scaleZ, 0,
      0, 0, 0, 1
    );
  }

  get inverseTransformMatrixAccumulatedAncestry() {
    return this._multiplyMyAndParentTransformMatrices(this).invert();
  }

  set dirty(flg) {
    this._dirtyAsElement = flg;
    if (flg) {
      this._needUpdate();
    }
  }

  get parent() {
    return this._parent;
  }
}

GLBoost["Element"] = Element;
