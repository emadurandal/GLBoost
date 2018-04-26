import Vector3 from '../math/Vector3';
import Quaternion from '../math/Quaternion';
import Matrix44 from '../math/Matrix44';
import GLBoostObject from '../core/GLBoostObject';
import AnimationUtil from '../../low_level/misc/AnimationUtil';

export default class L_Element extends GLBoostObject {
  constructor(glBoostContext, toRegister = true) {
    super(glBoostContext, toRegister);

    this._translate = Vector3.zero();
    this._scale = new Vector3(1, 1, 1);

    this._rotate = Vector3.zero();
    this._quaternion = new Quaternion(0, 0, 0, 1);
    this._matrix = Matrix44.identity();

    this._translateOnInit = this._translate.clone();
    this._scaleOnInit = this._scale.clone();

    this._rotateOnInit = this._rotate.clone();
    this._quaternionOnInit = this._quaternion.clone();
    this._matrixOnInit = this._matrix.clone();


    this._finalMatrix = Matrix44.identity();

    this._dirtyAsElement = true;
    this._currentCalcMode = 'euler'; // true: calc rotation matrix using quaternion. false: calc rotation matrix using Euler

    this._updateCountAsElement = 0;
    this._activeAnimationLineName = null;
  }


  get updateCountAsElement() {
    return this._updateCountAsElement;
  }

  _needUpdate() {
    this._dirtyAsElement = true;
  }

  _getAnimatedTransformValue(value, animation, type) {
    if (typeof animation !== 'undefined' && animation[type]) {
      return AnimationUtil.interpolate(animation[type].input, animation[type].output, value, animation[type].outputComponentN);
    } else {
      //  console.warn(this._instanceName + 'doesn't have ' + type + ' animation data. GLBoost returned default ' + type + ' value.');
      return this['_' + type];
    }
  }

  _getCurrentAnimationInputValue(inputName) {
    let value = this._currentAnimationInputValues[inputName];
    if (typeof(value) === 'number') {
      return value;
    } else {
      return null;
    }
  }

  /**
   * [en] Set animation input value (for instance frame value), This value affect all child elements in this scene graph (recursively).<br>
   * [ja] アニメーションのための入力値（例えばフレーム値）をセットします。この値はシーングラフに属する全ての子孫に影響します。
   * @param {string} inputName [en] inputName name of input value. [ja] 入力値の名前
   * @param {number|Vector2|Vector3|Vector4|*} inputValue [en] input value of animation. [ja] アニメーションの入力値
   */
  setCurrentAnimationValue(inputName, inputValue) {
    this._setDirtyToAnimatedElement(inputName);
    this._currentAnimationInputValues[inputName] = inputValue;
  }

  removeCurrentAnimationValue(inputName) {
    delete this._currentAnimationInputValues[inputName];
  }

  setActiveAnimationLine(lineName) {
    this._activeAnimationLineName = lineName;
  }

  set translate(vec) {
    if (this._translate.isEqual(vec)) {
      return;
    }
    if (this._currentCalcMode === 'matrix') {
      this.matrix.m03 = vec.x;
      this.matrix.m13 = vec.y;
      this.matrix.m23 = vec.z;
    }
    this._translate = vec;
    this._is_trs_matrix_updated = false;
    this._needUpdate();
  }

  getTranslateNotAnimated() {
    return this._translate;
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
    this._is_trs_matrix_updated = false;
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

  getRotateNotAnimated() {
    return this._rotate;
  }

  set scale(vec) {
    if (this._scale.isEqual(vec)) {
      return;
    }
    this._scale = vec;
    this._is_trs_matrix_updated = false;
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

  getScaleNotAnimated() {
    return this._scale;
  }

  multiplyMatrix(mat) {
    this._matrix = mat.clone();
    this._currentCalcMode = 'matrix';
//    this._translate = new Vector3(mat.m03, mat.m03, mat.m03);
    this._is_trs_matrix_updated = true;
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

  getMatrixNotAnimated() {
    return this._matrix;
  }

  get transformMatrix() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    const matrix = this.getTransformMatrixAt(input);

    return matrix;
  }

  getTransformMatrixAt(inputValue, lineName, accumulateMyAndParentNameIsNoUpdate = false) {
    let input = inputValue;
    if (this._dirtyAsElement) {
//    if (true) {

      var matrix = Matrix44.identity();

      if (this._currentCalcMode === 'matrix' && !input) {
        this._finalMatrix = matrix.multiply(this.getMatrixAt(this._activeAnimationLineName, input));
        this._dirtyAsElement = false;
        return this._finalMatrix.clone();
      }

      var rotationMatrix = Matrix44.identity();
      // if input is truly, glTF animation's can be regarded as quaternion
      if (this._currentCalcMode === 'quaternion' || input) {
        rotationMatrix = this.getQuaternionAt(this._activeAnimationLineName, input).rotationMatrix;
      } else {
        let rotateVec = this.getRotateAt(this._activeAnimationLineName, input);
        rotationMatrix.rotateZ(rotateVec.z).
        multiply(Matrix44.rotateY(rotateVec.y)).
        multiply(Matrix44.rotateX(rotateVec.x));
      }

      this._finalMatrix = matrix.multiply(Matrix44.scale(this.getScaleAt(this._activeAnimationLineName, input))).multiply(rotationMatrix);
      let translateVec = this.getTranslateAt(this._activeAnimationLineName, input);
      this._finalMatrix.m03 = translateVec.x;
      this._finalMatrix.m13 = translateVec.y;
      this._finalMatrix.m23 = translateVec.z;

      this._dirtyAsElement = false;

    } else {
     // console.count('Cache')
    }
    

    return this._finalMatrix.clone();
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
    this._is_trs_matrix_updated = false;
    this._needUpdate();
  }

  get quaternion() {
    if (this._activeAnimationLineName) {
      return this.getQuaternionAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    } else {
      return this._quaternion;
    }
  }

  getQuaternionNotAnimated() {
    return this._quaternion;
  }

  getQuaternionAt(lineName, value) {
    return this._getAnimatedTransformValue(value, this._animationLine[lineName], 'quaternion');
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

  get normalMatrix() {
    return Matrix44.invert(this.transformMatrix).transpose().toMatrix33();
  }

  set currentCalcMode(mode) {
    this._currentCalcMode = mode;
  }

  get currentCalcMode() {
    return this._currentCalcMode;
  }

  _copy(instance) {
    super._copy(instance);

    instance._translate = this._translate.clone();
    instance._scale = this._scale.clone();
    instance._rotate = this._rotate.clone();
    instance._quaternion = this._quaternion.clone();
    instance._matrix = this._matrix.clone();
    instance._finalMatrix = this._finalMatrix.clone();
    instance._dirtyAsElement = this._dirtyAsElement;
    instance._currentCalcMode = this._currentCalcMode;

    instance._updateCountAsElement = this._updateCountAsElement;
  }
}
