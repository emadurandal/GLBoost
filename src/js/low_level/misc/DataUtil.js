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

  static arrayBufferToString(byteArray) {
    if (typeof TextDecoder !== 'undefined') {
      let textDecoder = new TextDecoder();
      return textDecoder.decode(arrayBuffer);
    } else {
      let result = "";
      let length = byteArray.length;
      for (let i = 0; i < length; i++) {
        result += String.fromCharCode(byteArray[i]);
      }
      return result;
    }
  }
}

