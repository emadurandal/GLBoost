import Axis from '../../../low_level/primitives/Axis';
import M_Gizmo from './M_Gizmo';
import M_Mesh from '../meshes/M_Mesh';

export default class M_AxisGizmo extends M_Gizmo {
  constructor(glBoostSystem, length) {
    super(glBoostSystem);

    this._init(glBoostSystem, length);
  }

  _init(glBoostSystem, length) {
    let mesh = new M_Mesh(glBoostSystem, new Axis(glBoostSystem, length));
    this.addChild(mesh);
  }
}
