import GLBoost from './globals'
import GLContext from './GLContext'
import Mesh from './Mesh'


export default class RenderPass {

  constructor(gl) {
    this._meshes = [];
    this._drawBuffers = [gl.BACK];
    this._clearColor = null;
  }

  addMeshes(meshes) {
    meshes.forEach((mesh)=>{
      if(!(mesh instanceof Mesh)) {
        throw new TypeError("RenderPass accepts Geometry objects only.");
      }
      this._meshes.push(mesh);
    });
  }

  getMeshes() {
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
}

GLBoost["RenderPass"] = RenderPass;
