import GLBoost from '../../globals';
import L_AbstractMaterial from './L_AbstractMaterial';
import Vector4 from '../math/Vector4';

export default class ClassicMaterial extends L_AbstractMaterial {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._wireframeWidthRelativeScale = 1.0;
    this._baseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._diffuseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._specularColor = new Vector4(0.5, 0.5, 0.5, 1.0);
    this._ambientColor = new Vector4(0.25, 0.25, 0.25, 1.0);
  }

  get wireframeWidthRelativeScale() {
    return this._wireframeWidthRelativeScale;
  }

  clone() {
    super.clone();

    material._baseColor = this._baseColor;
    material._diffuseColor = this._diffuseColor;
    material._specularColor = this._specularColor;
    material._ambientColor = this._ambientColor;
  }


  set baseColor(vec) {
    if (!vec) {
      return;
    }

    this._baseColor = vec;
    this._updateCount();
  }

  get baseColor() {
    return this._baseColor;
  }

  set diffuseColor(vec) {
    if (!vec) {
      return;
    }

    this._diffuseColor = vec;
    this._updateCount();
  }

  get diffuseColor() {
    return this._diffuseColor;
  }

  set specularColor(vec) {
    if (!vec) {
      return;
    }

    this._specularColor = vec;
    this._updateCount();
  }

  get specularColor() {
    return this._specularColor;
  }

  set ambientColor(vec) {
    if (!vec) {
      return;
    }

    this._ambientColor = vec;
    this._updateCount();
  }

  get ambientColor() {
    return this._ambientColor;
  }
}

GLBoost['ClassicMaterial'] = ClassicMaterial;
