import GLBoost from './globals'

export default class GLExtentionsManager {

  constructor(gl) {
    if (GLExtentionsManager._instance) {
        return GLExtentionsManager._instance;
    }

    if (GLBoost.WEBGL_ONE_USE_EXTENSIONS) {
      this._extVAO = gl.getExtension("OES_vertex_array_object");

      this._extDBs = gl.getExtension("WEBGL_draw_buffers");

      this._extTFA = gl.getExtension("EXT_texture_filter_anisotropic") ||
        gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
        gl.getExtension("MOZ_EXT_texture_filter_anisotropic");

      this._extEIUI = gl.getExtension("OES_element_index_uint");
    }

    GLExtentionsManager._instance = this;
  }
  static getInstance(gl) {
    return new GLExtentionsManager(gl);
  }

  get extVAO() {
    return this._extVAO;
  }

  get extDBs() {
    return this._extDBs;
  }

  get extTFA() {
    return this._extTFA;
  }

  createVertexArray(gl) {
    if (GLBoost.isThisGLVersion_2(gl)) {
      return gl.createVertexArray();
    } else if (this._extVAO) {
      return this._extVAO.createVertexArrayOES();
    } else {
      return null;
    }
  }

  bindVertexArray(gl, vao) {
    if (GLBoost.isThisGLVersion_2(gl)) {
      gl.bindVertexArray(vao);
      return true;
    } else if (this._extVAO) {
      this._extVAO.bindVertexArrayOES(vao);
      return true;
    } else {
      return false;
    }
  }

  drawBuffers(gl, buffers) {
    return this._extDBs ?
      this.extDBs.drawBuffersWEBGL(buffers) :
      false;
  }

  colorAttachiment(gl, index) {
    return this._extDBs ?
      this._extDBs[`COLOR_ATTACHMENT${index}_WEBGL`] :
      gl[`COLOR_ATTACHMENT${index}`];
  }

  elementIndexBitSize(gl) {
    return this._extEIUI ?
      gl.UNSIGNED_INT :
      gl.UNSIGNED_SHORT;
  }

  createUintArrayForElementIndex(array) {
    return this._extEIUI ?
    new Uint32Array(array) :
    new Uint16Array(array);
  }

}
GLExtentionsManager._instance = null;
