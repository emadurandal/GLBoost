
let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class GLBoostMonitor {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    this._glBoostObjects = {};
    this._glResources = [];
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLBoostMonitor(singletonEnforcer);
    }
    return this[singleton];
  }

  registerGLBoostObject(glBoostObject) {
    this._glBoostObjects[glBoostObject.toString()] = glBoostObject;
    console.log('GLBoost Resource: ' + glBoostObject.toString() + ' was created.');
  }

  printGLBoostObjects() {
    var objects = this._glBoostObjects;
    console.log('========== GLBoost Object Lists [begin] ==========');
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        console.log(key);
      }
    }
    console.log('========== GLBoost Object Lists [end] ==========');
  }

  registerGLResource(glBoostObject, glResource) {
    var glResourceName = glResource.constructor.name;
    var glBoostObjectName = glBoostObject.toString();
    this._glResources.push([glBoostObjectName, glResourceName]);
    console.log('WebGL Resource: ' + glResourceName + ' was created by ' + glBoostObjectName + '.');
  }

}

GLBoost['GLBoostMonitor'] = GLBoostMonitor;
