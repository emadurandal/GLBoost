import GLBoost from './globals'
import Vector3 from './Vector3'
import Element from './Element'
import Matrix4x4 from './Matrix4x4'

export default class Camera extends Element {
  constructor(lookat, perspective) {
    super();

    this.eye = lookat.eye;
    this.center = lookat.center;
    this.up = lookat.up;

    this.fovy = perspective.fovy;
    this.aspect = perspective.aspect;
    this.zNear = perspective.zNear;
    this.zFar = perspective.zFar;
  }

  lookAtRHMatrix() {
    return Camera.lookAtRHMatrix(this.eye, this.center, this.up);
  }

  static lookAtRHMatrix(eye, center, up) {

    var f = Vector3.normalize(center - eye);
    var s = Vector3.normalize(Vector3.cross(f, up));
    var u = Vector3.cross(s, f);

    return new Matrix4x4(s.x, s.y, s.z, -dot(s,eye),
                         u.x, u.y, u.z, -dot(u,eye),
                         -f.x, -f.y -f.z -dot(f,eye),
                         0, 0, 0, 1);
  }

  perspectiveRHMatrix() {
    return Camera.perspectiveRHMatrix(this.fovy, this.aspect, this.zNear, this.zFar);
  }

  static perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

    var yscale = 1.0 / Math.tan(0.5*fovy*Math.PI/180);
    var xscale = yscale / aspect;

    return new Matrix4x4(
        xscale, 0.0, 0.0, 0.0,
        0.0, yscale, 0.0, 0.0,
        0.0, 0.0, - (zFar + zNear) / (zFar - zNear), - (2.0 * zFar * zNear) / (zFar - zNear),
        0.0, 0.0, - 1.0, 0.0
    );
  }
}

GLBoost["Camera"] = Camera;
