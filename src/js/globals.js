var global = ('global',eval)('this');

(function (global) {
  let GLBoost = typeof global.GLBoost !== 'undefined' ? global.GLBoost : { REVISION: 'r3-dev' };

  if (typeof define === 'function' && define.amd) {
    define(function() { return GLBoost; });
  } else if (typeof exports === 'object') {
    module.exports = GLBoost;
    global.GLBoost = GLBoost;
  } else {
    global.GLBoost = GLBoost;
  }

  (function(){
    GLBoost.GLBOOST_CONSTANT_NAMES = [];
    GLBoost.GLBOOST_CONSTANT_VALUES = [];
    let c = {
      count: 0,
      define: function (constantName, constantValue) {
        let count = this.count;
        GLBoost[constantName] = count;
        GLBoost.GLBOOST_CONSTANT_NAMES[count] = constantName;
        GLBoost.GLBOOST_CONSTANT_VALUES[count] =
          (typeof constantValue !== 'undefined') ? constantValue:constantName;
        this.count++;
      }
    };

    /// Define GLBoost Constants.
    // Do not directly use integers set in these constants.
    // These may be changed each time constants are added in the future.
    c.define('POSITION', 'position');
    c.define('COLOR', 'color');
    c.define('NORMAL', 'normal');
    c.define('TEXCOORD', 'texcoord');
    c.define('TANGENT', 'tangent');
    c.define('JOINT', 'joint');
    c.define('WEIGHT', 'weight');
    c.define('POINTS');
    c.define('LINES');
    c.define('LINE_STRIP');
    c.define('LINE_LOOP');
    c.define('TRIANGLES');
    c.define('TRIANGLE_STRIP');
    c.define('STATIC_DRAW');
    c.define('STREAM_DRAW');
    c.define('DYNAMIC_DRAW');
    c.define('BLENDTARGET1', 'shapetarget_1');
    c.define('BLENDTARGET2', 'shapetarget_2');
    c.define('BLENDTARGET3', 'shapetarget_3');
    c.define('BLENDTARGET4', 'shapetarget_4');
    c.define('BLENDTARGET5', 'shapetarget_5');
    c.define('BLENDTARGET6', 'shapetarget_6');
    c.define('BLENDTARGET7', 'shapetarget_7');
    c.define('BLENDTARGET8', 'shapetarget_8');
    c.define('BLENDTARGET9', 'shapetarget_9');
    c.define('BLENDTARGET10', 'shapetarget_10');
    c.define('RADIAN', 'radian');
    c.define('DEGREE', 'degree');
    c.define('RENDER_TARGET_NONE_COLOR', 0); // gl.NONE
    c.define('COLOR_ATTACHMENT0', 0x8CE0); // gl.COLOR_ATTACHMENT0
    c.define('UNPACK_FLIP_Y_WEBGL');
    c.define('TEXTURE_MAG_FILTER');
    c.define('TEXTURE_MIN_FILTER');
    c.define('LINEAR');
    c.define('LINEAR_MIPMAP_LINEAR');
    c.define('NEAREST');
    c.define('TEXTURE_WRAP_S');
    c.define('TEXTURE_WRAP_T');
    c.define('REPEAT');
    c.define('CLAMP_TO_EDGE');
    c.define('MIRRORED_REPEAT');
    c.define('TEXTURE_PURPOSE_DIFFUSE', 'diffuse');
    c.define('TEXTURE_PURPOSE_NORMAL', 'normal');
    c.define('QUERY_TYPE_INSTANCE_NAME');
    c.define('QUERY_TYPE_USER_FLAVOR_NAME');
    c.define('QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR');
    c.define('QUERY_FORMAT_STRING');
    c.define('QUERY_FORMAT_REGEXP');

    c.define('WORLD_MATRIX');

    c.define('SHADER_PARAMETER_TYPE_OBJECT');
    c.define('SHADER_PARAMETER_TYPE_MATERIAL');
    c.define('SHADER_PARAMETER_TYPE_LIGHT');
    c.define('SHADER_PARAMETER_TYPE_JOINTSET');
    c.define('SHADER_PARAMETER_TYPE_MORPH');
    
    c.define('GLOBAL_STATES_USAGE_DO_NOTHING');
    c.define('GLOBAL_STATES_USAGE_IGNORE');
    c.define('GLOBAL_STATES_USAGE_INCLUSIVE');
    c.define('GLOBAL_STATES_USAGE_EXCLUSIVE');

    c.define('LOG_GENERAL');
    c.define('LOG_SHADER_CODE');
    c.define('LOG_GLBOOST_OBJECT_LIFECYCLE');
    c.define('LOG_GL_RESOURCE_LIFECYCLE');
    c.define('LOG_GL_ERROR');
    c.define('LOG_OMISSION_PROCESSING');

  })();


  GLBoost.isThisGLVersion_2 = function(gl) {
    if (typeof WebGL2RenderingContext === 'undefined') {
      return false;
    }
    return gl instanceof WebGL2RenderingContext;
  };

  GLBoost.getNameOfGLBoostConstant = function(glboostConstant) {
    return GLBoost.GLBOOST_CONSTANT_NAMES[glboostConstant];
  };
  GLBoost.getValueOfGLBoostConstant = function(glboostConstant) {
    return GLBoost.GLBOOST_CONSTANT_VALUES[glboostConstant];
  };

})(global);

export default global.GLBoost;

