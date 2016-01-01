import GLBoost from './globals'
import Element from './Element'
import Vector3 from './math/Vector3'
import Matrix44 from './math/Matrix44'

export default class Group extends Element {
  constructor() {
    super();
    this._children = [];
  }

  addChild(element) {
    this.removeChild(element);
    this._children.push(element);
    element._parent = this;
  }

  removeChild(element) {
    this._children = this._children.filter(function(elm) {
      if (elem === element) {
        element._parent = null;
      }
      return elem !== element
    });
  }
}

GLBoost["Group"] = Group;
