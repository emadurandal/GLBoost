import GLBoost from '../../globals';
import L_AbstractMaterial from './L_AbstractMaterial';

export default class ClassicMaterial extends L_AbstractMaterial {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._wireframeWidthRelativeScale = 1.0;

  }

  get wireframeWidthRelativeScale() {
    return this._wireframeWidthRelativeScale;
  }
}

GLBoost['ClassicMaterial'] = ClassicMaterial;
