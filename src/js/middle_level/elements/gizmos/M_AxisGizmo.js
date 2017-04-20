import M_Mesh from '../meshes/M_Mesh';
import Axis from '../../../low_level/primitives/Axis';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import DecalShader from '../../shaders/DecalShader';

export default class M_AxisGizmo extends M_Mesh {
  constructor(glBoostContext, length) {
    super(glBoostContext, null, null);
    this._init(length);
  }

  _init(length) {
    this.geometry = new Axis(this._glBoostContext, length);
  }
}
