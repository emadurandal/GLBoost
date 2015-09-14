import GLBoost from './globals'
import GLContext from './GLContext'

export default class ClassicMaterial {
  constructor(canvas) {
    this._diffuseTexture = null;
    this._gl = GLContext.getInstance(canvas).gl;
  }

  set diffuseTexture(tex) {
    this._diffuseTexture = tex;
  }

  get diffuseTexture() {
    return this._diffuseTexture;
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
