import GLBoost from '../globals';
import Element from '../low_level/Element';

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
      return elem !== element;
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

  searchElementsByType(type, element = this) {
    if (element instanceof type) {
      return element;
    }

    if (element instanceof Group) {
      let children = element.getChildren();
      let results = [];
      for (let i = 0; i < children.length; i++) {
        let hitChildOrChildren = this.searchElementsByType(type, children[i]);
        if (Array.isArray(hitChildOrChildren)) {
          Array.prototype.push.apply(results, hitChildOrChildren); // concat
        } else if (hitChildOrChildren != null) {
          results.push(hitChildOrChildren);
        }
      }
      return results;
    }
    return null;
  }
}

GLBoost['Group'] = Group;
