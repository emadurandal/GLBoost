// @flow
import type Component from './Component';
import is from '../misc/IsUtil';

let singleton:any = Symbol();

export default class ComponentRepository {
  __component_uid_count_array: Array<number>;
  __componentsArray: Array<Array<Component>>;

  constructor(enforcer: Symbol) {
    if (enforcer !== ComponentRepository.__singletonEnforcer || !(this instanceof ComponentRepository)) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    ComponentRepository.__singletonEnforcer = Symbol();

    this.__component_uid_count_array = [];
    this.__componentsArray = [];
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new ComponentRepository(ComponentRepository.__singletonEnforcer);
    }
    return this[singleton];
  }

  createComponent(componentClass: Component.constructor) {
    const component = new componentClass();
    const component_uid_count = this.__component_uid_count_array[component.componentTID];
    if (!is.exist(component_uid_count)) {
      this.__component_uid_count_array[component.componentTID] = 0;
    }
    component._component_uid = ++this.__component_uid_count_array[component.componentTID];

    if (!is.exist(this.__componentsArray[component.componentTID])) {
      this.__componentsArray[component.componentTID] = [];
    }
    this.__componentsArray[component.componentTID].push(component);

    return component;
  }


}
