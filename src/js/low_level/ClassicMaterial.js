import GLBoost from '../globals';
import GLContext from './core/GLContext';
import Vector4 from './math/Vector4';
import DecalShader from '../middle_level/shaders/DecalShader';
import GLBoostObject from './core/GLBoostObject';

export default class ClassicMaterial extends GLBoostObject {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    super();

    this._diffuseTexture = null;
    this._gl = GLContext.getInstance(canvas).gl;
    this._canvas = canvas;
    this._baseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._diffuseColor = new Vector4(1.0, 1.0, 1.0, 1.0);
    this._specularColor = new Vector4(0.5, 0.5, 0.5, 1.0);
    this._ambientColor = new Vector4(0.0, 0.0, 0.0, 1.0);
    this._name = '';
    this._shaderClass = DecalShader;
    this._shaderInstance = null;
    this._vertexNofGeometries = {};

  }

  clone() {
    var material = new ClassicMaterial(this._canvas);
    material._baseColor = this._baseColor;
    material._diffuseColor = this._diffuseColor;
    material._specularColor = this._specularColor;
    material._ambientColor = this._ambientColor;
    material._shaderClass = this._shaderClass;
    material._shaderInstance = this._shaderInstance;

    for (let geom in this._vertexNofGeometries) {
      material._vertexNofGeometries[geom] = this._vertexNofGeometries[geom];
    }

    return material;
  }

  set shaderClass(shaderClass) {
    if (this._shaderClass === shaderClass) {
      return;
    }
    this._shaderClass = shaderClass;
    if (this._shaderInstance) {
      this._shaderInstance.readyForDiscard();
    }
    this._shaderInstance = null;
  }

  get shaderClass() {
    return this._shaderClass;
  }

  set shaderInstance(shaderInstance) {
    this._shaderInstance = shaderInstance;
  }

  get shaderInstance() {
    return this._shaderInstance;
  }

  set diffuseTexture(tex) {
    this._diffuseTexture = tex;
  }

  get diffuseTexture() {
    return this._diffuseTexture;
  }

  set baseColor(vec) {
    this._baseColor = vec;
  }

  get baseColor() {
    return this._baseColor;
  }

  set diffuseColor(vec) {
    this._diffuseColor = vec;
  }

  get diffuseColor() {
    return this._diffuseColor;
  }

  set specularColor(vec) {
    this._specularColor = vec;
  }

  get specularColor() {
    return this._specularColor;
  }

  set ambientColor(vec) {
    this._ambientColor = vec;
  }

  get ambientColor() {
    return this._ambientColor;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  setVertexN(geom, num) {
    this._vertexNofGeometries[geom] = num;
  }

  getVertexN(geom) {
    return (typeof this._vertexNofGeometries[geom] === 'undefined') ? 0 : this._vertexNofGeometries[geom];
  }

  setUp() {
    var gl = this._gl;
    var result = false;
    if (this._diffuseTexture) {
      // テクスチャユニット０にテクスチャオブジェクトをバインドする
      gl.activeTexture(gl.TEXTURE0);
      result = this._diffuseTexture.setUp();
    } else {
      gl.bindTexture(gl.TEXTURE_2D, null);
      result = true;
    }

    return result;
  }

  tearDown() {
    if (this._diffuseTexture) {
      this._diffuseTexture.tearDown();
    }
  }

}

GLBoost['ClassicMaterial'] = ClassicMaterial;
