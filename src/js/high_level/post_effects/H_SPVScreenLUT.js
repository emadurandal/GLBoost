import GLBoost from '../../globals';
import M_SPVScreenMesh from '../../middle_level/elements/meshes/M_SPVScreenMesh';

export default class H_SPVScreenLUT extends M_SPVScreenMesh {
  constructor(glBoostContext,  layout = {preset: 'one'}, inputTexture) {
    super(glBoostContext, layout, null);

    if (inputTexture) {
      this.inputTexture = inputTexture;
    }
  }

  set inputTexture(inputTexture) {
    this.geometry.materials[0].setTexture(inputTexture);
  }

  get inputTexture() {
    return this.geometry.materials[0].getOneTexture();
  }

  set sourceGammaForCorrection(value) {
    this.geometry.materials[0].shaderParameters.sourceGammaForCorrection = value;
  }

  get sourceGammaForCorrection() {
    return this.geometry.materials[0].shaderParameters.sourceGammaForCorrection;
  }

  set targetGammaForCorrection(value) {
    this.geometry.materials[0].shaderParameters.targetGammaForCorrection = value;
  }

  get targetGammaForCorrection() {
    return this.geometry.materials[0].shaderParameters.targetGammaForCorrection;
  }

  set isGammaEnable(flag) {
    this.geometry.materials[0].shaderParameters.isGammaEnable = flag;
  }

  get isGammaEnable() {
    return this.geometry.materials[0].shaderParameters.isGammaEnable;
  }

}

GLBoost["H_SPVScreenLUT"] = H_SPVScreenLUT;

