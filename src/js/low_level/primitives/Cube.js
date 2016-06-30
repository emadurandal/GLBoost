import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import MathUtil from '../../low_level/math/MathUtil';

export default class Cube extends Geometry {
  constructor(glBoostContext, widthVector, vertexColor) {
    super(glBoostContext);

    // if array, convert to vector[2/3/4]
    widthVector = MathUtil.arrayToVector(widthVector);
    vertexColor = MathUtil.arrayToVector(vertexColor);

    this._setupVertexData(widthVector.divide(2.0), vertexColor);
  }

  _setupVertexData(widthVector, vertexColor) {
    var indices = [
      3, 1, 0, 2, 1, 3,
      4, 5, 7, 7, 5, 6,
      8, 9, 11, 11, 9, 10,
      15, 13, 12, 14, 13, 15,
      19, 17, 16, 18, 17, 19,
      20, 21, 23, 23, 21, 22
    ];


    var positions = [
      // upper
      new Vector3(-widthVector.x, widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, widthVector.z),
      // lower
      new Vector3(-widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, -widthVector.y, widthVector.z),
      // front
      new Vector3(-widthVector.x, -widthVector.y, widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, widthVector.z),
      // back
      new Vector3(-widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, -widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, -widthVector.z),
      // right
      new Vector3(widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(widthVector.x, widthVector.y, -widthVector.z),
      // left
      new Vector3(-widthVector.x, -widthVector.y, -widthVector.z),
      new Vector3(-widthVector.x,  -widthVector.y, widthVector.z),
      new Vector3(-widthVector.x,  widthVector.y, widthVector.z),
      new Vector3(-widthVector.x, widthVector.y, -widthVector.z)
    ];
    var colors = [
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
    var texcoords = [
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

    var normals = [
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

    this.setVerticesData({
      position: positions,
      color: colors,
      normal: normals,
      texcoord: texcoords
    }, [indices]);
  }

}

GLBoost["Cube"] = Cube;
