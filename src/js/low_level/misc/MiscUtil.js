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
  
  static consoleLog(logType, text) {
    if (GLBoost.VALUE_CONSOLE_OUT_FOR_DEBUGGING && GLBoost['VALUE_' + logType]) {
      console.log(text);
    }
  }
}
