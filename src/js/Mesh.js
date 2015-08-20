import GLBoost from './globals'
import Element from './Element'
import Matrix4x4 from './Matrix4x4'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import SimpleShader from './SimpleShader'

export default class Mesh extends Element {
  constructor() {
    super();
    this._gl = GLContext.getInstance().gl;
    this._material = null;
    this._vertexN = 0;
    this._stride = 0;
    this._glslProgram = null;
    this._vertices = null;
  }

  /**
   * データとして利用する頂点属性を判断し、そのリストを返す
   * 不必要な頂点属性のデータは無視する。
   */
  _decideNeededVertexAttribs(vertices) {
    var attribNameArray = [];
    for (var attribName in vertices) {
      if (attribName === GLBoost.TEXCOORD) {
        // texcoordの場合は、テクスチャ付きのマテリアルをちゃんと持っているときに限り、'texcoord'が有効となる
        if ((this._material !== null) && this._material.diffuseTexture !== null) {
          attribNameArray.push(attribName);
        } else {
          delete vertices[GLBoost.TEXCOORD];
        }
      } else {
        attribNameArray.push(attribName);
      }
    }

    return attribNameArray;
  }

  _getSheder(result, existCamera_f) {
    return SimpleShader.getInstance().getShaderProgram(result, existCamera_f);
  }

  setVerticesData(vertices) {
    this._vertices = vertices;
  }

  prepareForRender(existCamera_f) {
    var vertices = this._vertices;
    var gl = this._gl;
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;

    // GLSLプログラム作成。
    var optimizedVertexAttrib = this._decideNeededVertexAttribs(vertices);
    var glslProgram = this._getSheder(optimizedVertexAttrib, existCamera_f);

    // create VAO
    var vao = extVAO.createVertexArrayOES();
    extVAO.bindVertexArrayOES(vao);

    // create VBO
    var squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    this._vertexN = vertices.position.length;

    var vertexData = [];

    this._stride = 0;
    vertices.position.forEach((elem, index, array) => {
      optimizedVertexAttrib.forEach((attribName)=> {
        var element = vertices[attribName][index];
        vertexData.push(element.x);
        vertexData.push(element.y );
        if (element.z !== void 0) {
          vertexData.push(element.z);
        }
      });
    });

    optimizedVertexAttrib.forEach((attribName)=> {
      var numberOfComponentOfVector = (vertices[attribName][0].z === void 0) ? 2 : 3;
      this._stride += numberOfComponentOfVector * 4;
    });

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    // 頂点レイアウト設定
    var offset = 0;
    optimizedVertexAttrib.forEach((attribName)=> {
      gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
      var numberOfComponentOfVector = (vertices[attribName][0].z === void 0) ? 2 : 3;
      gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
        numberOfComponentOfVector, gl.FLOAT, gl.FALSE, this._stride, offset);
      offset += numberOfComponentOfVector * 4;
    });
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    extVAO.bindVertexArrayOES(null)

    this._vao = vao;
    this._glslProgram = glslProgram;
  }

  draw(projectionAndViewMatrix) {
    var gl = GLContext.getInstance().gl;
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;
    var material = this._material;

    gl.useProgram(this._glslProgram);

    if (projectionAndViewMatrix) {
      var pv_m = projectionAndViewMatrix;
      gl.uniformMatrix4fv(this._glslProgram.projectionAndViewMatrix, false, new Float32Array(pv_m.flatten()));
    }

    extVAO.bindVertexArrayOES(this._vao);

    if (material) {
      material.setUp();
    }

    gl.drawArrays(gl.TRIANGLES, 0, this._vertexN);

    if (material) {
      material.tearDown();
    }

    extVAO.bindVertexArrayOES(null);

  }

  set material(mat) {
    this._material = mat;
  }
}

GLBoost["Mesh"] = Mesh;
