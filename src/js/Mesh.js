import GLBoost from './globals'
import Element from './Element'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import ShaderManager from './ShaderManager'

export default class Mesh extends Element {
  constructor() {
    super();
  }

  setVerticesData(positons, colors) {
    var gl = GLContext.getInstance().gl;
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;
    var glslProgram = ShaderManager.getInstance(gl).simpleProgram;


    // create VAO
    var vao = extVAO.createVertexArrayOES();
    extVAO.bindVertexArrayOES(vao);

    // create VBO
    var squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    var vertexData = [];

    positons.forEach((element, index, array) => {
      vertexData.push(element.x);
      vertexData.push(element.y);
      vertexData.push(element.z);
      vertexData.push(colors[index].x);
      vertexData.push(colors[index].y);
      vertexData.push(colors[index].z);
    });

    // ストライド（頂点のサイズ）
    var stride = 24; // float6個分

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    // 頂点レイアウト設定
    // 位置
    gl.enableVertexAttribArray(glslProgram.vertexAttributePosition);
    gl.vertexAttribPointer(glslProgram.vertexAttributePosition, 3, gl.FLOAT, gl.FALSE, stride, 0)
    // 色
    gl.enableVertexAttribArray(glslProgram.vertexAttributeColor);
    gl.vertexAttribPointer(glslProgram.vertexAttributeColor, 3, gl.FLOAT, gl.FALSE, stride, 12)

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    extVAO.bindVertexArrayOES(null)

    this._vao = vao;
  }

  draw() {
    var gl = GLContext.getInstance().gl;
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;
    var glslProgram = ShaderManager.getInstance(gl).simpleProgram;

    // draw
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(glslProgram);

    extVAO.bindVertexArrayOES(this._vao);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    extVAO.bindVertexArrayOES(null);

  }
}

GLBoost["Mesh"] = Mesh;
