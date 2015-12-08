import GLBoost from './globals'
import GLContext from './GLContext'
import Vector3 from './math/Vector3'
import SimpleShader from './shaders/SimpleShader'

export default class ClassicMaterial {
  constructor(canvas) {
    this._diffuseTexture = null;
    this._gl = GLContext.getInstance(canvas).gl;
    this._diffuseColor = new Vector3(1.0, 1.0, 1.0);
    this._specularColor = new Vector3(1.0, 1.0, 1.0);
    this._ambientColor = new Vector3(0.0, 0.0, 0.0);
    this._name = "";
    this._shader = new SimpleShader(canvas);
    this._vertexNofMeshes = {};
  }

  set shader(shader) {
    this._shader = shader;
  }

  get shader() {
    return this._shader;
  }

  set diffuseTexture(tex) {
    this._diffuseTexture = tex;
  }

  get diffuseTexture() {
    return this._diffuseTexture;
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
  /*
  set faceN(num) {
    this._faceN = num;
  }

  get faceN() {
    return this._faceN;
  }
  */

  setVertexN(mesh, num) {
    this._vertexNofMeshes[mesh] = num;
  }

  getVertexN(mesh) {
    return (typeof this._vertexNofMeshes[mesh] === "undefined") ? 0 : this._vertexNofMeshes[mesh];
  }

  setUp() {
    var gl = this._gl;
    if (this._diffuseTexture) {
      // テクスチャユニット０にテクスチャオブジェクトをバインドする
      gl.activeTexture(gl.TEXTURE0);
      this._diffuseTexture.setUp();
    }
  }

  tearDown() {
    if (this._diffuseTexture) {
      this._diffuseTexture.tearDown();
    }
  }
}

GLBoost["ClassicMaterial"] = ClassicMaterial;
