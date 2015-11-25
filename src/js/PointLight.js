import GLBoost from './globals'
import GLContext from './GLContext'
import AbstractLight from './AbstractLight'

export default class PointLight extends AbstractLight {
  constructor(intensity, canvas) {
    super(canvas);

    this._gl = GLContext.getInstance(canvas).gl;
    this._name = "";
    this._intensity = intensity;
  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }
}

GLBoost["PointLight"] = PointLight;
