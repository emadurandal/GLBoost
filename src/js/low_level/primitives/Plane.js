import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import ArrayUtil from '../../low_level/misc/ArrayUtil';

export default class Plane extends Geometry {
  constructor(glBoostContext, width, height, uSpan, vSpan, customVertexAttributes) {
    super(glBoostContext);

    this._setupVertexData(width, height, uSpan, vSpan, customVertexAttributes);
  }

  _setupVertexData(width, height, uSpan, vSpan, customVertexAttributes) {

    var positions = [];

    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        positions.push(new Vector3((j/uSpan - 1/2)*width, 0, (i/vSpan - 1/2)*height));
      }
    }

    var indices = [];
    for(let i=0; i<vSpan; i++) {
      let degenerate_left_index = 0;
      let degenerate_right_index = 0;
      for(let j=0; j<=uSpan; j++) {
        indices.push(i*(uSpan+1)+j);
        indices.push((i+1)*(uSpan+1)+j);
        if (j === 0) {
          degenerate_left_index = (i + 1) * (uSpan+1) + j;
        } else if (j === uSpan) {
          degenerate_right_index = (i + 1) * (uSpan+1) + j;
        }
      }
      indices.push(degenerate_right_index);
      indices.push(degenerate_left_index);
    }

    var colors = [];
    var vertexColor = new Vector4(1, 1, 1, 1);
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        colors.push(vertexColor);
      }
    }

    var texcoords = [];
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        texcoords.push(new Vector2(j/uSpan, 1.0-i/vSpan));
      }
    }

    var normal = new Vector3(0, 1, 0);
    var normals = [];
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        normals.push(normal);
      }
    }


    var object = {
      position: positions,
      color: colors,
      texcoord: texcoords,
      normal: normals
    };

    var completeAttributes = ArrayUtil.merge(object, customVertexAttributes);
    this.setVerticesData(completeAttributes, [indices], GLBoost.TRIANGLE_STRIP);
  }

}

GLBoost["Plane"] = Plane;
