import M_Element from './M_Element';
import AABB from '../../low_level/math/AABB';
import M_Mesh from './meshes/M_Mesh';

export default class M_Group extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);
    this._elements = [];
    this._AABB = new AABB();
  }

  /**
   * [en] Add the element to this group as a child.<br>
   * [ja] このグループにelementを子供として追加します。
   * @param {Element} element  [en] a instance of Element class [ja] Elementクラスのインスタンス
   */
  addChild(element) {
    this.removeChild(element);
    this._elements.push(element);
  }

  /**
   * [en] remove the element from this group.
   * [ja] このグループから指定した要素を削除します。
   * @param {Element} element [en] the element to remove [ja] 削除したい要素
   */
  removeChild(element) {
    this._elements = this._elements.filter(function(elem) {
      if (elem === element) {
        element._parent = null;
      }
      return elem !== element;
    });
  }

  /**
   * [en] remove all elements from this group.
   * [ja] このグループから全ての要素を削除します。
   */
  removeAll() {
    this._elements = this._elements.filter(function(elem) {
      elem._parent = null;
    });
    this._elements.length = 0;
  }

  getChildren() {
    return this._elements;
  }

  searchElement(userflavorName, element = this) {
    if (element.userFlavorName === userflavorName) {
      return element;
    }

    if (element instanceof M_Group) {
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

    if (element instanceof M_Group) {
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


  updateAABB() {
    var aabb = (function mergeAABBRecursively(elem) {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();
        for(let i=0; i<children.length; i++) {
          var aabb = mergeAABBRecursively(children[i]);
          if (aabb instanceof AABB) {
            elem.AABB.mergeAABB(aabb);
          } else {
            console.assert('calculation of AABB error!');
          }
        }
        return elem.AABB;
      }
      if (elem instanceof M_Mesh) {
        return elem.AABB;
      }

      return null;
    })(this);
    this.AABB.mergeAABB(aabb);
  }

  get AABB() {
    return this._AABB;
  }
}
