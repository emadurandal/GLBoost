import GLBoost from './globals'
import Element from './Element'

export default class Scene extends Element {
  constructor() {
    super();
    this._elements = [];
  }

  add(mesh) {
    this._elements.push(mesh);
  }

  prepareForRender() {
    this._elements.forEach((elm)=> {
      if (elm.prepareForRender === void 0) return;
      elm.prepareForRender();
    });
  }

  get elements() {
    return this._elements;
  }
}

GLBoost["Scene"] = Scene;
