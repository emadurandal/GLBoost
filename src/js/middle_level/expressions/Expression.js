import GLBoost from '../../globals';
import GLBoostObject from '../../low_level/core/GLBoostObject';

export default class Expression extends GLBoostObject {

  constructor() {
    super();

    this._renderPaths = [];
  }

  addRenderPaths(renderPaths) {
    this._renderPaths.concat(renderPaths);
  }

  addRenderPath(renderPath) {
    this._renderPaths.push(renderPath);
  }

  clearRenderPaths() {
    this._renderPaths.length = 0;
  }

  get renderPaths() {
    return this._renderPaths;
  }

  prepareForRender() {

  }

}

GLBoost['Expression'] = Expression;
