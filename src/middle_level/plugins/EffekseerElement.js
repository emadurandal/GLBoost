import GLBoost from '../../globals';
import M_Element from '../elements/M_Element';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';
import Matrix44 from '../../low_level/math/Matrix44';
import M_FrustumCamera from '../elements/cameras/M_FrustumCamera';
import M_PerspectiveCamera from '../elements/cameras/M_PerspectiveCamera';

export default class EffekseerElement extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);
    this.__effect = null;
    this.__handle = null;
    this.__speed = 1;
    this.__timer = null;
  }

  load(uri, playJustAfterLoaded = false, isLoop = false) {
    return new Promise((resolve, reject)=>{
      this.__effect = effekseer.loadEffect(uri, ()=>{
        if (playJustAfterLoaded) {
          if (isLoop) {
            this.__timer = setInterval(()=>{ this.play(); }, 500);
          } else {
            this.play();
          }
        }
        resolve(this);
      });
    })
  }

  cancelLoop() {
    clearInterval(this.__timer);
  }

  play(isLoop = false) {
    const __play = ()=>{
      // Play the loaded effect
      this.__handle = effekseer.play(this.__effect);
      this.update();
    };

    if (isLoop) {
      this.__timer = setInterval(__play, 200);
    } else {
      __play();
    }
    
  }

  update(camera) {
    if (this.__handle != null) {
      this.__handle.setMatrix(this.worldMatrix.m);
      this.__handle.setSpeed(this.__speed);
    }
  }

  set playSpeed(val) {
    if (this.__handle) {
      this.__handle.setSpeed(val);
    }
    this.__speed = val;
  }

  get playSpeed() {
    return this.__speed;
  }

  set translate(vec) {
    if (this.__handle) {
      this.__handle.setLocation(vec.x, vec.y, vec.z);      
    }
    super.translate = vec;
  }

  get translate() {
    return super.translate;
  }

  set rotate(vec) {
    if (this.__handle) {
      this.__handle.setRotation(vec.x, vec.y, vec.z);      
    }
    super.rotate = vec;
  }

  get rotate() {
    return super.rotate;
  }

  set scale(vec) {
    if (this.__handle) {
      this.__handle.setScale(vec.x, vec.y, vec.z);      
    }
    super.scale = vec;
  }

  get scale() {
    return super.scale;
  }

}
