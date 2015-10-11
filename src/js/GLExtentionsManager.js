export default class GLExtentionsManager {

  constructor(gl) {
    if (GLExtentionsManager._instance) {
        return GLExtentionsManager._instance;
    }

    this._extVAO = gl.getExtension("OES_vertex_array_object");
    if (!GLBoost.isThisGLVersion_2(gl) && !this._extVAO) {
        throw new Error("OES_vertex_array_objectをサポートしていません");
    }

    GLExtentionsManager._instance = this;
  }
  static getInstance(gl) {
    return new GLExtentionsManager(gl);
  }

  get extVAO() {
    return this._extVAO;
  }

  createVertexArray(gl) {
    return GLBoost.isThisGLVersion_2(gl) ?
      gl.createVertexArray() :
      this._extVAO.createVertexArrayOES();
  }

  bindVertexArray(gl, vao) {
    return GLBoost.isThisGLVersion_2(gl) ?
      gl.bindVertexArray(vao) :
      this._extVAO.bindVertexArrayOES(vao);
  }

}
GLExtentionsManager._instance = null;
