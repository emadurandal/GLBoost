
/**
 * Usage
 * const mm = MemoryManager.getInstance();
 * this.translate = new Vector3(
 *   mm.assignMem(componentUID, propetyId, entityUID, isRendered)
 * ); 
 */

export default class MemoryManager {
  __renderingMemoryPool: Float32Array;
  //__entityMaxCount: number;

  constructor() {
    this.__renderingMemoryPool = new Float32Array(67108864); //(2^12)*(2^12)*4(rgba)
    //this.__entityMaxCount = 1000000;


  }


}
