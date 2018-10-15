/* @flow */

import GLContext from './GLContext';
import L_GLBoostMonitor from './L_GLBoostMonitor';
import GLExtensionsManager from './GLExtensionsManager';
import GLBoost from '../../globals';
import type GLBoostLowContextimport from './GLBoostLowContext';
import type Texture from '../textures/Texture';
import type ClassicMaterial from '../materials/ClassicMaterial';

export default class GLBoostSystem {
  _currentGlobalStates: Array<number> | null;
  _defaultGlobalStates: Array<number>;
  _glContext: GLContext;
  _glBoostContext: GLBoostLowContext;
  _glBoostMonitor: L_GLBoostMonitor;
  _globalStatesUsage: string;
  _defaultDummyTexture: Texture;
  _defaultDummyTextureCube: Texture;
  _brdfLutTexture: Texture;
  _defaultMaterial: ClassicMaterial;

  constructor(canvas: Object, initParameter:Object, gl:WebGLRenderingContext, width: number, height: number, glBoostContext: glBoostLowContext) {
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
