window.GLBoost = window.GLBoost || { REVISION: '1' };

var global = window;
global.GLBoost["TARGET_WEBGL_VERSION"] = 1;
global.GLBoost["POSITION"] = 'position';
global.GLBoost["COLOR"] = 'color';
global.GLBoost["TEXCOORD"] = 'texcoord';
global.GLBoost["BLENDTARGET1"] = 'shapetarget_1';
global.GLBoost["BLENDTARGET2"] = 'shapetarget_2';
global.GLBoost["BLENDTARGET3"] = 'shapetarget_3';
global.GLBoost["BLENDTARGET4"] = 'shapetarget_4';
global.GLBoost["BLENDTARGET5"] = 'shapetarget_5';
global.GLBoost["BLENDTARGET6"] = 'shapetarget_6';
global.GLBoost["BLENDTARGET7"] = 'shapetarget_7';
global.GLBoost["BLENDTARGET8"] = 'shapetarget_8';
global.GLBoost["BLENDTARGET9"] = 'shapetarget_9';
global.GLBoost["BLENDTARGET10"] = 'shapetarget_10';

export default global.GLBoost;

global.GLBoost.isThisGLVersion_2 = function(gl) {
  return gl instanceof WebGL2RenderingContext;
}
