import GLBoost from '../../globals';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import PhongShader from '../../middle_level/shaders/PhongShader';
import Hash from '../../low_level/misc/Hash';

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * [en] This is a loader class of Obj file format.<br>
 * [ja] Objファイルを読み込むためのローダークラスです。
 */
export default class ObjLoader {

  /**
   * [en] The constructor of ObjLoader class. But you cannot use this constructor directly because of this class is a singleton class. Use getInstance() static method.<br>
   * [ja] ObjLoaderクラスのコンストラクタです。しかし本クラスはシングルトンであるため、このコンストラクタは直接呼び出せません。getInstance()静的メソッドを使ってください。
   * @param {Symbol} enforcer [en] a Symbol to forbid calling this constructor directly [ja] このコンストラクタの直接呼び出しを禁止するためのシンボル
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
    }
  }

  /**
   * [en] The static method to get singleton instance of this class.<br>
   * [ja] このクラスのシングルトンインスタンスを取得するための静的メソッド。
   * @return {ObjLoader} [en] the singleton instance of ObjLoader class [ja] ObjLoaderクラスのシングルトンインスタンス
   */
  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new ObjLoader(singletonEnforcer);
    }
    return this[singleton];
  }

  /**
   * [en] the method to load Obj file.<br>
   * [ja] Obj fileをロードするためのメソッド。
   * @param {string} url [en] url of glTF file [ja] Objファイルのurl
   * @param {Shader} defaultShader [en] a shader to assign to loaded geometries [ja] 読み込んだジオメトリに適用するシェーダー
   * @param {string} mtlString [en] string of mtl file (optional) [ja] mtlファイルの内容の文字列情報（オプショナル。mtlファイルの読み込みが何らかの事情でできない場合に使います）
   * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   * @return {Promise} [en] a promise object [ja] Promiseオブジェクト
   */
  loadObj(glBoostContext, url, defaultShader = null, mtlString = null) {
    return new Promise((resolve, reject)=> {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = ()=> {
        if (xmlHttp.readyState === 4 && (Math.floor(xmlHttp.status/100) === 2 || xmlHttp.status === 0)) {
          var gotText = xmlHttp.responseText;
          var partsOfPath = url.split('/');
          var basePath = '';
          for(var i=0; i<partsOfPath.length-1; i++) {
            basePath += partsOfPath[i] + '/';
          }
          this._constructMesh(glBoostContext, gotText, basePath, defaultShader, mtlString, resolve);
        }
      };

      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    });
  }

  _loadMaterialsFromString(glBoostContext, mtlString, defaultShader, basePath = '') {

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
      let matchArray = mtlTextRows[i].match(/(\w+) ([\w:\/\-\.]+)/);

      if (matchArray === null) {
        continue;
      }

      if (matchArray[1] === "newmtl")
      {
        iMCount++;
        materials[iMCount] = glBoostContext.createClassicMaterial();
        if (defaultShader) {
          materials[iMCount].shaderClass = defaultShader;
        } else {
          materials[iMCount].shaderClass = PhongShader;
        }
        materials[iMCount].name = matchArray[2];
      }

      if (matchArray[1].toLowerCase() === "ka")
      {
        matchArray = mtlTextRows[i].match(/(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].ambientColor.x = parseFloat(matchArray[2]);
        materials[iMCount].ambientColor.y = parseFloat(matchArray[3]);
        materials[iMCount].ambientColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1].toLowerCase() === "kd")
      {
        matchArray = mtlTextRows[i].match(/(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].diffuseColor.x = parseFloat(matchArray[2]);
        materials[iMCount].diffuseColor.y = parseFloat(matchArray[3]);
        materials[iMCount].diffuseColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1].toLowerCase() === "ks")
      {
        matchArray = mtlTextRows[i].match(/(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
        materials[iMCount].specularColor.x = parseFloat(matchArray[2]);
        materials[iMCount].specularColor.y = parseFloat(matchArray[3]);
        materials[iMCount].specularColor.z = parseFloat(matchArray[4]);
      }

      if (matchArray[1].toLowerCase() === "map_kd")
      {
        matchArray = mtlTextRows[i].match(/(\w+) ([\w:\/\-\.]+)/);
        var texture = glBoostContext.createTexture(basePath + matchArray[2], {flipY: true});
        texture.name = matchArray[2];
        materials[iMCount].diffuseTexture = texture;
      }
    }
    return materials;
  }

  _loadMaterialsFromFile(glBoostContext, basePath, fileName, defaultShader) {
    return new Promise((resolve, reject)=> {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = ()=> {
        if (xmlHttp.readyState === 4 && (Math.floor(xmlHttp.status/100) === 2 || xmlHttp.status === 0)) {
          resolve(this._loadMaterialsFromString(glBoostContext, xmlHttp.responseText, defaultShader, basePath));
        }
      };

      xmlHttp.open("GET", basePath + fileName, true);
      xmlHttp.send(null);
    });
  }

  _constructMesh(glBoostContext, objText, basePath, defaultShader, mtlString, resolve) {

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
          resolve(this._loadMaterialsFromString(glBoostContext, mtlString, defaultShader));
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
        promise = this._loadMaterialsFromFile(glBoostContext, basePath, matchArray[2] + '.mtl', defaultShader);
      }
    }

    promise.then((materials)=>{
      for (let i=0; i<objTextRows.length; i++) {
        let matchArray = objTextRows[i].match(/^(\w+) +(\w+)/);
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
          matchArray = objTextRows[i].match(/^(\w+) +(-?[0-9\.]+) (-?[0-9\.]+) (-?[0-9\.]+)/);
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
          //pvTexture[vtCount].y = 1 - pvTexture[vtCount].y; //Y成分が逆なので合わせる

          vtCount++;
        }
      }

      var positions = new Array();
      var texcoords = new Array();
      var normals = new Array();
      var indices = [];

      var boFlag = false;

      var FaceN = fCount;
      fCount = 0;
      var partFCount = 0;

      var geometry = glBoostContext.createGeometry();

      for(let i=0; i<materials.length; i++) {
        partFCount = 0;
        let matIndices = new Array();
        let tmpIndices = new Array();
        let tmpPositions = new Array();
        let tmpTexcoords = new Array();
        let tmpNormals = new Array();

        let _i = 0;
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
                this._addQuadDataToArraysWithTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              } else {
                this._addTriangleDataToArraysWithTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              }
            } else {
              if (isQuad) {
                this._addQuadDataToArraysWithoutTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              } else {
                this._addTriangleDataToArraysWithoutTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
              }
            }

            _i = this._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount*3, matIndices, tmpIndices, _i);
            _i = this._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount*3+1, matIndices, tmpIndices, _i);
            _i = this._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount*3+2, matIndices, tmpIndices, _i);

            /*
            iFaceBufferArray[partFCount*3]=fCount*3;
            iFaceBufferArray[partFCount*3+1]=fCount*3+1;
            iFaceBufferArray[partFCount*3+2]=fCount*3+2;
            */
            if (isQuad) {
              /*
              iFaceBufferArray[partFCount*3+3]=fCount*3+3;
              iFaceBufferArray[partFCount*3+4]=fCount*3+4;
              iFaceBufferArray[partFCount*3+5]=fCount*3+5;
              */
              _i = this._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount*3+3, matIndices, tmpIndices, _i);
              _i = this._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount*3+4, matIndices, tmpIndices, _i);
              _i = this._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount*3+5, matIndices, tmpIndices, _i);

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

//        materials[i].setVertexN(geometry, partFCount*3);
        materials[i].setVertexN(geometry, matIndices.length);

        //indices[i] = iFaceBufferArray.concat();
        indices[i] = matIndices.concat();

      }

      var mesh = glBoostContext.createMesh(geometry, null);
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

  _reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, vCount, matIndices, tmpIndices, _i) {
    var str = '' + tmpPositions[vCount].x + ',' + tmpPositions[vCount].y + ',' + tmpPositions[vCount].z +
      ',' + tmpNormals[vCount].x + ',' + tmpNormals[vCount].y + ',' + tmpNormals[vCount].z +
      ',' + tmpTexcoords[vCount].x + ',' + tmpTexcoords[vCount].y;

    var hashCode = Hash.toCRC32(str);
    if (typeof tmpIndices[hashCode] === 'undefined') {
      tmpIndices[hashCode] = _i;
      _i++;
      positions.push(tmpPositions[vCount]);
      normals.push(tmpNormals[vCount]);
      texcoords.push(tmpTexcoords[vCount]);
    }

    matIndices.push(tmpIndices[hashCode]);

    return _i;
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
