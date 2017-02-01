import GLBoost from '../../globals';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

export default class AABB {

  constructor() {
    this._AABB_min = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    this._AABB_max = new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
    this._centerPoint = null;
    this._lengthCenterToCorner = null;

  }

  clone() {
    let instance = new AABB();
    instance._AABB_max = this._AABB_max.clone();
    instance._AABB_min = this._AABB_min.clone();
    instance._centerPoint = (this._centerPoint !== null) ? this._centerPoint.clone() : null;
    instance._lengthCenterToCorner = this._lengthCenterToCorner;

    return instance;
  }

  isVanilla() {
    if (this._AABB_min.x == Number.MAX_VALUE && this._AABB_min.y == Number.MAX_VALUE && this._AABB_min.z == Number.MAX_VALUE
      && this._AABB_max.x == -Number.MAX_VALUE && this._AABB_max.y == -Number.MAX_VALUE && this._AABB_max.z == -Number.MAX_VALUE) {
      return true;
    } else {
      return false;
    }
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

  addPositionWithArray(array, index) {
    this._AABB_min.x = (array[index+0] < this._AABB_min.x) ? array[index+0] : this._AABB_min.x;
    this._AABB_min.y = (array[index+1] < this._AABB_min.y) ? array[index+1] : this._AABB_min.y;
    this._AABB_min.z = (array[index+2] < this._AABB_min.z) ? array[index+2] : this._AABB_min.z;
    this._AABB_max.x = (this._AABB_max.x < array[index+0]) ? array[index+0] : this._AABB_max.x;
    this._AABB_max.y = (this._AABB_max.y < array[index+1]) ? array[index+1] : this._AABB_max.y;
    this._AABB_max.z = (this._AABB_max.z < array[index+2]) ? array[index+2] : this._AABB_max.z;

    return array;
  }

  updateAllInfo() {
    this._centerPoint = Vector3.add(this._AABB_min, this._AABB_max).divide(2);
    this._lengthCenterToCorner = Vector3.lengthBtw(this._centerPoint, this._AABB_max);

    return this;
  }

  mergeAABB(aabb) {
    var isUpdated = false;

    if (aabb.isVanilla()) {
      return isUpdated;
    }

    if (this.isVanilla()) {
      this._AABB_min.x = aabb.minPoint.x;
      this._AABB_min.y = aabb.minPoint.y;
      this._AABB_min.z = aabb.minPoint.z;
      this._AABB_max.x = aabb.maxPoint.x;
      this._AABB_max.y = aabb.maxPoint.y;
      this._AABB_max.z = aabb.maxPoint.z;
      isUpdated = true;
      return isUpdated;
    }

    if (aabb.minPoint.x < this._AABB_min.x) {
      this._AABB_min.x = aabb.minPoint.x;
      isUpdated = true;
    }
    if (aabb.minPoint.y < this._AABB_min.y) {
      this._AABB_min.y = aabb.minPoint.y;
      isUpdated = true;
    }
    if (aabb.minPoint.z < this._AABB_min.z) {
      this._AABB_min.z = aabb.minPoint.z;
      isUpdated = true;
    }
    if (this._AABB_max.x < aabb.maxPoint.x) {
      this._AABB_max.x = aabb.maxPoint.x;
      isUpdated = true;
    }
    if (this._AABB_max.y < aabb.maxPoint.y) {
      this._AABB_max.y = aabb.maxPoint.y;
      isUpdated = true;
    }
    if (this._AABB_max.z < aabb.maxPoint.z) {
      this._AABB_max.z = aabb.maxPoint.z;
      isUpdated = true;
    }
    this.updateAllInfo();

    return isUpdated;
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

  static multiplyMatrix(matrix, aabb) {
     if (aabb.isVanilla()) {
       return aabb.clone();
     }
    var newAabb = new AABB();

    let AABB_0 = new Vector4(aabb._AABB_min.x, aabb._AABB_min.y, aabb._AABB_min.z, 1);
    let AABB_1 = new Vector4(aabb._AABB_max.x, aabb._AABB_min.y, aabb._AABB_min.z, 1);
    let AABB_2 = new Vector4(aabb._AABB_min.x, aabb._AABB_max.y, aabb._AABB_min.z, 1);
    let AABB_3 = new Vector4(aabb._AABB_min.x, aabb._AABB_min.y, aabb._AABB_max.z, 1);
    let AABB_4 = new Vector4(aabb._AABB_min.x, aabb._AABB_max.y, aabb._AABB_max.z, 1);
    let AABB_5 = new Vector4(aabb._AABB_max.x, aabb._AABB_min.y, aabb._AABB_max.z, 1);
    let AABB_6 = new Vector4(aabb._AABB_max.x, aabb._AABB_max.y, aabb._AABB_min.z, 1);
    let AABB_7 = new Vector4(aabb._AABB_max.x, aabb._AABB_max.y, aabb._AABB_max.z, 1);
    newAabb.addPosition(matrix.multiplyVector(AABB_0).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_1).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_2).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_3).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_4).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_5).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_6).toVector3());
    newAabb.addPosition(matrix.multiplyVector(AABB_7).toVector3());
    newAabb.updateAllInfo();

    return newAabb;
  }

  toString() {
    return 'AABB_min: ' + this._AABB_min + '\n' + 'AABB_max: ' + this._AABB_max + '\n'
      + 'centerPoint: ' + this._centerPoint + '\n' + 'lengthCenterToCorner: ' + this._lengthCenterToCorner;
  }
}

GLBoost['AABB'] = AABB;
