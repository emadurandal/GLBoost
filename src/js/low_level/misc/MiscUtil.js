import GLBoost from '../../globals';

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
  
  static consoleLog(text) {
    if (GLBoost.CONSOLE_OUT_FOR_DEBUGGING) {
      console.log(text);
    }
  }
}
