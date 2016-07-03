import GLBoost from '../../globals';
import Vector3 from './Vector3';

export default class Vector4 {

  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  isEqual(vec) {
    if (this.x === vec.x && this.y === vec.y && this.z === vec.z && this.w === vec.w) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Zero Vector
   */
  static zero() {
    return new Vector4(0, 0, 0, 1);
  }

  toVector3() {
    return new Vector3(this.x, this.y, this.z);
  }
}

GLBoost["Vector4"] = Vector4;
