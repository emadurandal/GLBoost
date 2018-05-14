import Quaternion from '../../low_level/math/Quaternion';

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

  static interpolate(inputArray, outputArray, input, componentN) {
    if (input < inputArray[0]) {
      return outputArray[0].clone(); // out of range!
    }
    if (inputArray[inputArray.length-1] <= input) {
      return outputArray[outputArray.length-1].clone(); // out of range!
    }

    for (let i = 0; i<inputArray.length; i++) {
      if (typeof inputArray[i+1] === "undefined") {
        break;
      }
      if (inputArray[i] <= input && input < inputArray[i+1]) {
        let ratio = (input - inputArray[i]) / (inputArray[i+1] - inputArray[i]);
        let resultValue = this.lerp(outputArray[i].clone(), outputArray[i+1].clone(), ratio, componentN);
        return resultValue;
      }
    }
    return outputArray[0].clone(); // out of range!
  }
}
