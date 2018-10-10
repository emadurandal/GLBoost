/* @flow */

import GLBoost from '../../globals';
import MiscUtil from '../misc/MiscUtil';

let singleton = Symbol();

export default class L_GLBoostMonitor {
  _glBoostObjects: Object;
  _glResources: Array<Object>;

  constructor(enforcer) {
    if (enforcer !== L_GLBoostMonitor._singletonEnforcer || !(this instanceof L_GLBoostMonitor)) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }

    this._glBoostObjects = {};
    this._glResources = [];
    L_GLBoostMonitor._singletonEnforcer = Symbol();
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new L_GLBoostMonitor(L_GLBoostMonitor._singletonEnforcer);
    }
    return this[singleton];
  }

  registerGLBoostObject(glBoostObject: Object) {
    this._glBoostObjects[glBoostObject.instanceName] = glBoostObject;
    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, 'GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was created.');
  }

  deregisterGLBoostObject(glBoostObject: Object) {
    delete this._glBoostObjects[glBoostObject.instanceName];
    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, 'GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was ready for discard.');
  }


  getGLBoostObjects(partOfGlBoostObjectInstanceName: string) {
    let glBoostObjects = [];
    for (let instanceName in this._glBoostObjects) {
      if (instanceName.indexOf(partOfGlBoostObjectInstanceName)>0) {
        glBoostObjects.push(this._glBoostObjects[instanceName]);
      }
    }

    return glBoostObjects;
  }

  getGLBoostObject(glBoostObjectInstanceName: string) {
    for (let instanceName in this._glBoostObjects) {
      if (instanceName === glBoostObjectInstanceName) {
        return this._glBoostObjects[instanceName];
      }
    }
    return null;
  }

  getGLBoostObjectByUserFlavorName(glBoostObjectUserFlavorName: string) {
    for (let instanceName in this._glBoostObjects) {
      if (this._glBoostObjects[instanceName].userFlavorName === glBoostObjectUserFlavorName) {
        return this._glBoostObjects[instanceName];
      }
    }
    return null;
  }


  getGLBoostObjectsByUserFlavorName(glBoostObjectUserFlavorName: string) {
    const results = [];
    for (let instanceName in this._glBoostObjects) {
      if (this._glBoostObjects[instanceName].userFlavorName === glBoostObjectUserFlavorName) {
        results.push(this._glBoostObjects[instanceName]);
      }
    }
    return results;
  }

  getGLBoostObjectWhichHasThisObjectId(objectId: number) {
    for (let instanceName in this._glBoostObjects) {
      if (this._glBoostObjects[instanceName].objectIndex === objectId) {
        return this._glBoostObjects[instanceName];
      }
    }

    return null;
  }

  printGLBoostObjects() {
    var objects = this._glBoostObjects;
    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [begin] ==========');
    for (var key in objects) {
      if (objects.hasOwnProperty(key)) {
        MiscUtil.consoleLog(key + '(' + objects[key].belongingCanvasId + ')');
      }
    }
    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [end] ==========');
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
    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [begin] ==========');
    objectArray.forEach((object)=>{
      MiscUtil.consoleLog(object.toString() + ' (' + object.belongingCanvasId + ')');
    });
    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [end] ==========');
  }

  registerWebGLResource(glBoostObject: Object, glResource: Object) {
    var glResourceName = glResource.constructor.name;
    this._glResources.push([glBoostObject, glResource]);
    MiscUtil.consoleLog(GLBoost.LOG_GL_RESOURCE_LIFECYCLE, 'WebGL Resource: ' + glResourceName + ' was created by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
  }

  deregisterWebGLResource(glBoostObject: Object, glResource: Object) {
    var glResourceName = glResource.constructor.name;
    this._glResources.forEach((glResource, i)=>{
      if (glResource[0] === glBoostObject && glResource[1].constructor.name === glResourceName) {
        this._glResources.splice(i,1);
      }
    });
    MiscUtil.consoleLog(GLBoost.LOG_GL_RESOURCE_LIFECYCLE, 'WebGL Resource: ' + glResourceName + ' was deleted by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
  }

  getWebGLResources(webglResourceName: string) {
    let webglResources = this._glResources.filter((glResourceArray)=>{
      if (glResourceArray[1].constructor.name === webglResourceName) {
        return true;
      } else {
        return false;
      }
    });//.map((glReourceArray)=>{return glReourceArray[1]});

    return webglResources;
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
    MiscUtil.consoleLog(GLBoost.LOG_GL_RESOURCE_LIFECYCLE, '========== WebGL Resource Lists [begin] ==========');
    glResources.forEach((glResource, i)=>{
      MiscUtil.consoleLog(i+1 +': ' + glResource[0].toString() + ' (' + glResource[0].belongingCanvasId + ') created ' + glResource[1]);
    });
    MiscUtil.consoleLog(GLBoost.LOG_GL_RESOURCE_LIFECYCLE, '========== WebGL Resource Lists [end] ==========');
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

    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Objects Hierarchy of Scenes [begin] ==========');
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
    MiscUtil.consoleLog(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Objects Hierarchy of Scenes [end] ==========');

  }

}

GLBoost['L_GLBoostMonitor'] = L_GLBoostMonitor;
