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
        multiply(Matrix44.rotateZ(this._rotate.z)).
        multiply(Matrix44.translate(this._translate));
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
