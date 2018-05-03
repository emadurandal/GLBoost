import GLBoost from '../../globals';
import SPVDecalShader from '../shaders/SPVDecalShader';
import SPVLambertShader from '../shaders/SPVLambertShader';
import SPVPhongShader from '../shaders/SPVPhongShader';

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * This is a loader class of glTF VRize extension Data.
 */
export default class VRizeGLTFLoaderExtension {

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
      this[singleton] = new VRizeGLTFLoaderExtension(singletonEnforcer);
    }
    return this[singleton];
  }

  setAssetPropertiesToRootGroup(rootGroup, asset) {
    // Animation FPS
    if (asset && asset.animationFps) {
      rootGroup.animationFps = asset.animationFps;
    }

    // Animation Tracks
    if (asset && asset.extras && asset.extras.animation_tracks) {
      rootGroup.animationTracks = asset.extras.animation_tracks;
    }

    rootGroup.addChild(group);

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

  createClassicMaterial(glBoostContext) {
    return glBoostContext.createSPVClassicMaterial();
  }

  getDecalShader() {
    return SPVDecalShader;
  }

  getLambertShader() {
    return SPVLambertShader;
  }

  getPhongShader() {
    return SPVPhongShader;
  }

}
