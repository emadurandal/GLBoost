import GLBoost from './globals'

import Mesh from './Mesh'
import GLContext from './GLContext'
import Vector3 from './Vector3'


class Renderer {
  constructor(parameters) {
    var _canvas = parameters.canvas;
    var _clearColor = parameters.clearColor;

    this._gl = GLContext.getInstance(_canvas).gl;

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

    this.mesh = new Mesh();

    var positions = [
      new Vector3(-0.5, -0.5, 0.0),
      new Vector3(0.5, -0.5, 0.0),
      new Vector3(0.0,  0.5, 0.0)
      ];

    var colors = [
      new Vector3(1.0, 0.0, 0.0),
      new Vector3(0.0, 1.0, 0.0),
      new Vector3(0.0, 0.0, 1.0)
      ];

    this.mesh.setVerticesData(positions, colors);
  }

  draw() {
    this.mesh.draw();
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

GLBoost["Renderer"] = Renderer;