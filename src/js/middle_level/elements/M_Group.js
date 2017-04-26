import M_Element from './M_Element';
import AABB from '../../low_level/math/AABB';
import L_AbstractMaterial from '../../low_level/materials/L_AbstractMaterial';
import M_Mesh from './meshes/M_Mesh';

export default class M_Group extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);
    this._elements = [];
    this._AABB = new AABB();
    this._isRootJointGroup = false;
  }

  /**
   * [en] Add the element to this group as a child.<br>
   * [ja] このグループにelementを子供として追加します。
   * @param {Element} element  [en] a instance of Element class [ja] Elementクラスのインスタンス
   */
  addChild(element) {
    this.removeChild(element);
    element._parent = this;
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

  _setDirtyToAnimatedElement(inputName) {
    if (this.hasAnimation(inputName)) {
      this._needUpdate();
    }

    let children = this.getChildren();
    for (let i = 0; i < children.length; i++) {
      children[i]._setDirtyToAnimatedElement(inputName);
    }
  }

  _validateByQuery(object, query, queryMeta) {
    let propertyName = '';
    if (queryMeta.type === GLBoost.QUERY_TYPE_INSTANCE_NAME) {
      propertyName = 'instanceName';
    } else if (queryMeta.type === GLBoost.QUERY_TYPE_USER_FLAVOR_NAME) {
      propertyName = 'userFlavorName';
    } else if (queryMeta.type === GLBoost.QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR) {
      propertyName = 'instanceNameWithUserFlavor';
    }

    if (queryMeta.format === GLBoost.QUERY_FORMAT_STRING) {
      if (object[propertyName] === query) {
        return object;
      }
    } else if (queryMeta.format === GLBoost.QUERY_FORMAT_REGEXP) {
      if (object[propertyName].match(query)) {
        return object;
      }
    }

  }

  searchElement(query, queryMeta = {type: GLBoost.QUERY_TYPE_USER_FLAVOR_NAME, format:GLBoost.QUERY_FORMAT_STRING}, element = this) {
    /*
    if (element.userFlavorName === userFlavorNameOrRegExp || element.userFlavorName.match(userFlavorNameOrRegExp)) {
      return element;
    }*/

    if (this._validateByQuery(element, query, queryMeta)) {
      return element;
    }


    if (element instanceof M_Group) {
      let children = element.getChildren();
      for (let i = 0; i < children.length; i++) {
        let hitChild = this.searchElement(query, queryMeta, children[i]);
        if (hitChild) {
          return hitChild;
        }
      }
    }
    return null;
  }

  searchElementByNameAndType(query, type, queryMeta = {type: GLBoost.QUERY_TYPE_USER_FLAVOR_NAME, format:GLBoost.QUERY_FORMAT_STRING}, element = this) {
    /*
    if ((element.userFlavorName === userFlavorNameOrRegExp || element.userFlavorName.match(userFlavorNameOrRegExp)) && element instanceof type) {
      return element;
    }
    */
    if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
      return element;
    }


    if (element instanceof M_Group) {
      let children = element.getChildren();
      for (let i = 0; i < children.length; i++) {
        let hitChild = this.searchElementByNameAndType(query, type, queryMeta, children[i]);
        if (hitChild) {
          return hitChild;
        }
      }
    }
    return null;
  }

  searchElementsByNameAndType(query, type, queryMeta = {type: GLBoost.QUERY_TYPE_USER_FLAVOR_NAME, format:GLBoost.QUERY_FORMAT_STRING}, element = this) {
    let resultElements = [];

    if (element instanceof M_Group) {
      let children = element.getChildren();
      for (let i = 0; i < children.length; i++) {
        let hitChildren = this.searchElementsByNameAndType(query, type, queryMeta, children[i]);
        if (hitChildren) {
          resultElements = resultElements.concat(hitChildren);
        }
      }
    }
    /*
    if ((element.userFlavorName === userFlavorNameOrRegExp || element.userFlavorName.match(userFlavorNameOrRegExp)) && element instanceof type) {
        resultElements.push(element);
    }*/
    if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
      resultElements.push(element);
    }


    return resultElements;
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

  searchGLBoostObjectByNameAndType(query, type, queryMeta = {type: GLBoost.QUERY_TYPE_USER_FLAVOR_NAME, format:GLBoost.QUERY_FORMAT_STRING}, element = this) {
    if (element instanceof M_Group) {
      let children = element.getChildren();
      for (let i = 0; i < children.length; i++) {
        let hitChild = this.searchGLBoostObjectByNameAndType(query, type, queryMeta, children[i]);
        if (hitChild.length > 0) {
          return hitChild;
        }
      }
    }
    if (type === L_AbstractMaterial && element instanceof M_Mesh) {
      let materials = element.getAppropriateMaterials();
      for (let material of materials) {
        if (this._validateByQuery(material, query, queryMeta)) {
          return material;
        }
      }
      return null;
    } else if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
      return element;
    }
  }

  searchGLBoostObjectsByNameAndType(query, type, queryMeta = {type: GLBoost.QUERY_TYPE_USER_FLAVOR_NAME, format:GLBoost.QUERY_FORMAT_STRING}, element = this) {
    let objects = [];
    if (element instanceof M_Group) {
      let children = element.getChildren();
      for (let i = 0; i < children.length; i++) {
        let hitChildren = this.searchGLBoostObjectsByNameAndType(query, type, queryMeta, children[i]);
        if (hitChildren.length > 0) {
          objects = objects.concat(hitChildren);
        }
      }
      return objects;
    }
    if (type === L_AbstractMaterial && element instanceof M_Mesh) {
      let materials = element.getAppropriateMaterials();
      for (let material of materials) {
        if (this._validateByQuery(material, query, queryMeta)) {
          objects.push(material);
        }
      }
      return objects;
    } else if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
      return [element];
    }
    return objects;
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
        //return AABB.multiplyMatrix(elem.transformMatrix, elem.AABB);
      }
      if (elem instanceof M_Mesh) {
        let aabb = elem.AABBInWorld;
        //console.log(aabb.toString());
        return aabb;
      }

      return null;
    })(this);
    this.AABB.mergeAABB(aabb);

    let newAABB = this.AABB;

    return newAABB;
  }

  get AABB() {
    return this._AABB;
  }

  clone(clonedOriginalRootElement = this, clonedRootElement = null, onCompleteFuncs = []) {
    let instance = new M_Group(this._glBoostContext);
    if (clonedRootElement === null) {
      clonedRootElement = instance;
    }
    this._copy(instance);

    this._elements.forEach((element)=>{
      if (typeof element.clone !== 'undefined') {// && !MiscUtil.isDefinedAndTrue(element._isRootJointGroup)) {
        instance._elements.push(element.clone(clonedOriginalRootElement, clonedRootElement, onCompleteFuncs));
      } else {
        instance._elements.push(element);
      }
    });

    onCompleteFuncs.forEach((func)=>{
      func();
    });

    return instance;
  }

  _copy(instance) {
    super._copy(instance);
    instance._AABB = this._AABB.clone();
    instance._isRootJointGroup = this._isRootJointGroup;
  }

  set isVisible(flg) {
    let collectVisibility = function(elem) {
      elem._isVisible = flg;
      if (elem instanceof M_Group) {
        let children = elem.getChildren();
        children.forEach(function(child) {
          collectVisibility(child);
        });
      }
    };
    collectVisibility(this);
  }

  get isVisible() {
    return this._isVisible;
  }
}
