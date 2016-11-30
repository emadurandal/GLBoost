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
    this._defaultMaterial = glBoostContext.createClassicMaterial();
    this._vertexData = [];
    this._extraDataForShader = {};
    this._vboObj = {}
    this._AABB = new AABB();
    this._drawKicker = DrawKickerWorld.getInstance();

    if (this._drawKicker instanceof DrawKickerWorld) {

    } else if (this._drawKicker instanceof DrawKickerLocal) {

    }
  }

  /**
   * 全ての頂点属性のリストを返す
   */
  static _allVertexAttribs(vertices) {
    var attribNameArray = [];
    for (var attribName in vertices) {
      if (attribName !== 'components') {
        attribNameArray.push(attribName);
      }
    }

    return attribNameArray;
  }

  _checkAndSetVertexComponentNumber(allVertexAttribs) {
    allVertexAttribs.forEach((attribName)=> {
      let element = this._vertices[attribName][0];
      let componentN = MathUtil.compomentNumberOfVector(element);
      if (componentN === 0) {
        // if 0, it must be a number. so users must set components info.
        return;
      }
      if (typeof this._vertices.components === 'undefined') {
        this._vertices.components = {};
      }
      this._vertices.components[attribName] = componentN;
    });
  }

  setVerticesData(vertices, indicesArray, primitiveType = GLBoost.TRIANGLES, performanceHint = GLBoost.STATIC_DRAW) {
    this._vertices = vertices;

    let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);

    this._checkAndSetVertexComponentNumber(allVertexAttribs);

    if (typeof this._vertices.position.buffer !== 'undefined') {
      // position (and maybe others) are a TypedArray
      let componentN = this._vertices.components.position;
      let vertexNum = this._vertices.position.length / componentN;
      for (let i=0; i<vertexNum; i++) {
        this._AABB.addPositionWithArray(this._vertices.position, i * componentN);
      }
    } else {
      allVertexAttribs.forEach((attribName)=> {
        let vertexAttribArray = [];
        this._vertices[attribName].forEach((elem, index) => {
          let element = this._vertices[attribName][index];
          Array.prototype.push.apply(vertexAttribArray, MathUtil.vectorToArray(element));
          if (attribName === 'position') {
            let componentN = this._vertices.components[attribName];
            this._AABB.addPositionWithArray(vertexAttribArray, index * componentN);
          }
        });
        this._vertices[attribName] = vertexAttribArray;
      });
    }

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

  updateVerticesData(vertices) {
    let gl = this._glContext.gl;

    for (let attribName in vertices) {
      let vertexAttribArray = [];
      this._vertices[attribName].forEach((elem, index) => {
        let element = vertices[attribName][index];
        Array.prototype.push.apply(vertexAttribArray, MathUtil.vectorToArray(element));

        if (attribName === 'position') {
          let componentN = this._vertices.components[attribName];
          this._AABB.addPositionWithArray(vertexAttribArray, index * componentN);
        }
        this._vertices[attribName] = vertexAttribArray;
      });
    }

    this._AABB.updateAllInfo();

    for (let attribName in vertices) {
      let float32AryVertexData = new Float32Array(this._vertices[attribName]);
      gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, float32AryVertexData);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

  }

  setUpVertexAttribs(gl, glslProgram, allVertexAttribs) {
    var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

    // 頂点レイアウト設定
    allVertexAttribs.forEach((attribName)=> {
      if (optimizedVertexAttribs.indexOf(attribName) != -1) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
          this._vertices.components[attribName], gl.FLOAT, gl.FALSE, 0, 0);
      }
    });
  }

  prepareGLSLProgramAndSetVertexNtoMaterial(material, index, existCamera_f, lights, doSetupVertexAttribs = true) {
    var gl = this._glContext.gl;
    var vertices = this._vertices;

    var glem = GLExtensionsManager.getInstance(this._glContext);
    var _optimizedVertexAttribs = Geometry._allVertexAttribs(vertices, material);

    if (doSetupVertexAttribs) {
      glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);
    }

    var allVertexAttribs = Geometry._allVertexAttribs(vertices);

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

    this._vertexN = vertices.position.length / vertices.components.position;

    var allVertexAttribs = Geometry._allVertexAttribs(vertices);


    // create VAO
    if (Geometry._vaoDic[this.toString()]) {
    } else {
      var vao = this._glContext.createVertexArray(this);
      Geometry._vaoDic[this.toString()] = vao;
    }
    glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);

    let doAfter = true;

    allVertexAttribs.forEach((attribName)=> {
      // create VBO
      if (this._vboObj[attribName]) {
        doAfter = false;
      } else {
        let vbo = this._glContext.createBuffer(this);
        this._vboObj[attribName] = vbo;
      }
    });


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

      allVertexAttribs.forEach((attribName)=> {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices[attribName]), this._performanceHint);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      });

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

    this._drawKicker.draw(gl, glem, this._glContext, mesh, materials, camera, lights, scene, this._vertices, Geometry._vaoDic, this._vboObj, Geometry._iboArrayDic, this, thisName, this._primitiveType, this._vertexN, renderPassIndex);

  }

  merge(geometrys) {
    if (Array.isArray(geometrys)) {
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;

        let allGeomLength = 0;
        geometrys.forEach((geometry) => {
          allGeomLength += geometry._vertices[attribName].length;
        });
        typedArrayDic[attribName] = new Float32Array(thisLength + allGeomLength);
      });

      let lastThisLengthDic = {};
      allVertexAttribs.forEach((attribName)=> {
        lastThisLengthDic[attribName] = 0;
      });
      geometrys.forEach((geometry, index) => {
        let typedSubArrayDic = {};
        allVertexAttribs.forEach((attribName)=> {
          let typedArray = typedArrayDic[attribName];

          if (index === 0) {
            lastThisLengthDic[attribName] = geometrys[index]._vertices[attribName].length;
          }

          let end = (typeof geometrys[index+1] !== 'undefined') ? lastThisLengthDic[attribName]  + geometrys[index+1]._vertices[attribName].length : void 0;
          typedSubArrayDic[attribName] = typedArray.subarray(0, end);
          lastThisLengthDic[attribName] = end;
        });
        this.mergeInner(geometry, typedSubArrayDic, (index === 0));
      });
    } else {
      let geometry = geometrys;
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;
        let geomLength = geometry._vertices[attribName].length;

        typedArrayDic[attribName] = new Float32Array(thisLength + geomLength);
      });

      this.mergeInner(geometry, typedArrayDic);
    }
  }

  /**
   *
   * @param geometry
   */
  mergeInner(geometry, typedArrayDic, isFirst = false) {
    let gl = this._glContext.gl;
    let baseLen = this._vertices.position.length / this._vertices.components.position;;

    if (this === geometry) {
      console.assert('don\'t merge same geometry!');
    }

    let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);

    allVertexAttribs.forEach((attribName)=> {
      let thisLength = this._vertices[attribName].length;
      let geomLength =  geometry._vertices[attribName].length;

      let float32array = typedArrayDic[attribName];

      if (isFirst) {
        float32array.set(this._vertices[attribName], 0);
      }
      float32array.set(geometry._vertices[attribName], thisLength);

      this._vertices[attribName] = float32array;

      if (typeof this._vboObj[attribName] !== 'undefined') {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices[attribName], this._performanceHint);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      }
    });

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

  mergeHarder(geometrys) {
    if (Array.isArray(geometrys)) {
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;

        let allGeomLength = 0;
        geometrys.forEach((geometry) => {
          allGeomLength += geometry._vertices[attribName].length;
        });
        typedArrayDic[attribName] = new Float32Array(thisLength + allGeomLength);
      });

      let lastThisLengthDic = {};
      allVertexAttribs.forEach((attribName)=> {
        lastThisLengthDic[attribName] = 0;
      });
      geometrys.forEach((geometry, index) => {
        let typedSubArrayDic = {};
        allVertexAttribs.forEach((attribName)=> {
          let typedArray = typedArrayDic[attribName];

          if (index === 0) {
            lastThisLengthDic[attribName] = geometrys[index]._vertices[attribName].length;
          }

          let end = (typeof geometrys[index+1] !== 'undefined') ? lastThisLengthDic[attribName]  + geometrys[index+1]._vertices[attribName].length : void 0;
          typedSubArrayDic[attribName] = typedArray.subarray(0, end);
          lastThisLengthDic[attribName] = end;
        });
        this.mergeHarderInner(geometry, typedSubArrayDic, (index === 0));
      });
    } else {
      let geometry = geometrys;
      let typedArrayDic = {};
      let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
      allVertexAttribs.forEach((attribName)=> {
        let thisLength = this._vertices[attribName].length;
        let geomLength = geometry._vertices[attribName].length;

        typedArrayDic[attribName] = new Float32Array(thisLength + geomLength);
      });

      this.mergeHarderInner(geometry, typedArrayDic);
    }
  }

  /**
   * take no thought geometry's materials
   *
   * @param geometry
   */
  mergeHarderInner(geometry, typedArrayDic, isFirst = false) {
    let gl = this._glContext.gl;
    let baseLen = this._vertices.position.length / this._vertices.components.position;
    if (this === geometry) {
      console.assert('don\'t merge same geometry!');
    }

    let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);

    allVertexAttribs.forEach((attribName)=> {
      let thisLength = this._vertices[attribName].length;
      let geomLength =  geometry._vertices[attribName].length;

      let float32array = typedArrayDic[attribName];

      if (isFirst) {
        float32array.set(this._vertices[attribName], 0);
      }
      float32array.set(geometry._vertices[attribName], thisLength);

      this._vertices[attribName] = float32array;

      if (typeof this._vboObj[attribName] !== 'undefined') {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices[attribName], this._performanceHint);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      }
    });


    for (let i = 0; i < this._indicesArray.length; i++) {
      let len = geometry._indicesArray[i].length;
      for (let j = 0; j < len; j++) {
        let idx = geometry._indicesArray[i][j];
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
Geometry._iboArrayDic = {};
