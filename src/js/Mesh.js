import GLBoost from './globals'
import Element from './Element'

export default class Mesh extends Element {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;

    if (this.__proto__.__proto__ && this.__proto__.__proto__.constructor == Mesh) {  // this code for tmlib
      Mesh._instanceCount = (typeof Mesh._instanceCount === "undefined") ? 0 : (Mesh._instanceCount + 1);
      this._instanceName = Mesh.name + '_' + Mesh._instanceCount;
    }
  }

  prepareForRender(existCamera_f, lights) {
    this._geometry.prepareForRender(existCamera_f, lights, this._material);
    if (this._geometry._materials.length === 0 && this._material) {
    //if (this._material) {
      this._material = this._geometry.prepareGLSLProgramAndSetVertexNtoMaterial(this._material, existCamera_f, lights);
    }
  }

  draw(lights, camera, scene) {
    this._geometry.draw(lights, camera, this, scene);
  }

  set geometry(geometry) {
    this._geometry = geometry;
    geometry._parent = this;
    Mesh._geometries[geometry.toString()] = geometry;
  }

  get geometry() {
    return this._geometry;
  }

  set material(material) {
    /*
    if (typeof this._geometry === "undefined") {
      console.assert(false, "set a geometry before a material.");
    }
    if (this._geometry._materials.length === 0 && material) {
      this._geometry.materials = [material];
      this._material = material;
    } else {
      this._material = null;
    }
    */

    this._material = material;
  }

  get material() {
    return this._material;
  }

}
Mesh._geometries = {};

GLBoost["Mesh"] = Mesh;
