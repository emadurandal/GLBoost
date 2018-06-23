import M_Gizmo from './M_Gizmo';
import Line from '../../../low_level/primitives/Line';
import M_Mesh from '../meshes/M_Mesh';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';

export default class M_HeightLineGizmo extends M_Gizmo {
  constructor(glBoostContext) {
    super(glBoostContext, null, null);
    this._init(glBoostContext);

    this.isVisible = false;
  }

  _init(glBoostContext) {
    this._primitive = new Line(glBoostContext);

    //    this._mesh.rotate = new Vector3(-Math.PI/2, 0, 0);
    const material = glBoostContext.createClassicMaterial();
    this._mesh = new M_Mesh(glBoostContext, this._primitive, material);
    this._mesh.masterElement = this;
    this.addChild(this._mesh);

  }

  set startPosition(startPos) {
    this._primitive.startPosition = startPos;
  }

  get startPosition() {
    return this._primitive.startPosition;
  }
  
  set endPosition(endPos) {
    this._primitive.endPosition = endPos;
  }

  get endPosition() {
    return this._primitive.endPosition;
  }

  update() {
    this._primitive.update();
  }
  
  set isVisible(flag) {
    this._mesh.isVisible = flag;
  }

  get isVisible() {
    return this._mesh.isVisible;
  }
}

GLBoost['M_HeightLineGizmo'] = M_HeightLineGizmo;
