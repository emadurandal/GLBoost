
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

  registerWebGLResource(glBoostObject, glResource) {
    var glResourceName = glResource.constructor.name;
    var glBoostObjectName = glBoostObject.toString();
    this._glResources.push([glBoostObjectName, glResourceName]);
    console.log('WebGL Resource: ' + glResourceName + ' was created by ' + glBoostObjectName + '.');
  }

  printWebGLResources() {
    var glResources = this._glResources;
    glResources.sort(
      function(a,b){
        if( a[0] < b[0] ) return -1;
        if( a[0] > b[0] ) return 1;
        return 0;
      }
    );
    console.log('========== WebGL Resource Lists [begin] ==========');
    glResources.forEach((glResource, i)=>{
      console.log(i+1 +': ' +glResource[0] + ' created ' + glResource[1]);
    });
    console.log('========== WebGL Resource Lists [end] ==========');
  }

}

GLBoost['GLBoostMonitor'] = GLBoostMonitor;
