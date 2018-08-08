import M_Element from '../M_Element';

export default class M_AbstractCamera extends M_Element {
  constructor(glBoostContext, toRegister) {
    super(glBoostContext, toRegister);

    if (this.constructor === M_AbstractCamera) {
      throw new TypeError('Cannot construct M_AbstractCamera instances directly.');
    }

    this._lowLevelCamera = null;

    this._updateCountAsCameraView = 0;

    this._texture = null; // for example, depth texture
  }

  set cameraController(controller) {
    this._lowLevelCamera.cameraController = controller;
  }

  get cameraController() {
    return this._lowLevelCamera.cameraController;
  }

  _needUpdateView() {
    this._lowLevelCamera._needUpdateView();
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

  setAsMainCamera(scene) {
    this._lowLevelCamera.setAsMainCamera(scene);
  }

  isMainCamera(scene) {
    return this._lowLevelCamera.isMainCamera(scene);
  }

  set texture(texture) {
    this._texture = texture;
  }

  get texture() {
    return this._texture;
  }

  lookAtRHMatrix() {
    return this._lowLevelCamera.lookAtRHMatrix();
  }

  set translate(vec) {
    this._lowLevelCamera.translate = vec;
  }

  get translate() {
    return this._lowLevelCamera.translate;
  }

  get translateInner() {
    return this._lowLevelCamera.translateInner;
  }

  set eye(vec) {
    this._lowLevelCamera.eye = vec;
  }

  get eye() {
    return this._lowLevelCamera.eye;
  }

  get eyeInner() {
    return this._lowLevelCamera.eyeInner;
  }

  set center(vec) {
    this._lowLevelCamera.center = vec;
  }

  get center() {
    return this._lowLevelCamera.center;
  }

  get centerInner() {
    return this._lowLevelCamera.centerInner;
  }

  set up(vec) {
    this._lowLevelCamera.up = vec;
  }

  get up() {
    return this._lowLevelCamera.up;
  }

  get upInner() {
    return this._lowLevelCamera.upInner;
  }

  get allInfo() {
    return this._lowLevelCamera.allInfo;
  }

  set allInfo(info) {
    this._lowLevelCamera.allInfo = info;
  }

}

GLBoost['M_AbstractCamera'] = M_AbstractCamera;

