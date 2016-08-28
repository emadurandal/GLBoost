export default class DataUtil {

  constructor() {

  }

  static base64ToArrayBuffer(dataUri) {
    var type = dataUri[0].split(':')[1].split(';')[0];
    var byteString = atob(dataUri[1]);
    var byteStringLength = byteString.length;
    var arrayBuffer = new ArrayBuffer(byteStringLength);
    var uint8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteStringLength; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return arrayBuffer;
  }
}

