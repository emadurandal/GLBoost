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
  loadGLTF(uri,
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
          let gltfJson = JSON.parse(gotText);

          //let glTFVer = this._checkGLTFVersion(gltfJson);
          let resultJson = {};
          let promise = this._loadInner(null, basePath, gltfJson, options, resultJson);

          promise.then(() => {
            console.log('Resoureces loading done!');
            resolve(resultJson);
          });
  
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
        let gltfJson = JSON.parse(gotText);
        let arrayBufferBinary = arrayBuffer.slice(20 + lengthOfJSonChunkData + 8);

//        let glTFVer = this._checkGLTFVersion(gltfJson);

        let promise = this._loadInner(arrayBufferBinary, null, gltfJson, options, resultJson);

        promise.then(() => {
          console.log('Resoureces loading done!');
          resolve(resultJson);
        });
      }, (reject, error)=>{}
    );
  }

  _loadInner(arrayBufferBinary, basePath, gltfJson, options, resultJson) {
    let promises = [];

    let resources = {
      shaders: [],
      buffers: [],
      images: []
    };
    promises.push(this._loadResources(arrayBufferBinary, null, gltfJson, options, resources));
    this._loadJsonContent(gltfJson, resources, options);

    return Promise.all(promises);
  }

  _loadJsonContent(gltfJson, resources, options) {
    
  }

  _loadResources(arrayBufferBinary, basePath, gltfJson, options, resources) {
    let promisesToLoadResources = [];

    // Shaders Async load
    for (let i in gltfJson.shaders) {
      resources.shaders[i] = {};

      let shaderJson = gltfJson.shaders[i];
      let shaderType = shaderJson.type;
      if (typeof shaderJson.extensions !== 'undefined' && typeof shaderJson.extensions.KHR_binary_glTF !== 'undefined') {
        resources.shaders[i].shaderText = this._accessBinaryAsShader(shaderJson.extensions.KHR_binary_glTF.bufferView, gltfJson, arrayBufferBinary);
        resources.shaders[i].shaderType = shaderType;
        continue;
      }

      let shaderUri = shaderJson.uri;
      if (shaderUri.match(/^data:/)) {
        promisesToLoadResources.push(
          new Promise((fulfilled, rejected) => {
            let arrayBuffer = DataUtil.base64ToArrayBuffer(shaderUri);
            resources.shaders[i].shaderText = DataUtil.arrayBufferToString(arrayBuffer);
            resources.shaders[i].shaderType = shaderType;
            fulfilled();
          })
        );
      } else {
        shaderUri = basePath + shaderUri;
        promisesToLoadResources.push(
          DataUtil.loadResourceAsync(shaderUri, false,
            (resolve, response)=>{
              resources.shaders[i].shaderText = response;
              resources.shaders[i].shaderType = shaderType;
              resolve();
            },
            (reject, error)=>{

            }
          )
        );
      }
    }

    // Buffers Async load
    for (let i in gltfJson.buffers) {
      let bufferInfo = gltfJson.buffers[i];
      if (typeof bufferInfo.uri === 'undefined') {
        resources.buffers[i] = arrayBufferBinary;
      } else if (bufferInfo.uri.match(/^data:application\/octet-stream;base64,/)) {
        promisesToLoadResources.push(
          new Promise((resolve, rejected) => {
            let arrayBuffer = DataUtil.base64ToArrayBuffer(bufferInfo.uri);
            resources.buffers[i] = arrayBuffer;
            resolve();
          })
        );
      } else {
        promisesToLoadResources.push(
          DataUtil.loadResourceAsync(basePath + bufferInfo.uri, true,
            (resolve, response)=>{
              resources.buffers[i] = response;
              resolve();
            },
            (reject, error)=>{

            }
          )
        );
      }
    }

    // Textures Async load
    for (let i in gltfJson.images) {
      let imageJson = gltfJson.images[i];
      //let imageJson = gltfJson.images[textureJson.source];
      //let samplerJson = gltfJson.samplers[textureJson.sampler];

      let imageUri = null;

      if (typeof imageJson.uri === 'undefined') {
        imageUri = this._accessBinaryAsImage(imageJson.bufferView, gltfJson, arrayBufferBinary, imageJson.mimeType);
      } else {
        let imageFileStr = imageJson.uri;
        if (imageFileStr.match(/^data:/)) {
          imageUri = imageFileStr;
        } else {
          imageUri = basePath + imageFileStr;
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

      // let texture = glBoostContext.createTexture(null, textureName, {
      //   'TEXTURE_MAG_FILTER': samplerJson.magFilter,
      //   'TEXTURE_MIN_FILTER': samplerJson.minFilter,
      //   'TEXTURE_WRAP_S': samplerJson.wrapS,
      //   'TEXTURE_WRAP_T': samplerJson.wrapT,
      //   'UNPACK_PREMULTIPLY_ALPHA_WEBGL': isNeededToMultiplyAlphaToColorOfTexture
      // });
      
      if (options.extensionLoader && options.extensionLoader.setUVTransformToTexture) {
        options.extensionLoader.setUVTransformToTexture(texture, samplerJson);
      }
      
      promisesToLoadResources.push(new Promise((resolve, reject)=> {
        let img = new Image();
        if (!imageUri.match(/^data:/)) {
          img.crossOrigin = 'Anonymous';
        }
        img.onload = () => {
          resolve(img);
        };

        img.src = imageUri;

        resources.images[i] = img;
      }));
    }

    return Promise.all(promisesToLoadResources);
  }

  _accessBinaryAsImage(bufferViewStr, gltfJson, arrayBuffer, mimeType) {
    let bufferViewJson = gltfJson.bufferViews[bufferViewStr];
    let byteOffset = bufferViewJson.byteOffset;
    let byteLength = bufferViewJson.byteLength;

    let arrayBufferSliced = arrayBuffer.slice(byteOffset, byteOffset + byteLength);
    let bytes = new Uint8Array(arrayBufferSliced);
    let binaryData = '';
    for (let i = 0, len = bytes.byteLength; i < len; i++) {
      binaryData += String.fromCharCode(bytes[i]);
    }
    let imgSrc = '';
    if (mimeType == 'image/jpeg') {
      imgSrc = "data:image/jpeg;base64,";
    } else if (mimeType == 'image/png') {
      imgSrc = "data:image/png;base64,";
    } else if (mimeType == 'image/gif') {
      imgSrc = "data:image/gif;base64,";
    } else if (mimeType == 'image/bmp') {
      imgSrc = "data:image/bmp;base64,";
    } else {
      imgSrc = "data:image/unknown;base64,";
    }
    let dataUrl = imgSrc + DataUtil.btoa(binaryData);

    return dataUrl;
  }
}

GLBoost["GLTF2Loader"] = GLTF2Loader;
