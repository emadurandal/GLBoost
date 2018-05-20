/* @flow */
import Vector2 from "../math/Vector2";
import Vector3 from "../math/Vector3";
import Vector4 from "../math/Vector4";

export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array |
Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

/**
 * TypedArrayWrapper
 */
export default class TypedArrayWrapper {
  __typedArray: TypedArray
  __componentN: number;

  constructor(typedArray: TypedArray, componentN:number) {
    this.__typedArray = typedArray;
    this.__componentN = componentN;
  }

  x_at(i:number): number {
    return this.__typedArray[i * this.__componentN];
  }
  y_at(i:number): number {
    return this.__typedArray[i * this.__componentN + 1];
  }
  x_at(i:number): number {
    return this.__typedArray[i * this.__componentN + 2];
  }
  w_at(i:number): number {
    return this.__typedArray[i * this.__componentN + 3];
  }

  r_at(i:number): number {
    return this.__typedArray[i * this.__componentN];
  }
  g_at(i:number): number {
    return this.__typedArray[i * this.__componentN + 1];
  }
  b_at(i:number): number {
    return this.__typedArray[i * this.__componentN + 2];
  }
  a_at(i:number): number {
    return this.__typedArray[i * this.__componentN + 3];
  }

  get raw() {
    return this.__typedArray;
  }

  get componentN() {
    return this.__componentN;
  }

  get elementN() {
    return this.__typedArray.length / this.__componentN;
  }

  getVector2At(i:number):Vector2 {
    return new Vector2(this.__typedArray.subarray(i * this.__componentN, 2));
  }
  getVector3At(i:number):Vector3 {
    return new Vector3(this.__typedArray.subarray(i * this.__componentN, 3));
  }
  getVector4At(i:number):Vector4 {
    return new Vector4(this.__typedArray.subarray(i * this.__componentN, 4));
  }
}
