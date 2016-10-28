import GLBoost from '../../globals';

export default class MiscUtil {

  constructor() {

  }

  static isDefinedAndTrue(value) {
    return !!(typeof value !== 'undefined' && value);
  }

  static getTheValueOrAlternative(value, alternativeIfTheValueIsNullOrUndefined) {
    if (typeof value !== 'undefined' && value != null) {
      return value;
    } else {
      return alternativeIfTheValueIsNullOrUndefined;
    }
  }
  
  static consoleLog(text) {
    if (GLBoost.CONSOLE_OUT_FOR_DEBUGGING) {
      console.log(text);
    }
  }
}
