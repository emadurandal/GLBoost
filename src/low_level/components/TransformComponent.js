// @flow
import Vector2 from '../math/Vector2';
import Vector3 from '../math/Vector3';
import Vector4 from '../math/Vector4';
import Quaternion from '../math/Quaternion';
import Matrix33 from '../math/Matrix33';
import Matrix44 from '../math/Matrix44';
import MathUtil from '../math/MathUtil';

import Component from '../core/Component';

export default class TransformComponent extends Component {

  _translate: Vector3;
  _rotate: Vector3;
  _scale: Vector3;
  _quaternion: Quaternion;
  _matrix: Matrix44;
  _invMatrix: Matrix44;
  _normalMatrix: Matrix44;

  _is_translate_updated: boolean;
  _is_euler_angles_updated: boolean;
  _is_scale_updated: boolean;
  _is_quaternion_updated: boolean;
  _is_trs_matrix_updated: boolean;
  _is_inverse_trs_matrix_updated: boolean;
  _is_normal_trs_matrix_updated: boolean;

  _updateCountAsElement: number;
  

  constructor() {
    this._translate = Vector3.zero();
    this._rotate = Vector3.zero();
    this._scale = new Vector3(1, 1, 1);
    this._quaternion = new Quaternion(0, 0, 0, 1);
    this._matrix = Matrix44.identity();
    this._invMatrix = Matrix44.identity();
    this._normalMatrix = Matrix44.identity();

    this._is_translate_updated = true;
    this._is_euler_angles_updated = true;
    this._is_scale_updated = true;
    this._is_quaternion_updated = true;
    this._is_trs_matrix_updated = true;
    this._is_inverse_trs_matrix_updated = true;
    this._is_normal_trs_matrix_updated = true;

    this._updateCountAsElement = 0;
  }

  get updateCount() {
    return this._updateCountAsElement;
  }

  _needUpdate() {
    this._updateCountAsElement++;
  }

  set translate(vec: Vector3) {
    this._translate = vec.clone();
    this._is_translate_updated = true;
    this._is_trs_matrix_updated = false;
    this._is_inverse_trs_matrix_updated = false;
    this._is_normal_trs_matrix_updated = false;

    this.__updateTransform();
  }

  get translate() {
    return this.translateInner.clone();
  }

  get translateInner() {
    if (this._is_translate_updated) {
      return this._translate;
    } else if (this._is_trs_matrix_updated) {
      this._translate.x = this._matrix.m03;
      this._translate.y = this._matrix.m13;
      this._translate.z = this._matrix.m23;
      this._is_translate_updated = true;
    }
    return this._translate;
  }

  set rotate(vec: Vector3) {

    this._rotate = vec.clone();
    this._is_euler_angles_updated = true;
    this._is_quaternion_updated = false;
    this._is_trs_matrix_updated = false;
    this._is_inverse_trs_matrix_updated = false;
    this._is_normal_trs_matrix_updated = false;

    this.__updateTransform();
  }

  get rotate() {
    return this.rotateInner.clone();
  }

  get rotateInner() {
    if (this._is_euler_angles_updated) {
      return this._rotate;
    } else if (this._is_trs_matrix_updated) {
      this._rotate = this._matrix.toEulerAngles();
    } else if (this._is_quaternion_updated) {
      this._rotate = (new Matrix44(this._quaternion)).toEulerAngles();
    }

    this._is_euler_angles_updated = true;
    return this._rotate;
  }

  set scale(vec: Vector3) {
    this._scale = vec.clone();
    this._is_scale_updated = true;
    this._is_trs_matrix_updated = false;
    this._is_inverse_trs_matrix_updated = false;
    this._is_normal_trs_matrix_updated = false;

    this.__updateTransform();
  }

  get scale() {
    return this.scaleInner.clone();
  }

  get scaleInner() {
    if (this._is_scale_updated) {
      return this._scale;
    } else if (this._is_trs_matrix_updated) {
      let m = this._matrix;
      this._scale.x = Math.sqrt(m.m00*m.m00 + m.m01*m.m01 + m.m02*m.m02);
      this._scale.y = Math.sqrt(m.m10*m.m10 + m.m11*m.m11 + m.m12*m.m12);
      this._scale.z = Math.sqrt(m.m20*m.m20 + m.m21*m.m21 + m.m22*m.m22);
      this._is_scale_updated = true;
    }
    
    return this._scale;
  }

  set quaternion(quat: Quaternion) {
    this._quaternion = quat.clone();
    this._is_quaternion_updated = true;
    this._is_euler_angles_updated = false;
    this._is_trs_matrix_updated = false;
    this._is_inverse_trs_matrix_updated = false;
    this._is_normal_trs_matrix_updated = false;

    this.__updateTransform();
  }

  get quaternion() {
    return this.guaternionInner.clone();
  }

  get guaternionInner(): Quaternion {
    if (this._is_quaternion_updated) {
      return this._quaternion;
    } else if (!this._is_quaternion_updated) {
      if (this._is_trs_matrix_updated) {
        const value = Quaternion.fromMatrix(this._matrix);
        this._is_quaternion_updated = true;
        this._quaternion = value;
        return value;
      } else if (this._is_euler_angles_updated) {
        const value = Quaternion.fromMatrix(Matrix44.rotateXYZ(this._rotate.x, this._rotate.y, this._rotate.z));
        this._is_quaternion_updated = true;
        this._quaternion = value;
        return value;
      } else {
        console.log('Not Quaternion Updated in error!');
      }
    }
  }

  set matrix(mat: Matrix44) {
    this._matrix = mat.clone();
    this._is_trs_matrix_updated = true;
    this._is_translate_updated = false;
    this._is_euler_angles_updated = false;
    this._is_quaternion_updated = false;
    this._is_scale_updated = false;
    this._is_inverse_trs_matrix_updated = false;
    this._is_normal_trs_matrix_updated = false;

    this.__updateTransform();

  }

  get matrix() {
    return this.matrixInner.clone();
  }

  get matrixInner() {

    if (this._is_trs_matrix_updated) {
      return this._matrix;
    }

    // scale
    const scaleMatrix = Matrix44.scale(this.scale);

    // rotate
    const rotationMatrix = new Matrix44(this.quaternion);
    const matrix = Matrix44.multiply(rotationMatrix, scaleMatrix);

    // translate
    const translate = this.translate;
    this._matrix.m03 = translate.x;
    this._matrix.m13 = translate.y;
    this._matrix.m23 = translate.z;

    this._is_trs_matrix_updated = true;

    return this._matrix;
  }

  get inverseMatrix() {
    return this.inverseMatrixInner.clone();
  }

  get inverseMatrixInner() {
    if (!this._is_inverse_trs_matrix_updated) {
      this._invMatrix = this.matrix.invert();
      this._is_inverse_trs_matrix_updated = true;
    }
    return this._invMatrix;
  }

  get normalMatrix() {
    return this.normalMatrixInner.clone(); 
  }

  get normalMatrixInner() {
    if (!this._is_normal_trs_matrix_updated) {
      this._normalMatrix = new Matrix33(Matrix44.invert(this.matrix).transpose());
      this._is_normal_trs_matrix_updated = true;
    }
    return this._normalMatrix; 
  }

  __updateTransform() {
    this.__updateRotation();
    this.__updateTranslate();
    this.__updateScale();
    this.__updateMatrix();
    this._needUpdate();
  }

  __updateRotation() {
    if (this._is_euler_angles_updated && !this._is_quaternion_updated) {
      this._quaternion = Quaternion.fromMatrix(Matrix44.rotateXYZ(this._rotate.x, this._rotate.y, this._rotate.z));
      this._is_quaternion_updated = true;
    } else if (!this._is_euler_angles_updated && this._is_quaternion_updated) {
      this._rotate = (new Matrix44(this._quaternion)).toEulerAngles();
      this._is_euler_angles_updated = true;
    } else if (!this._is_euler_angles_updated && !this._is_quaternion_updated && this._is_trs_matrix_updated) {
      const m = this._matrix;
      this._quaternion = Quaternion.fromMatrix(m);
      this._is_quaternion_updated = true;
      this._rotate = m.toEulerAngles();
      this._is_euler_angles_updated = true;
    }
  }

  __updateTranslate() {
    if (!this._is_translate_updated && this._is_trs_matrix_updated) {
      const m = this._matrix;
      this._translate.x = m.m03;
      this._translate.y = m.m13;
      this._translate.z = m.m23;
      this._is_translate_updated = true;
    }
  }

  __updateScale() {
    if (!this._is_scale_updated && this._is_trs_matrix_updated) {
      const m = this._matrix;
      this._scale.x = Math.sqrt(m.m00*m.m00 + m.m01*m.m01 + m.m02*m.m02);
      this._scale.y = Math.sqrt(m.m10*m.m10 + m.m11*m.m11 + m.m12*m.m12);
      this._scale.z = Math.sqrt(m.m20*m.m20 + m.m21*m.m21 + m.m22*m.m22);
      this._is_scale_updated = true;
    }
  }

  __updateMatrix() {
    if (!this._is_trs_matrix_updated && this._is_translate_updated && this._is_quaternion_updated && this._is_scale_updated) {
      const rotationMatrix = new Matrix44(this.getQuaternionNotAnimated());
  
      let scale = this.getScaleNotAnimated();
  
      this._matrix = Matrix44.multiply(rotationMatrix, Matrix44.scale(scale));
      let translateVec = this.getTranslateNotAnimated();
      this._matrix.m03 = translateVec.x;
      this._matrix.m13 = translateVec.y;
      this._matrix.m23 = translateVec.z;
  
      this._is_trs_matrix_updated = true;
    }
  }

  setPropertiesFromJson(arg) {
    let json = arg;
    if (typeof arg === "string") {
      json = JSON.parse(arg);
    }
    for(let key in json) {
      if(json.hasOwnProperty(key) && key in this) {
        if (key === "quaternion") {
          this[key] = MathClassUtil.arrayToQuaternion(json[key]);
        } else {
          this[key] = MathClassUtil.arrayToVectorOrMatrix(json[key]);
        }
      }
    }
  }

  setRotationFromNewUpAndFront(UpVec, FrontVec) {
    let yDir = UpVec;
    let xDir = Vector3.cross(yDir, FrontVec);
    let zDir = Vector3.cross(xDir, yDir);
    
    let rotateMatrix = Matrix44.identity();

    rotateMatrix.m00 = xDir.x;
    rotateMatrix.m10 = xDir.y;
    rotateMatrix.m20 = xDir.z;
  
    rotateMatrix.m01 = yDir.x;
    rotateMatrix.m11 = yDir.y;
    rotateMatrix.m21 = yDir.z;
  
    rotateMatrix.m02 = zDir.x;
    rotateMatrix.m12 = zDir.y;
    rotateMatrix.m22 = zDir.z;
  
    this.rotateMatrix33 = rotateMatrix;
  }

  headToDirection(fromVec: Vector3, toVec: :Vector3) {
    const fromDir = Vector3.normalize(fromVec);
    const toDir = Vector3.normalize(toVec);
    const rotationDir = Vector3.cross(fromDir, toDir);
    const cosTheta = Vector3.dotProduct(fromDir, toDir);
    let theta = Math.acos(cosTheta);
    if (GLBoost["VALUE_ANGLE_UNIT"] === GLBoost.DEGREE) {
      theta = MathUtil.radianToDegree(theta);
    }
    this.quaternion = Quaternion.axisAngle(rotationDir, theta);
  }

  set rotateMatrix33(rotateMatrix: Matrix33) {
    this.quaternion = Quaternion.fromMatrix(rotateMatrix);
  }

  get rotateMatrix33() {
    return new Matrix33(this.quaternion);
  }
}
