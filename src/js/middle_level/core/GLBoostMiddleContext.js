import GLBoostLowContext from '../../low_level/core/GLBoostLowContext';
import Expression from '../expressions/Expression';
import RenderPass from '../expressions/RenderPass';
import Renderer from '../Renderer';
import M_Group from '../elements/M_Group';
import M_Scene from '../elements/M_Scene';
import M_Mesh from '../elements/meshes/M_Mesh';
import M_SkeletalMesh from '../elements/meshes/M_SkeletalMesh';
import M_SkeletalGeometry from '../geometries/M_SkeletalGeometry';
import M_PerspectiveCamera from '../elements/cameras/M_PerspectiveCamera';
import M_OrthoCamera from '../elements/cameras/M_OrthoCamera';
import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import M_PointLight from '../elements/lights/M_PointLight';
import M_Joint from '../elements/skeletons/M_Joint';

export default class GLBoostMiddleContext extends GLBoostLowContext {
  constructor(canvas) {
    super(canvas);
  }

  createScene() {
    return new M_Scene(this);
  }

  createGroup() {
    return new M_Group(this);
  }

  createMesh(geometry, material) {
    return new M_Mesh(this, geometry, material);
  }

  createSkeletalMesh(geometry, material, rootJointName) {
    return new M_SkeletalMesh(this, geometry, material, rootJointName);
  }

  createSkeletalGeometry() {
    return new M_SkeletalGeometry(this);
  }

  createRenderer(parameters) {
    return new Renderer(this, parameters);
  }

  createExpression() {
    return this.createExpressionAndRenderPasses(1);
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

  createPerspectiveCamera(lookat, perspective) {
    return new M_PerspectiveCamera(this, true, lookat, perspective);
  }

  createOrthoCamera(lookat, ortho) {
    return new M_OrthoCamera(this, true, lookat, ortho);
  }

  createDirectionalLight(intensity, direction) {
    return new M_DirectionalLight(this, intensity, direction);
  }

  createPointLight(intensity) {
    return new M_PointLight(this, intensity);
  }

  createJoint() {
    return new M_Joint(this);
  }

}

GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;
