import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import MathUtil from '../../low_level/math/MathUtil';

export default class CubeAbsolute extends Geometry {
  constructor(glBoostContext) {
    super(glBoostContext);

    //this._

    const BIG_NUMBER = 999;
    this._vertexData = this._setupVertexData(
      new Vector3(-BIG_NUMBER, -BIG_NUMBER, -BIG_NUMBER),
      new Vector3(-BIG_NUMBER+1, -BIG_NUMBER+1, -BIG_NUMBER+1));
    this.setVerticesData(this._vertexData, [this._indices]);
  }

  _setupVertexData(minPosition, maxPosition, vertexColor) {
    this._indices = [
      3, 1, 0, 2, 1, 3,
      4, 5, 7, 7, 5, 6,
      8, 9, 11, 11, 9, 10,
      15, 13, 12, 14, 13, 15,
      19, 17, 16, 18, 17, 19,
      20, 21, 23, 23, 21, 22
    ];


    const positions = [
      // upper
      new Vector3(minPosition.x, maxPosition.y, minPosition.z),
      new Vector3(maxPosition.x, maxPosition.y, minPosition.z),
      new Vector3(maxPosition.x, maxPosition.y, maxPosition.z),
      new Vector3(minPosition.x, maxPosition.y, maxPosition.z),
      // lower
      new Vector3(minPosition.x, minPosition.y, minPosition.z),
      new Vector3(maxPosition.x, minPosition.y, minPosition.z),
      new Vector3(maxPosition.x, minPosition.y, maxPosition.z),
      new Vector3(minPosition.x, minPosition.y, maxPosition.z),
      // front
      new Vector3(minPosition.x, minPosition.y, maxPosition.z),
      new Vector3(maxPosition.x, minPosition.y, maxPosition.z),
      new Vector3(maxPosition.x, maxPosition.y, maxPosition.z),
      new Vector3(minPosition.x, maxPosition.y, maxPosition.z),
      // back
      new Vector3(minPosition.x, minPosition.y, minPosition.z),
      new Vector3(maxPosition.x, minPosition.y, minPosition.z),
      new Vector3(maxPosition.x, maxPosition.y, minPosition.z),
      new Vector3(minPosition.x, maxPosition.y, minPosition.z),
      // right
      new Vector3(maxPosition.x, minPosition.y, minPosition.z),
      new Vector3(maxPosition.x, minPosition.y, maxPosition.z),
      new Vector3(maxPosition.x, maxPosition.y, maxPosition.z),
      new Vector3(maxPosition.x, maxPosition.y, minPosition.z),
      // left
      new Vector3(minPosition.x, minPosition.y, minPosition.z),
      new Vector3(minPosition.x, minPosition.y, maxPosition.z),
      new Vector3(minPosition.x, maxPosition.y, maxPosition.z),
      new Vector3(minPosition.x, maxPosition.y, minPosition.z)
    ];
    if (vertexColor) {
      const colors = [
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),

        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w),
        new Vector4(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w)
      ];
    }

    const texcoords = [
      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0),

      new Vector2(0.0, 0.0),
      new Vector2(1.0, 0.0),
      new Vector2(1.0, 1.0),
      new Vector2(0.0, 1.0)
    ];

    const normals = [
      // upper
      new Vector3(0, 1, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 1, 0),
      // lower
      new Vector3(0, -1, 0),
      new Vector3(0, -1, 0),
      new Vector3(0, -1, 0),
      new Vector3(0, -1, 0),
      // front
      new Vector3(0, 0, 1),
      new Vector3(0, 0, 1),
      new Vector3(0, 0, 1),
      new Vector3(0, 0, 1),
      // back
      new Vector3(0, 0, -1),
      new Vector3(0, 0, -1),
      new Vector3(0, 0, -1),
      new Vector3(0, 0, -1),
      // right
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 0),
      // left
      new Vector3(-1, 0, 0),
      new Vector3(-1, 0, 0),
      new Vector3(-1, 0, 0),
      new Vector3(-1, 0, 0),
    ];

    this._vertexData ={
      position: positions,
      normal: normals,
      texcoord: texcoords
    };

    return this._vertexData;
  }

  update(minPosition, maxPosition) {
    this._vertexData = this._setupVertexData(minPosition, maxPosition);
    this.updateVerticesData(this._vertexData, [this._indices]);
  }

}

GLBoost["CubeAbsolute"] = CubeAbsolute;
