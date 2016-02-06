import GLBoost from '../globals'

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class GLTFLoader {

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new GLTFLoader(singletonEnforcer);
    }
    return this[singleton];
  }

  loadGLTF(url, canvas, defaultShader = null, mtlString = null) {
    return new Promise((resolve, reject)=> {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = ()=> {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          var gotText = xmlHttp.responseText;
          var partsOfPath = url.split('/');
          var basePath = '';
          for(var i=0; i<partsOfPath.length-1; i++) {
            basePath += partsOfPath[i] + '/';
          }
          console.log(basePath);
          //this._constructMesh(gotText, basePath, canvas, defaultShader, mtlString, resolve);
        }
      };

      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    });
  }

}



GLBoost["GLTFLoader"] = GLTFLoader;
