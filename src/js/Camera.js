import GLBoost from './globals'
import Vector3 from './math/Vector3'
import Element from './Element'
import Matrix44 from './math/Matrix44'

export default class Camera extends Element {
  constructor(lookat, perspective) {
    super();

    this._translate = lookat.eye;
    this._center = lookat.center;
    this._up = lookat.up;

    this._fovy = perspective.fovy;
    this._aspect = perspective.aspect;
    this._zNear = perspective.zNear;
    this._zFar = perspective.zFar;

    this.setAsMainCamera();

    this._dirtyView = true;
    this._dirtyProjection = true;
  }

  lookAtRHMatrix() {
    if (this._dirtyView) {
      this._viewMatrix = Camera.lookAtRHMatrix(this._translate, this._center, this._up);
      this._dirtyView = false;
      return this._viewMatrix;
    } else {
      return this._viewMatrix;
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
      return this._projectionMatrix;
    } else {
      return this._projectionMatrix;
    }
  }

  static perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

    var yscale = 1.0 / Math.tan(0.5*fovy*Math.PI/180);
    var xscale = yscale / aspect;

    this._dirtyProjection = false;

    return new Matrix44(
      xscale, 0.0, 0.0, 0.0,
      0.0, yscale, 0.0, 0.0,
      0.0, 0.0, - (zFar + zNear) / (zFar - zNear), - (2.0 * zFar * zNear) / (zFar - zNear),
      0.0, 0.0, -1.0, 0.0
    );

  }

  setAsMainCamera() {
    Camera._mainCamera = this;
  }

  get isMainCamera() {
    return Camera._mainCamera === this;
  }

  set translate(vec) {
    if (this._translate.isEqual(vec)) {
      return;
    }
    this._dirty = true;
    this._dirtyView = true;
    this._translate = vec;
  }

  set eye(vec) {
    if (this._translate.isEqual(vec)) {
      return;
    }
    this._dirty = true;
    this._dirtyView = true;
    this._translate = vec;
  }

  get eye() {
    return this._translate;
  }

  set center(vec) {
    if (this._center.isEqual(vec)) {
      return;
    }
    this._dirtyView = true;
    this._center = vec;
  }

  get center() {
    return this._center;
  }

  set up(vec) {
    if (this._up.isEqual(vec)) {
      return;
    }
    this._dirtyView = true;
    this._up = vec;
  }

  get up() {
    return this._up;
  }

  set fovy(value) {
    if (this._fovy === value) {
      return;
    }
    this._dirtyProjection = true;
    this._fovy = value;
  }

  get fovy() {
    return this._fovy;
  }

  set aspect(value) {
    if (this._aspect === value) {
      return;
    }
    this._dirtyProjection = true;
    this._aspect = value;
  }

  get aspect() {
    return this._aspect;
  }

  set zNear(value) {
    if (this._zNear === value) {
      return;
    }
    this._dirtyProjection = true;
    this._zNear = value;
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value) {
    if (this._zFar === value) {
      return;
    }
    this._dirtyProjection = true;
    this._zFar = value;
  }

  get zFar() {
    return this._zFar;
  }
  /*
  get dirty() {
    return this._dirtyView || this._dirtyProjection;
  }

  get dirtyView() {
    return this._dirtyView;
  }

  get dirtyProjection() {
    return this._dirtyProjection;
  }
  */
}
Camera._mainCamera = null;

GLBoost["Camera"] = Camera;
