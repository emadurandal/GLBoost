import GLBoost from '../globals'
import GLContext from '../GLContext'
import Geometry from '../Geometry'
import ClassicMaterial from '../ClassicMaterial'
import Mesh from '../Mesh'
import PhongShader from '../shaders/PhongShader'
import Vector3 from '../math/Vector3'

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class GLTFLoader {

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLTFLoader(singletonEnforcer);
    }
    return this[singleton];
  }

  loadGLTF(url, canvas, defaultShader = null, mtlString = null) {
    return new Promise((resolve, reject)=> {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = ()=> {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          var gotText = xmlHttp.responseText;
          var partsOfPath = url.split('/');
          var basePath = '';
          for(var i=0; i<partsOfPath.length-1; i++) {
            basePath += partsOfPath[i] + '/';
          }
          console.log(basePath);
          this._constructMesh(gotText, basePath, canvas, resolve);
        }
      };

      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    });
  }

  _constructMesh(gotText, basePath, canvas, resolve) {
    var json = JSON.parse(gotText);

    for (let bufferName in json.buffers) {
      //console.log("name: " + bufferName + " data:" + );
      let bufferInfo = json.buffers[bufferName];
      this._loadBinaryFile(basePath + bufferInfo.uri, json, canvas, resolve);
    }
  }

  _loadBinaryFile(path, json, canvas, resolve) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", path, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = (oEvent)=> {
      var arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {

        let meshJson = null;
        for (let mesh in json.meshes) {
          meshJson = json.meshes[mesh];
        }
        let primitiveJson = meshJson.primitives[0];
        let gl = GLContext.getInstance(canvas).gl;

        let indicesAccessorStr = primitiveJson.indices;
        let indices = this._accessBinary(indicesAccessorStr, json, arrayBuffer, gl);

        let positionsAccessorStr = primitiveJson.attributes.POSITION;
        let positions = this._accessBinary(positionsAccessorStr, json, arrayBuffer, gl);

        let normalsAccessorStr = primitiveJson.attributes.NORMAL;
        let normals = this._accessBinary(normalsAccessorStr, json, arrayBuffer, gl);

        var geometry = new Geometry(canvas);
        geometry.setVerticesData({
          position: positions,
          normal: normals
        }, [indices]);
      }
      var mesh = new Mesh(geometry);
      mesh.material = new ClassicMaterial(canvas);
      mesh.material.shader = new PhongShader(canvas);

      resolve(mesh);
    };

    oReq.send(null);
  }

  _accessBinary(accessorStr, json, arrayBuffer, gl) {
    var accessorJson = json.accessors[accessorStr];
    var bufferViewStr = accessorJson.bufferView;
    var bufferViewJson = json.bufferViews[bufferViewStr];
    var byteOffset = bufferViewJson.byteOffset + accessorJson.byteOffset;

    var componentN = 0;
    switch (accessorJson.type) {
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
    }

    var bytesPerComponent = 0;
    var dataViewMethod = '';
    switch (accessorJson.componentType) {
      case gl.UNSIGNED_SHORT:
        bytesPerComponent = 2;
        dataViewMethod = 'getUint16';
        break;
      case gl.FLOAT:
        bytesPerComponent = 4;
        dataViewMethod = 'getFloat32';
        break;
    }

    var byteLength = bytesPerComponent * componentN * accessorJson.count;

    var vertexAttributeArray = [];
    let dataView = new DataView(arrayBuffer, byteOffset, byteLength);
    let byteDelta = bytesPerComponent * componentN;
    let littleEndian = true;
    for (let pos = 0; pos < byteLength; pos += byteDelta) {

      switch (accessorJson.type) {
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
          vertexAttributeArray.push(new Vector4(
            dataView[dataViewMethod](pos, littleEndian),
            dataView[dataViewMethod](pos+bytesPerComponent, littleEndian),
            dataView[dataViewMethod](pos+bytesPerComponent*2, littleEndian),
            dataView[dataViewMethod](pos+bytesPerComponent*3, littleEndian)
          ));
          break;
      }

    }

    return vertexAttributeArray;
  }

}



GLBoost["GLTFLoader"] = GLTFLoader;
