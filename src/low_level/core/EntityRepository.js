// @flow
//import type GLBoostObject from './GLBoostObject';
import Entity from './Entity';

type EntityUID = number;
let singleton:any = Symbol();

export default class EntityRepository {
  static __singletonEnforcer: Symbol;
  __entity_uid_count: EntityUID;
  //__entities: Array<GLBoostObject>;
  __entities: Map<EntityUID, Entity>;
  __lifeStatusOfEntities: Map<EntityUID, Boolean>;

  constructor(enforcer: Symbol) {
    if (enforcer !== EntityRepository.__singletonEnforcer || !(this instanceof EntityRepository)) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    EntityRepository.__singletonEnforcer = Symbol();

    this.__entity_uid_count = 0;
    this.__entities = new Map();
    this.__lifeStatusOfEntities = new Maps();
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new EntityRepository(EntityRepository.__singletonEnforcer);
    }
    return this[singleton];
  }

  
  // assignEntityId(glBoostObject: GLBoostObject) {
  //   if (glBoostObject.entityUID !== 0) {
  //     console.warn('This GLBoostObject has been assigned entityUID already!');
  //     return false;
  //   }

  //   glBoostObject._entity_uid = ++this.__entity_uid_count;
  //   this.__entities.push(glBoostObject);

  //   return true;
  // }


  createEntity() {
    this.__entity_uid_count++;

    const alive = new Boolean(true);
    const entity = new Entity(this.__entity_uid_count, alive);

    this.__entities.set(this.__entity_uid_count, entity);
    this.__lifeStatusOfEntities.set(this.__entity_uid_count, alive);
    
    return entity;
  }

}

