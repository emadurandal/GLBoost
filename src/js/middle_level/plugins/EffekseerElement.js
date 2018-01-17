import GLBoost from '../../globals';
import M_Element from '../elements/M_Element';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';

export default class EffekseerElement extends M_Element {
  constructor(glBoostContext) {
    super(glBoostContext);
    this.__effect = null;
    this.__handle = null;
    this.__speed = 1;
  }

  load(uri, playJustAfterLoaded = false) {
    return new Promise((resolve, reject)=>{
      this.__effect = effekseer.loadEffect(uri, ()=>{
        if (playJustAfterLoaded) {
          this.play();
        }
        resolve(this.__effect);
      });
    })
  }

  play() {
    // Play the loaded effect
    this.__handle = effekseer.play(this.__effect);
//            handle.setScale(1, 1, 1);
    this.__handle.setLocation(this.translate.x, this.translate.y, this.translate.z);
    this.__handle.setRotation(this.rotate.x, this.rotate.y, this.rotate.z);
    this.__handle.setScale(this.scale.x, this.scale.y, this.scale.z);
    this.__handle.setSpeed(this.__speed);
    //handle.setMatrix((new GLBoost.Matrix44()).scale(0.01, 0.01, 0.01));
//    this.__handle.setSpeed(0.2);
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
