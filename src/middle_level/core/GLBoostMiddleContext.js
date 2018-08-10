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
import M_OutlineGizmo from '../elements/gizmos/M_OutlineGizmo';
import M_HeightLineGizmo from '../elements/gizmos/M_HeightLineGizmo';
import EffekseerElement from '../plugins/EffekseerElement';
import M_ScreenMesh from '../elements/meshes/M_ScreenMesh';


export default class GLBoostMiddleContext extends GLBoostLowContext {
  constructor(canvas, initParameter, gl, width, height) {
    super(canvas, initParameter, gl, width, height);

    this._glBoostMonitor = M_GLBoostMonitor.getInstance();
  }

  createScene() {
    return new M_Scene(this.__system);
  }

  createGroup() {
    return new M_Group(this.__system);
  }

  createMesh(geometry, material) {
    return new M_Mesh(this.__system, geometry, material);
  }

  createSkeletalMesh(geometry, material, rootJointName) {
    return new M_SkeletalMesh(this.__system, geometry, material, rootJointName);
  }

  createSkeletalGeometry() {
    return new M_SkeletalGeometry(this.__system);
  }

  createRenderer(parameters) {
    return new Renderer(this.__system, parameters);
  }

  createExpression() {
    return this.createExpressionAndRenderPasses(1);
  }

  createExpressionAndRenderPasses(number) {
    var expression = new Expression(this.__system);
    var renderPasses = this.createRenderPasses(number);
    expression.addRenderPasses(renderPasses);

    return expression;
  }

  createRenderPasses(number) {
    var renderPasses = [];
    for (let i=0; i<number; i++) {
      renderPasses.push(new RenderPass(this.__system));
    }

    return renderPasses;
  }

  createPerspectiveCamera(lookat, perspective) {
    return new M_PerspectiveCamera(this.__system, true, lookat, perspective);
  }

  createFrustumCamera(lookat, perspective) {
    return new M_FrustumCamera(this.__system, true, lookat, perspective);
  }

  createOrthoCamera(lookat, ortho) {
    return new M_OrthoCamera(this.__system, true, lookat, ortho);
  }

  createDirectionalLight(intensity, rotate, length) {
    return new M_DirectionalLight(this.__system, intensity, rotate, length);
  }

  createPointLight(intensity) {
    return new M_PointLight(this.__system, intensity);
  }

  createAmbientLight(intensity) {
    return new M_AmbientLight(this.__system, intensity);
  }

  createSpotLight(intensity, rotate) {
    return new M_SpotLight(this.__system, intensity, rotate);
  }

  createJoint(isExistJointGizmo) {
    return new M_Joint(this.__system, isExistJointGizmo);
  }

  createAxisGizmo(length) {
    return new M_AxisGizmo(this.__system, length);
  }

  createGridGizmo(length, division, isXZ, isXY, isYZ, colorVec) {
    return new M_GridGizmo(this.__system, length, division, isXZ, isXY, isYZ, colorVec);
  }

  createOutlineGizmo(mesh) {
    return new M_OutlineGizmo(this.__system, mesh);
  }


  createHeightLineGizmo(startPos, endPos) {
    return new M_HeightLineGizmo(this.__system, startPos, endPos);
  }

  createEffekseerElement() {
    return new EffekseerElement(this.__system);
  }

  createScreenMesh(customVertexAttributes) {
    return new M_ScreenMesh(this.__system, customVertexAttributes);
  }

}

GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;
