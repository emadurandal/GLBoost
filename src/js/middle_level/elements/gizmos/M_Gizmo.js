import M_Mesh from '../meshes/M_Mesh';

export default class M_Gizmo extends M_Mesh {
  constructor(glBoostContext) {
    super(glBoostContext, null, null);

    this._masterElement = null;
  }

  set masterElement(element) {
    this._masterElement = element;
  }

  get masterElement() {
    return this._masterElement;
  }

  // Use master element's transformMatrixAccumulatedAncestry.
  get transformMatrixAccumulatedAncestry() {
    if (this._masterElement) {
      return this._masterElement.transformMatrixAccumulatedAncestry;
    }
    return super.transformMatrixAccumulatedAncestry;
  }

}
