import Axis from '../../../low_level/primitives/Axis';
import M_Gizmo from './M_Gizmo';

export default class M_AxisGizmo extends M_Gizmo {
  constructor(glBoostContext, length) {
    super(glBoostContext, null, null);
    this._init(length);
  }

  _init(length) {
    this.geometry = new Axis(this._glBoostContext, length);
  }
}
