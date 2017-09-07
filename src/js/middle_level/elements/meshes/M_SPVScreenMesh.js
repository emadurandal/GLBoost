import M_Mesh from '../meshes/M_Mesh';
import SPVScreen from '../../../low_level/primitives/SPVScreen';
import SPVClassicMaterial from '../../../low_level/materials/SPVClassicMaterial';

export default class M_SPVScreenMesh extends M_Mesh {
  constructor(glBoostContext, layout = {preset: 'one'}, customVertexAttributes) {
    super(glBoostContext, null, null);
    this._init(layout, customVertexAttributes);
  }

  _init(layout, customVertexAttributes) {
    let gl = this._glContext.gl;
    this.geometry = new SPVScreen(this._glBoostContext, layout, customVertexAttributes);
    this.isAffectedByWorldMatrix = false;
    this.isAffectedByViewMatrix = false;
    this.isAffectedByProjectionMatrix = false;

    let material = new SPVClassicMaterial(this._glBoostContext);
    material.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_IGNORE;
    material.states = {
      "enable": [
        gl.BLEND
      ],
      "functions": {
        "blendFuncSeparate": [
          770, // SRC_ALPHA
          771, // ONE MINUS SRC_ALPHA
          1,   // ONE
          1    // ONE
        ]
      }
    };
    this.geometry.materials = [material];
    this._material = material;
  }

  set material(obj) {
    this._material = obj;
  }

  get material() {
    return this._material;
  }
}
