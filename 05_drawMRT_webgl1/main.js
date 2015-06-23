var horizAspect = 480.0/640.0;

var fbo;
var texture_0;
var texture_1;

function initFrameBufferObject()
{
  // Create FBO
  fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  fbo.width = 512;
  fbo.height = 512;
  
  // Create Texture 0
  texture_0 = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture_0);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fbo.width, fbo.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  // Create Texture 1
  texture_1 = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture_1);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fbo.width, fbo.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  // Create RenderBuffer
  var renderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbo.width, fbo.height);

  // Attach Buffers
  gl.framebufferTexture2D(gl.FRAMEBUFFER, extDBs.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, texture_0, 0);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, extDBs.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, texture_1, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function initVertexBuffers()
{
  // create VAO
  vao = extVAO.createVertexArrayOES();
  extVAO.bindVertexArrayOES(vao);
  
  // create VBO
  var squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  
  vertexData = new Float32Array([
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
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttributePosition)
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttributePosition, 3, gl.FLOAT, gl.FALSE, stride, 0)
  // 色
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttributeColor)
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttributeColor, 3, gl.FLOAT, gl.FALSE, stride, 12)
  
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  extVAO.bindVertexArrayOES(null)
}

function initVertexBuffersForDisplayFBO()
{
  // create VAO
  vaoFbo = extVAO.createVertexArrayOES();
  extVAO.bindVertexArrayOES(vaoFbo);
  
  // create VBO
  var squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  
  vertexData = new Float32Array([
  // posx posy posz texu texv 
     -1.0,  -1.0, 0.0, 0.0, 0.0,
     1.0,  -1.0, 0.0, 1.0, 0.0,
     -1.0,  1.0, 0.0, 0.0, 1.0,
     1.0,  1.0, 0.0, 1.0, 1.0
  ]);
  // ストライド（頂点のサイズ）
  var stride = 20; // float5個分
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  
  // 頂点レイアウト設定
  // 位置
  gl.enableVertexAttribArray(shaderFBOProgram.vertexPositionAttributePosition)
  gl.vertexAttribPointer(shaderFBOProgram.vertexPositionAttributePosition, 3, gl.FLOAT, gl.FALSE, stride, 0)
  // 色
  gl.enableVertexAttribArray(shaderFBOProgram.vertexPositionAttributeTexCoord)
  gl.vertexAttribPointer(shaderFBOProgram.vertexPositionAttributeTexCoord, 2, gl.FLOAT, gl.FALSE, stride, 12)
  
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  extVAO.bindVertexArrayOES(null)
}


function drawPolygonToFBO()
{
  // bind FBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  
  // draw
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
  
  extDBs.drawBuffersWEBGL([extDBs.COLOR_ATTACHMENT0_WEBGL, extDBs.COLOR_ATTACHMENT1_WEBGL]);
  gl.useProgram(shaderProgram);
  loadIdentity();
  mvTranslate([-0.0, 0.0, -6.0]);
  
  extVAO.bindVertexArrayOES(vao);
  setMatrixUniforms();
  
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  extVAO.bindVertexArrayOES(null);
  // disbind FBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  
//  gl.drawBuffer(gl.FRONT); // misstake
    extDBs.drawBuffersWEBGL([gl.FRONT]);
}

function drawFBOtoScreen()
{
  gl.useProgram(shaderFBOProgram);
  extVAO.bindVertexArrayOES(vaoFbo);
  gl.bindTexture(gl.TEXTURE_2D, texture_0);
  gl.uniform1i(shaderFBOProgram.samplerUniform, 0); 
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  extVAO.bindVertexArrayOES(null);
}

function drawScene()
{
  drawPolygonToFBO();
  drawFBOtoScreen();
}

initVertexBuffers();
initVertexBuffersForDisplayFBO();
initFrameBufferObject();

var startTime = getTime();
var fps = 30.0;
var frameLength = 6.0;

// http://yomotsu.net/blog/2013/01/05/fps.html
( function loop(){
  requestAnimationFrame( loop );
  var lastTime = getTime();
  var frame = Math.floor( ( lastTime - startTime ) / ( 1000.0 / fps ) % frameLength );
//  console.log( frame );

  drawScene();
  
} )();
