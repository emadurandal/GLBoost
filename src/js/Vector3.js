import GLBoost from './globals'

export default class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

}

GLBoost["Vector3"] = Vector3;
