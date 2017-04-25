import M_Mesh from '../meshes/M_Mesh';
import SPVScreen from '../../../low_level/primitives/SPVScreen';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import DecalShader from '../../shaders/DecalShader';

export default class M_ScreenMesh extends M_Mesh {
  constructor(glBoostContext, layout = {preset: 'one'}, customVertexAttributes) {
    super(glBoostContext, null, null);
    this._init(layout, customVertexAttributes);
  }

  _init(layout, customVertexAttributes) {
    this.geometry = new SPVScreen(this._glBoostContext, layout, customVertexAttributes);
    this.isAffectedByWorldMatrix = false;
    this.isAffectedByViewMatrix = false;
    this.isAffectedByProjectionMatrix = false;
  }
}
