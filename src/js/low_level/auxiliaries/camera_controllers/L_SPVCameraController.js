import Vector3 from '../../math/Vector3';
import Vector4 from '../../math/Vector4';
import GLBoostObject from '../../core/GLBoostObject';
import Matrix33 from '../../math/Matrix33';
import M_AbstractCamera from  '../../../middle_level/elements/cameras/M_AbstractCamera';
import MathUtil from '../../math/MathUtil';
import InputUtil from '../../misc/InputUtil';
import AABB from '../../math/AABB';


export default class L_SPVCameraController extends GLBoostObject {
  constructor(glBoostContext, isSymmetryMode = true, doResetWhenCameraSettingChanged = false, isForceGrab = false, efficiency = 1.0, eventTargetDom = document) {
    super(glBoostContext);

    this._camaras = new Set();

    this._isKeyUp = true;
    this._isForceGrab = isForceGrab;
    this._isSymmetryMode = isSymmetryMode;

    this._efficiency = 0.5 * efficiency;

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

    this._doResetWhenCameraSettingChanged = doResetWhenCameraSettingChanged;

    this._shiftCameraTo = null;

    // Enable Flags
    this._enableRotation = true;
    this._enableTranslate = true;

    this._userMouseEventHandler = null;

    this._targetSkeletalMesh = null;

    this._isTargetingToRootJointIfSkeletalTarget = false;

    this._updateXYOnCanvas = (evt)=> {
      let rect = evt.target.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if (evt.changedTouches) {
        clientX = evt.changedTouches[0].clientX;
        clientY = evt.changedTouches[0].clientY;
      } else {
        clientX = evt.clientX;
        clientY = evt.clientY;
      }
      return [clientX - rect.left, clientY - rect.top];
    };

    this._onMouseDown = (evt) => {
      [this._clickedMouseXOnCanvas, this._clickedMouseYOnCanvas] = this._updateXYOnCanvas(evt);
      this._movedMouseYOnCanvas = -1;
      this._movedMouseXOnCanvas = -1;
      this._rot_bgn_x = this._rot_x;
      this._rot_bgn_y = this._rot_y;

      this._isKeyUp = false;

      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });

      return false;
    };

    this._onMouseUp = (evt) => {
      this._isKeyUp = true;
//      this._movedMouseYOnCanvas = -1;
//      this._movedMouseXOnCanvas = -1;
      this._clickedMouseYOnCanvas = this._movedMouseYOnCanvas;
      this._clickedMouseXOnCanvas = this._movedMouseXOnCanvas;
//      this._button_c_once = false;
    };

    this._onMouseMove = (evt) => {
      if (this._isKeyUp) {
        return;
      }

      [this._movedMouseXOnCanvas, this._movedMouseYOnCanvas] = this._updateXYOnCanvas(evt);

      let button_l = false;
      let button_c = false;
      if (evt.changedTouches) {
        button_l = (evt.changedTouches.length > 1) ? false:true;
        button_c = (evt.changedTouches.length > 1) ? true:false;
        if (button_c) {
//          this._button_c_once = true;
        }
      } else {
        button_l = (InputUtil.whichButton(evt) === 'left');
        button_c = (InputUtil.whichButton(evt) === 'middle') || (InputUtil.whichButton(evt) === 'right') || (evt.altKey && !evt.ctrlKey);
      }
      if (this._enableTranslate) {
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
      }

      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });

      if (!button_l || !this._enableRotation) {
        return;
      }

      // calc rotation angle
      let delta_y = (this._movedMouseYOnCanvas - this._clickedMouseYOnCanvas) * this._efficiency;
      let delta_x = (this._movedMouseXOnCanvas - this._clickedMouseXOnCanvas) * this._efficiency;
      this._rot_y = this._rot_bgn_y - delta_y;
      this._rot_x = this._rot_bgn_x - delta_x;

      // check if rotation angle is within range
      if (this._verticalAngleThrethold - this._verticalAngleOfVectors < this._rot_y) {
        this._rot_y = this._verticalAngleThrethold + this._verticalAngleOfVectors;
      }

      if (this._rot_y < -this._verticalAngleThrethold + this._verticalAngleOfVectors) {
        this._rot_y = -this._verticalAngleThrethold - this._verticalAngleOfVectors;
      }

      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });

      if (this._userMouseEventHandler) {
        this._userMouseEventHandler();
      }
    };

    this.__innerMouseWheelY = this._wheel_y;
    this._onMouseWheel = (evt) => {
      evt.preventDefault();
      let addingValue = evt.deltaY / 600;

      if (this.dolly < 1.0) {
        addingValue *= this.dolly
      }

      this.dolly += addingValue;

      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });

      if (this._userMouseEventHandler) {
        this._userMouseEventHandler();
      }
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
      this._updateCameras();
    };

    if (this._glContext.canvas) {
      const supportTouch = 'ontouchend' in document;
      const event_pointstart = supportTouch ? 'touchstart' : 'mousedown';
      const event_pointmove = supportTouch ? 'touchmove' : 'mousemove';
      const event_pointend = supportTouch ? 'touchend' : 'mouseup';

      eventTargetDom.addEventListener(event_pointstart, this._onMouseDown);
      eventTargetDom.addEventListener(event_pointend, this._onMouseUp);
      eventTargetDom.addEventListener(event_pointmove, this._onMouseMove);
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
      this._eyeVec = (this._shiftCameraTo !== null) ? Vector3.add(camera.eye, this._shiftCameraTo) : camera.eye;
      this._centerVec = (this._shiftCameraTo !== null) ? Vector3.add(camera.center, this._shiftCameraTo) : camera.center;
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
      this._verticalAngleOfVectors *= verticalSign;

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


    let newLeft = camera.left;
    let newRight = camera.right;
    let newTop = camera.top;
    let newBottom = camera.bottom;
    let ratio = 1;
    if (typeof newLeft !== 'undefined') {
      if (typeof this._lengthCenterToCorner !== 'undefined') {
        ratio = camera.zNear / this._lengthCameraToObject;
        if (ratio < 1.0) {
          ratio = 1;
        }
      }
      let scale = this._wheel_y / ratio;
      newLeft *= scale;
      newRight *= scale;
      newTop *= scale;
      newBottom *= scale;
    }
    let newZNear = camera.zNear * this._wheel_y / ratio;

    let newZFar = newZNear + Vector3.subtract(newCenterVec, newEyeVec).length();
    if (this._target) {
      newZFar += this._getTargetAABBInWorld().lengthCenterToCorner * this._zFarAdjustingFactorBasedOnAABB;
    }
    //newZFar *= this._wheel_y;

    this._foyvBias = Math.tan(MathUtil.degreeToRadian(fovy/2.0));

    return [newEyeVec, newCenterVec, newUpVec, newZNear, newZFar, newLeft, newRight, newTop, newBottom];
  }

  _getTargetAABBInWorld() {
    let targetAABB = null;
    if (typeof this._target.updateAABB !== 'undefined') {
      targetAABB = this._target.updateAABB();
    } else {
      targetAABB = this._target.AABB;
    }

    let targetAABBInWorld = AABB.multiplyMatrix(this._target.worldMatrix, targetAABB);

    return targetAABB;
  }

  _updateTargeting(camera, eyeVec, centerVec, upVec, fovy, doIgnoireArgFovy = false) {
    if (this._target === null) {
      return [eyeVec, centerVec, upVec];
    }

    let targetAABB = this._getTargetAABBInWorld();

    this._lengthCenterToCorner = targetAABB.lengthCenterToCorner;

    let _fogy = fovy;
    if (doIgnoireArgFovy) {
      _fogy = this._lastFovy;
    }
    this._lengthCameraToObject = targetAABB.lengthCenterToCorner / Math.sin((_fogy*Math.PI/180)/2) * this._scaleOfLengthCameraToCenter;

    let newCenterVec = targetAABB.centerPoint;
    let posAtZero = targetAABB.centerPoint;

    if (this._targetSkeletalMesh && this._isTargetingToRootJointIfSkeletalTarget ) {
      //let posAtZero = this._targetSkeletalMesh.getRootJointsWorldPositionAt(0);
      let posAtNow =  this._targetSkeletalMesh.rootJointsWorldPosition;
      let deltaPosFromZero = Vector3.subtract(posAtNow, posAtZero);
      newCenterVec = posAtZero;
      deltaPosFromZero.y /= 4;
      newCenterVec.add(deltaPosFromZero);
    }

    let centerToCameraVec = Vector3.subtract(eyeVec, centerVec);
    let centerToCameraVecNormalized = Vector3.normalize(centerToCameraVec);

    let newEyeVec = Vector3.multiply(centerToCameraVecNormalized, this._lengthCameraToObject).add(newCenterVec);

    let newUpVec = null;
    if (camera instanceof M_AbstractCamera) {
      let mat = camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf;
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
        this._wheel_y = 1;
        this._mouseTranslateVec = new Vector3(0, 0, 0);

        this._updateCameras();
      }
    }
  }

  _updateCameras() {
    this._camaras.forEach(function (camera) {
      camera._needUpdateView(false);
      camera._needUpdateProjection();
    });
  }

  reset() {
    this._rot_y = 0;
    this._rot_x = 0;
    this._rot_bgn_y = 0;
    this._rot_bgn_x = 0;
    this._wheel_y = 1;
    this._mouseTranslateVec = new Vector3(0, 0, 0);

    this._updateCameras();
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

  resetTrack() {
    this._mouseTranslateVec = new Vector3(0, 0, 0);

    this._updateCameras();

  }

  set enableRotation(flg) {
    this._enableRotation = flg;
  }

  get enableRotation() {
    return this._enableRotation;
  }

  set enableTranslate(flg) {
    this._enableTranslate = flg;
  }

  get enableTranslate() {
    return this._enableTranslate;
  }

  updateTargeting(doIgnoireFovy = false) {
    this._camaras.forEach((camera)=>{
      let vectors = this._updateTargeting(camera, camera.eye, camera.center, camera.up, this._getFovyFromCamera(camera), doIgnoireFovy);
      camera.eye = vectors[0];
      camera.center = vectors[1];
      camera.up = vectors[2];
    });
  }

  addCamera(camera) {
    this._camaras.add(camera);
    this._lastFovy = this._getFovyFromCamera(camera);
  }

  set target(object) {
    this._target = object;

    let meshes = this._target.searchElementsByType(GLBoost.M_SkeletalMesh);
    if (meshes.length > 0) {
      this._targetSkeletalMesh = meshes[0];
    }


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

  get lengthOfCenterToEye() {
    return this._lengthOfCenterToEye;
  }

  get foyvBias() {
    return this._foyvBias;
  }

  set userMouseEventHandler(handler) {
    this._userMouseEventHandler = handler;
  }

  get userMouseEventHandler() {
    return this._userMouseEventHandler;
  }

  set targetRootJointMode(flag) {
    this._isTargetingToRootJointIfSkeletalTarget = flag;
  }

  get targetRootJointMode() {
    return this._isTargetingToRootJointIfSkeletalTarget;
  }

}
