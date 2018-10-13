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

      // Set Model Matrix
      const scale = 0.1;
      const m = this.worldMatrix;
      this.__handle.setLocation(m.m03*scale, m.m13*scale, m.m23*scale);
      const eular = m.toEulerAngles();
      this.__handle.setRotation(eular.x, eular.y, eular.z);
      const _scale = m.getScale();
      this.__handle.setScale(_scale.x*scale, _scale.y*scale, _scale.z*scale);

 //     this.__handle.setMatrix(this.worldMatrix.transpose().m);
//      this.__handle.setMatrix(this.worldMatrix.m);


      let lookAtMatrix = Matrix44.identity().m;
      let projectionMatrix = Matrix44.identity().m;
      if (camera) {


        // Set Viewing Matrix
//        lookAtMatrix = camera.lookAtRHMatrix();
//        let viewMatrix = lookAtMatrix.multiply(camera.inverseWorldMatrixWithoutMySelf);
//        console.log(lookAtMatrix.toStringApproximately())

        effekseer.setCameraLookAt(camera.translateInner.x, camera.translateInner.y, camera.translateInner.z,
          camera.centerInner.x, camera.centerInner.y, camera.centerInner.z,
          camera.upInner.x, camera.upInner.y, camera.upInner.z);


        // Set Projection Matrix
//        projectionMatrix = camera.projectionRHMatrix().transpose().m;
//        effekseer.setProjectionMatrix(projectionMatrix);
        //effekseer.setCameraMatrix(viewMatrix.transpose().m);
          
          effekseer.setProjectionPerspective(camera.fovy, camera.aspect, camera.zNear, camera.zFar);

            /*
            if (camera instanceof M_FrustumCamera) {
            effekseer.setProjectionMatrix();
          } else if (camera instanceof M_PerspectiveCamera) {

          } else {

          }
          */
        }
      
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
