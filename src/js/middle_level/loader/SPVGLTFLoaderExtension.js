import GLBoost from '../../globals';
import SPVDecalShader from '../shaders/SPVDecalShader';
import SPVLambertShader from '../shaders/SPVLambertShader';
import SPVPhongShader from '../shaders/SPVPhongShader';
import Vector4 from '../../low_level/math/Vector4';

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * This is a loader glTF SPV extension data. You can see more detail of glTF format at https://github.com/KhronosGroup/glTF .
 */
export default class SPVGLTFLoaderExtension {

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
   * @return {SPVGLTFLoaderExtension} the singleton instance of GLTFLoader class
   */
  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new SPVGLTFLoaderExtension(singletonEnforcer);
    }
    return this[singleton];
  }

  setAssetPropertiesToRootGroup(rootGroup, asset) {
    // Animation FPS
    if (asset && asset.animationFps) {
      rootGroup.animationFps = asset.animationFps;
    }

    // other information
    if (asset && asset.spv_version) {
      rootGroup.spv_version = asset.spv_version;
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


GLBoost["SPVGLTFLoaderExtension"] = SPVGLTFLoaderExtension;
