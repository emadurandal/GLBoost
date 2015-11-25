import GLBoost from './globals'
import Vector3 from './Vector3'
import Vector2 from './Vector2'
import ClassicMaterial from './ClassicMaterial'
import Texture from './Texture'
import Mesh from './Mesh'
import LambertShader from './LambertShader'

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class ObjLoader {

  constructor(enforcer) {
      if (enforcer !== singletonEnforcer) {
          throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
      }
  }

  static getInstance() {
      if (!this[singleton]) {
          this[singleton] = new ObjLoader(singletonEnforcer);
      }
      return this[singleton];
  }

  loadObj(url, canvas) {
    this._numMaterial = 0;
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
          var mesh = this.constructMesh(gotText, basePath, canvas);
          resolve(mesh);
        }
      };

      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    });
  }

  loadMaterialFromFile(basePath, fileName, canvas) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", basePath + fileName, false);
    xmlHttp.send(null);

    var mtlTextRows = xmlHttp.responseText.split('\n');

    // checking the number of material
    for (let i=0; i<mtlTextRows.length; i++) {
      let matchArray = mtlTextRows[i].match(/^(\w+) (\w+)/);
      if (matchArray === null) {
        continue;
      }

      if (matchArray[1] === "newmtl")
      {
        this._numMaterial++;
      }
    }

    var materials = new Array(this._numMaterial);
    var iMCount = -1;

    // main loading
    for (let i=0; i<mtlTextRows.length; i++) {
      let matchArray = mtlTextRows[i].match(/^(\w+) (\w+)/);

      if (matchArray === null) {
        continue;
      }

      if (matchArray[1] === "newmtl")
      {
        iMCount++;
        materials[iMCount] = new ClassicMaterial(canvas);
        materials[iMCount].shader = new LambertShader(canvas);
        materials[iMCount].name = matchArray[2];
      }

      if (matchArray[1] === "Ka")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].ambientColor.x = parseFloat(matchArray[2]);
        materials[iMCount].ambientColor.y = parseFloat(matchArray[3]);
        materials[iMCount].ambientColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1] === "Kd")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].diffuseColor.x = parseFloat(matchArray[2]);
        materials[iMCount].diffuseColor.y = parseFloat(matchArray[3]);
        materials[iMCount].diffuseColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1] === "Ks")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].specularColor.x = parseFloat(matchArray[2]);
        materials[iMCount].specularColor.y = parseFloat(matchArray[3]);
        materials[iMCount].specularColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1] === "map_Kd")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) (\w+.\w+)/);
        var texture = new Texture(basePath + matchArray[2], canvas);
        texture.name = matchArray[2];
        materials[iMCount].diffuseTexture = texture;
      }
    }
    this._materials = materials;
  }

  constructMesh(objText, basePath, canvas) {

    console.log(basePath);

    var objTextRows = objText.split('\n');

    let vCount = 0;
    let fCount = 0;
    let vnCount = 0;
    let vtCount = 0;

    var outputRows = [];
    for (let i=0; i<objTextRows.length; i++) {
      let matchArray = objTextRows[i].match(/^(\w+) (\w+)/);
      if (matchArray === null) {
        continue;
      }

      // material file
      if (matchArray[1] === "mtllib")
      {
        this.loadMaterialFromFile(basePath, matchArray[2] + '.mtl', canvas);
      }
      // Vertex
      if (matchArray[1] === "v")
      {
          vCount++;
      }
      // Vertex Normal
      if (matchArray[1] === "vn")
      {
          vnCount++;
      }
      // Texcoord
      if (matchArray[1] === "vt")
      {
          vtCount++;
      }
      // Face
      if (matchArray[1] === "f")
      {
          fCount++;
      }
      outputRows.push(matchArray[1] + ' ' + matchArray[2]);
    }

    var pvCoord=new Array(vCount);
    var pvNormal=new Array(vnCount);
    var pvTexture=new Array(vtCount);

    vCount = 0;
    vnCount = 0;
    vtCount = 0;

    for (let i=0; i<objTextRows.length; i++) {
      //キーワード 読み込み
      let matchArray = objTextRows[i].match(/^(\w+) /);

      if (matchArray === null) {
        continue;
      }

      //頂点 読み込み
      if (matchArray[1] === "v")
      {
        matchArray = objTextRows[i].match(/^(\w+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+)/);
//          pvCoord[vCount].x=-x;//OBJは右手、Direct3Dは左手座標系。
        pvCoord[vCount] = new Vector3();
        pvCoord[vCount].x = parseFloat(matchArray[2]);
        pvCoord[vCount].y = parseFloat(matchArray[3]);
        pvCoord[vCount].z = parseFloat(matchArray[4]);
        vCount++;
      }

      //法線 読み込み
      if (matchArray[1] === "vn")
      {
        matchArray = objTextRows[i].match(/^(\w+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+)/);
//          pvNormal[vnCount].x=-x;//OBJは右手、Direct3Dは左手座標系。
        pvNormal[vnCount] = new Vector3();
        pvNormal[vnCount].x = parseFloat(matchArray[2]);
        pvNormal[vnCount].y = parseFloat(matchArray[3]);
        pvNormal[vnCount].z = parseFloat(matchArray[4]);
        vnCount++;
      }

      //テクスチャー座標 読み込み
      if (matchArray[1] === "vt")
      {
        matchArray = objTextRows[i].match(/^(\w+) (-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+)/);
        pvTexture[vtCount] = new Vector2();
        pvTexture[vtCount].x = parseFloat(matchArray[2]);
        pvTexture[vtCount].y = parseFloat(matchArray[3]);
        pvTexture[vtCount].y = 1 - pvTexture[vtCount].y; //Y成分が逆なので合わせる

        vtCount++;
      }
    }

    var positions = new Array( fCount );
    var texcoords = new Array( fCount );
    var normals = new Array( fCount );
    var indices = [];

    this._indexBuffers = new Array(this._materials); //GLuint[g_dwNumMaterial];

    var boFlag = false;

    this._FaceN = fCount;
    var iFaceBufferArray = new Array(this._FaceN*3);
    fCount = 0;
    var partFCount = 0;

    for(let i=0; i<this._materials.length; i++) {
      partFCount = 0;

      for (let j=0; (j<objTextRows.length) && (fCount < this._FaceN); j++) {
        let matchArray = objTextRows[j].match(/^(\w+) (\w+)/);

        if (matchArray === null) {
          continue;
        }

        if (matchArray[1] === "usemtl") {
          if(matchArray[2] === this._materials[i].name) {
            boFlag = true;
          } else {
            boFlag = false;
          }
        }

        if (matchArray[1] === "f" && boFlag) {
          var v1=0,v2=0,v3=0;
          var vn1=0,vn2=0,vn3=0;
          var vt1=0,vt2=0,vt3=0;

          if(this._materials[i].diffuseTexture) {

            let matchArray = objTextRows[j].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
            v1 = matchArray[2];
            vt1 = matchArray[3];
            vn1 = matchArray[4];
            v2 = matchArray[5];
            vt2 = matchArray[6];
            vn2 = matchArray[7];
            v3 = matchArray[8];
            vt3 = matchArray[9];
            vn3 = matchArray[10];

            if(vn1) {
              positions[fCount*3] = pvCoord[v1-1];
              positions[fCount*3+1] = pvCoord[v2-1];
              positions[fCount*3+2] = pvCoord[v3-1];
              normals[fCount*3] = pvNormal[vn1-1];
              normals[fCount*3+1] = pvNormal[vn2-1];
              normals[fCount*3+2] = pvNormal[vn3-1];
              texcoords[fCount*3] = pvTexture[vt1-1];
              texcoords[fCount*3+1] = pvTexture[vt2-1];
              texcoords[fCount*3+2] = pvTexture[vt3-1];
            } else {
              let matchArray = objTextRows[j].match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
              v1 = matchArray[2];
              vn1 = matchArray[3];
              v2 = matchArray[4];
              vn2 = matchArray[5];
              v3 = matchArray[6];
              vn3 = matchArray[7];
              positions[fCount*3] = pvCoord[v1-1];
              positions[fCount*3+1] = pvCoord[v2-1];
              positions[fCount*3+2] = pvCoord[v3-1];
              normals[fCount*3] = pvNormal[vn1-1];
              normals[fCount*3+1] = pvNormal[vn2-1];
              normals[fCount*3+2] = pvNormal[vn3-1];
            }
          } else {
            let matchArray = objTextRows[j].match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
            v1 = matchArray[2];
            vn1 = matchArray[3];
            v2 = matchArray[4];
            vn2 = matchArray[5];
            v3 = matchArray[6];
            vn3 = matchArray[7];

            if(vn1) {
              positions[fCount*3] = pvCoord[v1-1];
              positions[fCount*3+1] = pvCoord[v2-1];
              positions[fCount*3+2] = pvCoord[v3-1];
              normals[fCount*3] = pvNormal[vn1-1];
              normals[fCount*3+1] = pvNormal[vn2-1];
              normals[fCount*3+2] = pvNormal[vn3-1];
            } else {
              let matchArray = objTextRows[j].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
              v1 = matchArray[2];
              vt1 = matchArray[3];
              vn1 = matchArray[4];
              v2 = matchArray[5];
              vt2 = matchArray[6];
              vn2 = matchArray[7];
              v3 = matchArray[8];
              vt3 = matchArray[9];
              vn3 = matchArray[10];

              positions[fCount*3] = pvCoord[v1-1];
              positions[fCount*3+1] = pvCoord[v2-1];
              positions[fCount*3+2] = pvCoord[v3-1];
              normals[fCount*3] = pvNormal[vn1-1];
              normals[fCount*3+1] = pvNormal[vn2-1];
              normals[fCount*3+2] = pvNormal[vn3-1];
              texcoords[fCount*3] = pvTexture[vt1-1];
              texcoords[fCount*3+1] = pvTexture[vt2-1];
              texcoords[fCount*3+2] = pvTexture[vt3-1];
            }

          }

          iFaceBufferArray[partFCount*3]=fCount*3;
          iFaceBufferArray[partFCount*3+1]=fCount*3+1;
          iFaceBufferArray[partFCount*3+2]=fCount*3+2;

          partFCount++;
          fCount++;
        }
      }

      if (fCount === 0)//使用されていないマテリアル対策
      {
          this._indexBuffers[i] = null;
          continue;
      }

      this._materials[i].faceN = partFCount;

      indices[i] = iFaceBufferArray.concat();

    }

    var mesh = new Mesh(canvas);
    mesh.materials = this._materials;
    mesh.setVerticesData({
      position: positions,
      texcoord: texcoords,
      normal: normals,
      indices: indices
    });

    return mesh;
  }
}



GLBoost["ObjLoader"] = ObjLoader;
