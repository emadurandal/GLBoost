import GLBoost from '../../globals';
import L_GLBoostMonitor from '../../low_level/core/L_GLBoostMonitor';
import M_Mesh from '../elements/meshes/M_Mesh';
import M_Group from '../elements/M_Group';
import GLBoostObject from '../../low_level/core/GLBoostObject';

let singleton = Symbol();

export default class M_GLBoostMonitor extends L_GLBoostMonitor {
  constructor(enforcer) {
    super(enforcer);
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new M_GLBoostMonitor(L_GLBoostMonitor._singletonEnforcer);
    }
    return this[singleton];
  }

  getGLBoostObjectsFromArgument(arg) {
    let objects = [];
    if (typeof arg === 'undefined') {
      objects = this._glBoostObjects;
    } else if (typeof (arg) === "string") {
      for (let key in this._glBoostObjects) {
        if (this._glBoostObjects.hasOwnProperty(key) && this._glBoostObjects[key].userFlavorName === arg) {
          objects.push(this._glBoostObjects[key]);
          break;
        }
      }
    } else {
      if (arg instanceof GLBoostObject) {
        objects = [arg];
      }
    }

    return objects;
  }

  getMMeshes(glBoostObjects) {
    let meshes = [];
    for (let object of glBoostObjects) {
      if (object instanceof M_Mesh) {
        meshes.push(object);
      } else if (object instanceof M_Group) {
        meshes = meshes.concat(object.searchElementsByType(GLBoost.M_Mesh));
      }
    }
    meshes = meshes.filter((mesh, i, self) => self.indexOf(mesh) === i);

    return meshes;
  }

  getTriangleCount(userFlavorNameOrGLBoostObject) {
    let objects = this.getGLBoostObjectsFromArgument(userFlavorNameOrGLBoostObject);
    let meshes = this.getMMeshes(objects);
    let count = 0;

    for (let mesh of meshes) {
      count += mesh.geometry.getTriangleCount(mesh);
    }

    return count;
  }

  getVertexCount(userFlavorNameOrGLBoostObject) {
    let objects = this.getGLBoostObjectsFromArgument(userFlavorNameOrGLBoostObject);
    let meshes = this.getMMeshes(objects);
    let count = 0;

    for (let mesh of meshes) {
      count += mesh.geometry.getVertexCount(mesh);
    }

    return count;
  }

  getTextureUserFlavorNames(userFlavorNameOrGLBoostObject) {
    let objects = this.getGLBoostObjectsFromArgument(userFlavorNameOrGLBoostObject);
    let meshes = this.getMMeshes(objects);

    let textureUserFlavorNames = [];
    for (let mesh of meshes) {
      let materials = mesh.geometry._getAppropriateMaterials(mesh);
      for (let i = 0; i<materials.length; i++) {
        let tmpTextureUserFlavorNames = materials[i].getTextureUserFlavorNames();
        textureUserFlavorNames = textureUserFlavorNames.concat(tmpTextureUserFlavorNames);
      }
    }

    return textureUserFlavorNames;
  }

  getUniqueTextureUserFlavorNames(userFlavorNameOrGLBoostObject) {
    let textureUserFlavorNames = this.getTextureUserFlavorNames(userFlavorNameOrGLBoostObject);
    textureUserFlavorNames = Array.from(new Set(textureUserFlavorNames));

    return textureUserFlavorNames;
  }
}

GLBoost['M_GLBoostMonitor'] = M_GLBoostMonitor;
