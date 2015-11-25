import GLBoost from './globals'
import Vector3 from './Vector3'

export default class Element {
  constructor() {
    this.children = [];
    this._translate = Vector3.zero();
  }

  set translate(vec) {
    this._translate = vec;
  }

  get translate() {
    return this._translate;
  }
}

GLBoost["Element"] = Element;
