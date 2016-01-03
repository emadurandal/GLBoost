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
    this._cameras = [];

    // this code for tmlib
    if (this.__proto__.__proto__ && this.__proto__.__proto__.constructor == Scene ||
      this.__proto__.__proto__ && this.__proto__.__proto__.__proto__ && this.__proto__.__proto__.__proto__.constructor == Scene) {
      Scene._instanceCount = (typeof Scene._instanceCount === "undefined") ? 0 : (Scene._instanceCount + 1);
      this._instanceName = Scene.name + '_' + Scene._instanceCount;
    }
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

    var existCamera_f = false;
    let collectCameras = function(elem) {
      if (elem instanceof Group) {
        var children = elem.getChildren();
        var cameras = [];
        children.forEach(function(child) {
          var childCameras = collectCameras(child);
          cameras = cameras.concat(childCameras)
        });
        return cameras;
      } else if (elem instanceof Camera) {
        existCamera_f = true;
        return [elem];
      } else {
        return [];
      }
    };

    this._cameras = [];
    this._elements.forEach((elm)=> {
      this._cameras = this._cameras.concat(collectCameras(elm));
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

  get cameras() {
    return this._cameras;
  }
}

GLBoost["Scene"] = Scene;
