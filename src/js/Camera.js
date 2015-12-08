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
  }

  lookAtRHMatrix() {
//    return Matrix44.identity();
    return Camera.lookAtRHMatrix(this._translate, this._center, this._up);
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
//    return Matrix44.identity();
    return Camera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNear, this._zFar);
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

  setAsMainCamera() {
    Camera._mainCamera = this;
  }

  get isMainCamera() {
    return Camera._mainCamera === this;
  }

  set eye(vec) {
    this._translate = vec;
  }

  get eye() {
    return this._translate;
  }

  set center(vec) {
    this._center = vec;
  }

  get center() {
    return this._center;
  }

  set up(vec) {
    this._up = vec;
  }

  get up() {
    return this._up;
  }

  set fovy(value) {
    this._fovy = value;
  }

  get fovy() {
    return this._fovy;
  }

  set aspect(value) {
    this._aspect = value;
  }

  get aspect() {
    return this._aspect;
  }

  set zNear(value) {
    this._zNear = value;
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(value) {
    this._zFar = value;
  }

  get zFar() {
    return this._zFar;
  }
}
Camera._mainCamera = null;

GLBoost["Camera"] = Camera;
