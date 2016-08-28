import M_Element from '../M_Element';

export default class M_AbstractCamera extends M_Element {
  constructor(glBoostContext, toRegister) {
    super(glBoostContext, toRegister);

    if (this.constructor === M_AbstractCamera) {
      throw new TypeError('Cannot construct M_AbstractCamera instances directly.');
    }

    this._lowLevelCamera = null;

    this._updateCountAsCameraView = 0;
    this._mainCamera = {};

    this._texture = null; // for example, depth texture
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
    this._mainCamera[scene.toString()] = this;
  }

  isMainCamera(scene) {
    return this._mainCamera[scene.toString()] === this;
  }

  set texture(texture) {
    this._texture = texture;
  }

  get texture() {
    return this._texture;
  }

// ===================== delegate to low level class ========================

  lookAtRHMatrix() {
    return this._lowLevelCamera.lookAtRHMatrix();
  }

  set translate(vec) {
    this._lowLevelCamera.translate = vec;
  }

  get translate() {
    return this._lowLevelCamera.translate;
  }

  set eye(vec) {
    this._lowLevelCamera.eye = vec;
  }

  get eye() {
    return this._lowLevelCamera.eye;
  }

  set center(vec) {
    this._lowLevelCamera.center = vec;
  }

  get center() {
    return this._lowLevelCamera.center;
  }

  set up(vec) {
    this._lowLevelCamera.up = vec;
  }

  get up() {
    return this._lowLevelCamera.up;
  }
}
