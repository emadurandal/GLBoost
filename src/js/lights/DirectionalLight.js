import GLBoost from './../globals'
import GLContext from './../GLContext'
import AbstractLight from './AbstractLight'

export default class DirectionalLight extends AbstractLight {
  constructor(intensity, direction, canvas) {
    super(canvas);

    this._gl = GLContext.getInstance(canvas).gl;
    this._name = "";
    this._intensity = intensity;
    this._direction = direction;
  }

  set intensity(vec) {
    this._intensity = vec;
  }

  get intensity() {
    return this._intensity;
  }

  set direction(vec) {
    this._direction = vec;
  }

  get direction() {
    return this._direction;
  }

}

GLBoost["DirectionalLight"] = DirectionalLight;
