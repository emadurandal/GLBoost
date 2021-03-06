// @flow

import GLBoost from '../../globals';

let singleton = Symbol();
let singletonEnforcer = Symbol();

type LogLevelId = number;
type LogTypeId = number;
type LogInternalFormat = {
  unixtime: number,
  logLevelId: LogTypeId,
  args: array<any>
};

export default class Logger {
  logData:Array<LogInternalFormat>;
  // Formatter
  // logFormatter:any;

  // Log Data Output Target
  realtimeTargets:Map<string, Function>
  aggregateTargets:Map<string, Function>;

  logCapacity: number;
  /**
   * The constructor of Logger class. But you cannot use this constructor directly because of this class is a singleton class. Use getInstance() static method.
   * @param enforcer a Symbol to forbid calling this constructor directly
   */
  constructor(enforcer: Symbol) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
    //this.logFormatter = null;
    this.realtimeTargets = new Map();
    this.aggregateTargets = new Map();
    this.logData = [];
    this.logCapacity = 5000;
    this.registerRealtimeOutputTarget('default', this.defaultConsoleFunction);
    this.registerAggregateOutputTarget('default', this.defaultConsoleFunction);
  }

  /**
   * The static method to get singleton instance of this class.
   * @return The singleton instance of GLTFLoader class
   */
  static getInstance(): Logger {
    if (!this[singleton]) {
      this[singleton] = new Logger(singletonEnforcer);
    }
    return this[singleton];
  }

  registerRealtimeOutputTarget(targetName, target) {
    this.realtimeTargets.set(targetName, target);
  }

  registerAggregateOutputTarget(targetName, target) {
    this.aggregateTargets.set(targetName, target);
  }

  unregisterRealtimeOutputTarget(targetName) {
    this.realtimeTargets.delete(targetName);
  }

  unregisterAggregateOutputTarget(targetName) {
    this.aggregateTargets.delete(targetName);
  }

  aggregate(targetName = null) {
    if (targetName != null) {
      const targetFunc = this.realtimeTargets[targetName];
      for (const log of this.logData) {
        targetFunc(log.logLevelId, log.logTypeId, log.unixtime, ...log.args);
      }
  } else {
      for (var [targetName, targetFunc] of this.realtimeTargets) {
        for (const log of this.logData) {
          targetFunc(log.logLevelId, log.logTypeId, log.unixtime, ...log.args);
        }
      }
    }
  }

  out(logLevelId, logTypeId, isRealtimeOn, ...args) {
    if (GLBoost.VALUE_CONSOLE_OUT_FOR_DEBUGGING === false &&
      (logLevelId === GLBoost.LOG_LEVEL_DEBUG ||
       logLevelId === GLBoost.LOG_LEVEL_INFO ||
       logLevelId === GLBoost.LOG_LEVEL_LOG)) {
      // output error log even when VALUE_CONSOLE_OUT_FOR_DEBUGGING is true.
      return;
    }
    
    if (GLBoost.valueOfGLBoostConstants[logTypeId] != null && GLBoost.valueOfGLBoostConstants[logTypeId] === false) {
      return;
    }

    const unixtime = Date.now();
    this.logData.push({
      unixtime: unixtime,
      logLevelId: logLevelId,
      logTypeId: logTypeId,
      args: args
    });

    if (isRealtimeOn) {
      for (var [targetName, targetFunc] of this.realtimeTargets) {
        targetFunc(logLevelId, logTypeId, unixtime, ...args);
      }
    }

    if (this.logData.length > this.logCapacity + 1000) {
      this.logData.splice(0, this.logData.length - this.logCapacity);
    }
  }

  defaultConsoleFunction(logLevelId, logTypeId, unixtime, ...args) {
    //console[GLBoost.getValueOfGLBoostConstant(logLevelId)](`[${GLBoost.getValueOfGLBoostConstant(logTypeId)}] ${args}`);

    const d = new Date(unixtime);
    const year  = d.getFullYear();
    const month = d.getMonth() + 1;
    const day   = d.getDate();
    const hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    const min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    const sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
    const datestr = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    console[GLBoost.getValueOfGLBoostConstant(logLevelId)](`[${datestr}][${GLBoost.getValueOfGLBoostConstant(logTypeId)}] ${args}`);
  }
}

GLBoost['Logger'] = Logger;
