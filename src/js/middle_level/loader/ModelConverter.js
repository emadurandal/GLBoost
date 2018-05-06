import GLBoost from '../../globals';
import DataUtil from '../../low_level/misc/DataUtil';


let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * 
 */
export default class ModelConverter {

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
      this[singleton] = new ModelConverter(singletonEnforcer);
    }
    return this[singleton];
  }

  convertToGLBoostModel(gltfModel) {
    //gltfModel.
  }
}

GLBoost["ModelConverter"] = ModelConverter;
