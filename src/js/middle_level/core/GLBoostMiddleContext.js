import GLBoostContext, {singletonEnforcer} from '../../low_level/core/GLBoostContext';
import GLContext from '../../low_level/core/GLContext';
import MutableTexture from '../../low_level/textures/MutableTexture';
import RenderPath from '../expressions/RenderPath';

let singleton = Symbol();

export default class GLBoostMiddleContext extends GLBoostContext {
  constructor(enforcer) {
    super(enforcer);
    this._glBoostObjects = {};
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLBoostMiddleContext(singletonEnforcer);
    }
    return this[singleton];
  }

  createRenderPaths(number, canvas = GLBoost.CURRENT_CANVAS_ID) {
    var glContext = GLContext.getInstance(canvas);

    var renderPaths = [];
    for (let i=0; i<number; i++) {
      renderPaths.push(new RenderPath(glContext.gl));
    }

    return renderPaths;
  }
}

GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;
