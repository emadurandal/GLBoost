import Mesh from './Mesh'
import GLExtentionsManager from './GLExtentionsManager'
import ShaderManager from './ShaderManager'

window.GLBoost = window.GLBoost || { REVISION: '1' };

class Renderer {
  constructor(parameters) {
    var _canvas = parameters.canvas;
    var _clearColor = parameters.clearColor;

    var initGL = function initGL(canvas) {
      var gl = canvas.getContext("webgl");

      if (!gl) {
          // WebGL not supported
          return false;
      }

      //if (!gl instanceof WebGL2RenderingContext)
      if (!gl instanceof WebGLRenderingContext) {
          // unexpected rendering context.
          return false;
      }

      console.log(gl);

      return gl;
    };

    this._gl = initGL(_canvas);

    var gl = this._gl;

    var setDefaultGLStates = function setDefaultGLStates() {
      gl.frontFace( gl.CCW );
      gl.cullFace( gl.BACK );
      gl.enable( gl.CULL_FACE );

      gl.enable( gl.DEPTH_TEST );
      gl.depthFunc( gl.LEQUAL );

      gl.enable( gl.BLEND );
      gl.blendEquation( gl.FUNC_ADD );
      gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

      gl.clearColor( _clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha );
      gl.clearDepth( 1 );
      gl.clearStencil( 0 );
    };

    setDefaultGLStates();
    var glem = GLExtentionsManager.getInstance(gl);
    this._glslProgram = ShaderManager.getSimpleShaderPrograms(gl);

    var that = this;
    var initVertexBuffers = function initVertexBuffers(gl, glslProgram, extVAO)
    {
      // create VAO
      var vao = extVAO.createVertexArrayOES();
      extVAO.bindVertexArrayOES(vao);

      // create VBO
      var squareVerticesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

      var vertexData = new Float32Array([
        // posx posy posz colr colg colb
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
        0.0,  0.5, 0.0, 0.0, 0.0, 1.0
      ]);
      // ストライド（頂点のサイズ）
      var stride = 24; // float6個分

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

      // 頂点レイアウト設定
      // 位置
      gl.enableVertexAttribArray(glslProgram.vertexAttributePosition);
      gl.vertexAttribPointer(glslProgram.vertexAttributePosition, 3, gl.FLOAT, gl.FALSE, stride, 0)
      // 色
      gl.enableVertexAttribArray(glslProgram.vertexAttributeColor);
      gl.vertexAttribPointer(glslProgram.vertexAttributeColor, 2, gl.FLOAT, gl.FALSE, stride, 12)

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      extVAO.bindVertexArrayOES(null)

      that._vao = vao;
    };

    initVertexBuffers(gl, this._glslProgram, glem.extVAO);
  }

  draw() {
    var gl = this._gl;
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;

    // draw
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this._glslProgram);

    extVAO.bindVertexArrayOES(this._vao);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    extVAO.bindVertexArrayOES(null);

    var mesh = new Mesh();
  }

  clearCanvas( color_flg, depth_flg, stencil_flg ) {

    var gl = this._gl;

    var bufferBits = 0;

    if ( color_flg === void 0 || color_flg ) bufferBits |= gl.COLOR_BUFFER_BIT;
    if ( depth_flg === void 0 || depth_flg ) bufferBits |= gl.DEPTH_BUFFER_BIT;
    if ( stencil_flg === void 0 || stencil_flg ) bufferBits |= gl.STENCIL_BUFFER_BIT;

    gl.clear( bufferBits );

  };
}

window.GLBoost["Renderer"] = Renderer;
