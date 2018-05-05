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

          this._loadResourcesAndScene(glBoostContext, null, basePath, json, resolve, options);

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

//        let glTFVer = this._checkGLTFVersion(json);

        this._loadResourcesAndScene(glBoostContext, arrayBufferBinary, null, json, resolve, options);
      }, (reject, error)=>{}
    );
  }

  _loadResourcesAndScene(glBoostContext, arrayBufferBinary, basePath, json, defaultShader, glTFVer, resolve, options) {
    let shaders = {};
    let buffers = {};
    let textures = {};
    let promisesToLoadResources = [];

    // Shaders Async load
    for (let shaderName in json.shaders) {
      shaders[shaderName] = {};

      let shaderJson = shadersJson[shaderName];
      let shaderType = shaderJson.type;
      if (typeof shaderJson.extensions !== 'undefined' && typeof shaderJson.extensions.KHR_binary_glTF !== 'undefined') {
        shaders[shaderName].shaderText = this._accessBinaryAsShader(shaderJson.extensions.KHR_binary_glTF.bufferView, json, arrayBufferBinary);
        shaders[shaderName].shaderType = shaderType;
        continue;
      }

      let shaderUri = shaderJson.uri;
      if (shaderUri.match(/^data:/)) {
        promisesToLoadResources.push(
          new Promise((fulfilled, rejected) => {
            let arrayBuffer = DataUtil.base64ToArrayBuffer(shaderUri);
            shaders[shaderName].shaderText = DataUtil.arrayBufferToString(arrayBuffer);
            shaders[shaderName].shaderType = shaderType;
            fulfilled();
          })
        );
      } else {
        shaderUri = basePath + shaderUri;
        promisesToLoadResources.push(
          DataUtil.loadResourceAsync(shaderUri, false,
            (resolve, response)=>{
              shaders[shaderName].shaderText = response;
              shaders[shaderName].shaderType = shaderType;
              resolve();
            },
            (reject, error)=>{

            }
          )
        );
      }
    }

    // Buffers Async load
    for (let bufferName in json.buffers) {
      let bufferInfo = json.buffers[bufferName];

      if (bufferInfo.uri.match(/^data:application\/octet-stream;base64,/)) {
        promisesToLoadResources.push(
          new Promise((fulfilled, rejected) => {
            let arrayBuffer = DataUtil.base64ToArrayBuffer(bufferInfo.uri);
            buffers[bufferName] = arrayBuffer;
            fulfilled();
          })
        );
      } else if (bufferInfo.uri === 'data:,') {
        buffers[bufferName] = arrayBufferBinary;
      } else {
        promisesToLoadResources.push(
          DataUtil.loadResourceAsync(basePath + bufferInfo.uri, true,
            (resolve, response)=>{
              buffers[bufferName] = response;
              resolve();
            },
            (reject, error)=>{

            }
          )
        );
      }
    }

    // Textures Async load
    for (let textureName in json.textures) {
      let textureJson = json.textures[textureName];
      let imageJson = json.images[textureJson.source];
      let samplerJson = json.samplers[textureJson.sampler];

      let textureUri = null;

      if (typeof imageJson.extensions !== 'undefined' && typeof imageJson.extensions.KHR_binary_glTF !== 'undefined') {
        textureUri = this._accessBinaryAsImage(imageJson.extensions.KHR_binary_glTF.bufferView, json, arrayBufferBinary, imageJson.extensions.KHR_binary_glTF.mimeType);
      } else {
        let imageFileStr = imageJson.uri;
        if (imageFileStr.match(/^data:/)) {
          textureUri = imageFileStr;
        } else {
          textureUri = basePath + imageFileStr;
        }
      }

      let isNeededToMultiplyAlphaToColorOfTexture = false;
      if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
        if (options.isTextureImageToLoadPreMultipliedAlpha) {
          // Nothing to do because premultipling alpha is already done.
        } else {
          isNeededToMultiplyAlphaToColorOfTexture = true;
        }
      } else { // if is NOT Needed To Multiply AlphaToColor Of PixelOutput
        if (options.isTextureImageToLoadPreMultipliedAlpha) {
          // TODO: Implement to Make Texture Straight.
        } else {
          // Nothing to do because the texture is straight.
        }        
      }
      
      let texture = glBoostContext.createTexture(null, textureName, {
        'TEXTURE_MAG_FILTER': samplerJson.magFilter,
        'TEXTURE_MIN_FILTER': samplerJson.minFilter,
        'TEXTURE_WRAP_S': samplerJson.wrapS,
        'TEXTURE_WRAP_T': samplerJson.wrapT,
        'UNPACK_PREMULTIPLY_ALPHA_WEBGL': isNeededToMultiplyAlphaToColorOfTexture
      });
      
      if (options.extensionLoader && options.extensionLoader.setUVTransformToTexture) {
        options.extensionLoader.setUVTransformToTexture(texture, samplerJson);
      }

      let promise = texture.generateTextureFromUri(textureUri, false);
      textures[textureName] = texture;
      promisesToLoadResources.push(promise);

    }

    if (promisesToLoadResources.length > 0) {
      Promise.resolve()
        .then(() => {
          return Promise.all(promisesToLoadResources);
        })
    } else {
      this._IterateNodeOfScene(glBoostContext, buffers, basePath, json, shaders, textures, resolve, options);
    }

  }
}

GLBoost["GLTF2Loader"] = GLTF2Loader;
