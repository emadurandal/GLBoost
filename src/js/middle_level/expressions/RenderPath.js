import GLBoost from '../../globals';
import GLContext from '../../low_level/core/GLContext';
import Mesh from '../meshes/Mesh';
import Group from '../Group';
import GLBoostObject from '../../low_level/core/GLBoostObject';

export default class RenderPath extends GLBoostObject {

  constructor(glBoostContext) {
    super(glBoostContext);

    this._expression = null;
    this._scene = null;
    //this._elements = [];
    this._meshes = [];
    this._opacityMeshes = [];
    this._transparentMeshes = [];
    this._drawBuffers = [this._glContext.gl.BACK];
    this._clearColor = null;
    this._clearDepth = 1.0;
    this._renderTargetTextures = null;
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

    if (renderTargetTextures) {
      this._drawBuffers = [];
      renderTargetTextures.forEach((texture)=>{
        this._drawBuffers.push(texture.attachment);
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

  setClearDepth(depth) {
    this._clearDepth = depth;
  }

  get clearDepth() {
    return this._clearDepth;
  }

  prepareToRender() {
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

GLBoost['RenderPath'] = RenderPath;
