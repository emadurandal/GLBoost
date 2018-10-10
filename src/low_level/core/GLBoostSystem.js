/* @flow */

import GLContext from './GLContext';
import L_GLBoostMonitor from './L_GLBoostMonitor';
import GLExtensionsManager from './GLExtensionsManager';
import GLBoost from '../../globals';

export default class GLBoostSystem {
  _currentGlobalStates: Array<number> | null;
  _defaultGlobalStates: Array<number>;
  _glContext: GLContext;
  _glBoostMonitor: L_GLBoostMonitor;
  _globalStatesUsage: string;

  constructor(canvas: Object, initParameter, gl, width: number, height: number, glBoostContext) {
    if (gl) {
      this._glContext = GLContext.getInstance(null, initParameter, gl, width, height);
    } else {
      this._glContext = GLContext.getInstance(canvas, initParameter);
    }

    this._glBoostContext = glBoostContext;

    this._globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_INCLUSIVE;

    this._defaultGlobalStates = [
      3042, // gl.BLEND
      2929  // gl.DEPTH_TEST
    ];

    this._currentGlobalStates = null;

    this._glBoostMonitor = L_GLBoostMonitor.getInstance();

    // effekseer
    if (typeof effekseer !== "undefined") {
      effekseer.init(this._glContext.gl);
    }
  }
}
