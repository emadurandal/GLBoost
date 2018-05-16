import GLBoostLowContext from '../../low_level/core/GLBoostLowContext';
import M_GLBoostMonitor from '../core/M_GLBoostMonitor';
import Expression from '../expressions/Expression';
import RenderPass from '../expressions/RenderPass';
import Renderer from '../Renderer';
import M_Group from '../elements/M_Group';
import M_Scene from '../elements/M_Scene';
import M_Mesh from '../elements/meshes/M_Mesh';
import M_SkeletalMesh from '../elements/meshes/M_SkeletalMesh';
import M_SkeletalGeometry from '../geometries/M_SkeletalGeometry';
import M_PerspectiveCamera from '../elements/cameras/M_PerspectiveCamera';
import M_FrustumCamera from '../elements/cameras/M_FrustumCamera';
import M_OrthoCamera from '../elements/cameras/M_OrthoCamera';
import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import M_PointLight from '../elements/lights/M_PointLight';
import M_AmbientLight from '../elements/lights/M_AmbientLight';
import M_SpotLight from '../elements/lights/M_SpotLight';
import M_Joint from '../elements/skeletons/M_Joint';
import M_AxisGizmo from '../elements/gizmos/M_AxisGizmo';
import M_GridGizmo from '../elements/gizmos/M_GridGizmo';
import M_SPVScreenMesh from '../elements/meshes/M_SPVScreenMesh';
import EffekseerElement from '../plugins/EffekseerElement';
import M_ScreenMesh from '../elements/meshes/M_ScreenMesh';


export default class GLBoostMiddleContext extends GLBoostLowContext {
  constructor(canvas, initParameter, gl, width, height) {
    super(canvas, initParameter, gl, width, height);

    this._glBoostMonitor = M_GLBoostMonitor.getInstance();
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

  createFrustumCamera(lookat, perspective) {
    return new M_FrustumCamera(this, true, lookat, perspective);
  }

  createOrthoCamera(lookat, ortho) {
    return new M_OrthoCamera(this, true, lookat, ortho);
  }

  createDirectionalLight(intensity, rotate, length) {
    return new M_DirectionalLight(this, intensity, rotate, length);
  }

  createPointLight(intensity) {
    return new M_PointLight(this, intensity);
  }

  createAmbientLight(intensity) {
    return new M_AmbientLight(this, intensity);
  }

  createSpotLight(intensity, rotate) {
    return new M_SpotLight(this, intensity, rotate);
  }

  createJoint(isExistJointGizmo) {
    return new M_Joint(this, isExistJointGizmo);
  }

  createAxisGizmo(length) {
    return new M_AxisGizmo(this, length);
  }

  createGridGizmo(length, division, isXZ, isXY, isYZ, colorVec) {
    return new M_GridGizmo(this, length, division, isXZ, isXY, isYZ, colorVec);
  }

  createEffekseerElement() {
    return new EffekseerElement(this);
  }

  createScreenMesh(customVertexAttributes) {
    return new M_ScreenMesh(this, customVertexAttributes);
  }
  
  createSPVScreenMesh(screens, customVertexAttributes) {
    return new M_SPVScreenMesh(this, screens, customVertexAttributes);
  }

}

GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;
