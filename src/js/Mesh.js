import GLBoost from './globals'
import Element from './Element'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import ShaderManager from './Shader'

export default class Mesh extends Element {
  constructor() {
    super();
    this._material = null;
    this._vertexN = 0;
    this._stride = 0;
    this._glslProgram = null;
  }

  // シェーダーで有効にする機能を判断する。また、状況に応じて、意味のない頂点データは破棄する。
  _decideAndModifyShaderFunctions(vertices) {
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

  _getSheder(result) {
    return ShaderManager.getInstance().getSimpleShaderPrograms(result);
  }

  setVerticesData(vertices) {
    var gl = GLContext.getInstance().gl;
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;

    // GLSLプログラム作成。
    var result = this._decideAndModifyShaderFunctions(vertices);
    var glslProgram = this._getSheder(result);

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
      for (var attribName in vertices) {
        var element = vertices[attribName][index];
        vertexData.push(element.x);
        vertexData.push(element.y );
        if (element.z !== void 0) {
          vertexData.push(element.z);
        }
      }
    });

    for (var attribName in vertices) {
      var numberOfComponentOfVector = (vertices[attribName][0].z === void 0) ? 2 : 3;
      this._stride += numberOfComponentOfVector * 4;
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    // 頂点レイアウト設定
    var offset = 0;
    for (var attribName in vertices) {
      gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
      var numberOfComponentOfVector = (vertices[attribName][0].z === void 0) ? 2 : 3;
      gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
        numberOfComponentOfVector, gl.FLOAT, gl.FALSE, this._stride, offset);
      offset += numberOfComponentOfVector * 4;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    extVAO.bindVertexArrayOES(null)

    this._vao = vao;
    this._glslProgram = glslProgram;
  }

  draw() {
    var gl = GLContext.getInstance().gl;
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;
    var material = this._material;
    // draw
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this._glslProgram);

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
