import GLBoostContext from '../../low_level/core/GLBoostLowContext';
import RenderPath from '../expressions/RenderPath';

let singleton = Symbol();

export default class GLBoostMiddleContext extends GLBoostContext {
  constructor(canvas) {
    super(canvas);
  }

  createRenderPaths(number) {
    var glContext = this._glContext;

    var renderPaths = [];
    for (let i=0; i<number; i++) {
      renderPaths.push(new RenderPath(glContext.gl));
    }

    return renderPaths;
  }
}

GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;
