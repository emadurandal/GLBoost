import Vector3 from '../../math/Vector3';
import Vector4 from '../../math/Vector4';
import GLBoostObject from '../../core/GLBoostObject';
import Matrix33 from '../../math/Matrix33';
import M_AbstractCamera from  '../../../middle_level/elements/cameras/M_AbstractCamera';
import MathUtil from '../../math/MathUtil';

export default class L_CameraController extends GLBoostObject {
  constructor(glBoostContext, 
    options = {
      isSymmetryMode: true,
      doResetWhenCameraSettingChanged: false,
      isForceGrab: false,
      efficiency: 1.0,
      eventTargetDom: document
    }
  ) {
    super(glBoostContext);

    this._camaras = new Set();

    this._isKeyUp = true;
    this._isForceGrab = options.isForceGrab !== void 0 ? options.isForceGrab : false;
    this._isSymmetryMode = options.isSymmetryMode !== void 0 ? options.isSymmetryMode : true;

    this._efficiency = options.efficiency !== void 0 ? 0.5 * options.efficiency : 1;
    let eventTargetDom = options.eventTargetDom;

    this._rot_bgn_x = 0;
    this._rot_bgn_y = 0;
    this._rot_x = 0;
    this._rot_y = 0;
    this._clickedMouseYOnCanvas = 0;
    this._clickedMouseXOnCanvas = 0;

    this._verticalAngleOfVectors = 0;

    this._verticalAngleThrethold = 90;

    this._wheel_y = 1;
    this._mouse_translate_y = 0;
    this._mouse_translate_x = 0;

    this._mouseTranslateVec = new Vector3(0, 0, 0);

    this._newUpVec = new Vector3(0, 0, 0);

    this._target = null;

    this._lengthCenterToCorner = 10;
    this._lengthOfCenterToEye = 10;
    this._scaleOfTraslation = 5.0;
    this._scaleOfLengthCameraToCenter = 0.5;
    this._foyvBias = 1.0;
    this._zFarAdjustingFactorBasedOnAABB = 1.0;

    this._doResetWhenCameraSettingChanged = options.doResetWhenCameraSettingChanged !== void 0 ? options.doResetWhenCameraSettingChanged : false;

    this._shiftCameraTo = null;

    this._onMouseDown = (evt) => {
      let rect = evt.target.getBoundingClientRect();
      this._clickedMouseXOnCanvas = evt.clientX - rect.left;
      this._clickedMouseYOnCanvas = evt.clientY - rect.top;
      this._movedMouseYOnCanvas = -1;
      this._movedMouseXOnCanvas = -1;
      this._rot_bgn_x = this._rot_x;
      this._rot_bgn_y = this._rot_y;

      this._isKeyUp = false;

      if (typeof evt.buttons !== 'undefined') {
        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
          camera._needUpdateProjection();
        });
      }
      return false;
    };

    this._onMouseUp = (evt) => {
      this._isKeyUp = true;
      this._movedMouseYOnCanvas = -1;
      this._movedMouseXOnCanvas = -1;
    };

    this._onMouseMove = (evt) => {
      if (this._isKeyUp) {
        return;
      }

      let rect = evt.target.getBoundingClientRect();
      this._movedMouseXOnCanvas = evt.clientX - rect.left;
      this._movedMouseYOnCanvas = evt.clientY - rect.top;

      if (typeof evt.buttons !== 'undefined') {
        let data = evt.buttons;
        let button_l = ((data & 0x0001) ? true : false);
        let button_c = ((data & 0x0004) ? true : false);
        if (button_c) {
          this._mouse_translate_y = (this._movedMouseYOnCanvas - this._clickedMouseYOnCanvas) / 1000 * this._efficiency;
          this._mouse_translate_x = (this._movedMouseXOnCanvas - this._clickedMouseXOnCanvas) / 1000 * this._efficiency;

          let scale = this._lengthOfCenterToEye * this._foyvBias * this._scaleOfTraslation;
          if (evt.shiftKey) {
            this._mouseTranslateVec = Vector3.add(this._mouseTranslateVec, Vector3.normalize(this._newEyeToCenterVec).multiply(-this._mouse_translate_y).multiply(scale));
          } else {
            this._mouseTranslateVec = Vector3.add(this._mouseTranslateVec, Vector3.normalize(this._newUpVec).multiply(this._mouse_translate_y).multiply(scale));
          }
          this._mouseTranslateVec = Vector3.add(this._mouseTranslateVec, Vector3.normalize(this._newTangentVec).multiply(this._mouse_translate_x).multiply(scale));

          this._clickedMouseYOnCanvas = this._movedMouseYOnCanvas;
          this._clickedMouseXOnCanvas = this._movedMouseXOnCanvas;
        }

        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
          camera._needUpdateProjection();
        });

        if (!button_l) {
          return;
        }
      }


      // calc rotation angle
      let delta_y = (this._movedMouseYOnCanvas - this._clickedMouseYOnCanvas) * this._efficiency;
      let delta_x = (this._movedMouseXOnCanvas - this._clickedMouseXOnCanvas) * this._efficiency;
      this._rot_y = this._rot_bgn_y - delta_y;
      this._rot_x = this._rot_bgn_x - delta_x;

      // check if rotation angle is within range
      if (this._verticalAngleThrethold - this._verticalAngleOfVectors < this._rot_y) {
//        this._rot_y -= this._rot_y - (this._verticalAngleThrethold - this._verticalAngleOfVectors);
      }

      if (this._rot_y < -this._verticalAngleThrethold + this._verticalAngleOfVectors) {
 //       this._rot_y += this._rot_y - (this._verticalAngleThrethold - this._verticalAngleOfVectors);
      }

      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });

    };

    this._onMouseWheel = (evt) => {
      evt.preventDefault();

      this.dolly += evt.deltaY / 600;
    };

    this._onContexMenu = (evt) => {
      if (evt.preventDefault) {
        evt.preventDefault();
      } else {
        event.returnValue = false;
      }
    };

    this._onMouseDblClick = (evt) => {
      if (evt.shiftKey) {
        this._mouseTranslateVec = new Vector3(0, 0, 0);
      } else {
        this._rot_y = 0;
        this._rot_x = 0;
        this._rot_bgn_y = 0;
        this._rot_bgn_x = 0;
      }
      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });
    };

    if (eventTargetDom) {
      eventTargetDom.addEventListener('mousedown', this._onMouseDown);
      eventTargetDom.addEventListener('mouseup', this._onMouseUp);
      eventTargetDom.addEventListener('mousemove', this._onMouseMove);
      if (window.WheelEvent) {
        eventTargetDom.addEventListener("wheel", this._onMouseWheel);
      }
      eventTargetDom.addEventListener('contextmenu', this._onContexMenu, false);
      eventTargetDom.addEventListener("dblclick", this._onMouseDblClick);
    }
  }

  _getFovyFromCamera(camera) {
    if (camera.fovy) {
      return camera.fovy;
    } else {
      return MathUtil.radianToDegree(2 * Math.atan(Math.abs(camera.top - camera.bottom) / (2 * camera.zNear)));
    }
  }

  convert(camera) {
    let newEyeVec = null;
    let newCenterVec = null;
    let newUpVec = null;

    if (this._isKeyUp || !this._isForceGrab) {
      this._eyeVec = (this._shiftCameraTo !== null) ? Vector3.add(Vector3.subtract(this._shiftCameraTo, camera.center), camera.eye) : camera.eye;
      this._centerVec = (this._shiftCameraTo !== null) ? this._shiftCameraTo : camera.center;
      this._upVec = camera.up;
    }

    let fovy = this._getFovyFromCamera(camera);

    if (this._isSymmetryMode) {
      let centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec).multiply(this._wheel_y * 1.0/Math.tan(MathUtil.degreeToRadian(fovy/2.0)));
      this._lengthOfCenterToEye = centerToEyeVec.length();
      let horizontalAngleOfVectors = Vector3.angleOfVectors(new Vector3(centerToEyeVec.x, 0, centerToEyeVec.z), new Vector3(0, 0, 1));
      let horizontalSign = Vector3.cross(new Vector3(centerToEyeVec.x, 0, centerToEyeVec.z), new Vector3(0, 0, 1)).y;
      if (horizontalSign >= 0) {
        horizontalSign = 1;
      } else {
        horizontalSign = -1;
      }
      horizontalAngleOfVectors *= horizontalSign;
      let rotateM_Reset = Matrix33.rotateY(horizontalAngleOfVectors);
      let rotateM_X = Matrix33.rotateX(this._rot_y);
      let rotateM_Y = Matrix33.rotateY(this._rot_x);
      let rotateM_Revert = Matrix33.rotateY(-horizontalAngleOfVectors);
      let rotateM = Matrix33.multiply(rotateM_Revert, Matrix33.multiply(rotateM_Y, Matrix33.multiply(rotateM_X, rotateM_Reset)));

      newUpVec = rotateM.multiplyVector(this._upVec);
      this._newUpVec = newUpVec;
      newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(this._centerVec);
      newCenterVec = this._centerVec.clone();
      this._newEyeToCenterVec = Vector3.subtract(newCenterVec, newEyeVec);
      this._newTangentVec = Vector3.cross(this._newUpVec, this._newEyeToCenterVec);

      newEyeVec.add(this._mouseTranslateVec);
      newCenterVec.add(this._mouseTranslateVec);

      let horizonResetVec = rotateM_Reset.multiplyVector(centerToEyeVec);
      this._verticalAngleOfVectors = Vector3.angleOfVectors(horizonResetVec, new Vector3(0, 0, 1));
      let verticalSign = Vector3.cross(horizonResetVec, new Vector3(0, 0, 1)).x;
      if (verticalSign >= 0) {
        verticalSign = 1;
      } else {
        verticalSign = -1;
      }
      //this._verticalAngleOfVectors *= verticalSign;

    } else {
      let centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec).multiply(this._wheel_y * 1.0/Math.tan(MathUtil.degreeToRadian(fovy/2.0)));
      let rotateM_X = Matrix33.rotateX(this._rot_y);
      let rotateM_Y = Matrix33.rotateY(this._rot_x);
      let rotateM = rotateM_Y.multiply(rotateM_X);

      newUpVec = rotateM.multiplyVector(this._upVec);
      this._newUpVec = newUpVec;
      newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(this._centerVec);
      newCenterVec = this._centerVec.clone();
      this._newEyeToCenterVec = Vector3.subtract(newCenterVec, newEyeVec);
      this._newTangentVec = Vector3.cross(this._newUpVec, this._newEyeToCenterVec);

      newEyeVec.add(this._mouseTranslateVec);
      newCenterVec.add(this._mouseTranslateVec);
    }

    let newZNear = camera.zNear;
    let newZFar = camera.zFar;
    if (this._target) {
      newZFar = camera.zNear + Vector3.subtract(newCenterVec, newEyeVec).length();
      newZFar += this._getTargetAABB().lengthCenterToCorner * this._zFarAdjustingFactorBasedOnAABB;
    }

    this._foyvBias = Math.tan(MathUtil.degreeToRadian(fovy/2.0));

    return [newEyeVec, newCenterVec, newUpVec, newZNear, newZFar];
  }

  _getTargetAABB() {
    let targetAABB = null;
    if (typeof this._target.updateAABB !== 'undefined') {
      targetAABB = this._target.updateAABB();
    } else {
      targetAABB = this._target.AABB;
    }
    return targetAABB;
  }

  _updateTargeting(camera, eyeVec, centerVec, upVec, fovy) {
    if (this._target === null) {
      return [eyeVec, centerVec, upVec];
    }

    let targetAABB = this._getTargetAABB();

    this._lengthCenterToCorner = targetAABB.lengthCenterToCorner;
    let lengthCameraToObject = targetAABB.lengthCenterToCorner / Math.sin((fovy*Math.PI/180)/2) * this._scaleOfLengthCameraToCenter;

    let newCenterVec = targetAABB.centerPoint;

    let centerToCameraVec = Vector3.subtract(eyeVec, centerVec);
    let centerToCameraVecNormalized = Vector3.normalize(centerToCameraVec);

    let newEyeVec = Vector3.multiply(centerToCameraVecNormalized, lengthCameraToObject).add(newCenterVec);

    let newUpVec = null;
    if (camera instanceof M_AbstractCamera) {
      let mat = camera.inverseWorldMatrixWithoutMySelf;
      newEyeVec = mat.multiplyVector(new Vector4(newEyeVec.x, newEyeVec.y, newEyeVec.z, 1)).toVector3();
      newCenterVec = mat.multiplyVector(new Vector4(newCenterVec.x, newCenterVec.y, newCenterVec.z, 1)).toVector3();
      newUpVec = mat.multiplyVector(new Vector4(upVec.x, upVec.y, upVec.z, 1)).toVector3();
    } else {
      newUpVec = upVec;
    }

    return [newEyeVec, newCenterVec, newUpVec];
  }

  tryReset() {
    if (this._doResetWhenCameraSettingChanged) {
      if (this._isKeyUp) {
        this._rot_y = 0;
        this._rot_x = 0;
        this._rot_bgn_y = 0;
        this._rot_bgn_x = 0;
      }
    }
  }

  reset() {
    this._rot_y = 0;
    this._rot_x = 0;
    this._rot_bgn_y = 0;
    this._rot_bgn_x = 0;
    this._wheel_y = 1;
    this._mouseTranslateVec = new Vector3(0, 0, 0);

    this._camaras.forEach(function (camera) {
      camera._needUpdateView(false);
    });
  }

  updateTargeting() {
    this._camaras.forEach((camera)=>{
      let vectors = this._updateTargeting(camera, camera.eye, camera.center, camera.up, this._getFovyFromCamera(camera));
      camera.eye = vectors[0];
      camera.center = vectors[1];
      camera.up = vectors[2];
    });
  }

  addCamera(camera) {
    this._camaras.add(camera);
  }

  set target(object) {
    this._target = object;
    this.updateTargeting();
  }

  set zFarAdjustingFactorBasedOnAABB(value) {
    this._zFarAdjustingFactorBasedOnAABB = value;
  }

  get zFarAdjustingFactorBasedOnAABB() {
    return this._zFarAdjustingFactorBasedOnAABB;
  }

  set shiftCameraTo(value) {
    this._shiftCameraTo = value;
  }

  get shiftCameraTo() {
    return this._shiftCameraTo;
  }

  resetDolly() {
    this.dolly = 1;

    this._updateCameras();
  }

  set dolly(value) {
    this._wheel_y = value;
    this._wheel_y = Math.min(this._wheel_y, 3);
    this._wheel_y = Math.max(this._wheel_y, 0.01);

    this._camaras.forEach(function (camera) {
      camera._needUpdateView(false);
      camera._needUpdateProjection();
    });
  }

  get dolly() {
    return this._wheel_y;
  }

  get rotX() {
    return this._rot_x;
  }

  set rotX(value) {
    this._rot_x = value;
    this._rot_bgn_x = 0;
    this._camaras.forEach(function (camera) {
      camera._needUpdateView(true);
      camera._needUpdateProjection();
    });
  }

  get rotY() {
    return this._rot_y;
  }

  set rotY(value) {
    this._rot_y = value;
    this._rot_bgn_y = 0;
    this._camaras.forEach(function (camera) {
      camera._needUpdateView(true);
      camera._needUpdateProjection();
    });
  }

}
