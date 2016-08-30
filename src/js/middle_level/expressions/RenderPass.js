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
    this._renderTargetColorTextures = null;
    this._renderTargetDepthTexture = null;
    this._expression = null;
    this._fbo = null;

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
    if (this._renderTargetColorTextures) {
      return this._renderTargetColorTextures[0].fbo;
    } else if (this._renderTargetDepthTexture) {
      return this._renderTargetDepthTexture.fbo;
    } else {
      return null;
    }
  }

  get viewport() {
    var texture = null;
    if (this._renderTargetColorTextures) {
      texture = this._renderTargetColorTextures[0];
    } else if (this._renderTargetDepthTexture) {
      texture = this._renderTargetDepthTexture;
    }

    return new Vector4(0, 0, texture.width, texture.height);
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

  prepareToRender() {
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
      this._scene.prepareToRender();
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

