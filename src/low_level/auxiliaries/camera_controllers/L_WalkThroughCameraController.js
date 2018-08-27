import GLBoostObject from '../../core/GLBoostObject';
import Vector3 from '../../math/Vector3';
import Matrix33 from '../../math/Matrix33';
import MathClassUtil from '../../math/MathClassUtil';
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

    this.reset();

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
      document.addEventListener('keydown', this._onKeydown);
      document.addEventListener('keyup', this._onKeyup);

      if ('ontouchend' in document) {
        eventTargetDom.addEventListener('touchstart', this._mouseDown.bind(this));
        eventTargetDom.addEventListener('touchend', this._mouseUp.bind(this));
        eventTargetDom.addEventListener('touchmove', this._mouseMove.bind(this));          
      }
      if ('onmouseup' in document) {
        eventTargetDom.addEventListener('mousedown', this._mouseDown.bind(this));
        eventTargetDom.addEventListener('mouseup', this._mouseUp.bind(this));
        eventTargetDom.addEventListener('mousemove', this._mouseMove.bind(this));          
      }
    }
  }

  unregisterEventListeners(eventTargetDom = document) {
    if (eventTargetDom) {
      document.removeEventListener('keydown', this._onKeydown);
      document.removeEventListener('keyup', this._onKeyup);
      
      if ('ontouchend' in document) {
        eventTargetDom.removeEventListener('touchstart', this._mouseDown.bind(this));
        eventTargetDom.removeEventListener('touchend', this._mouseUp.bind(this));
        eventTargetDom.removeEventListener('touchmove', this._mouseMove).bind(this);          
      }
      if ('onmouseup' in document) {
        eventTargetDom.removeEventListener('mousedown', this._mouseDown.bind(this));
        eventTargetDom.removeEventListener('mouseup', this._mouseUp.bind(this));
        eventTargetDom.removeEventListener('mousemove', this._mouseMove.bind(this));          
      }
    }
  }

  _mouseDown(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this._isMouseDown = true;

    let rect = evt.target.getBoundingClientRect();
    this._clickedMouseXOnCanvas = evt.clientX - rect.left;
    this._clickedMouseYOnCanvas = evt.clientY - rect.top;

    return false;
  }

  _mouseMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this._isMouseDown) {
      return;
    }

    let rect = evt.target.getBoundingClientRect();
    this._draggedMouseXOnCanvas = evt.clientX - rect.left;
    this._draggedMouseYOnCanvas = evt.clientY - rect.top;

    this._deltaMouseXOnCanvas = this._draggedMouseXOnCanvas - this._clickedMouseXOnCanvas;
    this._deltaMouseYOnCanvas = this._draggedMouseYOnCanvas - this._clickedMouseYOnCanvas;

    
    this._isMouseDrag = true;
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

  reset() {
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
    this._deltaX = 0;
    this._newDir = Vector3.zero();

    this._camaras.forEach(function (camera) {
      camera._needUpdateView(false);
    });
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

      this._deltaX = -this._deltaMouseXOnCanvas * this._mouseXAdjustScale;
      this._deltaY += -this._deltaMouseYOnCanvas * this._mouseYAdjustScale;
      this._deltaY = Math.max(-120, Math.min(50, this._deltaY));


      this._currentDir = Matrix33.rotateY(this._deltaX).multiplyVector(this._currentDir);

      newEyeToCenter = Matrix33.rotateY(this._deltaX).multiplyVector(Vector3.subtract(this._currentCenter, this._currentPos));
      newEyeToCenter.x = newEyeToCenter.x * (1 - t);
      newEyeToCenter.y = t;
      newEyeToCenter.z = newEyeToCenter.z * (1 - t);
      newEyeToCenter.normalize();
      this._currentCenter = Vector3.add(this._currentPos, newEyeToCenter);


      this._clickedMouseXOnCanvas = this._draggedMouseXOnCanvas;
      this._clickedMouseYOnCanvas = this._draggedMouseYOnCanvas;
      this._deltaMouseXOnCanvas = 0;
      this._deltaMouseYOnCanvas = 0; 
    }

    let newLeft = camera.left;
    let newRight = camera.right;
    let newTop = camera.top;
    let newBottom = camera.bottom;



    return [this._currentPos, this._currentCenter, camera.up.clone(), camera.zNear, camera.zFar, newLeft, newRight, newTop, newBottom];
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

  get allInfo() {
    const info = {};

    info.virticalSpeed = this.virticalSpeed;
    info.horizontalSpeed = this.horizontalSpeed;
    info._turnSpeed = this._turnSpeed;
    info.shiftCameraTo = this.shiftCameraTo;
    info.zFarAdjustingFactorBasedOnAABB = this.zFarAdjustingFactorBasedOnAABB;
    info.target = this.target;
    if (this._currentPos) {
      info._currentPos = this._currentPos.clone();
    }
    if (this._currentCenter) {
      info._currentCenter = this._currentCenter.clone();
    }
    if (this._currentDir) {
      info._currentDir = this._currentDir.clone();
    }
    info._deltaY = this._deltaY;
    info._newDir = this._newDir.clone();

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

GLBoost['L_WalkThroughCameraController'] = L_WalkThroughCameraController;
