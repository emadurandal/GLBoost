import GLBoost from './globals';
import Vector3 from './low_level/math/Vector3';

(function(){
  GLBoost.valueOfGLBoostConstants = [];
  let defineValueOfGLBoostConstants = (glboostConstant_or_glboostConstantValueName, value)=> {
    if (isFinite(glboostConstant_or_glboostConstantValueName)) {
      let glboostConstant = glboostConstant_or_glboostConstantValueName;
      let glboostConstantName = GLBoost.getNameOfGLBoostConstant(glboostConstant);
      if (glboostConstantName) {
        let glboostConstantValueName = 'VALUE_' + glboostConstantName;
        Object.defineProperty(GLBoost, glboostConstantValueName, {
          get: function () {

            return this.valueOfGLBoostConstants[glboostConstant];
          },
          set: function (flg) {
            this.valueOfGLBoostConstants[glboostConstant] = flg;
          },
        });
        GLBoost[glboostConstantValueName] = value;
      }
    } else {
      let glboostConstantValueName = glboostConstant_or_glboostConstantValueName;
      GLBoost[glboostConstantValueName] = value;
    }
  };

  /// define value of GLBoost global settings.
  let define = defineValueOfGLBoostConstants;
  define('VALUE_TARGET_WEBGL_VERSION', 1);
  define('VALUE_TARGET_IS_MOBILE', 0);
  define('VALUE_DEFAULT_POINTLIGHT_INTENSITY', new Vector3(1, 1, 1));
  define('VALUE_ANGLE_UNIT', GLBoost.DEGREE);
  define('VALUE_WEBGL_ONE_USE_EXTENSIONS', true);
  define('VALUE_CONSOLE_OUT_FOR_DEBUGGING', false);
  define(GLBoost.LOG_GENERAL, true);
  define(GLBoost.LOG_SHADER_CODE, true);
  define(GLBoost.LOG_GLBOOST_OBJECT_LIFECYCLE, true);
  define(GLBoost.LOG_GL_RESOURCE_LIFECYCLE, true);
  define(GLBoost.LOG_GL_ERROR, true);
  define(GLBoost.LOG_OMISSION_PROCESSING, false);
})();
