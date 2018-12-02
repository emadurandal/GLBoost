import MathPlane from "./Matrix44";
import MathPlane from "./MathPlane";

export default class Frustum {
  top: MathPlane;
  bottom: MathPlane;
  right: MathPlane;
  left: MathPlane;
  zNear: MathPlane;
  zFar: MathPlane;

  constructor() {
    this.top = new MathPlane();
    this.bottom = new MathPlane();
    this.right = new MathPlane();
    this.left = new MathPlane();
    this.zNear = new MathPlane();
    this.zFar = new MathPlane();
  }

  calcFrustumFromViewProjectionMatrix(viewMatrix: Matrix44, projectionMatrix: Matrix44) {
    const vpMatrix = Matrix44.multiply(viewMatrix, projectionMatrix);

    this.zNear.x = vpMatrix.m20 + vpMatrix.m30;
    this.zNear.y = vpMatrix.m21 + vpMatrix.m31;
    this.zNear.z = vpMatrix.m22 + vpMatrix.m32;
    this.zNear.w = vpMatrix.m23 + vpMatrix.m33;

    this.zFar.x = -vpMatrix.m20 + vpMatrix.m30;
    this.zFar.y = -vpMatrix.m21 + vpMatrix.m31;
    this.zFar.z = -vpMatrix.m22 + vpMatrix.m32;
    this.zFar.w = -vpMatrix.m23 + vpMatrix.m33;

    this.bottom.x = vpMatrix.m10 + vpMatrix.m30;
    this.bottom.y = vpMatrix.m11 + vpMatrix.m31;
    this.bottom.z = vpMatrix.m12 + vpMatrix.m32;
    this.bottom.w = vpMatrix.m13 + vpMatrix.m33;

    this.top.x = -vpMatrix.m10 + vpMatrix.m30;
    this.top.y = -vpMatrix.m11 + vpMatrix.m31;
    this.top.z = -vpMatrix.m12 + vpMatrix.m32;
    this.top.w = -vpMatrix.m13 + vpMatrix.m33;

    this.left.x = vpMatrix.m00 + vpMatrix.m30;
    this.left.y = vpMatrix.m01 + vpMatrix.m31;
    this.left.z = vpMatrix.m02 + vpMatrix.m32;
    this.left.w = vpMatrix.m03 + vpMatrix.m33;

    this.right.x = -vpMatrix.m00 + vpMatrix.m30;
    this.right.y = -vpMatrix.m01 + vpMatrix.m31;
    this.right.z = -vpMatrix.m02 + vpMatrix.m32;
    this.right.w = -vpMatrix.m03 + vpMatrix.m33;
  }
}
