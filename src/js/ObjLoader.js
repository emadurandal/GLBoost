import GLBoost from './globals'
import Vector3 from './math/Vector3'
import Vector2 from './math/Vector2'
import ClassicMaterial from './ClassicMaterial'
import Texture from './textures/Texture'
import Geometry from './Geometry'
import Mesh from './Mesh'
import LambertShader from './shaders/LambertShader'
import HalfLambertShader from './shaders/HalfLambertShader'
import PhongShader from './shaders/PhongShader'

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

  loadObj(url, canvas, defaultShader = null, mtlString = null) {
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
          this._constructMesh(gotText, basePath, canvas, defaultShader, mtlString, resolve);
        }
      };

      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    });
  }

  _loadMaterialsFromString(mtlString, canvas, defaultShader, basePath = '') {

    var mtlTextRows = mtlString.split('\n');

    var numMaterial = 0;
    // checking the number of material
    for (let i=0; i<mtlTextRows.length; i++) {
      let matchArray = mtlTextRows[i].match(/^(\w+) (\w+)/);
      if (matchArray === null) {
        continue;
      }

      if (matchArray[1] === "newmtl")
      {
        numMaterial++;
      }
    }

    var materials = new Array(numMaterial);
    var iMCount = -1;

    // main loading
    for (let i=0; i<mtlTextRows.length; i++) {
      let matchArray = mtlTextRows[i].match(/^(\w+) ([\w:\/\-\.]+)/);

      if (matchArray === null) {
        continue;
      }

      if (matchArray[1] === "newmtl")
      {
        iMCount++;
        materials[iMCount] = new ClassicMaterial(canvas);
        if (defaultShader) {
          materials[iMCount].shader = new defaultShader(canvas);
        } else {
          materials[iMCount].shader = new PhongShader(canvas);
        }
        materials[iMCount].name = matchArray[2];
      }

      if (matchArray[1].toLowerCase() === "ka")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].ambientColor.x = parseFloat(matchArray[2]);
        materials[iMCount].ambientColor.y = parseFloat(matchArray[3]);
        materials[iMCount].ambientColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1].toLowerCase() === "kd")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].diffuseColor.x = parseFloat(matchArray[2]);
        materials[iMCount].diffuseColor.y = parseFloat(matchArray[3]);
        materials[iMCount].diffuseColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1].toLowerCase() === "ks")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].specularColor.x = parseFloat(matchArray[2]);
        materials[iMCount].specularColor.y = parseFloat(matchArray[3]);
        materials[iMCount].specularColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1].toLowerCase() === "map_kd")
      {
        matchArray = mtlTextRows[i].match(/^(\w+) ([\w:\/\-\.]+)/);
        var texture = new Texture(basePath + matchArray[2], canvas);
        texture.name = matchArray[2];
        materials[iMCount].diffuseTexture = texture;
      }
    }
    return materials;
  }

  _loadMaterialsFromFile(basePath, fileName, canvas, defaultShader) {
    return new Promise((resolve, reject)=> {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = ()=> {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          resolve(this._loadMaterialsFromString(xmlHttp.responseText, canvas, defaultShader, basePath));
        }
      };

      xmlHttp.open("GET", basePath + fileName, true);
      xmlHttp.send(null);
    });
  }

  _constructMesh(objText, basePath, canvas, defaultShader, mtlString, resolve) {

    console.log(basePath);

    var objTextRows = objText.split('\n');
    var promise = null;
    let vCount = 0;
    let fCount = 0;
    let vnCount = 0;
    let vtCount = 0;

    if (mtlString) {
      promise = (()=>{
        return new Promise((resolve, reject)=> {
          resolve(this._loadMaterialsFromString(mtlString, canvas, defaultShader));
        });
      })();
    }

    for (let i=0; i<objTextRows.length; i++) {
      let matchArray = objTextRows[i].match(/^(\w+) (\w+)/);
      if (matchArray === null) {
        continue;
      }

      // material file
      if (matchArray[1] === "mtllib" && mtlString === null) {
        promise = this._loadMaterialsFromFile(basePath, matchArray[2] + '.mtl', canvas, defaultShader);
      }
    }

    promise.then((materials)=>{
      for (let i=0; i<objTextRows.length; i++) {
        let matchArray = objTextRows[i].match(/^(\w+) (\w+)/);
        if (matchArray === null) {
          continue;
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
          matchArray = objTextRows[i].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
          if (matchArray !== null) { // if this is a Quad Polygon
            fCount += 2;
          } else {
            fCount++;
          }
        }
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
          matchArray = objTextRows[i].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+) (-?[0-9\.]+)/);
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
          matchArray = objTextRows[i].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+) (-?[0-9\.]+)/);
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
          matchArray = objTextRows[i].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+)/);
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

      var boFlag = false;

      var FaceN = fCount;
      var iFaceBufferArray = new Array(FaceN*3);
      fCount = 0;
      var partFCount = 0;

      var geometry = new Geometry(canvas);

      for(let i=0; i<materials.length; i++) {
        partFCount = 0;

        for (let j=0; (j<objTextRows.length) && (fCount < FaceN); j++) {
          let matchArray = objTextRows[j].match(/^(\w+) (\w+)/);

          if (matchArray === null) {
            continue;
          }

          if (matchArray[1] === "usemtl") {
            if (matchArray[2] === materials[i].name) {
              boFlag = true;
            } else {
              boFlag = false;
            }
          }

          if (matchArray[1] === "f" && boFlag) {
            let isQuad = true;
            let matchArray = objTextRows[j].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);   if (matchArray === null) {
              matchArray = objTextRows[j].match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
            }
            if (matchArray === null) {
              isQuad = false;
            }

            if(materials[i].diffuseTexture) {

              if (isQuad) {
                this._addQuadDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              } else {
                this._addTriangleDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              }
            } else {
              if (isQuad) {
                this._addQuadDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              } else {
                this._addTriangleDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              }
            }

            iFaceBufferArray[partFCount*3]=fCount*3;
            iFaceBufferArray[partFCount*3+1]=fCount*3+1;
            iFaceBufferArray[partFCount*3+2]=fCount*3+2;
            if (isQuad) {
              iFaceBufferArray[partFCount*3+3]=fCount*3+3;
              iFaceBufferArray[partFCount*3+4]=fCount*3+4;
              iFaceBufferArray[partFCount*3+5]=fCount*3+5;
              partFCount += 2;
              fCount += 2;
            } else {
              partFCount++;
              fCount++;
            }
          }
        }

        if (fCount === 0)//使用されていないマテリアル対策
        {
          continue;
        }

        materials[i].setVertexN(geometry, partFCount*3);

        indices[i] = iFaceBufferArray.concat();

      }

      var mesh = new Mesh(geometry);
      geometry.materials = materials;
      geometry.setVerticesData({
        position: positions,
        texcoord: texcoords,
        normal: normals
      }, indices);

      resolve(mesh);
    }).catch(function onRejected(error){
      console.error(error);
    });

  }

  _addTriangleDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount)
  {
    var v1=0,v2=0,v3=0;
    var vn1=0,vn2=0,vn3=0;
    var vt1=0,vt2=0,vt3=0;
    let matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);

    if(matchArray !== null) {
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
    } else {
      let matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
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
  }

  _addTriangleDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount)
  {
    var v1=0,v2=0,v3=0;
    var vn1=0,vn2=0,vn3=0;
    var vt1=0,vt2=0,vt3=0;
    let matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);

    if(matchArray !== null) {
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
    } else {
      let matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
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

  _addQuadDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount)
  {
    var v1=0,v2=0,v3=0,v4=0;
    var vn1=0,vn2=0,vn3=0,vn4=0;
    var vt1=0,vt2=0,vt3=0,vt4=0;
    let matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);

    if(matchArray !== null) {
      v1 = matchArray[2];
      vt1 = matchArray[3];
      vn1 = matchArray[4];
      v2 = matchArray[5];
      vt2 = matchArray[6];
      vn2 = matchArray[7];
      v3 = matchArray[8];
      vt3 = matchArray[9];
      vn3 = matchArray[10];
      v4 = matchArray[11];
      vt4 = matchArray[12];
      vn4 = matchArray[13];

      positions[fCount*3] = pvCoord[v1-1];
      normals[fCount*3] = pvNormal[vn1-1];
      texcoords[fCount*3] = pvTexture[vt1-1];
      positions[fCount*3+1] = pvCoord[v2-1];
      normals[fCount*3+1] = pvNormal[vn2-1];
      texcoords[fCount*3+1] = pvTexture[vt2-1];
      positions[fCount*3+2] = pvCoord[v3-1];
      normals[fCount*3+2] = pvNormal[vn3-1];
      texcoords[fCount*3+2] = pvTexture[vt3-1];

      positions[fCount*3+3] = pvCoord[v3-1];
      normals[fCount*3+3] = pvNormal[vn3-1];
      texcoords[fCount*3+3] = pvTexture[vt3-1];
      positions[fCount*3+4] = pvCoord[v4-1];
      normals[fCount*3+4] = pvNormal[vn4-1];
      texcoords[fCount*3+4] = pvTexture[vt4-1];
      positions[fCount*3+5] = pvCoord[v1-1];
      normals[fCount*3+5] = pvNormal[vn1-1];
      texcoords[fCount*3+5] = pvTexture[vt1-1];

    } else {
      let matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
      v1 = matchArray[2];
      vn1 = matchArray[3];
      v2 = matchArray[4];
      vn2 = matchArray[5];
      v3 = matchArray[6];
      vn3 = matchArray[7];
      v4 = matchArray[8];
      vn4 = matchArray[9];

      positions[fCount*3] = pvCoord[v1-1];
      normals[fCount*3] = pvNormal[vn1-1];
      positions[fCount*3+1] = pvCoord[v2-1];
      normals[fCount*3+1] = pvNormal[vn2-1];
      positions[fCount*3+2] = pvCoord[v3-1];
      normals[fCount*3+2] = pvNormal[vn3-1];

      positions[fCount*3+3] = pvCoord[v3-1];
      normals[fCount*3+3] = pvNormal[vn3-1];
      positions[fCount*3+4] = pvCoord[v4-1];
      normals[fCount*3+4] = pvNormal[vn4-1];
      positions[fCount*3+5] = pvCoord[v1-1];
      normals[fCount*3+5] = pvNormal[vn1-1];
    }
  }

  _addQuadDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount)
  {
    var v1=0,v2=0,v3=0,v4=0;
    var vn1=0,vn2=0,vn3=0,vn4=0;
    var vt1=0,vt2=0,vt3=0,vt4=0;
    let matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
    if(matchArray !== null) {
      v1 = matchArray[2];
      vn1 = matchArray[3];
      v2 = matchArray[4];
      vn2 = matchArray[5];
      v3 = matchArray[6];
      vn3 = matchArray[7];
      v4 = matchArray[8];
      vn4 = matchArray[9];
      positions[fCount*3] = pvCoord[v1-1];
      normals[fCount*3] = pvNormal[vn1-1];
      positions[fCount*3+1] = pvCoord[v2-1];
      normals[fCount*3+1] = pvNormal[vn2-1];
      positions[fCount*3+2] = pvCoord[v3-1];
      normals[fCount*3+2] = pvNormal[vn3-1];

      positions[fCount*3+3] = pvCoord[v3-1];
      normals[fCount*3+3] = pvNormal[vn3-1];
      positions[fCount*3+4] = pvCoord[v4-1];
      normals[fCount*3+4] = pvNormal[vn4-1];
      positions[fCount*3+5] = pvCoord[v1-1];
      normals[fCount*3+5] = pvNormal[vn1-1];
    } else {
      let matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
      v1 = matchArray[2];
      vt1 = matchArray[3];
      vn1 = matchArray[4];
      v2 = matchArray[5];
      vt2 = matchArray[6];
      vn2 = matchArray[7];
      v3 = matchArray[8];
      vt3 = matchArray[9];
      vn3 = matchArray[10];
      v4 = matchArray[11];
      vt4 = matchArray[12];
      vn4 = matchArray[13];

      positions[fCount*3] = pvCoord[v1-1];
      normals[fCount*3] = pvNormal[vn1-1];
      texcoords[fCount*3] = pvTexture[vt1-1];
      positions[fCount*3+1] = pvCoord[v2-1];
      normals[fCount*3+1] = pvNormal[vn2-1];
      texcoords[fCount*3+1] = pvTexture[vt2-1];
      positions[fCount*3+2] = pvCoord[v3-1];
      normals[fCount*3+2] = pvNormal[vn3-1];
      texcoords[fCount*3+2] = pvTexture[vt3-1];

      positions[fCount*3+3] = pvCoord[v3-1];
      normals[fCount*3+3] = pvNormal[vn3-1];
      texcoords[fCount*3+3] = pvTexture[vt3-1];
      positions[fCount*3+4] = pvCoord[v4-1];
      normals[fCount*3+4] = pvNormal[vn4-1];
      texcoords[fCount*3+4] = pvTexture[vt4-1];
      positions[fCount*3+5] = pvCoord[v1-1];
      normals[fCount*3+5] = pvNormal[vn1-1];
      texcoords[fCount*3+5] = pvTexture[vt1-1];
    }
  }
}



GLBoost["ObjLoader"] = ObjLoader;
