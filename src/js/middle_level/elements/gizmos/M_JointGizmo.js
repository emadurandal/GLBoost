import GLBoost from '../../../globals';
import M_Gizmo from './M_Gizmo';
import JointPrimitive from '../../../low_level/primitives/JointPrimitive';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';
import M_Mesh from '../meshes/M_Mesh';
import Vector3 from '../../../low_level/math/Vector3';
import Vector4 from '../../../low_level/math/Vector4';
import MathUtil from '../../../low_level/math/MathUtil';
import Matrix44 from '../../../low_level/math/Matrix44';

export default class M_JointGizmo extends M_Gizmo {
  constructor(glBoostContext, joint, length) {
    super(glBoostContext, null, null);
    this._init(glBoostContext, joint, length);

    this.isVisible = false;

    this.baseColor = new Vector4(0.0, 1.0, 1.0, 0.25);
  }

  _init(glBoostContext, joint, length) {
    this._joint = joint;
    this._primitive = new JointPrimitive(this._glBoostContext, length, 1);
    this._mesh = new M_Mesh(glBoostContext,
      this._primitive,
      null
    );

    this._mesh.masterElement = this;
//    this._mesh.rotate = new Vector3(-Math.PI/2, 0, 0);

    this.addChild(this._mesh);
  }

  set baseColor(colorVec) {
    this._primitive.color = colorVec;
  }

  get baseColor() {
    return this._primitive.color;
  }

  // Use master element's worldMatrix.
  get worldMatrixInner() {
    return Matrix44.identity();
  }

  set worldPositionOfThisJoint(vec3) {
    this._primitive.worldPositionOfThisJoint = vec3;
  }

  get worldPositionOfThisJoint() {
    return this._primitive.worldPositionOfThisJoint;
  }

  set worldPositionOfParentJoint(vec3) {
    this._primitive.worldPositionOfParentJoint = vec3;
  }

  get worldPositionOfParentJoint() {
    return this._primitive.worldPositionOfParentJoint;
  }

  set width(value) {
    this._primitive.width = value;
  }

  get width() {
    return this._primitive.width;
  }

  update() {
    this._primitive.update();
  }

  set isVisible(flag) {
    this._mesh.isVisible = flag;
  }

  get isVisible() {
    return this._mesh.isVisible;
  }

}

GLBoost['M_JointGizmo'] = M_JointGizmo;
