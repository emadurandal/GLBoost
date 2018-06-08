import GLBoost from '../../globals';
import Quaternion from '../../low_level/math/Quaternion';
import MathUtil from '../../low_level/math/MathUtil';

export default class AnimationUtil {

  constructor() {

  }

  static lerp(start, end, ratio, componentN) {
    if (componentN === 1) {
      return start * (1 - ratio) + end * ratio;
    } else {
      if (start instanceof Quaternion) {
        return Quaternion.qlerp(start, end, ratio);
      } else {
        return start.multiply((1 - ratio)).add(end.multiply(ratio));
      }
    }
  }

  static interpolate(inputArray, outputArray, input, componentN, method = GLBoost.INTERPOLATION_LINEAR) {
    if (input < inputArray[0]) {
      return outputArray[0].clone(); // out of range!
    }
    if (inputArray[inputArray.length-1] <= input) {
      return outputArray[outputArray.length-1].clone(); // out of range!
    }
    if (inputArray.length === 1) {
      return outputArray[0].clone(); // there is one only!
    }


    if (method === GLBoost.INTERPOLATION_LINEAR) {
      const i = MathUtil.findNearestByBinarySearch(inputArray, input, 0, inputArray.length-1);
      let ratio = (input - inputArray[i]) / (inputArray[i+1] - inputArray[i]);
      let resultValue = this.lerp(outputArray[i].clone(), outputArray[i+1].clone(), ratio, componentN);
      return resultValue;
    } else if (method === GLBoost.INTERPOLATION_STEP) {
      for (let i = 0; i<inputArray.length; i++) {
        if (typeof inputArray[i+1] === "undefined") {
          break;
        }
        if (inputArray[i] <= input && input < inputArray[i+1]) {
          return outputArray[i].clone();
        }
      }
    }
    return outputArray[0].clone(); // out of range!
  }
}
