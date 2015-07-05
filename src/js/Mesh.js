export default class Mesh {
  constructor() {

  }

  setVerticesData() {
    var extVAO = GLExtentionsManager.getInstance(gl).extVAO;
    var glslProgram = ShaderManager.getInstance(gl).simpleProgram;


    // create VAO
    var vao = extVAO.createVertexArrayOES();
    extVAO.bindVertexArrayOES(vao);

    // create VBO
    var squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    var vertexData = new Float32Array([
      // posx posy posz colr colg colb
      -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
      0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
      0.0,  0.5, 0.0, 0.0, 0.0, 1.0
    ]);
    // ストライド（頂点のサイズ）
    var stride = 24; // float6個分

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    // 頂点レイアウト設定
    // 位置
    gl.enableVertexAttribArray(glslProgram.vertexAttributePosition);
    gl.vertexAttribPointer(glslProgram.vertexAttributePosition, 3, gl.FLOAT, gl.FALSE, stride, 0)
    // 色
    gl.enableVertexAttribArray(glslProgram.vertexAttributeColor);
    gl.vertexAttribPointer(glslProgram.vertexAttributeColor, 2, gl.FLOAT, gl.FALSE, stride, 12)

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    extVAO.bindVertexArrayOES(null)

    this._vao = vao;
  }
}
