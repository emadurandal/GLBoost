import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import ArrayUtil from '../../low_level/misc/ArrayUtil';

export default class SPVScreen extends Geometry {
  constructor(glBoostContext,
              layout = {
                preset: null, // or 'one', 'two horizontal split', 'two vertical split', 'four'. If these are specified, 'screens' properties are ignored.
                screens: [
                  {
                    unit: 'ratio', // 'pixel'
                    range: 'positive', // 'positive-negative'
                    origin: new Vector2(-1, -1),
                    size: new Vector2(2, 2),
                    uDivision: 0,
                    vDivision: 0,
                    uUVRepeat: false,
                    vUVRepeat: false
                  }
                ],
              },
              customVertexAttributes = null) {
    super(glBoostContext);

    this._setupVertexData(layout, customVertexAttributes);
  }

  _setupVertexData(layout, customVertexAttributes) {

    let screens = [];
    if (layout.preset === 'one') {
      screens[0] = {
        unit: 'ratio', // or 'pixel'
        origin: new Vector2(-1, -1),
        size: new Vector2(2, 2),
        uDivision: 0,
        vDivision: 0,
        uUVRepeat: false,
        vUVRepeat: false
      };
    }


    let positions = [];
    let indices = [];
    let colors = [];
    let texcoords = [];
    let normals = [];

    for (let screen of screens) {
      if (screen.unit === 'pixel') {
        
      }
      this._setupQuad(positions, indices, colors, texcoords, normals, screen.origin, screen.size, screen.uDivision+1, screen.vDivision+1, screen.uUVRepeat, screen.vUVRepeat);
    }


    let object = {
      position: positions,
      color: colors,
      texcoord: texcoords,
      normal: normals
    };

    let completeAttributes = ArrayUtil.merge(object, customVertexAttributes);
    this.setVerticesData(completeAttributes, [indices], GLBoost.TRIANGLE_STRIP);
  }

  _setupQuad(positions, indices, colors, texcoords, normals, originInRatioVec2, sizeInRatioVec2, uSpan, vSpan, uUVRepeat, vUVRepeat) {
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        positions.push(new Vector3(originInRatioVec2.x + (j/uSpan)*sizeInRatioVec2.x, originInRatioVec2.y + (i/vSpan)*sizeInRatioVec2.y, 0));
      }
    }

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

    let vertexColor = new Vector4(1, 1, 1, 1);
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        colors.push(vertexColor);
      }
    }

    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        let uSpanToDivide = uUVRepeat ? 1 : uSpan;
        let vSpanToDivide = vUVRepeat ? 1 : vSpan;
        texcoords.push(new Vector2(j/uSpanToDivide, i/vSpanToDivide));
      }
    }

    let normal = new Vector3(0, 0, -1); // specify -1 because This Screen geometry assumes that It doesn't use a projection matrix.
    for(let i=0; i<=vSpan; i++) {
      for(let j=0; j<=uSpan; j++) {
        normals.push(normal);
      }
    }
  }
}

GLBoost["SPVScreen"] = SPVScreen;
