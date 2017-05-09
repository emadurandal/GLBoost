import GLBoost from '../../globals';
import SPVDecalShader from '../../middle_level/shaders/SPVDecalShader';
import L_AbstractMaterial from './L_AbstractMaterial';

export default class SPVClassicMaterial extends L_AbstractMaterial {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._shaderClass = SPVDecalShader;
    this._isWireframe = false;
    this._isWireframeOnShade = false;
    this._wireframeWidth = 1.0;
  }

  set isWireframe(flag) {
    this._isWireframe = flag;
  }

  get isWireframe() {
    return this._isWireframe;
  }

  set isWireframeOnShade(flag) {
    this._isWireframeOnShade = flag;
  }

  get isWireframeOnShade() {
    return this._isWireframeOnShade;
  }

  set wireframeWidth(width) {
    this._wireframeWidth = width;
  }

  get wireframeWidth() {
    return this._wireframeWidth;
  }
}

GLBoost['SPVClassicMaterial'] = SPVClassicMaterial;
