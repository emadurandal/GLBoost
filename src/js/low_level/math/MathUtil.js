import GLBoost from '../../globals';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

export default class MathUtil {

  constructor() {

  }

  static radianToDegree(rad) {
    return rad * 180 / Math.PI;
  }

  static degreeToRadian(deg) {
    return deg * Math.PI / 180;
  }

  static arrayToVector(element) {
    if (Array.isArray(element)) {
      if(typeof(element[3]) !== 'undefined') {
        return new Vector4(element[0], element[1], element[2], element[3]);
      } else if (typeof(element[2]) !== 'undefined') {
        return new Vector3(element[0], element[1], element[2]);
      } else {
        return new Vector2(element[0], element[1]);
      }
    } else {
      return element;
    }
  }
}

GLBoost["MathUtil"] = MathUtil;
