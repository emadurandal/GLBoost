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

  convertToGLBoostModel(gltfModel) {
    //gltfModel.
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
  
  _accessBinaryWithAccessor(accessor, json, quaternionIfVec4 = false, toGetAsTypedArray = false) {
    var bufferView = accessor.bufferView;
    var byteOffset = bufferView.byteOffset + accessor.byteOffset;
    var bufferStr = bufferView.buffer;
    var arrayBuffer = accessor.buffer.buffer;

    let componentN = this._checkComponentNumber(accessor);
    let bytesPerComponent = this._checkBytesPerComponent(accessor);
    var dataViewMethod = this._checkDataViewMethod(accessor);


    var byteLength = bytesPerComponent * componentN * accessor.count;

    var vertexAttributeArray = [];

    if (toGetAsTypedArray) {
      if (GLTFLoader._isSystemLittleEndian()) {
        if (dataViewMethod === 'getFloat32') {
          vertexAttributeArray = this._adjustByteAlign(Float32Array, arrayBuffer, 4, byteOffset, byteLength / bytesPerComponent);
        } else if (dataViewMethod === 'getInt8') {
          vertexAttributeArray = new Int8Array(arrayBuffer, byteOffset, byteLength / bytesPerComponent);
        } else if (dataViewMethod === 'getUint8') {
          vertexAttributeArray = new Uint8Array(arrayBuffer, byteOffset, byteLength / bytesPerComponent);
        } else if (dataViewMethod === 'getInt16') {
          vertexAttributeArray = this._adjustByteAlign(Int16Array, arrayBuffer, 2, byteOffset, byteLength / bytesPerComponent);
        } else if (dataViewMethod === 'getUint16') {
          vertexAttributeArray = this._adjustByteAlign(Uint16Array, arrayBuffer, 2, byteOffset, byteLength / bytesPerComponent);
        } else if (dataViewMethod === 'getInt32') {
          vertexAttributeArray = this._adjustByteAlign(Int32Array, arrayBuffer, 4, byteOffset, byteLength / bytesPerComponent);
        } else if (dataViewMethod === 'getUint32') {
          vertexAttributeArray = this._adjustByteAlign(Uint32Array, arrayBuffer, 4, byteOffset, byteLength / bytesPerComponent);
        }

      } else {
        let dataView = new DataView(arrayBuffer, byteOffset, byteLength);
        let byteDelta = bytesPerComponent * componentN;
        let littleEndian = true;
        for (let pos = 0; pos < byteLength; pos += byteDelta) {
          switch (accessor.type) {
            case 'SCALAR':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              break;
            case 'VEC2':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent, littleEndian));
              break;
            case 'VEC3':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent * 2, littleEndian));
              break;
            case 'VEC4':
              vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent * 2, littleEndian));
              vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent * 3, littleEndian));
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
      let byteDelta = bytesPerComponent * componentN;
      let littleEndian = true;
      for (let pos = 0; pos < byteLength; pos += byteDelta) {

        switch (accessor.type) {
          case 'SCALAR':
            vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
            break;
          case 'VEC2':
            vertexAttributeArray.push(new Vector2(
              dataView[dataViewMethod](pos, littleEndian),
              dataView[dataViewMethod](pos+bytesPerComponent, littleEndian)
            ));
            break;
          case 'VEC3':
            vertexAttributeArray.push(new Vector3(
              dataView[dataViewMethod](pos, littleEndian),
              dataView[dataViewMethod](pos+bytesPerComponent, littleEndian),
              dataView[dataViewMethod](pos+bytesPerComponent*2, littleEndian)
            ));
            break;
          case 'VEC4':
            if (quaternionIfVec4) {
              vertexAttributeArray.push(new Quaternion(
                dataView[dataViewMethod](pos, littleEndian),
                dataView[dataViewMethod](pos+bytesPerComponent, littleEndian),
                dataView[dataViewMethod](pos+bytesPerComponent*2, littleEndian),
                dataView[dataViewMethod](pos+bytesPerComponent*3, littleEndian)
              ));
            } else {
              vertexAttributeArray.push(new Vector4(
                dataView[dataViewMethod](pos, littleEndian),
                dataView[dataViewMethod](pos+bytesPerComponent, littleEndian),
                dataView[dataViewMethod](pos+bytesPerComponent*2, littleEndian),
                dataView[dataViewMethod](pos+bytesPerComponent*3, littleEndian)
              ));
            }
            break;
          case 'MAT4':
            let matrixComponents = [];
            for (let i=0; i<16; i++) {
              matrixComponents[i] = dataView[dataViewMethod](pos+bytesPerComponent*i, littleEndian);
            }
            vertexAttributeArray.push(new Matrix44(matrixComponents, true));
            break;
        }

      }
    }


    return vertexAttributeArray;
  }
}

GLBoost["ModelConverter"] = ModelConverter;
