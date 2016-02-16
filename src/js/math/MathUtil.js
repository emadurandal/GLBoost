import GLBoost from './../globals'

export default class MathUtil {

  constructor() {

  }

  static radianToDegree(rad) {
    return rad * 180 / Math.PI;
  }

  static degreeToRadian(deg) {
    return deg * Math.PI / 180;
  }
}

GLBoost["MathUtil"] = MathUtil;
