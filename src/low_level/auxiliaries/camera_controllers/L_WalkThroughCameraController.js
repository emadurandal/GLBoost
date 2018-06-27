import GLBoostObject from '../../core/GLBoostObject';
import Vector3 from '../../math/Vector3';
import Matrix33 from '../../math/Matrix33';

export default class L_WalkThroughCameraController extends GLBoostObject {
  constructor(glBoostContext, options = {
    eventTargetDom: document,
    forwardSpeed: 1,
    backSpeed: 1,
    virticalSpeed: 1,
    turnSpeed: 5
  })
  {
    super(glBoostContext);

    this._camaras = new Set();

    this._forwardSpeed = options.forwardSpeed;
    this._backSpeed = options.backSpeed;
    this._virticalSpeed = options.virticalSpeed;
    this._turnSpeed = options.turnSpeed;

    this._isKeyDown = false;
    this._lastKeyCode = null;
    this._currentPos = null;
    this._currentCenter = null;
    this._currentDir = null;

    this._onKeydown = (e)=> {
      this._isKeyDown = true;
      this._lastKeyCode = e.keyCode;
      this._camaras.forEach(function (camera) {
        camera._needUpdateView(false);
        camera._needUpdateProjection();
      });
    };

    this._onKeyup = (e)=> {
      this._isKeyDown = false;
      this._lastKeyCode = null;
    }

    const eventTargetDom = options.eventTargetDom;

    if (eventTargetDom) {
      eventTargetDom.addEventListener('keydown', this._onKeydown);
      eventTargetDom.addEventListener('keyup', this._onKeyup);
    }
  }

  tryReset() {

  }

  addCamera(camera) {
    this._camaras.add(camera);
  }

  convert(camera) {
    if (this._currentPos === null) {
      this._currentPos = camera.eye.clone();
    }
    if (this._currentCenter === null) {
      this._currentCenter = camera.center.clone();
    }
    if (this._currentDir === null) {
      this._currentDir = Vector3.subtract(camera.center, camera.eye).normalize();
    }

    let newEyeToCenter = null;
    switch(this._lastKeyCode) {
      case 87: // w key
        this._currentPos.add(Vector3.multiply(this._currentDir, this._forwardSpeed));
        this._currentCenter.add(Vector3.multiply(this._currentDir, this._forwardSpeed));
      break;
      case 65: // a key
        this._currentDir = Matrix33.rotateY(this._turnSpeed).multiplyVector(this._currentDir);
        newEyeToCenter = Matrix33.rotateY(this._turnSpeed).multiplyVector(Vector3.subtract(this._currentCenter, this._currentPos));
        this._currentCenter = Vector3.add(this._currentPos, newEyeToCenter);
      break;
      case 83: // s key
        this._currentPos.add(Vector3.multiply(this._currentDir, -this._backSpeed));
        this._currentCenter.add(Vector3.multiply(this._currentDir, -this._backSpeed));
      break;
      case 68: // d key
        this._currentDir = Matrix33.rotateY(-this._turnSpeed).multiplyVector(this._currentDir);
        newEyeToCenter = Matrix33.rotateY(-this._turnSpeed).multiplyVector(Vector3.subtract(this._currentCenter, this._currentPos));
        this._currentCenter = Vector3.add(this._currentPos, newEyeToCenter);
      break;
      case 82: // r key
        this._currentPos.add(new Vector3(0, this._virticalSpeed, 0));
        this._currentCenter.add(new Vector3(0, this._virticalSpeed, 0));
      break;
      case 70: // f key
        this._currentPos.add(new Vector3(0, -this._virticalSpeed, 0));
        this._currentCenter.add(new Vector3(0, -this._virticalSpeed, 0));
      break;
    }

    console.log(this._currentPos.toString(), this._currentCenter.toString());

    return [this._currentPos, this._currentCenter, camera.up.clone(), camera.zNear, camera.zFar];
  }

  getDirection() {
    return (this._currentCenter !== null) ? this._currentDir.clone() : null;
  }
}
