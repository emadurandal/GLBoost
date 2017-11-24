import GLBoost from '../../globals';
import M_OrthoCamera from '../elements/cameras/M_OrthoCamera';
import M_PerspectiveCamera from '../elements/cameras/M_PerspectiveCamera';
import M_SkeletalMesh from '../elements/meshes/M_SkeletalMesh';
import DecalShader from '../shaders/DecalShader';
import LambertShader from '../shaders/LambertShader';
import PhongShader from '../shaders/PhongShader';
import FreeShader from '../shaders/FreeShader';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import Vector4 from '../../low_level/math/Vector4';
import Matrix44 from '../../low_level/math/Matrix44';
import Quaternion from '../../low_level/math/Quaternion';
import ArrayUtil from '../../low_level/misc/ArrayUtil';
import DataUtil from '../../low_level/misc/DataUtil';
import M_Group from '../elements/M_Group';
import MathUtil from "../../low_level/math/MathUtil";


let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * [en] This is a loader class of glTF file format. You can see more detail of glTF format at https://github.com/KhronosGroup/glTF .<br>
 * [ja] glTFファイルを読み込むためのローダークラスです。glTFファイルフォーマットについての詳細は https://github.com/KhronosGroup/glTF をご覧ください。
 */
export default class GLTFLoader {

  /**
   * [en] The constructor of GLTFLoader class. But you cannot use this constructor directly because of this class is a singleton class. Use getInstance() static method.<br>
   * [ja] GLTFLoaderクラスのコンストラクタです。しかし本クラスはシングルトンであるため、このコンストラクタは直接呼び出せません。getInstance()静的メソッドを使ってください。
   * @param {Symbol} enforcer [en] a Symbol to forbid calling this constructor directly [ja] このコンストラクタの直接呼び出しを禁止するためのシンボル
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
  }

  /**
   * [en] The static method to get singleton instance of this class.<br>
   * [ja] このクラスのシングルトンインスタンスを取得するための静的メソッド。
   * @return {GLTFLoader} [en] the singleton instance of GLTFLoader class [ja] GLTFLoaderクラスのシングルトンインスタンス
   */
  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLTFLoader(singletonEnforcer);
    }
    return this[singleton];
  }



  /**
   * [en] the method to load glTF file.<br>
   * [ja] glTF fileをロードするためのメソッド。
   * @param {string} url [en] url of glTF file [ja] glTFファイルのurl
   * @param {Shader} defaultShader [en] a shader to assign to loaded geometries [ja] 読み込んだジオメトリに適用するシェーダー
   * @return {Promise} [en] a promise object [ja] Promiseオブジェクト
   */
  loadGLTF(glBoostContext, url, defaultShader = null) {
    return DataUtil.loadResourceAsync(url, true,
      (resolve, response)=>{
        var arrayBuffer = response;

        let dataView = new DataView(arrayBuffer, 0, 20);
        let isLittleEndian = true;

        // Magic field
        let magicStr = '';
        magicStr += String.fromCharCode(dataView.getUint8(0, isLittleEndian));
        magicStr += String.fromCharCode(dataView.getUint8(1, isLittleEndian));
        magicStr += String.fromCharCode(dataView.getUint8(2, isLittleEndian));
        magicStr += String.fromCharCode(dataView.getUint8(3, isLittleEndian));

        if (magicStr !== 'glTF') {
          // It must be normal glTF (NOT binary) file...
          let gotText = DataUtil.arrayBufferToString(arrayBuffer);
          let partsOfPath = url.split('/');
          let basePath = '';
          for (let i = 0; i < partsOfPath.length - 1; i++) {
            basePath += partsOfPath[i] + '/';
          }
          let json = JSON.parse(gotText);

          let glTFVer = this._checkGLTFVersion(json);

          this._loadResourcesAndScene(glBoostContext, null, basePath, json, defaultShader, glTFVer, resolve);

          return;
        }

        let gltfVer = dataView.getUint32(4, isLittleEndian);
        if (gltfVer !== 1) {
          reject('invalid version field in this binary glTF file.');
        }

        let lengthOfThisFile = dataView.getUint32(8, isLittleEndian);
        let lengthOfContent = dataView.getUint32(12, isLittleEndian);
        let contentFormat = dataView.getUint32(16, isLittleEndian);

        if (contentFormat !== 0) { // 0 means JSON format
          reject('invalid contentFormat field in this binary glTF file.');
        }


        let arrayBufferContent = arrayBuffer.slice(20, lengthOfContent + 20);
        let gotText = DataUtil.arrayBufferToString(arrayBufferContent);
        let json = JSON.parse(gotText);
        let arrayBufferBinary = arrayBuffer.slice(20 + lengthOfContent);

        let glTFVer = this._checkGLTFVersion(json);

        this._loadResourcesAndScene(glBoostContext, arrayBufferBinary, null, json, defaultShader, glTFVer, resolve);
      }, (reject, error)=>{

      });

  }

  _checkGLTFVersion(json) {
    let glTFVer = 1.0;
    if (json.asset && json.asset.version) {
      glTFVer = parseFloat(json.asset.version);
    }
    return glTFVer;
  }

  _loadResourcesAndScene(glBoostContext, arrayBufferBinary, basePath, json, defaultShader, glTFVer, resolve) {
    let shadersJson = json.shaders;
    let shaders = {};
    let buffers = {};
    let textures = {};
    let promisesToLoadResources = [];

    // Shaders Async load
    for (let shaderName in shadersJson) {
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

      let texture = glBoostContext.createTexture(null, textureName, {
        'TEXTURE_MAG_FILTER': samplerJson.magFilter,
        'TEXTURE_MIN_FILTER': samplerJson.minFilter,
        'TEXTURE_WRAP_S': samplerJson.wrapS,
        'TEXTURE_WRAP_T': samplerJson.wrapT
      });
      let promise = texture.generateTextureFromUri(textureUri, false);
      textures[textureName] = texture;
      promisesToLoadResources.push(promise);

    }

    if (promisesToLoadResources.length > 0) {
      Promise.resolve()
        .then(() => {
          return Promise.all(promisesToLoadResources);
        })
        .then(() => {
          this._IterateNodeOfScene(glBoostContext, buffers, basePath, json, defaultShader, shaders, textures, glTFVer, resolve);
        });
    } else {
      this._IterateNodeOfScene(glBoostContext, buffers, basePath, json, defaultShader, shaders, textures, glTFVer, resolve);
    }

  }

  _IterateNodeOfScene(glBoostContext, buffers, basePath, json, defaultShader, shaders, textures, glTFVer, resolve) {

    let rootGroup = glBoostContext.createGroup();

    for (let sceneStr in json.scenes) {
      let sceneJson = json.scenes[sceneStr];
      let group = glBoostContext.createGroup();
      group.userFlavorName = 'TopGroup';
      let nodeStr = null;
      for (let i = 0; i < sceneJson.nodes.length; i++) {
        nodeStr = sceneJson.nodes[i];

        // iterate nodes and load meshes
        let element = this._recursiveIterateNode(glBoostContext, nodeStr, buffers, basePath, json, defaultShader, shaders, textures, glTFVer);
        group.addChild(element);
      }

      // register joints hierarchy to skeletal mesh
      let skeletalMeshes = group.searchElementsByType(M_SkeletalMesh);
      skeletalMeshes.forEach((skeletalMesh) => {
        let rootJointGroup = group.searchElementByNameAndType(skeletalMesh.rootJointName, M_Group);
        if (!rootJointGroup) {
          // This is a countermeasure when skeleton node does not exist in scene.nodes.
          rootJointGroup = this._recursiveIterateNode(glBoostContext, skeletalMesh.rootJointName, buffers, basePath, json, defaultShader, shaders, textures, glTFVer);
          group.addChild(rootJointGroup);
        }

        rootJointGroup._isRootJointGroup = true;
        skeletalMesh.jointsHierarchy = rootJointGroup;
      });

      // Animation
      this._loadAnimation(group, buffers, json, glTFVer);

      rootGroup.addChild(group)
    }

    resolve(rootGroup);
  }



  _recursiveIterateNode(glBoostContext, nodeStr, buffers, basePath, json, defaultShader, shaders, textures, glTFVer) {
    var nodeJson = json.nodes[nodeStr];
    var group = glBoostContext.createGroup();
    group.userFlavorName = nodeStr;

    if (nodeJson.translation) {
      group.translate = new Vector3(nodeJson.translation[0], nodeJson.translation[1], nodeJson.translation[2]);
    }
    if (nodeJson.scale) {
      group.scale = new Vector3(nodeJson.scale[0], nodeJson.scale[1], nodeJson.scale[2]);
    }
    if (nodeJson.rotation) {
      group.quaternion = new Quaternion(nodeJson.rotation[0], nodeJson.rotation[1], nodeJson.rotation[2], nodeJson.rotation[3]);
    }
    if (nodeJson.matrix) {
      group.multiplyMatrix(new Matrix44(nodeJson.matrix, true));
    }

    if (nodeJson.meshes) {
      for (let i = 0; i < nodeJson.meshes.length; i++) {
        // this node has mashes...
        let meshStr = nodeJson.meshes[i];
        let meshJson = json.meshes[meshStr];

        let rootJointStr = null;
        let skinStr = null;
        if (nodeJson.skeletons) {
          rootJointStr = nodeJson.skeletons[0];
          skinStr = nodeJson.skin;
        }
        let mesh = this._loadMesh(glBoostContext, meshJson, buffers, basePath, json, defaultShader, rootJointStr, skinStr, shaders, textures, glTFVer);
        mesh.userFlavorName = meshStr;
        group.addChild(mesh);
      }
    } else if (nodeJson.jointName) {
      let joint = glBoostContext.createJoint();
      joint.userFlavorName = nodeJson.jointName;
      group.addChild(joint);
    } else if (nodeJson.camera) {
      let cameraStr = nodeJson.camera;
      let cameraJson = json.cameras[cameraStr];
      let camera = null;
      if (cameraJson.type === 'perspective') {
        let perspective = cameraJson.perspective;
        camera = glBoostContext.createPerspectiveCamera(
          {
            eye: new Vector3(0.0, 0.0, 0),
            center: new Vector3(0.0, 0.0, -1.0),
            up: new Vector3(0.0, 1.0, 0.0)
          },
          {
            fovy: MathUtil.radianToDegree(perspective.yfov),
            aspect: perspective.aspectRatio ? perspective.aspectRatio : 1.5,
            zNear: perspective.znear,
            zFar: perspective.zfar
          }
        );
      } else if (cameraJson.type === 'orthographic') {
        let orthographic = cameraJson.orthographic;
        camera = glBoostContext.createOrthoCamera(
          {
            eye: new Vector3(0.0, 0.0, 0),
            center: new Vector3(0.0, 0.0, -1.0),
            up: new Vector3(0.0, 1.0, 0.0)
          },
          {
            xmag: orthographic.xmag,
            ymag: orthographic.ymag,
            zNear: orthographic.znear,
            zFar: orthographic.zfar
          }
        );
      }
      camera.userFlavorName = cameraStr;
      group.addChild(camera);
    } else if (nodeJson.extensions) {
      if (nodeJson.extensions.KHR_materials_common) {
        if (nodeJson.extensions.KHR_materials_common.light) {
          const lightStr = nodeJson.extensions.KHR_materials_common.light
          const lightJson = json.extensions.KHR_materials_common.lights[lightStr];
          let light = null;
          if (lightJson.type === 'point') {
            let color = lightJson.point.color;
            light = glBoostContext.createPointLight(new Vector3(color[0], color[1], color[2]));
          } else if (lightJson.type === 'directional') {
            const color = lightJson.directional.color;
            let lightDir = new Vector4(0, 0, -1, 1);
            const matrix = new Matrix44(nodeJson.matrix, true);
            lightDir = matrix.multiplyVector(lightDir);
            light = glBoostContext.createDirectionalLight(new Vector3(color[0], color[1], color[2]), lightDir.toVector3());
            light.multiplyMatrixGizmo = group.matrix;
            group.multiplyMatrix(Matrix44.identity());
          }
          group.addChild(light);
        }
      }
    }

    if (nodeJson.children) {
      for (let i = 0; i < nodeJson.children.length; i++) {
        let nodeStr = nodeJson.children[i];
        let childElement = this._recursiveIterateNode(glBoostContext, nodeStr, buffers, basePath, json, defaultShader, shaders, textures, glTFVer);
        group.addChild(childElement);
      }
    }

    return group;
  }

  _loadMesh(glBoostContext, meshJson, buffers, basePath, json, defaultShader, rootJointStr, skinStr, shaders, textures, glTFVer) {
    var mesh = null;
    var geometry = null;
    if (rootJointStr) {
      geometry = glBoostContext.createSkeletalGeometry();
      mesh = glBoostContext.createSkeletalMesh(geometry, null, rootJointStr);
      let skin = json.skins[skinStr];

      mesh.bindShapeMatrix = new Matrix44(skin.bindShapeMatrix, true);
      mesh.jointNames = skin.jointNames;

      let inverseBindMatricesAccessorStr = skin.inverseBindMatrices;
      mesh.inverseBindMatrices = this._accessBinary(inverseBindMatricesAccessorStr, json, buffers);
    } else {
      geometry = glBoostContext.createGeometry();
      mesh = glBoostContext.createMesh(geometry);
    }

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
    for (let i = 0; i < meshJson.primitives.length; i++) {
      let primitiveJson = meshJson.primitives[i];

      // Geometry
      let positionsAccessorStr = primitiveJson.attributes.POSITION;
      let positions = this._accessBinary(positionsAccessorStr, json, buffers, false, true);
      _positions[i] = positions;
      vertexData.components.position = this._checkComponentNumber(positionsAccessorStr, json);
      vertexData.componentBytes.position = this._checkBytesPerComponent(positionsAccessorStr, json);
      vertexData.componentType.position = this._getDataType(positionsAccessorStr, json);
      dataViewMethodDic.position = this._checkDataViewMethod(positionsAccessorStr, json);


      let indices = null;
      if (typeof primitiveJson.indices !== 'undefined') {
        let indicesAccessorStr = primitiveJson.indices;
        indices = this._accessBinary(indicesAccessorStr, json, buffers);
        for (let j=0; j<indices.length; j++) {
          indices[j] = indicesAccumulatedLength + indices[j];
        }
        _indicesArray[i] = indices;
        indicesAccumulatedLength += _positions[i].length /  vertexData.components.position;
      }


      let normalsAccessorStr = primitiveJson.attributes.NORMAL;
      if (normalsAccessorStr) {
        let normals = this._accessBinary(normalsAccessorStr, json, buffers, false, true);
        //Array.prototype.push.apply(_normals, normals);
        _normals[i] = normals;
        vertexData.components.normal = this._checkComponentNumber(normalsAccessorStr, json);
        vertexData.componentBytes.normal = this._checkBytesPerComponent(normalsAccessorStr, json);
        vertexData.componentType.normal = this._getDataType(normalsAccessorStr, json);
        dataViewMethodDic.normal = this._checkDataViewMethod(normalsAccessorStr, json);
      }

      /// if Skeletal
      let jointAccessorStr = primitiveJson.attributes.JOINT;
      if (jointAccessorStr) {
        let joints = this._accessBinary(jointAccessorStr, json, buffers, false, true);
        additional['joint'][i] = joints;
        vertexData.components.joint = this._checkComponentNumber(jointAccessorStr, json);
        vertexData.componentBytes.joint = this._checkBytesPerComponent(jointAccessorStr, json);
        vertexData.componentType.joint = this._getDataType(jointAccessorStr, json);
        dataViewMethodDic.joint = this._checkDataViewMethod(jointAccessorStr, json);
      }
      let weightAccessorStr = primitiveJson.attributes.WEIGHT;
      if (weightAccessorStr) {
        let weights = this._accessBinary(weightAccessorStr, json, buffers, false, true);
        additional['weight'][i] = weights;
        vertexData.components.weight = this._checkComponentNumber(weightAccessorStr, json);
        vertexData.componentBytes.weight = this._checkBytesPerComponent(weightAccessorStr, json);
        vertexData.componentType.weight = this._getDataType(weightAccessorStr, json);
        dataViewMethodDic.weight = this._checkDataViewMethod(weightAccessorStr, json);
      }

      // Material
      if (primitiveJson.material) {
        var texcoords = null;
        let texcoords0AccessorStr = primitiveJson.attributes.TEXCOORD_0;

        let materialStr = primitiveJson.material;

        let material = glBoostContext.createClassicMaterial();

        texcoords = this._loadMaterial(glBoostContext, basePath, buffers, json, vertexData, indices, material, materialStr, positions, dataViewMethodDic, additional, texcoords, texcoords0AccessorStr, geometry, defaultShader, shaders, textures, i, glTFVer);

        materials.push(material);
      } else {
        let material = glBoostContext.createClassicMaterial();
        if (defaultShader) {
          material.shaderClass = defaultShader;
        } else {
          material.baseColor = new Vector4(0.5, 0.5, 0.5, 1);
        }
        materials.push(material);
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

    return mesh;
  }

  _isKHRMaterialsCommon(materialJson) {
    if (typeof materialJson.extensions !== 'undefined' && typeof materialJson.extensions.KHR_materials_common !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  _loadMaterial(glBoostContext, basePath, buffers, json, vertexData, indices, material, materialStr, positions, dataViewMethodDic, additional, texcoords, texcoords0AccessorStr, geometry, defaultShader, shaders, textures, idx, glTFVer) {
    let materialJson = json.materials[materialStr];
    material.userFlavorName = materialJson.name;
    let originalMaterialJson = materialJson;
    
    if (this._isKHRMaterialsCommon(materialJson)) {
      materialJson = materialJson.extensions.KHR_materials_common;
    }

    // Diffuse Texture
    if (texcoords0AccessorStr) {
      texcoords = this._accessBinary(texcoords0AccessorStr, json, buffers, false, true);
      additional['texcoord'][idx] = texcoords;
      vertexData.components.texcoord = this._checkComponentNumber(texcoords0AccessorStr, json);
      vertexData.componentBytes.texcoord = this._checkBytesPerComponent(texcoords0AccessorStr, json);
      vertexData.componentType.texcoord = this._getDataType(texcoords0AccessorStr, json);
      dataViewMethodDic.texcoord = this._checkDataViewMethod(texcoords0AccessorStr, json);

      let setTextures = (values, isParameter)=> {
        for (let valueName in values) {
          let value = null;
          if (isParameter) {
            value = values[valueName].value;
            if (typeof value === 'undefined') {
              continue;
            }
          } else {
            value = values[valueName];
          }
          if (glTFVer >= 1.1) {
            value = value[0];
          }
          if (typeof value === 'string') {
            let textureStr = value;
            let texturePurpose;
            if (valueName === 'diffuse') {
              texturePurpose = GLBoost.TEXTURE_PURPOSE_DIFFUSE;
            }
            material.setTexture(textures[textureStr], texturePurpose);
          }
        }
      };
      setTextures(materialJson.values, false);
      if (materialJson.technique && json.techniques) {
        if (typeof json.techniques[materialJson.technique] !== "undefined") {
          setTextures(json.techniques[materialJson.technique].parameters, true);
        }
      }

    } else {
      if (typeof vertexData.components.texcoord !== 'undefined') {
        // If texture coordinates existed even once in the previous loop
        let emptyTexcoords = [];
        let componentN = vertexData.components.position;
        let length = positions.length / componentN;
        for (let k = 0; k < length; k++) {
          emptyTexcoords.push(0);
          emptyTexcoords.push(0);
        }
        additional['texcoord'][idx] = new Float32Array(emptyTexcoords);
        vertexData.components.texcoord = 2;
        vertexData.componentBytes.texcoord = 4;
        dataViewMethodDic.texcoord = 'getFloat32';
      }
    }

    for (let valueName in materialJson.values) {
      let value = materialJson.values[valueName];
      if (typeof value !== 'string') {
        material[valueName + 'Color'] = new Vector4(value[0], value[1], value[2], value[3]);
      }
    }

    if (indices !== null) {
      material.setVertexN(geometry, indices.length);
    }

    let techniqueStr = materialJson.technique;
    if (defaultShader) {
      material.shaderClass = defaultShader;
    } else if (this._isKHRMaterialsCommon(originalMaterialJson)) {
      switch (techniqueStr) {
        case 'CONSTANT':
          material.shaderClass = DecalShader;
          break;
        case 'LAMBERT':
          material.shaderClass = LambertShader;
          break;
        case 'PHONG':
          material.shaderClass = PhongShader;
          break;
      }
    } else {
      if (typeof json.techniques !== 'undefined') {
        this._loadTechnique(glBoostContext, json, techniqueStr, material, materialJson, shaders, glTFVer);
      } else {
        material.shaderClass = DecalShader;
      }
    }

    return texcoords;
  }

  _loadTechnique(glBoostContext, json, techniqueStr, material, materialJson, shaders, glTFVer) {
    let techniqueJson = json.techniques[techniqueStr];


    let programStr = techniqueJson.program;
    let uniformsJson = techniqueJson.uniforms;
    let parametersJson = techniqueJson.parameters;
    let attributesJson = techniqueJson.attributes;
    let attributes = {};
    for (let attributeName in attributesJson) {
      //attributes[attributesJson[attributeName]] = attributeName;
      let parameterName = attributesJson[attributeName];
      let parameterJson = parametersJson[parameterName];
      attributes[attributeName] = parameterJson.semantic;
    }

    let uniforms = {};
    let textureNames = {};
    for (let uniformName in uniformsJson) {
      let parameterName = uniformsJson[uniformName];
      let parameterJson = parametersJson[parameterName];
      if (typeof parameterJson.semantic !== 'undefined') {
        uniforms[uniformName] = parameterJson.semantic;
      } else {
        let value = null;
        if (typeof materialJson.values !== 'undefined' && typeof materialJson.values[parameterName] !== 'undefined') {
          value = materialJson.values[parameterName];
        } else {
          value = parameterJson.value;
        }

        switch (parameterJson.type) {
          case 5126:
            uniforms[uniformName] = (glTFVer < 1.1) ? value : value[0];
            break;
          case 35664:
            uniforms[uniformName] = new Vector2(value[0], value[1]);
            break;
          case 35665:
            uniforms[uniformName] = new Vector3(value[0], value[1], value[2]);
            break;
          case 35666:
            uniforms[uniformName] = new Vector4(value[0], value[1], value[2], value[3]);
            break;
          case 5124:
            uniforms[uniformName] = (glTFVer < 1.1) ? value : value[0];
            break;
          case 35667:
            uniforms[uniformName] = new Vector2(value[0], value[1]);
            break;
          case 35668:
            uniforms[uniformName] = new Vector3(value[0], value[1], value[2]);
            break;
          case 35669:
            uniforms[uniformName] = new Vector4(value[0], value[1], value[2], value[3]);
            break;
          case 35678:
            uniforms[uniformName] = 'TEXTURE';
            textureNames[uniformName] =  (glTFVer < 1.1) ? value : value[0];
            break;
        }
      }
    }

    if (techniqueJson.states) {
      if (techniqueJson.states.functions) {
        for (let functionName in techniqueJson.states.functions) {
          if (!Array.isArray(techniqueJson.states.functions[functionName])) {
            techniqueJson.states.functions[functionName] = [techniqueJson.states.functions[functionName]];
          }
        }
      }

      material.states = techniqueJson.states;
    }

    this._loadProgram(glBoostContext, json, programStr, material, shaders, attributes, uniforms, textureNames);
  }



  _loadProgram(glBoostContext, json, programStr, material, shaders, attributes, uniforms, textureNames) {
    let programJson = json.programs[programStr];
    let fragmentShaderStr = programJson.fragmentShader;
    let vertexShaderStr = programJson.vertexShader;
    let fragmentShaderText = shaders[fragmentShaderStr].shaderText;
    let vertexShaderText = shaders[vertexShaderStr].shaderText;

    material.shaderInstance = new FreeShader(glBoostContext, vertexShaderText, fragmentShaderText, attributes, uniforms, textureNames);
  }

  _loadAnimation(element, buffers, json, glTFVer) {
    let animationJson = null;
    for (let anim in json.animations) {
      animationJson = json.animations[anim];
      if (animationJson) {
        for (let i = 0; i < animationJson.channels.length; i++) {
          let channelJson = animationJson.channels[i];
          if (!channelJson) {
            continue;
          }

          let targetMeshStr = channelJson.target.id;
          let targetPathStr = channelJson.target.path;
          let samplerStr = channelJson.sampler;
          let samplerJson = animationJson.samplers[samplerStr];

          let animInputAccessorStr = null;
          let animOutputAccessorStr = null;
          if (glTFVer < 1.1) {
            let animInputStr = samplerJson.input;
            let animOutputStr = samplerJson.output;
            animInputAccessorStr = animationJson.parameters[animInputStr];
            animOutputAccessorStr = animationJson.parameters[animOutputStr];
          } else {
            animInputAccessorStr = samplerJson.input;
            animOutputAccessorStr = samplerJson.output;
          }

          let animInputArray = this._accessBinary(animInputAccessorStr, json, buffers);
          let animOutputArray = null;
          if (targetPathStr === 'translation') {
            animOutputArray = this._accessBinary(animOutputAccessorStr, json, buffers);
          } else if (targetPathStr === 'rotation') {
            animOutputArray = this._accessBinary(animOutputAccessorStr, json, buffers, true);
          } else {
            animOutputArray = this._accessBinary(animOutputAccessorStr, json, buffers);
          }

          let animationAttributeName = '';
          if (targetPathStr === 'translation') {
            animationAttributeName = 'translate';
          } else if (targetPathStr === 'rotation') {
            animationAttributeName = 'quaternion';
          } else {
            animationAttributeName = targetPathStr;
          }

          let hitElement = element.searchElement(targetMeshStr);
          if (hitElement) {
            hitElement.setAnimationAtLine('time', animationAttributeName, animInputArray, animOutputArray);
            hitElement.setActiveAnimationLine('time');
            //hitElement.currentCalcMode = 'quaternion';
          }
        }
      }
    }
  }
  _accessBinaryAsShader(bufferViewStr, json, arrayBuffer) {
    let bufferViewJson = json.bufferViews[bufferViewStr];
    let byteOffset = bufferViewJson.byteOffset;
    let byteLength = bufferViewJson.byteLength;


    let arrayBufferSliced = arrayBuffer.slice(byteOffset, byteOffset + byteLength);

    return DataUtil.arrayBufferToString(arrayBufferSliced);
  }

  _accessBinaryAsImage(bufferViewStr, json, arrayBuffer, mimeType) {
    let bufferViewJson = json.bufferViews[bufferViewStr];
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


  static _isSystemLittleEndian() {
    return !!(new Uint8Array((new Uint16Array([0x00ff])).buffer))[0];
  }

  _checkComponentNumber(accessorStr, json) {
    var accessorJson = json.accessors[accessorStr];

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
      case 'MAT4':
        componentN = 16;
        break;
    }

    return componentN;
  }

  _checkBytesPerComponent(accessorStr, json) {
    var accessorJson = json.accessors[accessorStr];

    var bytesPerComponent = 0;
    switch (accessorJson.componentType) {
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

  _checkDataViewMethod(accessorStr, json) {
    var accessorJson = json.accessors[accessorStr];
    var dataViewMethod = '';
    switch (accessorJson.componentType) {
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

  _getDataType(accessorStr, json) {
    var accessorJson = json.accessors[accessorStr];
    return accessorJson.componentType;
  }

  _adjustByteAlign(typedArrayClass, arrayBuffer, alignSize, byteOffset, length) {
    if (( byteOffset % alignSize ) != 0) {
      return new typedArrayClass(arrayBuffer.slice(byteOffset), 0, length);
    } else {
      return new typedArrayClass(arrayBuffer, byteOffset, length);
    }
  }

  _accessBinary(accessorStr, json, buffers, quaternionIfVec4 = false, toGetAsTypedArray = false) {
    var accessorJson = json.accessors[accessorStr];
    var bufferViewStr = accessorJson.bufferView;
    var bufferViewJson = json.bufferViews[bufferViewStr];
    var byteOffset = bufferViewJson.byteOffset + accessorJson.byteOffset;
    var bufferStr = bufferViewJson.buffer;
    var arrayBuffer = buffers[bufferStr];

    let componentN = this._checkComponentNumber(accessorStr, json);
    let bytesPerComponent = this._checkBytesPerComponent(accessorStr, json);
    var dataViewMethod = this._checkDataViewMethod(accessorStr, json);


    var byteLength = bytesPerComponent * componentN * accessorJson.count;

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
          switch (accessorJson.type) {
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



GLBoost["GLTFLoader"] = GLTFLoader;
