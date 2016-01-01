import GLBoost from './globals'
import Element from './Element'
import Camera from './Camera'
import AbstractLight from './lights/AbstractLight'
import Mesh from './Mesh'
import Group from './Group'

export default class Scene extends Element {
  constructor() {
    super();
    this._elements = [];
    this._meshes = [];
  }

  add(mesh) {
    this._elements.push(mesh);
  }

  prepareForRender() {
    // カメラが最低１つでも存在しているか確認
    var existCamera_f = false;
    this._elements.forEach((elm)=> {
      if (elm instanceof Camera) {
        existCamera_f = true;
      }
    });

    var lights = [];
    this._elements.forEach((elm)=> {
      if (elm instanceof AbstractLight) {
        lights.push(elm);
      }
    });


    let collectMeshes = function(elem) {
      if (elem instanceof Group) {
        var children = elem.getChildren();
        var meshes = [];
        children.forEach(function(child) {
          var childMeshes = collectMeshes(child);
          meshes = meshes.concat(childMeshes)
        });
        return meshes;
      } else if (elem instanceof Mesh) {
        return [elem];
      } else {
        return [];
      }
    };

    this._meshes = [];
    this._elements.forEach((elm)=> {
      this._meshes = this._meshes.concat(collectMeshes(elm));
    });

    // レンダリングの準備をさせる。
    this._meshes.forEach((elm)=> {
      elm.prepareForRender(existCamera_f, lights);
    });

  }

  get elements() {
    return this._elements;
  }

  get meshes() {
    return this._meshes;
  }
}

GLBoost["Scene"] = Scene;
