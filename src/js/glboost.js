var GLBoost = GLBoost || { REVISION: '1' };

GLBoost.Renderer = function ( parameters ) {
    var _canvas = parameters.canvas;
    var _clearColor = parameters.clearColor

    var initGL = function(canvas) {
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

        console.log(gl)

        return gl;
    };

    var _gl = initGL(_canvas);

    var setDefaultGLStates = function() {
        _gl.frontFace( _gl.CCW );
        _gl.cullFace( _gl.BACK );
        _gl.enable( _gl.CULL_FACE );

        _gl.enable( _gl.DEPTH_TEST );
        _gl.depthFunc( _gl.LEQUAL );

        _gl.enable( _gl.BLEND );
        _gl.blendEquation( _gl.FUNC_ADD );
        _gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );

        _gl.clearColor( _clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha );
        _gl.clearDepth( 1 );
        _gl.clearStencil( 0 );
    };

    setDefaultGLStates();


    // メソッド定義
    this.clearCanvas = function ( color_flg, depth_flg, stencil_flg ) {

        var bufferBits = 0;

        if ( color_flg === void 0 || color_flg ) bufferBits |= _gl.COLOR_BUFFER_BIT;
        if ( depth_flg === void 0 || depth_flg ) bufferBits |= _gl.DEPTH_BUFFER_BIT;
        if ( stencil_flg === void 0 || stencil_flg ) bufferBits |= _gl.STENCIL_BUFFER_BIT;

        _gl.clear( bufferBits );

    };
};
