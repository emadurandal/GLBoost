import GLBoost from './globals'

export default class Vector4 {

  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

}

GLBoost["Vector4"] = Vector4;
