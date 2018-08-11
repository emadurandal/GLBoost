import GLBoost from '../../globals';
import GLBoostObject from '../core/GLBoostObject';
import GLExtensionsManager from '../core/GLExtensionsManager';
import MathClassUtil from '../../low_level/math/MathClassUtil';
import DrawKickerWorld from '../../middle_level/draw_kickers/DrawKickerWorld';
import VertexWorldShaderSource from '../../middle_level/shaders/VertexWorldShader';
import AABB from '../../low_level/math/AABB';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import FreeShader from '../../middle_level/shaders/FreeShader';
import Matrix33 from '../math/Matrix33';


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

  }

  _createShaderInstance(glBoostContext, shaderClass) {
    let shaderInstance = new shaderClass(glBoostContext, VertexWorldShaderSource);
    return shaderInstance;
  }

  /**
   * 全ての頂点属性のリストを返す
   */
  _allVertexAttribs(vertices) {
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
      let componentN = MathClassUtil.compomentNumberOfVector(element);
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

  _calcTangentFor3Vertices(vertexIndices, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, incrementNum) {
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

    const componentNum3 = 3;
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
      incrementNum = 1;
    }
    if ( this._vertices.texcoord ) {
      if (!this._indicesArray) {
        for (let i=0; i<vertexNum-2; i+=incrementNum) {
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
          for (let j=0; j<vertexIndices.length-2; j+=incrementNum) {
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

    let allVertexAttribs = this._allVertexAttribs(this._vertices);
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

    allVertexAttribs = this._allVertexAttribs(this._vertices);
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
        Array.prototype.push.apply(vertexAttribArray, MathClassUtil.vectorToArray(element));
      });
      this._vertices[attribName] = vertexAttribArray;

    });

    // for Tangent
    if (this._vertices.texcoord) {
      this._calcTangent(vertexNum, positionElementNumPerVertex, texcoordElementNumPerVertex, primitiveType);
    }

    // for Raycast Picking
    this._calcArenbergInverseMatrices(primitiveType);

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
        Array.prototype.push.apply(vertexAttribArray, MathClassUtil.vectorToArray(element));

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

  setUpEnableVertexAttribArrays(gl, glslProgram, allVertexAttribs) {
    var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

    allVertexAttribs.forEach((attribName)=> {
      if (optimizedVertexAttribs.indexOf(attribName) != -1) {
        gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
      }
    });
  }

  setUpDisableAllVertexAttribArrays(gl, glslProgram) {

    for (let i=0; i<8; i++) {
      gl.disableVertexAttribArray(i);
    }
  }

  setUpDisableVertexAttribArrays(gl, glslProgram, allVertexAttribs) {
    var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

    allVertexAttribs.forEach((attribName)=> {
      if (optimizedVertexAttribs.indexOf(attribName) != -1) {
        gl.disableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
      }
    });
  }



  _getVAO() {
    return Geometry._vaoDic[this.toString()];
  }

  _getAllVertexAttribs() {
    return this._allVertexAttribs(this._vertices);
  } 

  prepareGLSLProgram(expression, material, existCamera_f, lights, shaderClass = void 0, argShaderInstance = void 0) {
    let vertices = this._vertices;

    let _optimizedVertexAttribs = this._allVertexAttribs(vertices, material);

    let shaderInstance = null;
    if (argShaderInstance) {
      shaderInstance = argShaderInstance;
    } else {
      if (shaderClass) {
        shaderInstance = this._createShaderInstance(this._glBoostSystem, shaderClass);
      } else {
        shaderInstance = this._createShaderInstance(this._glBoostSystem, material.shaderClass);
      }  
    }

    shaderInstance.getShaderProgram(expression, _optimizedVertexAttribs, existCamera_f, lights, material, this._extraDataForShader);

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
      mesh.material = this._glBoostSystem._defaultMaterial;
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

    var allVertexAttribs = this._allVertexAttribs(vertices);


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

      /*
      if (argMaterials !== void 0 && argMaterials[i].shaderInstance !== null) {
        shaderInstance = argMaterials[i].shaderInstance;
      } else if (materials[i].shaderInstance !== null) {
        shaderInstance = materials[i].shaderInstance;
      } else {
        */
        if (materials[i].shaderInstance && materials[i].shaderInstance.constructor === FreeShader) {
          shaderInstance = this.prepareGLSLProgram(expression, materials[i], existCamera_f, lights, void 0, materials[i].shaderInstance);
        } else {
          shaderInstance = this.prepareGLSLProgram(expression, materials[i], existCamera_f, lights, shaderClass);
        }  
//      }

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

  draw(data) {
    const gl = this._glContext.gl;
    const glem = GLExtensionsManager.getInstance(this._glContext);

    let materials = this._getAppropriateMaterials(data.mesh);

    const thisName = this.toString();

    this._drawKicker.draw(
      {
        gl: gl,
        glem: glem,
        expression: data.expression,
        lights: data.lights,
        camera: data.camera,
        mesh: data.mesh,
        scene: data.scene,
        renderPassIndex: data.renderPassIndex,
        materials: materials,
        vertices: this._vertices,
        vaoDic: Geometry._vaoDic,
        vboObj: this._vboObj,
        iboArrayDic: Geometry._iboArrayDic,
        geometry: this,
        geometryName: thisName,
        primitiveType: this._primitiveType,
        vertexN: this._vertexN,
        viewport: data.viewport,
        isWebVRMode: data.isWebVRMode,
        webvrFrameData: data.webvrFrameData,
        forceThisMaterial: data.forceThisMaterial
      });

  }

  drawIntermediate() {}

  merge(geometrys) {
    if (Array.isArray(geometrys)) {
      let typedArrayDic = {};
      let allVertexAttribs = this._allVertexAttribs(this._vertices);
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
      let allVertexAttribs = this._allVertexAttribs(this._vertices);
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

    let allVertexAttribs = this._allVertexAttribs(this._vertices);

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
      let allVertexAttribs = this._allVertexAttribs(this._vertices);
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
      let allVertexAttribs = this._allVertexAttribs(this._vertices);
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

    let allVertexAttribs = this._allVertexAttribs(this._vertices);

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

  rayCast(origVec3, dirVec3, isFrontFacePickable, isBackFacePickable) {
    let currentShortestT = Number.MAX_VALUE;
    let currentShortestIntersectedPosVec3 = null;

    const positionElementNumPerVertex = this._vertices.components.position;
    let incrementNum = 3; // gl.TRIANGLES
    if (this._primitiveType === GLBoost.TRIANGLE_STRIP) { // gl.TRIANGLE_STRIP
      incrementNum = 1;
    }
    if ( this._vertices.texcoord ) {
      if (!this._indicesArray) {
        for (let i=0; i<vertexNum; i++) {
          const j = i * incrementNum;
          let pos0IndexBase = j * positionElementNumPerVertex;
          let pos1IndexBase = (j + 1) * positionElementNumPerVertex;
          let pos2IndexBase = (j + 2) * positionElementNumPerVertex;
          const result = this._rayCastInner(origVec3, dirVec3, j, pos0IndexBase, pos1IndexBase, pos2IndexBase, isFrontFacePickable, isBackFacePickable);
          if (result === null) {
            continue;
          }
          const t = result[0];
          if (result[0] < currentShortestT) {
            currentShortestT = t;
            currentShortestIntersectedPosVec3 = result[1];
          }
        }
      } else {
        for (let i=0; i<this._indicesArray.length; i++) {
          let vertexIndices = this._indicesArray[i];
          for (let j=0; j<vertexIndices.length; j++) {
            const k = j * incrementNum;
            let pos0IndexBase = vertexIndices[k    ] * positionElementNumPerVertex;
            let pos1IndexBase = vertexIndices[k + 1] * positionElementNumPerVertex;
            let pos2IndexBase = vertexIndices[k + 2] * positionElementNumPerVertex;

            if (vertexIndices[k + 2] === void 0) {
              break;
            }
            const result = this._rayCastInner(origVec3, dirVec3, vertexIndices[k], pos0IndexBase, pos1IndexBase, pos2IndexBase, isFrontFacePickable, isBackFacePickable);
            if (result === null) {
              continue;
            }
            const t = result[0];
            if (result[0] < currentShortestT) {
              currentShortestT = t;
              currentShortestIntersectedPosVec3 = result[1];
            }
          }
        }
      }
    }
    
    return [currentShortestIntersectedPosVec3, currentShortestT];
  }

  _rayCastInner(origVec3, dirVec3, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, isFrontFacePickable, isBackFacePickable) {
    if (!this._vertices.arenberg3rdPosition[i]) {
      return null;
    }

    const faceNormal = this._vertices.faceNormal[i];
    if (faceNormal.dotProduct(dirVec3) < 0 && !isFrontFacePickable) { // ---> <---
      return null;
    }
    if (faceNormal.dotProduct(dirVec3) > 0 && !isBackFacePickable) { // ---> --->
      return null;
    }
    

    const vec3 = Vector3.subtract(origVec3, this._vertices.arenberg3rdPosition[i]);
    const convertedOrigVec3 = this._vertices.inverseArenbergMatrix[i].multiplyVector(vec3);
    const convertedDirVec3 = this._vertices.inverseArenbergMatrix[i].multiplyVector(dirVec3);

    if (convertedDirVec3.z >= -(1e-6) && convertedDirVec3.z <= (1e-6)) {
      return null;
    }

    const t = -convertedOrigVec3.z / convertedDirVec3.z;
    
    if(t <= (1e-5)) {
      return null;
    }

    const u = convertedOrigVec3.x + t * convertedDirVec3.x;
    const v = convertedOrigVec3.y + t * convertedDirVec3.y;
    if (u < 0.0 || v < 0.0 || (u + v) > 1.0) {
      return null;
    }

    const fDat = 1.0 - u - v;

    const pos0Vec3 = new Vector3(
      this._vertices.position[pos0IndexBase],
      this._vertices.position[pos0IndexBase + 1],
      this._vertices.position[pos0IndexBase + 2]
    );

    const pos1Vec3 = new Vector3(
      this._vertices.position[pos1IndexBase],
      this._vertices.position[pos1IndexBase + 1],
      this._vertices.position[pos1IndexBase + 2]
    );

    const pos2Vec3 = new Vector3(
      this._vertices.position[pos2IndexBase],
      this._vertices.position[pos2IndexBase + 1],
      this._vertices.position[pos2IndexBase + 2]
    );


    const pos0 = Vector3.multiply(pos0Vec3, u);
    const pos1 = Vector3.multiply(pos1Vec3, v);
    const pos2 = Vector3.multiply(pos2Vec3, fDat);
    const intersectedPosVec3 = Vector3.add(Vector3.add(pos0, pos1), pos2);

    return [t, intersectedPosVec3];
  }

  _calcArenbergInverseMatrices(primitiveType) {

    const positionElementNumPerVertex = this._vertices.components.position;

    let incrementNum = 3; // gl.TRIANGLES
    if (primitiveType === GLBoost.TRIANGLE_STRIP) { // gl.TRIANGLE_STRIP
      incrementNum = 1;
    }
    this._vertices.inverseArenbergMatrix = [];
    this._vertices.arenberg3rdPosition = [];
    this._vertices.faceNormal = [];
    if ( this._vertices.texcoord ) {
      if (!this._indicesArray) {
        for (let i=0; i<this._vertexN-2; i+=incrementNum) {
          let pos0IndexBase = i * positionElementNumPerVertex;
          let pos1IndexBase = (i + 1) * positionElementNumPerVertex;
          let pos2IndexBase = (i + 2) * positionElementNumPerVertex;

          this._calcArenbergMatrixFor3Vertices(null, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, incrementNum);

        }
      } else {
        for (let i=0; i<this._indicesArray.length; i++) {
          let vertexIndices = this._indicesArray[i];
          for (let j=0; j<vertexIndices.length-2; j+=incrementNum) {
            let pos0IndexBase = vertexIndices[j    ] * positionElementNumPerVertex;
            let pos1IndexBase = vertexIndices[j + 1] * positionElementNumPerVertex;
            let pos2IndexBase = vertexIndices[j + 2] * positionElementNumPerVertex;

            if (vertexIndices[j + 2] === void 0) {
              break;
            }
            this._calcArenbergMatrixFor3Vertices(vertexIndices, j, pos0IndexBase, pos1IndexBase, pos2IndexBase, incrementNum);

          }
        }
      }
    }

  }

  _calcArenbergMatrixFor3Vertices(vertexIndices, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, incrementNum) {
    const pos0Vec3 = new Vector3(
      this._vertices.position[pos0IndexBase],
      this._vertices.position[pos0IndexBase + 1],
      this._vertices.position[pos0IndexBase + 2]
    );

    const pos1Vec3 = new Vector3(
      this._vertices.position[pos1IndexBase],
      this._vertices.position[pos1IndexBase + 1],
      this._vertices.position[pos1IndexBase + 2]
    );

    const pos2Vec3 = new Vector3(
      this._vertices.position[pos2IndexBase],
      this._vertices.position[pos2IndexBase + 1],
      this._vertices.position[pos2IndexBase + 2]
    );

    const ax = pos0Vec3.x - pos2Vec3.x;
    const ay = pos0Vec3.y - pos2Vec3.y;
    const az = pos0Vec3.z - pos2Vec3.z;
    const bx = pos1Vec3.x - pos2Vec3.x;
    const by = pos1Vec3.y - pos2Vec3.y;
    const bz = pos1Vec3.z - pos2Vec3.z;

    let nx = ay * bz - az * by;
    let ny = az * bx - ax * bz;
    let nz = ax * by - ay * bx;
    let da = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (da <= 1e-6) {
      return 0;
    }
    da = 1.0 / da;
    nx *= da;
    ny *= da;
    nz *= da;

    const arenbergMatrix = new Matrix33(
      pos0Vec3.x - pos2Vec3.x, pos1Vec3.x - pos2Vec3.x, nx - pos2Vec3.x,
      pos0Vec3.y - pos2Vec3.y, pos1Vec3.y - pos2Vec3.y, ny - pos2Vec3.y,
      pos0Vec3.z - pos2Vec3.z, pos1Vec3.z - pos2Vec3.z, nz - pos2Vec3.z
    );

    const inverseArenbergMatrix = arenbergMatrix.invert();


    let arenberg0IndexBase = (i    );
    let arenberg1IndexBase = (i + 1);
    let arenberg2IndexBase = (i + 2);
    if (vertexIndices) {
      arenberg0IndexBase = vertexIndices[i];
      arenberg1IndexBase = vertexIndices[i + 1];
      arenberg2IndexBase = vertexIndices[i + 2];
    }

//    const triangleIdx = i/incrementNum;
    this._vertices.inverseArenbergMatrix[arenberg0IndexBase] = inverseArenbergMatrix;
    this._vertices.arenberg3rdPosition[arenberg0IndexBase] = pos2Vec3;
    this._vertices.faceNormal[arenberg0IndexBase] = new Vector3(nx, ny, nz);
  }

}
Geometry._vaoDic = {};
Geometry._iboArrayDic = {};
