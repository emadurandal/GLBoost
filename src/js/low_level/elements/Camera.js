import Vector3 from '../math/Vector3';
import Element from './Element';
import Matrix44 from '../math/Matrix44';

export default class Camera extends Element {
  constructor(glBoostContext, lookat, perspective) {
    super(glBoostContext);

    this._translate = lookat.eye;
    this._center = lookat.center;
    this._up = lookat.up;

    this._fovy = perspective.fovy;
    this._aspect = perspective.aspect;
    this._zNear = perspective.zNear;
    this._zFar = perspective.zFar;

    this._dirtyView = true;
    this._dirtyAsElement = true;
    this._updateCountAsCameraView = 0;
    this._dirtyProjection = true;
    this._updateCountAsCameraProjection = 0;
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
  }

  _needUpdateProjection() {
    this._dirtyProjection = true;
    this._updateCountAsCameraProjection++;
  }

  get updateCountAsCameraProjection() {
    return this._updateCountAsCameraProjection;
  }

  lookAtRHMatrix() {
    if (this._dirtyView) {
      this._viewMatrix = Camera.lookAtRHMatrix(this._translate, this._center, this._up);
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

  perspectiveRHMatrix() {
    if (this._dirtyProjection) {
      this._projectionMatrix = Camera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNear, this._zFar);
      this._dirtyProjection = false;
      return this._projectionMatrix.clone();
    } else {
      return this._projectionMatrix.clone();
    }
  }

  static perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

    var yscale = 1.0 / Math.tan(0.5*fovy*Math.PI/180);
    var xscale = yscale / aspect;

    return new Matrix44(
      xscale, 0.0, 0.0, 0.0,
      0.0, yscale, 0.0, 0.0,
      0.0, 0.0, - (zFar + zNear) / (zFar - zNear), - (2.0 * zFar * zNear) / (zFar - zNear),
      0.0, 0.0, -1.0, 0.0
    );

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

  set fovy(value) {
    if (this._fovy === value) {
      return;
    }
    this._fovy = value;
    this._needUpdateProjection();
  }

  get fovy() {
    return this._fovy;
  }

  set aspect(value) {
    if (this._aspect === value) {
      return;
    }
    this._aspect = value;
    this._needUpdateProjection();
  }

  get aspect() {
    return this._aspect;
  }

  set zNear(value) {
    if (this._zNear === value) {
      return;
    }
    this._zNear = value;
    this._needUpdateProjection();
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value) {
    if (this._zFar === value) {
      return;
    }
    this._zFar = value;
    this._needUpdateProjection();
  }

  get zFar() {
    return this._zFar;
  }

}
Camera._mainCamera = null;
