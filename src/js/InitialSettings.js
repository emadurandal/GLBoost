import GLBoost from './globals'
import Vector3 from './math/Vector3'

export default class InitialSettings {
  constructor() {

  }
}

GLBoost["TARGET_WEBGL_VERSION"] = 1;
GLBoost["DEFAULT_POINTLIGHT_INTENSITY"] = new Vector3(1, 1, 1);
GLBoost["ANGLE_UNIT"] = GLBoost.DEGREE;

