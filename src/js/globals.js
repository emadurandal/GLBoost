var global = ('global',eval)('this');

(function (global) {
  let GLBoost = typeof global.GLBoost !== 'undefined' ? global.GLBoost : { REVISION: '1' };

  if (typeof define === 'function' && define.amd) {
    define(function() { return GLBoost; });
  } else if (typeof exports === 'object') {
    module.exports = GLBoost;
    global.GLBoost = GLBoost;
  } else {
    global.GLBoost = GLBoost;
  }

  GLBoost['POSITION'] = 'position';
  GLBoost['COLOR'] = 'color';
  GLBoost['NORMAL'] = 'normal';
  GLBoost['TEXCOORD'] = 'texcoord';
  GLBoost['JOINT'] = 'joint';
  GLBoost['WEIGHT'] = 'weight';
  GLBoost['POINTS'] = 'POINTS';
  GLBoost['LINES'] = 'LINES';
  GLBoost['LINE_STRIP'] = 'LINE_STRIP';
  GLBoost['LINE_LOOP'] = 'LINE_LOOP';
  GLBoost['TRIANGLES'] = 'TRIANGLES';
  GLBoost['TRIANGLE_STRIP'] = 'TRIANGLE_STRIP';
  GLBoost['STATIC_DRAW'] = 'STATIC_DRAW';
  GLBoost['STREAM_DRAW'] = 'STREAM_DRAW';
  GLBoost['DYNAMIC_DRAW'] = 'DYNAMIC_DRAW';
  GLBoost['BLENDTARGET1'] = 'shapetarget_1';
  GLBoost['BLENDTARGET2'] = 'shapetarget_2';
  GLBoost['BLENDTARGET3'] = 'shapetarget_3';
  GLBoost['BLENDTARGET4'] = 'shapetarget_4';
  GLBoost['BLENDTARGET5'] = 'shapetarget_5';
  GLBoost['BLENDTARGET6'] = 'shapetarget_6';
  GLBoost['BLENDTARGET7'] = 'shapetarget_7';
  GLBoost['BLENDTARGET8'] = 'shapetarget_8';
  GLBoost['BLENDTARGET9'] = 'shapetarget_9';
  GLBoost['BLENDTARGET10'] = 'shapetarget_10';
  GLBoost['RADIAN'] = 'radian';
  GLBoost['DEGREE'] = 'degree';
  GLBoost['RENDER_TARGET_NONE_COLOR'] = 0; // gl.NONE
  GLBoost['COLOR_ATTACHMENT0'] = 0x8CE0; // gl.COLOR_ATTACHMENT0
  GLBoost['UNPACK_FLIP_Y_WEBGL'] = 'UNPACK_FLIP_Y_WEBGL';
  GLBoost['TEXTURE_MAG_FILTER'] = 'TEXTURE_MAG_FILTER';
  GLBoost['TEXTURE_MIN_FILTER'] = 'TEXTURE_MIN_FILTER';
  GLBoost['LINEAR'] = 'LINEAR';
  GLBoost['LINEAR_MIPMAP_LINEAR'] = 'LINEAR_MIPMAP_LINEAR';
  GLBoost['NEAREST'] = 'NEAREST';
  GLBoost['TEXTURE_WRAP_S'] = 'TEXTURE_WRAP_S';
  GLBoost['TEXTURE_WRAP_T'] = 'TEXTURE_WRAP_T';
  GLBoost['REPEAT'] = 'REPEAT';
  GLBoost['CLAMP_TO_EDGE'] = 'CLAMP_TO_EDGE';
  GLBoost['MIRRORED_REPEAT'] = 'MIRRORED_REPEAT';
  GLBoost['LOG_SHADER_CODE'] = 'LOG_SHADER_CODE';
  GLBoost['LOG_GLBOOST_OBJECT_LIFECYCLE'] = 'LOG_GLBOOST_OBJECT_LIFECYCLE';
  GLBoost['LOG_GL_RESOURCE_LIFECYCLE'] = 'LOG_GL_RESOURCE_LIFECYCLE';

  GLBoost.isThisGLVersion_2 = function(gl) {
    if (typeof WebGL2RenderingContext === 'undefined') {
      return false;
    }
    return gl instanceof WebGL2RenderingContext;
  };

})(global);

export default global.GLBoost;

