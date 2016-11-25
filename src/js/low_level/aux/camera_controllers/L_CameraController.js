import Vector3 from '../../math/Vector3';
import GLBoostObject from '../../core/GLBoostObject';
import Matrix33 from '../../math/Matrix33';

export default class L_CameraController extends GLBoostObject {
  constructor(glBoostContext, efficiency = 1.0) {
    super(glBoostContext);

    this._rot_x = 0;
    this._rot_y = 0;

    this._bgn_x = 0;
    this._bgn_y = 0;
    this._clickedMouseXOnCanvas = 0;
    this._clickedMouseYOnCanvas = 0;

    this._camaras = new Set();

    this._isKeyDown = false;

    this._efficiency = 0.5 * efficiency;

    this._onMouseDown = (evt)=>{
      var rect = evt.target.getBoundingClientRect();
      this._clickedMouseXOnCanvas = evt.clientX - rect.left;
      this._clickedMouseYOnCanvas = evt.clientY - rect.top;

      this._bgn_x = this._rot_x;
      this._bgn_y = this._rot_y;

      this._isKeyDown = true;
    };

    this._onMouseUp = (evt)=>{
      this._isKeyDown = false;
    };

    this._onMouseMove = (evt)=>{
      if (!this._isKeyDown) {
        return;
      }

      var rect = evt.target.getBoundingClientRect();
      var movedMouseXOnCanvas = evt.clientX - rect.left;
      var movedMouseYOnCanvas = evt.clientY - rect.top;

      // 回転角度を求める
      this._rot_y = this._bgn_y - (movedMouseYOnCanvas - this._clickedMouseYOnCanvas) * this._efficiency;
      this._rot_x = this._bgn_x - (movedMouseXOnCanvas - this._clickedMouseXOnCanvas) * this._efficiency;

      // 回転角度が範囲内かチェック
      if (90 < this._rot_y){
        this._rot_y = 90;
      }
      if (this._rot_y < -90){
        this._rot_y = -90;
      }

      this._camaras.forEach(function(camera) {
        camera._needUpdateView();
      });
    };

    this._glContext.canvas.addEventListener('mousedown', this._onMouseDown);
    this._glContext.canvas.addEventListener('mouseup', this._onMouseUp);
    this._glContext.canvas.addEventListener('mousemove', this._onMouseMove);
  }

  convert(eyeVec, centerVec, upVec) {
    let centerToEyeVec = Vector3.subtract(eyeVec, centerVec);
    let rotateM_Y = Matrix33.rotateY(this._rot_x);
    let rotateM_X = Matrix33.rotateX(this._rot_y);
    let rotateM = rotateM_Y.multiply(rotateM_X);

    let newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(centerVec);
    let newCenterVec = centerVec;
    let newUpVec = rotateM.multiplyVector(upVec);
    return [newEyeVec, newCenterVec, newUpVec];
  }

  addCamera(camera) {
    this._camaras.add(camera);
  }
}
