import Vector3 from '../../math/Vector3';
import L_Element from '../L_Element';
import Matrix44 from '../../math/Matrix44';
import MathClassUtil from '../../math/MathClassUtil';

export default class L_AbstractCamera extends L_Element {
  constructor(glBoostContext, toRegister, lookat) {
    super(glBoostContext, toRegister);

    if (this.constructor === L_AbstractCamera) {
      throw new TypeError('Cannot construct AbstractCamera instances directly.');
    }

    this._translate = lookat.eye;
    this._translateInner = super.translate.clone();
    this._center = lookat.center;
    this._up = lookat.up;
    this._upInner = lookat.up;
    this._centerInner = this._up.clone();


    this._cameraController = null;

    this._dirtyView = true;

    this._middleLevelCamera = null;
  }

  set cameraController(controller) {
    this._cameraController = controller;
    if (this._middleLevelCamera !== null) {
      controller.addCamera(this._middleLevelCamera);
    } else {
      controller.addCamera(this);
    }
  }

  get cameraController() {
    return this._cameraController;
  }

  _affectedByCameraController() {
    if (this._cameraController !== null) {
      let results = this._cameraController.convert(this);
      this._translateInner = results[0];
      this._centerInner = results[1];
      this._upInner = results[2];
      this._zNearInner = results[3];
      this._zFarInner = results[4];
      this._leftInner = results[5];
      this._rightInner = results[6];
      this._topInner = results[7];
      this._bottomInner = results[8];
    } else {
      this._translateInner = super.translate.clone();
      this._centerInner = this._center.clone();
      this._upInner = this._up.clone();
      this._zNearInner = this._zNear;
      this._zFarInner = this._zFar;
      this._leftInner = this._left;
      this._rightInner = this._right;
      this._topInner = this._top;
      this._bottomInner = this._bottom;
    }
  }

  get middleLevelCamera() {
    return this._middleLevelCamera;
  }

  _needUpdateView(withTryingResetOfCameraController = true) {
    if (this._cameraController !== null && withTryingResetOfCameraController) {
      this._cameraController.tryReset();
    }
    this._dirtyView = true;
  }

  lookAtRHMatrix() {
    if (this._dirtyView) {
      this._affectedByCameraController();
      this._viewMatrix = L_AbstractCamera.lookAtRHMatrix(this.translateInner, this.centerInner, this.upInner);
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
    L_AbstractCamera._mainCamera[scene.toString()] = this;
  }

  isMainCamera(scene) {
    return L_AbstractCamera._mainCamera[scene.toString()] === this;
  }

  set translate(vec) {
    super.translate = vec;
    this._needUpdateView();
  }

  get translate() {
    return this._translate;
  }

  get translateInner() {
    return this._translateInner;
  }

  set eye(vec) {
    super.translate = vec;
    this._needUpdateView();
  }

  get eye() {
    return this._translate;
  }

  get eyeInner() {
    return this._translateInner;
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

  get centerInner() {
    return this._centerInner;
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

  get upInner() {
    return this._upInner;
  }

  set texture(texture) {
    this._texture = texture;
  }

  get texture() {
    return this._texture;
  }

  get allInfo() {
    const info = {};

    info.translate = this.translate;
    //info.translateInner = this.translateInner;
    info.center = this.center;
    //info.centerInner = this.centerInner;
    info.up = this.up;
    //info.upInner = this.upInner;

    return info;
  }

  set allInfo(arg) {
    let json = arg;
    if (typeof arg === "string") {
      json = JSON.parse(arg);
    }
    for(let key in json) {
      if(json.hasOwnProperty(key) && key in this) {
        if (key === "quaternion") {
          this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToQuaternion(json[key]));
        } else {
          this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToVectorOrMatrix(json[key]));
        }
      }
    }
  }
}

L_AbstractCamera._mainCamera = {};
