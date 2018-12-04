import AbstractTexture from "./AbstractTexture";


export default class VideoTexture extends AbstractTexture {
  constructor(glBoostContext, userFlavorName) {
    super(glBoostContext);

  }

  async generateTextureFromVideoUri(uri, playButtonDomElement) {
    return new Promise((resolve, reject)=> {


      var button = playButtonDomElement;
      
      const playAndSetupTexture = ()=> {
        video.play();

        this._width = video.width;
        this._height = video.height;

        let texture = this._generateTextureInner(video, false);

        this._texture = texture;
        this._isTextureReady = true;

        resolve();
      }

      // input が押されたらレンダリング開始
      button.addEventListener('click', ()=> {
        playAndSetupTexture();
      }, true);

      const video = document.createElement('video');
      video.autoplay = true;
      video.preload = "auto";
      this._video = video;
  
      video.addEventListener('canplaythrough', ()=> {
        if(button.value !== 'running'){
//          button.value = 'can play video';
          button.disabled = false;
        }
      }, true);

      video.addEventListener('ended', function(){
        video.play();
      }, true);
    

      video.src = uri;
    });
  }

  _generateTextureInner(video, isKeepBound) {
    var gl = this._glContext.gl;
    var texture = this._glContext.createTexture(this);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    if (!isKeepBound) {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    return texture;
  }

  get isTextureReady() {
    return this._isTextureReady;
  }

  get isImageAssignedForTexture() {
    return typeof this._img == 'undefined';
  }

  updateTexture() {
    //gl.bindTexture(gl.TEXTURE_2D, this._texture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    var gl = this._glContext.gl;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
          gl.UNSIGNED_BYTE, this._video);
  }
}
