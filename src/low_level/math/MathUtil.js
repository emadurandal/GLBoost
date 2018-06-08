import GLBoost from '../../globals';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Vector4 from './Vector4';
import Quaternion from './Quaternion';

export default class MathUtil {

  constructor() {

  }

  static radianToDegree(rad) {
    return rad * 180 / Math.PI;
  }

  static degreeToRadian(deg) {
    return deg * Math.PI / 180;
  }

  static arrayToVector(element) {
    if (Array.isArray(element)) {
      if(typeof(element[3]) !== 'undefined') {
        return new Vector4(element[0], element[1], element[2], element[3]);
      } else if (typeof(element[2]) !== 'undefined') {
        return new Vector3(element[0], element[1], element[2]);
      } else {
        return new Vector2(element[0], element[1]);
      }
    } else {
      return element;
    }
  }

  static makeSubArray(array, componentN) {
    if (componentN === 4) {
      return [array[0], array[1], array[2], array[3]];
    } else if (componentN === 3) {
      return [array[0], array[1], array[2]];
    } else if (componentN === 2) {
      return [array[0], array[1]];
    } else {
      return array[0];
    }
  }

  static vectorToArray(element) {
    if(element instanceof Vector2) {
      return [element.x, element.y];
    } else if (element instanceof Vector3) {
      return [element.x, element.y, element.z];
    } else if (element instanceof Vector4 || element instanceof Quaternion) {
      return [element.x, element.y, element.z, element.w];
    } else {
      return element;
    }
  }

  static compomentNumberOfVector(element) {
    if(element instanceof Vector2) {
      return 2;
    } else if (element instanceof Vector3) {
      return 3;
    } else if (element instanceof Vector4 || element instanceof Quaternion) {
      return 4;
    } else if (Array.isArray(element)) {
      return element.length;
    } else {
      return 0;
    }
  }

  // values range must be [-1, 1]
  static packNormalizedVec4ToVec2(x, y, z, w, criteria) {
    let v0 = 0.0;
    let v1 = 0.0;
    
    x = (x + 1)/2.0;
    y = (y + 1)/2.0;
    z = (z + 1)/2.0;
    w = (w + 1)/2.0;

    let ir = Math.floor(x*(criteria-1.0));
    let ig = Math.floor(y*(criteria-1.0));
    let irg = ir*criteria + ig;
    v0 = irg / criteria; 

    let ib =  Math.floor(z*(criteria-1.0));
    let ia =  Math.floor(w*(criteria-1.0));
    let iba = ib*criteria + ia;
    v1 =iba / criteria; 
    
    return [v0, v1];
  }

  // https://ja.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E6%8E%A2%E7%B4%A2
  static findNearestByBinarySearch(ary, key, imin, imax) {
    if (imax < imin) {
      return null;
    } else if (imax === imin) {
      return imin;
    } else {
      const imid = imin + Math.floor((imax - imin) / 2);
      if (ary[imid] <= key && imid+1 <= imax && key <= ary[imid+1]) {
        return imid;
      } else if (ary[imid] > key) {
        return MathUtil.findNearestByBinarySearch(ary, key, imin, imid - 1);
      } else if (ary[imid] < key) {
        return MathUtil.findNearestByBinarySearch(ary, key, imid + 1, imax);
      } else {
        return imid;
      }
    }
  }
}

GLBoost["MathUtil"] = MathUtil;
