import M_Group from '../M_Group';

export default class M_Gizmo extends M_Group {
  constructor(glBoostContext) {
    super(glBoostContext, null, null);

    this._mesh = null;
  }

  get mesh() {
    return this._mesh;
  }

}
