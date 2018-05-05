import GLBoost from '../../globals';
import DataUtil from '../../low_level/misc/DataUtil';


let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * This is a loader class of glTF2 file format. You can see more detail of glTF2 format at https://github.com/KhronosGroup/glTF .
 */
export default class GLTF2Loader {

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
      this[singleton] = new GLTF2Loader(singletonEnforcer);
    }
    return this[singleton];
  }

  /**
   * the method to load glTF2 file.
   * @param {string} uri uri of glTF file
   * @return {Promise} a promise object
   */
  loadGLTF(glBoostContext, uri,
    options = {
      extensionLoader: null,
      defaultShader: null,
      isNeededToMultiplyAlphaToColorOfPixelOutput: true,
      isTextureImageToLoadPreMultipliedAlpha: false,
      isExistJointGizmo: false,
      isBlend: false,
      isDepthTest: true,
      isAllMeshesTransparent: true
    }) 
    {

    return DataUtil.loadResourceAsync(uri, true,
      (resolve, response)=>{
        var arrayBuffer = response;

        this._materials = [];

        let dataView = new DataView(arrayBuffer, 0, 20);
        let isLittleEndian = true;

        // Magic field
        let magic = dataView.getUint32(0, isLittleEndian);

        // 0x46546C67 is 'glTF' in ASCII codes.
        if (magic !== 0x46546C67) {
          // It must be normal glTF (NOT binary) file...
          let gotText = DataUtil.arrayBufferToString(arrayBuffer);
          let partsOfPath = uri.split('/');
          let basePath = '';
          for (let i = 0; i < partsOfPath.length - 1; i++) {
            basePath += partsOfPath[i] + '/';
          }
          let json = JSON.parse(gotText);

          let glTFVer = this._checkGLTFVersion(json);

          this._loadResourcesAndScene(glBoostContext, null, basePath, json, defaultShader, glTFVer, resolve, options);

          return;
        }

        let gltfVer = dataView.getUint32(4, isLittleEndian);
        if (gltfVer !== 2) {
          reject('invalid version field in this binary glTF file.');
        }

        let lengthOfThisFile = dataView.getUint32(8, isLittleEndian);
        let lengthOfJSonChunkData = dataView.getUint32(12, isLittleEndian);
        let chunkType = dataView.getUint32(16, isLittleEndian);

        // 0x4E4F534A means JSON format (0x4E4F534A is 'JSON' in ASCII codes)
        if (chunkType !== 0x4E4F534A) {
          reject('invalid chunkType of chunk0 in this binary glTF file.');
        }


        let arrayBufferJSonContent = arrayBuffer.slice(20, 20 + lengthOfJSonChunkData);
        let gotText = DataUtil.arrayBufferToString(arrayBufferJSonContent);
        let json = JSON.parse(gotText);
        let arrayBufferBinary = arrayBuffer.slice(20 + lengthOfJSonChunkData + 8);

        let glTFVer = this._checkGLTFVersion(json);

        this._loadResourcesAndScene(glBoostContext, arrayBufferBinary, null, json, defaultShader, glTFVer, resolve, options);
      }, (reject, error)=>{}
    );
  }
}

GLBoost["GLTF2Loader"] = GLTF2Loader;
