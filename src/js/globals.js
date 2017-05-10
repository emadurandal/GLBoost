var global = ('global',eval)('this');

(function (global) {
  let GLBoost = typeof global.GLBoost !== 'undefined' ? global.GLBoost : { REVISION: 'r2-dev' };

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
    let c = {
      count: 0,
      define: function (constantName) {
        GLBoost[constantName] = this.count;
        GLBoost.GLBOOST_CONSTANT_NAMES[this.count] = constantName;
        this.count++;
      }
    };

    c.define('POSITION');
    c.define('COLOR');
    c.define('NORMAL');
    c.define('TEXCOORD');
    c.define('JOINT');
    c.define('WEIGHT');
    c.define('POINTS');
    c.define('LINES');
    c.define('LINE_STRIP');
    c.define('LINE_LOOP');
    c.define('TRIANGLES');
    c.define('TRIANGLE_STRIP');
    c.define('STATIC_DRAW');
    c.define('STREAM_DRAW');
    c.define('DYNAMIC_DRAW');
    c.define('BLENDTARGET1');
    c.define('BLENDTARGET2');
    c.define('BLENDTARGET3');
    c.define('BLENDTARGET4');
    c.define('BLENDTARGET5');
    c.define('BLENDTARGET6');
    c.define('BLENDTARGET7');
    c.define('BLENDTARGET8');
    c.define('BLENDTARGET9');
    c.define('BLENDTARGET10');
    c.define('RADIAN');
    c.define('DEGREE');
    c.define('RENDER_TARGET_NONE_COLOR'); // gl.NONE
    c.define('COLOR_ATTACHMENT0'); // gl.COLOR_ATTACHMENT0
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
    c.define('TEXTURE_PURPOSE_DIFFUSE');
    c.define('QUERY_TYPE_INSTANCE_NAME');
    c.define('QUERY_TYPE_USER_FLAVOR_NAME');
    c.define('QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR');
    c.define('QUERY_FORMAT_STRING');
    c.define('QUERY_FORMAT_REGEXP');

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

})(global);

export default global.GLBoost;

