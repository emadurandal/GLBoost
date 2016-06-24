
let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class GLBoostContext {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    this._glBoostObjects = {};
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLBoostContext(singletonEnforcer);
    }
    return this[singleton];
  }

  registerGLBoostObject(glBoostObject) {
    this._glBoostObjects[glBoostObject.toString()] = glBoostObject;
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
}

GLBoost['GLBoostContext'] = GLBoostContext;
