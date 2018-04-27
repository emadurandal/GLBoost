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

    // Static
    this._translateStatic = this._translate.clone();
    this._scaleStatic = this._scale.clone();
    this._rotateStatic = this._rotate.clone();
    this._quaternionStatic = this._quaternion.clone();
    this._matrixStatic = this._matrix.clone();


    this._finalMatrix = Matrix44.identity();

    this._dirtyAsElement = true;
    this._currentCalcMode = 'euler'; // true: calc rotation matrix using quaternion. false: calc rotation matrix using Euler

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
    this._latest_rotation_driver_type = LatestRotationDriverType.EulerAngles;
  }


  get updateCountAsElement() {
    return this._updateCountAsElement;
  }

  _needUpdate() {
    this._dirtyAsElement = true;
    this._is_inverse_trs_matrix_updated = false;
    this._updateCountAsElement++;
  }

  _getAnimatedTransformValue(value, animation, type) {
    if (typeof animation !== 'undefined' && animation[type]) {
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
    this._translate = vec;
    this._is_trs_matrix_updated = false;
    this._is_translate_updated = true;
    this._needUpdate();
  }

  getTranslateNotAnimated() {
    return this._translate;
  }

  get translate() {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getTranslateAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    }
    if (value === null) {
      return this._translate;
    }
    return value;
  }

  getTranslateAt(lineName, inputValue) {
    return this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'translate');
  }

  getTranslateAtOrStatic(lineName, inputValue) {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getTranslateAt(this._activeAnimationLineName, inputValue);
    }
    if (value === null) {
      return this._translate;
    }
    return value;
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
    this._is_euler_angles_updated = true;
    this._latest_rotation_driver_type = LatestRotationDriverType.EulerAngles;
    this._needUpdate();
  }

  get rotate() {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getRotateAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    }
    if (value === null) {
      return this._rotate;
    }
    return value;
  }

  getRotateAt(lineName, inputValue) {
    return this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'rotate');
  }

  getRotateAtOrStatic(lineName, inputValue) {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getRotateAt(this._activeAnimationLineName, inputValue);
    }
    if (value === null) {
      return this._rotate;
    }
    return value;
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
    this._is_scale_updated = true;
    this._needUpdate();
  }

  get scale() {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getScaleAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    }
    if (value === null) {
      return this._scale;
    }
    return value;
  }

  getScaleAt(lineName, inputValue) {
    return this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'scale');
  }

  getScaleAtOrStatic(lineName, inputValue) {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getScaleAt(this._activeAnimationLineName, inputValue);
    }
    if (value === null) {
      return this._scale;
    }
    return value;
  }

  getScaleNotAnimated() {
    return this._scale;
  }

  multiplyMatrix(mat) {
    this._matrix = mat.clone();
    this._currentCalcMode = 'matrix';
//    this._translate = new Vector3(mat.m03, mat.m03, mat.m03);
    this._is_trs_matrix_updated = true;
    this._latest_rotation_driver_type = LatestRotationDriverType.TrsMatrix;
    this._needUpdate();
  }

  get matrix() {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getMatrixAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    }
    if (value === null) {
      return this._matrix;
    }
    return value;
  }

  getMatrixAt(lineName, inputValue) {
    return this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'matrix');
  }

  getMatrixAtOrStatic(lineName, inputValue) {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getMatrixAt(this._activeAnimationLineName, inputValue);
    }
    if (value === null) {
      return this._matrix;
    }
    return value;
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

  /*
  getTransformMatrixAt(inputValue) {
    let input = inputValue;
    if (this._dirtyAsElement) {
//    if (true) {

      if (this._currentCalcMode === 'matrix') {//} && !input) { <- この　} && !input)  があると、上のif (true)が有効の時にWalkingLadyがひしゃげる
        //let matrix = Matrix44.identity();
        this._matrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
        this._dirtyAsElement = false;
        return this._matrix.clone();
      }

      let rotationMatrix = Matrix44.identity();
      // if input is truly, glTF animation's can be regarded as quaternion
      if (this._currentCalcMode === 'quaternion' || input) {
        rotationMatrix = this.getQuaternionAtOrStatic(this._activeAnimationLineName, input).rotationMatrix;
      } else {
        let rotateVec = this.getRotateAtOrStatic(this._activeAnimationLineName, input);
        rotationMatrix.rotateZ(rotateVec.z).
        multiply(Matrix44.rotateY(rotateVec.y)).
        multiply(Matrix44.rotateX(rotateVec.x));
      }

      this._matrix = Matrix44.multiply(rotationMatrix, Matrix44.scale(this.getScaleAtOrStatic(this._activeAnimationLineName, input)));
      let translateVec = this.getTranslateAtOrStatic(this._activeAnimationLineName, input);
      this._matrix.m03 = translateVec.x;
      this._matrix.m13 = translateVec.y;
      this._matrix.m23 = translateVec.z;

      this._dirtyAsElement = false;

    } else {
     // console.count('Cache')
    }
    

    return this._matrix.clone();
  }
*/


  getTransformMatrixAt(inputValue) {
    let input = inputValue;

  //  if (this._is_trs_matrix_updated && input === null) {
    if (false) {

    } else {
  //    console.log('hoge');
      if (this._latest_rotation_driver_type === LatestRotationDriverType.TrsMatrix) {
 //     if (this._currentCalcMode === 'matrix') {
//      if (this._is_trs_matrix_updated) {
        this._matrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
/*
        let matrix = this.getMatrixAt(this._activeAnimationLineName, input);
        if (matrix !== null) {
          this.multiplyMatrix(matrix);
    //      this._is_trs_matrix_updated = true;
          return this._matrix.clone();  
        } else {
  //        let matrix = this.getMatrixAt(this._activeAnimationLineName, input);
        let matrix = this.getMatrixNotAnimated(this._activeAnimationLineName, input);
        this.multiplyMatrix(matrix);
          return this._matrix.clone();  
        }
        */
        return this._matrix.clone();
      }


    //if (input !== null) {

      let rotationMatrix;
      // if input is truly, glTF animation's can be regarded as quaternion
      if (this._is_quaternion_updated || input) {
        rotationMatrix = this.getQuaternionAtOrStatic(this._activeAnimationLineName, input).rotationMatrix;
  //    } else if (this._is_euler_angles_updated) {
      } else {
        let rotateVec = this.getRotateAtOrStatic(this._activeAnimationLineName, input);
        rotationMatrix = Matrix44.rotateZ(rotateVec.z).
        multiply(Matrix44.rotateY(rotateVec.y)).
        multiply(Matrix44.rotateX(rotateVec.x));
      }

      this._matrix = Matrix44.multiply(rotationMatrix, Matrix44.scale(this.getScaleAtOrStatic(this._activeAnimationLineName, input)));
      let translateVec = this.getTranslateAtOrStatic(this._activeAnimationLineName, input);
      this._matrix.m03 = translateVec.x;
      this._matrix.m13 = translateVec.y;
      this._matrix.m23 = translateVec.z;

      this._is_trs_matrix_updated = true;
    }

    return this._matrix.clone();
  }


  set quaternion(quat) {
    if (this._quaternion.isEqual(quat)) {
      return;
    }
    this._currentCalcMode = 'quaternion';
    this._quaternion = quat;
    this._is_trs_matrix_updated = false;
    this._latest_rotation_driver_type = LatestRotationDriverType.Quaternion;
    this._needUpdate();
  }

  get quaternion() {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getQuaternionAt(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
    }
    if (value === null) {
      return this._quaternion;
    }
    this.quaternion = value;
    return value;
  }

  getQuaternionAt(lineName, inputValue) {
    return this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'quaternion');
  }

  getQuaternionAtOrStatic(lineName, inputValue) {
    let value = null;
    if (this._activeAnimationLineName) {
      value = this.getQuaternionAt(this._activeAnimationLineName, inputValue);
    }
    if (value === null) {
      return this._quaternion;
    }
    this.quaternion = value;
    return value;
  }
  
  getQuaternionNotAnimated() {
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

  set currentCalcMode(mode) {
    switch (mode) {
      case "matrix": this._latest_rotation_driver_type = LatestRotationDriverType.TrsMatrix; break; 
      case "euler": this._latest_rotation_driver_type = LatestRotationDriverType.EulerAngles; break; 
      case "quaternion": this._latest_rotation_driver_type = LatestRotationDriverType.Quaternion; break; 
    }
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

    instance._latest_rotation_driver_type = this._latest_rotation_driver_type;
    instance._is_trs_matrix_updated = this._is_trs_matrix_updated;
    instance._is_translate_updated = this._is_translate_updated;
    instance._is_scale_updated = this._is_scale_updated;
    instance._is_quaternion_updated = this._is_quaternion_updated;
    instance._is_euler_angles_updated = this._is_euler_angles_updated;
    instance._is_inverse_trs_matrix_updated = this._is_inverse_trs_matrix_updated;

    instance._updateCountAsElement = this._updateCountAsElement;
  }
}
