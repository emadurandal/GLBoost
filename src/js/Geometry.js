import GLBoost from './globals'
import Matrix44 from './math/Matrix44'
import Vector4 from './math/Vector4'
import GLContext from './GLContext'
import GLExtentionsManager from './GLExtentionsManager'
import Shader from './shaders/Shader'
import SimpleShader from './shaders/SimpleShader'
import ClassicMaterial from './ClassicMaterial'
import PointLight from './lights/PointLight'
import DirectionalLight from './lights/DirectionalLight'
import ArrayUtil from './misc/ArrayUtil'

export default class Geometry {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    this._gl = GLContext.getInstance(canvas).gl;
    this._canvas = canvas;
    this._materials = [];
    this._vertexN = 0;
    this._glslProgram = null;
    this._vertices = null;
    this._indicesArray = null;
    this._performanceHint = null;
    this._vertexAttribComponentNDic = {};
    this._defaultMaterial = new ClassicMaterial(this._canvas);
    this.vertexData = [];
    this._setName();
  }

  _setName() {
    this.constructor._instanceCount = (typeof this.constructor._instanceCount === "undefined") ? 0 : (this.constructor._instanceCount + 1);
    this._instanceName = this.constructor.name + '_' + this.constructor._instanceCount;
  }

  /**
   * データとして利用する頂点属性を判断し、そのリストを返す
   * 不必要な頂点属性のデータは無視する。
   */
  _decideNeededVertexAttribs(vertices, material) {
    if (material) {
      var _material = material;
    } else {
      var _material = this._materials[0];
    }

    var attribNameArray = [];
    for (var attribName in vertices) {
      if (attribName === GLBoost.TEXCOORD) {
        // texcoordの場合は、テクスチャ付きのマテリアルをちゃんと持っているときに限り、'texcoord'が有効となる
        if ((_material !== void 0) && _material.diffuseTexture !== null) {
          attribNameArray.push(attribName);
        } else {
          //delete vertices[GLBoost.TEXCOORD];
        }
      } else {
        attribNameArray.push(attribName);
      }
    }

    return attribNameArray;
  }

  /**
   * 全ての頂点属性のリストを返す
   */
  _allVertexAttribs(vertices) {
    var attribNameArray = [];
    for (var attribName in vertices) {
      attribNameArray.push(attribName);
    }

    return attribNameArray;
  }

  setVerticesData(vertices, indicesArray, primitiveType = GLBoost.TRIANGLES, performanceHint = GLBoost.STATIC_DRAW) {
    this._vertices = vertices;
    this._indicesArray = indicesArray;
    this._primitiveType = primitiveType;

    var gl = this._gl;
    var hint = null;
    switch (performanceHint) {
      case GLBoost.STATIC_DRAW:
        hint = gl.STATIC_DRAW;
        break;
      case GLBoost.STREAM_DRAW:
        hint = gl.STREAM_DRAW;
        break;
      case GLBoost.DYNAMIC_DRAW:
        hint = gl.DYNAMIC_DRAW;
        break;
    }
    this._performanceHint = hint;
  }

  updateVerticesData(vertices, isAlreadyInterleaved = false) {
    var gl = this._gl;
    let vertexData = this.vertexData;
    //var vertexData = [];
    if (isAlreadyInterleaved) {
      vertexData = vertices;
    } else {
      this._vertices = ArrayUtil.merge(this._vertices, vertices);
      var allVertexAttribs = this._allVertexAttribs(this._vertices);
      if(vertexData.length == 0) {
        this._vertices.position.forEach((elem, index, array) => {
          allVertexAttribs.forEach((attribName)=> {
            var element = this._vertices[attribName][index];
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
        gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);
        this.Float32AryVertexData =  new Float32Array(vertexData);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.Float32AryVertexData);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

      } else {
        let idx = 0;
        this._vertices.position.forEach((elem, index, array) => {
          allVertexAttribs.forEach((attribName)=> {
            var element = this._vertices[attribName][index];
	          vertexData[idx++] = element.x;
            vertexData[idx++] = element.y;
            if (element.z !== void 0) {
              vertexData[idx++] = element.z;
            }
            if (element.w !== void 0) {
              vertexData[idx++] = element.w;
            }
          });
        });
      }
      let float32AryVertexData = this.Float32AryVertexData;
      for(let i = 0; i < float32AryVertexData.length; i++) {
        float32AryVertexData[i] = vertexData[i];
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, float32AryVertexData);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
  }

  setUpVertexAttribs(gl, glslProgram, _allVertexAttribs) {
    var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

    var stride = 0;
    _allVertexAttribs.forEach((attribName)=> {
      stride += this._vertexAttribComponentNDic[attribName] * 4;
    });

    // 頂点レイアウト設定
    var offset = 0;
    _allVertexAttribs.forEach((attribName)=> {
      if (optimizedVertexAttribs.indexOf(attribName) != -1) {
        gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
        gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
          this._vertexAttribComponentNDic[attribName], gl.FLOAT, gl.FALSE, stride, offset);
      }
      offset += this._vertexAttribComponentNDic[attribName] * 4;
    });
  }

  prepareGLSLProgramAndSetVertexNtoMaterial(material, index, existCamera_f, lights, renderPasses, mesh) {
    var gl = this._gl;
    var vertices = this._vertices;

    var glem = GLExtentionsManager.getInstance(gl);
    var _optimizedVertexAttribs = this._decideNeededVertexAttribs(vertices, material);
    glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);
    gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);

    var allVertexAttribs = this._allVertexAttribs(vertices);
    allVertexAttribs.forEach((attribName)=> {
      this._vertexAttribComponentNDic[attribName] = (vertices[attribName][0].z === void 0) ? 2 : ((vertices[attribName][0].w === void 0) ? 3 : 4);
    });

    let glslProgramOfPasses = [];
    for (let i=0; i<renderPasses.length; i++) {
      if (renderPasses[i].containsMeshAfterPrepareForRender(mesh)) {
        var glslProgram = material.shader.getShaderProgram(_optimizedVertexAttribs, existCamera_f, lights, renderPasses[i]);
        this.setUpVertexAttribs(gl, glslProgram, allVertexAttribs);
        glslProgramOfPasses.push(glslProgram);
      } else {
        glslProgramOfPasses.push(null);
      }
    }
    glem.bindVertexArray(gl, null);

    this._setVertexNtoSingleMaterial(material, index);
    material.glslProgramOfPasses = glslProgramOfPasses;

    return material;
  }

  _setVertexNtoSingleMaterial(material, index) {
    // if this mesh has only one material...
    if (material.getVertexN(this) === 0) {
      if (this._indicesArray && this._indicesArray.length > 0) {
        material.setVertexN(this, this._indicesArray[index].length);
      } else {
        material.setVertexN(this, this._vertexN);
      }
    }
  }

  prepareForRender(existCamera_f, lights, meshMaterial, renderPasses, mesh) {

    var vertices = this._vertices;
    var gl = this._gl;

    var glem = GLExtentionsManager.getInstance(gl);

    this._vertexN = vertices.position.length;

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

    var materials = this._materials;
    var optimizedVertexAttribs = null;

    if (materials.length > 0) {
      for (let i=0; i<materials.length;i++) {
        var material = this.prepareGLSLProgramAndSetVertexNtoMaterial(materials[i], i, existCamera_f, lights, renderPasses, mesh);
        materials[i].glslProgramOfPasses = material.glslProgramOfPasses;
        optimizedVertexAttribs = materials[i].glslProgramOfPasses[0].optimizedVertexAttribs;

      }
    } else if (!meshMaterial) {
      var material = this.prepareGLSLProgramAndSetVertexNtoMaterial(this._defaultMaterial, 0, existCamera_f, lights, renderPasses, mesh);
      this.glslProgramOfPasses = material.glslProgramOfPasses;
      optimizedVertexAttribs = material.glslProgramOfPasses[0].optimizedVertexAttribs;
    }



    var vertexData = [];
    var allVertexAttribs = this._allVertexAttribs(vertices);
    vertices.position.forEach((elem, index, array) => {
      allVertexAttribs.forEach((attribName)=> {
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

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), this._performanceHint);


    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    Geometry._iboArrayDic[this.toString()] = [];
    Geometry._idxNArrayDic[this.toString()] = [];
    if (this._indicesArray) {
      // create Index Buffer
      for (let i=0; i<this._indicesArray.length; i++) {
        var ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo );
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glem.createUintArrayForElementIndex(gl, this._indicesArray[i]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        Geometry._iboArrayDic[this.toString()][i] = ibo;
        Geometry._idxNArrayDic[this.toString()][i] = this._indicesArray[i].length;
      }
    }
    glem.bindVertexArray(gl, null);


    return true;
  }

  draw(lights, camera, mesh, scene, renderPass_index) {
    var gl = this._gl;
    var glem = GLExtentionsManager.getInstance(gl);

    if (this._materials.length > 0) {
      var materials = this._materials;
    } else if (mesh.material){
      var materials = [mesh.material];
    } else {
      var materials = [];
    }

    let thisName = this.toString();

    var isVAOBound = false;
    if (Geometry._lastGeometry !== thisName) {
      isVAOBound = glem.bindVertexArray(gl, Geometry._vaoDic[thisName]);
    }

    if (materials.length > 0) {
      for (let i=0; i<materials.length;i++) {
        let materialName = materials[i].toString();
        if (materialName !== Geometry._lastMaterial) {
          this._glslProgram = materials[i].glslProgramOfPasses[renderPass_index];
          gl.useProgram(this._glslProgram);
        }
        let glslProgram = this._glslProgram;

        if (!isVAOBound) {
          if (Geometry._lastGeometry !== thisName) {
            gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[thisName]);
            this.setUpVertexAttribs(gl, glslProgram, this._allVertexAttribs(this._vertices));
          }
        }

        let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
        gl.uniform1f(glslProgram.opacity, opacity);

        if (camera) {
          var viewMatrix = camera.lookAtRHMatrix();
          var projectionMatrix = camera.perspectiveRHMatrix();
          var m_m = mesh.transformMatrixAccumulatedAncestry;
          var mvp_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(m_m);
          gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.flatten()));
        }

        if (glslProgram['lightPosition_0']) {
          lights = Shader.getDefaultPointLightIfNotExsist(gl, lights);
          if (glslProgram['viewPosition']) {
            if (camera) {
              let cameraPos = new Vector4(0, 0, 0, 1);
              cameraPos = camera.transformMatrixAccumulatedAncestry.multiplyVector(cameraPos);
              var cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(cameraPos.x, cameraPos.y, cameraPos.z, 1));
            } else {
              var cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(0, 0, 1, 1));
            }
            gl.uniform3f(glslProgram['viewPosition'], cameraPosInLocalCoord.x, cameraPosInLocalCoord.y, cameraPosInLocalCoord.z);
          }

          for(let j=0; j<lights.length; j++) {
            if (glslProgram[`lightPosition_${j}`] && glslProgram[`lightDiffuse_${j}`]) {
              let lightVec = null;
              let isPointLight = -9999;
              if (lights[j] instanceof PointLight) {
                lightVec = new Vector4(0, 0, 0, 1);
                lightVec = lights[j].transformMatrixAccumulatedAncestry.multiplyVector(lightVec);
                isPointLight = 1.0;
              } else if (lights[j] instanceof DirectionalLight) {
                lightVec = new Vector4(-lights[j].direction.x, -lights[j].direction.y, -lights[j].direction.z, 1);
                lightVec = lights[j].rotateMatrixAccumulatedAncestry.multiplyVector(lightVec);
                lightVec.w = 0.0;
                isPointLight = 0.0;
              }

              let lightVecInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(lightVec);
              gl.uniform4f(glslProgram[`lightPosition_${j}`], lightVecInLocalCoord.x, lightVecInLocalCoord.y, lightVecInLocalCoord.z, isPointLight);

              gl.uniform4f(glslProgram[`lightDiffuse_${j}`], lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0);
            }
          }
        }

        let isMaterialSetupDone = true;

        if (materials[i].shader.dirty || materialName !== Geometry._lastMaterial) {
          var needTobeStillDirty = materials[i].shader.setUniforms(gl, glslProgram, materials[i], camera, mesh);
          materials[i].shader.dirty = needTobeStillDirty ? true : false;
        }

        if (materialName !== Geometry._lastMaterial) {
          if (materials[i]) {
            isMaterialSetupDone = materials[i].setUp();
          }
        }
        if (!isMaterialSetupDone) {
          return;
        }

        //if (this._ibo.length > 0) {
        if (Geometry._iboArrayDic[thisName].length > 0) {
          //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo[i] );
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[thisName][i] );
          gl.drawElements(gl[this._primitiveType], materials[i].getVertexN(this), glem.elementIndexBitSize(gl), 0);
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

        Geometry._lastMaterial = isMaterialSetupDone ? materialName : null;
      }
    } else {
      let glslProgram = this.glslProgramOfPasses[renderPass_index];
      gl.useProgram(glslProgram);

      if (!isVAOBound) {
        if (Geometry._lastGeometry !== thisName) {
          gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[thisName]);
          this.setUpVertexAttribs(gl, glslProgram, this._allVertexAttribs(this._vertices));
        }
      }

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      gl.uniform1f(glslProgram.opacity, opacity);

      if (camera) {
        var viewMatrix = camera.lookAtRHMatrix();
        var projectionMatrix = camera.perspectiveRHMatrix();
        var mvp_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(mesh.transformMatrixAccumulatedAncestry);
        gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.flatten()));

      }

      if (typeof this._defaultMaterial.shader.setUniforms !== "undefined") {
        this._defaultMaterial.shader.setUniforms(gl, glslProgram, this._defaultMaterial, camera, mesh);
      }

      //if (this._ibo.length > 0) {
      if (Geometry._iboArrayDic[thisName].length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[thisName][0] );
        gl.drawElements(gl[this._primitiveType], Geometry._idxNArrayDic[thisName][0], glem.elementIndexBitSize(gl), 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(gl[this._primitiveType], 0, this._vertexN);
      }

      Geometry._lastMaterial = null;
    }

    //glem.bindVertexArray(gl, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    Geometry._lastGeometry = thisName;

  }

  /**
   *
   * @param geometry
   */
  merge(geometry) {
    var baseLen = this._vertices.position.length;

    if (this === geometry) {
      console.assert("don't merge same geometry!");
    }
    for (var attribName in this._vertices) {
      Array.prototype.push.apply(this._vertices[attribName], geometry._vertices[attribName]);
    }
    let geometryIndicesN = geometry._indicesArray.length;
    for (let i = 0; i < geometryIndicesN; i++) {
      for (let j = 0; j < geometry._indicesArray[i].length; j++) {
        geometry._indicesArray[i][j] += baseLen;
      }
      this._indicesArray.push(geometry._indicesArray[i]);
      if (geometry._materials[i]) {
        this._materials.push(geometry._materials[i]);
      }
    }
    this._vertexN += geometry._vertexN;
  }

  /**
   * take no thought geometry's materials
   *
   * @param geometry
   */
  mergeHarder(geometry) {
    var baseLen = this._vertices.position.length;
    if (this === geometry) {
      console.assert("don't merge same geometry!");
    }
    for (var attribName in this._vertices) {
      Array.prototype.push.apply(this._vertices[attribName], geometry._vertices[attribName]);
    }
    for (let i = 0; i < this._indicesArray.length; i++) {
      let len = geometry._indicesArray[i].length;
      for (let j = 0; j < len; j++) {
        var idx = geometry._indicesArray[i][j];
        this._indicesArray[i].push(baseLen + idx);
      }
      if (this._materials[i]) {
        this._materials[i].setVertexN(this, this._materials[i].getVertexN(geometry));
      }
    }
    this._vertexN += geometry._vertexN;
  }


  set materials(materials) {
    this._materials = materials;
  }

  toString() {
    return this._instanceName;
  }

  static clearMaterialCache() {
    Geometry._lastMaterial = null;
  }

  toString() {
    return this._instanceName;
  }
}
Geometry._vaoDic = {};
Geometry._vboDic = {};
Geometry._iboArrayDic = {};
Geometry._idxNArrayDic = {};
Geometry._lastGeometry = null;
Geometry._lastMaterial = null;

GLBoost["Geometry"] = Geometry;
