import M_Mesh from '../meshes/M_Mesh';
import Screen from '../../../low_level/primitives/Screen';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';

export default class M_ScreenMesh extends M_Mesh {
  constructor(glBoostContext, customVertexAttributes) {
    super(glBoostContext, null, null);
    this._init(customVertexAttributes);
  }

  _init(customVertexAttributes) {
    let gl = this._glContext.gl;
    this.geometry = new Screen(this._glBoostContext, void 0, customVertexAttributes);
    this.isAffectedByWorldMatrix = false;
    this.isAffectedByViewMatrix = false;
    this.isAffectedByProjectionMatrix = false;

    let material = new ClassicMaterial(this._glBoostContext);
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


GLBoost["M_ScreenMesh"] = M_ScreenMesh;
