import GLBoost from './globals'

export default class Mesh {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material = material;
  }

  prepareForRender(existCamera_f, lights) {
    this._geometry.prepareForRender(existCamera_f, lights);
  }

  draw(lights, camera) {
    this._geometry.draw(lights, camera);
  }

  set geometry(geometry) {
    this._geometry = geometry;
    Mesh._geometries[geometry.toString()] = geometry;
  }

  get geometry() {
    return this._geometry;
  }

  set material(material) {
    if (typeof this._geometry === "undefined") {
      console.assert(false, "set a geometry before a material.");
    }
    if (this._geometry._materials.length === 0) {
      this._geometry.materials = [material];
      this._material = material;
    } else {
      this._material = null;
    }
  }

  get material() {
    return this._material;
  }
}
Mesh._geometries = {};

GLBoost["Mesh"] = Mesh;
