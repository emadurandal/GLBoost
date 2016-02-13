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
    this._children = this._children.filter(function(elem) {
      if (elem === element) {
        element._parent = null;
      }
      return elem !== element
    });
  }

  getChildren() {
    return this._children;
  }

  searchElement(userflavorName, element = this) {
    if (element.userFlavorName === userflavorName) {
      return element;
    }

    if (element instanceof Group) {
      let children = element.getChildren();
      for (let i = 0; i < children.length; i++) {
        let hitChild = this.searchElement(userflavorName, children[i]);
        if (hitChild) {
          return hitChild;
        }
      }
    }
    return null;
  }
}

GLBoost["Group"] = Group;
