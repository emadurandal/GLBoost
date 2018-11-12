var global = ('global',eval)('this');

(function (global) {
  global.GLBoost = (typeof global.GLBoost !== 'undefined') ? global.GLBoost : {};
  const GLBoost = global.GLBoost;
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
      __existedConstants: [],
      define: function (constantName, glConstantValue, aliasName) {

        let value = null;

        if (glConstantValue !== void 0 ) {
          value = glConstantValue;
          this.__existedConstants.push(glConstantValue);
        } else {
          const checkUnique = ()=> {
            let result = true;
            for (let existValue of this.__existedConstants) {
              if (this.count === existValue) {
                result = false;
              }
            }
            return result;
          };

          for (; checkUnique() === false; this.count++) {}

          value = this.count;
        }

        GLBoost[constantName] = value;
        GLBoost.GLBOOST_CONSTANT_NAMES[value] = constantName;
        GLBoost.GLBOOST_CONSTANT_VALUES[value] = (typeof aliasName !== 'undefined') ? aliasName:constantName;

        this.count++;
      }
    };

    // Define GLBoost Constants.
    /// copies of WebGL constants
    c.define('ACTIVE_ATTRIBUTES', 35721);
    c.define('ACTIVE_ATTRIBUTE_MAX_LENGTH', 35722);
    c.define('ACTIVE_TEXTURE', 34016);
    c.define('ACTIVE_UNIFORMS', 35718);
    c.define('ACTIVE_UNIFORM_MAX_LENGTH', 35719);
    c.define('ALIASED_LINE_WIDTH_RANGE', 33902);
    c.define('ALIASED_POINT_SIZE_RANGE', 33901);
    c.define('ALPHA', 6406);
    c.define('ALPHA_BITS', 3413);
    c.define('ALWAYS', 519);
    c.define('ARRAY_BUFFER', 34962);
    c.define('ARRAY_BUFFER_BINDING', 34964);
    c.define('ATTACHED_SHADERS', 35717);
    c.define('BACK', 1029);
    c.define('BLEND', 3042);
    c.define('BLEND_COLOR', 32773);
    c.define('BLEND_DST_ALPHA', 32970);
    c.define('BLEND_DST_RGB', 32968);
    c.define('BLEND_EQUATION', 32777);
    c.define('BLEND_EQUATION_ALPHA', 34877);
    c.define('BLEND_EQUATION_RGB', 32777);
    c.define('BLEND_SRC_ALPHA', 32971);
    c.define('BLEND_SRC_RGB', 32969);
    c.define('BLUE_BITS', 3412);
    c.define('BOOL', 35670);
    c.define('BOOL_VEC2', 35671);
    c.define('BOOL_VEC3', 35672);
    c.define('BOOL_VEC4', 35673);
    c.define('BROWSER_DEFAULT_WEBGL', 37444);
    c.define('BUFFER_SIZE', 34660);
    c.define('BUFFER_USAGE', 34661);
    c.define('BYTE', 5120);
    c.define('CCW', 2305);
    c.define('CLAMP_TO_EDGE', 33071);
    c.define('COLOR_ATTACHMENT0', 36064);
    c.define('COLOR_BUFFER_BIT', 16384);
    c.define('COLOR_CLEAR_VALUE', 3106);
    c.define('COLOR_WRITEMASK', 3107);
    c.define('COMPILE_STATUS', 35713);
    c.define('COMPRESSED_TEXTURE_FORMATS', 34467);
    c.define('CONSTANT_ALPHA', 32771);
    c.define('CONSTANT_COLOR', 32769);
    c.define('CONTEXT_LOST_WEBGL', 37442);
    c.define('CULL_FACE', 2884);
    c.define('CULL_FACE_MODE', 2885);
    c.define('CURRENT_PROGRAM', 35725);
    c.define('CURRENT_VERTEX_ATTRIB', 34342);
    c.define('CW', 2304);
    c.define('DECR', 7683);
    c.define('DECR_WRAP', 34056);
    c.define('DELETE_STATUS', 35712);
    c.define('DEPTH_ATTACHMENT', 36096);
    c.define('DEPTH_BITS', 3414);
    c.define('DEPTH_BUFFER_BIT', 256);
    c.define('DEPTH_CLEAR_VALUE', 2931);
    c.define('DEPTH_COMPONENT', 6402);
    c.define('DEPTH_COMPONENT16', 33189);
    c.define('DEPTH_FUNC', 2932);
    c.define('DEPTH_RANGE', 2928);
    c.define('DEPTH_STENCIL', 34041);
    c.define('DEPTH_STENCIL_ATTACHMENT', 33306);
    c.define('DEPTH_TEST', 2929);
    c.define('DEPTH_WRITEMASK', 2930);
    c.define('DITHER', 3024);
    c.define('DONT_CARE', 4352);
    c.define('DST_ALPHA', 772);
    c.define('DST_COLOR', 774);
    c.define('DYNAMIC_DRAW', 35048);
    c.define('ELEMENT_ARRAY_BUFFER', 34963);
    c.define('ELEMENT_ARRAY_BUFFER_BINDING', 34965);
    c.define('EQUAL', 514);
    c.define('FASTEST', 4353);
    c.define('FLOAT', 5126);
    c.define('FLOAT_MAT2', 35674);
    c.define('FLOAT_MAT3', 35675);
    c.define('FLOAT_MAT4', 35676);
    c.define('FLOAT_VEC2', 35664);
    c.define('FLOAT_VEC3', 35665);
    c.define('FLOAT_VEC4', 35666);
    c.define('FRAGMENT_SHADER', 35632);
    c.define('FRAMEBUFFER', 36160);
    c.define('FRAMEBUFFER_ATTACHMENT_OBJECT_NAME', 36049);
    c.define('FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE', 36048);
    c.define('FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE', 36051);
    c.define('FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL', 36050);
    c.define('FRAMEBUFFER_BINDING', 36006);
    c.define('FRAMEBUFFER_COMPLETE', 36053);
    c.define('FRAMEBUFFER_INCOMPLETE_ATTACHMENT', 36054);
    c.define('FRAMEBUFFER_INCOMPLETE_DIMENSIONS', 36057);
    c.define('FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT', 36055);
    c.define('FRAMEBUFFER_UNSUPPORTED', 36061);
    c.define('FRONT', 1028);
    c.define('FRONT_AND_BACK', 1032);
    c.define('FRONT_FACE', 2886);
    c.define('FUNC_ADD', 32774);
    c.define('FUNC_REVERSE_SUBTRACT', 32779);
    c.define('FUNC_SUBTRACT', 32778);
    c.define('GENERATE_MIPMAP_HINT', 33170);
    c.define('GEQUAL', 518);
    c.define('GREATER', 516);
    c.define('GREEN_BITS', 3411);
    c.define('HIGH_FLOAT', 36338);
    c.define('HIGH_INT', 36341);
    c.define('INCR', 7682);
    c.define('INCR_WRAP', 34055);
    c.define('INFO_LOG_LENGTH', 35716);
    c.define('INT', 5124);
    c.define('INT_VEC2', 35667);
    c.define('INT_VEC3', 35668);
    c.define('INT_VEC4', 35669);
    c.define('INVALID_ENUM', 1280);
    c.define('INVALID_FRAMEBUFFER_OPERATION', 1286);
    c.define('INVALID_OPERATION', 1282);
    c.define('INVALID_VALUE', 1281);
    c.define('INVERT', 5386);
    c.define('KEEP', 7680);
    c.define('LEQUAL', 515);
    c.define('LESS', 513);
    c.define('LINEAR', 9729);
    c.define('LINEAR_MIPMAP_LINEAR', 9987);
    c.define('LINEAR_MIPMAP_NEAREST', 9985);
    c.define('LINES', 1);
    c.define('LINE_LOOP', 2);
    c.define('LINE_STRIP', 3);
    c.define('LINE_WIDTH', 2849);
    c.define('LINK_STATUS', 35714);
    c.define('LOW_FLOAT', 36336);
    c.define('LOW_INT', 36339);
    c.define('LUMINANCE', 6409);
    c.define('LUMINANCE_ALPHA', 6410);
    c.define('MAX_COMBINED_TEXTURE_IMAGE_UNITS', 35661);
    c.define('MAX_CUBE_MAP_TEXTURE_SIZE', 34076);
    c.define('MAX_FRAGMENT_UNIFORM_VECTORS', 36349);
    c.define('MAX_RENDERBUFFER_SIZE', 34024);
    c.define('MAX_TEXTURE_IMAGE_UNITS', 34930);
    c.define('MAX_TEXTURE_SIZE', 3379);
    c.define('MAX_VARYING_VECTORS', 36348);
    c.define('MAX_VERTEX_ATTRIBS', 34921);
    c.define('MAX_VERTEX_TEXTURE_IMAGE_UNITS', 35660);
    c.define('MAX_VERTEX_UNIFORM_VECTORS', 36347);
    c.define('MAX_VIEWPORT_DIMS', 3386);
    c.define('MEDIUM_FLOAT', 36337);
    c.define('MEDIUM_INT', 36340);
    c.define('MIRRORED_REPEAT', 33648);
    c.define('NEAREST', 9728);
    c.define('NEAREST_MIPMAP_LINEAR', 9986);
    c.define('NEAREST_MIPMAP_NEAREST', 9984);
    c.define('NEVER', 512);
    c.define('NICEST', 4354);
    c.define('NONE', 0);
    c.define('NOTEQUAL', 517);
    c.define('NO_ERROR', 0);
    c.define('NUM_COMPRESSED_TEXTURE_FORMATS', 34466);
    c.define('ONE', 1);
    c.define('ONE_MINUS_CONSTANT_ALPHA', 32772);
    c.define('ONE_MINUS_CONSTANT_COLOR', 32770);
    c.define('ONE_MINUS_DST_ALPHA', 773);
    c.define('ONE_MINUS_DST_COLOR', 775);
    c.define('ONE_MINUS_SRC_ALPHA', 771);
    c.define('ONE_MINUS_SRC_COLOR', 769);
    c.define('OUT_OF_MEMORY', 1285);
    c.define('PACK_ALIGNMENT', 3333);
    c.define('POINTS', 0);
    c.define('POLYGON_OFFSET_FACTOR', 32824);
    c.define('POLYGON_OFFSET_FILL', 32823);
    c.define('POLYGON_OFFSET_UNITS', 10752);
    c.define('RED_BITS', 3410);
    c.define('RENDERBUFFER', 36161);
    c.define('RENDERBUFFER_ALPHA_SIZE', 36179);
    c.define('RENDERBUFFER_BINDING', 36007);
    c.define('RENDERBUFFER_BLUE_SIZE', 36178);
    c.define('RENDERBUFFER_DEPTH_SIZE', 36180);
    c.define('RENDERBUFFER_GREEN_SIZE', 36177);
    c.define('RENDERBUFFER_HEIGHT', 36163);
    c.define('RENDERBUFFER_INTERNAL_FORMAT', 36164);
    c.define('RENDERBUFFER_RED_SIZE', 36176);
    c.define('RENDERBUFFER_STENCIL_SIZE', 36181);
    c.define('RENDERBUFFER_WIDTH', 36162);
    c.define('RENDERER', 7937);
    c.define('REPEAT', 10497);
    c.define('REPLACE', 7681);
    c.define('RGB', 6407);
    c.define('RGB5_A1', 32855);
    c.define('RGB565', 36194);
    c.define('RGBA', 6408);
    c.define('RGBA4', 32854);
    c.define('SAMPLER_2D', 35678);
    c.define('SAMPLER_CUBE', 35680);
    c.define('SAMPLES', 32937);
    c.define('SAMPLE_ALPHA_TO_COVERAGE', 32926);
    c.define('SAMPLE_BUFFERS', 32936);
    c.define('SAMPLE_COVERAGE', 32928);
    c.define('SAMPLE_COVERAGE_INVERT', 32939);
    c.define('SAMPLE_COVERAGE_VALUE', 32938);
    c.define('SCISSOR_BOX', 3088);
    c.define('SCISSOR_TEST', 3089);
    c.define('SHADER_COMPILER', 36346);
    c.define('SHADER_SOURCE_LENGTH', 35720);
    c.define('SHADER_TYPE', 35663);
    c.define('SHADING_LANGUAGE_VERSION', 35724);
    c.define('SHORT', 5122);
    c.define('SRC_ALPHA', 770);
    c.define('SRC_ALPHA_SATURATE', 776);
    c.define('SRC_COLOR', 768);
    c.define('STATIC_DRAW', 35044);
    c.define('STENCIL_ATTACHMENT', 36128);
    c.define('STENCIL_BACK_FAIL', 34817);
    c.define('STENCIL_BACK_FUNC', 34816);
    c.define('STENCIL_BACK_PASS_DEPTH_FAIL', 34818);
    c.define('STENCIL_BACK_PASS_DEPTH_PASS', 34819);
    c.define('STENCIL_BACK_REF', 36003);
    c.define('STENCIL_BACK_VALUE_MASK', 36004);
    c.define('STENCIL_BACK_WRITEMASK', 36005);
    c.define('STENCIL_BITS', 3415);
    c.define('STENCIL_BUFFER_BIT', 1024);
    c.define('STENCIL_CLEAR_VALUE', 2961);
    c.define('STENCIL_FAIL', 2964);
    c.define('STENCIL_FUNC', 2962);
    c.define('STENCIL_INDEX', 6401);
    c.define('STENCIL_INDEX8', 36168);
    c.define('STENCIL_PASS_DEPTH_FAIL', 2965);
    c.define('STENCIL_PASS_DEPTH_PASS', 2966);
    c.define('STENCIL_REF', 2967);
    c.define('STENCIL_TEST', 2960);
    c.define('STENCIL_VALUE_MASK', 2963);
    c.define('STENCIL_WRITEMASK', 2968);
    c.define('STREAM_DRAW', 35040);
    c.define('SUBPIXEL_BITS', 3408);
    c.define('TEXTURE', 5890);
    c.define('TEXTURE0', 33984);
    c.define('TEXTURE1', 33985);
    c.define('TEXTURE2', 33986);
    c.define('TEXTURE3', 33987);
    c.define('TEXTURE4', 33988);
    c.define('TEXTURE5', 33989);
    c.define('TEXTURE6', 33990);
    c.define('TEXTURE7', 33991);
    c.define('TEXTURE8', 33992);
    c.define('TEXTURE9', 33993);
    c.define('TEXTURE10', 33994);
    c.define('TEXTURE11', 33995);
    c.define('TEXTURE12', 33996);
    c.define('TEXTURE13', 33997);
    c.define('TEXTURE14', 33998);
    c.define('TEXTURE15', 33999);
    c.define('TEXTURE16', 34000);
    c.define('TEXTURE17', 34001);
    c.define('TEXTURE18', 34002);
    c.define('TEXTURE19', 34003);
    c.define('TEXTURE20', 34004);
    c.define('TEXTURE21', 34005);
    c.define('TEXTURE22', 34006);
    c.define('TEXTURE23', 34007);
    c.define('TEXTURE24', 34008);
    c.define('TEXTURE25', 34009);
    c.define('TEXTURE26', 34010);
    c.define('TEXTURE27', 34011);
    c.define('TEXTURE28', 34012);
    c.define('TEXTURE29', 34013);
    c.define('TEXTURE30', 34014);
    c.define('TEXTURE31', 34015);
    c.define('TEXTURE_2D', 3553);
    c.define('TEXTURE_BINDING_2D', 32873);
    c.define('TEXTURE_BINDING_CUBE_MAP', 34068);
    c.define('TEXTURE_CUBE_MAP', 34067);
    c.define('TEXTURE_CUBE_MAP_NEGATIVE_X', 34070);
    c.define('TEXTURE_CUBE_MAP_NEGATIVE_Y', 34072);
    c.define('TEXTURE_CUBE_MAP_NEGATIVE_Z', 34074);
    c.define('TEXTURE_CUBE_MAP_POSITIVE_X', 34069);
    c.define('TEXTURE_CUBE_MAP_POSITIVE_Y', 34071);
    c.define('TEXTURE_CUBE_MAP_POSITIVE_Z', 34073);
    c.define('TEXTURE_MAG_FILTER', 10240);
    c.define('TEXTURE_MIN_FILTER', 10241);
    c.define('TEXTURE_WRAP_S', 10242);
    c.define('TEXTURE_WRAP_T', 10243);
    c.define('TRIANGLES', 4);
    c.define('TRIANGLE_FAN', 6);
    c.define('TRIANGLE_STRIP', 5);
    c.define('UNPACK_ALIGNMENT', 3317);
    c.define('UNPACK_COLORSPACE_CONVERSION_WEBGL', 37443);
    c.define('UNPACK_FLIP_Y_WEBGL', 37440);
    c.define('UNPACK_PREMULTIPLY_ALPHA_WEBGL', 37441);
    c.define('UNSIGNED_BYTE', 5121);
    c.define('UNSIGNED_INT', 5125);
    c.define('UNSIGNED_SHORT', 5123);
    c.define('UNSIGNED_SHORT_4_4_4_4', 32819);
    c.define('UNSIGNED_SHORT_5_5_5_1', 32820);
    c.define('UNSIGNED_SHORT_5_6_5', 33635);
    c.define('VALIDATE_STATUS', 35715);
    c.define('VENDOR', 7936);
    c.define('VERSION', 7938);
    c.define('VERTEX_ATTRIB_ARRAY_BUFFER_BINDING', 34975);
    c.define('VERTEX_ATTRIB_ARRAY_ENABLED', 34338);
    c.define('VERTEX_ATTRIB_ARRAY_NORMALIZED', 34922);
    c.define('VERTEX_ATTRIB_ARRAY_POINTER', 34373);
    c.define('VERTEX_ATTRIB_ARRAY_SIZE', 34339);
    c.define('VERTEX_ATTRIB_ARRAY_STRIDE', 34340);
    c.define('VERTEX_ATTRIB_ARRAY_TYPE', 34341);
    c.define('VERTEX_SHADER', 35633);
    c.define('VIEWPORT', 2978);
    c.define('ZERO', 0);

    /// GLBoost original constants
    c.define('POSITION', void 0, 'position');
    c.define('COLOR', void 0, 'color');
    c.define('NORMAL', void 0, 'normal');
    c.define('TEXCOORD', void 0, 'texcoord');
    c.define('TANGENT', void 0, 'tangent');
    c.define('JOINT', void 0, 'joint');
    c.define('WEIGHT', void 0, 'weight');
    c.define('BLENDTARGET1', void 0, 'shapetarget_1');
    c.define('BLENDTARGET2', void 0, 'shapetarget_2');
    c.define('BLENDTARGET3', void 0, 'shapetarget_3');
    c.define('BLENDTARGET4', void 0, 'shapetarget_4');
    c.define('BLENDTARGET5', void 0, 'shapetarget_5');
    c.define('BLENDTARGET6', void 0, 'shapetarget_6');
    c.define('BLENDTARGET7', void 0, 'shapetarget_7');
    c.define('BLENDTARGET8', void 0, 'shapetarget_8');
    c.define('BLENDTARGET9', void 0, 'shapetarget_9');
    c.define('BLENDTARGET10', void 0, 'shapetarget_10');
    c.define('INTERPOLATION_LINEAR');
    c.define('INTERPOLATION_STEP');
    c.define('INTERPOLATION_CUBICSPLINE');
    c.define('RADIAN', void 0, 'radian');
    c.define('DEGREE', void 0, 'degree');

    c.define('TEXTURE_PURPOSE_DIFFUSE', void 0, 'diffuse');
    c.define('TEXTURE_PURPOSE_NORMAL', void 0, 'normal');
    c.define('TEXTURE_PURPOSE_METALLIC_ROUGHNESS', void 0, 'metallic_roughness');
    c.define('TEXTURE_PURPOSE_OCCLUSION', void 0, 'occlusion');
    c.define('TEXTURE_PURPOSE_EMISSIVE', void 0, 'emissive');
    c.define('TEXTURE_PURPOSE_BRDF_LUT', void 0, 'brdf_lut');
    c.define('TEXTURE_PURPOSE_ENV_CUBE', void 0, 'env_cube');
    c.define('TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE', void 0, 'diffuse_ibl_env_cube');
    c.define('TEXTURE_PURPOSE_IBL_SPECULAR_ENV_CUBE', void 0, 'specular_ibl_env_cube');
    c.define('TEXTURE_PURPOSE_OTHERS', void 0, 'others');
    c.define('QUERY_TYPE_INSTANCE_NAME');
    c.define('QUERY_TYPE_USER_FLAVOR_NAME');
    c.define('QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR');
    c.define('QUERY_FORMAT_STRING_PARTIAL_MATCHING');
    c.define('QUERY_FORMAT_STRING_PERFECT_MATCHING');
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

    c.define('LIFECYCLE_FHASE_CREATE');
    c.define('LIFECYCLE_FHASE_LOAD');
    c.define('LIFECYCLE_FHASE_MOUNT');
    c.define('LIFECYCLE_FHASE_UPDATE_LOGIC');
    c.define('LIFECYCLE_FHASE_UPDATE_FOR_RENDERING');
    c.define('LIFECYCLE_FHASE_RENDER');
    c.define('LIFECYCLE_FHASE_DISCARD');

    c.define('LIFECYCLE_EVENT_CREATED');
    c.define('LIFECYCLE_EVENT_LOADED');
    c.define('LIFECYCLE_EVENT_MOUNTED');
    c.define('LIFECYCLE_EVENT_UPDATED_LOGIC');
    c.define('LIFECYCLE_EVENT_UPDATED_FOR_RENDERING');
    c.define('LIFECYCLE_EVENT_RENDERED');
    c.define('LIFECYCLE_EVENT_DISCARDED');

    c.define('LOG_GENERAL');
    c.define('LOG_SHADER_CODE');
    c.define('LOG_GLBOOST_OBJECT_LIFECYCLE');
    c.define('LOG_GL_RESOURCE_LIFECYCLE');
    c.define('LOG_LEVEL_ERROR', void 0, 'error');
    c.define('LOG_LEVEL_WARN', void 0, 'warn');
    c.define('LOG_LEVEL_LOG', void 0, 'log');
    c.define('LOG_LEVEL_INFO', void 0, 'info');
    c.define('LOG_LEVEL_DEBUG', void 0, 'debug');
    c.define('LOG_OMISSION_PROCESSING');

    c.define('LOG_TYPE_NUMERICAL', void 0, 'numerical');
    c.define('LOG_TYPE_AABB', void 0, 'AABB');
    c.define('LOG_TYPE_GL', void 0, 'GL');

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

