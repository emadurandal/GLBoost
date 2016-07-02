import GLBoost from '../../globals';
import Vector3 from './Vector3';

export default class AABB {

  constructor() {
    this._AABB_min = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    this._AABB_max = new Vector3(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);
    this._centerPoint = null;
    this._lengthCenterToCorner = null;
  }

  addPosition(positionVector) {
    this._AABB_min.x = (positionVector.x < this._AABB_min.x) ? positionVector.x : this._AABB_min.x;
    this._AABB_min.y = (positionVector.y < this._AABB_min.y) ? positionVector.y : this._AABB_min.y;
    this._AABB_min.z = (positionVector.z < this._AABB_min.z) ? positionVector.z : this._AABB_min.z;
    this._AABB_max.x = (this._AABB_max.x < positionVector.x) ? positionVector.x : this._AABB_max.x;
    this._AABB_max.y = (this._AABB_max.y < positionVector.y) ? positionVector.y : this._AABB_max.y;
    this._AABB_max.z = (this._AABB_max.z < positionVector.z) ? positionVector.z : this._AABB_max.z;

    return positionVector;
  }

  updateAllInfo() {
    this._centerPoint = Vector3.add(this._AABB_min, this._AABB_max).divide(2);
    this._lengthCenterToCorner = Vector3.lengthBtw(this._centerPoint, this._AABB_max);
  }

  get minPoint() {
    return this._AABB_min;
  }

  get maxPoint() {
    return this._AABB_max;
  }

  get centerPoint() {
    return this._centerPoint;
  }

  get lengthCenterToCorner() {
    return this._lengthCenterToCorner;
  }
}

GLBoost['AABB'] = AABB;
