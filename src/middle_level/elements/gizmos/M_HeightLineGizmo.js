import M_Gizmo from './M_Gizmo';
import Vector3 from '../../../low_level/math/Vector3';
import Line from '../../../low_level/primitives/Line';
import M_Mesh from '../meshes/M_Mesh';

export default class M_HeightLineGizmo extends M_Gizmo {
  constructor(glBoostContext) {
    super(glBoostContext, null, null);
    this._init(glBoostContext);

    this.isVisible = false;
  }

  _init(glBoostContext) {
    this._primitive = new Line(glBoostContext, Vector3.zero(), Vector3.zero(), true);

    //    this._mesh.rotate = new Vector3(-Math.PI/2, 0, 0);
    const material = glBoostContext._glBoostContext.createClassicMaterial();
    this._material = material;
    this._mesh = new M_Mesh(glBoostContext, this._primitive, material);
    this._mesh.isPickable = false;
    this._mesh.masterElement = this;
    this.addChild(this._mesh);

  }

  set color(val) {
    this._material.baseColor = val;
  }

  get color() {
    return this._material.baseColor;
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
