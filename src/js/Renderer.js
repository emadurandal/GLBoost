import GLBoost from './globals'
import Mesh from './Mesh'
import Camera from './Camera'
import Matrix44 from './math/Matrix44'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import MutableTexture from './textures/MutableTexture'
import RenderPass from './RenderPass'
import AbstractLight from './lights/AbstractLight'

export default class Renderer {
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

    this._currentRenderTargetTextures = [];
    this._renderPasses = null;
  }

  draw(scene) {
    var camera = false;
    var viewMatrix = null;
    var projectionMatrix = null;
    scene.elements.forEach((elm)=> {
      if(elm instanceof Camera) {
        if (elm.isMainCamera) {
          camera = elm;
        }
      }
    });

    var gl = this._gl;
    var glem = GLExtentionsManager.getInstance(gl);

    let lights = [];
    scene.elements.forEach((elm)=> {
      if(elm instanceof AbstractLight) {
        lights.push(elm);
      }
    });

    // if you didn't setup RenderPasses, all meshes are drawn to the backbuffer of framebuffer (gl.BACK).
    if (this._renderPasses === null) {
      glem.drawBuffers(gl, [gl.BACK]);

      scene.elements.forEach((elm)=> {
        if(elm instanceof Mesh) {
          elm.draw(lights, camera);
        }
      });

    } else { // if you did setup RenderPasses, drawing meshes are executed for each RenderPass.
      this._renderPasses.forEach((renderPass)=>{

        if (renderPass.buffersToDraw[0] !== gl.BACK) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
        }
        glem.drawBuffers(gl, renderPass.buffersToDraw); // set render target buffers for each RenderPass.

        if (renderPass.clearColor) {
          var color = renderPass.clearColor;
          gl.clearColor(color[0], color[1], color[2], color[3]);
          gl.clear( gl.COLOR_BUFFER_BIT );
        }

        var meshes = renderPass.getMeshes();
        meshes.forEach((mesh)=> {
          mesh.draw(lights, camera);
        });

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        glem.drawBuffers(gl, [gl.BACK]);

      });
    }
  }

  clearCanvas( color_flg, depth_flg, stencil_flg ) {

    var gl = this._gl;

    var bufferBits = 0;

    if ( color_flg === void 0 || color_flg ) bufferBits |= gl.COLOR_BUFFER_BIT;
    if ( depth_flg === void 0 || depth_flg ) bufferBits |= gl.DEPTH_BUFFER_BIT;
    if ( stencil_flg === void 0 || stencil_flg ) bufferBits |= gl.STENCIL_BUFFER_BIT;

    gl.clear( bufferBits );

  };

  createTexturesForRenderTarget(width, height, textureNum) {

    var gl = this._gl;

    var glem = GLExtentionsManager.getInstance(gl);


    if (this._fbo) {
      gl.deleteFramebuffers(1, this._fbo);
    }
    // Create FBO
    this._fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
    this._fbo.width = width ? width : gl._canvas.width;
    this._fbo.height = height ? height : gl._canvas.height;

    for(let i=0; i<textureNum; i++) {
      let texture = new MutableTexture(gl._canvas, this._fbo.width, this._fbo.height);
      this._currentRenderTargetTextures.push(texture);
    }

    // Create RenderBuffer
    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._fbo.width, this._fbo.height);

    // Attach Buffers
    this._currentRenderTargetTextures.forEach((texture, i)=>{
      var glTexture = texture.glTextureResource;
      var attachimentId = glem.colorAttachiment(gl, i);
      texture.colorAttachiment = attachimentId;
      gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
    });
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return this._currentRenderTargetTextures;
  }

  createRenderPasses(number) {
    this._renderPasses = [];
    for (let i=0; i<number; i++) {
      this._renderPasses.push(new RenderPass(this._gl));
    }

    return this._renderPasses;
  }

}

GLBoost["Renderer"] = Renderer;
