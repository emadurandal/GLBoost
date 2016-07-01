import GLBoostContext from '../../low_level/core/GLBoostLowContext';
import Expression from '../expressions/Expression';
import RenderPass from '../expressions/RenderPass';
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

  createExpressionAndRenderPasses(number) {
    var expression = new Expression(this);
    var renderPasses = this.createRenderPasses(number);
    expression.addRenderPasses(renderPasses);

    return expression;
  }

  createRenderPasses(number) {
    var renderPasses = [];
    for (let i=0; i<number; i++) {
      renderPasses.push(new RenderPass(this));
    }

    return renderPasses;
  }
}

GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;
