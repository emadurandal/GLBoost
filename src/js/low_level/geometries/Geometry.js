import GLBoost from '../../globals';
import GLBoostObject from '../core/GLBoostObject';
import Vector3 from '../../low_level/math/Vector3';
import GLContext from '../core/GLContext';
import GLExtensionsManager from '../core/GLExtensionsManager';
import ClassicMaterial from './../ClassicMaterial';
import ArrayUtil from '../../low_level/misc/ArrayUtil';
import MathUtil from '../../low_level/math/MathUtil';
import DrawKickerLocal from '../../middle_level/draw_kickers/DrawKickerLocal';
import DrawKickerWorld from '../../middle_level/draw_kickers/DrawKickerWorld';
import VertexLocalShaderSource from '../../middle_level/shaders/VertexLocalShader';
import VertexWorldShaderSource from '../../middle_level/shaders/VertexWorldShader';
import AABB from '../../low_level/math/AABB';


export default class Geometry extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._canvas = this._glContext.canvas;

    this._materials = [];
    this._vertexN = 0;
    this._vertices = null;
    this._indicesArray = null;
    this._performanceHint = null;
    this._vertexAttribComponentNDic = {};
    this._defaultMaterial = glBoostContext.createClassicMaterial();
    this._vertexData = [];
    this._extraDataForShader = {};
    this._AABB = new AABB();
    this._drawKicker = DrawKickerWorld.getInstance();

    if (this._drawKicker instanceof DrawKickerWorld) {

    } else if (this._drawKicker instanceof DrawKickerLocal) {

    }
  }

  /**
   * データとして利用する頂点属性を判断し、そのリストを返す
   */
  _decideNeededVertexAttribs(vertices, material) {

    var attribNameArray = [];
    for (var attribName in vertices) {
      attribNameArray.push(attribName);
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

    var allVertexAttribs = this._allVertexAttribs(this._vertices);

    // if array, convert to vector[2/3/4]
    this._vertices.position.forEach((elem, index) => {
      allVertexAttribs.forEach((attribName)=> {
        var element = this._vertices[attribName][index];
        this._vertices[attribName][index] = MathUtil.arrayToVector(element);

        if (attribName === 'position') {
          this._AABB.addPosition(this._vertices[attribName][index]);
        }
      });
    });

    this._AABB.updateAllInfo();

    this._indicesArray = indicesArray;
    this._primitiveType = primitiveType;

    var gl = this._glContext.gl;
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
    var gl = this._glContext.gl;
    let vertexData = this._vertexData;
    //var vertexData = [];
    if (isAlreadyInterleaved) {
      vertexData = vertices;
    } else {
      this._vertices = ArrayUtil.merge(this._vertices, vertices);
      var allVertexAttribs = this._allVertexAttribs(this._vertices);
      const isCached = vertexData.length == 0 ? false : true;

      let idx = 0;
      this._vertices.position.forEach((elem, index) => {
        allVertexAttribs.forEach((attribName)=> {
          var element = this._vertices[attribName][index];
          // if array, convert to vector[2/3/4]
          this._vertices[attribName][index] = element = MathUtil.arrayToVector(element);

          if (attribName === 'position') {
            this._AABB.addPosition(this._vertices[attribName][index]);
          }

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

      this._AABB.updateAllInfo();


      if(!isCached) {
        this.Float32AryVertexData = new Float32Array(vertexData);
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
        gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
          this._vertexAttribComponentNDic[attribName], gl.FLOAT, gl.FALSE, stride, offset);
      }
      offset += this._vertexAttribComponentNDic[attribName] * 4;
    });
  }

  prepareGLSLProgramAndSetVertexNtoMaterial(material, index, existCamera_f, lights, doSetupVertexAttribs = true) {
    var gl = this._glContext.gl;
    var vertices = this._vertices;

    var glem = GLExtensionsManager.getInstance(this._glContext);
    var _optimizedVertexAttribs = this._decideNeededVertexAttribs(vertices, material);

    if (doSetupVertexAttribs) {
      glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);
      gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);
    }

    var allVertexAttribs = this._allVertexAttribs(vertices);
    allVertexAttribs.forEach((attribName)=> {
      this._vertexAttribComponentNDic[attribName] = (vertices[attribName][0].z === void 0) ? 2 : ((vertices[attribName][0].w === void 0) ? 3 : 4);
    });

    if (material.shaderInstance === null) {
      let shaderClass = material.shaderClass;

      let basicShaderSource = null;
      if (this._drawKicker instanceof DrawKickerWorld) {
        basicShaderSource = VertexWorldShaderSource;
      } else if (this._drawKicker instanceof DrawKickerLocal) {
        basicShaderSource = VertexLocalShaderSource;
      }

      material.shaderInstance = new shaderClass(this._glBoostContext, basicShaderSource);
    }
    var glslProgram = material.shaderInstance.getShaderProgram(_optimizedVertexAttribs, existCamera_f, lights, material, this._extraDataForShader);
    if (doSetupVertexAttribs) {
      this.setUpVertexAttribs(gl, glslProgram, allVertexAttribs);
    }

    if (doSetupVertexAttribs) {
      glem.bindVertexArray(gl, null);
    }
    this._setVertexNtoSingleMaterial(material, index);

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

  prepareToRender(existCamera_f, lights, meshMaterial, mesh) {

    var vertices = this._vertices;
    var gl = this._glContext.gl;

    var glem = GLExtensionsManager.getInstance(this._glContext);

    this._vertexN = vertices.position.length;

    // create VAO
    if (Geometry._vaoDic[this.toString()]) {
    } else {
      var vao = this._glContext.createVertexArray(this);
      Geometry._vaoDic[this.toString()] = vao;
    }
    glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);

    var doAfter = true;

    // create VBO
    if (Geometry._vboDic[this.toString()]) {
      doAfter = false;
    } else {
      var vbo = this._glContext.createBuffer(this);
      Geometry._vboDic[this.toString()] = vbo;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, Geometry._vboDic[this.toString()]);

    var materials = null;
    if (this._materials.length > 0) {
      materials = this._materials;
    } else if (mesh.material){
      materials = [mesh.material];
    } else {
      materials = [this._defaultMaterial];
    }


    for (let i=0; i<materials.length;i++) {
      this.prepareGLSLProgramAndSetVertexNtoMaterial(materials[i], i, existCamera_f, lights, doAfter);
    }

    if (doAfter) {

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
      if (this._indicesArray) {
        // create Index Buffer
        for (let i=0; i<this._indicesArray.length; i++) {
          var ibo = this._glContext.createBuffer(this);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo );
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glem.createUintArrayForElementIndex(gl, this._indicesArray[i]), gl.STATIC_DRAW);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
          Geometry._iboArrayDic[this.toString()][i] = ibo;
          this._defaultMaterial.setVertexN(this._indicesArray[i].length);
        }
      }
      glem.bindVertexArray(gl, null);
    }


    return true;
  }

  draw(lights, camera, mesh, scene, renderPassIndex) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);

    var materials = null;
    if (this._materials.length > 0) {
      materials = this._materials;
    } else if (mesh.material){
      materials = [mesh.material];
    } else {
      materials = [this._defaultMaterial];
    }

    let thisName = this.toString();

    this._drawKicker.draw(gl, glem, this._glContext, mesh, materials, camera, lights, scene, this._vertices, Geometry._vaoDic, Geometry._vboDic, Geometry._iboArrayDic, this, thisName, this._primitiveType, this._vertexN, renderPassIndex);

  }

  /**
   *
   * @param geometry
   */
  merge(geometry) {
    var baseLen = this._vertices.position.length;

    if (this === geometry) {
      console.assert('don\'t merge same geometry!');
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
      console.assert('don\'t merge same geometry!');
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

  get materials() {
    return this._materials;
  }

  get centerPosition() {
    return this._AABB.centerPoint;
  }

  setExtraDataForShader(name, value) {
    this._extraDataForShader[name] = value;
  }

  getExtraDataForShader(name) {
    return this._extraDataForShader[name];
  }

  static clearMaterialCache() {
    Geometry._lastMaterial = null;
  }

  get AABB() {
    return this._AABB;
  }

}
Geometry._vaoDic = {};
Geometry._vboDic = {};
Geometry._iboArrayDic = {};
