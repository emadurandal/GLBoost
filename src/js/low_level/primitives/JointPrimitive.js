import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';
import Matrix44 from "../math/Matrix44";

export default class JointPrimitive extends Geometry {
  constructor(glBoostContext, length, lineCount = 1) {
    super(glBoostContext);

    this._worldPositionOfThisJoint = new Vector3(0, 0, 1);
    this._worldPositionOfParentJoint = new Vector3(0, 0, 0);
    this._vertexData = this._setupVertexData();
    this.setVerticesData(this._vertexData, null, GLBoost.LINES);
    this._width = 1;
  }

  _setupVertexData() {

    let length = Vector3.lengthBtw(this._worldPositionOfThisJoint, this._worldPositionOfParentJoint);
    let arrowWidth = this._width;
    let arrowheadLength = length/7.5;
    let arrowStickLength = length - arrowheadLength;

    let positions = [];

    const directionToParent = Vector3.subtract(this._worldPositionOfParentJoint, this._worldPositionOfThisJoint).normalize();
    const arrowStickPosition = Vector3.add(this._worldPositionOfThisJoint, Vector3.multiply(directionToParent, arrowStickLength));

    let dummyVector = new Vector3(0, 1, 0);
    let dummyVector2 = new Vector3(0, -1, 0);
    if (Math.abs(Vector3.dotProduct(directionToParent, dummyVector)) > 0.4) {
      dummyVector = new Vector3(1, 0, 0);
      dummyVector2 = new Vector3(-1, 0, 0);
    }
    if (Math.abs(Vector3.dotProduct(directionToParent, dummyVector)) > 0.4) {
      dummyVector = new Vector3(0, 0, 1);
      dummyVector2 = new Vector3(0, 0, -1);
    }
    const crossVector = Vector3.multiply(Vector3.cross(directionToParent, dummyVector).normalize(), arrowWidth);
    const crossVector2 = Vector3.multiply(Vector3.cross(directionToParent, crossVector).normalize(), arrowWidth);
    const crossVector3 = Vector3.multiply(Vector3.cross(directionToParent, dummyVector2).normalize(), arrowWidth);
    const crossVector4 = Vector3.multiply(Vector3.cross(directionToParent, crossVector3).normalize(), arrowWidth);
    //const crossVector = Matrix44.rotate(directionToParent)


    const crossPosition = Vector3.add(arrowStickPosition, crossVector);
    const crossPosition2 = Vector3.add(arrowStickPosition, crossVector2);
    const crossPosition3 = Vector3.add(arrowStickPosition, crossVector3);
    const crossPosition4 = Vector3.add(arrowStickPosition, crossVector4);


      // Long Pyramid
    positions.push(this._worldPositionOfThisJoint);
    positions.push(crossPosition);

    positions.push(this._worldPositionOfThisJoint);
    positions.push(crossPosition2);

    positions.push(this._worldPositionOfThisJoint);
    positions.push(crossPosition3);

    positions.push(this._worldPositionOfThisJoint);
    positions.push(crossPosition4);


    // Plane
    positions.push(crossPosition);
    positions.push(crossPosition2);

    positions.push(crossPosition2);
    positions.push(crossPosition3);
    positions.push(crossPosition3);
    positions.push(crossPosition4);
    positions.push(crossPosition4);
    positions.push(crossPosition);

    // Short Pyramid
    positions.push(this._worldPositionOfParentJoint);
    positions.push(crossPosition);

    positions.push(this._worldPositionOfParentJoint);
    positions.push(crossPosition2);

    positions.push(this._worldPositionOfParentJoint);
    positions.push(crossPosition3);

    positions.push(this._worldPositionOfParentJoint);
    positions.push(crossPosition4);

    this._vertexData = {
      position: positions
    };

    return this._vertexData;
  }

  set worldPositionOfThisJoint(vec) {
    this._worldPositionOfThisJoint = vec;
  }

  get worldPositionOfThisJoint() {
    return this._worldPositionOfThisJoint;
  }

  set worldPositionOfParentJoint(vec) {
    this._worldPositionOfParentJoint = vec;
  }

  get worldPositionOfParentJoint() {
    return this._worldPositionOfParentJoint;
  }

  set width(value) {
    this._width = value;
  }

  get width() {
    return this._width;
  }

  update() {
    this._vertexData = this._setupVertexData();
    this.updateVerticesData(this._vertexData, null, GLBoost.LINES);
  }

  set meshContainingSelf(jointGizmoMesh) {
    this._mesh = jointGizmoMesh;
  }

}

GLBoost["JointPrimitive"] = JointPrimitive;
