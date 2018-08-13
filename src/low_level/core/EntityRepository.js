// @flow
import type GLBoostObject from './GLBoostObject';

let singleton:any = Symbol();

export default class EntityRepository {
  __entity_uid_count: number;
  __entities: Array<GLBoostObject>;

  constructor(enforcer: Symbol) {
    if (enforcer !== EntityRepository.__singletonEnforcer || !(this instanceof EntityRepository)) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    EntityRepository.__singletonEnforcer = Symbol();

    this.__entity_uid_count = 0;
    this.__entities = [];
  }

  assignEntityId(glBoostObject: GLBoostObject) {
    if (glBoostObject.entityUID !== 0) {
      console.warn('This GLBoostObject has been assigned entityUID already!');
      return false;
    }

    glBoostObject._entity_uid = ++this.__entity_uid_count;
    this.__entities.push(glBoostObject);

    return true;
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new EntityRepository(EntityRepository.__singletonEnforcer);
    }
    return this[singleton];
  }
}

