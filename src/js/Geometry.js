import GLBoost from './globals'
import Matrix44 from './math/Matrix44'
import Vector4 from './math/Vector4'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import Shader from './shaders/Shader'
import SimpleShader from './shaders/SimpleShader'
import PointLight from './lights/PointLight'
import DirectionalLight from './lights/DirectionalLight'

export default class Geometry {
  constructor(canvas) {
    this._gl = GLContext.getInstance(canvas).gl;
    this._canvas = canvas;
    this._materials = [];
    this._vertexN = 0;
    this._glslProgram = null;
    this._vertices = null;
    this._vertexAttribComponentNDic = {};
    this._shader_for_non_material = new SimpleShader(this._canvas);
    this._dirty = true;

    if (this.constructor === Geometry) {
      Geometry._instanceCount = (typeof Geometry._instanceCount === "undefined") ? 0 : (Geometry._instanceCount + 1);
      this._instanceName = Geometry.name + '_' + Geometry._instanceCount;
    }
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
        if ((this._materials[0] !== void 0) && this._materials[0].diffuseTexture !== null) {
          attribNameArray.push(attribName);
        } else {
          //delete vertices[GLBoost.TEXCOORD];
        }
      } else {
        if (attribName !== 'indices') {// && attribName !== 'normal') {
          attribNameArray.push(attribName);
        }
      }
    }

    return attribNameArray;
  }

  _getSheder(result, existCamera_f, lights) {
    return this._shader_for_non_material.getShaderProgram(result, existCamera_f, lights);
  }

  setVerticesData(vertices, primitiveType) {
    this._vertices = vertices;
    this._primitiveType = (primitiveType) ? primitiveType : GLBoost.TRIANGLES;
    this._dirty = true;
  }

  setUpVertexAttribs(gl, glslProgram) {
    var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

    var stride = 0;
    optimizedVertexAttribs.forEach((attribName)=> {
      stride += this._vertexAttribComponentNDic[attribName] * 4;
    });

    // 頂点レイアウト設定
    var offset = 0;
    optimizedVertexAttribs.forEach((attribName)=> {
      gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
      gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
        this._vertexAttribComponentNDic[attribName], gl.FLOAT, gl.FALSE, stride, offset);
      offset += this._vertexAttribComponentNDic[attribName] * 4;
    });
  }

  prepareForRender(existCamera_f, lights) {
    // TODO: Add prepare skipping using dirty flag

    var vertices = this._vertices;
    var gl = this._gl;

    var glem = GLExtentionsManager.getInstance(gl);

    var optimizedVertexAttribs = this._decideNeededVertexAttribs(vertices);

    optimizedVertexAttribs.forEach((attribName)=> {
      this._vertexAttribComponentNDic[attribName] = (vertices[attribName][0].z === void 0) ? 2 : ((vertices[attribName][0].w === void 0) ? 3 : 4);
    });

    // create VAO
    if (Geometry._vaoDic[this.toString()]) {
      return;
    }
    var vao = glem.createVertexArray(gl);
    glem.bindVertexArray(gl, vao);
    Geometry._vaoDic[this.toString()] = vao;

    // create VBO
    if (Geometry._vboDic[this.toString()]) {
      return;
    }
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    Geometry._vboDic[this.toString()] = vbo;

    let materials = this._materials;
    if (materials.length > 0) {
      for (let i=0; i<materials.length;i++) {
        // GLSLプログラム作成。
        var glslProgram = materials[i].shader.getShaderProgram(optimizedVertexAttribs, existCamera_f, lights);
        this.setUpVertexAttribs(gl, glslProgram);
        optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;
        materials[i].glslProgram = glslProgram;
      }
    } else {
      var glslProgram = this._getSheder(optimizedVertexAttribs, existCamera_f, lights);
      this.setUpVertexAttribs(gl, glslProgram);
      optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;
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
        if (element.w !== void 0) {
          vertexData.push(element.w);
        }
      });
    });

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);


    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //this._ibo = [];
    //this._indicesNArray = [];
    Geometry._iboArrayDic[this.toString()] = [];
    Geometry._idxNArrayDic[this.toString()] = [];
    if (vertices.indices) {
      // create Index Buffer
      for (let i=0; i<vertices.indices.length; i++) {
        //this._ibo[i] = gl.createBuffer();
        //this._indicesNArray[i] = vertices.indices[i].length;
        var ibo = gl.createBuffer();
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo[i] );
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo );
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices.indices[i]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        Geometry._iboArrayDic[this.toString()][i] = ibo;
        Geometry._idxNArrayDic[this.toString()][i] = vertices.indices[i].length;
      }
    }
    glem.bindVertexArray(gl, null);

    // if this mesh has only one material...
    if (this._materials && this._materials.length === 1 && this._materials[0].getVertexN(this) === 0) {
      if (vertices.indices && vertices.indices.length > 0) {
        this._materials[0].setVertexN(this, vertices.indices[0].length);
      } else {
        this._materials[0].setVertexN(this, this._vertexN);
      }
    }

    this._dirty = false;

    return true;
  }

  draw(lights, camera, mesh) {
    var gl = this._gl;
    var glem = GLExtentionsManager.getInstance(gl);
    var materials = this._materials;

    var isVAOBound = false;
    if (Geometry._lastGeometry !== this.toString()) {
      isVAOBound = glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);
    }


    if (materials.length > 0) {
      for (let i=0; i<materials.length;i++) {
        if (materials[i].toString() !== Geometry._lastMaterial) {
          let glslProgram = materials[i].glslProgram;
          gl.useProgram(glslProgram);

          if (!isVAOBound) {
            if (Geometry._lastGeometry !== this.toString()) {
              gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);
              this.setUpVertexAttribs(gl, glslProgram);
            }
          }
        }

        let glslProgram = materials[i].glslProgram;
        if (camera) {
          var viewMatrix = camera.lookAtRHMatrix();
          var projectionMatrix = camera.perspectiveRHMatrix();
          var mvp_m = projectionMatrix.clone().multiply(viewMatrix).multiply(mesh.transformMatrix);
          gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.transpose().flatten()));
        }

        lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);
        if (lights.length !== 0) {
          if (glslProgram['viewPosition']) {
            if (camera) {
              var cameraPosInLocalCoord = mesh.inverseTransformMatrix.multiplyVector(new Vector4(camera.eye.x, camera.eye.y, camera.eye.z, 1));
            } else {
              var cameraPosInLocalCoord = mesh.inverseTransformMatrix.multiplyVector(new Vector4(0, 0, 1, 1));
            }
            gl.uniform3f(glslProgram['viewPosition'], cameraPosInLocalCoord.x, cameraPosInLocalCoord.y, cameraPosInLocalCoord.z);
          }

          for(let j=0; j<lights.length; j++) {
            if (glslProgram[`lightPosition_${j}`] && glslProgram[`lightDiffuse_${j}`]) {
              let lightVec = null;
              let isPointLight = -9999;
              if (lights[j] instanceof PointLight) {
                lightVec = new Vector4(lights[j].translate.x, lights[j].translate.y, lights[j].translate.z, 1);
                isPointLight = 1.0;
              } else if (lights[j] instanceof DirectionalLight) {
                lightVec = new Vector4(-lights[j].direction.x, -lights[j].direction.y, -lights[j].direction.z, 1);
                isPointLight = 0.0;
              }

              let lightVecInLocalCoord = mesh.inverseTransformMatrix.multiplyVector(lightVec);
              gl.uniform4f(glslProgram[`lightPosition_${j}`], lightVecInLocalCoord.x, lightVecInLocalCoord.y, lightVecInLocalCoord.z, isPointLight);

              gl.uniform4f(glslProgram[`lightDiffuse_${j}`], lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0);
            }
          }
        }

        let isMaterialSetupDone = true;

        if (materials[i].toString() !== Geometry._lastMaterial) {
          if (typeof materials[i].shader.setUniforms !== "undefined") {
            materials[i].shader.setUniforms(gl, glslProgram);
          }

          if (materials[i]) {
            isMaterialSetupDone = materials[i].setUp();
          }
        }

        //if (this._ibo.length > 0) {
        if (Geometry._iboArrayDic[this.toString()].length > 0) {
          //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo[i] );
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[this.toString()][i] );
          gl.drawElements(gl[this._primitiveType], materials[i].getVertexN(this), gl.UNSIGNED_SHORT, 0);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        } else {
          gl.drawArrays(gl[this._primitiveType], 0, this._vertexN);
        }

        /*
        if (materials[i].toString() !== Geometry._lastMaterial) {
          if (materials[i]) {
            materials[i].tearDown();
          }
        }
        */

        //Geometry._lastMaterial = null;
        Geometry._lastMaterial = isMaterialSetupDone ? materials[i].toString() : null;
      }
    } else {
      gl.useProgram(this._glslProgram);

      if (!isVAOBound) {
        if (Geometry._lastGeometry !== this.toString()) {
          gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);
          this.setUpVertexAttribs(gl, this._glslProgram);
        }
      }

      if (camera) {
        var viewMatrix = camera.lookAtRHMatrix();
        var projectionMatrix = camera.perspectiveRHMatrix();
        var mvp_m = projectionMatrix.clone().multiply(viewMatrix).multiply(mesh.transformMatrix);
        gl.uniformMatrix4fv(this._glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.transpose().flatten()));

      }

      //if (this._ibo.length > 0) {
      if (Geometry._iboArrayDic[this.toString()].length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[this.toString()][0] );
        gl.drawElements(gl[this._primitiveType], Geometry._idxNArrayDic[this.toString()][0], gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(gl[this._primitiveType], 0, this._vertexN);
      }

      Geometry._lastMaterial = null;
    }

    //glem.bindVertexArray(gl, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    Geometry._lastGeometry = this.toString();

  }

  set materials(materials) {
    this._materials = materials;
    this._dirty = true;
  }

  toString() {
    return this._instanceName;
  }

  static clearMaterialCache() {
    Geometry._lastMaterial = null;
  }
}
Geometry._vaoDic = {};
Geometry._vboDic = {};
Geometry._iboArrayDic = {};
Geometry._idxNArrayDic = {};
Geometry._lastGeometry = null;
Geometry._lastMaterial = null;

GLBoost["Geometry"] = Geometry;
