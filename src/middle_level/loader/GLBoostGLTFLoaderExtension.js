import GLBoost from '../../globals';
import Vector4 from '../../low_level/math/Vector4';
import M_Mesh from '../elements/meshes/M_Mesh';

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * This is a loader class of glTF VRize extension Data.
 */
export default class GLBoostGLTFLoaderExtension {

  /**
   * The constructor of ObjLoader class. But you cannot use this constructor directly because of this class is a singleton class. Use getInstance() static method.
   * @param {Symbol} enforcer a Symbol to forbid calling this constructor directly
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
  }

  /**
   * The static method to get singleton instance of this class.
   * @return {ObjLoader} the singleton instance of ObjLoader class
   */
  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLBoostGLTFLoaderExtension(singletonEnforcer);
    }
    return this[singleton];
  }

  setAssetPropertiesToRootGroup(rootGroup, asset, glBoostContext) {
    // Animation FPS
    if (asset && asset.animationFps) {
      rootGroup.animationFps = asset.animationFps;
    }

    // other information
    if (asset && asset.version) {
      rootGroup.spv_version = asset.version;
    }
    if (asset && asset.LastSaved_ApplicationVendor) {
      rootGroup.LastSaved_ApplicationVendor = asset.LastSaved_ApplicationVendor;
    }
    if (asset && asset.LastSaved_ApplicationName) {
      rootGroup.LastSaved_ApplicationName = asset.LastSaved_ApplicationName;
    }
    if (asset && asset.LastSaved_ApplicationVersion) {
      rootGroup.LastSaved_ApplicationVersion = asset.LastSaved_ApplicationVersion;
    }

    // Animation Tracks
    if (asset && asset.extras && asset.extras.animation_tracks) {
      rootGroup.animationTracks = asset.extras.animation_tracks;
    }

    // Transparent Meshes Draw Order
    if (asset && asset.extras && asset.extras.transparent_meshes_draw_order) {
      rootGroup.transparentMeshesDrawOrder = asset.extras.transparent_meshes_draw_order;
      let meshes = rootGroup.searchElementsByType(M_Mesh);
      rootGroup.transparentMeshes = [];
      for (let name of rootGroup.transparentMeshesDrawOrder) {
        for (let mesh of meshes) {
          if (mesh.userFlavorName === name) {
            rootGroup.transparentMeshes.push(mesh);
            break;
          }
        }
      }
    }

    if (asset && asset.extras && asset.extras.effekseerEffects) {
      for (let effect of asset.extras.effekseerEffects) {
        const group = rootGroup.searchElement(effect.nodeName, {type: GLBoost.QUERY_TYPE_USER_FLAVOR_NAME, format:GLBoost.QUERY_FORMAT_STRING_PERFECT_MATCHING});
        const effekseerElm = glBoostContext.createEffekseerElement();
        const promise = effekseerElm.load(asset.extras.basePath + effect.efkName + '.efk', true, true);
        promise.then((effect)=>{
          group.addChild(effect);
        });
      }
    }
  }

  setUVTransformToTexture(texture, samplerJson) {
    let uvTransform = new Vector4(1, 1, 0, 0);
    if (samplerJson.extras && samplerJson.extras.scale) {
      let scale = samplerJson.extras.scale;
      uvTransform.x = scale[0];
      uvTransform.y = scale[1];
    }
    if (samplerJson.extras && samplerJson.extras.translation) {
      let translation = samplerJson.extras.translation;
      uvTransform.z = translation[0];
      uvTransform.w = translation[1];
    }
    texture.uvTransform = uvTransform;
  }

}


GLBoost["GLBoostGLTFLoaderExtension"] = GLBoostGLTFLoaderExtension;
