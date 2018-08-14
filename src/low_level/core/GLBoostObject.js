/* @flow */

import L_GLBoostMonitor from './L_GLBoostMonitor';
import EntityRepositiory from './EntityRepository';
import GLBoost from '../../globals';
import EntityRepository from './EntityRepository';
import type GLBoostSystem from './GLBoostSystem';
import GLContext from './GLContext';

export default class GLBoostObject {
  _glBoostSystem: GLBoostSystem;
  _glContext: GLContext;
  _toRegister: boolean;
  _glBoostMonitor: L_GLBoostMonitor;
  _instanceName:string;
  _userFlavorName: string;
  _readyForDiscard: boolean;
  _classUniqueNumber: number;
  _objectIndex: number;
  _entity_uid: number;
  _glContext: GLContext;

  constructor(glBoostSystem: GLBoostSystem, toRegister:boolean = true) {
    if (this.constructor === GLBoostObject) {
      throw new TypeError('Cannot construct GLBoostObject instances directly.');
    }
    this._entity_uid = 0;
    this._setName();
    
    const entityRepository = EntityRepository.getInstance();
    entityRepository.assignEntityId(this);

    this._glBoostSystem = glBoostSystem;
    this._glContext = glBoostSystem._glContext;
    this._glBoostMonitor = glBoostSystem._glBoostMonitor;
    this._toRegister = toRegister;
    if (this._toRegister) {
      this._glBoostMonitor.registerGLBoostObject(this);
    }
    this._userFlavorName = '';
    this._readyForDiscard = false;

    // generate the simple class-specific number.
    this._classUniqueNumber = 0;
    for(let i=0; i<this.className.length; i++) {
      this._classUniqueNumber += this.className.charCodeAt(i);
    }

    this.setupExistIndexAndArray();
  }

  setupExistIndexAndArray() {
    this._objectIndex = -1;

    const seekSpaceOfArrayAndSetIndexThere = (typeName)=>{
      let array = GLBoostObject['_' + typeName + 'ExistArray'];
      for (let i=0; i<array.length; i++) {
        if (array[i] === void 0) {
          this['_' + typeName + 'Index'] = i;
          array[i] = true;
          return;
        }
      }
      this['_' + typeName + 'Index'] = array.length;
      array[array.length] = true;
    };

    if (this.className.indexOf('Mesh') !== -1) {
      seekSpaceOfArrayAndSetIndexThere('object');
    }

  }

  tearDownExistIndexAndArray() {
    const deleteIndex = (typeName)=>{
      let array = GLBoostObject['_' + typeName + 'ExistArray'];
      delete array[this['_' + typeName + 'Index']];
      this['_' + typeName + 'Index'] = -1;
    };

    if (this.className.indexOf('Mesh') !== -1) {
      deleteIndex('object');
      if (this.className.indexOf('SkeltalMesh') !== -1) {
        deleteIndex('jointSet');
      }
    } else if (this.className.indexOf('Light') !== -1) {
      deleteIndex('light');
    } else if (this.className.indexOf('Material') !== -1) {
      deleteIndex('material');
    }
  }

  _setName() {
    if (typeof GLBoostObject.classInfoDic[this.constructor.name] === 'undefined') {
      GLBoostObject.classInfoDic[this.constructor.name] = {};
    }
    GLBoostObject.classInfoDic[this.constructor.name]._instanceCount = (typeof GLBoostObject.classInfoDic[this.constructor.name]._instanceCount === 'undefined') ? 0 : (GLBoostObject.classInfoDic[this.constructor.name]._instanceCount + 1);
    this._instanceName = this.constructor.name + '_' + GLBoostObject.classInfoDic[this.constructor.name]._instanceCount;
  }

  /**
   * [en] Return instance name.
   * [ja] インスタンス名を返します。
   * @returns {string} [en] the instance name. [ja] インスタンス名
   */
  toString():string {
    return this._instanceName;
  }

  /**
   * Return the simple class-specific number.
   */
  get classUniqueNumber():number {
    return this._classUniqueNumber;
  }

  get className():string {
    return this.constructor.name;
  }

  get instanceName():string {
    return this._instanceName;
  }

  get belongingCanvasId() {
    return this._glBoostSystem.belongingCanvasId;
  }

  set userFlavorName(name:string) {
    this._userFlavorName = name;
  }

  get userFlavorName():string {
    return this._userFlavorName;
  }

  get instanceNameWithUserFlavor():string {
    return this._instanceName + '__' + this._userFlavorName;
  }

  readyForDiscard() {
    if (this._toRegister) {
      this._glBoostMonitor.deregisterGLBoostObject(this);
    }

    this.tearDownExistIndexAndArray();

    this._readyForDiscard = true;
  }

  get isReadyForDiscard():boolean {
    return this._readyForDiscard;
  }

  _copy(instance) {
    instance._userFlavorName = this._userFlavorName;
  }

  get objectIndex():number {
    return this._objectIndex;
  }

  get entityUID() {
    return this._entity_uid;
  }
}

GLBoostObject.classInfoDic = {};
GLBoostObject._objectExistArray = [];
GLBoostObject.__entities = [];



GLBoost['GLBoostObject'] = GLBoostObject;
