import GLBoost from './../globals'
import Element from './../Element'
import GLContext from './../GLContext'
import GLExtentionsManager from './../GLExtentionsManager'
import Mesh from './../Mesh'
import Vector4 from './../math/Vector4'
import Vector3 from './../math/Vector3'
import Vector2 from './../math/Vector2'

export default class Cube extends Mesh {
  constructor(widthVector, vertexColor, canvas) {
    super(canvas);

    Cube._instanceCount = (typeof Cube._instanceCount === "undefined") ? 0 : (Cube._instanceCount + 1);

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

    this.setVerticesData({
      position: positions,
      color: colors,
      texcoord: texcoords,
      indices: [indices]
    });
  }

  toString() {
    return 'Cube_' + Cube._instanceCount;
  }

}

GLBoost["Cube"] = Cube;
