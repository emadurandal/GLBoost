import GLBoost from '../../globals';
import Vector2 from '../math/Vector2';
import Vector3 from '../math/Vector3';
import Vector4 from '../math/Vector4';
import Quaternion from '../math/Quaternion';
import Matrix44 from '../math/Matrix44';
import AnimationUtil from '../misc/AnimationUtil';
import GLBoostObject from '../core/GLBoostObject';

export default class Element extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._parent = null;
    this._translate = Vector3.zero();
    this._rotate = Vector3.zero();
    this._quaternion = new Quaternion(0, 0, 0, 1);
    this._scale = new Vector3(1, 1, 1);
    this._matrix = Matrix44.identity();
    this._finalMatrix = Matrix44.identity();
    this._invMatrix = Matrix44.identity();
    this._dirtyAsElement = true;
    this._currentCalcMode = 'euler'; // true: calc rotation matrix using quaternion. false: calc rotation matrix using Euler
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement = 0;
    this._accumulatedAncestryNameWithUpdateInfoString = '';
    this._accumulatedAncestryNameWithUpdateInfoStringNormal = '';
    this._accumulatedAncestryNameWithUpdateInfoStringInv = '';
    this._animationLine = {};
    this._transparentByUser = false;
    this.opacity = 1.0;

    this._activeAnimationLineName = null;

    this._camera = null;
  }


  _needUpdate() {
    this._dirtyAsElement = true;
    this._calculatedInverseMatrix = false;
    this._updateCountAsElement++;
  }

  get updateCountAsElement() {
    return this._updateCountAsElement;
  }

  _getAnimatedTransformValue(value, animation, type) {
    if (typeof animation !== 'undefined' && animation[type]) {
      return AnimationUtil.interpolate(animation[type].input, animation[type].output, value, animation[type].outputComponentN);
    } else {
    //  console.warn(this._instanceName + 'doesn't have ' + type + ' animation data. GLBoost returned default ' + type + ' value.');
      return this['_' + type];
    }
  }

  set translate(vec) {
    if (this._translate.isEqual(vec)) {
      return;
    }
    this._translate = vec;
    this._needUpdate();
  }

  _getCurrentAnimationInputValue(inputName) {
    return this._parent._getCurrentAnimationInputValue(inputName);
  }

  get translate() {
    if (this._activeAnimationLineName) {
      return this.getTranslateAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._translate;
    }
  }

  getTranslateAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'translate');
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
    if (this._activeAnimationLineName) {
      return this.getRotateAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._rotate;
    }
  }

  getRotateAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'rotate');
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
    if (this._activeAnimationLineName) {
      return this.getQuaternionAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._quaternion;
    }
  }

  getQuaternionAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'quaternion');
  }

  set scale(vec) {
    if (this._scale.isEqual(vec)) {
      return;
    }
    this._scale = vec;
    this._needUpdate();
  }

  get scale() {
    if (this._activeAnimationLineName) {
      return this.getScaleAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._scale;
    }
  }

  getScaleAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'scale');
  }

  multiplyMatrix(mat) {
    this._matrix = mat;
    this._currentCalcMode = 'matrix';
    this._needUpdate();
  }

  getMatrixAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'matrix');
  }

  get matrix() {
    if (this._activeAnimationLineName) {
      return this.getMatrixAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._matrix;
    }
  }

  get transformMatrix() {
    if (this._dirtyAsElement) {
      var matrix = Matrix44.identity();
      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix = matrix.multiply(this._matrix);
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

  get transformMatrixOnlyRotate() {

    var rotationMatrix = null;
    if (this._currentCalcMode === 'quaternion') {
      rotationMatrix = this.quaternion.rotationMatrix;
    } else if (this._currentCalcMode === 'matrix') {
      rotationMatrix = this.matrix;
      rotationMatrix.m03 = 0;
      rotationMatrix.m13 = 0;
      rotationMatrix.m23 = 0;
      rotationMatrix.m30 = 0;
      rotationMatrix.m31 = 0;
      rotationMatrix.m32 = 0;
    } else {
      rotationMatrix = Matrix44.rotateX(this.rotate.x).
      multiply(Matrix44.rotateY(this.rotate.y)).
      multiply(Matrix44.rotateZ(this.rotate.z));
    }

    return rotationMatrix;
  }

  get transformMatrixOnlyRotateOnInit() {

    var rotationMatrix = null;
    if (this._currentCalcMode === 'quaternion') {
      rotationMatrix = this.getQuaternionAt('time', 0).rotationMatrix;
    } else if (this._currentCalcMode === 'matrix') {
      rotationMatrix = this.getMatrixAt('time', 0);
      rotationMatrix.m03 = 0;
      rotationMatrix.m13 = 0;
      rotationMatrix.m23 = 0;
      rotationMatrix.m30 = 0;
      rotationMatrix.m31 = 0;
      rotationMatrix.m32 = 0;
    } else {
      rotationMatrix = Matrix44.rotateX(this.getRotateAt('time', 0).x).
      multiply(Matrix44.rotateY(this.getRotateAt('time', 0).y)).
      multiply(Matrix44.rotateZ(this.getRotateAt('time', 0).z));
    }

    return rotationMatrix;
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
    if (this._accumulatedAncestryNameWithUpdateInfoString !== tempString || typeof this._matrixAccumulatedAncestry === 'undefined') {
      this._matrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatrices(this, true);
      this._accumulatedAncestryNameWithUpdateInfoString = tempString;
    }

    return this._matrixAccumulatedAncestry;
  }

  get normalMatrixAccumulatedAncestry() {
    var tempString = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempString);
    if (this._accumulatedAncestryNameWithUpdateInfoStringNormal !== tempString || typeof this._normalMatrixAccumulatedAncestry === 'undefined') {
      let world_m = this._multiplyMyAndParentTransformMatrices(this, true);
      this._normalMatrixAccumulatedAncestry = Matrix44.invert(world_m).transpose().toMatrix33();
      this._accumulatedAncestryNameWithUpdateInfoStringNormal = tempString;
    }

    return this._normalMatrixAccumulatedAncestry;
  }


  get inverseTransformMatrixAccumulatedAncestryWithoutMySelf() {
    if (this._parent === null) {
      return Matrix44.identity();
    }

    var tempString = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempString);
    if (this._accumulatedAncestryNameWithUpdateInfoStringInv !== tempString || typeof this._invMatrixAccumulatedAncestry === 'undefined') {
      this._invMatrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatricesInInverseOrder(this, false).invert();
      this._accumulatedAncestryNameWithUpdateInfoStringInv = tempString;
    }

    return this._invMatrixAccumulatedAncestry;
  }

  _multiplyMyAndParentRotateMatrices(currentElem, withMySelf) {
    if (currentElem._parent === null) {
      if (withMySelf) {
        return currentElem.transformMatrixOnlyRotate;
      } else {
        return Matrix44.identity();
      }
    } else {
      let currentMatrix = Matrix44.identity();
      if (withMySelf) {
        currentMatrix = currentElem.transformMatrixOnlyRotate;
      }
      return this._multiplyMyAndParentRotateMatrices(currentElem._parent, true).multiply(currentMatrix);
    }
  }

  get rotateMatrixAccumulatedAncestry() {
    /*
    var mat = this._multiplyMyAndParentTransformMatrices(this);
    var scaleX = Math.sqrt(mat.m00*mat.m00 + mat.m10*mat.m10 + mat.m20*mat.m20);
    var scaleY = Math.sqrt(mat.m01*mat.m01 + mat.m11*mat.m11 + mat.m21*mat.m21);
    var scaleZ = Math.sqrt(mat.m02*mat.m02 + mat.m12*mat.m12 + mat.m22*mat.m22);

    return new Matrix44(
      mat.m00/scaleX, mat.m01/scaleY, mat.m02/scaleZ, 0,
      mat.m10/scaleX, mat.m11/scaleY, mat.m12/scaleZ, 0,
      mat.m20/scaleX, mat.m21/scaleY, mat.m22/scaleZ, 0,
      0, 0, 0, 1
    );*/
    return this._multiplyMyAndParentRotateMatrices(this, true);
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

  set transparent(flg) {
    this._transparentByUser = flg;
  }

  isTransparent() {
    return (this._opacity < 1.0 || this._transparentByUser) ? true : false;
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

  // used by library (not Application)
  toStringWithUpdateInfo() {
  //  return '&' + this._instanceName + '#' + this._updateCountAsElement;  // human readable
    return this._instanceName + this._updateCountAsElement;                // faster
  }

  setAnimationAtLine(lineName, attributeName, inputArray, outputArray) {
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
    if (!this._animationLine[lineName]) {
      this._animationLine[lineName] = {};
    }
    this._animationLine[lineName][attributeName] = {
      input: inputArray,
      output: outputArray,
      outputAttribute: attributeName,
      outputComponentN: outputComponentN
    };
  }

  setActiveAnimationLine(lineName) {
    this._activeAnimationLineName = lineName;
  }

  hasAnimation(lineName) {
    if (this._animationLine[lineName]) {
      return true;
    } else {
      return false;
    }
  }

  set currentCalcMode(mode) {
    this._currentCalcMode = mode;
  }

  get currentCalcMode() {
    return this._currentCalcMode;
  }

  set camera(camera) {
    this._camera = camera;
  }

  get camera() {
    return this._camera;
  }
}
