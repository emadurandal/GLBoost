import Vector2 from '../math/Vector2';
import Vector3 from '../math/Vector3';
import Vector4 from '../math/Vector4';
import Quaternion from '../math/Quaternion';
import Matrix44 from '../math/Matrix44';
import GLBoostObject from '../core/GLBoostObject';
import AnimationUtil from '../../low_level/misc/AnimationUtil';

const LatestRotationDriverType = {
  TrsMatrix: Symbol(),
  Quaternion: Symbol(),
  EulerAngles: Symbol()
};

export default class L_Element extends GLBoostObject {
  constructor(glBoostContext, toRegister = true) {
    super(glBoostContext, toRegister);

    // Live (Static or Animation)
    this._translate = Vector3.zero();
    this._scale = new Vector3(1, 1, 1);
    this._rotate = Vector3.zero();
    this._quaternion = new Quaternion(0, 0, 0, 1);
    this._matrix = Matrix44.identity();

//    this._finalMatrix = Matrix44.identity();

    this._updateCountAsElement = 0;
    this._animationLine = {};
    this._currentAnimationInputValues = {};
    this._activeAnimationLineName = null;

    this._is_trs_matrix_updated = true;
    this._is_translate_updated = true;
    this._is_scale_updated = true;
    this._is_quaternion_updated = true;
    this._is_euler_angles_updated = true;
    this._is_inverse_trs_matrix_updated = false;
  }


  get updateCountAsElement() {
    return this._updateCountAsElement;
  }

  _needUpdate() {
    this._is_inverse_trs_matrix_updated = false;
    this._updateCountAsElement++;
  }

  _getAnimatedTransformValue(value, animation, type) {
    if (typeof animation !== 'undefined' && animation[type] && value !== null && value !== void 0) {
      return AnimationUtil.interpolate(animation[type].input, animation[type].output, value, animation[type].outputComponentN);
    } else {
      //  console.warn(this._instanceName + 'doesn't have ' + type + ' animation data. GLBoost returned default ' + type + ' value.');
      return null;
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

  hasAnimation(lineName) {
    if (this._animationLine[lineName]) {
      return true;
    } else {
      return false;
    }
  }

  getStartInputValueOfAnimation(lineName) {
    let inputLine = this._animationLine[lineName];
    let latestInputValue = Number.MAX_VALUE;
    if (typeof inputLine === 'undefined') {
      return latestInputValue;
    }
    for (let attributeName in inputLine) {
      let inputValueArray = inputLine[attributeName].input;
      let inputLatestValueAtThisAttribute = inputValueArray[0];
      if (inputLatestValueAtThisAttribute < latestInputValue) {
        latestInputValue = inputLatestValueAtThisAttribute;
      }
    }
    return latestInputValue;
  }

  getEndInputValueOfAnimation(lineName) {
    let inputLine = this._animationLine[lineName];
    let latestInputValue = - Number.MAX_VALUE;
    if (typeof inputLine === 'undefined') {
      return latestInputValue;
    }
    for (let attributeName in inputLine) {
      let inputValueArray = inputLine[attributeName].input;
      let inputLatestValueAtThisAttribute = inputValueArray[inputValueArray.length - 1];
      if (inputLatestValueAtThisAttribute > latestInputValue) {
        latestInputValue = inputLatestValueAtThisAttribute;
      }
    }
    return latestInputValue;
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
    this._translate = vec.clone();
    this._is_trs_matrix_updated = false;
    this._is_translate_updated = true;
    this._needUpdate();
  }

  getTranslateNotAnimated() {
    if (!this._is_translate_updated && this._is_trs_matrix_updated) {
      this._translate.x = this._matrix.m03;
      this._translate.y = this._matrix.m13;
      this._translate.z = this._matrix.m23;
      this._is_translate_updated = true;
    }
    return this._translate.clone();
  }

  get translate() {
    return this.getTranslateAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
  }

  getTranslateAt(lineName, inputValue) {
    let value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'translate');
    if (value !== null) {
      this._translate = value;
      this._is_translate_updated = true;  
      this._is_trs_matrix_updated = false;
    }
    return value;
  }

  getTranslateAtOrStatic(lineName, inputValue) {
    let value = this.getTranslateAt(lineName, inputValue);
    if (value === null) {
      return this.getTranslateNotAnimated();
    }
    return value;
  }

  set rotate(vec) {
    if (this._rotate.isEqual(vec)) {
      return;
    }
    this._rotate = vec.clone();
    this._is_trs_matrix_updated = false;
    this._is_euler_angles_updated = true;
    this._needUpdate();
  }

  get rotate() {
    return this.getRotateAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
  }

  getRotateAt(lineName, inputValue) {
    let value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'rotate');
    if (value !== null) {
      this._rotate = value;
      this._is_euler_angles_updated = true;  
    }
    return value;
  }

  getRotateAtOrStatic(lineName, inputValue) {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getRotateAt(this._activeAnimationLineName, inputValue);
    }
    if (value === null) {
      return this.getRotateNotAnimated();
    }
    return value;
  }

  getRotateNotAnimated() {
    return this._rotate.clone();
  }

  set scale(vec) {
    if (this._scale.isEqual(vec)) {
      return;
    }
    this._scale = vec.clone();
    this._is_trs_matrix_updated = false;
    this._is_scale_updated = true;
    this._needUpdate();
  }

  get scale() {
    return this.getScaleAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
  }

  getScaleAt(lineName, inputValue) {
    let value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'scale');
    if (value !== null) {
      this._scale = value.clone();
      this._is_scale_updated = true;  
      this._is_trs_matrix_updated = false;
    }
    return value;
  }

  getScaleAtOrStatic(lineName, inputValue) {
    let value = this.getScaleAt(lineName, inputValue);
    if (value === null) {
      return this.getScaleNotAnimated();
    }
    return value;
  }

  getScaleNotAnimated() {
    let m = this.getMatrixNotAnimated();
    
    if (!this._is_scale_updated && this._is_trs_matrix_updated) {
      this._scale.x = Math.sqrt(m.m00*m.m00 + m.m01*m.m01 + m.m02*m.m02);
      this._scale.y = Math.sqrt(m.m10*m.m10 + m.m11*m.m11 + m.m12*m.m12);
      this._scale.z = Math.sqrt(m.m20*m.m20 + m.m21*m.m21 + m.m22*m.m22);
      this._is_scale_updated = true;
    }
    
      return this._scale.clone();
  }

  set matrix(mat) {
    this._matrix = mat.clone();
    this._is_trs_matrix_updated = true;
    this._is_scale_updated = false;
    this._is_translate_updated = false;
    this._is_quaternion_updated = false;
    this._is_euler_angles_updated = false;
    this._needUpdate();
  }

  get matrix() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let value = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
    return value;
  }

  getMatrixAt(lineName, inputValue) {
    let value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'matrix');
    if (value !== null) {
      this._translate = value;
      this._is_translate_updated = true;  
    }
    return value;
  }

  getMatrixNotAnimated() {
    return this._matrix.clone();
  }

  get transformMatrix() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    const matrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);

    return matrix;
  }

  isTrsMatrixNeeded(lineName, inputValue) {
    let result = (
      this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'translate') === null &&
      this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'rotate') === null &&
      this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'quaternion') === null &&
      this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'scale') === null
    );
    return result;
  }


  getMatrixAtOrStatic(lineName, inputValue) {
    let input = inputValue;

    if (this._is_trs_matrix_updated && this.isTrsMatrixNeeded(lineName, inputValue)) {
      return this._matrix.clone();
    }


    let rotationMatrix = Matrix44.identity();
    if (this._is_quaternion_updated) {
      let quaternion = this.getQuaternionAtOrStatic(lineName, input);
      rotationMatrix = quaternion.rotationMatrix;
    } else if (this._is_euler_angles_updated) {
      let rotateVec = this.getRotateAtOrStatic(lineName, input);
      rotationMatrix = Matrix44.rotateZ(rotateVec.z).
      multiply(Matrix44.rotateY(rotateVec.y)).
      multiply(Matrix44.rotateX(rotateVec.x));
    }

    let scale = new Vector3(1.0, 1.0, 1.0);
    if (this._is_scale_updated) {
      scale = this.getScaleAtOrStatic(lineName, input);
    }

    this._matrix = Matrix44.multiply(rotationMatrix, Matrix44.scale(scale));
    if (this._is_translate_updated) {
      let translateVec = this.getTranslateAtOrStatic(lineName, input);
      this._matrix.m03 = translateVec.x;
      this._matrix.m13 = translateVec.y;
      this._matrix.m23 = translateVec.z;
    }

    this._is_trs_matrix_updated = true;

    
    return this._matrix.clone();
  }


  set quaternion(quat) {
    if (this._quaternion.isEqual(quat)) {
      return;
    }
    this._quaternion = quat.clone();
    this._is_trs_matrix_updated = false;
    this._is_quaternion_updated = true;
    this._needUpdate();
  }

  get quaternion() {
    return this.getQuaternionAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
  }

  getQuaternionAt(lineName, inputValue) {
    let value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'quaternion');
    if (value !== null) {
      this._quaternion = value;
      this._is_quaternion_updated = true;  
      this._is_trs_matrix_updated = false;
    }
    return value;
  }

  getQuaternionAtOrStatic(lineName, inputValue) {
    let value = this.getQuaternionAt(lineName, inputValue);
    if (value === null) {
      return this.getQuaternionNotAnimated();
    }
    return value;
  }
  
  getQuaternionNotAnimated() {
    let value = null;
    if (!this._is_quaternion_updated) {
      if (this._is_trs_matrix_updated) {
        value = Quaternion.quaternionFromRotationMatrix(this._matrix);
      } else if (this._is_euler_angles_updated) {
        value = Quaternion.quaternionFromRotationMatrix(Matrix44.rotateXYZ(this._rotate.x, this._rotate.y, this._rotate.z));
      }
      this._quaternion = value;
      this._is_quaternion_updated = true;
      this._is_trs_matrix_updated = false;
    }

    return this._quaternion;
  }

  get inverseTransformMatrix() {
    if (!this._is_inverse_trs_matrix_updated) {
      this._invMatrix = this.transformMatrix.invert();
      this._is_inverse_trs_matrix_updated = true;
    }
    return this._invMatrix.clone();
  }

  get normalMatrix() {
    return Matrix44.invert(this.transformMatrix).transpose().toMatrix33();
  }

  _copy(instance) {
    super._copy(instance);

    instance._translate = this._translate.clone();
    instance._scale = this._scale.clone();
    instance._rotate = this._rotate.clone();
    instance._quaternion = this._quaternion.clone();
    instance._matrix = this._matrix.clone();


    instance._animationLine = {};

    for (let lineName in this._animationLine) {
      instance._animationLine[lineName] = {};
      for (let attributeName in this._animationLine[lineName]) {
        instance._animationLine[lineName][attributeName] = {};
        instance._animationLine[lineName][attributeName].input = this._animationLine[lineName][attributeName].input.concat();

        let instanceOutput = [];
        let thisOutput = this._animationLine[lineName][attributeName].output;
        for (let i=0; i<thisOutput.length; i++) {
          instanceOutput.push((typeof thisOutput[i] === 'number') ? thisOutput[i] : thisOutput[i].clone());
        }
        instance._animationLine[lineName][attributeName].output = instanceOutput;

        instance._animationLine[lineName][attributeName].outputAttribute = this._animationLine[lineName][attributeName].outputAttribute;

        instance._animationLine[lineName][attributeName].outputComponentN = this._animationLine[lineName][attributeName].outputComponentN;
      }
    }

    instance._is_trs_matrix_updated = this._is_trs_matrix_updated;
    instance._is_translate_updated = this._is_translate_updated;
    instance._is_scale_updated = this._is_scale_updated;
    instance._is_quaternion_updated = this._is_quaternion_updated;
    instance._is_euler_angles_updated = this._is_euler_angles_updated;
    instance._is_inverse_trs_matrix_updated = this._is_inverse_trs_matrix_updated;

    instance._updateCountAsElement = this._updateCountAsElement;
  }
}
