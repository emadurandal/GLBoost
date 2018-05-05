import GLBoost from '../../globals';



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
    }
  ) {
}

GLBoost["GLTF2Loader"] = GLTF2Loader;
