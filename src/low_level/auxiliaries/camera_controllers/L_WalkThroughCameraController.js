import GLBoostObject from '../../core/GLBoostObject';
import Vector3 from '../../math/Vector3';
import Matrix33 from '../../math/Matrix33';
import GLBoost from '../../../globals';

export default class L_WalkThroughCameraController extends GLBoostObject {
  constructor(glBoostContext, options = {
    eventTargetDom: document,
    horizontalSpeed: 1,
    turnSpeed: 5
  })
  {
    super(glBoostContext);

    this._camaras = new Set();

    this._horizontalSpeed = options.horizontalSpeed;
    this._virticalSpeed = options.virticalSpeed;
    this._turnSpeed = options.turnSpeed;

    this._isKeyDown = false;
    this._lastKeyCode = null;
    this._currentPos = null;
    this._currentCenter = null;
    this._currentDir = null;

    this._onKeydown = (e)=> {
      e.preventDefault();
      this._isKeyDown = true;
      this._lastKeyCode = e.keyCode;
      this.updateCamera();
    };

    this._onKeyup = (e)=> {
      e.preventDefault();
      this._isKeyDown = false;
      this._lastKeyCode = null;
    }

    const eventTargetDom = options.eventTargetDom;

    this.registerEventListeners(eventTargetDom);
  }

  updateCamera() {
    this._camaras.forEach(function (camera) {
      camera._needUpdateView(false);
      camera._needUpdateProjection();
    });
  }

  registerEventListeners(eventTargetDom = document) {
    if (eventTargetDom) {
      eventTargetDom.addEventListener('keydown', this._onKeydown);
      eventTargetDom.addEventListener('keyup', this._onKeyup);
    }
  }

  unregisterEventListeners(eventTargetDom = document) {
    if (eventTargetDom) {
      eventTargetDom.removeEventListener('keydown', this._onKeydown);
      eventTargetDom.removeEventListener('keyup', this._onKeyup);
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
      case 38: // arrow upper key
        this._currentPos.add(Vector3.multiply(this._currentDir, this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(this._currentDir, this._horizontalSpeed));
      break;
      case 65: // a key
      case 37: // arrow left key
        this._currentDir = Matrix33.rotateY(this._turnSpeed).multiplyVector(this._currentDir);
        newEyeToCenter = Matrix33.rotateY(this._turnSpeed).multiplyVector(Vector3.subtract(this._currentCenter, this._currentPos));
        this._currentCenter = Vector3.add(this._currentPos, newEyeToCenter);
      break;
      case 83: // s key
      case 40: // arrow down key
        this._currentPos.add(Vector3.multiply(this._currentDir, -this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(this._currentDir, -this._horizontalSpeed));
      break;
      case 68: // d key
      case 39: // arrow right key
        this._currentDir = Matrix33.rotateY(-this._turnSpeed).multiplyVector(this._currentDir);
        newEyeToCenter = Matrix33.rotateY(-this._turnSpeed).multiplyVector(Vector3.subtract(this._currentCenter, this._currentPos));
        this._currentCenter = Vector3.add(this._currentPos, newEyeToCenter);
      break;
      case 81: // q key
      {
        const leftDir = Matrix33.rotateY(90).multiplyVector(this._currentDir);
        this._currentPos.add(Vector3.multiply(leftDir, this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(leftDir, this._horizontalSpeed));
      }
      break;
      case 69: // e key
      {
        const rightDir = Matrix33.rotateY(-90).multiplyVector(this._currentDir);
        this._currentPos.add(Vector3.multiply(rightDir, this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(rightDir, this._horizontalSpeed));
      }
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

//    console.log(this._currentPos.toString(), this._currentCenter.toString());

    return [this._currentPos, this._currentCenter, camera.up.clone(), camera.zNear, camera.zFar];
  }

  getDirection() {
    return (this._currentCenter !== null) ? this._currentDir.clone() : null;
  }
}

GLBoost['L_WalkThroughCameraController'] = L_WalkThroughCameraController;
