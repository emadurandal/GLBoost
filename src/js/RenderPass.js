import GLBoost from './globals'
import GLContext from './GLContext'
import Mesh from './Mesh'
import Group from './Group'


export default class RenderPass {

  constructor(gl) {
    this._elements = [];
    this._meshes = [];
    this._drawBuffers = [gl.BACK];
    this._clearColor = null;
  }

  addElements(elements) {
    elements.forEach((elem)=>{
      if(!(elem instanceof Mesh || elem instanceof Group)) {
        throw new TypeError("RenderPass accepts Mesh or Group element only.");
      }
      this._elements.push(elem);
    });
  }

  get elements() {
    return this._elements;
  }

  get meshes() {
    return this._meshes;
  }

  specifyRenderTargetTextures(canvas, renderTargetTextures) {
    var gl = GLContext.getInstance(canvas).gl;

    if (renderTargetTextures) {
      this._drawBuffers = [];
      renderTargetTextures.forEach((texture)=>{
        this._drawBuffers.push(texture.colorAttachiment);
      });
    } else {
      this._drawBuffers = [gl.BACK];
    }
  }

  get buffersToDraw() {
    return this._drawBuffers;
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
          meshes = meshes.concat(childMeshes)
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
  }
}

GLBoost["RenderPass"] = RenderPass;
