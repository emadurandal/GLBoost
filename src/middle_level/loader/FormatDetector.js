import GLBoost from '../../globals';
import DataUtil from "../../low_level/misc/DataUtil";

export default async function formatDetector(uri, files) {

  if (files) {
    for (let fileName in files) {
      const splitted = fileName.split('.');
      const fileExtension = splitted[splitted.length - 1];

      if (fileExtension === 'gltf' || fileExtension === 'glb') {
        return new Promise((resolve, reject)=>{
          checkArrayBufferOfGltf(files[fileName], resolve);
        });
      }
    } 
  }

  const splitted = uri.split('.');
  const fileExtension = splitted[splitted.length - 1];

  // Effekseer
  if (fileExtension === 'efk') {
    return new Promise((resolve, reject)=>{
      resolve('Effekseer');
    });
  }

  // glTF
  return DataUtil.loadResourceAsync(uri, true,
    (resolve, response)=>
    {
      const arrayBuffer = response;
      checkArrayBufferOfGltf(arrayBuffer, resolve);
    }
  );

}

function checkArrayBufferOfGltf(arrayBuffer, resolve) {
  const isLittleEndian = true;

  const dataView = new DataView(arrayBuffer, 0, 20);
  // Magic field
  const magic = dataView.getUint32(0, isLittleEndian);

  // 0x46546C67 is 'glTF' in ASCII codes.
  if (magic !== 0x46546C67) {
    // It must be normal glTF (NOT binary) file...
    let gotText = DataUtil.arrayBufferToString(arrayBuffer);

    let gltfJson = JSON.parse(gotText);

    let glTFVer = checkGLTFVersion(gltfJson);

    resolve("glTF"+glTFVer);

    return;
  }

  let glTFVer = dataView.getUint32(4, isLittleEndian);
  resolve("glTF"+glTFVer);
}

function checkGLTFVersion(gltfJson) {
  let glTFVer = 1.0;
  if (gltfJson.asset && gltfJson.asset.version) {
    glTFVer = parseFloat(gltfJson.asset.version);
  }
  return glTFVer;
}

GLBoost["formatDetector"] = formatDetector;
