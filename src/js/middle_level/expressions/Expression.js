import GLBoost from '../../globals';
import GLBoostObject from '../../low_level/core/GLBoostObject';

export default class Expression extends GLBoostObject {

  constructor(glBoostContext) {
    super(glBoostContext);

    this._renderPaths = [];
  }

  addRenderPaths(renderPaths) {
    renderPaths.forEach((renderPath)=>{
      renderPath._expression = this;
    });
    
    this._renderPaths = this._renderPaths.concat(renderPaths);
  }

  addRenderPath(renderPath) {
    renderPath._expression = this;
    this._renderPaths.push(renderPath);
  }

  clearRenderPaths() {
    this._renderPaths.forEach((renderPath)=>{
      renderPath._expression = null;
    });
    this._renderPaths.length = 0;
  }

  get renderPaths() {
    return this._renderPaths;
  }

  prepareToRender() {
    this._renderPaths.forEach((renderPath)=>{
      renderPath.prepareToRender();
    });
  }

}

GLBoost['Expression'] = Expression;
