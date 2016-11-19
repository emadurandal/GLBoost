import GLBoost from '../../globals';
import Texture from './Texture';
import GLExtensionsManager from '../core/GLExtensionsManager';
import MiscUtil from '../misc/MiscUtil';

export default class PhinaTexture extends Texture {
  constructor(glBoostContext, width, height, parameters = null) {
    super(glBoostContext, null, parameters);
    this._parameters['UNPACK_FLIP_Y_WEBGL'] = true;

    this._width = width;
    this._height = height;

    this._phinaObjects = [];
    this._setUpOffscreen();
  }

  _setUpOffscreen() {
    this._offscreen = phina.display.OffScreenLayer({
      width: this.width,
      height: this.height
    });

    this._offscreen.reset();
  }

  addPhinaObject(object) {
    this._phinaObjects.push(object);
    return this;
  }

  addPhinaObjects(objects) {
    this._phinaObjects = this._phinaObjects.concat(objects);
    return this;
  }

  setPhinaObjects(objects) {
    this._phinaObjects = objects.concat();
    return this;
  }

  clearPhinaObjects() {
    this._phinaObjects.length = 0;
    return this;
  }

  renderPhinaObjects() {
    for (let i=0; i<this._phinaObjects.length; i++) {
      this._offscreen.renderObject(this._phinaObjects[i]);
    }

    this._recreateTexture(this._offscreen.getImageDataURL());
  }

  _recreateTexture(imageDataUri) {
    if (this._texture !== null) {
      this._glContext.deleteTexture(this, this._texture);
    }
    this._generateTextureFromUri(imageDataUri);
  }
}
