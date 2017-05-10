import GLBoost from '../../globals';
import MiscUtil from '../misc/MiscUtil';
import GLContextWebGL1Impl from '../impl/GLContextWebGL1Impl';
import GLContextWebGL2Impl from '../impl/GLContextWebGL2Impl';
import GLExtensionsManager from './GLExtensionsManager';
import L_GLBoostMonitor from './L_GLBoostMonitor';

export default class GLContext {

  constructor(canvas, gl, width, height) {

    if (typeof gl !== 'undefined' && gl !== null) {
      this.impl = new GLContextWebGL1Impl(canvas, this, gl);
      this._canvasWidth = width;
      this._canvasHeight = height;
      GLContext._instances['nocanvas'] = this;
    } else {
      if (GLContext._instances[canvas.id] instanceof GLContext) {
        return GLContext._instances[canvas.id];
      }

      if (GLBoost.VALUE_TARGET_WEBGL_VERSION === 1) {
        this.impl = new GLContextWebGL1Impl(canvas, this);
      } else if (GLBoost.VALUE_TARGET_WEBGL_VERSION === 2) {
        this.impl = new GLContextWebGL2Impl(canvas, this);
      }

      GLContext._instances[canvas.id] = this;
      this._canvasWidth = canvas.width;
      this._canvasHeight = canvas.height;
    }

    this._monitor = L_GLBoostMonitor.getInstance();
    this._glslProgramsLatestUsageCount = 0;
  }

  static getInstance(canvas, gl, width, height) {
    if (typeof canvas === 'string') {
      canvas = window.document.querySelector(canvas);
    }
    return new GLContext(canvas, gl, width, height);
  }

  get gl() {
    return this.impl.gl;
  }

  set gl(gl) {
    this.impl.gl = gl;
  }

  get belongingCanvasId() {
    if (this.impl.canvas) {
      return this.impl.canvas.id;
    } else {
      return 'nocanvas';
    }
  }

  get canvas() {
    return this.impl.canvas;
  }

  checkGLError() {
    if (GLBoost.VALUE_LOG_GL_ERROR === false) {
      return;
    }

    let gl = this.impl.gl;
    let errorCode = gl.getError();
    if (errorCode !== 0) {
      let errorTypes = ['INVALID_ENUM', 'INVALID_VALUE', 'INVALID_OPERATION', 'INVALID_FRAMEBUFFER_OPERATION',
        'OUT_OF_MEMORY', 'CONTEXT_LOST_WEBGL'];
      let errorMessages = [
        'An unacceptable value has been specified for an enumerated argument. The command is ignored and the error flag is set.',
        'A numeric argument is out of range. The command is ignored and the error flag is set.',
        'The specified command is not allowed for the current state. The command is ignored and the error flag is set.',
        'The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.',
        'Not enough memory is left to execute the command.',
        'If the WebGL context is lost, this error is returned on the first call to getError. Afterwards and until the context has been restored, it returns gl.NO_ERROR.'
      ];

      errorTypes.forEach((errorType, i)=>{
        if (gl[errorType] === errorCode) {
          MiscUtil.consoleLog(GLBoost.LOG_GL_ERROR, 'WebGL Error: gl.' + errorCode + '\n' + 'Meaning:' + errorMessages[i]);
        }
      });
    }
  }

  createVertexArray(glBoostObject) {
    var gl = this.gl;
    var glem = GLExtensionsManager.getInstance(this);
    var glResource = glem.createVertexArray(gl);
    if (glResource) {
      this._monitor.registerWebGLResource(glBoostObject, glResource);
    }

    this.checkGLError();

    return glResource;
  }

  createBuffer(glBoostObject) {
    var glResource = this.gl.createBuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  createFramebuffer(glBoostObject) {
    var glResource = this.gl.createFramebuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteFramebuffer(glBoostObject, frameBuffer) {
    this._monitor.deregisterWebGLResource(glBoostObject, frameBuffer);
    this.gl.deleteFramebuffer(frameBuffer);

    this.checkGLError();

    frameBuffer = null;
  }

  createRenderbuffer(glBoostObject) {
    var glResource = this.gl.createRenderbuffer();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteRenderbuffer(glBoostObject, renderBuffer) {
    this._monitor.deregisterWebGLResource(glBoostObject, renderBuffer);
    this.gl.deleteRenderbuffer(renderBuffer);

    this.checkGLError();

    renderBuffer = null;
  }

  createShader(glBoostObject, shaderType) {
    var glResource = this.gl.createShader(shaderType);
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteShader(glBoostObject, shader) {
    this._monitor.deregisterWebGLResource(glBoostObject, shader);
    this.gl.deleteShader(shader);

    this.checkGLError();

    shader = null;
  }

  createProgram(glBoostObject) {
    var glResource = this.gl.createProgram();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  useProgram(program) {
    if (!program) {
      this.gl.useProgram(program);
      this.checkGLError();
      this._glslProgramsLatestUsageCount++;

      return;
    }

    if (program.glslProgramsSelfUsageCount < this.glslProgramsLatestUsageCount) {
      this.gl.useProgram(program);
      this.checkGLError();
      this._glslProgramsLatestUsageCount++;
      program.glslProgramsSelfUsageCount = this._glslProgramsLatestUsageCount;

      return;
    }

    MiscUtil.consoleLog(GLBoost.LOG_OMISSION_PROCESSING,
      'LOG_OMISSION_PROCESSING: gl.useProgram call has been omitted since this glsl program is already in use.');
  }

  deleteProgram(glBoostObject, program) {
    this._monitor.deregisterWebGLResource(glBoostObject, program);
    this.gl.deleteProgram(program);

    this.checkGLError();

  }

  getUniformLocation(glslProgram, uniformVariableName) {
    let uniformLocation = this.gl.getUniformLocation(glslProgram, uniformVariableName);
    this.checkGLError();
    if (uniformLocation) {
      uniformLocation.glslProgram = glslProgram;
      uniformLocation.glslProgramUsageCountWhenLastSet = -1;
    }

    return uniformLocation;
  }

  _setUniformValues(uniformFuncStr, args, forceUpdate) {
    let uniformLocation = args[0];
    if (!uniformLocation) {
      MiscUtil.consoleLog(GLBoost.LOG_OMISSION_PROCESSING,
        'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation is falsy (undefined or something)');

      return
    }

    if (uniformLocation.glslProgram.glslProgramsSelfUsageCount < this._glslProgramsLatestUsageCount) {
      MiscUtil.consoleLog(GLBoost.LOG_OMISSION_PROCESSING,
        'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation.glslProgram is not in use.');

      return;
    }
    if (uniformLocation.glslProgramUsageCountWhenLastSet < this._glslProgramsLatestUsageCount) {
      // Since I have never sent a uniform value to glslProgram which is currently in use, update it.
      this.gl[uniformFuncStr].apply(this.gl, args);
      this.checkGLError();

      return;
    }

    if (forceUpdate) {
      this.gl[uniformFuncStr].apply(this.gl, args);
      this.checkGLError();
    } else {
      MiscUtil.consoleLog(GLBoost.LOG_OMISSION_PROCESSING,
        'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation.glslProgram is not in use.');
    }
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z, w) change from the previous states or not.
  uniform4f(uniformLocation, x, y, z, w, forceUpdate) {
    this._setUniformValues('uniform4f', [uniformLocation, x, y, z, w], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z) change from the previous states or not.
  uniform3f(uniformLocation, x, y, z, forceUpdate) {
    this._setUniformValues('uniform3f', [uniformLocation, x, y, z], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y) change from the previous states or not.
  uniform2f(uniformLocation, x, y, forceUpdate) {
    this._setUniformValues('uniform2f', [uniformLocation, x, y], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the value x changes from the previous state or not.
  uniform1f(uniformLocation, x, forceUpdate) {
    this._setUniformValues('uniform1f', [uniformLocation, x], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z, w) change from the previous states or not.
  uniform4i(uniformLocation, x, y, z, w, forceUpdate) {
    this._setUniformValues('uniform4i', [uniformLocation, x, y, z, w], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y, z) change from the previous states or not.
  uniform3i(uniformLocation, x, y, z, forceUpdate) {
    this._setUniformValues('uniform3i', [uniformLocation, x, y, z], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the values (x, y) change from the previous states or not.
  uniform2i(uniformLocation, x, y, forceUpdate) {
    this._setUniformValues('uniform2i', [uniformLocation, x, y], forceUpdate);
  }

  // Set forceUpdate to true if there is no way to check whether the value x changes from the previous state or not.
  uniform1i(uniformLocation, x, forceUpdate) {
    this._setUniformValues('uniform1i', [uniformLocation, x], forceUpdate);
  }


  createTexture(glBoostObject) {
    var glResource = this.gl.createTexture();
    this._monitor.registerWebGLResource(glBoostObject, glResource);

    this.checkGLError();

    return glResource;
  }

  deleteTexture(glBoostObject, texture) {
    this._monitor.deregisterWebGLResource(glBoostObject, texture);
    this.gl.deleteTexture(texture);

    this.checkGLError();

    texture = null;
  }

  get canvasWidth() {
    return this._canvasWidth;
  }

  set canvasWidth(width) {
    if (this.impl.canvas) {
      this.impl.canvas.width = width;
    }
    this._canvasWidth = width;
  }

  get canvasHeight() {
    return this._canvasHeight;
  }

  set canvasHeight(height) {
    if (this.impl.canvas) {
      this.impl.canvas.height = height;
    }
    this._canvasHeight = height;
  }

  get glslProgramsLatestUsageCount() {
    return this._glslProgramsLatestUsageCount;
  }

}
GLContext._instances = new Object();
