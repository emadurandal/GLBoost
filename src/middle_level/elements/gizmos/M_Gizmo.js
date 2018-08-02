import M_Group from '../M_Group';

export default class M_Gizmo extends M_Group {
  constructor(glBoostContext) {
    super(glBoostContext, null, null);

    this._mesh = null;

    // Whether or not to draw this gizmo before normal meshes drawing.
    // If true, draw this gizmo before normal meshes drawing.
    // If false, draw this gizmo after normal meshes drawing.
    this._isPreDraw = false;
    this._forceThisMaterial = null;
  }

  get mesh() {
    return this._mesh;
  }

  set isPreDraw(flg) {
    this._isPreDraw = flg;
  }

  get isPreDraw() {
    return this._isPreDraw;
  }

  get forceThisMaterial() {
    return this._forceThisMaterial;
  }
}
