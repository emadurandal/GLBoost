import GLBoost from './globals';
import GLContext from './GLContext';
import Mesh from './meshes/Mesh';
import Group from './Group';


export default class RenderPass {

  constructor(gl) {
    this._elements = [];
    this._meshes = [];
    this._opacityMeshes = [];
    this._transparentMeshes = [];
    this._drawBuffers = [gl.BACK];
    this._clearColor = null;
    this._renderTargetTextures = null;
  }

  addElements(elements) {
    elements.forEach((elem)=>{
      if(!(elem instanceof Mesh || elem instanceof Group)) {
        throw new TypeError('RenderPass accepts Mesh or Group element only.');
      }
      this._elements.push(elem);
    });
  }

  clearElements() {
    this._elements.length = 0;
  }

  get elements() {
    return this._elements;
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

  specifyRenderTargetTextures(renderTargetTextures, canvas = GLBoost.CURRENT_CANVAS_ID) {
    var gl = GLContext.getInstance(canvas).gl;

    if (renderTargetTextures) {
      this._drawBuffers = [];
      renderTargetTextures.forEach((texture)=>{
        this._drawBuffers.push(texture.colorAttachiment);
      });
      this._renderTargetTextures = renderTargetTextures;
    } else {
      this._drawBuffers = [gl.BACK];
    }

  }

  get buffersToDraw() {
    return this._drawBuffers;
  }

  get fboOfRenderTargetTextures() {
    if (this._renderTargetTextures) {
      return this._renderTargetTextures[0].fbo;
    } else {
      return null;
    }
  }

  get renderTargetTextures() {
    return this._renderTargetTextures;
  }

  setClearColor(color) {
    this._clearColor = color;
  }

  get clearColor() {
    return this._clearColor;
  }

  prepareForRender() {
    let collectMeshes = function(elem) {
      if (elem instanceof Group) {
        var children = elem.getChildren();
        var meshes = [];
        children.forEach(function(child) {
          var childMeshes = collectMeshes(child);
          meshes = meshes.concat(childMeshes);
        });
        return meshes;
      } else if (elem instanceof Mesh) {
        return [elem];
      } else {
        return [];
      }
    };

    this._meshes = [];
    this._elements.forEach((elm)=> {
      this._meshes = this._meshes.concat(collectMeshes(elm));
    });

    this._opacityMeshes = [];
    this._transparentMeshes = [];
    this._meshes.forEach((mesh)=>{
      if (mesh.isTransparent()) {
        this._transparentMeshes.push(mesh);
      } else {
        this._opacityMeshes.push(mesh);
      }
    });
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

  containsMeshAfterPrepareForRender(mesh) {
    for(let i=0; i<this._meshes.length; i++) {
      if (this._meshes[i] === mesh) {
        return true;
      }
    }
    return false;
  }
}

GLBoost['RenderPass'] = RenderPass;
