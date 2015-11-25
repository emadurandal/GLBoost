import GLBoost from './globals'
import Element from './Element'
import Matrix4x4 from './Matrix4x4'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import Shader from './Shader'
import SimpleShader from './SimpleShader'

export default class Mesh extends Element {
  constructor(canvas) {
    super();
    this._gl = GLContext.getInstance(canvas).gl;
    this._canvas = canvas;
    this._material = null;
    this._vertexN = 0;
    this._stride = 0;
    this._glslProgram = null;
    this._vertices = null;
    this._shader_for_non_material = new SimpleShader(this._canvas);
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
        if ((this._materials[0] !== null) && this._materials[0].diffuseTexture !== null) {
          attribNameArray.push(attribName);
        } else {
          delete vertices[GLBoost.TEXCOORD];
        }
      } else {
        if (attribName !== 'indices' && attribName !== 'normal') {
          attribNameArray.push(attribName);
        }
      }
    }

    return attribNameArray;
  }

  _getSheder(result, existCamera_f, pointLight) {
    return this._shader_for_non_material.getShaderProgram(result, existCamera_f, pointLight);
  }

  setVerticesData(vertices) {
    this._vertices = vertices;
  }

  prepareForRender(existCamera_f, pointLight) {
    var vertices = this._vertices;
    var gl = this._gl;

    var glem = GLExtentionsManager.getInstance(gl);

    var optimizedVertexAttribs = this._decideNeededVertexAttribs(vertices);

    // create VAO
    var vao = glem.createVertexArray(gl);
    glem.bindVertexArray(gl, vao);

    // create VBO
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

    var setVerticesLayout = (glslProgram)=> {
      optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

      this._stride = 0;
      optimizedVertexAttribs.forEach((attribName)=> {
        var numberOfComponentOfVector = (vertices[attribName][0].z === void 0) ? 2 : 3;
        this._stride += numberOfComponentOfVector * 4;
      });

      // 頂点レイアウト設定
      var offset = 0;
      optimizedVertexAttribs.forEach((attribName)=> {
        gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
        var numberOfComponentOfVector = (vertices[attribName][0].z === void 0) ? 2 : 3;
        gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
          numberOfComponentOfVector, gl.FLOAT, gl.FALSE, this._stride, offset);
        offset += numberOfComponentOfVector * 4;
      });
    };

    let materials = this._materials;
    if (materials) {
      for (let i=0; i<materials.length;i++) {
        // GLSLプログラム作成。
        var glslProgram = materials[i].shader.getShaderProgram(optimizedVertexAttribs, existCamera_f, pointLight);
        setVerticesLayout(glslProgram);
        materials[i].glslProgram = glslProgram;
      }
    } else {
      var glslProgram = this._getSheder(optimizedVertexAttribs, existCamera_f, pointLight);
      setVerticesLayout(glslProgram);
      this._glslProgram = glslProgram;
    }

    this._vertexN = vertices.position.length;

    var vertexData = [];

    vertices.position.forEach((elem, index, array) => {
      optimizedVertexAttribs.forEach((attribName)=> {
        var element = vertices[attribName][index];
        vertexData.push(element.x);
        vertexData.push(element.y);
        if (element.z !== void 0) {
          vertexData.push(element.z);
        }
      });
    });

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);


    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this._indicesBuffers = [];
    this._indicesNArray = [];
    if (vertices.indices) {
      // create Index Buffer
      for (let i=0; i<vertices.indices.length; i++) {
        this._indicesBuffers[i] = gl.createBuffer();
        this._indicesNArray[i] = vertices.indices[i].length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffers[i] );
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices.indices[i]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      }
    }
    glem.bindVertexArray(gl, null)

    this._vao = vao;

    // if this mesh has only one material...
    if (this._materials && this._materials.length === 1 && this._materials[0].faceN === 0) {
      if (vertices.indices && vertices.indices.length > 0) {
        this._materials[0].faceN = vertices.indices[0].length / 3;
      } else {
        this._materials[0].faceN = this._vertexN / 3;
      }
    }

  }

  draw(projectionAndViewMatrix, invNormalMatrix, pointLight) {
    var gl = this._gl;
    var glem = GLExtentionsManager.getInstance(gl);
    var materials = this._materials;

    glem.bindVertexArray(gl, this._vao);

    if (materials) {
      for (let i=0; i<materials.length;i++) {
        let glslProgram = materials[i].glslProgram;
        gl.useProgram(glslProgram);

        if (projectionAndViewMatrix) {
          var pv_m = projectionAndViewMatrix;
          gl.uniformMatrix4fv(glslProgram.projectionAndViewMatrix, false, new Float32Array(pv_m.flatten()));
        }

        if (typeof glslProgram.invNormalMatrix !== "undefined") {
          var in_m = invNormalMatrix;
          gl.uniformMatrix4fv(glslProgram.invNormalMatrix, false, new Float32Array(in_m.flatten()));
        }

        if (pointLight) {
          gl.uniformMatrix3f(glslProgram.lightPosition, pointLight.translate.x, pointLight.translate.y, pointLight.translate.z);
          gl.uniformMatrix4f(glslProgram.lightDiffuse, pointLight.intensity.x, pointLight.intensity.y, pointLight.intensity.z, 1.0);
        }

        if (materials[i]) {
          materials[i].setUp();
        }

        if (this._indicesBuffers.length > 0) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffers[i] );
          gl.drawElements(gl.TRIANGLES, materials[i].faceN*3, gl.UNSIGNED_SHORT, 0);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        } else {
          gl.drawArrays(gl.TRIANGLES, 0, this._vertexN);
        }

        if (materials[i]) {
          materials[i].tearDown();
        }
      }
    } else {
      gl.useProgram(this._glslProgram);

      if (projectionAndViewMatrix) {
        var pv_m = projectionAndViewMatrix;
        gl.uniformMatrix4fv(this._glslProgram.projectionAndViewMatrix, false, new Float32Array(pv_m.flatten()));
      }

      if (this._indicesBuffers.length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffers[0] );
        gl.drawElements(gl.TRIANGLES, this._indicesNArray[0], gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(gl.TRIANGLES, 0, this._vertexN);
      }
    }

    glem.bindVertexArray(gl, null);
  }

  set materials(materials) {
    this._materials = materials;
  }
}

GLBoost["Mesh"] = Mesh;
