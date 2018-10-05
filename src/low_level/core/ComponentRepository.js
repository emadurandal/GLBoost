// @flow
import type Component from './Component';
import is from '../misc/IsUtil';

type ComponentTID = number;
type ComponentSID = number;

let singleton:any = Symbol();

export default class ComponentRepository {
  static __singletonEnforcer: Symbol;
  __component_sid_count_map: Map<ComponentTID, number>;
  __components: Map<ComponentTID, Map<ComponentSID, Component>>;

  constructor(enforcer: Symbol) {
    if (enforcer !== ComponentRepository.__singletonEnforcer || !(this instanceof ComponentRepository)) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    ComponentRepository.__singletonEnforcer = Symbol();

    this.__component_sid_count_map = new Map();
    this.__components = new Map;
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new ComponentRepository(ComponentRepository.__singletonEnforcer);
    }
    return this[singleton];
  }

  createComponent(componentClass: Component.constructor) {
    const component = new componentClass();
    let component_sid_count = this.__component_sid_count_map.get(component.componentTID);
    if (!is.exist(component_sid_count)) {
      this.__component_sid_count_map.set(component.componentTID, 0);
      component_sid_count = 0;
    }
    component._component_uid = this.__component_sid_count_map.set(
      component.componentTID,
      component_sid_count !== undefined ? ++component_sid_count : 1
    );

    if (!this.__components.has(component.componentTID)) {
      this.__components.set(component.componentTID, new Map());
    }
    this.__components.set(component.componentTID, new Map(component));

    return component;
  }


}
