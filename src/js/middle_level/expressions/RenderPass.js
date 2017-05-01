import M_Mesh from '../elements/meshes/M_Mesh';
import M_Group from '../elements/M_Group';
import GLBoostObject from '../../low_level/core/GLBoostObject';
import Vector4 from '../../low_level/math/Vector4';

export default class RenderPass extends GLBoostObject {

  constructor(glBoostContext) {
    super(glBoostContext);

    this._scene = null;
    this._meshes = [];
    this._opacityMeshes = [];
    this._transparentMeshes = [];
    this._drawBuffers = [this._glContext.gl.BACK];
    this._clearColor = null;
    this._clearDepth = null;  // default is 1.0
    this._renderTargetColorTextures = [];
    this._renderTargetDepthTexture = [];
    this._expression = null;
    this._viewport = null;

    this._customFunction = null;
  }

  get expression() {
    return this._expression;
  }

  set scene(scene) {
    this._scene = scene;
  }

  get scene() {
    return this._scene;
  }

  get meshes() {
    return this._meshes;
  }

  get opacityMeshes() {
    return this._opacityMeshes;
  }

  get transparentMeshes() {
    return this._transparentMeshes;
  }

  specifyRenderTargetTextures(renderTargetTextures) {
    var gl = this._glContext.gl;
    
    var colorRenderTargetTextures = renderTargetTextures.filter((renderTargetTexture)=>{
      if (renderTargetTexture.colorAttachment) {
        return true;
      } else {
        return false;
      }
    });


    if (colorRenderTargetTextures.length > 0) {
      this._drawBuffers = [];
      colorRenderTargetTextures.forEach((texture)=>{
        var attachment = texture.colorAttachment;
        this._drawBuffers.push(attachment);
      });
      this._renderTargetColorTextures = colorRenderTargetTextures;
    } else {
      this._drawBuffers = [gl.NONE];
    }

    var depthRenderTargetTextures = renderTargetTextures.filter((renderTargetTexture)=>{
      if (renderTargetTexture.depthAttachment) {
        return true;
      } else {
        return false;
      }
    });

    this._renderTargetDepthTexture = depthRenderTargetTextures[0];
  }

  get buffersToDraw() {
    return this._drawBuffers;
  }

  get fbo() {
    if (this._renderTargetColorTextures.length > 0) {
      return this._renderTargetColorTextures[0].fbo;
    } else if (this._renderTargetDepthTexture) {
      return this._renderTargetDepthTexture.fbo;
    } else {
      return null;
    }
  }

  get viewport() {
    return this._viewport;
  }

  set viewport(vec4) {
    this._viewport = vec4;
  }

  setViewportAsFittingToRenderTarget() {
    let width;
    let height;
    if (this._renderTargetColorTextures.length > 0) {
      width = this._renderTargetColorTextures[0].width;
      height = this._renderTargetColorTextures[0].height;
    }
    if (this._renderTargetDepthTexture) {
      width = this._renderTargetDepthTexture.width;
      height = this._renderTargetDepthTexture.height;
    }
    if (typeof width !== 'undefined' && typeof height !== 'undefined') {
      this._viewport = new Vector4(0, 0, width, height);
      return true;
    } else {
      return false;
    }
  }

  get renderTargetColorTextures() {
    return this._renderTargetColorTextures;
  }

  get renderTargetDepthTexture() {
    return this._renderTargetDepthTexture;
  }

  setClearColor(color) {
    this._clearColor = color;
  }

  get clearColor() {
    return this._clearColor;
  }

  setClearDepth(depth) {
    this._clearDepth = depth;
  }

  get clearDepth() {
    return this._clearDepth;
  }

  /**
   * this function is called final part of prepareToRender
   */
  set customFunction(func) {
    this._customFunction = func;
  }

  get customFunction() {
    return this._customFunction;
  }

  prepareToRender(expression) {
    let collectMeshes = function(elem) {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();
        var meshes = [];
        children.forEach(function(child) {
          var childMeshes = collectMeshes(child);
          meshes = meshes.concat(childMeshes);
        });
        return meshes;
      } else if (elem instanceof M_Mesh) {
        return [elem];
      } else {
        return [];
      }
    };

    this._meshes = [];
    if (this._scene) {
      this._scene.getChildren().forEach((elm)=> {
        this._meshes = this._meshes.concat(collectMeshes(elm));
      });
    }

    this._opacityMeshes = [];
    this._transparentMeshes = [];
    this._meshes.forEach((mesh)=>{
      if (mesh.isTransparent()) {
        this._transparentMeshes.push(mesh);
      } else {
        this._opacityMeshes.push(mesh);
      }
    });

    if (this._scene) {
      this._scene.prepareToRender(expression);
    }

    if (this._customFunction) {
      this._customFunction();
    }
  }

  sortTransparentMeshes(camera) {

    this._transparentMeshes.forEach((mesh)=> {
      mesh.calcTransformedDepth(camera);
    });

    this._transparentMeshes.sort(function(a,b){
      if( a.transformedDepth < b.transformedDepth ) return -1;
      if( a.transformedDepth > b.transformedDepth ) return 1;
      return 0;
    });

  }

}

