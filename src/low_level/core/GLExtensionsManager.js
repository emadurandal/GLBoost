import GLBoost from '../../globals';

export default class GLExtensionsManager {

  constructor(glContext) {
    var gl = glContext.gl;

    if (GLBoost.VALUE_WEBGL_ONE_USE_EXTENSIONS) {
      this._extVAO = gl.getExtension('OES_vertex_array_object');

      this._extDBs = gl.getExtension('WEBGL_draw_buffers');

      this._extTFA = gl.getExtension('EXT_texture_filter_anisotropic') ||
        gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
        gl.getExtension('MOZ_EXT_texture_filter_anisotropic');

      this._extEIUI = gl.getExtension('OES_element_index_uint');

      this._extDepthTex = gl.getExtension('WEBGL_depth_texture');

      this._extStdDerivatives = gl.getExtension("OES_standard_derivatives");

      this._extTFL = gl.getExtension("OES_texture_float_linear");

      this._extTexLod = gl.getExtension("EXT_shader_texture_lod");
    }

    GLExtensionsManager._instances[glContext.belongingCanvasId] = this;

    this._glContext = glContext;
  }
  static getInstance(glContext) {
    if (GLExtensionsManager._instances[glContext.belongingCanvasId]) {
      return GLExtensionsManager._instances[glContext.belongingCanvasId];
    }
    return new GLExtensionsManager(glContext);
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

  get extDepthTex() {
    return this._extDepthTex;
  }

  createVertexArray(gl) {
    if (GLBoost.isThisGLVersion_2(gl)) {
      return gl.createVertexArray();
    } else if (this._extVAO) {
      return this._extVAO.createVertexArrayOES();
    } else {
      return null;
    }

    this._glContext.checkGLError();
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

    this._glContext.checkGLError();
  }

  drawBuffers(gl, buffers) {
    let buffer = buffers;
    if (GLBoost.isThisGLVersion_2(gl)) {
      gl.drawBuffers(buffers);
      buffer = buffer[0];
    } else if (this._extDBs) {
      this.extDBs.drawBuffersWEBGL(buffers);
      buffer = buffer[0];
    }

    if (buffer === gl.NONE) {
      gl.colorMask(false, false, false, false);
    } else {
      gl.colorMask(true, true, true, true);
    }

    this._glContext.checkGLError();
  }

  readBuffer(gl, buffers) {
    let buffer = buffers;
    if (GLBoost.isThisGLVersion_2(gl)) {
      buffer = buffer[0];
    } else if (this._extDBs) {
      buffer = buffer[0];
    }

    gl.readBuffer(buffer);

    this._glContext.checkGLError();
  }


  colorAttachiment(gl, index) {
    return this._extDBs ?
      this._extDBs[`COLOR_ATTACHMENT${index}_WEBGL`] :
      gl[`COLOR_ATTACHMENT${index}`];
  }

  elementIndexBitSizeGLConstant(gl) {
    if (GLBoost.isThisGLVersion_2(gl) || this._extEIUI) {
      return gl.UNSIGNED_INT;
    } else {
      return gl.UNSIGNED_SHORT;
    }
  }

  elementIndexByteSizeNumber(gl) {
    if (GLBoost.isThisGLVersion_2(gl) || this._extEIUI) {
      return 4;
    } else {
      return 2;
    }
  }

  createUintArrayForElementIndex(gl, array) {
    if (GLBoost.isThisGLVersion_2(gl) || this._extEIUI) {
      return new Uint32Array(array);
    } else {
      return new Uint16Array(array);
    }
  }

}
GLExtensionsManager._instances = new Object();

GLBoost['GLExtensionsManager'] = GLExtensionsManager;
