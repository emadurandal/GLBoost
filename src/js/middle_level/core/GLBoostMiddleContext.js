import GLBoostContext from '../../low_level/core/GLBoostLowContext';
import RenderPath from '../expressions/RenderPath';
import Renderer from '../Renderer';
import Group from '../Group';
import Scene from '../Scene';
import Mesh from '../meshes/Mesh';
import SkeletalMesh from '../meshes/SkeletalMesh';

export default class GLBoostMiddleContext extends GLBoostContext {
  constructor(canvas) {
    super(canvas);
  }

  createScene() {
    return new Scene(this);
  }

  createGroup() {
    return new Group(this);
  }

  createMesh(geometry, material) {
    return new Mesh(this, geometry, material);
  }

  createSkeletalMesh(geometry, material, rootJointName) {
    return new SkeletalMesh(this, geometry, material, rootJointName);
  }

  createRenderer(parameters) {
    return new Renderer(this, parameters);
  }

  createRenderPaths(number) {
    var glContext = this._glContext;

    var renderPaths = [];
    for (let i=0; i<number; i++) {
      renderPaths.push(new RenderPath(this));
    }

    return renderPaths;
  }
}

GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;
