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
    this.registerRealtimeOutputTarget('default', this.defaultConsoleFunction);
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
        targetFunc(logLevelId, logTypeId, log);
      }
  } else {
      for (var [targetName, targetFunc] of this.realtimeTargets) {
        for (const log of this.logData) {
          targetFunc(logLevelId, logTypeId, log);
        }
      }
    }
  }

  out(logLevelId, logTypeId, ...args) {
    const unixtime = Date.now();
    this.logData.push({
      unixtime: unixtime,
      logLevelId: logLevelId,
      args: args
    });

    for (var [targetName, targetFunc] of this.realtimeTargets) {
      targetFunc(logLevelId, logTypeId, unixtime, ...args);
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
