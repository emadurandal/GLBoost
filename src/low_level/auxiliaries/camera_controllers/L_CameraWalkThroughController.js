import GLBoostObject from '../../core/GLBoostObject';

export default class L_CameraWalkThroughController extends GLBoostObject {
  constructor(glBoostContext, options = {
    eventTargetDom: document
  })
  {
    super(glBoostContext);

    this._isKeyDown = false;

    this._onKeydown = (e)=> {
      this._isKeyDown = true;

      switch(e.keycode) {
        case 87: // w key
          
        break;
        case 65: // a key

        break;

        case 83: // s key

        break;

        case 68: // d key

        break;
      }
    };

    this._onKeyup = (e)=> {
      this._isKeyDown = false;
    }

    const eventTargetDom = options.eventTargetDom;

    if (eventTargetDom) {
      if ('ontouchend' in document) {
        eventTargetDom.addEventListener('keydown', this._onKeydown);
        eventTargetDom.addEventListener('keyup', this._onKeyup);
      }
    }
  }

  addCamera(camera) {
    this._camaras.add(camera);
  }
}
