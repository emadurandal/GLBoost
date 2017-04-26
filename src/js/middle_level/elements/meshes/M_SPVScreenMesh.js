import M_Mesh from '../meshes/M_Mesh';
import SPVScreen from '../../../low_level/primitives/SPVScreen';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import DecalShader from '../../shaders/DecalShader';

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

    let material = new ClassicMaterial(this._glBoostContext);
    material.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_IGNORE;
    material.states = {
      "enable": [
        gl.BLEND
      ]
    };
    this.geometry.materials = [material];
  }
}
