import GLBoost from '../../globals';
import GLBoostObject from '../core/GLBoostObject';
import GLExtensionsManager from '../core/GLExtensionsManager';
import MathUtil from '../../low_level/math/MathUtil';
import DrawKickerLocal from '../../middle_level/draw_kickers/DrawKickerLocal';
import DrawKickerWorld from '../../middle_level/draw_kickers/DrawKickerWorld';
import VertexLocalShaderSource from '../../middle_level/shaders/VertexLocalShader';
import VertexWorldShaderSource from '../../middle_level/shaders/VertexWorldShader';
import AABB from '../../low_level/math/AABB';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import Shader from '../../low_level/shaders/Shader';
import FreeShader from '../../middle_level/shaders/FreeShader';


export default class Geometry extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._materials = [];
    this._vertexN = 0;
    this._vertices = null;
    this._indicesArray = null;
    this._indexStartOffsetArray = [];
    this._performanceHint = null;
    this._defaultMaterial = null;
    this._vertexData = [];
    this._extraDataForShader = {};
    this._vboObj = {};
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
      if (attribName !== 'components' && attribName !== 'componentBytes' && attribName !== 'componentType') {
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
      if (typeof this._vertices.componentType === 'undefined') {
        this._vertices.componentType = {};
      }

      this._vertices.components[attribName] = componentN;
      this._vertices.componentType[attribName] = 5126;
    });
  }

  _calcBaryCentricCoord(vertexNum, positionElementNumPerVertex) {
    this._vertices.barycentricCoord = new Float32Array(vertexNum*positionElementNumPerVertex);
    this._vertices.components.barycentricCoord = 3;
    this._vertices.componentType.barycentricCoord = 5126; // gl.FLOAT
    if (!this._indicesArray) {
      for (let i=0; i<vertexNum; i++) {
        this._vertices.barycentricCoord[i*positionElementNumPerVertex+0] = (i % 3 === 0) ? 1 : 0;   // 1 0 0  1 0 0  1 0 0
        this._vertices.barycentricCoord[i*positionElementNumPerVertex+1] = (i % 3 === 1) ? 1 : 0;   // 0 1 0  0 1 0  0 1 0
        this._vertices.barycentricCoord[i*positionElementNumPerVertex+2] = (i % 3 === 2) ? 1 : 0;   // 0 0 1  0 0 1  0 0 1
      }
    } else {
      for (let i=0; i<this._indicesArray.length; i++) {
        let vertexIndices = this._indicesArray[i];
        for (let j=0; j<vertexIndices.length; j++) {
          this._vertices.barycentricCoord[vertexIndices[j]*positionElementNumPerVertex+0] = (j % 3 === 0) ? 1 : 0;   // 1 0 0  1 0 0  1 0 0
          this._vertices.barycentricCoord[vertexIndices[j]*positionElementNumPerVertex+1] = (j % 3 === 1) ? 1 : 0;   // 0 1 0  0 1 0  0 1 0
          this._vertices.barycentricCoord[vertexIndices[j]*positionElementNumPerVertex+2] = (j % 3 === 2) ? 1 : 0;   // 0 0 1  0 0 1  0 0 1
        }
      }
    }
  }

  _calcTangentPerVertex(pos0Vec3, pos1Vec3, pos2Vec3, uv0Vec2, uv1Vec2, uv2Vec2) {
    let cp0 = [
      new Vector3(
        pos0Vec3.x,
        uv0Vec2.x,
        uv0Vec2.y
      ),
      new Vector3(
        pos0Vec3.y,
        uv0Vec2.x,
        uv0Vec2.y
      ),
      new Vector3(
        pos0Vec3.z,
        uv0Vec2.x,
        uv0Vec2.y
      )
    ];

    let cp1 = [
      new Vector3(
        pos1Vec3.x,
        uv1Vec2.x,
        uv1Vec2.y
      ),
      new Vector3(
        pos1Vec3.y,
        uv1Vec2.x,
        uv1Vec2.y
      ),
      new Vector3(
        pos1Vec3.z,
        uv1Vec2.x,
        uv1Vec2.y
      )
    ];

    let cp2 = [
      new Vector3(
        pos2Vec3.x,
        uv2Vec2.x,
        uv2Vec2.y
      ),
      new Vector3(
        pos2Vec3.y,
        uv2Vec2.x,
        uv2Vec2.y
      ),
      new Vector3(
        pos2Vec3.z,
        uv2Vec2.x,
        uv2Vec2.y
      )
    ];

    let u = [];
    let v = [];

    for ( let i = 0; i < 3; i++ ) {
      let v1 = Vector3.subtract(cp1[i], cp0[i]);
      let v2 = Vector3.subtract(cp2[i], cp1[i]);
      let abc = Vector3.cross(v1, v2);

      let validate = Math.abs(abc.x) < Number.EPSILON;
      if (validate) {
        console.assert(validate, "Polygons or polygons on UV are degenerate!");
        return new Vector3(0, 0, 0);
      }

      u[i] = - abc.y / abc.x;
      v[i] = - abc.z / abc.x;
    }

    return (new Vector3(u[0], u[1], u[2])).normalize();
  }

  _calcTangentFor3Vertices(vertexIndices, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, componentNum3) {
    let pos0Vec3 = new Vector3(
      this._vertices.position[pos0IndexBase],
      this._vertices.position[pos0IndexBase + 1],
      this._vertices.position[pos0IndexBase + 2]
    );

    let pos1Vec3 = new Vector3(
      this._vertices.position[pos1IndexBase],
      this._vertices.position[pos1IndexBase + 1],
      this._vertices.position[pos1IndexBase + 2]
    );

    let pos2Vec3 = new Vector3(
      this._vertices.position[pos2IndexBase],
      this._vertices.position[pos2IndexBase + 1],
      this._vertices.position[pos2IndexBase + 2]
    );

    let uv0Vec2 = new Vector2(
      this._vertices.texcoord[uv0IndexBase],
      this._vertices.texcoord[uv0IndexBase + 1]
    );

    let uv1Vec2 = new Vector2(
      this._vertices.texcoord[uv1IndexBase],
      this._vertices.texcoord[uv1IndexBase + 1]
    );

    let uv2Vec2 = new Vector2(
      this._vertices.texcoord[uv2IndexBase],
      this._vertices.texcoord[uv2IndexBase + 1]
    );

    let tan0IndexBase = (i    ) * componentNum3;
    let tan1IndexBase = (i + 1) * componentNum3;
    let tan2IndexBase = (i + 2) * componentNum3;
    if (vertexIndices) {
      tan0IndexBase = vertexIndices[i] * componentNum3;
      tan1IndexBase = vertexIndices[i + 1] * componentNum3;
      tan2IndexBase = vertexIndices[i + 2] * componentNum3;
    }

    let tan0Vec3 = this._calcTangentPerVertex(pos0Vec3, pos1Vec3, pos2Vec3, uv0Vec2, uv1Vec2, uv2Vec2);
    this._vertices.tangent[tan0IndexBase] = tan0Vec3.x;
    this._vertices.tangent[tan0IndexBase + 1] = tan0Vec3.y;
    this._vertices.tangent[tan0IndexBase + 2] = tan0Vec3.z;

    let tan1Vec3 = this._calcTangentPerVertex(pos1Vec3, pos2Vec3, pos0Vec3, uv1Vec2, uv2Vec2, uv0Vec2);
    this._vertices.tangent[tan1IndexBase] = tan1Vec3.x;
    this._vertices.tangent[tan1IndexBase + 1] = tan1Vec3.y;
    this._vertices.tangent[tan1IndexBase + 2] = tan1Vec3.z;

    let tan2Vec3 = this._calcTangentPerVertex(pos2Vec3, pos0Vec3, pos1Vec3, uv2Vec2, uv0Vec2, uv1Vec2);
    this._vertices.tangent[tan2IndexBase] = tan2Vec3.x;
    this._vertices.tangent[tan2IndexBase + 1] = tan2Vec3.y;
    this._vertices.tangent[tan2IndexBase + 2] = tan2Vec3.z;
  }

  _calcTangent(vertexNum, positionElementNumPerVertex, texcoordElementNumPerVertex, primitiveType) {

    this._vertices.tangent = new Float32Array(vertexNum*positionElementNumPerVertex);
    this._vertices.components.tangent = 3;
    this._vertices.componentType.tangent = 5126; // gl.FLOAT

    let incrementNum = 3; // gl.TRIANGLES
    if (primitiveType === GLBoost.TRIANGLE_STRIP) { // gl.TRIANGLE_STRIP
      //incrementNum = 1;
    }
    if ( this._vertices.texcoord ) {
      if (!this._indicesArray) {
        for (let i=0; i<vertexNum; i+=incrementNum) {
          let pos0IndexBase = i * positionElementNumPerVertex;
          let pos1IndexBase = (i + 1) * positionElementNumPerVertex;
          let pos2IndexBase = (i + 2) * positionElementNumPerVertex;
          let uv0IndexBase = i * texcoordElementNumPerVertex;
          let uv1IndexBase = (i + 1) * texcoordElementNumPerVertex;
          let uv2IndexBase = (i + 2) * texcoordElementNumPerVertex;

          this._calcTangentFor3Vertices(null, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, incrementNum);

        }
      } else {
        for (let i=0; i<this._indicesArray.length; i++) {
          let vertexIndices = this._indicesArray[i];
          for (let j=0; j<vertexIndices.length; j+=incrementNum) {
            let pos0IndexBase = vertexIndices[j    ] * positionElementNumPerVertex; /// ０つ目の頂点
            let pos1IndexBase = vertexIndices[j + 1] * positionElementNumPerVertex; /// １つ目の頂点
            let pos2IndexBase = vertexIndices[j + 2] * positionElementNumPerVertex; /// ２つ目の頂点
            let uv0IndexBase = vertexIndices[j    ]  * texcoordElementNumPerVertex;
            let uv1IndexBase = vertexIndices[j + 1]  * texcoordElementNumPerVertex;
            let uv2IndexBase = vertexIndices[j + 2]  * texcoordElementNumPerVertex;

            this._calcTangentFor3Vertices(vertexIndices, j, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, incrementNum);

          }
        }
      }
    }


  }

  setVerticesData(vertices, indicesArray, primitiveType = GLBoost.TRIANGLES, performanceHint = GLBoost.STATIC_DRAW) {
    this._vertices = vertices;
    this._indicesArray = indicesArray;

    let allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
    this._checkAndSetVertexComponentNumber(allVertexAttribs);

    let vertexNum = 0;
    let positionElementNum = 0;
    let positionElementNumPerVertex = this._vertices.components.position;
    let texcoordElementNumPerVertex = this._vertices.components.texcoord;

    if (typeof this._vertices.position.buffer !== 'undefined') {
      vertexNum = this._vertices.position.length / positionElementNumPerVertex;
      positionElementNum = this._vertices.position.length;
    } else {
      vertexNum = this._vertices.position.length; // vertices must be type of Vector3
      positionElementNum = this._vertices.position.length * positionElementNumPerVertex;
    }

    // for Wireframe
    this._calcBaryCentricCoord(vertexNum, positionElementNumPerVertex);

    allVertexAttribs = Geometry._allVertexAttribs(this._vertices);
    this._checkAndSetVertexComponentNumber(allVertexAttribs);

    // vector to array
    allVertexAttribs.forEach((attribName)=> {
      if (attribName === 'barycentricCoord') {
        return;
      }
      if (attribName === 'tangent') {
        return;
      }
      if (typeof this._vertices[attribName].buffer !== 'undefined') {
        return;
      }
      let vertexAttribArray = [];
      this._vertices[attribName].forEach((elem, index) => {
        let element = this._vertices[attribName][index];
        Array.prototype.push.apply(vertexAttribArray, MathUtil.vectorToArray(element));
      });
      this._vertices[attribName] = vertexAttribArray;

    });

    // for Tangent
    if (this._vertices.texcoord) {
      this._calcTangent(vertexNum, positionElementNumPerVertex, texcoordElementNumPerVertex, primitiveType);
    }

    // Normal Array to Float32Array
    allVertexAttribs.forEach((attribName)=> {
      if (typeof this._vertices[attribName].buffer === 'undefined') {
        this._vertices[attribName] = new Float32Array(this._vertices[attribName]);
      }
    });


    for (let i=0; i<vertexNum; i++) {
      this._AABB.addPositionWithArray(this._vertices.position, i * positionElementNumPerVertex);
    }

    this._AABB.updateAllInfo();

    let gl = this._glContext.gl;
    let primitiveTypeStr = GLBoost.getValueOfGLBoostConstant(primitiveType);
    this._primitiveType = gl[primitiveTypeStr];
    let performanceHintStr = GLBoost.getValueOfGLBoostConstant(performanceHint);
    this._performanceHint = gl[performanceHintStr];
  }

  updateVerticesData(vertices, skipUpdateAABB = false) {
    let gl = this._glContext.gl;

    for (let attribName in vertices) {
      let vertexAttribArray = [];
      this._vertices[attribName].forEach((elem, index) => {
        let element = vertices[attribName][index];
        Array.prototype.push.apply(vertexAttribArray, MathUtil.vectorToArray(element));

        if (attribName === 'position' && !(skipUpdateAABB === true)) {
          let componentN = this._vertices.components[attribName];
          this._AABB.addPositionWithArray(vertexAttribArray, index * componentN);
        }
        this._vertices[attribName] = vertexAttribArray;
      });
    }

    if(!(skipUpdateAABB === true)) {
      this._AABB.updateAllInfo();
    }

    for (let attribName in vertices) {
      if (this._vboObj[attribName]) {
        let float32AryVertexData = new Float32Array(this._vertices[attribName]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, float32AryVertexData);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      } else {
        return false;
      }
    }
    return true;

  }

  setUpVertexAttribs(gl, glslProgram, allVertexAttribs) {
    var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

    // setup vertex layouts
    allVertexAttribs.forEach((attribName)=> {
      if (optimizedVertexAttribs.indexOf(attribName) != -1) {
        let vertexAttribName = null;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
        gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName],
          this._vertices.components[attribName], this._vertices.componentType[attribName], false, 0, 0);
      }
    });
  }



  _getVAO() {
    return Geometry._vaoDic[this.toString()];
  }

  _getAllVertexAttribs() {
    return Geometry._allVertexAttribs(this._vertices);
  } 

  prepareGLSLProgramAndSetVertexNtoMaterial(expression, material, index, existCamera_f, lights, doSetupVertexAttribs = true, shaderClass = void 0, argShaderInstance = void 0) {
    let gl = this._glContext.gl;
    let vertices = this._vertices;

   //let glem = GLExtensionsManager.getInstance(this._glContext);
    let _optimizedVertexAttribs = Geometry._allVertexAttribs(vertices, material);

//    if (doSetupVertexAttribs) {
//      glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);
//    }


    let shaderInstance = null;
    if (argShaderInstance) {
      shaderInstance = argShaderInstance;
    } else {
      if (shaderClass) {
        shaderInstance = Shader._createShaderInstance(this._glBoostContext, shaderClass);
      } else {
        shaderInstance = Shader._createShaderInstance(this._glBoostContext, material.shaderClass);
      }  
    }

    let glslProgram = shaderInstance.getShaderProgram(expression, _optimizedVertexAttribs, existCamera_f, lights, material, this._extraDataForShader);
//    if (doSetupVertexAttribs) {
    //  this.setUpVertexAttribs(gl, glslProgram, allVertexAttribs);
//    }

//    if (doSetupVertexAttribs) {
    //  glem.bindVertexArray(gl, null);
//    }

    return shaderInstance;
  }

  _setVertexNtoSingleMaterial(material, index) {
    // if this mesh has only one material...
    //if (material.getVertexN(this) === 0) {
    if (this._indicesArray && this._indicesArray.length > 0) {
      material.setVertexN(this, this._indicesArray[index].length);
    } else {
      material.setVertexN(this, this._vertexN);
    }
    //}
  }

  _getAppropriateMaterials(mesh) {
    let materials = null;
    if (this._materials.length > 0) {
      materials = this._materials;
    } else if (mesh.material){
      materials = [mesh.material];
    } else {
      mesh.material = this._glBoostContext._defaultMaterial;
      materials = [mesh.material];
    }
    return materials;
  }

  getIndexStartOffsetArrayAtMaterial(i) {
    return this._indexStartOffsetArray[i];
  }

  prepareToRender(expression, existCamera_f, lights, meshMaterial, mesh, shaderClass = void 0, argMaterials = void 0) {

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

    let doAfter = false;

    allVertexAttribs.forEach((attribName)=> {
      // create VBO
      if (this._vboObj[attribName]) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
      } else {
        let vbo = this._glContext.createBuffer(this);
        this._vboObj[attribName] = vbo;

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
//        if (typeof this._vertices[attribName].buffer !== 'undefined') {
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices[attribName], this._performanceHint);
//        } else {
//          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices[attribName]), this._performanceHint);
//        }
      //gl.bindBuffer(gl.ARRAY_BUFFER, null);

        doAfter = true;
      }
    });

    if (doAfter) {
        
      if (Geometry._iboArrayDic[this.toString()]) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[this.toString()] );
      } else {
        if (this._indicesArray) {
          let indices = [];
          for (let i=0; i<this._indicesArray.length; i++) {
            if (i==0) {
              this._indexStartOffsetArray[i] = 0;
            }
            this._indexStartOffsetArray[i+1] = this._indexStartOffsetArray[i] + this._indicesArray[i].length;
            //Array.prototype.push.apply(indices, this._indicesArray[i]);  
            indices = indices.concat(this._indicesArray[i]);
          }
          // create Index Buffer
          var ibo = this._glContext.createBuffer(this);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo );
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glem.createUintArrayForElementIndex(gl, indices), gl.STATIC_DRAW);
          Geometry._iboArrayDic[this.toString()] = ibo;
        }
      }
    }

    let materials = argMaterials;

    if (argMaterials === void 0) {
      materials = this._getAppropriateMaterials(mesh);
    }
    //let materials = this._getAppropriateMaterials(mesh);

    for (let i=0; i<materials.length;i++) {
      let shaderInstance = null;
      if (materials[i].shaderInstance && materials[i].shaderInstance.constructor === FreeShader) {
        shaderInstance = this.prepareGLSLProgramAndSetVertexNtoMaterial(expression, materials[i], i, existCamera_f, lights, doAfter, void 0, materials[i].shaderInstance);
      } else {
        shaderInstance = this.prepareGLSLProgramAndSetVertexNtoMaterial(expression, materials[i], i, existCamera_f, lights, doAfter, shaderClass);
      }
      this._setVertexNtoSingleMaterial(materials[i], i);
      shaderInstance.vao = Geometry._vaoDic[this.toString()];
      this.setUpVertexAttribs(gl, shaderInstance._glslProgram, allVertexAttribs);
      if (argMaterials === void 0) {
        materials[i].shaderInstance = shaderInstance;
      } else {
        argMaterials[i].shaderInstance = shaderInstance;
      }
    }

    glem.bindVertexArray(gl, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return materials;
  }

  _setUpVertexAttibsWrapper(glslProgram) {
    this.setUpVertexAttribs(this._glContext.gl, glslProgram, this._getAllVertexAttribs());    
  }

  draw(expression, lights, camera, mesh, scene, renderPassIndex) {
    var gl = this._glContext.gl;
    var glem = GLExtensionsManager.getInstance(this._glContext);

    let materials = this._getAppropriateMaterials(mesh);

    let thisName = this.toString();

    this._drawKicker.draw(gl, glem, expression, mesh, materials, camera, lights, scene, this._vertices, Geometry._vaoDic, this._vboObj, Geometry._iboArrayDic, this, thisName, this._primitiveType, this._vertexN, renderPassIndex);

  }

  drawIntermediate() {}

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

  isTransparent(mesh) {
    let materials = this._getAppropriateMaterials(mesh);
    let isTransparent = false;
    materials.forEach((material)=>{
      if (material.isTransparent()) {
        isTransparent = true;
      }
    });
    return isTransparent;
  }

  get AABB() {
    return this._AABB;//.clone();
  }

  get rawAABB() {
    return this._AABB;
  }

  isIndexed() {
    return !!Geometry._iboArrayDic[this.toString()];
  }

  getTriangleCount(mesh) {
    let gl = this._glContext.gl;
    let materials = this._getAppropriateMaterials(mesh);
    let count = 0;
    for (let i=0; i<materials.length;i++) {
      let material = materials[i];
      if (this._primitiveType === gl.TRIANGLES) {
        if (this.isIndexed()) {
          count += material.getVertexN(this.toString()) / 3;
        } else {
          count += this._vertexN / 3;
        }
      } else if (this._primitiveType === gl.TRIANGLE_STRIP) {
        if (this.isIndexed()) {
          count += material.getVertexN(this.toString()) - 2;
        } else {
          count += this._vertexN - 2;
        }
      }
    }
    return count;
  }

  getVertexCount() {
    let gl = this._glContext.gl;
    let count = 0;
    if (this._vertices) {
      count = this._vertices.position.length;
    }
    return count;
  }

}
Geometry._vaoDic = {};
Geometry._iboArrayDic = {};
