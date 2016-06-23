export default class ArrayUtil {

  constructor() {

  }

  static merge() {
    var key, result = false;
    if (arguments && arguments.length > 0) {
      result = [];
      for (var i = 0, len = arguments.length;i < len; i++) {
        if (arguments[i] && typeof arguments[i] === 'object') {
          for (key in arguments[i]) {
            if (isFinite(key)) {
              result.push(arguments[i][key]);
            } else {
              result[key] = arguments[i][key];
            }
          }
        }
      }
    }
    return result;
  }
}
