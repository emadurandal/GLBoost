export default class DataUtil {

  constructor() {

  }

  static base64ToArrayBuffer(dataUri) {
    let splittedDataUri = dataUri.split(',');
    let type = splittedDataUri[0].split(':')[1].split(';')[0];
    let byteString = atob(splittedDataUri[1]);
    let byteStringLength = byteString.length;
    let arrayBuffer = new ArrayBuffer(byteStringLength);
    let uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteStringLength; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return arrayBuffer;
  }

  static arrayBufferToString(arrayBuffer) {
    if (typeof TextDecoder !== 'undefined') {
      let textDecoder = new TextDecoder();
      return textDecoder.decode(arrayBuffer);
    } else {
      let bytes = new Uint8Array(arrayBuffer);
      let result = "";
      let length = bytes.length;
      for (let i = 0; i < length; i++) {
        result += String.fromCharCode(bytes[i]);
      }
      return result;
    }
  }

  static loadResourceAsync(resourceUri, isBinary, resolveCallback, rejectCallback) {
    return new Promise((resolve, reject)=> {
      let isNode = (typeof process !== "undefined" && typeof require !== "undefined");

      if (isNode) {
        let fs = require('fs');
        fs.readFile(resourceUri, 'utf8', (err, text) => {
          if (err) {
            if (rejectCallback) {
              rejectCallback(reject, err);
            }
            return;
          }
          resolveCallback(resolve, text);
        });
      } else {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = ()=> {
          if (xmlHttp.readyState === 4 && (Math.floor(xmlHttp.status/100) === 2 || xmlHttp.status === 0)) {
            resolveCallback(resolve, xmlHttp.responseText);
          } else {
            if (rejectCallback) {
              rejectCallback(reject, xmlHttp.status);
            }
          }
        };

        xmlHttp.open("GET", resourceUri, true);
        xmlHttp.send(null);
      }
    });
  }
}

