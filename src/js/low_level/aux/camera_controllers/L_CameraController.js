import Vector3 from '../../math/Vector3';
import GLBoostObject from '../../core/GLBoostObject';
import Matrix33 from '../../math/Matrix33';

export default class L_CameraController extends GLBoostObject {
  constructor(glBoostContext, isSymmetryMode = true, doResetWhenCameraSettingChanged = false, isForceGrab = false, efficiency = 1.0)  {
    super(glBoostContext);

    this._camaras = new Set();

    this._isKeyUp = true;
    this._isForceGrab = isForceGrab;
    this._isSymmetryMode = isSymmetryMode;

    this._efficiency = 0.5 * efficiency;

    this._bgn_x = 0;
    this._bgn_y = 0;
    this._rot_x = 0;
    this._rot_y = 0;
    this._clickedMouseYOnCanvas = 0;
    this._clickedMouseXOnCanvas = 0;

    this._verticalAngleOfVectors = 0;

    this._verticalAngleThrethold = 90;

    this._doResetWhenCameraSettingChanged = doResetWhenCameraSettingChanged;

    this._onMouseDown = (evt)=>{
      var rect = evt.target.getBoundingClientRect();
      this._clickedMouseXOnCanvas = evt.clientX - rect.left;
      this._clickedMouseYOnCanvas = evt.clientY - rect.top;
      this._movedMouseYOnCanvas = -1;
      this._movedMouseXOnCanvas = -1;
      this._bgn_x = this._rot_x;
      this._bgn_y = this._rot_y;

      this._isKeyUp = false;
    };

    this._onMouseUp = (evt)=>{
      this._isKeyUp = true;
      this._movedMouseYOnCanvas = -1;
      this._movedMouseXOnCanvas = -1;
    };

    this._onMouseMove = (evt)=>{
      if (this._isKeyUp) {
        return;
      }
      this._isMouseMoving = true;

      var rect = evt.target.getBoundingClientRect();
      this._movedMouseXOnCanvas = evt.clientX - rect.left;
      this._movedMouseYOnCanvas = evt.clientY - rect.top;

      // calc rotation angle
      let delta_y = (this._movedMouseYOnCanvas - this._clickedMouseYOnCanvas) * this._efficiency;
      let delta_x = (this._movedMouseXOnCanvas - this._clickedMouseXOnCanvas) * this._efficiency;
      this._rot_y = this._bgn_y - delta_y;
      this._rot_x = this._bgn_x - delta_x;

      // check if rotation angle is within range
      if (this._verticalAngleThrethold - this._verticalAngleOfVectors < this._rot_y) {
        this._rot_y = this._verticalAngleThrethold + this._verticalAngleOfVectors;
      }

      if (this._rot_y < -this._verticalAngleThrethold + this._verticalAngleOfVectors){
        this._rot_y = - this._verticalAngleThrethold - this._verticalAngleOfVectors;
      }

      this._camaras.forEach(function(camera) {
        camera._needUpdateView(false);
      });

      this._isMouseMoving = false;
    };

    this._glContext.canvas.addEventListener('mousedown', this._onMouseDown);
    this._glContext.canvas.addEventListener('mouseup', this._onMouseUp);
    this._glContext.canvas.addEventListener('mousemove', this._onMouseMove);
  }

  convert(eyeVec, centerVec, upVec) {
    let newEyeVec = null;
    let newCenterVec = null;
    let newUpVec = null;
    if (this._isKeyUp || !this._isForceGrab) {
      this._eyeVec = eyeVec;
      this._centerVec = centerVec;
      this._upVec = upVec;
    }
    if (this._isSymmetryMode) {
      let centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec);
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
      let rotateM = rotateM_Revert.multiply(rotateM_Y.multiply(rotateM_X.multiply(rotateM_Reset)));

      newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(this._centerVec);
      newCenterVec = this._centerVec ;
      newUpVec = rotateM.multiplyVector(this._upVec);

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
      let centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec);
      let rotateM_X = Matrix33.rotateX(this._rot_y);
      let rotateM_Y = Matrix33.rotateY(this._rot_x);
      let rotateM = rotateM_Y.multiply(rotateM_X);

      newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(centerVec);
      newCenterVec = centerVec;
      newUpVec = rotateM.multiplyVector(this._upVec);
    }
    return [newEyeVec, newCenterVec, newUpVec];
  }

  tryReset() {
    if (this._doResetWhenCameraSettingChanged) {
      if (this._isKeyUp) {
        this._rot_y = 0;
        this._rot_x = 0;
        this._bgn_y = 0;
        this._bgn_x = 0;
      }
    }

  }

  addCamera(camera) {
    this._camaras.add(camera);
  }
}
