import GLBoost from './globals'
import Element from './Element'
import Camera from './Camera'
import AbstractLight from './lights/AbstractLight'
import Mesh from './Geometry'

export default class Scene extends Element {
  constructor() {
    super();
    this._elements = [];
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

    // レンダリングの準備をさせる。
    this._elements.forEach((elm)=> {
      if (elm.prepareForRender === void 0) return; // prepareForRenderメソッドを持っていないエレメントは処理しない
      if (elm instanceof Mesh) {
        elm.prepareForRender(existCamera_f, lights);
      }
    });
  }

  get elements() {
    return this._elements;
  }
}

GLBoost["Scene"] = Scene;
