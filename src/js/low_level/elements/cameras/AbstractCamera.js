import Vector3 from '../../math/Vector3';
import Element from '../Element';
import Matrix44 from '../../math/Matrix44';

export default class AbstractCamera extends Element {
  constructor(glBoostContext, lookat) {
    super(glBoostContext);

    if (this.constructor === AbstractCamera) {
      throw new TypeError('Cannot construct AbstractCamera instances directly.');
    }


    this._translate = lookat.eye;
    this._center = lookat.center;
    this._up = lookat.up;

    this._dirtyView = true;
    this._updateCountAsCameraView = 0;
    this._mainCamera = {};

  }

  _needUpdateView() {
    this._dirtyView = true;
    this._updateCountAsCameraView++;
  }

  get updateCountAsCameraView() {
    return this._updateCountAsCameraView;
  }

  get latestViewStateInfoString() {
    var tempString = this._accumulateMyAndParentNameWithUpdateInfo(this);
    tempString += '_updateCountAsCameraView_' + this._updateCountAsCameraView;

    return tempString;
  }

  lookAtRHMatrix() {
    if (this._dirtyView) {
      this._viewMatrix = AbstractCamera.lookAtRHMatrix(this._translate, this._center, this._up);
      this._dirtyView = false;
      return this._viewMatrix.clone();
    } else {
      return this._viewMatrix.clone();
    }
  }

  static lookAtRHMatrix(eye, center, up) {

    var f = Vector3.normalize(Vector3.subtract(center, eye));
    var s = Vector3.normalize(Vector3.cross(f, up));
    var u = Vector3.cross(s, f);

    return new Matrix44(s.x, s.y, s.z, -Vector3.dotProduct(s,eye),
      u.x, u.y, u.z, -Vector3.dotProduct(u,eye),
      -f.x, -f.y, -f.z, Vector3.dotProduct(f,eye),
      0, 0, 0, 1);
  }

  setAsMainCamera(scene) {
    this._mainCamera[scene.toString()] = this;
  }

  isMainCamera(scene) {
    return this._mainCamera[scene.toString()] === this;
  }

  set translate(vec) {
    super.translate = vec;
    this._needUpdateView();
  }

  get translate() {
    return super.translate;
  }

  set eye(vec) {
    super.translate = vec;
    this._needUpdateView();
  }

  get eye() {
    return this._translate;
  }

  set center(vec) {
    if (this._center.isEqual(vec)) {
      return;
    }
    this._center = vec;
    this._needUpdateView();
  }

  get center() {
    return this._center;
  }

  set up(vec) {
    if (this._up.isEqual(vec)) {
      return;
    }
    this._up = vec;
    this._needUpdateView();
  }

  get up() {
    return this._up;
  }

}
