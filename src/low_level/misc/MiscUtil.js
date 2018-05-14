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

  static isJavaScriptObjectType(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }
  
  static consoleLog(logType, text) {
    if (GLBoost.VALUE_CONSOLE_OUT_FOR_DEBUGGING && GLBoost.valueOfGLBoostConstants[logType]) {
      console.log(text);
    }
  }
}

GLBoost['MiscUtil'] = MiscUtil;
