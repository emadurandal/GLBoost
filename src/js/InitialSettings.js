import GLBoost from './globals';
import Vector3 from './low_level/math/Vector3';

export default class InitialSettings {
  constructor() {

  }
}

GLBoost['TARGET_WEBGL_VERSION'] = 1;
GLBoost['DEFAULT_POINTLIGHT_INTENSITY'] = new Vector3(1, 1, 1);
GLBoost['ANGLE_UNIT'] = GLBoost.DEGREE;
GLBoost['WEBGL_ONE_USE_EXTENSIONS'] = true;
GLBoost['CONSOLE_OUT_FOR_DEBUGGING'] = true;
