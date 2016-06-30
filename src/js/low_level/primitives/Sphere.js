import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';

export default class Sphere extends Geometry {
  constructor(glBoostContext, radius, widthSegments, heightSegments, vertexColor) {
    super(glBoostContext);

    this._setupVertexData(radius, widthSegments, heightSegments, vertexColor);
  }

  _setupVertexData(radius, widthSegments, heightSegments, vertexColor) {

    // See below:
    // WebGL Lesson 11 - spheres, rotation matrices, and mouse events
    // http://learningwebgl.com/blog/?p=1253
    //
    var positions = [];
    var texcoords = [];
    var colors = [];
    var normals = [];

    if (!vertexColor) {
      vertexColor = new Vector4(1, 1, 1, 1);
    }

    for (var latNumber = 0; latNumber <= heightSegments; latNumber++) {
      var theta = latNumber * Math.PI / heightSegments;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber = 0; longNumber <= widthSegments; longNumber++) {
        var phi = longNumber * 2 * Math.PI / widthSegments;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = radius * cosPhi * sinTheta;
        var y = radius * cosTheta;
        var z = radius * sinPhi * sinTheta;
        var position = new Vector3(x, y, z);
        positions.push(position);
        var u = 1 - (longNumber / widthSegments);
        var v = latNumber / heightSegments;
        texcoords.push(new Vector2(u, v));
        colors.push(vertexColor);
        normals.push(Vector3.normalize(position));
      }
    }
    
    // first    first+1
    //    +-------+
    //    |     / |
    //    |   /   |
    //    | /     |
    //    +-------+
    // second   second+1
    //
    var indices = [];
    for (var latNumber = 0; latNumber < heightSegments; latNumber++) {
      for (var longNumber = 0; longNumber < widthSegments; longNumber++) {
        var first = (latNumber * (widthSegments + 1)) + longNumber;
        var second = first + widthSegments + 1;
        
        indices.push(first + 1);
        indices.push(second);
        indices.push(first);
        
        indices.push(first + 1);
        indices.push(second + 1);
        indices.push(second);
      }
    }

    var object = {
      position: positions,
      color: colors,
      texcoord: texcoords,
      normal: normals
    };

    this.setVerticesData(object, [indices], GLBoost.TRIANGLES);
  }

}

GLBoost["Sphere"] = Sphere;