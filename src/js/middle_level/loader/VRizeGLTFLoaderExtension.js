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
}
