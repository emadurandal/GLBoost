export default class GLExtentionsManager {

  constructor(gl) {
    if (GLExtentionsManager._instance) {
        return GLExtentionsManager._instance;
    }

    this._extVAO = gl.getExtension("OES_vertex_array_object");
/*    if (!GLBoost.isThisGLVersion_2(gl) && !this._extVAO) {
        throw new Error("OES_vertex_array_objectをサポートしていません");
    }
*/
    this._extDBs = gl.getExtension("WEBGL_draw_buffers");
//    if (!this._extDBs)
//      throw("WEBGL_draw_buffersをサポートしていません");

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

}
GLExtentionsManager._instance = null;
