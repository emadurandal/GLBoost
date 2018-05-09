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
      isAllMeshesTransparent: false
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
          let promise = this._loadInner(null, basePath, gltfJson, options);

          promise.then((gltfJson) => {
            console.log('Resoureces loading done!');
            resolve(gltfJson[0][0]);
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

        let promise = this._loadInner(arrayBufferBinary, null, gltfJson, options);

        promise.then((gltfJson) => {
          console.log('Resoureces loading done!');
          resolve(gltfJson[0][0]);
        });
      }, (reject, error)=>{}
    );
  }

  _loadInner(arrayBufferBinary, basePath, gltfJson, options) {
    let promises = [];

    let resources = {
      shaders: [],
      buffers: [],
      images: []
    };
    promises.push(this._loadResources(arrayBufferBinary, basePath, gltfJson, options, resources));
    promises.push(new Promise(((resolve, reject) => {
      this._loadJsonContent(gltfJson, resources, options);
      resolve();
    })));

    return Promise.all(promises);
  }

  _loadJsonContent(gltfJson, resources, options) {

    // Scene
    this._loadDependenciesOfScenes(gltfJson);

    // Node
    this._loadDependenciesOfNodes(gltfJson);

    // Node Transformation
//    this._loadTransformationsOfNodes(gltfJson);

    // Mesh
    this._loadDependenciesOfMeshes(gltfJson);

    // Material
    this._loadDependenciesOfMaterials(gltfJson);

    // Texture
    this._loadDependenciesOfTextures(gltfJson);

    // Joint
    this._loadDependenciesOfJoints(gltfJson);

    // Animation
    this._loadDependenciesOfAnimations(gltfJson);

    // Accessor
    this._loadDependenciesOfAccessors(gltfJson);

    // BufferView
    this._loadDependenciesOfBufferViews(gltfJson);

    if (gltfJson.asset === void 0) {
      gltfJson.asset = {};
    }
    if (gltfJson.asset.extras === void 0) {
      gltfJson.asset.extras = {};
    }
    gltfJson.asset.extras.glboostOptions = options;

  }

  _loadDependenciesOfScenes(gltfJson) {
    for (let scene of gltfJson.scenes) {
      scene.nodesIndices = scene.nodes.concat();
      for (let i in scene.nodesIndices) {
        scene.nodes[i] = gltfJson.nodes[scene.nodesIndices[i]];
      }
    }
  }

  _loadDependenciesOfNodes(gltfJson) {

    for (let node of gltfJson.nodes) {

      // Hierarchy
      if (node.children) {
        node.childrenIndices = node.children.concat();
        node.children = [];
        for (let i in node.childrenIndices) {
          node.children[i] = gltfJson.nodes[node.childrenIndices[i]];
        }
      }
 
      // Mesh
      if (node.mesh !== void 0 && gltfJson.meshes !== void 0) {
        node.meshIndex = node.mesh;
        node.mesh = gltfJson.meshes[node.meshIndex];
      }

      // Skin
      if (node.skin !== void 0 && gltfJson.skins !== void 0) {
        node.skinIndex = node.skin;
        node.skin = gltfJson.skins[node.skinIndex];
        if (node.mesh.extras === void 0) {
          node.mesh.extras = {};
        }

        node.mesh.extras._skin = node.skin;
      }

      // Camera
      if (node.camera !== void 0 && gltfJson.cameras !== void 0) {
        node.cameraIndex = node.camera;
        node.camera = gltfJson.cameras[node.cameraIndex];
      }

    }


  }
  
  _loadDependenciesOfMeshes(gltfJson) {
    // Mesh
    for (let mesh of gltfJson.meshes) {
      for (let primitive of mesh.primitives) {
        if (primitive.material) {
          primitive.materialIndex = primitive.material;
          primitive.material = gltfJson.materials[primitive.materialIndex];  
        }

        primitive.attributesindex = Object.assign({}, primitive.attributes);
        for (let attributeName in primitive.attributesindex) {
          if (primitive.attributesindex[attributeName] >= 0) {
            let accessor = gltfJson.accessors[primitive.attributesindex[attributeName]];
            accessor.extras = {
              toGetAsTypedArray: true
            };
            primitive.attributes[attributeName] = accessor;
          } else {
            primitive.attributes[attributeName] = void 0;
          }
        }

        if (primitive.indices !== void 0) {
          primitive.indicesIndex = primitive.indices;
          primitive.indices = gltfJson.accessors[primitive.indicesIndex];
        }
      }
    }
  }

  _loadDependenciesOfMaterials(gltfJson) {
    // Material
    if (gltfJson.materials) {
      for (let material of gltfJson.materials) {
        if (material.pbrMetallicRoughness) {
          let baseColorTexture = material.pbrMetallicRoughness.baseColorTexture;
          if (baseColorTexture !== void 0) {
            baseColorTexture.texture = gltfJson.textures[baseColorTexture.index];
          }
          let metallicRoughnessTexture = material.pbrMetallicRoughness.metallicRoughnessTexture;
          if (metallicRoughnessTexture !== void 0) {
            metallicRoughnessTexture.texture = gltfJson.textures[metallicRoughnessTexture.index];
          }
        }

        let normalTexture = material.normalTexture;
        if (normalTexture !== void 0) {
          normalTexture.texture = gltfJson.textures[normalTexture.index];
        }
      }
    }
  }

  _loadDependenciesOfTextures(gltfJson) {
    // Texture
    if (gltfJson.textures) {
      for (let texture of gltfJson.textures) {
        if (texture.sampler !== void 0) {
          texture.samplerIndex = texture.sampler;
          texture.sampler = gltfJson.samplers[texture.samplerIndex];
        }
        if (texture.source !== void 0) {
          texture.sourceIndex = texture.source;
          texture.image = gltfJson.images[texture.sourceIndex];
        }
      }
    }
  }

  _loadDependenciesOfJoints(gltfJson) {
    if (gltfJson.skins) {
      for (let skin of gltfJson.skins) {
        skin.skeletonIndex = skin.skeleton;
        skin.skeleton = gltfJson.nodes[skin.skeletonIndex];

        skin.inverseBindMatricesIndex = skin.inverseBindMatrices;
        skin.inverseBindMatrices = gltfJson.accessors[skin.inverseBindMatricesIndex];

        skin.jointsIndices = skin.joints;
        skin.joints = [];
        for (let jointIndex of skin.jointsIndices) {
          skin.joints.push(gltfJson.nodes[jointIndex]);
        }
        
      }
  
    }
  }


  _loadDependenciesOfAnimations(gltfJson) {
    if (gltfJson.animations) {
      for (let animation of gltfJson.animations) {
        for (let channel of animation.channels) {
          channel.samplerIndex = channel.sampler;
          channel.sampler = animation.samplers[channel.samplerIndex];
          
          channel.target.nodeIndex = channel.target.node;
          channel.target.node = gltfJson.nodes[channel.target.nodeIndex];          
        }
        for (let channel of animation.channels) {
          channel.sampler.inputIndex = channel.sampler.input;
          channel.sampler.outputIndex = channel.sampler.output;
          channel.sampler.input = gltfJson.accessors[channel.sampler.inputIndex];
          channel.sampler.output = gltfJson.accessors[channel.sampler.outputIndex];
          if (channel.target.path === 'rotation') {
            if (channel.sampler.output.extras === void 0) {
              channel.sampler.output.extras = {};
            }
            channel.sampler.output.extras.quaternionIfVec4 = true;
          }
        }
      }
    }
  }

  _loadDependenciesOfAccessors(gltfJson) {
    // Accessor
    for (let accessor of gltfJson.accessors) {
      if (accessor.bufferView !== void 0) {
        accessor.bufferViewIndex = accessor.bufferView;
        accessor.bufferView = gltfJson.bufferViews[accessor.bufferViewIndex];
      }
    }
  }

  _loadDependenciesOfBufferViews(gltfJson) {
    // BufferView
    for (let bufferView of gltfJson.bufferViews) {
      if (bufferView.buffer !== void 0) {
        bufferView.bufferIndex = bufferView.buffer;
        bufferView.buffer = gltfJson.buffers[bufferView.bufferIndex];
      }
    }
  }

  
//  _loadTransformationsOfNodes(gltfJson) {  }

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
          new Promise((resolve, rejected) => {
            let arrayBuffer = DataUtil.base64ToArrayBuffer(shaderUri);
            resources.shaders[i].shaderText = DataUtil.arrayBufferToString(arrayBuffer);
            resources.shaders[i].shaderType = shaderType;
            resolve();
          })
        );
      } else {
        shaderUri = basePath + shaderUri;
        promisesToLoadResources.push(
          DataUtil.loadResourceAsync(shaderUri, false,
            (resolve, response)=>{
              resources.shaders[i].shaderText = response;
              resources.shaders[i].shaderType = shaderType;
              resolve(gltfJson);
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
        bufferInfo.buffer = arrayBufferBinary;
      } else if (bufferInfo.uri.match(/^data:application\/octet-stream;base64,/)) {
        promisesToLoadResources.push(
          new Promise((resolve, rejected) => {
            let arrayBuffer = DataUtil.base64ToArrayBuffer(bufferInfo.uri);
            resources.buffers[i] = arrayBuffer;
            bufferInfo.buffer = arrayBuffer;
            resolve(gltfJson);
          })
        );
      } else {
        promisesToLoadResources.push(
          DataUtil.loadResourceAsync(basePath + bufferInfo.uri, true,
            (resolve, response)=>{
              resources.buffers[i] = response;
              bufferInfo.buffer = response;
              resolve(gltfJson);
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
        img.src = imageUri;
        imageJson.image = img;
        if (imageUri.match(/^data:/)) {
          resolve(gltfJson);
        } else {
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            resolve(gltfJson);
          };
        }

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
