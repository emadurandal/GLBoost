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
    this._isMouseDown = false;
    this._isMouseDrag = false;
    this._draggedMouseXOnCanvas = null;
    this._draggedMouseYOnCanvas = null;
    this._deltaMouseXOnCanvas = null;
    this._deltaMouseYOnCanvas = null;
    this._mouseXAdjustScale = 0.1;
    this._mouseYAdjustScale = 0.1;
    this._deltaY = 0;
    this._newDir = Vector3.zero();

    this._onKeydown = (e)=> {
      this._isKeyDown = true;
      this._lastKeyCode = e.keyCode;

      this.updateCamera();
    };

    this._onKeyup = (e)=> {
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
      eventTargetDom.addEventListener('mousedown', this._mouseDown.bind(this));
      eventTargetDom.addEventListener('mousemove', this._mouseMove.bind(this));
      eventTargetDom.addEventListener('mouseup', this._mouseUp.bind(this));
    }
  }

  unregisterEventListeners(eventTargetDom = document) {
    if (eventTargetDom) {
      eventTargetDom.removeEventListener('keydown', this._onKeydown);
      eventTargetDom.removeEventListener('keyup', this._onKeyup);
      eventTargetDom.removeEventListener('mousedown', this._mouseDown.bind(this));
      eventTargetDom.removeEventListener('mousemove', this._mouseMove.bind(this));
      eventTargetDom.removeEventListener('mouseup', this._mouseUp.bind(this));
    }
  }

  _mouseDown(evt) {
    this._isMouseDown = true;

    let rect = evt.target.getBoundingClientRect();
    this._clickedMouseXOnCanvas = evt.clientX - rect.left;
    this._clickedMouseYOnCanvas = evt.clientY - rect.top;

  }

  _mouseMove(evt) {
    let rect = evt.target.getBoundingClientRect();
    this._draggedMouseXOnCanvas = evt.clientX - rect.left;
    this._draggedMouseYOnCanvas = evt.clientY - rect.top;
    if (this._isMouseDown) {
      this._isMouseDrag = true;
    }

    this._deltaMouseXOnCanvas = this._draggedMouseXOnCanvas - this._clickedMouseXOnCanvas;
    this._deltaMouseYOnCanvas = this._draggedMouseYOnCanvas - this._clickedMouseYOnCanvas;

    this.updateCamera();

  }

  _mouseUp(evt) {
    this._isMouseDown = false;
    this._isMouseDrag = false;

    let rect = evt.target.getBoundingClientRect();
    this._clickedMouseXOnCanvas = evt.clientX - rect.left;
    this._clickedMouseYOnCanvas = evt.clientY - rect.top;
    
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

    const t = this._deltaY / 90;
    this._newDir.x = this._currentDir.x * (1 - t);
    this._newDir.y = t;
    this._newDir.z = this._currentDir.z * (1 - t);
    this._newDir.normalize();

    switch(this._lastKeyCode) {
      case 87: // w key
      case 38: // arrow upper key
      {
        const horizontalDir = (new Vector3(this._currentDir.x, 0, this._currentDir.z)).normalize();
        this._currentPos.add(Vector3.multiply(horizontalDir, this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(horizontalDir, this._horizontalSpeed));
      }
      break;
      case 65: // a key
      case 37: // arrow left key
      {
        const horizontalDir = (new Vector3(this._currentDir.x, 0, this._currentDir.z)).normalize();
        const leftDir = Matrix33.rotateY(90).multiplyVector(horizontalDir);
        this._currentPos.add(Vector3.multiply(leftDir, this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(leftDir, this._horizontalSpeed));
      }
    break;
      case 83: // s key
      case 40: // arrow down key
      {
        const horizontalDir = (new Vector3(this._currentDir.x, 0, this._currentDir.z)).normalize();
        this._currentPos.add(Vector3.multiply(horizontalDir, -this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(horizontalDir, -this._horizontalSpeed));
      }
      break;
      case 68: // d key
      case 39: // arrow right key
      {
        const horizontalDir = (new Vector3(this._currentDir.x, 0, this._currentDir.z)).normalize();
        const rightDir = Matrix33.rotateY(-90).multiplyVector(horizontalDir);
        this._currentPos.add(Vector3.multiply(rightDir, this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(rightDir, this._horizontalSpeed));
      }
      break;
      case 81: // q key
      {
        this._currentPos.add(Vector3.multiply(this._newDir, -this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(this._newDir, -this._horizontalSpeed));
      }
      break;
      case 69: // e key
      {
        this._currentPos.add(Vector3.multiply(this._newDir, this._horizontalSpeed));
        this._currentCenter.add(Vector3.multiply(this._newDir, this._horizontalSpeed));
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




    if (this._isMouseDrag) {
      const deltaX = -this._deltaMouseXOnCanvas * this._mouseXAdjustScale;
      this._deltaY += -this._deltaMouseYOnCanvas * this._mouseYAdjustScale;
      this._deltaY = Math.max(-120, Math.min(50, this._deltaY));
      this._currentDir = Matrix33.rotateY(deltaX).multiplyVector(this._currentDir);

      newEyeToCenter = Matrix33.rotateY(deltaX).multiplyVector(Vector3.subtract(this._currentCenter, this._currentPos));
      newEyeToCenter.x = newEyeToCenter.x * (1 - t);
      newEyeToCenter.y = t;
      newEyeToCenter.z = newEyeToCenter.z * (1 - t);
      newEyeToCenter.normalize();
      this._currentCenter = Vector3.add(this._currentPos, newEyeToCenter);

      this._clickedMouseXOnCanvas = this._draggedMouseXOnCanvas;
      this._clickedMouseYOnCanvas = this._draggedMouseYOnCanvas;
  
    }




    return [this._currentPos, this._currentCenter, camera.up.clone(), camera.zNear, camera.zFar];
  }

  getDirection() {
    return (this._currentCenter !== null) ? this._newDir.clone() : null;
  }

  set horizontalSpeed(value) {
    this._horizontalSpeed = value; 
  }

  get horizontalSpeed() {
    return this._horizontalSpeed;
  }

  set virticalSpeed(value) {
    this._virticalSpeed = value; 
  }

  get virticalSpeed() {
    return this._virticalSpeed;
  }
}

GLBoost['L_WalkThroughCameraController'] = L_WalkThroughCameraController;
