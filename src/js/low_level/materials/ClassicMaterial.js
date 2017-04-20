import GLBoost from '../../globals';
import L_AbstractMaterial from './L_AbstractMaterial';

export default class ClassicMaterial extends L_AbstractMaterial {
  constructor(glBoostContext) {
    super(glBoostContext);

  }
}

GLBoost['ClassicMaterial'] = ClassicMaterial;
