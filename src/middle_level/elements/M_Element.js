/* @flow */
import type M_Group from './M_Group';
import type GLBoostMiddleContext from '../core/GLBoostMiddleContext';
import Vector3 from '../../low_level/math/Vector3';
import Matrix44 from '../../low_level/math/Matrix44';
import L_Element from '../../low_level/elements/L_Element';
import type M_Gizmo from './gizmos/M_Gizmo';

export default class M_Element extends L_Element {
  _isVisible: boolean;
  _matrixAccumulatedWithoutMySelfAncestry: Matrix44;
  _matrixAccumulatedAncestry: Matrix44;
  _accumulatedWithoutMySelfAncestryObjectUpdateNumber: number;
  _normalMatrix: Matrix44;
  _accumulatedAncestryObjectUpdateNumberNormal: number;
  _accumulatedAncestryObjectUpdateNumberInv: number;
  _accumulatedAncestryObjectUpdateNumber: number;
  _accumulatedAncestryObjectUpdateNumberWithoutMySelf: number;
  _accumulatedAncestryObjectUpdateNumberJoint: number;
  _opacity: number;
  _transparentByUser: boolean;
  _parent: M_Group | null;
  _invMatrix: Matrix44;
  _isAffectedByWorldMatrix: boolean;
  _isAffectedByWorldMatrixAccumulatedAncestry: boolean;
  _isAffectedByViewMatrix: boolean;
  _isAffectedByProjectionMatrix: boolean;
  _toInheritCurrentAnimationInputValue: boolean;
  _customFunction: Function | null;
  _gizmos: Array<M_Gizmo>;
  _masterElement: M_Element | null;
  _worldMatrix: Matrix44;

  constructor(glBoostContext: GLBoostMiddleContext) {
    super(glBoostContext);

    this._parent = null;
    this._invMatrix = Matrix44.identity();
    this._accumulatedAncestryObjectUpdateNumber = -Number.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberWithoutMySelf = -Number.MAX_VALUE;    
    this._accumulatedAncestryObjectUpdateNumberNormal = -Number.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberInv = -Number.MAX_VALUE;
    this._accumulatedAncestryObjectUpdateNumberJoint = -Number.MAX_VALUE;
    this._transparentByUser = false;
    this._opacity = 1.0;
    this._isAffectedByWorldMatrix = true;
    this._isAffectedByWorldMatrixAccumulatedAncestry = true;
    this._isAffectedByViewMatrix = true;
    this._isAffectedByProjectionMatrix = true;

    this._toInheritCurrentAnimationInputValue = true;

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

  set toInheritCurrentAnimationInputValue(flg: boolean) {
    this._toInheritCurrentAnimationInputValue = flg;
  }

  get toInheritCurrentAnimationInputValue() {
    return this._toInheritCurrentAnimationInputValue;
  }

  _getCurrentAnimationInputValue(inputName: number): number | null {
    let value = parent._currentAnimationInputValues[inputName];
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

  _setDirtyToAnimatedElement(inputName: string) {
    if (this.hasAnimation(inputName)) {
      this._needUpdate();
    }
  }


  _multiplyMyAndParentTransformMatricesInInverseOrder(withMySelf: boolean, input: number) {
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
    return this.getWorldMatrixWithoutMySelfAt(void 0);
  }

  getWorldMatrixWithoutMySelfAt(input: ?number) {

    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
  
    if (this._accumulatedWithoutMySelfAncestryObjectUpdateNumber !== tempNumber || this._matrixAccumulatedWithoutMySelfAncestry === void 0) {
      this._matrixAccumulatedWithoutMySelfAncestry = this._multiplyMyAndParentTransformMatrices(false, input);
      this._accumulatedWithoutMySelfAncestryObjectUpdateNumber = tempNumber;
    }

    return this._matrixAccumulatedWithoutMySelfAncestry.clone();
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

  _multiplyMyAndParentRotateMatrices(currentElem: M_Element, withMySelf: boolean) {
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

  _accumulateMyAndParentOpacity(currentElem: M_Element) {
    if (currentElem._parent === null) {
      return currentElem.opacity;
    } else {
      return this._accumulateMyAndParentOpacity(currentElem._parent) * currentElem.opacity;
    }
  }

  get opacityAccumulatedAncestry() {
    return this._accumulateMyAndParentOpacity(this);
  }

  set opacity(opacity: number) {
    this._opacity = opacity;
  }

  get opacity() {
    return this._opacity;
  }

  get isTransparent() {
    return this._transparentByUser;
  }

  set isTransparent(flg: boolean) {
    this._transparentByUser = flg;
  }

  set dirty(flg: number) {
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

  set customFunction(func: Function) {
    this._customFunction = func;
  }

  get customFunction() {
    return this._customFunction;
  }

  prepareToRender() {

  }

  _copy(instance: M_Element) {
    super._copy(instance);

    instance._parent = this._parent;
    instance._invMatrix = this._invMatrix.clone();
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

    instance._customFunction = this._customFunction;
  }

  set isVisible(flg: boolean) {
    this._isVisible = flg;
  }

  get isVisible() {
    return this._isVisible;
  }

  set isAffectedByWorldMatrix(flg: boolean) {
    this._isAffectedByWorldMatrix = flg;
  }

  get isAffectedByWorldMatrix() {
    return this._isAffectedByWorldMatrix;
  }

  set isAffectedByWorldMatrixAccumulatedAncestry(flg: boolean) {
    this._isAffectedByWorldMatrixAccumulatedAncestry = flg;
  }

  get isAffectedByWorldMatrixAccumulatedAncestry() {
    return this._isAffectedByWorldMatrixAccumulatedAncestry;
  }

  set isAffectedByViewMatrix(flg: boolean) {
    this._isAffectedByViewMatrix = flg;
  }

  get isAffectedByViewMatrix() {
    return this._isAffectedByViewMatrix;
  }

  set isAffectedByProjectionMatrix(flg: boolean) {
    this._isAffectedByProjectionMatrix = flg;
  }

  get isAffectedByProjectionMatrix() {
    return this._isAffectedByProjectionMatrix;
  }

  set gizmoScale(scale: number) {
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

  set isGizmoVisible(flg: boolean) {
    for (let gizmo of this._gizmos) {
      gizmo.isVisible = flg;
    }
  }

  get isGizmoVisible() {
    return this._gizmos[0].isVisible;
  }

  set masterElement(element: M_Element) {
    this._masterElement = element;
  }

  get masterElement() {
    return this._masterElement;
  }

  get worldMatrixForJoints() {
    return this.getWorldMatrixForJointsAt(void 0);
  }

  getWorldMatrixForJointsAt(input: ?number) {

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


  get worldMatrix() {
    return this.getWorldMatrixAt(void 0);
  }


  getWorldMatrixAt(input: number) {

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

  get inverseWorldMatrix() {
    return this.getInverseWorldMatrixAt(void 0);
  }

  getInverseWorldMatrixAt(input: ?number) {
    let tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
  
    if (this._accumulatedAncestryObjectUpdateNumberInverse !== tempNumber || this._inverseMatrixAccumulatedAncestry === void 0) {
      this._inverseMatrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatricesInInverseOrder(true, input);
      this._accumulatedAncestryObjectUpdateNumberInverse = tempNumber;
    }

    return this._inverseMatrixAccumulatedAncestry.clone();
  }

  get inverseTransformMatrixAccumulatedAncestryWithoutMySelf() {
    if (this._parent === null) {
      return Matrix44.identity();
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

  readyForDiscard() {
    if (this instanceof this.className.indexOf('Mesh') !== -1) {
      const materials = this.getAppropriateMaterials();
      for (let material of materials) {
        material.readyForDiscard();
      }
    }
  }

  addGizmo(gizmo: M_Gizmo) {
    this._gizmos.push(gizmo);
  }
}
