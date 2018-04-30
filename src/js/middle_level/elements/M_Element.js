import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';
import Quaternion from '../../low_level/math/Quaternion';
import Matrix44 from '../../low_level/math/Matrix44';
import L_Element from '../../low_level/elements/L_Element';

export default class M_Element extends L_Element {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._parent = null;
    this._invMatrix = Matrix44.identity();
    this._matrixGetMode = ''; // 'notanimated', 'animate_<input_value>'
    this._accumulatedAncestryObjectUpdateNumber = -Math.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberWithoutMySelf = -Math.MAX_VALUE;    
    this._accumulatedAncestryObjectUpdateNumberNormal = -Math.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberInv = -Math.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberJoint = -Math.MAX_VALUE;
    this._transparentByUser = false;
    this._opacity = 1.0;
    this._isAffectedByWorldMatrix = true;
    this._isAffectedByWorldMatrixAccumulatedAncestry = true;
    this._isAffectedByViewMatrix = true;
    this._isAffectedByProjectionMatrix = true;

    this._toInheritCurrentAnimationInputValue = true;

    this._camera = null;
    this._customFunction = null;
    this._isVisible = true;

    this._gizmos = [];
    this._masterElement = null;

    this._worldMatrix = new Matrix44();
  }

  _accumulateMyAndParentNameWithUpdateInfo(currentElem) {
    if (currentElem._parent === null) {
      return currentElem.elementUpdateNumber;
    } else {
      return this._accumulateMyAndParentNameWithUpdateInfo(currentElem._parent) + currentElem.elementUpdateNumber;
    }
  }

  set toInheritCurrentAnimationInputValue(flg) {
    this._toInheritCurrentAnimationInputValue = flg;
  }

  get toInheritCurrentAnimationInputValue() {
    return this._toInheritCurrentAnimationInputValue;
  }

  _getCurrentAnimationInputValue(inputName) {
    let value = this._currentAnimationInputValues[inputName];
    if (typeof(value) === 'number') {
      return value;
    } else if (this._toInheritCurrentAnimationInputValue && this._parent) {
      let val = this._parent._getCurrentAnimationInputValue(inputName);
      if (val === void 0) {
        val = null;
      }
      return val;
    } else {
      return null;
    }
  }

  _setDirtyToAnimatedElement(inputName) {
    if (this.hasAnimation(inputName)) {
      this._needUpdate();
    }
  }

  get rotateScaleTranslate() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }
    if (this._dirtyAsElement || this._matrixGetMode !== 'animated_' + input) {
      var matrix = Matrix44.identity();

      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix = matrix.multiply(this.getMatrixNotAnimated());
        this._dirtyAsElement = false;
        return this._finalMatrix.clone();
      }

      var rotationMatrix = Matrix44.identity();
      // if input is truly, glTF animation's can be regarded as quaternion
      if (this._currentCalcMode === 'quaternion') {
        rotationMatrix = this.quaternion.rotationMatrix;
      } else {
        
        //rotationMatrix = Matrix44.rotateX(this.rotate.x).
        //multiply(Matrix44.rotateY(this.rotate.y)).
        //multiply(Matrix44.rotateZ(this.rotate.z));

        rotationMatrix.rotateZ(this.rotate.z).
        multiply(Matrix44.rotateY(this.rotate.y)).
        multiply(Matrix44.rotateX(this.rotate.x));
      }

      Matrix44.translate(this.translate);

      this._finalMatrix = Matrix44.translate(this.translate).multiply(Matrix44.scale(this.scale)).multiply(rotationMatrix);

      this._dirtyAsElement = false;
      this._matrixGetMode = 'animated_' + input;
    }

    return this._finalMatrix.clone();
  }

  get transformMatrixOnlyRotate() {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    var rotationMatrix = null;
    if (input || this._currentCalcMode === 'quaternion') {
      rotationMatrix = this.quaternion.rotationMatrix;
    } else if (!input && this._currentCalcMode === 'matrix') {
      rotationMatrix = this.getMatrixNotAnimated();
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

    return rotationMatrix.clone();
  }

  get transformMatrixOnlyRotateOnInit() {
    return this.getTransformMatrixOnlyRotateOn(0);
  }

  getTransformMatrixOnlyRotateOn(value) {
    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    var rotationMatrix = Matrix44.identity();
    if (input || this._currentCalcMode === 'quaternion') {
      rotationMatrix = this.getQuaternionAt('time', value).rotationMatrix;
    } else if (!input && this._currentCalcMode === 'matrix') {
      rotationMatrix = this.getMatrixAt('time', value);
      rotationMatrix.m03 = 0;
      rotationMatrix.m13 = 0;
      rotationMatrix.m23 = 0;
      rotationMatrix.m30 = 0;
      rotationMatrix.m31 = 0;
      rotationMatrix.m32 = 0;
    } else {
      //rotationMatrix = Matrix44.rotateX(this.getRotate('time', value).x).
      //multiply(Matrix44.rotateY(this.getRotateAt('time', value).y)).
      //multiply(Matrix44.rotateZ(this.getRotateAt('time', value).z));
      
      rotationMatrix.rotateZ(this.getRotate('time', value).z).
      multiply(Matrix44.rotateY(this.getRotateAt('time', value).y)).
      multiply(Matrix44.rotateX(this.getRotateAt('time', value).x));
    }

    return rotationMatrix.clone();
  }

  _multiplyMyAndParentTransformMatricesInInverseOrder(withMySelf, input) {
    if (input === void 0 && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let tempNumber = 0;
    if (this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder !== input ||
      this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) ||
      this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder === void 0)
    {

      let currentMatrix = null;
      if (withMySelf) {
        currentMatrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
      } else {
        currentMatrix = Matrix44.identity();
      }
  
      if (this._parent === null) {
        this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = currentMatrix;
        return currentMatrix;
      }

      this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = Matrix44.multiply(currentMatrix, this._parent._multiplyMyAndParentTransformMatricesInInverseOrder(true, input));
      this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder = tempNumber;
      this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder = input;
    }
    return this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder;
  }

  get worldMatrixWithoutMySelf() {
    var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempNumber);
    if (this._accumulatedAncestryObjectUpdateNumberWithoutMySelf !== tempNumber || typeof this._worldMatrixWithoutMySelf === 'undefined') {
      this._worldMatrixWithoutMySelf = this._multiplyMyAndParentTransformMatrices(false, null).clone();
      this._accumulatedAncestryObjectUpdateNumberWithoutMySelf = tempNumber;
    }

    return this._worldMatrixWithoutMySelf;
  }

  get normalMatrix() {
    var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    //console.log(tempNumber);
    if (this._accumulatedAncestryObjectUpdateNumberNormal !== tempNumber || typeof this._normalMatrix === 'undefined') {
      let world_m = this._multiplyMyAndParentTransformMatrices(true, null);
      this._normalMatrix = Matrix44.invert(world_m).transpose().toMatrix33();
      this._accumulatedAncestryObjectUpdateNumberNormal = tempNumber;
    }

    return this._normalMatrix.clone();
  }


  get inverseWorldMatrixWithoutMySelf() {
    if (this._parent === null) {
      return Matrix44.identity();
    }

    return this._multiplyMyAndParentTransformMatricesInInverseOrder(false, null).clone().invert();
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
      return Matrix44.multiply(this._multiplyMyAndParentRotateMatrices(currentElem._parent, true), currentMatrix);
    }
  }

  get inverseWorldMatrix() {
    return this._multiplyMyAndParentTransformMatrices(true, null).clone().invert();
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

  get isTransparent() {
    return this._transparentByUser;
  }

  set isTransparent(flg) {
    this._transparentByUser = flg;
  }

  set dirty(flg) {
    if (flg) {
      this._needUpdate();
    }
  }

  get parent() {
    return this._parent;
  }

  get elementUpdateNumber() {
    return this.classUniqueNumber + this._updateCountAsElement;
  }

  // used by library (not Application)
  toStringWithUpdateInfo() {
    //  return '&' + this._instanceName + '#' + this._updateCountAsElement;  // human readable
    return this._instanceName + this._updateCountAsElement;                // faster
  }

  set camera(camera) {
    this._camera = camera;
  }

  get camera() {
    return this._camera;
  }

  set customFunction(func) {
    this._customFunction = func;
  }

  get customFunction() {
    return this._customFunction;
  }

  prepareToRender() {

  }

  _copy(instance) {
    super._copy(instance);

    instance._parent = this._parent;
    instance._invMatrix = this._invMatrix.clone();
    instance._matrixGetMode = this._matrixGetMode;
    instance._is_inverse_trs_matrix_updated = this._is_inverse_trs_matrix_updated;
    instance._accumulatedAncestryObjectUpdateNumber = this._accumulatedAncestryObjectUpdateNumber;
    instance._accumulatedAncestryObjectUpdateNumberNormal = this._accumulatedAncestryObjectUpdateNumberNormal;
    instance._accumulatedAncestryObjectUpdateNumberInv = this._accumulatedAncestryObjectUpdateNumberInv;


    instance._transparentByUser = this._transparentByUser;
    instance.opacity = this.opacity;
    instance._activeAnimationLineName = this._activeAnimationLineName;

    instance._currentAnimationInputValues = {};
    for (let inputName in this._currentAnimationInputValues) {
      instance._currentAnimationInputValues[inputName] = this._currentAnimationInputValues[inputName];
    }

    instance._toInheritCurrentAnimationInputValue = this._toInheritCurrentAnimationInputValue;

    instance._camera = this._camera;
    instance._customFunction = this._customFunction;
  }

  set isVisible(flg) {
    this._isVisible = flg;
  }

  get isVisible() {
    return this._isVisible;
  }

  set isAffectedByWorldMatrix(flg) {
    this._isAffectedByWorldMatrix = flg;
  }

  get isAffectedByWorldMatrix() {
    return this._isAffectedByWorldMatrix;
  }

  set isAffectedByWorldMatrixAccumulatedAncestry(flg) {
    this._isAffectedByWorldMatrixAccumulatedAncestry = flg;
  }

  get isAffectedByWorldMatrixAccumulatedAncestry() {
    return this._isAffectedByWorldMatrixAccumulatedAncestry;
  }

  set isAffectedByViewMatrix(flg) {
    this._isAffectedByViewMatrix = flg;
  }

  get isAffectedByViewMatrix() {
    return this._isAffectedByViewMatrix;
  }

  set isAffectedByProjectionMatrix(flg) {
    this._isAffectedByProjectionMatrix = flg;
  }

  get isAffectedByProjectionMatrix() {
    return this._isAffectedByProjectionMatrix;
  }

  set gizmoScale(scale) {
    for (let gizmo of this._gizmos) {
      gizmo.scale = new Vector3(scale, scale, scale);
    }
  }

  get gizmoScale() {
    if (this._gizmos.length === 0) {
      return 1.0;
    }
    return this._gizmos[0].scale.x;
  }

  set isGizmoVisible(flg) {
    for (let gizmo of this._gizmos) {
      gizmo.isVisible = flg;
    }
  }

  get isGizmoVisible() {
    return this._gizmos[0].isVisible;
  }

  set masterElement(element) {
    this._masterElement = element;
  }

  get masterElement() {
    return this._masterElement;
  }

  get worldMatrixForJoints() {
    return this.getWorldMatrixForJointsAt(void 0);
  }

  getWorldMatrixForJointsAt(input) {

    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    
    if (this._accumulatedAncestryObjectUpdateNumberForJoints !== tempNumber || this._matrixAccumulatedAncestryForJoints === void 0) {
      this._matrixAccumulatedAncestryForJoints = this._multiplyMyAndParentTransformMatricesForJoints(true, input);
      this._accumulatedAncestryObjectUpdateNumberForJoints = tempNumber;
    }

    return this._matrixAccumulatedAncestryForJoints.clone();
    
  }

  _multiplyMyAndParentTransformMatricesForJoints(withMySelf, input) {
    if (input === void 0 && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let tempNumber = 0;
    if (this.__cache_input_multiplyMyAndParentTransformMatricesForJoints !== input ||
      this.__updateInfoString_multiplyMyAndParentTransformMatricesForJoints !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) ||
      this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints === void 0)
    {

        let currentMatrix = null;
        if (withMySelf) {
          currentMatrix = this.getRotateTranslateAt(input);
        } else {
          currentMatrix = Matrix44.identity();
        }
    
        if (this._parent === null) {
          this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints = currentMatrix;
          return currentMatrix;
        }

        this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints = Matrix44.multiply(this._parent._multiplyMyAndParentTransformMatricesForJoints(true, input), currentMatrix);
        this.__updateInfoString_multiplyMyAndParentTransformMatricesForJoints = tempNumber;
        this.__cache_input_multiplyMyAndParentTransformMatricesForJoints = input;
    }
    return this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints;
  
  }


  get rotateTranslate() {

    let input = void 0;
    if (this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    const matrix = this.getRotateTranslateAt(input);

    return matrix;

  }

  getRotateTranslateAt(inputValue, lineName) {
    const input = inputValue;
//    if (this._dirtyAsElement || this._matrixGetMode !== 'animated_' + input) {
///     this._finalMatrix_RotateTranslate = void 0;
    if (true) {

      const matrix = Matrix44.identity();

      if (this._currentCalcMode === 'matrix') {
        this._finalMatrix_RotateTranslate = matrix.multiply(this.getMatrixAt(this._activeAnimationLineName, input));
        this._dirtyAsElement = false;
        return this._finalMatrix_RotateTranslate.clone();
      }

      let rotationMatrix = Matrix44.identity();
      if (this._currentCalcMode === 'quaternion') {
        rotationMatrix = this.getQuaternionAt(this._activeAnimationLineName, input).rotationMatrix;
      } else {
        const rotateVec = this.getRotateAt(this._activeAnimationLineName, input);
        rotationMatrix.rotateZ(rotateVec.z).
        multiply(Matrix44.rotateY(rotateVec.y)).
        multiply(Matrix44.rotateX(rotateVec.x));
      }

      this._finalMatrix_RotateTranslate = rotationMatrix;

      const translateVec = this.getTranslateAt(this._activeAnimationLineName, input);

      this._finalMatrix_RotateTranslate.m03 = translateVec.x;
      this._finalMatrix_RotateTranslate.m13 = translateVec.y;
      this._finalMatrix_RotateTranslate.m23 = translateVec.z;

   //   this._matrixGetMode = 'animated_' + input;
    }


    return this._finalMatrix_RotateTranslate.clone();
  }


  get worldMatrix() {
    return this.getWorldMatrixAt(void 0);
  }


  getWorldMatrixAt(input) {

    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
  
    if (this._accumulatedAncestryObjectUpdateNumber !== tempNumber || this._matrixAccumulatedAncestry === void 0) {
      this._matrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatrices(true, input);
      this._accumulatedAncestryObjectUpdateNumber = tempNumber;
    }

    return this._matrixAccumulatedAncestry.clone();
  }

  _multiplyMyAndParentTransformMatrices(withMySelf, input) {
    if (input === void 0 && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
    if (this.__updateInfoString_multiplyMyAndParentTransformMatrices !== tempNumber ||
      this.__cache_input_multiplyMyAndParentTransformMatrices !== input ||
      this.__cache_returnValue_multiplyMyAndParentTransformMatrices === void 0)
    {

      let currentMatrix = null;
      if (withMySelf) {
        currentMatrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
      } else {
        currentMatrix = Matrix44.identity();
      }
      if (this._parent === null) {
        this.__cache_returnValue_multiplyMyAndParentTransformMatrices = currentMatrix;
        return currentMatrix;
      }
      this.__cache_returnValue_multiplyMyAndParentTransformMatrices = Matrix44.multiply(this._parent._multiplyMyAndParentTransformMatrices(true, input), currentMatrix);
      this.__updateInfoString_multiplyMyAndParentTransformMatrices = tempNumber;
      this.__cache_input_multiplyMyAndParentTransformMatrices = input;
    } else {
      let hoge = 10;
    }
    return this.__cache_returnValue_multiplyMyAndParentTransformMatrices;
  
  }

  get inverseTransformMatrixAccumulatedAncestryWithoutMySelf() {
    if (this._parent === null) {
      return Matrix44$1.identity();
    }

    return this._multiplyMyAndParentTransformMatricesInInverseOrder(false, null).clone().invert();
  }

  _multiplyMyAndParentTransformMatricesInInverseOrder(withMySelf, input) {
    if (input === null && this._activeAnimationLineName !== null) {
      input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
    }

    let tempNumber = 0;
    if (input === void 0 || this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder !== input ||
      this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) ||
      this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder === void 0)
    {

      let currentMatrix = null;
      if (withMySelf) {
        currentMatrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
      } else {
        currentMatrix = Matrix44.identity();
      }
  
      if (this._parent === null) {
        this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = currentMatrix;
        return currentMatrix;
      }

      this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = Matrix44.multiply(currentMatrix, this._parent._multiplyMyAndParentTransformMatricesInInverseOrder(true, input));
      this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder = tempNumber;
      this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder = input;
    }
    return this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder;
  }
}
