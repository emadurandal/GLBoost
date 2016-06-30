import MiscUtil from '../misc/MiscUtil';

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
    MiscUtil.consoleLog('GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was created.');
  }

  deregisterGLBoostObject(glBoostObject) {
    delete this._glBoostObjects[glBoostObject.toString()];
    MiscUtil.consoleLog('GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was ready for discard.');
  }

  printGLBoostObjects() {
    var objects = this._glBoostObjects;
    MiscUtil.consoleLog('========== GLBoost Object Lists [begin] ==========');
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        MiscUtil.consoleLog(key + '(' + objects[key].belongingCanvasId + ')');
      }
    }
    MiscUtil.consoleLog('========== GLBoost Object Lists [end] ==========');
  }

  printGLBoostObjectsOrderByName() {
    var objects = this._glBoostObjects;
    var objectArray = [];
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        objectArray.push(objects[key]);
      }
    }
    objectArray.sort(
      function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
      }
    );
    MiscUtil.consoleLog('========== GLBoost Object Lists [begin] ==========');
    objectArray.forEach((object)=>{
      MiscUtil.consoleLog(object.toString() + ' (' + object.belongingCanvasId + ')');
    });
    MiscUtil.consoleLog('========== GLBoost Object Lists [end] ==========');
  }

  registerWebGLResource(glBoostObject, glResource) {
    var glResourceName = glResource.constructor.name;
    this._glResources.push([glBoostObject, glResourceName]);
    MiscUtil.consoleLog('WebGL Resource: ' + glResourceName + ' was created by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
  }

  deregisterWebGLResource(glBoostObject, glResource) {
    var glResourceName = glResource.constructor.name;
    this._glResources.forEach((glResource, i)=>{
      if (glResource[0] === glBoostObject && glResource[1] === glResourceName) {
        this._glResources.splice(i,1);
      }
    });
    MiscUtil.consoleLog('WebGL Resource: ' + glResourceName + ' was deleted by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
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
    MiscUtil.consoleLog('========== WebGL Resource Lists [begin] ==========');
    glResources.forEach((glResource, i)=>{
      MiscUtil.consoleLog(i+1 +': ' + glResource[0].toString() + ' (' + glResource[0].belongingCanvasId + ') created ' + glResource[1]);
    });
    MiscUtil.consoleLog('========== WebGL Resource Lists [end] ==========');
  }

  printHierarchy() {
    var glBoostObjects = this._glBoostObjects;
    var scenes = [];
    for (var key in glBoostObjects) {
      if (glBoostObjects.hasOwnProperty(key)) {
        if ( key.match(/Scene/)) {
          scenes.push(glBoostObjects[key]);
        }
      }
    }

    function putWhiteSpace(level) {
      var str = '';
      for(var i=0; i<level; i++)  {
        str += '  ';
      }
      return str;
    }

    MiscUtil.consoleLog('========== GLBoost Objects Hierarchy of Scenes [begin] ==========');
    scenes.forEach((scene)=> {
      var outputText = (function searchRecursively(element, level) {
        var outputText = '';
        outputText += putWhiteSpace(level) + element.toString() + ' (' + element.belongingCanvasId + ')\n';
        if (typeof element.getChildren === 'undefined') {
          return outputText;
        }
        var children = element.getChildren();
        children.forEach((child)=>{
          outputText += searchRecursively(child, level+1);
        });
        return outputText += '\n';
      })(scene, 0);

      outputText = outputText.replace( /\n+/g , '\n');
      MiscUtil.consoleLog(outputText);
    });
    MiscUtil.consoleLog('========== GLBoost Objects Hierarchy of Scenes [end] ==========');

  }

}

GLBoost['GLBoostMonitor'] = GLBoostMonitor;
