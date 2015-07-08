export default class GLExtentionsManager {

  constructor(gl) {
    if (GLExtentionsManager._instance) {
        return GLExtentionsManager._instance;
    }

    this._extVAO = gl.getExtension("OES_vertex_array_object");
    if (!this._extVAO) {
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

}
GLExtentionsManager._instance = null;
