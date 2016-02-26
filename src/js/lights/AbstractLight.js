import GLBoost from './../globals'
import GLContext from './../GLContext'
import Element from './../Element'

export default class AbstractLight extends Element {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    super(canvas);

    if (this.constructor === AbstractLight) {
      throw new TypeError("Cannot construct AbstractLight instances directly.");
    }

    this._gl = GLContext.getInstance(canvas).gl;
    this._name = "";
  }
}
