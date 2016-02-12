import GLBoost from './globals'
import Vector2 from './math/Vector2'
import Vector3 from './math/Vector3'
import Vector4 from './math/Vector4'
import Quaternion from './math/Quaternion'
import Matrix44 from './math/Matrix44'
import AnimationUtil from './misc/AnimationUtil'


export default class Element {
  constructor() {
    this.children = []; // this is compatibility for tmlib. Actually this is NOT used.
    this._parent = null;
    this._translate = Vector3.zero();
    this._rotate = Vector3.zero();
    this._quaternion = new Quaternion(0, 0, 0, 1);
    this._scale = new Vector3(1, 1, 1);
    this._matrix = Matrix44.identity();
    this._invMatrix = Matrix44.identity();
    this._dirtyAsElement = false;
    this._isQuaternionActive = false; // true: calc rotation matrix using quaternion. false: calc rotation matrix using Euler
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement = 0;
    this._accumulatedAncestryNameWithUpdateInfoString = '';
    this._accumulatedAncestryNameWithUpdateInfoStringInv = '';
    this._animationLine = [];
    this.opacity = 1.0;

    this._setName();
  }

  _setName() {
      this.constructor._instanceCount = (typeof this.constructor._instanceCount === "undefined") ? 0 : (this.constructor._instanceCount + 1);
      this._instanceName = this.constructor.name + '_' + this.constructor._instanceCount;
  }

  _needUpdate() {
    this._dirtyAsElement = true;
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement++;
  }

  get updateCountAsElement() {
    return this._updateCountAsElement;
  }

  _getAnimatedTransformValue(value, animation) {
    if (animation) {
      return AnimationUtil.interpolate(animation.input, animation.output, value, animation.outputComponentN);
    } else {
      console.warn(this._instanceName + "doesn't have " + animation.outputAttribute + " animation data. GLBoost returned default " + animation.outputAttribute + " value.");
      return this[animation.outputAttribute];
    }
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

  getTranslateAt(lineIndex, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineIndex]['translate']);
  }

  set rotate(vec) {
    if (this._isQuaternionActive === true) {
      this._isQuaternionActive = false;
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

  getRotateAt(lineIndex, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineIndex]['rotate']);
  }

  set quaternion(quat) {
    if (this._isQuaternionActive === false) {
      this._isQuaternionActive = true;
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

  getQuaternionAt(lineIndex, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineIndex]['quaternion']);
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

  getScaleAt(lineIndex, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineIndex]['scale']);
  }

  get transformMatrix() {
    if (this._dirtyAsElement) {
      var matrix = Matrix44.identity();
      if (this._isQuaternionActive) {
        var rotationMatrix = this._quaternion.rotationMatrix;
      } else {
        var rotationMatrix = Matrix44.rotateX(this._rotate.x).
        multiply(Matrix44.rotateY(this._rotate.y)).
        multiply(Matrix44.rotateZ(this._rotate.z));
      }

      this._matrix = matrix.multiply(Matrix44.scale(this._scale)).multiply(rotationMatrix);
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

  _accumulateMyAndParentNameWithUpdateInfo(currentElem) {
    if (currentElem._parent === null) {
      return currentElem.toStringWithUpdateInfo();
    } else {
      return this._accumulateMyAndParentNameWithUpdateInfo(currentElem._parent) + currentElem.toStringWithUpdateInfo();
    }
  }

  _multiplyMyAndParentTransformMatrices(currentElem, withMySelf) {
    if (currentElem._parent === null) {
      if (withMySelf) {
        return currentElem.transformMatrix;
      } else {
        return Matrix44.identity();
      }
    } else {
      let currentMatrix = Matrix44.identity();
      if (withMySelf) {
        currentMatrix = currentElem.transformMatrix;
      }
      return this._multiplyMyAndParentTransformMatrices(currentElem._parent, true).multiply(currentMatrix);
    }
  }

  _multiplyMyAndParentTransformMatricesInInverseOrder(currentElem, withMySelf) {
    if (currentElem._parent === null) {
      if (withMySelf) {
        return currentElem.transformMatrix;
      } else {
        return Matrix44.identity();
      }
    } else {
      let currentMatrix = Matrix44.identity();
      if (withMySelf) {
        currentMatrix = currentElem.transformMatrix;
      }
      return currentMatrix.multiply(this._multiplyMyAndParentTransformMatricesInInverseOrder(currentElem._parent, true));
    }
  }

  get transformMatrixAccumulatedAncestry() {
    var tempString = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempString);
    if (this._accumulatedAncestryNameWithUpdateInfoString !== tempString || typeof this._matrixAccumulatedAncestry === "undefined") {
      this._matrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatrices(this, true);
      this._accumulatedAncestryNameWithUpdateInfoString = tempString;
    }

    return this._matrixAccumulatedAncestry;
  }

  get inverseTransformMatrixAccumulatedAncestryWithoutMySelf() {
    if (this._parent === null) {
      return Matrix44.identity();
    }

    var tempString = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempString);
    if (this._accumulatedAncestryNameWithUpdateInfoStringInv !== tempString || typeof this._invMatrixAccumulatedAncestry === "undefined") {
      this._invMatrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatricesInInverseOrder(this, false).invert();
      this._accumulatedAncestryNameWithUpdateInfoStringInv = tempString;
    }

    return this._invMatrixAccumulatedAncestry
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
    return this._multiplyMyAndParentTransformMatrices(this, true).invert();
  }

  _accumulateMyAndParentOpacity(currentElem) {
    if (currentElem._parent === null) {
      return currentElem.opacity;
    } else {
      return this._accumulateMyAndParentOpacity(currentElem._parent) * currentElem.opacity;
    }
  }

  get opacityAccumulatedAncestry() {
    return this._accumulateMyAndParentOpacity(this);
  }

  set opacity(opacity) {
    this._opacity = opacity;
  }

  get opacity() {
    return this._opacity;
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

  toString() {
    return this._instanceName;
  }

  toStringWithUpdateInfo() {
  //  return '&' + this._instanceName + '#' + this._updateCountAsElement;  // human readable
    return this._instanceName + this._updateCountAsElement;                // faster
  }

  setAnimationAtLine(lineIndex, attributeName, inputArray, outputArray) {
    var outputComponentN = 0;
    if (outputArray[0] instanceof Vector2) {
      outputComponentN = 2;
    } else if (outputArray[0] instanceof Vector3) {
      outputComponentN = 3;
    } else if (outputArray[0] instanceof Vector4) {
      outputComponentN = 4;
    } else if (outputArray[0] instanceof Quaternion) {
      outputComponentN = 4;
    } else {
      outputComponentN = 1;
    }
    if (!this._animationLine[lineIndex]) {
      this._animationLine[lineIndex] = {};
    }
    this._animationLine[lineIndex][attributeName] = {
      input: inputArray,
      output: outputArray,
      outputAttribute: attributeName,
      outputComponentN: outputComponentN
    };
  }
}

GLBoost["Element"] = Element;
