import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import ArrayUtil from '../../low_level/misc/ArrayUtil';

export default class Screen extends Geometry {
  constructor(glBoostContext, screen = 
    {
      unit: 'ratio', // or 'pixel'
      range: 'positive-negative', // or 'positive'
      origin: new Vector2(-1, -1),
      size: new Vector2(2, 2),
    }, customVertexAttributes = null) {
    super(glBoostContext);

    this._setupVertexData(screen, customVertexAttributes);
  }

  _setupVertexData(screen, customVertexAttributes) {
    let positions = [];
    let indices = [];
    let colors = [];
    let texcoords = [];
    let normals = [];

    let originX = screen.origin.x;
    let originY = screen.origin.y;
    let sizeX = screen.size.x;
    let sizeY = screen.size.y;

    if (screen.unit === 'pixel') {
      originX = originX/this._glContext.canvasWidth;
      originY = originY/this._glContext.canvasHeight;
      sizeX = sizeX/this._glContext.canvasWidth;
      sizeY = sizeY/this._glContext.canvasHeight;
    }
    if (screen.range === 'positive') {
      originX = (originX-0.5)*2;
      originY = (originY-0.5)*2;
      sizeX = sizeX*2;
      sizeY = sizeY*2;
    }

    screen.origin = new Vector2(originX, originY);
    screen.size = new Vector2(sizeX, sizeY);

    this._setupQuad(positions, indices, colors, texcoords, normals, screen.origin, screen.size, 1, 1, screen.uUVRepeat, screen.vUVRepeat);


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
        texcoords.push(new Vector2(j, i));
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

GLBoost["Screen"] = Screen;
