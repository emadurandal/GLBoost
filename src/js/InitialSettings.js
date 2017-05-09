import GLBoost from './globals';
import Vector3 from './low_level/math/Vector3';

export default class InitialSettings {
  constructor() {

  }
}

GLBoost['VALUE_TARGET_WEBGL_VERSION'] = 1;
GLBoost['VALUE_DEFAULT_POINTLIGHT_INTENSITY'] = new Vector3(1, 1, 1);
GLBoost['VALUE_ANGLE_UNIT'] = GLBoost.DEGREE;
GLBoost['VALUE_WEBGL_ONE_USE_EXTENSIONS'] = true;
GLBoost['VALUE_CONSOLE_OUT_FOR_DEBUGGING'] = false;
GLBoost['VALUE_LOG_GENERAL'] = true;
GLBoost['VALUE_LOG_SHADER_CODE'] = true;
GLBoost['VALUE_LOG_GLBOOST_OBJECT_LIFECYCLE'] = true;
GLBoost['VALUE_LOG_GL_RESOURCE_LIFECYCLE'] = true;
GLBoost['VALUE_LOG_GL_ERROR'] = true;
