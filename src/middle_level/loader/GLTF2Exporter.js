
import GLBoost from '../../globals';
import DataUtil from '../../low_level/misc/DataUtil';
import DecalShader from '../shaders/DecalShader';
import LambertShader from '../shaders/LambertShader';
import PhongShader from '../shaders/PhongShader';

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * This is the exporter class of glTF2 file format. You can see more detail of glTF2 format at https://github.com/KhronosGroup/glTF .
 */
export default class GLTF2Exporter {

  /**
   * The constructor of GLTF2Exporter class. But you cannot use this constructor directly because of this class is a singleton class. Use getInstance() static method.
   * @param enforcer a Symbol to forbid calling this constructor directly
   */
  constructor(enforcer: Symbol) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
  }

  /**
   * The static method to get singleton instance of this class.
   * @return The singleton instance of GLTFLoader class
   */
  static getInstance(): GLTF2Exporter{
    if (!this[singleton]) {
      this[singleton] = new GLTF2Exporter(singletonEnforcer);
    }
    return this[singleton];
  }

  export(glmData, options) {
    
  }
}
