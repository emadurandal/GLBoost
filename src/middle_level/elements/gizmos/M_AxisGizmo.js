import Axis from '../../../low_level/primitives/Axis';
import M_Gizmo from './M_Gizmo';
import M_Mesh from '../meshes/M_Mesh';

export default class M_AxisGizmo extends M_Gizmo {
  constructor(glBoostContext, length) {
    super(glBoostContext);

    this._init(glBoostContext, length);
  }

  _init(glBoostContext, length) {
    let mesh = new M_Mesh(glBoostContext, new Axis(this._glBoostContext, length));
    this.addChild(mesh);
  }
}
