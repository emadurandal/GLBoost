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

export default class Geometry {
  constructor(canvas) {
    this._gl = GLContext.getInstance(canvas).gl;
    this._canvas = canvas;
    this._materials = [];
    this._vertexN = 0;
    this._glslProgram = null;
    this._vertices = null;
    this._vertexAttribComponentNDic = {};
    //this._shader_for_non_material = new SimpleShader(this._canvas);
    this._defaultMaterial = new ClassicMaterial(this._canvas);

    if (this.constructor === Geometry) {
      Geometry._instanceCount = (typeof Geometry._instanceCount === "undefined") ? 0 : (Geometry._instanceCount + 1);
      this._instanceName = Geometry.name + '_' + Geometry._instanceCount;
    }
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
        if (attribName !== 'indices') {// && attribName !== 'normal') {
          attribNameArray.push(attribName);
        }
      }
    }

    return attribNameArray;
  }

  /**
   * インデックス以外の全ての頂点属性のリストを返す
   */
  _allVertexAttribs(vertices) {
    var attribNameArray = [];
    for (var attribName in vertices) {
      if (attribName !== 'indices') {// && attribName !== 'normal') {
        attribNameArray.push(attribName);
      }
    }

    return attribNameArray;
  }

  /*
  _getSheder(result, existCamera_f, lights) {
    return this._shader_for_non_material.getShaderProgram(result, existCamera_f, lights);
  }
  */

  setVerticesData(vertices, primitiveType) {
    this._vertices = vertices;
    this._primitiveType = (primitiveType) ? primitiveType : GLBoost.TRIANGLES;
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

  prepareGLSLProgramAndSetVertexNtoMaterial(material, existCamera_f, lights) {
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

    var glslProgram = material.shader.getShaderProgram(_optimizedVertexAttribs, existCamera_f, lights);
    this.setUpVertexAttribs(gl, glslProgram, allVertexAttribs);

    glem.bindVertexArray(gl, null);

    var materials = [material];
    materials = this._setVertexNtoSingleMaterial(materials);
    materials[0].glslProgram = glslProgram;

    return materials[0];
  }

  _setVertexNtoSingleMaterial(materials) {
    // if this mesh has only one material...
    var vertices = this._vertices;
    if (materials && materials.length === 1 && materials[0].getVertexN(this) === 0) {
      if (vertices.indices && vertices.indices.length > 0) {
        materials[0].setVertexN(this, vertices.indices[0].length);
      } else {
        materials[0].setVertexN(this, this._vertexN);
      }
    }

    return materials;
  }

  prepareForRender(existCamera_f, lights, meshMaterial) {

    var vertices = this._vertices;
    var gl = this._gl;

    var glem = GLExtentionsManager.getInstance(gl);

    var optimizedVertexAttribs = null;

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

    if (materials.length > 0) {
      for (let i=0; i<materials.length;i++) {
        // GLSLプログラム作成。
        var material = this.prepareGLSLProgramAndSetVertexNtoMaterial(materials[i], existCamera_f, lights);
        materials[i].glslProgram = material.glslProgram;
        optimizedVertexAttribs = materials[i].glslProgram.optimizedVertexAttribs;

      }
    } else if (!meshMaterial) {
      var material = this.prepareGLSLProgramAndSetVertexNtoMaterial(this._defaultMaterial, existCamera_f, lights);
      this._glslProgram = material.glslProgram;
      optimizedVertexAttribs = material.glslProgram.optimizedVertexAttribs;
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


    return true;
  }

  draw(lights, camera, mesh) {
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
          this._glslProgram = materials[i].glslProgram;
          gl.useProgram(this._glslProgram);
        }
        let glslProgram = this._glslProgram;

        if (!isVAOBound) {
          if (Geometry._lastGeometry !== thisName) {
            gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[thisName]);
            this.setUpVertexAttribs(gl, glslProgram, this._allVertexAttribs(this._vertices));
          }
        }

        if (camera) {
          var viewMatrix = camera.lookAtRHMatrix();
          var projectionMatrix = camera.perspectiveRHMatrix();
          var mvp_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(mesh.transformMatrixAccumulatedAncestry);
          gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.transpose().flatten()));
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

        //if (this._ibo.length > 0) {
        if (Geometry._iboArrayDic[thisName].length > 0) {
          //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo[i] );
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[thisName][i] );
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

        Geometry._lastMaterial = isMaterialSetupDone ? materialName : null;
      }
    } else {
      let glslProgram = this._glslProgram;
      gl.useProgram(glslProgram);

      if (!isVAOBound) {
        if (Geometry._lastGeometry !== thisName) {
          gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[thisName]);
          this.setUpVertexAttribs(gl, glslProgram, this._allVertexAttribs(this._vertices));
        }
      }

      if (camera) {
        var viewMatrix = camera.lookAtRHMatrix();
        var projectionMatrix = camera.perspectiveRHMatrix();
        var mvp_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(mesh.transformMatrixAccumulatedAncestry);
        gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, new Float32Array(mvp_m.transpose().flatten()));

      }

      if (typeof this._defaultMaterial.shader.setUniforms !== "undefined") {
        this._defaultMaterial.shader.setUniforms(gl, glslProgram, this._defaultMaterial, camera, mesh);
      }

      //if (this._ibo.length > 0) {
      if (Geometry._iboArrayDic[thisName].length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[thisName][0] );
        gl.drawElements(gl[this._primitiveType], Geometry._idxNArrayDic[thisName][0], gl.UNSIGNED_SHORT, 0);
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

  set materials(materials) {
    this._materials = materials;
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
