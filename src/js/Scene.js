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
    this._lights = [];
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

    let collectLights = function(elem) {
      if (elem instanceof Group) {
        var children = elem.getChildren();
        var lights = [];
        children.forEach(function(child) {
          var childLights = collectLights(child);
          lights = lights.concat(childLights)
        });
        return lights;
      } else if (elem instanceof AbstractLight) {
        return [elem];
      } else {
        return [];
      }
    };

    this._lights = [];
    this._elements.forEach((elm)=> {
      this._lights = this._lights.concat(collectLights(elm));
    });

    // レンダリングの準備をさせる。
    this._meshes.forEach((elm)=> {
      elm.prepareForRender(existCamera_f, this._lights);
    });

  }

  get elements() {
    return this._elements;
  }

  get meshes() {
    return this._meshes;
  }

  get lights() {
    return this._lights;
  }
}

GLBoost["Scene"] = Scene;
