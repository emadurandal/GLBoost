import GLBoost from './globals'
import Element from './Element'

export default class Scene extends Element {
  constructor() {
    super();
    this._meshes = [];
  }

  add(mesh) {
    this._meshes.push(mesh);
  }

  get meshes() {
    return this._meshes;
  }
}

GLBoost["Scene"] = Scene;
