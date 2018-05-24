import GLBoost from '../../globals';
import M_SPVScreenMesh from '../../middle_level/elements/meshes/M_SPVScreenMesh';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';

export default class H_SPVUIRectangle extends M_SPVScreenMesh {
  constructor(glBoostContext,  layout = {
    preset: null,
    screens: [
      {
        unit: 'ratio', // 'pixel'
        range: 'positive', // 'positive-negative'
        origin: new Vector2(0, 0),
        size: new Vector2(1, 1),
        uDivision: 0,
        vDivision: 0,
        uUVRepeat: false,
        vUVRepeat: false
      }
    ],
  }, inputTexture) {
    super(glBoostContext, layout, null);

    this.scale = new Vector3(0, 0, 1);

    this.innerColor = new Vector4(1, 0.5, 0.5, 0.8);
    this._origin = new Vector2(0, 0);
    this._size = new Vector2(0, 0);
    this._rangeFromOrigin = null;

    this.isAffectedByWorldMatrix = true;
    this.isAffectedByWorldMatrixAccumulatedAncestry = false;

    this._reverseOriginY = false;
  }

  updateShape() {
    let rangeFromOrigin = 0;
    if (!this.rangeFromOrigin) {
      rangeFromOrigin = new Vector2(this._glContext.canvasWidth, this._glContext.canvasHeight);
    }

    let originY = this._origin.y;
    let sizeY = this._size.y;
    if (this._reverseOriginY) {
      originY = - this._origin.y + rangeFromOrigin.y*2;
      //normalizedSize.y = - normalizedSize.y;
      sizeY = - this._size.y;
    }

    let normalizedSize = new Vector3(this._size.x / rangeFromOrigin.x, sizeY / rangeFromOrigin.y, 1);
    let normalizedOrigin = new Vector3((this._origin.x - rangeFromOrigin.x) / rangeFromOrigin.x, (originY - rangeFromOrigin.y) / rangeFromOrigin.y, 1);
    normalizedOrigin.x += normalizedSize.x;
    normalizedOrigin.y += normalizedSize.y;

    this.scale = normalizedSize;
    this.translate = normalizedOrigin;
  }

  set innerColor(color) {
    this.geometry.materials[0].baseColor = color;
  }

  get innerColor() {
    return this.geometry.materials[0].baseColor;
  }

  set origin(vec2) {
    this._origin = vec2;
    this.updateShape();
  }

  get origin() {
    return this._origin;
  }

  set size(vec2) {
    this._size = vec2;
    this.updateShape();
  }

  get size() {
    return this._size;
  }

  set rangeFromOrigin(vec2) {
    this._rangeFromOrigin = vec2;
    this.updateShape();
  }

  get rangeFromOrigin() {
    return this._rangeFromOrigin;
  }

  set reverseOriginY(flg) {
    this._reverseOriginY = flg;
  }

  get reverseOriginY() {
    return this._reverseOriginY;
  }

}

GLBoost["H_SPVUIRectangle"] = H_SPVUIRectangle;

