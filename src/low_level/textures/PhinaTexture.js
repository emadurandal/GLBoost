import GLBoost from '../../globals';
import Texture from './Texture';
import GLExtensionsManager from '../core/GLExtensionsManager';

export default class PhinaTexture extends Texture {
  constructor(glBoostContext, width, height, fillStyle, parameters = null) {
    super(glBoostContext, null, null, parameters);
    this._parameters['UNPACK_FLIP_Y_WEBGL'] = true;

    this._width = width;
    this._height = height;
    this._fillStyle = fillStyle;

    this._phinaObjects = [];
    this._setUpOffscreen();
  }

  _setUpOffscreen() {
    this._offscreen = phina.display.OffScreenLayer({
      width: this.width,
      height: this.height,
      fillStyle: this._fillStyle
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
    this._offscreen.reset();
  }

  _recreateTexture(imageDataUri) {
    var oldTexture = this._texture;
    this.generateTextureFromUri(imageDataUri, true);
    if (typeof oldTexture !== 'undefined' && oldTexture !== null) {
      this._glContext.deleteTexture(this, oldTexture);
    }
  }
}
