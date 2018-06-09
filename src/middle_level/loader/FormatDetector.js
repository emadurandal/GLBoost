import GLBoost from '../../globals';
import DataUtil from "../../low_level/misc/DataUtil";

export default async function formatDetector(uri) {

  return DataUtil.loadResourceAsync(uri, true,
    (resolve, response)=>
    {
      const arrayBuffer = response;

      const isLittleEndian = true;

      const dataView = new DataView(arrayBuffer, 0, 20);
      // Magic field
      const magic = dataView.getUint32(0, isLittleEndian);

      // 0x46546C67 is 'glTF' in ASCII codes.
      if (magic !== 0x46546C67) {
        // It must be normal glTF (NOT binary) file...
        let gotText = DataUtil.arrayBufferToString(arrayBuffer);
        let partsOfPath = uri.split('/');
        let basePath = '';
        for (let i = 0; i < partsOfPath.length - 1; i++) {
          basePath += partsOfPath[i] + '/';
        }
        let gltfJson = JSON.parse(gotText);

        let glTFVer = checkGLTFVersion(gltfJson);

        resolve("glTF"+glTFVer);

        return;
      }

      let glTFVer = dataView.getUint32(4, isLittleEndian);
      resolve("glTF"+glTFVer);
     }
  );
}

function checkGLTFVersion(gltfJson) {
  let glTFVer = 1.0;
  if (gltfJson.asset && gltfJson.asset.version) {
    glTFVer = parseFloat(gltfJson.asset.version);
  }
  return glTFVer;
}

GLBoost["formatDetector"] = formatDetector;
