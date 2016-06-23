export default class MiscUtil {

  constructor() {

  }

  static isDefinedAndTrue(value) {
    if (typeof value !== 'undefined' && value) {
      return true;
    } else {
      return false;
    }
  }
}
