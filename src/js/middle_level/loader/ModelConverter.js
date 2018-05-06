import GLBoost from '../../globals';
import DataUtil from '../../low_level/misc/DataUtil';


let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * 
 */
export default class ModelConverter {

  /**
   * The constructor of GLTFLoader class. But you cannot use this constructor directly because of this class is a singleton class. Use getInstance() static method.
   * @param {Symbol} enforcer a Symbol to forbid calling this constructor directly
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
  }

  /**
   * The static method to get singleton instance of this class.
   * @return {GLTFLoader} the singleton instance of GLTFLoader class
   */
  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new ModelConverter(singletonEnforcer);
    }
    return this[singleton];
  }

  convertToGLBoostModel(glBoostContext, gltfModel) {

    // load binary data
    for (let accessor of gltfModel.accessors) {
      this._accessBinaryWithAccessor(accessor)
    }

    // Hierarchy
    let groups = this._setupHierarchy(glBoostContext, gltfModel);

    // Mesh data
    this._setupMesh(glBoostContext, gltfModel, groups);

    let rootGroup = glBoostContext.createGroup();

    if (gltfModel.scenes[0].nodesIndices) {
      for (let nodesIndex of gltfModel.scenes[0].nodesIndices) {
        rootGroup.addChild(groups[nodesIndex]);
      }  
    }

    return rootGroup;
  }

  _setupHierarchy(glBoostContext, gltfModel) {
    let groups = [];
    for (let node_i in gltfModel.nodes) {
      let group = glBoostContext.createGroup();
      groups.push(group);
    }
    for (let node_i in gltfModel.nodes) {
      let node = gltfModel.nodes[parseInt(node_i)];
      if (node.childrenIndices) {
        for (let childNode_i of node.childrenIndices) {
          let childGroup = groups[childNode_i];
          let parentGroup = groups[node_i];
          parentGroup.addChild(childGroup);
          if (node.mesh) {
            parentGroup.addChild(node.mesh);
            parentGroup._mesh = mesh;  
          }
        }  
      }
    }
    return groups;
  }

  _setupMesh(glBoostContext, gltfModel, groups) {
    for (let group of groups) {
      let mesh = group._mesh;
      if (mesh === void 0) {
        continue;
      }

      let geometry = glBoostContext.createGeometry();
      let glboostMesh = glBoostContext.createMesh(geometry);

      let _indicesArray = [];
      let _positions = [];
      let _normals = [];
      let vertexData = {
        position: _positions,
        normal: _normals,
        components: {},
        componentBytes: {},
        componentType: {}
      };
      let additional = {
        'joint': [],
        'weight': [],
        'texcoord': []
      };

      let dataViewMethodDic = {};
      let materials = [];
      let indicesAccumulatedLength = 0;

      for (let i in mesh.primitives) {
        let primitive = mesh.primitives[i];
        {
          let accessor = primitive.attributes.POSITION;
          _positions[i] = accessor.extras.vertexAttributeArray;
          vertexData.components.position = accessor.extras.componentN;
          vertexData.componentBytes.position = accessor.extras.componentBytes;
          vertexData.componentType.position = accessor.componentType;
          dataViewMethodDic.position = accessor.extras.dataViewMethod;
        }
          
        let indices = null;
        if (typeof primitive.indices !== 'undefined') {
          let indicesAccessorStr = primitive.indices;
          indices = primitive.indices
          for (let j=0; j<indices.length; j++) {
            indices[j] = indicesAccumulatedLength + indices[j];
          }
          _indicesArray[i] = indices;
          indicesAccumulatedLength += _positions[i].length /  vertexData.components.position;
        }

        {
          let accessor = primitive.attributes.NORMAL;
          _normals[i] = accessor.extras.vertexAttributeArray;
          vertexData.components.normal = accessor.extras.componentN;
          vertexData.componentBytes.normal = accessor.extras.componentBytes;
          vertexData.componentType.normal = accessor.componentType;
          dataViewMethodDic.normal = accessor.extras.dataViewMethod;
        }

        if (primitive.material) {
          var texcoords = null;
  
          let material = primitiveJson.material;
  
          let glboostMaterial = null;
          if (options.extensionLoader && options.extensionLoader.createClassicMaterial) {
            glboostMaterial = options.extensionLoader.createClassicMaterial(glBoostContext);
          } else {
            glboostMaterial = glBoostContext.createClassicMaterial();
          }
          if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
            glboostMaterial.shaderParameters.isNeededToMultiplyAlphaToColorOfPixelOutput = options.isNeededToMultiplyAlphaToColorOfPixelOutput;
          }
          this._materials.push(glboostMaterial);
  
          let accessor = primitive.attributes.TEXCOORD_0;

          this._setupMaterial(glBoostContext, gltfModel, glboostMaterial, material, accessor, additional, vertexData, dataViewMethodDic, _positions, i);
  
          materials.push(glboostMaterial);
        } else {
          let glboostMaterial = null;
//          if (options.extensionLoader && options.extensionLoader.createClassicMaterial) {
//            glboostMaterial = options.extensionLoader.createClassicMaterial(glBoostContext);
//          } else {
            glboostMaterial = glBoostContext.createClassicMaterial();
//          }
          if (defaultShader) {
            glboostMaterial.shaderClass = defaultShader;
          } else {
            glboostMaterial.baseColor = new Vector4(0.5, 0.5, 0.5, 1);
          }
          materials.push(glboostMaterial);
        }
      }

      if (meshJson.primitives.length > 1) {
        let lengthDic = {index: 0, position: 0, normal: 0, joint: 0, weight: 0, texcoord: 0};
        for (let i = 0; i < meshJson.primitives.length; i++) {
          //lengthDic.index += _indicesArray[i].length;
          lengthDic.position += _positions[i].length;
          if (_normals[i]) {
            lengthDic.normal += _normals[i].length;
          }
          if (typeof additional['joint'][i] !== 'undefined') {
            lengthDic.joint += additional['joint'][i].length;
          }
          if (typeof additional['weight'][i] !== 'undefined') {
            lengthDic.weight += additional['weight'][i].length;
          }
          if (typeof additional['texcoord'][i] !== 'undefined') {
            lengthDic.texcoord += additional['texcoord'][i].length;
          }
        }
  
        function getTypedArray(dataViewMethod, length) {
          let vertexAttributeArray = null;
          if (dataViewMethod === 'getInt8') {
            vertexAttributeArray = new Int8Array(length);
          } else if (dataViewMethod === 'getUint8') {
            vertexAttributeArray = new Uint8Array(length);
          } else if (dataViewMethod === 'getInt16') {
            vertexAttributeArray = new Int16Array(length);
          } else if (dataViewMethod === 'getUint16') {
            vertexAttributeArray = new Uint16Array(length);
          } else if (dataViewMethod === 'getInt32') {
            vertexAttributeArray = new Int32Array(length);
          } else if (dataViewMethod === 'getUint32') {
            vertexAttributeArray = new Uint32Array(length);
          } else if (dataViewMethod === 'getFloat32') {
            vertexAttributeArray = new Float32Array(length);
          }
  
          return vertexAttributeArray;
        }
  
        for (let attribName in dataViewMethodDic) {
          let newTypedArray = getTypedArray(dataViewMethodDic[attribName], lengthDic[attribName]);
          let offset = 0;
          for (let i = 0; i < meshJson.primitives.length; i++) {
  
            let array = null;
  
            if (attribName === 'position') {
              array = _positions[i];
            } else if (attribName === 'normal') {
              array = _normals[i];
            } else if (attribName === 'joint') {
              array = additional['joint'][i];
            } else if (attribName === 'weight') {
              array = additional['weight'][i];
            } else if (attribName === 'texcoord') {
              array = additional['texcoord'][i];
            }
  
            if (array) {
              newTypedArray.set(array, offset);
              offset += array.length;
            }
          }
  
          if (attribName === 'position') {
            vertexData.position = newTypedArray;
          } else if (attribName === 'normal') {
            vertexData.normal = newTypedArray;
          } else if (attribName === 'joint') {
            additional['joint'] = newTypedArray;
          } else if (attribName === 'weight') {
            additional['weight'] = newTypedArray;
          } else if (attribName === 'texcoord') {
            additional['texcoord'] = newTypedArray;
          }
        }
  
  
      } else {
        vertexData.position = _positions[0];
        vertexData.normal = _normals[0];
        additional['joint'] = additional['joint'][0];
        additional['weight'] = additional['weight'][0];
        additional['texcoord'] = additional['texcoord'][0];
      }
  
      if (typeof vertexData.normal === 'undefined' || vertexData.normal.length === 0) {
        delete vertexData.normal;
      }
      if (typeof additional['joint'] === 'undefined' || additional['joint'].length === 0) {
        delete additional['joint'];
      }
      if (typeof additional['weight'] === 'undefined' || additional['weight'].length === 0) {
        delete additional['weight'];
      }
      if (typeof additional['texcoord'] === 'undefined' || additional['texcoord'].length === 0) {
        delete additional['texcoord'];
      }
  
  
      if (_indicesArray.length === 0) {
        _indicesArray = null;
      }
  
      geometry.setVerticesData(ArrayUtil.merge(vertexData, additional), _indicesArray);
      geometry.materials = materials;
    }
  }

  _setupMaterial(glBoostContext, gltfModel, gltfMaterial, materialJson, accessor, additional, vertexData, dataViewMethodDic, _positions, i) {
    if (accessor) {
      additional['texcoord'][i] =  accessor.extras.vertexAttributeArray;
      vertexData.components.texcoord = accessor.extras.componentN;
      vertexData.componentBytes.texcoord = accessor.extras.componentBytes;
      vertexData.componentType.texcoord = accessor.componentType;
      dataViewMethodDic.texcoord = accessor.extras.dataViewMethod;

      let setTextures = (materialJson)=> {
        let baseColorTexture = materialJson.pbrMetallicRoughness.baseColorTexture;
        if (baseColorTexture) {
          let sampler = baseColorTexture.sampler;
          let texture = glBoostContext.createTexture(baseColorTexture.image, '', {
            'TEXTURE_MAG_FILTER': sampler.magFilter,
            'TEXTURE_MIN_FILTER': sampler.minFilter,
            'TEXTURE_WRAP_S': sampler.wrapS,
            'TEXTURE_WRAP_T': sampler.wrapT
//            'UNPACK_PREMULTIPLY_ALPHA_WEBGL': isNeededToMultiplyAlphaToColorOfTexture
          });
          gltfMaterial.setTexture(texture, GLBoost.TEXTURE_PURPOSE_DIFFUSE);

          // if (options.isBlend && options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
          //   gltfMaterial.states.functions.blendFuncSeparate = [1, 771, 1, 771];
          // }
          gltfMaterial.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_IGNORE;
        }
      };
      setTextures(materialJson);

    } else {
      if (typeof vertexData.components.texcoord !== 'undefined') {
        // If texture coordinates existed even once in the previous loop
        let emptyTexcoords = [];
        let componentN = vertexData.components.position;
        let length = _positions[i].length / componentN;
        for (let k = 0; k < length; k++) {
          emptyTexcoords.push(0);
          emptyTexcoords.push(0);
        }
        additional['texcoord'][i] = new Float32Array(emptyTexcoords);
        vertexData.components.texcoord = 2;
        vertexData.componentBytes.texcoord = 4;
        dataViewMethodDic.texcoord = 'getFloat32';
      }
    }

    if (materialJson.pbrMetallicRoughness.baseColorFactor) {
      let value = materialJson.pbrMetallicRoughness.baseColorFactor;
      gltfMaterial.baseColor = new Vector4(value[0], value[1], value[2], value[3]);
    }

    if (indices !== null) {
      gltfMaterial.setVertexN(geometry, indices.length);
    }
  }

  _adjustByteAlign(typedArrayClass, arrayBuffer, alignSize, byteOffset, length) {
    if (( byteOffset % alignSize ) != 0) {
      return new typedArrayClass(arrayBuffer.slice(byteOffset), 0, length);
    } else {
      return new typedArrayClass(arrayBuffer, byteOffset, length);
    }
  }

  _checkBytesPerComponent(accessor) {

    var bytesPerComponent = 0;
    switch (accessor.componentType) {
      case 5120: // gl.BYTE
        bytesPerComponent = 1;
        break;
      case 5121: // gl.UNSIGNED_BYTE
        bytesPerComponent = 1;
        break;
      case 5122: // gl.SHORT
        bytesPerComponent = 2;
        break;
      case 5123: // gl.UNSIGNED_SHORT
        bytesPerComponent = 2;
        break;
      case 5124: // gl.INT
        bytesPerComponent = 4;
        break;
      case 5125: // gl.UNSIGNED_INT
        bytesPerComponent = 4;
        break;
      case 5126: // gl.FLOAT
        bytesPerComponent = 4;
        break;
      default:
        break;
    }
    return bytesPerComponent;
  }

  _checkComponentNumber(accessor) {

    var componentN = 0;
    switch (accessor.type) {
      case 'SCALAR':
        componentN = 1;
        break;
      case 'VEC2':
        componentN = 2;
        break;
      case 'VEC3':
        componentN = 3;
        break;
      case 'VEC4':
        componentN = 4;
        break;
      case 'MAT4':
        componentN = 16;
        break;
    }

    return componentN;
  }

  _checkDataViewMethod(accessor) {
    var dataViewMethod = '';
    switch (accessor.componentType) {
      case 5120: // gl.BYTE
        dataViewMethod = 'getInt8';
        break;
      case 5121: // gl.UNSIGNED_BYTE
        dataViewMethod = 'getUint8';
        break;
      case 5122: // gl.SHORT
        dataViewMethod = 'getInt16';
        break;
      case 5123: // gl.UNSIGNED_SHORT
        dataViewMethod = 'getUint16';
        break;
      case 5124: // gl.INT
        dataViewMethod = 'getInt32';
        break;
      case 5125: // gl.UNSIGNED_INT
        dataViewMethod = 'getUint32';
        break;
      case 5126: // gl.FLOAT
        dataViewMethod = 'getFloat32';
        break;
      default:
        break;
    }
    return dataViewMethod;
  }
  
  static _isSystemLittleEndian() {
    return !!(new Uint8Array((new Uint16Array([0x00ff])).buffer))[0];
  }

  _accessBinaryWithAccessor(accessor) {
    var bufferView = accessor.bufferView;
    var byteOffset = bufferView.byteOffset + accessor.byteOffset;
    var buffer = bufferView.buffer;
    var arrayBuffer = buffer.buffer;

    let componentN = this._checkComponentNumber(accessor);
    let componentBytes = this._checkBytesPerComponent(accessor);
    let dataViewMethod = this._checkDataViewMethod(accessor);
    if (accessor.extras === void 0) {
      accessor.extras = {};
    }

    accessor.extras.componentN = componentN;
    accessor.extras.componentBytes = componentBytes;
    accessor.extras.dataViewMethod = dataViewMethod;

    var byteLength = componentBytes * componentN * accessor.count;

    var vertexAttributeArray = [];

    if (accessor.extras && accessor.extras.toGetAsTypedArray) {
      if (ModelConverter._isSystemLittleEndian()) {
        if (dataViewMethod === 'getFloat32') {
          vertexAttributeArray = this._adjustByteAlign(Float32Array, arrayBuffer, 4, byteOffset, byteLength / componentBytes);
        } else if (dataViewMethod === 'getInt8') {
          vertexAttributeArray = new Int8Array(arrayBuffer, byteOffset, byteLength / componentBytes);
        } else if (dataViewMethod === 'getUint8') {
          vertexAttributeArray = new Uint8Array(arrayBuffer, byteOffset, byteLength / componentBytes);
        } else if (dataViewMethod === 'getInt16') {
          vertexAttributeArray = this._adjustByteAlign(Int16Array, arrayBuffer, 2, byteOffset, byteLength / componentBytes);
        } else if (dataViewMethod === 'getUint16') {
          vertexAttributeArray = this._adjustByteAlign(Uint16Array, arrayBuffer, 2, byteOffset, byteLength / componentBytes);
        } else if (dataViewMethod === 'getInt32') {
          vertexAttributeArray = this._adjustByteAlign(Int32Array, arrayBuffer, 4, byteOffset, byteLength / componentBytes);
        } else if (dataViewMethod === 'getUint32') {
          vertexAttributeArray = this._adjustByteAlign(Uint32Array, arrayBuffer, 4, byteOffset, byteLength / componentBytes);
        }

      } else {
        let dataView = new DataView(arrayBuffer, byteOffset, byteLength);
        let byteDelta = componentBytes * componentN;
        let littleEndian = true;
        for (let pos = 0; pos < byteLength; pos += byteDelta) {
          switch (accessor.type) {
            case 'SCALAR':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              break;
            case 'VEC2':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes, littleEndian));
              break;
            case 'VEC3':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes * 2, littleEndian));
              break;
            case 'VEC4':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes * 2, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes * 3, littleEndian));
              break;
          }
        }
        if (dataViewMethod === 'getInt8') {
          vertexAttributeArray = new Int8Array(vertexAttributeArray);
        } else if (dataViewMethod === 'getUint8') {
          vertexAttributeArray = new Uint8Array(vertexAttributeArray);
        } else if (dataViewMethod === 'getInt16') {
          vertexAttributeArray = new Int16Array(vertexAttributeArray);
        } else if (dataViewMethod === 'getUint16') {
          vertexAttributeArray = new Uint16Array(vertexAttributeArray);
        } else if (dataViewMethod === 'getInt32') {
          vertexAttributeArray = new Int32Array(vertexAttributeArray);
        } else if (dataViewMethod === 'getUint32') {
          vertexAttributeArray = new Uint32Array(vertexAttributeArray);
        } else if (dataViewMethod === 'getFloat32') {
          vertexAttributeArray = new Float32Array(vertexAttributeArray);
        }
      }
    } else {
      let dataView = new DataView(arrayBuffer, byteOffset, byteLength);
      let byteDelta = componentBytes * componentN;
      let littleEndian = true;
      for (let pos = 0; pos < byteLength; pos += byteDelta) {

        switch (accessor.type) {
          case 'SCALAR':
            vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
            break;
          case 'VEC2':
            vertexAttributeArray.push(new Vector2(
              dataView[dataViewMethod](pos, littleEndian),
              dataView[dataViewMethod](pos+componentBytes, littleEndian)
            ));
            break;
          case 'VEC3':
            vertexAttributeArray.push(new Vector3(
              dataView[dataViewMethod](pos, littleEndian),
              dataView[dataViewMethod](pos+componentBytes, littleEndian),
              dataView[dataViewMethod](pos+componentBytes*2, littleEndian)
            ));
            break;
          case 'VEC4':
            if (accessor.extras && accessor.extras.quaternionIfVec4) {
              vertexAttributeArray.push(new Quaternion(
                dataView[dataViewMethod](pos, littleEndian),
                dataView[dataViewMethod](pos+componentBytes, littleEndian),
                dataView[dataViewMethod](pos+componentBytes*2, littleEndian),
                dataView[dataViewMethod](pos+componentBytes*3, littleEndian)
              ));
            } else {
              vertexAttributeArray.push(new Vector4(
                dataView[dataViewMethod](pos, littleEndian),
                dataView[dataViewMethod](pos+componentBytes, littleEndian),
                dataView[dataViewMethod](pos+componentBytes*2, littleEndian),
                dataView[dataViewMethod](pos+componentBytes*3, littleEndian)
              ));
            }
            break;
          case 'MAT4':
            let matrixComponents = [];
            for (let i=0; i<16; i++) {
              matrixComponents[i] = dataView[dataViewMethod](pos+componentBytes*i, littleEndian);
            }
            vertexAttributeArray.push(new Matrix44(matrixComponents, true));
            break;
        }

      }
    }

    accessor.extras.vertexAttributeArray = vertexAttributeArray;

    return vertexAttributeArray;
  }
}

GLBoost["ModelConverter"] = ModelConverter;
