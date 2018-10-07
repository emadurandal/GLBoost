(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var global = (0, eval)('this');

  (function (global) {
    global.GLBoost = typeof global.GLBoost !== 'undefined' ? global.GLBoost : {};
    var GLBoost = global.GLBoost;
    if (typeof define === 'function' && define.amd) {
      define(function () {
        return GLBoost;
      });
    } else if ((typeof exports === 'undefined' ? 'undefined' : babelHelpers.typeof(exports)) === 'object') {
      module.exports = GLBoost;
      global.GLBoost = GLBoost;
    } else {
      global.GLBoost = GLBoost;
    }

    (function () {
      GLBoost.GLBOOST_CONSTANT_NAMES = [];
      GLBoost.GLBOOST_CONSTANT_VALUES = [];
      var c = {
        count: 0,
        __existedConstants: [],
        define: function define(constantName, glConstantValue, aliasName) {
          var _this = this;

          var value = null;

          if (glConstantValue !== void 0) {
            value = glConstantValue;
            this.__existedConstants.push(glConstantValue);
          } else {
            var checkUnique = function checkUnique() {
              var result = true;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = _this.__existedConstants[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var existValue = _step.value;

                  if (_this.count === existValue) {
                    result = false;
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return result;
            };

            for (; checkUnique() === false; this.count++) {}

            value = this.count;
          }

          GLBoost[constantName] = value;
          GLBoost.GLBOOST_CONSTANT_NAMES[value] = constantName;
          GLBoost.GLBOOST_CONSTANT_VALUES[value] = typeof aliasName !== 'undefined' ? aliasName : constantName;

          this.count++;
        }
      };

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
      c.define('LOG_GL_ERROR');
      c.define('LOG_OMISSION_PROCESSING');
    })();

    GLBoost.isThisGLVersion_2 = function (gl) {
      if (typeof WebGL2RenderingContext === 'undefined') {
        return false;
      }
      return gl instanceof WebGL2RenderingContext;
    };

    GLBoost.getNameOfGLBoostConstant = function (glboostConstant) {
      return GLBoost.GLBOOST_CONSTANT_NAMES[glboostConstant];
    };
    GLBoost.getValueOfGLBoostConstant = function (glboostConstant) {
      return GLBoost.GLBOOST_CONSTANT_VALUES[glboostConstant];
    };
  })(global);

  var GLBoost$1 = global.GLBoost;

  var GLExtensionsManager = function () {
    function GLExtensionsManager(glContext) {
      babelHelpers.classCallCheck(this, GLExtensionsManager);

      var gl = glContext.gl;

      if (GLBoost$1.VALUE_WEBGL_ONE_USE_EXTENSIONS) {
        this._extVAO = gl.getExtension('OES_vertex_array_object');

        this._extDBs = gl.getExtension('WEBGL_draw_buffers');

        this._extTFA = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic');

        this._extEIUI = gl.getExtension('OES_element_index_uint');

        this._extDepthTex = gl.getExtension('WEBGL_depth_texture');

        this._extStdDerivatives = gl.getExtension("OES_standard_derivatives");

        this._extTFL = gl.getExtension("OES_texture_float_linear");

        this._extTexLod = gl.getExtension("EXT_shader_texture_lod");
      }

      GLExtensionsManager._instances[glContext.belongingCanvasId] = this;

      this._glContext = glContext;
    }

    babelHelpers.createClass(GLExtensionsManager, [{
      key: 'createVertexArray',
      value: function createVertexArray(gl) {
        if (GLBoost$1.isThisGLVersion_2(gl)) {
          return gl.createVertexArray();
        } else if (this._extVAO) {
          return this._extVAO.createVertexArrayOES();
        } else {
          return null;
        }

        this._glContext.checkGLError();
      }
    }, {
      key: 'bindVertexArray',
      value: function bindVertexArray(gl, vao) {
        if (GLBoost$1.isThisGLVersion_2(gl)) {
          gl.bindVertexArray(vao);
          return true;
        } else if (this._extVAO) {
          this._extVAO.bindVertexArrayOES(vao);
          return true;
        } else {
          return false;
        }

        this._glContext.checkGLError();
      }
    }, {
      key: 'drawBuffers',
      value: function drawBuffers(gl, buffers) {
        var buffer = buffers;
        if (GLBoost$1.isThisGLVersion_2(gl)) {
          gl.drawBuffers(buffers);
          buffer = buffer[0];
        } else if (this._extDBs) {
          this.extDBs.drawBuffersWEBGL(buffers);
          buffer = buffer[0];
        }

        if (buffer === gl.NONE) {
          gl.colorMask(false, false, false, false);
        } else {
          gl.colorMask(true, true, true, true);
        }

        this._glContext.checkGLError();
      }
    }, {
      key: 'readBuffer',
      value: function readBuffer(gl, buffers) {
        var buffer = buffers;
        if (GLBoost$1.isThisGLVersion_2(gl)) {
          buffer = buffer[0];
        } else if (this._extDBs) {
          buffer = buffer[0];
        }

        gl.readBuffer(buffer);

        this._glContext.checkGLError();
      }
    }, {
      key: 'colorAttachiment',
      value: function colorAttachiment(gl, index) {
        return this._extDBs ? this._extDBs['COLOR_ATTACHMENT' + index + '_WEBGL'] : gl['COLOR_ATTACHMENT' + index];
      }
    }, {
      key: 'elementIndexBitSizeGLConstant',
      value: function elementIndexBitSizeGLConstant(gl) {
        if (GLBoost$1.isThisGLVersion_2(gl) || this._extEIUI) {
          return gl.UNSIGNED_INT;
        } else {
          return gl.UNSIGNED_SHORT;
        }
      }
    }, {
      key: 'elementIndexByteSizeNumber',
      value: function elementIndexByteSizeNumber(gl) {
        if (GLBoost$1.isThisGLVersion_2(gl) || this._extEIUI) {
          return 4;
        } else {
          return 2;
        }
      }
    }, {
      key: 'createUintArrayForElementIndex',
      value: function createUintArrayForElementIndex(gl, array) {
        if (GLBoost$1.isThisGLVersion_2(gl) || this._extEIUI) {
          return new Uint32Array(array);
        } else {
          return new Uint16Array(array);
        }
      }
    }, {
      key: 'extVAO',
      get: function get() {
        return this._extVAO;
      }
    }, {
      key: 'extDBs',
      get: function get() {
        return this._extDBs;
      }
    }, {
      key: 'extTFA',
      get: function get() {
        return this._extTFA;
      }
    }, {
      key: 'extDepthTex',
      get: function get() {
        return this._extDepthTex;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance(glContext) {
        if (GLExtensionsManager._instances[glContext.belongingCanvasId]) {
          return GLExtensionsManager._instances[glContext.belongingCanvasId];
        }
        return new GLExtensionsManager(glContext);
      }
    }]);
    return GLExtensionsManager;
  }();

  GLExtensionsManager._instances = new Object();

  GLBoost$1['GLExtensionsManager'] = GLExtensionsManager;

  var MiscUtil = function () {
    function MiscUtil() {
      babelHelpers.classCallCheck(this, MiscUtil);
    }

    babelHelpers.createClass(MiscUtil, null, [{
      key: 'getTheValueOrAlternative',
      value: function getTheValueOrAlternative(value, alternativeIfTheValueIsNullOrUndefined) {
        if (typeof value !== 'undefined' && value != null) {
          return value;
        } else {
          return alternativeIfTheValueIsNullOrUndefined;
        }
      }
    }, {
      key: 'isJavaScriptObjectType',
      value: function isJavaScriptObjectType(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
      }
    }, {
      key: 'consoleLog',
      value: function consoleLog(logType, text) {
        if (GLBoost$1.VALUE_CONSOLE_OUT_FOR_DEBUGGING && GLBoost$1.valueOfGLBoostConstants[logType]) {
          console.log(text);
        }
      }
    }]);
    return MiscUtil;
  }();


  GLBoost$1['MiscUtil'] = MiscUtil;

  var GLContextImpl = function () {
    function GLContextImpl(canvas, parent, initParameter) {
      babelHelpers.classCallCheck(this, GLContextImpl);

      if (this.constructor === GLContextImpl) {
        throw new TypeError("Cannot construct GLContextImpl instances directly");
      }

      if (canvas === void 0) {
        throw new Error("Failed to create WebGL Context due to no canvas object.");
      }

      this._canvas = canvas;
    }

    babelHelpers.createClass(GLContextImpl, [{
      key: "init",
      value: function init(glVersionString, ContextType) {
        var initParameter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { antialias: true, premultipliedAlpha: true };
        var gl = arguments[3];


        if (gl) {
          this._gl = gl;
        } else {

          var _gl = this._canvas.getContext(glVersionString, initParameter);

          if (!_gl) {
            _gl = this._canvas.getContext('experimental-' + glVersionString);
            if (!_gl) {
              throw new Error("This platform doesn't support WebGL.");
            }
          }

          if (!_gl instanceof ContextType) {
            throw new Error("Unexpected rendering context.");
          }

          this._gl = _gl;
        }
      }
    }, {
      key: "gl",
      get: function get() {
        return this._gl;
      },
      set: function set(gl) {
        this._gl = gl;
      }
    }, {
      key: "canvas",
      get: function get() {
        return this._canvas;
      }
    }]);
    return GLContextImpl;
  }();

  var GLContextWebGL1Impl = function (_GLContextImpl) {
    babelHelpers.inherits(GLContextWebGL1Impl, _GLContextImpl);

    function GLContextWebGL1Impl(canvas, parent, initParameter, gl) {
      babelHelpers.classCallCheck(this, GLContextWebGL1Impl);

      var _this = babelHelpers.possibleConstructorReturn(this, (GLContextWebGL1Impl.__proto__ || Object.getPrototypeOf(GLContextWebGL1Impl)).call(this, canvas, parent, initParameter));

      if (gl) {
        babelHelpers.get(GLContextWebGL1Impl.prototype.__proto__ || Object.getPrototypeOf(GLContextWebGL1Impl.prototype), 'init', _this).call(_this, 'webgl', null, initParameter, gl);
      } else {
        babelHelpers.get(GLContextWebGL1Impl.prototype.__proto__ || Object.getPrototypeOf(GLContextWebGL1Impl.prototype), 'init', _this).call(_this, 'webgl', WebGLRenderingContext, initParameter, gl);
      }
      return _this;
    }

    return GLContextWebGL1Impl;
  }(GLContextImpl);

  var GLContextWebGL2Impl = function (_GLContextImpl) {
    babelHelpers.inherits(GLContextWebGL2Impl, _GLContextImpl);

    function GLContextWebGL2Impl(canvas, parent, initParameter, gl) {
      babelHelpers.classCallCheck(this, GLContextWebGL2Impl);

      var _this = babelHelpers.possibleConstructorReturn(this, (GLContextWebGL2Impl.__proto__ || Object.getPrototypeOf(GLContextWebGL2Impl)).call(this, canvas, parent, initParameter));

      babelHelpers.get(GLContextWebGL2Impl.prototype.__proto__ || Object.getPrototypeOf(GLContextWebGL2Impl.prototype), 'init', _this).call(_this, 'webgl2', WebGL2RenderingContext, initParameter, gl);

      return _this;
    }

    return GLContextWebGL2Impl;
  }(GLContextImpl);

  var singleton = Symbol();

  var L_GLBoostMonitor = function () {
    function L_GLBoostMonitor(enforcer) {
      babelHelpers.classCallCheck(this, L_GLBoostMonitor);

      if (enforcer !== L_GLBoostMonitor._singletonEnforcer || !(this instanceof L_GLBoostMonitor)) {
        throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
      }

      this._glBoostObjects = {};
      this._glResources = [];
      L_GLBoostMonitor._singletonEnforcer = Symbol();
    }

    babelHelpers.createClass(L_GLBoostMonitor, [{
      key: 'registerGLBoostObject',
      value: function registerGLBoostObject(glBoostObject) {
        this._glBoostObjects[glBoostObject.instanceName] = glBoostObject;
        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, 'GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was created.');
      }
    }, {
      key: 'deregisterGLBoostObject',
      value: function deregisterGLBoostObject(glBoostObject) {
        delete this._glBoostObjects[glBoostObject.instanceName];
        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, 'GLBoost Resource: ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ') was ready for discard.');
      }
    }, {
      key: 'getGLBoostObjects',
      value: function getGLBoostObjects(partOfGlBoostObjectInstanceName) {
        var glBoostObjects = [];
        for (var instanceName in this._glBoostObjects) {
          if (instanceName.indexOf(partOfGlBoostObjectInstanceName) > 0) {
            glBoostObjects.push(this._glBoostObjects[instanceName]);
          }
        }

        return glBoostObjects;
      }
    }, {
      key: 'getGLBoostObject',
      value: function getGLBoostObject(glBoostObjectInstanceName) {
        for (var instanceName in this._glBoostObjects) {
          if (instanceName === glBoostObjectInstanceName) {
            return this._glBoostObjects[instanceName];
          }
        }
        return null;
      }
    }, {
      key: 'getGLBoostObjectByUserFlavorName',
      value: function getGLBoostObjectByUserFlavorName(glBoostObjectUserFlavorName) {
        for (var instanceName in this._glBoostObjects) {
          if (this._glBoostObjects[instanceName].userFlavorName === glBoostObjectUserFlavorName) {
            return this._glBoostObjects[instanceName];
          }
        }
        return null;
      }
    }, {
      key: 'getGLBoostObjectsByUserFlavorName',
      value: function getGLBoostObjectsByUserFlavorName(glBoostObjectUserFlavorName) {
        var results = [];
        for (var instanceName in this._glBoostObjects) {
          if (this._glBoostObjects[instanceName].userFlavorName === glBoostObjectUserFlavorName) {
            results.push(this._glBoostObjects[instanceName]);
          }
        }
        return results;
      }
    }, {
      key: 'getGLBoostObjectWhichHasThisObjectId',
      value: function getGLBoostObjectWhichHasThisObjectId(objectId) {
        for (var instanceName in this._glBoostObjects) {
          if (this._glBoostObjects[instanceName].objectIndex === objectId) {
            return this._glBoostObjects[instanceName];
          }
        }

        return null;
      }
    }, {
      key: 'printGLBoostObjects',
      value: function printGLBoostObjects() {
        var objects = this._glBoostObjects;
        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [begin] ==========');
        for (var key in objects) {
          if (objects.hasOwnProperty(key)) {
            MiscUtil.consoleLog(key + '(' + objects[key].belongingCanvasId + ')');
          }
        }
        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [end] ==========');
      }
    }, {
      key: 'printGLBoostObjectsOrderByName',
      value: function printGLBoostObjectsOrderByName() {
        var objects = this._glBoostObjects;
        var objectArray = [];
        for (var key in objects) {
          if (objects.hasOwnProperty(key)) {
            objectArray.push(objects[key]);
          }
        }
        objectArray.sort(function (a, b) {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [begin] ==========');
        objectArray.forEach(function (object) {
          MiscUtil.consoleLog(object.toString() + ' (' + object.belongingCanvasId + ')');
        });
        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Object Lists [end] ==========');
      }
    }, {
      key: 'registerWebGLResource',
      value: function registerWebGLResource(glBoostObject, glResource) {
        var glResourceName = glResource.constructor.name;
        this._glResources.push([glBoostObject, glResource]);
        MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, 'WebGL Resource: ' + glResourceName + ' was created by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
      }
    }, {
      key: 'deregisterWebGLResource',
      value: function deregisterWebGLResource(glBoostObject, glResource) {
        var _this = this;

        var glResourceName = glResource.constructor.name;
        this._glResources.forEach(function (glResource, i) {
          if (glResource[0] === glBoostObject && glResource[1].constructor.name === glResourceName) {
            _this._glResources.splice(i, 1);
          }
        });
        MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, 'WebGL Resource: ' + glResourceName + ' was deleted by ' + glBoostObject.toString() + ' (' + glBoostObject.belongingCanvasId + ').');
      }
    }, {
      key: 'getWebGLResources',
      value: function getWebGLResources(webglResourceName) {
        var webglResources = this._glResources.filter(function (glResourceArray) {
          if (glResourceArray[1].constructor.name === webglResourceName) {
            return true;
          } else {
            return false;
          }
        });

        return webglResources;
      }
    }, {
      key: 'printWebGLResources',
      value: function printWebGLResources() {
        var glResources = this._glResources;
        glResources.sort(function (a, b) {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        });
        MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, '========== WebGL Resource Lists [begin] ==========');
        glResources.forEach(function (glResource, i) {
          MiscUtil.consoleLog(i + 1 + ': ' + glResource[0].toString() + ' (' + glResource[0].belongingCanvasId + ') created ' + glResource[1]);
        });
        MiscUtil.consoleLog(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, '========== WebGL Resource Lists [end] ==========');
      }
    }, {
      key: 'printHierarchy',
      value: function printHierarchy() {
        var glBoostObjects = this._glBoostObjects;
        var scenes = [];
        for (var key in glBoostObjects) {
          if (glBoostObjects.hasOwnProperty(key)) {
            if (key.match(/Scene/)) {
              scenes.push(glBoostObjects[key]);
            }
          }
        }

        function putWhiteSpace(level) {
          var str = '';
          for (var i = 0; i < level; i++) {
            str += '  ';
          }
          return str;
        }

        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Objects Hierarchy of Scenes [begin] ==========');
        scenes.forEach(function (scene) {
          var outputText = function searchRecursively(element, level) {
            var outputText = '';
            outputText += putWhiteSpace(level) + element.toString() + ' (' + element.belongingCanvasId + ')\n';
            if (typeof element.getChildren === 'undefined') {
              return outputText;
            }
            var children = element.getChildren();
            children.forEach(function (child) {
              outputText += searchRecursively(child, level + 1);
            });
            return outputText += '\n';
          }(scene, 0);

          outputText = outputText.replace(/\n+/g, '\n');
          MiscUtil.consoleLog(outputText);
        });
        MiscUtil.consoleLog(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, '========== GLBoost Objects Hierarchy of Scenes [end] ==========');
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton]) {
          this[singleton] = new L_GLBoostMonitor(L_GLBoostMonitor._singletonEnforcer);
        }
        return this[singleton];
      }
    }]);
    return L_GLBoostMonitor;
  }();


  GLBoost$1['L_GLBoostMonitor'] = L_GLBoostMonitor;

  var GLContext = function () {
    function GLContext(canvas, initParameter, gl, width, height) {
      babelHelpers.classCallCheck(this, GLContext);


      if (typeof gl !== 'undefined' && gl !== null) {
        this.impl = new GLContextWebGL1Impl(canvas, initParameter, this, gl);
        this._canvasWidth = width;
        this._canvasHeight = height;
        GLContext._instances['nocanvas'] = this;
      } else {
        if (GLContext._instances[canvas.id] instanceof GLContext) {
          return GLContext._instances[canvas.id];
        }

        if (GLBoost$1.VALUE_TARGET_WEBGL_VERSION === 1) {
          this.impl = new GLContextWebGL1Impl(canvas, this, initParameter);
        } else if (GLBoost$1.VALUE_TARGET_WEBGL_VERSION === 2) {
          this.impl = new GLContextWebGL2Impl(canvas, this, initParameter);
        }

        GLContext._instances[canvas.id] = this;
        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;
      }

      this._monitor = L_GLBoostMonitor.getInstance();
      this._glslProgramsLatestUsageCount = 0;
    }

    babelHelpers.createClass(GLContext, [{
      key: 'checkGLError',
      value: function checkGLError() {
        if (GLBoost$1.VALUE_CONSOLE_OUT_FOR_DEBUGGING === false) {
          return;
        }
        if (GLBoost$1.valueOfGLBoostConstants[GLBoost$1.LOG_GL_ERROR] === false) {
          return;
        }

        var gl = this.impl.gl;
        var errorCode = gl.getError();
        if (errorCode !== 0) {
          var errorTypes = ['INVALID_ENUM', 'INVALID_VALUE', 'INVALID_OPERATION', 'INVALID_FRAMEBUFFER_OPERATION', 'OUT_OF_MEMORY', 'CONTEXT_LOST_WEBGL'];
          var errorMessages = ['An unacceptable value has been specified for an enumerated argument. The command is ignored and the error flag is set.', 'A numeric argument is out of range. The command is ignored and the error flag is set.', 'The specified command is not allowed for the current state. The command is ignored and the error flag is set.', 'The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.', 'Not enough memory is left to execute the command.', 'If the WebGL context is lost, this error is returned on the first call to getError. Afterwards and until the context has been restored, it returns gl.NO_ERROR.'];

          errorTypes.forEach(function (errorType, i) {
            if (gl[errorType] === errorCode) {
              MiscUtil.consoleLog(GLBoost$1.LOG_GL_ERROR, 'WebGL Error: gl.' + errorCode + '\n' + 'Meaning:' + errorMessages[i]);
            }
          });
        }
      }
    }, {
      key: 'createVertexArray',
      value: function createVertexArray(glBoostObject) {
        var gl = this.gl;
        var glem = GLExtensionsManager.getInstance(this);
        var glResource = glem.createVertexArray(gl);
        if (glResource) {
          this._monitor.registerWebGLResource(glBoostObject, glResource);
        }

        this.checkGLError();

        return glResource;
      }
    }, {
      key: 'createBuffer',
      value: function createBuffer(glBoostObject) {
        var glResource = this.gl.createBuffer();
        this._monitor.registerWebGLResource(glBoostObject, glResource);

        this.checkGLError();

        return glResource;
      }
    }, {
      key: 'createFramebuffer',
      value: function createFramebuffer(glBoostObject) {
        var glResource = this.gl.createFramebuffer();
        this._monitor.registerWebGLResource(glBoostObject, glResource);

        this.checkGLError();

        return glResource;
      }
    }, {
      key: 'deleteFramebuffer',
      value: function deleteFramebuffer(glBoostObject, frameBuffer) {
        this._monitor.deregisterWebGLResource(glBoostObject, frameBuffer);
        this.gl.deleteFramebuffer(frameBuffer);

        this.checkGLError();

        frameBuffer = null;
      }
    }, {
      key: 'createRenderbuffer',
      value: function createRenderbuffer(glBoostObject) {
        var glResource = this.gl.createRenderbuffer();
        this._monitor.registerWebGLResource(glBoostObject, glResource);

        this.checkGLError();

        return glResource;
      }
    }, {
      key: 'deleteRenderbuffer',
      value: function deleteRenderbuffer(glBoostObject, renderBuffer) {
        this._monitor.deregisterWebGLResource(glBoostObject, renderBuffer);
        this.gl.deleteRenderbuffer(renderBuffer);

        this.checkGLError();

        renderBuffer = null;
      }
    }, {
      key: 'createShader',
      value: function createShader(glBoostObject, shaderType) {
        var glResource = this.gl.createShader(shaderType);
        this._monitor.registerWebGLResource(glBoostObject, glResource);

        this.checkGLError();

        return glResource;
      }
    }, {
      key: 'deleteShader',
      value: function deleteShader(glBoostObject, shader) {
        this._monitor.deregisterWebGLResource(glBoostObject, shader);
        this.gl.deleteShader(shader);

        this.checkGLError();

        shader = null;
      }
    }, {
      key: 'createProgram',
      value: function createProgram(glBoostObject) {
        var glResource = this.gl.createProgram();
        this._monitor.registerWebGLResource(glBoostObject, glResource);

        this.checkGLError();

        return glResource;
      }
    }, {
      key: 'useProgram',
      value: function useProgram(program) {
        this.gl.useProgram(program);
        this._currentProgramInuse = program;

        this.checkGLError();
        this._glslProgramsLatestUsageCount++;
      }
    }, {
      key: 'deleteProgram',
      value: function deleteProgram(glBoostObject, program) {
        this._monitor.deregisterWebGLResource(glBoostObject, program);
        this.gl.deleteProgram(program);

        this.checkGLError();
      }
    }, {
      key: 'deleteAllPrograms',
      value: function deleteAllPrograms() {
        var programObjs = this._monitor.getWebGLResources('WebGLProgram');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = programObjs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var programObj = _step.value;

            this.deleteProgram(programObj[0], programObj[1]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'getUniformLocation',
      value: function getUniformLocation(glslProgram, uniformVariableName) {
        var uniformLocation = this.gl.getUniformLocation(glslProgram, uniformVariableName);
        this.checkGLError();
        if (uniformLocation) {
          uniformLocation.glslProgram = glslProgram;
          uniformLocation.glslProgramUsageCountWhenLastSet = -1;
        }

        return uniformLocation;
      }
    }, {
      key: '_setUniformValues',
      value: function _setUniformValues(uniformFuncStr, args, forceUpdate) {
        var uniformLocation = args[0];
        if (!uniformLocation) {
          MiscUtil.consoleLog(GLBoost$1.LOG_OMISSION_PROCESSING, 'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation is falsy (undefined or something)');

          return;
        }

        if (this._currentProgramInuse.createdAt !== uniformLocation.glslProgram.createdAt) {
          console.error('missmatch!');
          return;
        }

        if (uniformLocation.glslProgramUsageCountWhenLastSet < this._glslProgramsLatestUsageCount) {
          this.gl[uniformFuncStr].apply(this.gl, args);
          args[0].setValue = args;
          this.checkGLError();

          return;
        }

        if (forceUpdate) {
          this.gl[uniformFuncStr].apply(this.gl, args);
          this.checkGLError();
        } else {
          MiscUtil.consoleLog(GLBoost$1.LOG_OMISSION_PROCESSING, 'LOG_OMISSION_PROCESSING: gl.uniformXXX call has been omitted since the uniformLocation.glslProgram is not in use.');
        }
      }
    }, {
      key: 'uniformMatrix4fv',
      value: function uniformMatrix4fv(uniformLocation, toTranspose, matrix44, forceUpdate) {
        this._setUniformValues('uniformMatrix4fv', [uniformLocation, toTranspose, matrix44], forceUpdate);
      }
    }, {
      key: 'uniform4f',
      value: function uniform4f(uniformLocation, x, y, z, w, forceUpdate) {
        this._setUniformValues('uniform4f', [uniformLocation, x, y, z, w], forceUpdate);
      }
    }, {
      key: 'uniform3f',
      value: function uniform3f(uniformLocation, x, y, z, forceUpdate) {
        this._setUniformValues('uniform3f', [uniformLocation, x, y, z], forceUpdate);
      }
    }, {
      key: 'uniform2f',
      value: function uniform2f(uniformLocation, x, y, forceUpdate) {
        this._setUniformValues('uniform2f', [uniformLocation, x, y], forceUpdate);
      }
    }, {
      key: 'uniform1f',
      value: function uniform1f(uniformLocation, x, forceUpdate) {
        this._setUniformValues('uniform1f', [uniformLocation, x], forceUpdate);
      }
    }, {
      key: 'uniform4i',
      value: function uniform4i(uniformLocation, x, y, z, w, forceUpdate) {
        this._setUniformValues('uniform4i', [uniformLocation, x, y, z, w], forceUpdate);
      }
    }, {
      key: 'uniform3i',
      value: function uniform3i(uniformLocation, x, y, z, forceUpdate) {
        this._setUniformValues('uniform3i', [uniformLocation, x, y, z], forceUpdate);
      }
    }, {
      key: 'uniform2i',
      value: function uniform2i(uniformLocation, x, y, forceUpdate) {
        this._setUniformValues('uniform2i', [uniformLocation, x, y], forceUpdate);
      }
    }, {
      key: 'uniform1i',
      value: function uniform1i(uniformLocation, x, forceUpdate) {
        this._setUniformValues('uniform1i', [uniformLocation, x], forceUpdate);
      }
    }, {
      key: 'createTexture',
      value: function createTexture(glBoostObject) {
        var glResource = this.gl.createTexture();
        this._monitor.registerWebGLResource(glBoostObject, glResource);

        this.checkGLError();

        return glResource;
      }
    }, {
      key: 'deleteTexture',
      value: function deleteTexture(glBoostObject, texture) {
        this._monitor.deregisterWebGLResource(glBoostObject, texture);
        this.gl.deleteTexture(texture);

        this.checkGLError();

        texture = null;
      }
    }, {
      key: 'gl',
      get: function get() {
        return this.impl.gl;
      },
      set: function set(gl) {
        this.impl.gl = gl;
      }
    }, {
      key: 'belongingCanvasId',
      get: function get() {
        if (this.impl.canvas) {
          return this.impl.canvas.id;
        } else {
          return 'nocanvas';
        }
      }
    }, {
      key: 'canvas',
      get: function get() {
        return this.impl.canvas;
      }
    }, {
      key: 'canvasWidth',
      get: function get() {
        return this._canvasWidth;
      },
      set: function set(width) {
        if (this.impl.canvas) {
          this.impl.canvas.width = width;
        }
        this._canvasWidth = width;
      }
    }, {
      key: 'canvasHeight',
      get: function get() {
        return this._canvasHeight;
      },
      set: function set(height) {
        if (this.impl.canvas) {
          this.impl.canvas.height = height;
        }
        this._canvasHeight = height;
      }
    }, {
      key: 'glslProgramsLatestUsageCount',
      get: function get() {
        return this._glslProgramsLatestUsageCount;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance(canvas, initParameter, gl, width, height) {
        if (typeof canvas === 'string') {
          canvas = window.document.querySelector(canvas);
        }
        return new GLContext(canvas, initParameter, gl, width, height);
      }
    }]);
    return GLContext;
  }();

  GLContext._instances = new Object();

  var GLBoostSystem = function GLBoostSystem(canvas, initParameter, gl, width, height, glBoostContext) {
    babelHelpers.classCallCheck(this, GLBoostSystem);

    if (gl) {
      this._glContext = GLContext.getInstance(null, initParameter, gl, width, height);
    } else {
      this._glContext = GLContext.getInstance(canvas, initParameter);
    }

    this._glBoostContext = glBoostContext;

    this._globalStatesUsage = GLBoost$1.GLOBAL_STATES_USAGE_INCLUSIVE;

    this._defaultGlobalStates = [3042, 2929];

    this._currentGlobalStates = null;

    this._glBoostMonitor = L_GLBoostMonitor.getInstance();

    if (typeof effekseer !== "undefined") {
      effekseer.init(this._glContext.gl);
    }
  };

  var Entity = function Entity(entityUID, isAlive) {
    babelHelpers.classCallCheck(this, Entity);

    this.__entity_uid = entityUID;
    this.__isAlive = isAlive;
  };

  var singleton$1 = Symbol();

  var EntityRepository = function () {
    function EntityRepository(enforcer) {
      babelHelpers.classCallCheck(this, EntityRepository);

      if (enforcer !== EntityRepository.__singletonEnforcer || !(this instanceof EntityRepository)) {
        throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
      }

      EntityRepository.__singletonEnforcer = Symbol();

      this.__entity_uid_count = 0;
      this.__entities = new Map();
      this.__lifeStatusOfEntities = new Map();
    }

    babelHelpers.createClass(EntityRepository, [{
      key: 'createEntity',
      value: function createEntity() {
        this.__entity_uid_count++;

        var alive = new Boolean(true);
        var entity = new Entity(this.__entity_uid_count, alive);

        this.__entities.set(this.__entity_uid_count, entity);
        this.__lifeStatusOfEntities.set(this.__entity_uid_count, alive);

        return entity;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton$1]) {
          this[singleton$1] = new EntityRepository(EntityRepository.__singletonEnforcer);
        }
        return this[singleton$1];
      }
    }]);
    return EntityRepository;
  }();

  var GLBoostObject = function () {
    function GLBoostObject(glBoostSystem) {
      var toRegister = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      babelHelpers.classCallCheck(this, GLBoostObject);

      if (this.constructor === GLBoostObject) {
        throw new TypeError('Cannot construct GLBoostObject instances directly.');
      }
      this._entity_uid = 0;
      this._setName();

      var entityRepository = EntityRepository.getInstance();


      this._glBoostSystem = glBoostSystem;
      this._glContext = glBoostSystem._glContext;
      this._glBoostMonitor = glBoostSystem._glBoostMonitor;
      this._toRegister = toRegister;
      if (this._toRegister) {
        this._glBoostMonitor.registerGLBoostObject(this);
      }
      this._userFlavorName = '';
      this._readyForDiscard = false;

      this._classUniqueNumber = 0;
      for (var i = 0; i < this.className.length; i++) {
        this._classUniqueNumber += this.className.charCodeAt(i);
      }

      this.setupExistIndexAndArray();
    }

    babelHelpers.createClass(GLBoostObject, [{
      key: 'setupExistIndexAndArray',
      value: function setupExistIndexAndArray() {
        var _this = this;

        this._objectIndex = -1;

        var seekSpaceOfArrayAndSetIndexThere = function seekSpaceOfArrayAndSetIndexThere(typeName) {
          var array = GLBoostObject['_' + typeName + 'ExistArray'];
          for (var i = 0; i < array.length; i++) {
            if (array[i] === void 0) {
              _this['_' + typeName + 'Index'] = i;
              array[i] = true;
              return;
            }
          }
          _this['_' + typeName + 'Index'] = array.length;
          array[array.length] = true;
        };

        if (this.className.indexOf('Mesh') !== -1) {
          seekSpaceOfArrayAndSetIndexThere('object');
        }
      }
    }, {
      key: 'tearDownExistIndexAndArray',
      value: function tearDownExistIndexAndArray() {
        var _this2 = this;

        var deleteIndex = function deleteIndex(typeName) {
          var array = GLBoostObject['_' + typeName + 'ExistArray'];
          delete array[_this2['_' + typeName + 'Index']];
          _this2['_' + typeName + 'Index'] = -1;
        };

        if (this.className.indexOf('Mesh') !== -1) {
          deleteIndex('object');
          if (this.className.indexOf('SkeltalMesh') !== -1) {
            deleteIndex('jointSet');
          }
        } else if (this.className.indexOf('Light') !== -1) {
          deleteIndex('light');
        } else if (this.className.indexOf('Material') !== -1) {
          deleteIndex('material');
        }
      }
    }, {
      key: '_setName',
      value: function _setName() {
        if (typeof GLBoostObject.classInfoDic[this.constructor.name] === 'undefined') {
          GLBoostObject.classInfoDic[this.constructor.name] = {};
        }
        GLBoostObject.classInfoDic[this.constructor.name]._instanceCount = typeof GLBoostObject.classInfoDic[this.constructor.name]._instanceCount === 'undefined' ? 0 : GLBoostObject.classInfoDic[this.constructor.name]._instanceCount + 1;
        this._instanceName = this.constructor.name + '_' + GLBoostObject.classInfoDic[this.constructor.name]._instanceCount;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this._instanceName;
      }
    }, {
      key: 'tryToSetUserFlavorNameUniquely',
      value: function tryToSetUserFlavorNameUniquely(name) {
        if (this._glBoostMonitor.getGLBoostObjectByUserFlavorName(name) != null) {
          return false;
        } else {
          this._userFlavorName = name;
          return true;
        }
      }
    }, {
      key: 'readyForDiscard',
      value: function readyForDiscard() {
        if (this._toRegister) {
          this._glBoostMonitor.deregisterGLBoostObject(this);
        }

        this.tearDownExistIndexAndArray();

        this._readyForDiscard = true;
      }
    }, {
      key: '_copy',
      value: function _copy(instance) {
        instance._userFlavorName = this._userFlavorName;
      }
    }, {
      key: 'classUniqueNumber',
      get: function get() {
        return this._classUniqueNumber;
      }
    }, {
      key: 'className',
      get: function get() {
        return this.constructor.name;
      }
    }, {
      key: 'instanceName',
      get: function get() {
        return this._instanceName;
      }
    }, {
      key: 'belongingCanvasId',
      get: function get() {
        return this._glBoostSystem.belongingCanvasId;
      }
    }, {
      key: 'userFlavorName',
      set: function set(name) {
        this._userFlavorName = name;
      },
      get: function get() {
        return this._userFlavorName;
      }
    }, {
      key: 'instanceNameWithUserFlavor',
      get: function get() {
        return this._instanceName + '__' + this._userFlavorName;
      }
    }, {
      key: 'isReadyForDiscard',
      get: function get() {
        return this._readyForDiscard;
      }
    }, {
      key: 'objectIndex',
      get: function get() {
        return this._objectIndex;
      }
    }, {
      key: 'entityUID',
      get: function get() {
        return this._entity_uid;
      }
    }]);
    return GLBoostObject;
  }();


  GLBoostObject.classInfoDic = {};
  GLBoostObject._objectExistArray = [];
  GLBoostObject.__entities = [];

  GLBoost$1['GLBoostObject'] = GLBoostObject;

  var Vector2 = function () {
    function Vector2(x, y) {
      babelHelpers.classCallCheck(this, Vector2);

      if (ArrayBuffer.isView(x)) {
        this.v = x;
        return;
      } else {
        this.v = new Float32Array(2);
      }

      this.x = x;
      this.y = y;
    }

    babelHelpers.createClass(Vector2, [{
      key: "clone",
      value: function clone() {
        return new Vector2(this.x, this.y);
      }
    }, {
      key: "multiply",
      value: function multiply(val) {
        this.x *= val;
        this.y *= val;

        return this;
      }
    }, {
      key: "className",
      get: function get() {
        return this.constructor.name;
      }
    }, {
      key: "x",
      get: function get() {
        return this.v[0];
      },
      set: function set(x) {
        this.v[0] = x;
      }
    }, {
      key: "y",
      get: function get() {
        return this.v[1];
      },
      set: function set(y) {
        this.v[1] = y;
      }
    }, {
      key: "raw",
      get: function get() {
        return this.v;
      }
    }], [{
      key: "multiply",
      value: function multiply(vec2, val) {
        return new Vector2(vec2.x * val, vec2.y * val);
      }
    }]);
    return Vector2;
  }();


  GLBoost$1["Vector2"] = Vector2;

  var MathUtil = function () {
    function MathUtil() {
      babelHelpers.classCallCheck(this, MathUtil);
    }

    babelHelpers.createClass(MathUtil, null, [{
      key: "radianToDegree",
      value: function radianToDegree(rad) {
        return rad * 180 / Math.PI;
      }
    }, {
      key: "degreeToRadian",
      value: function degreeToRadian(deg) {
        return deg * Math.PI / 180;
      }
    }]);
    return MathUtil;
  }();


  GLBoost$1["MathUtil"] = MathUtil;

  var IsUtil = {
    not: {},
    all: {},
    any: {},

    _not: function _not(fn) {
      return function () {
        return !fn.apply(null, [].concat(Array.prototype.slice.call(arguments)));
      };
    },
    _all: function _all(fn) {
      return function () {
        if (Array.isArray(arguments[0])) {
          return arguments[0].every(fn);
        }
        return [].concat(Array.prototype.slice.call(arguments)).every(fn);
      };
    },
    _any: function _any(fn) {
      return function () {
        if (Array.isArray(arguments[0])) {
          return arguments[0].some(fn);
        }
        return [].concat(Array.prototype.slice.call(arguments)).some(fn);
      };
    },
    defined: function defined(val) {
      return val !== void 0;
    },
    undefined: function undefined(val) {
      return val === void 0;
    },
    null: function _null(val) {
      return val === null;
    },
    exist: function exist(val) {
      return val != null;
    },
    function: function _function(val) {
      return typeof val === 'function';
    }
  };

  var _loop = function _loop(fn) {
    if (IsUtil.hasOwnProperty(fn)) {
      var interfaces = ['not', 'all', 'any'];
      if (fn.indexOf('_') === -1 && !interfaces.includes(fn)) {
        interfaces.forEach(function (itf) {
          var op = '_' + itf;
          IsUtil[itf][fn] = IsUtil[op](IsUtil[fn]);
        });
      }
    }
  };

  for (var fn in IsUtil) {
    _loop(fn);
  }

  var Vector3 = function () {
    function Vector3(x, y, z) {
      babelHelpers.classCallCheck(this, Vector3);

      if (ArrayBuffer.isView(x)) {
        this.v = x;
        return;
      } else {
        this.v = new Float32Array(3);
      }

      if (IsUtil.not.exist(x)) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      } else if (Array.isArray(x)) {
        this.x = x[0];
        this.y = x[1];
        this.z = x[2];
      } else if (typeof x.w !== 'undefined') {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
      } else if (typeof x.z !== 'undefined') {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
      } else if (typeof x.y !== 'undefined') {
        this.x = x.x;
        this.y = x.y;
        this.z = 0;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }

    babelHelpers.createClass(Vector3, [{
      key: 'isEqual',
      value: function isEqual(vec) {
        if (this.x === vec.x && this.y === vec.y && this.z === vec.z) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Vector3(this.x, this.y, this.z);
      }
    }, {
      key: 'length',
      value: function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }
    }, {
      key: 'lengthSquared',
      value: function lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      }
    }, {
      key: 'lengthTo',
      value: function lengthTo(vec3) {
        var deltaX = vec3.x - this.x;
        var deltaY = vec3.y - this.y;
        var deltaZ = vec3.z - this.z;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
      }
    }, {
      key: 'dotProduct',
      value: function dotProduct(vec3) {
        return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
      }
    }, {
      key: 'cross',
      value: function cross(v) {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;

        this.x = x;
        this.y = y;
        this.z = z;

        return this;
      }
    }, {
      key: 'normalize',
      value: function normalize() {
        var length = this.length();
        this.divide(length);

        return this;
      }
    }, {
      key: 'add',
      value: function add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
      }
    }, {
      key: 'subtract',
      value: function subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
      }
    }, {
      key: 'divide',
      value: function divide(val) {
        if (val !== 0) {
          this.x /= val;
          this.y /= val;
          this.z /= val;
        } else {
          console.warn("0 division occured!");
          this.x = Infinity;
          this.y = Infinity;
          this.z = Infinity;
        }

        return this;
      }
    }, {
      key: 'multiply',
      value: function multiply(val) {
        this.x *= val;
        this.y *= val;
        this.z *= val;

        return this;
      }
    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;

        return this;
      }
    }, {
      key: 'divideVector',
      value: function divideVector(vec3) {
        this.x /= vec3.x;
        this.y /= vec3.y;
        this.z /= vec3.z;

        return this;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
      }
    }, {
      key: 'className',
      get: function get() {
        return this.constructor.name;
      }
    }, {
      key: 'x',
      get: function get() {
        return this.v[0];
      },
      set: function set(x) {
        this.v[0] = x;
      }
    }, {
      key: 'y',
      get: function get() {
        return this.v[1];
      },
      set: function set(y) {
        this.v[1] = y;
      }
    }, {
      key: 'z',
      get: function get() {
        return this.v[2];
      },
      set: function set(z) {
        this.v[2] = z;
      }
    }, {
      key: 'raw',
      get: function get() {
        return this.v;
      }
    }], [{
      key: 'zero',
      value: function zero() {
        return new Vector3(0, 0, 0);
      }
    }, {
      key: 'lengthSquared',
      value: function lengthSquared(vec3) {
        return vec3.x * vec3.x + vec3.y * vec3.y + vec3.z * vec3.z;
      }
    }, {
      key: 'lengthBtw',
      value: function lengthBtw(lhv, rhv) {
        var deltaX = rhv.x - lhv.x;
        var deltaY = rhv.y - lhv.y;
        var deltaZ = rhv.z - lhv.z;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
      }
    }, {
      key: 'dotProduct',
      value: function dotProduct(lv, rv) {
        return lv.x * rv.x + lv.y * rv.y + lv.z * rv.z;
      }
    }, {
      key: 'cross',
      value: function cross(lv, rv) {
        var x = lv.y * rv.z - lv.z * rv.y;
        var y = lv.z * rv.x - lv.x * rv.z;
        var z = lv.x * rv.y - lv.y * rv.x;

        return new Vector3(x, y, z);
      }
    }, {
      key: 'normalize',
      value: function normalize(vec3) {
        var length = vec3.length();
        var newVec = new Vector3(vec3.x, vec3.y, vec3.z);
        newVec.divide(length);

        return newVec;
      }
    }, {
      key: 'add',
      value: function add(lv, rv) {
        return new Vector3(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z);
      }
    }, {
      key: 'subtract',
      value: function subtract(lv, rv) {
        return new Vector3(lv.x - rv.x, lv.y - rv.y, lv.z - rv.z);
      }
    }, {
      key: 'divide',
      value: function divide(vec3, val) {
        if (val !== 0) {
          return new Vector3(vec3.x / val, vec3.y / val, vec3.z / val);
        } else {
          console.warn("0 division occured!");
          return new Vector3(Infinity, Infinity, Infinity);
        }
      }
    }, {
      key: 'multiply',
      value: function multiply(vec3, val) {
        return new Vector3(vec3.x * val, vec3.y * val, vec3.z * val);
      }
    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec3, vec) {
        return new Vector3(vec3.x * vec.x, vec3.y * vec.y, vec3.z * vec.z);
      }
    }, {
      key: 'angleOfVectors',
      value: function angleOfVectors(lhv, rhv) {
        var cos_sita = Vector3.dotProduct(lhv, rhv) / (lhv.length() * rhv.length());

        var sita = Math.acos(cos_sita);

        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          sita = MathUtil.radianToDegree(sita);
        }

        return sita;
      }
    }, {
      key: 'divideVector',
      value: function divideVector(lvec3, rvec3) {
        return new Vector3(lvec3.x / rvec3.x, lvec3.y / rvec3.y, lvec3.z / rvec3.z);
      }
    }]);
    return Vector3;
  }();


  GLBoost$1['Vector3'] = Vector3;

  var Vector4$1 = function () {
    function Vector4(x, y, z, w) {
      babelHelpers.classCallCheck(this, Vector4);

      if (ArrayBuffer.isView(x)) {
        this.v = x;
        return;
      } else {
        this.v = new Float32Array(4);
      }

      if (IsUtil.not.exist(x)) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
      } else if (Array.isArray(x)) {
        this.x = x[0];
        this.y = x[1];
        this.z = x[2];
        this.w = x[3];
      } else if (typeof x.w !== 'undefined') {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.w = x.w;
      } else if (typeof x.z !== 'undefined') {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.w = 1;
      } else if (typeof x.y !== 'undefined') {
        this.x = x.x;
        this.y = x.y;
        this.z = 0;
        this.w = 1;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      }
    }

    babelHelpers.createClass(Vector4, [{
      key: 'isEqual',
      value: function isEqual(vec) {
        if (this.x === vec.x && this.y === vec.y && this.z === vec.z && this.w === vec.w) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
      }
    }, {
      key: 'length',
      value: function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
      }
    }, {
      key: 'normalize',
      value: function normalize() {
        var length = this.length();
        this.divide(length);

        return this;
      }
    }, {
      key: 'add',
      value: function add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;
      }
    }, {
      key: 'addWithOutW',
      value: function addWithOutW(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
      }
    }, {
      key: 'subtract',
      value: function subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;
      }
    }, {
      key: 'multiply',
      value: function multiply(val) {
        this.x *= val;
        this.y *= val;
        this.z *= val;
        this.w *= val;

        return this;
      }
    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;
        this.w *= vec.w;

        return this;
      }
    }, {
      key: 'divide',
      value: function divide(val) {
        if (val !== 0) {
          this.x /= val;
          this.y /= val;
          this.z /= val;
          this.w /= val;
        } else {
          console.warn("0 division occured!");
          this.x = Infinity;
          this.y = Infinity;
          this.z = Infinity;
          this.w = Infinity;
        }
        return this;
      }
    }, {
      key: 'divideVector',
      value: function divideVector(vec4) {
        this.x /= vec4.x;
        this.y /= vec4.y;
        this.z /= vec4.z;
        this.w /= vec4.w;

        return this;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
      }
    }, {
      key: 'className',
      get: function get() {
        return this.constructor.name;
      }
    }, {
      key: 'x',
      get: function get() {
        return this.v[0];
      },
      set: function set(x) {
        this.v[0] = x;
      }
    }, {
      key: 'y',
      get: function get() {
        return this.v[1];
      },
      set: function set(y) {
        this.v[1] = y;
      }
    }, {
      key: 'z',
      get: function get() {
        return this.v[2];
      },
      set: function set(z) {
        this.v[2] = z;
      }
    }, {
      key: 'w',
      get: function get() {
        return this.v[3];
      },
      set: function set(w) {
        this.v[3] = w;
      }
    }, {
      key: 'raw',
      get: function get() {
        return this.v;
      }
    }], [{
      key: 'zero',
      value: function zero() {
        return new Vector4(0, 0, 0, 1);
      }
    }, {
      key: 'normalize',
      value: function normalize(vec4) {
        var length = vec4.length();
        var newVec = new Vector4(vec4.x, vec4.y, vec4.z, vec4.w);
        newVec.divide(length);

        return newVec;
      }
    }, {
      key: 'add',
      value: function add(lv, rv) {
        return new Vector4(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z, lv.z + rv.z);
      }
    }, {
      key: 'subtract',
      value: function subtract(lv, rv) {
        return new Vector4(lv.x - rv.x, lv.y - rv.y, lv.z - rv.z, lv.w - rv.w);
      }
    }, {
      key: 'addWithOutW',
      value: function addWithOutW(lv, rv) {
        return new Vector4(lv.x + rv.x, lv.y + rv.y, lv.z + rv.z, lv.z);
      }
    }, {
      key: 'multiply',
      value: function multiply(vec4, val) {
        return new Vector4(vec4.x * val, vec4.y * val, vec4.z * val, vec4.w * val);
      }
    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec4, vec) {
        return new Vector4(vec4.x * vec.x, vec4.y * vec.y, vec4.z * vec.z, vec4.w * vec.w);
      }
    }, {
      key: 'divide',
      value: function divide(vec4, val) {
        if (val !== 0) {
          return new Vector4(vec4.x / val, vec4.y / val, vec4.z / val, vec4.w / val);
        } else {
          console.warn("0 division occured!");
          return new Vector4(Infinity, Infinity, Infinity, Infinity);
        }
      }
    }, {
      key: 'divideVector',
      value: function divideVector(lvec4, rvec4) {
        return new Vector4(lvec4.x / rvec4.x, lvec4.y / rvec4.y, lvec4.z / rvec4.z, lvec4.w / rvec4.w);
      }
    }]);
    return Vector4;
  }();


  GLBoost$1["Vector4"] = Vector4$1;

  var Quaternion = function () {
    function Quaternion(x, y, z, w) {
      babelHelpers.classCallCheck(this, Quaternion);

      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }

    babelHelpers.createClass(Quaternion, [{
      key: 'isEqual',
      value: function isEqual(vec) {
        if (this.x === vec.x && this.y === vec.y && this.z === vec.z && this.w === vec.w) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Quaternion(this.x, this.y, this.z, this.w);
      }
    }, {
      key: 'axisAngle',
      value: function axisAngle(axisVec3, angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }
        var halfAngle = 0.5 * radian;
        var sin = Math.sin(halfAngle);

        var axis = Vector3.normalize(axisVec3);
        this.w = Math.cos(halfAngle);
        this.x = sin * axis.x;
        this.y = sin * axis.y;
        this.z = sin * axis.z;

        return this;
      }
    }, {
      key: 'add',
      value: function add(q) {
        this.x += q.x;
        this.y += q.y;
        this.z += q.z;
        this.w += q.w;

        return this;
      }
    }, {
      key: 'multiply',
      value: function multiply(q) {
        var result = new Quaternion(0, 0, 0, 1);
        result.w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;
        result.x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
        result.y = this.w * q.y + this.y * q.w + this.x * q.z - this.z * q.x;
        result.z = this.w * q.z + this.z * q.w + this.x * q.y - this.y * q.x;
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;

        return this;
      }
    }, {
      key: 'at',
      value: function at(i) {
        switch (i % 4) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          case 2:
            return this.z;
          case 3:
            return this.w;
        }
      }
    }, {
      key: 'setAt',
      value: function setAt(i, val) {
        switch (i % 4) {
          case 0:
            this.x = val;break;
          case 1:
            this.y = val;break;
          case 2:
            this.z = val;break;
          case 3:
            this.w = val;break;
        }
      }
    }, {
      key: 'normalize',
      value: function normalize() {
        var norm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        this.x /= norm;
        this.y /= norm;
        this.z /= norm;
        this.w /= norm;
        return this;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
      }
    }, {
      key: 'className',
      get: function get() {
        return this.constructor.name;
      }
    }], [{
      key: 'invert',
      value: function invert(quat) {
        return new Quaternion(-quat.x, -quat.y, -quat.z, quat.w).multiply(1.0 / (quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w));
      }
    }, {
      key: 'qlerp',
      value: function qlerp(lhq, rhq, ratio) {

        var q = new Quaternion(0, 0, 0, 1);
        var qr = lhq.w * rhq.w + lhq.x * rhq.x + lhq.y * rhq.y + lhq.z * rhq.z;
        var ss = 1.0 - qr * qr;

        if (ss === 0.0) {
          q.w = lhq.w;
          q.x = lhq.x;
          q.y = lhq.y;
          q.z = lhq.z;

          return q;
        } else {

          if (qr > 1) {
            qr = 0.999;
          } else if (qr < -1) {
            qr = -0.999;
          }

          var ph = Math.acos(qr);
          var s2 = void 0;
          if (qr < 0.0 && ph > Math.PI / 2.0) {
            qr = -lhq.w * rhq.w - lhq.x * rhq.x - lhq.y * rhq.y - lhq.z * rhq.z;
            ph = Math.acos(qr);
            s2 = -1 * Math.sin(ph * ratio) / Math.sin(ph);
          } else {
            s2 = Math.sin(ph * ratio) / Math.sin(ph);
          }
          var s1 = Math.sin(ph * (1.0 - ratio)) / Math.sin(ph);

          q.x = lhq.x * s1 + rhq.x * s2;
          q.y = lhq.y * s1 + rhq.y * s2;
          q.z = lhq.z * s1 + rhq.z * s2;
          q.w = lhq.w * s1 + rhq.w * s2;

          return q;
        }
      }
    }, {
      key: 'axisAngle',
      value: function axisAngle(axisVec3, angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }
        var halfAngle = 0.5 * radian;
        var sin = Math.sin(halfAngle);

        var axis = Vector3.normalize(axisVec3);
        return new Quaternion(sin * axis.x, sin * axis.y, sin * axis.z, Math.cos(halfAngle));
      }
    }, {
      key: 'multiply',
      value: function multiply(q1, q2) {
        var result = new Quaternion(0, 0, 0, 1);
        result.w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
        result.x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
        result.y = q1.w * q2.y + q1.y * q2.w + q1.x * q2.z - q1.z * q2.x;
        result.z = q1.w * q2.z + q1.z * q2.w + q1.x * q2.y - q1.y * q2.x;
        return result;
      }
    }, {
      key: 'fromMatrix',
      value: function fromMatrix(m) {

        var q = new Quaternion();
        var tr = m.m00 + m.m11 + m.m22;

        if (tr > 0) {
          var S = 0.5 / Math.sqrt(tr + 1.0);
          q.w = 0.25 / S;
          q.x = (m.m21 - m.m12) * S;
          q.y = (m.m02 - m.m20) * S;
          q.z = (m.m10 - m.m01) * S;
        } else if (m.m00 > m.m11 && m.m00 > m.m22) {
          var _S = Math.sqrt(1.0 + m.m00 - m.m11 - m.m22) * 2;
          q.w = (m.m21 - m.m12) / _S;
          q.x = 0.25 * _S;
          q.y = (m.m01 + m.m10) / _S;
          q.z = (m.m02 + m.m20) / _S;
        } else if (m.m11 > m.m22) {
          var _S2 = Math.sqrt(1.0 + m.m11 - m.m00 - m.m22) * 2;
          q.w = (m.m02 - m.m20) / _S2;
          q.x = (m.m01 + m.m10) / _S2;
          q.y = 0.25 * _S2;
          q.z = (m.m12 + m.m21) / _S2;
        } else {
          var _S3 = Math.sqrt(1.0 + m.m22 - m.m00 - m.m11) * 2;
          q.w = (m.m10 - m.m01) / _S3;
          q.x = (m.m02 + m.m20) / _S3;
          q.y = (m.m12 + m.m21) / _S3;
          q.z = 0.25 * _S3;
        }

        return q;
      }
    }, {
      key: 'fromPosition',
      value: function fromPosition(vec3) {
        var q = new Quaternion(vec3.x, vec3.y, vec3.z, 0);
        return q;
      }
    }]);
    return Quaternion;
  }();


  GLBoost$1["Quaternion"] = Quaternion;

  var Matrix33 = function () {
    function Matrix33(m) {
      var isColumnMajor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      babelHelpers.classCallCheck(this, Matrix33);

      this.m = new Float32Array(9);
      if (arguments.length >= 9) {
        if (isColumnMajor === true) {
          var _m = arguments;
          this.setComponents(_m[0], _m[3], _m[6], _m[1], _m[4], _m[7], _m[2], _m[5], _m[8]);
        } else {
          this.setComponents.apply(this, arguments);
        }
      } else if (Array.isArray(m)) {
        if (isColumnMajor === true) {
          this.setComponents(m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]);
        } else {
          this.setComponents.apply(this, m);
        }
      } else if (m instanceof Float32Array) {
        if (isColumnMajor === true) {
          this.setComponents(m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]);
        } else {
          this.setComponents.apply(this, m);
        }
      } else if (!!m && typeof m.m22 !== 'undefined') {
        if (isColumnMajor === true) {
          this.setComponents(m.m00, m.m01, m.m02, m.m10, m.m11, m.m12, m.m20, m.m21, m.m22);
        } else {
          this.setComponents(m.m00, m.m01, m.m02, m.m10, m.m11, m.m12, m.m20, m.m21, m.m22);
        }
      } else if (!!m && typeof m.className !== 'undefined' && m.className === 'Quaternion') {
        var sx = m.x * m.x;
        var sy = m.y * m.y;
        var sz = m.z * m.z;
        var cx = m.y * m.z;
        var cy = m.x * m.z;
        var cz = m.x * m.y;
        var wx = m.w * m.x;
        var wy = m.w * m.y;
        var wz = m.w * m.z;

        this.setComponents(1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), 2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), 2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy));
      } else {
        this.identity();
      }
    }

    babelHelpers.createClass(Matrix33, [{
      key: 'setComponents',
      value: function setComponents(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        this.m00 = m00;this.m01 = m01;this.m02 = m02;
        this.m10 = m10;this.m11 = m11;this.m12 = m12;
        this.m20 = m20;this.m21 = m21;this.m22 = m22;

        return this;
      }
    }, {
      key: 'identity',
      value: function identity() {
        this.setComponents(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Matrix33(this.m[0], this.m[3], this.m[6], this.m[1], this.m[4], this.m[7], this.m[2], this.m[5], this.m[8]);
      }
    }, {
      key: 'rotateX',
      value: function rotateX(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(1, 0, 0, 0, cos, -sin, 0, sin, cos);
      }
    }, {
      key: 'rotateY',
      value: function rotateY(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        this.setComponents(cos, 0, sin, 0, 1, 0, -sin, 0, cos);
        return this;
      }
    }, {
      key: 'rotateZ',
      value: function rotateZ(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
      }
    }, {
      key: 'scale',
      value: function scale(vec) {
        return this.setComponents(vec.x, 0, 0, 0, vec.y, 0, 0, 0, vec.z);
      }
    }, {
      key: 'zero',
      value: function zero() {
        this.setComponents(0, 0, 0, 0, 0, 0, 0, 0, 0);
        return this;
      }
    }, {
      key: 'flatten',
      value: function flatten() {
        return this.m;
      }
    }, {
      key: 'flattenAsArray',
      value: function flattenAsArray() {
        return [this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5], this.m[6], this.m[7], this.m[8]];
      }
    }, {
      key: '_swap',
      value: function _swap(l, r) {
        this.m[r] = [this.m[l], this.m[l] = this.m[r]][0];
      }
    }, {
      key: 'transpose',
      value: function transpose() {
        this._swap(1, 3);
        this._swap(2, 6);
        this._swap(5, 8);

        return this;
      }
    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec) {
        var x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z;
        var y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z;
        var z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z;

        return new Vector3(x, y, z);
      }
    }, {
      key: 'multiply',
      value: function multiply(mat) {
        var m00 = this.m00 * mat.m00 + this.m01 * mat.m10 + this.m02 * mat.m20;
        var m01 = this.m00 * mat.m01 + this.m01 * mat.m11 + this.m02 * mat.m21;
        var m02 = this.m00 * mat.m02 + this.m01 * mat.m12 + this.m02 * mat.m22;

        var m10 = this.m10 * mat.m00 + this.m11 * mat.m10 + this.m12 * mat.m20;
        var m11 = this.m10 * mat.m01 + this.m11 * mat.m11 + this.m12 * mat.m21;
        var m12 = this.m10 * mat.m02 + this.m11 * mat.m12 + this.m12 * mat.m22;

        var m20 = this.m20 * mat.m00 + this.m21 * mat.m10 + this.m22 * mat.m20;
        var m21 = this.m20 * mat.m01 + this.m21 * mat.m11 + this.m22 * mat.m21;
        var m22 = this.m20 * mat.m02 + this.m21 * mat.m12 + this.m22 * mat.m22;

        return this.setComponents(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }
    }, {
      key: 'determinant',
      value: function determinant() {
        return this.m00 * this.m11 * this.m22 + this.m10 * this.m21 * this.m02 + this.m20 * this.m01 * this.m12 - this.m00 * this.m21 * this.m12 - this.m20 * this.m11 * this.m02 - this.m10 * this.m01 * this.m22;
      }
    }, {
      key: 'invert',
      value: function invert() {
        var det = this.determinant();
        var m00 = (this.m11 * this.m22 - this.m12 * this.m21) / det;
        var m01 = (this.m02 * this.m21 - this.m01 * this.m22) / det;
        var m02 = (this.m01 * this.m12 - this.m02 * this.m11) / det;
        var m10 = (this.m12 * this.m20 - this.m10 * this.m22) / det;
        var m11 = (this.m00 * this.m22 - this.m02 * this.m20) / det;
        var m12 = (this.m02 * this.m10 - this.m00 * this.m12) / det;
        var m20 = (this.m10 * this.m21 - this.m11 * this.m20) / det;
        var m21 = (this.m01 * this.m20 - this.m00 * this.m21) / det;
        var m22 = (this.m00 * this.m11 - this.m01 * this.m10) / det;

        return this.setComponents(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.m00 + ' ' + this.m01 + ' ' + this.m02 + '\n' + this.m10 + ' ' + this.m11 + ' ' + this.m12 + '\n' + this.m20 + ' ' + this.m21 + ' ' + this.m22 + '\n';
      }
    }, {
      key: 'nearZeroToZero',
      value: function nearZeroToZero(value) {
        if (Math.abs(value) < 0.00001) {
          value = 0;
        } else if (0.99999 < value && value < 1.00001) {
          value = 1;
        } else if (-1.00001 < value && value < -0.99999) {
          value = -1;
        }
        return value;
      }
    }, {
      key: 'toStringApproximately',
      value: function toStringApproximately() {
        return this.nearZeroToZero(this.m00) + ' ' + this.nearZeroToZero(this.m01) + ' ' + this.nearZeroToZero(this.m02) + '\n' + this.nearZeroToZero(this.m10) + ' ' + this.nearZeroToZero(this.m11) + ' ' + this.nearZeroToZero(this.m12) + ' \n' + this.nearZeroToZero(this.m20) + ' ' + this.nearZeroToZero(this.m21) + ' ' + this.nearZeroToZero(this.m22) + '\n';
      }
    }, {
      key: 'getScale',
      value: function getScale() {
        return new Vector3(Math.sqrt(this.m00 * this.m00 + this.m01 * this.m01 + this.m02 * this.m02), Math.sqrt(this.m10 * this.m10 + this.m11 * this.m11 + this.m12 * this.m12), Math.sqrt(this.m20 * this.m20 + this.m21 * this.m21 + this.m22 * this.m22));
      }
    }, {
      key: 'addScale',
      value: function addScale(vec) {
        this.m00 *= vec.x;
        this.m11 *= vec.y;
        this.m22 *= vec.z;

        return this;
      }
    }, {
      key: 'className',
      get: function get() {
        return this.constructor.name;
      }
    }, {
      key: 'm00',
      set: function set(val) {
        this.m[0] = val;
      },
      get: function get() {
        return this.m[0];
      }
    }, {
      key: 'm10',
      set: function set(val) {
        this.m[1] = val;
      },
      get: function get() {
        return this.m[1];
      }
    }, {
      key: 'm20',
      set: function set(val) {
        this.m[2] = val;
      },
      get: function get() {
        return this.m[2];
      }
    }, {
      key: 'm01',
      set: function set(val) {
        this.m[3] = val;
      },
      get: function get() {
        return this.m[3];
      }
    }, {
      key: 'm11',
      set: function set(val) {
        this.m[4] = val;
      },
      get: function get() {
        return this.m[4];
      }
    }, {
      key: 'm21',
      set: function set(val) {
        this.m[5] = val;
      },
      get: function get() {
        return this.m[5];
      }
    }, {
      key: 'm02',
      set: function set(val) {
        this.m[6] = val;
      },
      get: function get() {
        return this.m[6];
      }
    }, {
      key: 'm12',
      set: function set(val) {
        this.m[7] = val;
      },
      get: function get() {
        return this.m[7];
      }
    }, {
      key: 'm22',
      set: function set(val) {
        this.m[8] = val;
      },
      get: function get() {
        return this.m[8];
      }
    }], [{
      key: 'identity',
      value: function identity() {
        return new Matrix33(1, 0, 0, 0, 1, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateX',
      value: function rotateX(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix33(1, 0, 0, 0, cos, -sin, 0, sin, cos);
      }
    }, {
      key: 'rotateY',
      value: function rotateY(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix33(cos, 0, sin, 0, 1, 0, -sin, 0, cos);
      }
    }, {
      key: 'rotateZ',
      value: function rotateZ(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix33(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateXYZ',
      value: function rotateXYZ(x, y, z) {
        return Matrix33.rotateZ(z).multiply(Matrix33.rotateY(y).multiply(Matrix33.rotateX(x)));
      }
    }, {
      key: 'rotate',
      value: function rotate(vec3) {
        return Matrix33.rotateZ(vec3.z).multiply(Matrix33.rotateY(vec3.y).multiply(Matrix33.rotateX(vec3.x)));
      }
    }, {
      key: 'scale',
      value: function scale(vec) {
        return new Matrix33(vec.x, 0, 0, 0, vec.y, 0, 0, 0, vec.z);
      }
    }, {
      key: 'zero',
      value: function zero() {
        return new Matrix33(0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    }, {
      key: 'transpose',
      value: function transpose(mat) {

        var mat_t = new Matrix33(mat.m00, mat.m10, mat.m20, mat.m01, mat.m11, mat.m21, mat.m02, mat.m12, mat.m22);

        return mat_t;
      }
    }, {
      key: 'multiply',
      value: function multiply(l_m, r_m) {
        var m00 = l_m.m00 * r_m.m00 + l_m.m01 * r_m.m10 + l_m.m02 * r_m.m20;
        var m10 = l_m.m10 * r_m.m00 + l_m.m11 * r_m.m10 + l_m.m12 * r_m.m20;
        var m20 = l_m.m20 * r_m.m00 + l_m.m21 * r_m.m10 + l_m.m22 * r_m.m20;

        var m01 = l_m.m00 * r_m.m01 + l_m.m01 * r_m.m11 + l_m.m02 * r_m.m21;
        var m11 = l_m.m10 * r_m.m01 + l_m.m11 * r_m.m11 + l_m.m12 * r_m.m21;
        var m21 = l_m.m20 * r_m.m01 + l_m.m21 * r_m.m11 + l_m.m22 * r_m.m21;

        var m02 = l_m.m00 * r_m.m02 + l_m.m01 * r_m.m12 + l_m.m02 * r_m.m22;
        var m12 = l_m.m10 * r_m.m02 + l_m.m11 * r_m.m12 + l_m.m12 * r_m.m22;
        var m22 = l_m.m20 * r_m.m02 + l_m.m21 * r_m.m12 + l_m.m22 * r_m.m22;

        return new Matrix33(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }
    }, {
      key: 'determinant',
      value: function determinant(mat) {
        return mat.m00 * mat.m11 * mat.m22 + mat.m10 * mat.m21 * mat.m02 + mat.m20 * mat.m01 * mat.m12 - mat.m00 * mat.m21 * mat.m12 - mat.m20 * mat.m11 * mat.m02 - mat.m10 * mat.m01 * mat.m22;
      }
    }, {
      key: 'invert',
      value: function invert(mat) {
        var det = mat.determinant();
        var m00 = (mat.m11 * mat.m22 - mat.m12 * mat.m21) / det;
        var m01 = (mat.m02 * mat.m21 - mat.m01 * mat.m22) / det;
        var m02 = (mat.m01 * mat.m12 - mat.m02 * mat.m11) / det;
        var m10 = (mat.m12 * mat.m20 - mat.m10 * mat.m22) / det;
        var m11 = (mat.m00 * mat.m22 - mat.m02 * mat.m20) / det;
        var m12 = (mat.m02 * mat.m10 - mat.m00 * mat.m12) / det;
        var m20 = (mat.m10 * mat.m21 - mat.m11 * mat.m20) / det;
        var m21 = (mat.m01 * mat.m20 - mat.m00 * mat.m21) / det;
        var m22 = (mat.m00 * mat.m11 - mat.m01 * mat.m10) / det;

        return new Matrix33(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      }
    }]);
    return Matrix33;
  }();


  GLBoost$1['Matrix33'] = Matrix33;

  var Matrix44$1 = function () {
    function Matrix44(m) {
      var isColumnMajor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var notCopyFloat32Array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      babelHelpers.classCallCheck(this, Matrix44);

      if (arguments.length >= 16) {
        this.m = new Float32Array(16);
        if (isColumnMajor === true) {
          var _m = arguments;
          this.setComponents(_m[0], _m[4], _m[8], _m[12], _m[1], _m[5], _m[9], _m[13], _m[2], _m[6], _m[10], _m[14], _m[3], _m[7], _m[11], _m[15]);
        } else {
          this.setComponents.apply(this, arguments);
        }
      } else if (Array.isArray(m)) {
        this.m = new Float32Array(16);
        if (isColumnMajor === true) {
          this.setComponents(m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]);
        } else {
          this.setComponents.apply(this, m);
        }
      } else if (m instanceof Float32Array) {
        if (notCopyFloat32Array) {
          this.m = m;
        } else {
          this.m = new Float32Array(16);
          if (isColumnMajor === true) {
            this.setComponents(m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]);
          } else {
            this.setComponents.apply(this, m);
          }
        }
      } else if (!!m && typeof m.m33 === 'undefined' && typeof m.m22 !== 'undefined') {
        if (notCopyFloat32Array) {
          this.m = m.m;
        } else {
          this.m = new Float32Array(16);
          if (isColumnMajor === true) {
            this.setComponents(m.m00, m.m01, m.m02, 0, m.m10, m.m11, m.m12, 0, m.m20, m.m21, m.m22, 0, 0, 0, 0, 1);
          } else {
            this.setComponents(m.m00, m.m01, m.m02, 0, m.m10, m.m11, m.m12, 0, m.m20, m.m21, m.m22, 0, 0, 0, 0, 1);
          }
        }
      } else if (!!m && typeof m.className !== 'undefined' && m.className === 'Quaternion') {
        this.m = new Float32Array(16);

        var sx = m.x * m.x;
        var sy = m.y * m.y;
        var sz = m.z * m.z;
        var cx = m.y * m.z;
        var cy = m.x * m.z;
        var cz = m.x * m.y;
        var wx = m.w * m.x;
        var wy = m.w * m.y;
        var wz = m.w * m.z;

        this.setComponents(1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), 0.0, 2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), 0.0, 2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), 0.0, 0.0, 0.0, 0.0, 1.0);
      } else {
        this.m = new Float32Array(16);
        this.identity();
      }
    }

    babelHelpers.createClass(Matrix44, [{
      key: 'setComponents',
      value: function setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        this.m00 = m00;this.m01 = m01;this.m02 = m02;this.m03 = m03;
        this.m10 = m10;this.m11 = m11;this.m12 = m12;this.m13 = m13;
        this.m20 = m20;this.m21 = m21;this.m22 = m22;this.m23 = m23;
        this.m30 = m30;this.m31 = m31;this.m32 = m32;this.m33 = m33;

        return this;
      }
    }, {
      key: 'copyComponents',
      value: function copyComponents(mat4) {
        this.setComponents.apply(this, mat4.m);
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Matrix44(this.m[0], this.m[4], this.m[8], this.m[12], this.m[1], this.m[5], this.m[9], this.m[13], this.m[2], this.m[6], this.m[10], this.m[14], this.m[3], this.m[7], this.m[11], this.m[15]);
      }
    }, {
      key: 'identity',
      value: function identity() {
        this.setComponents(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
      }
    }, {
      key: 'translate',
      value: function translate(vec) {
        return this.setComponents(1, 0, 0, vec.x, 0, 1, 0, vec.y, 0, 0, 1, vec.z, 0, 0, 0, 1);
      }
    }, {
      key: 'putTranslate',
      value: function putTranslate(vec) {
        this.m03 = vec.x;
        this.m13 = vec.y;
        this.m23 = vec.z;
      }
    }, {
      key: 'getTranslate',
      value: function getTranslate() {
        return new Vector3(this.m03, this.m13, this.m23);
      }
    }, {
      key: 'scale',
      value: function scale(vec) {
        return this.setComponents(vec.x, 0, 0, 0, 0, vec.y, 0, 0, 0, 0, vec.z, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'addScale',
      value: function addScale(vec) {
        this.m00 *= vec.x;
        this.m11 *= vec.y;
        this.m22 *= vec.z;

        return this;
      }
    }, {
      key: 'rotateX',
      value: function rotateX(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateY',
      value: function rotateY(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateZ',
      value: function rotateZ(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return this.setComponents(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'toEulerAngles',
      value: function toEulerAngles() {
        var rotate = null;
        if (Math.abs(this.m20) != 1.0) {
          var y = -Math.asin(this.m20);
          var x = Math.atan2(this.m21 / Math.cos(y), this.m22 / Math.cos(y));
          var z = Math.atan2(this.m10 / Math.cos(y), this.m00 / Math.cos(y));
          rotate = new Vector3(x, y, z);
        } else if (this.m20 === -1.0) {
          rotate = new Vector3(Math.atan2(this.m01, this.m02), Math.PI / 2.0, 0.0);
        } else {
          rotate = new Vector3(Math.atan2(-this.m01, -this.m02), -Math.PI / 2.0, 0.0);
        }

        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          rotate.x = MathUtil.radianToDegree(rotate.x);
          rotate.y = MathUtil.radianToDegree(rotate.y);
          rotate.z = MathUtil.radianToDegree(rotate.z);
        }

        return rotate;
      }
    }, {
      key: 'zero',
      value: function zero() {
        this.setComponents(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        return this;
      }
    }, {
      key: 'flatten',
      value: function flatten() {
        return this.m;
      }
    }, {
      key: 'flattenAsArray',
      value: function flattenAsArray() {
        return [this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5], this.m[6], this.m[7], this.m[8], this.m[9], this.m[10], this.m[11], this.m[12], this.m[13], this.m[14], this.m[15]];
      }
    }, {
      key: '_swap',
      value: function _swap(l, r) {
        this.m[r] = [this.m[l], this.m[l] = this.m[r]][0];
      }
    }, {
      key: 'transpose',
      value: function transpose() {
        this._swap(1, 4);
        this._swap(2, 8);
        this._swap(3, 12);
        this._swap(6, 9);
        this._swap(7, 13);
        this._swap(11, 14);

        return this;
      }
    }, {
      key: 'multiplyVector',
      value: function multiplyVector(vec) {
        var x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vec.w;
        var y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vec.w;
        var z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vec.w;
        var w = this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vec.w;

        return new Vector4$1(x, y, z, w);
      }
    }, {
      key: 'multiply',
      value: function multiply(mat) {
        var m00 = this.m00 * mat.m00 + this.m01 * mat.m10 + this.m02 * mat.m20 + this.m03 * mat.m30;
        var m01 = this.m00 * mat.m01 + this.m01 * mat.m11 + this.m02 * mat.m21 + this.m03 * mat.m31;
        var m02 = this.m00 * mat.m02 + this.m01 * mat.m12 + this.m02 * mat.m22 + this.m03 * mat.m32;
        var m03 = this.m00 * mat.m03 + this.m01 * mat.m13 + this.m02 * mat.m23 + this.m03 * mat.m33;

        var m10 = this.m10 * mat.m00 + this.m11 * mat.m10 + this.m12 * mat.m20 + this.m13 * mat.m30;
        var m11 = this.m10 * mat.m01 + this.m11 * mat.m11 + this.m12 * mat.m21 + this.m13 * mat.m31;
        var m12 = this.m10 * mat.m02 + this.m11 * mat.m12 + this.m12 * mat.m22 + this.m13 * mat.m32;
        var m13 = this.m10 * mat.m03 + this.m11 * mat.m13 + this.m12 * mat.m23 + this.m13 * mat.m33;

        var m20 = this.m20 * mat.m00 + this.m21 * mat.m10 + this.m22 * mat.m20 + this.m23 * mat.m30;
        var m21 = this.m20 * mat.m01 + this.m21 * mat.m11 + this.m22 * mat.m21 + this.m23 * mat.m31;
        var m22 = this.m20 * mat.m02 + this.m21 * mat.m12 + this.m22 * mat.m22 + this.m23 * mat.m32;
        var m23 = this.m20 * mat.m03 + this.m21 * mat.m13 + this.m22 * mat.m23 + this.m23 * mat.m33;

        var m30 = this.m30 * mat.m00 + this.m31 * mat.m10 + this.m32 * mat.m20 + this.m33 * mat.m30;
        var m31 = this.m30 * mat.m01 + this.m31 * mat.m11 + this.m32 * mat.m21 + this.m33 * mat.m31;
        var m32 = this.m30 * mat.m02 + this.m31 * mat.m12 + this.m32 * mat.m22 + this.m33 * mat.m32;
        var m33 = this.m30 * mat.m03 + this.m31 * mat.m13 + this.m32 * mat.m23 + this.m33 * mat.m33;

        return this.setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }, {
      key: 'multiplyByLeft',
      value: function multiplyByLeft(mat) {
        var m00 = mat.m00 * this.m00 + mat.m01 * this.m10 + mat.m02 * this.m20 + mat.m03 * this.m30;
        var m01 = mat.m00 * this.m01 + mat.m01 * this.m11 + mat.m02 * this.m21 + mat.m03 * this.m31;
        var m02 = mat.m00 * this.m02 + mat.m01 * this.m12 + mat.m02 * this.m22 + mat.m03 * this.m32;
        var m03 = mat.m00 * this.m03 + mat.m01 * this.m13 + mat.m02 * this.m23 + mat.m03 * this.m33;

        var m10 = mat.m10 * this.m00 + mat.m11 * this.m10 + mat.m12 * this.m20 + mat.m13 * this.m30;
        var m11 = mat.m10 * this.m01 + mat.m11 * this.m11 + mat.m12 * this.m21 + mat.m13 * this.m31;
        var m12 = mat.m10 * this.m02 + mat.m11 * this.m12 + mat.m12 * this.m22 + mat.m13 * this.m32;
        var m13 = mat.m10 * this.m03 + mat.m11 * this.m13 + mat.m12 * this.m23 + mat.m13 * this.m33;

        var m20 = mat.m20 * this.m00 + mat.m21 * this.m10 + mat.m22 * this.m20 + mat.m23 * this.m30;
        var m21 = mat.m20 * this.m01 + mat.m21 * this.m11 + mat.m22 * this.m21 + mat.m23 * this.m31;
        var m22 = mat.m20 * this.m02 + mat.m21 * this.m12 + mat.m22 * this.m22 + mat.m23 * this.m32;
        var m23 = mat.m20 * this.m03 + mat.m21 * this.m13 + mat.m22 * this.m23 + mat.m23 * this.m33;

        var m30 = mat.m30 * this.m00 + mat.m31 * this.m10 + mat.m32 * this.m20 + mat.m33 * this.m30;
        var m31 = mat.m30 * this.m01 + mat.m31 * this.m11 + mat.m32 * this.m21 + mat.m33 * this.m31;
        var m32 = mat.m30 * this.m02 + mat.m31 * this.m12 + mat.m32 * this.m22 + mat.m33 * this.m32;
        var m33 = mat.m30 * this.m03 + mat.m31 * this.m13 + mat.m32 * this.m23 + mat.m33 * this.m33;

        return this.setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }, {
      key: 'determinant',
      value: function determinant() {
        return this.m00 * this.m11 * this.m22 * this.m33 + this.m00 * this.m12 * this.m23 * this.m31 + this.m00 * this.m13 * this.m21 * this.m32 + this.m01 * this.m10 * this.m23 * this.m32 + this.m01 * this.m12 * this.m20 * this.m33 + this.m01 * this.m13 * this.m22 * this.m30 + this.m02 * this.m10 * this.m21 * this.m33 + this.m02 * this.m11 * this.m23 * this.m30 + this.m02 * this.m13 * this.m20 * this.m31 + this.m03 * this.m10 * this.m22 * this.m31 + this.m03 * this.m11 * this.m20 * this.m32 + this.m03 * this.m12 * this.m21 * this.m30 - this.m00 * this.m11 * this.m23 * this.m32 - this.m00 * this.m12 * this.m21 * this.m33 - this.m00 * this.m13 * this.m22 * this.m31 - this.m01 * this.m10 * this.m22 * this.m33 - this.m01 * this.m12 * this.m23 * this.m30 - this.m01 * this.m13 * this.m20 * this.m32 - this.m02 * this.m10 * this.m23 * this.m31 - this.m02 * this.m11 * this.m20 * this.m33 - this.m02 * this.m13 * this.m21 * this.m30 - this.m03 * this.m10 * this.m21 * this.m32 - this.m03 * this.m11 * this.m22 * this.m30 - this.m03 * this.m12 * this.m20 * this.m31;
      }
    }, {
      key: 'invert',
      value: function invert() {
        var det = this.determinant();
        var m00 = (this.m11 * this.m22 * this.m33 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32 - this.m11 * this.m23 * this.m32 - this.m12 * this.m21 * this.m33 - this.m13 * this.m22 * this.m31) / det;
        var m01 = (this.m01 * this.m23 * this.m32 + this.m02 * this.m21 * this.m33 + this.m03 * this.m22 * this.m31 - this.m01 * this.m22 * this.m33 - this.m02 * this.m23 * this.m31 - this.m03 * this.m21 * this.m32) / det;
        var m02 = (this.m01 * this.m12 * this.m33 + this.m02 * this.m13 * this.m31 + this.m03 * this.m11 * this.m32 - this.m01 * this.m13 * this.m32 - this.m02 * this.m11 * this.m33 - this.m03 * this.m12 * this.m31) / det;
        var m03 = (this.m01 * this.m13 * this.m22 + this.m02 * this.m11 * this.m23 + this.m03 * this.m12 * this.m21 - this.m01 * this.m12 * this.m23 - this.m02 * this.m13 * this.m21 - this.m03 * this.m11 * this.m22) / det;
        var m10 = (this.m10 * this.m23 * this.m32 + this.m12 * this.m20 * this.m33 + this.m13 * this.m22 * this.m30 - this.m10 * this.m22 * this.m33 - this.m12 * this.m23 * this.m30 - this.m13 * this.m20 * this.m32) / det;
        var m11 = (this.m00 * this.m22 * this.m33 + this.m02 * this.m23 * this.m30 + this.m03 * this.m20 * this.m32 - this.m00 * this.m23 * this.m32 - this.m02 * this.m20 * this.m33 - this.m03 * this.m22 * this.m30) / det;
        var m12 = (this.m00 * this.m13 * this.m32 + this.m02 * this.m10 * this.m33 + this.m03 * this.m12 * this.m30 - this.m00 * this.m12 * this.m33 - this.m02 * this.m13 * this.m30 - this.m03 * this.m10 * this.m32) / det;
        var m13 = (this.m00 * this.m12 * this.m23 + this.m02 * this.m13 * this.m20 + this.m03 * this.m10 * this.m22 - this.m00 * this.m13 * this.m22 - this.m02 * this.m10 * this.m23 - this.m03 * this.m12 * this.m20) / det;
        var m20 = (this.m10 * this.m21 * this.m33 + this.m11 * this.m23 * this.m30 + this.m13 * this.m20 * this.m31 - this.m10 * this.m23 * this.m31 - this.m11 * this.m20 * this.m33 - this.m13 * this.m21 * this.m30) / det;
        var m21 = (this.m00 * this.m23 * this.m31 + this.m01 * this.m20 * this.m33 + this.m03 * this.m21 * this.m30 - this.m00 * this.m21 * this.m33 - this.m01 * this.m23 * this.m30 - this.m03 * this.m20 * this.m31) / det;
        var m22 = (this.m00 * this.m11 * this.m33 + this.m01 * this.m13 * this.m30 + this.m03 * this.m10 * this.m31 - this.m00 * this.m13 * this.m31 - this.m01 * this.m10 * this.m33 - this.m03 * this.m11 * this.m30) / det;
        var m23 = (this.m00 * this.m13 * this.m21 + this.m01 * this.m10 * this.m23 + this.m03 * this.m11 * this.m20 - this.m00 * this.m11 * this.m23 - this.m01 * this.m13 * this.m20 - this.m03 * this.m10 * this.m21) / det;
        var m30 = (this.m10 * this.m22 * this.m31 + this.m11 * this.m20 * this.m32 + this.m12 * this.m21 * this.m30 - this.m10 * this.m21 * this.m32 - this.m11 * this.m22 * this.m30 - this.m12 * this.m20 * this.m31) / det;
        var m31 = (this.m00 * this.m21 * this.m32 + this.m01 * this.m22 * this.m30 + this.m02 * this.m20 * this.m31 - this.m00 * this.m22 * this.m31 - this.m01 * this.m20 * this.m32 - this.m02 * this.m21 * this.m30) / det;
        var m32 = (this.m00 * this.m12 * this.m31 + this.m01 * this.m10 * this.m32 + this.m02 * this.m11 * this.m30 - this.m00 * this.m11 * this.m32 - this.m01 * this.m12 * this.m30 - this.m02 * this.m10 * this.m31) / det;
        var m33 = (this.m00 * this.m11 * this.m22 + this.m01 * this.m12 * this.m20 + this.m02 * this.m10 * this.m21 - this.m00 * this.m12 * this.m21 - this.m01 * this.m10 * this.m22 - this.m02 * this.m11 * this.m20) / det;

        return this.setComponents(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.m00 + ' ' + this.m01 + ' ' + this.m02 + ' ' + this.m03 + ' \n' + this.m10 + ' ' + this.m11 + ' ' + this.m12 + ' ' + this.m13 + ' \n' + this.m20 + ' ' + this.m21 + ' ' + this.m22 + ' ' + this.m23 + ' \n' + this.m30 + ' ' + this.m31 + ' ' + this.m32 + ' ' + this.m33 + ' \n';
      }
    }, {
      key: 'nearZeroToZero',
      value: function nearZeroToZero(value) {
        if (Math.abs(value) < 0.00001) {
          value = 0;
        } else if (0.99999 < value && value < 1.00001) {
          value = 1;
        } else if (-1.00001 < value && value < -0.99999) {
          value = -1;
        }
        return value;
      }
    }, {
      key: 'toStringApproximately',
      value: function toStringApproximately() {
        return this.nearZeroToZero(this.m00) + ' ' + this.nearZeroToZero(this.m01) + ' ' + this.nearZeroToZero(this.m02) + ' ' + this.nearZeroToZero(this.m03) + ' \n' + this.nearZeroToZero(this.m10) + ' ' + this.nearZeroToZero(this.m11) + ' ' + this.nearZeroToZero(this.m12) + ' ' + this.nearZeroToZero(this.m13) + ' \n' + this.nearZeroToZero(this.m20) + ' ' + this.nearZeroToZero(this.m21) + ' ' + this.nearZeroToZero(this.m22) + ' ' + this.nearZeroToZero(this.m23) + ' \n' + this.nearZeroToZero(this.m30) + ' ' + this.nearZeroToZero(this.m31) + ' ' + this.nearZeroToZero(this.m32) + ' ' + this.nearZeroToZero(this.m33) + ' \n';
      }
    }, {
      key: 'getScale',
      value: function getScale() {
        return new Vector3(Math.sqrt(this.m00 * this.m00 + this.m01 * this.m01 + this.m02 * this.m02), Math.sqrt(this.m10 * this.m10 + this.m11 * this.m11 + this.m12 * this.m12), Math.sqrt(this.m20 * this.m20 + this.m21 * this.m21 + this.m22 * this.m22));
      }
    }, {
      key: 'getRotate',
      value: function getRotate() {
        var quat = Quaternion.fromMatrix(this);
        var rotateMat = new Matrix44(quat);
        return rotateMat;
      }
    }, {
      key: 'className',
      get: function get() {
        return this.constructor.name;
      }
    }, {
      key: 'm00',
      set: function set(val) {
        this.m[0] = val;
      },
      get: function get() {
        return this.m[0];
      }
    }, {
      key: 'm10',
      set: function set(val) {
        this.m[1] = val;
      },
      get: function get() {
        return this.m[1];
      }
    }, {
      key: 'm20',
      set: function set(val) {
        this.m[2] = val;
      },
      get: function get() {
        return this.m[2];
      }
    }, {
      key: 'm30',
      set: function set(val) {
        this.m[3] = val;
      },
      get: function get() {
        return this.m[3];
      }
    }, {
      key: 'm01',
      set: function set(val) {
        this.m[4] = val;
      },
      get: function get() {
        return this.m[4];
      }
    }, {
      key: 'm11',
      set: function set(val) {
        this.m[5] = val;
      },
      get: function get() {
        return this.m[5];
      }
    }, {
      key: 'm21',
      set: function set(val) {
        this.m[6] = val;
      },
      get: function get() {
        return this.m[6];
      }
    }, {
      key: 'm31',
      set: function set(val) {
        this.m[7] = val;
      },
      get: function get() {
        return this.m[7];
      }
    }, {
      key: 'm02',
      set: function set(val) {
        this.m[8] = val;
      },
      get: function get() {
        return this.m[8];
      }
    }, {
      key: 'm12',
      set: function set(val) {
        this.m[9] = val;
      },
      get: function get() {
        return this.m[9];
      }
    }, {
      key: 'm22',
      set: function set(val) {
        this.m[10] = val;
      },
      get: function get() {
        return this.m[10];
      }
    }, {
      key: 'm32',
      set: function set(val) {
        this.m[11] = val;
      },
      get: function get() {
        return this.m[11];
      }
    }, {
      key: 'm03',
      set: function set(val) {
        this.m[12] = val;
      },
      get: function get() {
        return this.m[12];
      }
    }, {
      key: 'm13',
      set: function set(val) {
        this.m[13] = val;
      },
      get: function get() {
        return this.m[13];
      }
    }, {
      key: 'm23',
      set: function set(val) {
        this.m[14] = val;
      },
      get: function get() {
        return this.m[14];
      }
    }, {
      key: 'm33',
      set: function set(val) {
        this.m[15] = val;
      },
      get: function get() {
        return this.m[15];
      }
    }], [{
      key: 'identity',
      value: function identity() {
        return new Matrix44(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'translate',
      value: function translate(vec) {
        return new Matrix44(1, 0, 0, vec.x, 0, 1, 0, vec.y, 0, 0, 1, vec.z, 0, 0, 0, 1);
      }
    }, {
      key: 'scale',
      value: function scale(vec) {
        return new Matrix44(vec.x, 0, 0, 0, 0, vec.y, 0, 0, 0, 0, vec.z, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateX',
      value: function rotateX(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix44(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateY',
      value: function rotateY(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix44(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateZ',
      value: function rotateZ(angle) {
        var radian = 0;
        if (GLBoost$1["VALUE_ANGLE_UNIT"] === GLBoost$1.DEGREE) {
          radian = MathUtil.degreeToRadian(angle);
        } else {
          radian = angle;
        }

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Matrix44(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
    }, {
      key: 'rotateXYZ',
      value: function rotateXYZ(x, y, z) {
        return new Matrix44(Matrix33.rotateZ(z).multiply(Matrix33.rotateY(y).multiply(Matrix33.rotateX(x))));
      }
    }, {
      key: 'zero',
      value: function zero() {
        return new Matrix44(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    }, {
      key: 'transpose',
      value: function transpose(mat) {

        var mat_t = new Matrix44(mat.m00, mat.m10, mat.m20, mat.m30, mat.m01, mat.m11, mat.m21, mat.m31, mat.m02, mat.m12, mat.m22, mat.m32, mat.m03, mat.m13, mat.m23, mat.m33);

        return mat_t;
      }
    }, {
      key: 'multiply',
      value: function multiply(l_m, r_m) {
        var m00 = l_m.m00 * r_m.m00 + l_m.m01 * r_m.m10 + l_m.m02 * r_m.m20 + l_m.m03 * r_m.m30;
        var m10 = l_m.m10 * r_m.m00 + l_m.m11 * r_m.m10 + l_m.m12 * r_m.m20 + l_m.m13 * r_m.m30;
        var m20 = l_m.m20 * r_m.m00 + l_m.m21 * r_m.m10 + l_m.m22 * r_m.m20 + l_m.m23 * r_m.m30;
        var m30 = l_m.m30 * r_m.m00 + l_m.m31 * r_m.m10 + l_m.m32 * r_m.m20 + l_m.m33 * r_m.m30;

        var m01 = l_m.m00 * r_m.m01 + l_m.m01 * r_m.m11 + l_m.m02 * r_m.m21 + l_m.m03 * r_m.m31;
        var m11 = l_m.m10 * r_m.m01 + l_m.m11 * r_m.m11 + l_m.m12 * r_m.m21 + l_m.m13 * r_m.m31;
        var m21 = l_m.m20 * r_m.m01 + l_m.m21 * r_m.m11 + l_m.m22 * r_m.m21 + l_m.m23 * r_m.m31;
        var m31 = l_m.m30 * r_m.m01 + l_m.m31 * r_m.m11 + l_m.m32 * r_m.m21 + l_m.m33 * r_m.m31;

        var m02 = l_m.m00 * r_m.m02 + l_m.m01 * r_m.m12 + l_m.m02 * r_m.m22 + l_m.m03 * r_m.m32;
        var m12 = l_m.m10 * r_m.m02 + l_m.m11 * r_m.m12 + l_m.m12 * r_m.m22 + l_m.m13 * r_m.m32;
        var m22 = l_m.m20 * r_m.m02 + l_m.m21 * r_m.m12 + l_m.m22 * r_m.m22 + l_m.m23 * r_m.m32;
        var m32 = l_m.m30 * r_m.m02 + l_m.m31 * r_m.m12 + l_m.m32 * r_m.m22 + l_m.m33 * r_m.m32;

        var m03 = l_m.m00 * r_m.m03 + l_m.m01 * r_m.m13 + l_m.m02 * r_m.m23 + l_m.m03 * r_m.m33;
        var m13 = l_m.m10 * r_m.m03 + l_m.m11 * r_m.m13 + l_m.m12 * r_m.m23 + l_m.m13 * r_m.m33;
        var m23 = l_m.m20 * r_m.m03 + l_m.m21 * r_m.m13 + l_m.m22 * r_m.m23 + l_m.m23 * r_m.m33;
        var m33 = l_m.m30 * r_m.m03 + l_m.m31 * r_m.m13 + l_m.m32 * r_m.m23 + l_m.m33 * r_m.m33;

        return new Matrix44(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }, {
      key: 'determinant',
      value: function determinant(mat) {
        return mat.m00 * mat.m11 * mat.m22 * mat.m33 + mat.m00 * mat.m12 * mat.m23 * mat.m31 + mat.m00 * mat.m13 * mat.m21 * mat.m32 + mat.m01 * mat.m10 * mat.m23 * mat.m32 + mat.m01 * mat.m12 * mat.m20 * mat.m33 + mat.m01 * mat.m13 * mat.m22 * mat.m30 + mat.m02 * mat.m10 * mat.m21 * mat.m33 + mat.m02 * mat.m11 * mat.m23 * mat.m30 + mat.m02 * mat.m13 * mat.m20 * mat.m31 + mat.m03 * mat.m10 * mat.m22 * mat.m31 + mat.m03 * mat.m11 * mat.m20 * mat.m32 + mat.m03 * mat.m12 * mat.m21 * mat.m30 - mat.m00 * mat.m11 * mat.m23 * mat.m32 - mat.m00 * mat.m12 * mat.m21 * mat.m33 - mat.m00 * mat.m13 * mat.m22 * mat.m31 - mat.m01 * mat.m10 * mat.m22 * mat.m33 - mat.m01 * mat.m12 * mat.m23 * mat.m30 - mat.m01 * mat.m13 * mat.m20 * mat.m32 - mat.m02 * mat.m10 * mat.m23 * mat.m31 - mat.m02 * mat.m11 * mat.m20 * mat.m33 - mat.m02 * mat.m13 * mat.m21 * mat.m30 - mat.m03 * mat.m10 * mat.m21 * mat.m32 - mat.m03 * mat.m11 * mat.m22 * mat.m30 - mat.m03 * mat.m12 * mat.m20 * mat.m31;
      }
    }, {
      key: 'invert',
      value: function invert(mat) {
        var det = mat.determinant();
        var m00 = (mat.m11 * mat.m22 * mat.m33 + mat.m12 * mat.m23 * mat.m31 + mat.m13 * mat.m21 * mat.m32 - mat.m11 * mat.m23 * mat.m32 - mat.m12 * mat.m21 * mat.m33 - mat.m13 * mat.m22 * mat.m31) / det;
        var m01 = (mat.m01 * mat.m23 * mat.m32 + mat.m02 * mat.m21 * mat.m33 + mat.m03 * mat.m22 * mat.m31 - mat.m01 * mat.m22 * mat.m33 - mat.m02 * mat.m23 * mat.m31 - mat.m03 * mat.m21 * mat.m32) / det;
        var m02 = (mat.m01 * mat.m12 * mat.m33 + mat.m02 * mat.m13 * mat.m31 + mat.m03 * mat.m11 * mat.m32 - mat.m01 * mat.m13 * mat.m32 - mat.m02 * mat.m11 * mat.m33 - mat.m03 * mat.m12 * mat.m31) / det;
        var m03 = (mat.m01 * mat.m13 * mat.m22 + mat.m02 * mat.m11 * mat.m23 + mat.m03 * mat.m12 * mat.m21 - mat.m01 * mat.m12 * mat.m23 - mat.m02 * mat.m13 * mat.m21 - mat.m03 * mat.m11 * mat.m22) / det;
        var m10 = (mat.m10 * mat.m23 * mat.m32 + mat.m12 * mat.m20 * mat.m33 + mat.m13 * mat.m22 * mat.m30 - mat.m10 * mat.m22 * mat.m33 - mat.m12 * mat.m23 * mat.m30 - mat.m13 * mat.m20 * mat.m32) / det;
        var m11 = (mat.m00 * mat.m22 * mat.m33 + mat.m02 * mat.m23 * mat.m30 + mat.m03 * mat.m20 * mat.m32 - mat.m00 * mat.m23 * mat.m32 - mat.m02 * mat.m20 * mat.m33 - mat.m03 * mat.m22 * mat.m30) / det;
        var m12 = (mat.m00 * mat.m13 * mat.m32 + mat.m02 * mat.m10 * mat.m33 + mat.m03 * mat.m12 * mat.m30 - mat.m00 * mat.m12 * mat.m33 - mat.m02 * mat.m13 * mat.m30 - mat.m03 * mat.m10 * mat.m32) / det;
        var m13 = (mat.m00 * mat.m12 * mat.m23 + mat.m02 * mat.m13 * mat.m20 + mat.m03 * mat.m10 * mat.m22 - mat.m00 * mat.m13 * mat.m22 - mat.m02 * mat.m10 * mat.m23 - mat.m03 * mat.m12 * mat.m20) / det;
        var m20 = (mat.m10 * mat.m21 * mat.m33 + mat.m11 * mat.m23 * mat.m30 + mat.m13 * mat.m20 * mat.m31 - mat.m10 * mat.m23 * mat.m31 - mat.m11 * mat.m20 * mat.m33 - mat.m13 * mat.m21 * mat.m30) / det;
        var m21 = (mat.m00 * mat.m23 * mat.m31 + mat.m01 * mat.m20 * mat.m33 + mat.m03 * mat.m21 * mat.m30 - mat.m00 * mat.m21 * mat.m33 - mat.m01 * mat.m23 * mat.m30 - mat.m03 * mat.m20 * mat.m31) / det;
        var m22 = (mat.m00 * mat.m11 * mat.m33 + mat.m01 * mat.m13 * mat.m30 + mat.m03 * mat.m10 * mat.m31 - mat.m00 * mat.m13 * mat.m31 - mat.m01 * mat.m10 * mat.m33 - mat.m03 * mat.m11 * mat.m30) / det;
        var m23 = (mat.m00 * mat.m13 * mat.m21 + mat.m01 * mat.m10 * mat.m23 + mat.m03 * mat.m11 * mat.m20 - mat.m00 * mat.m11 * mat.m23 - mat.m01 * mat.m13 * mat.m20 - mat.m03 * mat.m10 * mat.m21) / det;
        var m30 = (mat.m10 * mat.m22 * mat.m31 + mat.m11 * mat.m20 * mat.m32 + mat.m12 * mat.m21 * mat.m30 - mat.m10 * mat.m21 * mat.m32 - mat.m11 * mat.m22 * mat.m30 - mat.m12 * mat.m20 * mat.m31) / det;
        var m31 = (mat.m00 * mat.m21 * mat.m32 + mat.m01 * mat.m22 * mat.m30 + mat.m02 * mat.m20 * mat.m31 - mat.m00 * mat.m22 * mat.m31 - mat.m01 * mat.m20 * mat.m32 - mat.m02 * mat.m21 * mat.m30) / det;
        var m32 = (mat.m00 * mat.m12 * mat.m31 + mat.m01 * mat.m10 * mat.m32 + mat.m02 * mat.m11 * mat.m30 - mat.m00 * mat.m11 * mat.m32 - mat.m01 * mat.m12 * mat.m30 - mat.m02 * mat.m10 * mat.m31) / det;
        var m33 = (mat.m00 * mat.m11 * mat.m22 + mat.m01 * mat.m12 * mat.m20 + mat.m02 * mat.m10 * mat.m21 - mat.m00 * mat.m12 * mat.m21 - mat.m01 * mat.m10 * mat.m22 - mat.m02 * mat.m11 * mat.m20) / det;

        return new Matrix44(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      }
    }]);
    return Matrix44;
  }();


  GLBoost$1["Matrix44"] = Matrix44$1;

  var MathClassUtil = function () {
    function MathClassUtil() {
      babelHelpers.classCallCheck(this, MathClassUtil);
    }

    babelHelpers.createClass(MathClassUtil, null, [{
      key: 'arrayToVector',
      value: function arrayToVector(element) {
        if (Array.isArray(element)) {
          if (typeof element[3] !== 'undefined') {
            return new Vector4$1(element[0], element[1], element[2], element[3]);
          } else if (typeof element[2] !== 'undefined') {
            return new Vector3(element[0], element[1], element[2]);
          } else {
            return new Vector2(element[0], element[1]);
          }
        } else {
          return element;
        }
      }
    }, {
      key: 'arrayToVectorOrMatrix',
      value: function arrayToVectorOrMatrix(element) {
        if (Array.isArray(element)) {
          if (typeof element[15] !== 'undefined') {
            return new Matrix44$1(element);
          } else if (typeof element[8] !== 'undefined') {
            return new Matrix33(element);
          } else if (typeof element[3] !== 'undefined') {
            return new Vector4$1(element[0], element[1], element[2], element[3]);
          } else if (typeof element[2] !== 'undefined') {
            return new Vector3(element[0], element[1], element[2]);
          } else {
            return new Vector2(element[0], element[1]);
          }
        } else {
          return element;
        }
      }
    }, {
      key: 'cloneOfMathObjects',
      value: function cloneOfMathObjects(element) {
        if (element instanceof Matrix44$1) {
          return element.clone();
        } else if (element instanceof Matrix33) {
          return element.clone();
        } else if (element instanceof Vector4$1) {
          return element.clone();
        } else if (element instanceof Vector3) {
          return element.clone();
        } else if (element instanceof Vector2) {
          return element.clone();
        } else {
          return element;
        }
      }
    }, {
      key: 'arrayToQuaternion',
      value: function arrayToQuaternion(element) {
        if (Array.isArray(element)) {
          if (typeof element[3] !== 'undefined') {
            return new Quaternion(element[0], element[1], element[2], element[3]);
          }
        } else {
          return element;
        }
      }
    }, {
      key: 'makeSubArray',
      value: function makeSubArray(array, componentN) {
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
    }, {
      key: 'vectorToArray',
      value: function vectorToArray(element) {
        if (element instanceof Vector2) {
          return [element.x, element.y];
        } else if (element instanceof Vector3) {
          return [element.x, element.y, element.z];
        } else if (element instanceof Vector4$1 || element instanceof Quaternion) {
          return [element.x, element.y, element.z, element.w];
        } else {
          return element;
        }
      }
    }, {
      key: 'compomentNumberOfVector',
      value: function compomentNumberOfVector(element) {
        if (element instanceof Vector2) {
          return 2;
        } else if (element instanceof Vector3) {
          return 3;
        } else if (element instanceof Vector4$1 || element instanceof Quaternion) {
          return 4;
        } else if (Array.isArray(element)) {
          return element.length;
        } else {
          return 0;
        }
      }
    }, {
      key: 'packNormalizedVec4ToVec2',
      value: function packNormalizedVec4ToVec2(x, y, z, w, criteria) {
        var v0 = 0.0;
        var v1 = 0.0;

        x = (x + 1) / 2.0;
        y = (y + 1) / 2.0;
        z = (z + 1) / 2.0;
        w = (w + 1) / 2.0;

        var ir = Math.floor(x * (criteria - 1.0));
        var ig = Math.floor(y * (criteria - 1.0));
        var irg = ir * criteria + ig;
        v0 = irg / criteria;

        var ib = Math.floor(z * (criteria - 1.0));
        var ia = Math.floor(w * (criteria - 1.0));
        var iba = ib * criteria + ia;
        v1 = iba / criteria;

        return [v0, v1];
      }
    }, {
      key: 'unProject',
      value: function unProject(windowPosVec3, inversePVMat44, viewportVec4, zNear, zFar) {
        var input = new Vector4$1((windowPosVec3.x - viewportVec4.x) / viewportVec4.z * 2 - 1.0, (windowPosVec3.y - viewportVec4.y) / viewportVec4.w * 2 - 1.0, 2 * windowPosVec3.z - 1.0, 1.0);

        var PVMat44 = inversePVMat44;

        var out = PVMat44.multiplyVector(input);


        if (out.w === 0) {
          console.warn("Zero division!");
        }

        var output = new Vector3(out.multiply(1 / out.w));

        return output;
      }
    }]);
    return MathClassUtil;
  }();


  GLBoost$1["MathClassUtil"] = MathClassUtil;

  var AnimationUtil = function () {
    function AnimationUtil() {
      babelHelpers.classCallCheck(this, AnimationUtil);
    }

    babelHelpers.createClass(AnimationUtil, null, [{
      key: 'lerp',
      value: function lerp(start, end, ratio, componentN) {
        if (componentN === 1) {
          return start * (1 - ratio) + end * ratio;
        } else {
          if (start instanceof Quaternion) {
            return Quaternion.qlerp(start, end, ratio);
          } else {
            return start.multiply(1 - ratio).add(end.multiply(ratio));
          }
        }
      }
    }, {
      key: 'interpolate',
      value: function interpolate(inputArray, outputArray, input, componentN) {
        var method = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : GLBoost$1.INTERPOLATION_LINEAR;

        if (input < inputArray[0]) {
          return outputArray[0].clone();
        }
        if (inputArray[inputArray.length - 1] <= input) {
          return outputArray[outputArray.length - 1].clone();
        }

        if (method === GLBoost$1.INTERPOLATION_LINEAR) {
          for (var i = 0; i < inputArray.length; i++) {
            if (typeof inputArray[i + 1] === "undefined") {
              break;
            }
            if (inputArray[i] <= input && input < inputArray[i + 1]) {
              var ratio = (input - inputArray[i]) / (inputArray[i + 1] - inputArray[i]);
              var resultValue = this.lerp(outputArray[i].clone(), outputArray[i + 1].clone(), ratio, componentN);
              return resultValue;
            }
          }
        } else if (method === GLBoost$1.INTERPOLATION_STEP) {
          for (var _i = 0; _i < inputArray.length; _i++) {
            if (typeof inputArray[_i + 1] === "undefined") {
              break;
            }
            if (inputArray[_i] <= input && input < inputArray[_i + 1]) {
              return outputArray[_i].clone();
            }
          }
        }
        return outputArray[0].clone();
      }
    }]);
    return AnimationUtil;
  }();

  var L_Element = function (_GLBoostObject) {
    babelHelpers.inherits(L_Element, _GLBoostObject);

    function L_Element(glBoostSystem) {
      var toRegister = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      babelHelpers.classCallCheck(this, L_Element);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_Element.__proto__ || Object.getPrototypeOf(L_Element)).call(this, glBoostSystem, toRegister));

      _this._translate = Vector3.zero();
      _this._scale = new Vector3(1, 1, 1);
      _this._rotate = Vector3.zero();
      _this._quaternion = new Quaternion(0, 0, 0, 1);
      _this._matrix = Matrix44$1.identity();
      _this._invMatrix = Matrix44$1.identity();

      _this._updateCountAsElement = 0;
      _this._animationLine = {};
      _this._currentAnimationInputValues = {};
      _this._activeAnimationLineName = null;

      _this._is_trs_matrix_updated = true;
      _this._is_translate_updated = true;
      _this._is_scale_updated = true;
      _this._is_quaternion_updated = true;
      _this._is_euler_angles_updated = true;
      _this._is_inverse_trs_matrix_updated = true;
      return _this;
    }

    babelHelpers.createClass(L_Element, [{
      key: '_needUpdate',
      value: function _needUpdate() {
        this._updateCountAsElement++;
      }
    }, {
      key: '_getAnimatedTransformValue',
      value: function _getAnimatedTransformValue(value, animation, type) {
        if (typeof animation !== 'undefined' && animation[type] && value !== null && value !== void 0) {
          return AnimationUtil.interpolate(animation[type].input, animation[type].output, value, animation[type].outputComponentN, animation[type].interpolationMethod);
        } else {
          return null;
        }
      }
    }, {
      key: '_getCurrentAnimationInputValue',
      value: function _getCurrentAnimationInputValue(inputName) {
        var value = this._currentAnimationInputValues[inputName];
        if (typeof value === 'number') {
          return value;
        } else {
          return null;
        }
      }
    }, {
      key: 'setAnimationAtLine',
      value: function setAnimationAtLine(lineName, attributeName, inputArray, outputArray, interpolationMethod) {
        var outputComponentN = 0;
        if (outputArray[0] instanceof Vector2) {
          outputComponentN = 2;
        } else if (outputArray[0] instanceof Vector3) {
          outputComponentN = 3;
        } else if (outputArray[0] instanceof Vector4$1) {
          outputComponentN = 4;
        } else if (outputArray[0] instanceof Quaternion) {
          outputComponentN = 4;
        } else {
          outputComponentN = 1;
        }
        if (!this._animationLine[lineName]) {
          this._animationLine[lineName] = {};
        }
        this._animationLine[lineName][attributeName] = {
          input: inputArray,
          output: outputArray,
          outputAttribute: attributeName,
          outputComponentN: outputComponentN,
          interpolationMethod: interpolationMethod
        };
      }
    }, {
      key: 'hasAnimation',
      value: function hasAnimation(lineName) {
        if (this._animationLine[lineName]) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'getStartInputValueOfAnimation',
      value: function getStartInputValueOfAnimation(lineName) {
        var inputLine = this._animationLine[lineName];
        var latestInputValue = Number.MAX_VALUE;
        if (typeof inputLine === 'undefined') {
          return latestInputValue;
        }
        for (var attributeName in inputLine) {
          var inputValueArray = inputLine[attributeName].input;
          var inputLatestValueAtThisAttribute = inputValueArray[0];
          if (inputLatestValueAtThisAttribute < latestInputValue) {
            latestInputValue = inputLatestValueAtThisAttribute;
          }
        }
        return latestInputValue;
      }
    }, {
      key: 'getEndInputValueOfAnimation',
      value: function getEndInputValueOfAnimation(lineName) {
        var inputLine = this._animationLine[lineName];
        var latestInputValue = -Number.MAX_VALUE;
        if (typeof inputLine === 'undefined') {
          return latestInputValue;
        }
        for (var attributeName in inputLine) {
          var inputValueArray = inputLine[attributeName].input;
          var inputLatestValueAtThisAttribute = inputValueArray[inputValueArray.length - 1];
          if (inputLatestValueAtThisAttribute > latestInputValue) {
            latestInputValue = inputLatestValueAtThisAttribute;
          }
        }
        return latestInputValue;
      }
    }, {
      key: 'setCurrentAnimationValue',
      value: function setCurrentAnimationValue(inputName, inputValue) {
        this._setDirtyToAnimatedElement(inputName);
        this._currentAnimationInputValues[inputName] = inputValue;
      }
    }, {
      key: 'removeCurrentAnimationValue',
      value: function removeCurrentAnimationValue(inputName) {
        delete this._currentAnimationInputValues[inputName];
      }
    }, {
      key: 'setActiveAnimationLine',
      value: function setActiveAnimationLine(lineName) {
        this._activeAnimationLineName = lineName;
      }
    }, {
      key: 'getTranslateNotAnimated',
      value: function getTranslateNotAnimated() {
        if (this._is_translate_updated) {
          return this._translate.clone();
        } else if (this._is_trs_matrix_updated) {
          this._translate.x = this._matrix.m03;
          this._translate.y = this._matrix.m13;
          this._translate.z = this._matrix.m23;
          this._is_translate_updated = true;
        }
        return this._translate.clone();
      }
    }, {
      key: 'getTranslateAt',
      value: function getTranslateAt(lineName, inputValue) {
        var value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'translate');
        if (value !== null) {
          this._translate = value;
          this._is_translate_updated = true;
        }
        return value;
      }
    }, {
      key: 'getTranslateAtOrStatic',
      value: function getTranslateAtOrStatic(lineName, inputValue) {
        var value = this.getTranslateAt(lineName, inputValue);
        if (value === null) {
          return this.getTranslateNotAnimated();
        }
        return value;
      }
    }, {
      key: 'getRotateAt',
      value: function getRotateAt(lineName, inputValue) {
        var value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'rotate');
        if (value !== null) {
          this._rotate = value;
          this._is_euler_angles_updated = true;
        }
        return value;
      }
    }, {
      key: 'getRotateAtOrStatic',
      value: function getRotateAtOrStatic(lineName, inputValue) {
        var value = null;
        if (this._activeAnimationLineName) {
          value = this.getRotateAt(this._activeAnimationLineName, inputValue);
        }
        if (value === null) {
          return this.getRotateNotAnimated();
        }
        return value;
      }
    }, {
      key: 'getRotateNotAnimated',
      value: function getRotateNotAnimated() {
        if (this._is_euler_angles_updated) {
          return this._rotate.clone();
        } else if (this._is_trs_matrix_updated) {
          this._rotate = this._matrix.toEulerAngles();
        } else if (this._is_quaternion_updated) {
          this._rotate = new Matrix44$1(this._quaternion).toEulerAngles();
        }

        this._is_euler_angles_updated = true;
        return this._rotate.clone();
      }
    }, {
      key: 'getScaleAt',
      value: function getScaleAt(lineName, inputValue) {
        var value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'scale');
        if (value !== null) {
          this._scale = value.clone();
          this._is_scale_updated = true;
        }
        return value;
      }
    }, {
      key: 'getScaleAtOrStatic',
      value: function getScaleAtOrStatic(lineName, inputValue) {
        var value = this.getScaleAt(lineName, inputValue);
        if (value === null) {
          return this.getScaleNotAnimated();
        }
        return value;
      }
    }, {
      key: 'getScaleNotAnimated',
      value: function getScaleNotAnimated() {
        if (this._is_scale_updated) {
          return this._scale.clone();
        } else if (this._is_trs_matrix_updated) {
          var m = this._matrix;
          this._scale = m.getScale();
          this._is_scale_updated = true;
        }

        return this._scale.clone();
      }
    }, {
      key: 'getMatrixAt',
      value: function getMatrixAt(lineName, inputValue) {
        var value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'matrix');
        if (value !== null) {
          this._translate = value;
          this._is_translate_updated = true;
        }
        return value;
      }
    }, {
      key: 'getMatrixNotAnimated',
      value: function getMatrixNotAnimated() {

        if (this._is_trs_matrix_updated) {
          return this._matrix.clone();
        }

        var rotationMatrix = new Matrix44$1(this.getQuaternionNotAnimated());

        var scale = this.getScaleNotAnimated();

        this._matrix = Matrix44$1.multiply(rotationMatrix, Matrix44$1.scale(scale));
        var translateVec = this.getTranslateNotAnimated();
        this._matrix.m03 = translateVec.x;
        this._matrix.m13 = translateVec.y;
        this._matrix.m23 = translateVec.z;

        this._is_trs_matrix_updated = true;

        return this._matrix.clone();
      }
    }, {
      key: 'isTrsMatrixNeeded',
      value: function isTrsMatrixNeeded(lineName, inputValue) {
        var result = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'translate') === null && this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'rotate') === null && this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'quaternion') === null && this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'scale') === null;
        return result;
      }
    }, {
      key: 'getMatrixAtOrStatic',
      value: function getMatrixAtOrStatic(lineName, inputValue) {
        var input = inputValue;

        if (this.isTrsMatrixNeeded(lineName, inputValue) && this._is_trs_matrix_updated) {
          return this.getMatrixNotAnimated();
        } else {

          var quaternion = this.getQuaternionAtOrStatic(lineName, input);
          var rotationMatrix = new Matrix44$1(quaternion);

          var scale = this.getScaleAtOrStatic(lineName, input);

          this._matrix = Matrix44$1.multiply(rotationMatrix, Matrix44$1.scale(scale));
          var translateVec = this.getTranslateAtOrStatic(lineName, input);
          this._matrix.m03 = translateVec.x;
          this._matrix.m13 = translateVec.y;
          this._matrix.m23 = translateVec.z;

          this._is_trs_matrix_updated = true;

          return this._matrix.clone();
        }
      }
    }, {
      key: 'getQuaternionAt',
      value: function getQuaternionAt(lineName, inputValue) {
        var value = this._getAnimatedTransformValue(inputValue, this._animationLine[lineName], 'quaternion');
        if (value !== null) {
          this._quaternion = value;
          this._is_quaternion_updated = true;
        }
        return value;
      }
    }, {
      key: 'getQuaternionAtOrStatic',
      value: function getQuaternionAtOrStatic(lineName, inputValue) {
        var value = this.getQuaternionAt(lineName, inputValue);
        if (value === null) {
          return this.getQuaternionNotAnimated();
        }
        return value;
      }
    }, {
      key: 'getQuaternionNotAnimated',
      value: function getQuaternionNotAnimated() {
        var value = null;
        if (this._is_quaternion_updated) {
          return this._quaternion.clone();
        } else if (!this._is_quaternion_updated) {
          if (this._is_trs_matrix_updated) {
            value = Quaternion.fromMatrix(this._matrix);
          } else if (this._is_euler_angles_updated) {
            value = Quaternion.fromMatrix(Matrix44$1.rotateXYZ(this._rotate.x, this._rotate.y, this._rotate.z));
          } else {
            console.log('Not Quaternion Updated in error!');
          }
          this._quaternion = value;
          this._is_quaternion_updated = true;
        }

        return this._quaternion.clone();
      }
    }, {
      key: '__updateTransform',
      value: function __updateTransform() {
        this.__updateRotation();
        this.__updateTranslate();
        this.__updateScale();
        this.__updateMatrix();
        this._needUpdate();
      }
    }, {
      key: '__updateRotation',
      value: function __updateRotation() {
        if (this._is_euler_angles_updated && !this._is_quaternion_updated) {
          this._quaternion = Quaternion.fromMatrix(Matrix44$1.rotateXYZ(this._rotate.x, this._rotate.y, this._rotate.z));
          this._is_quaternion_updated = true;
        } else if (!this._is_euler_angles_updated && this._is_quaternion_updated) {
          this._rotate = new Matrix44$1(this._quaternion).toEulerAngles();
          this._is_euler_angles_updated = true;
        } else if (!this._is_euler_angles_updated && !this._is_quaternion_updated && this._is_trs_matrix_updated) {
          var m = this._matrix;
          this._quaternion = Quaternion.fromMatrix(m);
          this._is_quaternion_updated = true;
          this._rotate = m.toEulerAngles();
          this._is_euler_angles_updated = true;
        }
      }
    }, {
      key: '__updateTranslate',
      value: function __updateTranslate() {
        if (!this._is_translate_updated && this._is_trs_matrix_updated) {
          var m = this._matrix;
          this._translate.x = m.m03;
          this._translate.y = m.m13;
          this._translate.z = m.m23;
          this._is_translate_updated = true;
        }
      }
    }, {
      key: '__updateScale',
      value: function __updateScale() {
        if (!this._is_scale_updated && this._is_trs_matrix_updated) {
          var m = this._matrix;
          this._scale.x = Math.sqrt(m.m00 * m.m00 + m.m01 * m.m01 + m.m02 * m.m02);
          this._scale.y = Math.sqrt(m.m10 * m.m10 + m.m11 * m.m11 + m.m12 * m.m12);
          this._scale.z = Math.sqrt(m.m20 * m.m20 + m.m21 * m.m21 + m.m22 * m.m22);
          this._is_scale_updated = true;
        }
      }
    }, {
      key: '__updateMatrix',
      value: function __updateMatrix() {
        if (!this._is_trs_matrix_updated && this._is_translate_updated && this._is_quaternion_updated && this._is_scale_updated) {
          var rotationMatrix = new Matrix44$1(this.getQuaternionNotAnimated());

          var scale = this.getScaleNotAnimated();

          this._matrix = Matrix44$1.multiply(rotationMatrix, Matrix44$1.scale(scale));
          var translateVec = this.getTranslateNotAnimated();
          this._matrix.m03 = translateVec.x;
          this._matrix.m13 = translateVec.y;
          this._matrix.m23 = translateVec.z;

          this._is_trs_matrix_updated = true;
        }
      }
    }, {
      key: '_copy',
      value: function _copy(instance) {
        babelHelpers.get(L_Element.prototype.__proto__ || Object.getPrototypeOf(L_Element.prototype), '_copy', this).call(this, instance);

        instance._translate = this._translate.clone();
        instance._scale = this._scale.clone();
        instance._rotate = this._rotate.clone();
        instance._quaternion = this._quaternion.clone();
        instance._matrix = this._matrix.clone();

        instance._animationLine = {};

        for (var lineName in this._animationLine) {
          instance._animationLine[lineName] = {};
          for (var attributeName in this._animationLine[lineName]) {
            instance._animationLine[lineName][attributeName] = {};
            instance._animationLine[lineName][attributeName].input = this._animationLine[lineName][attributeName].input.concat();

            var instanceOutput = [];
            var thisOutput = this._animationLine[lineName][attributeName].output;
            for (var i = 0; i < thisOutput.length; i++) {
              instanceOutput.push(typeof thisOutput[i] === 'number' ? thisOutput[i] : thisOutput[i].clone());
            }
            instance._animationLine[lineName][attributeName].output = instanceOutput;

            instance._animationLine[lineName][attributeName].outputAttribute = this._animationLine[lineName][attributeName].outputAttribute;

            instance._animationLine[lineName][attributeName].outputComponentN = this._animationLine[lineName][attributeName].outputComponentN;
          }
        }

        instance._is_trs_matrix_updated = this._is_trs_matrix_updated;
        instance._is_translate_updated = this._is_translate_updated;
        instance._is_scale_updated = this._is_scale_updated;
        instance._is_quaternion_updated = this._is_quaternion_updated;
        instance._is_euler_angles_updated = this._is_euler_angles_updated;
        instance._is_inverse_trs_matrix_updated = this._is_inverse_trs_matrix_updated;

        instance._updateCountAsElement = this._updateCountAsElement;
      }
    }, {
      key: 'setPropertiesFromJson',
      value: function setPropertiesFromJson(arg) {
        var json = arg;
        if (typeof arg === "string") {
          json = JSON.parse(arg);
        }
        for (var key in json) {
          if (json.hasOwnProperty(key) && key in this) {
            if (key === "quaternion") {
              this[key] = MathClassUtil.arrayToQuaternion(json[key]);
            } else {
              this[key] = MathClassUtil.arrayToVectorOrMatrix(json[key]);
            }
          }
        }
      }
    }, {
      key: 'setRotationFromNewUpAndFront',
      value: function setRotationFromNewUpAndFront(UpVec, FrontVec) {
        var yDir = UpVec;
        var xDir = Vector3.cross(yDir, FrontVec);
        var zDir = Vector3.cross(xDir, yDir);

        var rotateMatrix = Matrix44$1.identity();

        rotateMatrix.m00 = xDir.x;
        rotateMatrix.m10 = xDir.y;
        rotateMatrix.m20 = xDir.z;

        rotateMatrix.m01 = yDir.x;
        rotateMatrix.m11 = yDir.y;
        rotateMatrix.m21 = yDir.z;

        rotateMatrix.m02 = zDir.x;
        rotateMatrix.m12 = zDir.y;
        rotateMatrix.m22 = zDir.z;

        this.rotateMatrix33 = rotateMatrix;
      }
    }, {
      key: 'headToDirection',
      value: function headToDirection(fromVec, toVec) {
        var fromDir = Vector3.normalize(fromVec);
        var toDir = Vector3.normalize(toVec);
        var rotationDir = Vector3.cross(fromDir, toDir);
        var cosTheta = Vector3.dotProduct(fromDir, toDir);
        var theta = Math.acos(cosTheta);
        if (GLBoost["VALUE_ANGLE_UNIT"] === GLBoost.DEGREE) {
          theta = MathUtil.radianToDegree(theta);
        }
        this.quaternion = Quaternion.axisAngle(rotationDir, theta);
      }
    }, {
      key: 'updateCountAsElement',
      get: function get() {
        return this._updateCountAsElement;
      }
    }, {
      key: 'translate',
      set: function set(vec) {
        this._translate = vec.clone();
        this._is_translate_updated = true;
        this._is_trs_matrix_updated = false;
        this._is_inverse_trs_matrix_updated = false;

        this.__updateTransform();
      },
      get: function get() {
        return this.getTranslateAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
      }
    }, {
      key: 'rotate',
      set: function set(vec) {

        this._rotate = vec.clone();
        this._is_euler_angles_updated = true;
        this._is_quaternion_updated = false;
        this._is_trs_matrix_updated = false;
        this._is_inverse_trs_matrix_updated = false;

        this.__updateTransform();
      },
      get: function get() {
        return this.getRotateAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
      }
    }, {
      key: 'scale',
      set: function set(vec) {
        this._scale = vec.clone();
        this._is_scale_updated = true;
        this._is_trs_matrix_updated = false;
        this._is_inverse_trs_matrix_updated = false;
        this.__updateTransform();
      },
      get: function get() {
        return this.getScaleAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
      }
    }, {
      key: 'matrix',
      set: function set(mat) {
        this._matrix = mat.clone();
        this._is_trs_matrix_updated = true;
        this._is_translate_updated = false;
        this._is_euler_angles_updated = false;
        this._is_quaternion_updated = false;
        this._is_scale_updated = false;
        this._is_inverse_trs_matrix_updated = false;

        this.__updateTransform();
      },
      get: function get() {
        var input = void 0;
        if (this._activeAnimationLineName !== null) {
          input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
        }

        var value = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);

        return value;
      }
    }, {
      key: 'transformMatrix',
      get: function get() {
        var input = void 0;
        if (this._activeAnimationLineName !== null) {
          input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
        }

        var matrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);

        return matrix;
      }
    }, {
      key: 'quaternion',
      set: function set(quat) {
        this._quaternion = quat.clone();
        this._is_quaternion_updated = true;
        this._is_euler_angles_updated = false;
        this._is_trs_matrix_updated = false;
        this._is_inverse_trs_matrix_updated = false;
        this.__updateTransform();
      },
      get: function get() {
        return this.getQuaternionAtOrStatic(this._activeAnimationLineName, this._getCurrentAnimationInputValue(this._activeAnimationLineName));
      }
    }, {
      key: 'inverseTransformMatrix',
      get: function get() {
        if (!this._is_inverse_trs_matrix_updated) {
          this._invMatrix = this.transformMatrix.invert();
          this._is_inverse_trs_matrix_updated = true;
        }
        return this._invMatrix.clone();
      }
    }, {
      key: 'normalMatrix',
      get: function get() {
        return new Matrix33(Matrix44$1.invert(this.transformMatrix).transpose());
      }
    }, {
      key: 'rotateMatrix33',
      set: function set(rotateMatrix) {
        this.quaternion = Quaternion.fromMatrix(rotateMatrix);
      },
      get: function get() {
        return new Matrix33(this.quaternion);
      }
    }]);
    return L_Element;
  }(GLBoostObject);

  var M_Element = function (_L_Element) {
    babelHelpers.inherits(M_Element, _L_Element);

    function M_Element(glBoostContext) {
      babelHelpers.classCallCheck(this, M_Element);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_Element.__proto__ || Object.getPrototypeOf(M_Element)).call(this, glBoostContext));

      _this._parent = null;
      _this._invMatrix = Matrix44$1.identity();
      _this._accumulatedAncestryObjectUpdateNumber = -Number.MAX_VALUE;
      _this._accumulatedAncestryObjectUpdateNumberWithoutMySelf = -Number.MAX_VALUE;
      _this._accumulatedAncestryObjectUpdateNumberNormal = -Number.MAX_VALUE;
      _this._accumulatedAncestryObjectUpdateNumberInv = -Number.MAX_VALUE;
      _this._accumulatedAncestryObjectUpdateNumberJoint = -Number.MAX_VALUE;
      _this._isTransparentForce = null;
      _this._opacity = 1.0;
      _this._isAffectedByWorldMatrix = true;
      _this._isAffectedByWorldMatrixAccumulatedAncestry = true;
      _this._isAffectedByViewMatrix = true;
      _this._isAffectedByProjectionMatrix = true;

      _this._toInheritCurrentAnimationInputValue = true;

      _this._isVisible = true;

      _this._gizmos = [];
      _this._masterElement = null;

      _this._worldMatrix = new Matrix44$1();
      return _this;
    }

    babelHelpers.createClass(M_Element, [{
      key: '_accumulateMyAndParentNameWithUpdateInfo',
      value: function _accumulateMyAndParentNameWithUpdateInfo(currentElem) {
        if (currentElem._parent === null) {
          return currentElem.elementUpdateNumber;
        } else {
          return this._accumulateMyAndParentNameWithUpdateInfo(currentElem._parent) + currentElem.elementUpdateNumber;
        }
      }
    }, {
      key: '_getCurrentAnimationInputValue',
      value: function _getCurrentAnimationInputValue(inputName) {
        var value = this._currentAnimationInputValues[inputName];
        if (typeof value === 'number') {
          return value;
        } else if (this._toInheritCurrentAnimationInputValue && this._parent) {
          var val = this._parent._getCurrentAnimationInputValue(inputName);
          if (val === void 0) {
            val = null;
          }
          return val;
        } else {
          return null;
        }
      }
    }, {
      key: '_setDirtyToAnimatedElement',
      value: function _setDirtyToAnimatedElement(inputName) {
        if (this.hasAnimation(inputName)) {
          this._needUpdate();
        }
      }
    }, {
      key: '_multiplyMyAndParentTransformMatricesInInverseOrder',
      value: function _multiplyMyAndParentTransformMatricesInInverseOrder(withMySelf, input) {
        if (input === void 0 && this._activeAnimationLineName !== null) {
          input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
        }

        var tempNumber = 0;
        if (this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder !== input || this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) || this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder === void 0) {

          var currentMatrix = null;
          if (withMySelf) {
            currentMatrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
          } else {
            currentMatrix = Matrix44$1.identity();
          }

          if (this._parent === null) {
            this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = currentMatrix;
            return currentMatrix;
          }

          this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = Matrix44$1.multiply(currentMatrix, this._parent._multiplyMyAndParentTransformMatricesInInverseOrder(true, input));
          this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder = tempNumber;
          this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder = input;
        }
        return this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder;
      }
    }, {
      key: 'getWorldMatrixWithoutMySelfAt',
      value: function getWorldMatrixWithoutMySelfAt(input) {

        var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);

        if (this._accumulatedWithoutMySelfAncestryObjectUpdateNumber !== tempNumber || this._matrixAccumulatedWithoutMySelfAncestry === void 0) {
          this._matrixAccumulatedWithoutMySelfAncestry = this._multiplyMyAndParentTransformMatrices(false, input);
          this._accumulatedWithoutMySelfAncestryObjectUpdateNumber = tempNumber;
        }

        return this._matrixAccumulatedWithoutMySelfAncestry.clone();
      }
    }, {
      key: '_multiplyMyAndParentRotateMatrices',
      value: function _multiplyMyAndParentRotateMatrices(currentElem, withMySelf) {
        if (currentElem._parent === null) {
          if (withMySelf) {
            return currentElem.transformMatrixOnlyRotate;
          } else {
            return Matrix44$1.identity();
          }
        } else {
          var currentMatrix = Matrix44$1.identity();
          if (withMySelf) {
            currentMatrix = currentElem.transformMatrixOnlyRotate;
          }
          return Matrix44$1.multiply(this._multiplyMyAndParentRotateMatrices(currentElem._parent, true), currentMatrix);
        }
      }
    }, {
      key: '_accumulateMyAndParentOpacity',
      value: function _accumulateMyAndParentOpacity(currentElem) {
        if (currentElem._parent === null) {
          return currentElem.opacity;
        } else {
          return this._accumulateMyAndParentOpacity(currentElem._parent) * currentElem.opacity;
        }
      }
    }, {
      key: 'toStringWithUpdateInfo',
      value: function toStringWithUpdateInfo() {
        return this._instanceName + this._updateCountAsElement;
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender() {}
    }, {
      key: '_copy',
      value: function _copy(instance) {
        babelHelpers.get(M_Element.prototype.__proto__ || Object.getPrototypeOf(M_Element.prototype), '_copy', this).call(this, instance);

        instance._parent = this._parent;
        instance._invMatrix = this._invMatrix.clone();
        instance._is_inverse_trs_matrix_updated = this._is_inverse_trs_matrix_updated;
        instance._accumulatedAncestryObjectUpdateNumber = this._accumulatedAncestryObjectUpdateNumber;
        instance._accumulatedAncestryObjectUpdateNumberNormal = this._accumulatedAncestryObjectUpdateNumberNormal;
        instance._accumulatedAncestryObjectUpdateNumberInv = this._accumulatedAncestryObjectUpdateNumberInv;

        instance._isTransparentForce = this._isTransparentForce;
        instance.opacity = this.opacity;
        instance._activeAnimationLineName = this._activeAnimationLineName;

        instance._currentAnimationInputValues = {};
        for (var inputName in this._currentAnimationInputValues) {
          instance._currentAnimationInputValues[inputName] = this._currentAnimationInputValues[inputName];
        }

        instance._toInheritCurrentAnimationInputValue = this._toInheritCurrentAnimationInputValue;
      }
    }, {
      key: 'getWorldMatrixForJointsAt',
      value: function getWorldMatrixForJointsAt(input) {

        var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);

        if (this._accumulatedAncestryObjectUpdateNumberForJoints !== tempNumber || this._matrixAccumulatedAncestryForJoints === void 0) {
          this._matrixAccumulatedAncestryForJoints = this._multiplyMyAndParentTransformMatricesForJoints(true, input);
          this._accumulatedAncestryObjectUpdateNumberForJoints = tempNumber;
        }

        return this._matrixAccumulatedAncestryForJoints.clone();
      }
    }, {
      key: '_multiplyMyAndParentTransformMatricesForJoints',
      value: function _multiplyMyAndParentTransformMatricesForJoints(withMySelf, input) {
        if (input === void 0 && this._activeAnimationLineName !== null) {
          input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
        }

        var tempNumber = 0;
        if (this.__cache_input_multiplyMyAndParentTransformMatricesForJoints !== input || this.__updateInfoString_multiplyMyAndParentTransformMatricesForJoints !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) || this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints === void 0) {

          var currentMatrix = null;
          if (withMySelf) {
            currentMatrix = this.getRotateTranslateAt(input);
          } else {
            currentMatrix = Matrix44$1.identity();
          }

          if (this._parent === null) {
            this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints = currentMatrix;
            return currentMatrix;
          }

          this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints = Matrix44$1.multiply(this._parent._multiplyMyAndParentTransformMatricesForJoints(true, input), currentMatrix);
          this.__updateInfoString_multiplyMyAndParentTransformMatricesForJoints = tempNumber;
          this.__cache_input_multiplyMyAndParentTransformMatricesForJoints = input;
        }
        return this.__cache_returnValue_multiplyMyAndParentTransformMatricesForJoints;
      }
    }, {
      key: 'getWorldMatrixAt',
      value: function getWorldMatrixAt(input) {

        var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);

        if (this._accumulatedAncestryObjectUpdateNumber !== tempNumber || this._matrixAccumulatedAncestry === void 0) {
          this._matrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatrices(true, input);
          this._accumulatedAncestryObjectUpdateNumber = tempNumber;
        }

        return this._matrixAccumulatedAncestry.clone();
      }
    }, {
      key: '_multiplyMyAndParentTransformMatrices',
      value: function _multiplyMyAndParentTransformMatrices(withMySelf, input) {
        if (input === void 0 && this._activeAnimationLineName !== null) {
          input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
        }

        var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);
        if (this.__updateInfoString_multiplyMyAndParentTransformMatrices !== tempNumber || this.__cache_input_multiplyMyAndParentTransformMatrices !== input || this.__cache_returnValue_multiplyMyAndParentTransformMatrices === void 0) {

          var currentMatrix = null;
          if (withMySelf) {
            currentMatrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
          } else {
            currentMatrix = Matrix44$1.identity();
          }
          if (this._parent === null) {
            this.__cache_returnValue_multiplyMyAndParentTransformMatrices = currentMatrix;
            return currentMatrix;
          }
          this.__cache_returnValue_multiplyMyAndParentTransformMatrices = Matrix44$1.multiply(this._parent._multiplyMyAndParentTransformMatrices(true, input), currentMatrix);
          this.__updateInfoString_multiplyMyAndParentTransformMatrices = tempNumber;
          this.__cache_input_multiplyMyAndParentTransformMatrices = input;
        }
        return this.__cache_returnValue_multiplyMyAndParentTransformMatrices;
      }
    }, {
      key: 'getInverseWorldMatrixAt',
      value: function getInverseWorldMatrixAt(input) {
        var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);

        if (this._accumulatedAncestryObjectUpdateNumberInverse !== tempNumber || this._inverseMatrixAccumulatedAncestry === void 0) {
          this._inverseMatrixAccumulatedAncestry = this._multiplyMyAndParentTransformMatricesInInverseOrder(true, input);
          this._accumulatedAncestryObjectUpdateNumberInverse = tempNumber;
        }

        return this._inverseMatrixAccumulatedAncestry.clone();
      }
    }, {
      key: '_multiplyMyAndParentTransformMatricesInInverseOrder',
      value: function _multiplyMyAndParentTransformMatricesInInverseOrder(withMySelf, input) {
        if (input === null && this._activeAnimationLineName !== null) {
          input = this._getCurrentAnimationInputValue(this._activeAnimationLineName);
        }

        var tempNumber = 0;
        if (input === void 0 || this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder !== input || this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder !== (tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this)) || this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder === void 0) {

          var currentMatrix = null;
          if (withMySelf) {
            currentMatrix = this.getMatrixAtOrStatic(this._activeAnimationLineName, input);
          } else {
            currentMatrix = Matrix44$1.identity();
          }

          if (this._parent === null) {
            this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = currentMatrix;
            return currentMatrix;
          }

          this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder = Matrix44$1.multiply(currentMatrix, this._parent._multiplyMyAndParentTransformMatricesInInverseOrder(true, input));
          this.__updateInfoString_multiplyMyAndParentTransformMatricesInInverseOrder = tempNumber;
          this.__cache_input_multiplyMyAndParentTransformMatricesInInverseOrder = input;
        }
        return this.__cache_returnValue_multiplyMyAndParentTransformMatricesInInverseOrder;
      }
    }, {
      key: 'readyForDiscard',
      value: function readyForDiscard() {
        if (this.className.indexOf('Mesh') !== -1) {
          var materials = this.getAppropriateMaterials();
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = materials[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var material = _step.value;

              if (material.userFlavorName !== 'GLBoostSystemDefaultMaterial') {
                material.readyForDiscard();
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }, {
      key: 'addGizmo',
      value: function addGizmo(gizmo) {
        this._gizmos.push(gizmo);
      }
    }, {
      key: '_needUpdate',
      value: function _needUpdate() {
        babelHelpers.get(M_Element.prototype.__proto__ || Object.getPrototypeOf(M_Element.prototype), '_needUpdate', this).call(this);
      }
    }, {
      key: 'toInheritCurrentAnimationInputValue',
      set: function set(flg) {
        this._toInheritCurrentAnimationInputValue = flg;
      },
      get: function get() {
        return this._toInheritCurrentAnimationInputValue;
      }
    }, {
      key: 'worldMatrixWithoutMySelf',
      get: function get() {
        return this.getWorldMatrixWithoutMySelfAt(void 0);
      }
    }, {
      key: 'normalMatrix',
      get: function get() {
        var tempNumber = this._accumulateMyAndParentNameWithUpdateInfo(this);

        if (this._accumulatedAncestryObjectUpdateNumberNormal !== tempNumber || typeof this._normalMatrix === 'undefined') {
          var world_m = this._multiplyMyAndParentTransformMatrices(true, null);
          this._normalMatrix = new Matrix33(Matrix44$1.invert(world_m).transpose());
          this._accumulatedAncestryObjectUpdateNumberNormal = tempNumber;
        }

        return this._normalMatrix.clone();
      }
    }, {
      key: 'inverseWorldMatrixWithoutMySelf',
      get: function get() {
        if (this._parent === null) {
          return Matrix44$1.identity();
        }

        return this._multiplyMyAndParentTransformMatricesInInverseOrder(false, null).clone().invert();
      }
    }, {
      key: 'inverseWorldMatrix',
      get: function get() {
        return this.getInverseWorldMatrixAt(void 0);
      }
    }, {
      key: 'opacityAccumulatedAncestry',
      get: function get() {
        return this._accumulateMyAndParentOpacity(this);
      }
    }, {
      key: 'opacity',
      set: function set(opacity) {
        this._opacity = opacity;
      },
      get: function get() {
        return this._opacity;
      }
    }, {
      key: 'isTransparent',
      get: function get() {
        return this._isTransparentForce;
      }
    }, {
      key: 'isTransparentForce',
      set: function set(flg) {
        this._isTransparentForce = flg;
      }
    }, {
      key: 'dirty',
      set: function set(flg) {
        if (flg) {
          this._needUpdate();
        }
      }
    }, {
      key: 'parent',
      get: function get() {
        return this._parent;
      }
    }, {
      key: 'elementUpdateNumber',
      get: function get() {
        return this.classUniqueNumber + this._updateCountAsElement;
      }
    }, {
      key: 'isVisible',
      set: function set(flg) {
        this._isVisible = flg;
      },
      get: function get() {
        return this._isVisible;
      }
    }, {
      key: 'isAffectedByWorldMatrix',
      set: function set(flg) {
        this._isAffectedByWorldMatrix = flg;
      },
      get: function get() {
        return this._isAffectedByWorldMatrix;
      }
    }, {
      key: 'isAffectedByWorldMatrixAccumulatedAncestry',
      set: function set(flg) {
        this._isAffectedByWorldMatrixAccumulatedAncestry = flg;
      },
      get: function get() {
        return this._isAffectedByWorldMatrixAccumulatedAncestry;
      }
    }, {
      key: 'isAffectedByViewMatrix',
      set: function set(flg) {
        this._isAffectedByViewMatrix = flg;
      },
      get: function get() {
        return this._isAffectedByViewMatrix;
      }
    }, {
      key: 'isAffectedByProjectionMatrix',
      set: function set(flg) {
        this._isAffectedByProjectionMatrix = flg;
      },
      get: function get() {
        return this._isAffectedByProjectionMatrix;
      }
    }, {
      key: 'gizmoScale',
      set: function set(scale) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._gizmos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var gizmo = _step2.value;

            gizmo.scale = new Vector3(scale, scale, scale);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      },
      get: function get() {
        if (this._gizmos.length === 0) {
          return 1.0;
        }
        return this._gizmos[0].scale.x;
      }
    }, {
      key: 'isGizmoVisible',
      set: function set(flg) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this._gizmos[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var gizmo = _step3.value;

            gizmo.isVisible = flg;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      },
      get: function get() {
        return this._gizmos[0].isVisible;
      }
    }, {
      key: 'masterElement',
      set: function set(element) {
        this._masterElement = element;
      },
      get: function get() {
        return this._masterElement;
      }
    }, {
      key: 'worldMatrixForJoints',
      get: function get() {
        return this.getWorldMatrixForJointsAt(void 0);
      }
    }, {
      key: 'worldMatrix',
      get: function get() {
        return this.getWorldMatrixAt(void 0);
      }
    }, {
      key: 'inverseTransformMatrixAccumulatedAncestryWithoutMySelf',
      get: function get() {
        if (this._parent === null) {
          return Matrix44$1.identity();
        }

        return this._multiplyMyAndParentTransformMatricesInInverseOrder(false, null).clone().invert();
      }
    }, {
      key: 'gizmos',
      get: function get() {
        return this._gizmos;
      }
    }]);
    return M_Element;
  }(L_Element);

  var M_AbstractLight = function (_M_Element) {
    babelHelpers.inherits(M_AbstractLight, _M_Element);

    function M_AbstractLight(glBoostContext) {
      babelHelpers.classCallCheck(this, M_AbstractLight);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_AbstractLight.__proto__ || Object.getPrototypeOf(M_AbstractLight)).call(this, glBoostContext));

      if (_this.constructor === M_AbstractLight) {
        throw new TypeError('Cannot construct AbstractLight instances directly.');
      }

      _this._gl = _this._glContext.gl;

      _this._isCastingShadow = true;
      _this._isLightType = '';
      _this._camera = null;
      return _this;
    }

    babelHelpers.createClass(M_AbstractLight, [{
      key: 'prepareToRender',
      value: function prepareToRender() {
        if (this._camera) {
          if (this._camera.customFunction) {
            this._camera.customFunction(this);
          }
        }
      }
    }, {
      key: 'isTypeAmbient',
      value: function isTypeAmbient() {
        return this._isLightType === 'ambient';
      }
    }, {
      key: 'isTypeDirectional',
      value: function isTypeDirectional() {
        return this._isLightType === 'directional';
      }
    }, {
      key: 'isTypePoint',
      value: function isTypePoint() {
        return this._isLightType === 'point';
      }
    }, {
      key: 'isTypeSpot',
      value: function isTypeSpot() {
        return this._isLightType === 'spot';
      }
    }, {
      key: 'isCastingShadow',
      set: function set(flg) {
        this._isCastingShadow = flg;
      },
      get: function get() {
        return this._isCastingShadow;
      }
    }, {
      key: 'lightType',
      get: function get() {
        return this._isLightType;
      }
    }, {
      key: 'camera',
      set: function set(camera) {
        this._camera = camera;
      },
      get: function get() {
        return this._camera;
      }
    }]);
    return M_AbstractLight;
  }(M_Element);


  GLBoost$1['M_AbstractLight'] = M_AbstractLight;

  var M_PointLight = function (_M_AbstractLight) {
    babelHelpers.inherits(M_PointLight, _M_AbstractLight);

    function M_PointLight(glBoostContext, intensity) {
      babelHelpers.classCallCheck(this, M_PointLight);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_PointLight.__proto__ || Object.getPrototypeOf(M_PointLight)).call(this, glBoostContext));

      _this._intensity = intensity;

      _this._isLightType = 'point';

      return _this;
    }

    babelHelpers.createClass(M_PointLight, [{
      key: 'intensity',
      set: function set(vec) {
        this._intensity = vec;
      },
      get: function get() {
        return this._intensity;
      }
    }]);
    return M_PointLight;
  }(M_AbstractLight);

  var Hash = function () {
    function Hash() {
      babelHelpers.classCallCheck(this, Hash);
    }

    babelHelpers.createClass(Hash, null, [{
      key: "toCRC32",
      value: function toCRC32(str) {
        var crc = 0,
            x = 0,
            y = 0;
        var table = Hash._crc32table;

        crc = crc ^ -1;
        for (var i = 0, iTop = str.length; i < iTop; ++i) {
          y = (crc ^ str.charCodeAt(i)) & 0xff;
          x = "0x" + table[y];
          crc = crc >>> 8 ^ x;
        }

        return (crc ^ -1) >>> 0;
      }
    }]);
    return Hash;
  }();


  Hash._crc32table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(' ');

  var Shader = function (_GLBoostObject) {
    babelHelpers.inherits(Shader, _GLBoostObject);

    function Shader(glBoostContext) {
      babelHelpers.classCallCheck(this, Shader);

      var _this = babelHelpers.possibleConstructorReturn(this, (Shader.__proto__ || Object.getPrototypeOf(Shader)).call(this, glBoostContext));

      _this._glslProgram = null;
      _this._dirty = true;
      return _this;
    }

    babelHelpers.createClass(Shader, [{
      key: '_removeDuplicatedLine',
      value: function _removeDuplicatedLine(shaderString) {
        var splittedShaderLines = shaderString.split('\n');
        for (var i = 0; i < splittedShaderLines.length; i++) {
          splittedShaderLines[i] += '\n';
          for (var j = 0; j < i; j++) {
            if (splittedShaderLines[j] === splittedShaderLines[i]) {
              splittedShaderLines[j] = '//                                                            commented out because of duplicated: ' + splittedShaderLines[i];
            }
          }
        }

        var processedShaderString = '';
        for (var _i = 0; _i < splittedShaderLines.length; _i++) {
          processedShaderString += splittedShaderLines[_i];
        }

        return processedShaderString;
      }
    }, {
      key: '_addLineNumber',
      value: function _addLineNumber(shaderString) {
        var shaderTextLines = shaderString.split(/\r\n|\r|\n/);
        var shaderTextWithLineNumber = '';
        for (var i = 0; i < shaderTextLines.length; i++) {
          var lineIndex = i + 1;
          var splitter = ' : ';
          if (lineIndex < 10) {
            splitter = '  : ';
          } else if (lineIndex >= 100) {
            splitter = ': ';
          }
          shaderTextWithLineNumber += lineIndex + splitter + shaderTextLines[i] + '\n';
        }

        return shaderTextWithLineNumber;
      }
    }, {
      key: '_getVertexShaderString',
      value: function _getVertexShaderString(gl, functions, existCamera_f, lights, material, extraData) {
        var _this2 = this;

        var f = functions;
        var shaderText = '';

        var in_ = Shader._in_onVert(gl);
        var out_ = Shader._out_onVert(gl);

        shaderText = Shader._glslVer(gl);
        shaderText += 'precision highp float;\n';
        shaderText += in_ + ' vec3 aVertex_position;\n';
        if (Shader._exist(f, GLBoost$1.NORMAL)) {
          shaderText += 'attribute vec3 aVertex_normal;\n';

          if (Shader._exist(f, GLBoost$1.TANGENT)) {
            shaderText += 'attribute vec3 aVertex_tangent;\n';
          }
        }

        var vsDefineShaderText = '';
        this._classNamesOfVSDefine.forEach(function (className) {
          var method = _this2['VSDefine_' + className];
          if (method) {
            vsDefineShaderText += '//                                                            VSDefine_' + className + ' //\n';
            vsDefineShaderText += method.bind(_this2, in_, out_, f, lights, material, extraData)();
          }
        });
        shaderText += this._removeDuplicatedLine(vsDefineShaderText);

        this._classNamesOfVSMethodDefine.forEach(function (className) {
          var method = _this2['VSMethodDefine_' + className];
          if (method) {
            shaderText += '//                                                            VSMethodDefine_' + className + ' //\n';
            shaderText += method.bind(_this2, existCamera_f, f, lights, material, extraData)();
          }
        });

        shaderText += 'void main(void) {\n';
        shaderText += 'vec4 position_local = vec4(aVertex_position, 1.0);\n';
        if (Shader._exist(f, GLBoost$1.NORMAL)) {
          shaderText += 'vec3 normal_local = aVertex_normal;\n';
          if (Shader._exist(f, GLBoost$1.TANGENT)) {
            shaderText += 'vec3 tangent_local = aVertex_tangent;\n';
          }
        }
        shaderText += 'bool isSkinning = false;\n';

        this._classNamesOfVSPreProcess.forEach(function (className) {
          var method = _this2['VSPreProcess_' + className];
          if (method) {
            shaderText += '//                                                            VSPreProcess_' + className + ' //\n';
            shaderText += method.bind(_this2, existCamera_f, f, lights, material, extraData)();
          }
        });

        this._classNamesOfVSTransform.forEach(function (className) {
          var method = _this2['VSTransform_' + className];
          if (method) {
            shaderText += '//                                                            VSTransform_' + className + ' //\n';
            shaderText += method.bind(_this2, existCamera_f, f, lights, material, extraData)();
          }
        });

        shaderText += '}';

        return shaderText;
      }
    }, {
      key: '_getFragmentShaderString',
      value: function _getFragmentShaderString(gl, functions, lights, material, extraData) {
        var _this3 = this;

        var f = functions;
        var shaderText = '';

        var in_ = Shader._in_onFrag(gl);

        shaderText += Shader._glslVer(gl);
        var maxDrawBuffers = this._getMaxDrawBuffers();
        if (maxDrawBuffers > 1) {
          shaderText += Shader._glsl1DrawBufferExt(gl);
        }
        shaderText += Shader._glsl1StdDerivativeExt(gl);
        shaderText += Shader._glsl1ShaderTextureLodExt(gl);
        shaderText += 'precision highp float;\n';

        for (var i = 0; i < maxDrawBuffers; i++) {
          shaderText += Shader._set_outColor_onFrag(gl, i);
        }

        var fsDefineShaderText = '';
        this._classNamesOfFSDefine.forEach(function (className) {
          var method = _this3['FSDefine_' + className];
          if (method) {
            fsDefineShaderText += '//                                                            FSDefine_' + className + ' //\n';
            fsDefineShaderText += method.bind(_this3, in_, f, lights, material, extraData)();
          }
        });
        shaderText += this._removeDuplicatedLine(fsDefineShaderText);

        this._classNamesOfFSMethodDefine.forEach(function (className) {
          var method = _this3['FSMethodDefine_' + className];
          if (method) {
            shaderText += '//                                                            FSMethodDefine_' + className + ' //\n';
            shaderText += method.bind(_this3, f, lights, material, extraData)();
          }
        });

        shaderText += 'void main(void) {\n';

        this._classNamesOfFSShade.forEach(function (className) {
          var method = _this3['FSShade_' + className];
          if (method) {
            shaderText += '//                                                            FSShade_' + className + ' //\n';
            shaderText += method.bind(_this3, f, gl, lights, material, extraData)();
          }
        });

        this._classNamesOfFSPostEffect.forEach(function (className) {
          var method = _this3['FSPostEffect_' + className];
          if (method) {
            shaderText += '//                                                            FSPostEffect_' + className + ' //\n';
            shaderText += method.bind(_this3, f, gl, lights, material, extraData)();
          }
        });

        this._classNamesOfFSFinalize.forEach(function (className) {
          var method = _this3['FSFinalize_' + className];
          if (method) {
            shaderText += '//                                                            FSFinalize_' + className + ' //\n';
            shaderText += method.bind(_this3, f, gl, lights, material, extraData)();
          }
        });

        if (maxDrawBuffers > 1) {
          for (var _i2 = 0; _i2 < maxDrawBuffers; _i2++) {
            shaderText += Shader._set_glFragData_inGLVer1(gl, _i2);
          }
        } else {
          shaderText += Shader._set_glFragColor_inGLVer1(gl);
        }
        shaderText += '}';

        return shaderText;
      }
    }, {
      key: '_prepareAssetsForShaders',
      value: function _prepareAssetsForShaders(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {
        var _this4 = this;

        var temp = [];

        this._glContext.useProgram(shaderProgram);
        this._classNamesOfPrepare.forEach(function (className) {
          var method = _this4['prepare_' + className];
          if (method) {
            var verAttirbs = method.bind(_this4, gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData, canvas)();
            temp = temp.concat(verAttirbs);
          }
        });
        var set = new Set(temp);

        var vertexAttribsAsResult = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            vertexAttribsAsResult.push(elem);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return vertexAttribsAsResult;
      }
    }, {
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {}
    }, {
      key: 'setUniformsAsTearDown',
      value: function setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {}
    }, {
      key: '_getShader',
      value: function _getShader(gl, theSource, type) {
        var shader;

        if (type == 'x-shader/x-fragment') {
          shader = this._glContext.createShader(this, gl.FRAGMENT_SHADER);
        } else if (type == 'x-shader/x-vertex') {
          shader = this._glContext.createShader(this, gl.VERTEX_SHADER);
        } else {
          shader = null;
        }

        gl.shaderSource(shader, theSource);

        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
          console.error(gl.getShaderInfoLog(shader));

          shader = null;
        }

        return shader;
      }
    }, {
      key: '_initShaders',
      value: function _initShaders(gl, vertexShaderStr, fragmentShaderStr) {
        var vertexShaderStrWithLineNumber = this._addLineNumber(vertexShaderStr);
        var fragmentShaderStrWithLineNumber = this._addLineNumber(fragmentShaderStr);
        MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, 'Vertex Shader:');
        MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, vertexShaderStrWithLineNumber);
        MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, 'Fragment Shader:');
        MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, fragmentShaderStrWithLineNumber);

        var vertexShader = this._getShader(gl, vertexShaderStr, 'x-shader/x-vertex');
        var fragmentShader = this._getShader(gl, fragmentShaderStr, 'x-shader/x-fragment');

        if (vertexShader === null || fragmentShader === null) {
          return null;
        }

        var shaderProgram = this._glContext.createProgram(this);
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        this._glContext.deleteShader(this, vertexShader);
        this._glContext.deleteShader(this, fragmentShader);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
          console.error(gl.getProgramInfoLog(shaderProgram));
        }

        this._glContext.useProgram(shaderProgram);

        shaderProgram.vertexShaderSource = vertexShaderStrWithLineNumber;
        shaderProgram.fragmentShaderSource = fragmentShaderStrWithLineNumber;

        return shaderProgram;
      }
    }, {
      key: 'getShaderProgram',
      value: function getShaderProgram(expression, vertexAttribs, existCamera_f, lights_, material) {
        var extraData = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        var gl = this._glContext.gl;
        var canvasId = this._glContext.belongingCanvasId;

        var programToReturn = null;
        var lights = null;

        do {
          lights = this.getDefaultPointLightIfNotExist(lights_);
          lights = lights.filter(function (light) {
            return !light.isTypeAmbient();
          });

          var vertexShaderText = this._getVertexShaderString(gl, vertexAttribs, existCamera_f, lights, material, extraData);
          var fragmentShaderText = this._getFragmentShaderString(gl, vertexAttribs, lights, material, extraData);

          var baseText = vertexShaderText + '\n###SPLIT###\n' + fragmentShaderText;
          var hash = Hash.toCRC32(baseText);
          if (!Shader._shaderHashTable[canvasId]) {
            Shader._shaderHashTable[canvasId] = {};
          }
          var hashTable = Shader._shaderHashTable[canvasId];
          if (hash in hashTable) {
            if (hashTable[hash].code === baseText) {
              programToReturn = hashTable[hash].program;
            } else {
              for (var i = 0; i < hashTable[hash].collisionN; i++) {
                if (hashTable[hash + '_' + i].code === baseText) {
                  programToReturn = hashTable[hash + '_' + i].program;
                  break;
                }
              }
              hashTable[hash].collisionN++;
            }
          }

          if (programToReturn === null || !gl.isProgram(programToReturn)) {
            var indexStr = null;
            if (typeof hashTable[hash] !== 'undefined' && hashTable[hash].collisionN > 0) {
              indexStr = hash + '_' + hashTable[hash].collisionN;
            } else {
              indexStr = hash;
            }

            MiscUtil.consoleLog(GLBoost$1.LOG_SHADER_CODE, 'ShaderInstance: ' + material.shaderInstance + '   ShaderHashId: ' + indexStr);
            programToReturn = this._initShaders(gl, vertexShaderText, fragmentShaderText);
            if (programToReturn !== null) {
              programToReturn.createdAt = performance.now();
              programToReturn.hashId = indexStr;
              programToReturn.glslProgramsSelfUsageCount = -1;

              hashTable[indexStr] = { code: baseText, program: programToReturn, collisionN: 0 };
              Shader._shaderHashTable[canvasId] = hashTable;
            } else if (this.className === "SkeletalShader") {
              GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL++;
              console.log('GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL was changed to : ' + GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL);
            }
          }
        } while (programToReturn === null && this.className === "SkeletalShader" && GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL < 3);

        this._glslProgram = programToReturn;

        material._semanticsDic = { _glslProgram: programToReturn };
        material.uniformTextureSamplerDic = {};
        programToReturn._material = material;
        programToReturn.optimizedVertexAttribs = this._prepareAssetsForShaders(gl, programToReturn, expression, vertexAttribs, existCamera_f, lights, material, extraData);

        return programToReturn;
      }
    }, {
      key: 'getDefaultPointLightIfNotExist',
      value: function getDefaultPointLightIfNotExist(lights) {

        if (lights.length === 0) {
          if (Shader._defaultLight === null) {
            Shader._defaultLight = this._glBoostSystem._glBoostContext.createPointLight(GLBoost$1.VALUE_DEFAULT_POINTLIGHT_INTENSITY);
          }
          return [Shader._defaultLight];
        } else {
          return lights;
        }
      }
    }, {
      key: '_getMaxDrawBuffers',
      value: function _getMaxDrawBuffers() {
        var gl = this._glContext.gl;
        var isWebGL2 = Shader.isThisGLVersion_2(gl);
        if (isWebGL2) {
          return gl.getParameter(gl.MAX_DRAW_BUFFERS);
        }

        var glem = GLExtensionsManager.getInstance(this._glContext);
        if (glem.extDBs) {
          return gl.getParameter(glem.extDBs.MAX_DRAW_BUFFERS_WEBGL);
        } else {
          return 1;
        }
      }
    }, {
      key: '_multiplyAlphaToColorOfTexel',
      value: function _multiplyAlphaToColorOfTexel(gl) {
        var gl = this._glContext.gl;
        var shaderText = "";
        var textureFunc = Shader._texture_func(gl);
        shaderText += 'vec4 multiplyAlphaToColorOfTexel(sampler2D texture, vec2 texcoord, int toMultiplyAlphaFlag) {\n';
        shaderText += '  vec4 texel = ' + textureFunc + '(texture, texcoord);\n';
        shaderText += '  if (toMultiplyAlphaFlag == 1) {\n';
        shaderText += '    texel.rgb *= texel.a;\n';
        shaderText += '  }\n';
        shaderText += '  return texel;\n';
        shaderText += '}\n';

        return shaderText;
      }
    }, {
      key: '_sampler2DShadow_func',
      value: function _sampler2DShadow_func() {
        var gl = this._glContext.gl;
        return GLBoost$1.isThisGLVersion_2(gl) ? 'sampler2DShadow' : 'sampler2D';
      }
    }, {
      key: 'readyForDiscard',
      value: function readyForDiscard() {
        if (this._glslProgram) {
          this._glContext.deleteProgram(this, this._glslProgram);
        }
        babelHelpers.get(Shader.prototype.__proto__ || Object.getPrototypeOf(Shader.prototype), 'readyForDiscard', this).call(this);
      }
    }, {
      key: 'getShaderParameter',
      value: function getShaderParameter(material, parameterName, defaultValue) {
        if (typeof this[parameterName] !== 'undefined') {
          return this[parameterName];
        } else if (typeof material.shaderParameters[parameterName] !== 'undefined') {
          return material.shaderParameters[parameterName];
        }
        return defaultValue;
      }
    }, {
      key: 'dirty',
      get: function get() {
        return this._dirty;
      },
      set: function set(flg) {
        this._dirty = flg;
      }
    }, {
      key: 'glslProgram',
      get: function get() {
        return this._glslProgram;
      }
    }], [{
      key: 'initMixinMethodArray',
      value: function initMixinMethodArray() {
        this.prototype._classNamesOfVSDefine = this.prototype._classNamesOfVSDefine ? this.prototype._classNamesOfVSDefine : [];
        this.prototype._classNamesOfVSMethodDefine = this.prototype._classNamesOfVSMethodDefine ? this.prototype._classNamesOfVSMethodDefine : [];
        this.prototype._classNamesOfVSPreProcess = this.prototype._classNamesOfVSPreProcess ? this.prototype._classNamesOfVSPreProcess : [];
        this.prototype._classNamesOfVSTransform = this.prototype._classNamesOfVSTransform ? this.prototype._classNamesOfVSTransform : [];

        this.prototype._classNamesOfFSDefine = this.prototype._classNamesOfFSDefine ? this.prototype._classNamesOfFSDefine : [];
        this.prototype._classNamesOfFSMethodDefine = this.prototype._classNamesOfFSMethodDefine ? this.prototype._classNamesOfFSMethodDefine : [];
        this.prototype._classNamesOfFSShade = this.prototype._classNamesOfFSShade ? this.prototype._classNamesOfFSShade : [];
        this.prototype._classNamesOfFSPostEffect = this.prototype._classNamesOfFSPostEffect ? this.prototype._classNamesOfFSPostEffect : [];
        this.prototype._classNamesOfFSFinalize = this.prototype._classNamesOfFSFinalize ? this.prototype._classNamesOfFSFinalize : [];

        this.prototype._classNamesOfPrepare = this.prototype._classNamesOfPrepare ? this.prototype._classNamesOfPrepare : [];
      }
    }, {
      key: 'mixin',
      value: function mixin(source) {
        this.initMixinMethodArray();

        if (this.prototype._classNamesOfVSDefine.indexOf(source.name) === -1) {
          this.prototype._classNamesOfVSDefine.push(source.name);
        }
        if (this.prototype._classNamesOfVSMethodDefine.indexOf(source.name) === -1) {
          this.prototype._classNamesOfVSMethodDefine.push(source.name);
        }
        if (this.prototype._classNamesOfVSPreProcess.indexOf(source.name) === -1) {
          this.prototype._classNamesOfVSPreProcess.push(source.name);
        }
        if (this.prototype._classNamesOfVSTransform.indexOf(source.name) === -1) {
          this.prototype._classNamesOfVSTransform.push(source.name);
        }
        if (this.prototype._classNamesOfFSDefine.indexOf(source.name) === -1) {
          this.prototype._classNamesOfFSDefine.push(source.name);
        }
        if (this.prototype._classNamesOfFSMethodDefine.indexOf(source.name) === -1) {
          this.prototype._classNamesOfFSMethodDefine.push(source.name);
        }
        if (this.prototype._classNamesOfFSShade.indexOf(source.name) === -1) {
          this.prototype._classNamesOfFSShade.push(source.name);
        }
        if (this.prototype._classNamesOfFSPostEffect.indexOf(source.name) === -1) {
          this.prototype._classNamesOfFSPostEffect.push(source.name);
        }
        if (this.prototype._classNamesOfFSFinalize.indexOf(source.name) === -1) {
          this.prototype._classNamesOfFSFinalize.push(source.name);
        }
        if (this.prototype._classNamesOfPrepare.indexOf(source.name) === -1) {
          this.prototype._classNamesOfPrepare.push(source.name);
        }

        var target = this.prototype;source = source.prototype;
        Object.getOwnPropertyNames(source).forEach(function (name) {
          if (name !== 'constructor') Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
        });
      }
    }, {
      key: 'swapMixin',
      value: function swapMixin(current, newone) {
        var matchIdx = this.prototype._classNamesOfVSDefine.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSDefine[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfVSMethodDefine.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSMethodDefine[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfVSPreProcess.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSPreProcess[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfVSTransform.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSTransform[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfFSDefine.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSDefine[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfFSMethodDefine.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSMethodDefine[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfFSShade.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSShade[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfFSPostEffect.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSPostEffect[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfFSFinalize.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSFinalize[matchIdx] = newone.name;
        }
        matchIdx = this.prototype._classNamesOfPrepare.indexOf(current.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfPrepare[matchIdx] = newone.name;
        }

        var target = this.prototype;newone = newone.prototype;
        Object.getOwnPropertyNames(newone).forEach(function (name) {
          if (name !== 'constructor') Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(newone, name));
        });
      }
    }, {
      key: 'removeMixin',
      value: function removeMixin(source) {
        var matchIdx = this.prototype._classNamesOfVSDefine.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSDefine.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfVSMethodDefine.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSMethodDefineVSPreProcess.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfVSPreProcess.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSPreProcess.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfVSTransform.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfVSTransform.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfFSDefine.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSDefine.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfFSMethodDefine.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSMethodDefine.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfFSShade.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSShade.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfFSPostEffect.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSPostEffect.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfFSFinalize.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfFSFinalize.splice(matchIdx, 1);
        }
        matchIdx = this.prototype._classNamesOfPrepare.indexOf(source.name);
        if (matchIdx !== -1) {
          this.prototype._classNamesOfPrepare.splice(matchIdx, 1);
        }
      }
    }, {
      key: 'isMixin',
      value: function isMixin(source) {
        this.initMixinMethodArray();

        if (this.prototype._classNamesOfVSDefine.indexOf(source.name) === -1) {
          return false;
        } else {
          return true;
        }
      }
    }, {
      key: '_exist',
      value: function _exist(functions, glboostConstantForAttributeType) {
        var attribute = GLBoost$1.getValueOfGLBoostConstant(glboostConstantForAttributeType);
        return functions.indexOf(attribute) >= 0;
      }
    }, {
      key: 'isThisGLVersion_2',
      value: function isThisGLVersion_2(gl) {
        if (typeof WebGL2RenderingContext === 'undefined') {
          return false;
        }
        return gl instanceof WebGL2RenderingContext;
      }
    }, {
      key: '_glslVer',
      value: function _glslVer(gl) {
        return GLBoost$1.isThisGLVersion_2(gl) ? '#version 300 es\n' : '';
      }
    }, {
      key: '_glsl1DrawBufferExt',
      value: function _glsl1DrawBufferExt(gl) {
        return !GLBoost$1.isThisGLVersion_2(gl) ? '#extension GL_EXT_draw_buffers : require\n' : '';
      }
    }, {
      key: '_glsl1StdDerivativeExt',
      value: function _glsl1StdDerivativeExt(gl) {
        return !GLBoost$1.isThisGLVersion_2(gl) ? '#extension GL_OES_standard_derivatives : require\n' : '';
      }
    }, {
      key: '_glsl1ShaderTextureLodExt',
      value: function _glsl1ShaderTextureLodExt(gl) {
        return !GLBoost$1.isThisGLVersion_2(gl) && gl.getExtension("EXT_shader_texture_lod") ? '#extension GL_EXT_shader_texture_lod : require\n' : '';
      }
    }, {
      key: '_in_onVert',
      value: function _in_onVert(gl) {
        return GLBoost$1.isThisGLVersion_2(gl) ? 'in' : 'attribute';
      }
    }, {
      key: '_out_onVert',
      value: function _out_onVert(gl) {
        return GLBoost$1.isThisGLVersion_2(gl) ? 'out' : 'varying';
      }
    }, {
      key: '_in_onFrag',
      value: function _in_onFrag(gl) {
        return GLBoost$1.isThisGLVersion_2(gl) ? 'in' : 'varying';
      }
    }, {
      key: '_texture_func',
      value: function _texture_func(gl) {
        return GLBoost$1.isThisGLVersion_2(gl) ? 'texture' : 'texture2D';
      }
    }, {
      key: '_textureProj_func',
      value: function _textureProj_func(gl) {
        return GLBoost$1.isThisGLVersion_2(gl) ? 'shadowProj' : 'texture2DProj';
      }
    }, {
      key: '_generateLightStr',
      value: function _generateLightStr(i) {
        var shaderText = '';

        shaderText += '    vec3 lightDirection = lightDirection_world[' + i + '];\n';
        shaderText += '    if (0.4 < lightSpotInfo[' + i + '].x) {\n';
        shaderText += '      lightDirection = normalize(lightPosition_world[' + i + '] - v_position_world.xyz);\n';
        shaderText += '    }\n';
        shaderText += '    float spotEffect = 1.0;\n';
        shaderText += '    if (lightSpotInfo[' + i + '].x > 0.8) {\n';
        shaderText += '      spotEffect = dot(lightDirection_world[' + i + '], lightDirection);\n';
        shaderText += '      if (spotEffect > lightSpotInfo[' + i + '].y) {\n';
        shaderText += '        spotEffect = pow(spotEffect, lightSpotInfo[' + i + '].z);\n';
        shaderText += '      } else {\n';
        shaderText += '        spotEffect = 0.0;\n';
        shaderText += '      }\n';
        shaderText += '    }\n';

        return shaderText;
      }
    }, {
      key: '_generateShadowingStr',
      value: function _generateShadowingStr(gl, i, isShadowEnabledAsTexture) {
        var shadowingText = '';
        shadowingText += 'float visibilityForShadow = 0.75;\n';
        shadowingText += 'float visibility = 1.0;\n';
        shadowingText += 'float visibilitySpecular = 1.0;\n';
        shadowingText += 'if (isShadowCasting[' + i + '] == 1) {// ' + i + '\n';
        shadowingText += 'vec4 shadowCoord_i = shadowCoord[' + i + '];\n';
        shadowingText += 'shadowCoord_i.z -= depthBias;\n';

        if (GLBoost$1.isThisGLVersion_2(gl)) {
          if (isShadowEnabledAsTexture) {
            shadowingText += 'visibilitySpecular = textureProj(uDepthTexture[' + i + '], shadowCoord_i);\n';
            shadowingText += 'visibility = visibilitySpecular + visibilityForShadow;\n';
          }
        } else {
          if (isShadowEnabledAsTexture) {
            shadowingText += 'float depth = texture2DProj(uDepthTexture[' + i + '], shadowCoord_i).r;\n';
            shadowingText += 'if (depth < shadowCoord_i.z) {\n';

            shadowingText += '  visibility = visibilityForShadow;\n';
            shadowingText += '  visibilitySpecular = 0.0;\n';

            shadowingText += '}\n';
          }
        }
        shadowingText += '}\n';

        return shadowingText;
      }
    }, {
      key: '_getNormalStr',
      value: function _getNormalStr(gl, material, f) {
        var shaderText = '';
        var normalTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_NORMAL);
        if (!normalTexture && Shader._exist(f, GLBoost$1.NORMAL)) {
          shaderText += '  vec3 normal = normalize(v_normal_world);\n';
          shaderText += '  vec3 normal_world = normal;\n';
        } else if (material.isFlatShading || !Shader._exist(f, GLBoost$1.NORMAL)) {
          if (!GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
            shaderText += '  vec3 dx = dFdx(v_position_world);\n';
            shaderText += '  vec3 dy = dFdy(v_position_world);\n';

            shaderText += '  vec3 normal = normalize(cross(dx, dy));\n';
            shaderText += '  vec3 normal_world = normal;\n';
          }
        } else if (normalTexture && Shader._exist(f, GLBoost$1.TANGENT)) {
          var textureFunc = Shader._texture_func(gl);
          shaderText += '  vec3 normal = ' + textureFunc + '(uNormalTexture, texcoord).xyz*2.0 - 1.0;\n';
          shaderText += '  vec3 tangent_world = normalize(v_tangent_world);\n';
          shaderText += '  vec3 binormal_world = normalize(v_binormal_world);\n';
          shaderText += '  vec3 normal_world = normalize(v_normal_world);\n';

          shaderText += '  mat3 tbnMat_tangent_to_world = mat3(\n        tangent_world.x, tangent_world.y, tangent_world.z,\n        binormal_world.x, binormal_world.y, binormal_world.z,\n        normal_world.x, normal_world.y, normal_world.z\n      );\n';

          shaderText += '  normal = normalize(tbnMat_tangent_to_world * normal);\n';
          shaderText += '  normal_world = normal;\n';
        }

        return shaderText;
      }
    }, {
      key: '_set_outColor_onFrag',
      value: function _set_outColor_onFrag(gl, i) {
        return GLBoost$1.isThisGLVersion_2(gl) ? 'layout(location = ' + i + ') out vec4 rt' + i + ';\n' : 'vec4 rt' + i + ';\n';
      }
    }, {
      key: '_set_glFragColor_inGLVer1',
      value: function _set_glFragColor_inGLVer1(gl) {
        return !GLBoost$1.isThisGLVersion_2(gl) ? '  gl_FragColor = rt0;\n' : '';
      }
    }, {
      key: '_set_glFragData_inGLVer1',
      value: function _set_glFragData_inGLVer1(gl, i) {
        return !GLBoost$1.isThisGLVersion_2(gl) ? '  gl_FragData[' + i + '] = rt' + i + ';\n' : '';
      }
    }, {
      key: 'trySettingMatrix44ToUniform',
      value: function trySettingMatrix44ToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, matrixArray) {
        if (typeof semanticsDir[semantics] === 'undefined') {
          return;
        }
        if (typeof semanticsDir[semantics] === 'string') {
          gl.uniformMatrix4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + semanticsDir[semantics]), false, matrixArray);
          return;
        }

        semanticsDir[semantics].forEach(function (uniformName) {
          gl.uniformMatrix4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + uniformName), false, matrixArray);
        });
      }
    }, {
      key: 'trySettingMatrix33ToUniform',
      value: function trySettingMatrix33ToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, matrixArray) {
        if (typeof semanticsDir[semantics] === 'undefined') {
          return;
        }
        if (typeof semanticsDir[semantics] === 'string') {
          gl.uniformMatrix3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + semanticsDir[semantics]), false, matrixArray);
          return;
        }

        semanticsDir[semantics].forEach(function (uniformName) {
          gl.uniformMatrix3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + uniformName), false, matrixArray);
        });
      }
    }, {
      key: 'trySettingVec4ArrayToUniform',
      value: function trySettingVec4ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
        if (typeof semanticsDir[semantics] === 'undefined') {
          return;
        }
        if (typeof semanticsDir[semantics] === 'string') {
          gl.uniform4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + semanticsDir[semantics]), vecArray);
          return;
        }

        semanticsDir[semantics].forEach(function (uniformName) {
          gl.uniform4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + uniformName), vecArray);
        });
      }
    }, {
      key: 'trySettingVec3ArrayToUniform',
      value: function trySettingVec3ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
        if (typeof semanticsDir[semantics] === 'undefined') {
          return;
        }
        if (typeof semanticsDir[semantics] === 'string') {
          gl.uniform3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + semanticsDir[semantics]), vecArray);
          return;
        }

        semanticsDir[semantics].forEach(function (uniformName) {
          gl.uniform3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + uniformName), vecArray);
        });
      }
    }, {
      key: 'trySettingVec2ArrayToUniform',
      value: function trySettingVec2ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
        if (typeof semanticsDir[semantics] === 'undefined') {
          return;
        }
        if (typeof semanticsDir[semantics] === 'string') {
          gl.uniform2fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + semanticsDir[semantics]), vecArray);
          return;
        }

        semanticsDir[semantics].forEach(function (uniformName) {
          gl.uniform2fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_' + uniformName), vecArray);
        });
      }
    }]);
    return Shader;
  }(GLBoostObject);


  Shader._instances = new Object();
  Shader._shaderHashTable = {};
  Shader._defaultLight = null;

  var singleton$2 = Symbol();
  var singletonEnforcer = Symbol();

  var DrawKickerWorld = function () {
    function DrawKickerWorld(enforcer) {
      babelHelpers.classCallCheck(this, DrawKickerWorld);

      if (enforcer !== singletonEnforcer) {
        throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
      }
      this._glslProgram = null;
    }

    babelHelpers.createClass(DrawKickerWorld, [{
      key: 'draw',
      value: function draw(data) {
        var gl = data.gl;
        var glem = data.glem;
        var expression = data.expression;
        var mesh = data.mesh;
        var originalMaterials = data.materials;
        var camera = data.camera;
        var lights = data.lights;
        var scene = data.scene;
        var vertices = data.vertices;
        var vaoDic = data.vaoDic;
        var vboDic = data.vboDic;
        var iboArrayDic = data.iboArrayDic;
        var geometry = data.geometry;
        var geometryName = data.geometryName;
        var primitiveType = data.primitiveType;
        var vertexN = data.vertexN;
        var renderPassIndex = data.renderPassIndex;
        var viewport = data.viewport;
        var isWebVRMode = data.isWebVRMode;
        var webvrFrameData = data.webvrFrameData;
        var forceThisMaterial = data.forceThisMaterial;

        var isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);

        var input = mesh._getCurrentAnimationInputValue('time');

        for (var i = 0; i < originalMaterials.length; i++) {
          var material = originalMaterials[i];
          var isOutlineVisible = false;
          if (forceThisMaterial) {
            material = forceThisMaterial;
            if (forceThisMaterial.userFlavorName === 'OutlineGizmoMaterial') {
              isOutlineVisible = true;
            }
          }
          if (!material.isVisible) {
            continue;
          }

          var renderpassSpecificMaterial = material['renderpassSpecificMaterial_' + expression.renderPasses[renderPassIndex].instanceName + '_material_' + i];
          if (renderpassSpecificMaterial) {
            material = renderpassSpecificMaterial;
          }

          if (!material.shaderInstance) {
            console.warn('Failed to Render due to this material \'' + material.userFlavorName + '(' + material.instanceName + ')\' has not shaderInstance.');
            continue;
          }
          this._glslProgram = material.shaderInstance.glslProgram;

          material._glContext.useProgram(this._glslProgram);
          var glslProgram = this._glslProgram;

          if (!isVAOBound) {
            if (DrawKickerWorld._lastGeometry !== geometryName) {
              for (var attribName in vboDic) {
                gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[attribName]);
                geometry.setUpVertexAttribs(gl, glslProgram, geometry._allVertexAttribs(vertices));
              }
            }
          }

          material._glContext.uniform3i(material.getUniform(glslProgram, 'uniform_objectIdsAndOutlineFlag'), mesh.objectIndex, 0, isOutlineVisible, true);

          var opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
          var query_result_uniform_opacity = material.getUniform(glslProgram, 'uniform_opacity');
          material._glContext.uniform1f(query_result_uniform_opacity, opacity, true);

          var world_m = void 0;
          var normal_m = void 0;
          if (mesh.isAffectedByWorldMatrix) {
            if (mesh.isAffectedByWorldMatrixAccumulatedAncestry) {
              world_m = mesh.getWorldMatrixAt(input);
              normal_m = mesh.normalMatrix;
            } else {
              world_m = mesh.matrix;
              normal_m = mesh.normalMatrix;
            }
          } else {
            world_m = Matrix44$1.identity();
            normal_m = Matrix33.identity();
          }

          if (material.getUniform(glslProgram, 'uniform_lightPosition_0')) {
            lights = material.shaderInstance.getDefaultPointLightIfNotExist(lights);

            if (material.getUniform(glslProgram, 'uniform_viewPosition')) {
              var cameraPos = new Vector4$1(0, 0, 1, 1);
              if (camera) {
                cameraPos = camera.worldMatrixWithoutMySelf.multiplyVector(new Vector4$1(camera.eyeInner.x, camera.eyeInner.y, camera.eyeInner.z, 1.0));
              }
              material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_viewPosition'), cameraPos.x, cameraPos.y, cameraPos.z, true);
            }

            for (var j = 0; j < lights.length; j++) {
              var light = lights[j];
              if (material.getUniform(glslProgram, 'uniform_lightPosition_' + j) && material.getUniform(glslProgram, 'uniform_lightDiffuse_' + j)) {
                var lightPosition = new Vector4$1(0, 0, 0, 1);
                var lightDirection = new Vector4$1(0, 0, 0, 1);
                var lightIntensity = light.intensity;
                if (!light.isVisible) {
                  lightIntensity = Vector3.zero();
                }

                var lightType = 0.0;
                if (light.className === 'M_PointLight') {
                  lightType = 0.5;
                } else if (light.className === 'M_SpotLight') {
                  lightType = 1.0;
                }
                if (light.className === 'M_PointLight' || light.className === 'M_SpotLight') {
                  lightPosition = light.worldMatrix.multiplyVector(lightPosition);
                }
                if (light.className === 'M_DirectionalLight' || light.className === 'M_SpotLight') {
                  lightDirection = light.directionInWorld;
                  lightDirection.normalize();
                }
                material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_lightPosition_' + j), lightPosition.x, lightPosition.y, lightPosition.z, true);
                material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_lightDirection_' + j), lightDirection.x, lightDirection.y, lightDirection.z, true);
                material._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_lightDiffuse_' + j), lightIntensity.x, lightIntensity.y, lightIntensity.z, 1.0, true);
                if (light.className === 'M_SpotLight') {
                  material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_lightSpotInfo_' + j), lightType, light.spotCosCutoff, light.spotExponent, true);
                } else {
                  material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_lightSpotInfo_' + j), lightType, 0, 0, true);
                }
              }
            }
          }

          {
            var needTobeStillDirty = material.shaderInstance.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);
            material.shaderInstance.dirty = needTobeStillDirty ? true : false;

            material.setUpStates();

            this._setUpOrTearDownTextures(true, material);
          }

          this._setupOtherTextures(lights);

          geometry.drawIntermediate(gl, glslProgram, mesh, material);

          var _vertexN = originalMaterials[i].getVertexN(geometry);

          if (isWebVRMode) {

            gl.viewport.apply(gl, [viewport[0], viewport[1], viewport[2] * 0.5, viewport[3]]);
            DrawKickerWorld.setVRCamera(gl, glslProgram, material, world_m, normal_m, webvrFrameData, mesh, 'left');
            DrawKickerWorld.drawGeometry(geometry, glem, gl, i, primitiveType, _vertexN);

            gl.viewport.apply(gl, [viewport[2] * 0.5, viewport[1], viewport[2] * 0.5, viewport[3]]);
            DrawKickerWorld.setVRCamera(gl, glslProgram, material, world_m, normal_m, webvrFrameData, mesh, 'right');
            DrawKickerWorld.drawGeometry(geometry, glem, gl, i, primitiveType, _vertexN);
          } else {
            DrawKickerWorld.setCamera(gl, glslProgram, material, world_m, normal_m, camera, mesh);
            DrawKickerWorld.drawGeometry(geometry, glem, gl, i, primitiveType, _vertexN);
          }

          material.shaderInstance.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);

          this._tearDownOtherTextures(lights);

          material.tearDownStates();
        }

        glem.bindVertexArray(gl, null);
      }
    }, {
      key: '_setUpOrTearDownTextures',
      value: function _setUpOrTearDownTextures(isSetUp, material) {
        var methodName = 'tearDownTexture';
        if (isSetUp) {
          methodName = 'setUpTexture';
        }

        var isTextureProcessDone = true;
        for (var key in material._textureSemanticsDic) {
          var uniformName = material._textureSemanticsDic[key];
          var textureSamplerDic = material.uniformTextureSamplerDic[uniformName];
          var textureName = textureSamplerDic.textureName;
          var textureUnitIndex = textureSamplerDic.textureUnitIndex;
          isTextureProcessDone = material[methodName](textureName, textureUnitIndex);
        }

        return isTextureProcessDone;
      }
    }, {
      key: '_setupOtherTextures',
      value: function _setupOtherTextures(lights) {
        for (var i = 0; i < lights.length; i++) {
          if (lights[i].camera && lights[i].camera.texture) {
            lights[i].camera.texture.setUp();
          }
        }
      }
    }, {
      key: '_tearDownOtherTextures',
      value: function _tearDownOtherTextures(lights) {
        for (var i = 0; i < lights.length; i++) {
          if (lights[i].camera && lights[i].camera.texture) {
            lights[i].camera.texture.tearDown();
          }
        }
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton$2]) {
          this[singleton$2] = new DrawKickerWorld(singletonEnforcer);
        }
        return this[singleton$2];
      }
    }, {
      key: 'setCamera',
      value: function setCamera(gl, glslProgram, material, world_m, normal_m, camera, mesh) {
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'WORLD', world_m.flatten());
        Shader.trySettingMatrix33ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEWINVERSETRANSPOSE', normal_m.flatten());

        if (camera) {
          var viewMatrix = void 0;
          if (mesh.isAffectedByViewMatrix) {
            var cameraMatrix = camera.lookAtRHMatrix();
            viewMatrix = cameraMatrix.multiply(camera.inverseWorldMatrixWithoutMySelf);
          } else {
            viewMatrix = Matrix44$1.identity();
          }

          var projectionMatrix = void 0;
          if (mesh.isAffectedByProjectionMatrix) {
            projectionMatrix = camera.projectionRHMatrix();
          } else {
            projectionMatrix = Matrix44$1.identity();
          }

          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'VIEW', viewMatrix.flatten());
          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'PROJECTION', projectionMatrix.flatten());
          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEW', Matrix44$1.multiply(viewMatrix, world_m).flatten());

          camera._lastPVMatrixFromLight = Matrix44$1.multiply(projectionMatrix, viewMatrix);
        }
      }
    }, {
      key: 'setVRCamera',
      value: function setVRCamera(gl, glslProgram, material, world_m, normal_m, webvrFrameData, mesh, leftOrRight) {
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'WORLD', world_m.flatten());
        Shader.trySettingMatrix33ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEWINVERSETRANSPOSE', normal_m.flatten());

        if (webvrFrameData) {
          var viewMatrix = void 0;
          if (mesh.isAffectedByViewMatrix) {
            var invertSittingToStandingTransform = new Matrix44$1(webvrFrameData.sittingToStandingTransform, true).invert();
            var leftOrRightViewMatrix = new Matrix44$1(webvrFrameData[leftOrRight + 'ViewMatrix'], true);
            viewMatrix = Matrix44$1.multiply(leftOrRightViewMatrix, invertSittingToStandingTransform);
          } else {
            viewMatrix = Matrix44$1.identity();
          }

          var projectionMatrix = void 0;
          if (mesh.isAffectedByProjectionMatrix) {
            projectionMatrix = new Matrix44$1(webvrFrameData[leftOrRight + 'ProjectionMatrix'], true);
          } else {
            projectionMatrix = Matrix44$1.identity();
          }

          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'VIEW', viewMatrix.flatten());
          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'PROJECTION', projectionMatrix.flatten());
          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEW', Matrix44$1.multiply(viewMatrix, world_m).flatten());
        }
      }
    }, {
      key: 'drawGeometry',
      value: function drawGeometry(geometry, glem, gl, i, primitiveType, vertexN) {
        if (geometry.isIndexed()) {
          var indexBitSizeGLConstant = glem.elementIndexBitSizeGLConstant(gl);
          var indexByteSizeNumber = glem.elementIndexByteSizeNumber(gl);
          var offset = geometry.getIndexStartOffsetArrayAtMaterial(i);
          gl.drawElements(primitiveType, vertexN, indexBitSizeGLConstant, offset * indexByteSizeNumber);
        } else {
          gl.drawArrays(primitiveType, 0, vertexN);
        }
      }
    }]);
    return DrawKickerWorld;
  }();

  var SkeletalShaderSource = function () {
    function SkeletalShaderSource() {
      babelHelpers.classCallCheck(this, SkeletalShaderSource);
    }

    babelHelpers.createClass(SkeletalShaderSource, [{
      key: 'VSDefine_SkeletalShaderSource',
      value: function VSDefine_SkeletalShaderSource(in_, out_, f, lights, material, extraData) {
        var shaderText = '';
        shaderText += in_ + ' vec4 aVertex_joint;\n';
        shaderText += in_ + ' vec4 aVertex_weight;\n';

        if (!GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
          shaderText += 'uniform mat4 skinTransformMatrices[' + extraData.jointN + '];\n';
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1) {
          shaderText += 'uniform vec4 quatArray[' + extraData.jointN + '];\n';
          shaderText += 'uniform vec4 transArray[' + extraData.jointN + '];\n';
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {
          shaderText += 'uniform vec4 quatTranslationArray[' + extraData.jointN + '];\n';
          shaderText += 'uniform vec3 translationScale;\n';
        }

        return shaderText;
      }
    }, {
      key: 'VSMethodDefine_SkeletalShaderSource',
      value: function VSMethodDefine_SkeletalShaderSource(f, lights, material, extraData) {
        var shaderText = '';
        shaderText += '\n    mat3 toNormalMatrix(mat4 m) {\n      float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3];\n    \n      float b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32;\n    \n      float determinantVal = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n    \n      return mat3(\n        a11 * b11 - a12 * b10 + a13 * b09, a12 * b08 - a10 * b11 - a13 * b07, a10 * b10 - a11 * b08 + a13 * b06,\n        a02 * b10 - a01 * b11 - a03 * b09, a00 * b11 - a02 * b08 + a03 * b07, a01 * b08 - a00 * b10 - a03 * b06,\n        a31 * b05 - a32 * b04 + a33 * b03, a32 * b02 - a30 * b05 - a33 * b01, a30 * b04 - a31 * b02 + a33 * b00) / determinantVal;\n    }\n\n    mat4 transposeMatrix(mat4 m) {\n      return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n                  m[0][1], m[1][1], m[2][1], m[3][1],\n                  m[0][2], m[1][2], m[2][2], m[3][2],\n                  m[0][3], m[1][3], m[2][3], m[3][3]);\n    }\n\n    mat4 createMatrixFromQuaternionTransform( vec4 quaternion, vec3 translation ) {\n      vec4 q = quaternion;\n      vec3 t = translation;\n\n      float sx = q.x * q.x;\n      float sy = q.y * q.y;\n      float sz = q.z * q.z;\n      float cx = q.y * q.z;\n      float cy = q.x * q.z;\n      float cz = q.x * q.y;\n      float wx = q.w * q.x;\n      float wy = q.w * q.y;\n      float wz = q.w * q.z;\n\n      \n      return mat4(\n        1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), 0.0,\n        2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), 0.0,\n        2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), 0.0,\n        t.x, t.y, t.z, 1.0\n      );\n      /*\n     return mat4(\n      1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), t.x,\n      2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), t.y,\n      2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), t.z,\n      0.0, 0.0, 0.0, 1.0\n    );\n\n   return mat4(\n    1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), 0.0,\n    2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), 0.0,\n    2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), 0.0,\n    t.x, t.y, t.z, 1.0\n  );\n\n    return mat4(\n      1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), t.x,\n      2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), t.y,\n      2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), t.z,\n      0.0, 0.0, 0.0, 1.0\n    );\n    */\n  }\n\n  mat4 createMatrixFromQuaternionTransformUniformScale( vec4 quaternion, vec4 translationUniformScale ) {\n    vec4 q = quaternion;\n    vec3 t = translationUniformScale.xyz;\n    float scale = translationUniformScale.w;\n\n    float sx = q.x * q.x;\n    float sy = q.y * q.y;\n    float sz = q.z * q.z;\n    float cx = q.y * q.z;\n    float cy = q.x * q.z;\n    float cz = q.x * q.y;\n    float wx = q.w * q.x;\n    float wy = q.w * q.y;\n    float wz = q.w * q.z;\n\n    \n    mat4 mat = mat4(\n      1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), 0.0,\n      2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), 0.0,\n      2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), 0.0,\n      t.x, t.y, t.z, 1.0\n    );\n    /*\n    mat4 mat = mat4(\n    1.0 - 2.0 * (sy + sz), 2.0 * (cz + wz), 2.0 * (cy - wy), t.x,\n    2.0 * (cz - wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx + wx), t.y,\n    2.0 * (cy + wy), 2.0 * (cx - wx), 1.0 - 2.0 * (sx + sy), t.z,\n    0.0, 0.0, 0.0, 1.0\n  );\n\n  mat4 mat = mat4(\n  1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), 0.0,\n  2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), 0.0,\n  2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), 0.0,\n  t.x, t.y, t.z, 1.0\n);\n\n  mat4 mat = mat4(\n    1.0 - 2.0 * (sy + sz), 2.0 * (cz - wz), 2.0 * (cy + wy), t.x,\n    2.0 * (cz + wz), 1.0 - 2.0 * (sx + sz), 2.0 * (cx - wx), t.y,\n    2.0 * (cy - wy), 2.0 * (cx + wx), 1.0 - 2.0 * (sx + sy), t.z,\n    0.0, 0.0, 0.0, 1.0\n  );\n  */\n\n  mat4 uniformScaleMat = mat4(\n    scale, 0.0, 0.0, 0.0,\n    0.0, scale, 0.0, 0.0,\n    0.0, 0.0, scale, 0.0,\n    0.0, 0.0, 0.0, 1.0\n  );\n \n//  mat[0][0] *= scale;\n//  mat[0][1] *= scale;\n//  mat[0][2] *= scale;\n//  mat[1][0] *= scale;\n//  mat[1][1] *= scale;\n//  mat[1][2] *= scale;\n//  mat[2][0] *= scale;\n//  mat[2][1] *= scale;\n//  mat[2][2] *= scale;\n  \n  return mat*uniformScaleMat;\n}\n\n/*\n  mat4 createMatrixFromQuaternionTransform( vec4 quaternion, vec3 translation ) {\n    vec4 q = quaternion;\n    vec3 t = translation;\n    float x = q.x;\n    float y = q.y;\n    float z = q.z;\n    float w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float yx = y * x2;\n    float yy = y * y2;\n    float zx = z * x2;\n    float zy = z * y2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float m_0 = 1.0 - yy - zz;\n    float m_3 = yx - wz;\n    float m_6 = zx + wy;\n    float m_1 = yx + wz;\n    float m_4 = 1.0 - xx - zz;\n    float m_7 = zy - wx;\n    float m_2 = zx - wy;\n    float m_5 = zy + wx;\n    float m_8 = 1.0 - xx - yy;\n\n    return mat4(\n      m_0, m_3, m_6, 0.0,\n      m_1, m_4, m_7, 0.0,\n      m_2, m_5, m_8, 0.0,\n      t.x, t.y, t.z, 0.0\n    );\n\n    return mat4(\n    m_0, m_3, m_6, t.x,\n    m_1, m_4, m_7, t.y,\n    m_2, m_5, m_8, t.z,\n    0.0, 0.0, 0.0, 0.0\n  );\n\n \n   return mat4(\n    m_0, m_1, m_2, 0.0,\n    m_3, m_4, m_5, 0.0,\n    m_6, m_7, m_8, 0.0,\n    t.x, t.y, t.z, 0.0\n  );\n\nreturn mat4(\n  m_0, m_1, m_2, t.x,\n  m_3, m_4, m_5, t.y,\n  m_6, m_7, m_8, t.z,\n  0.0, 0.0, 0.0, 0.0\n);\n\n  }\n  */\n\n    vec4 unpackedVec2ToNormalizedVec4(vec2 vec_xy, float criteria){\n\n      float r;\n      float g;\n      float b;\n      float a;\n      \n      float ix = floor(vec_xy.x * criteria);\n      float v1x = ix / criteria;\n      float v1y = ix - floor(v1x) * criteria;\n  \n      r = ( v1x + 1.0 ) / (criteria-1.0);\n      g = ( v1y + 1.0 ) / (criteria-1.0);\n  \n      float iy = floor( vec_xy.y * criteria);\n      float v2x = iy / criteria;\n      float v2y = iy - floor(v2x) * criteria;\n  \n      b = ( v2x + 1.0 ) / (criteria-1.0);\n      a = ( v2y + 1.0 ) / (criteria-1.0);\n  \n      r -= 1.0/criteria;\n      g -= 1.0/criteria;\n      b -= 1.0/criteria;\n      a -= 1.0/criteria;\n        \n      r = r*2.0-1.0;\n      g = g*2.0-1.0;\n      b = b*2.0-1.0;\n      a = a*2.0-1.0;\n  \n      return vec4(r, g, b, a);\n    }\n    ';

        return shaderText;
      }
    }, {
      key: 'VSPreProcess_SkeletalShaderSource',
      value: function VSPreProcess_SkeletalShaderSource(existCamera_f, f, lights, material, extraData) {
        var shaderText = '';

        shaderText += 'vec4 weightVec = aVertex_weight;\n';

        if (!GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
          shaderText += 'mat4 skinMat = weightVec.x * skinTransformMatrices[int(aVertex_joint.x)];\n';
          shaderText += 'skinMat += weightVec.y * skinTransformMatrices[int(aVertex_joint.y)];\n';
          shaderText += 'skinMat += weightVec.z * skinTransformMatrices[int(aVertex_joint.z)];\n';
          shaderText += 'skinMat += weightVec.w * skinTransformMatrices[int(aVertex_joint.w)];\n';
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1) {
          shaderText += 'mat4 skinMat = weightVec.x * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.x)], transArray[int(aVertex_joint.x)]);\n';
          shaderText += 'skinMat += weightVec.y * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.y)], transArray[int(aVertex_joint.y)]);\n';
          shaderText += 'skinMat += weightVec.z * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.z)], transArray[int(aVertex_joint.z)]);\n';
          shaderText += 'skinMat += weightVec.w * createMatrixFromQuaternionTransformUniformScale(quatArray[int(aVertex_joint.w)], transArray[int(aVertex_joint.w)]);\n';
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {
          shaderText += 'vec2 criteria = vec2(4096.0, 4096.0);\n';
          shaderText += 'mat4 skinMat = weightVec.x * createMatrixFromQuaternionTransform(\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.x)].xy, criteria.x),\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.x)].zw, criteria.y).xyz*translationScale);\n';
          shaderText += 'skinMat += weightVec.y * createMatrixFromQuaternionTransform(\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.y)].xy, criteria.x),\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.y)].zw, criteria.y).xyz*translationScale);\n';
          shaderText += 'skinMat += weightVec.z * createMatrixFromQuaternionTransform(\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.z)].xy, criteria.x),\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.z)].zw, criteria.y).xyz*translationScale);\n';
          shaderText += 'skinMat += weightVec.w * createMatrixFromQuaternionTransform(\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.w)].xy, criteria.x),\n        unpackedVec2ToNormalizedVec4(quatTranslationArray[int(aVertex_joint.w)].zw, criteria.y).xyz*translationScale);\n';
        }

        shaderText += 'position_world = skinMat * position_local;\n';
        if (Shader._exist(f, GLBoost$1.NORMAL)) {
          shaderText += 'mat3 normalMatrix = toNormalMatrix(skinMat);\n';
          shaderText += 'normal_world = normalize(normalMatrix * normal_local);\n';
          if (Shader._exist(f, GLBoost$1.TANGENT)) {
            shaderText += 'tangent_world = normalize(normalMatrix * tangent_local);\n';
          }
        }

        shaderText += 'isSkinning = true;\n';

        return shaderText;
      }
    }, {
      key: 'prepare_SkeletalShaderSource',
      value: function prepare_SkeletalShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
        var vertexAttribsAsResult = [];

        vertexAttribs.forEach(function (attribName) {
          if (attribName === 'joint' || attribName === 'weight') {
            vertexAttribsAsResult.push(attribName);
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
          }
        });

        if (!GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
          var skinTransformMatricesUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'skinTransformMatrices');
          material.setUniform(shaderProgram, 'uniform_skinTransformMatrices', skinTransformMatricesUniformLocation);
          material._semanticsDic['JOINTMATRIX'] = 'skinTransformMatrices';
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1) {

          var quatArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'quatArray');
          material.setUniform(shaderProgram, 'uniform_quatArray', quatArrayUniformLocation);
          material._semanticsDic['JOINT_QUATERNION'] = 'quatArray';
          var transArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'transArray');
          material.setUniform(shaderProgram, 'uniform_transArray', transArrayUniformLocation);
          material._semanticsDic['JOINT_TRANSLATION'] = 'transArray';
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {
          var _quatArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'quatTranslationArray');
          material.setUniform(shaderProgram, 'uniform_quatTranslationArray', _quatArrayUniformLocation);
          material._semanticsDic['JOINT_QUATTRANSLATION'] = 'quatTranslationArray';
          var _transArrayUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'translationScale');
          material.setUniform(shaderProgram, 'uniform_translationScale', _transArrayUniformLocation);
        }

        return vertexAttribsAsResult;
      }
    }]);
    return SkeletalShaderSource;
  }();

  var VertexWorldShaderSource = function () {
    function VertexWorldShaderSource() {
      babelHelpers.classCallCheck(this, VertexWorldShaderSource);
    }

    babelHelpers.createClass(VertexWorldShaderSource, [{
      key: 'VSDefine_VertexWorldShaderSource',
      value: function VSDefine_VertexWorldShaderSource(in_, out_, f, lights, material, extraData) {
        var shaderText = '';

        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += out_ + ' vec3 v_normal_world;\n';

          if (Shader._exist(f, GLBoost.TANGENT)) {
            if (material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL)) {
              shaderText += out_ + ' vec3 v_tangent_world;\n';
              shaderText += out_ + ' vec3 v_binormal_world;\n';
            }
          }
        }
        shaderText += 'uniform mat4 worldMatrix;\n';
        shaderText += 'uniform mat4 viewMatrix;\n';
        shaderText += 'uniform mat4 projectionMatrix;\n';
        shaderText += 'uniform mat3 normalMatrix;\n';
        shaderText += 'uniform highp ivec3 objectIds;\n';
        shaderText += 'uniform float AABBLengthCenterToCorner;\n';

        shaderText += out_ + ' vec3 v_position_world;\n';

        return shaderText;
      }
    }, {
      key: 'VSPreProcess_VertexWorldShaderSource',
      value: function VSPreProcess_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
        var shaderText = '';
        shaderText += '  vec4 position_world;\n';
        shaderText += '  vec3 normal_world;\n';
        shaderText += '  vec3 tangent_world;\n';
        return shaderText;
      }
    }, {
      key: 'VSTransform_VertexWorldShaderSource',
      value: function VSTransform_VertexWorldShaderSource(existCamera_f, f, lights, material, extraData) {
        var shaderText = '';

        shaderText += '  mat4 pvwMatrix = projectionMatrix * viewMatrix * worldMatrix;\n';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += '  float borderWidth = AABBLengthCenterToCorner * 0.01;\n';
          shaderText += '  position_local.xyz = position_local.xyz + normalize(normal_local)*borderWidth * float(objectIds.z);\n';
        }

        shaderText += '  if (!isSkinning) {\n';
        shaderText += '    position_world = worldMatrix * position_local;\n';
        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += '  normal_world = normalMatrix * normal_local;\n';
        }
        shaderText += '  }\n';

        shaderText += '  v_position_world = position_world.xyz;\n';

        var normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);

        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += '  v_normal_world = normal_world;\n';
          if (Shader._exist(f, GLBoost.TANGENT) && !material.isFlatShading && normalTexture) {

            {
              shaderText += '  if (!isSkinning) {\n';
              shaderText += '    tangent_world = normalMatrix * tangent_local;\n';
              shaderText += '  }\n';
            }

            shaderText += '  v_binormal_world = cross(normal_world, tangent_world);\n';
            shaderText += '  v_tangent_world = cross(v_binormal_world, normal_world);\n';
          }
        }

        shaderText += '  gl_Position =  pvwMatrix * position_local;\n';

        return shaderText;
      }
    }, {
      key: 'FSDefine_VertexWorldShaderSource',
      value: function FSDefine_VertexWorldShaderSource(in_, f, lights, material, extraData) {
        var shaderText = '';

        shaderText += 'uniform highp ivec3 objectIds;\n';
        shaderText += 'uniform vec3 viewPosition_world;\n';

        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;
        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform vec4 lightDiffuse[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform vec3 lightSpotInfo[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform vec3 lightPosition_world[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform vec3 lightDirection_world[' + lightNumExceptAmbient + '];\n';
        }

        if (Shader._exist(f, GLBoost.NORMAL)) {
          shaderText += in_ + ' vec3 v_normal_world;\n';
          if (Shader._exist(f, GLBoost.TANGENT) && material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL)) {
            shaderText += in_ + ' vec3 v_tangent_world;\n';
            shaderText += in_ + ' vec3 v_binormal_world;\n';
          }
        }

        shaderText += in_ + ' vec3 v_position_world;\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_VertexWorldShaderSource',
      value: function FSShade_VertexWorldShaderSource(f, gl, lights) {
        var shaderText = '';
        return shaderText;
      }
    }, {
      key: 'prepare_VertexWorldShaderSource',
      value: function prepare_VertexWorldShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        vertexAttribs.forEach(function (attribName) {
          if (attribName === 'position' || attribName === 'normal' || attribName === 'tangent') {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            if (shaderProgram['vertexAttribute_' + attribName] !== -1) {
              gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
              vertexAttribsAsResult.push(attribName);
            }
          }
        });

        material.setUniform(shaderProgram, 'uniform_objectIdsAndOutlineFlag', this._glContext.getUniformLocation(shaderProgram, 'objectIds'));

        material.setUniform(shaderProgram, 'uniform_worldMatrix', this._glContext.getUniformLocation(shaderProgram, 'worldMatrix'));
        material._semanticsDic['WORLD'] = 'worldMatrix';
        material.setUniform(shaderProgram, 'uniform_normalMatrix', this._glContext.getUniformLocation(shaderProgram, 'normalMatrix'));
        material._semanticsDic['MODELVIEWINVERSETRANSPOSE'] = 'normalMatrix';
        if (existCamera_f) {
          material.setUniform(shaderProgram, 'uniform_viewMatrix', this._glContext.getUniformLocation(shaderProgram, 'viewMatrix'));
          material._semanticsDic['VIEW'] = 'viewMatrix';
          material.setUniform(shaderProgram, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
          material._semanticsDic['PROJECTION'] = 'projectionMatrix';
        }

        material.setUniform(shaderProgram, 'uniform_viewPosition', this._glContext.getUniformLocation(shaderProgram, 'viewPosition_world'));

        for (var i = 0; i < lights.length; i++) {
          material.setUniform(shaderProgram, 'uniform_lightPosition_' + i, this._glContext.getUniformLocation(shaderProgram, 'lightPosition_world[' + i + ']'));
          material.setUniform(shaderProgram, 'uniform_lightDirection_' + i, this._glContext.getUniformLocation(shaderProgram, 'lightDirection_world[' + i + ']'));
          material.setUniform(shaderProgram, 'uniform_lightDiffuse_' + i, this._glContext.getUniformLocation(shaderProgram, 'lightDiffuse[' + i + ']'));
          material.setUniform(shaderProgram, 'uniform_lightSpotInfo_' + i, this._glContext.getUniformLocation(shaderProgram, 'lightSpotInfo[' + i + ']'));
        }

        material.setUniform(shaderProgram, 'uniform_AABBLengthCenterToCorner', this._glContext.getUniformLocation(shaderProgram, 'AABBLengthCenterToCorner'));

        return vertexAttribsAsResult;
      }
    }]);
    return VertexWorldShaderSource;
  }();


  GLBoost['VertexWorldShaderSource'] = VertexWorldShaderSource;

  var AABB = function () {
    function AABB() {
      babelHelpers.classCallCheck(this, AABB);

      this._AABB_min = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
      this._AABB_max = new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
      this._centerPoint = null;
      this._lengthCenterToCorner = null;
    }

    babelHelpers.createClass(AABB, [{
      key: 'clone',
      value: function clone() {
        var instance = new AABB();
        instance._AABB_max = this._AABB_max.clone();
        instance._AABB_min = this._AABB_min.clone();
        instance._centerPoint = this._centerPoint !== null ? this._centerPoint.clone() : null;
        instance._lengthCenterToCorner = this._lengthCenterToCorner;

        return instance;
      }
    }, {
      key: 'isVanilla',
      value: function isVanilla() {
        if (this._AABB_min.x == Number.MAX_VALUE && this._AABB_min.y == Number.MAX_VALUE && this._AABB_min.z == Number.MAX_VALUE && this._AABB_max.x == -Number.MAX_VALUE && this._AABB_max.y == -Number.MAX_VALUE && this._AABB_max.z == -Number.MAX_VALUE) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'addPosition',
      value: function addPosition(positionVector) {
        this._AABB_min.x = positionVector.x < this._AABB_min.x ? positionVector.x : this._AABB_min.x;
        this._AABB_min.y = positionVector.y < this._AABB_min.y ? positionVector.y : this._AABB_min.y;
        this._AABB_min.z = positionVector.z < this._AABB_min.z ? positionVector.z : this._AABB_min.z;
        this._AABB_max.x = this._AABB_max.x < positionVector.x ? positionVector.x : this._AABB_max.x;
        this._AABB_max.y = this._AABB_max.y < positionVector.y ? positionVector.y : this._AABB_max.y;
        this._AABB_max.z = this._AABB_max.z < positionVector.z ? positionVector.z : this._AABB_max.z;

        return positionVector;
      }
    }, {
      key: 'addPositionWithArray',
      value: function addPositionWithArray(array, index) {
        this._AABB_min.x = array[index + 0] < this._AABB_min.x ? array[index + 0] : this._AABB_min.x;
        this._AABB_min.y = array[index + 1] < this._AABB_min.y ? array[index + 1] : this._AABB_min.y;
        this._AABB_min.z = array[index + 2] < this._AABB_min.z ? array[index + 2] : this._AABB_min.z;
        this._AABB_max.x = this._AABB_max.x < array[index + 0] ? array[index + 0] : this._AABB_max.x;
        this._AABB_max.y = this._AABB_max.y < array[index + 1] ? array[index + 1] : this._AABB_max.y;
        this._AABB_max.z = this._AABB_max.z < array[index + 2] ? array[index + 2] : this._AABB_max.z;

        return array;
      }
    }, {
      key: 'updateAllInfo',
      value: function updateAllInfo() {
        this._centerPoint = Vector3.add(this._AABB_min, this._AABB_max).divide(2);
        var lengthCenterToCorner = Vector3.lengthBtw(this._centerPoint, this._AABB_max);
        this._lengthCenterToCorner = lengthCenterToCorner !== lengthCenterToCorner ? 0 : lengthCenterToCorner;

        return this;
      }
    }, {
      key: 'mergeAABB',
      value: function mergeAABB(aabb) {
        var isUpdated = false;

        if (aabb.isVanilla()) {
          return isUpdated;
        }

        if (this.isVanilla()) {
          this._AABB_min.x = aabb.minPoint.x;
          this._AABB_min.y = aabb.minPoint.y;
          this._AABB_min.z = aabb.minPoint.z;
          this._AABB_max.x = aabb.maxPoint.x;
          this._AABB_max.y = aabb.maxPoint.y;
          this._AABB_max.z = aabb.maxPoint.z;
          isUpdated = true;
          return isUpdated;
        }

        if (aabb.minPoint.x < this._AABB_min.x) {
          this._AABB_min.x = aabb.minPoint.x;
          isUpdated = true;
        }
        if (aabb.minPoint.y < this._AABB_min.y) {
          this._AABB_min.y = aabb.minPoint.y;
          isUpdated = true;
        }
        if (aabb.minPoint.z < this._AABB_min.z) {
          this._AABB_min.z = aabb.minPoint.z;
          isUpdated = true;
        }
        if (this._AABB_max.x < aabb.maxPoint.x) {
          this._AABB_max.x = aabb.maxPoint.x;
          isUpdated = true;
        }
        if (this._AABB_max.y < aabb.maxPoint.y) {
          this._AABB_max.y = aabb.maxPoint.y;
          isUpdated = true;
        }
        if (this._AABB_max.z < aabb.maxPoint.z) {
          this._AABB_max.z = aabb.maxPoint.z;
          isUpdated = true;
        }
        this.updateAllInfo();

        return isUpdated;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return 'AABB_min: ' + this._AABB_min + '\n' + 'AABB_max: ' + this._AABB_max + '\n' + 'centerPoint: ' + this._centerPoint + '\n' + 'lengthCenterToCorner: ' + this._lengthCenterToCorner;
      }
    }, {
      key: 'minPoint',
      get: function get() {
        return this._AABB_min;
      }
    }, {
      key: 'maxPoint',
      get: function get() {
        return this._AABB_max;
      }
    }, {
      key: 'centerPoint',
      get: function get() {
        return this._centerPoint;
      }
    }, {
      key: 'lengthCenterToCorner',
      get: function get() {
        return this._lengthCenterToCorner;
      }
    }, {
      key: 'sizeX',
      get: function get() {
        return this._AABB_max.x - this._AABB_min.x;
      }
    }, {
      key: 'sizeY',
      get: function get() {
        return this._AABB_max.y - this._AABB_min.y;
      }
    }, {
      key: 'sizeZ',
      get: function get() {
        return this._AABB_max.z - this._AABB_min.z;
      }
    }], [{
      key: 'multiplyMatrix',
      value: function multiplyMatrix(matrix, aabb) {
        if (aabb.isVanilla()) {
          return aabb.clone();
        }
        var newAabb = new AABB();

        var AABB_0 = new Vector4$1(aabb._AABB_min.x, aabb._AABB_min.y, aabb._AABB_min.z, 1);
        var AABB_1 = new Vector4$1(aabb._AABB_max.x, aabb._AABB_min.y, aabb._AABB_min.z, 1);
        var AABB_2 = new Vector4$1(aabb._AABB_min.x, aabb._AABB_max.y, aabb._AABB_min.z, 1);
        var AABB_3 = new Vector4$1(aabb._AABB_min.x, aabb._AABB_min.y, aabb._AABB_max.z, 1);
        var AABB_4 = new Vector4$1(aabb._AABB_min.x, aabb._AABB_max.y, aabb._AABB_max.z, 1);
        var AABB_5 = new Vector4$1(aabb._AABB_max.x, aabb._AABB_min.y, aabb._AABB_max.z, 1);
        var AABB_6 = new Vector4$1(aabb._AABB_max.x, aabb._AABB_max.y, aabb._AABB_min.z, 1);
        var AABB_7 = new Vector4$1(aabb._AABB_max.x, aabb._AABB_max.y, aabb._AABB_max.z, 1);
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_0)));
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_1)));
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_2)));
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_3)));
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_4)));
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_5)));
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_6)));
        newAabb.addPosition(new Vector3(matrix.multiplyVector(AABB_7)));
        newAabb.updateAllInfo();

        return newAabb;
      }
    }]);
    return AABB;
  }();


  GLBoost$1['AABB'] = AABB;

  var FreeShader = function (_Shader) {
    babelHelpers.inherits(FreeShader, _Shader);

    function FreeShader(glBoostContext, vertexShaderText, fragmentShaderText, attributes, uniforms, textureNames) {
      babelHelpers.classCallCheck(this, FreeShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (FreeShader.__proto__ || Object.getPrototypeOf(FreeShader)).call(this, glBoostContext));

      _this._vertexShaderText = vertexShaderText;
      _this._fragmentShaderText = fragmentShaderText;

      var newAttributes = {};
      for (var attributeName in attributes) {
        switch (attributes[attributeName]) {
          case 'POSITION':
            newAttributes.position = attributeName;
            break;
          case 'NORMAL':
            newAttributes.normal = attributeName;
            break;
          case 'COLOR':
            newAttributes.color = attributeName;
            break;
          case 'TEXCOORD_0':
            newAttributes.texcoord = attributeName;
            break;
          case 'JOINT':
            newAttributes.joint = attributeName;
            break;
          case 'WEIGHT':
            newAttributes.weight = attributeName;
            break;
          default:
            newAttributes[attributes[attributeName]] = attributeName;
            break;
        }
      }

      _this._attributes = newAttributes;
      _this._uniforms = uniforms;
      _this._textureNames = textureNames;
      return _this;
    }

    babelHelpers.createClass(FreeShader, [{
      key: '_getVertexShaderString',
      value: function _getVertexShaderString(gl, functions, existCamera_f, lights, material, extraData) {
        return this._vertexShaderText;
      }
    }, {
      key: '_getFragmentShaderString',
      value: function _getFragmentShaderString(gl, functions, lights, material, extraData) {
        return this._fragmentShaderText;
      }
    }, {
      key: '_prepareAssetsForShaders',
      value: function _prepareAssetsForShaders(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
        var _this2 = this;

        var vertexAttribsAsResult = [];

        vertexAttribs.forEach(function (attribName) {
          shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, _this2._attributes[attribName]);
          if (shaderProgram['vertexAttribute_' + attribName] >= 0) {
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
            vertexAttribsAsResult.push(attribName);
          }
        });

        var textureCount = 0;
        this._glContext.useProgram(shaderProgram);

        for (var uniformName in this._uniforms) {
          if (this._uniforms[uniformName] === 'TEXTURE') {

            var uTexture = material._glContext.getUniformLocation(shaderProgram, uniformName);
            material._glContext.uniform1i(uTexture, textureCount, true);
            material.setUniform(shaderProgram, uniformName, uTexture);
            material.uniformTextureSamplerDic[uniformName] = {};
            material.uniformTextureSamplerDic[uniformName].textureUnitIndex = textureCount;
            material.uniformTextureSamplerDic[uniformName].textureName = this._textureNames[uniformName];
            var texturePurpose = material.getTexturePurpose(this._textureNames[uniformName]);
            material._textureSemanticsDic[texturePurpose] = uniformName;
            textureCount++;
          }

          switch (this._uniforms[uniformName]) {
            case 'WORLD':
            case 'VIEW':
            case 'MODELVIEW':
            case 'MODELVIEWINVERSETRANSPOSE':
            case 'PROJECTION':
            case 'JOINTMATRIX':
              material.setUniform(shaderProgram, 'uniform_' + uniformName, this._glContext.getUniformLocation(shaderProgram, uniformName));
            case 'TEXTURE':
              material.addSemanticsDic(this._uniforms[uniformName], uniformName);
              continue;
          }

          material.setUniform(shaderProgram, 'uniform_' + uniformName, this._glContext.getUniformLocation(shaderProgram, uniformName));
        }

        return vertexAttribsAsResult;
      }
    }, {
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, expression, material, camera, mesh, lights) {
        babelHelpers.get(FreeShader.prototype.__proto__ || Object.getPrototypeOf(FreeShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, expression, material, camera, mesh, lights);

        for (var uniformName in this._uniforms) {
          var value = this._uniforms[uniformName];

          if (typeof value === 'number') {
            this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_' + uniformName), value, true);
          } else if (value instanceof Vector2) {
            this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, true);
          } else if (value instanceof Vector3) {
            this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, value.z, true);
          } else if (value instanceof Vector4$1) {
            this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_' + uniformName), value.x, value.y, value.z, value.w, true);
          }
        }

        for (var parameterName in material.shaderParameters) {
          var _value = material.shaderParameters[parameterName];

          if (typeof _value === 'number') {
            this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_' + parameterName), _value, true);
          } else if (_value instanceof Vector2) {
            this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_' + parameterName), _value.x, _value.y, true);
          } else if (_value instanceof Vector3) {
            this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_' + parameterName), _value.x, _value.y, _value.z, true);
          } else if (_value instanceof Vector4$1) {
            this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_' + parameterName), _value.x, _value.y, _value.z, _value.w, true);
          }
        }
      }
    }, {
      key: 'attributes',
      get: function get() {
        return this._attributes;
      }
    }]);
    return FreeShader;
  }(Shader);


  GLBoost['FreeShader'] = FreeShader;

  var Geometry = function (_GLBoostObject) {
    babelHelpers.inherits(Geometry, _GLBoostObject);

    function Geometry(glBoostContext) {
      babelHelpers.classCallCheck(this, Geometry);

      var _this = babelHelpers.possibleConstructorReturn(this, (Geometry.__proto__ || Object.getPrototypeOf(Geometry)).call(this, glBoostContext));

      _this._materials = [];
      _this._vertexN = 0;
      _this._vertices = null;
      _this._indicesArray = null;
      _this._indexStartOffsetArray = [];
      _this._performanceHint = null;
      _this._defaultMaterial = null;
      _this._vertexData = [];
      _this._extraDataForShader = {};
      _this._vboObj = {};
      _this._AABB = new AABB();
      _this._drawKicker = DrawKickerWorld.getInstance();

      return _this;
    }

    babelHelpers.createClass(Geometry, [{
      key: '_createShaderInstance',
      value: function _createShaderInstance(glBoostContext, shaderClass) {
        var shaderInstance = new shaderClass(glBoostContext, VertexWorldShaderSource);
        return shaderInstance;
      }
    }, {
      key: '_allVertexAttribs',
      value: function _allVertexAttribs(vertices) {
        var attribNameArray = [];
        for (var attribName in vertices) {
          if (attribName !== 'components' && attribName !== 'componentBytes' && attribName !== 'componentType') {
            attribNameArray.push(attribName);
          }
        }

        return attribNameArray;
      }
    }, {
      key: '_checkAndSetVertexComponentNumber',
      value: function _checkAndSetVertexComponentNumber(allVertexAttribs) {
        var _this2 = this;

        allVertexAttribs.forEach(function (attribName) {
          var element = _this2._vertices[attribName][0];
          var componentN = MathClassUtil.compomentNumberOfVector(element);
          if (componentN === 0) {
            return;
          }
          if (typeof _this2._vertices.components === 'undefined') {
            _this2._vertices.components = {};
          }
          if (typeof _this2._vertices.componentType === 'undefined') {
            _this2._vertices.componentType = {};
          }

          _this2._vertices.components[attribName] = componentN;
          _this2._vertices.componentType[attribName] = 5126;
        });
      }
    }, {
      key: '_calcBaryCentricCoord',
      value: function _calcBaryCentricCoord(vertexNum, positionElementNumPerVertex) {
        this._vertices.barycentricCoord = new Float32Array(vertexNum * positionElementNumPerVertex);
        this._vertices.components.barycentricCoord = 3;
        this._vertices.componentType.barycentricCoord = 5126;
        if (!this._indicesArray) {
          for (var i = 0; i < vertexNum; i++) {
            this._vertices.barycentricCoord[i * positionElementNumPerVertex + 0] = i % 3 === 0 ? 1 : 0;
            this._vertices.barycentricCoord[i * positionElementNumPerVertex + 1] = i % 3 === 1 ? 1 : 0;
            this._vertices.barycentricCoord[i * positionElementNumPerVertex + 2] = i % 3 === 2 ? 1 : 0;
          }
        } else {
          for (var _i = 0; _i < this._indicesArray.length; _i++) {
            var vertexIndices = this._indicesArray[_i];
            for (var j = 0; j < vertexIndices.length; j++) {
              this._vertices.barycentricCoord[vertexIndices[j] * positionElementNumPerVertex + 0] = j % 3 === 0 ? 1 : 0;
              this._vertices.barycentricCoord[vertexIndices[j] * positionElementNumPerVertex + 1] = j % 3 === 1 ? 1 : 0;
              this._vertices.barycentricCoord[vertexIndices[j] * positionElementNumPerVertex + 2] = j % 3 === 2 ? 1 : 0;
            }
          }
        }
      }
    }, {
      key: '_calcTangentPerVertex',
      value: function _calcTangentPerVertex(pos0Vec3, pos1Vec3, pos2Vec3, uv0Vec2, uv1Vec2, uv2Vec2) {
        var cp0 = [new Vector3(pos0Vec3.x, uv0Vec2.x, uv0Vec2.y), new Vector3(pos0Vec3.y, uv0Vec2.x, uv0Vec2.y), new Vector3(pos0Vec3.z, uv0Vec2.x, uv0Vec2.y)];

        var cp1 = [new Vector3(pos1Vec3.x, uv1Vec2.x, uv1Vec2.y), new Vector3(pos1Vec3.y, uv1Vec2.x, uv1Vec2.y), new Vector3(pos1Vec3.z, uv1Vec2.x, uv1Vec2.y)];

        var cp2 = [new Vector3(pos2Vec3.x, uv2Vec2.x, uv2Vec2.y), new Vector3(pos2Vec3.y, uv2Vec2.x, uv2Vec2.y), new Vector3(pos2Vec3.z, uv2Vec2.x, uv2Vec2.y)];

        var u = [];
        var v = [];

        for (var i = 0; i < 3; i++) {
          var v1 = Vector3.subtract(cp1[i], cp0[i]);
          var v2 = Vector3.subtract(cp2[i], cp1[i]);
          var abc = Vector3.cross(v1, v2);

          var validate = Math.abs(abc.x) < Number.EPSILON;
          if (validate) {
            console.assert(validate, "Polygons or polygons on UV are degenerate!");
            return new Vector3(0, 0, 0);
          }

          u[i] = -abc.y / abc.x;
          v[i] = -abc.z / abc.x;
        }

        return new Vector3(u[0], u[1], u[2]).normalize();
      }
    }, {
      key: '_calcTangentFor3Vertices',
      value: function _calcTangentFor3Vertices(vertexIndices, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, incrementNum) {
        var pos0Vec3 = new Vector3(this._vertices.position[pos0IndexBase], this._vertices.position[pos0IndexBase + 1], this._vertices.position[pos0IndexBase + 2]);

        var pos1Vec3 = new Vector3(this._vertices.position[pos1IndexBase], this._vertices.position[pos1IndexBase + 1], this._vertices.position[pos1IndexBase + 2]);

        var pos2Vec3 = new Vector3(this._vertices.position[pos2IndexBase], this._vertices.position[pos2IndexBase + 1], this._vertices.position[pos2IndexBase + 2]);

        var uv0Vec2 = new Vector2(this._vertices.texcoord[uv0IndexBase], this._vertices.texcoord[uv0IndexBase + 1]);

        var uv1Vec2 = new Vector2(this._vertices.texcoord[uv1IndexBase], this._vertices.texcoord[uv1IndexBase + 1]);

        var uv2Vec2 = new Vector2(this._vertices.texcoord[uv2IndexBase], this._vertices.texcoord[uv2IndexBase + 1]);

        var componentNum3 = 3;
        var tan0IndexBase = i * componentNum3;
        var tan1IndexBase = (i + 1) * componentNum3;
        var tan2IndexBase = (i + 2) * componentNum3;
        if (vertexIndices) {
          tan0IndexBase = vertexIndices[i] * componentNum3;
          tan1IndexBase = vertexIndices[i + 1] * componentNum3;
          tan2IndexBase = vertexIndices[i + 2] * componentNum3;
        }

        var tan0Vec3 = this._calcTangentPerVertex(pos0Vec3, pos1Vec3, pos2Vec3, uv0Vec2, uv1Vec2, uv2Vec2);
        this._vertices.tangent[tan0IndexBase] = tan0Vec3.x;
        this._vertices.tangent[tan0IndexBase + 1] = tan0Vec3.y;
        this._vertices.tangent[tan0IndexBase + 2] = tan0Vec3.z;

        var tan1Vec3 = this._calcTangentPerVertex(pos1Vec3, pos2Vec3, pos0Vec3, uv1Vec2, uv2Vec2, uv0Vec2);
        this._vertices.tangent[tan1IndexBase] = tan1Vec3.x;
        this._vertices.tangent[tan1IndexBase + 1] = tan1Vec3.y;
        this._vertices.tangent[tan1IndexBase + 2] = tan1Vec3.z;

        var tan2Vec3 = this._calcTangentPerVertex(pos2Vec3, pos0Vec3, pos1Vec3, uv2Vec2, uv0Vec2, uv1Vec2);
        this._vertices.tangent[tan2IndexBase] = tan2Vec3.x;
        this._vertices.tangent[tan2IndexBase + 1] = tan2Vec3.y;
        this._vertices.tangent[tan2IndexBase + 2] = tan2Vec3.z;
      }
    }, {
      key: '_calcTangent',
      value: function _calcTangent(vertexNum, positionElementNumPerVertex, texcoordElementNumPerVertex, primitiveType) {

        this._vertices.tangent = new Float32Array(vertexNum * positionElementNumPerVertex);
        this._vertices.components.tangent = 3;
        this._vertices.componentType.tangent = 5126;

        var incrementNum = 3;
        if (primitiveType === GLBoost$1.TRIANGLE_STRIP) {
          incrementNum = 1;
        }
        if (this._vertices.texcoord) {
          if (!this._indicesArray) {
            for (var i = 0; i < vertexNum - 2; i += incrementNum) {
              var pos0IndexBase = i * positionElementNumPerVertex;
              var pos1IndexBase = (i + 1) * positionElementNumPerVertex;
              var pos2IndexBase = (i + 2) * positionElementNumPerVertex;
              var uv0IndexBase = i * texcoordElementNumPerVertex;
              var uv1IndexBase = (i + 1) * texcoordElementNumPerVertex;
              var uv2IndexBase = (i + 2) * texcoordElementNumPerVertex;

              this._calcTangentFor3Vertices(null, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, uv0IndexBase, uv1IndexBase, uv2IndexBase, incrementNum);
            }
          } else {
            for (var _i2 = 0; _i2 < this._indicesArray.length; _i2++) {
              var vertexIndices = this._indicesArray[_i2];
              for (var j = 0; j < vertexIndices.length - 2; j += incrementNum) {
                var _pos0IndexBase = vertexIndices[j] * positionElementNumPerVertex;
                var _pos1IndexBase = vertexIndices[j + 1] * positionElementNumPerVertex;
                var _pos2IndexBase = vertexIndices[j + 2] * positionElementNumPerVertex;
                var _uv0IndexBase = vertexIndices[j] * texcoordElementNumPerVertex;
                var _uv1IndexBase = vertexIndices[j + 1] * texcoordElementNumPerVertex;
                var _uv2IndexBase = vertexIndices[j + 2] * texcoordElementNumPerVertex;

                this._calcTangentFor3Vertices(vertexIndices, j, _pos0IndexBase, _pos1IndexBase, _pos2IndexBase, _uv0IndexBase, _uv1IndexBase, _uv2IndexBase, incrementNum);
              }
            }
          }
        }
      }
    }, {
      key: 'setVerticesData',
      value: function setVerticesData(vertices, indicesArray) {
        var _this3 = this;

        var primitiveType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : GLBoost$1.TRIANGLES;
        var performanceHint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : GLBoost$1.STATIC_DRAW;

        this._vertices = vertices;
        this._indicesArray = indicesArray;

        var allVertexAttribs = this._allVertexAttribs(this._vertices);
        this._checkAndSetVertexComponentNumber(allVertexAttribs);

        var vertexNum = 0;
        var positionElementNum = 0;
        var positionElementNumPerVertex = this._vertices.components.position;
        var texcoordElementNumPerVertex = this._vertices.components.texcoord;

        if (typeof this._vertices.position.buffer !== 'undefined') {
          vertexNum = this._vertices.position.length / positionElementNumPerVertex;
          positionElementNum = this._vertices.position.length;
        } else {
          vertexNum = this._vertices.position.length;
          positionElementNum = this._vertices.position.length * positionElementNumPerVertex;
        }

        this._calcBaryCentricCoord(vertexNum, positionElementNumPerVertex);

        allVertexAttribs = this._allVertexAttribs(this._vertices);
        this._checkAndSetVertexComponentNumber(allVertexAttribs);

        allVertexAttribs.forEach(function (attribName) {
          if (attribName === 'barycentricCoord') {
            return;
          }
          if (attribName === 'tangent') {
            return;
          }
          if (typeof _this3._vertices[attribName].buffer !== 'undefined') {
            return;
          }
          var vertexAttribArray = [];
          _this3._vertices[attribName].forEach(function (elem, index) {
            var element = _this3._vertices[attribName][index];
            Array.prototype.push.apply(vertexAttribArray, MathClassUtil.vectorToArray(element));
          });
          _this3._vertices[attribName] = vertexAttribArray;
        });

        if (this._vertices.texcoord) {
          this._calcTangent(vertexNum, positionElementNumPerVertex, texcoordElementNumPerVertex, primitiveType);
        }

        this._calcArenbergInverseMatrices(primitiveType);

        allVertexAttribs.forEach(function (attribName) {
          if (typeof _this3._vertices[attribName].buffer === 'undefined') {
            _this3._vertices[attribName] = new Float32Array(_this3._vertices[attribName]);
          }
        });

        for (var i = 0; i < vertexNum; i++) {
          this._AABB.addPositionWithArray(this._vertices.position, i * positionElementNumPerVertex);
        }

        this._AABB.updateAllInfo();

        var gl = this._glContext.gl;
        var primitiveTypeStr = GLBoost$1.getValueOfGLBoostConstant(primitiveType);
        this._primitiveType = gl[primitiveTypeStr];
        var performanceHintStr = GLBoost$1.getValueOfGLBoostConstant(performanceHint);
        this._performanceHint = gl[performanceHintStr];
      }
    }, {
      key: 'updateVerticesData',
      value: function updateVerticesData(vertices) {
        var _this4 = this;

        var skipUpdateAABB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var gl = this._glContext.gl;

        var _loop = function _loop(attribName) {
          var vertexAttribArray = [];
          _this4._vertices[attribName].forEach(function (elem, index) {
            var element = vertices[attribName][index];
            Array.prototype.push.apply(vertexAttribArray, MathClassUtil.vectorToArray(element));

            if (attribName === 'position' && !(skipUpdateAABB === true)) {
              var componentN = _this4._vertices.components[attribName];
              _this4._AABB.addPositionWithArray(vertexAttribArray, index * componentN);
            }
            _this4._vertices[attribName] = vertexAttribArray;
          });
        };

        for (var attribName in vertices) {
          _loop(attribName);
        }

        if (!(skipUpdateAABB === true)) {
          this._AABB.updateAllInfo();
        }

        for (var attribName in vertices) {
          if (this._vboObj[attribName]) {
            var float32AryVertexData = new Float32Array(this._vertices[attribName]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vboObj[attribName]);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, float32AryVertexData);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
          } else {
            return false;
          }
        }
        return true;
      }
    }, {
      key: 'setUpVertexAttribs',
      value: function setUpVertexAttribs(gl, glslProgram, allVertexAttribs) {
        var _this5 = this;

        var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

        allVertexAttribs.forEach(function (attribName) {
          if (optimizedVertexAttribs.indexOf(attribName) != -1) {
            gl.bindBuffer(gl.ARRAY_BUFFER, _this5._vboObj[attribName]);
            gl.vertexAttribPointer(glslProgram['vertexAttribute_' + attribName], _this5._vertices.components[attribName], _this5._vertices.componentType[attribName], false, 0, 0);
          }
        });
      }
    }, {
      key: 'setUpEnableVertexAttribArrays',
      value: function setUpEnableVertexAttribArrays(gl, glslProgram, allVertexAttribs) {
        var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

        allVertexAttribs.forEach(function (attribName) {
          if (optimizedVertexAttribs.indexOf(attribName) != -1) {
            gl.enableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
          }
        });
      }
    }, {
      key: 'setUpDisableAllVertexAttribArrays',
      value: function setUpDisableAllVertexAttribArrays(gl, glslProgram) {

        for (var i = 0; i < 8; i++) {
          gl.disableVertexAttribArray(i);
        }
      }
    }, {
      key: 'setUpDisableVertexAttribArrays',
      value: function setUpDisableVertexAttribArrays(gl, glslProgram, allVertexAttribs) {
        var optimizedVertexAttribs = glslProgram.optimizedVertexAttribs;

        allVertexAttribs.forEach(function (attribName) {
          if (optimizedVertexAttribs.indexOf(attribName) != -1) {
            gl.disableVertexAttribArray(glslProgram['vertexAttribute_' + attribName]);
          }
        });
      }
    }, {
      key: '_getVAO',
      value: function _getVAO() {
        return Geometry._vaoDic[this.toString()];
      }
    }, {
      key: '_getAllVertexAttribs',
      value: function _getAllVertexAttribs() {
        return this._allVertexAttribs(this._vertices);
      }
    }, {
      key: 'prepareGLSLProgram',
      value: function prepareGLSLProgram(expression, material, existCamera_f, lights) {
        var shaderClass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : void 0;
        var argShaderInstance = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : void 0;

        var vertices = this._vertices;

        var _optimizedVertexAttribs = this._allVertexAttribs(vertices, material);

        var shaderInstance = null;
        if (argShaderInstance) {
          shaderInstance = argShaderInstance;
        } else {
          if (shaderClass) {
            shaderInstance = this._createShaderInstance(this._glBoostSystem, shaderClass);
          } else {
            shaderInstance = this._createShaderInstance(this._glBoostSystem, material.shaderClass);
          }
        }

        shaderInstance.getShaderProgram(expression, _optimizedVertexAttribs, existCamera_f, lights, material, this._extraDataForShader);

        return shaderInstance;
      }
    }, {
      key: '_setVertexNtoSingleMaterial',
      value: function _setVertexNtoSingleMaterial(material, index) {
        if (this._indicesArray && this._indicesArray.length > 0) {
          material.setVertexN(this, this._indicesArray[index].length);
        } else {
          material.setVertexN(this, this._vertexN);
        }
      }
    }, {
      key: '_getAppropriateMaterials',
      value: function _getAppropriateMaterials(mesh) {
        var materials = null;
        if (this._materials.length > 0) {
          materials = this._materials;
        } else if (mesh.material) {
          materials = [mesh.material];
        } else {
          mesh.material = this._glBoostSystem._defaultMaterial;
          materials = [mesh.material];
        }
        return materials;
      }
    }, {
      key: 'getIndexStartOffsetArrayAtMaterial',
      value: function getIndexStartOffsetArrayAtMaterial(i) {
        return this._indexStartOffsetArray[i];
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender(expression, existCamera_f, lights, meshMaterial, mesh) {
        var _this6 = this;

        var shaderClass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : void 0;
        var argMaterials = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : void 0;


        var vertices = this._vertices;
        var gl = this._glContext.gl;

        var glem = GLExtensionsManager.getInstance(this._glContext);

        this._vertexN = vertices.position.length / vertices.components.position;

        var allVertexAttribs = this._allVertexAttribs(vertices);

        if (Geometry._vaoDic[this.toString()]) ; else {
          var vao = this._glContext.createVertexArray(this);
          Geometry._vaoDic[this.toString()] = vao;
        }
        glem.bindVertexArray(gl, Geometry._vaoDic[this.toString()]);

        var doAfter = false;

        allVertexAttribs.forEach(function (attribName) {
          if (_this6._vboObj[attribName]) {
            gl.bindBuffer(gl.ARRAY_BUFFER, _this6._vboObj[attribName]);
          } else {
            var vbo = _this6._glContext.createBuffer(_this6);
            _this6._vboObj[attribName] = vbo;

            gl.bindBuffer(gl.ARRAY_BUFFER, _this6._vboObj[attribName]);

            gl.bufferData(gl.ARRAY_BUFFER, _this6._vertices[attribName], _this6._performanceHint);


            doAfter = true;
          }
        });

        if (doAfter) {

          if (Geometry._iboArrayDic[this.toString()]) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Geometry._iboArrayDic[this.toString()]);
          } else {
            if (this._indicesArray) {
              var indices = [];
              for (var i = 0; i < this._indicesArray.length; i++) {
                if (i == 0) {
                  this._indexStartOffsetArray[i] = 0;
                }
                this._indexStartOffsetArray[i + 1] = this._indexStartOffsetArray[i] + this._indicesArray[i].length;

                indices = indices.concat(this._indicesArray[i]);
              }

              var ibo = this._glContext.createBuffer(this);
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
              gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glem.createUintArrayForElementIndex(gl, indices), gl.STATIC_DRAW);
              Geometry._iboArrayDic[this.toString()] = ibo;
            }
          }
        }

        var materials = argMaterials;

        if (argMaterials === void 0) {
          materials = this._getAppropriateMaterials(mesh);
        }


        for (var _i3 = 0; _i3 < materials.length; _i3++) {
          var shaderInstance = null;

          if (materials[_i3].shaderInstance && materials[_i3].shaderInstance.constructor === FreeShader) {
            shaderInstance = this.prepareGLSLProgram(expression, materials[_i3], existCamera_f, lights, void 0, materials[_i3].shaderInstance);
          } else {
            shaderInstance = this.prepareGLSLProgram(expression, materials[_i3], existCamera_f, lights, shaderClass);
          }


          this._setVertexNtoSingleMaterial(materials[_i3], _i3);
          shaderInstance.vao = Geometry._vaoDic[this.toString()];
          this.setUpVertexAttribs(gl, shaderInstance._glslProgram, allVertexAttribs);

          if (argMaterials === void 0) {
            materials[_i3].shaderInstance = shaderInstance;
          } else {
            argMaterials[_i3].shaderInstance = shaderInstance;
          }
        }

        glem.bindVertexArray(gl, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        return materials;
      }
    }, {
      key: '_setUpVertexAttibsWrapper',
      value: function _setUpVertexAttibsWrapper(glslProgram) {
        this.setUpVertexAttribs(this._glContext.gl, glslProgram, this._getAllVertexAttribs());
      }
    }, {
      key: 'draw',
      value: function draw(data) {
        var gl = this._glContext.gl;
        var glem = GLExtensionsManager.getInstance(this._glContext);

        var materials = this._getAppropriateMaterials(data.mesh);

        var thisName = this.toString();

        this._drawKicker.draw({
          gl: gl,
          glem: glem,
          expression: data.expression,
          lights: data.lights,
          camera: data.camera,
          mesh: data.mesh,
          scene: data.scene,
          renderPassIndex: data.renderPassIndex,
          materials: materials,
          vertices: this._vertices,
          vaoDic: Geometry._vaoDic,
          vboObj: this._vboObj,
          iboArrayDic: Geometry._iboArrayDic,
          geometry: this,
          geometryName: thisName,
          primitiveType: this._primitiveType,
          vertexN: this._vertexN,
          viewport: data.viewport,
          isWebVRMode: data.isWebVRMode,
          webvrFrameData: data.webvrFrameData,
          forceThisMaterial: data.forceThisMaterial
        });
      }
    }, {
      key: 'drawIntermediate',
      value: function drawIntermediate() {}
    }, {
      key: 'merge',
      value: function merge(geometrys) {
        var _this7 = this;

        if (Array.isArray(geometrys)) {
          var typedArrayDic = {};
          var allVertexAttribs = this._allVertexAttribs(this._vertices);
          allVertexAttribs.forEach(function (attribName) {
            var thisLength = _this7._vertices[attribName].length;

            var allGeomLength = 0;
            geometrys.forEach(function (geometry) {
              allGeomLength += geometry._vertices[attribName].length;
            });
            typedArrayDic[attribName] = new Float32Array(thisLength + allGeomLength);
          });

          var lastThisLengthDic = {};
          allVertexAttribs.forEach(function (attribName) {
            lastThisLengthDic[attribName] = 0;
          });
          geometrys.forEach(function (geometry, index) {
            var typedSubArrayDic = {};
            allVertexAttribs.forEach(function (attribName) {
              var typedArray = typedArrayDic[attribName];

              if (index === 0) {
                lastThisLengthDic[attribName] = geometrys[index]._vertices[attribName].length;
              }

              var end = typeof geometrys[index + 1] !== 'undefined' ? lastThisLengthDic[attribName] + geometrys[index + 1]._vertices[attribName].length : void 0;
              typedSubArrayDic[attribName] = typedArray.subarray(0, end);
              lastThisLengthDic[attribName] = end;
            });
            _this7.mergeInner(geometry, typedSubArrayDic, index === 0);
          });
        } else {
          var geometry = geometrys;
          var _typedArrayDic = {};
          var _allVertexAttribs2 = this._allVertexAttribs(this._vertices);
          _allVertexAttribs2.forEach(function (attribName) {
            var thisLength = _this7._vertices[attribName].length;
            var geomLength = geometry._vertices[attribName].length;

            _typedArrayDic[attribName] = new Float32Array(thisLength + geomLength);
          });

          this.mergeInner(geometry, _typedArrayDic);
        }
      }
    }, {
      key: 'mergeInner',
      value: function mergeInner(geometry, typedArrayDic) {
        var _this8 = this;

        var isFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var gl = this._glContext.gl;
        var baseLen = this._vertices.position.length / this._vertices.components.position;
        if (this === geometry) {
          console.assert('don\'t merge same geometry!');
        }

        var allVertexAttribs = this._allVertexAttribs(this._vertices);

        allVertexAttribs.forEach(function (attribName) {
          var thisLength = _this8._vertices[attribName].length;
          var geomLength = geometry._vertices[attribName].length;

          var float32array = typedArrayDic[attribName];

          if (isFirst) {
            float32array.set(_this8._vertices[attribName], 0);
          }
          float32array.set(geometry._vertices[attribName], thisLength);

          _this8._vertices[attribName] = float32array;

          if (typeof _this8._vboObj[attribName] !== 'undefined') {
            gl.bindBuffer(gl.ARRAY_BUFFER, _this8._vboObj[attribName]);
            gl.bufferData(gl.ARRAY_BUFFER, _this8._vertices[attribName], _this8._performanceHint);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
          }
        });

        var geometryIndicesN = geometry._indicesArray.length;
        for (var i = 0; i < geometryIndicesN; i++) {
          for (var j = 0; j < geometry._indicesArray[i].length; j++) {
            geometry._indicesArray[i][j] += baseLen;
          }
          this._indicesArray.push(geometry._indicesArray[i]);
          if (geometry._materials[i]) {
            this._materials.push(geometry._materials[i]);
          }
        }
        this._vertexN += geometry._vertexN;
      }
    }, {
      key: 'mergeHarder',
      value: function mergeHarder(geometrys) {
        var _this9 = this;

        if (Array.isArray(geometrys)) {
          var typedArrayDic = {};
          var allVertexAttribs = this._allVertexAttribs(this._vertices);
          allVertexAttribs.forEach(function (attribName) {
            var thisLength = _this9._vertices[attribName].length;

            var allGeomLength = 0;
            geometrys.forEach(function (geometry) {
              allGeomLength += geometry._vertices[attribName].length;
            });
            typedArrayDic[attribName] = new Float32Array(thisLength + allGeomLength);
          });

          var lastThisLengthDic = {};
          allVertexAttribs.forEach(function (attribName) {
            lastThisLengthDic[attribName] = 0;
          });
          geometrys.forEach(function (geometry, index) {
            var typedSubArrayDic = {};
            allVertexAttribs.forEach(function (attribName) {
              var typedArray = typedArrayDic[attribName];

              if (index === 0) {
                lastThisLengthDic[attribName] = geometrys[index]._vertices[attribName].length;
              }

              var end = typeof geometrys[index + 1] !== 'undefined' ? lastThisLengthDic[attribName] + geometrys[index + 1]._vertices[attribName].length : void 0;
              typedSubArrayDic[attribName] = typedArray.subarray(0, end);
              lastThisLengthDic[attribName] = end;
            });
            _this9.mergeHarderInner(geometry, typedSubArrayDic, index === 0);
          });
        } else {
          var geometry = geometrys;
          var _typedArrayDic2 = {};
          var _allVertexAttribs3 = this._allVertexAttribs(this._vertices);
          _allVertexAttribs3.forEach(function (attribName) {
            var thisLength = _this9._vertices[attribName].length;
            var geomLength = geometry._vertices[attribName].length;

            _typedArrayDic2[attribName] = new Float32Array(thisLength + geomLength);
          });

          this.mergeHarderInner(geometry, _typedArrayDic2);
        }
      }
    }, {
      key: 'mergeHarderInner',
      value: function mergeHarderInner(geometry, typedArrayDic) {
        var _this10 = this;

        var isFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var gl = this._glContext.gl;
        var baseLen = this._vertices.position.length / this._vertices.components.position;
        if (this === geometry) {
          console.assert('don\'t merge same geometry!');
        }

        var allVertexAttribs = this._allVertexAttribs(this._vertices);

        allVertexAttribs.forEach(function (attribName) {
          var thisLength = _this10._vertices[attribName].length;
          var geomLength = geometry._vertices[attribName].length;

          var float32array = typedArrayDic[attribName];

          if (isFirst) {
            float32array.set(_this10._vertices[attribName], 0);
          }
          float32array.set(geometry._vertices[attribName], thisLength);

          _this10._vertices[attribName] = float32array;

          if (typeof _this10._vboObj[attribName] !== 'undefined') {
            gl.bindBuffer(gl.ARRAY_BUFFER, _this10._vboObj[attribName]);
            gl.bufferData(gl.ARRAY_BUFFER, _this10._vertices[attribName], _this10._performanceHint);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
          }
        });

        for (var i = 0; i < this._indicesArray.length; i++) {
          var len = geometry._indicesArray[i].length;
          for (var j = 0; j < len; j++) {
            var idx = geometry._indicesArray[i][j];
            this._indicesArray[i].push(baseLen + idx);
          }
          if (this._materials[i]) {
            this._materials[i].setVertexN(this, this._materials[i].getVertexN(geometry));
          }
        }
        this._vertexN += geometry._vertexN;
      }
    }, {
      key: 'setExtraDataForShader',
      value: function setExtraDataForShader(name, value) {
        this._extraDataForShader[name] = value;
      }
    }, {
      key: 'getExtraDataForShader',
      value: function getExtraDataForShader(name) {
        return this._extraDataForShader[name];
      }
    }, {
      key: 'isTransparent',
      value: function isTransparent(mesh) {
        var materials = this._getAppropriateMaterials(mesh);
        var isTransparent = false;
        materials.forEach(function (material) {
          if (material.isTransparent()) {
            isTransparent = true;
          }
        });
        return isTransparent;
      }
    }, {
      key: 'isIndexed',
      value: function isIndexed() {
        return !!Geometry._iboArrayDic[this.toString()];
      }
    }, {
      key: 'getTriangleCount',
      value: function getTriangleCount(mesh) {
        var gl = this._glContext.gl;
        var materials = this._getAppropriateMaterials(mesh);
        var count = 0;
        for (var i = 0; i < materials.length; i++) {
          var material = materials[i];
          if (this._primitiveType === gl.TRIANGLES) {
            if (this.isIndexed()) {
              count += material.getVertexN(this.toString()) / 3;
            } else {
              count += this._vertexN / 3;
            }
          } else if (this._primitiveType === gl.TRIANGLE_STRIP) {
            if (this.isIndexed()) {
              count += material.getVertexN(this.toString()) - 2;
            } else {
              count += this._vertexN - 2;
            }
          }
        }
        return count;
      }
    }, {
      key: 'getVertexCount',
      value: function getVertexCount() {
        var gl = this._glContext.gl;
        var count = 0;
        if (this._vertices) {
          count = this._vertices.position.length;
        }
        return count;
      }
    }, {
      key: 'rayCast',
      value: function rayCast(origVec3, dirVec3, isFrontFacePickable, isBackFacePickable) {
        var currentShortestT = Number.MAX_VALUE;
        var currentShortestIntersectedPosVec3 = null;

        var positionElementNumPerVertex = this._vertices.components.position;
        var incrementNum = 3;
        if (this._primitiveType === GLBoost$1.TRIANGLE_STRIP) {
          incrementNum = 1;
        }
        if (!this._indicesArray) {
          for (var i = 0; i < vertexNum; i++) {
            var j = i * incrementNum;
            var pos0IndexBase = j * positionElementNumPerVertex;
            var pos1IndexBase = (j + 1) * positionElementNumPerVertex;
            var pos2IndexBase = (j + 2) * positionElementNumPerVertex;
            var result = this._rayCastInner(origVec3, dirVec3, j, pos0IndexBase, pos1IndexBase, pos2IndexBase, isFrontFacePickable, isBackFacePickable);
            if (result === null) {
              continue;
            }
            var t = result[0];
            if (result[0] < currentShortestT) {
              currentShortestT = t;
              currentShortestIntersectedPosVec3 = result[1];
            }
          }
        } else {
          for (var _i4 = 0; _i4 < this._indicesArray.length; _i4++) {
            var vertexIndices = this._indicesArray[_i4];
            for (var _j = 0; _j < vertexIndices.length; _j++) {
              var k = _j * incrementNum;
              var _pos0IndexBase2 = vertexIndices[k] * positionElementNumPerVertex;
              var _pos1IndexBase2 = vertexIndices[k + 1] * positionElementNumPerVertex;
              var _pos2IndexBase2 = vertexIndices[k + 2] * positionElementNumPerVertex;

              if (vertexIndices[k + 2] === void 0) {
                break;
              }
              var _result = this._rayCastInner(origVec3, dirVec3, vertexIndices[k], _pos0IndexBase2, _pos1IndexBase2, _pos2IndexBase2, isFrontFacePickable, isBackFacePickable);
              if (_result === null) {
                continue;
              }
              var _t = _result[0];
              if (_result[0] < currentShortestT) {
                currentShortestT = _t;
                currentShortestIntersectedPosVec3 = _result[1];
              }
            }
          }
        }

        return [currentShortestIntersectedPosVec3, currentShortestT];
      }
    }, {
      key: '_rayCastInner',
      value: function _rayCastInner(origVec3, dirVec3, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, isFrontFacePickable, isBackFacePickable) {
        if (!this._vertices.arenberg3rdPosition[i]) {
          return null;
        }

        var faceNormal = this._vertices.faceNormal[i];
        if (faceNormal.dotProduct(dirVec3) < 0 && !isFrontFacePickable) {
          return null;
        }
        if (faceNormal.dotProduct(dirVec3) > 0 && !isBackFacePickable) {
          return null;
        }

        var vec3 = Vector3.subtract(origVec3, this._vertices.arenberg3rdPosition[i]);
        var convertedOrigVec3 = this._vertices.inverseArenbergMatrix[i].multiplyVector(vec3);
        var convertedDirVec3 = this._vertices.inverseArenbergMatrix[i].multiplyVector(dirVec3);

        if (convertedDirVec3.z >= -1e-6 && convertedDirVec3.z <= 1e-6) {
          return null;
        }

        var t = -convertedOrigVec3.z / convertedDirVec3.z;

        if (t <= 1e-5) {
          return null;
        }

        var u = convertedOrigVec3.x + t * convertedDirVec3.x;
        var v = convertedOrigVec3.y + t * convertedDirVec3.y;
        if (u < 0.0 || v < 0.0 || u + v > 1.0) {
          return null;
        }

        var fDat = 1.0 - u - v;

        var pos0Vec3 = new Vector3(this._vertices.position[pos0IndexBase], this._vertices.position[pos0IndexBase + 1], this._vertices.position[pos0IndexBase + 2]);

        var pos1Vec3 = new Vector3(this._vertices.position[pos1IndexBase], this._vertices.position[pos1IndexBase + 1], this._vertices.position[pos1IndexBase + 2]);

        var pos2Vec3 = new Vector3(this._vertices.position[pos2IndexBase], this._vertices.position[pos2IndexBase + 1], this._vertices.position[pos2IndexBase + 2]);

        var pos0 = Vector3.multiply(pos0Vec3, u);
        var pos1 = Vector3.multiply(pos1Vec3, v);
        var pos2 = Vector3.multiply(pos2Vec3, fDat);
        var intersectedPosVec3 = Vector3.add(Vector3.add(pos0, pos1), pos2);

        return [t, intersectedPosVec3];
      }
    }, {
      key: '_calcArenbergInverseMatrices',
      value: function _calcArenbergInverseMatrices(primitiveType) {

        var positionElementNumPerVertex = this._vertices.components.position;

        var incrementNum = 3;
        if (primitiveType === GLBoost$1.TRIANGLE_STRIP) {
          incrementNum = 1;
        }
        this._vertices.inverseArenbergMatrix = [];
        this._vertices.arenberg3rdPosition = [];
        this._vertices.faceNormal = [];
        if (!this._indicesArray) {
          for (var i = 0; i < this._vertexN - 2; i += incrementNum) {
            var pos0IndexBase = i * positionElementNumPerVertex;
            var pos1IndexBase = (i + 1) * positionElementNumPerVertex;
            var pos2IndexBase = (i + 2) * positionElementNumPerVertex;

            this._calcArenbergMatrixFor3Vertices(null, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, incrementNum);
          }
        } else {
          for (var _i5 = 0; _i5 < this._indicesArray.length; _i5++) {
            var vertexIndices = this._indicesArray[_i5];
            for (var j = 0; j < vertexIndices.length - 2; j += incrementNum) {
              var _pos0IndexBase3 = vertexIndices[j] * positionElementNumPerVertex;
              var _pos1IndexBase3 = vertexIndices[j + 1] * positionElementNumPerVertex;
              var _pos2IndexBase3 = vertexIndices[j + 2] * positionElementNumPerVertex;

              if (vertexIndices[j + 2] === void 0) {
                break;
              }
              this._calcArenbergMatrixFor3Vertices(vertexIndices, j, _pos0IndexBase3, _pos1IndexBase3, _pos2IndexBase3, incrementNum);
            }
          }
        }
      }
    }, {
      key: '_calcArenbergMatrixFor3Vertices',
      value: function _calcArenbergMatrixFor3Vertices(vertexIndices, i, pos0IndexBase, pos1IndexBase, pos2IndexBase, incrementNum) {
        var pos0Vec3 = new Vector3(this._vertices.position[pos0IndexBase], this._vertices.position[pos0IndexBase + 1], this._vertices.position[pos0IndexBase + 2]);

        var pos1Vec3 = new Vector3(this._vertices.position[pos1IndexBase], this._vertices.position[pos1IndexBase + 1], this._vertices.position[pos1IndexBase + 2]);

        var pos2Vec3 = new Vector3(this._vertices.position[pos2IndexBase], this._vertices.position[pos2IndexBase + 1], this._vertices.position[pos2IndexBase + 2]);

        var ax = pos0Vec3.x - pos2Vec3.x;
        var ay = pos0Vec3.y - pos2Vec3.y;
        var az = pos0Vec3.z - pos2Vec3.z;
        var bx = pos1Vec3.x - pos2Vec3.x;
        var by = pos1Vec3.y - pos2Vec3.y;
        var bz = pos1Vec3.z - pos2Vec3.z;

        var nx = ay * bz - az * by;
        var ny = az * bx - ax * bz;
        var nz = ax * by - ay * bx;
        var da = Math.sqrt(nx * nx + ny * ny + nz * nz);
        if (da <= 1e-6) {
          return 0;
        }
        da = 1.0 / da;
        nx *= da;
        ny *= da;
        nz *= da;

        var arenbergMatrix = new Matrix33(pos0Vec3.x - pos2Vec3.x, pos1Vec3.x - pos2Vec3.x, nx - pos2Vec3.x, pos0Vec3.y - pos2Vec3.y, pos1Vec3.y - pos2Vec3.y, ny - pos2Vec3.y, pos0Vec3.z - pos2Vec3.z, pos1Vec3.z - pos2Vec3.z, nz - pos2Vec3.z);

        var inverseArenbergMatrix = arenbergMatrix.invert();

        var arenberg0IndexBase = i;
        var arenberg1IndexBase = i + 1;
        var arenberg2IndexBase = i + 2;
        if (vertexIndices) {
          arenberg0IndexBase = vertexIndices[i];
          arenberg1IndexBase = vertexIndices[i + 1];
          arenberg2IndexBase = vertexIndices[i + 2];
        }

        this._vertices.inverseArenbergMatrix[arenberg0IndexBase] = inverseArenbergMatrix;
        this._vertices.arenberg3rdPosition[arenberg0IndexBase] = pos2Vec3;
        this._vertices.faceNormal[arenberg0IndexBase] = new Vector3(nx, ny, nz);
      }
    }, {
      key: 'materials',
      set: function set(materials) {
        this._materials = materials;
      },
      get: function get() {
        return this._materials;
      }
    }, {
      key: 'centerPosition',
      get: function get() {
        return this._AABB.centerPoint;
      }
    }, {
      key: 'AABB',
      get: function get() {
        return this._AABB;
      }
    }, {
      key: 'rawAABB',
      get: function get() {
        return this._AABB;
      }
    }]);
    return Geometry;
  }(GLBoostObject);

  Geometry._vaoDic = {};
  Geometry._iboArrayDic = {};

  var BlendShapeShaderSource = function () {
    function BlendShapeShaderSource() {
      babelHelpers.classCallCheck(this, BlendShapeShaderSource);
    }

    babelHelpers.createClass(BlendShapeShaderSource, [{
      key: 'VSDefine_BlendShapeShaderSource',
      value: function VSDefine_BlendShapeShaderSource(in_, out_, f) {
        var _this = this;

        var shaderText = '';
        f.forEach(function (attribName) {
          if (_this.BlendShapeShaderSource_isShapeTarget(attribName)) {
            shaderText += in_ + ' vec3 aVertex_' + attribName + ';\n';
            shaderText += 'uniform float blendWeight_' + attribName + ';\n';
          }
        });
        return shaderText;
      }
    }, {
      key: 'VSTransform_BlendShapeShaderSource',
      value: function VSTransform_BlendShapeShaderSource(existCamera_f, f, lights, material, extraData) {
        var _this2 = this;

        var shaderText = '';
        var numOfShapeTargets = this.BlendShapeShaderSource_numberOfShapeTargets(f);
        shaderText += '    vec3 blendedPosition = aVertex_position;\n';
        f.forEach(function (attribName) {
          if (_this2.BlendShapeShaderSource_isShapeTarget(attribName)) {
            shaderText += 'blendedPosition += (aVertex_' + attribName + ' - aVertex_position) * blendWeight_' + attribName + ';\n';
          }
        });
        if (existCamera_f) {
          shaderText += '  gl_Position = pvwMatrix * vec4(blendedPosition, 1.0);\n';
        } else {
          shaderText += '  gl_Position = vec4(blendedPosition, 1.0);\n';
        }
        return shaderText;
      }
    }, {
      key: 'prepare_BlendShapeShaderSource',
      value: function prepare_BlendShapeShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
        var _this3 = this;

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (_this3.BlendShapeShaderSource_isShapeTarget(attribName)) {
            vertexAttribsAsResult.push(attribName);
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
          }
        });

        vertexAttribs.forEach(function (attribName) {
          if (_this3.BlendShapeShaderSource_isShapeTarget(attribName)) {
            material['uniform_FloatSampler_blendWeight_' + attribName] = _this3._glContext.getUniformLocation(shaderProgram, 'blendWeight_' + attribName);

            _this3._glContext.uniform1f(material['uniform_FloatSampler_blendWeight_' + attribName], 0.0, true);
          }
        });

        return vertexAttribsAsResult;
      }
    }, {
      key: 'BlendShapeShaderSource_isShapeTarget',
      value: function BlendShapeShaderSource_isShapeTarget(attribName) {
        return !Shader._exist(attribName, GLBoost.POSITION) && !Shader._exist(attribName, GLBoost.COLOR) && !Shader._exist(attribName, GLBoost.TEXCOORD);
      }
    }, {
      key: 'BlendShapeShaderSource_numberOfShapeTargets',
      value: function BlendShapeShaderSource_numberOfShapeTargets(attributes) {
        var _this4 = this;

        var count = 0;
        attributes.forEach(function (attribName) {
          if (_this4.BlendShapeShaderSource_isShapeTarget(attribName)) {
            count += 1;
          }
        });
        return count;
      }
    }]);
    return BlendShapeShaderSource;
  }();

  var BlendShapeGeometry = function (_Geometry) {
    babelHelpers.inherits(BlendShapeGeometry, _Geometry);

    function BlendShapeGeometry(glBoostContext) {
      babelHelpers.classCallCheck(this, BlendShapeGeometry);

      var _this = babelHelpers.possibleConstructorReturn(this, (BlendShapeGeometry.__proto__ || Object.getPrototypeOf(BlendShapeGeometry)).call(this, glBoostContext));

      _this._blendWeight_1 = 0.0;
      _this._blendWeight_2 = 0.0;
      _this._blendWeight_3 = 0.0;
      _this._blendWeight_4 = 0.0;
      _this._blendWeight_5 = 0.0;
      _this._blendWeight_6 = 0.0;
      _this._blendWeight_7 = 0.0;
      _this._blendWeight_8 = 0.0;
      _this._blendWeight_9 = 0.0;
      _this._blendWeight_10 = 0.0;

      _this._currentRenderPassIndex = 0;
      _this._materialForBlend = null;
      return _this;
    }

    babelHelpers.createClass(BlendShapeGeometry, [{
      key: 'draw',
      value: function draw(data) {
        this._currentRenderPassIndex = data.renderPass_index;
        babelHelpers.get(BlendShapeGeometry.prototype.__proto__ || Object.getPrototypeOf(BlendShapeGeometry.prototype), 'draw', this).call(this, {
          expression: data.expression,
          lights: data.lights,
          camera: data.camera,
          mesh: data.mesh,
          scene: data.scene,
          renderPassIndex: data.renderPassIndex,
          viewport: data.viewport,
          isWebVRMode: data.isWebVRMode,
          webvrFrameData: data.webvrFrameData });
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender(expression, existCamera_f, pointLight, meshMaterial, mesh) {

        if (meshMaterial) {
          this._materialForBlend = meshMaterial;
        } else {
          this._materialForBlend = this._defaultMaterial;
        }

        var BlendShapeShader = function (_materialForBlend$sha) {
          babelHelpers.inherits(BlendShapeShader, _materialForBlend$sha);

          function BlendShapeShader(glBoostContext, basicShader) {
            babelHelpers.classCallCheck(this, BlendShapeShader);

            var _this2 = babelHelpers.possibleConstructorReturn(this, (BlendShapeShader.__proto__ || Object.getPrototypeOf(BlendShapeShader)).call(this, glBoostContext, basicShader));

            BlendShapeShader.mixin(BlendShapeShaderSource);
            return _this2;
          }

          return BlendShapeShader;
        }(this._materialForBlend.shaderClass);

        this._materialForBlend.shaderClass = BlendShapeShader;

        babelHelpers.get(BlendShapeGeometry.prototype.__proto__ || Object.getPrototypeOf(BlendShapeGeometry.prototype), 'prepareToRender', this).call(this, expression, existCamera_f, pointLight, meshMaterial, mesh);
      }
    }, {
      key: '_setBlendWeightToGlslProgram',
      value: function _setBlendWeightToGlslProgram(blendTargetNumber, weight) {
        var blendTarget = GLBoost$1.getValueOfGLBoostConstant(blendTargetNumber);
        var materials = [this._materialForBlend];
        for (var i = 0; i < materials.length; i++) {
          this._glContext.useProgram(materials[i].shaderInstance.glslProgram);
          this._glContext.uniform1f(materials[i]['uniform_FloatSampler_blendWeight_' + blendTarget], weight, true);
        }
      }
    }, {
      key: 'blendWeight_1',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET1, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_1 = weight;
      },
      get: function get() {
        return this._blendWeight_1;
      }
    }, {
      key: 'blendWeight_2',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET2, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_2 = weight;
      },
      get: function get() {
        return this._blendWeight_2;
      }
    }, {
      key: 'blendWeight_3',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET3, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_3 = weight;
      },
      get: function get() {
        return this._blendWeight_3;
      }
    }, {
      key: 'blendWeight_4',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET4, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_4 = weight;
      },
      get: function get() {
        return this._blendWeight_4;
      }
    }, {
      key: 'blendWeight_5',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET5, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_5 = weight;
      },
      get: function get() {
        return this._blendWeight_5;
      }
    }, {
      key: 'blendWeight_6',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET6, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_6 = weight;
      },
      get: function get() {
        return this._blendWeight_6;
      }
    }, {
      key: 'blendWeight_7',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET7, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_7 = weight;
      },
      get: function get() {
        return this._blendWeight_7;
      }
    }, {
      key: 'blendWeight_8',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET8, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_8 = weight;
      },
      get: function get() {
        return this._blendWeight_8;
      }
    }, {
      key: 'blendWeight_9',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET9, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_9 = weight;
      },
      get: function get() {
        return this._blendWeight_9;
      }
    }, {
      key: 'blendWeight_10',
      set: function set(weight) {
        var gl = this._glContext.gl;
        var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        this._setBlendWeightToGlslProgram(GLBoost$1.BLENDTARGET10, weight);
        this._glContext.useProgram(currentProgram);
        this._blendWeight_10 = weight;
      },
      get: function get() {
        return this._blendWeight_10;
      }
    }]);
    return BlendShapeGeometry;
  }(Geometry);


  GLBoost$1['BlendShapeGeometry'] = BlendShapeGeometry;

  var AbstractTexture = function (_GLBoostObject) {
    babelHelpers.inherits(AbstractTexture, _GLBoostObject);

    function AbstractTexture(glBoostContext) {
      babelHelpers.classCallCheck(this, AbstractTexture);

      var _this = babelHelpers.possibleConstructorReturn(this, (AbstractTexture.__proto__ || Object.getPrototypeOf(AbstractTexture)).call(this, glBoostContext));

      if (_this.constructor === AbstractTexture) {
        throw new TypeError('Cannot construct AbstractTexture instances directly.');
      }

      _this._textureUnitIndex = 0;

      _this._uvTransform = new Vector4$1(1, 1, 0, 0);

      _this._toMultiplyAlphaToColorPreviously = false;return _this;
    }

    babelHelpers.createClass(AbstractTexture, [{
      key: 'setUp',
      value: function setUp(textureUnitIndex) {
        var gl = this._glContext.gl;
        if (this._texture === null) {
          return false;
        }
        var index = !(typeof textureUnitIndex === 'undefined') ? textureUnitIndex : this._textureUnitIndex;
        gl.activeTexture(gl.TEXTURE0 + index);

        if (this.className.indexOf('Cube') !== -1) {
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
        } else {
          gl.bindTexture(gl.TEXTURE_2D, this._texture);
        }

        return true;
      }
    }, {
      key: 'tearDown',
      value: function tearDown(textureUnitIndex) {
        var gl = this._glContext.gl;

        var index = !(typeof textureUnitIndex === 'undefined') ? textureUnitIndex : this._textureUnitIndex;
        gl.activeTexture(gl.TEXTURE0 + index);
        if (this.className.indexOf('Cube') !== -1) {
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        } else {
          gl.bindTexture(gl.TEXTURE_2D, null);
        }
      }
    }, {
      key: 'getTexturePixelData',
      value: function getTexturePixelData() {
        var gl = this._glContext.gl;

        var framebuffer = this._glContext.createFramebuffer(this);
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);

        var data = new Uint8Array(this.width * this.height * 4);
        gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return data;
      }
    }, {
      key: 'getPixelValueAt',
      value: function getPixelValueAt(x, y, argByteArray) {
        var byteArray = argByteArray;
        if (!byteArray) {
          byteArray = this.getTexturePixelData();
        }

        var color = new Vector4$1(byteArray[(y * this.width + x) * 4 + 0], byteArray[(y * this.width + x) * 4 + 1], byteArray[(y * this.width + x) * 4 + 2], byteArray[(y * this.width + x) * 4 + 3]);
        return color;
      }
    }, {
      key: '_getResizedCanvas',
      value: function _getResizedCanvas(image) {
        var canvas = document.createElement("canvas");
        canvas.width = this._getNearestPowerOfTwo(image.width);
        canvas.height = this._getNearestPowerOfTwo(image.height);

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        return canvas;
      }
    }, {
      key: '_isPowerOfTwo',
      value: function _isPowerOfTwo(x) {
        return (x & x - 1) == 0;
      }
    }, {
      key: '_getNearestPowerOfTwo',
      value: function _getNearestPowerOfTwo(x) {
        return Math.pow(2, Math.round(Math.log(x) / Math.LN2));
      }
    }, {
      key: 'readyForDiscard',
      value: function readyForDiscard() {
        if (this._texture) {
          this._glContext.deleteTexture(this, this._texture);
        }
        if (this.fbo) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.fbo._glboostTextures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var texture = _step.value;

              this.fbo._glboostTextures = this.fbo._glboostTextures.filter(function (v, i) {
                return v !== this;
              });
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (this.fbo._glboostTextures.length === 0) {
            this._glContext.deleteFramebuffer(this._glBoostContext, this.fbo);
            this._glContext.deleteFramebuffer(this._glBoostContext, this.fbo);
            if (this.fbo.renderBuffer) {
              this._glContext.deleteRenderbuffer(this._glBoostContext, this.fbo.renderBuffer);
            }
          }
        }

        babelHelpers.get(AbstractTexture.prototype.__proto__ || Object.getPrototypeOf(AbstractTexture.prototype), 'readyForDiscard', this).call(this);
      }
    }, {
      key: 'glTextureResource',
      get: function get() {
        return this._texture;
      }
    }, {
      key: 'width',
      get: function get() {
        return this._width;
      }
    }, {
      key: 'height',
      get: function get() {
        return this._height;
      }
    }, {
      key: 'textureUnitIndex',
      set: function set(index) {
        this._textureUnitIndex = index;
      },
      get: function get() {
        return this._textureUnitIndex;
      }
    }, {
      key: 'uvTransform',
      get: function get() {
        return this._uvTransform;
      },
      set: function set(vec4) {
        this._uvTransform = vec4;
      }
    }, {
      key: 'toMultiplyAlphaToColorPreviously',
      get: function get() {
        return this._toMultiplyAlphaToColorPreviously;
      },
      set: function set(flag) {
        this._toMultiplyAlphaToColorPreviously = flag;
      }
    }]);
    return AbstractTexture;
  }(GLBoostObject);

  var FragmentSimpleShaderSource = function () {
    function FragmentSimpleShaderSource() {
      babelHelpers.classCallCheck(this, FragmentSimpleShaderSource);
    }

    babelHelpers.createClass(FragmentSimpleShaderSource, [{
      key: 'VSTransform_FragmentSimpleShaderSource',
      value: function VSTransform_FragmentSimpleShaderSource(existCamera_f, f) {
        var shaderText = '';

        if (existCamera_f) {
          shaderText += '  gl_Position = projectionMatrix * viewMatrix * position_world;\n';
        } else {
          shaderText += '  gl_Position = position_world;\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSDefine_FragmentSimpleShaderSource',
      value: function FSDefine_FragmentSimpleShaderSource(in_, f) {
        var shaderText = 'uniform float opacity;\n';
        shaderText += 'uniform bool isNeededToMultiplyAlphaToColorOfPixelOutput;\n';
        return shaderText;
      }
    }, {
      key: 'FSShade_FragmentSimpleShaderSource',
      value: function FSShade_FragmentSimpleShaderSource(f, gl) {
        var shaderText = "";
        shaderText += 'rt0 = vec4(1.0, 1.0, 1.0, opacity);\n';
        shaderText += '  if (isNeededToMultiplyAlphaToColorOfPixelOutput) {\n';
        shaderText += '    rt0.rgb *= rt0.a;\n';
        shaderText += '  }\n';

        return shaderText;
      }
    }, {
      key: 'FSFinalize_FragmentSimpleShaderSource',
      value: function FSFinalize_FragmentSimpleShaderSource(f, gl, lights, material, extraData) {
        var shaderText = '';

        return shaderText;
      }
    }, {
      key: 'prepare_FragmentSimpleShaderSource',
      value: function prepare_FragmentSimpleShaderSource(gl, glslProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        material.setUniform(glslProgram, 'uniform_opacity', this._glContext.getUniformLocation(glslProgram, 'opacity'));
        material.setUniform(glslProgram, 'uniform_isNeededToMultiplyAlphaToColorOfPixelOutput', this._glContext.getUniformLocation(glslProgram, 'isNeededToMultiplyAlphaToColorOfPixelOutput'));

        var uniformLocationDepthBias = material.getUniform(glslProgram, 'uniform_depthBias');
        if (uniformLocationDepthBias) {
          var depthBias = this.getShaderParameter(material, 'depthBias', false);
          if (depthBias) {
            this._glContext.uniform1f(uniformLocationDepthBias, depthBias, true);
          }
        }

        return vertexAttribsAsResult;
      }
    }]);
    return FragmentSimpleShaderSource;
  }();

  var FragmentSimpleShader = function (_Shader) {
    babelHelpers.inherits(FragmentSimpleShader, _Shader);

    function FragmentSimpleShader(glBoostContext) {
      var basicShader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VertexWorldShaderSource;
      babelHelpers.classCallCheck(this, FragmentSimpleShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (FragmentSimpleShader.__proto__ || Object.getPrototypeOf(FragmentSimpleShader)).call(this, glBoostContext, basicShader));

      FragmentSimpleShader.mixin(basicShader);
      FragmentSimpleShader.mixin(FragmentSimpleShaderSource);

      _this._isNeededToMultiplyAlphaToColorOfPixelOutput = null;
      return _this;
    }

    babelHelpers.createClass(FragmentSimpleShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(FragmentSimpleShader.prototype.__proto__ || Object.getPrototypeOf(FragmentSimpleShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isNeededToMultiplyAlphaToColorOfPixelOutput'), this._isNeededToMultiplyAlphaToColorOfPixelOutput, true);

        var AABB = this._AABB !== null ? this._AABB : mesh.geometry.AABB;

        var uniformLocationAABBLengthCenterToCorner = material.getUniform(glslProgram, 'uniform_AABBLengthCenterToCorner');
        if (uniformLocationAABBLengthCenterToCorner) {
          this._glContext.uniform1f(uniformLocationAABBLengthCenterToCorner, AABB.lengthCenterToCorner, true);
        }
      }
    }, {
      key: 'isNeededToMultiplyAlphaToColorOfPixelOutput',
      set: function set(flg) {
        this._isNeededToMultiplyAlphaToColorOfPixelOutput = flg;
      },
      get: function get() {
        return this._isNeededToMultiplyAlphaToColorOfPixelOutput;
      }
    }]);
    return FragmentSimpleShader;
  }(Shader);


  GLBoost['FragmentSimpleShader'] = FragmentSimpleShader;

  var VertexWorldShadowShaderSource = function () {
    function VertexWorldShadowShaderSource() {
      babelHelpers.classCallCheck(this, VertexWorldShadowShaderSource);
    }

    babelHelpers.createClass(VertexWorldShadowShaderSource, [{
      key: 'VSDefine_VertexWorldShadowShaderSource',
      value: function VSDefine_VertexWorldShadowShaderSource(in_, out_, f, lights, material, extraData) {
        var shaderText = '';


        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;

        return shaderText;
      }
    }, {
      key: 'VSTransform_VertexWorldShadowShaderSource',
      value: function VSTransform_VertexWorldShadowShaderSource(existCamera_f, f, lights, material, extraData) {
        var shaderText = '';
        var gl = this._glContext.gl;

        return shaderText;
      }
    }, {
      key: 'FSDefine_VertexWorldShadowShaderSource',
      value: function FSDefine_VertexWorldShadowShaderSource(in_, f, lights, material, extraData) {
        var shaderText = '';

        shaderText += 'uniform float depthBias;\n';
        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;

        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform mat4 depthPVMatrix[' + lightNumExceptAmbient + '];\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSShade_VertexWorldShadowShaderSource',
      value: function FSShade_VertexWorldShadowShaderSource(f, gl, lights) {
        var shaderText = '';
        shaderText += 'float visibilityLevel = 1.0;\n';

        if (lights.length > 0) {
          shaderText += '    vec4 shadowCoord[' + lights.length + '];\n';
        }
        for (var i = 0; i < lights.length; i++) {
          shaderText += '  { // ' + i + '\n';
          shaderText += '    shadowCoord[' + i + '] = depthPVMatrix[' + i + '] * vec4(v_position_world, 1.0); // ' + i + '\n';
          shaderText += '    shadowCoord[' + i + '].xyz *= 0.5; // ' + i + '\n';
          shaderText += '    shadowCoord[' + i + '].xyz += 0.5; // ' + i + '\n';
          shaderText += '  } // ' + i + '\n';
        }
        return shaderText;
      }
    }, {
      key: 'FSPostEffect_VertexWorldShadowShaderSource',
      value: function FSPostEffect_VertexWorldShadowShaderSource(f, gl, lights, material, extraData) {
        var shaderText = '';

        return shaderText;
      }
    }, {
      key: 'prepare_VertexWorldShadowShaderSource',
      value: function prepare_VertexWorldShadowShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        vertexAttribs.forEach(function (attribName) {
          if (attribName === 'position' || attribName === 'normal') {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            if (shaderProgram['vertexAttribute_' + attribName] !== -1) {
              gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
              vertexAttribsAsResult.push(attribName);
            }
          }
        });

        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];

          material.setUniform(shaderProgram, 'uniform_isShadowCasting' + i, this._glContext.getUniformLocation(shaderProgram, 'isShadowCasting[' + i + ']'));

          if (light.camera && light.camera.texture) {
            var depthTextureUniformLocation = this._glContext.getUniformLocation(shaderProgram, 'uDepthTexture[' + i + ']');
            material.setUniform(shaderProgram, 'uniform_DepthTextureSampler_' + i, depthTextureUniformLocation);

            var index = i + material.getTextureNumAttachedShader();
            lights[i].camera.texture.textureUnitIndex = index;
          }
        }

        var uniform_depthBias = this._glContext.getUniformLocation(shaderProgram, 'depthBias');
        material.setUniform(shaderProgram, 'uniform_depthBias', uniform_depthBias);
        this._glContext.uniform1f(uniform_depthBias, 0.005, true);

        for (var _i = 0; _i < lights.length; _i++) {
          var light_i = _i;
          material.setUniform(shaderProgram, 'uniform_depthPVMatrix_' + light_i, this._glContext.getUniformLocation(shaderProgram, 'depthPVMatrix[' + light_i + ']'));
        }

        return vertexAttribsAsResult;
      }
    }]);
    return VertexWorldShadowShaderSource;
  }();


  GLBoost['VertexWorldShadowShaderSource'] = VertexWorldShadowShaderSource;

  var WireframeShaderSource = function () {
    function WireframeShaderSource() {
      babelHelpers.classCallCheck(this, WireframeShaderSource);
    }

    babelHelpers.createClass(WireframeShaderSource, [{
      key: 'VSDefine_WireframeShaderSource',
      value: function VSDefine_WireframeShaderSource(in_, out_, f) {
        var shaderText = '';
        shaderText += in_ + ' vec3 aVertex_barycentricCoord;\n';
        shaderText += out_ + ' vec3 barycentricCoord;\n';

        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += 'uniform vec4 AABBCenterPositionAndRatio;\n';
        }
        return shaderText;
      }
    }, {
      key: 'VSTransform_WireframeShaderSource',
      value: function VSTransform_WireframeShaderSource(existCamera_f, f) {
        var shaderText = '';

        shaderText += '  vec4 interpolatedPosition_world = position_world;\n';
        shaderText += '  gl_Position = position_world;\n';
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += '  vec3 AABBCenterPosition = AABBCenterPositionAndRatio.xyz;\n';
          shaderText += '  float unfoldUVRatio = AABBCenterPositionAndRatio.w;\n';
          shaderText += '  vec2 uvScaled = vec2((aVertex_texcoord-0.5)*AABBLengthCenterToCorner*2.0);\n';
          shaderText += '  uvScaled.y = - uvScaled.y;\n';
          shaderText += '  vec4 uvPosition = vec4(uvScaled + AABBCenterPosition.xy, AABBCenterPosition.z, 1.0);\n';
          shaderText += '  interpolatedPosition_world = uvPosition * unfoldUVRatio + position_world * (1.0-unfoldUVRatio);\n';
        }

        if (existCamera_f) {
          shaderText += '  mat4 pvMatrix = projectionMatrix * viewMatrix;\n';
          shaderText += '  gl_Position = pvMatrix * interpolatedPosition_world;\n';
        }

        shaderText += '  barycentricCoord = aVertex_barycentricCoord;\n';

        return shaderText;
      }
    }, {
      key: 'FSDefine_WireframeShaderSource',
      value: function FSDefine_WireframeShaderSource(in_, f, lights, material, extraData) {
        var shaderText = '';

        shaderText += in_ + ' vec3 barycentricCoord;\n';

        shaderText += 'uniform bool isWireframe;\n';

        shaderText += 'uniform float wireframeWidth;\n';

        return shaderText;
      }
    }, {
      key: 'FSMethodDefine_WireframeShaderSource',
      value: function FSMethodDefine_WireframeShaderSource(f, lights, material, extraData) {
        var shaderText = '';

        shaderText += '\n    float edge_ratio(vec3 bary3, float wireframeWidthInner, float wireframeWidthRelativeScale) {     \n        vec3 d = fwidth(bary3);\n        vec3 x = bary3+vec3(1.0 - wireframeWidthInner)*d;\n        vec3 a3 = smoothstep(vec3(0.0), d, x);\n        float factor = min(min(a3.x, a3.y), a3.z);\n        \n        return clamp((1.0 - factor), 0.0, 1.0);\n    }\n    ';

        return shaderText;
      }
    }, {
      key: 'FSShade_WireframeShaderSource',
      value: function FSShade_WireframeShaderSource(f, gl, lights, material, extraData) {
        var shaderText = '';

        shaderText += 'bool isWireframeInner = false;\n';
        shaderText += 'float wireframeWidthRelativeScale = 1.0;\n';

        return shaderText;
      }
    }, {
      key: 'FSPostEffect_WireframeShaderSource',
      value: function FSPostEffect_WireframeShaderSource(f, gl, lights, material, extraData) {
        var shaderText = '';

        shaderText += 'float wireframeWidthInner = wireframeWidth;\n';
        shaderText += 'float threshold = 0.001;\n';
        shaderText += 'vec4 wireframeResult = rt0;\n';
        shaderText += 'if ( isWireframeInner || isWireframe ) {\n';
        shaderText += '  vec4 wireframeColor = vec4(0.2, 0.75, 0.0, 1.0);\n';
        shaderText += '  float edgeRatio = edge_ratio(barycentricCoord, wireframeWidthInner, wireframeWidthRelativeScale);\n';
        shaderText += '  float edgeRatioModified = mix(step(0.001, edgeRatio), clamp(edgeRatio*4.0, 0.0, 1.0), wireframeWidthInner / wireframeWidthRelativeScale/4.0);\n';

        shaderText += '  wireframeResult.rgb = wireframeColor.rgb * edgeRatioModified + rt0.rgb * (1.0 - edgeRatioModified);\n';
        shaderText += '  wireframeResult.a = max(rt0.a, wireframeColor.a * mix(edgeRatioModified, pow(edgeRatioModified, 100.0), wireframeWidthInner / wireframeWidthRelativeScale/1.0));\n';
        shaderText += '}\n';

        shaderText += 'if ( isWireframe ) {\n';
        shaderText += '  rt0 = wireframeResult;\n';
        shaderText += '}\n';

        shaderText += '    if (rt0.a < 0.05) {\n';
        shaderText += '      discard;\n';
        shaderText += '    }\n';

        return shaderText;
      }
    }, {
      key: 'prepare_WireframeShaderSource',
      value: function prepare_WireframeShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];
        shaderProgram['vertexAttribute_barycentricCoord'] = gl.getAttribLocation(shaderProgram, 'aVertex_barycentricCoord');
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_barycentricCoord']);
        vertexAttribsAsResult.push('barycentricCoord');

        var uniform_isWireframe = material._glContext.getUniformLocation(shaderProgram, 'isWireframe');
        material.setUniform(shaderProgram, 'uniform_isWireframe', uniform_isWireframe);
        this._glContext.uniform1i(uniform_isWireframe, 0, true);

        var uniform_wireframeWidth = material._glContext.getUniformLocation(shaderProgram, 'wireframeWidth');
        material.setUniform(shaderProgram, 'uniform_wireframeWidth', uniform_wireframeWidth);
        this._glContext.uniform1f(uniform_wireframeWidth, 1.0, true);

        var uniform_wireframeWidthRelativeScale = material._glContext.getUniformLocation(shaderProgram, 'wireframeWidthRelativeScale');
        material.setUniform(shaderProgram, 'uniform_wireframeWidthRelativeScale', uniform_wireframeWidthRelativeScale);
        this._glContext.uniform1f(uniform_wireframeWidthRelativeScale, 1.0, true);

        if (Shader._exist(vertexAttribs, GLBoost.TEXCOORD)) {
          material.setUniform(shaderProgram, 'uniform_AABBCenterPositionAndRatio', this._glContext.getUniformLocation(shaderProgram, 'AABBCenterPositionAndRatio'));
        }

        return vertexAttribsAsResult;
      }
    }]);
    return WireframeShaderSource;
  }();

  var WireframeShader = function (_FragmentSimpleShader) {
    babelHelpers.inherits(WireframeShader, _FragmentSimpleShader);

    function WireframeShader(glBoostContext) {
      var basicShader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VertexWorldShaderSource;
      babelHelpers.classCallCheck(this, WireframeShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (WireframeShader.__proto__ || Object.getPrototypeOf(WireframeShader)).call(this, glBoostContext));

      if (basicShader === VertexWorldShaderSource) {
        WireframeShader.mixin(VertexWorldShadowShaderSource);
      }
      WireframeShader.mixin(WireframeShaderSource);

      _this._unfoldUVRatio = void 0;

      _this._AABB = null;

      return _this;
    }

    babelHelpers.createClass(WireframeShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(WireframeShader.prototype.__proto__ || Object.getPrototypeOf(WireframeShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var isWifeframe = false;
        var isWireframeOnShade = false;
        var wireframeWidth = 0.0;
        var wireframeWidthRelativeScale = 0.0;

        if (typeof material.isWireframe !== 'undefined') {
          isWifeframe = material.isWireframe;
          isWireframeOnShade = material.isWireframeOnShade;
          wireframeWidth = material.wireframeWidth;
          wireframeWidthRelativeScale = material.wireframeWidthRelativeScale;
        }

        var uniformLocationIsWireframe = material.getUniform(glslProgram, 'uniform_isWireframe');
        if (uniformLocationIsWireframe) {
          this._glContext.uniform1i(uniformLocationIsWireframe, isWifeframe, true);
        }
        if (isWifeframe && !isWireframeOnShade) {
          material._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_opacity'), 0.0, true);
        }
        var uniformLocationWireframeWidth = material.getUniform(glslProgram, 'uniform_wireframeWidth');
        if (uniformLocationWireframeWidth) {
          this._glContext.uniform1f(uniformLocationWireframeWidth, wireframeWidth, true);
        }
        var uniformLocationWireframeWidthRelativeScale = material.getUniform(glslProgram, 'uniform_wireframeWidthRelativeScale');
        if (uniformLocationWireframeWidthRelativeScale) {
          this._glContext.uniform1f(uniformLocationWireframeWidthRelativeScale, wireframeWidthRelativeScale, true);
        }

        var AABB = this._AABB !== null ? this._AABB : mesh.geometry.AABB;

        var uniformLocationAABBCenterPositionAndRatio = material.getUniform(glslProgram, 'uniform_AABBCenterPositionAndRatio');
        if (uniformLocationAABBCenterPositionAndRatio) {
          var unfoldUVRatioParameter = this.getShaderParameter(material, 'unfoldUVRatio', 0.0);
          this._glContext.uniform4f(uniformLocationAABBCenterPositionAndRatio, AABB.centerPoint.x, AABB.centerPoint.y, AABB.centerPoint.z, unfoldUVRatioParameter, true);
        }

        babelHelpers.get(WireframeShader.prototype.__proto__ || Object.getPrototypeOf(WireframeShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var uniformLocationDepthBias = material.getUniform(glslProgram, 'uniform_depthBias');
        if (uniformLocationDepthBias) {
          var depthBias = this.getShaderParameter(material, 'depthBias', false);
          if (depthBias) {
            this._glContext.uniform1f(uniformLocationDepthBias, depthBias, true);
          }
        }
      }
    }, {
      key: 'unfoldUVRatio',
      set: function set(value) {
        this._unfoldUVRatio = value;
      },
      get: function get() {
        return this._unfoldUVRatio;
      }
    }, {
      key: 'AABB',
      set: function set(aabb) {
        this._AABB = aabb;
      },
      get: function get() {
        return this._AABB;
      }
    }]);
    return WireframeShader;
  }(FragmentSimpleShader);


  GLBoost['WireframeShader'] = WireframeShader;

  var DecalShaderSource = function () {
    function DecalShaderSource() {
      babelHelpers.classCallCheck(this, DecalShaderSource);
    }

    babelHelpers.createClass(DecalShaderSource, [{
      key: 'VSDefine_DecalShaderSource',
      value: function VSDefine_DecalShaderSource(in_, out_, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost$1.COLOR)) {
          shaderText += in_ + ' vec4 aVertex_color;\n';
          shaderText += out_ + ' vec4 color;\n';
        }
        if (Shader._exist(f, GLBoost$1.TEXCOORD)) {
          shaderText += in_ + ' vec2 aVertex_texcoord;\n';
          shaderText += out_ + ' vec2 texcoord;\n';
        }
        return shaderText;
      }
    }, {
      key: 'VSTransform_DecalShaderSource',
      value: function VSTransform_DecalShaderSource(existCamera_f, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost$1.COLOR)) {
          shaderText += '  color = aVertex_color;\n';
        }
        if (Shader._exist(f, GLBoost$1.TEXCOORD)) {
          shaderText += '  texcoord = aVertex_texcoord;\n';
        }
        return shaderText;
      }
    }, {
      key: 'FSDefine_DecalShaderSource',
      value: function FSDefine_DecalShaderSource(in_, f, lights, material, extraData) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost$1.COLOR)) {
          shaderText += in_ + ' vec4 color;\n';
        }
        if (Shader._exist(f, GLBoost$1.TEXCOORD)) {
          shaderText += in_ + ' vec2 texcoord;\n\n';
        }
        if (material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE)) {
          shaderText += 'uniform sampler2D uTexture;\n';
        }
        var normalTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_NORMAL);
        if (normalTexture) {
          shaderText += 'uniform highp sampler2D uNormalTexture;\n';
        }
        shaderText += 'uniform vec4 materialBaseColor;\n';
        shaderText += 'uniform int uIsTextureToMultiplyAlphaToColorPreviously;\n';

        return shaderText;
      }
    }, {
      key: 'FSMethodDefine_DecalShaderSource',
      value: function FSMethodDefine_DecalShaderSource(f, lights, material, extraData) {
        var shaderText = '';

        shaderText += this._multiplyAlphaToColorOfTexel();

        return shaderText;
      }
    }, {
      key: 'FSShade_DecalShaderSource',
      value: function FSShade_DecalShaderSource(f, gl, lights, material, extraData) {
        var shaderText = '';

        shaderText += Shader._getNormalStr(gl, material, f);

        var textureFunc = Shader._texture_func(gl);
        if (Shader._exist(f, GLBoost$1.COLOR)) {
          shaderText += '  rt0 *= color;\n';
        }
        shaderText += '    rt0 *= materialBaseColor;\n';
        if (Shader._exist(f, GLBoost$1.TEXCOORD) && material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE)) {
          shaderText += '  rt0 *= multiplyAlphaToColorOfTexel(uTexture, texcoord, uIsTextureToMultiplyAlphaToColorPreviously);\n';
        }

        return shaderText;
      }
    }, {
      key: 'prepare_DecalShaderSource',
      value: function prepare_DecalShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (attribName === 'color' || attribName === 'texcoord') {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            if (shaderProgram['vertexAttribute_' + attribName] !== -1) {
              gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
              vertexAttribsAsResult.push(attribName);
            }
          }
        });

        material.setUniform(shaderProgram, 'uniform_materialBaseColor', this._glContext.getUniformLocation(shaderProgram, 'materialBaseColor'));

        var diffuseTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE);
        if (!diffuseTexture) {
          diffuseTexture = this._glBoostSystem._glBoostContext.defaultDummyTexture;
        }

        if (diffuseTexture.toMultiplyAlphaToColorPreviously) {
          var uIsTextureToMultiplyAlphaToColorPreviously = this._glContext.getUniformLocation(shaderProgram, 'uIsTextureToMultiplyAlphaToColorPreviously');
          material.setUniform(shaderProgram, 'uIsTextureToMultiplyAlphaToColorPreviously', uIsTextureToMultiplyAlphaToColorPreviously);
        }

        material.registerTextureUnitToUniform(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE, shaderProgram, 'uTexture');

        material.registerTextureUnitToUniform(GLBoost$1.TEXTURE_PURPOSE_NORMAL, shaderProgram, 'uNormalTexture');

        return vertexAttribsAsResult;
      }
    }]);
    return DecalShaderSource;
  }();

  var DecalShader = function (_WireframeShader) {
    babelHelpers.inherits(DecalShader, _WireframeShader);

    function DecalShader(glBoostContext) {
      babelHelpers.classCallCheck(this, DecalShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (DecalShader.__proto__ || Object.getPrototypeOf(DecalShader)).call(this, glBoostContext));

      DecalShader.mixin(VertexWorldShadowShaderSource);
      DecalShader.mixin(DecalShaderSource);

      _this._lut = null;
      return _this;
    }

    babelHelpers.createClass(DecalShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(DecalShader.prototype.__proto__ || Object.getPrototypeOf(DecalShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var baseColor = null;
        if (material.className.indexOf('ClassicMaterial') !== -1) {
          baseColor = material.baseColor;
        } else {
          baseColor = new Vector4$1(1.0, 1.0, 1.0, 1.0);
        }
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_materialBaseColor'), baseColor.x, baseColor.y, baseColor.z, baseColor.w, true);

        var diffuseTexture = material.getTextureFromPurpose(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE);
        if (diffuseTexture) {
          material.updateTextureInfo(GLBoost$1.TEXTURE_PURPOSE_DIFFUSE, 'uTexture');
          this._glContext.uniform1i(material.getUniform(glslProgram, 'uIsTextureToMultiplyAlphaToColorPreviously'), diffuseTexture.toMultiplyAlphaToColorPreviously, true);
        }

        for (var i = 0; i < lights.length; i++) {
          if (lights[i].camera && lights[i].camera.texture) {
            var index = i + material.getTextureNumAttachedShader();
            lights[i].camera.texture.textureUnitIndex = index;

            var cameraMatrix = lights[i].camera.lookAtRHMatrix();
            var viewMatrix = cameraMatrix.clone();
            var projectionMatrix = lights[i].camera.projectionRHMatrix();
            this._glContext.uniformMatrix4fv(material.getUniform(glslProgram, 'uniform_depthPVMatrix_' + i), false, Matrix44$1.multiply(projectionMatrix, viewMatrix).flatten(), true);
          }

          if (lights[i].camera && lights[i].camera.texture) {
            this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 1, true);
          } else {
            this._glContext.uniform1i(material.getUniform(glslProgram, 'uniform_isShadowCasting' + i), 0, true);
          }

          if (lights[i].camera && lights[i].camera.texture) {
            var uniformLocation = material.getUniform(glslProgram, 'uniform_DepthTextureSampler_' + i);
            var _index = lights[i].camera.texture.textureUnitIndex;


            this._glContext.uniform1i(uniformLocation, _index, true);
          }
        }
      }
    }, {
      key: 'setUniformsAsTearDown',
      value: function setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(DecalShader.prototype.__proto__ || Object.getPrototypeOf(DecalShader.prototype), 'setUniformsAsTearDown', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);
        for (var i = 0; i < lights.length; i++) {
          if (lights[i].camera && lights[i].camera.texture) ;
        }
      }
    }, {
      key: 'lut',
      set: function set(lut) {
        this._lut = lut;
      },
      get: function get() {
        return this._lut;
      }
    }]);
    return DecalShader;
  }(WireframeShader);


  GLBoost$1['DecalShader'] = DecalShader;

  var L_AbstractMaterial = function (_GLBoostObject) {
    babelHelpers.inherits(L_AbstractMaterial, _GLBoostObject);

    function L_AbstractMaterial(glBoostContext) {
      babelHelpers.classCallCheck(this, L_AbstractMaterial);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_AbstractMaterial.__proto__ || Object.getPrototypeOf(L_AbstractMaterial)).call(this, glBoostContext));

      if (_this.constructor === L_AbstractMaterial) {
        throw new TypeError('Cannot construct L_AbstractMaterial instances directly.');
      }

      _this._textureDic = {};
      _this._texturePurposeDic = [];
      _this._textureContributionRateDic = {};
      _this._gl = _this._glContext.gl;

      _this._name = '';
      _this._shaderClass = DecalShader;
      _this._shaderInstance = null;
      _this._vertexNofGeometries = {};
      _this._states = {
        enable: [],
        functions: {}
      };
      _this._shaderUniformLocationsOfExpressions = {};
      _this._isVisibleForGeometiesAssginedByThisMaterial = true;
      _this._globalStatesUsage = null;
      _this._shaderParametersForShaderInstance = {};
      _this._semanticsDic = {};
      _this._textureSemanticsDic = {};

      _this._stateFunctionsToReset = {
        "blendColor": [0.0, 0.0, 0.0, 0.0],
        "blendEquationSeparate": [32774, 32774],
        "blendFuncSeparate": [1, 0, 1, 0],
        "colorMask": [true, true, true, true],
        "cullFace": [1029],
        "depthFunc": [513],
        "depthMask": [true],
        "depthRange": [0.0, 1.0],
        "frontFace": [2305],
        "lineWidth": [1.0],
        "polygonOffset": [0.0, 0.0]
      };

      _this._countOfUpdate = 0;
      return _this;
    }

    babelHelpers.createClass(L_AbstractMaterial, [{
      key: 'clone',
      value: function clone() {
        var material = new ClassicMaterial(this._glBoostContext);

        material._shaderClass = this._shaderClass;
        material._shaderInstance = this._shaderInstance;

        for (var geom in this._vertexNofGeometries) {
          material._vertexNofGeometries[geom] = this._vertexNofGeometries[geom];
        }

        return material;
      }
    }, {
      key: '_updateCount',
      value: function _updateCount() {
        this._countOfUpdate += 1;
      }
    }, {
      key: 'getUpdateStateString',
      value: function getUpdateStateString() {
        return this.toString() + '_updateCount_' + this._countOfUpdate;
      }
    }, {
      key: 'setShaderClassWithForceUpdate',
      value: function setShaderClassWithForceUpdate(shaderClass) {
        this._shaderClass = shaderClass;
        if (this._shaderInstance) {
          this._shaderInstance.readyForDiscard();
        }
        this._shaderInstance = null;
      }
    }, {
      key: 'setTexture',
      value: function setTexture(texture, purpose) {
        if (!texture) {
          return;
        }

        this._textureDic[texture.userFlavorName] = texture;
        var _purpose = typeof purpose !== 'undefined' ? purpose : GLBoost$1.TEXTURE_PURPOSE_DIFFUSE;
        this._texturePurposeDic[_purpose] = texture.userFlavorName;
        texture.purpose = _purpose;
        this._textureContributionRateDic[texture.userFlavorName] = new Vector4$1(1.0, 1.0, 1.0, 1.0);

        this._updateCount();
      }
    }, {
      key: 'removeTexture',
      value: function removeTexture(userFlavorName) {
        var discardTexture = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (discardTexture) {
          this._textureDic[userFlavorName].readyForDiscard();
        }
        delete this._texturePurposeDic[this._textureDic[userFlavorName].purpose];
        delete this._textureDic[userFlavorName];
        delete this._textureContributionRateDic[userFlavorName];
        this._updateCount();
      }
    }, {
      key: 'setTexturePurpose',
      value: function setTexturePurpose(userFlavorNameOfTexture, purpose) {
        this._texturePurposeDic[purpose] = userFlavorNameOfTexture;
        this._updateCount();
      }
    }, {
      key: 'getTexturePurpose',
      value: function getTexturePurpose(userFlavorNameOfTexture) {
        var hitPurpose = null;
        for (var purpose in this._texturePurposeDic) {
          if (this._texturePurposeDic[purpose] === userFlavorNameOfTexture) {
            hitPurpose = purpose;
          }
        }
        return hitPurpose;
      }
    }, {
      key: 'getTexture',
      value: function getTexture(userFlavorName) {
        return this._textureDic[userFlavorName];
      }
    }, {
      key: 'getTextureFromPurpose',
      value: function getTextureFromPurpose(purpose) {
        var userFlavorName = this._texturePurposeDic[purpose];
        var texture = this.getTexture(userFlavorName);


        return texture;
      }
    }, {
      key: 'getOneTexture',
      value: function getOneTexture() {
        for (var userFlavorName in this._textureDic) {
          return this._textureDic[userFlavorName];
        }
        return null;
      }
    }, {
      key: 'getTextureNum',
      value: function getTextureNum() {
        var count = 0;
        for (var userFlavorName in this._textureDic) {
          if (this._textureDic[userFlavorName] instanceof AbstractTexture) {
            count += 1;
          }
        }
        return count;
      }
    }, {
      key: 'getTextureUserFlavorNames',
      value: function getTextureUserFlavorNames() {
        return Object.keys(this._textureDic);
      }
    }, {
      key: 'setAllTextureContributionRate',
      value: function setAllTextureContributionRate(rateVec4) {
        for (var userFlavorName in this._textureContributionRateDic) {
          this._textureContributionRateDic[userFlavorName] = rateVec4;
        }
        this._updateCount();
      }
    }, {
      key: 'setTextureContributionRate',
      value: function setTextureContributionRate(textureUserFlavorName, rateVec4) {
        this._textureContributionRateDic[textureUserFlavorName] = rateVec4;
        this._updateCount();
      }
    }, {
      key: 'getTextureContributionRate',
      value: function getTextureContributionRate(textureUserFlavorName) {
        return this._textureContributionRateDic[textureUserFlavorName];
      }
    }, {
      key: 'hasAnyTextures',
      value: function hasAnyTextures() {
        var result = false;
        for (var userFlavorName in this._textureDic) {
          result = true;
        }

        return result;
      }
    }, {
      key: 'isTransparent',
      value: function isTransparent() {
        var isTransparent = false;
        if (this._states) {
          if (this._states.enable) {
            this._states.enable.forEach(function (state) {
              if (state === 3042) {
                isTransparent = true;
              }
            });
          }
        }

        return isTransparent;
      }
    }, {
      key: 'setVertexN',
      value: function setVertexN(geom, num) {
        this._vertexNofGeometries[geom] = num;
        this._updateCount();
      }
    }, {
      key: 'getVertexN',
      value: function getVertexN(geom) {
        return typeof this._vertexNofGeometries[geom] === 'undefined' ? 0 : this._vertexNofGeometries[geom];
      }
    }, {
      key: 'setUpTexture',
      value: function setUpTexture(textureName, textureUnitIndex) {
        var gl = this._gl;
        var texture = this.getTexture(textureName);
        var isCalledWebGLBindTexture = true;

        if (texture) {
          isCalledWebGLBindTexture = texture.setUp(textureUnitIndex);
          return isCalledWebGLBindTexture;
        } else {
          this._glBoostSystem._glBoostContext.defaultDummyTexture.setUp(textureUnitIndex);

          isCalledWebGLBindTexture = true;
          return isCalledWebGLBindTexture;
        }
      }
    }, {
      key: 'tearDownTexture',
      value: function tearDownTexture(textureName, textureUnitIndex) {
        var texture = this.getTexture(textureName);
        if (texture) {
          texture.tearDown(textureUnitIndex);
        }
      }
    }, {
      key: '_setUpMaterialStates',
      value: function _setUpMaterialStates(states) {
        var gl = this._gl;

        if (states) {
          if (states.enable) {
            states.enable.forEach(function (state) {
              gl.enable(state);
            });
          }
          if (states.functions) {
            for (var functionName in states.functions) {
              gl[functionName].apply(gl, states.functions[functionName]);
            }
          }
        }
      }
    }, {
      key: 'setUpStates',
      value: function setUpStates() {
        var globalStatesUsage = this._glBoostSystem._glBoostContext.globalStatesUsage;
        if (this._globalStatesUsage) {
          globalStatesUsage = this._globalStatesUsage;
        }
        switch (globalStatesUsage) {
          case GLBoost$1.GLOBAL_STATES_USAGE_DO_NOTHING:
            break;
          case GLBoost$1.GLOBAL_STATES_USAGE_IGNORE:
            this._setUpMaterialStates(this._states);
            break;
          case GLBoost$1.GLOBAL_STATES_USAGE_INCLUSIVE:
            this._glBoostSystem._glBoostContext.reflectGlobalGLState();
            this._setUpMaterialStates(this._states);
            break;
          case GLBoost$1.GLOBAL_STATES_USAGE_EXCLUSIVE:
            this._glBoostSystem._glBoostContext.reflectGlobalGLState();
            break;
          default:
            break;
        }
      }
    }, {
      key: 'tearDownStates',
      value: function tearDownStates() {
        this._glBoostSystem._glBoostContext.disableAllGLState();
        this._setUpMaterialStates({
          functions: this._stateFunctionsToReset
        });
      }
    }, {
      key: 'setUniform',
      value: function setUniform(glslProgram, uniformLocationName, uniformLocation) {
        if (!this._shaderUniformLocationsOfExpressions[glslProgram.hashId]) {
          this._shaderUniformLocationsOfExpressions[glslProgram.hashId] = {};
        }

        this._shaderUniformLocationsOfExpressions[glslProgram.hashId][uniformLocationName] = uniformLocation;
        glslProgram['uniform_' + uniformLocationName] = uniformLocationName;
        if (uniformLocation != null) {
          uniformLocation.uniformLocationName = uniformLocationName;
        }

        this._updateCount();
      }
    }, {
      key: 'getUniform',
      value: function getUniform(glslProgram, uniformLocationName) {
        if (typeof this._shaderUniformLocationsOfExpressions[glslProgram.hashId] !== 'undefined') {
          return this._shaderUniformLocationsOfExpressions[glslProgram.hashId][uniformLocationName];
        }

        return void 0;
      }
    }, {
      key: 'addSemanticsDic',
      value: function addSemanticsDic(uniform, uniformName) {
        if (typeof this._semanticsDic[uniform] === 'undefined') {
          this._semanticsDic[uniform] = uniformName;
        } else if (typeof this._semanticsDic[uniform] === 'string') {
          var tmpSemanticsStr = this._semanticsDic[uniform];
          this._semanticsDic[uniform] = [];
          this._semanticsDic[uniform].push(tmpSemanticsStr);
          this._semanticsDic[uniform].push(uniformName);
        } else {
          this._semanticsDic[uniform].push(uniformName);
        }
      }
    }, {
      key: 'removeSemanticsDic',
      value: function removeSemanticsDic(uniform) {
        delete this._semanticsDic[uniform];
      }
    }, {
      key: 'readyForDiscard',
      value: function readyForDiscard() {
        for (var userFlavorName in this._textureDic) {
          this.removeTexture(userFlavorName, true);
        }
        if (this._shaderInstance) {
          this._shaderInstance.readyForDiscard();
        }
        this._shaderInstance = null;
      }
    }, {
      key: 'registerTextureUnitToUniform',
      value: function registerTextureUnitToUniform(texturePurpose, shaderProgram, uniformName) {
        var texture = this.getTextureFromPurpose(texturePurpose);
        if (texture != null) {
          var uTexture = this._glContext.getUniformLocation(shaderProgram, uniformName);
          var index = Object.keys(this._textureSemanticsDic).indexOf('' + texturePurpose);
          index = index !== -1 ? index : Object.keys(this._textureSemanticsDic).length;
          this._glContext.uniform1i(uTexture, index, true);
          this.setUniform(shaderProgram, uniformName, uTexture);
          this.uniformTextureSamplerDic[uniformName] = {};
          this.uniformTextureSamplerDic[uniformName].textureUnitIndex = index;
          this.uniformTextureSamplerDic[uniformName].textureName = texture.userFlavorName;
          this._textureSemanticsDic[texturePurpose] = uniformName;
        }
      }
    }, {
      key: 'updateTextureInfo',
      value: function updateTextureInfo(texturePurpose, uniformName) {
        var texture = this.getTextureFromPurpose(texturePurpose);
        if (texture != null) {
          var index = Object.keys(this._textureSemanticsDic).indexOf('' + texturePurpose);
          index = index !== -1 ? index : Object.keys(this._textureSemanticsDic).length;
          this.uniformTextureSamplerDic[uniformName] = {};
          this.uniformTextureSamplerDic[uniformName].textureUnitIndex = index;
          this.uniformTextureSamplerDic[uniformName].textureName = texture.userFlavorName;
          this._textureSemanticsDic[texturePurpose] = uniformName;
        }
      }
    }, {
      key: 'getTextureNumAttachedShader',
      value: function getTextureNumAttachedShader() {
        return Object.keys(this._textureSemanticsDic).length;
      }
    }, {
      key: 'shaderClass',
      set: function set(shaderClass) {
        if (this._shaderClass === shaderClass) {
          return;
        }
        this.setShaderClassWithForceUpdate(shaderClass);
      },
      get: function get() {
        return this._shaderClass;
      }
    }, {
      key: 'shaderInstance',
      set: function set(shaderInstance) {
        this._shaderInstance = shaderInstance;
        this._updateCount();
      },
      get: function get() {
        return this._shaderInstance;
      }
    }, {
      key: 'states',
      set: function set(states) {
        if (typeof states.functions === 'undefined') {
          states.functions = this._stateFunctionsToReset;
        }
        this._states.enable = states.enable;
        if (typeof states.functions !== 'undefined') {
          this._states.functions = states.functions;
        }
        this._updateCount();
      },
      get: function get() {
        return this._states;
      }
    }, {
      key: 'name',
      set: function set(name) {
        this._name = name;
        this._updateCount();
      },
      get: function get() {
        return this._name;
      }
    }, {
      key: 'isVisible',
      set: function set(flg) {
        this._isVisibleForGeometiesAssginedByThisMaterial = flg;
        this._updateCount();
      },
      get: function get() {
        return this._isVisibleForGeometiesAssginedByThisMaterial;
      }
    }, {
      key: 'globalStatesUsage',
      set: function set(usage) {
        this._globalStatesUsage = usage;
        this._updateCount();
      },
      get: function get() {
        return this._globalStatesUsage;
      }
    }, {
      key: 'shaderParameters',
      get: function get() {
        return this._shaderParametersForShaderInstance;
      },
      set: function set(shaderParameterDic) {
        this._shaderParametersForShaderInstance = shaderParameterDic;
      }
    }]);
    return L_AbstractMaterial;
  }(GLBoostObject);


  GLBoost$1['L_AbstractMaterial'] = L_AbstractMaterial;

  var ClassicMaterial$1 = function (_L_AbstractMaterial) {
    babelHelpers.inherits(ClassicMaterial, _L_AbstractMaterial);

    function ClassicMaterial(glBoostContext) {
      babelHelpers.classCallCheck(this, ClassicMaterial);

      var _this = babelHelpers.possibleConstructorReturn(this, (ClassicMaterial.__proto__ || Object.getPrototypeOf(ClassicMaterial)).call(this, glBoostContext));

      _this._wireframeWidthRelativeScale = 1.0;
      _this._baseColor = new Vector4$1(1.0, 1.0, 1.0, 1.0);
      _this._diffuseColor = new Vector4$1(1.0, 1.0, 1.0, 1.0);
      _this._specularColor = new Vector4$1(0.5, 0.5, 0.5, 1.0);
      _this._ambientColor = new Vector4$1(0.25, 0.25, 0.25, 1.0);
      return _this;
    }

    babelHelpers.createClass(ClassicMaterial, [{
      key: 'clone',
      value: function clone() {
        babelHelpers.get(ClassicMaterial.prototype.__proto__ || Object.getPrototypeOf(ClassicMaterial.prototype), 'clone', this).call(this);

        material._baseColor = this._baseColor;
        material._diffuseColor = this._diffuseColor;
        material._specularColor = this._specularColor;
        material._ambientColor = this._ambientColor;
      }
    }, {
      key: 'wireframeWidthRelativeScale',
      get: function get() {
        return this._wireframeWidthRelativeScale;
      }
    }, {
      key: 'baseColor',
      set: function set(vec) {
        if (!vec) {
          return;
        }

        this._baseColor = vec;
        this._updateCount();
      },
      get: function get() {
        return this._baseColor;
      }
    }, {
      key: 'diffuseColor',
      set: function set(vec) {
        if (!vec) {
          return;
        }

        this._diffuseColor = vec;
        this._updateCount();
      },
      get: function get() {
        return this._diffuseColor;
      }
    }, {
      key: 'specularColor',
      set: function set(vec) {
        if (!vec) {
          return;
        }

        this._specularColor = vec;
        this._updateCount();
      },
      get: function get() {
        return this._specularColor;
      }
    }, {
      key: 'ambientColor',
      set: function set(vec) {
        if (!vec) {
          return;
        }

        this._ambientColor = vec;
        this._updateCount();
      },
      get: function get() {
        return this._ambientColor;
      }
    }]);
    return ClassicMaterial;
  }(L_AbstractMaterial);


  GLBoost$1['ClassicMaterial'] = ClassicMaterial$1;

  var PBRPrincipledShaderSource = function () {
    function PBRPrincipledShaderSource() {
      babelHelpers.classCallCheck(this, PBRPrincipledShaderSource);
    }

    babelHelpers.createClass(PBRPrincipledShaderSource, [{
      key: 'FSDefine_PBRPrincipledShaderSource',
      value: function FSDefine_PBRPrincipledShaderSource(in_, f, lights, material, extraData) {

        var shaderText = '';
        shaderText += 'uniform vec2 uMetallicRoughnessFactors;\n';
        shaderText += 'uniform vec3 uBaseColorFactor;\n';
        shaderText += 'uniform vec2 uOcclusionFactors;';
        shaderText += 'uniform vec3 uEmissiveFactor;';
        shaderText += 'uniform sampler2D uMetallicRoughnessTexture;\n';

        var occlusionTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_OCCLUSION);
        if (occlusionTexture) {
          shaderText += 'uniform sampler2D uOcclusionTexture;\n';
        }

        var emissiveTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_EMISSIVE);
        if (emissiveTexture) {
          shaderText += 'uniform sampler2D uEmissiveTexture;\n';
        }

        var diffuseEnvCubeTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE);
        if (diffuseEnvCubeTexture) {
          shaderText += 'uniform sampler2D uBrdfLUTTexture;\n';
          shaderText += 'uniform samplerCube uDiffuseEnvTexture;\n';
          shaderText += 'uniform samplerCube uSpecularEnvTexture;\n';
          shaderText += 'uniform vec3 uIBLParameters;\n';
        }

        shaderText += 'uniform vec4 ambient;\n';

        var sampler2D = this._sampler2DShadow_func();
        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;
        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform highp ' + sampler2D + ' uDepthTexture[' + lightNumExceptAmbient + '];\n';
          shaderText += in_ + ' vec4 v_shadowCoord[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform int isShadowCasting[' + lightNumExceptAmbient + '];\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSMethodDefine_PBRPrincipledShaderSource',
      value: function FSMethodDefine_PBRPrincipledShaderSource(f, lights, material, extraData) {
        var shaderText = '';

        shaderText += '\n      const float M_PI = 3.141592653589793;\n      const float c_MinRoughness = 0.04;\n    ';

        shaderText += '\n    float angular_n_h(float NH) {\n      return acos(NH);\n    }\n    ';

        shaderText += '\n    float sqr(float x) {\n      return x*x;\n    }\n    ';

        shaderText += '\n    float d_phong(float NH, float c1) {\n      return pow(\n        cos(acos(NH))\n        , c1\n      );\n    }\n    ';

        shaderText += '\n    // GGX NDF\n    float d_ggx(float NH, float alphaRoughness) {\n      float roughnessSqr = alphaRoughness * alphaRoughness;\n      float f = (roughnessSqr - 1.0) * NH * NH + 1.0;\n      return roughnessSqr / (M_PI * f * f);\n    }\n    ';

        shaderText += '\n    float d_torrance_reiz(float NH, float c3) {\n      float CosSquared = NH*NH;\n      float TanSquared = (1.0 - CosSquared)/CosSquared;\n      //return (1.0/M_PI) * sqr(c3/(CosSquared * (c3*c3 + TanSquared)));  // gamma = 2, aka GGX\n      return (1.0/sqrt(M_PI)) * (sqr(c3)/(CosSquared * (c3*c3 + TanSquared))); // gamma = 1, D_Berry\n    }\n    ';

        shaderText += '\n    float d_beckmann(float NH, float m) {\n      float co = 1.0 / (4.0 * m * m * NH * NH * NH * NH);\n      float expx = exp((NH * NH - 1.0) / (m * m * NH * NH));\n      return co * expx; \n    }\n    ';

        shaderText += '\n    // the same as glTF WebGL sample\n    // https://github.com/KhronosGroup/glTF-WebGL-PBR/blob/88eda8c5358efe03128b72b6c5f5f6e5b6d023e1/shaders/pbr-frag.glsl#L188\n    // That is, Unreal Engine based approach, but modified to use alphaRoughness (squared artist\'s roughness parameter),\n    // and based on \'Separable Masking and Shadowing\' approximation (propesed by Christophe Schlick)\n    // https://www.cs.virginia.edu/~jdl/bib/appearance/analytic%20models/schlick94b.pdf\n    float g_shielding(float NL, float NV, float alphaRoughness) {\n      float r = alphaRoughness;\n\n      // Local Shadowing using "Schlick-Smith" Masking Function\n      float localShadowing = 2.0 * NL / (NL + sqrt(r * r + (1.0 - r * r) * (NL * NL)));\n      \n      // Local Masking using "Schlick-Smith" Masking Function\n      float localMasking = 2.0 * NV / (NV + sqrt(r * r + (1.0 - r * r) * (NV * NV)));\n      \n      return localShadowing * localMasking;\n    }\n    ';

        shaderText += '\n    // The Schlick Approximation to Fresnel\n    vec3 fresnel(vec3 f0, float LH) {\n      return vec3(f0) + (vec3(1.0) - f0) * pow(1.0 - LH, 5.0);\n    }\n    ';

        shaderText += '\n    vec3 cook_torrance_specular_brdf(float NH, float NL, float NV, vec3 F, float alphaRoughness) {    \n      float D = d_ggx(NH, alphaRoughness);\n      float G = g_shielding(NL, NV, alphaRoughness);\n      return vec3(D)*vec3(G)*F/vec3(4.0*NL*NV);\n    }\n    ';

        shaderText += '\n    vec3 diffuse_brdf(vec3 albedo)\n    {\n      return albedo / M_PI;\n    }\n    ';

        shaderText += '\n      vec3 srgbToLinear(vec3 srgbColor) {\n        return pow(srgbColor, vec3(2.2));\n      }\n    ';

        shaderText += '\n    vec3 linearToSrgb(vec3 linearColor) {\n      return pow(linearColor, vec3(1.0/2.2));\n    }\n  ';

        var diffuseEnvCubeTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE);
        if (diffuseEnvCubeTexture) {
          shaderText += '\n      vec3 IBLContribution(vec3 n, float NV, vec3 reflection, vec3 albedo, vec3 F0, float userRoughness)\n      {\n        float mipCount = uIBLParameters.x;\n        float lod = (userRoughness * mipCount);\n\n        vec3 brdf = srgbToLinear(texture2D(uBrdfLUTTexture, vec2(NV, 1.0 - userRoughness)).rgb);\n        vec3 diffuseLight = srgbToLinear(textureCube(uDiffuseEnvTexture, n).rgb);\n        ';
          var gl = this._glBoostSystem._glContext.gl;
          var lodExt = gl.getExtension("EXT_shader_texture_lod");
          if (lodExt) {
            shaderText += 'vec3 specularLight = srgbToLinear(textureCubeLodEXT(uSpecularEnvTexture, reflection, lod).rgb);';
          } else {
            shaderText += 'vec3 specularLight = srgbToLinear(textureCube(uSpecularEnvTexture, reflection).rgb);';
          }
          shaderText += '\n        vec3 diffuse = diffuseLight * albedo;\n        vec3 specular = specularLight * (F0 * brdf.x + brdf.y);\n\n        float IBLDiffuseContribution = uIBLParameters.y;\n        float IBLSpecularContribution = uIBLParameters.z;\n        diffuse *= IBLDiffuseContribution;\n        specular *= IBLSpecularContribution;\n        return diffuse + specular;\n      }\n      ';
        }

        return shaderText;
      }
    }, {
      key: 'FSShade_PBRPrincipledShaderSource',
      value: function FSShade_PBRPrincipledShaderSource(f, gl, lights, material, extraData) {
        var shaderText = '';

        shaderText += '\nvec3 surfaceColor = rt0.rgb;\nrt0 = vec4(0.0, 0.0, 0.0, 0.0);\n\n// BaseColor\nvec3 baseColor = srgbToLinear(surfaceColor) * uBaseColorFactor.rgb;\n\n// Metallic & Roughness\nfloat userRoughness = uMetallicRoughnessFactors.y;\nfloat metallic = uMetallicRoughnessFactors.x;\n';

        var metallicRoughnessTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_METALLIC_ROUGHNESS);
        if (metallicRoughnessTexture) {
          shaderText += '\nvec4 ormTexel = texture2D(uMetallicRoughnessTexture, texcoord);\nuserRoughness = ormTexel.g * userRoughness;\nmetallic = ormTexel.b * metallic;\n';
        }

        shaderText += '\nuserRoughness = clamp(userRoughness, c_MinRoughness, 1.0);\nmetallic = clamp(metallic, 0.0, 1.0);\nfloat alphaRoughness = userRoughness * userRoughness;\n\n// F0\nvec3 diffuseMatAverageF0 = vec3(0.04);\nvec3 F0 = mix(diffuseMatAverageF0, baseColor.rgb, metallic);\n\n// Albedo\nvec3 albedo = baseColor.rgb * (vec3(1.0) - diffuseMatAverageF0);\nalbedo.rgb *= (1.0 - metallic);\n';
        shaderText += '    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n';
        shaderText += '    float NV = clamp(dot(normal, viewDirection), 0.001, 1.0);\n';

        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];
          var isShadowEnabledAsTexture = light.camera && light.camera.texture ? true : false;
          shaderText += '  {\n';
          shaderText += Shader._generateLightStr(i);

          shaderText += '    vec4 incidentLight = spotEffect * lightDiffuse[' + i + '];\n';
          shaderText += '    incidentLight.rgb *= M_PI;\n';
          shaderText += '    vec3 halfVector = normalize(lightDirection + viewDirection);\n';
          shaderText += '    float LH = clamp(dot(lightDirection, halfVector), 0.0, 1.0);\n';
          shaderText += '    vec3 F = fresnel(F0, LH);\n';

          shaderText += '    vec3 diffuseContrib = (vec3(1.0) - F) * diffuse_brdf(albedo);\n';

          shaderText += '    float NL = clamp(dot(normal, lightDirection), 0.001, 1.0);\n';
          shaderText += '    float NH = clamp(dot(normal, halfVector), 0.0, 1.0);\n';
          shaderText += '    float VH = clamp(dot(viewDirection, halfVector), 0.0, 1.0);\n';
          shaderText += '    vec3 specularContrib = cook_torrance_specular_brdf(NH, NL, NV, F, alphaRoughness);\n';
          shaderText += '    vec3 diffuseAndSpecular = (diffuseContrib + specularContrib) * vec3(NL) * incidentLight.rgb;\n';

          shaderText += Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);

          shaderText += '    rt0.xyz += diffuseAndSpecular * visibility;\n';

          shaderText += '  }\n';
        }

        var diffuseEnvCubeTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE);
        if (diffuseEnvCubeTexture) {
          shaderText += 'vec3 reflection = reflect(-viewDirection, normal);\n';
          shaderText += 'vec3 ibl = IBLContribution(normal, NV, reflection, albedo, F0, userRoughness);\n';
        } else {
          shaderText += 'vec3 ibl = vec3(0.0, 0.0, 0.0);\n';
        }

        shaderText += 'float occlusion = 1.0;\n';
        var occlusionTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_OCCLUSION);
        if (occlusionTexture) {
          shaderText += 'occlusion = mix(1.0, texture2D(uOcclusionTexture, texcoord).r, uOcclusionFactors.x);\n';
        }

        shaderText += '  float occlusionRateForDirectionalLight = uOcclusionFactors.y;\n';
        shaderText += '  rt0.xyz = mix(rt0.xyz, rt0.xyz * occlusion, occlusionRateForDirectionalLight);\n';

        shaderText += '  rt0.xyz += (ambient.xyz + ibl) * occlusion;\n';

        shaderText += '  vec3 emissive = uEmissiveFactor;\n';
        var emissiveTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_EMISSIVE);
        if (emissiveTexture) {
          shaderText += 'emissive *= srgbToLinear(texture2D(uEmissiveTexture, texcoord).xyz);';
        }
        shaderText += '  rt0.xyz += emissive;\n';

        shaderText += '  rt0.xyz = linearToSrgb(rt0.xyz);\n';

        shaderText += '  rt0.a = 1.0;\n';


        return shaderText;
      }
    }, {
      key: 'prepare_PBRPrincipledShaderSource',
      value: function prepare_PBRPrincipledShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        material.setUniform(shaderProgram, 'uniform_BaseColorFactor', this._glContext.getUniformLocation(shaderProgram, 'uBaseColorFactor'));
        material.setUniform(shaderProgram, 'uniform_MetallicRoughnessFactors', this._glContext.getUniformLocation(shaderProgram, 'uMetallicRoughnessFactors'));
        material.setUniform(shaderProgram, 'uniform_OcclusionFactors', this._glContext.getUniformLocation(shaderProgram, 'uOcclusionFactors'));
        material.setUniform(shaderProgram, 'uniform_EmissiveFactor', this._glContext.getUniformLocation(shaderProgram, 'uEmissiveFactor'));
        material.setUniform(shaderProgram, 'uniform_IBLParameters', this._glContext.getUniformLocation(shaderProgram, 'uIBLParameters'));
        material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));

        material.setTexture(this._glBoostSystem._glBoostContext.brdfLutTexture, GLBoost.TEXTURE_PURPOSE_BRDF_LUT);
        material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_METALLIC_ROUGHNESS, shaderProgram, 'uMetallicRoughnessTexture');
        material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_OCCLUSION, shaderProgram, 'uOcclusionTexture');
        material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_EMISSIVE, shaderProgram, 'uEmissiveTexture');
        material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_BRDF_LUT, shaderProgram, 'uBrdfLutTexture');
        material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_IBL_DIFFUSE_ENV_CUBE, shaderProgram, 'uDiffuseEnvTexture');
        material.registerTextureUnitToUniform(GLBoost.TEXTURE_PURPOSE_IBL_SPECULAR_ENV_CUBE, shaderProgram, 'uSpecularEnvTexture');

        return vertexAttribsAsResult;
      }
    }]);
    return PBRPrincipledShaderSource;
  }();

  var PBRPrincipledShader = function (_DecalShader) {
    babelHelpers.inherits(PBRPrincipledShader, _DecalShader);

    function PBRPrincipledShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, PBRPrincipledShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (PBRPrincipledShader.__proto__ || Object.getPrototypeOf(PBRPrincipledShader)).call(this, glBoostContext, basicShader));

      PBRPrincipledShader.mixin(PBRPrincipledShaderSource);
      return _this;
    }

    babelHelpers.createClass(PBRPrincipledShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(PBRPrincipledShader.prototype.__proto__ || Object.getPrototypeOf(PBRPrincipledShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var baseColor = material.baseColor;
        var metallic = material.metallic !== void 0 ? material.metallic : 1.0;
        var roughness = material.roughness !== void 0 ? material.roughness : 0.5;
        var occlusion = material.occlusion !== void 0 ? material.occlusion : 1.0;
        var occlusionRateForDirectionalLight = material.occlusionRateForDirectionalLight !== void 0 ? material.occlusionRateForDirectionalLight : 0.2;
        var emissive = material.emissive !== void 0 ? material.emissive : Vector3.zero();
        var IBLSpecularTextureMipmapCount = material.IBLSpecularTextureMipmapCount !== void 0 ? material.IBLSpecularTextureMipmapCount : 9;
        var IBLDiffuseContribution = material.IBLDiffuseContribution !== void 0 ? material.IBLDiffuseContribution : 0.2;
        var IBLSpecularContribution = material.IBLSpecularContribution !== void 0 ? material.IBLSpecularContribution : 0.2;
        this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_MetallicRoughnessFactors'), metallic, roughness, true);
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_BaseColorFactor'), baseColor.x, baseColor.y, baseColor.z, true);
        this._glContext.uniform2f(material.getUniform(glslProgram, 'uniform_OcclusionFactors'), occlusion, occlusionRateForDirectionalLight, true);
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_EmissiveFactor'), emissive.x, emissive.y, emissive.z, true);
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_IBLParameters'), IBLSpecularTextureMipmapCount, IBLDiffuseContribution, IBLSpecularContribution, true);

        var ambient = Vector4$1.multiplyVector(new Vector4$1(1.0, 1.0, 1.0, 1.0), scene.getAmountOfAmbientLightsIntensity());
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);
      }
    }]);
    return PBRPrincipledShader;
  }(DecalShader);


  GLBoost['PBRPrincipledShader'] = PBRPrincipledShader;

  var PBRMetallicRoughnessMaterial = function (_L_AbstractMaterial) {
    babelHelpers.inherits(PBRMetallicRoughnessMaterial, _L_AbstractMaterial);

    function PBRMetallicRoughnessMaterial(glBoostSystem) {
      babelHelpers.classCallCheck(this, PBRMetallicRoughnessMaterial);

      var _this = babelHelpers.possibleConstructorReturn(this, (PBRMetallicRoughnessMaterial.__proto__ || Object.getPrototypeOf(PBRMetallicRoughnessMaterial)).call(this, glBoostSystem));

      _this._wireframeWidthRelativeScale = 1.0;

      _this._baseColorFactor = new Vector3(1.0, 1.0, 1.0);
      _this._metallicRoughnessFactors = new Vector2(1.0, 1.0);
      _this._occlusionFactor = 1.0;
      _this._emissiveFactor = new Vector3(0.0, 0.0, 0.0);
      _this._occlusionRateForDirectionalLight = 0.2;
      _this._IBLSpecularTextureMipmapCount = 9;
      _this._IBLDiffuseContribution = 0.2;
      _this._IBLSpecularContribution = 0.55;

      _this._shaderClass = PBRPrincipledShader;
      return _this;
    }

    babelHelpers.createClass(PBRMetallicRoughnessMaterial, [{
      key: 'wireframeWidthRelativeScale',
      get: function get() {
        return this._wireframeWidthRelativeScale;
      }
    }, {
      key: 'baseColor',
      set: function set(val) {
        this._baseColorFactor = val.clone();
      },
      get: function get() {
        return this._baseColorFactor.clone();
      }
    }, {
      key: 'metallic',
      set: function set(val) {
        this._metallicRoughnessFactors.x = val;
      },
      get: function get() {
        return this._metallicRoughnessFactors.x;
      }
    }, {
      key: 'roughness',
      set: function set(val) {
        this._metallicRoughnessFactors.y = val;
      },
      get: function get() {
        return this._metallicRoughnessFactors.y;
      }
    }, {
      key: 'emissive',
      set: function set(val) {
        this._emissiveFactor = val;
      },
      get: function get() {
        return this._emissiveFactor;
      }
    }, {
      key: 'occlusion',
      set: function set(val) {
        this._occlusionFactor = val;
      },
      get: function get() {
        return this._occlusionFactor;
      }
    }, {
      key: 'occlusionRateForDirectionalLight',
      set: function set(val) {
        this._occlusionRateForDirectionalLight = val;
      },
      get: function get() {
        return this._occlusionRateForDirectionalLight;
      }
    }, {
      key: 'IBLSpecularTextureMipmapCount',
      set: function set(val) {
        this._IBLSpecularTextureMipmapCount = val;
      },
      get: function get() {
        return this._IBLSpecularTextureMipmapCount;
      }
    }, {
      key: 'IBLDiffuseContribution',
      set: function set(val) {
        this._IBLDiffuseContribution = val;
      },
      get: function get() {
        return this._IBLDiffuseContribution;
      }
    }, {
      key: 'IBLSpecularContribution',
      set: function set(val) {
        this._IBLSpecularContribution = val;
      },
      get: function get() {
        return this._IBLSpecularContribution;
      }
    }]);
    return PBRMetallicRoughnessMaterial;
  }(L_AbstractMaterial);


  GLBoost$1['PBRMetallicRoughnessMaterial'] = PBRMetallicRoughnessMaterial;

  var L_AbstractCamera = function (_L_Element) {
    babelHelpers.inherits(L_AbstractCamera, _L_Element);

    function L_AbstractCamera(glBoostContext, toRegister, lookat) {
      babelHelpers.classCallCheck(this, L_AbstractCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_AbstractCamera.__proto__ || Object.getPrototypeOf(L_AbstractCamera)).call(this, glBoostContext, toRegister));

      if (_this.constructor === L_AbstractCamera) {
        throw new TypeError('Cannot construct AbstractCamera instances directly.');
      }

      _this._translate = lookat.eye;
      _this._translateInner = babelHelpers.get(L_AbstractCamera.prototype.__proto__ || Object.getPrototypeOf(L_AbstractCamera.prototype), 'translate', _this).clone();
      _this._center = lookat.center;
      _this._up = lookat.up;
      _this._upInner = lookat.up;
      _this._centerInner = _this._up.clone();

      _this._cameraController = null;

      _this._dirtyView = true;

      _this._middleLevelCamera = null;
      return _this;
    }

    babelHelpers.createClass(L_AbstractCamera, [{
      key: '_affectedByCameraController',
      value: function _affectedByCameraController() {
        if (this._cameraController !== null) {
          var results = this._cameraController.convert(this);
          this._translateInner = results[0];
          this._centerInner = results[1];
          this._upInner = results[2];
          this._zNearInner = results[3];
          this._zFarInner = results[4];
          this._leftInner = results[5];
          this._rightInner = results[6];
          this._topInner = results[7];
          this._bottomInner = results[8];
        } else {
          this._translateInner = babelHelpers.get(L_AbstractCamera.prototype.__proto__ || Object.getPrototypeOf(L_AbstractCamera.prototype), 'translate', this).clone();
          this._centerInner = this._center.clone();
          this._upInner = this._up.clone();
          this._zNearInner = this._zNear;
          this._zFarInner = this._zFar;
          this._leftInner = this._left;
          this._rightInner = this._right;
          this._topInner = this._top;
          this._bottomInner = this._bottom;
        }
      }
    }, {
      key: '_needUpdateView',
      value: function _needUpdateView() {
        var withTryingResetOfCameraController = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this._cameraController !== null && withTryingResetOfCameraController) {
          this._cameraController.tryReset();
        }
        this._dirtyView = true;
      }
    }, {
      key: 'lookAtRHMatrix',
      value: function lookAtRHMatrix() {
        if (this._dirtyView) {
          this._affectedByCameraController();
          this._viewMatrix = L_AbstractCamera.lookAtRHMatrix(this.translateInner, this.centerInner, this.upInner);
          this._dirtyView = false;
          return this._viewMatrix.clone();
        } else {
          return this._viewMatrix.clone();
        }
      }
    }, {
      key: 'setAsMainCamera',
      value: function setAsMainCamera(scene) {
        L_AbstractCamera._mainCamera[scene.toString()] = this;
      }
    }, {
      key: 'isMainCamera',
      value: function isMainCamera(scene) {
        return L_AbstractCamera._mainCamera[scene.toString()] === this;
      }
    }, {
      key: 'cameraController',
      set: function set(controller) {
        this._cameraController = controller;
        if (this._middleLevelCamera !== null) {
          controller.addCamera(this._middleLevelCamera);
        } else {
          controller.addCamera(this);
        }
      },
      get: function get() {
        return this._cameraController;
      }
    }, {
      key: 'middleLevelCamera',
      get: function get() {
        return this._middleLevelCamera;
      }
    }, {
      key: 'translate',
      set: function set(vec) {
        babelHelpers.set(L_AbstractCamera.prototype.__proto__ || Object.getPrototypeOf(L_AbstractCamera.prototype), 'translate', vec, this);
        this._needUpdateView();
      },
      get: function get() {
        return this._translate;
      }
    }, {
      key: 'translateInner',
      get: function get() {
        return this._translateInner;
      }
    }, {
      key: 'eye',
      set: function set(vec) {
        babelHelpers.set(L_AbstractCamera.prototype.__proto__ || Object.getPrototypeOf(L_AbstractCamera.prototype), 'translate', vec, this);
        this._needUpdateView();
      },
      get: function get() {
        return this._translate;
      }
    }, {
      key: 'eyeInner',
      get: function get() {
        return this._translateInner;
      }
    }, {
      key: 'center',
      set: function set(vec) {
        if (this._center.isEqual(vec)) {
          return;
        }
        this._center = vec;
        this._needUpdateView();
      },
      get: function get() {
        return this._center;
      }
    }, {
      key: 'centerInner',
      get: function get() {
        return this._centerInner;
      }
    }, {
      key: 'up',
      set: function set(vec) {
        if (this._up.isEqual(vec)) {
          return;
        }
        this._up = vec;
        this._needUpdateView();
      },
      get: function get() {
        return this._up;
      }
    }, {
      key: 'upInner',
      get: function get() {
        return this._upInner;
      }
    }, {
      key: 'texture',
      set: function set(texture) {
        this._texture = texture;
      },
      get: function get() {
        return this._texture;
      }
    }, {
      key: 'allInfoExceptInnerData',
      get: function get() {
        var info = {};

        info.translate = this.translate;
        info.center = this.center;
        info.up = this.up;

        return info;
      }
    }, {
      key: 'allInfoAsInnerData',
      get: function get() {
        var info = {};

        info.translate = this.translateInner;
        info.center = this.centerInner;
        info.up = this.upInner;

        return info;
      }
    }, {
      key: 'allInfo',
      get: function get() {
        var info = {};

        info.translate = this.translate;
        info.translateInner = this.translateInner;
        info.center = this.center;
        info.centerInner = this.centerInner;
        info.up = this.up;
        info.upInner = this.upInner;

        return info;
      },
      set: function set(arg) {
        var json = arg;
        if (typeof arg === "string") {
          json = JSON.parse(arg);
        }
        for (var key in json) {
          if (json.hasOwnProperty(key) && key in this) {
            if (key === "quaternion") {
              this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToQuaternion(json[key]));
            } else {
              this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToVectorOrMatrix(json[key]));
            }
          }
        }
      }
    }], [{
      key: 'lookAtRHMatrix',
      value: function lookAtRHMatrix(eye, center, up) {

        var f = Vector3.normalize(Vector3.subtract(center, eye));
        var s = Vector3.normalize(Vector3.cross(f, up));
        var u = Vector3.cross(s, f);

        return new Matrix44$1(s.x, s.y, s.z, -Vector3.dotProduct(s, eye), u.x, u.y, u.z, -Vector3.dotProduct(u, eye), -f.x, -f.y, -f.z, Vector3.dotProduct(f, eye), 0, 0, 0, 1);
      }
    }]);
    return L_AbstractCamera;
  }(L_Element);


  L_AbstractCamera._mainCamera = {};

  var L_PerspectiveCamera = function (_L_AbstractCamera) {
    babelHelpers.inherits(L_PerspectiveCamera, _L_AbstractCamera);

    function L_PerspectiveCamera(glBoostContext, toRegister, lookat, perspective) {
      babelHelpers.classCallCheck(this, L_PerspectiveCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_PerspectiveCamera.__proto__ || Object.getPrototypeOf(L_PerspectiveCamera)).call(this, glBoostContext, toRegister, lookat));

      _this._fovy = perspective.fovy;
      _this._aspect = perspective.aspect;
      _this._zNear = perspective.zNear;
      _this._zFar = perspective.zFar;

      _this._zNearInner = perspective.zNear;
      _this._zFarInner = perspective.zFar;

      _this._dirtyProjection = true;
      _this._updateCountAsCameraProjection = 0;
      return _this;
    }

    babelHelpers.createClass(L_PerspectiveCamera, [{
      key: '_needUpdateProjection',
      value: function _needUpdateProjection() {
        this._dirtyProjection = true;
        this._updateCountAsCameraProjection++;
      }
    }, {
      key: 'projectionRHMatrix',
      value: function projectionRHMatrix() {
        if (this._dirtyProjection) {
          this._projectionMatrix = L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNearInner, this._zFarInner);
          this._dirtyProjection = false;
          return this._projectionMatrix.clone();
        } else {
          return this._projectionMatrix.clone();
        }
      }
    }, {
      key: 'updateCountAsCameraProjection',
      get: function get() {
        return this._updateCountAsCameraProjection;
      }
    }, {
      key: 'fovy',
      set: function set(value) {
        if (this._fovy === value) {
          return;
        }
        this._fovy = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._fovy;
      }
    }, {
      key: 'aspect',
      set: function set(value) {
        if (this._aspect === value) {
          return;
        }
        this._aspect = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._aspect;
      }
    }, {
      key: 'zNear',
      set: function set(value) {
        if (this._zNear === value) {
          return;
        }
        this._zNear = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zNear;
      }
    }, {
      key: 'zFar',
      set: function set(value) {
        if (this._zFar === value) {
          return;
        }
        this._zFar = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zFar;
      }
    }, {
      key: 'left',
      get: function get() {
        if (this._xscale != null) {
          L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNearInner, this._zFarInner);
        }
        return -this._zNear / this._xscale;
      }
    }, {
      key: 'right',
      get: function get() {
        return -this.left;
      }
    }, {
      key: 'top',
      get: function get() {
        return -this.bottom;
      }
    }, {
      key: 'bottom',
      get: function get() {
        if (this._xscale != null) {
          L_PerspectiveCamera.perspectiveRHMatrix(this._fovy, this._aspect, this._zNearInner, this._zFarInner);
        }
        return this._zNear / this._yscale;
      }
    }, {
      key: 'allInfo',
      get: function get() {
        var info = babelHelpers.get(L_PerspectiveCamera.prototype.__proto__ || Object.getPrototypeOf(L_PerspectiveCamera.prototype), 'allInfo', this);

        info.fovy = this.fovy;
        info.aspect = this.aspect;
        info.zFar = this.zFar;
        info.zFarInner = this.zFarInner;
        info.zNear = this.zNear;
        info.zNearInner = this.zNearInner;

        return info;
      },
      set: function set(info) {
        babelHelpers.set(L_PerspectiveCamera.prototype.__proto__ || Object.getPrototypeOf(L_PerspectiveCamera.prototype), 'allInfo', info, this);
      }
    }, {
      key: 'allInfoExceptInnerData',
      get: function get() {
        var info = babelHelpers.get(L_PerspectiveCamera.prototype.__proto__ || Object.getPrototypeOf(L_PerspectiveCamera.prototype), 'allInfoExceptInnerData', this);

        info.fovy = this.fovy;
        info.aspect = this.aspect;
        info.zFar = this.zFar;
        info.zNear = this.zNear;

        return info;
      }
    }, {
      key: 'allInfoAsInnerData',
      get: function get() {
        var info = babelHelpers.get(L_PerspectiveCamera.prototype.__proto__ || Object.getPrototypeOf(L_PerspectiveCamera.prototype), 'allInfoAsInnerData', this);

        info.fovy = this.fovy;
        info.aspect = this.aspect;
        info.zFar = this.zFarInner;
        info.zNear = this.zNearInner;

        return info;
      }
    }], [{
      key: 'perspectiveRHMatrix',
      value: function perspectiveRHMatrix(fovy, aspect, zNear, zFar) {

        var yscale = 1.0 / Math.tan(0.5 * fovy * Math.PI / 180);
        var xscale = yscale / aspect;

        if (zFar) {
          return new Matrix44$1(xscale, 0.0, 0.0, 0.0, 0.0, yscale, 0.0, 0.0, 0.0, 0.0, -(zFar + zNear) / (zFar - zNear), -(2.0 * zFar * zNear) / (zFar - zNear), 0.0, 0.0, -1.0, 0.0);
        } else {
          return new Matrix44$1(xscale, 0.0, 0.0, 0.0, 0.0, yscale, 0.0, 0.0, 0.0, 0.0, -1, 0, -2 * zNear, 0.0, 0.0, -1.0, 0.0);
        }

        this._yscale = yscale;
        this._xscale = xscale;
      }
    }]);
    return L_PerspectiveCamera;
  }(L_AbstractCamera);

  var L_FrustumCamera = function (_L_AbstractCamera) {
    babelHelpers.inherits(L_FrustumCamera, _L_AbstractCamera);

    function L_FrustumCamera(glBoostContext, toRegister, lookat, frustum) {
      babelHelpers.classCallCheck(this, L_FrustumCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_FrustumCamera.__proto__ || Object.getPrototypeOf(L_FrustumCamera)).call(this, glBoostContext, toRegister, lookat));

      _this._left = frustum.left;
      _this._right = frustum.right;
      _this._top = frustum.top;
      _this._bottom = frustum.bottom;
      _this._zNear = frustum.zNear;
      _this._zFar = frustum.zFar;

      _this._zNearInner = frustum.zNear;
      _this._zFarInner = frustum.zFar;

      _this._dirtyProjection = true;
      _this._updateCountAsCameraProjection = 0;
      return _this;
    }

    babelHelpers.createClass(L_FrustumCamera, [{
      key: '_needUpdateProjection',
      value: function _needUpdateProjection() {
        this._dirtyProjection = true;
        this._updateCountAsCameraProjection++;
      }
    }, {
      key: 'projectionRHMatrix',
      value: function projectionRHMatrix() {
        if (this._dirtyProjection) {
          this._projectionMatrix = L_FrustumCamera.frustumRHMatrix(this._leftInner, this._rightInner, this._topInner, this._bottomInner, this._zNearInner, this._zFarInner);
          this._dirtyProjection = false;
          return this._projectionMatrix.clone();
        } else {
          return this._projectionMatrix.clone();
        }
      }
    }, {
      key: 'updateCountAsCameraProjection',
      get: function get() {
        return this._updateCountAsCameraProjection;
      }
    }, {
      key: 'left',
      set: function set(value) {
        if (this._left === value) {
          return;
        }
        this._left = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._left;
      }
    }, {
      key: 'right',
      set: function set(value) {
        if (this._right === value) {
          return;
        }
        this._right = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._right;
      }
    }, {
      key: 'top',
      set: function set(value) {
        if (this._top === value) {
          return;
        }
        this._top = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._top;
      }
    }, {
      key: 'bottom',
      set: function set(value) {
        if (this._bottom === value) {
          return;
        }
        this._bottom = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._bottom;
      }
    }, {
      key: 'zNear',
      set: function set(value) {
        if (this._zNear === value) {
          return;
        }
        this._zNear = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zNear;
      }
    }, {
      key: 'zFar',
      set: function set(value) {
        if (this._zFar === value) {
          return;
        }
        this._zFar = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zFar;
      }
    }, {
      key: 'aspect',
      get: function get() {
        return (this.right - this.left) / (this.top - this.bottom);
      }
    }, {
      key: 'allInfo',
      get: function get() {
        var info = babelHelpers.get(L_FrustumCamera.prototype.__proto__ || Object.getPrototypeOf(L_FrustumCamera.prototype), 'allInfo', this);

        info.left = this.left;
        info.right = this.right;
        info.top = this.top;
        info.bottom = this.bottom;
        info.zFar = this.zFar;
        info.zFarInner = this.zFarInner;
        info.zNear = this.zNear;
        info.zNearInner = this.zNearInner;

        return info;
      },
      set: function set(info) {
        babelHelpers.set(L_FrustumCamera.prototype.__proto__ || Object.getPrototypeOf(L_FrustumCamera.prototype), 'allInfo', info, this);
      }
    }, {
      key: 'allInfoExceptInnerData',
      get: function get() {
        var info = babelHelpers.get(L_FrustumCamera.prototype.__proto__ || Object.getPrototypeOf(L_FrustumCamera.prototype), 'allInfoExceptInnerData', this);

        info.left = this.left;
        info.right = this.right;
        info.top = this.top;
        info.bottom = this.bottom;
        info.zFar = this.zFar;
        info.zNear = this.zNear;

        return info;
      }
    }, {
      key: 'allInfoAsInnerData',
      get: function get() {
        var info = babelHelpers.get(L_FrustumCamera.prototype.__proto__ || Object.getPrototypeOf(L_FrustumCamera.prototype), 'allInfoAsInnerData', this);

        info.left = this.left;
        info.right = this.right;
        info.top = this.top;
        info.bottom = this.bottom;
        info.zFar = this.zFarInner;
        info.zNear = this.zNearInner;

        return info;
      }
    }], [{
      key: 'frustumRHMatrix',
      value: function frustumRHMatrix(left, right, top, bottom, zNear, zFar) {
        return new Matrix44$1(2 * zNear / (right - left), 0.0, (right + left) / (right - left), 0.0, 0.0, 2 * zNear / (top - bottom), (top + bottom) / (top - bottom), 0.0, 0.0, 0.0, -(zFar + zNear) / (zFar - zNear), -1 * 2 * zFar * zNear / (zFar - zNear), 0.0, 0.0, -1.0, 0.0);
      }
    }]);
    return L_FrustumCamera;
  }(L_AbstractCamera);

  var L_OrthoCamera = function (_L_AbstractCamera) {
    babelHelpers.inherits(L_OrthoCamera, _L_AbstractCamera);

    function L_OrthoCamera(glBoostContext, toRegister, lookat, ortho) {
      babelHelpers.classCallCheck(this, L_OrthoCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_OrthoCamera.__proto__ || Object.getPrototypeOf(L_OrthoCamera)).call(this, glBoostContext, toRegister, lookat));

      _this._left = typeof ortho.left === "undefined" ? -1 : ortho.left;
      _this._right = typeof ortho.right === "undefined" ? 1 : ortho.right;
      _this._bottom = typeof ortho.bottom === "undefined" ? -1 : ortho.bottom;
      _this._top = typeof ortho.top === "undefined" ? 1 : ortho.top;
      _this._zNear = ortho.zNear;
      _this._zFar = ortho.zFar;
      _this._xmag = ortho.xmag;
      _this._ymag = ortho.ymag;

      _this._dirtyProjection = true;
      _this._updateCountAsCameraProjection = 0;
      return _this;
    }

    babelHelpers.createClass(L_OrthoCamera, [{
      key: '_needUpdateProjection',
      value: function _needUpdateProjection() {
        this._dirtyProjection = true;
        this._updateCountAsCameraProjection++;
      }
    }, {
      key: 'projectionRHMatrix',
      value: function projectionRHMatrix() {
        if (this._dirtyProjection) {
          this._projectionMatrix = L_OrthoCamera.orthoRHMatrix(this._left, this._right, this._bottom, this._top, this._zNear, this._zFar, this._xmag, this._ymag);
          this._dirtyProjection = false;
          return this._projectionMatrix.clone();
        } else {
          return this._projectionMatrix.clone();
        }
      }
    }, {
      key: 'updateCountAsCameraProjection',
      get: function get() {
        return this._updateCountAsCameraProjection;
      }
    }, {
      key: 'left',
      set: function set(value) {
        if (this._left === value) {
          return;
        }
        this._left = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._left;
      }
    }, {
      key: 'right',
      set: function set(value) {
        if (this._right === value) {
          return;
        }
        this._right = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._right;
      }
    }, {
      key: 'bottom',
      set: function set(value) {
        if (this._bottom === value) {
          return;
        }
        this._bottom = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._bottom;
      }
    }, {
      key: 'top',
      set: function set(value) {
        if (this._top === value) {
          return;
        }
        this._top = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._top;
      }
    }, {
      key: 'zNear',
      set: function set(value) {
        if (this._zNear === value) {
          return;
        }
        this._zNear = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zNear;
      }
    }, {
      key: 'zFar',
      set: function set(value) {
        if (this._zFar === value) {
          return;
        }
        this._zFar = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._zFar;
      }
    }, {
      key: 'xmag',
      set: function set(value) {
        if (this._xmag === value) {
          return;
        }
        this._xmag = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._xmag;
      }
    }, {
      key: 'ymag',
      set: function set(value) {
        if (this._ymag === value) {
          return;
        }
        this._ymag = value;
        this._needUpdateProjection();
      },
      get: function get() {
        return this._ymag;
      }
    }, {
      key: 'aspect',
      get: function get() {
        return (this.right - this.left) / (this.top - this.bottom);
      }
    }, {
      key: 'allInfo',
      get: function get() {
        var info = babelHelpers.get(L_OrthoCamera.prototype.__proto__ || Object.getPrototypeOf(L_OrthoCamera.prototype), 'allInfo', this);

        info.left = this.left;
        info.right = this.right;
        info.top = this.top;
        info.bottom = this.bottom;
        info.zFar = this.zFar;
        info.zFarInner = this.zFarInner;
        info.zNear = this.zNear;
        info.zNearInner = this.zNearInner;
        info.xmag = this.xmag;
        info.ymag = this.ymag;

        return info;
      },
      set: function set(info) {
        babelHelpers.set(L_OrthoCamera.prototype.__proto__ || Object.getPrototypeOf(L_OrthoCamera.prototype), 'allInfo', info, this);
      }
    }, {
      key: 'allInfoExceptInnerData',
      get: function get() {
        var info = babelHelpers.get(L_OrthoCamera.prototype.__proto__ || Object.getPrototypeOf(L_OrthoCamera.prototype), 'allInfoExceptInnerData', this);

        info.left = this.left;
        info.right = this.right;
        info.top = this.top;
        info.bottom = this.bottom;
        info.zFar = this.zFar;
        info.zNear = this.zNear;
        info.xmag = this.xmag;
        info.ymag = this.ymag;

        return info;
      }
    }, {
      key: 'allInfoAsInnerData',
      get: function get() {
        var info = babelHelpers.get(L_OrthoCamera.prototype.__proto__ || Object.getPrototypeOf(L_OrthoCamera.prototype), 'allInfoAsInnerData', this);

        info.left = this.left;
        info.right = this.right;
        info.top = this.top;
        info.bottom = this.bottom;
        info.zFar = this.zFarInner;
        info.zNear = this.zNearInner;
        info.xmag = this.xmag;
        info.ymag = this.ymag;

        return info;
      }
    }], [{
      key: 'orthoRHMatrix',
      value: function orthoRHMatrix(left, right, bottom, top, near, far, xmag, ymag) {

        if (xmag && ymag) {
          return new Matrix44$1(1 / xmag, 0.0, 0.0, 0, 0.0, 1 / ymag, 0.0, 0, 0.0, 0.0, -2 / (far - near), -(far + near) / (far - near), 0.0, 0.0, 0.0, 1.0);
        } else {
          return new Matrix44$1(2 / (right - left), 0.0, 0.0, -(right + left) / (right - left), 0.0, 2 / (top - bottom), 0.0, -(top + bottom) / (top - bottom), 0.0, 0.0, -2 / (far - near), -(far + near) / (far - near), 0.0, 0.0, 0.0, 1.0);
        }
      }
    }]);
    return L_OrthoCamera;
  }(L_AbstractCamera);

  var M_AbstractCamera = function (_M_Element) {
    babelHelpers.inherits(M_AbstractCamera, _M_Element);

    function M_AbstractCamera(glBoostContext, toRegister) {
      babelHelpers.classCallCheck(this, M_AbstractCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_AbstractCamera.__proto__ || Object.getPrototypeOf(M_AbstractCamera)).call(this, glBoostContext, toRegister));

      if (_this.constructor === M_AbstractCamera) {
        throw new TypeError('Cannot construct M_AbstractCamera instances directly.');
      }

      _this._lowLevelCamera = null;

      _this._updateCountAsCameraView = 0;

      _this._texture = null;return _this;
    }

    babelHelpers.createClass(M_AbstractCamera, [{
      key: '_needUpdateView',
      value: function _needUpdateView() {
        this._lowLevelCamera._needUpdateView();
        this._updateCountAsCameraView++;
      }
    }, {
      key: 'setAsMainCamera',
      value: function setAsMainCamera(scene) {
        this._lowLevelCamera.setAsMainCamera(scene);
      }
    }, {
      key: 'isMainCamera',
      value: function isMainCamera(scene) {
        return this._lowLevelCamera.isMainCamera(scene);
      }
    }, {
      key: 'lookAtRHMatrix',
      value: function lookAtRHMatrix() {
        return this._lowLevelCamera.lookAtRHMatrix();
      }
    }, {
      key: 'cameraController',
      set: function set(controller) {
        this._lowLevelCamera.cameraController = controller;
      },
      get: function get() {
        return this._lowLevelCamera.cameraController;
      }
    }, {
      key: 'updateCountAsCameraView',
      get: function get() {
        return this._updateCountAsCameraView;
      }
    }, {
      key: 'latestViewStateInfoString',
      get: function get() {
        var tempString = this._accumulateMyAndParentNameWithUpdateInfo(this);
        tempString += '_updateCountAsCameraView_' + this._updateCountAsCameraView;

        return tempString;
      }
    }, {
      key: 'texture',
      set: function set(texture) {
        this._texture = texture;
      },
      get: function get() {
        return this._texture;
      }
    }, {
      key: 'translate',
      set: function set(vec) {
        this._lowLevelCamera.translate = vec;
      },
      get: function get() {
        return this._lowLevelCamera.translate;
      }
    }, {
      key: 'translateInner',
      get: function get() {
        return this._lowLevelCamera.translateInner;
      }
    }, {
      key: 'eye',
      set: function set(vec) {
        this._lowLevelCamera.eye = vec;
      },
      get: function get() {
        return this._lowLevelCamera.eye;
      }
    }, {
      key: 'eyeInner',
      get: function get() {
        return this._lowLevelCamera.eyeInner;
      }
    }, {
      key: 'center',
      set: function set(vec) {
        this._lowLevelCamera.center = vec;
      },
      get: function get() {
        return this._lowLevelCamera.center;
      }
    }, {
      key: 'centerInner',
      get: function get() {
        return this._lowLevelCamera.centerInner;
      }
    }, {
      key: 'up',
      set: function set(vec) {
        this._lowLevelCamera.up = vec;
      },
      get: function get() {
        return this._lowLevelCamera.up;
      }
    }, {
      key: 'upInner',
      get: function get() {
        return this._lowLevelCamera.upInner;
      }
    }, {
      key: 'allInfo',
      get: function get() {
        return this._lowLevelCamera.allInfo;
      },
      set: function set(info) {
        this._lowLevelCamera.allInfo = info;
      }
    }, {
      key: 'allInfoExceptInnerData',
      get: function get() {
        return this._lowLevelCamera.allInfoExceptInnerData;
      }
    }, {
      key: 'allInfoAsInnerData',
      get: function get() {
        return this._lowLevelCamera.allInfoAsInnerData;
      }
    }]);
    return M_AbstractCamera;
  }(M_Element);


  GLBoost$1['M_AbstractCamera'] = M_AbstractCamera;

  var L_CameraController = function (_GLBoostObject) {
    babelHelpers.inherits(L_CameraController, _GLBoostObject);

    function L_CameraController(glBoostContext) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        isSymmetryMode: true,
        doResetWhenCameraSettingChanged: false,
        isForceGrab: false,
        efficiency: 1.0,
        eventTargetDom: document
      };
      babelHelpers.classCallCheck(this, L_CameraController);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_CameraController.__proto__ || Object.getPrototypeOf(L_CameraController)).call(this, glBoostContext));

      _this._camaras = new Set();

      _this._isKeyUp = true;
      _this._isForceGrab = options.isForceGrab !== void 0 ? options.isForceGrab : false;
      _this._isSymmetryMode = options.isSymmetryMode !== void 0 ? options.isSymmetryMode : true;

      _this._efficiency = options.efficiency !== void 0 ? 0.5 * options.efficiency : 1;
      var eventTargetDom = options.eventTargetDom;

      _this._rot_bgn_x = 0;
      _this._rot_bgn_y = 0;
      _this._rot_x = 0;
      _this._rot_y = 0;
      _this._clickedMouseYOnCanvas = 0;
      _this._clickedMouseXOnCanvas = 0;

      _this._verticalAngleOfVectors = 0;

      _this._verticalAngleThrethold = 90;

      _this._wheel_y = 1;
      _this._mouse_translate_y = 0;
      _this._mouse_translate_x = 0;

      _this._mouseTranslateVec = new Vector3(0, 0, 0);

      _this._newUpVec = new Vector3(0, 0, 0);

      _this._target = null;

      _this._lengthCenterToCorner = 10;
      _this._lengthOfCenterToEye = 10;
      _this._scaleOfTraslation = 5.0;
      _this._scaleOfLengthCameraToCenter = 1.0;
      _this._foyvBias = 1.0;
      _this._zFarAdjustingFactorBasedOnAABB = 2.0;

      _this._doResetWhenCameraSettingChanged = options.doResetWhenCameraSettingChanged !== void 0 ? options.doResetWhenCameraSettingChanged : false;

      _this._shiftCameraTo = null;

      _this._onMouseDown = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var rect = evt.target.getBoundingClientRect();
        var clientX = null;
        var clientY = null;
        if (evt.clientX) {
          clientX = evt.clientX;
          clientY = evt.clientY;
        } else {
          clientX = evt.touches[0].clientX;
          clientY = evt.touches[0].clientY;
        }
        _this._clickedMouseXOnCanvas = clientX - rect.left;
        _this._clickedMouseYOnCanvas = clientY - rect.top;
        _this._movedMouseYOnCanvas = -1;
        _this._movedMouseXOnCanvas = -1;
        _this._rot_bgn_x = _this._rot_x;
        _this._rot_bgn_y = _this._rot_y;

        _this._isKeyUp = false;

        if (typeof evt.buttons !== 'undefined') {
          _this.updateCamera();
        }
        return false;
      };

      _this._onMouseUp = function (evt) {
        _this._isKeyUp = true;
        _this._movedMouseYOnCanvas = -1;
        _this._movedMouseXOnCanvas = -1;
      };

      _this._onMouseMove = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (_this._isKeyUp) {
          return;
        }

        var rect = evt.target.getBoundingClientRect();
        var clientX = null;
        var clientY = null;
        if (evt.clientX) {
          clientX = evt.clientX;
          clientY = evt.clientY;
        } else {
          clientX = evt.touches[0].clientX;
          clientY = evt.touches[0].clientY;
        }
        _this._movedMouseXOnCanvas = clientX - rect.left;
        _this._movedMouseYOnCanvas = clientY - rect.top;

        if (typeof evt.buttons !== 'undefined') {
          var data = evt.buttons;
          var button_l = data & 0x0001 ? true : false;
          var button_c = data & 0x0004 ? true : false;
          if (button_c) {
            _this._mouse_translate_y = (_this._movedMouseYOnCanvas - _this._clickedMouseYOnCanvas) / 1000 * _this._efficiency;
            _this._mouse_translate_x = (_this._movedMouseXOnCanvas - _this._clickedMouseXOnCanvas) / 1000 * _this._efficiency;

            var scale = _this._lengthOfCenterToEye * _this._foyvBias * _this._scaleOfTraslation;
            if (evt.shiftKey) {
              _this._mouseTranslateVec = Vector3.add(_this._mouseTranslateVec, Vector3.normalize(_this._newEyeToCenterVec).multiply(-_this._mouse_translate_y).multiply(scale));
            } else {
              _this._mouseTranslateVec = Vector3.add(_this._mouseTranslateVec, Vector3.normalize(_this._newUpVec).multiply(_this._mouse_translate_y).multiply(scale));
            }
            _this._mouseTranslateVec = Vector3.add(_this._mouseTranslateVec, Vector3.normalize(_this._newTangentVec).multiply(_this._mouse_translate_x).multiply(scale));

            _this._clickedMouseYOnCanvas = _this._movedMouseYOnCanvas;
            _this._clickedMouseXOnCanvas = _this._movedMouseXOnCanvas;
          }

          _this.updateCamera();

          if (!button_l) {
            return;
          }
        }

        var delta_y = (_this._movedMouseYOnCanvas - _this._clickedMouseYOnCanvas) * _this._efficiency;
        var delta_x = (_this._movedMouseXOnCanvas - _this._clickedMouseXOnCanvas) * _this._efficiency;
        _this._rot_y = _this._rot_bgn_y - delta_y;
        _this._rot_x = _this._rot_bgn_x - delta_x;

        if (_this._verticalAngleThrethold - _this._verticalAngleOfVectors < _this._rot_y) ;

        if (_this._rot_y < -_this._verticalAngleThrethold + _this._verticalAngleOfVectors) ;

        _this.updateCamera();
      };

      _this._onMouseWheel = function (evt) {
        evt.preventDefault();

        _this.dolly += evt.deltaY / 600;
      };

      _this._onContexMenu = function (evt) {
        if (evt.preventDefault) {
          evt.preventDefault();
        } else {
          event.returnValue = false;
        }
      };

      _this._onMouseDblClick = function (evt) {
        if (evt.shiftKey) {
          _this._mouseTranslateVec = new Vector3(0, 0, 0);
        } else if (evt.ctrlKey) {
          _this._rot_y = 0;
          _this._rot_x = 0;
          _this._rot_bgn_y = 0;
          _this._rot_bgn_x = 0;
        }

        _this.updateCamera();
      };

      _this.registerEventListeners(eventTargetDom);
      return _this;
    }

    babelHelpers.createClass(L_CameraController, [{
      key: 'registerEventListeners',
      value: function registerEventListeners() {
        var eventTargetDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

        if (eventTargetDom) {
          if ('ontouchend' in document) {
            eventTargetDom.addEventListener('touchstart', this._onMouseDown);
            eventTargetDom.addEventListener('touchend', this._onMouseUp);
            eventTargetDom.addEventListener('touchmove', this._onMouseMove);
          }
          if ('onmouseup' in document) {
            eventTargetDom.addEventListener('mousedown', this._onMouseDown);
            eventTargetDom.addEventListener('mouseup', this._onMouseUp);
            eventTargetDom.addEventListener('mousemove', this._onMouseMove);
          }
          if (window.WheelEvent) {
            eventTargetDom.addEventListener("wheel", this._onMouseWheel);
          }
          eventTargetDom.addEventListener('contextmenu', this._onContexMenu, false);
          eventTargetDom.addEventListener("dblclick", this._onMouseDblClick);
        }
      }
    }, {
      key: 'unregisterEventListeners',
      value: function unregisterEventListeners() {
        var eventTargetDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

        if (eventTargetDom) {
          if ('ontouchend' in document) {
            eventTargetDom.removeEventListener('touchstart', this._onMouseDown);
            eventTargetDom.removeEventListener('touchend', this._onMouseUp);
            eventTargetDom.removeEventListener('touchmove', this._onMouseMove);
          }
          if ('onmouseup' in document) {
            eventTargetDom.removeEventListener('mousedown', this._onMouseDown);
            eventTargetDom.removeEventListener('mouseup', this._onMouseUp);
            eventTargetDom.removeEventListener('mousemove', this._onMouseMove);
          }
          if (window.WheelEvent) {
            eventTargetDom.removeEventListener("wheel", this._onMouseWheel);
          }
          eventTargetDom.removeEventListener('contextmenu', this._onContexMenu, false);
          eventTargetDom.removeEventListener("dblclick", this._onMouseDblClick);
        }
      }
    }, {
      key: '_getFovyFromCamera',
      value: function _getFovyFromCamera(camera) {
        if (camera.fovy) {
          return camera.fovy;
        } else {
          return MathUtil.radianToDegree(2 * Math.atan(Math.abs(camera.top - camera.bottom) / (2 * camera.zNear)));
        }
      }
    }, {
      key: 'convert',
      value: function convert(camera) {
        var newEyeVec = null;
        var newCenterVec = null;
        var newUpVec = null;

        if (this._isKeyUp || !this._isForceGrab) {
          this._eyeVec = this._shiftCameraTo !== null ? Vector3.add(Vector3.subtract(this._shiftCameraTo, camera.center), camera.eye) : camera.eye;
          this._centerVec = this._shiftCameraTo !== null ? this._shiftCameraTo : camera.center;
          this._upVec = camera.up;
        }

        var fovy = this._getFovyFromCamera(camera);

        if (this._isSymmetryMode) {
          var centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec).multiply(this._wheel_y * 1.0 / Math.tan(MathUtil.degreeToRadian(fovy / 2.0)));
          this._lengthOfCenterToEye = centerToEyeVec.length();
          var horizontalAngleOfVectors = Vector3.angleOfVectors(new Vector3(centerToEyeVec.x, 0, centerToEyeVec.z), new Vector3(0, 0, 1));
          var horizontalSign = Vector3.cross(new Vector3(centerToEyeVec.x, 0, centerToEyeVec.z), new Vector3(0, 0, 1)).y;
          if (horizontalSign >= 0) {
            horizontalSign = 1;
          } else {
            horizontalSign = -1;
          }
          horizontalAngleOfVectors *= horizontalSign;
          var rotateM_Reset = Matrix33.rotateY(horizontalAngleOfVectors);
          var rotateM_X = Matrix33.rotateX(this._rot_y);
          var rotateM_Y = Matrix33.rotateY(this._rot_x);
          var rotateM_Revert = Matrix33.rotateY(-horizontalAngleOfVectors);
          var rotateM = Matrix33.multiply(rotateM_Revert, Matrix33.multiply(rotateM_Y, Matrix33.multiply(rotateM_X, rotateM_Reset)));

          newUpVec = rotateM.multiplyVector(this._upVec);
          this._newUpVec = newUpVec;
          newEyeVec = rotateM.multiplyVector(centerToEyeVec).add(this._centerVec);
          newCenterVec = this._centerVec.clone();
          this._newEyeToCenterVec = Vector3.subtract(newCenterVec, newEyeVec);
          this._newTangentVec = Vector3.cross(this._newUpVec, this._newEyeToCenterVec);

          newEyeVec.add(this._mouseTranslateVec);
          newCenterVec.add(this._mouseTranslateVec);

          var horizonResetVec = rotateM_Reset.multiplyVector(centerToEyeVec);
          this._verticalAngleOfVectors = Vector3.angleOfVectors(horizonResetVec, new Vector3(0, 0, 1));
          var verticalSign = Vector3.cross(horizonResetVec, new Vector3(0, 0, 1)).x;
          if (verticalSign >= 0) {
            verticalSign = 1;
          } else {
            verticalSign = -1;
          }
        } else {
          var _centerToEyeVec = Vector3.subtract(this._eyeVec, this._centerVec).multiply(this._wheel_y * 1.0 / Math.tan(MathUtil.degreeToRadian(fovy / 2.0)));
          var _rotateM_X = Matrix33.rotateX(this._rot_y);
          var _rotateM_Y = Matrix33.rotateY(this._rot_x);
          var _rotateM = _rotateM_Y.multiply(_rotateM_X);

          newUpVec = _rotateM.multiplyVector(this._upVec);
          this._newUpVec = newUpVec;
          newEyeVec = _rotateM.multiplyVector(_centerToEyeVec).add(this._centerVec);
          newCenterVec = this._centerVec.clone();
          this._newEyeToCenterVec = Vector3.subtract(newCenterVec, newEyeVec);
          this._newTangentVec = Vector3.cross(this._newUpVec, this._newEyeToCenterVec);

          newEyeVec.add(this._mouseTranslateVec);
          newCenterVec.add(this._mouseTranslateVec);
        }
        var newCenterToEyeLength = Vector3.lengthBtw(newEyeVec, newCenterVec);

        var newLeft = camera.left;
        var newRight = camera.right;
        var newTop = camera.top;
        var newBottom = camera.bottom;
        var newZNear = camera.zNear;
        var newZFar = camera.zFar;
        var ratio = 1;
        if (typeof newLeft !== 'undefined') {
          if (typeof this._lengthCenterToCorner !== 'undefined') {
            ratio = camera.zNear / Math.abs(newCenterToEyeLength - this._lengthCenterToCorner);

            var minRatio = 0.001;
            if (ratio < minRatio) {
              ratio = minRatio;
            }

            var scale = 1 / ratio;
            newLeft *= scale;
            newRight *= scale;
            newTop *= scale;
            newBottom *= scale;
            newZFar *= scale;
            newZNear *= scale;
          }
        }

        if (this._target) {
          newZFar = camera.zNear + Vector3.subtract(newCenterVec, newEyeVec).length();
          newZFar += this._getTargetAABB().lengthCenterToCorner * this._zFarAdjustingFactorBasedOnAABB;
        }

        this._foyvBias = Math.tan(MathUtil.degreeToRadian(fovy / 2.0));

        return [newEyeVec, newCenterVec, newUpVec, newZNear, newZFar, newLeft, newRight, newTop, newBottom];
      }
    }, {
      key: '_getTargetAABB',
      value: function _getTargetAABB() {
        var targetAABB = null;
        if (typeof this._target.updateAABB !== 'undefined') {
          targetAABB = this._target.updateAABB();
        } else {
          targetAABB = this._target.AABB;
        }
        return targetAABB;
      }
    }, {
      key: '_updateTargeting',
      value: function _updateTargeting(camera, eyeVec, centerVec, upVec, fovy) {
        if (this._target === null) {
          return [eyeVec, centerVec, upVec];
        }

        var targetAABB = this._getTargetAABB();

        var cameraZNearPlaneHeight = camera.top - camera.bottom;
        this._lengthCenterToCorner = targetAABB.lengthCenterToCorner;
        this._lengthCameraToObject = targetAABB.lengthCenterToCorner / Math.sin(fovy * Math.PI / 180 / 2) * this._scaleOfLengthCameraToCenter;


        var newCenterVec = targetAABB.centerPoint;

        var centerToCameraVec = Vector3.subtract(eyeVec, centerVec);
        var centerToCameraVecNormalized = Vector3.normalize(centerToCameraVec);

        var newEyeVec = Vector3.multiply(centerToCameraVecNormalized, this._lengthCameraToObject).add(newCenterVec);

        var newUpVec = null;
        if (camera instanceof M_AbstractCamera) {
          var mat = camera.inverseWorldMatrixWithoutMySelf;
          newEyeVec = new Vector3(mat.multiplyVector(new Vector4$1(newEyeVec.x, newEyeVec.y, newEyeVec.z, 1)));
          newCenterVec = new Vector3(mat.multiplyVector(new Vector4$1(newCenterVec.x, newCenterVec.y, newCenterVec.z, 1)));
          newUpVec = new Vector3(mat.multiplyVector(new Vector4$1(upVec.x, upVec.y, upVec.z, 1)));
        } else {
          newUpVec = upVec;
        }

        return [newEyeVec, newCenterVec, newUpVec];
      }
    }, {
      key: 'tryReset',
      value: function tryReset() {
        if (this._doResetWhenCameraSettingChanged) {
          if (this._isKeyUp) {
            this._rot_y = 0;
            this._rot_x = 0;
            this._rot_bgn_y = 0;
            this._rot_bgn_x = 0;
          }
        }
      }
    }, {
      key: 'reset',
      value: function reset() {
        this._rot_y = 0;
        this._rot_x = 0;
        this._rot_bgn_y = 0;
        this._rot_bgn_x = 0;
        this._wheel_y = 1;
        this._mouseTranslateVec = new Vector3(0, 0, 0);

        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
        });
      }
    }, {
      key: 'updateTargeting',
      value: function updateTargeting() {
        var _this2 = this;

        this._camaras.forEach(function (camera) {
          var vectors = _this2._updateTargeting(camera, camera.eye, camera.center, camera.up, _this2._getFovyFromCamera(camera));
          camera.eye = vectors[0];
          camera.center = vectors[1];
          camera.up = vectors[2];
        });
      }
    }, {
      key: 'updateCamera',
      value: function updateCamera() {
        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
          camera._needUpdateProjection();
        });
      }
    }, {
      key: 'addCamera',
      value: function addCamera(camera) {
        this._camaras.add(camera);
      }
    }, {
      key: 'resetDolly',
      value: function resetDolly() {
        this.dolly = 1;

        this.updateCamera();
      }
    }, {
      key: 'target',
      set: function set(object) {
        this._target = object;
        this.updateTargeting();
      },
      get: function get() {
        return this._target;
      }
    }, {
      key: 'zFarAdjustingFactorBasedOnAABB',
      set: function set(value) {
        this._zFarAdjustingFactorBasedOnAABB = value;
      },
      get: function get() {
        return this._zFarAdjustingFactorBasedOnAABB;
      }
    }, {
      key: 'shiftCameraTo',
      set: function set(value) {
        this._shiftCameraTo = value;
      },
      get: function get() {
        return this._shiftCameraTo;
      }
    }, {
      key: 'dolly',
      set: function set(value) {
        this._wheel_y = value;
        this._wheel_y = Math.min(this._wheel_y, 3);
        this._wheel_y = Math.max(this._wheel_y, 0.01);

        this.updateCamera();
      },
      get: function get() {
        return this._wheel_y;
      }
    }, {
      key: 'rotX',
      get: function get() {
        return this._rot_x;
      },
      set: function set(value) {
        this._rot_x = value;
        this._rot_bgn_x = 0;
        this._camaras.forEach(function (camera) {
          camera._needUpdateView(true);
          camera._needUpdateProjection();
        });
      }
    }, {
      key: 'rotY',
      get: function get() {
        return this._rot_y;
      },
      set: function set(value) {
        this._rot_y = value;
        this._rot_bgn_y = 0;
        this._camaras.forEach(function (camera) {
          camera._needUpdateView(true);
          camera._needUpdateProjection();
        });
      }
    }, {
      key: 'allInfo',
      get: function get() {
        var info = {};

        info.rotY = this.rotY;
        info.rotX = this.rotX;
        info.dolly = this.dolly;
        info.shiftCameraTo = this.shiftCameraTo;
        info.zFarAdjustingFactorBasedOnAABB = this.zFarAdjustingFactorBasedOnAABB;
        info.target = this.target;

        return info;
      },
      set: function set(arg) {
        var json = arg;
        if (typeof arg === "string") {
          json = JSON.parse(arg);
        }
        for (var key in json) {
          if (json.hasOwnProperty(key) && key in this) {
            if (key === "quaternion") {
              this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToQuaternion(json[key]));
            } else {
              this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToVectorOrMatrix(json[key]));
            }
          }
        }
      }
    }]);
    return L_CameraController;
  }(GLBoostObject);


  GLBoost$1['L_CameraController'] = L_CameraController;

  var L_WalkThroughCameraController = function (_GLBoostObject) {
    babelHelpers.inherits(L_WalkThroughCameraController, _GLBoostObject);

    function L_WalkThroughCameraController(glBoostContext) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        eventTargetDom: document,
        horizontalSpeed: 1,
        turnSpeed: 5,
        mouseWheelSpeedScale: 0.3,
        inverseVirticalRotating: false,
        inverseHorizontalRotating: false
      };
      babelHelpers.classCallCheck(this, L_WalkThroughCameraController);

      var _this = babelHelpers.possibleConstructorReturn(this, (L_WalkThroughCameraController.__proto__ || Object.getPrototypeOf(L_WalkThroughCameraController)).call(this, glBoostContext));

      _this._camaras = new Set();

      _this._horizontalSpeed = options.horizontalSpeed;
      _this._virticalSpeed = options.virticalSpeed;
      _this._turnSpeed = options.turnSpeed;
      _this._mouseWheelSpeedScale = options.mouseWheelSpeedScale;
      _this._inverseVirticalRotating = options.inverseVirticalRotating;
      _this._inverseHorizontalRotating = options.inverseHorizontalRotating;

      _this.reset();

      _this._onKeydown = function (e) {
        _this._isKeyDown = true;
        _this._lastKeyCode = e.keyCode;

        _this.updateCamera();
      };

      _this._onKeyup = function (e) {
        _this._isKeyDown = false;
        _this._lastKeyCode = null;
      };

      var eventTargetDom = options.eventTargetDom;

      _this.registerEventListeners(eventTargetDom);
      return _this;
    }

    babelHelpers.createClass(L_WalkThroughCameraController, [{
      key: 'updateCamera',
      value: function updateCamera() {
        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
          camera._needUpdateProjection();
        });
      }
    }, {
      key: 'registerEventListeners',
      value: function registerEventListeners() {
        var eventTargetDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

        if (eventTargetDom) {
          document.addEventListener('keydown', this._onKeydown);
          document.addEventListener('keyup', this._onKeyup);

          if ('ontouchend' in document) {
            eventTargetDom.addEventListener('touchstart', this._mouseDown.bind(this));
            eventTargetDom.addEventListener('touchend', this._mouseUp.bind(this));
            eventTargetDom.addEventListener('touchmove', this._mouseMove.bind(this));
          }
          if ('onmouseup' in document) {
            eventTargetDom.addEventListener('mousedown', this._mouseDown.bind(this));
            eventTargetDom.addEventListener('mouseup', this._mouseUp.bind(this));
            eventTargetDom.addEventListener('mousemove', this._mouseMove.bind(this));
          }
          if ('onmousewheel' in document) {
            document.addEventListener('mousewheel', this._mouseWheel.bind(this));
          }
        }
      }
    }, {
      key: 'unregisterEventListeners',
      value: function unregisterEventListeners() {
        var eventTargetDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

        if (eventTargetDom) {
          document.removeEventListener('keydown', this._onKeydown);
          document.removeEventListener('keyup', this._onKeyup);

          if ('ontouchend' in document) {
            eventTargetDom.removeEventListener('touchstart', this._mouseDown.bind(this));
            eventTargetDom.removeEventListener('touchend', this._mouseUp.bind(this));
            eventTargetDom.removeEventListener('touchmove', this._mouseMove).bind(this);
          }
          if ('onmouseup' in document) {
            eventTargetDom.removeEventListener('mousedown', this._mouseDown.bind(this));
            eventTargetDom.removeEventListener('mouseup', this._mouseUp.bind(this));
            eventTargetDom.removeEventListener('mousemove', this._mouseMove.bind(this));
          }
          if ('onmousewheel' in document) {
            document.removeEventListener('mousewheel', this._mouseWheel.bind(this));
          }
        }
      }
    }, {
      key: '_mouseWheel',
      value: function _mouseWheel(e) {
        var delta = e.wheelDelta * this._mouseWheelSpeedScale;
        var horizontalDir = new Vector3(this._currentDir.x, 0, this._currentDir.z).normalize();
        this._currentPos.add(Vector3.multiply(horizontalDir, delta));
        this._currentCenter.add(Vector3.multiply(horizontalDir, delta));
      }
    }, {
      key: '_mouseDown',
      value: function _mouseDown(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._isMouseDown = true;

        var rect = evt.target.getBoundingClientRect();
        this._clickedMouseXOnCanvas = evt.clientX - rect.left;
        this._clickedMouseYOnCanvas = evt.clientY - rect.top;

        return false;
      }
    }, {
      key: '_mouseMove',
      value: function _mouseMove(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this._isMouseDown) {
          return;
        }

        var rect = evt.target.getBoundingClientRect();
        this._draggedMouseXOnCanvas = evt.clientX - rect.left;
        this._draggedMouseYOnCanvas = evt.clientY - rect.top;

        this._deltaMouseXOnCanvas = this._draggedMouseXOnCanvas - this._clickedMouseXOnCanvas;
        this._deltaMouseYOnCanvas = this._draggedMouseYOnCanvas - this._clickedMouseYOnCanvas;

        this._isMouseDrag = true;
        this.updateCamera();
      }
    }, {
      key: '_mouseUp',
      value: function _mouseUp(evt) {
        this._isMouseDown = false;
        this._isMouseDrag = false;

        var rect = evt.target.getBoundingClientRect();
        this._clickedMouseXOnCanvas = evt.clientX - rect.left;
        this._clickedMouseYOnCanvas = evt.clientY - rect.top;
      }
    }, {
      key: 'tryReset',
      value: function tryReset() {}
    }, {
      key: 'reset',
      value: function reset() {
        this._isKeyDown = false;
        this._lastKeyCode = null;
        this._currentPos = null;
        this._currentCenter = null;
        this._currentDir = null;
        this._isMouseDown = false;
        this._isMouseDrag = false;
        this._draggedMouseXOnCanvas = null;
        this._draggedMouseYOnCanvas = null;
        this._deltaMouseXOnCanvas = null;
        this._deltaMouseYOnCanvas = null;
        this._mouseXAdjustScale = 0.1;
        this._mouseYAdjustScale = 0.1;
        this._deltaY = 0;
        this._deltaX = 0;
        this._newDir = Vector3.zero();

        this._camaras.forEach(function (camera) {
          camera._needUpdateView(false);
        });
      }
    }, {
      key: 'addCamera',
      value: function addCamera(camera) {
        this._camaras.add(camera);
      }
    }, {
      key: 'convert',
      value: function convert(camera) {
        if (this._currentPos === null) {
          this._currentPos = camera.eye.clone();
        }
        if (this._currentCenter === null) {
          this._currentCenter = camera.center.clone();
        }
        if (this._currentDir === null) {
          this._currentDir = Vector3.subtract(camera.center, camera.eye).normalize();
        }

        var newEyeToCenter = null;

        var t = this._deltaY / 90;
        this._newDir.x = this._currentDir.x * (1 - t);
        this._newDir.y = t;
        this._newDir.z = this._currentDir.z * (1 - t);
        this._newDir.normalize();

        switch (this._lastKeyCode) {
          case 87:
          case 38:
            {
              var horizontalDir = new Vector3(this._currentDir.x, 0, this._currentDir.z).normalize();
              this._currentPos.add(Vector3.multiply(horizontalDir, this._horizontalSpeed));
              this._currentCenter.add(Vector3.multiply(horizontalDir, this._horizontalSpeed));
            }
            break;
          case 65:
          case 37:
            {
              var _horizontalDir = new Vector3(this._currentDir.x, 0, this._currentDir.z).normalize();
              var leftDir = Matrix33.rotateY(90).multiplyVector(_horizontalDir);
              this._currentPos.add(Vector3.multiply(leftDir, this._horizontalSpeed));
              this._currentCenter.add(Vector3.multiply(leftDir, this._horizontalSpeed));
            }
            break;
          case 83:
          case 40:
            {
              var _horizontalDir2 = new Vector3(this._currentDir.x, 0, this._currentDir.z).normalize();
              this._currentPos.add(Vector3.multiply(_horizontalDir2, -this._horizontalSpeed));
              this._currentCenter.add(Vector3.multiply(_horizontalDir2, -this._horizontalSpeed));
            }
            break;
          case 68:
          case 39:
            {
              var _horizontalDir3 = new Vector3(this._currentDir.x, 0, this._currentDir.z).normalize();
              var rightDir = Matrix33.rotateY(-90).multiplyVector(_horizontalDir3);
              this._currentPos.add(Vector3.multiply(rightDir, this._horizontalSpeed));
              this._currentCenter.add(Vector3.multiply(rightDir, this._horizontalSpeed));
            }
            break;
          case 81:
            {
              this._currentPos.add(Vector3.multiply(this._newDir, -this._horizontalSpeed));
              this._currentCenter.add(Vector3.multiply(this._newDir, -this._horizontalSpeed));
            }
            break;
          case 69:
            {
              this._currentPos.add(Vector3.multiply(this._newDir, this._horizontalSpeed));
              this._currentCenter.add(Vector3.multiply(this._newDir, this._horizontalSpeed));
            }
            break;
          case 82:
            this._currentPos.add(new Vector3(0, this._virticalSpeed, 0));
            this._currentCenter.add(new Vector3(0, this._virticalSpeed, 0));
            break;
          case 70:
            this._currentPos.add(new Vector3(0, -this._virticalSpeed, 0));
            this._currentCenter.add(new Vector3(0, -this._virticalSpeed, 0));
            break;
        }

        if (this._isMouseDrag) {

          if (this._inverseHorizontalRotating) {
            this._deltaX = this._deltaMouseXOnCanvas * this._mouseXAdjustScale;
          } else {
            this._deltaX = -this._deltaMouseXOnCanvas * this._mouseXAdjustScale;
          }
          if (this._inverseVirticalRotating) {
            this._deltaY += this._deltaMouseYOnCanvas * this._mouseYAdjustScale;
          } else {
            this._deltaY += -this._deltaMouseYOnCanvas * this._mouseYAdjustScale;
          }
          this._deltaY = Math.max(-120, Math.min(50, this._deltaY));

          this._currentDir = Matrix33.rotateY(this._deltaX).multiplyVector(this._currentDir);

          newEyeToCenter = Matrix33.rotateY(this._deltaX).multiplyVector(Vector3.subtract(this._currentCenter, this._currentPos));
          newEyeToCenter.x = newEyeToCenter.x * (1 - t);
          newEyeToCenter.y = t;
          newEyeToCenter.z = newEyeToCenter.z * (1 - t);
          newEyeToCenter.normalize();
          this._currentCenter = Vector3.add(this._currentPos, newEyeToCenter);

          this._clickedMouseXOnCanvas = this._draggedMouseXOnCanvas;
          this._clickedMouseYOnCanvas = this._draggedMouseYOnCanvas;
          this._deltaMouseXOnCanvas = 0;
          this._deltaMouseYOnCanvas = 0;
        }

        var newLeft = camera.left;
        var newRight = camera.right;
        var newTop = camera.top;
        var newBottom = camera.bottom;

        return [this._currentPos, this._currentCenter, camera.up.clone(), camera.zNear, camera.zFar, newLeft, newRight, newTop, newBottom];
      }
    }, {
      key: 'getDirection',
      value: function getDirection() {
        return this._currentCenter !== null ? this._newDir.clone() : null;
      }
    }, {
      key: 'horizontalSpeed',
      set: function set(value) {
        this._horizontalSpeed = value;
      },
      get: function get() {
        return this._horizontalSpeed;
      }
    }, {
      key: 'virticalSpeed',
      set: function set(value) {
        this._virticalSpeed = value;
      },
      get: function get() {
        return this._virticalSpeed;
      }
    }, {
      key: 'allInfo',
      get: function get() {
        var info = {};

        info.virticalSpeed = this.virticalSpeed;
        info.horizontalSpeed = this.horizontalSpeed;
        info._turnSpeed = this._turnSpeed;
        info.shiftCameraTo = this.shiftCameraTo;
        info.zFarAdjustingFactorBasedOnAABB = this.zFarAdjustingFactorBasedOnAABB;
        info.target = this.target;
        if (this._currentPos) {
          info._currentPos = this._currentPos.clone();
        }
        if (this._currentCenter) {
          info._currentCenter = this._currentCenter.clone();
        }
        if (this._currentDir) {
          info._currentDir = this._currentDir.clone();
        }
        info._deltaY = this._deltaY;
        info._newDir = this._newDir.clone();

        return info;
      },
      set: function set(arg) {
        var json = arg;
        if (typeof arg === "string") {
          json = JSON.parse(arg);
        }
        for (var key in json) {
          if (json.hasOwnProperty(key) && key in this) {
            if (key === "quaternion") {
              this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToQuaternion(json[key]));
            } else {
              this[key] = MathClassUtil.cloneOfMathObjects(MathClassUtil.arrayToVectorOrMatrix(json[key]));
            }
          }
        }
      }
    }]);
    return L_WalkThroughCameraController;
  }(GLBoostObject);


  GLBoost$1['L_WalkThroughCameraController'] = L_WalkThroughCameraController;

  var MutableTexture = function (_AbstractTexture) {
    babelHelpers.inherits(MutableTexture, _AbstractTexture);

    function MutableTexture(glBoostContext, width, height) {
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var internalFormat = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0x1908;
      var format = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0x1908;
      var type = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0x1401;
      var magFileter = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0x2601;
      var minFilter = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0x2601;
      var wrapS = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0x812F;
      var wrapT = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0x812F;
      babelHelpers.classCallCheck(this, MutableTexture);

      var _this = babelHelpers.possibleConstructorReturn(this, (MutableTexture.__proto__ || Object.getPrototypeOf(MutableTexture)).call(this, glBoostContext));

      _this._isTextureReady = false;
      _this._texture = null;
      _this._width = width;
      _this._height = height;
      _this._fbo = null;
      _this._colorAttachmentId = null;
      _this._depthAttachmentId = null;

      var gl = _this._glContext.gl;

      _this._texture = _this._glContext.createTexture(_this);
      gl.bindTexture(gl.TEXTURE_2D, _this._texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFileter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
      if (GLBoost$1.isThisGLVersion_2(gl) && (internalFormat === 6402 || internalFormat === 33189 || internalFormat === 33190 || internalFormat === 33191)) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LESS);
      }
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, 0, format, type, null);
      gl.bindTexture(gl.TEXTURE_2D, null);

      return _this;
    }

    babelHelpers.createClass(MutableTexture, [{
      key: 'colorAttachment',
      set: function set(colorAttachmentId) {
        this._colorAttachmentId = colorAttachmentId;
      },
      get: function get() {
        return this._colorAttachmentId;
      }
    }, {
      key: 'depthAttachment',
      set: function set(depthAttachmentId) {
        this._depthAttachmentId = depthAttachmentId;
      },
      get: function get() {
        return this._depthAttachmentId;
      }
    }, {
      key: 'frameBufferObject',
      set: function set(fbo) {
        this._fbo = fbo;
      },
      get: function get() {
        return this._fbo;
      }
    }]);
    return MutableTexture;
  }(AbstractTexture);

  var DataUtil = function () {
    function DataUtil() {
      babelHelpers.classCallCheck(this, DataUtil);
    }

    babelHelpers.createClass(DataUtil, null, [{
      key: "isNode",
      value: function isNode() {
        var isNode = window === void 0 && typeof process !== "undefined" && typeof require !== "undefined";
        return isNode;
      }
    }, {
      key: "btoa",
      value: function (_btoa) {
        function btoa(_x) {
          return _btoa.apply(this, arguments);
        }

        btoa.toString = function () {
          return _btoa.toString();
        };

        return btoa;
      }(function (str) {
        var isNode = DataUtil.isNode();
        if (isNode) {
          var buffer = void 0;
          if (Buffer.isBuffer(str)) {
            buffer = str;
          } else {
            buffer = new Buffer(str.toString(), 'binary');
          }
          return buffer.toString('base64');
        } else {
          return btoa(str);
        }
      })
    }, {
      key: "atob",
      value: function (_atob) {
        function atob(_x2) {
          return _atob.apply(this, arguments);
        }

        atob.toString = function () {
          return _atob.toString();
        };

        return atob;
      }(function (str) {
        var isNode = DataUtil.isNode();
        if (isNode) {
          return new Buffer(str, 'base64').toString('binary');
        } else {
          return atob(str);
        }
      })
    }, {
      key: "base64ToArrayBuffer",
      value: function base64ToArrayBuffer(dataUri) {
        var splittedDataUri = dataUri.split(',');
        var type = splittedDataUri[0].split(':')[1].split(';')[0];
        var byteString = DataUtil.atob(splittedDataUri[1]);
        var byteStringLength = byteString.length;
        var arrayBuffer = new ArrayBuffer(byteStringLength);
        var uint8Array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteStringLength; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        return arrayBuffer;
      }
    }, {
      key: "arrayBufferToString",
      value: function arrayBufferToString(arrayBuffer) {
        if (typeof TextDecoder !== 'undefined') {
          var textDecoder = new TextDecoder();
          return textDecoder.decode(arrayBuffer);
        } else {
          var bytes = new Uint8Array(arrayBuffer);
          var result = "";
          var length = bytes.length;
          for (var i = 0; i < length; i++) {
            result += String.fromCharCode(bytes[i]);
          }
          return result;
        }
      }
    }, {
      key: "stringToBase64",
      value: function stringToBase64(str) {
        var b64 = null;
        b64 = DataUtil.btoa(str);
        return b64;
      }
    }, {
      key: "UInt8ArrayToDataURL",
      value: function UInt8ArrayToDataURL(uint8array, width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        var imageData = ctx.createImageData(width, height);

        for (var i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i + 0] = uint8array[(height - Math.floor(i / (4 * width))) * (4 * width) + i % (4 * width) + 0];
          imageData.data[i + 1] = uint8array[(height - Math.floor(i / (4 * width))) * (4 * width) + i % (4 * width) + 1];
          imageData.data[i + 2] = uint8array[(height - Math.floor(i / (4 * width))) * (4 * width) + i % (4 * width) + 2];
          imageData.data[i + 3] = uint8array[(height - Math.floor(i / (4 * width))) * (4 * width) + i % (4 * width) + 3];
        }

        ctx.putImageData(imageData, 0, 0);
        canvas.remove();
        return canvas.toDataURL("image/png");
      }
    }, {
      key: "loadResourceAsync",
      value: function loadResourceAsync(resourceUri, isBinary, resolveCallback, rejectCallback) {
        return new Promise(function (resolve, reject) {
          var isNode = DataUtil.isNode();

          if (isNode) {
            var fs = require('fs');
            var args = [resourceUri];
            var func = function func(err, response) {
              if (err) {
                if (rejectCallback) {
                  rejectCallback(reject, err);
                }
                return;
              }
              if (isBinary) {
                var buffer = new Buffer(response, 'binary');
                var uint8Buffer = new Uint8Array(buffer);
                response = uint8Buffer.buffer;
              }
              resolveCallback(resolve, response);
            };

            if (isBinary) {
              args.push(func);
            } else {
              args.push('utf8');
              args.push(func);
            }
            fs.readFile.apply(fs, args);
          } else {
            var xmlHttp = new XMLHttpRequest();
            if (isBinary) {
              xmlHttp.responseType = "arraybuffer";
              xmlHttp.onload = function (oEvent) {
                var response = null;
                if (isBinary) {
                  response = xmlHttp.response;
                } else {
                  response = xmlHttp.responseText;
                }
                resolveCallback(resolve, response);
              };
            } else {
              xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && (Math.floor(xmlHttp.status / 100) === 2 || xmlHttp.status === 0)) {
                  var response = null;
                  if (isBinary) {
                    response = xmlHttp.response;
                  } else {
                    response = xmlHttp.responseText;
                  }
                  resolveCallback(resolve, response);
                } else {
                  if (rejectCallback) {
                    rejectCallback(reject, xmlHttp.status);
                  }
                }
              };
            }

            xmlHttp.open("GET", resourceUri, true);
            xmlHttp.send(null);
          }
        });
      }
    }]);
    return DataUtil;
  }();


  GLBoost$1['DataUtil'] = DataUtil;

  var Texture = function (_AbstractTexture) {
    babelHelpers.inherits(Texture, _AbstractTexture);

    function Texture(glBoostContext, src, userFlavorName) {
      var parameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      babelHelpers.classCallCheck(this, Texture);

      var _this = babelHelpers.possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this, glBoostContext));

      _this._isTextureReady = false;
      _this._texture = null;
      if (typeof userFlavorName === 'undefined' || userFlavorName === null) {
        _this.userFlavorName = _this._instanceName;
      } else {
        _this.userFlavorName = userFlavorName;
      }

      _this._parameters = parameters ? parameters : {};

      if (typeof src === 'undefined' || src === null) ; else if (typeof src === 'string') {
        _this.generateTextureFromUri(src);
      } else if (src instanceof Image) {
        _this.generateTextureFromImage(src);
      } else {
        _this._generateTextureFromImageData(src);
      }
      return _this;
    }

    babelHelpers.createClass(Texture, [{
      key: '_getParameter',
      value: function _getParameter(paramNumber) {
        var isParametersExist = false;
        if (this._parameters) {
          isParametersExist = true;
        }
        var params = this._parameters;

        var paramName = GLBoost$1.getNameOfGLBoostConstant(paramNumber);

        var ret = null;
        switch (paramNumber) {
          case GLBoost$1['UNPACK_FLIP_Y_WEBGL']:
          case GLBoost$1['UNPACK_PREMULTIPLY_ALPHA_WEBGL']:
          case GLBoost$1['TEXTURE_MAG_FILTER']:
          case GLBoost$1['TEXTURE_MIN_FILTER']:
          case GLBoost$1['TEXTURE_WRAP_S']:
          case GLBoost$1['TEXTURE_WRAP_T']:
            if (isParametersExist && params[paramName]) {
              ret = params[paramName];
            }
            break;
        }
        return ret;
      }
    }, {
      key: '_getParamWithAlternative',
      value: function _getParamWithAlternative(paramNumber, alternative) {
        return MiscUtil.getTheValueOrAlternative(this._getParameter(paramNumber), alternative);
      }
    }, {
      key: 'generateTextureFromUri',
      value: function generateTextureFromUri(imageUri) {
        var _this2 = this;

        var isKeepBound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        return new Promise(function (resolve, reject) {
          var isNode = DataUtil.isNode();
          if (isNode) {
            var getPixels = require("get-pixels");

            var results = getPixels(imageUri, function (err, pixels) {
              if (err) {
                console.log("Bad image path");
                reject();
                return;
              }

              _this2._width = pixels.shape[0];
              _this2._height = pixels.shape[1];

              var texture = _this2._generateTextureInnerWithArrayBufferView(pixels.data, _this2._width, _this2._height, isKeepBound);

              _this2._texture = texture;
              _this2._isTextureReady = true;

              resolve();
            });
          } else {
            _this2._img = new Image();
            if (!imageUri.match(/^data:/)) {
              _this2._img.crossOrigin = 'Anonymous';
            }
            _this2._img.onload = function () {
              var imgCanvas = _this2._getResizedCanvas(_this2._img);
              _this2._width = imgCanvas.width;
              _this2._height = imgCanvas.height;

              var texture = _this2._generateTextureInner(imgCanvas, isKeepBound);

              _this2._texture = texture;
              _this2._isTextureReady = true;

              resolve();
            };

            _this2._img.src = imageUri;
          }
        });
      }
    }, {
      key: 'generateTextureFromImage',
      value: function generateTextureFromImage(img) {
        var imgCanvas = this._getResizedCanvas(img);
        this._width = imgCanvas.width;
        this._height = imgCanvas.height;

        var texture = this._generateTextureInner(imgCanvas, false);

        this._texture = texture;
        this._isTextureReady = true;
      }
    }, {
      key: '_generateTextureFromImageData',
      value: function _generateTextureFromImageData(imageData) {
        var gl = this._glContext.gl;
        var glem = GLExtensionsManager.getInstance(this._glContext);

        var imgCanvas = this._getResizedCanvas(imageData);
        this._width = imgCanvas.width;
        this._height = imgCanvas.height;

        var texture = this._generateTextureInner(imgCanvas, false);

        this._texture = texture;
        this._isTextureReady = true;

        this._img = imageData;

        this._onLoad();
      }
    }, {
      key: '_generateTextureInnerWithArrayBufferView',
      value: function _generateTextureInnerWithArrayBufferView(imgCanvas, width, height, isKeepBound) {
        var gl = this._glContext.gl;
        var glem = GLExtensionsManager.getInstance(this._glContext);
        var texture = this._glContext.createTexture(this);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._getParamWithAlternative(GLBoost$1.UNPACK_FLIP_Y_WEBGL, false));
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._getParamWithAlternative(GLBoost$1.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false));
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imgCanvas);

        if (glem.extTFA) {
          gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MAG_FILTER, gl.LINEAR));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_S, gl.REPEAT));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_T, gl.REPEAT));
        gl.generateMipmap(gl.TEXTURE_2D);

        if (!isKeepBound) {
          gl.bindTexture(gl.TEXTURE_2D, null);
        }
        return texture;
      }
    }, {
      key: '_generateTextureInner',
      value: function _generateTextureInner(imgCanvas, isKeepBound) {
        var gl = this._glContext.gl;
        var glem = GLExtensionsManager.getInstance(this._glContext);
        var texture = this._glContext.createTexture(this);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._getParamWithAlternative(GLBoost$1.UNPACK_FLIP_Y_WEBGL, false));
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._getParamWithAlternative(GLBoost$1.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false));
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgCanvas);

        if (glem.extTFA) {
          gl.texParameteri(gl.TEXTURE_2D, glem.extTFA.TEXTURE_MAX_ANISOTROPY_EXT, 4);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MAG_FILTER, gl.LINEAR));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._getParamWithAlternative(GLBoost$1.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_S, gl.REPEAT));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._getParamWithAlternative(GLBoost$1.TEXTURE_WRAP_T, gl.REPEAT));
        gl.generateMipmap(gl.TEXTURE_2D);

        if (!isKeepBound) {
          gl.bindTexture(gl.TEXTURE_2D, null);
        }
        return texture;
      }
    }, {
      key: '_onLoad',
      value: function _onLoad() {}
    }, {
      key: 'isTextureReady',
      get: function get() {
        return this._isTextureReady;
      }
    }, {
      key: 'isImageAssignedForTexture',
      get: function get() {
        return typeof this._img == 'undefined';
      }
    }]);
    return Texture;
  }(AbstractTexture);

  var PhinaTexture = function (_Texture) {
    babelHelpers.inherits(PhinaTexture, _Texture);

    function PhinaTexture(glBoostContext, width, height, fillStyle) {
      var parameters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      babelHelpers.classCallCheck(this, PhinaTexture);

      var _this = babelHelpers.possibleConstructorReturn(this, (PhinaTexture.__proto__ || Object.getPrototypeOf(PhinaTexture)).call(this, glBoostContext, null, null, parameters));

      _this._parameters['UNPACK_FLIP_Y_WEBGL'] = true;

      _this._width = width;
      _this._height = height;
      _this._fillStyle = fillStyle;

      _this._phinaObjects = [];
      _this._setUpOffscreen();
      return _this;
    }

    babelHelpers.createClass(PhinaTexture, [{
      key: '_setUpOffscreen',
      value: function _setUpOffscreen() {
        this._offscreen = phina.display.OffScreenLayer({
          width: this.width,
          height: this.height,
          fillStyle: this._fillStyle
        });

        this._offscreen.reset();
      }
    }, {
      key: 'addPhinaObject',
      value: function addPhinaObject(object) {
        this._phinaObjects.push(object);
        return this;
      }
    }, {
      key: 'addPhinaObjects',
      value: function addPhinaObjects(objects) {
        this._phinaObjects = this._phinaObjects.concat(objects);
        return this;
      }
    }, {
      key: 'setPhinaObjects',
      value: function setPhinaObjects(objects) {
        this._phinaObjects = objects.concat();
        return this;
      }
    }, {
      key: 'clearPhinaObjects',
      value: function clearPhinaObjects() {
        this._phinaObjects.length = 0;
        return this;
      }
    }, {
      key: 'renderPhinaObjects',
      value: function renderPhinaObjects() {
        for (var i = 0; i < this._phinaObjects.length; i++) {
          this._offscreen.renderObject(this._phinaObjects[i]);
        }

        this._recreateTexture(this._offscreen.getImageDataURL());
        this._offscreen.reset();
      }
    }, {
      key: '_recreateTexture',
      value: function _recreateTexture(imageDataUri) {
        var oldTexture = this._texture;
        this.generateTextureFromUri(imageDataUri, true);
        if (typeof oldTexture !== 'undefined' && oldTexture !== null) {
          this._glContext.deleteTexture(this, oldTexture);
        }
      }
    }]);
    return PhinaTexture;
  }(Texture);

  var CubeTexture = function (_AbstractTexture) {
    babelHelpers.inherits(CubeTexture, _AbstractTexture);

    function CubeTexture(glBoostContext, userFlavorName) {
      var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      babelHelpers.classCallCheck(this, CubeTexture);

      var _this = babelHelpers.possibleConstructorReturn(this, (CubeTexture.__proto__ || Object.getPrototypeOf(CubeTexture)).call(this, glBoostContext));

      _this._isTextureReady = false;
      _this._texture = null;
      if (typeof userFlavorName === 'undefined' || userFlavorName === null) {
        _this.userFlavorName = _this._instanceName;
      } else {
        _this.userFlavorName = userFlavorName;
      }

      _this._parameters = parameters ? parameters : {};

      return _this;
    }

    babelHelpers.createClass(CubeTexture, [{
      key: '_getParameter',
      value: function _getParameter(paramNumber) {
        var isParametersExist = false;
        if (this._parameters) {
          isParametersExist = true;
        }
        var params = this._parameters;

        var paramName = GLBoost$1.getNameOfGLBoostConstant(paramNumber);

        var ret = null;
        switch (paramNumber) {
          case GLBoost$1['UNPACK_FLIP_Y_WEBGL']:
          case GLBoost$1['UNPACK_PREMULTIPLY_ALPHA_WEBGL']:
          case GLBoost$1['TEXTURE_MAG_FILTER']:
          case GLBoost$1['TEXTURE_MIN_FILTER']:
          case GLBoost$1['TEXTURE_WRAP_S']:
          case GLBoost$1['TEXTURE_WRAP_T']:
            if (isParametersExist && params[paramName]) {
              ret = params[paramName];
            }
            break;
        }
        return ret;
      }
    }, {
      key: '_getParamWithAlternative',
      value: function _getParamWithAlternative(paramNumber, alternative) {
        return MiscUtil.getTheValueOrAlternative(this._getParameter(paramNumber), alternative);
      }
    }, {
      key: 'generateTextureFromSixSideImages',
      value: function generateTextureFromSixSideImages(posXimages, negXimages, posYimages, negYimages, posZimages, negZimages) {
        var texture = this._glContext.createTexture(this);
        this._texture = texture;
        var gl = this._glContext.gl;
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

        var _loop = function _loop(i) {
          var image = new Image();
          image.src = posXimages[i];
          image.onload = function () {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          };
        };

        for (var i = 0; i < posXimages.length; i++) {
          _loop(i);
        }

        var _loop2 = function _loop2(i) {
          var image = new Image();
          image.src = negXimages[i];
          image.onload = function () {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          };
        };

        for (var i = 0; i < negXimages.length; i++) {
          _loop2(i);
        }

        var _loop3 = function _loop3(i) {
          var image = new Image();
          image.src = posYimages[i];
          image.onload = function () {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          };
        };

        for (var i = 0; i < posYimages.length; i++) {
          _loop3(i);
        }

        var _loop4 = function _loop4(i) {
          var image = new Image();
          image.src = negYimages[i];
          image.onload = function () {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          };
        };

        for (var i = 0; i < negYimages.length; i++) {
          _loop4(i);
        }

        var _loop5 = function _loop5(i) {
          var image = new Image();
          image.src = posZimages[i];
          image.onload = function () {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          };
        };

        for (var i = 0; i < posZimages.length; i++) {
          _loop5(i);
        }

        var _loop6 = function _loop6(i) {
          var image = new Image();
          image.src = negZimages[i];
          image.onload = function () {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          };
        };

        for (var i = 0; i < negZimages.length; i++) {
          _loop6(i);
        }
      }
    }, {
      key: 'generateTextureFromBaseUri',
      value: function () {
        var _ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(baseUri, mipLevelNum) {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', new Promise(function (resolve, reject) {
                    var texture = _this2._glContext.createTexture(_this2);
                    _this2._texture = texture;
                    var gl = _this2._glContext.gl;

                    var loadedCount = 0;

                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    if (mipLevelNum >= 2) {
                      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    } else {
                      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    }

                    var onLoadEachCubeImage = function onLoadEachCubeImage(texture, face, image, i) {
                      return function () {
                        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                        gl.texImage2D(face, i, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                        loadedCount++;
                        if (loadedCount === 6) {
                          _this2._isTextureReady = true;
                          resolve(_this2);
                        }
                      };
                    };

                    for (var i = 0; i < mipLevelNum; i++) {
                      var faces = [[baseUri + "_right_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_X], [baseUri + "_left_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_X], [baseUri + "_top_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Y], [baseUri + "_bottom_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y], [baseUri + "_front_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Z], [baseUri + "_back_" + i + ".jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]];
                      for (var j = 0; j < faces.length; j++) {
                        var face = faces[j][1];
                        var image = new Image();
                        image.onload = onLoadEachCubeImage(texture, face, image, i);
                        image.src = faces[j][0];
                      }
                    }
                  }));

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function generateTextureFromBaseUri(_x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return generateTextureFromBaseUri;
      }()
    }, {
      key: 'isTextureReady',
      get: function get() {
        return this._isTextureReady;
      }
    }]);
    return CubeTexture;
  }(AbstractTexture);

  var Cube = function (_Geometry) {
    babelHelpers.inherits(Cube, _Geometry);

    function Cube(glBoostContext, widthVector, vertexColor) {
      babelHelpers.classCallCheck(this, Cube);

      var _this = babelHelpers.possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, glBoostContext));

      widthVector = MathClassUtil.arrayToVector(widthVector);
      vertexColor = MathClassUtil.arrayToVector(vertexColor);

      _this._setupVertexData(widthVector.divide(2.0), vertexColor);
      return _this;
    }

    babelHelpers.createClass(Cube, [{
      key: '_setupVertexData',
      value: function _setupVertexData(widthVector, vertexColor) {
        var indices = [3, 1, 0, 2, 1, 3, 4, 5, 7, 7, 5, 6, 8, 9, 11, 11, 9, 10, 15, 13, 12, 14, 13, 15, 19, 17, 16, 18, 17, 19, 20, 21, 23, 23, 21, 22];

        var positions = [new Vector3(-widthVector.x, widthVector.y, -widthVector.z), new Vector3(widthVector.x, widthVector.y, -widthVector.z), new Vector3(widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, widthVector.z), new Vector3(-widthVector.x, -widthVector.y, widthVector.z), new Vector3(-widthVector.x, -widthVector.y, widthVector.z), new Vector3(widthVector.x, -widthVector.y, widthVector.z), new Vector3(widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, widthVector.y, -widthVector.z), new Vector3(-widthVector.x, widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, -widthVector.z), new Vector3(widthVector.x, -widthVector.y, widthVector.z), new Vector3(widthVector.x, widthVector.y, widthVector.z), new Vector3(widthVector.x, widthVector.y, -widthVector.z), new Vector3(-widthVector.x, -widthVector.y, -widthVector.z), new Vector3(-widthVector.x, -widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, widthVector.z), new Vector3(-widthVector.x, widthVector.y, -widthVector.z)];
        var colors = [new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w)];
        var texcoords = [new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0)];

        var normals = [new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0)];

        this.setVerticesData({
          position: positions,
          color: colors,
          normal: normals,
          texcoord: texcoords
        }, [indices]);
      }
    }]);
    return Cube;
  }(Geometry);


  GLBoost$1["Cube"] = Cube;

  var ArrayUtil = function () {
    function ArrayUtil() {
      babelHelpers.classCallCheck(this, ArrayUtil);
    }

    babelHelpers.createClass(ArrayUtil, null, [{
      key: 'merge',
      value: function merge() {
        var key,
            result = false;
        if (arguments && arguments.length > 0) {
          result = [];
          for (var i = 0, len = arguments.length; i < len; i++) {
            if (arguments[i] && babelHelpers.typeof(arguments[i]) === 'object') {
              for (key in arguments[i]) {
                if (isFinite(key)) {
                  result.push(arguments[i][key]);
                } else {
                  result[key] = arguments[i][key];
                }
              }
            }
          }
        }
        return result;
      }
    }]);
    return ArrayUtil;
  }();

  var Plane = function (_Geometry) {
    babelHelpers.inherits(Plane, _Geometry);

    function Plane(glBoostContext, width, height, uSpan, vSpan, customVertexAttributes) {
      var isUVRepeat = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      babelHelpers.classCallCheck(this, Plane);

      var _this = babelHelpers.possibleConstructorReturn(this, (Plane.__proto__ || Object.getPrototypeOf(Plane)).call(this, glBoostContext));

      _this._setupVertexData(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat);
      return _this;
    }

    babelHelpers.createClass(Plane, [{
      key: '_setupVertexData',
      value: function _setupVertexData(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat) {

        var positions = [];

        for (var i = 0; i <= vSpan; i++) {
          for (var j = 0; j <= uSpan; j++) {
            positions.push(new Vector3((j / uSpan - 1 / 2) * width, 0, (i / vSpan - 1 / 2) * height));
          }
        }

        var indices = [];
        for (var _i = 0; _i < vSpan; _i++) {
          var degenerate_left_index = 0;
          var degenerate_right_index = 0;
          for (var _j = 0; _j <= uSpan; _j++) {
            indices.push(_i * (uSpan + 1) + _j);
            indices.push((_i + 1) * (uSpan + 1) + _j);
            if (_j === 0) {
              degenerate_left_index = (_i + 1) * (uSpan + 1) + _j;
            } else if (_j === uSpan) {
              degenerate_right_index = (_i + 1) * (uSpan + 1) + _j;
            }
          }
          indices.push(degenerate_right_index);
          indices.push(degenerate_left_index);
        }

        var colors = [];
        var vertexColor = new Vector4$1(1, 1, 1, 1);
        for (var _i2 = 0; _i2 <= vSpan; _i2++) {
          for (var _j2 = 0; _j2 <= uSpan; _j2++) {
            colors.push(vertexColor);
          }
        }

        var texcoords = [];
        for (var _i3 = 0; _i3 <= vSpan; _i3++) {
          for (var _j3 = 0; _j3 <= uSpan; _j3++) {
            if (isUVRepeat) {
              texcoords.push(new Vector2(_j3, _i3));
            } else {
              texcoords.push(new Vector2(_j3 / uSpan, _i3 / vSpan));
            }
          }
        }

        var normal = new Vector3(0, 1, 0);
        var normals = [];
        for (var _i4 = 0; _i4 <= vSpan; _i4++) {
          for (var _j4 = 0; _j4 <= uSpan; _j4++) {
            normals.push(normal);
          }
        }

        var object = {
          position: positions,
          color: colors,
          texcoord: texcoords,
          normal: normals
        };

        var completeAttributes = ArrayUtil.merge(object, customVertexAttributes);
        this.setVerticesData(completeAttributes, [indices], GLBoost$1.TRIANGLE_STRIP);
      }
    }]);
    return Plane;
  }(Geometry);


  GLBoost$1["Plane"] = Plane;

  var Sphere = function (_Geometry) {
    babelHelpers.inherits(Sphere, _Geometry);

    function Sphere(glBoostSystem, radius, widthSegments, heightSegments, vertexColor) {
      babelHelpers.classCallCheck(this, Sphere);

      var _this = babelHelpers.possibleConstructorReturn(this, (Sphere.__proto__ || Object.getPrototypeOf(Sphere)).call(this, glBoostSystem));

      _this._setupVertexData(radius, widthSegments, heightSegments, vertexColor);
      return _this;
    }

    babelHelpers.createClass(Sphere, [{
      key: '_setupVertexData',
      value: function _setupVertexData(radius, widthSegments, heightSegments, vertexColor) {
        var positions = [];
        var texcoords = [];
        var colors = [];
        var normals = [];

        if (!vertexColor) {
          vertexColor = new Vector4$1(1, 1, 1, 1);
        }

        var shiftValue = 0.00001;
        for (var latNumber = 0; latNumber <= heightSegments; latNumber++) {
          var theta = latNumber * Math.PI / heightSegments + shiftValue;
          var sinTheta = Math.sin(theta);
          var cosTheta = Math.cos(theta);

          for (var longNumber = 0; longNumber <= widthSegments; longNumber++) {
            var phi = longNumber * 2 * Math.PI / widthSegments;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = radius * cosPhi * sinTheta;
            var y = radius * cosTheta;
            var z = radius * sinPhi * sinTheta;
            var position = new Vector3(x, y, z);
            positions.push(position);
            var u = 1 - longNumber / widthSegments;
            var v = latNumber / heightSegments;
            texcoords.push(new Vector2(u, v));
            colors.push(vertexColor);
            normals.push(Vector3.normalize(position));
          }
        }

        var indices = [];
        for (var latNumber = 0; latNumber < heightSegments; latNumber++) {
          for (var longNumber = 0; longNumber < widthSegments; longNumber++) {
            var first = latNumber * (widthSegments + 1) + longNumber;
            var second = first + widthSegments + 1;

            indices.push(first + 1);
            indices.push(second);
            indices.push(first);

            indices.push(first + 1);
            indices.push(second + 1);
            indices.push(second);
          }
        }

        var object = {
          position: positions,
          color: colors,
          texcoord: texcoords,
          normal: normals
        };

        this.setVerticesData(object, [indices], GLBoost$1.TRIANGLES);
      }
    }]);
    return Sphere;
  }(Geometry);


  GLBoost$1["Sphere"] = Sphere;

  var Axis = function (_Geometry) {
    babelHelpers.inherits(Axis, _Geometry);

    function Axis(glBoostContext, length) {
      babelHelpers.classCallCheck(this, Axis);

      var _this = babelHelpers.possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this, glBoostContext));

      _this._setupVertexData(length);
      return _this;
    }

    babelHelpers.createClass(Axis, [{
      key: '_setupVertexData',
      value: function _setupVertexData(length) {
        var nearZeroValue = 0.0001;

        var positions = [new Vector3(0, nearZeroValue, nearZeroValue), new Vector3(length, nearZeroValue, nearZeroValue), new Vector3(nearZeroValue, 0, nearZeroValue), new Vector3(nearZeroValue, length, nearZeroValue), new Vector3(nearZeroValue, nearZeroValue, 0), new Vector3(nearZeroValue, nearZeroValue, length)];

        var colors = [new Vector4$1(1, 0, 0, 1), new Vector4$1(1, 0, 0, 1), new Vector4$1(0, 1, 0, 1), new Vector4$1(0, 1, 0, 1), new Vector4$1(0, 0, 1, 1), new Vector4$1(0, 0, 1, 1)];

        this.setVerticesData({
          position: positions,
          color: colors
        }, null, GLBoost$1.LINES);
      }
    }]);
    return Axis;
  }(Geometry);


  GLBoost$1["Axis"] = Axis;

  var ParticleShaderSource = function () {
    function ParticleShaderSource() {
      babelHelpers.classCallCheck(this, ParticleShaderSource);
    }

    babelHelpers.createClass(ParticleShaderSource, [{
      key: 'VSDefine_ParticleShaderSource',
      value: function VSDefine_ParticleShaderSource(in_, out_, f) {
        var shaderText = '';
        shaderText += in_ + ' vec3 aVertex_particleCenterPos;\n';
        shaderText += 'uniform mat4 projectionMatrix;\n';
        shaderText += 'uniform mat4 modelViewMatrix;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_ParticleShaderSource',
      value: function VSTransform_ParticleShaderSource(existCamera_f, f) {
        var shaderText = '';

        shaderText += '  vec4 cameraCenterPos = modelViewMatrix * vec4(aVertex_particleCenterPos, 1.0);\n';
        shaderText += '  vec4 cameraEachPointPos = cameraCenterPos + vec4(aVertex_position - aVertex_particleCenterPos, 1.0);\n';
        shaderText += '  gl_Position = projectionMatrix * cameraEachPointPos;\n';

        return shaderText;
      }
    }, {
      key: 'prepare_ParticleShaderSource',
      value: function prepare_ParticleShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
        var vertexAttribsAsResult = [];

        shaderProgram['vertexAttribute_' + 'particleCenterPos'] = gl.getAttribLocation(shaderProgram, 'aVertex_' + 'particleCenterPos');
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + 'particleCenterPos']);
        vertexAttribsAsResult.push('particleCenterPos');

        material.setUniform(shaderProgram, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
        material.setUniform(shaderProgram, 'uniform_modelViewMatrix', this._glContext.getUniformLocation(shaderProgram, 'modelViewMatrix'));
        material._semanticsDic['PROJECTION'] = 'projectionMatrix';
        material._semanticsDic['MODELVIEW'] = 'modelViewMatrix';

        return vertexAttribsAsResult;
      }
    }]);
    return ParticleShaderSource;
  }();

  var Particle = function (_Geometry) {
    babelHelpers.inherits(Particle, _Geometry);

    function Particle(glBoostContext, centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint) {
      babelHelpers.classCallCheck(this, Particle);

      var _this = babelHelpers.possibleConstructorReturn(this, (Particle.__proto__ || Object.getPrototypeOf(Particle)).call(this, glBoostContext));

      _this._setupVertexData(centerPointData, particleWidth / 2.0, particleHeight / 2.0, customVertexAttributes, performanceHint);
      return _this;
    }

    babelHelpers.createClass(Particle, [{
      key: '_setupVertexAndIndexData',
      value: function _setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, needDefaultWhiteColor) {
        var indices = this.indices;
        indices = [];
        var positionArray = centerPointData.position;

        for (var i = 0; i < positionArray.length; i++) {
          var offset = i * 4;
          indices.push(offset);
          indices.push(offset + 1);
          indices.push(offset + 2);
          indices.push(offset + 3);
          if (i === positionArray.length - 1) {
            break;
          }
          indices.push(offset + 3);
          indices.push(offset + 4);
        }

        this.positions = [];
        var positions = this.positions;

        for (var _i = 0; _i < positionArray.length; _i++) {
          positionArray[_i] = MathClassUtil.arrayToVector(positionArray[_i]);
        }

        for (var _i2 = 0; _i2 < positionArray.length; _i2++) {
          positions.push(new Vector3(positionArray[_i2].x - pHalfWidth, positionArray[_i2].y + pHalfHeight, positionArray[_i2].z));
          positions.push(new Vector3(positionArray[_i2].x - pHalfWidth, positionArray[_i2].y - pHalfHeight, positionArray[_i2].z));
          positions.push(new Vector3(positionArray[_i2].x + pHalfWidth, positionArray[_i2].y + pHalfHeight, positionArray[_i2].z));
          positions.push(new Vector3(positionArray[_i2].x + pHalfWidth, positionArray[_i2].y - pHalfHeight, positionArray[_i2].z));
        }
        this.centerPositions = [];
        var centerPositions = this.centerPositions;

        for (var _i3 = 0; _i3 < positionArray.length; _i3++) {
          centerPositions.push(new Vector3(positionArray[_i3].x, positionArray[_i3].y, positionArray[_i3].z));
          centerPositions.push(new Vector3(positionArray[_i3].x, positionArray[_i3].y, positionArray[_i3].z));
          centerPositions.push(new Vector3(positionArray[_i3].x, positionArray[_i3].y, positionArray[_i3].z));
          centerPositions.push(new Vector3(positionArray[_i3].x, positionArray[_i3].y, positionArray[_i3].z));
        }
        this.texcoords = [];
        var texcoords = this.texcoords;
        for (var _i4 = 0; _i4 < positionArray.length; _i4++) {
          texcoords.push(new Vector2(0, 0));
          texcoords.push(new Vector2(0, 1));
          texcoords.push(new Vector2(1, 0));
          texcoords.push(new Vector2(1, 1));
        }

        this.normals = [];
        var normals = this.normals;
        var normal = new Vector3(0, 0, 1);
        for (var _i5 = 0; _i5 < positionArray.length; _i5++) {
          for (var j = 0; j < 4; j++) {
            normals.push(normal);
          }
        }
        this.pointData = {};
        var pointData = this.pointData;

        for (var type in centerPointData) {
          if (type !== 'position') {
            pointData[type] = [];
            for (var _i6 = 0; _i6 < positionArray.length; _i6++) {
              for (var _j = 0; _j < 4; _j++) {
                pointData[type].push(centerPointData[type][_i6]);
              }
            }
          }
        }

        var object = {
          position: positions,
          texcoord: texcoords,
          normal: normals,
          particleCenterPos: centerPositions
        };

        if (needDefaultWhiteColor) {
          this.colors = [];
          var colors = this.colors;
          var vertexColor = new Vector4$1(1, 1, 1, 1);
          for (var _i7 = 0; _i7 < positionArray.length; _i7++) {
            for (var _j2 = 0; _j2 < 4; _j2++) {
              colors.push(vertexColor);
            }
          }
          object.color = colors;
        }

        var tempAttributes = ArrayUtil.merge(object, pointData);
        var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

        return {
          vertexAttributes: completeAttributes,
          indexArray: [indices]
        };
      }
    }, {
      key: '_updateVertexAndIndexData',
      value: function _updateVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, needDefaultWhiteColor) {
        var positionArray = centerPointData.position;
        var idx = 0;
        var positions = this.positions;
        for (var i = 0; i < positionArray.length; i++) {
          positions[idx + 0].x = positionArray[i].x - pHalfWidth;
          positions[idx + 0].y = positionArray[i].y + pHalfHeight;
          positions[idx + 0].z = positionArray[i].z;
          positions[idx + 1].x = positionArray[i].x - pHalfWidth;
          positions[idx + 1].y = positionArray[i].y - pHalfHeight;
          positions[idx + 1].z = positionArray[i].z;
          positions[idx + 2].x = positionArray[i].x + pHalfWidth;
          positions[idx + 2].y = positionArray[i].y + pHalfHeight;
          positions[idx + 2].z = positionArray[i].z;
          positions[idx + 3].x = positionArray[i].x + pHalfWidth;
          positions[idx + 3].y = positionArray[i].y - pHalfHeight;
          positions[idx + 3].z = positionArray[i].z;
          idx += 4;
        }

        var centerPositions = this.centerPositions;
        idx = 0;
        for (var _i8 = 0; _i8 < positionArray.length; _i8++) {
          centerPositions[idx].x = positionArray[_i8].x;
          centerPositions[idx].y = positionArray[_i8].y;
          centerPositions[idx].z = positionArray[_i8].z;
          centerPositions[idx + 1].x = positionArray[_i8].x;
          centerPositions[idx + 1].y = positionArray[_i8].y;
          centerPositions[idx + 1].z = positionArray[_i8].z;
          centerPositions[idx + 2].x = positionArray[_i8].x;
          centerPositions[idx + 2].y = positionArray[_i8].y;
          centerPositions[idx + 2].z = positionArray[_i8].z;
          centerPositions[idx + 3].x = positionArray[_i8].x;
          centerPositions[idx + 3].y = positionArray[_i8].y;
          centerPositions[idx + 3].z = positionArray[_i8].z;
          idx += 4;
        }
        idx = 0;
        var pointData = this.pointData;
        for (var type in centerPointData) {
          if (type !== 'position') {
            pointData[type] = [];
            for (var _i9 = 0; _i9 < positionArray.length; _i9++) {
              for (var j = 0; j < 4; j++) {
                pointData[type][idx].x = centerPointData[type][_i9].x;
                pointData[type][idx].y = centerPointData[type][_i9].y;
                pointData[type][idx].z = centerPointData[type][_i9].z;
                idx++;
              }
            }
          }
        }

        var object = {
          position: positions,
          texcoord: this.texcoords,
          normal: this.normals,
          particleCenterPos: centerPositions
        };

        if (needDefaultWhiteColor) {
          object.color = this.colors;
        }

        var tempAttributes = ArrayUtil.merge(object, pointData);
        var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

        return {
          vertexAttributes: completeAttributes,
          indexArray: [this.indices]
        };
      }
    }, {
      key: '_setupVertexData',
      value: function _setupVertexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, performanceHint) {
        var result = this._setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, true);

        this.setVerticesData(result.vertexAttributes, result.indexArray, GLBoost$1.TRIANGLE_STRIP, performanceHint);
      }
    }, {
      key: 'updateVerticesData',
      value: function updateVerticesData(centerPointData, particleWidth, particleHeight, customVertexAttributes) {
        var result = this._updateVertexAndIndexData(centerPointData, particleWidth / 2.0, particleHeight / 2.0, customVertexAttributes, false);
        babelHelpers.get(Particle.prototype.__proto__ || Object.getPrototypeOf(Particle.prototype), 'updateVerticesData', this).call(this, result.vertexAttributes);
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender(expression, existCamera_f, pointLight, meshMaterial, renderPasses, mesh) {

        if (meshMaterial) {
          this._materialForBillboard = meshMaterial;
        } else {
          this._materialForBillboard = this._defaultMaterial;
        }

        var ParticleShader = function (_materialForBillboard) {
          babelHelpers.inherits(ParticleShader, _materialForBillboard);

          function ParticleShader(glBoostContext, basicShader) {
            babelHelpers.classCallCheck(this, ParticleShader);

            var _this2 = babelHelpers.possibleConstructorReturn(this, (ParticleShader.__proto__ || Object.getPrototypeOf(ParticleShader)).call(this, glBoostContext, basicShader, ParticleShaderSource));

            ParticleShader.mixin(ParticleShaderSource);

            _this2._meshTransformUpdateCount = -9999;
            _this2._cameraViewUpdateCount = -9999;
            _this2._cameraProjectionUpdateCount = -9999;
            return _this2;
          }

          babelHelpers.createClass(ParticleShader, [{
            key: 'setUniforms',
            value: function setUniforms(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {
              babelHelpers.get(ParticleShader.prototype.__proto__ || Object.getPrototypeOf(ParticleShader.prototype), 'setUniforms', this).call(this, gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData);


              return true;
            }
          }]);
          return ParticleShader;
        }(this._materialForBillboard.shaderClass);

        if (meshMaterial) {
          meshMaterial.shaderClass = ParticleShader;
        } else {
          this._defaultMaterial.shaderClass = ParticleShader;
        }

        babelHelpers.get(Particle.prototype.__proto__ || Object.getPrototypeOf(Particle.prototype), 'prepareToRender', this).call(this, expression, existCamera_f, pointLight, meshMaterial, renderPasses, mesh);
      }
    }]);
    return Particle;
  }(Geometry);


  GLBoost$1["Particle"] = Particle;

  var Screen = function (_Geometry) {
    babelHelpers.inherits(Screen, _Geometry);

    function Screen(glBoostContext) {
      var screen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        unit: 'ratio',
        range: 'positive-negative',
        origin: new Vector2(-1, -1),
        size: new Vector2(2, 2)
      };
      var customVertexAttributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      babelHelpers.classCallCheck(this, Screen);

      var _this = babelHelpers.possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).call(this, glBoostContext));

      _this._setupVertexData(screen, customVertexAttributes);
      return _this;
    }

    babelHelpers.createClass(Screen, [{
      key: '_setupVertexData',
      value: function _setupVertexData(screen, customVertexAttributes) {
        var positions = [];
        var indices = [];
        var colors = [];
        var texcoords = [];
        var normals = [];

        var originX = screen.origin.x;
        var originY = screen.origin.y;
        var sizeX = screen.size.x;
        var sizeY = screen.size.y;

        if (screen.unit === 'pixel') {
          originX = originX / this._glContext.canvasWidth;
          originY = originY / this._glContext.canvasHeight;
          sizeX = sizeX / this._glContext.canvasWidth;
          sizeY = sizeY / this._glContext.canvasHeight;
        }
        if (screen.range === 'positive') {
          originX = (originX - 0.5) * 2;
          originY = (originY - 0.5) * 2;
          sizeX = sizeX * 2;
          sizeY = sizeY * 2;
        }

        screen.origin = new Vector2(originX, originY);
        screen.size = new Vector2(sizeX, sizeY);

        this._setupQuad(positions, indices, colors, texcoords, normals, screen.origin, screen.size, 1, 1, screen.uUVRepeat, screen.vUVRepeat);

        var object = {
          position: positions,
          color: colors,
          texcoord: texcoords,
          normal: normals
        };

        var completeAttributes = ArrayUtil.merge(object, customVertexAttributes);
        this.setVerticesData(completeAttributes, [indices], GLBoost$1.TRIANGLE_STRIP);
      }
    }, {
      key: '_setupQuad',
      value: function _setupQuad(positions, indices, colors, texcoords, normals, originInRatioVec2, sizeInRatioVec2, uSpan, vSpan, uUVRepeat, vUVRepeat) {
        for (var i = 0; i <= vSpan; i++) {
          for (var j = 0; j <= uSpan; j++) {
            positions.push(new Vector3(originInRatioVec2.x + j / uSpan * sizeInRatioVec2.x, originInRatioVec2.y + i / vSpan * sizeInRatioVec2.y, 0));
          }
        }

        for (var _i = 0; _i < vSpan; _i++) {
          var degenerate_left_index = 0;
          var degenerate_right_index = 0;
          for (var _j = 0; _j <= uSpan; _j++) {
            indices.push(_i * (uSpan + 1) + _j);
            indices.push((_i + 1) * (uSpan + 1) + _j);
            if (_j === 0) {
              degenerate_left_index = (_i + 1) * (uSpan + 1) + _j;
            } else if (_j === uSpan) {
              degenerate_right_index = (_i + 1) * (uSpan + 1) + _j;
            }
          }
          indices.push(degenerate_right_index);
          indices.push(degenerate_left_index);
        }

        var vertexColor = new Vector4$1(1, 1, 1, 1);
        for (var _i2 = 0; _i2 <= vSpan; _i2++) {
          for (var _j2 = 0; _j2 <= uSpan; _j2++) {
            colors.push(vertexColor);
          }
        }

        for (var _i3 = 0; _i3 <= vSpan; _i3++) {
          for (var _j3 = 0; _j3 <= uSpan; _j3++) {
            texcoords.push(new Vector2(_j3, _i3));
          }
        }

        var normal = new Vector3(0, 0, -1);
        for (var _i4 = 0; _i4 <= vSpan; _i4++) {
          for (var _j4 = 0; _j4 <= uSpan; _j4++) {
            normals.push(normal);
          }
        }
      }
    }]);
    return Screen;
  }(Geometry);


  GLBoost$1["Screen"] = Screen;

  var GLBoostLowContext = function () {
    function GLBoostLowContext(canvas, initParameter, gl, width, height) {
      babelHelpers.classCallCheck(this, GLBoostLowContext);

      this._setName();

      this.__system = new GLBoostSystem(canvas, initParameter, gl, width, height, this);
      console.log('*** GLBoost ' + GLBoost$1.VERSION + ' ***');

      var dummyWhite1x1ImageDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REY4MUVGRjk0QzMyMTFFN0I2REJDQTc4QjEyOEY2RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REY4MUVGRkE0QzMyMTFFN0I2REJDQTc4QjEyOEY2RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERjgxRUZGNzRDMzIxMUU3QjZEQkNBNzhCMTI4RjZFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERjgxRUZGODRDMzIxMUU3QjZEQkNBNzhCMTI4RjZFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvTp+QkAAAAPSURBVHjaYvj//z9AgAEABf4C/i3Oie4AAAAASUVORK5CYII=';

      var pbrCookTorranceBrdfLutDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAA3NCSVQICAjb4U/gAAAgAElEQVR4nO19Xbfjqo7tJOV9zumHvn///tm7w32wAX0jsJNatbsZa7iEEJgkc0oCk1T5v38BQIW6VltvGwOojt7paFTr3HiqdwVr8FXBk/cM3F7V0TvyfbOPVj9hkNRkzI4CVMC4FtQ6NLS/3aWgVLcVmWq7o2c81UeCGnxDgCP398czTvbq70Onq2tDZCTM8k3PVk0NFg22S2bkAx6gyScBzyDHAeSr5fJ/ZqupNw1sgQ8uBD2gKQglHNk0XhihANWwD+RHmm5WdZnyIUOYPU1yPn4EODuEfj3JAaxUT9ZtgD4FYjK4aEJuBG2WkfNKLSNh9kjTzeqGgS7byM4MZRY3AsBS7nEA4chGlYxAW6GEvOcWg3s24hammdkllnfQT3I2MaDustF0s6rLI649Ux4kCbwIAFrli4FVDiAYOahymOYhngJxej1gjqCVq3LWuL2MP9HZi7LHh2exbvY1IgB49Q4H9FBIV6FW4VOsZ5z6JRTAyYVW3XYyCCAcxJXTcSAY7dnqJwweL/nxZQQAr+5x4CpWF6SrgL0vBB/rSwLCXOjTQcCTDYjn4oDs5VjerG4Y6GIabLv/m1w64KcrexxA2AWrZPD3hR4QClDZxDx7sxUrMu07HVz23Y0Dz1Y3DEyNLp8OCEE5Ctx0ZY8DCLvAt6RV8BFg7QttCFDjgwcZ1+y248fuOEjHgY9WNwySGrN8jRLXGgD5DGdmibALchEAfARYYWpDgNlKCBaZtbdsKQh4ffPyGIrHAWH50aqpmZZnsW6a3efJQXFwhwNiTl4XaoAcGa6qk7Kv+XvPzBrcHEQrYxlW33x3D5R6tHw1HllXtzW6JHt9zf1DLoJ3OYB0FyRdvmlWgDCSCAF8tNgM1t6o2cXuvgL3oGnSpYAGK205rd63/6jmkbI0rNoG3eKAHMTvgtlT3pgbJkyTAqatHF6PB4GlJjcOtGBlt86qWLF/UJMvn3P/HU60WA/C1jmAjPF5+9lT3jkZwiM9U8c/ac3lQoEBLJs7TQZA2wv4aCjY1pjlJqyXuptA94pzFGKRA/Yg1hUYz4kh9HkyKFc9dfx5d04PomUQP8W0xjcSvaZNQVX01dUNg6TGU+pyp++GsVeyx6FjDiB9YA6noDZesUgGcBZB2XiCaS+VimC6VzACLBuzKW8pwUq8nG6FtgcrX0b/I0jVxfP0we10l8lx6CQHkD402udHV7RZ0FuRBJab33H8XIlZLqRH0DKcprgaN40xOUvNvuZoWOyS1HjK7xePGGaJjkN/ggMgVSSeD5j6YdBYpJuEAD4glDz1659z/F5H776j42xBDH+0O5ql8tsDRVzCCPBhDgBrzwdgGmx9zQUJuad2rkF7Ez24r0I/rsYBBKHBtsYsPwe+XgmCgGg6Uvj+PAdADJCOAOBITTr+BRoQF/tgEBCtS1U5lPV4WNxLD5jU3DGL9U+VPNC9pgNJfD/KASgEm158GgGgboq048/SgMzNG0TLcJrM1qWqMRT5PE28wlLegXXS7HexopeYA+dM2hrgaQ6AO/UoAigvbhu0GbuCvyYW9lrpGYDPDc4g0p7ISFdF37UqZ6nXxbypaZZXfg3NXglQnulL1gAFFTPn/dzzAWgh/U1IVyiAtSYWZghlE6DTXCgYc1pNGuSr5gh5M9PSU3rltxPjLFN6qF2gaQKT4QmxhEMYmBAPn5GlBCubEmbYk/1ciI6vZfhVT7PDDfJR33T82tIz9kpgHDRt+/K4I/28dDnEKCkOJG24V/YigARoQQFw5wsAZXQHaQVcZVZu98g7/jyyPc3U0w9NOhFaUm7oHy9TbmwbHHbbdzlgCOEXAHQXYQNrTWxbzmRqD8gsyzVTTUE1r1kyMG08pdn9WX3cdL9kOABl4z4IE+P9Rg7oJg/HDMRqTexaEpkO6/XVjjYeLaje0dhunnxqH/Xx348JU3znbUDMskchXLN7HIDv3QHj2NxUAFU63jqIAHoQW2633A4C2xpxF0NTAHVEwuvo3SKw3y73R3uKAyCf5sJRCPd+NzgAJWgQZ367wUX5vV38CN+EXbGlWYW6I0IbT2lr+BEJbzQ9sftNny4bPj62ZL8KMeWAvprzuskBKZAuU2NoZfOI2iApu01q5LjjtLqhnGo8ZazX95r2+mklSYPxqxDbHAhixRc4ADNuiLcgXA8E8ryJPx/wOuoqnTZ8m1Xl0FjkjLt7s3qq9amSd/AZ47YGeJoDEybMOAAO69Pdml+GRDjCkNsdpd6R802rVc/AtBFKczRXqRKhbrzn3X+U7xcAmxqfRXcha4CCghDlN45LQBtzDiAD65WDn9ByuB4QstlkVxeDANXQOYOb5d22iUtPaY4QdEm2ZgwyZQPWeXuodx7el+IzE9zggOxIOEDHjgQFYo8zMOUiE4Nn3Hy4Mdo1UwcfeHetj+37xHr/2PGb41ODL6AfbRobmF7qQjsexv3idIhsTZqDTmMF+GgbHEC4N4pYzq0HvKowBp+VbnXtlYFQmpaxPUwgtrdr2/GbN8qPsFEece3JcvT+JspjDkRu/lEOQDh75/kAHFliut3Rs4dfjQzIsMEIj7v8uIlyPj9aN3gQ2V927ch19x+E7XJgvE7yirc5AEspHHkAd9e1z062Tau2AYlOwQimxlOad8z0QojgKbiT6H/c/YuyTQPanRYxVPgg7B4HqA3WOQBuYwg52pgy4K4HvKoYxzVQ39OlBqYmVmp9vnU0Eccwdfz4GPpXgwDtiBs00EP1csDa/GHmwW35vFwOgC2szRtRDoB8SB64LyGkzVSGtR7wqoGB1Chqxb2gPpXYqZtd5n3brKbQDwYXlhu+f5sDSLjzjcK+EUbvNEA83f10lsXeIKYBCAcglOTFG8SwaJOUYXUXlsw4r7kRBwK9bpr2je+obZKYvpP53OGAHoqWjWHH9wEQpDRpDrje3RoEyr4A4F+jAR/NJoaT0OtewsbsDoWVDO51LxCfkoS+5+ECqE1xD/5GmRjJDCLst9Hfb/QUB8SwusQ34ovgAMfTKW9tDcGypH49dv9DydE2yXx0lSQtnrGpiZXi6+raTEwvHlO3egbR4OpzXEJzPkGaFvEmf67EszW+EikmxeiBcHOT97WZQJC9xAEoe6kkIJ5nPro6e6AL/lYukwGsLPEh7rJtuYrm+45flw+FgnyR26CYJjzp1l4CjmlLUJQ3DjCladn6F+7IY6cuq63DNAKAQyEig7UYgEJSANklNGcs0TzFEpo/gf4+Hfw+GsgnwQPHYCkNKw5tPYZIA7jbo2L4AntZjIAP/oPeVNVK3GNn7+kLaTYXA9Q+cPkB7BZAvzKs2eVD6O/F9DJfKIfOSUS6QkWNYBPo0Zi9/QYHhAGEbMUNQELTc/DiUAP4Z79JBuUytl3+HujlsOnMY4MtN8s37wX9y3B0HpOEZ/aYzCUPuUeSA1DnQCeywxmEiQ0NI6iGgdkL6jOzEaw2mkVJ4n7V07t3nHHg+9D/LaWlQBwxDI7BO+U3XQyB/3iBZCyaeIa8cphZcAY+DTwDL2/xgJjig/V2PYV7/TlsY/d/CPTPQg7D8U2eXibOfnr4efoIrMjFxpQDkY0CXJAFTTQqFzLNhF63ijgARXhdkrjfTofoZPSA/2Do65emdoG8UJCLAzYTWkZh0KPfFMMGIaaFY45DAdS+ECzcuBDnuRB8aE7yDZX46ZJE813Qh2P+6dDfmP8hcEn9vRw9Xg/wbKdPKF4SMMsiOQBT5k40CAXoEQayC8iApmYo/dw9xmJEiTC26PIU6A3eKYb/8PL4VA9aCXw2TXjMaZnpEDNw0n3BPTgPv8T08vv9tAssME0zHPOBLnwy6FbP7FnQexF6Mk4Q239T+QIh+y3kz6JghnUsnh5lCnUvYXOHA0iEAlh7O5H7530NvWUPx4aZ8bcgyZ/s4H9m+cT8p2MeZn7SK+7xHgfo1NO76b5aY0AIeQ4gSoegq/yVwgGxDSyeekG9uY67sIt4DzfgnuyVKr87CDz1QjbGabtA5NEvRO4O490JgD76e+m+dfRaCjMOgNJgdo6NVZ2cPpXbOOcadC9RXOyGyPuHOXhd7r+iOyOcffmvQyvYIcY6rwerBenvLb4ZE/Q5IKYt8vsJDVrPBfc/azINAkvW5vzIwFcR/8UgcPN13Qc9LeMskJmisK48TaJATyJYDus/BaOTiRMbQV0kaeCsBzBFvEUes69ZdhiyONRS+SbHfgvu52uAbifSD6o3nTq7iWkfrC58vk05IIYasHaoa9IA1noAJuJ1EycPTBun2J+H732DAR/Hrvmg+rHBv9g3b1/6YbheN1MU2sNeFgc/FuQciBjV8PfeantBwYmJ/pq988yuRlHaYwLE2+pvByeLt2raHvCZwt/AB0f9dMekpZECwcnXuxTn/XJsKxR4QzG+Ob5HJPpTTGf2eQT9zJRGvFMGH5z3IelDjQ/si1l4sjxCg41BvoD7XsZhONtP87zCy4WmocBLhzyGiCTHW+xCwUb7dY8GULeG0FtdmI0F2Wd9529YHKsX9QOzl4xZ0oavAcxVqemZnJNzZCyr5mdK/UYmB8RwcZYPyOMSpg1TqjnTEqHwXhwwBn0OfA8OsjfCNx153kYYHEa7Rlhi+cvU/glQEVKkYOVR8j5mYqbn4p99sJWKM7oXLWI+mS6p8pVEaDK9J17Rg5jOmG0bjKMQ8DF6VuJHAWbSr0QgzPi1QcwBxKHAMYPDBBR5TjOYZhGVJ+JAHFUeL0uYftz4Eejfbx1HITxPzDANA+7RqSF/awgI/wM8a0wGZZOloRmonhtre9EqipebmRPeKQkOPLUSsMe58XI+kaisGgStTgpkZZ/2Lr6zJDC6Q4BRAT3+pXXra5DmTDby+2iZOwtQWAHNN8sdSjzls+/bbEN/b1j2jTAjt1bo8XY/Apc8CQXOkiAYM5NodeX5T4Xr2o1e2ynNExx4KhG6m7VvBYE7Bp+A/rRJnQWCQrwTHPSJ/KJwNgYPgO5FD373iAMYNur+5NUmnl49sLR9MA7k8rHMME8Zf8h5/8amw1hxaoftu3zT37sYdPBnBx/eqgcwc32pF6MRM5cnasLLeF7kQIQbf6gNPjySxG+78E/47/tdjqtFZ9A6DmBiJvSGzw6QwbsYmRhskniRpL9aj59xFiRmtVzuxQGTh1n7JyyDNGwDeXHr6oBPDTVSoLOmvX7qoZhFjAjrzv9upFfMbDQiRVMIP7AgvRFv0Dz6ZYof8TZGetbyE7nKdxz5BsRjvVwEI1wS8Oas0nPn9uTi38AKkyWEQYa5/BDW8o27586TJZkIZSD+iM1qEPiOw75j7KdAwiSTDiWXBFE+roZVlYADXinNIEZsN+tlgvA9DmxnUAkS3vHiGYNV4H7Ol38I+i0F0vs5CcTb5+H8tMfeAsqdnFPDXB0R5u7it849swXPeoMDQWNmgHiobRzHrcF9P+ShTf3NYadm8kvx3WS+EWSeh/P8+owbhomf7cxbyXDiLcjuWYVj5s1Xez3rlW92/KjrzejvjJk0O1iLXPOq3pns30t7EhyQOoVyTbYMB/TsTLMUShXDU2W9l20zy6k+BfTE/B9XfpoPLQWiKpHYmKzALjEc5RWC9LDOHU0OwBsgGFlNbA/NgVWy1/S+RVRmaduq3mv6dPqx1Hd7/FhzyA8m4/jXgwPLheBi3f22gPedNT4gfWHLW5k3cqEkczJfun0qIVnVf4cAH0X/nsZ6EPYZDgi9jXWTM1Y9bkXOAcvYdoMDZnvca83xU30ytfP1O8rZzH8vjjc0PAUSiDSTnwwHMDFjoSC9JEDPlFY4MB3Z+CB3ObCN5s1W5yemn8067vT9Mo63NYfUBaBXBici5/sqXtrjeLLoANzTHFi1yQQW25I0mNiddvwCuL+Zxvwu9Isq+z/CrvaE449ihdkrVBotAQoVB9j973GgJAexBlzw4onQEYymJ/kld9s+LHdKvua3oD9jn1gD5JIfedJ4iQNw9fbPAVnJzBIHYh+cGcQDtG2g9Zl8zNf/uSnH3pifI0P7PsCUA+Cb5TlWdM0cnWn94AAblyumLnYlF4pdu+jxIb1NgxmLfktSMTV4/I535kP+n2Af9PAMZnFAb/Cb2HUHPNXOzxCZXYph5BTfIDlIHATm4J6xNEUDFc0+6zutLOijfPj0aPw5gAV6+WhsShIYxHh8SRBwYDIZa5TIx0+DCbH0MisX3wnafD/B+I2A/uatz+rCGiCf/NhfG1jhgKHb44DfWjJ9HZjKQax7zSNAq2varIF+3SvfAeXNwfPVO/fN93XOAiUcfyWsSCGeayLsep5b6fc4EKDWNuA2QRzw2OJGgNBmAQFWKPsUTMOk60HUPsWceErq+wDVkEXi7q0ZjAUAteeD2Df19R7Wx5AJDrjYjVtPkziSqNHMJlsTsutB5/3bwfcDxzm07w+WBJnNouA4XZREwYJXjhtjAG8c3zdPW4Xzy2Y4cczRn0Ron2KFM7dHQPYF4P4uFl0RgCFbeG4f9LbfXddM0qEcB+CAL+61jO/gvutKcfel/ZzHsbXQ5NP1EXQ+zqigeoDk8bXydn9JQKvVcvyVkkR3wQrcm1I2rgDdHM1snZ+xCUcoykxbfsqh5u74PB9+XlNgKczkNqgLdB0WwEFWAHFEIhMHYCiNn69qlk9xIEK5796GJo4kjtn8A3Oo9VHoPOuVf8IISwMeYoEL8etu1JdzvFbSKnKY4fVh0MZbK8s55uODaezZZxBc7DXxsg0Msu158ewHzG/3fT58rsveCNNe/DQoxbq5LIYRJR5fEsTK6RcJYn1RTa7zxmxzxgGreaOFD+keB25CMDtUYpKfwOvjo6knwRYHuu/3PL3cKaLGYihzBFOjRu7KVQ64R9+mD6Fm/jvr4B2yfcSn+kFg446flpNNz0YMWj1GraVANgdaU18x9y5XLgRFg2CFABVJxDR4R1lyHNDOXpvPvfjU1S06+LhKCfMTAPpDyPAgl4RspUAU3ArocTqksyPm46EYBU4bfQtTA6CgwNbv5ELY34LMWqYfoD7Agef489OIsUGY2IylQHIn1MS9tfC9wgKvIkx+2CycdEjOOr8s9jgAf+Xqh4J5vhsCblSTZg9hdHvAbMf2tvwEkmxHkisFqn1zpqCauT5Fdkt4RjoUrAEKgDBQOJpbcHcII4BObftQGxBfQMMSaCziZWG6HgSejQZ30LmN5o1bOylQReW+v2csOkSccrAGEDFE5zlu5gNLuZv2FEu/4Oyn2J0Gig3HeYcDi8bfIYCHyN8VFg6GXcoBNBooj14JJUQ6FK8B9DGhye9w0SkFGk/Z9MXSu/s/YRwwN1imBnfkfWUuCDzIkG3j3ygfMjXnft1LgZgNHDMzDkBpNhCfDg4lrc/6ch9VU/5s8mTKOkv5aaybL/ZZkn9IFtWxCK4t+698SWCCm/4gCg0FgDoFbXn66MsG4qZcUywz+cpmlkXpTdi5OA56cWpFH/AidDbhnmHjF2mzbfwhGWMRbLn/azXcUGVwACwd0qtkgLWa1TGpxFGiOuUApMuklkWrF+OA9sqbJFFTij6wBI4XWPFol6lyyeCO7Ln5wP0X4/8JJk60Y47hW+E+8P1Jx29kVmImRFMFjhUHiqWEwnq/g3bYoskGStDkKzda49vF46x23Jhzdv43en1IxkUA7v5PuFfq/jPLAMv3244frCMNFHLYOxquLLESzKOLJu3LS6ap3Wvy2fsjuF22hMdbb3ZZMvioPE6D1srPe3Y+NGUVqb+QwWkQonzyheMZvqtOctoEBKyNtKcAsB7KKiwO2Up45k1Thjg2rn1mtC1ho/VmlyWDj8rH8N+FQZ8KHfoQqT+RIVIgQg8xFLuFV8UyK5JmhesFYeL9lgCXxTPYQu2zZg/OwVCm37SlwZcMhLzU5QABLuhGEHf/UPiOlwHgfUXTdf8l0JsGXEPdJNMgDXeCZqH3PH0eVa5BGEaYcgvKD3Lv8dZtg0Be6jIWwdWJA9L9OxwwlwEgZuOetBci0BtfwF3RBHAHZwt7X8iARRnbmFYInnacjhALSbOnmPOI2dRyqddT8jHSGAJ90/33tOfE98UBYgAwGpgrZrEyRlg9jQsMg0pfT4IVhStpXzMO2GGdw8hDuYe/KYa+AOUHcX9ntGcN7shsG3Q8AiNormSbSKQ6YslLwS2ALn+wZMoBMBrIUJBBvLgjMZNvhAkpD2eNGwZ2LZQvcCBHkqeEbRyvdtxTLhnckcc2KF0JaKGaLj+zDPCAqykB19jmALe3f7hKI56YFWJmZCCKA2hAdxOemAOhPg/ZzSCw10sJj5hNlUsGd+SDwdpaBNO1wfm5s5iAkQ4BUj9uZYUFONVitRocMLtDIp7aFOsusdJOzYnxAqzjpYKP0ZuQXaCWElYH3GhdMnieABAZTiHAJUJfEoxQEKZDtCMbrd/cT4cqBYHmAAadiu6uNKaN7d1N/JnEUGwslv19DriQdajyu4SnWp81yMjj16E7rPtKgAoA8fSzdMj29wHudRMIDUSr6Kurjkb68tnyV2M9C1bFAWFjKveqgcGSze/F/e8kwOW/O+Y6dLhQiafXz4MBgyT9ViMdUk1REt/uUvyqfEFBNqW7EA17T3lHQYwppCg3pk2ie3yv1SkFXZZ6fQH3v5MAoIDuEcBaCYALgNwdYtBP4p4At3cfE52C3gJ0sQxcBPguP4WePaBPObBV3TB4UHi8dapcNTab2lEIwoETcSP54SgHX/jqVa/7O7sW7g1kF1SQ5KQxrVit1XlKIF8lBa4GXwGgvGkbR1pquM/QPG0yDKZLhbB6U3iQABtdtvG9Jx8jpWlQo5s84A8HKkgEcFbDfexKZGiZ9wXPyCtHlQHrRFWj2TXgg3SyZVHIB9Q4DiA+JUmkfOKARkaYYFe9n8nB95R3jLW9HQHMbVCx/8M4ABUo2lBnEWGheDZgTfToPz0BWn1M21WuKf3VWzyZIMzD9EMcMCeToUdWv7UMWBU2WveU92U7AkCthu1FcOuCwP37WL8QQ2RwoCNOeKYcAAc0NzDxbcJUAjG3SI2vd8wm05sxIW+wLWy0bhtkjIMmIwKMdTDdD00sgmG6f2Ipjyf0m4JhUYQCefpfkAp+VRjzu1CDYlUjuJjMceikfXkAX6+jabBXDYQMapMoTxLgWYMNmUWAnuuLLIgui+EtghPuv0LqqVeOcN/MasNNna0QTEyLauHdXdiZLv8pDoSoTRqsVb+SBcWo/Rq+p/KIANTHjywIjAxQKwEmgGVNWlmoAQaLhl7k+k2+kn5IRrEXlF4WB7mQTQlikFcmAR1zA/E6QY3g2oTVjwp7yiUDIWf69urRjzd3sFaaBXFKiAWACX1786fhmEKzcL3p+xkHePfzFtXcS23Vwqu0VcBUvjUaeUsuX10DKGeuq017VVNImm2z4hGDTF9TJr8NCrIYUBzoORJdLlPo68OkDO4FQMOKj/sO2WqFi24WLAkKOEN8x8+oSGaiwb0E936jBRDH3EhvmD4O/U/A/aYykDNm2v5gDl7kP34WBIJ4LTDIFoZdnQ6x1J9s+9SGJCPvbwwcVZ8SgeOXSN3jgAl3R7kaBLJm608VpvptYaN1qvyQDHYYrp0GrUEWhGEDng6ZSb/mQ0/le69LwWXBATZ3E9wxB7xe0yrRROA24W4izOPACjdWDczb6WWD1ysW7phNlUsGQk6aHRTrMDkAaw1AyECFAProbMH4vEF3+qn75ynQsME1ve75TKAbkKIYFXiNwwKMJ529NcJZyApT6V53h4qVU/22sNE6Vd6UvaaDnXQw4wBYggRnHaxDAWDwocNauHzP/Qus20vhdP6zmRqBBaLiG0i0JbaJ5npVta/h+iRZnepjIa/8Gu4DDpzV8X+EiZUASARgywOx/FXbPvQpb8eZnfm0Qbo83L/y90Y6dIMDGnCsyQP0iX7PwO9iXpNmmcHzd0lWp3pP+RQZMnIS6DEHDp3q0DjQvbXOgtAFL+8nxKCBwoC+dv8FpS9zBaOmMr07kSmSepN2/KI6cJBZ/iZZMQsCRtPKNaNMVpPCRutUmZHzQPeq13+QMbw7ANhrAPYYuJGBkiReANBEX0I/5/49eRoWzA3Qws3yHAjAZzfNFrhB0zbc7zMh0AfGS61LBjdlr8r+p3gG+v4nkiJcwtmLLn9H8mNBv7d26OOEclOm3L+Fb/PQBL1111NQijVxv1XMgTklhMEqK4IgMN0pEjNXVzGamKdnHAsbZksGN+Vpk50CQW+GlsYQjAgAz/FzwYM+XdTWzgGM7trlZ/hAP9quL9xGVtMcEFWDEkQzwe4MgpnrnkGyui3sKR+U800Hgz54HFBLArYL1LBoOH4lUOijOXhwT5+B+7UwIQmVMBgv0YsJYJQoSQ60q10VlIDRkTZ5rWJWG3CfmiWrDwqe/AWsZ8yu7wRTDgTo18/COi4HzrigoX/huAxBrATcLH8Kd8ug0JnA6JvigEh1rMUAq7Y7ZmC9gObFYxGBgVfdMKDCVLlkEMhxNT/CoXObCiMLMvIfshMKvhg4hcJtOvTPT5EKhT8O02iu3ZIYBKm/TRI4lAg4wMEXZD5m6h/gUvBEGHi95gbOgDGm7yD+JgdWOz7eJE+DmnFAE4OBPkj9yTq4Ix4k16fr3ar4YKZD05jAcNCpeJqYNmRigQ1FeQx0E9yF3CUGd2wZdNxWetWsUN2mL8hxddqrrQE09DH+AIl+dh6uo9ASOtBxYroLGMQYCY/iwzVT/Qy4C1Mll2MOdOx2/Jmg790neVGIeJMn5pVVd79NH9tM9YFB3OtD8lI1GOTACe5wGQAeCjqgRzoEC4XE8aNhGhzcA/Hc6/cRos0fTxnm91SmHIg+eG5fgphgsYUh3qFECvppg0eqUz0V8q0b8keb5C5QvCUK/jgMxUj9teNHwzco0AsAK8/hOdI5ptgpGgLpMiFGwAFYSgVlF/QxmjOIbwMys8UsKCFjysgAACAASURBVKP0qtt6KuRbk/Ke2Wo1TIG8CECzf7oUthw/Gr67UKxQMIBuPhX2US6XBBzBcHBP5eIsANxkCXaOZFfJZIuDbA1c75pRmszxqtt6U9hTCnmvKUZ5YND+h5hwGYC+BUSq1OX3aulVDA3b8lehAM6S1xCafZtHRIwlDoBzQMsU2QYCeJPE9A3E29fcwc+l1rw+FqbKm3K+SVdNg2MsAEwOkDNCchFMUE5zFYpFc7ELuKHgcueNKlSgQDe9PoWFJobLgf6mkORey71jsDgegmoSBqDjkCl5QA9wHCin+i9D/3NYX8U91bSjEJQG0xRIPP11yMASfWJQRKpDVgUFDN8U6JN0yMr+S8gB2tqxrmUBXypHoFfnTCXirWvQhJWmqf6HQz8P7sAyoynjNCg4DSreFgfGFYvoF7ucFP16X0ghni6RPfd/zqFwpeYAjRKF2F/4I/L4/JTjp7LNByVkqhvXZHVbHwsbrUk537RaFZqD5T/BMoAIoKlOgH7qYs1jDrwJlgCRBQVCu5cQdNwYHGgtDNakwUyKkouEwOsXMo2hbN2pUpsBsvqboV/D1nXofwf3vaoI4C0D+LdkjEdgVrVwf29HAC34/r7OfLyn0b2Yht+lOIkQOJoDpSEIeiiztWsxkPdRxMfg3oN7Eut7yE5WLQIAb/EwmC8A4C+CL49O0C/NYK+Ae/ZC/T17GpBZAPgcuMAXaHD57EJb6acVOn4qx3wY1dzCILjG1ZtA3+bAVLkh6+rUYNr9VJJFMPAG3IwIAMgC4Cw++ntr6S4/3AM9u1zoV2sAKEvBKJMDhWvkMoBrxFvvBYTC/S4FtAF6wYfpfugjJ0Zn9KBC3HoH5Z+D/rPEGNugb+H7zb0gAGIB4ISConaKjGfATQDZHvWwrpMf49bKQEBZYHoSEDpGCY4puB8IAgEZtkBPiaotpdCmKprmHXPKB+VpdarRrWcxUqDOgS5EC4Cz1OtNZ6BvKBegL23AvtsDnvago5+m/iHWS2hQrKS/vy9FvFPKmNncDAIbuF8JC8mqKXjynS4b8s3qqsFRy+X7Rebz5nEABDluCtSUPdXprCiQCwMRAUD01xx7zKnKiztYL9TACwgEl9TAS4SK6q5b6YAx6ONzE8I4ec0ok0JeeQfij9Bgw8DUOItglQJBrYPjFEivB9gCoJHBQHmzpyvjKNvREO8BweKARryZCGk3X1RH2jrMLKUnQCstSthXx9Krar2Z/0zRmVcGcr5pWr2pOegCQMcBYwVcrcG8zZ/zTvqhWBkDnnqK8hEKAtBTvWNGIV6o/1bcmJKh9yvkldFWxhDwICBOUJN33yPDtElcY+VUn1E+YizkfNOegakRyuNNngS/+UbQm0C/nwi6ihkESNNJA82KvvND8/5zEHp2Oo/y1aqkRKGv6jIUQB/KDvc7QSB+QHbvmqzGgqc0bKqjX5FvVpMab6iRAnUmnGvfNwkCEO7fx71EakdgT4HOG3Nn3zkzTav2QB9VObgZJThb6LvGoM+DgAZ3IIB3gW8T5EWxcqo3BU8ZVL+A9Q0mTC3VF2IIB2giBOkoW5kFAaj1rlgYpOAOhf6QEjTnYeDm1fFm+BlRUWSIVwJDtk5PSGSb1YeeBnjVpJCU97rEg6xWTU1S2dYAbSUwFgP6LBBB29iXpKVv9iuv38kwZqCgLPZDTWR7ylKVCw+6t6q5SCjW263xTbEr8K3BHQhmNVCCzyRWetWksCFPW1ehvAH9JTK0bVCyGfruV5L/1DZAjwMVcvFKGkgKpJAdPEaAOmdqLIU5lEvh08ixhb0HVjUOAlLTunb6TdAvbFpVmCWvsXKqN4WpUsi6OjW42T2pmSpbCsQ3Q0UcgBUE0J9qnUXgHgPKA2M917e6ZJXtWvSygcK9Qa2ojAgqYhhV9X6N7lxzVdVmEVXGxDCrS9eMMilMlYGsqxnNI0DfpkfbBdIpEP8DCQKsVDlwAdn5aTY9XxIOfszMSfGrdvAN/aazH1B2DEx/b1bNIIBMECByXsBMKa4ZZUYfGGeUZjWj+Sisp/fq+isFepNtH5ERIV4En8Vx23TnR6Y0RFkprM0xvSsYJUyqoOOS08N2/9QS9tEgCghdPSVz458J3EYYILcOzii3hakSVTZNq55ygxvbQwnlUV+ob5IC8VNAtSc/mGOxNDNjx7Pn97iGY/s/Q+2AmF/FwqDQ0TgfGCvoG9DNOOilpaKE7MVtaBO0ksjgfeeIb33N1mQ1KUyVQp5WTU3SLNkxMwdTedSCWtouUOWhoABNRpPFQAPDZtYubk+UNhmsnEdomAeyvP6UDxT082WD9RBg9KXcMFlBZCGY1UAJrSSs8Cynek/5CPQfZMIn+uJcA7wL+l7Q6fLlUzCM6yV545FoANjnJjRkE9xRzRb6dRZUHD6gQYf9qbWyQQwOERfxsywoUw2uGeV9Qcisau0T5KumZsnyKeUVAfrTAHMdjI4EEgrsPVBuVmjVDyOm4zdR7skijFAs0tcslgF6tTBMNT1Ia/yYTLKCKHEP93nQP4L4jHyzGihN/VL3zAgjBTIiQHPhYwHg3aY/650FCr0kKJ55Zhkgcp4+ICeGMOhm7M/MkehoUCGCj0OrQh4CzfWtdfDGNVk1hakykOOm2NjTeMp890BvNo0UKI4AZ6EY9RhRWmu3o3s7zP2fNLCcMXvCQMeJYwIhmHbzWfff5+dlSiD6YAEQngsyq4ESjnID9Ek+BHK+SVdNjad8xDjQ49oFqm4EAA0CZzUYjrQVrpZJkcOlodSOX9xFoL+b+LgHN2Z/5g6pNoBNCXAD/WRACJlqcI2VUz0Vpkoh55t0NanxlIF+dRzaOo8AEP6R5utmMTMf0rfHhCW4D/cPif5iKWGlRh3NgkUS7pwV9PWLVqEEEaisj3wa6F85AxcrUwJfxZo0ENVtJmxrYv1eF9F61IL6wht4v50I0G01ssOFAb2Zke7T/EeMxLMaquzEKxYxRP5zyWBVKGcvuaeSIsYHDXHzEIRFCV3NYD3JAa8aCxsyIPeFEVjCKEnob+B+o+moPQKUVATogC4ctRQz9E6V9xIjyBK4f6vKVgUY4KauXeOevpbJn0qK+kulZuBMoJbB494A36X1hW+jm7wqHOUO9HNNuuop89APkH2n9Xj3NUAZJyDsCNCq3nCF2Ah9AH22CO5dLCYUMOb1qhkWBCWYk7bWwXINYPl7KIZQJR0fVSqHGWUFt4yvGWVS8JSeTSDr6oOaWB83ZQxKjwD9r/aD0G1NDKRSneD2xhr3rIrDP+a9VOfigR4D/ddK10+E9Ep38kKcUJA8CWc4eL8aXGOl1gc292VdfVCzp88bdJuj5z/jaQD5eiT8/Cczenf8AsZJ6BeKeKKxcyEMv97dMHgiRHctz5nZjn8aChJMAO/iNe1dtRAAPebDhqyrD2r29HkDYXPUgvfrOgU0fiGCn4TrhUI0zoV0zmPaX8qZ1xfCIEPz9CwCdMFcG3B3Lqbt/Zk2QkOrhuAcjti4etWk4Ml5uH+IDHv6TGtgdpzoH4kQJ8BZ3Ay+KIoApf/OoYoA+iqLl/DADgi6yQwFdG06aIDR6h0FpS9UBIQxAgV6vxcXBIgDfAdAj0GfRPwD0Pe3gLY1e/pM69TsSoHeVgoEjoep+z+x5aY9Pu7t0fRkRd4v6NHuytwtoQHNiMyDQ5oSdurfpmfQiTRpJaxqoKRvQqaaFDbkaTWpWVLeaUoaYCyCzzjwQn0bEaCXgVTLWdJtUOpPI8RbSU7hmoFyAn0KdMCIAGittEmeXcMgiVDSP1ooT0QkoVXwvh7QY9ybcE9hvc5tkvK0mtQsKe80JQ26zfF+4f0m+Q85EwFrBQzTYRcU5ft1xFjdTCqcHpQDUlaOv/RWFQpYcmLt8Qt6S0oU6fULN8NMgJUXBddkNRamyvtVU+MpN/TT1iS6qNn1JLhW1MaECrxfwJtgoADixDJvKmDoR//fAPrV3wyF/mDIHhHL+MEcvCdDJeKMGDQFajeNzv/oI3QC+p1aFrgN9FvV4BorbbM2Jf0OX7IKEUJerXrKDYhv43uKftOAR4AyNkDrayT0tLOZBdVWHf/pi0j91ZYLNBN4yDA4QPTnp3gBjsuDEtZ69OxceDToL3KaBWm9sDFBv41+kwNeNRYCOd/U+Y/AJlRu6OOmaWtscDDok4fBAq4shymsWWz7FIJk7eynWZD9VgoOYFTNaNApIR4LMNBzGgwQ05dBZmVQIn4Q1u/YX9c087HOw5nGXlW8gXdkU/PToD81mHY/6gsiCFSMPzkKhwVE6n9W27WfcRh8IOATDDM+htqgfCobBwzcw4gGY+3b5tmpK2gARYPx5+0CKU1HPAQNmrHQj2ubgNTztyVQGkK1WwN5tWpqPOWG/n5rxgDjSXB7FvbWj8B4Kj/GrkA3a0FAR4AKlnBPptt3ftD6g+dCaCjXuIeMBr3J3JKX7hzMxjAojZMa+pDDggtmdenqVWNhQ9bVbc2e/n5r3gY0Bao8AsDa1hyVJtD/6VE6fp5hB2tfUzNkuh4AcW8C92DJD0Cyf7CERD4S5txgr5EoNGHMqph8AGKTHoGNV2Xv1SINVqtJTazfbkoaJG1Os+PNU6BzDQAOAJn6E3yMPR+MbaJaJWEW4gCHe2m3KQT0Ju6LMmPVOuYjNoI0DTpPRDSgbxxV6tgiBLMaKDFTmsJUGcjTKsDcWWDmKadNN1vzNtRSLoLf5+9kkdymb33W9km/cGkKgX7f66RsqZ0MFP1ELuaMe76ubHQW1IEOjCVB4VGCUUWsgPk7onGvZ8v4wEOH5tsSGcTVqw6h+k2hnG/yNEvKadPN1ryNtjzqqxHgXAaAnIIGoJ9htXQf5P9O1cmPDgLQMtGZ/sakAQM0GBnoapLtC7WqWAEzuFsT63cxngY4J0ChhE+hPxQiudr6O5pYv92UNEjamJYHQ//r+mIkyNZ+UQvZ2uTadoFY8uNv9cQa6VxPJd+glL6WQByCD9bDKS3LLSAvHVJ4EojX4J6gvzC6imuyCjWrQCnkaTWpifVx07Q1Y5C08cyMNYCMAArQJzco9CtYBBjGhewoOS7Wm6uBOb6ZCIycZ1wtPhgpENTCV926M8RuIpohd0aRW9D5eIgP4B6APk8Dz8asmpol5bRp2poxSNrElgfd/+lbopVshTIcFABtx7PJdLfn6kf/N7F+f43+BCUmvtZ5cFtIHBjGBJ1sz14/GKatYNHAnJiWhWBWg6tXTQqBPK26mvQKONBnWjMGS2ax5fF+sS/F02NwHTRnCvTCyHwAtvytNPkpV+faT1JooJ+Q8uDLQd/HuDTcxdJXOK76ESzIwtTMgnIz0Uo9Dp0tvaMxzxX0m5heQv8G9JeUd5qSBo9bthSIPAroWB1PdgFUvIFXgz7aWpkiXl5x0UDGgWpvqMlibUEWAXoBdA07XNBn3ZXvH3MzBW4soC/SHighmqG6xkpTmCo3qqvKO01Jgz3jqSVZBLdlAFQa30fq0L+QTHz/Va1jiUwB1KEfzKk76QEs0SpkeuSB6As3YF3857jJv/OFiPVD4RMQAnn/djiQFJKyriY1e/q4aclm1TJpLLdBz+/EnL3HV9fp/k+DfkcDuk1DeSVwp9A35zSwpZoFmoUxO/RmOVomiNUw+FFQ/xyoODEqZmvuhEY4nuVCXjUWmOwfhJ5WV5WBPm5aslm1XLI/LujTcxBl+LnavOwLwAlC8ospl9cHcfw+9PWcitDUBlPRdCKmMGVnhcb9uNLnZWIHiSKeM8Hcs9Kz0lUqPLL/kxQ8pV1dfAjgKQN93PQ5s71yUPRfC4AX+QrLefO2nD01fYtI4J7JehOp/70l9AcQxSuvQ1+E8pQLQ4y8mu6ZhAKAZfbeSThBEpMJnmBWg6tXpcJUKeRpNamJ9ZnWvE3e7GYvdhTi3fMfsM1NkK2hsSpo0rXbUy9Zun+V+pfXRQNwJHWpNJ/NKEF3MLuZ8rLij97CSJmKzKwkE0T+46T+MG/nVIOrVzWFqTJTTWpifdy0ZJM3e6pX2wVqi+CO9dIWu2fy8wZekL7/FE6syxTI2ecZE32hvJmeefrBMxYHmAaAOBTUr2SfZ7SK5a/5PRhnzpRR4FWhp8Ln0O8hPs+EpObS+7t2U+TlobkH4u2OZy+WAp1PA87Gfvr/3Tgwtnraahho2RENEOA06PueAu5tCh2dDPFkB7OQew3P3SzHCPTKD0QIm2sEtSA2ZBP6Kh1iAs/+oef2A9C/AH1HHzclDTYsH++ovhLZ/DzdhaTwpk/KxH8cf4UCb8/nddFgfJAkCLA9e4L4QRLCCsoEqVGo9TBa1Nsn+xbGZ4MJStZU/A76A3xPob+knDYlDbaNH+lIy/G3iADn0C0CXE++Ghh6JKztn0qvxK5Q99/SfQDlNbJ/uu3TX43w/QUjBeo37tn8GNY7E0oFwpau7B7ddIqaTnQ0nVOxKRH74OpVk0IgT6umxlNOm5IG28Yf6nu8Cy4OvNo5Z7L/cz79pWvfTgOW+WDA3Shk1XtWS3vUUNr9xuZMv40SCogZBb04VlmITAWO+/Fm5L4EI/oK6AdpD1aUT6H/ccf/c6B/s7voe7BzEKd75tuRPe2pAv1oD4Y7P5TvZ+7/ReQTo6+2JUo+W+n7lUDNgNFd49uOA0T2fP9loQIFTe062eh6ANbd9ZvutT5Cg2nV1HjKQJ83uGl/v2NQjDVAad9l6fmP+LFoIwKIIEBz/RepKt9fyqiO9W53+VZYKN3l66POp6H1dExA/5LEysFc/lq4Bxk8EK5Jqrwog/4Y6NvoX4J+3JQ02DZ+pON0HLkLhLb7CeBd2tan+qa8WAMYyc9rbP6c0AeB/shSSJW5f3oKQ31JhWJX0ABkcH1OYcja9xf1EkiLTSErvJg4TqJ/1d8H4P6o1/8C6D+HeFFkBEBDwquRgaG/NNCfRTt+mgWdCU/Lcy6v/7o2Vq90iEKfy4IMNBSMZ2T8e17gSGIPAQSO4yPQzkpAski9yyYZHkS/B/EHvb6hr2FrfpyP9bozFI8AJP+53D/9hsBJibNfz/5hEOBK/fva9+SAYEK/im/ZNlleuzHIfgulAd0yClFVNETCtS+ossgU604E8KqxkJTzmlifad2zvNPlqQFZBEDfdClAOxjX8yJQX6Cff3HHL9L9yxmL6wn3Vr3uS72+igBjv4XkMGwTRkQG32dTf6+THxEKoEYAH40KSQ541aSgq9uO/58E/dUx2S5QxQWg10kAwgGa5Ne+AlYRoLzJUZ9Xq/acR/h+Dv0L3w0Uw6nT/Iesg7szRuveX3zfFzI5wN4gvfDl53/QBtRPf8GFKcRNgG6jP4b7lx3/D4H+xrAHzX/6OvVd8CrS/aMQ6MNAfz8wRHHfkx+UlgX1CCCyIO7+dSI0AgLtFSwDisEBkKokw8xAxxCtFFdzZG3zJfTXiVm+NW/zVK8PDcsiAF4XbtDR36/i3fPRT3F/en2ApTosAgjod/fvJULE8Xdnz/IfxQHAPclMhxJ/4p2V0C/jKYF49zW+vSt4l6QQdDerpsZTJlszBg/2+ujIx99iC6igdPf/GlnQuInn/sHQD+71T7gP3HcmkJsy9099P3+hctHclOgcwEiNClEWjNHoilm+kXV0TEYAWMIU/fkgICZ4lWrY3Ef/Hwf9m4Mf7Bxo+7tOxVElLU7qL64oLRSc+O75T3PkQhawHl5fJD/na+bRYPQi74gBKcWEbmBEAE4G8+1mNBPvk7Uzaw5iTzVsdauzLcvvQ/9Oxy8MTlKgF9CXvy/GgWspLBYAdPMHPDI0318a4kHkngUVzgEUAmvl43tAYPs/GMsAilcKPoFRkKpkNwk4SfeP0PHrshoEPOVqNVAG+rzB4x2/Nv5B90ABvF94ndB/8bDQytj/6ehXac/4Ek2HNYZMgU45cAGXR4DzVdrLAOVizfUAOIZ0PLPJQFvFTEiTEGjVuwozrxooN4bahn7S5qle37/F+FmUKz95obY/0NSolzrcfKnM8V/JDy5nPzIfkESIg/56JZQVaFRR+Q995aVJpTJcUpdv6ukIpvsvAvT6puLuRBMwwVMGYDXjQCCbo3nKQM8M1I7wtPwp0D/L0f9f1NPlvwgBTg6gf00MPP8hwrXvieH1L9wTMtAIAEEGup0v0h4iiB1Sdgq6jERI6Av8XaBeiv1Ja/vA/QfO3tNPR8vL5k09ZaDPGzzSZaM8e5eDbQGduP814kD//PvPXfXTzqXg/P/0rgm1r05eoOG4Z46fCFIvIgAGH+jzWuaMKX8sxw+uoSPEf+D2Wva8uGZCjNQvo/9/oU/L+HHcK//5hfrrWgOcMYHdtvI/tDM/uOSicFQIxKE+YwFcFgEgg0Dnw1XlK12xANCsMLd02F2UWnOGTj54OWYxXvLH0P81x//nQv8sx/m/w5+5/usX6i/gV4sDBaD5D8YzrzMOdN9/pv7oGzhFun+0bZ8oAlAnrVbDNoitzVD6lolYYab1U9//iPvPOGxRvoz+nwn9T99orAF6/nNyYLj/fv/u+MuV/Iz5tc2f0YNs8ohdIPYIjL5IGjEqaeA7MPYaQAtFpv59tKI0opg00HLs/s2Pber1p3HAHHB633iQaesd4zvlCzca/03qyH9+XcsAvDj60b7g0mX6gVUj/xlQshKhKAKAbAFR500QDPChCE/QGaVT/9JeThd0UXcBjJtqQTNhaKz44wmmWWAzbV2iUFy+g/6vcexKgU7/ffn+48qCIPZ/qPvHeKwLst059i5fRKabPyBdigUCsjU02uguUNOMhwnqgWu/0vElu/zvxNCiaaAnrJ+/3gRcEsdJlDyF/n8Y9M9ynP8vankB1P3/au6/Taef9ReOf8i10aAqNDWsX46wEJTo3SGxZUmQSu9ouF6LCcJYV83CmGCFESHIahlrFT0fbxBzWE/WVVPjKadN25Z3ypehf5bj+m8hC17d/R8tBQrcP/1c6+XyWd4P5v6Z4weJAIWN1qyGPY0Deg0gZ8KZABiMWiox68RNUY1ewYBT/f8Q9P8W3PdyjKdgv1AP1ONKgdgHTk890I//BCKHvun+Gdb5Clg/H7jsaYpipRlQZAhQopvcP3Uv+QmpmDBei6OZun9vnmb5Gvr/2dA/y7UGKL8uAuDkwGs81QKu5EfurFeW8OhnXtL9E+ifMsw1gMZcAxxFZ3GwBaUvRW4HTd93bdN9/B5kTcuABkIZ3+JPRP9PgP5ZjtoiADr6D7IAOD/yc5eT/qB5vRw/vUovjnFlW0BdaMP1gGD42sKyIOPgJ732UMANAClnyhSvJkm8FXlmGhvu/89C/8/BfS/HG6gvlKPlP3+RFTDGqYdCftRWop94/Y5iEQSAy9+P5IfSAE4AcX6poVCXTK8YAzJh6xEYrPsKwaya5RH3v3GjZNOSzUb5gdA/y3H90v8v4C/gr7YAaKcb+qPfsxSiHOh/8QP9VhAQiRD6RhDhAOL8xHoezNt51TeLIWLSILDXVdPxrw41tTdbfyD6fyz0z3K8Afwi7v8vlv+MzZ9WSk94iO8HF2jmcwpXtcmlV8EzIlLYYGUkQhSjGmo0FLAm9aDNLq371GEng8AqgvNDLQHrt6D/h0P/LEc917J/Af9qEUDkP+fv157oaQvfgXWS/Q9nT9a+hWQ+HgfAacDwVwZ2mfsvzjLAwejGh/EgEKddNtx/3v776P8joH+WowI4UP9q7r8vACpKJf+LUTv+QLOdnvywIHAW5ajZln9RApqNgK1zfGB016eGTEteivWni3iMoAfRVR2UgmnkbfYodPOmG+UPgv5ZjlpRjub+/2pPANAe/fYX1Ksv8pUAgv7CaXCJYhsUJOnvfKDE6BJfBA+9mZ+QtIc1FZYOed35bQ2llpNBIKaBN1o85uPlqRv9cdA/S4sA/0L911gA9IMPAPf9lSc8xYDdBW4eAcpo40/BhEFTaoQF7lYXLwtKusN8kvOsf/2++38EtX8o9M9yVKD8Czj/jv4f4pHnTVVu8rBsh+QQdLP/KqQqN4JgJ0Xuu0lXsSozYdfClgfUbFLChEfoVz/176Pkf9GfKUcF6r+Af7cV8AnTN/kfLir5az9xNXBc2BUYTBiJEAgNxP3FOjhRNiC458KX+GPwMDel1fwn7/4/Xf506J/lqC/gPy0CtOXvwCWH/vi9NxoHOIiN98VMgUgiNATCE/pHfTMz9h+72h8P6UIIe+uzTAJ9arydxuz1ugnffwb6ARz4BfwH+DfKX2OBO15eZb9xYp5oAHhSRAtPgewiFgCaQmILfyVR0TYe3E29Oc52FvSJ8iF6fLT7jypH/Qv4r7YLBPbct/9SEPvRK7ECFrgnfptBuft74vg1JUQcuGQL7rZn5YHiuoWzN2qWD320S8PuJWzbt1st/yT0Azjwr5YC/QLQUv9+zrn/zg/YlT3ihfLimVTk0XJt2KrvN/Kn2LLqjrN000ctY2PdZBr3b48Gt8DMZtrXLH8cPY76X8B/rg3Q8Suftf26rUiTc68vfo8Ci6pbKxOLJZvjlCZpDpwlqSyWXMgtaNW7er2E4N0O/IXD0XgvSjd5NrFxpsw/+h9WXvjvRoD+Rfh+FoikOoVmLDoUYLxnXpL9WLnzHnM69b+P3rw6VS1EshXcpvcSTfnJV/X3Ty0H/g/wL5Rf7SsvFPq8VCFVgH4wdfxrvHe1XSoZoI1DR65VjdCUhYxfcCn5dK5b0My/8Dkg8IX6cyZdKhfsYrUVb3Cr2DP/3/KxcuC/2/IXLeNXpfaPsKNcgK5yG8WAE8eXGWHOADGBvnn3biB6FXKlMzr/0eiHdYtpW8WVH3ZBdvFcN0lyMoUai456HHNkkTKJBp1B5SfmlT8u76elEaD9144eBz5RvPdUYCmzbPWwEkBElAy2knfPz8qc5yoH9OQDvTDAzCxT/twwVYAD/wYq8Ab+Bv5G/Rv4f5dQ/76UvTr+3qh/4/3G62+83yh/4/X3pSnqD38Dp/BmCEVL9QAAAI9JREFUwvXzcm/g3Rz8G7U1nXLpTRW14v3G6xTqJZR2PTXn9ayWphnfLGut4g90ySOU9YokBUN5aXrVvNZxBQFZX50bG2XVkTVGze82zL7wsAx08gL/qeWFf/NVL+wFQGH/qPLcm/Tg2/2TPzlzbj95wv/U8mJfgQfzVPLzuP35bAyQ7/IPQ88/7OX82PL/AWvoH5jBiy2hAAAAAElFTkSuQmCC';

      this.__system._defaultDummyTexture = this.createTexture(dummyWhite1x1ImageDataUrl, "GLBoost_dummyWhite1x1Texture");
      var defaultDummyTextureCube = this.createCubeTexture();
      defaultDummyTextureCube.userFlavorName = "GLBoost_dummyWhite1x1TextureCube";
      defaultDummyTextureCube.generateTextureFromSixSideImages([dummyWhite1x1ImageDataUrl], [dummyWhite1x1ImageDataUrl], [dummyWhite1x1ImageDataUrl], [dummyWhite1x1ImageDataUrl], [dummyWhite1x1ImageDataUrl], [dummyWhite1x1ImageDataUrl]);
      this.__system._defaultDummyTextureCube = defaultDummyTextureCube;
      this.__system._brdfLutTexture = this.createTexture(pbrCookTorranceBrdfLutDataUrl, "GLBoost_brdfLutTexture");

      this.__system._defaultMaterial = this.createClassicMaterial();
      this.__system._defaultMaterial.userFlavorName = 'GLBoostSystemDefaultMaterial';

      this.restoreGlobalStatesToDefault();
    }

    babelHelpers.createClass(GLBoostLowContext, [{
      key: '_setName',
      value: function _setName() {
        this.constructor._instanceCount = typeof this.constructor._instanceCount === 'undefined' ? 0 : this.constructor._instanceCount + 1;
        this._instanceName = this.constructor.name + '_' + this.constructor._instanceCount;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this._instanceName;
      }
    }, {
      key: 'createGeometry',
      value: function createGeometry() {
        return new Geometry(this.__system);
      }
    }, {
      key: 'createBlendShapeGeometry',
      value: function createBlendShapeGeometry() {
        return new BlendShapeGeometry(this.__system);
      }
    }, {
      key: 'createCube',
      value: function createCube(widthVector, vertexColor) {
        return new Cube(this.__system, widthVector, vertexColor);
      }
    }, {
      key: 'createPlane',
      value: function createPlane(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat) {
        return new Plane(this.__system, width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat);
      }
    }, {
      key: 'createSphere',
      value: function createSphere(radius, widthSegments, heightSegments, vertexColor) {
        return new Sphere(this.__system, radius, widthSegments, heightSegments, vertexColor);
      }
    }, {
      key: 'createAxis',
      value: function createAxis(length) {
        return new Axis(this.__system, length);
      }
    }, {
      key: 'createParticle',
      value: function createParticle(centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint) {
        return new Particle(this.__system, centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint);
      }
    }, {
      key: 'createClassicMaterial',
      value: function createClassicMaterial() {
        return new ClassicMaterial$1(this.__system);
      }
    }, {
      key: 'createPBRMetallicRoughnessMaterial',
      value: function createPBRMetallicRoughnessMaterial() {
        return new PBRMetallicRoughnessMaterial(this.__system);
      }
    }, {
      key: 'createPerspectiveCamera',
      value: function createPerspectiveCamera(lookat, perspective) {
        return new L_PerspectiveCamera(this.__system, true, lookat, perspective);
      }
    }, {
      key: 'createFrustumCamera',
      value: function createFrustumCamera(lookat, perspective) {
        return new L_FrustumCamera(this.__system, true, lookat, perspective);
      }
    }, {
      key: 'createOrthoCamera',
      value: function createOrthoCamera(lookat, ortho) {
        return new L_OrthoCamera(this.__system, true, lookat, ortho);
      }
    }, {
      key: 'createCameraController',
      value: function createCameraController(options) {
        return new L_CameraController(this.__system, options);
      }
    }, {
      key: 'createWalkThroughCameraController',
      value: function createWalkThroughCameraController(options) {
        return new L_WalkThroughCameraController(this.__system, options);
      }
    }, {
      key: 'createTexture',
      value: function createTexture(src, userFlavorName) {
        var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        return new Texture(this.__system, src, userFlavorName, parameters);
      }
    }, {
      key: 'createPhinaTexture',
      value: function createPhinaTexture(width, height, fillStyle) {
        var parameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        return new PhinaTexture(this.__system, width, height, fillStyle, parameters);
      }
    }, {
      key: 'createCubeTexture',
      value: function createCubeTexture(userFlavorName, parameters) {
        return new CubeTexture(this.__system, userFlavorName, parameters);
      }
    }, {
      key: 'createScreen',
      value: function createScreen(screen, customVertexAttributes) {
        return new Screen(this.__system, screen, customVertexAttributes);
      }
    }, {
      key: 'createTexturesForRenderTarget',
      value: function createTexturesForRenderTarget(width, height, textureNum) {
        var glContext = this.__system._glContext;
        var gl = glContext.gl;

        var glem = GLExtensionsManager.getInstance(glContext);

        var fbo = glContext.createFramebuffer(this.__system);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        fbo.width = width;
        fbo.height = height;
        fbo._glboostTextures = [];

        for (var i = 0; i < textureNum; i++) {
          var texture = new MutableTexture(this.__system, fbo.width, fbo.height);
          texture.fbo = fbo;
          fbo._glboostTextures.push(texture);
        }

        var renderBuffer = glContext.createRenderbuffer(this.__system);
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbo.width, fbo.height);
        fbo.renderBuffer = renderBuffer;

        fbo._glboostTextures.forEach(function (texture, i) {
          var glTexture = texture.glTextureResource;
          var attachimentId = glem.colorAttachiment(gl, i);
          texture.colorAttachment = attachimentId;
          gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);
        });
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);

        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return fbo._glboostTextures.concat();
      }
    }, {
      key: 'createDepthTexturesForRenderTarget',
      value: function createDepthTexturesForRenderTarget(width, height) {
        var glContext = this.__system._glContext;

        var gl = glContext.gl;

        var glem = GLExtensionsManager.getInstance(glContext);

        var fbo = glContext.createFramebuffer(this.__system);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        fbo.width = width;
        fbo.height = height;

        var format = gl.DEPTH_COMPONENT;
        var internalFormat = gl.DEPTH_COMPONENT;
        var type = gl.UNSIGNED_INT;
        if (GLBoost$1.isThisGLVersion_2(gl)) {
          type = gl.UNSIGNED_INT;
          format = gl.DEPTH_COMPONENT;
          internalFormat = gl.DEPTH_COMPONENT24;
        } else if (glem.extDepthTex) {
          type = glem.extDepthTex.UNSIGNED_INT_24_8_WEBGL;
          format = gl.DEPTH_STENCIL;
          internalFormat = gl.DEPTH_STENCIL;
        }

        var depthTexture = new MutableTexture(this.__system, fbo.width, fbo.height, 0, internalFormat, format, type, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
        depthTexture.fbo = fbo;
        depthTexture.userFlavorName = 'DepthTexture_' + fbo.width + 'x' + fbo.height;

        var glTexture = depthTexture.glTextureResource;
        var attachimentId = gl.DEPTH_ATTACHMENT;
        if (GLBoost$1.isThisGLVersion_2(gl)) {
          attachimentId = gl.DEPTH_ATTACHMENT;
        } else if (glem.extDepthTex) {
          attachimentId = gl.DEPTH_STENCIL_ATTACHMENT;
        }
        depthTexture.depthAttachment = attachimentId;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachimentId, gl.TEXTURE_2D, glTexture, 0);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return depthTexture;
      }
    }, {
      key: 'reflectGlobalGLState',
      value: function reflectGlobalGLState() {
        var gl = this.__system._glContext.gl;

        this.currentGlobalStates.forEach(function (state) {
          gl.enable(state);
        });

        gl.depthFunc(gl.LEQUAL);

        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clearDepth(1);
        gl.clearStencil(0);
      }
    }, {
      key: 'disableAllGLState',
      value: function disableAllGLState() {
        var states = [3042, 2884, 2929, 32823, 32926];

        var glContext = this.__system._glContext;
        var gl = glContext.gl;

        states.forEach(function (state) {
          gl.disable(state);
        });
      }
    }, {
      key: 'restoreGlobalStatesToDefault',
      value: function restoreGlobalStatesToDefault() {
        this.__system._currentGlobalStates = this.__system._defaultGlobalStates.concat();
      }
    }, {
      key: 'setPropertiesFromJson',
      value: function setPropertiesFromJson(arg) {
        var queryType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME;

        var json = arg;
        if (typeof arg === "string") {
          json = JSON.parse(arg);
        }
        if (!json.targetUserFlavorName) {
          console.warn('Faild! This json doesn\'t include targetInstanceName field!');
          return;
        }
        var objects = null;
        if (queryType === GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME) {
          objects = this.__system._glBoostMonitor.getGLBoostObjectsByUserFlavorName(json.targetUserFlavorName);
        } else if (queryType === GLBoost$1.QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR) {
          var found = this.__system._glBoostMonitor.getGLBoostObject(json.targetInstanceName);
          if (found != null && found.userFlavorName === json.targetUserFlavorName) {
            objects = [found];
          } else {
            objects = [];
          }
        } else {
          var _found = this.__system._glBoostMonitor.getGLBoostObject(json.targetInstanceName);
          objects = [_found];
        }

        objects.forEach(function (obj) {
          obj.setPropertiesFromJson(json);
        });

        return objects;
      }
    }, {
      key: 'defaultDummyTexture',
      get: function get() {
        return this.__system._defaultDummyTexture;
      }
    }, {
      key: 'defaultDummyTextureCube',
      get: function get() {
        return this.__system._defaultDummyTextureCube;
      }
    }, {
      key: 'brdfLutTexture',
      get: function get() {
        return this.__system._brdfLutTexture;
      }
    }, {
      key: 'glContext',
      get: function get() {
        return this.__system._glContext;
      }
    }, {
      key: 'belongingCanvasId',
      get: function get() {
        return this.__system._glContext.belongingCanvasId;
      }
    }, {
      key: 'globalStatesUsage',
      set: function set(usageMode) {
        this.__system._globalStatesUsage = usageMode;
      },
      get: function get() {
        return this.__system._globalStatesUsage;
      }
    }, {
      key: 'currentGlobalStates',
      set: function set(states) {
        this.__system._currentGlobalStates = states.concat();
      },
      get: function get() {
        return this.__system._currentGlobalStates;
      }
    }, {
      key: 'glBoostMonitor',
      get: function get() {
        return this.__system._glBoostMonitor;
      }
    }]);
    return GLBoostLowContext;
  }();


  GLBoost$1['GLBoostLowContext'] = GLBoostLowContext;

  var M_Mesh = function (_M_Element) {
    babelHelpers.inherits(M_Mesh, _M_Element);

    function M_Mesh(glBoostContext, geometry, material) {
      babelHelpers.classCallCheck(this, M_Mesh);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_Mesh.__proto__ || Object.getPrototypeOf(M_Mesh)).call(this, glBoostContext));

      if (geometry) {
        _this.geometry = geometry;
      }
      if (material) {
        _this.material = material;
      }
      _this._transformedDepth = 0;
      _this._outlineGizmo = null;
      _this._isPickable = true;
      return _this;
    }

    babelHelpers.createClass(M_Mesh, [{
      key: 'prepareToRender',
      value: function prepareToRender(expression, existCamera_f, lights) {
        this._geometry.prepareToRender(expression, existCamera_f, lights, this._material, this);
      }
    }, {
      key: 'draw',
      value: function draw(data) {
        this._geometry.draw({
          expression: data.expression,
          lights: data.lights,
          camera: data.camera,
          scene: data.renderPass.scene,
          renderPassIndex: data.renderPassIndex,
          mesh: this,
          viewport: data.viewport,
          isWebVRMode: data.isWebVRMode,
          webvrFrameData: data.webvrFrameData,
          forceThisMaterial: data.forceThisMaterial
        });
      }
    }, {
      key: 'bakeTransformToGeometry',
      value: function bakeTransformToGeometry() {
        var positions = this._geometry._vertices.position;
        var mat = this.worldMatrix;
        var componentN = this._geometry._vertices.components.position;
        var length = positions.length / componentN;
        for (var i = 0; i < length; i++) {
          var posVector4 = new Vector4$1(positions[i * componentN], positions[i * componentN + 1], positions[i * componentN + 2], 1);
          var transformedPosVec = mat.multiplyVector(posVector4);
          positions[i * componentN] = transformedPosVec.x;
          positions[i * componentN + 1] = transformedPosVec.y;
          positions[i * componentN + 2] = transformedPosVec.z;
          if (componentN > 3) {
            positions[i * componentN + 3] = transformedPosVec.w;
          }
        }
        this._geometry._vertices.position = positions;

        if (this._geometry._vertices.normal) {
          var normals = this._geometry._vertices.normal;
          length = normals.length / 3;
          for (var _i = 0; _i < length; _i++) {
            var normalVector3 = new Vector3(normals[_i * 3], normals[_i * 3 + 1], normals[_i * 3 + 2]);
            var transformedNormalVec = this.normalMatrix.multiplyVector(normalVector3).normalize();
            normals[_i * 3] = transformedNormalVec.x;
            normals[_i * 3 + 1] = transformedNormalVec.y;
            normals[_i * 3 + 2] = transformedNormalVec.z;
          }
          this._geometry._vertices.normal = normals;
        }
      }
    }, {
      key: 'bakeInverseTransformToGeometry',
      value: function bakeInverseTransformToGeometry() {
        var positions = this._geometry._vertices.position;
        var invMat = this.inverseWorldMatrix;
        var componentN = this._geometry._vertices.components.position;
        var length = positions.length / componentN;
        for (var i = 0; i < length; i++) {
          var posVector4 = new Vector4$1(positions[i * componentN], positions[i * componentN + 1], positions[i * componentN + 2], 1);
          var transformedPosVec = invMat.multiplyVector(posVector4);
          positions[i * componentN] = transformedPosVec.x;
          positions[i * componentN + 1] = transformedPosVec.y;
          positions[i * componentN + 2] = transformedPosVec.z;
          if (componentN > 3) {
            positions[i * componentN + 3] = transformedPosVec.w;
          }
        }
        this._geometry._vertices.position = positions;

        var mat = this.worldMatrix;
        if (this._geometry._vertices.normal) {
          var normals = this._geometry._vertices.normal;
          length = normals.length / 3;
          for (var _i2 = 0; _i2 < length; _i2++) {
            var normalVector3 = new Vector3(normals[_i2 * 3], normals[_i2 * 3 + 1], normals[_i2 * 3 + 2]);
            var invNormalMat = new Matrix33(Matrix44$1.invert(mat).transpose().invert());
            var transformedNormalVec = invNormalMat.multiplyVector(normalVector3).normalize();
            normals[_i2 * 3] = transformedNormalVec.x;
            normals[_i2 * 3 + 1] = transformedNormalVec.y;
            normals[_i2 * 3 + 2] = transformedNormalVec.z;
          }
          this._geometry._vertices.normal = normals;
        }
      }
    }, {
      key: '_copyMaterials',
      value: function _copyMaterials() {
        if (this.geometry._indicesArray.length !== this.geometry._materials.length) {
          for (var i = 0; i < this.geometry._indicesArray.length; i++) {
            this.geometry._materials[i] = this._material;
            this.geometry._materials[i].setVertexN(this.geometry, this.geometry._indicesArray[i].length);
          }
        }
      }
    }, {
      key: 'merge',
      value: function merge(meshOrMeshes) {
        if (Array.isArray(meshOrMeshes)) {
          this.bakeTransformToGeometry();

          var meshes = meshOrMeshes;
          var geometries = [];
          for (var i = 0; i < meshes.length; i++) {
            meshes[i].bakeTransformToGeometry();
            geometries.push(meshes[i].geometry);
          }

          this.geometry.merge(geometries);

          for (var _i3 = 0; _i3 < meshes.length; _i3++) {
            delete meshes[_i3];
          }

          this._copyMaterials();

          this.bakeInverseTransformToGeometry();
        } else {
          var mesh = meshOrMeshes;
          mesh.bakeTransformToGeometry();
          this.bakeTransformToGeometry();
          this.geometry.merge(mesh.geometry);

          this._copyMaterials();

          this.bakeInverseTransformToGeometry();
        }
      }
    }, {
      key: 'mergeHarder',
      value: function mergeHarder(meshOrMeshes) {

        if (Array.isArray(meshOrMeshes)) {

          this.bakeTransformToGeometry();

          var meshes = meshOrMeshes;
          var geometries = [];
          for (var i = 0; i < meshes.length; i++) {
            meshes[i].bakeTransformToGeometry();
            geometries.push(meshes[i].geometry);
          }

          this.geometry.mergeHarder(geometries);

          for (var _i4 = 0; _i4 < meshes.length; _i4++) {
            delete meshes[_i4];
          }

          this.bakeInverseTransformToGeometry();
        } else {
          var mesh = meshOrMeshes;
          mesh.bakeTransformToGeometry();
          this.bakeTransformToGeometry();
          this.geometry.mergeHarder(mesh.geometry);

          this.bakeInverseTransformToGeometry();
        }
      }
    }, {
      key: 'calcTransformedDepth',
      value: function calcTransformedDepth(camera) {
        var viewMatrix = camera.lookAtRHMatrix();
        var m_m = null;
        if (this.bindShapeMatrix) {
          m_m = Matrix44$1.multiply(this.worldMatrix, this.bindShapeMatrix);
        } else {
          m_m = this.worldMatrix;
        }
        var mv_m = viewMatrix.multiply(camera.inverseWorldMatrix).multiply(m_m);

        var centerPosition = new Vector4$1(this.geometry.centerPosition);

        var transformedCenterPosition = mv_m.multiplyVector(centerPosition);

        this._transformedDepth = transformedCenterPosition.z;
      }
    }, {
      key: 'getAppropriateMaterials',
      value: function getAppropriateMaterials() {
        return this.geometry._getAppropriateMaterials(this);
      }
    }, {
      key: 'rayCast',
      value: function rayCast(arg1, arg2, camera, viewport) {
        var origVecInLocal = null;
        var dirVecInLocal = null;
        if (arg1 instanceof Vector3 && arg2 instanceof Vector3) {
          var origVecInWorld = arg1;
          var dirVec = arg2;
          var invWorldMatrix = Matrix44$1.invert(this.worldMatrix);
          origVecInLocal = new Vector3(invWorldMatrix.multiplyVector(new Vector4$1(origVecInWorld)));
          var distVecInWorld = Vector3.add(origVecInWorld, dirVec);
          var distVecInLocal = new Vector3(invWorldMatrix.multiplyVector(new Vector4$1(distVecInWorld)));
          dirVecInLocal = Vector3.subtract(distVecInLocal, origVecInLocal).normalize();
        } else {
          var x = arg1;
          var y = arg2;
          var invPVW = Matrix44$1.multiply(camera.projectionRHMatrix(), Matrix44$1.multiply(camera.lookAtRHMatrix(), this.worldMatrix)).invert();
          origVecInLocal = MathClassUtil.unProject(new Vector3(x, y, 0), invPVW, viewport);
          var _distVecInLocal = MathClassUtil.unProject(new Vector3(x, y, 1), invPVW, viewport);
          dirVecInLocal = Vector3.subtract(_distVecInLocal, origVecInLocal).normalize();
        }

        var material = this.getAppropriateMaterials()[0];

        var gl = this._glContext.gl;
        var isCulling = material.states.enable.includes(gl.CULL_FACE);
        var cullMode = IsUtil.exist(material.states.functions.cullFace) ? material.states.functions.cullFace : gl.BACK;

        var isFrontFacePickable = true;
        var isBackFacePickable = true;
        if (isCulling) {
          if (cullMode === gl.FRONT) {
            isFrontFacePickable = false;
          } else if (cullMode === gl.BACK) {
            isBackFacePickable = false;
          } else {
            isFrontFacePickable = false;
            isBackFacePickable = false;
          }
        }
        var result = this.geometry.rayCast(origVecInLocal, dirVecInLocal, isFrontFacePickable, isBackFacePickable);
        var intersectPositionInWorld = null;
        if (result[0]) {
          intersectPositionInWorld = new Vector3(this.worldMatrix.multiplyVector(new Vector4$1(result[0])));
        }
        return [intersectPositionInWorld, result[1]];
      }
    }, {
      key: 'clone',
      value: function clone() {
        var instance = new M_Mesh(this._glBoostSystem, this.geometry, this.material);
        this._copy(instance);

        return instance;
      }
    }, {
      key: '_copy',
      value: function _copy(instance) {
        babelHelpers.get(M_Mesh.prototype.__proto__ || Object.getPrototypeOf(M_Mesh.prototype), '_copy', this).call(this, instance);
        instance._transformedDepth = this._transformedDepth;
      }
    }, {
      key: '_needUpdate',
      value: function _needUpdate() {
        babelHelpers.get(M_Mesh.prototype.__proto__ || Object.getPrototypeOf(M_Mesh.prototype), '_needUpdate', this).call(this);
      }
    }, {
      key: 'geometry',
      set: function set(geometry) {
        this._geometry = geometry;
        geometry._parent = this;
        M_Mesh._geometries[geometry.toString()] = geometry;
      },
      get: function get() {
        return this._geometry;
      }
    }, {
      key: 'material',
      set: function set(material) {
        this._material = material;
      },
      get: function get() {
        return this._material;
      }
    }, {
      key: 'transformedDepth',
      get: function get() {
        return this._transformedDepth;
      }
    }, {
      key: 'isTransparent',
      get: function get() {
        var isTransparent = this._opacity < 1.0 ? true : false;
        isTransparent |= this.geometry.isTransparent(this);
        return isTransparent;
      }
    }, {
      key: 'isTransparentForce',
      set: function set(flg) {
        this._isTransparentForce = flg;
      },
      get: function get() {
        return this._isTransparentForce;
      }
    }, {
      key: 'AABBInWorld',
      get: function get() {
        var world_m = this.worldMatrix;
        return AABB.multiplyMatrix(world_m, this._geometry.rawAABB);
      }
    }, {
      key: 'AABBInLocal',
      get: function get() {
        return this._geometry.rawAABB;
      }
    }, {
      key: 'rawAABBInLocal',
      get: function get() {
        return this._geometry.rawAABB;
      }
    }, {
      key: 'gizmos',
      get: function get() {
        if (this.isOutlineVisible && this.className === 'M_Mesh') {
          return this._gizmos.concat([this._outlineGizmo]);
        } else {
          return this._gizmos;
        }
      }
    }, {
      key: 'isOutlineVisible',
      set: function set(flg) {
        if (flg && this._outlineGizmo === null && this.className === 'M_Mesh') {
          this._outlineGizmo = this._glBoostSystem._glBoostContext.createOutlineGizmo(this);
        }

        if (this._outlineGizmo) {
          this._outlineGizmo.isVisible = flg;
        }
      },
      get: function get() {
        if (this._outlineGizmo === null) {
          return false;
        }
        return this._outlineGizmo.isVisible;
      }
    }, {
      key: 'isVisible',
      set: function set(flg) {
        babelHelpers.set(M_Mesh.prototype.__proto__ || Object.getPrototypeOf(M_Mesh.prototype), 'isVisible', flg, this);
        if (this._outlineGizmo) {
          this._outlineGizmo.isVisible = flg;
        }
      },
      get: function get() {
        return babelHelpers.get(M_Mesh.prototype.__proto__ || Object.getPrototypeOf(M_Mesh.prototype), 'isVisible', this);
      }
    }, {
      key: 'isPickable',
      set: function set(flag) {
        this._isPickable = flag;
      },
      get: function get() {
        return this._isPickable;
      }
    }]);
    return M_Mesh;
  }(M_Element);

  M_Mesh._geometries = {};

  GLBoost$1['M_Mesh'] = M_Mesh;

  var CubeAbsolute = function (_Geometry) {
    babelHelpers.inherits(CubeAbsolute, _Geometry);

    function CubeAbsolute(glBoostContext) {
      babelHelpers.classCallCheck(this, CubeAbsolute);

      var _this = babelHelpers.possibleConstructorReturn(this, (CubeAbsolute.__proto__ || Object.getPrototypeOf(CubeAbsolute)).call(this, glBoostContext));

      var BIG_NUMBER = 999;
      _this._vertexData = _this._setupVertexData(new Vector3(-BIG_NUMBER, -BIG_NUMBER, -BIG_NUMBER), new Vector3(-BIG_NUMBER + 1, -BIG_NUMBER + 1, -BIG_NUMBER + 1));
      _this.setVerticesData(_this._vertexData, [_this._indices]);
      return _this;
    }

    babelHelpers.createClass(CubeAbsolute, [{
      key: '_setupVertexData',
      value: function _setupVertexData(minPosition, maxPosition, vertexColor) {
        this._indices = [3, 1, 0, 2, 1, 3, 4, 5, 7, 7, 5, 6, 8, 9, 11, 11, 9, 10, 15, 13, 12, 14, 13, 15, 19, 17, 16, 18, 17, 19, 20, 21, 23, 23, 21, 22];

        var positions = [new Vector3(minPosition.x, maxPosition.y, minPosition.z), new Vector3(maxPosition.x, maxPosition.y, minPosition.z), new Vector3(maxPosition.x, maxPosition.y, maxPosition.z), new Vector3(minPosition.x, maxPosition.y, maxPosition.z), new Vector3(minPosition.x, minPosition.y, minPosition.z), new Vector3(maxPosition.x, minPosition.y, minPosition.z), new Vector3(maxPosition.x, minPosition.y, maxPosition.z), new Vector3(minPosition.x, minPosition.y, maxPosition.z), new Vector3(minPosition.x, minPosition.y, maxPosition.z), new Vector3(maxPosition.x, minPosition.y, maxPosition.z), new Vector3(maxPosition.x, maxPosition.y, maxPosition.z), new Vector3(minPosition.x, maxPosition.y, maxPosition.z), new Vector3(minPosition.x, minPosition.y, minPosition.z), new Vector3(maxPosition.x, minPosition.y, minPosition.z), new Vector3(maxPosition.x, maxPosition.y, minPosition.z), new Vector3(minPosition.x, maxPosition.y, minPosition.z), new Vector3(maxPosition.x, minPosition.y, minPosition.z), new Vector3(maxPosition.x, minPosition.y, maxPosition.z), new Vector3(maxPosition.x, maxPosition.y, maxPosition.z), new Vector3(maxPosition.x, maxPosition.y, minPosition.z), new Vector3(minPosition.x, minPosition.y, minPosition.z), new Vector3(minPosition.x, minPosition.y, maxPosition.z), new Vector3(minPosition.x, maxPosition.y, maxPosition.z), new Vector3(minPosition.x, maxPosition.y, minPosition.z)];
        if (vertexColor) {
          var colors = [new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w), new Vector4$1(vertexColor.x, vertexColor.y, vertexColor.z, vertexColor.w)];
        }

        var texcoords = [new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0), new Vector2(0.0, 0.0), new Vector2(1.0, 0.0), new Vector2(1.0, 1.0), new Vector2(0.0, 1.0)];

        var normals = [new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, 1), new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0), new Vector3(-1, 0, 0)];

        this._vertexData = {
          position: positions,
          normal: normals,
          texcoord: texcoords
        };

        return this._vertexData;
      }
    }, {
      key: 'update',
      value: function update(minPosition, maxPosition) {
        this._vertexData = this._setupVertexData(minPosition, maxPosition);
        this.updateVerticesData(this._vertexData, [this._indices]);
      }
    }]);
    return CubeAbsolute;
  }(Geometry);


  GLBoost$1["CubeAbsolute"] = CubeAbsolute;

  var M_AABBGizmo = function (_M_Mesh) {
    babelHelpers.inherits(M_AABBGizmo, _M_Mesh);

    function M_AABBGizmo(glBoostContext) {
      babelHelpers.classCallCheck(this, M_AABBGizmo);
      return babelHelpers.possibleConstructorReturn(this, (M_AABBGizmo.__proto__ || Object.getPrototypeOf(M_AABBGizmo)).call(this, glBoostContext, new CubeAbsolute(glBoostContext), new ClassicMaterial$1(glBoostContext)));
    }

    babelHelpers.createClass(M_AABBGizmo, [{
      key: 'updateGizmoDisplay',
      value: function updateGizmoDisplay(minPosition, maxPosition) {
        this.geometry.update(minPosition, maxPosition);
      }
    }]);
    return M_AABBGizmo;
  }(M_Mesh);

  var M_Group = function (_M_Element) {
    babelHelpers.inherits(M_Group, _M_Element);

    function M_Group(glBoostContext) {
      babelHelpers.classCallCheck(this, M_Group);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_Group.__proto__ || Object.getPrototypeOf(M_Group)).call(this, glBoostContext));

      _this._elements = [];
      _this._AABB = new AABB();
      _this._isRootJointGroup = false;

      return _this;
    }

    babelHelpers.createClass(M_Group, [{
      key: 'addChild',
      value: function addChild(element) {
        var isDuplicateOk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        if (isDuplicateOk) {
          var elem = null;
          if (element._parent) {
            elem = element.clone();
          } else {
            elem = element;
          }
          elem._parent = this;
          this._elements.push(elem);
        } else {
          this.removeChild(element);
          element._parent = this;
          this._elements.push(element);
        }
      }
    }, {
      key: 'removeChild',
      value: function removeChild(element) {
        this._elements = this._elements.filter(function (elem) {
          if (elem === element) {
            element._parent = null;
          }
          return elem !== element;
        });
      }
    }, {
      key: 'removeAll',
      value: function removeAll() {
        this._elements = this._elements.filter(function (elem) {
          elem._parent = null;
        });
        this._elements.length = 0;
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return this._elements;
      }
    }, {
      key: 'getAnyJointAsChild',
      value: function getAnyJointAsChild() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var element = _step.value;

            if (element.className === 'M_Joint') {
              return element;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return null;
      }
    }, {
      key: '_setDirtyToAnimatedElement',
      value: function _setDirtyToAnimatedElement(inputName) {
        if (this.hasAnimation(inputName)) {
          this._needUpdate();
        }

        var children = this.getChildren();
        if (children) {
          for (var i = 0; i < children.length; i++) {
            if (children[i]._setDirtyToAnimatedElement != null) {
              children[i]._setDirtyToAnimatedElement(inputName);
            }
          }
        }
      }
    }, {
      key: '_validateByQuery',
      value: function _validateByQuery(object, query, queryMeta) {
        var propertyName = '';
        if (queryMeta.type === GLBoost$1.QUERY_TYPE_INSTANCE_NAME) {
          propertyName = 'instanceName';
        } else if (queryMeta.type === GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME) {
          propertyName = 'userFlavorName';
        } else if (queryMeta.type === GLBoost$1.QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR) {
          propertyName = 'instanceNameWithUserFlavor';
        }

        if (queryMeta.format === GLBoost$1.QUERY_FORMAT_STRING_PERFECT_MATCHING) {
          if (object[propertyName] === query) {
            return object;
          }
        } else if (queryMeta.format === GLBoost$1.QUERY_FORMAT_STRING_PARTIAL_MATCHING) {
          if (object[propertyName].indexOf(query) !== -1) {
            return object;
          }
        } else if (queryMeta.format === GLBoost$1.QUERY_FORMAT_REGEXP) {
          if (object[propertyName].match(query)) {
            return object;
          }
        }
      }
    }, {
      key: 'searchElement',
      value: function searchElement(query) {
        var queryMeta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { type: GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME, format: GLBoost$1.QUERY_FORMAT_STRING_PARTIAL_MATCHING };
        var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;


        if (this._validateByQuery(element, query, queryMeta)) {
          return element;
        }

        if (element instanceof M_Group) {
          var children = element.getChildren();
          for (var i = 0; i < children.length; i++) {
            var hitChild = this.searchElement(query, queryMeta, children[i]);
            if (hitChild) {
              return hitChild;
            }
          }
        }
        return null;
      }
    }, {
      key: 'searchElementByNameAndType',
      value: function searchElementByNameAndType(query, type) {
        var queryMeta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { type: GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME, format: GLBoost$1.QUERY_FORMAT_STRING_PARTIAL_MATCHING };
        var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;

        if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
          return element;
        }

        if (element instanceof M_Group) {
          var children = element.getChildren();
          for (var i = 0; i < children.length; i++) {
            var hitChild = this.searchElementByNameAndType(query, type, queryMeta, children[i]);
            if (hitChild) {
              return hitChild;
            }
          }
        }
        return null;
      }
    }, {
      key: 'searchElementsByNameAndType',
      value: function searchElementsByNameAndType(query, type) {
        var queryMeta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { type: GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME, format: GLBoost$1.QUERY_FORMAT_STRING_PARTIAL_MATCHING };
        var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;

        var resultElements = [];

        if (element instanceof M_Group) {
          var children = element.getChildren();
          for (var i = 0; i < children.length; i++) {
            var hitChildren = this.searchElementsByNameAndType(query, type, queryMeta, children[i]);
            if (hitChildren) {
              resultElements = resultElements.concat(hitChildren);
            }
          }
        }

        if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
          resultElements.push(element);
        }

        return resultElements;
      }
    }, {
      key: 'searchElementsByType',
      value: function searchElementsByType(type) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        if (element instanceof type) {
          return element;
        }

        if (type['name'].indexOf('Gizmo') !== -1 && element instanceof M_Element) {
          var gizmos = element._gizmos;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = gizmos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var gizmo = _step2.value;

              if (gizmo instanceof type) {
                return gizmo;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        if (element instanceof M_Group) {
          var children = element.getChildren();
          var results = [];
          for (var i = 0; i < children.length; i++) {
            var hitChildOrChildren = this.searchElementsByType(type, children[i]);
            if (Array.isArray(hitChildOrChildren)) {
              Array.prototype.push.apply(results, hitChildOrChildren);
            } else if (hitChildOrChildren != null) {
              results.push(hitChildOrChildren);
            }
          }
          return results;
        }
        return null;
      }
    }, {
      key: 'searchGLBoostObjectByNameAndType',
      value: function searchGLBoostObjectByNameAndType(query, type) {
        var queryMeta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { type: GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME, format: GLBoost$1.QUERY_FORMAT_STRING_PARTIAL_MATCHING };
        var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;

        if (element instanceof M_Group) {
          var children = element.getChildren();
          for (var i = 0; i < children.length; i++) {
            var hitChild = this.searchGLBoostObjectByNameAndType(query, type, queryMeta, children[i]);
            if (hitChild) {
              return hitChild;
            }
          }
        }

        if (type.name.indexOf('Gizmo') !== -1 && element instanceof M_Element) {
          var gizmos = element._gizmos;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = gizmos[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var gizmo = _step3.value;

              if (this._validateByQuery(gizmo, query, queryMeta)) {
                return gizmo;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        if (type === L_AbstractMaterial && element instanceof M_Mesh) {
          var materials = element.getAppropriateMaterials();
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = materials[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var material = _step4.value;

              if (this._validateByQuery(material, query, queryMeta)) {
                return material;
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          return null;
        } else if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
          return element;
        }
      }
    }, {
      key: 'searchGLBoostObjectsByNameAndType',
      value: function searchGLBoostObjectsByNameAndType(query, type) {
        var queryMeta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { type: GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME, format: GLBoost$1.QUERY_FORMAT_STRING_PARTIAL_MATCHING };
        var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;

        var objects = [];
        if (element instanceof M_Group) {
          var children = element.getChildren();
          for (var i = 0; i < children.length; i++) {
            var hitChildren = this.searchGLBoostObjectsByNameAndType(query, type, queryMeta, children[i]);
            if (hitChildren.length > 0) {
              objects = objects.concat(hitChildren);
            }
          }
          return objects;
        }

        if (type.name.indexOf('Gizmo') !== -1 && element instanceof M_Element) {
          var gizmos = element._gizmos;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = gizmos[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var gizmo = _step5.value;

              if (this._validateByQuery(gizmo, query, queryMeta)) {
                objects.push(gizmo);
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          return objects;
        }

        if (type === L_AbstractMaterial && element instanceof M_Mesh) {
          var materials = element.getAppropriateMaterials();
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = materials[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var material = _step6.value;

              if (this._validateByQuery(material, query, queryMeta)) {
                objects.push(material);
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          return objects;
        } else if (this._validateByQuery(element, query, queryMeta) && element instanceof type) {
          return [element];
        }
        return objects;
      }
    }, {
      key: 'getStartAnimationInputValue',
      value: function getStartAnimationInputValue(inputLineName) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;


        if (element instanceof M_Group) {
          var latestInputValue = element.getStartInputValueOfAnimation(inputLineName);
          var children = element.getChildren();
          for (var i = 0; i < children.length; i++) {
            var hitChildOrInputValue = this.getStartAnimationInputValue(inputLineName, children[i]);

            if (hitChildOrInputValue instanceof M_Element) {
              var startInputValueOfThisElement = hitChildOrInputValue.getStartInputValueOfAnimation(inputLineName);
              if (startInputValueOfThisElement < latestInputValue) {
                latestInputValue = startInputValueOfThisElement;
              }
            } else {
              var _startInputValueOfThisElement = hitChildOrInputValue;
              if (_startInputValueOfThisElement < latestInputValue) {
                latestInputValue = _startInputValueOfThisElement;
              }
            }
          }

          return latestInputValue;
        }

        return element.getStartInputValueOfAnimation(inputLineName);
      }
    }, {
      key: 'getEndAnimationInputValue',
      value: function getEndAnimationInputValue(inputLineName) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;


        if (element instanceof M_Group) {
          var latestInputValue = element.getEndInputValueOfAnimation(inputLineName);
          var children = element.getChildren();
          for (var i = 0; i < children.length; i++) {
            var hitChildOrInputValue = this.getEndAnimationInputValue(inputLineName, children[i]);

            if (hitChildOrInputValue instanceof M_Element) {
              var endInputValueOfThisElement = hitChildOrInputValue.getEndInputValueOfAnimation(inputLineName);
              if (endInputValueOfThisElement > latestInputValue) {
                latestInputValue = endInputValueOfThisElement;
              }
            } else {
              var _endInputValueOfThisElement = hitChildOrInputValue;
              if (_endInputValueOfThisElement > latestInputValue) {
                latestInputValue = _endInputValueOfThisElement;
              }
            }
          }
          return latestInputValue;
        } else if (!(element.getEndInputValueOfAnimation != null)) {
          return 0;
        }

        return element.getEndInputValueOfAnimation(inputLineName);
      }
    }, {
      key: 'updateAABB',
      value: function updateAABB() {
        var aabb = function mergeAABBRecursively(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            for (var i = 0; i < children.length; i++) {
              var aabb = mergeAABBRecursively(children[i]);
              if (aabb instanceof AABB) {
                elem.AABB.mergeAABB(aabb);
              } else {
                console.assert('calculation of AABB error!');
              }
            }
            return elem.AABB;
          }
          if (elem instanceof M_Mesh) {
            var _aabb = elem.AABBInWorld;

            return _aabb;
          }

          return null;
        }(this);
        this.AABB.mergeAABB(aabb);

        var newAABB = this.AABB;

        this._updateAABBGizmo();

        return newAABB;
      }
    }, {
      key: 'clone',
      value: function clone() {
        var clonedOriginalRootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
        var clonedRootElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var onCompleteFuncs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var instance = new M_Group(this._glBoostSystem);
        if (clonedRootElement === null) {
          clonedRootElement = instance;
        }
        this._copy(instance);

        this._elements.forEach(function (element) {
          if (typeof element.clone !== 'undefined') {
            instance._elements.push(element.clone(clonedOriginalRootElement, clonedRootElement, onCompleteFuncs));
          } else {
            instance._elements.push(element);
          }
        });

        onCompleteFuncs.forEach(function (func) {
          func();
        });

        return instance;
      }
    }, {
      key: '_copy',
      value: function _copy(instance) {
        babelHelpers.get(M_Group.prototype.__proto__ || Object.getPrototypeOf(M_Group.prototype), '_copy', this).call(this, instance);
        instance._AABB = this._AABB.clone();
        instance._isRootJointGroup = this._isRootJointGroup;
      }
    }, {
      key: '_updateAABBGizmo',
      value: function _updateAABBGizmo() {
        var world_m = this.worldMatrix;
        var aabbInWorld = AABB.multiplyMatrix(world_m, this._AABB);
      }
    }, {
      key: 'readyForDiscard',
      value: function readyForDiscard() {
        var collectElements = function collectElements(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            for (var i = 0; i < children.length; i++) {
              collectElements(children[i]);
            }
          } else if (elem instanceof M_Element) {
            elem.readyForDiscard();
          } else {
            if ((typeof EffekseerElement === 'undefined' ? 'undefined' : babelHelpers.typeof(EffekseerElement)) !== undefined && elem instanceof EffekseerElement) {
              console.log('Nothing to do for discarding at this time.');
            }
            console.error('not M_Group nor M_Element');
          }
        };
        collectElements(this);

        this.removeAll();
      }
    }, {
      key: 'rayCast',
      value: function rayCast(arg1, arg2, camera, viewport) {
        var meshes = this.searchElementsByType(M_Mesh);
        var currentShortestT = Number.MAX_VALUE;
        var currentShortestIntersectedPosVec3 = null;
        var selectedMesh = null;
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = meshes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var mesh = _step7.value;

            if (!mesh.isVisible) {
              continue;
            }
            if (!mesh.isPickable) {
              continue;
            }
            var result = null;
            if (arg1 instanceof Vector3 && arg2 instanceof Vector3) {
              result = mesh.rayCast(arg1, arg2, camera);
            } else {
              result = mesh.rayCast(arg1, arg2, camera, viewport);
            }
            if (result === null) {
              return [null, null];
            }
            var t = result[1];
            if (t < currentShortestT) {
              currentShortestT = t;
              currentShortestIntersectedPosVec3 = result[0];
              selectedMesh = mesh;
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        return [currentShortestIntersectedPosVec3, currentShortestT, selectedMesh];
      }
    }, {
      key: '_needUpdate',
      value: function _needUpdate() {
        babelHelpers.get(M_Group.prototype.__proto__ || Object.getPrototypeOf(M_Group.prototype), '_needUpdate', this).call(this);

        var collectElements = function collectElements(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            for (var i = 0; i < children.length; i++) {
              collectElements(children[i]);
            }
          } else if (elem instanceof M_Mesh) {
            if (elem._outlineGizmo) {
              elem._outlineGizmo.updateMatrix(elem);
            }
          }
        };
        collectElements(this);
      }
    }, {
      key: 'AABB',
      get: function get() {
        return this._AABB;
      }
    }, {
      key: 'isVisible',
      set: function set(flg) {
        var collectVisibility = function collectVisibility(elem) {
          elem._isVisible = flg;
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            children.forEach(function (child) {
              collectVisibility(child);
            });
          }
        };
        collectVisibility(this);
      },
      get: function get() {
        return this._isVisible;
      }
    }]);
    return M_Group;
  }(M_Element);

  var singleton$3 = Symbol();

  var M_GLBoostMonitor = function (_L_GLBoostMonitor) {
    babelHelpers.inherits(M_GLBoostMonitor, _L_GLBoostMonitor);

    function M_GLBoostMonitor(enforcer) {
      babelHelpers.classCallCheck(this, M_GLBoostMonitor);
      return babelHelpers.possibleConstructorReturn(this, (M_GLBoostMonitor.__proto__ || Object.getPrototypeOf(M_GLBoostMonitor)).call(this, enforcer));
    }

    babelHelpers.createClass(M_GLBoostMonitor, [{
      key: 'getGLBoostObjectsFromArgument',
      value: function getGLBoostObjectsFromArgument(arg) {
        var objects = [];
        if (typeof arg === 'undefined') {
          objects = this._glBoostObjects;
        } else if (typeof arg === "string") {
          for (var key in this._glBoostObjects) {
            if (this._glBoostObjects.hasOwnProperty(key) && this._glBoostObjects[key].userFlavorName === arg) {
              objects.push(this._glBoostObjects[key]);
              break;
            }
          }
        } else {
          if (arg instanceof GLBoostObject) {
            objects = [arg];
          }
        }

        return objects;
      }
    }, {
      key: 'getMMeshes',
      value: function getMMeshes(glBoostObjects) {
        var meshes = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = glBoostObjects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var object = _step.value;

            if (object instanceof M_Mesh) {
              meshes.push(object);
            } else if (object instanceof M_Group) {
              meshes = meshes.concat(object.searchElementsByType(GLBoost$1.M_Mesh));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        meshes = meshes.filter(function (mesh, i, self) {
          return self.indexOf(mesh) === i;
        });

        return meshes;
      }
    }, {
      key: 'getTriangleCount',
      value: function getTriangleCount(userFlavorNameOrGLBoostObject) {
        var objects = this.getGLBoostObjectsFromArgument(userFlavorNameOrGLBoostObject);
        var meshes = this.getMMeshes(objects);
        var count = 0;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = meshes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var mesh = _step2.value;

            count += mesh.geometry.getTriangleCount(mesh);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return count;
      }
    }, {
      key: 'getVertexCount',
      value: function getVertexCount(userFlavorNameOrGLBoostObject) {
        var objects = this.getGLBoostObjectsFromArgument(userFlavorNameOrGLBoostObject);
        var meshes = this.getMMeshes(objects);
        var count = 0;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = meshes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var mesh = _step3.value;

            count += mesh.geometry.getVertexCount(mesh);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return count;
      }
    }, {
      key: 'getTextureUserFlavorNames',
      value: function getTextureUserFlavorNames(userFlavorNameOrGLBoostObject) {
        var objects = this.getGLBoostObjectsFromArgument(userFlavorNameOrGLBoostObject);
        var meshes = this.getMMeshes(objects);

        var textureUserFlavorNames = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = meshes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var mesh = _step4.value;

            var materials = mesh.geometry._getAppropriateMaterials(mesh);
            for (var i = 0; i < materials.length; i++) {
              var tmpTextureUserFlavorNames = materials[i].getTextureUserFlavorNames();
              textureUserFlavorNames = textureUserFlavorNames.concat(tmpTextureUserFlavorNames);
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        return textureUserFlavorNames;
      }
    }, {
      key: 'getUniqueTextureUserFlavorNames',
      value: function getUniqueTextureUserFlavorNames(userFlavorNameOrGLBoostObject) {
        var textureUserFlavorNames = this.getTextureUserFlavorNames(userFlavorNameOrGLBoostObject);
        textureUserFlavorNames = Array.from(new Set(textureUserFlavorNames));

        return textureUserFlavorNames;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton$3]) {
          this[singleton$3] = new M_GLBoostMonitor(L_GLBoostMonitor._singletonEnforcer);
        }
        return this[singleton$3];
      }
    }]);
    return M_GLBoostMonitor;
  }(L_GLBoostMonitor);


  GLBoost$1['M_GLBoostMonitor'] = M_GLBoostMonitor;

  var Expression = function (_GLBoostObject) {
    babelHelpers.inherits(Expression, _GLBoostObject);

    function Expression(glBoostContext) {
      babelHelpers.classCallCheck(this, Expression);

      var _this = babelHelpers.possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).call(this, glBoostContext));

      _this._renderPasses = [];
      return _this;
    }

    babelHelpers.createClass(Expression, [{
      key: 'addRenderPasses',
      value: function addRenderPasses(renderPasses) {
        var _this2 = this;

        renderPasses.forEach(function (renderPass) {
          renderPass._expression = _this2;
        });

        this._renderPasses = this._renderPasses.concat(renderPasses);
      }
    }, {
      key: 'addRenderPass',
      value: function addRenderPass(renderPass) {
        renderPath._expression = this;
        this._renderPasses.push(renderPass);
      }
    }, {
      key: 'clearRenderPasses',
      value: function clearRenderPasses() {
        this._renderPasses.forEach(function (renderPass) {
          renderPass._expression = null;
        });
        this._renderPasses.length = 0;
      }
    }, {
      key: 'setCurrentAnimationValue',
      value: function setCurrentAnimationValue(inputName, inputValue) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.renderPasses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var renderPass = _step.value;

            if (renderPass.scene) {
              renderPass.scene.setCurrentAnimationValue(inputName, inputValue);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender() {
        var _this3 = this;

        this._renderPasses.forEach(function (renderPass, index) {
          renderPass.prepareToRender(_this3);
        });
      }
    }, {
      key: 'renderPasses',
      get: function get() {
        return this._renderPasses;
      }
    }]);
    return Expression;
  }(GLBoostObject);


  GLBoost$1['Expression'] = Expression;

  var EffekseerElement$1 = function (_M_Element) {
    babelHelpers.inherits(EffekseerElement, _M_Element);

    function EffekseerElement(glBoostContext) {
      babelHelpers.classCallCheck(this, EffekseerElement);

      var _this = babelHelpers.possibleConstructorReturn(this, (EffekseerElement.__proto__ || Object.getPrototypeOf(EffekseerElement)).call(this, glBoostContext));

      _this.__effect = null;
      _this.__handle = null;
      _this.__speed = 1;
      _this.__timer = null;
      return _this;
    }

    babelHelpers.createClass(EffekseerElement, [{
      key: 'load',
      value: function load(uri) {
        var _this2 = this;

        var playJustAfterLoaded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isLoop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        return new Promise(function (resolve, reject) {
          _this2.__effect = effekseer.loadEffect(uri, function () {
            if (playJustAfterLoaded) {
              if (isLoop) {
                _this2.__timer = setInterval(function () {
                  _this2.play();
                }, 500);
              } else {
                _this2.play();
              }
            }
            resolve(_this2);
          });
        });
      }
    }, {
      key: 'cancelLoop',
      value: function cancelLoop() {
        clearInterval(this.__timer);
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        var isLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var __play = function __play() {
          _this3.__handle = effekseer.play(_this3.__effect);
        };

        if (isLoop) {
          this.__timer = setInterval(__play, 200);
        } else {
          __play();
        }
      }
    }, {
      key: 'update',
      value: function update() {
        if (this.__handle != null) {
          var m = this.worldMatrix;
          this.__handle.setLocation(m.m03, m.m13, m.m23);
          var eular = m.toEulerAngles();
          this.__handle.setRotation(eular.x, eular.y, eular.z);
          var scale = m.getScale();
          this.__handle.setScale(scale.x, scale.y, scale.z);
          this.__handle.setSpeed(this.__speed);
        }
      }
    }, {
      key: 'playSpeed',
      set: function set(val) {
        if (this.__handle) {
          this.__handle.setSpeed(val);
        }
        this.__speed = val;
      },
      get: function get() {
        return this.__speed;
      }
    }, {
      key: 'translate',
      set: function set(vec) {
        if (this.__handle) {
          this.__handle.setLocation(vec.x, vec.y, vec.z);
        }
        babelHelpers.set(EffekseerElement.prototype.__proto__ || Object.getPrototypeOf(EffekseerElement.prototype), 'translate', vec, this);
      },
      get: function get() {
        return babelHelpers.get(EffekseerElement.prototype.__proto__ || Object.getPrototypeOf(EffekseerElement.prototype), 'translate', this);
      }
    }, {
      key: 'rotate',
      set: function set(vec) {
        if (this.__handle) {
          this.__handle.setRotation(vec.x, vec.y, vec.z);
        }
        babelHelpers.set(EffekseerElement.prototype.__proto__ || Object.getPrototypeOf(EffekseerElement.prototype), 'rotate', vec, this);
      },
      get: function get() {
        return babelHelpers.get(EffekseerElement.prototype.__proto__ || Object.getPrototypeOf(EffekseerElement.prototype), 'rotate', this);
      }
    }, {
      key: 'scale',
      set: function set(vec) {
        if (this.__handle) {
          this.__handle.setScale(vec.x, vec.y, vec.z);
        }
        babelHelpers.set(EffekseerElement.prototype.__proto__ || Object.getPrototypeOf(EffekseerElement.prototype), 'scale', vec, this);
      },
      get: function get() {
        return babelHelpers.get(EffekseerElement.prototype.__proto__ || Object.getPrototypeOf(EffekseerElement.prototype), 'scale', this);
      }
    }]);
    return EffekseerElement;
  }(M_Element);

  var RenderPass = function (_GLBoostObject) {
    babelHelpers.inherits(RenderPass, _GLBoostObject);

    function RenderPass(glBoostContext) {
      babelHelpers.classCallCheck(this, RenderPass);

      var _this = babelHelpers.possibleConstructorReturn(this, (RenderPass.__proto__ || Object.getPrototypeOf(RenderPass)).call(this, glBoostContext));

      _this._scene = null;
      _this._meshes = [];
      _this._preGizmos = [];
      _this._postGizmos = [];
      _this._opacityMeshes = [];
      _this._transparentMeshes = [];
      _this._effekseerElements = [];
      _this._transparentMeshesAsManualOrder = null;
      _this._drawBuffers = [_this._glContext.gl.NONE];
      _this._clearColor = null;
      _this._clearDepth = null;
      _this._colorMask = null;
      _this._renderTargetColorTextures = [];
      _this._renderTargetDepthTexture = [];
      _this._expression = null;
      _this._viewport = null;
      _this._isRenderTargetAttachedTextures = false;
      _this._isEnableToDraw = true;

      _this._customFunctionWhenPrepareToRender = null;
      _this._customFunctionWhenPreRender = null;
      _this._customFunctionWhenPostRender = null;

      _this._webglStatesAssignDictionaries = [];
      _this._backupWebGLStatesOfMaterials = [];
      _this._shaderParametersAssignDictionaries = [];
      _this._backupShaderParametersOfMaterials = [];
      _this._shaderAssignDictionaries = [];
      _this._backupShadersOfInstances = [];

      _this._newShaderInstance = null;
      _this._oldShaderClass = null;
      _this._backupShaderClassDic = {};

      _this._doPreRender = true;
      _this._doPostRender = true;
      _this._tag = '';

      return _this;
    }

    babelHelpers.createClass(RenderPass, [{
      key: 'specifyRenderTargetTextures',
      value: function specifyRenderTargetTextures(renderTargetTextures) {
        var _this2 = this;

        var gl = this._glContext.gl;

        var colorRenderTargetTextures = renderTargetTextures.filter(function (renderTargetTexture) {
          if (renderTargetTexture.colorAttachment) {
            return true;
          } else {
            return false;
          }
        });

        if (colorRenderTargetTextures.length > 0) {
          this._drawBuffers = [];
          colorRenderTargetTextures.forEach(function (texture) {
            var attachment = texture.colorAttachment;
            _this2._drawBuffers.push(attachment);
          });
          this._renderTargetColorTextures = colorRenderTargetTextures;
        } else {
          this._drawBuffers = [gl.NONE];
        }

        var depthRenderTargetTextures = renderTargetTextures.filter(function (renderTargetTexture) {
          if (renderTargetTexture.depthAttachment) {
            return true;
          } else {
            return false;
          }
        });

        this._renderTargetDepthTexture = depthRenderTargetTextures[0];

        this._isRenderTargetAttachedTextures = true;
      }
    }, {
      key: 'setViewportAsFittingToRenderTarget',
      value: function setViewportAsFittingToRenderTarget() {
        var width = void 0;
        var height = void 0;
        if (this._renderTargetColorTextures.length > 0) {
          width = this._renderTargetColorTextures[0].width;
          height = this._renderTargetColorTextures[0].height;
        }
        if (this._renderTargetDepthTexture) {
          width = this._renderTargetDepthTexture.width;
          height = this._renderTargetDepthTexture.height;
        }
        if (typeof width !== 'undefined' && typeof height !== 'undefined') {
          this._viewport = new Vector4$1(0, 0, width, height);
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'setClearColor',
      value: function setClearColor(color) {
        this._clearColor = color;
      }
    }, {
      key: 'setClearDepth',
      value: function setClearDepth(depth) {
        this._clearDepth = depth;
      }
    }, {
      key: 'setColorMask',
      value: function setColorMask(colorMask) {
        this._colorMask = colorMask;
      }
    }, {
      key: 'setWebGLStatesAssignDictionaries',
      value: function setWebGLStatesAssignDictionaries(dictionaries) {
        this._webglStatesAssignDictionaries = dictionaries;
      }
    }, {
      key: 'setShaderParametersAssignDictionaries',
      value: function setShaderParametersAssignDictionaries(dictionaries) {
        this._shaderParametersAssignDictionaries = dictionaries;
      }
    }, {
      key: 'setShaderAssignDictionaries',
      value: function setShaderAssignDictionaries(dictionaries) {
        this._newShaderInstance = null;
        this._backupShaderClassDic = {};

        this._shaderAssignDictionaries = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = dictionaries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var directory = _step.value;

            var meshes = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = directory.instances[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var instance = _step2.value;

                if (instance instanceof M_Group) {
                  meshes = meshes.concat(instance.searchElementsByType(GLBoost.M_Mesh));
                } else {
                  meshes.push(instance);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            this._shaderAssignDictionaries.push({
              instances: meshes,
              shaderClass: directory.shaderClass
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: '_assignWebGLStates',
      value: function _assignWebGLStates() {
        if (this._webglStatesAssignDictionaries.length === 0) {
          return;
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this._webglStatesAssignDictionaries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var dic = _step3.value;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = dic.materials[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var material = _step4.value;

                this._backupWebGLStatesOfMaterials.push({
                  material: material,
                  states: material.states
                });
                material.states = dic.states;
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }, {
      key: '_restoreWebGLStates',
      value: function _restoreWebGLStates() {
        if (this._backupWebGLStatesOfMaterials.length === 0) {
          return;
        }
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this._backupWebGLStatesOfMaterials[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var dic = _step5.value;

            dic.material.states = dic.states;
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
    }, {
      key: '_assignShaderParameters',
      value: function _assignShaderParameters() {
        if (this._shaderParametersAssignDictionaries.length === 0) {
          return;
        }

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this._shaderParametersAssignDictionaries[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var dic = _step6.value;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = this._meshes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var mesh = _step7.value;

                var materials = mesh.getAppropriateMaterials();
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                  for (var _iterator8 = materials[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var material = _step8.value;

                    this._backupShaderParametersOfMaterials.push({
                      mesh: mesh,
                      shaderParameters: material.shaderParameters
                    });
                    material.shaderParameters = dic.shaderParameters;
                  }
                } catch (err) {
                  _didIteratorError8 = true;
                  _iteratorError8 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                      _iterator8.return();
                    }
                  } finally {
                    if (_didIteratorError8) {
                      throw _iteratorError8;
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }
    }, {
      key: '_restoreShaderParameters',
      value: function _restoreShaderParameters() {
        if (this._backupShaderParametersOfMaterials.length === 0) {
          return;
        }

        for (var i = 0; i < this._backupShaderParametersOfMaterials.length; i++) {
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = this._meshes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var mesh = _step9.value;

              var materials = mesh.getAppropriateMaterials();
              for (var j = 0; j < materials.length; j++) {
                materials[j].shaderParameters = this._backupShaderParametersOfMaterials[i].shaderParameters;
              }
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        }
      }
    }, {
      key: '_assignShaders',
      value: function _assignShaders(existCamera_f, lights) {
        var _this3 = this;

        var assumeThatAllMaterialsAreSame = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (this._shaderAssignDictionaries.length === 0) {
          return;
        }


        if (assumeThatAllMaterialsAreSame) {
          var _loop = function _loop(dic) {
            var _loop2 = function _loop2(_obj) {
              _obj.getAppropriateMaterials().forEach(function (material, index) {
                _this3._backupShadersOfInstances.push({
                  instance: _obj,
                  backupShaderClass: material.shaderClass,
                  backupShaderInstance: material.shaderInstance
                });

                if (_this3._newShaderInstance && material.shaderClass.name !== _this3._oldShaderClass.name) {
                  _this3._newShaderInstance.readyForDiscard();
                  _this3._newShaderInstance = void 0;
                }

                if (!_this3._newShaderInstance) {
                  var glslProgram = _obj.geometry.prepareGLSLProgramAndSetVertexNtoMaterial(_this3.expression, material, existCamera_f, lights, dic.shaderClass);
                  _this3._oldShaderClass = material.shaderClass;
                  _this3._newShaderInstance = material.shaderInstance;
                }
              });
            };

            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
              for (var _iterator11 = dic.instances[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                var _obj = _step11.value;

                _loop2(_obj);
              }
            } catch (err) {
              _didIteratorError11 = true;
              _iteratorError11 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }
              } finally {
                if (_didIteratorError11) {
                  throw _iteratorError11;
                }
              }
            }
          };

          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = this._shaderAssignDictionaries[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              var dic = _step10.value;

              _loop(dic);
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }
        }
      }
    }, {
      key: '_restoreShaders',
      value: function _restoreShaders(existCamera_f, lights) {
        var _this4 = this;

        if (this._backupShadersOfInstances.length === 0) {
          return;
        }

        var _loop3 = function _loop3(dic) {
          dic.instance.getAppropriateMaterials().forEach(function (material, index) {
            var shaderInstance = dic.backupShaderInstance;

            if (!shaderInstance) {
              material.shaderInstance = obj.geometry.prepareGLSLProgramAndSetVertexNtoMaterial(_this4.expression, material, existCamera_f, lights, dic.shaderClass);
            }
          });
        };

        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = this._backupShadersOfInstances[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var dic = _step12.value;

            _loop3(dic);
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
              _iterator12.return();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }
      }
    }, {
      key: 'clearAssignShaders',
      value: function clearAssignShaders() {
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = this._shaderAssignDictionaries[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var dic = _step13.value;

            if (dic._newShaderInstance) {
              dic._newShaderInstance.readyForDiscard();
            }
            dic._newShaderInstance = void 0;
          }
        } catch (err) {
          _didIteratorError13 = true;
          _iteratorError13 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
              _iterator13.return();
            }
          } finally {
            if (_didIteratorError13) {
              throw _iteratorError13;
            }
          }
        }
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender(expression) {
        var _this5 = this;

        var collectElements = function collectElements(elem, elementsType) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            var meshes = [];
            children.forEach(function (child) {
              var childMeshes = collectElements(child, elementsType);
              meshes = meshes.concat(childMeshes);
            });
            return meshes;
          } else if (elem instanceof elementsType) {
            return [elem];
          } else {
            return [];
          }
        };

        this._meshes = [];
        this._preGizmos = [];
        this._postGizmos = [];
        this._effekseerElements = [];
        if (this._scene) {
          this._meshes = collectElements(this._scene, M_Mesh);
        }

        var collectGizmos = function collectGizmos(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            children.forEach(function (child) {
              collectGizmos(child);
            });
          }
          if (elem.gizmos) {
            elem.gizmos.filter(function (gizmo) {
              if (gizmo.isPreDraw) {
                _this5._preGizmos.push(gizmo);
              } else {
                _this5._postGizmos.push(gizmo);
              }
            });
          }
        };
        if (this._scene != null) {
          collectGizmos(this._scene);
        }

        this._opacityMeshes = [];
        this._transparentMeshes = [];
        this._meshes.forEach(function (mesh) {
          if (mesh.isTransparentForce === false) {
            _this5._opacityMeshes.push(mesh);
          } else if (mesh.isTransparentForce === true) {
            _this5._transparentMeshes.push(mesh);
          } else {
            if (!mesh.isTransparent) {
              _this5._opacityMeshes.push(mesh);
            } else {
              _this5._transparentMeshes.push(mesh);
            }
          }
        });

        this._skeletalMeshes = [];
        this._meshes.forEach(function (mesh) {
          if (mesh.instanceName.indexOf('SkeletalMesh') !== -1) {
            _this5._skeletalMeshes.push(mesh);
          }
        });

        if (this._scene) {
          this._effekseerElements = collectElements(this._scene, EffekseerElement$1);
        }

        if (this._scene) {
          this._scene.prepareToRender(expression);
        }

        var camera = this.scene.getMainCamera(this);
        var lights = this.scene.lightsExceptAmbient;
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = this._shaderAssignDictionaries[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var dic = _step14.value;

            var _loop4 = function _loop4(_obj2) {
              var renderSpecificMaterials = [];
              _obj2.getAppropriateMaterials().forEach(function (material, index) {
                var newMaterial = _this5._glBoostSystem._glBoostContext.createClassicMaterial();

                renderSpecificMaterials.push(newMaterial);
              });
              var materials = _obj2.geometry.prepareToRender(_this5.expression, camera ? true : false, lights, null, _obj2, dic.shaderClass, renderSpecificMaterials);
              _obj2.getAppropriateMaterials().forEach(function (material, index) {
                material['renderpassSpecificMaterial_' + _this5.instanceName + '_material_' + index] = materials[index];
              });
            };

            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
              for (var _iterator15 = dic.instances[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                var _obj2 = _step15.value;

                _loop4(_obj2);
              }
            } catch (err) {
              _didIteratorError15 = true;
              _iteratorError15 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                  _iterator15.return();
                }
              } finally {
                if (_didIteratorError15) {
                  throw _iteratorError15;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14.return) {
              _iterator14.return();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }

        if (this._customFunctionWhenPrepareToRender) {
          this._customFunctionWhenPrepareToRender();
        }
      }
    }, {
      key: 'sortTransparentMeshes',
      value: function sortTransparentMeshes(camera) {

        this._transparentMeshes.forEach(function (mesh) {
          mesh.calcTransformedDepth(camera);
        });

        this._transparentMeshes.sort(function (a, b) {
          if (a.transformedDepth < b.transformedDepth) return -1;
          if (a.transformedDepth > b.transformedDepth) return 1;
          return 0;
        });
      }
    }, {
      key: 'preRender',
      value: function preRender(existCamera_f, lights) {
        if (!this.doPreRender) {
          return;
        }

        if (this._customFunctionWhenPreRender) {
          this._customFunctionWhenPreRender();
        }

        this._assignWebGLStates();
      }
    }, {
      key: 'postRender',
      value: function postRender(existCamera_f, lights) {
        if (!this.doPostRender) {
          return;
        }

        if (this._customFunctionWhenPostRender) {
          this._customFunctionWhenPostRender();
        }

        this._restoreWebGLStates();
      }
    }, {
      key: 'tag',
      set: function set(name) {
        this._tag = name;
      },
      get: function get() {
        return this._tag;
      }
    }, {
      key: 'doPreRender',
      get: function get() {
        return this._doPreRender;
      },
      set: function set(flg) {
        this._doPreRender = flg;
      }
    }, {
      key: 'doPostRender',
      get: function get() {
        return this._doPostRender;
      },
      set: function set(flg) {
        this._doPostRender = flg;
      }
    }, {
      key: 'expression',
      get: function get() {
        return this._expression;
      }
    }, {
      key: 'scene',
      set: function set(scene) {
        this._scene = scene;
      },
      get: function get() {
        return this._scene;
      }
    }, {
      key: 'meshes',
      get: function get() {
        return this._meshes;
      }
    }, {
      key: 'opacityMeshes',
      get: function get() {
        return this._opacityMeshes;
      }
    }, {
      key: 'transparentMeshes',
      get: function get() {
        return this._transparentMeshes;
      }
    }, {
      key: 'preGizmos',
      get: function get() {
        return this._preGizmos;
      }
    }, {
      key: 'postGizmos',
      get: function get() {
        return this._postGizmos;
      }
    }, {
      key: 'buffersToDraw',
      get: function get() {
        return this.isRenderTargetAttachedTextures ? this._drawBuffers : [this._glContext.gl.BACK];
      }
    }, {
      key: 'isRenderTargetAttachedTextures',
      set: function set(flg) {
        this._isRenderTargetAttachedTextures = flg;
      },
      get: function get() {
        return this._isRenderTargetAttachedTextures;
      }
    }, {
      key: 'fbo',
      get: function get() {
        if (this._renderTargetColorTextures.length > 0) {
          return this._renderTargetColorTextures[0].fbo;
        } else if (this._renderTargetDepthTexture) {
          return this._renderTargetDepthTexture.fbo;
        } else {
          return null;
        }
      }
    }, {
      key: 'viewport',
      get: function get() {
        return this._viewport;
      },
      set: function set(vec4) {
        this._viewport = vec4;
      }
    }, {
      key: 'renderTargetColorTextures',
      get: function get() {
        return this._renderTargetColorTextures;
      }
    }, {
      key: 'renderTargetDepthTexture',
      get: function get() {
        return this._renderTargetDepthTexture;
      }
    }, {
      key: 'clearColor',
      get: function get() {
        return this._clearColor;
      }
    }, {
      key: 'clearDepth',
      get: function get() {
        return this._clearDepth;
      }
    }, {
      key: 'colorMask',
      get: function get() {
        return this._colorMask;
      }
    }, {
      key: 'customFunctionWhenPrepareToRender',
      set: function set(func) {
        this._customFunctionWhenPrepareToRender = func;
      },
      get: function get() {
        return this._customFunctionWhenPrepareToRender;
      }
    }, {
      key: 'customFunctionWhenPreRender',
      set: function set(func) {
        this._customFunctionWhenPreRender = func;
      },
      get: function get() {
        return this._customFunctionWhenPreRender;
      }
    }, {
      key: 'customFunctionWhenPostRender',
      set: function set(func) {
        this._customFunctionWhenPostRender = func;
      },
      get: function get() {
        return this._customFunctionWhenPostRender;
      }
    }, {
      key: 'isEnableToDraw',
      set: function set(flg) {
        this._isEnableToDraw = flg;
      },
      get: function get() {
        return this._isEnableToDraw;
      }
    }, {
      key: 'transparentMeshesAsManualOrder',
      set: function set(meshes) {
        this._transparentMeshesAsManualOrder = meshes;
      },
      get: function get() {
        return this._transparentMeshesAsManualOrder;
      }
    }]);
    return RenderPass;
  }(GLBoostObject);

  var Renderer = function (_GLBoostObject) {
    babelHelpers.inherits(Renderer, _GLBoostObject);

    function Renderer(glBoostContext, parameters) {
      babelHelpers.classCallCheck(this, Renderer);

      var _this = babelHelpers.possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, glBoostContext));

      var _clearColor = parameters.clearColor;

      _this._glBoostSystem._glBoostContext.reflectGlobalGLState();
      var glContext = _this._glContext;
      var gl = glContext.gl;

      if (_clearColor) {
        gl.clearColor(_clearColor.red, _clearColor.green, _clearColor.blue, _clearColor.alpha);
      }

      _this.__animationFrameId = -1;
      _this.__isWebVRMode = false;
      _this.__webvrFrameData = null;
      _this.__webvrDisplay = null;
      _this.__canvasWidthBackup = null;
      _this.__canvasHeightBackup = null;
      _this.__defaultUserSittingPositionInVR = new Vector3(0.0, 1.1, 1.5);
      _this.__requestedToEnterWebVR = false;
      _this.__isReadyForWebVR = false;
      _this.__animationFrameObject = window;
      return _this;
    }

    babelHelpers.createClass(Renderer, [{
      key: 'update',
      value: function update(expression) {

        var skeletalMeshes = [];
        var effekseerElements = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = expression.renderPasses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var renderPass = _step.value;

            skeletalMeshes = skeletalMeshes.concat(renderPass._skeletalMeshes);
            effekseerElements = effekseerElements.concat(renderPass._effekseerElements);
            renderPass.scene.updateAmountOfAmbientLightsIntensity();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var unique = function unique(array) {
          return array.reduce(function (a, b) {
            if (a.instanceName !== b.instanceName) {
              a.push(b);
            }
            return a;
          }, []);
        };
        skeletalMeshes = unique(skeletalMeshes);

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = skeletalMeshes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var mesh = _step2.value;

            mesh.geometry.update(mesh);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = effekseerElements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var effekseerElement = _step3.value;

            effekseerElement.update();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (typeof effekseer !== "undefined") {
          effekseer.update();
        }
      }
    }, {
      key: 'draw',
      value: function draw(expression) {
        var _this2 = this;

        var renderPassTag = '';
        expression.renderPasses.forEach(function (renderPass, index) {
          if (!renderPass.isEnableToDraw || !renderPass.scene) {
            return;
          }

          if (renderPassTag !== renderPass.tag) {
            renderPass.clearAssignShaders();
          }
          renderPassTag = renderPass.tag;

          var camera = renderPass.scene.getMainCamera();

          var lights = renderPass.scene.lightsExceptAmbient;

          renderPass.preRender(camera ? true : false, lights);

          var glContext = _this2._glContext;
          var gl = glContext.gl;
          var glem = GLExtensionsManager.getInstance(_this2._glContext);

          if (renderPass.fbo && renderPass.isRenderTargetAttachedTextures) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, renderPass.fbo);
          }

          glem.drawBuffers(gl, renderPass.buffersToDraw);


          var viewport = null;
          if (renderPass.viewport) {
            viewport = [renderPass.viewport.x, renderPass.viewport.y, renderPass.viewport.z, renderPass.viewport.w];
          } else {
            if (_this2.isWebVRMode) {
              viewport = [0, 0, glContext.canvasWidth, glContext.canvasHeight];
            } else if (camera) {
              var deltaWidth = glContext.canvasHeight * camera.aspect - glContext.canvasWidth;
              viewport = [-deltaWidth / 2, 0, glContext.canvasHeight * camera.aspect, glContext.canvasHeight];
            } else {
              viewport = [0, 0, glContext.canvasWidth, glContext.canvasHeight];
            }
          }
          if (!_this2.isWebVRMode) {
            gl.viewport.apply(gl, viewport);
          }

          _this2._clearBuffer(gl, renderPass);

          if (_this2.__animationFrameObject === _this2.__webvrDisplay) {
            _this2.__webvrDisplay.getFrameData(_this2.__webvrFrameData);
            if (_this2.__webvrDisplay.stageParameters) {
              _this2.__webvrFrameData.sittingToStandingTransform = _this2.__webvrDisplay.stageParameters.sittingToStandingTransform;
            } else {
              _this2.__webvrFrameData.sittingToStandingTransform = Matrix44$1.translate(_this2.__defaultUserSittingPositionInVR).flatten();
            }
          }

          _this2._drawGizmos(renderPass.preGizmos, expression, lights, camera, renderPass, index, viewport, true);

          var opacityMeshes = renderPass.opacityMeshes;
          opacityMeshes.forEach(function (mesh) {
            if (mesh.isVisible) {
              mesh.draw({
                expression: expression,
                lights: lights,
                camera: camera,
                renderPass: renderPass,
                renderPassIndex: index,
                viewport: viewport,
                isWebVRMode: _this2.isWebVRMode,
                webvrFrameData: _this2.__webvrFrameData
              });
            }
          });

          if (camera) {
            renderPass.sortTransparentMeshes(camera);
          }

          var transparentMeshes = renderPass.transparentMeshesAsManualOrder ? renderPass.transparentMeshesAsManualOrder : renderPass.transparentMeshes;

          transparentMeshes.forEach(function (mesh) {
            if (mesh.isVisible) {
              mesh.draw({
                expression: expression,
                lights: lights,
                camera: camera,
                renderPass: renderPass,
                renderPassIndex: index,
                viewport: viewport,
                isWebVRMode: _this2.isWebVRMode,
                webvrFrameData: _this2.__webvrFrameData
              });
            }
          });

          _this2._drawGizmos(renderPass.postGizmos, expression, lights, camera, renderPass, index, viewport, false);

          gl.bindFramebuffer(gl.FRAMEBUFFER, null);


          if (typeof effekseer !== "undefined") {
            var projection = camera === null ? Matrix44$1.identity().m : camera.projectionRHMatrix().m;
            var inverseWorld = camera === null ? Matrix44$1.identity().m : camera.inverseWorldMatrix.m;
            effekseer.setProjectionMatrix(projection);
            effekseer.setCameraMatrix(inverseWorld);
            effekseer.draw();
          }

          renderPass.postRender(camera ? true : false, lights);
        });
      }
    }, {
      key: '_drawGizmos',
      value: function _drawGizmos(gizmos, expression, lights, camera, renderPass, index, viewport, isDepthTest) {
        var globalStatesUsageBackup = this._glBoostSystem._glBoostContext.globalStatesUsage;
        this._glBoostSystem._glBoostContext.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_INCLUSIVE;
        this._glBoostSystem._glBoostContext.currentGlobalStates = [3042];
        if (isDepthTest) {
          this._glBoostSystem._glBoostContext.currentGlobalStates.push(2929);
        }

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = gizmos[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var gizmo = _step4.value;

            if (gizmo.isVisible) {
              gizmo.mesh.draw({
                expression: expression,
                lights: lights,
                camera: camera,
                renderPass: renderPass,
                renderPassIndex: index,
                viewport: viewport,
                isWebVRMode: this.isWebVRMode,
                webvrFrameData: this.__webvrFrameData,
                forceThisMaterial: gizmo.forceThisMaterial
              });
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        this._glBoostSystem._glBoostContext.globalStatesUsage = globalStatesUsageBackup;
        this._glBoostSystem._glBoostContext.restoreGlobalStatesToDefault();
      }
    }, {
      key: '_clearBuffer',
      value: function _clearBuffer(gl, renderPass) {
        var clearColor = renderPass.clearColor;
        var clearDepth = renderPass.clearDepth;
        var colorMask = renderPass.colorMask;

        if (clearColor) {
          gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w);
        }
        if (clearDepth) {
          gl.clearDepth(clearDepth);
        }
        if (colorMask) {
          gl.colorMask.apply(null, [colorMask]);
        }

        if (renderPass.buffersToDraw[0] === gl.NONE) {
          {
            gl.clear(gl.DEPTH_BUFFER_BIT);
          }
        } else if (clearColor || clearDepth) {
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        } else if (clearColor) {
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
      }
    }, {
      key: 'clearCanvas',
      value: function clearCanvas(color_flg, depth_flg, stencil_flg) {
        var gl = this._glContext.gl;

        var bufferBits = 0;

        if (color_flg === void 0 || color_flg) bufferBits |= gl.COLOR_BUFFER_BIT;
        if (depth_flg === void 0 || depth_flg) bufferBits |= gl.DEPTH_BUFFER_BIT;
        if (stencil_flg === void 0 || stencil_flg) bufferBits |= gl.STENCIL_BUFFER_BIT;

        gl.clear(bufferBits);
      }
    }, {
      key: 'resize',
      value: function resize(width, height) {
        this._glContext.canvasWidth = width;
        this._glContext.canvasHeight = height;
      }
    }, {
      key: 'doRenderLoop',
      value: function doRenderLoop(renderLoopFunc, time) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var _this3 = this;

        args.splice(0, 0, time);
        renderLoopFunc.apply(renderLoopFunc, args);

        this.__animationFrameId = this.__animationFrameObject.requestAnimationFrame(function (_time) {
          _this3.doRenderLoop(renderLoopFunc, _time, args[1]);
          if (_this3.__requestedToEnterWebVR) {
            _this3.__isWebVRMode = true;
          }
        }, time);
      }
    }, {
      key: 'doConvenientRenderLoop',
      value: function doConvenientRenderLoop(expression, beforeCallback, afterCallback) {
        for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
          args[_key2 - 3] = arguments[_key2];
        }

        var _this4 = this;

        if (beforeCallback) {
          beforeCallback.apply(beforeCallback, args);
        }

        this.clearCanvas();
        this.update(expression);
        this.draw(expression);

        if (afterCallback) {
          afterCallback.apply(afterCallback, args);
        }

        if (this.__webvrDisplay && this.__webvrDisplay.isPresenting) {
          this.__webvrDisplay.submitFrame();
        }

        this.__animationFrameId = this.__animationFrameObject.requestAnimationFrame(function () {
          _this4.doConvenientRenderLoop.apply(_this4, [expression, beforeCallback, afterCallback].concat(args));
          if (_this4.__requestedToEnterWebVR) {
            _this4.__isWebVRMode = true;
          }
        });
      }
    }, {
      key: 'stopRenderLoop',
      value: function stopRenderLoop() {
        this.__cancelAnimationFrame(this.__animationFrameId);
        this.__animationFrameId = -1;
      }
    }, {
      key: 'enterWebVR',
      value: function () {
        var _ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(initialUserSittingPositionIfStageParametersDoNotExist) {
          var _this5 = this;

          var minRenderWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var minRenderHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (initialUserSittingPositionIfStageParametersDoNotExist) {
                    this.__defaultUserSittingPositionInVR = initialUserSittingPositionIfStageParametersDoNotExist;
                  }
                  this.__minRenderWidthFromUser = minRenderWidth;
                  this.__minRenderHeightFromUser = minRenderHeight;

                  return _context.abrupt('return', new Promise(function (resolve, reject) {
                    if (!_this5.__webvrDisplay.isPresenting) {
                      _this5.__animationFrameObject = _this5.__webvrDisplay;
                      var leftEye = _this5.__webvrDisplay.getEyeParameters("left");
                      var rightEye = _this5.__webvrDisplay.getEyeParameters("right");

                      _this5.__canvasWidthBackup = _this5._glContext.canvasWidth;
                      _this5.__canvasHeightBackup = _this5._glContext.canvaHeight;

                      if (_this5.__minRenderWidthFromUser > leftEye.renderWidth && _this5.__minRenderHeightFromUser > rightEye.renderWidth) {
                        _this5.resize(_this5.__minRenderWidthFromUser * 2, _this5.__minRenderHeightFromUser);
                      } else {
                        _this5.resize(Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2, Math.max(leftEye.renderHeight, rightEye.renderHeight));
                      }
                      _this5.__webvrDisplay.requestPresent([{ source: _this5._glContext.canvas }]).then(function () {
                        _this5.__requestedToEnterWebVR = true;
                        resolve();
                      }).catch(function () {
                        console.error('Failed to requestPresent. Please check your VR Setting, or something wrong with your VR system?');
                        reject();
                      });
                    }
                  }));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function enterWebVR(_x3) {
          return _ref.apply(this, arguments);
        }

        return enterWebVR;
      }()
    }, {
      key: 'readyForWebVR',
      value: function () {
        var _ref2 = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee2(requestButtonDom) {
          var _this6 = this;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (window.VRFrameData) {
                    this.__webvrFrameData = new window.VRFrameData();
                  }

                  return _context2.abrupt('return', new Promise(function (resolve, reject) {
                    if (navigator.getVRDisplays) {
                      navigator.getVRDisplays().then(function (vrDisplays) {
                        if (vrDisplays.length > 0) {
                          var webvrDisplay = vrDisplays[vrDisplays.length - 1];
                          webvrDisplay.depthNear = 0.01;
                          webvrDisplay.depthFar = 10000;

                          if (webvrDisplay.capabilities.canPresent) {
                            _this6.__webvrDisplay = webvrDisplay;

                            if (requestButtonDom) {
                              requestButtonDom.style.display = 'block';
                            } else {
                              var paragrach = document.createElement("p");
                              var anchor = document.createElement("a");
                              anchor.setAttribute("id", 'enter-vr');
                              var enterVr = document.createTextNode("Enter VR");

                              anchor.appendChild(enterVr);
                              paragrach.appendChild(anchor);

                              var canvas = _this6.glContext.canvas;
                              canvas.parent.insertBefore(paragrach, canvas);
                              window.addEventListener('click', _this6.enterWebVR.bind(_this6));
                            }

                            _this6.__isReadyForWebVR = true;
                            resolve();
                          } else {
                            console.error("Can't requestPresent now. try again.");
                            reject();
                          }
                        } else {
                          console.error('Failed to get VR Display. Please check your VR Setting, or something wrong with your VR system?');
                          reject();
                        }
                      }).catch(function () {
                        console.error('Failed to get VR Displays. Please check your VR Setting.');
                        reject();
                      });
                    } else {
                      console.error('Your browser does not support WebVR. Or it is disabled. Check again.');
                      reject();
                    }
                  }));

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function readyForWebVR(_x4) {
          return _ref2.apply(this, arguments);
        }

        return readyForWebVR;
      }()
    }, {
      key: 'exitWebVR',
      value: function () {
        var _ref3 = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  this.__isWebVRMode = false;

                  if (!(this.__webvrDisplay && this.__webvrDisplay.isPresenting)) {
                    _context3.next = 4;
                    break;
                  }

                  _context3.next = 4;
                  return this.__webvrDisplay.exitPresent();

                case 4:
                  this.resize(this.__canvasWidthBackup, this.__canvasHeightBackup);
                  this.__isReadyForWebVR = false;
                  this.__animationFrameObject = window;

                case 7:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function exitWebVR() {
          return _ref3.apply(this, arguments);
        }

        return exitWebVR;
      }()
    }, {
      key: 'disableWebVR',
      value: function () {
        var _ref4 = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  this.__isWebVRMode = false;
                  this.__requestedToEnterWebVR = false;
                  this.__isReadyForWebVR = false;

                  if (!(this.__webvrDisplay && this.__webvrDisplay.isPresenting)) {
                    _context4.next = 6;
                    break;
                  }

                  _context4.next = 6;
                  return this.__webvrDisplay.exitPresent();

                case 6:
                  this.__animationFrameObject = window;
                  this.__webvrDisplay = null;

                case 8:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function disableWebVR() {
          return _ref4.apply(this, arguments);
        }

        return disableWebVR;
      }()
    }, {
      key: 'webVrSubmitFrame',
      value: function webVrSubmitFrame() {
        if (this.__webvrDisplay && this.__webvrDisplay.isPresenting) {
          this.__webvrDisplay.submitFrame();
        }
      }
    }, {
      key: 'glContext',
      get: function get() {
        return this._glContext.gl;
      }
    }, {
      key: 'isWebVRMode',
      get: function get() {
        return this.__isWebVRMode;
      }
    }, {
      key: 'isReadyForWebVR',
      get: function get() {
        return this.__isReadyForWebVR;
      }
    }]);
    return Renderer;
  }(GLBoostObject);

  var M_Scene = function (_M_Group) {
    babelHelpers.inherits(M_Scene, _M_Group);

    function M_Scene(glBoostContext) {
      babelHelpers.classCallCheck(this, M_Scene);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_Scene.__proto__ || Object.getPrototypeOf(M_Scene)).call(this, glBoostContext));

      _this._gl = _this._glContext.gl;
      _this._reset();
      return _this;
    }

    babelHelpers.createClass(M_Scene, [{
      key: '_reset',
      value: function _reset() {
        this._meshes = [];
        this._lights = [];
        this._lightsExceptAmbient = [];
        this._ambientLights = [];
        this._cameras = [];
        this._accumulatedAmbientIntensity = Vector4$1.zero();
      }
    }, {
      key: '_getCurrentAnimationInputValue',
      value: function _getCurrentAnimationInputValue(inputName) {
        var value = this._currentAnimationInputValues[inputName];
        if (typeof value === 'undefined') {
          return void 0;
        } else {
          return value;
        }
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender(expression) {
        var _this2 = this;

        this._reset();

        var aabb = function setParentAndClearAccumulatedTransformMatriAndMergeAABBRecursively(elem) {
          if (elem instanceof M_Group) {
            elem._needUpdate();
            var children = elem.getChildren();
            for (var i = 0; i < children.length; i++) {
              children[i]._parent = elem;
              var aabb = setParentAndClearAccumulatedTransformMatriAndMergeAABBRecursively(children[i]);
              if (aabb instanceof AABB) {
                elem.AABB.mergeAABB(aabb);
              } else {
                console.assert('calculation of AABB error!');
              }
            }
            return elem.AABB;
          }
          if (elem instanceof M_Mesh) {
            return elem.AABB;
          }

          return null;
        }(this);
        this.AABB.mergeAABB(aabb);

        var collectLights = function collectLights(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            var lights = [];
            children.forEach(function (child) {
              var childLights = collectLights(child);
              lights = lights.concat(childLights);
            });
            return lights;
          } else if (elem instanceof M_AbstractLight) {
            return [elem];
          } else {
            return [];
          }
        };

        this._lights = [];
        this._lightsExceptAmbient = [];
        this._ambientLights = [];
        this._elements.forEach(function (elm) {
          _this2._lights = _this2._lights.concat(collectLights(elm));
          _this2._lightsExceptAmbient = _this2._lights.filter(function (light) {
            return !light.isTypeAmbient();
          });
          _this2._ambientLights = _this2._lights.filter(function (light) {
            return light.isTypeAmbient();
          });
        });

        var existCamera_f = false;
        var collectCameras = function collectCameras(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            var cameras = [];
            children.forEach(function (child) {
              var childCameras = collectCameras(child);
              cameras = cameras.concat(childCameras);
            });
            return cameras;
          } else if (elem instanceof M_AbstractCamera) {
            existCamera_f = true;
            return [elem];
          } else {
            return [];
          }
        };

        this._cameras = [];
        this._elements.forEach(function (elm) {
          _this2._cameras = _this2._cameras.concat(collectCameras(elm));
        });
        if (this._cameras.length === 0) ; else if (this._cameras.length === 1) {
          this._cameras[0].setAsMainCamera(this);
        } else {
          var isNotMainCameraFound = true;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this._cameras[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var camera = _step.value;

              if (camera.isMainCamera(this)) {
                isNotMainCameraFound = false;
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (isNotMainCameraFound) {
            this._cameras[0].setAsMainCamera(this);
          }
        }

        var collectMeshes = function collectMeshes(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();
            var meshes = [];
            children.forEach(function (child) {
              var childMeshes = collectMeshes(child);
              meshes = meshes.concat(childMeshes);
            });
            return meshes;
          } else if (elem instanceof M_Mesh) {
            return [elem];
          } else {
            return [];
          }
        };

        this._meshes = [];
        this._elements.forEach(function (elm) {
          _this2._meshes = _this2._meshes.concat(collectMeshes(elm));
        });

        var callPrepareToRenderMethodOfAllElements = function callPrepareToRenderMethodOfAllElements(elem) {
          if (elem instanceof M_Group) {
            var children = elem.getChildren();

            children.forEach(function (child) {
              callPrepareToRenderMethodOfAllElements(child);
            });

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = elem.gizmos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var gizmo = _step2.value;

                gizmo.mesh.prepareToRender(expression, existCamera_f, []);
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } else if (elem instanceof M_Mesh) {
            elem.prepareToRender(expression, existCamera_f, _this2._lights);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = elem.gizmos[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _gizmo = _step3.value;

                _gizmo.mesh.prepareToRender(expression, existCamera_f, _this2._lights);
                if (_gizmo.forceThisMaterial) {
                  _gizmo.forceThisMaterial.shaderInstance = _gizmo.mesh.geometry.prepareGLSLProgram(expression, _gizmo.forceThisMaterial, existCamera_f, _this2._lights, null);
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          } else if (elem instanceof M_Element) {
            elem.prepareToRender();
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = elem.gizmos[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _gizmo2 = _step4.value;

                _gizmo2.mesh.prepareToRender(expression, existCamera_f, []);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          } else {
            return;
          }
        };
        callPrepareToRenderMethodOfAllElements(this);
      }
    }, {
      key: 'getMainCamera',
      value: function getMainCamera(renderPass) {
        var _this3 = this;

        var camera = null;
        this.cameras.forEach(function (elm) {
          if (elm.isMainCamera(_this3)) {
            camera = elm;
          }
        });

        return camera;
      }
    }, {
      key: 'updateAmountOfAmbientLightsIntensity',
      value: function updateAmountOfAmbientLightsIntensity() {
        this._accumulatedAmbientIntensity = Vector4$1.zero();
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this._ambientLights[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var light = _step5.value;

            this._accumulatedAmbientIntensity.add(light.intensity);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
    }, {
      key: 'getAmountOfAmbientLightsIntensity',
      value: function getAmountOfAmbientLightsIntensity() {
        return this._accumulatedAmbientIntensity.clone();
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return this._elements;
      }
    }, {
      key: 'lightsExceptAmbient',
      get: function get() {
        return this._lightsExceptAmbient;
      }
    }, {
      key: 'elements',
      get: function get() {
        return this._elements;
      }
    }, {
      key: 'meshes',
      get: function get() {
        return this._meshes;
      }
    }, {
      key: 'lights',
      get: function get() {
        return this._lights;
      }
    }, {
      key: 'cameras',
      get: function get() {
        return this._cameras;
      }
    }]);
    return M_Scene;
  }(M_Group);

  var M_Gizmo = function (_M_Group) {
    babelHelpers.inherits(M_Gizmo, _M_Group);

    function M_Gizmo(glBoostContext) {
      babelHelpers.classCallCheck(this, M_Gizmo);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_Gizmo.__proto__ || Object.getPrototypeOf(M_Gizmo)).call(this, glBoostContext, null, null));

      _this._mesh = null;

      _this._isPreDraw = false;
      _this._forceThisMaterial = null;
      return _this;
    }

    babelHelpers.createClass(M_Gizmo, [{
      key: 'mesh',
      get: function get() {
        return this._mesh;
      }
    }, {
      key: 'isPreDraw',
      set: function set(flg) {
        this._isPreDraw = flg;
      },
      get: function get() {
        return this._isPreDraw;
      }
    }, {
      key: 'forceThisMaterial',
      get: function get() {
        return this._forceThisMaterial;
      }
    }]);
    return M_Gizmo;
  }(M_Group);

  var JointPrimitive = function (_Geometry) {
    babelHelpers.inherits(JointPrimitive, _Geometry);

    function JointPrimitive(glBoostContext, length) {
      babelHelpers.classCallCheck(this, JointPrimitive);

      var _this = babelHelpers.possibleConstructorReturn(this, (JointPrimitive.__proto__ || Object.getPrototypeOf(JointPrimitive)).call(this, glBoostContext));

      _this._colors = [];
      _this.color = new Vector4$1(1, 1, 1, 1);
      _this._worldPositionOfThisJoint = new Vector3(0, 0, 1);
      _this._worldPositionOfParentJoint = new Vector3(0, 0, 0);
      _this._vertexData = _this._setupVertexData();
      _this.setVerticesData(_this._vertexData, null, GLBoost$1.LINES);
      _this._width = 1;
      return _this;
    }

    babelHelpers.createClass(JointPrimitive, [{
      key: '_setupVertexData',
      value: function _setupVertexData() {

        var length = Vector3.lengthBtw(this._worldPositionOfThisJoint, this._worldPositionOfParentJoint);
        var arrowWidth = this._width;
        var arrowheadLength = length / 7.5;
        var arrowStickLength = length - arrowheadLength;

        var positions = [];

        var deltaVec = Vector3.subtract(this._worldPositionOfParentJoint, this._worldPositionOfThisJoint);
        var directionToParent = new Vector3(0, 1, 0);
        if (!deltaVec.isEqual(Vector3.zero())) {
          directionToParent = Vector3.subtract(this._worldPositionOfParentJoint, this._worldPositionOfThisJoint).normalize();
        }
        var arrowStickPosition = Vector3.add(this._worldPositionOfThisJoint, Vector3.multiply(directionToParent, arrowStickLength));

        var dummyVector = new Vector3(0, 1, 0);
        var dummyVector2 = new Vector3(0, -1, 0);
        if (Math.abs(Vector3.dotProduct(directionToParent, dummyVector)) > 0.4) {
          dummyVector = new Vector3(1, 0, 0);
          dummyVector2 = new Vector3(-1, 0, 0);
        }
        if (Math.abs(Vector3.dotProduct(directionToParent, dummyVector)) > 0.4) {
          dummyVector = new Vector3(0, 0, 1);
          dummyVector2 = new Vector3(0, 0, -1);
        }
        var crossVector = Vector3.multiply(Vector3.cross(directionToParent, dummyVector).normalize(), arrowWidth);
        var crossVector2 = Vector3.multiply(Vector3.cross(directionToParent, crossVector).normalize(), arrowWidth);
        var crossVector3 = Vector3.multiply(Vector3.cross(directionToParent, dummyVector2).normalize(), arrowWidth);
        var crossVector4 = Vector3.multiply(Vector3.cross(directionToParent, crossVector3).normalize(), arrowWidth);


        var crossPosition = Vector3.add(arrowStickPosition, crossVector);
        var crossPosition2 = Vector3.add(arrowStickPosition, crossVector2);
        var crossPosition3 = Vector3.add(arrowStickPosition, crossVector3);
        var crossPosition4 = Vector3.add(arrowStickPosition, crossVector4);

        positions.push(this._worldPositionOfThisJoint);
        positions.push(crossPosition);

        positions.push(this._worldPositionOfThisJoint);
        positions.push(crossPosition2);

        positions.push(this._worldPositionOfThisJoint);
        positions.push(crossPosition3);

        positions.push(this._worldPositionOfThisJoint);
        positions.push(crossPosition4);

        positions.push(crossPosition);
        positions.push(crossPosition2);

        positions.push(crossPosition2);
        positions.push(crossPosition3);
        positions.push(crossPosition3);
        positions.push(crossPosition4);
        positions.push(crossPosition4);
        positions.push(crossPosition);

        positions.push(this._worldPositionOfParentJoint);
        positions.push(crossPosition);

        positions.push(this._worldPositionOfParentJoint);
        positions.push(crossPosition2);

        positions.push(this._worldPositionOfParentJoint);
        positions.push(crossPosition3);

        positions.push(this._worldPositionOfParentJoint);
        positions.push(crossPosition4);

        this._vertexData = {
          position: positions,
          color: this._colors
        };

        return this._vertexData;
      }
    }, {
      key: 'update',
      value: function update() {
        this._vertexData = this._setupVertexData();
        this.updateVerticesData(this._vertexData, true);
      }
    }, {
      key: 'worldPositionOfThisJoint',
      set: function set(vec) {
        this._worldPositionOfThisJoint = vec;
      },
      get: function get() {
        return this._worldPositionOfThisJoint;
      }
    }, {
      key: 'worldPositionOfParentJoint',
      set: function set(vec) {
        this._worldPositionOfParentJoint = vec;
      },
      get: function get() {
        return this._worldPositionOfParentJoint;
      }
    }, {
      key: 'width',
      set: function set(value) {
        this._width = value;
      },
      get: function get() {
        return this._width;
      }
    }, {
      key: 'color',
      set: function set(vec) {
        this._color = vec;

        this._colors = [];
        for (var i = 0; i < 24; i++) {
          this._colors.push(this._color);
        }
      },
      get: function get() {
        return this._color;
      }
    }, {
      key: 'meshContainingSelf',
      set: function set(jointGizmoMesh) {
        this._mesh = jointGizmoMesh;
      }
    }]);
    return JointPrimitive;
  }(Geometry);


  GLBoost$1["JointPrimitive"] = JointPrimitive;

  var M_JointGizmo = function (_M_Gizmo) {
    babelHelpers.inherits(M_JointGizmo, _M_Gizmo);

    function M_JointGizmo(glBoostContext, joint, length) {
      babelHelpers.classCallCheck(this, M_JointGizmo);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_JointGizmo.__proto__ || Object.getPrototypeOf(M_JointGizmo)).call(this, glBoostContext, null, null));

      _this._init(glBoostContext, joint, length);

      _this.isVisible = false;

      _this.baseColor = new Vector4$1(0.0, 1.0, 1.0, 0.25);
      return _this;
    }

    babelHelpers.createClass(M_JointGizmo, [{
      key: '_init',
      value: function _init(glBoostContext, joint, length) {
        this._joint = joint;
        this._primitive = new JointPrimitive(this._glBoostContext, length, 1);
        this._mesh = new M_Mesh(glBoostContext, this._primitive, null);

        this._mesh.masterElement = this;


        this.addChild(this._mesh);
      }
    }, {
      key: 'update',
      value: function update() {
        this._primitive.update();
      }
    }, {
      key: 'baseColor',
      set: function set(colorVec) {
        this._primitive.color = colorVec;
      },
      get: function get() {
        return this._primitive.color;
      }
    }, {
      key: 'worldMatrixInner',
      get: function get() {
        return Matrix44$1.identity();
      }
    }, {
      key: 'worldPositionOfThisJoint',
      set: function set(vec3) {
        this._primitive.worldPositionOfThisJoint = vec3;
      },
      get: function get() {
        return this._primitive.worldPositionOfThisJoint;
      }
    }, {
      key: 'worldPositionOfParentJoint',
      set: function set(vec3) {
        this._primitive.worldPositionOfParentJoint = vec3;
      },
      get: function get() {
        return this._primitive.worldPositionOfParentJoint;
      }
    }, {
      key: 'width',
      set: function set(value) {
        this._primitive.width = value;
      },
      get: function get() {
        return this._primitive.width;
      }
    }, {
      key: 'isVisible',
      set: function set(flag) {
        this._mesh.isVisible = flag;
      },
      get: function get() {
        return this._mesh.isVisible;
      }
    }]);
    return M_JointGizmo;
  }(M_Gizmo);


  GLBoost$1['M_JointGizmo'] = M_JointGizmo;

  var M_Joint = function (_M_Element) {
    babelHelpers.inherits(M_Joint, _M_Element);

    function M_Joint(glBoostContext) {
      var isExistJointGizmo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      babelHelpers.classCallCheck(this, M_Joint);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_Joint.__proto__ || Object.getPrototypeOf(M_Joint)).call(this, glBoostContext));

      if (isExistJointGizmo) {
        _this._gizmo = new M_JointGizmo(glBoostContext, _this, length);
        _this._gizmos.push(_this._gizmo);
      } else {
        _this._gizmo = {};
      }

      M_Joint._calculatedTransforms = {};
      M_Joint._calculatedTranslates = {};
      _this._childJoints = [];
      _this._jointsOfParentHierarchies = [];

      _this.length = new Vector3(length, length, length);

      _this._isCalculatedJointGizmo = false;
      _this._jointPoseMatrix = Matrix44$1.identity();
      _this._length = 1;

      _this._inverseBindMatrix = Matrix44$1.identity();

      _this._skeletalMesh = null;

      return _this;
    }

    babelHelpers.createClass(M_Joint, [{
      key: 'clearIsCalculatedLengthFlag',
      value: function clearIsCalculatedLengthFlag() {
        this._isCalculatedJointGizmo = false;
      }
    }, {
      key: 'updateGizmoDisplay',
      value: function updateGizmoDisplay() {
        if (this._gizmo instanceof M_JointGizmo) {
          this._gizmo.update();
        }
      }
    }, {
      key: 'clone',
      value: function clone() {
        var instance = new M_Joint(this._glBoostSystem);
        this._copy(instance);
        return instance;
      }
    }, {
      key: '_copy',
      value: function _copy(instance) {
        babelHelpers.get(M_Joint.prototype.__proto__ || Object.getPrototypeOf(M_Joint.prototype), '_copy', this).call(this, instance);
      }
    }, {
      key: 'inverseBindMatrix',
      set: function set(mat4) {
        this._inverseBindMatrix = mat4;
      },
      get: function get() {
        return this._inverseBindMatrix;
      }
    }, {
      key: 'skeletalMesh',
      set: function set(skeletalMesh) {
        this._skeletalMesh = skeletalMesh;
      },
      get: function get() {
        return this._skeletalMesh;
      }
    }, {
      key: 'worldPositionOfThisJoint',
      set: function set(vec) {
        this._gizmo.worldPositionOfThisJoint = vec;
      },
      get: function get() {
        return this._gizmo.worldPositionOfThisJoint;
      }
    }, {
      key: 'worldPositionOfParentJoint',
      set: function set(vec) {
        this._gizmo.worldPositionOfParentJoint = vec;
      },
      get: function get() {
        return this._gizmo.worldPositionOfParentJoint;
      }
    }, {
      key: 'width',
      set: function set(value) {
        this._gizmo.width = value;
      },
      get: function get() {
        return this._gizmo.width;
      }
    }, {
      key: 'jointPoseMatrix',
      set: function set(matrix) {
        this._jointPoseMatrix = matrix;
      },
      get: function get() {
        return this._jointPoseMatrix;
      }
    }, {
      key: 'isCalculatedJointGizmo',
      get: function get() {
        return this._isCalculatedJointGizmo;
      }
    }, {
      key: 'isVisible',
      set: function set(flg) {
        this._gizmo.isVisible = flg;
      },
      get: function get() {
        return this._gizmo.isVisible;
      }
    }, {
      key: 'childJoints',
      set: function set(joints) {
        this._childJoints = joints;
      },
      get: function get() {
        return this._childJoints;
      }
    }, {
      key: 'jointsOfParentHierarchies',
      set: function set(joints) {
        this._jointsOfParentHierarchies = joints;
      },
      get: function get() {
        return this._jointsOfParentHierarchies;
      }
    }]);
    return M_Joint;
  }(M_Element);


  GLBoost$1['M_Joint'] = M_Joint;

  var M_SkeletalMesh = function (_M_Mesh) {
    babelHelpers.inherits(M_SkeletalMesh, _M_Mesh);

    function M_SkeletalMesh(glBoostContext, geometry, material, rootJointName) {
      babelHelpers.classCallCheck(this, M_SkeletalMesh);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_SkeletalMesh.__proto__ || Object.getPrototypeOf(M_SkeletalMesh)).call(this, glBoostContext, geometry, material, rootJointName));

      _this._rootJointName = rootJointName;
      _this._jointsHierarchy = null;
      _this._inverseBindMatrices = [];
      _this._bindShapeMatrix = Matrix44$1.identity();
      _this._jointNames = [];
      _this._gltfJointIndices = [];
      _this._joints = [];

      _this._jointMatrices = null;
      _this._qArray = null;
      _this._tArray = null;
      _this._qtArray = null;
      _this._translationScale = 0;

      return _this;
    }

    babelHelpers.createClass(M_SkeletalMesh, [{
      key: 'prepareToRender',
      value: function prepareToRender(expression, existCamera_f, lights, renderPasses) {
        var _this2 = this;

        var joints = this.jointsHierarchy.searchElementsByType(M_Joint);

        this._joints = [];

        var jointCount = 0;
        for (var i = 0; i < this._jointNames.length; i++) {
          for (var j = 0; j < joints.length; j++) {
            if (this._jointNames[i] === joints[j]._userFlavorName) {
              this._joints.push(joints[j]);
              joints[j].skeletalMesh = this;

              var inverseBindMatrix = this._inverseBindMatrices[jointCount] !== void 0 ? this._inverseBindMatrices[jointCount] : Matrix44$1.identity();
              joints[j].inverseBindMatrix = inverseBindMatrix;
              joints[j].bindMatrix = Matrix44$1.invert(inverseBindMatrix);
              jointCount++;
              break;
            }
          }
        }

        jointCount = 0;
        for (var _i = 0; _i < this._gltfJointIndices.length; _i++) {
          for (var _j = 0; _j < joints.length; _j++) {
            if (this._gltfJointIndices[_i] === joints[_j]._glTFJointIndex) {
              this._joints.push(joints[_j]);
              joints[_j].skeletalMesh = this;

              var _inverseBindMatrix = this._inverseBindMatrices[jointCount] !== void 0 ? this._inverseBindMatrices[jointCount] : Matrix44$1.identity();
              joints[_j].inverseBindMatrix = _inverseBindMatrix;
              joints[_j].bindMatrix = Matrix44$1.invert(_inverseBindMatrix);
              jointCount++;
              break;
            }
          }
        }

        var calcParentJointsMatricesRecursively = function calcParentJointsMatricesRecursively(joint) {
          var children = joint.parent.parent.getChildren();
          var parentJoint = null;
          for (var _i2 = 0; _i2 < children.length; _i2++) {
            if (children[_i2] instanceof M_Joint) {
              parentJoint = children[_i2];
            }
          }

          var results = [];
          if (parentJoint) {
            var result = calcParentJointsMatricesRecursively(parentJoint);
            if (Array.isArray(result)) {
              Array.prototype.push.apply(results, result);
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _this2._jointNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var jointName = _step.value;

                if (parentJoint.userFlavorName === jointName) {
                  results.push(parentJoint);
                  return results;
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _this2._gltfJointIndices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var gltfJointIndex = _step2.value;

                if (parentJoint._glTFJointIndex === gltfJointIndex) {
                  results.push(parentJoint);
                  return results;
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            return results;
          }

          return null;
        };

        var jointsParentHierarchies = null;
        for (var _i3 = 0; _i3 < this._joints.length; _i3++) {
          jointsParentHierarchies = calcParentJointsMatricesRecursively(this._joints[_i3]);
          if (jointsParentHierarchies == null) {
            jointsParentHierarchies = [];
          }


          this._joints[_i3].jointsOfParentHierarchies = jointsParentHierarchies;
        }
        babelHelpers.get(M_SkeletalMesh.prototype.__proto__ || Object.getPrototypeOf(M_SkeletalMesh.prototype), 'prepareToRender', this).call(this, expression, existCamera_f, lights, renderPasses);

        var lengthCenterToCorner = AABB.multiplyMatrix(this._joints[0].worldMatrix, this.rawAABBInLocal).lengthCenterToCorner;
        for (var _i4 = 0; _i4 < this._joints.length; _i4++) {
          this._joints[_i4].width = lengthCenterToCorner / 100;
        }
      }
    }, {
      key: 'clone',
      value: function clone() {
        var clonedOriginalRootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
        var clonedRootElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var onCompleteFuncs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var instance = new M_SkeletalMesh(this._glBoostSystem, this.geometry, this.material, this._rootJointName);
        this._copy(instance, clonedOriginalRootElement, clonedRootElement, onCompleteFuncs);

        return instance;
      }
    }, {
      key: '_copy',
      value: function _copy(instance, clonedOriginalRootElement, clonedRootElement, onCompleteFuncs) {
        babelHelpers.get(M_SkeletalMesh.prototype.__proto__ || Object.getPrototypeOf(M_SkeletalMesh.prototype), '_copy', this).call(this, instance);

        instance._jointsHierarchy = this._jointsHierarchy.clone();
        instance._inverseBindMatrices = this._inverseBindMatrices;
        instance._bindShapeMatrix = this._bindShapeMatrix;
        instance._jointNames = this._jointNames;
        instance._gltfJointIndices = this._gltfJointIndices;
        instance._joints = this._joints;

        onCompleteFuncs.push(function (clonedSkeletalMesh, _clonedRootElement, jointRootGroupUserFlavorName) {
          return function () {
            var clonedJointRootGroup = _clonedRootElement.searchElement(jointRootGroupUserFlavorName);
            clonedSkeletalMesh._jointsHierarchy = clonedJointRootGroup;
          };
        }(instance, clonedRootElement, this._jointsHierarchy.userFlavorName));
      }
    }, {
      key: 'getRootJointsWorldPositionAt',
      value: function getRootJointsWorldPositionAt(inputValue) {
        if (this._joints.length > 0) {
          var rootJointMatrix = this._joints[0].getWorldMatrixAt(inputValue);
          var rootJointPosWorld = new Vector3(rootJointMatrix.multiplyVector(Vector4$1.zero()));
          return rootJointPosWorld;
        }

        return Vector3.zero();
      }
    }, {
      key: 'jointsHierarchy',
      set: function set(jointsHierarchy) {
        this._jointsHierarchy = jointsHierarchy;
      },
      get: function get() {
        return this._jointsHierarchy;
      }
    }, {
      key: 'rootJointName',
      get: function get() {
        return this._rootJointName;
      }
    }, {
      key: 'inverseBindMatrices',
      set: function set(inverseBindMatrices) {
        this._inverseBindMatrices = inverseBindMatrices;
        this._geometry.setExtraDataForShader('jointN', inverseBindMatrices.length < 4 ? 4 : inverseBindMatrices.length);
      },
      get: function get() {
        return this._inverseBindMatrices;
      }
    }, {
      key: 'bindShapeMatrix',
      set: function set(matrix) {
        this._bindShapeMatrix = matrix;
      },
      get: function get() {
        return this._bindShapeMatrix;
      }
    }, {
      key: 'jointNames',
      set: function set(names) {
        this._jointNames = names;
      },
      get: function get() {
        return this._jointNames;
      }
    }, {
      key: 'gltfJointIndices',
      set: function set(indices) {
        this._gltfJointIndices = indices;
      },
      get: function get() {
        return this._gltfJointIndices;
      }
    }, {
      key: 'isSkeletonVisible',
      set: function set(flg) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this._joints[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var joint = _step3.value;

            joint.isGizmoVisible = flg;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      },
      get: function get() {
        return this._joints[0].isGizmoVisible;
      }
    }, {
      key: 'rootJointsWorldPosition',
      get: function get() {
        if (this._joints.length > 0) {
          var rootJointMatrix = this._joints[0].worldMatrix;
          var rootJointPosWorld = new Vector3(rootJointMatrix.multiplyVector(Vector4$1.zero()));
          return rootJointPosWorld;
        }
        return Vector3.zero();
      }
    }]);
    return M_SkeletalMesh;
  }(M_Mesh);


  GLBoost$1['M_SkeletalMesh'] = M_SkeletalMesh;

  var M_SkeletalGeometry = function (_Geometry) {
    babelHelpers.inherits(M_SkeletalGeometry, _Geometry);

    function M_SkeletalGeometry(glBoostContext) {
      babelHelpers.classCallCheck(this, M_SkeletalGeometry);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_SkeletalGeometry.__proto__ || Object.getPrototypeOf(M_SkeletalGeometry)).call(this, glBoostContext));

      _this._skeletalShaderSpecified = null;
      _this._skeletalShaderNormal = null;
      return _this;
    }

    babelHelpers.createClass(M_SkeletalGeometry, [{
      key: 'update',
      value: function update(skeletalMesh) {

        var joints = skeletalMesh._joints;
        var matrices = [];

        var areThereAnyJointsWhichHaveAnimation = false;

        if (joints[0].parent._getCurrentAnimationInputValue(joints[0].parent._activeAnimationLineName) !== null) {
          areThereAnyJointsWhichHaveAnimation = true;
        }

        var input = joints[0]._getCurrentAnimationInputValue('time');

        var jointZeroWorldMatrix = null;
        var skeletalMeshWorldMatrix = null;
        var skeletalMeshTransformMatrixAccmulatedAncestry = skeletalMesh.getWorldMatrixAt(input);
        var inverseSkeletalMeshTransformMatrixAccmulatedAncestry = Matrix44$1.invert(skeletalMeshTransformMatrixAccmulatedAncestry);

        for (var i = joints.length - 1; i >= 0; i--) {
          var globalJointTransform = null;
          var inverseBindMatrix = joints[i].inverseBindMatrix;
          if (areThereAnyJointsWhichHaveAnimation) {
            globalJointTransform = joints[i].getWorldMatrixAt(input);
            skeletalMeshWorldMatrix = globalJointTransform;
          } else {
            globalJointTransform = skeletalMeshTransformMatrixAccmulatedAncestry;
            skeletalMeshWorldMatrix = globalJointTransform;
            var bindMat = joints[i].bindMatrix;
            globalJointTransform = Matrix44$1.multiply(skeletalMeshWorldMatrix, bindMat);
          }
          if (i === 0) {
            jointZeroWorldMatrix = globalJointTransform;
          }

          if (this._materialForSkeletals[0].shaderInstance && this._materialForSkeletals[0].shaderInstance.constructor === FreeShader) {
            matrices[i] = inverseSkeletalMeshTransformMatrixAccmulatedAncestry;
          } else {
            matrices[i] = Matrix44$1.identity();
          }
          matrices[i] = Matrix44$1.multiply(matrices[i], globalJointTransform);
          joints[i].jointPoseMatrix = Matrix44$1.multiply(Matrix44$1.identity(), globalJointTransform);
          matrices[i] = Matrix44$1.multiply(matrices[i], inverseBindMatrix);
          matrices[i] = Matrix44$1.multiply(matrices[i], skeletalMesh.bindShapeMatrix);
        }

        GLBoost$1.JointGizmoUpdater.update(joints, jointZeroWorldMatrix);

        if (!GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {

          var flatMatrices = [];
          for (var _i = 0; _i < matrices.length; _i++) {
            Array.prototype.push.apply(flatMatrices, matrices[_i].flattenAsArray());
          }

          if (matrices.length < 4) {
            var identityMatrices = [];
            for (var _i2 = 0; _i2 < 4 - matrices.length; _i2++) {
              Array.prototype.push.apply(identityMatrices, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }
            Array.prototype.push.apply(flatMatrices, identityMatrices);
          }
          skeletalMesh._jointMatrices = flatMatrices;
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1) {
          {

            skeletalMesh._qArray = new Float32Array(matrices.length * 4);
            skeletalMesh._tArray = new Float32Array(matrices.length * 4);

            for (var _i3 = 0; _i3 < matrices.length; _i3++) {
              var m = matrices[_i3];
              var scale = new Vector3(Math.sqrt(m.m00 * m.m00 + m.m01 * m.m01 + m.m02 * m.m02), Math.sqrt(m.m10 * m.m10 + m.m11 * m.m11 + m.m12 * m.m12), Math.sqrt(m.m20 * m.m20 + m.m21 * m.m21 + m.m22 * m.m22));

              matrices[_i3].m00 /= scale.x;
              matrices[_i3].m01 /= scale.x;
              matrices[_i3].m02 /= scale.x;
              matrices[_i3].m10 /= scale.y;
              matrices[_i3].m11 /= scale.y;
              matrices[_i3].m12 /= scale.y;
              matrices[_i3].m20 /= scale.z;
              matrices[_i3].m21 /= scale.z;
              matrices[_i3].m22 /= scale.z;

              var q = Quaternion.fromMatrix(matrices[_i3]);

              skeletalMesh._qArray[_i3 * 4 + 0] = q.x;
              skeletalMesh._qArray[_i3 * 4 + 1] = q.y;
              skeletalMesh._qArray[_i3 * 4 + 2] = q.z;
              skeletalMesh._qArray[_i3 * 4 + 3] = q.w;
              var t = matrices[_i3].getTranslate();
              skeletalMesh._tArray[_i3 * 4 + 0] = t.x;
              skeletalMesh._tArray[_i3 * 4 + 1] = t.y;
              skeletalMesh._tArray[_i3 * 4 + 2] = t.z;
              skeletalMesh._tArray[_i3 * 4 + 3] = Math.max(scale.x, scale.y, scale.z);
            }
          }
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {

          {
            skeletalMesh._qtArray = new Float32Array(matrices.length * 4);
            var tXArray = [];
            var tYArray = [];
            var tZArray = [];
            for (var _i4 = 0; _i4 < matrices.length; _i4++) {
              var _t = matrices[_i4].getTranslate();
              tXArray.push(Math.abs(_t.x));
              tYArray.push(Math.abs(_t.y));
              tZArray.push(Math.abs(_t.z));
            }

            skeletalMesh._translationScale = new Vector3();
            var maxX = Math.max.apply(null, tXArray);
            var maxY = Math.max.apply(null, tYArray);
            var maxZ = Math.max.apply(null, tZArray);
            skeletalMesh._translationScale.x = maxX * 1.1;
            skeletalMesh._translationScale.y = maxY * 1.1;
            skeletalMesh._translationScale.z = maxZ * 1.1;

            for (var _i5 = 0; _i5 < matrices.length; _i5++) {
              var s = matrices[_i5].getScale();


              var _q = Quaternion.fromMatrix(matrices[_i5]);
              _q.normalize();
              var vec2QPacked = MathClassUtil.packNormalizedVec4ToVec2(_q.x, _q.y, _q.z, _q.w, 4096);
              var _t2 = matrices[_i5].getTranslate();
              skeletalMesh._qtArray[_i5 * 4 + 0] = vec2QPacked[0];
              skeletalMesh._qtArray[_i5 * 4 + 1] = vec2QPacked[1];
              var vec2TPacked = MathClassUtil.packNormalizedVec4ToVec2(_t2.x / skeletalMesh._translationScale.x, _t2.y / skeletalMesh._translationScale.y, _t2.z / skeletalMesh._translationScale.z, 0.0, 4096);
              skeletalMesh._qtArray[_i5 * 4 + 2] = vec2TPacked[0];
              skeletalMesh._qtArray[_i5 * 4 + 3] = vec2TPacked[1];
            }
          }
        }
      }
    }, {
      key: 'drawIntermediate',
      value: function drawIntermediate(gl, glslProgram, skeletalMesh, material) {
        if (skeletalMesh._jointMatrices === null && skeletalMesh._qtArray === null && skeletalMesh._qArray === null) {
          return;
        }


        if (!GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
          Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'JOINTMATRIX', new Float32Array(skeletalMesh._jointMatrices));
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL === 1) {
          Shader.trySettingVec4ArrayToUniform(gl, glslProgram, material, material._semanticsDic, 'JOINT_QUATERNION', skeletalMesh._qArray);

          Shader.trySettingVec4ArrayToUniform(gl, glslProgram, material, material._semanticsDic, 'JOINT_TRANSLATION', skeletalMesh._tArray);
        } else if (GLBoost$1.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL > 1) {
          Shader.trySettingVec4ArrayToUniform(gl, glslProgram, material, material._semanticsDic, 'JOINT_QUATTRANSLATION', skeletalMesh._qtArray);
          this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_translationScale'), skeletalMesh._translationScale.x, skeletalMesh._translationScale.y, skeletalMesh._translationScale.z, true);
        }
      }
    }, {
      key: 'prepareToRender',
      value: function prepareToRender(expression, existCamera_f, pointLight, meshMaterial, skeletalMesh) {
        var shaderClassSpecified = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : void 0;
        var argMaterials = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : void 0;


        if (argMaterials !== void 0) {
          this._materialForSkeletals = argMaterials;
        } else {
          if (this._materials.length > 0) {
            this._materialForSkeletals = this._materials;
          } else if (meshMaterial) {
            this._materialForSkeletals = [meshMaterial];
          } else {
            this._materialForSkeletals = [this._defaultMaterial];
          }
        }

        var derrivedClass = null;
        if (!(this._materialForSkeletals[0].shaderInstance && this._materialForSkeletals[0].shaderInstance.constructor === FreeShader)) {

          var baseClass = null;
          if (shaderClassSpecified) {
            baseClass = shaderClassSpecified;

            var _SkeletalShader = function (_baseClass) {
              babelHelpers.inherits(_SkeletalShader, _baseClass);

              function _SkeletalShader(glBoostContext, basicShader) {
                babelHelpers.classCallCheck(this, _SkeletalShader);

                var _this2 = babelHelpers.possibleConstructorReturn(this, (_SkeletalShader.__proto__ || Object.getPrototypeOf(_SkeletalShader)).call(this, glBoostContext, basicShader));

                _SkeletalShader.mixin(SkeletalShaderSource);
                return _this2;
              }

              return _SkeletalShader;
            }(baseClass);

            derrivedClass = _SkeletalShader;
            this._skeletalShaderSpecified = derrivedClass;
          } else {
            var _loop = function _loop(materialForSkeletal) {

              baseClass = materialForSkeletal.shaderClass;

              var SkeletalShader = function (_baseClass2) {
                babelHelpers.inherits(SkeletalShader, _baseClass2);

                function SkeletalShader(glBoostContext, basicShader) {
                  babelHelpers.classCallCheck(this, SkeletalShader);

                  var _this3 = babelHelpers.possibleConstructorReturn(this, (SkeletalShader.__proto__ || Object.getPrototypeOf(SkeletalShader)).call(this, glBoostContext, basicShader));

                  SkeletalShader.mixin(SkeletalShaderSource);
                  return _this3;
                }

                return SkeletalShader;
              }(baseClass);

              derrivedClass = SkeletalShader;
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this._materialForSkeletals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var materialForSkeletal = _step.value;

                _loop(materialForSkeletal);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            this._skeletalShaderNormal = derrivedClass;
          }

          for (var i = 0; i < this._materialForSkeletals.length; i++) {
            if (shaderClassSpecified) ; else {
              if (this._materialForSkeletals[i].shaderClass.name !== derrivedClass.name) {
                this._materialForSkeletals[i].shaderClass = derrivedClass;
              }
            }
          }
        }

        return babelHelpers.get(M_SkeletalGeometry.prototype.__proto__ || Object.getPrototypeOf(M_SkeletalGeometry.prototype), 'prepareToRender', this).call(this, expression, existCamera_f, pointLight, meshMaterial, skeletalMesh, derrivedClass, argMaterials);
      }
    }]);
    return M_SkeletalGeometry;
  }(Geometry);

  var M_PerspectiveCamera = function (_M_AbstractCamera) {
    babelHelpers.inherits(M_PerspectiveCamera, _M_AbstractCamera);

    function M_PerspectiveCamera(glBoostContext, toRegister, lookat, perspective) {
      babelHelpers.classCallCheck(this, M_PerspectiveCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_PerspectiveCamera.__proto__ || Object.getPrototypeOf(M_PerspectiveCamera)).call(this, glBoostContext, toRegister));

      _this._lowLevelCamera = new L_PerspectiveCamera(_this, false, lookat, perspective);
      _this._lowLevelCamera._middleLevelCamera = _this;
      return _this;
    }

    babelHelpers.createClass(M_PerspectiveCamera, [{
      key: '_needUpdateProjection',
      value: function _needUpdateProjection() {
        this._lowLevelCamera._needUpdateProjection();
      }
    }, {
      key: 'projectionRHMatrix',
      value: function projectionRHMatrix() {
        return this._lowLevelCamera.projectionRHMatrix();
      }
    }, {
      key: 'updateCountAsCameraProjection',
      get: function get() {
        return this._lowLevelCamera.updateCountAsCameraProjection;
      }
    }, {
      key: 'fovy',
      set: function set(value) {
        this._lowLevelCamera.fovy = value;
      },
      get: function get() {
        return this._lowLevelCamera.fovy;
      }
    }, {
      key: 'aspect',
      set: function set(value) {
        this._lowLevelCamera.aspect = value;
      },
      get: function get() {
        return this._lowLevelCamera.aspect;
      }
    }, {
      key: 'zNear',
      set: function set(value) {
        this._lowLevelCamera.zNear = value;
      },
      get: function get() {
        return this._lowLevelCamera.zNear;
      }
    }, {
      key: 'zFar',
      set: function set(value) {
        this._lowLevelCamera.zFar = value;
      },
      get: function get() {
        return this._lowLevelCamera.zFar;
      }
    }]);
    return M_PerspectiveCamera;
  }(M_AbstractCamera);


  GLBoost$1['M_PerspectiveCamera'] = M_PerspectiveCamera;

  var M_FrustumCamera = function (_M_AbstractCamera) {
    babelHelpers.inherits(M_FrustumCamera, _M_AbstractCamera);

    function M_FrustumCamera(glBoostContext, toRegister, lookat, perspective) {
      babelHelpers.classCallCheck(this, M_FrustumCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_FrustumCamera.__proto__ || Object.getPrototypeOf(M_FrustumCamera)).call(this, glBoostContext, toRegister));

      _this._lowLevelCamera = new L_FrustumCamera(_this, false, lookat, perspective);
      _this._lowLevelCamera._middleLevelCamera = _this;
      return _this;
    }

    babelHelpers.createClass(M_FrustumCamera, [{
      key: '_needUpdateProjection',
      value: function _needUpdateProjection() {
        this._lowLevelCamera._needUpdateProjection();
      }
    }, {
      key: 'projectionRHMatrix',
      value: function projectionRHMatrix() {
        return this._lowLevelCamera.projectionRHMatrix();
      }
    }, {
      key: 'updateCountAsCameraProjection',
      get: function get() {
        return this._lowLevelCamera.updateCountAsCameraProjection;
      }
    }, {
      key: 'left',
      set: function set(value) {
        this._lowLevelCamera.left = value;
      },
      get: function get() {
        return this._lowLevelCamera.left;
      }
    }, {
      key: 'right',
      set: function set(value) {
        this._lowLevelCamera.right = value;
      },
      get: function get() {
        return this._lowLevelCamera.right;
      }
    }, {
      key: 'top',
      set: function set(value) {
        this._lowLevelCamera.top = value;
      },
      get: function get() {
        return this._lowLevelCamera.top;
      }
    }, {
      key: 'bottom',
      set: function set(value) {
        this._lowLevelCamera.bottom = value;
      },
      get: function get() {
        return this._lowLevelCamera.bottom;
      }
    }, {
      key: 'zNear',
      set: function set(value) {
        this._lowLevelCamera.zNear = value;
      },
      get: function get() {
        return this._lowLevelCamera.zNear;
      }
    }, {
      key: 'zFar',
      set: function set(value) {
        this._lowLevelCamera.zFar = value;
      },
      get: function get() {
        return this._lowLevelCamera.zFar;
      }
    }, {
      key: 'aspect',
      get: function get() {
        return (this._lowLevelCamera.right - this._lowLevelCamera.left) / (this._lowLevelCamera.top - this._lowLevelCamera.bottom);
      }
    }]);
    return M_FrustumCamera;
  }(M_AbstractCamera);


  GLBoost$1['M_FrustumCamera'] = M_FrustumCamera;

  var M_OrthoCamera = function (_M_AbstractCamera) {
    babelHelpers.inherits(M_OrthoCamera, _M_AbstractCamera);

    function M_OrthoCamera(glBoostContext, toRegister, lookat, ortho) {
      babelHelpers.classCallCheck(this, M_OrthoCamera);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_OrthoCamera.__proto__ || Object.getPrototypeOf(M_OrthoCamera)).call(this, glBoostContext, toRegister));

      _this._lowLevelCamera = new L_OrthoCamera(_this, false, lookat, ortho);
      _this._lowLevelCamera._middleLevelCamera = _this;
      return _this;
    }

    babelHelpers.createClass(M_OrthoCamera, [{
      key: '_needUpdateProjection',
      value: function _needUpdateProjection() {
        this._lowLevelCamera._needUpdateProjection();
      }
    }, {
      key: 'projectionRHMatrix',
      value: function projectionRHMatrix() {
        return this._lowLevelCamera.projectionRHMatrix();
      }
    }, {
      key: 'updateCountAsCameraProjection',
      get: function get() {
        return this._lowLevelCamera.updateCountAsCameraProjection;
      }
    }, {
      key: 'left',
      set: function set(value) {
        this._lowLevelCamera.left = value;
      },
      get: function get() {
        return this._lowLevelCamera.left;
      }
    }, {
      key: 'right',
      set: function set(value) {
        this._lowLevelCamera.right = value;
      },
      get: function get() {
        return this._lowLevelCamera.right;
      }
    }, {
      key: 'bottom',
      set: function set(value) {
        this._lowLevelCamera.bottom = value;
      },
      get: function get() {
        return this._lowLevelCamera.bottom;
      }
    }, {
      key: 'top',
      set: function set(value) {
        this._lowLevelCamera.top = value;
      },
      get: function get() {
        return this._lowLevelCamera.top;
      }
    }, {
      key: 'zNear',
      set: function set(value) {
        this._lowLevelCamera.zNear = value;
      },
      get: function get() {
        return this._lowLevelCamera.zNear;
      }
    }, {
      key: 'zFar',
      set: function set(value) {
        this._lowLevelCamera.zFar = value;
      },
      get: function get() {
        return this._lowLevelCamera.zFar;
      }
    }, {
      key: 'xmag',
      set: function set(value) {
        this._lowLevelCamera.xmag = value;
      },
      get: function get() {
        return this._lowLevelCamera.xmag;
      }
    }, {
      key: 'ymag',
      set: function set(value) {
        this._lowLevelCamera.ymag = value;
      },
      get: function get() {
        return this._lowLevelCamera.ymag;
      }
    }, {
      key: 'aspect',
      get: function get() {
        return (this._lowLevelCamera.right - this._lowLevelCamera.left) / (this._lowLevelCamera.top - this._lowLevelCamera.bottom);
      }
    }]);
    return M_OrthoCamera;
  }(M_AbstractCamera);


  GLBoost$1['M_OrthoCamera'] = M_OrthoCamera;

  var Arrow = function (_Geometry) {
    babelHelpers.inherits(Arrow, _Geometry);

    function Arrow(glBoostSystem, length) {
      var lineCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      babelHelpers.classCallCheck(this, Arrow);

      var _this = babelHelpers.possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call(this, glBoostSystem));

      _this._setupVertexData(length, lineCount);
      return _this;
    }

    babelHelpers.createClass(Arrow, [{
      key: '_setupVertexData',
      value: function _setupVertexData(length, lineCount) {

        var arrowheadWidth = length / 10;
        var arrowheadLength = length / 7.5;
        var stickLength = length - arrowheadLength;
        var halfLength = length / 2;

        var positions = [];

        for (var i = 0; i < lineCount; i++) {
          var lineOffset = (i - lineCount / 2) * arrowheadWidth;
          var lineOtherOffset = arrowheadWidth;
          if (i % 2 !== 1) {
            lineOtherOffset = -lineOtherOffset;
          }

          positions.push(new Vector3(lineOtherOffset, lineOffset, halfLength));
          positions.push(new Vector3(lineOtherOffset, lineOffset, -stickLength + halfLength));

          positions.push(new Vector3(arrowheadWidth + lineOtherOffset, lineOffset, -stickLength + halfLength));
          positions.push(new Vector3(-arrowheadWidth + lineOtherOffset, lineOffset, -stickLength + halfLength));

          positions.push(new Vector3(-arrowheadWidth + lineOtherOffset, lineOffset, -stickLength + halfLength));
          positions.push(new Vector3(lineOtherOffset, lineOffset, -length + halfLength));

          positions.push(new Vector3(lineOtherOffset, lineOffset, -length + halfLength));
          positions.push(new Vector3(arrowheadWidth + lineOtherOffset, lineOffset, -stickLength + halfLength));
        }

        this.setVerticesData({
          position: positions
        }, null, GLBoost$1.LINES);
      }
    }]);
    return Arrow;
  }(Geometry);


  GLBoost$1["Arrow"] = Arrow;

  var M_DirectionalLightGizmo = function (_M_Gizmo) {
    babelHelpers.inherits(M_DirectionalLightGizmo, _M_Gizmo);

    function M_DirectionalLightGizmo(glBoostSystem, length) {
      babelHelpers.classCallCheck(this, M_DirectionalLightGizmo);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_DirectionalLightGizmo.__proto__ || Object.getPrototypeOf(M_DirectionalLightGizmo)).call(this, glBoostSystem, null, null));

      _this._init(glBoostSystem, length);

      _this.isVisible = false;

      _this.baseColor = new Vector4$1(0.8, 0.8, 0, 1);
      return _this;
    }

    babelHelpers.createClass(M_DirectionalLightGizmo, [{
      key: '_init',
      value: function _init(glBoostSystem, length) {
        this._material = new ClassicMaterial$1(glBoostSystem);
        this._mesh = new M_Mesh(glBoostSystem, new Arrow(glBoostSystem, length, 3), this._material);

        this.addChild(this._mesh);
      }
    }, {
      key: 'rotate',
      set: function set(rotateVec3) {
        this._mesh.rotate = rotateVec3;
      },
      get: function get() {
        return this._mesh.rotate;
      }
    }, {
      key: 'baseColor',
      set: function set(colorVec) {
        this._material.baseColor = colorVec;
      },
      get: function get() {
        return this._material.baseColor;
      }
    }]);
    return M_DirectionalLightGizmo;
  }(M_Gizmo);

  var M_DirectionalLight = function (_M_AbstractLight) {
    babelHelpers.inherits(M_DirectionalLight, _M_AbstractLight);

    function M_DirectionalLight(glBoostSystem, intensity) {
      var rotate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3(0, 0, 0);
      var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;
      babelHelpers.classCallCheck(this, M_DirectionalLight);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_DirectionalLight.__proto__ || Object.getPrototypeOf(M_DirectionalLight)).call(this, glBoostSystem));

      _this._intensity = intensity;
      _this._direction = new Vector3(0.0, 1.0, 0.0);


      _this._gizmo = new M_DirectionalLightGizmo(glBoostSystem, length);
      _this._gizmos.push(_this._gizmo);

      _this.rotate = rotate;

      _this._isLightType = 'directional';

      return _this;
    }

    babelHelpers.createClass(M_DirectionalLight, [{
      key: 'callCameraCustomFunction',
      value: function callCameraCustomFunction() {
        if (this._camera) {
          if (this._camera.customFunction) {
            this._camera.customFunction(this);
          }
        }
      }
    }, {
      key: 'multiplyMatrixGizmo',
      set: function set(mat4) {
        this._gizmo.matrix = mat4;
      },
      get: function get() {
        return this._gizmo.getMatrixNotAnimated();
      }
    }, {
      key: 'intensity',
      set: function set(vec) {
        this._intensity = vec;
      },
      get: function get() {
        return this._intensity;
      }
    }, {
      key: 'rotate',
      set: function set(vec3) {
        babelHelpers.set(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'rotate', vec3, this);
        this._gizmo._mesh.rotate = vec3;

        this.callCameraCustomFunction();
      },
      get: function get() {
        return babelHelpers.get(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'rotate', this);
      }
    }, {
      key: 'translate',
      set: function set(vec3) {
        babelHelpers.set(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'translate', vec3, this);
        this._gizmo._mesh.translate = vec3;

        this.callCameraCustomFunction();
      },
      get: function get() {
        return this._gizmo.translate;
      }
    }, {
      key: 'matrix',
      set: function set(vec3) {
        babelHelpers.set(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'matrix', vec3, this);
        this._gizmo._mesh.matrix = vec3;

        this.callCameraCustomFunction();
      },
      get: function get() {
        return babelHelpers.get(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'matrix', this);
      }
    }, {
      key: 'quaternion',
      set: function set(vec3) {
        babelHelpers.set(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'quaternion', vec3, this);
        this._gizmo._mesh.quaternion = vec3;

        this.callCameraCustomFunction();
      },
      get: function get() {
        return babelHelpers.get(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'quaternion', this);
      }
    }, {
      key: 'direction',
      set: function set(_zDir) {
        var yDir = new Vector3(0, 1, 0);
        var xDir = Vector3.cross(yDir, _zDir);
        var zDir = Vector3.cross(xDir, yDir);

        var result = Matrix44$1.identity();

        result.m00 = xDir.x;
        result.m10 = xDir.y;
        result.m20 = xDir.z;

        result.m01 = yDir.x;
        result.m11 = yDir.y;
        result.m21 = yDir.z;

        result.m02 = zDir.x;
        result.m12 = zDir.y;
        result.m22 = zDir.z;


        this.matrix = result;
        this._gizmo._mesh.matrix = result;

        this.callCameraCustomFunction();
      },
      get: function get() {
        var result = new Matrix33(babelHelpers.get(M_DirectionalLight.prototype.__proto__ || Object.getPrototypeOf(M_DirectionalLight.prototype), 'quaternion', this)).multiplyVector(this._direction);
        return result;
      }
    }, {
      key: 'directionInWorld',
      get: function get() {
        var direction = new Vector3(this.worldMatrixWithoutMySelf.getRotate().multiplyVector(new Vector4$1(this.direction)));
        return direction;
      }
    }]);
    return M_DirectionalLight;
  }(M_AbstractLight);

  var M_AmbientLight = function (_M_AbstractLight) {
    babelHelpers.inherits(M_AmbientLight, _M_AbstractLight);

    function M_AmbientLight(glBoostContext, intensity) {
      babelHelpers.classCallCheck(this, M_AmbientLight);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_AmbientLight.__proto__ || Object.getPrototypeOf(M_AmbientLight)).call(this, glBoostContext));

      _this._intensity = intensity;
      _this._isLightType = 'ambient';
      return _this;
    }

    babelHelpers.createClass(M_AmbientLight, [{
      key: 'intensity',
      set: function set(vec) {
        this._intensity = vec;
      },
      get: function get() {
        return this._intensity;
      }
    }]);
    return M_AmbientLight;
  }(M_AbstractLight);

  var M_SpotLight = function (_M_AbstractLight) {
    babelHelpers.inherits(M_SpotLight, _M_AbstractLight);

    function M_SpotLight(glBoostContext, intensity) {
      var rotate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3(0, 0, 0);
      babelHelpers.classCallCheck(this, M_SpotLight);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_SpotLight.__proto__ || Object.getPrototypeOf(M_SpotLight)).call(this, glBoostContext));

      _this._intensity = intensity;

      _this._isLightType = 'spot';
      _this._direction = new Vector3(0.0, 1.0, 0.0);

      _this.rotate = rotate;

      _this._spotExponent = 1.0;
      _this._spotCutoffInDegree = 30;

      return _this;
    }

    babelHelpers.createClass(M_SpotLight, [{
      key: 'callCameraCustomFunction',
      value: function callCameraCustomFunction() {
        if (this._camera) {
          if (this._camera.customFunction) {
            this._camera.customFunction(this);
          }
        }
      }
    }, {
      key: 'intensity',
      set: function set(vec) {
        this._intensity = vec;
      },
      get: function get() {
        return this._intensity;
      }
    }, {
      key: 'direction',
      set: function set(_zDir) {
        var yDir = new Vector3(0, 1, 0);
        var xDir = Vector3.cross(yDir, _zDir);
        var zDir = Vector3.cross(xDir, yDir);

        var result = Matrix44.identity();

        result.m00 = xDir.x;
        result.m10 = xDir.y;
        result.m20 = xDir.z;

        result.m01 = yDir.x;
        result.m11 = yDir.y;
        result.m21 = yDir.z;

        result.m02 = zDir.x;
        result.m12 = zDir.y;
        result.m22 = zDir.z;


        this.matrix = result;

        this.callCameraCustomFunction();
      },
      get: function get() {
        var result = new Matrix33(this.quaternion).multiplyVector(this._direction);
        return result;
      }
    }, {
      key: 'translate',
      get: function get() {
        return this._gizmo.translate;
      }
    }, {
      key: 'rotate',
      set: function set(vec3) {
        babelHelpers.set(M_SpotLight.prototype.__proto__ || Object.getPrototypeOf(M_SpotLight.prototype), 'rotate', vec3, this);

        this.callCameraCustomFunction();
      },
      get: function get() {
        return babelHelpers.get(M_SpotLight.prototype.__proto__ || Object.getPrototypeOf(M_SpotLight.prototype), 'rotate', this);
      }
    }, {
      key: 'matrix',
      set: function set(vec3) {
        babelHelpers.set(M_SpotLight.prototype.__proto__ || Object.getPrototypeOf(M_SpotLight.prototype), 'matrix', vec3, this);
        this._gizmo._mesh.matrix = vec3;

        this.callCameraCustomFunction();
      },
      get: function get() {
        return babelHelpers.get(M_SpotLight.prototype.__proto__ || Object.getPrototypeOf(M_SpotLight.prototype), 'matrix', this);
      }
    }, {
      key: 'quaternion',
      set: function set(vec3) {
        babelHelpers.set(M_SpotLight.prototype.__proto__ || Object.getPrototypeOf(M_SpotLight.prototype), 'quaternion', vec3, this);
        this._gizmo._mesh.quaternion = vec3;

        this.callCameraCustomFunction();
      },
      get: function get() {
        return babelHelpers.get(M_SpotLight.prototype.__proto__ || Object.getPrototypeOf(M_SpotLight.prototype), 'quaternion', this);
      }
    }, {
      key: 'directionInWorld',
      get: function get() {
        var direction = new Vector3(this.worldMatrixWithoutMySelf.getRotate().multiplyVector(new Vector4(this.direction)));
        return direction;
      }
    }, {
      key: 'spotExponent',
      set: function set(val) {
        this._spotExponent = val;
      },
      get: function get() {
        return this._spotExponent;
      }
    }, {
      key: 'spotCutoffInDegree',
      set: function set(val) {
        this._spotCutoffInDegree = val;
      },
      get: function get() {
        return this._spotCutoffInDegree;
      }
    }, {
      key: 'spotCosCutoff',
      get: function get() {
        return Math.cos(MathUtil.degreeToRadian(this._spotCutoffInDegree));
      }
    }]);
    return M_SpotLight;
  }(M_AbstractLight);


  GLBoost$1['M_SpotLight'] = M_SpotLight;

  var M_AxisGizmo = function (_M_Gizmo) {
    babelHelpers.inherits(M_AxisGizmo, _M_Gizmo);

    function M_AxisGizmo(glBoostSystem, length) {
      babelHelpers.classCallCheck(this, M_AxisGizmo);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_AxisGizmo.__proto__ || Object.getPrototypeOf(M_AxisGizmo)).call(this, glBoostSystem));

      _this._init(glBoostSystem, length);
      return _this;
    }

    babelHelpers.createClass(M_AxisGizmo, [{
      key: '_init',
      value: function _init(glBoostSystem, length) {
        var mesh = new M_Mesh(glBoostSystem, new Axis(glBoostSystem, length));
        this.addChild(mesh);
      }
    }]);
    return M_AxisGizmo;
  }(M_Gizmo);

  var Grid = function (_Geometry) {
    babelHelpers.inherits(Grid, _Geometry);

    function Grid(glBoostContext, length, division, isXZ, isXY, isYZ) {
      babelHelpers.classCallCheck(this, Grid);

      var _this = babelHelpers.possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, glBoostContext));

      _this._setupVertexData(length, division, isXZ, isXY, isYZ);
      return _this;
    }

    babelHelpers.createClass(Grid, [{
      key: '_setupVertexData',
      value: function _setupVertexData(length, division, isXZ, isXY, isYZ) {

        var positions = [];

        for (var i = 0; i < division * 2 + 3; i++) {
          var start = -length;
          var oneUnitLength = length / (division + 1);

          if (isXZ) {
            positions.push(new Vector3(-length, 0, start + oneUnitLength * i));
            positions.push(new Vector3(length, 0, start + oneUnitLength * i));

            positions.push(new Vector3(start + oneUnitLength * i, 0, -length));
            positions.push(new Vector3(start + oneUnitLength * i, 0, length));
          }

          if (isXY) {
            positions.push(new Vector3(-length, start + oneUnitLength * i, 0));
            positions.push(new Vector3(length, start + oneUnitLength * i, 0));

            positions.push(new Vector3(start + oneUnitLength * i, -length, 0));
            positions.push(new Vector3(start + oneUnitLength * i, length, 0));
          }

          if (isYZ) {
            positions.push(new Vector3(0, -length, start + oneUnitLength * i));
            positions.push(new Vector3(0, length, start + oneUnitLength * i));

            positions.push(new Vector3(0, start + oneUnitLength * i, -length));
            positions.push(new Vector3(0, start + oneUnitLength * i, length));
          }
        }

        this.setVerticesData({
          position: positions
        }, null, GLBoost$1.LINES);
      }
    }]);
    return Grid;
  }(Geometry);


  GLBoost$1["Grid"] = Grid;

  var M_GridGizmo = function (_M_Gizmo) {
    babelHelpers.inherits(M_GridGizmo, _M_Gizmo);

    function M_GridGizmo(glBoostContext, length, division) {
      var isXZ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var isXY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var isYZ = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var colorVec = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Vector4$1(0.5, 0.5, 0.5, 1);
      babelHelpers.classCallCheck(this, M_GridGizmo);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_GridGizmo.__proto__ || Object.getPrototypeOf(M_GridGizmo)).call(this, glBoostContext, null, null));

      _this._init(glBoostContext, length, division, isXZ, isXY, isYZ, colorVec);
      return _this;
    }

    babelHelpers.createClass(M_GridGizmo, [{
      key: '_init',
      value: function _init(glBoostContext, length, division, isXZ, isXY, isYZ, colorVec) {
        this._material = new ClassicMaterial$1(glBoostContext);
        this._material.baseColor = colorVec;
        this.addChild(new M_Mesh(glBoostContext, new Grid(glBoostContext, length, division, isXZ, isXY, isYZ, colorVec), this._material));
      }
    }]);
    return M_GridGizmo;
  }(M_Gizmo);

  var M_OutlineGizmo = function (_M_Gizmo) {
    babelHelpers.inherits(M_OutlineGizmo, _M_Gizmo);

    function M_OutlineGizmo(glBoostSystem, mesh) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;
      babelHelpers.classCallCheck(this, M_OutlineGizmo);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_OutlineGizmo.__proto__ || Object.getPrototypeOf(M_OutlineGizmo)).call(this, glBoostSystem, null, null));

      if (mesh.className === 'M_Mesh') {
        _this._init(glBoostSystem, mesh, scale);
      }
      return _this;
    }

    babelHelpers.createClass(M_OutlineGizmo, [{
      key: '_init',
      value: function _init(glBoostSystem, mesh, scale) {

        this._mesh = mesh.clone();
        this.isPreDraw = true;
        this._material = new ClassicMaterial$1(glBoostSystem);
        this._material.baseColor = new Vector4$1(0, 1, 0, 1);

        this._material.states.enable = [2884];
        this._material.states.functions.cullFace = [1028];
        this._material.states.functions.depthMask = [true];
        this._material.userFlavorName = "OutlineGizmoMaterial";

        this._forceThisMaterial = this._material;

        this._group = glBoostSystem._glBoostContext.createGroup();
        this.updateMatrix(mesh);
        this._group.addChild(this._mesh);
        this.addChild(this._group);

        var centerPoint = mesh.AABBInWorld.updateAllInfo().centerPoint;
      }
    }, {
      key: 'updateMatrix',
      value: function updateMatrix(mesh) {
        if (mesh.className === 'M_Mesh') {
          this._group.matrix = mesh.worldMatrix;
        }
      }
    }]);
    return M_OutlineGizmo;
  }(M_Gizmo);

  var Line = function (_Geometry) {
    babelHelpers.inherits(Line, _Geometry);

    function Line(glBoostContext) {
      var startPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Vector3.zero();
      var endPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Vector3.zero();
      var haveTerminalMark = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      babelHelpers.classCallCheck(this, Line);

      var _this = babelHelpers.possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, glBoostContext));

      _this.__startPos = startPos;
      _this.__endPos = endPos;

      _this.__haveTerminalMark = haveTerminalMark;

      _this._color = new GLBoost$1.Vector4(1, 1, 1, 1);
      _this._vertexData = _this._setupVertexData(_this.__startPos, _this.__endPos, haveTerminalMark);
      _this.setVerticesData(_this._vertexData, null, GLBoost$1.LINES);
      return _this;
    }

    babelHelpers.createClass(Line, [{
      key: '_setupVertexData',
      value: function _setupVertexData(startPos, endPos, haveTerminalMark) {

        var positions = [];

        positions.push(startPos);
        positions.push(endPos);

        var colors = [];

        colors.push(this._color);
        colors.push(this._color);

        if (haveTerminalMark) {
          var length = startPos.lengthTo(endPos);
          var markSize = length * 0.1;

          positions.push(new Vector3(startPos.x - markSize, startPos.y, startPos.z));
          positions.push(new Vector3(startPos.x + markSize, startPos.y, startPos.z));

          positions.push(new Vector3(startPos.x, startPos.y, startPos.z - markSize));
          positions.push(new Vector3(startPos.x, startPos.y, startPos.z + markSize));

          positions.push(new Vector3(endPos.x - markSize, endPos.y, endPos.z));
          positions.push(new Vector3(endPos.x + markSize, endPos.y, endPos.z));

          positions.push(new Vector3(endPos.x, endPos.y, endPos.z - markSize));
          positions.push(new Vector3(endPos.x, endPos.y, endPos.z + markSize));

          colors.push(this._color);
          colors.push(this._color);
          colors.push(this._color);
          colors.push(this._color);
          colors.push(this._color);
          colors.push(this._color);
          colors.push(this._color);
          colors.push(this._color);
        }

        this._vertexData = {
          position: positions,
          color: colors
        };

        return this._vertexData;
      }
    }, {
      key: 'update',
      value: function update() {
        this._vertexData = this._setupVertexData(this.__startPos, this.__endPos, this.__haveTerminalMark);
        this.updateVerticesData(this._vertexData, true);
      }
    }, {
      key: 'startPosition',
      set: function set(startPos) {
        this.__startPos = startPos;
      },
      get: function get() {
        return this.__startPos;
      }
    }, {
      key: 'endPosition',
      set: function set(endPos) {
        this.__endPos = endPos;
      },
      get: function get() {
        return this.__endPos;
      }
    }, {
      key: 'color',
      set: function set(vec) {
        this._color = vec;

        this._colors = [];
        for (var i = 0; i < 2; i++) {
          this._colors.push(this._color);
        }
      },
      get: function get() {
        return this._color;
      }
    }]);
    return Line;
  }(Geometry);


  GLBoost$1["Line"] = Line;

  var M_HeightLineGizmo = function (_M_Gizmo) {
    babelHelpers.inherits(M_HeightLineGizmo, _M_Gizmo);

    function M_HeightLineGizmo(glBoostContext) {
      babelHelpers.classCallCheck(this, M_HeightLineGizmo);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_HeightLineGizmo.__proto__ || Object.getPrototypeOf(M_HeightLineGizmo)).call(this, glBoostContext, null, null));

      _this._init(glBoostContext);

      _this.isVisible = false;
      return _this;
    }

    babelHelpers.createClass(M_HeightLineGizmo, [{
      key: '_init',
      value: function _init(glBoostContext) {
        this._primitive = new Line(glBoostContext, Vector3.zero(), Vector3.zero(), true);

        var material = glBoostContext._glBoostContext.createClassicMaterial();
        this._material = material;
        this._mesh = new M_Mesh(glBoostContext, this._primitive, material);
        this._mesh.isPickable = false;
        this._mesh.masterElement = this;
        this.addChild(this._mesh);
      }
    }, {
      key: 'update',
      value: function update() {
        this._primitive.update();
      }
    }, {
      key: 'color',
      set: function set(val) {
        this._material.baseColor = val;
      },
      get: function get() {
        return this._material.baseColor;
      }
    }, {
      key: 'startPosition',
      set: function set(startPos) {
        this._primitive.startPosition = startPos;
      },
      get: function get() {
        return this._primitive.startPosition;
      }
    }, {
      key: 'endPosition',
      set: function set(endPos) {
        this._primitive.endPosition = endPos;
      },
      get: function get() {
        return this._primitive.endPosition;
      }
    }, {
      key: 'isVisible',
      set: function set(flag) {
        this._mesh.isVisible = flag;
      },
      get: function get() {
        return this._mesh.isVisible;
      }
    }]);
    return M_HeightLineGizmo;
  }(M_Gizmo);


  GLBoost['M_HeightLineGizmo'] = M_HeightLineGizmo;

  var M_ScreenMesh = function (_M_Mesh) {
    babelHelpers.inherits(M_ScreenMesh, _M_Mesh);

    function M_ScreenMesh(glBoostContext, customVertexAttributes) {
      babelHelpers.classCallCheck(this, M_ScreenMesh);

      var _this = babelHelpers.possibleConstructorReturn(this, (M_ScreenMesh.__proto__ || Object.getPrototypeOf(M_ScreenMesh)).call(this, glBoostContext, null, null));

      _this._init(customVertexAttributes);
      return _this;
    }

    babelHelpers.createClass(M_ScreenMesh, [{
      key: '_init',
      value: function _init(customVertexAttributes) {
        var gl = this._glContext.gl;
        this.geometry = new Screen(this._glBoostSystem, void 0, customVertexAttributes);
        this.isAffectedByWorldMatrix = false;
        this.isAffectedByViewMatrix = false;
        this.isAffectedByProjectionMatrix = false;

        var material = new ClassicMaterial$1(this._glBoostSystem);
        material.globalStatesUsage = GLBoost.GLOBAL_STATES_USAGE_IGNORE;
        material.states = {
          "enable": [gl.BLEND],
          "functions": {
            "blendFuncSeparate": [770, 771, 1, 1]
          }
        };
        this.geometry.materials = [material];
        this._material = material;
      }
    }, {
      key: 'material',
      set: function set(obj) {
        this._material = obj;
        this.geometry.materials = [obj];
      },
      get: function get() {
        return this._material;
      }
    }]);
    return M_ScreenMesh;
  }(M_Mesh);


  GLBoost["M_ScreenMesh"] = M_ScreenMesh;

  var GLBoostMiddleContext = function (_GLBoostLowContext) {
    babelHelpers.inherits(GLBoostMiddleContext, _GLBoostLowContext);

    function GLBoostMiddleContext(canvas, initParameter, gl, width, height) {
      babelHelpers.classCallCheck(this, GLBoostMiddleContext);

      var _this = babelHelpers.possibleConstructorReturn(this, (GLBoostMiddleContext.__proto__ || Object.getPrototypeOf(GLBoostMiddleContext)).call(this, canvas, initParameter, gl, width, height));

      _this._glBoostMonitor = M_GLBoostMonitor.getInstance();
      return _this;
    }

    babelHelpers.createClass(GLBoostMiddleContext, [{
      key: 'createScene',
      value: function createScene() {
        return new M_Scene(this.__system);
      }
    }, {
      key: 'createGroup',
      value: function createGroup() {
        return new M_Group(this.__system);
      }
    }, {
      key: 'createMesh',
      value: function createMesh(geometry, material) {
        return new M_Mesh(this.__system, geometry, material);
      }
    }, {
      key: 'createSkeletalMesh',
      value: function createSkeletalMesh(geometry, material, rootJointName) {
        return new M_SkeletalMesh(this.__system, geometry, material, rootJointName);
      }
    }, {
      key: 'createSkeletalGeometry',
      value: function createSkeletalGeometry() {
        return new M_SkeletalGeometry(this.__system);
      }
    }, {
      key: 'createRenderer',
      value: function createRenderer(parameters) {
        return new Renderer(this.__system, parameters);
      }
    }, {
      key: 'createExpression',
      value: function createExpression() {
        return this.createExpressionAndRenderPasses(1);
      }
    }, {
      key: 'createExpressionAndRenderPasses',
      value: function createExpressionAndRenderPasses(number) {
        var expression = new Expression(this.__system);
        var renderPasses = this.createRenderPasses(number);
        expression.addRenderPasses(renderPasses);

        return expression;
      }
    }, {
      key: 'createRenderPasses',
      value: function createRenderPasses(number) {
        var renderPasses = [];
        for (var i = 0; i < number; i++) {
          renderPasses.push(new RenderPass(this.__system));
        }

        return renderPasses;
      }
    }, {
      key: 'createPerspectiveCamera',
      value: function createPerspectiveCamera(lookat, perspective) {
        return new M_PerspectiveCamera(this.__system, true, lookat, perspective);
      }
    }, {
      key: 'createFrustumCamera',
      value: function createFrustumCamera(lookat, perspective) {
        return new M_FrustumCamera(this.__system, true, lookat, perspective);
      }
    }, {
      key: 'createOrthoCamera',
      value: function createOrthoCamera(lookat, ortho) {
        return new M_OrthoCamera(this.__system, true, lookat, ortho);
      }
    }, {
      key: 'createDirectionalLight',
      value: function createDirectionalLight(intensity, rotate, length) {
        return new M_DirectionalLight(this.__system, intensity, rotate, length);
      }
    }, {
      key: 'createPointLight',
      value: function createPointLight(intensity) {
        return new M_PointLight(this.__system, intensity);
      }
    }, {
      key: 'createAmbientLight',
      value: function createAmbientLight(intensity) {
        return new M_AmbientLight(this.__system, intensity);
      }
    }, {
      key: 'createSpotLight',
      value: function createSpotLight(intensity, rotate) {
        return new M_SpotLight(this.__system, intensity, rotate);
      }
    }, {
      key: 'createJoint',
      value: function createJoint(isExistJointGizmo) {
        return new M_Joint(this.__system, isExistJointGizmo);
      }
    }, {
      key: 'createAxisGizmo',
      value: function createAxisGizmo(length) {
        return new M_AxisGizmo(this.__system, length);
      }
    }, {
      key: 'createGridGizmo',
      value: function createGridGizmo(length, division, isXZ, isXY, isYZ, colorVec) {
        return new M_GridGizmo(this.__system, length, division, isXZ, isXY, isYZ, colorVec);
      }
    }, {
      key: 'createOutlineGizmo',
      value: function createOutlineGizmo(mesh) {
        return new M_OutlineGizmo(this.__system, mesh);
      }
    }, {
      key: 'createHeightLineGizmo',
      value: function createHeightLineGizmo(startPos, endPos) {
        return new M_HeightLineGizmo(this.__system, startPos, endPos);
      }
    }, {
      key: 'createEffekseerElement',
      value: function createEffekseerElement() {
        return new EffekseerElement$1(this.__system);
      }
    }, {
      key: 'createScreenMesh',
      value: function createScreenMesh(customVertexAttributes) {
        return new M_ScreenMesh(this.__system, customVertexAttributes);
      }
    }, {
      key: 'createFreeShader',
      value: function createFreeShader(vertexShaderText, fragmentShaderText, attributes, uniforms, textureNames) {
        return new FreeShader(this.__system, vertexShaderText, fragmentShaderText, attributes, uniforms, textureNames);
      }
    }]);
    return GLBoostMiddleContext;
  }(GLBoostLowContext);


  GLBoost['GLBoostMiddleContext'] = GLBoostMiddleContext;

  var PhongShaderSource = function () {
    function PhongShaderSource() {
      babelHelpers.classCallCheck(this, PhongShaderSource);
    }

    babelHelpers.createClass(PhongShaderSource, [{
      key: 'FSDefine_PhongShaderSource',
      value: function FSDefine_PhongShaderSource(in_, f, lights) {
        var shaderText = '';
        shaderText += 'uniform vec4 Kd;\n';
        shaderText += 'uniform vec4 Ks;\n';
        shaderText += 'uniform float power;\n';
        shaderText += 'uniform vec4 ambient;\n';
        var sampler2D = this._sampler2DShadow_func();

        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;
        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform highp ' + sampler2D + ' uDepthTexture[' + lightNumExceptAmbient + '];\n';
          shaderText += in_ + ' vec4 v_shadowCoord[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform int isShadowCasting[' + lightNumExceptAmbient + '];\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSShade_PhongShaderSource',
      value: function FSShade_PhongShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  float depthBias = 0.005;\n';
        shaderText += '  vec4 surfaceColor = rt0;\n';
        shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];
          var isShadowEnabledAsTexture = light.camera && light.camera.texture ? true : false;
          shaderText += '  {\n';
          shaderText += Shader._generateLightStr(i);
          shaderText += Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
          shaderText += '    float diffuse = max(dot(lightDirection, normal), 0.0);\n';
          shaderText += '    rt0 += spotEffect * vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[' + i + '] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
          shaderText += '    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n';
          shaderText += '    vec3 reflect = reflect(-lightDirection, normal);\n';
          shaderText += '    float specular = pow(max(dot(reflect, viewDirection), 0.0), power);\n';
          shaderText += '    rt0 += spotEffect * vec4(visibilitySpecular, visibilitySpecular, visibilitySpecular, 1.0) * Ks * lightDiffuse[' + i + '] * vec4(specular, specular, specular, 1.0);\n';
          shaderText += '  }\n';
        }
        shaderText += '  rt0.xyz += ambient.xyz;\n';


        return shaderText;
      }
    }, {
      key: 'prepare_PhongShaderSource',
      value: function prepare_PhongShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
        material.setUniform(shaderProgram, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
        material.setUniform(shaderProgram, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));

        material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));

        return vertexAttribsAsResult;
      }
    }]);
    return PhongShaderSource;
  }();

  var PhongShader = function (_DecalShader) {
    babelHelpers.inherits(PhongShader, _DecalShader);

    function PhongShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, PhongShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (PhongShader.__proto__ || Object.getPrototypeOf(PhongShader)).call(this, glBoostContext, basicShader));

      PhongShader.mixin(PhongShaderSource);

      _this._power = 64.0;

      return _this;
    }

    babelHelpers.createClass(PhongShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(PhongShader.prototype.__proto__ || Object.getPrototypeOf(PhongShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var Kd = material.diffuseColor;
        var Ks = material.specularColor;
        var Ka = material.ambientColor;
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w, true);
        this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_power'), this._power, true);

        var ambient = Vector4$1.multiplyVector(Ka, scene.getAmountOfAmbientLightsIntensity());
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);
      }
    }, {
      key: 'Kd',
      set: function set(value) {
        this._Kd = value;
      },
      get: function get() {
        return this._Kd;
      }
    }, {
      key: 'Ks',
      set: function set(value) {
        this._Ks = value;
      },
      get: function get() {
        return this._Ks;
      }
    }, {
      key: 'power',
      set: function set(value) {
        this._power = value;
      },
      get: function get() {
        return this._power;
      }
    }]);
    return PhongShader;
  }(DecalShader);


  GLBoost['PhongShader'] = PhongShader;

  var singleton$4 = Symbol();
  var singletonEnforcer$1 = Symbol();

  var ObjLoader = function () {
    function ObjLoader(enforcer) {
      babelHelpers.classCallCheck(this, ObjLoader);

      if (enforcer !== singletonEnforcer$1) {
        throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
      }
    }

    babelHelpers.createClass(ObjLoader, [{
      key: 'loadObj',
      value: function loadObj(glBoostContext, url) {
        var _this = this;

        var defaultShader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var mtlString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        return DataUtil.loadResourceAsync(url, false, function (resolve, responseText) {
          var gotText = responseText;
          var partsOfPath = url.split('/');
          var basePath = '';
          for (var i = 0; i < partsOfPath.length - 1; i++) {
            basePath += partsOfPath[i] + '/';
          }
          _this._constructMesh(glBoostContext, gotText, basePath, defaultShader, mtlString, resolve);
        }, function (reject, err) {});
      }
    }, {
      key: '_loadMaterialsFromString',
      value: function _loadMaterialsFromString(glBoostContext, mtlString, defaultShader) {
        var basePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var resolve = arguments[4];


        var mtlTextRows = mtlString.split('\n');

        var numMaterial = 0;

        for (var i = 0; i < mtlTextRows.length; i++) {
          var matchArray = mtlTextRows[i].match(/^(\w+) (\w+)/);
          if (matchArray === null) {
            continue;
          }

          if (matchArray[1] === "newmtl") {
            numMaterial++;
          }
        }

        var materials = new Array(numMaterial);
        var iMCount = -1;

        var promisesToLoadTexture = [];

        for (var _i2 = 0; _i2 < mtlTextRows.length; _i2++) {
          var _matchArray = mtlTextRows[_i2].match(/(\w+) ([\w:\/\-\.]+)/);

          if (_matchArray === null) {
            continue;
          }

          if (_matchArray[1] === "newmtl") {
            iMCount++;
            materials[iMCount] = glBoostContext.createClassicMaterial();
            if (defaultShader) {
              materials[iMCount].shaderClass = defaultShader;
            } else {
              materials[iMCount].shaderClass = PhongShader;
            }
            materials[iMCount].name = _matchArray[2];
          }

          if (_matchArray[1].toLowerCase() === "ka") {
            _matchArray = mtlTextRows[_i2].match(/(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
            materials[iMCount].ambientColor.x = parseFloat(_matchArray[2]);
            materials[iMCount].ambientColor.y = parseFloat(_matchArray[3]);
            materials[iMCount].ambientColor.z = parseFloat(_matchArray[4]);
          }

          if (_matchArray[1].toLowerCase() === "kd") {
            _matchArray = mtlTextRows[_i2].match(/(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
            materials[iMCount].diffuseColor.x = parseFloat(_matchArray[2]);
            materials[iMCount].diffuseColor.y = parseFloat(_matchArray[3]);
            materials[iMCount].diffuseColor.z = parseFloat(_matchArray[4]);
          }

          if (_matchArray[1].toLowerCase() === "ks") {
            _matchArray = mtlTextRows[_i2].match(/(\w+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/);
            materials[iMCount].specularColor.x = parseFloat(_matchArray[2]);
            materials[iMCount].specularColor.y = parseFloat(_matchArray[3]);
            materials[iMCount].specularColor.z = parseFloat(_matchArray[4]);
          }

          if (_matchArray[1].toLowerCase() === "map_kd") {
            _matchArray = mtlTextRows[_i2].match(/(\w+) ([\w:\/\-\.]+)/);
            var texture = glBoostContext.createTexture(null, _matchArray[2], { 'UNPACK_FLIP_Y_WEBGL': true });
            var promise = texture.generateTextureFromUri(basePath + _matchArray[2], false);
            promisesToLoadTexture.push(promise);
            materials[iMCount].setTexture(texture);
          }
        }

        var promiseAll = Promise.all(promisesToLoadTexture);
        promiseAll.then(function () {
          resolve(materials);
        });
      }
    }, {
      key: '_loadMaterialsFromFile',
      value: function _loadMaterialsFromFile(glBoostContext, basePath, fileName, defaultShader) {
        var _this2 = this;

        return DataUtil.loadResourceAsync(basePath + fileName, false, function (resolve, responseText) {
          _this2._loadMaterialsFromString(glBoostContext, responseText, defaultShader, basePath, resolve);
        }, function (reject, err) {});
      }
    }, {
      key: '_constructMesh',
      value: function _constructMesh(glBoostContext, objText, basePath, defaultShader, mtlString, resolve) {
        var _this3 = this;

        var objTextRows = objText.split('\n');
        var promise = null;
        var vCount = 0;
        var fCount = 0;
        var vnCount = 0;
        var vtCount = 0;

        if (mtlString) {
          promise = function () {
            return new Promise(function (resolve, reject) {
              _this3._loadMaterialsFromString(glBoostContext, mtlString, defaultShader, '', resolve);
            });
          }();
        }

        for (var i = 0; i < objTextRows.length; i++) {
          var matchArray = objTextRows[i].match(/^(\w+) (\w+)/);
          if (matchArray === null) {
            continue;
          }

          if (matchArray[1] === "mtllib" && mtlString === null) {
            promise = this._loadMaterialsFromFile(glBoostContext, basePath, matchArray[2] + '.mtl', defaultShader);
          }
        }

        promise.then(function (materials) {
          for (var _i3 = 0; _i3 < objTextRows.length; _i3++) {
            var _matchArray2 = objTextRows[_i3].match(/^(\w+) +(\w+)/);
            if (_matchArray2 === null) {
              continue;
            }

            if (_matchArray2[1] === "v") {
              vCount++;
            }

            if (_matchArray2[1] === "vn") {
              vnCount++;
            }

            if (_matchArray2[1] === "vt") {
              vtCount++;
            }

            if (_matchArray2[1] === "f") {
              _matchArray2 = objTextRows[_i3].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
              if (_matchArray2 !== null) {
                fCount += 2;
              } else {
                fCount++;
              }
            }
          }

          var pvCoord = new Array(vCount);
          var pvNormal = new Array(vnCount);
          var pvTexture = new Array(vtCount);

          vCount = 0;
          vnCount = 0;
          vtCount = 0;

          for (var _i4 = 0; _i4 < objTextRows.length; _i4++) {
            var _matchArray3 = objTextRows[_i4].match(/^(\w+) /);

            if (_matchArray3 === null) {
              continue;
            }

            if (_matchArray3[1] === "v") {
              _matchArray3 = objTextRows[_i4].match(/^(\w+) +(-?[0-9\.]+) (-?[0-9\.]+) (-?[0-9\.]+)/);

              pvCoord[vCount] = new Vector3();
              pvCoord[vCount].x = parseFloat(_matchArray3[2]);
              pvCoord[vCount].y = parseFloat(_matchArray3[3]);
              pvCoord[vCount].z = parseFloat(_matchArray3[4]);
              vCount++;
            }

            if (_matchArray3[1] === "vn") {
              _matchArray3 = objTextRows[_i4].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+) (-?[0-9\.]+)/);

              pvNormal[vnCount] = new Vector3();
              pvNormal[vnCount].x = parseFloat(_matchArray3[2]);
              pvNormal[vnCount].y = parseFloat(_matchArray3[3]);
              pvNormal[vnCount].z = parseFloat(_matchArray3[4]);
              vnCount++;
            }

            if (_matchArray3[1] === "vt") {
              _matchArray3 = objTextRows[_i4].match(/^(\w+) (-?[0-9\.]+) (-?[0-9\.]+)/);
              pvTexture[vtCount] = new Vector2();
              pvTexture[vtCount].x = parseFloat(_matchArray3[2]);
              pvTexture[vtCount].y = parseFloat(_matchArray3[3]);


              vtCount++;
            }
          }

          var positions = new Array();
          var texcoords = new Array();
          var normals = new Array();
          var indices = [];

          var boFlag = false;

          var FaceN = fCount;
          fCount = 0;

          var geometry = glBoostContext.createGeometry();

          for (var _i5 = 0; _i5 < materials.length; _i5++) {
            var matIndices = new Array();
            var tmpIndices = new Array();
            var tmpPositions = new Array();
            var tmpTexcoords = new Array();
            var tmpNormals = new Array();

            var _i = 0;
            for (var j = 0; j < objTextRows.length && fCount < FaceN; j++) {
              var _matchArray4 = objTextRows[j].match(/^(\w+) (\w+)/);

              if (_matchArray4 === null) {
                continue;
              }

              if (_matchArray4[1] === "usemtl") {
                if (_matchArray4[2] === materials[_i5].name) {
                  boFlag = true;
                } else {
                  boFlag = false;
                }
              }

              if (_matchArray4[1] === "f" && boFlag) {
                var isQuad = true;
                var _matchArray5 = objTextRows[j].match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);if (_matchArray5 === null) {
                  _matchArray5 = objTextRows[j].match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
                }
                if (_matchArray5 === null) {
                  isQuad = false;
                }

                if (materials[_i5].hasAnyTextures()) {
                  if (isQuad) {
                    _this3._addQuadDataToArraysWithTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                  } else {
                    _this3._addTriangleDataToArraysWithTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                  }
                } else {
                  if (isQuad) {
                    _this3._addQuadDataToArraysWithoutTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                  } else {
                    _this3._addTriangleDataToArraysWithoutTexture(tmpPositions, tmpNormals, tmpTexcoords, pvCoord, pvNormal, pvTexture, objTextRows[j], fCount);
                  }
                }

                _i = _this3._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount * 3, matIndices, tmpIndices, _i);
                _i = _this3._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount * 3 + 1, matIndices, tmpIndices, _i);
                _i = _this3._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount * 3 + 2, matIndices, tmpIndices, _i);

                if (isQuad) {
                  _i = _this3._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount * 3 + 3, matIndices, tmpIndices, _i);
                  _i = _this3._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount * 3 + 4, matIndices, tmpIndices, _i);
                  _i = _this3._reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, fCount * 3 + 5, matIndices, tmpIndices, _i);
                  fCount += 2;
                } else {
                  fCount++;
                }
              }
            }

            if (fCount === 0) {
                continue;
              }

            materials[_i5].setVertexN(geometry, matIndices.length);

            indices[_i5] = matIndices.concat();
          }

          var mesh = glBoostContext.createMesh(geometry, null);
          geometry.materials = materials;
          geometry.setVerticesData({
            position: positions,
            texcoord: texcoords,
            normal: normals
          }, indices);

          resolve(mesh);
        }).catch(function onRejected(error) {
          console.error(error);
        });
      }
    }, {
      key: '_reductionVertices',
      value: function _reductionVertices(positions, normals, texcoords, tmpPositions, tmpNormals, tmpTexcoords, vCount, matIndices, tmpIndices, _i) {
        var str = '' + tmpPositions[vCount].x + ',' + tmpPositions[vCount].y + ',' + tmpPositions[vCount].z + ',' + tmpNormals[vCount].x + ',' + tmpNormals[vCount].y + ',' + tmpNormals[vCount].z + ',' + tmpTexcoords[vCount].x + ',' + tmpTexcoords[vCount].y;

        var hashCode = Hash.toCRC32(str);
        if (typeof tmpIndices[hashCode] === 'undefined') {
          tmpIndices[hashCode] = _i;
          _i++;
          positions.push(tmpPositions[vCount]);
          normals.push(tmpNormals[vCount]);
          texcoords.push(tmpTexcoords[vCount]);
        }

        matIndices.push(tmpIndices[hashCode]);

        return _i;
      }
    }, {
      key: '_addTriangleDataToArraysWithTexture',
      value: function _addTriangleDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);

        if (matchArray !== null) {
          v1 = matchArray[2];
          vt1 = matchArray[3];
          vn1 = matchArray[4];
          v2 = matchArray[5];
          vt2 = matchArray[6];
          vn2 = matchArray[7];
          v3 = matchArray[8];
          vt3 = matchArray[9];
          vn3 = matchArray[10];
          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];
        } else {
          var _matchArray6 = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
          v1 = _matchArray6[2];
          vn1 = _matchArray6[3];
          v2 = _matchArray6[4];
          vn2 = _matchArray6[5];
          v3 = _matchArray6[6];
          vn3 = _matchArray6[7];
          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
        }
      }
    }, {
      key: '_addTriangleDataToArraysWithoutTexture',
      value: function _addTriangleDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);

        if (matchArray !== null) {
          v1 = matchArray[2];
          vn1 = matchArray[3];
          v2 = matchArray[4];
          vn2 = matchArray[5];
          v3 = matchArray[6];
          vn3 = matchArray[7];

          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
        } else {
          var _matchArray7 = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
          v1 = _matchArray7[2];
          vt1 = _matchArray7[3];
          vn1 = _matchArray7[4];
          v2 = _matchArray7[5];
          vt2 = _matchArray7[6];
          vn2 = _matchArray7[7];
          v3 = _matchArray7[8];
          vt3 = _matchArray7[9];
          vn3 = _matchArray7[10];

          positions[fCount * 3] = pvCoord[v1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];
        }
      }
    }, {
      key: '_addQuadDataToArraysWithTexture',
      value: function _addQuadDataToArraysWithTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0,
            v4 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0,
            vn4 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0,
            vt4 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);

        if (matchArray !== null) {
          v1 = matchArray[2];
          vt1 = matchArray[3];
          vn1 = matchArray[4];
          v2 = matchArray[5];
          vt2 = matchArray[6];
          vn2 = matchArray[7];
          v3 = matchArray[8];
          vt3 = matchArray[9];
          vn3 = matchArray[10];
          v4 = matchArray[11];
          vt4 = matchArray[12];
          vn4 = matchArray[13];

          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 3] = pvTexture[vt3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          texcoords[fCount * 3 + 4] = pvTexture[vt4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
          texcoords[fCount * 3 + 5] = pvTexture[vt1 - 1];
        } else {
          var _matchArray8 = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
          v1 = _matchArray8[2];
          vn1 = _matchArray8[3];
          v2 = _matchArray8[4];
          vn2 = _matchArray8[5];
          v3 = _matchArray8[6];
          vn3 = _matchArray8[7];
          v4 = _matchArray8[8];
          vn4 = _matchArray8[9];

          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
        }
      }
    }, {
      key: '_addQuadDataToArraysWithoutTexture',
      value: function _addQuadDataToArraysWithoutTexture(positions, normals, texcoords, pvCoord, pvNormal, pvTexture, stringToScan, fCount) {
        var v1 = 0,
            v2 = 0,
            v3 = 0,
            v4 = 0;
        var vn1 = 0,
            vn2 = 0,
            vn3 = 0,
            vn4 = 0;
        var vt1 = 0,
            vt2 = 0,
            vt3 = 0,
            vt4 = 0;
        var matchArray = stringToScan.match(/^(\w+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+) (\d+)\/\/(\d+)/);
        if (matchArray !== null) {
          v1 = matchArray[2];
          vn1 = matchArray[3];
          v2 = matchArray[4];
          vn2 = matchArray[5];
          v3 = matchArray[6];
          vn3 = matchArray[7];
          v4 = matchArray[8];
          vn4 = matchArray[9];
          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
        } else {
          var _matchArray9 = stringToScan.match(/^(\w+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+) (\d+)\/(\d*)\/(\d+)/);
          v1 = _matchArray9[2];
          vt1 = _matchArray9[3];
          vn1 = _matchArray9[4];
          v2 = _matchArray9[5];
          vt2 = _matchArray9[6];
          vn2 = _matchArray9[7];
          v3 = _matchArray9[8];
          vt3 = _matchArray9[9];
          vn3 = _matchArray9[10];
          v4 = _matchArray9[11];
          vt4 = _matchArray9[12];
          vn4 = _matchArray9[13];

          positions[fCount * 3] = pvCoord[v1 - 1];
          normals[fCount * 3] = pvNormal[vn1 - 1];
          texcoords[fCount * 3] = pvTexture[vt1 - 1];
          positions[fCount * 3 + 1] = pvCoord[v2 - 1];
          normals[fCount * 3 + 1] = pvNormal[vn2 - 1];
          texcoords[fCount * 3 + 1] = pvTexture[vt2 - 1];
          positions[fCount * 3 + 2] = pvCoord[v3 - 1];
          normals[fCount * 3 + 2] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 2] = pvTexture[vt3 - 1];

          positions[fCount * 3 + 3] = pvCoord[v3 - 1];
          normals[fCount * 3 + 3] = pvNormal[vn3 - 1];
          texcoords[fCount * 3 + 3] = pvTexture[vt3 - 1];
          positions[fCount * 3 + 4] = pvCoord[v4 - 1];
          normals[fCount * 3 + 4] = pvNormal[vn4 - 1];
          texcoords[fCount * 3 + 4] = pvTexture[vt4 - 1];
          positions[fCount * 3 + 5] = pvCoord[v1 - 1];
          normals[fCount * 3 + 5] = pvNormal[vn1 - 1];
          texcoords[fCount * 3 + 5] = pvTexture[vt1 - 1];
        }
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton$4]) {
          this[singleton$4] = new ObjLoader(singletonEnforcer$1);
        }
        return this[singleton$4];
      }
    }]);
    return ObjLoader;
  }();


  GLBoost$1["ObjLoader"] = ObjLoader;

  (function () {
    GLBoost$1.valueOfGLBoostConstants = [];
    var defineValueOfGLBoostConstants = function defineValueOfGLBoostConstants(glboostConstant_or_glboostConstantValueName, value) {
      if (isFinite(glboostConstant_or_glboostConstantValueName)) {
        var glboostConstant = glboostConstant_or_glboostConstantValueName;
        var glboostConstantName = GLBoost$1.getNameOfGLBoostConstant(glboostConstant);
        if (glboostConstantName) {
          var glboostConstantValueName = 'VALUE_' + glboostConstantName;
          Object.defineProperty(GLBoost$1, glboostConstantValueName, {
            get: function get() {

              return this.valueOfGLBoostConstants[glboostConstant];
            },
            set: function set(flg) {
              this.valueOfGLBoostConstants[glboostConstant] = flg;
            }
          });
          GLBoost$1[glboostConstantValueName] = value;
        }
      } else {
        var _glboostConstantValueName = glboostConstant_or_glboostConstantValueName;
        GLBoost$1[_glboostConstantValueName] = value;
      }
    };

    var define = defineValueOfGLBoostConstants;
    define('VALUE_TARGET_WEBGL_VERSION', 1);
    define('VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL', 0);
    define('VALUE_DEFAULT_POINTLIGHT_INTENSITY', new Vector3(1, 1, 1));
    define('VALUE_ANGLE_UNIT', GLBoost$1.DEGREE);
    define('VALUE_WEBGL_ONE_USE_EXTENSIONS', true);
    define('VALUE_CONSOLE_OUT_FOR_DEBUGGING', false);
    define(GLBoost$1.LOG_GENERAL, true);
    define(GLBoost$1.LOG_SHADER_CODE, true);
    define(GLBoost$1.LOG_GLBOOST_OBJECT_LIFECYCLE, true);
    define(GLBoost$1.LOG_GL_RESOURCE_LIFECYCLE, true);
    define(GLBoost$1.LOG_GL_ERROR, true);
    define(GLBoost$1.LOG_OMISSION_PROCESSING, false);
  })();

  var LambertShaderSource = function () {
    function LambertShaderSource() {
      babelHelpers.classCallCheck(this, LambertShaderSource);
    }

    babelHelpers.createClass(LambertShaderSource, [{
      key: 'FSDefine_LambertShaderSource',
      value: function FSDefine_LambertShaderSource(in_, f, lights) {

        var sampler2D = this._sampler2DShadow_func();
        var shaderText = '';
        shaderText += 'uniform vec4 Kd;\n';
        shaderText += 'uniform vec4 ambient;\n';

        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;
        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform highp ' + sampler2D + ' uDepthTexture[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform int isShadowCasting[' + lightNumExceptAmbient + '];\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSShade_LambertShaderSource',
      value: function FSShade_LambertShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  vec4 surfaceColor = rt0;\n';
        shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];
          var isShadowEnabledAsTexture = light.camera && light.camera.texture ? true : false;
          shaderText += '  {\n';
          shaderText += Shader._generateLightStr(i);
          shaderText += Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
          shaderText += '    float diffuse = max(dot(lightDirection, normal), 0.0);\n';
          shaderText += '    rt0 += spotEffect * vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[' + i + '] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
          shaderText += '  }\n';
        }
        shaderText += '  rt0.xyz += ambient.xyz;\n';

        return shaderText;
      }
    }, {
      key: 'prepare_LambertShaderSource',
      value: function prepare_LambertShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
        material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));

        return vertexAttribsAsResult;
      }
    }]);
    return LambertShaderSource;
  }();

  var LambertShader = function (_DecalShader) {
    babelHelpers.inherits(LambertShader, _DecalShader);

    function LambertShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, LambertShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (LambertShader.__proto__ || Object.getPrototypeOf(LambertShader)).call(this, glBoostContext, basicShader));

      LambertShader.mixin(LambertShaderSource);
      return _this;
    }

    babelHelpers.createClass(LambertShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(LambertShader.prototype.__proto__ || Object.getPrototypeOf(LambertShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var Kd = material.diffuseColor;
        var Ka = material.ambientColor;
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);

        var ambient = Vector4$1.multiplyVector(Ka, scene.getAmountOfAmbientLightsIntensity());
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);
      }
    }]);
    return LambertShader;
  }(DecalShader);


  GLBoost['LambertShader'] = LambertShader;

  var singleton$5 = Symbol();
  var singletonEnforcer$2 = Symbol();

  var GLTFLoader = function () {
    function GLTFLoader(enforcer) {
      babelHelpers.classCallCheck(this, GLTFLoader);

      if (enforcer !== singletonEnforcer$2) {
        throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
      }
    }

    babelHelpers.createClass(GLTFLoader, [{
      key: 'getDefaultShader',
      value: function getDefaultShader(options) {
        var defaultShader = null;

        if (options && typeof options.defaultShaderClass !== "undefined") {
          if (typeof options.defaultShaderClass === "string") {
            defaultShader = GLBoost$1[options.defaultShaderClass];
          } else {
            defaultShader = options.defaultShaderClass;
          }
        }

        return defaultShader;
      }
    }, {
      key: 'getOptions',
      value: function getOptions(defaultOptions, json, options) {
        if (json.asset && json.asset.extras && json.asset.extras.loadOptions) {
          for (var optionName in json.asset.extras.loadOptions) {
            defaultOptions[optionName] = json.asset.extras.loadOptions[optionName];
          }
        }

        for (var _optionName in options) {
          defaultOptions[_optionName] = options[_optionName];
        }

        if (defaultOptions.loaderExtension && typeof defaultOptions.loaderExtension === "string") {
          defaultOptions.loaderExtension = GLBoost$1[options.loaderExtension].getInstance();
        }

        if (defaultOptions.statesOfElements) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = defaultOptions.statesOfElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var state = _step.value;

              if (state.shaderClass && typeof state.shaderClass === "string") {
                state.shaderClass = GLBoost$1[state.shaderClass];
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        if (options && typeof options.defaultMaterial !== "undefined") {
          if (typeof options.defaultMaterial === "string") {
            defaultOptions.defaultMaterial = GLBoost$1[options.defaultMaterial];
          } else {
            defaultOptions.defaultMaterial = options.defaultMaterial;
          }
        }

        if (defaultOptions.defaultMaterial != null && defaultOptions.defaultMaterial.name.indexOf('PBR') !== -1) {
          defaultOptions.defaultShaderClass = defaultOptions.defaultMaterial.shaderClass;
        } else if (options && typeof options.defaultShaderClass !== "undefined") {
          if (typeof options.defaultShaderClass === "string") {
            defaultOptions.defaultShaderClass = GLBoost$1[options.defaultShaderClass];
          } else {
            defaultOptions.defaultShaderClass = options.defaultShaderClass;
          }
        }

        return defaultOptions;
      }
    }, {
      key: 'loadGLTF',
      value: function loadGLTF(glBoostContext, url, options) {
        var _this = this;

        var defaultOptions = {
          files: {},
          loaderExtension: null,
          isNeededToMultiplyAlphaToColorOfPixelOutput: true,
          isTextureImageToLoadPreMultipliedAlphaAsDefault: false,
          isExistJointGizmo: false,
          isBlend: false,
          isDepthTest: true,
          defaultMaterial: ClassicMaterial$1,
          defaultShaderClass: null,
          isMeshTransparentAsDefault: false,
          defaultStates: {
            states: {
              enable: [],
              functions: {}
            },
            isTransparent: true,
            opacity: 1.0,
            shaderClass: DecalShader,
            isTextureImageToLoadPreMultipliedAlpha: false,
            globalStatesUsage: GLBoost$1.GLOBAL_STATES_USAGE_IGNORE },
          statesOfElements: [{
            targets: [],
            specifyMethod: GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME,
            states: {
              enable: [],
              functions: {}
            },
            isTransparent: true,
            opacity: 1.0,
            shaderClass: DecalShader,
            isTextureImageToLoadPreMultipliedAlpha: false,
            globalStatesUsage: GLBoost$1.GLOBAL_STATES_USAGE_IGNORE }]
        };

        this._materials = [];
        if (options && options.files) {
          var _loop = function _loop(fileName) {
            var splitted = fileName.split('.');
            var fileExtension = splitted[splitted.length - 1];

            if (fileExtension === 'gltf' || fileExtension === 'glb') {
              return {
                v: new Promise(function (resolve, response) {
                  _this.checkArrayBufferOfGltf(options.files[fileName], null, options, defaultOptions, glBoostContext, resolve);
                }, function (reject, error) {})
              };
            }
          };

          for (var fileName in options.files) {
            var _ret = _loop(fileName);

            if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
          }
        }

        return DataUtil.loadResourceAsync(url, true, function (resolve, response) {
          var arrayBuffer = response;

          _this.checkArrayBufferOfGltf(arrayBuffer, url, options, defaultOptions, glBoostContext, resolve);
        }, function (reject, error) {});
      }
    }, {
      key: 'checkArrayBufferOfGltf',
      value: function checkArrayBufferOfGltf(arrayBuffer, url, options, defaultOptions, glBoostContext, resolve) {
        var dataView = new DataView(arrayBuffer, 0, 20);
        var isLittleEndian = true;

        var magicStr = '';
        magicStr += String.fromCharCode(dataView.getUint8(0, isLittleEndian));
        magicStr += String.fromCharCode(dataView.getUint8(1, isLittleEndian));
        magicStr += String.fromCharCode(dataView.getUint8(2, isLittleEndian));
        magicStr += String.fromCharCode(dataView.getUint8(3, isLittleEndian));
        if (magicStr !== 'glTF') {
          this.loadAsTextJson(arrayBuffer, url, options, defaultOptions, glBoostContext, resolve);
        } else {
          this.loadAsBinaryJson(dataView, isLittleEndian, arrayBuffer, options, defaultOptions, glBoostContext, resolve);
        }
      }
    }, {
      key: 'loadAsBinaryJson',
      value: function loadAsBinaryJson(dataView, isLittleEndian, arrayBuffer, options, defaultOptions, glBoostContext, resolve) {
        var gltfVer = dataView.getUint32(4, isLittleEndian);
        if (gltfVer !== 1) {
          reject('invalid version field in this binary glTF file.');
        }
        var lengthOfThisFile = dataView.getUint32(8, isLittleEndian);
        var lengthOfContent = dataView.getUint32(12, isLittleEndian);
        var contentFormat = dataView.getUint32(16, isLittleEndian);
        if (contentFormat !== 0) {
          reject('invalid contentFormat field in this binary glTF file.');
        }
        var arrayBufferContent = arrayBuffer.slice(20, lengthOfContent + 20);
        var gotText = DataUtil.arrayBufferToString(arrayBufferContent);
        var json = JSON.parse(gotText);
        var arrayBufferBinary = arrayBuffer.slice(20 + lengthOfContent);
        var glTFVer = this._checkGLTFVersion(json);
        options = this.getOptions(defaultOptions, json, options);
        var defaultShader = options.defaultShaderClass;
        this._loadResourcesAndScene(glBoostContext, arrayBufferBinary, null, json, defaultShader, glTFVer, resolve, options);
        return { options: options, defaultShader: defaultShader };
      }
    }, {
      key: 'loadAsTextJson',
      value: function loadAsTextJson(arrayBuffer, url, options, defaultOptions, glBoostContext, resolve) {
        var gotText = DataUtil.arrayBufferToString(arrayBuffer);

        var basePath = '';
        if (url) {
          var partsOfPath = url.split('/');
          for (var i = 0; i < partsOfPath.length - 1; i++) {
            basePath += partsOfPath[i] + '/';
          }
        } else {
          basePath = null;
        }

        var json = JSON.parse(gotText);
        var glTFVer = this._checkGLTFVersion(json);
        options = this.getOptions(defaultOptions, json, options);
        var defaultShader = options.defaultShaderClass;
        this._loadResourcesAndScene(glBoostContext, null, basePath, json, defaultShader, glTFVer, resolve, options);
        return { options: options, defaultShader: defaultShader };
      }
    }, {
      key: '_checkGLTFVersion',
      value: function _checkGLTFVersion(json) {
        var glTFVer = 1.0;
        if (json.asset && json.asset.version) {
          glTFVer = parseFloat(json.asset.version);
        }
        return glTFVer;
      }
    }, {
      key: '_loadResourcesAndScene',
      value: function _loadResourcesAndScene(glBoostContext, arrayBufferBinary, basePath, json, defaultShader, glTFVer, resolve, options) {
        var _this2 = this;

        var shadersJson = json.shaders;
        var shaders = {};
        var buffers = {};
        var textures = {};
        var promisesToLoadResources = [];

        var _loop2 = function _loop2(shaderName) {
          shaders[shaderName] = {};

          var shaderJson = shadersJson[shaderName];
          var shaderType = shaderJson.type;
          if (typeof shaderJson.extensions !== 'undefined' && typeof shaderJson.extensions.KHR_binary_glTF !== 'undefined') {
            shaders[shaderName].shaderText = _this2._accessBinaryAsShader(shaderJson.extensions.KHR_binary_glTF.bufferView, json, arrayBufferBinary);
            shaders[shaderName].shaderType = shaderType;
            return 'continue';
          }

          var shaderUri = shaderJson.uri;

          if (options.files) {
            var _splitted2 = shaderUri.split('/');
            var _filename2 = _splitted2[_splitted2.length - 1];
            if (options.files[_filename2]) {
              var _arrayBuffer = options.files[_filename2];
              shaders[shaderName].shaderText = DataUtil.arrayBufferToString(_arrayBuffer);
              shaders[shaderName].shaderType = shaderType;
              return 'continue';
            }
          }

          if (shaderUri.match(/^data:/)) {
            promisesToLoadResources.push(new Promise(function (fulfilled, rejected) {
              var arrayBuffer = DataUtil.base64ToArrayBuffer(shaderUri);
              shaders[shaderName].shaderText = DataUtil.arrayBufferToString(arrayBuffer);
              shaders[shaderName].shaderType = shaderType;
              fulfilled();
            }));
          } else {
            shaderUri = basePath + shaderUri;
            promisesToLoadResources.push(DataUtil.loadResourceAsync(shaderUri, false, function (resolve, response) {
              shaders[shaderName].shaderText = response;
              shaders[shaderName].shaderType = shaderType;
              resolve();
            }, function (reject, error) {}));
          }
        };

        for (var shaderName in shadersJson) {
          var _ret2 = _loop2(shaderName);

          if (_ret2 === 'continue') continue;
        }

        var _loop3 = function _loop3(bufferName) {
          var bufferInfo = json.buffers[bufferName];
          var splitted = bufferInfo.uri.split('/');
          var filename = splitted[splitted.length - 1];
          if (bufferInfo.uri.match(/^data:application\/octet-stream;base64,/)) {
            promisesToLoadResources.push(new Promise(function (fulfilled, rejected) {
              var arrayBuffer = DataUtil.base64ToArrayBuffer(bufferInfo.uri);
              buffers[bufferName] = arrayBuffer;
              fulfilled();
            }));
          } else if (bufferInfo.uri === '' || bufferInfo.uri === 'data:,') {
            buffers[bufferName] = arrayBufferBinary;
          } else if (options.files && options.files[filename]) {
            var _arrayBuffer2 = options.files[filename];
            buffers[bufferName] = _arrayBuffer2;
          } else {
            promisesToLoadResources.push(DataUtil.loadResourceAsync(basePath + bufferInfo.uri, true, function (resolve, response) {
              buffers[bufferName] = response;
              resolve();
            }, function (reject, error) {}));
          }
        };

        for (var bufferName in json.buffers) {
          _loop3(bufferName);
        }

        for (var textureName in json.textures) {
          var textureJson = json.textures[textureName];
          var imageJson = json.images[textureJson.source];
          var samplerJson = json.samplers[textureJson.sampler];

          var textureUri = null;

          if (typeof imageJson.extensions !== 'undefined' && typeof imageJson.extensions.KHR_binary_glTF !== 'undefined') {
            textureUri = this._accessBinaryAsImage(imageJson.extensions.KHR_binary_glTF.bufferView, json, arrayBufferBinary, imageJson.extensions.KHR_binary_glTF.mimeType);
          } else {
            var imageFileStr = imageJson.uri;
            var splitted = imageFileStr.split('/');
            var _filename = splitted[splitted.length - 1];
            if (options.files && options.files[_filename]) {
              var arrayBuffer = options.files[_filename];
              var _splitted = _filename.split('.');
              var fileExtension = _splitted[_splitted.length - 1];
              textureUri = this._accessArrayBufferAsImage(arrayBuffer, fileExtension);
            } else if (imageFileStr.match(/^data:/)) {
              textureUri = imageFileStr;
            } else {
              textureUri = basePath + imageFileStr;
            }
          }

          var texture = glBoostContext.createTexture(null, textureName, {
            'TEXTURE_MAG_FILTER': samplerJson.magFilter,
            'TEXTURE_MIN_FILTER': samplerJson.minFilter,
            'TEXTURE_WRAP_S': samplerJson.wrapS,
            'TEXTURE_WRAP_T': samplerJson.wrapT
          });

          if (options.loaderExtension && options.loaderExtension.setUVTransformToTexture) {
            options.loaderExtension.setUVTransformToTexture(texture, samplerJson);
          }

          var promise = texture.generateTextureFromUri(textureUri, false);
          textures[textureName] = texture;
          promisesToLoadResources.push(promise);
        }

        if (promisesToLoadResources.length > 0) {
          Promise.resolve().then(function () {
            return Promise.all(promisesToLoadResources);
          }).then(function () {
            _this2._IterateNodeOfScene(glBoostContext, buffers, json, defaultShader, shaders, textures, glTFVer, resolve, options);
          });
        } else {
          this._IterateNodeOfScene(glBoostContext, buffers, json, defaultShader, shaders, textures, glTFVer, resolve, options);
        }
      }
    }, {
      key: '_IterateNodeOfScene',
      value: function _IterateNodeOfScene(glBoostContext, buffers, json, defaultShader, shaders, textures, glTFVer, resolve, options) {
        var _this3 = this;

        var rootGroup = glBoostContext.createGroup();
        rootGroup.userFlavorName = 'glTFFileRoot';

        var _loop4 = function _loop4(sceneStr) {
          var sceneJson = json.scenes[sceneStr];
          var group = glBoostContext.createGroup();
          group.userFlavorName = 'Scene_' + sceneStr;
          var nodeStr = null;
          for (var i = 0; i < sceneJson.nodes.length; i++) {
            nodeStr = sceneJson.nodes[i];

            var element = _this3._recursiveIterateNode(glBoostContext, nodeStr, buffers, json, defaultShader, shaders, textures, glTFVer, options);
            group.addChild(element);
          }

          var skeletalMeshes = group.searchElementsByType(M_SkeletalMesh);
          skeletalMeshes.forEach(function (skeletalMesh) {
            var rootJointGroup = group.searchElementByNameAndType(skeletalMesh.rootJointName, M_Group);
            if (!rootJointGroup) {
              rootJointGroup = _this3._recursiveIterateNode(glBoostContext, skeletalMesh.rootJointName, buffers, json, defaultShader, shaders, textures, glTFVer, options);
              group.addChild(rootJointGroup);
            }

            rootJointGroup._isRootJointGroup = true;
            skeletalMesh.jointsHierarchy = rootJointGroup;
          });

          _this3._loadAnimation(group, buffers, json, glTFVer, options);

          if (options && options.loaderExtension && options.loaderExtension.setAssetPropertiesToRootGroup) {
            options.loaderExtension.setAssetPropertiesToRootGroup(rootGroup, json.asset);
          }

          rootGroup.addChild(group);
        };

        for (var sceneStr in json.scenes) {
          _loop4(sceneStr);
        }

        rootGroup.allMeshes = rootGroup.searchElementsByType(M_Mesh);

        resolve(rootGroup);
      }
    }, {
      key: '_setTransform',
      value: function _setTransform(element, nodeJson) {
        if (nodeJson.translation) {
          element.translate = new Vector3(nodeJson.translation[0], nodeJson.translation[1], nodeJson.translation[2]);
        }
        if (nodeJson.scale) {
          element.scale = new Vector3(nodeJson.scale[0], nodeJson.scale[1], nodeJson.scale[2]);
        }
        if (nodeJson.rotation) {
          element.quaternion = new Quaternion(nodeJson.rotation[0], nodeJson.rotation[1], nodeJson.rotation[2], nodeJson.rotation[3]);
        }
        if (nodeJson.matrix) {
          element.matrix = new Matrix44$1(nodeJson.matrix, true);
        }
      }
    }, {
      key: '_recursiveIterateNode',
      value: function _recursiveIterateNode(glBoostContext, nodeStr, buffers, json, defaultShader, shaders, textures, glTFVer, options) {
        var nodeJson = json.nodes[nodeStr];
        var group = glBoostContext.createGroup();
        group.userFlavorName = nodeStr;

        this._setTransform(group, nodeJson);

        if (nodeJson.meshes) {
          for (var i = 0; i < nodeJson.meshes.length; i++) {
            var meshStr = nodeJson.meshes[i];
            var meshJson = json.meshes[meshStr];

            var rootJointStr = null;
            var skinStr = null;
            if (nodeJson.skeletons) {
              rootJointStr = nodeJson.skeletons[0];
              skinStr = nodeJson.skin;
            }
            this._loadMesh(glBoostContext, meshJson, meshStr, buffers, json, defaultShader, rootJointStr, skinStr, shaders, textures, glTFVer, group, options);
          }
        } else if (nodeJson.jointName) {
          var joint = glBoostContext.createJoint(options.isExistJointGizmo);
          joint.userFlavorName = nodeJson.jointName;
          group.addChild(joint);
        } else if (nodeJson.camera) {
          var cameraStr = nodeJson.camera;
          var cameraJson = json.cameras[cameraStr];
          var camera = null;
          if (cameraJson.type === 'perspective') {
            var perspective = cameraJson.perspective;
            camera = glBoostContext.createPerspectiveCamera({
              eye: new Vector3(0.0, 0.0, 0),
              center: new Vector3(1.0, 0.0, 0.0),
              up: new Vector3(0.0, 1.0, 0.0)
            }, {
              fovy: MathUtil.radianToDegree(perspective.yfov),
              aspect: perspective.aspectRatio ? perspective.aspectRatio : 1.5,
              zNear: perspective.znear,
              zFar: perspective.zfar
            });
          } else if (cameraJson.type === 'orthographic') {
            var orthographic = cameraJson.orthographic;
            camera = glBoostContext.createOrthoCamera({
              eye: new Vector3(0.0, 0.0, 0),
              center: new Vector3(1.0, 0.0, 0.0),
              up: new Vector3(0.0, 1.0, 0.0)
            }, {
              xmag: orthographic.xmag,
              ymag: orthographic.ymag,
              zNear: orthographic.znear,
              zFar: orthographic.zfar
            });
          }
          camera.userFlavorName = cameraStr + 'Shape';
          group.addChild(camera);
        } else if (nodeJson.extensions) {
          if (nodeJson.extensions.KHR_materials_common) {
            if (nodeJson.extensions.KHR_materials_common.light) {
              var lightStr = nodeJson.extensions.KHR_materials_common.light;
              var lightJson = json.extensions.KHR_materials_common.lights[lightStr];
              var light = null;
              if (lightJson.type === 'ambient') {
                var color = lightJson.ambient.color;
                light = glBoostContext.createAmbientLight(new Vector3(color[0], color[1], color[2]));
                group.addChild(light);
              } else if (lightJson.type === 'point') {
                var _color = lightJson.point.color;
                light = glBoostContext.createPointLight(new Vector3(_color[0], _color[1], _color[2]));
                this._setTransform(group, nodeJson);
                group.addChild(light);
              } else if (lightJson.type === 'directional') {
                var _color2 = lightJson.directional.color;
                light = glBoostContext.createDirectionalLight(new Vector3(_color2[0], _color2[1], _color2[2]));
                light.rotate = new Vector3(0, 0, 0);
                this._setTransform(group, nodeJson);
                group.addChild(light);
              } else if (lightJson.type === 'spot') {
                var _color3 = lightJson.spot.color;
                light = glBoostContext.createSpotLight(new Vector3(_color3[0], _color3[1], _color3[2]));
                light.rotate = new Vector3(0, 0, 0);
                if (lightJson.spot.falloffAngle) {
                  light.spotCutoffInDegree = lightJson.spot.falloffAngle * 180 / Math.PI;
                }
                this._setTransform(group, nodeJson);
                group.addChild(light);
              }
            }
          }
        }

        if (nodeJson.children) {
          for (var _i = 0; _i < nodeJson.children.length; _i++) {
            var _nodeStr = nodeJson.children[_i];
            var childElement = this._recursiveIterateNode(glBoostContext, _nodeStr, buffers, json, defaultShader, shaders, textures, glTFVer, options);
            group.addChild(childElement);
          }
        }

        return group;
      }
    }, {
      key: '_loadMesh',
      value: function _loadMesh(glBoostContext, meshJson, meshStr, buffers, json, defaultShader, rootJointStr, skinStr, shaders, textures, glTFVer, group, options) {
        var _this4 = this;

        var mesh = null;
        var geometry = null;
        if (rootJointStr) {
          geometry = glBoostContext.createSkeletalGeometry();
          mesh = glBoostContext.createSkeletalMesh(geometry, null, rootJointStr);
          var skin = json.skins[skinStr];

          mesh.bindShapeMatrix = new Matrix44$1(skin.bindShapeMatrix, true);
          mesh.jointNames = skin.jointNames;

          var inverseBindMatricesAccessorStr = skin.inverseBindMatrices;
          mesh.inverseBindMatrices = this._accessBinary(inverseBindMatricesAccessorStr, json, buffers);
        } else {
          geometry = glBoostContext.createGeometry();
          mesh = glBoostContext.createMesh(geometry);
        }
        mesh.userFlavorName = meshStr;
        group.addChild(mesh);

        if (options && options.isMeshTransparentAsDefault) {
          mesh.isTransparentForce = true;
        }

        var _indicesArray = [];
        var _positions = [];
        var _normals = [];
        var vertexData = {
          position: _positions,
          normal: _normals,
          components: {},
          componentBytes: {},
          componentType: {}
        };
        var additional = {
          'joint': [],
          'weight': [],
          'texcoord': [],
          'color': []
        };

        var dataViewMethodDic = {};

        var materials = [];
        var indicesAccumulatedLength = 0;
        for (var i = 0; i < meshJson.primitives.length; i++) {
          var primitiveJson = meshJson.primitives[i];

          var positionsAccessorStr = primitiveJson.attributes.POSITION;
          var positions = this._accessBinary(positionsAccessorStr, json, buffers, false, true);
          _positions[i] = positions;
          vertexData.components.position = this._checkComponentNumber(positionsAccessorStr, json);
          vertexData.componentBytes.position = this._checkBytesPerComponent(positionsAccessorStr, json);
          vertexData.componentType.position = this._getDataType(positionsAccessorStr, json);
          dataViewMethodDic.position = this._checkDataViewMethod(positionsAccessorStr, json);

          var indices = null;
          if (typeof primitiveJson.indices !== 'undefined') {
            var indicesAccessorStr = primitiveJson.indices;
            indices = this._accessBinary(indicesAccessorStr, json, buffers);
            for (var j = 0; j < indices.length; j++) {
              indices[j] = indicesAccumulatedLength + indices[j];
            }
            _indicesArray[i] = indices;
            indicesAccumulatedLength += _positions[i].length / vertexData.components.position;
          }

          var normalsAccessorStr = primitiveJson.attributes.NORMAL;
          if (normalsAccessorStr) {
            var normals = this._accessBinary(normalsAccessorStr, json, buffers, false, true);

            _normals[i] = normals;
            vertexData.components.normal = this._checkComponentNumber(normalsAccessorStr, json);
            vertexData.componentBytes.normal = this._checkBytesPerComponent(normalsAccessorStr, json);
            vertexData.componentType.normal = this._getDataType(normalsAccessorStr, json);
            dataViewMethodDic.normal = this._checkDataViewMethod(normalsAccessorStr, json);
          }

          var colorsAccessorStr = primitiveJson.attributes.COLOR;
          if (colorsAccessorStr) {
            var colors = this._accessBinary(colorsAccessorStr, json, buffers, false, true);
            additional['color'][i] = colors;
            vertexData.components.color = this._checkComponentNumber(colorsAccessorStr, json);
            vertexData.componentBytes.color = this._checkBytesPerComponent(colorsAccessorStr, json);
            vertexData.componentType.color = this._getDataType(normalsAccessocolorsAccessorStrrStr, json);
            dataViewMethodDic.color = this._checkDataViewMethod(colorsAccessorStr, json);
          }

          var jointAccessorStr = primitiveJson.attributes.JOINT;
          if (jointAccessorStr) {
            var joints = this._accessBinary(jointAccessorStr, json, buffers, false, true);
            additional['joint'][i] = joints;
            vertexData.components.joint = this._checkComponentNumber(jointAccessorStr, json);
            vertexData.componentBytes.joint = this._checkBytesPerComponent(jointAccessorStr, json);
            vertexData.componentType.joint = this._getDataType(jointAccessorStr, json);
            dataViewMethodDic.joint = this._checkDataViewMethod(jointAccessorStr, json);
          }
          var weightAccessorStr = primitiveJson.attributes.WEIGHT;
          if (weightAccessorStr) {
            var weights = this._accessBinary(weightAccessorStr, json, buffers, false, true);
            additional['weight'][i] = weights;
            vertexData.components.weight = this._checkComponentNumber(weightAccessorStr, json);
            vertexData.componentBytes.weight = this._checkBytesPerComponent(weightAccessorStr, json);
            vertexData.componentType.weight = this._getDataType(weightAccessorStr, json);
            dataViewMethodDic.weight = this._checkDataViewMethod(weightAccessorStr, json);
          }

          if (primitiveJson.material) {
            var texcoords;

            (function () {
              texcoords = null;

              var texcoords0AccessorStr = primitiveJson.attributes.TEXCOORD_0;

              var materialStr = primitiveJson.material;

              var material = null;
              if (options.defaultMaterial != null) {
                material = new options.defaultMaterial(glBoostContext.__system);
              } else if (options && options.loaderExtension && options.loaderExtension.createClassicMaterial) {
                material = options.loaderExtension.createClassicMaterial(glBoostContext);
              } else {
                material = glBoostContext.createClassicMaterial();
              }
              if (options && options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
                material.shaderParameters.isNeededToMultiplyAlphaToColorOfPixelOutput = options.isNeededToMultiplyAlphaToColorOfPixelOutput;
              }
              _this4._materials.push(material);

              if (options && options.defaultStates) {
                if (options.defaultStates.states) {
                  material.states = options.defaultStates.states;
                }
                material.globalStatesUsage = options.defaultStates.globalStatesUsage !== void 0 ? options.defaultStates.globalStatesUsage : GLBoost$1.GLOBAL_STATES_USAGE_IGNORE;
              }
              if (options && options.statesOfElements) {
                var _loop5 = function _loop5(statesInfo) {
                  if (statesInfo.targets) {
                    var _loop6 = function _loop6(target) {
                      var isMatch = _this4.isTargetMatch(statesInfo, group, target);
                      if (isMatch) {
                        if (statesInfo.states) {
                          material.states = statesInfo.states;
                        }
                        material.globalStatesUsage = statesInfo.globalStatesUsage !== void 0 ? statesInfo.globalStatesUsage : GLBoost$1.GLOBAL_STATES_USAGE_IGNORE;
                      }

                      group.getChildren().forEach(function (elem) {
                        var isMatch = _this4.isTargetMatch(statesInfo, elem, target);
                        if (isMatch) {
                          elem.isTransparentForce = statesInfo.isTransparent !== void 0 ? statesInfo.isTransparent : false;
                          if (statesInfo.states) {
                            material.states = statesInfo.states;
                          }
                          material.globalStatesUsage = statesInfo.globalStatesUsage !== void 0 ? statesInfo.globalStatesUsage : GLBoost$1.GLOBAL_STATES_USAGE_IGNORE;
                        }
                      });
                    };

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = statesInfo.targets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var target = _step3.value;

                        _loop6(target);
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                          _iterator3.return();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }
                  }
                };

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {

                  for (var _iterator2 = options.statesOfElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var statesInfo = _step2.value;

                    _loop5(statesInfo);
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              }

              texcoords = _this4._loadMaterial(glBoostContext, buffers, json, vertexData, indices, material, materialStr, positions, dataViewMethodDic, additional, texcoords, texcoords0AccessorStr, geometry, defaultShader, shaders, textures, i, glTFVer, group, options);

              materials.push(material);
            })();
          } else {
            var material = null;
            if (options.loaderExtension && options.loaderExtension.createClassicMaterial) {
              material = options.loaderExtension.createClassicMaterial(glBoostContext);
            } else {
              material = glBoostContext.createClassicMaterial();
            }
            if (defaultShader) {
              material.shaderClass = defaultShader;
            } else {
              material.baseColor = new Vector4$1(0.5, 0.5, 0.5, 1);
            }
            materials.push(material);
          }
        }

        if (meshJson.primitives.length > 1) {
          var getTypedArray = function getTypedArray(dataViewMethod, length) {
            var vertexAttributeArray = null;
            if (dataViewMethod === 'getInt8') {
              vertexAttributeArray = new Int8Array(length);
            } else if (dataViewMethod === 'getUint8') {
              vertexAttributeArray = new Uint8Array(length);
            } else if (dataViewMethod === 'getInt16') {
              vertexAttributeArray = new Int16Array(length);
            } else if (dataViewMethod === 'getUint16') {
              vertexAttributeArray = new Uint16Array(length);
            } else if (dataViewMethod === 'getInt32') {
              vertexAttributeArray = new Int32Array(length);
            } else if (dataViewMethod === 'getUint32') {
              vertexAttributeArray = new Uint32Array(length);
            } else if (dataViewMethod === 'getFloat32') {
              vertexAttributeArray = new Float32Array(length);
            }

            return vertexAttributeArray;
          };

          var lengthDic = { index: 0, position: 0, normal: 0, color: 0, joint: 0, weight: 0, texcoord: 0 };
          for (var _i2 = 0; _i2 < meshJson.primitives.length; _i2++) {
            lengthDic.position += _positions[_i2].length;
            if (_normals[_i2]) {
              lengthDic.normal += _normals[_i2].length;
            }
            if (typeof additional['color'][_i2] !== 'undefined') {
              lengthDic.color += additional['color'][_i2].length;
            }
            if (typeof additional['joint'][_i2] !== 'undefined') {
              lengthDic.joint += additional['joint'][_i2].length;
            }
            if (typeof additional['weight'][_i2] !== 'undefined') {
              lengthDic.weight += additional['weight'][_i2].length;
            }
            if (typeof additional['texcoord'][_i2] !== 'undefined') {
              lengthDic.texcoord += additional['texcoord'][_i2].length;
            }
          }

          for (var attribName in dataViewMethodDic) {
            var newTypedArray = getTypedArray(dataViewMethodDic[attribName], lengthDic[attribName]);
            var offset = 0;
            for (var _i3 = 0; _i3 < meshJson.primitives.length; _i3++) {

              var array = null;

              if (attribName === 'position') {
                array = _positions[_i3];
              } else if (attribName === 'normal') {
                array = _normals[_i3];
              } else if (attribName === 'color') {
                array = additional['color'][_i3];
              } else if (attribName === 'joint') {
                array = additional['joint'][_i3];
              } else if (attribName === 'weight') {
                array = additional['weight'][_i3];
              } else if (attribName === 'texcoord') {
                array = additional['texcoord'][_i3];
              }

              if (array) {
                newTypedArray.set(array, offset);
                offset += array.length;
              }
            }

            if (attribName === 'position') {
              vertexData.position = newTypedArray;
            } else if (attribName === 'normal') {
              vertexData.normal = newTypedArray;
            } else if (attribName === 'color') {
              additional['color'] = newTypedArray;
            } else if (attribName === 'joint') {
              additional['joint'] = newTypedArray;
            } else if (attribName === 'weight') {
              additional['weight'] = newTypedArray;
            } else if (attribName === 'texcoord') {
              additional['texcoord'] = newTypedArray;
            }
          }
        } else {
          vertexData.position = _positions[0];
          vertexData.normal = _normals[0];
          additional['color'] = additional['color'][0];
          additional['joint'] = additional['joint'][0];
          additional['weight'] = additional['weight'][0];
          additional['texcoord'] = additional['texcoord'][0];
        }

        if (typeof vertexData.normal === 'undefined' || vertexData.normal.length === 0) {
          delete vertexData.normal;
        }
        if (typeof additional['color'] === 'undefined' || additional['color'].length === 0) {
          delete additional['color'];
        }
        if (typeof additional['joint'] === 'undefined' || additional['joint'].length === 0) {
          delete additional['joint'];
        }
        if (typeof additional['weight'] === 'undefined' || additional['weight'].length === 0) {
          delete additional['weight'];
        }
        if (typeof additional['texcoord'] === 'undefined' || additional['texcoord'].length === 0) {
          delete additional['texcoord'];
        }

        if (_indicesArray.length === 0) {
          _indicesArray = null;
        }

        geometry.setVerticesData(ArrayUtil.merge(vertexData, additional), _indicesArray);
        geometry.materials = materials;

        return mesh;
      }
    }, {
      key: '_isKHRMaterialsCommon',
      value: function _isKHRMaterialsCommon(materialJson) {
        if (typeof materialJson.extensions !== 'undefined' && typeof materialJson.extensions.KHR_materials_common !== 'undefined') {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: '_loadMaterial',
      value: function _loadMaterial(glBoostContext, buffers, json, vertexData, indices, material, materialStr, positions, dataViewMethodDic, additional, texcoords, texcoords0AccessorStr, geometry, defaultShader, shaders, textures, idx, glTFVer, group, options) {
        var _this5 = this;

        var materialJson = json.materials[materialStr];
        material.userFlavorName = materialJson.name;
        var originalMaterialJson = materialJson;

        if (this._isKHRMaterialsCommon(materialJson)) {
          materialJson = materialJson.extensions.KHR_materials_common;
        }

        var enables = [];
        if (options.isBlend) {
          enables.push(3042);
        }
        if (options.isDepthTest) {
          enables.push(2929);
        }
        material.states.enable = material.states.enable.concat(enables);

        material.states.enable = material.states.enable.filter(function (x, i, self) {
          return self.indexOf(x) === i;
        });

        if (options && options.statesOfElements) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = options.statesOfElements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var statesInfo = _step4.value;

              if (statesInfo.opacity) {
                group.opacity = statesInfo.opacity;
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }

        if (options.isBlend && options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
          if (material.states.functions.blendFuncSeparate === void 0) {
            material.states.functions.blendFuncSeparate = [1, 771, 1, 771];
          }
        }
        material.globalStatesUsage = GLBoost$1.GLOBAL_STATES_USAGE_IGNORE;

        if (texcoords0AccessorStr) {
          texcoords = this._accessBinary(texcoords0AccessorStr, json, buffers, false, true);
          additional['texcoord'][idx] = texcoords;
          vertexData.components.texcoord = this._checkComponentNumber(texcoords0AccessorStr, json);
          vertexData.componentBytes.texcoord = this._checkBytesPerComponent(texcoords0AccessorStr, json);
          vertexData.componentType.texcoord = this._getDataType(texcoords0AccessorStr, json);
          dataViewMethodDic.texcoord = this._checkDataViewMethod(texcoords0AccessorStr, json);

          var setTextures = function setTextures(values, isParameter) {
            for (var valueName in values) {
              var value = null;
              if (isParameter) {
                value = values[valueName].value;
                if (typeof value === 'undefined') {
                  continue;
                }
              } else {
                value = values[valueName];
              }
              if (glTFVer >= 1.1) {
                value = value[0];
              }
              if (typeof value === 'string') {
                var textureStr = value;
                var texturePurpose = void 0;
                if (valueName === 'diffuse' || materialJson.technique === "CONSTANT" && valueName === 'ambient') {
                  texturePurpose = GLBoost$1.TEXTURE_PURPOSE_DIFFUSE;
                } else if (valueName === 'emission' && textureStr.match(/_normal$/)) {
                  texturePurpose = GLBoost$1.TEXTURE_PURPOSE_NORMAL;
                } else {
                  texturePurpose = GLBoost$1.TEXTURE_PURPOSE_OTHERS;
                }

                var texture = textures[textureStr];

                var isNeededToMultiplyAlphaToColorOfTexture = false;

                if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
                  if (options.isTextureImageToLoadPreMultipliedAlphaAsDefault) ; else {
                    isNeededToMultiplyAlphaToColorOfTexture = true;
                  }
                } else {
                  if (options.isTextureImageToLoadPreMultipliedAlphaAsDefault) ;
                }

                if (options && options.statesOfElements) {
                  var _iteratorNormalCompletion5 = true;
                  var _didIteratorError5 = false;
                  var _iteratorError5 = undefined;

                  try {
                    for (var _iterator5 = options.statesOfElements[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                      var _statesInfo = _step5.value;

                      if (_statesInfo.targets) {
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                          for (var _iterator6 = _statesInfo.targets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var target = _step6.value;

                            var isMatch = false;
                            isMatch = _this5.isTargetMatch(_statesInfo, group, target);

                            if (isMatch) {
                              if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
                                if (_statesInfo.isTextureImageToLoadPreMultipliedAlpha) ; else {
                                  isNeededToMultiplyAlphaToColorOfTexture = true;
                                }
                              } else {
                                if (_statesInfo.isTextureImageToLoadPreMultipliedAlpha) ;
                              }
                            }
                          }
                        } catch (err) {
                          _didIteratorError6 = true;
                          _iteratorError6 = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                              _iterator6.return();
                            }
                          } finally {
                            if (_didIteratorError6) {
                              throw _iteratorError6;
                            }
                          }
                        }
                      }
                    }
                  } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                      }
                    } finally {
                      if (_didIteratorError5) {
                        throw _iteratorError5;
                      }
                    }
                  }
                }

                material.setTexture(texture, texturePurpose);
                texture.toMultiplyAlphaToColorPreviously = isNeededToMultiplyAlphaToColorOfTexture;
              }
            }
          };
          setTextures(materialJson.values, false);
          if (materialJson.technique && json.techniques) {
            if (typeof json.techniques[materialJson.technique] !== "undefined") {
              setTextures(json.techniques[materialJson.technique].parameters, true);
            }
          }
        } else {
          if (typeof vertexData.components.texcoord !== 'undefined') {
            var emptyTexcoords = [];
            var componentN = vertexData.components.position;
            var length = positions.length / componentN;
            for (var k = 0; k < length; k++) {
              emptyTexcoords.push(0);
              emptyTexcoords.push(0);
            }
            additional['texcoord'][idx] = new Float32Array(emptyTexcoords);
            vertexData.components.texcoord = 2;
            vertexData.componentBytes.texcoord = 4;
            dataViewMethodDic.texcoord = 'getFloat32';
          }
        }

        for (var valueName in materialJson.values) {
          var value = materialJson.values[valueName];
          if (typeof value !== 'string') {
            material[valueName + 'Color'] = MathClassUtil.arrayToVectorOrMatrix(value);
          }
        }

        if (indices !== null) {
          material.setVertexN(geometry, indices.length);
        }

        var techniqueStr = materialJson.technique;
        if (defaultShader) {
          material.shaderClass = defaultShader;
        } else if (this._isKHRMaterialsCommon(originalMaterialJson) && material.className.indexOf('PBR') === -1) {
          switch (techniqueStr) {
            case 'CONSTANT':
              if (options.loaderExtension && options.loaderExtension.getDecalShader) {
                material.shaderClass = options.loaderExtension.getDecalShader();
              } else {
                material.shaderClass = DecalShader;
              }
              break;
            case 'LAMBERT':
              if (options.loaderExtension && options.loaderExtension.getLambertShader) {
                material.shaderClass = options.loaderExtension.getLambertShader();
              } else {
                material.shaderClass = LambertShader;
              }
              break;
            case 'PHONG':
              if (options.loaderExtension && options.loaderExtension.getPhongShader) {
                material.shaderClass = options.loaderExtension.getPhongShader();
              } else {
                material.shaderClass = PhongShader;
              }
              break;
          }
        } else {
          if (typeof json.techniques !== 'undefined') {
            this._loadTechnique(glBoostContext, json, techniqueStr, material, materialJson, shaders, glTFVer);
          } else if (material.className.indexOf('PBR') === -1) {
            if (options.loaderExtension && options.loaderExtension.getDecalShader) {
              material.shaderClass = options.loaderExtension.getDecalShader();
            } else {
              material.shaderClass = DecalShader;
            }
          }
        }

        if (options && options.statesOfElements) {
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = options.statesOfElements[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _statesInfo2 = _step7.value;

              if (_statesInfo2.targets) {
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                  for (var _iterator8 = _statesInfo2.targets[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var target = _step8.value;

                    var isMatch = false;
                    isMatch = this.isTargetMatch(_statesInfo2, group, target);

                    if (isMatch) {
                      if (_statesInfo2.shaderClass) {
                        material.shaderClass = _statesInfo2.shaderClass;
                      }
                    }
                  }
                } catch (err) {
                  _didIteratorError8 = true;
                  _iteratorError8 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                      _iterator8.return();
                    }
                  } finally {
                    if (_didIteratorError8) {
                      throw _iteratorError8;
                    }
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }

        return texcoords;
      }
    }, {
      key: 'isTargetMatch',
      value: function isTargetMatch(statesInfo, element, target) {
        var specifyMethod = statesInfo.specifyMethod !== void 0 ? statesInfo.specifyMethod : GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME;
        if (typeof statesInfo.specifyMethod === 'string') {
          statesInfo.specifyMethod = GLBoost$1[statesInfo.specifyMethod];
        }

        var isTargetMatchInner = function isTargetMatchInner(specifyMethod, element, target) {
          var isMatch = false;
          switch (specifyMethod) {
            case GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME:
              isMatch = element.userFlavorName === target;
              break;
            case GLBoost$1.QUERY_TYPE_INSTANCE_NAME:
              isMatch = element.instanceName === target;
              break;
            case GLBoost$1.QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR:
              isMatch = element.instanceNameWithUserFlavor === target;
              break;
          }
          return isMatch;
        };

        var isMatch = isTargetMatchInner(specifyMethod, element, target);

        return isMatch;
      }
    }, {
      key: '_loadTechnique',
      value: function _loadTechnique(glBoostContext, json, techniqueStr, material, materialJson, shaders, glTFVer) {
        var techniqueJson = json.techniques[techniqueStr];

        var programStr = techniqueJson.program;
        var uniformsJson = techniqueJson.uniforms;
        var parametersJson = techniqueJson.parameters;
        var attributesJson = techniqueJson.attributes;
        var attributes = {};
        for (var attributeName in attributesJson) {
          var parameterName = attributesJson[attributeName];
          var parameterJson = parametersJson[parameterName];
          attributes[attributeName] = parameterJson.semantic;
        }

        var uniforms = {};
        var textureNames = {};
        for (var uniformName in uniformsJson) {
          var _parameterName = uniformsJson[uniformName];
          var _parameterJson = parametersJson[_parameterName];
          if (typeof _parameterJson.semantic !== 'undefined') {
            uniforms[uniformName] = _parameterJson.semantic;
          } else {
            var value = null;
            if (typeof materialJson.values !== 'undefined' && typeof materialJson.values[_parameterName] !== 'undefined') {
              value = materialJson.values[_parameterName];
            } else {
              value = _parameterJson.value;
            }

            switch (_parameterJson.type) {
              case 5126:
                uniforms[uniformName] = glTFVer < 1.1 ? value : value[0];
                break;
              case 35664:
                uniforms[uniformName] = new Vector2(value[0], value[1]);
                break;
              case 35665:
                uniforms[uniformName] = new Vector3(value[0], value[1], value[2]);
                break;
              case 35666:
                uniforms[uniformName] = new Vector4$1(value[0], value[1], value[2], value[3]);
                break;
              case 5124:
                uniforms[uniformName] = glTFVer < 1.1 ? value : value[0];
                break;
              case 35667:
                uniforms[uniformName] = new Vector2(value[0], value[1]);
                break;
              case 35668:
                uniforms[uniformName] = new Vector3(value[0], value[1], value[2]);
                break;
              case 35669:
                uniforms[uniformName] = new Vector4$1(value[0], value[1], value[2], value[3]);
                break;
              case 35678:
                uniforms[uniformName] = 'TEXTURE';
                textureNames[uniformName] = glTFVer < 1.1 ? value : value[0];
                break;
            }
          }
        }

        if (techniqueJson.states) {
          if (techniqueJson.states.functions) {
            for (var functionName in techniqueJson.states.functions) {
              if (!Array.isArray(techniqueJson.states.functions[functionName])) {
                techniqueJson.states.functions[functionName] = [techniqueJson.states.functions[functionName]];
              }
            }
          }

          material.states = techniqueJson.states;
        }

        this._loadProgram(glBoostContext, json, programStr, material, shaders, attributes, uniforms, textureNames);
      }
    }, {
      key: '_loadProgram',
      value: function _loadProgram(glBoostContext, json, programStr, material, shaders, attributes, uniforms, textureNames) {
        var programJson = json.programs[programStr];
        var fragmentShaderStr = programJson.fragmentShader;
        var vertexShaderStr = programJson.vertexShader;
        var fragmentShaderText = shaders[fragmentShaderStr].shaderText;
        var vertexShaderText = shaders[vertexShaderStr].shaderText;

        material.shaderInstance = new FreeShader(glBoostContext.__system, vertexShaderText, fragmentShaderText, attributes, uniforms, textureNames);
      }
    }, {
      key: '_loadAnimation',
      value: function _loadAnimation(element, buffers, json, glTFVer, options) {
        var animationJson = null;
        for (var anim in json.animations) {
          animationJson = json.animations[anim];
          if (animationJson) {
            for (var i = 0; i < animationJson.channels.length; i++) {
              var channelJson = animationJson.channels[i];
              if (!channelJson) {
                continue;
              }

              var targetMeshStr = channelJson.target.id;
              var targetPathStr = channelJson.target.path;
              var samplerStr = channelJson.sampler;
              var samplerJson = animationJson.samplers[samplerStr];

              var animInputAccessorStr = null;
              var animOutputAccessorStr = null;
              var animInputStr = samplerJson.input;
              var animOutputStr = samplerJson.output;
              animInputAccessorStr = animationJson.parameters[animInputStr];
              animOutputAccessorStr = animationJson.parameters[animOutputStr];

              var interpolationMethod = GLBoost$1.INTERPOLATION_LINEAR;

              if (options.loaderExtension && options.loaderExtension.getAnimationInterpolationMethod) {
                interpolationMethod = options.loaderExtension.getAnimationInterpolationMethod(samplerJson.interpolation);
              }

              var animInputArray = this._accessBinary(animInputAccessorStr, json, buffers);
              var animOutputArray = null;
              if (targetPathStr === 'translation') {
                animOutputArray = this._accessBinary(animOutputAccessorStr, json, buffers);
              } else if (targetPathStr === 'rotation') {
                animOutputArray = this._accessBinary(animOutputAccessorStr, json, buffers, true);
              } else {
                animOutputArray = this._accessBinary(animOutputAccessorStr, json, buffers);
              }
              var animationAttributeName = '';
              if (targetPathStr === 'translation') {
                animationAttributeName = 'translate';
              } else if (targetPathStr === 'rotation') {
                animationAttributeName = 'quaternion';
              } else {
                animationAttributeName = targetPathStr;
              }

              var hitElement = element.searchElement(targetMeshStr);
              if (hitElement) {
                hitElement.setAnimationAtLine('time', animationAttributeName, animInputArray, animOutputArray, interpolationMethod);
                hitElement.setActiveAnimationLine('time');
              }
            }
          }
        }
      }
    }, {
      key: '_accessBinaryAsShader',
      value: function _accessBinaryAsShader(bufferViewStr, json, arrayBuffer) {
        var bufferViewJson = json.bufferViews[bufferViewStr];
        var byteOffset = bufferViewJson.byteOffset;
        var byteLength = bufferViewJson.byteLength;

        var arrayBufferSliced = arrayBuffer.slice(byteOffset, byteOffset + byteLength);

        return DataUtil.arrayBufferToString(arrayBufferSliced);
      }
    }, {
      key: '_sliceBufferViewToArrayBuffer',
      value: function _sliceBufferViewToArrayBuffer(json, bufferViewStr, arrayBuffer) {
        var bufferViewJson = json.bufferViews[bufferViewStr];
        var byteOffset = bufferViewJson.byteOffset;
        var byteLength = bufferViewJson.byteLength;
        var arrayBufferSliced = arrayBuffer.slice(byteOffset, byteOffset + byteLength);
        return arrayBufferSliced;
      }
    }, {
      key: '_accessBinaryAsImage',
      value: function _accessBinaryAsImage(bufferViewStr, json, arrayBuffer, mimeType) {
        var arrayBufferSliced = this._sliceBufferViewToArrayBuffer(json, bufferViewStr, arrayBuffer);
        return this._accessArrayBufferAsImage(arrayBufferSliced, mimeType);
      }
    }, {
      key: '_accessArrayBufferAsImage',
      value: function _accessArrayBufferAsImage(arrayBuffer, imageType) {
        var bytes = new Uint8Array(arrayBuffer);
        var binaryData = '';
        for (var i = 0, len = bytes.byteLength; i < len; i++) {
          binaryData += String.fromCharCode(bytes[i]);
        }
        var imgSrc = '';
        if (imageType === 'image/jpeg' || imageType.toLowerCase() === 'jpg' || imageType.toLowerCase() === 'jpeg') {
          imgSrc = "data:image/jpeg;base64,";
        } else if (imageType == 'image/png' || imageType.toLowerCase() === 'png') {
          imgSrc = "data:image/png;base64,";
        } else if (imageType == 'image/gif' || imageType.toLowerCase() === 'gif') {
          imgSrc = "data:image/gif;base64,";
        } else if (imageType == 'image/bmp' || imageType.toLowerCase() === 'bmp') {
          imgSrc = "data:image/bmp;base64,";
        } else {
          imgSrc = "data:image/unknown;base64,";
        }
        var dataUrl = imgSrc + DataUtil.btoa(binaryData);
        return dataUrl;
      }
    }, {
      key: '_checkComponentNumber',
      value: function _checkComponentNumber(accessorStr, json) {
        var accessorJson = json.accessors[accessorStr];

        var componentN = 0;
        switch (accessorJson.type) {
          case 'SCALAR':
            componentN = 1;
            break;
          case 'VEC2':
            componentN = 2;
            break;
          case 'VEC3':
            componentN = 3;
            break;
          case 'VEC4':
            componentN = 4;
            break;
          case 'MAT4':
            componentN = 16;
            break;
        }

        return componentN;
      }
    }, {
      key: '_checkBytesPerComponent',
      value: function _checkBytesPerComponent(accessorStr, json) {
        var accessorJson = json.accessors[accessorStr];

        var bytesPerComponent = 0;
        switch (accessorJson.componentType) {
          case 5120:
            bytesPerComponent = 1;
            break;
          case 5121:
            bytesPerComponent = 1;
            break;
          case 5122:
            bytesPerComponent = 2;
            break;
          case 5123:
            bytesPerComponent = 2;
            break;
          case 5124:
            bytesPerComponent = 4;
            break;
          case 5125:
            bytesPerComponent = 4;
            break;
          case 5126:
            bytesPerComponent = 4;
            break;
          default:
            break;
        }
        return bytesPerComponent;
      }
    }, {
      key: '_checkDataViewMethod',
      value: function _checkDataViewMethod(accessorStr, json) {
        var accessorJson = json.accessors[accessorStr];
        var dataViewMethod = '';
        switch (accessorJson.componentType) {
          case 5120:
            dataViewMethod = 'getInt8';
            break;
          case 5121:
            dataViewMethod = 'getUint8';
            break;
          case 5122:
            dataViewMethod = 'getInt16';
            break;
          case 5123:
            dataViewMethod = 'getUint16';
            break;
          case 5124:
            dataViewMethod = 'getInt32';
            break;
          case 5125:
            dataViewMethod = 'getUint32';
            break;
          case 5126:
            dataViewMethod = 'getFloat32';
            break;
          default:
            break;
        }
        return dataViewMethod;
      }
    }, {
      key: '_getDataType',
      value: function _getDataType(accessorStr, json) {
        var accessorJson = json.accessors[accessorStr];
        return accessorJson.componentType;
      }
    }, {
      key: '_adjustByteAlign',
      value: function _adjustByteAlign(typedArrayClass, arrayBuffer, alignSize, byteOffset, length) {
        if (byteOffset % alignSize != 0) {
          return new typedArrayClass(arrayBuffer.slice(byteOffset), 0, length);
        } else {
          return new typedArrayClass(arrayBuffer, byteOffset, length);
        }
      }
    }, {
      key: '_accessBinary',
      value: function _accessBinary(accessorStr, json, buffers) {
        var quaternionIfVec4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var toGetAsTypedArray = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        var accessorJson = json.accessors[accessorStr];
        var bufferViewStr = accessorJson.bufferView;
        var bufferViewJson = json.bufferViews[bufferViewStr];
        var byteOffset = bufferViewJson.byteOffset + accessorJson.byteOffset;
        var bufferStr = bufferViewJson.buffer;
        var arrayBuffer = buffers[bufferStr];

        var componentN = this._checkComponentNumber(accessorStr, json);
        var bytesPerComponent = this._checkBytesPerComponent(accessorStr, json);
        var dataViewMethod = this._checkDataViewMethod(accessorStr, json);

        var byteLength = bytesPerComponent * componentN * accessorJson.count;

        var vertexAttributeArray = [];

        if (toGetAsTypedArray) {
          if (GLTFLoader._isSystemLittleEndian()) {
            if (dataViewMethod === 'getFloat32') {
              vertexAttributeArray = this._adjustByteAlign(Float32Array, arrayBuffer, 4, byteOffset, byteLength / bytesPerComponent);
            } else if (dataViewMethod === 'getInt8') {
              vertexAttributeArray = new Int8Array(arrayBuffer, byteOffset, byteLength / bytesPerComponent);
            } else if (dataViewMethod === 'getUint8') {
              vertexAttributeArray = new Uint8Array(arrayBuffer, byteOffset, byteLength / bytesPerComponent);
            } else if (dataViewMethod === 'getInt16') {
              vertexAttributeArray = this._adjustByteAlign(Int16Array, arrayBuffer, 2, byteOffset, byteLength / bytesPerComponent);
            } else if (dataViewMethod === 'getUint16') {
              vertexAttributeArray = this._adjustByteAlign(Uint16Array, arrayBuffer, 2, byteOffset, byteLength / bytesPerComponent);
            } else if (dataViewMethod === 'getInt32') {
              vertexAttributeArray = this._adjustByteAlign(Int32Array, arrayBuffer, 4, byteOffset, byteLength / bytesPerComponent);
            } else if (dataViewMethod === 'getUint32') {
              vertexAttributeArray = this._adjustByteAlign(Uint32Array, arrayBuffer, 4, byteOffset, byteLength / bytesPerComponent);
            }
          } else {
            var dataView = new DataView(arrayBuffer, byteOffset, byteLength);
            var byteDelta = bytesPerComponent * componentN;
            var littleEndian = true;
            for (var pos = 0; pos < byteLength; pos += byteDelta) {
              switch (accessorJson.type) {
                case 'SCALAR':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  break;
                case 'VEC2':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent, littleEndian));
                  break;
                case 'VEC3':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent * 2, littleEndian));
                  break;
                case 'VEC4':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent * 2, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + bytesPerComponent * 3, littleEndian));
                  break;
              }
            }
            if (dataViewMethod === 'getInt8') {
              vertexAttributeArray = new Int8Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getUint8') {
              vertexAttributeArray = new Uint8Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getInt16') {
              vertexAttributeArray = new Int16Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getUint16') {
              vertexAttributeArray = new Uint16Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getInt32') {
              vertexAttributeArray = new Int32Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getUint32') {
              vertexAttributeArray = new Uint32Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getFloat32') {
              vertexAttributeArray = new Float32Array(vertexAttributeArray);
            }
          }
        } else {
          var _dataView = new DataView(arrayBuffer, byteOffset, byteLength);
          var _byteDelta = bytesPerComponent * componentN;
          var _littleEndian = true;
          for (var _pos = 0; _pos < byteLength; _pos += _byteDelta) {

            switch (accessorJson.type) {
              case 'SCALAR':
                vertexAttributeArray.push(_dataView[dataViewMethod](_pos, _littleEndian));
                break;
              case 'VEC2':
                vertexAttributeArray.push(new Vector2(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent, _littleEndian)));
                break;
              case 'VEC3':
                vertexAttributeArray.push(new Vector3(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent * 2, _littleEndian)));
                break;
              case 'VEC4':
                if (quaternionIfVec4) {
                  vertexAttributeArray.push(new Quaternion(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent * 2, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent * 3, _littleEndian)));
                } else {
                  vertexAttributeArray.push(new Vector4$1(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent * 2, _littleEndian), _dataView[dataViewMethod](_pos + bytesPerComponent * 3, _littleEndian)));
                }
                break;
              case 'MAT4':
                var matrixComponents = [];
                for (var i = 0; i < 16; i++) {
                  matrixComponents[i] = _dataView[dataViewMethod](_pos + bytesPerComponent * i, _littleEndian);
                }
                vertexAttributeArray.push(new Matrix44$1(matrixComponents, true));
                break;
            }
          }
        }

        return vertexAttributeArray;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton$5]) {
          this[singleton$5] = new GLTFLoader(singletonEnforcer$2);
        }
        return this[singleton$5];
      }
    }, {
      key: '_isSystemLittleEndian',
      value: function _isSystemLittleEndian() {
        return !!new Uint8Array(new Uint16Array([0x00ff]).buffer)[0];
      }
    }]);
    return GLTFLoader;
  }();


  GLBoost$1["GLTFLoader"] = GLTFLoader;

  var singleton$6 = Symbol();
  var singletonEnforcer$3 = Symbol();

  var GLTF2Loader = function () {
    function GLTF2Loader(enforcer) {
      babelHelpers.classCallCheck(this, GLTF2Loader);

      if (enforcer !== singletonEnforcer$3) {
        throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
      }
    }

    babelHelpers.createClass(GLTF2Loader, [{
      key: '_getOptions',
      value: function _getOptions(defaultOptions, json, options) {
        if (json.asset && json.asset.extras && json.asset.extras.loadOptions) {
          for (var optionName in json.asset.extras.loadOptions) {
            defaultOptions[optionName] = json.asset.extras.loadOptions[optionName];
          }
        }

        for (var _optionName in options) {
          defaultOptions[_optionName] = options[_optionName];
        }

        if (defaultOptions.loaderExtension && typeof defaultOptions.loaderExtension === "string") {
          defaultOptions.loaderExtension = GLBoost$1[options.loaderExtension].getInstance();
        }

        if (defaultOptions.statesOfElements) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = defaultOptions.statesOfElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var state = _step.value;

              if (state.shaderClass && typeof state.shaderClass === "string") {
                state.shaderClass = GLBoost$1[state.shaderClass];
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        return defaultOptions;
      }
    }, {
      key: 'loadGLTF',
      value: function loadGLTF(uri, options) {
        var _this = this;

        var defaultOptions = {
          files: {},
          loaderExtension: null,
          isNeededToMultiplyAlphaToColorOfPixelOutput: true,
          isTextureImageToLoadPreMultipliedAlphaAsDefault: false,
          isExistJointGizmo: false,
          isBlend: false,
          isDepthTest: true,
          defaultShaderClass: null,
          isMeshTransparentAsDefault: false,
          statesOfElements: [{
            targets: [],
            specifyMethod: GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME,
            states: {
              enable: [],
              functions: {}
            },
            isTransparent: true,
            opacity: 1.0,
            shaderClass: DecalShader,
            isTextureImageToLoadPreMultipliedAlpha: false,
            globalStatesUsage: GLBoost$1.GLOBAL_STATES_USAGE_IGNORE }]
        };

        (function () {
          var userAgent = window.navigator.userAgent.toLowerCase();
          if (userAgent.indexOf('safari') !== -1) {
            var cors_api_host = 'cors-anywhere.glboost.org';
            var cors_api_url = 'https://' + cors_api_host + '/';
            var slice = [].slice;
            var origin = window.location.protocol + '//' + window.location.host;
            var open = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function () {
              var args = slice.call(arguments);
              var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
              if (targetOrigin && targetOrigin[0].toLowerCase() !== origin && targetOrigin[1] !== cors_api_host) {
                args[1] = cors_api_url + args[1];
              }
              return open.apply(this, args);
            };
          }
        })();

        if (options && options.files) {
          var _loop = function _loop(fileName) {
            var splitted = fileName.split('.');
            var fileExtension = splitted[splitted.length - 1];

            if (fileExtension === 'gltf' || fileExtension === 'glb') {
              return {
                v: new Promise(function (resolve, response) {
                  _this._checkArrayBufferOfGltf(options.files[fileName], null, options, defaultOptions, resolve);
                }, function (reject, error) {})
              };
            }
          };

          for (var fileName in options.files) {
            var _ret = _loop(fileName);

            if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
          }
        }

        return DataUtil.loadResourceAsync(uri, true, function (resolve, response) {
          var arrayBuffer = response;
          _this._checkArrayBufferOfGltf(arrayBuffer, uri, options, defaultOptions, resolve);
        }, function (reject, error) {});
      }
    }, {
      key: '_checkArrayBufferOfGltf',
      value: function _checkArrayBufferOfGltf(arrayBuffer, uri, options, defaultOptions, resolve) {
        this._materials = [];

        var dataView = new DataView(arrayBuffer, 0, 20);
        var isLittleEndian = true;

        var magic = dataView.getUint32(0, isLittleEndian);

        if (magic !== 0x46546C67) {
          this._loadAsTextJson(arrayBuffer, uri, options, defaultOptions, resolve);
        } else {
          this._loadAsBinaryJson(dataView, uri, isLittleEndian, arrayBuffer, options, defaultOptions, resolve);
        }
      }
    }, {
      key: '_loadAsBinaryJson',
      value: function _loadAsBinaryJson(dataView, uri, isLittleEndian, arrayBuffer, options, defaultOptions, resolve) {
        var gltfVer = dataView.getUint32(4, isLittleEndian);
        if (gltfVer !== 2) {
          reject('invalid version field in this binary glTF file.');
        }
        var lengthOfThisFile = dataView.getUint32(8, isLittleEndian);
        var lengthOfJSonChunkData = dataView.getUint32(12, isLittleEndian);
        var chunkType = dataView.getUint32(16, isLittleEndian);

        if (chunkType !== 0x4E4F534A) {
          reject('invalid chunkType of chunk0 in this binary glTF file.');
        }
        var arrayBufferJSonContent = arrayBuffer.slice(20, 20 + lengthOfJSonChunkData);
        var gotText = DataUtil.arrayBufferToString(arrayBufferJSonContent);
        var gltfJson = JSON.parse(gotText);
        options = this._getOptions(defaultOptions, gltfJson, options);
        var arrayBufferBinary = arrayBuffer.slice(20 + lengthOfJSonChunkData + 8);

        var basePath = null;
        if (uri) {
          basePath = uri.substring(0, uri.lastIndexOf('/')) + '/';
        }

        var promise = this._loadInner(arrayBufferBinary, basePath, gltfJson, options);
        promise.then(function (gltfJson) {
          console.log('Resoureces loading done!');
          resolve(gltfJson[0][0]);
        });
      }
    }, {
      key: '_loadAsTextJson',
      value: function _loadAsTextJson(arrayBuffer, uri, options, defaultOptions, resolve) {
        var gotText = DataUtil.arrayBufferToString(arrayBuffer);
        var basePath = null;
        if (uri) {
          basePath = uri.substring(0, uri.lastIndexOf('/')) + '/';
        }
        var gltfJson = JSON.parse(gotText);
        options = this._getOptions(defaultOptions, gltfJson, options);
        var promise = this._loadInner(null, basePath, gltfJson, options);
        promise.then(function (gltfJson) {
          console.log('Resoureces loading done!');
          resolve(gltfJson[0][0]);
        });
      }
    }, {
      key: '_loadInner',
      value: function _loadInner(arrayBufferBinary, basePath, gltfJson, options) {
        var _this2 = this;

        var promises = [];

        var resources = {
          shaders: [],
          buffers: [],
          images: []
        };
        promises.push(this._loadResources(arrayBufferBinary, basePath, gltfJson, options, resources));
        promises.push(new Promise(function (resolve, reject) {
          _this2._loadJsonContent(gltfJson, resources, options);
          resolve();
        }));

        return Promise.all(promises);
      }
    }, {
      key: '_loadJsonContent',
      value: function _loadJsonContent(gltfJson, resources, options) {
        this._loadDependenciesOfScenes(gltfJson);

        this._loadDependenciesOfNodes(gltfJson);

        this._loadDependenciesOfMeshes(gltfJson);

        this._loadDependenciesOfMaterials(gltfJson);

        this._loadDependenciesOfTextures(gltfJson);

        this._loadDependenciesOfJoints(gltfJson);

        this._loadDependenciesOfAnimations(gltfJson);

        this._loadDependenciesOfAccessors(gltfJson);

        this._loadDependenciesOfBufferViews(gltfJson);

        if (gltfJson.asset === void 0) {
          gltfJson.asset = {};
        }
        if (gltfJson.asset.extras === void 0) {
          gltfJson.asset.extras = {};
        }
        gltfJson.asset.extras.glboostOptions = options;
      }
    }, {
      key: '_loadDependenciesOfScenes',
      value: function _loadDependenciesOfScenes(gltfJson) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = gltfJson.scenes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var scene = _step2.value;

            scene.nodesIndices = scene.nodes.concat();
            for (var i in scene.nodesIndices) {
              scene.nodes[i] = gltfJson.nodes[scene.nodesIndices[i]];
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfNodes',
      value: function _loadDependenciesOfNodes(gltfJson) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {

          for (var _iterator3 = gltfJson.nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var node = _step3.value;

            if (node.children) {
              node.childrenIndices = node.children.concat();
              node.children = [];
              for (var i in node.childrenIndices) {
                node.children[i] = gltfJson.nodes[node.childrenIndices[i]];
              }
            }

            if (node.mesh !== void 0 && gltfJson.meshes !== void 0) {
              node.meshIndex = node.mesh;
              node.mesh = gltfJson.meshes[node.meshIndex];
            }

            if (node.skin !== void 0 && gltfJson.skins !== void 0) {
              node.skinIndex = node.skin;
              node.skin = gltfJson.skins[node.skinIndex];
              if (node.mesh.extras === void 0) {
                node.mesh.extras = {};
              }

              node.mesh.extras._skin = node.skin;
            }

            if (node.camera !== void 0 && gltfJson.cameras !== void 0) {
              node.cameraIndex = node.camera;
              node.camera = gltfJson.cameras[node.cameraIndex];
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfMeshes',
      value: function _loadDependenciesOfMeshes(gltfJson) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = gltfJson.meshes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var mesh = _step4.value;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = mesh.primitives[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var primitive = _step5.value;

                if (primitive.material !== void 0) {
                  primitive.materialIndex = primitive.material;
                  primitive.material = gltfJson.materials[primitive.materialIndex];
                }

                primitive.attributesindex = Object.assign({}, primitive.attributes);
                for (var attributeName in primitive.attributesindex) {
                  if (primitive.attributesindex[attributeName] >= 0) {
                    var accessor = gltfJson.accessors[primitive.attributesindex[attributeName]];
                    accessor.extras = {
                      toGetAsTypedArray: true
                    };
                    primitive.attributes[attributeName] = accessor;
                  } else {
                    primitive.attributes[attributeName] = void 0;
                  }
                }

                if (primitive.indices !== void 0) {
                  primitive.indicesIndex = primitive.indices;
                  primitive.indices = gltfJson.accessors[primitive.indicesIndex];
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfMaterials',
      value: function _loadDependenciesOfMaterials(gltfJson) {
        if (gltfJson.materials) {
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = gltfJson.materials[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var material = _step6.value;

              if (material.pbrMetallicRoughness) {
                var baseColorTexture = material.pbrMetallicRoughness.baseColorTexture;
                if (baseColorTexture !== void 0) {
                  baseColorTexture.texture = gltfJson.textures[baseColorTexture.index];
                }
                var metallicRoughnessTexture = material.pbrMetallicRoughness.metallicRoughnessTexture;
                if (metallicRoughnessTexture !== void 0) {
                  metallicRoughnessTexture.texture = gltfJson.textures[metallicRoughnessTexture.index];
                }
              }

              var normalTexture = material.normalTexture;
              if (normalTexture !== void 0) {
                normalTexture.texture = gltfJson.textures[normalTexture.index];
              }

              var occlusionTexture = material.occlusionTexture;
              if (occlusionTexture !== void 0) {
                occlusionTexture.texture = gltfJson.textures[occlusionTexture.index];
              }

              var emissiveTexture = material.emissiveTexture;
              if (emissiveTexture !== void 0) {
                emissiveTexture.texture = gltfJson.textures[emissiveTexture.index];
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfTextures',
      value: function _loadDependenciesOfTextures(gltfJson) {
        if (gltfJson.textures) {
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = gltfJson.textures[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _texture = _step7.value;

              if (_texture.sampler !== void 0) {
                _texture.samplerIndex = _texture.sampler;
                _texture.sampler = gltfJson.samplers[_texture.samplerIndex];
              }
              if (_texture.source !== void 0) {
                _texture.sourceIndex = _texture.source;
                _texture.image = gltfJson.images[_texture.sourceIndex];
              }
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfJoints',
      value: function _loadDependenciesOfJoints(gltfJson) {
        if (gltfJson.skins) {
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = gltfJson.skins[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var skin = _step8.value;

              skin.skeletonIndex = skin.skeleton;
              skin.skeleton = gltfJson.nodes[skin.skeletonIndex];

              skin.inverseBindMatricesIndex = skin.inverseBindMatrices;
              skin.inverseBindMatrices = gltfJson.accessors[skin.inverseBindMatricesIndex];

              skin.jointsIndices = skin.joints;
              skin.joints = [];
              var _iteratorNormalCompletion9 = true;
              var _didIteratorError9 = false;
              var _iteratorError9 = undefined;

              try {
                for (var _iterator9 = skin.jointsIndices[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  var jointIndex = _step9.value;

                  skin.joints.push(gltfJson.nodes[jointIndex]);
                }
              } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion9 && _iterator9.return) {
                    _iterator9.return();
                  }
                } finally {
                  if (_didIteratorError9) {
                    throw _iteratorError9;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfAnimations',
      value: function _loadDependenciesOfAnimations(gltfJson) {
        if (gltfJson.animations) {
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = gltfJson.animations[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              var animation = _step10.value;
              var _iteratorNormalCompletion11 = true;
              var _didIteratorError11 = false;
              var _iteratorError11 = undefined;

              try {
                for (var _iterator11 = animation.channels[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  var channel = _step11.value;

                  channel.samplerIndex = channel.sampler;
                  channel.sampler = animation.samplers[channel.samplerIndex];

                  channel.target.nodeIndex = channel.target.node;
                  channel.target.node = gltfJson.nodes[channel.target.nodeIndex];
                }
              } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion11 && _iterator11.return) {
                    _iterator11.return();
                  }
                } finally {
                  if (_didIteratorError11) {
                    throw _iteratorError11;
                  }
                }
              }

              var _iteratorNormalCompletion12 = true;
              var _didIteratorError12 = false;
              var _iteratorError12 = undefined;

              try {
                for (var _iterator12 = animation.channels[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                  var _channel = _step12.value;

                  _channel.sampler.inputIndex = _channel.sampler.input;
                  _channel.sampler.outputIndex = _channel.sampler.output;
                  _channel.sampler.input = gltfJson.accessors[_channel.sampler.inputIndex];
                  _channel.sampler.output = gltfJson.accessors[_channel.sampler.outputIndex];
                  if (_channel.target.path === 'rotation') {
                    if (_channel.sampler.output.extras === void 0) {
                      _channel.sampler.output.extras = {};
                    }
                    _channel.sampler.output.extras.quaternionIfVec4 = true;
                  }
                }
              } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion12 && _iterator12.return) {
                    _iterator12.return();
                  }
                } finally {
                  if (_didIteratorError12) {
                    throw _iteratorError12;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfAccessors',
      value: function _loadDependenciesOfAccessors(gltfJson) {
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = gltfJson.accessors[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var accessor = _step13.value;

            if (accessor.bufferView !== void 0) {
              accessor.bufferViewIndex = accessor.bufferView;
              accessor.bufferView = gltfJson.bufferViews[accessor.bufferViewIndex];
            }
          }
        } catch (err) {
          _didIteratorError13 = true;
          _iteratorError13 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
              _iterator13.return();
            }
          } finally {
            if (_didIteratorError13) {
              throw _iteratorError13;
            }
          }
        }
      }
    }, {
      key: '_loadDependenciesOfBufferViews',
      value: function _loadDependenciesOfBufferViews(gltfJson) {
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = gltfJson.bufferViews[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var bufferView = _step14.value;

            if (bufferView.buffer !== void 0) {
              bufferView.bufferIndex = bufferView.buffer;
              bufferView.buffer = gltfJson.buffers[bufferView.bufferIndex];
            }
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14.return) {
              _iterator14.return();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }
      }
    }, {
      key: '_loadResources',
      value: function _loadResources(arrayBufferBinary, basePath, gltfJson, options, resources) {
        var _this3 = this;

        var promisesToLoadResources = [];

        var _loop2 = function _loop2(i) {
          resources.shaders[i] = {};

          var shaderJson = gltfJson.shaders[i];
          var shaderType = shaderJson.type;
          if (typeof shaderJson.extensions !== 'undefined' && typeof shaderJson.extensions.KHR_binary_glTF !== 'undefined') {
            resources.shaders[i].shaderText = _this3._accessBinaryAsShader(shaderJson.extensions.KHR_binary_glTF.bufferView, gltfJson, arrayBufferBinary);
            resources.shaders[i].shaderType = shaderType;
            return 'continue';
          }

          var shaderUri = shaderJson.uri;

          if (options.files) {
            var _splitted = shaderUri.split('/');
            var _filename = _splitted[_splitted.length - 1];
            if (options.files[_filename]) {
              var arrayBuffer = options.files[_filename];
              shaders[shaderName].shaderText = DataUtil.arrayBufferToString(arrayBuffer);
              shaders[shaderName].shaderType = shaderType;
              return 'continue';
            }
          }

          if (shaderUri.match(/^data:/)) {
            promisesToLoadResources.push(new Promise(function (resolve, rejected) {
              var arrayBuffer = DataUtil.base64ToArrayBuffer(shaderUri);
              resources.shaders[i].shaderText = DataUtil.arrayBufferToString(arrayBuffer);
              resources.shaders[i].shaderType = shaderType;
              resolve();
            }));
          } else {
            shaderUri = basePath + shaderUri;
            promisesToLoadResources.push(DataUtil.loadResourceAsync(shaderUri, false, function (resolve, response) {
              resources.shaders[i].shaderText = response;
              resources.shaders[i].shaderType = shaderType;
              resolve(gltfJson);
            }, function (reject, error) {}));
          }
        };

        for (var i in gltfJson.shaders) {
          var _ret2 = _loop2(i);

          if (_ret2 === 'continue') continue;
        }

        var _loop3 = function _loop3(i) {
          var bufferInfo = gltfJson.buffers[i];

          var splitted = null;
          var filename = null;
          if (bufferInfo.uri) {
            splitted = bufferInfo.uri.split('/');
            filename = splitted[splitted.length - 1];
          }
          if (typeof bufferInfo.uri === 'undefined') {
            promisesToLoadResources.push(new Promise(function (resolve, rejected) {
              resources.buffers[i] = arrayBufferBinary;
              bufferInfo.buffer = arrayBufferBinary;
              resolve(gltfJson);
            }));
          } else if (bufferInfo.uri.match(/^data:application\/octet-stream;base64,/)) {
            promisesToLoadResources.push(new Promise(function (resolve, rejected) {
              var arrayBuffer = DataUtil.base64ToArrayBuffer(bufferInfo.uri);
              resources.buffers[i] = arrayBuffer;
              bufferInfo.buffer = arrayBuffer;
              resolve(gltfJson);
            }));
          } else if (options.files && options.files[filename]) {
            promisesToLoadResources.push(new Promise(function (resolve, rejected) {
              var arrayBuffer = options.files[filename];
              resources.buffers[i] = arrayBuffer;
              bufferInfo.buffer = arrayBuffer;
              resolve(gltfJson);
            }));
          } else {
            promisesToLoadResources.push(DataUtil.loadResourceAsync(basePath + bufferInfo.uri, true, function (resolve, response) {
              resources.buffers[i] = response;
              bufferInfo.buffer = response;
              resolve(gltfJson);
            }, function (reject, error) {}));
          }
        };

        for (var i in gltfJson.buffers) {
          _loop3(i);
        }

        var _loop4 = function _loop4(i) {
          var imageJson = gltfJson.images[i];


          var imageUri = null;

          if (typeof imageJson.uri === 'undefined') {
            imageUri = _this3._accessBinaryAsImage(imageJson.bufferView, gltfJson, arrayBufferBinary, imageJson.mimeType);
          } else {
            var imageFileStr = imageJson.uri;
            var _splitted2 = imageFileStr.split('/');
            var _filename2 = _splitted2[_splitted2.length - 1];
            if (options.files && options.files[_filename2]) {
              var arrayBuffer = options.files[_filename2];
              var _splitted3 = _filename2.split('.');
              var fileExtension = _splitted3[_splitted3.length - 1];
              imageUri = _this3._accessArrayBufferAsImage(arrayBuffer, fileExtension);
            } else if (imageFileStr.match(/^data:/)) {
              imageUri = imageFileStr;
            } else {
              imageUri = basePath + imageFileStr;
            }
          }
          if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
            if (options.isTextureImageToLoadPreMultipliedAlpha) ;
          } else {
            if (options.isTextureImageToLoadPreMultipliedAlpha) ;
          }

          if (options.extensionLoader && options.extensionLoader.setUVTransformToTexture) {
            options.extensionLoader.setUVTransformToTexture(texture, samplerJson);
          }

          promisesToLoadResources.push(new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = imageUri;
            imageJson.image = img;
            img.crossOrigin = 'Anonymous';
            if (imageUri.match(/^data:/)) {
              resolve(gltfJson);
            } else {

              var load = function load(img, response) {

                var bytes = new Uint8Array(response);
                var binaryData = "";
                for (var i = 0, len = bytes.byteLength; i < len; i++) {
                  binaryData += String.fromCharCode(bytes[i]);
                }
                var split = imageUri.split('.');
                var ext = split[split.length - 1];
                img.src = _this3._getImageType(ext) + window.btoa(binaryData);
                img.onload = function () {
                  resolve(gltfJson);
                };
              };

              var loadBinaryImage = function loadBinaryImage() {
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function (_img) {
                  return function () {

                    if (this.readyState == 4 && this.status == 200) {
                      load(_img, this.response);
                    }
                  };
                }(img);
                xhr.open('GET', imageUri);
                xhr.responseType = 'arraybuffer';
                xhr.send();
              };
              loadBinaryImage();
            }

            resources.images[i] = img;
          }));
        };

        for (var i in gltfJson.images) {
          _loop4(i);
        }

        return Promise.all(promisesToLoadResources);
      }
    }, {
      key: '_sliceBufferViewToArrayBuffer',
      value: function _sliceBufferViewToArrayBuffer(json, bufferViewStr, arrayBuffer) {
        var bufferViewJson = json.bufferViews[bufferViewStr];
        var byteOffset = bufferViewJson.byteOffset;
        var byteLength = bufferViewJson.byteLength;
        var arrayBufferSliced = arrayBuffer.slice(byteOffset, byteOffset + byteLength);
        return arrayBufferSliced;
      }
    }, {
      key: '_accessBinaryAsImage',
      value: function _accessBinaryAsImage(bufferViewStr, json, arrayBuffer, mimeType) {
        var arrayBufferSliced = this._sliceBufferViewToArrayBuffer(json, bufferViewStr, arrayBuffer);
        return this._accessArrayBufferAsImage(arrayBufferSliced, mimeType);
      }
    }, {
      key: '_getImageType',
      value: function _getImageType(imageType) {
        var imgSrc = null;
        if (imageType === 'image/jpeg' || imageType.toLowerCase() === 'jpg' || imageType.toLowerCase() === 'jpeg') {
          imgSrc = "data:image/jpeg;base64,";
        } else if (imageType == 'image/png' || imageType.toLowerCase() === 'png') {
          imgSrc = "data:image/png;base64,";
        } else if (imageType == 'image/gif' || imageType.toLowerCase() === 'gif') {
          imgSrc = "data:image/gif;base64,";
        } else if (imageType == 'image/bmp' || imageType.toLowerCase() === 'bmp') {
          imgSrc = "data:image/bmp;base64,";
        } else {
          imgSrc = "data:image/unknown;base64,";
        }
        return imgSrc;
      }
    }, {
      key: '_accessArrayBufferAsImage',
      value: function _accessArrayBufferAsImage(arrayBuffer, imageType) {
        var bytes = new Uint8Array(arrayBuffer);
        var binaryData = '';
        for (var i = 0, len = bytes.byteLength; i < len; i++) {
          binaryData += String.fromCharCode(bytes[i]);
        }
        var imgSrc = this._getImageType(imageType);
        var dataUrl = imgSrc + DataUtil.btoa(binaryData);
        return dataUrl;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton$6]) {
          this[singleton$6] = new GLTF2Loader(singletonEnforcer$3);
        }
        return this[singleton$6];
      }
    }]);
    return GLTF2Loader;
  }();


  GLBoost$1["GLTF2Loader"] = GLTF2Loader;

  var singleton$7 = Symbol();
  var singletonEnforcer$4 = Symbol();

  var ModelConverter = function () {
    function ModelConverter(enforcer) {
      babelHelpers.classCallCheck(this, ModelConverter);

      if (enforcer !== singletonEnforcer$4) {
        throw new Error("This is a Singleton class. get the instance using 'getInstance' static method.");
      }
    }

    babelHelpers.createClass(ModelConverter, [{
      key: '_getDefaultShader',
      value: function _getDefaultShader(options) {
        var defaultShader = null;

        if (options && typeof options.defaultShaderClass !== "undefined") {
          if (typeof options.defaultShaderClass === "string") {
            defaultShader = GLBoost$1[options.defaultShaderClass];
          } else {
            defaultShader = options.defaultShaderClass;
          }
        }

        return defaultShader;
      }
    }, {
      key: 'convertToGLBoostModel',
      value: function convertToGLBoostModel(glBoostContext, gltfModel) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = gltfModel.accessors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var accessor = _step.value;

            this._accessBinaryWithAccessor(accessor);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var glboostMeshes = this._setupMesh(glBoostContext, gltfModel);

        var groups = [];
        for (var node_i in gltfModel.nodes) {
          var _group = glBoostContext.createGroup();
          groups.push(_group);
        }

        this._setupTransform(gltfModel, groups);

        this._setupSkeleton(glBoostContext, gltfModel, groups, glboostMeshes);

        this._setupHierarchy(glBoostContext, gltfModel, groups, glboostMeshes);

        this._setupAnimation(gltfModel, groups);

        var rootGroup = glBoostContext.createGroup();
        rootGroup.userFlavorName = 'FileRoot';
        if (gltfModel.scenes[0].nodesIndices) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = gltfModel.scenes[0].nodesIndices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var nodesIndex = _step2.value;

              rootGroup.addChild(groups[nodesIndex], true);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = glboostMeshes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var glboostMesh = _step3.value;

            if (glboostMesh instanceof M_SkeletalMesh) {
              if (!glboostMesh.jointsHierarchy) {
                glboostMesh.jointsHierarchy = rootGroup;
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        var options = gltfModel.asset.extras.glboostOptions;
        if (options.loaderExtension && options.loaderExtension.setAssetPropertiesToRootGroup) {
          options.loaderExtension.setAssetPropertiesToRootGroup(rootGroup, gltfModel.asset);
        }

        rootGroup.allMeshes = rootGroup.searchElementsByType(M_Mesh);

        return rootGroup;
      }
    }, {
      key: '_setupTransform',
      value: function _setupTransform(gltfModel, groups) {
        for (var node_i in gltfModel.nodes) {
          var _group2 = groups[node_i];
          var nodeJson = gltfModel.nodes[node_i];

          if (nodeJson.translation) {
            _group2.translate = new Vector3(nodeJson.translation[0], nodeJson.translation[1], nodeJson.translation[2]);
          }
          if (nodeJson.scale) {
            _group2.scale = new Vector3(nodeJson.scale[0], nodeJson.scale[1], nodeJson.scale[2]);
          }
          if (nodeJson.rotation) {
            _group2.quaternion = new Quaternion(nodeJson.rotation[0], nodeJson.rotation[1], nodeJson.rotation[2], nodeJson.rotation[3]);
          }
          if (nodeJson.matrix) {
            _group2.matrix = new Matrix44$1(nodeJson.matrix, true);
          }
        }
      }
    }, {
      key: '_setupHierarchy',
      value: function _setupHierarchy(glBoostContext, gltfModel, groups, glboostMeshes) {

        for (var node_i in gltfModel.nodes) {
          var node = gltfModel.nodes[parseInt(node_i)];
          var parentGroup = groups[node_i];
          if (node.mesh) {
            parentGroup.addChild(glboostMeshes[node.meshIndex], true);
          }
          if (node.childrenIndices) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = node.childrenIndices[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var childNode_i = _step4.value;

                var childGroup = groups[childNode_i];
                parentGroup.addChild(childGroup, true);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        }
      }
    }, {
      key: '_setupAnimation',
      value: function _setupAnimation(gltfModel, groups) {
        if (gltfModel.animations) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = gltfModel.animations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var animation = _step5.value;
              var _iteratorNormalCompletion6 = true;
              var _didIteratorError6 = false;
              var _iteratorError6 = undefined;

              try {

                for (var _iterator6 = animation.channels[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  var channel = _step6.value;

                  var animInputArray = channel.sampler.input.extras.vertexAttributeArray;

                  var animOutputArray = channel.sampler.output.extras.vertexAttributeArray;
                  var animationAttributeName = '';
                  if (channel.target.path === 'translation') {
                    animationAttributeName = 'translate';
                  } else if (channel.target.path === 'rotation') {
                    animationAttributeName = 'quaternion';
                  } else {
                    animationAttributeName = channel.target.path;
                  }

                  var _group3 = groups[channel.target.nodeIndex];
                  if (_group3) {
                    _group3.setAnimationAtLine('time', animationAttributeName, animInputArray, animOutputArray);
                    _group3.setActiveAnimationLine('time');
                  }
                }
              } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                  }
                } finally {
                  if (_didIteratorError6) {
                    throw _iteratorError6;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      }
    }, {
      key: '_setupSkeleton',
      value: function _setupSkeleton(glBoostContext, gltfModel, groups, glboostMeshes) {
        for (var node_i in gltfModel.nodes) {
          var node = gltfModel.nodes[node_i];
          var _group4 = groups[node_i];
          if (node.skin && node.skin.skeleton) {
            _group4._isRootJointGroup = true;
            if (node.mesh) {
              var glboostMesh = glboostMeshes[node.meshIndex];
              glboostMesh.jointsHierarchy = groups[node.skin.skeletonIndex];
            }
          }

          if (node.skin && node.skin.joints) {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = node.skin.jointsIndices[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var joint_i = _step7.value;

                var joint = node.skin.joints[joint_i];
                var options = gltfModel.asset.extras.glboostOptions;
                var glboostJoint = glBoostContext.createJoint(options.isExistJointGizmo);
                glboostJoint._glTFJointIndex = joint_i;

                var _group5 = groups[joint_i];
                _group5.addChild(glboostJoint, true);
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }
          }
        }
      }
    }, {
      key: '_setupMesh',
      value: function _setupMesh(glBoostContext, gltfModel) {
        var glboostMeshes = [];
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = gltfModel.meshes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var mesh = _step8.value;

            var geometry = null;
            var glboostMesh = null;
            if (mesh.extras && mesh.extras._skin && mesh.extras._skin.inverseBindMatrices) {
              geometry = glBoostContext.createSkeletalGeometry();
              glboostMesh = glBoostContext.createSkeletalMesh(geometry, null);
              glboostMesh.gltfJointIndices = mesh.extras._skin.jointsIndices;
              glboostMesh.inverseBindMatrices = mesh.extras._skin.inverseBindMatrices.extras.vertexAttributeArray;
            } else {
              geometry = glBoostContext.createGeometry();
              glboostMesh = glBoostContext.createMesh(geometry);
            }
            glboostMeshes.push(glboostMesh);

            var options = gltfModel.asset.extras.glboostOptions;
            if (options.isMeshTransparentAsDefault) {
              glboostMeshes.isTransparentForce = true;
            }

            var _indicesArray = [];
            var _positions = [];
            var _normals = [];
            var vertexData = {
              position: _positions,
              normal: _normals,
              components: {},
              componentBytes: {},
              componentType: {}
            };
            var additional = {
              'joint': [],
              'weight': [],
              'texcoord': [],
              'color': []
            };

            var dataViewMethodDic = {};
            var materials = [];
            var indicesAccumulatedLength = 0;

            var primitiveMode = 4;

            for (var i in mesh.primitives) {
              var primitive = mesh.primitives[i];
              if (primitive.mode != null) {
                primitiveMode = primitive.mode;
              }

              {
                var accessor = primitive.attributes.POSITION;
                _positions[i] = accessor.extras.vertexAttributeArray;
                vertexData.components.position = accessor.extras.componentN;
                vertexData.componentBytes.position = accessor.extras.componentBytes;
                vertexData.componentType.position = accessor.componentType;
                dataViewMethodDic.position = accessor.extras.dataViewMethod;
              }

              var indices = null;
              if (typeof primitive.indices !== 'undefined') {
                primitive.indices.indices = gltfModel.accessors[primitive.indicesIndex];
                indices = primitive.indices.indices.extras.vertexAttributeArray;
                for (var j = 0; j < indices.length; j++) {
                  indices[j] = indicesAccumulatedLength + indices[j];
                }
                _indicesArray[i] = indices;
                indicesAccumulatedLength += _positions[i].length / vertexData.components.position;
              }

              {
                var _accessor = primitive.attributes.NORMAL;
                if (_accessor) {
                  _normals[i] = _accessor.extras.vertexAttributeArray;
                  vertexData.components.normal = _accessor.extras.componentN;
                  vertexData.componentBytes.normal = _accessor.extras.componentBytes;
                  vertexData.componentType.normal = _accessor.componentType;
                  dataViewMethodDic.normal = _accessor.extras.dataViewMethod;
                }

                _accessor = primitive.attributes.COLOR_0;
                if (_accessor) {
                  additional['color'][i] = _accessor.extras.vertexAttributeArray;
                  vertexData.components.color = _accessor.extras.componentN;
                  vertexData.componentBytes.color = _accessor.extras.componentBytes;
                  vertexData.componentType.color = _accessor.componentType;
                  dataViewMethodDic.color = _accessor.extras.dataViewMethod;
                }
              }

              {
                var _accessor2 = primitive.attributes.JOINTS_0;
                if (_accessor2) {
                  additional['joint'][i] = _accessor2.extras.vertexAttributeArray;
                  vertexData.components.joint = _accessor2.extras.componentN;
                  vertexData.componentBytes.joint = _accessor2.extras.componentBytes;
                  vertexData.componentType.joint = _accessor2.componentType;
                  dataViewMethodDic.joint = _accessor2.extras.dataViewMethod;
                }
                _accessor2 = primitive.attributes.WEIGHTS_0;
                if (_accessor2) {
                  additional['weight'][i] = _accessor2.extras.vertexAttributeArray;
                  vertexData.components.weight = _accessor2.extras.componentN;
                  vertexData.componentBytes.weight = _accessor2.extras.componentBytes;
                  vertexData.componentType.weight = _accessor2.componentType;
                  dataViewMethodDic.weight = _accessor2.extras.dataViewMethod;
                }
              }

              if (primitive.material) {
                var texcoords = null;

                var material = primitive.material;

                var glboostMaterial = glBoostContext.createPBRMetallicRoughnessMaterial();
                if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
                  glboostMaterial.shaderParameters.isNeededToMultiplyAlphaToColorOfPixelOutput = options.isNeededToMultiplyAlphaToColorOfPixelOutput;
                }


                var _accessor3 = primitive.attributes.TEXCOORD_0;

                texcoords = this._setupMaterial(glBoostContext, gltfModel, glboostMaterial, material, _accessor3, additional, vertexData, dataViewMethodDic, _positions, indices, geometry, i);

                materials.push(glboostMaterial);
              } else {
                var _glboostMaterial = null;
                if (options.loaderExtension && options.loaderExtension.createClassicMaterial) {
                  _glboostMaterial = options.loaderExtension.createClassicMaterial(glBoostContext);
                } else {
                  _glboostMaterial = glBoostContext.createClassicMaterial();
                }

                var defaultShader = this._getDefaultShader(options);
                if (defaultShader) {
                  _glboostMaterial.shaderClass = defaultShader;
                } else {
                  _glboostMaterial.baseColor = new Vector4$1(0.5, 0.5, 0.5, 1);
                }
                materials.push(_glboostMaterial);
              }
            }

            if (mesh.primitives.length > 1) {
              var getTypedArray = function getTypedArray(dataViewMethod, length) {
                var vertexAttributeArray = null;
                if (dataViewMethod === 'getInt8') {
                  vertexAttributeArray = new Int8Array(length);
                } else if (dataViewMethod === 'getUint8') {
                  vertexAttributeArray = new Uint8Array(length);
                } else if (dataViewMethod === 'getInt16') {
                  vertexAttributeArray = new Int16Array(length);
                } else if (dataViewMethod === 'getUint16') {
                  vertexAttributeArray = new Uint16Array(length);
                } else if (dataViewMethod === 'getInt32') {
                  vertexAttributeArray = new Int32Array(length);
                } else if (dataViewMethod === 'getUint32') {
                  vertexAttributeArray = new Uint32Array(length);
                } else if (dataViewMethod === 'getFloat32') {
                  vertexAttributeArray = new Float32Array(length);
                }

                return vertexAttributeArray;
              };

              var lengthDic = { index: 0, position: 0, normal: 0, joint: 0, weight: 0, texcoord: 0, color: 0 };
              for (var _i = 0; _i < mesh.primitives.length; _i++) {
                lengthDic.position += _positions[_i].length;
                if (_normals[_i]) {
                  lengthDic.normal += _normals[_i].length;
                }
                if (typeof additional['joint'][_i] !== 'undefined') {
                  lengthDic.joint += additional['joint'][_i].length;
                }
                if (typeof additional['weight'][_i] !== 'undefined') {
                  lengthDic.weight += additional['weight'][_i].length;
                }
                if (typeof additional['texcoord'][_i] !== 'undefined') {
                  lengthDic.texcoord += additional['texcoord'][_i].length;
                }
                if (typeof additional['color'][_i] !== 'undefined') {
                  lengthDic.color += additional['color'][_i].length;
                }
              }

              for (var attribName in dataViewMethodDic) {
                var newTypedArray = getTypedArray(dataViewMethodDic[attribName], lengthDic[attribName]);
                var offset = 0;
                for (var _i2 = 0; _i2 < mesh.primitives.length; _i2++) {

                  var array = null;

                  if (attribName === 'position') {
                    array = _positions[_i2];
                  } else if (attribName === 'normal') {
                    array = _normals[_i2];
                  } else if (attribName === 'joint') {
                    array = additional['joint'][_i2];
                  } else if (attribName === 'weight') {
                    array = additional['weight'][_i2];
                  } else if (attribName === 'texcoord') {
                    array = additional['texcoord'][_i2];
                  } else if (attribName === 'color') {
                    array = additional['color'][_i2];
                  }

                  if (array) {
                    newTypedArray.set(array, offset);
                    offset += array.length;
                  }
                }

                if (attribName === 'position') {
                  vertexData.position = newTypedArray;
                } else if (attribName === 'normal') {
                  vertexData.normal = newTypedArray;
                } else if (attribName === 'joint') {
                  additional['joint'] = newTypedArray;
                } else if (attribName === 'weight') {
                  additional['weight'] = newTypedArray;
                } else if (attribName === 'texcoord') {
                  additional['texcoord'] = newTypedArray;
                } else if (attribName === 'color') {
                  additional['color'] = newTypedArray;
                }
              }
            } else {
              vertexData.position = _positions[0];
              vertexData.normal = _normals[0];
              additional['joint'] = additional['joint'][0];
              additional['weight'] = additional['weight'][0];
              additional['texcoord'] = additional['texcoord'][0];
              additional['color'] = additional['color'][0];
            }

            if (typeof vertexData.normal === 'undefined' || vertexData.normal.length === 0) {
              delete vertexData.normal;
            }
            if (typeof additional['joint'] === 'undefined' || additional['joint'].length === 0) {
              delete additional['joint'];
            }
            if (typeof additional['weight'] === 'undefined' || additional['weight'].length === 0) {
              delete additional['weight'];
            }
            if (typeof additional['texcoord'] === 'undefined' || additional['texcoord'].length === 0) {
              delete additional['texcoord'];
            }
            if (typeof additional['color'] === 'undefined' || additional['color'].length === 0) {
              delete additional['color'];
            }

            if (_indicesArray.length === 0) {
              _indicesArray = null;
            }

            geometry.setVerticesData(ArrayUtil.merge(vertexData, additional), _indicesArray, primitiveMode);
            geometry.materials = materials;
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }

        return glboostMeshes;
      }
    }, {
      key: '_setupMaterial',
      value: function _setupMaterial(glBoostContext, gltfModel, gltfMaterial, materialJson, accessor, additional, vertexData, dataViewMethodDic, _positions, indices, geometry, i) {
        var options = gltfModel.asset.extras.glboostOptions;

        if (accessor) {
          additional['texcoord'][i] = accessor.extras.vertexAttributeArray;
          vertexData.components.texcoord = accessor.extras.componentN;
          vertexData.componentBytes.texcoord = accessor.extras.componentBytes;
          vertexData.componentType.texcoord = accessor.componentType;
          dataViewMethodDic.texcoord = accessor.extras.dataViewMethod;

          var setTextures = function setTextures(materialJson) {
            if (materialJson.pbrMetallicRoughness) {
              var baseColorTexture = materialJson.pbrMetallicRoughness.baseColorTexture;
              if (baseColorTexture) {
                var sampler = baseColorTexture.texture.sampler;

                var isNeededToMultiplyAlphaToColorOfTexture = false;

                if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
                  if (options.isTextureImageToLoadPreMultipliedAlphaAsDefault) ; else {
                    isNeededToMultiplyAlphaToColorOfTexture = true;
                  }
                } else {
                  if (options.isTextureImageToLoadPreMultipliedAlphaAsDefault) ;
                }

                if (options && options.statesOfElements) {
                  var _iteratorNormalCompletion9 = true;
                  var _didIteratorError9 = false;
                  var _iteratorError9 = undefined;

                  try {
                    for (var _iterator9 = options.statesOfElements[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                      var statesInfo = _step9.value;

                      if (statesInfo.targets) {
                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                          for (var _iterator10 = statesInfo.targets[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var target = _step10.value;

                            var isMatch = false;
                            var specifyMethod = statesInfo.specifyMethod !== void 0 ? statesInfo.specifyMethod : GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME;
                            switch (specifyMethod) {
                              case GLBoost$1.QUERY_TYPE_USER_FLAVOR_NAME:
                                isMatch = group.userFlavorName === target;break;
                              case GLBoost$1.QUERY_TYPE_INSTANCE_NAME:
                                isMatch = group.instanceName === target;break;
                              case GLBoost$1.QUERY_TYPE_INSTANCE_NAME_WITH_USER_FLAVOR:
                                isMatch = group.instanceNameWithUserFlavor === target;break;
                            }

                            if (isMatch) {
                              if (options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
                                if (statesInfo.isTextureImageToLoadPreMultipliedAlpha) ; else {
                                  isNeededToMultiplyAlphaToColorOfTexture = true;
                                }
                              } else {
                                if (statesInfo.isTextureImageToLoadPreMultipliedAlpha) ;
                              }
                            }
                          }
                        } catch (err) {
                          _didIteratorError10 = true;
                          _iteratorError10 = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                              _iterator10.return();
                            }
                          } finally {
                            if (_didIteratorError10) {
                              throw _iteratorError10;
                            }
                          }
                        }
                      }
                    }
                  } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                      }
                    } finally {
                      if (_didIteratorError9) {
                        throw _iteratorError9;
                      }
                    }
                  }
                }

                var texture = glBoostContext.createTexture(baseColorTexture.texture.image.image, '', {
                  'TEXTURE_MAG_FILTER': sampler === void 0 ? GLBoost$1.LINEAR : sampler.magFilter,
                  'TEXTURE_MIN_FILTER': sampler === void 0 ? GLBoost$1.LINEAR_MIPMAP_LINEAR : sampler.minFilter,
                  'TEXTURE_WRAP_S': sampler === void 0 ? GLBoost$1.REPEAT : sampler.wrapS,
                  'TEXTURE_WRAP_T': sampler === void 0 ? GLBoost$1.REPEAT : sampler.wrapT,
                  'UNPACK_PREMULTIPLY_ALPHA_WEBGL': isNeededToMultiplyAlphaToColorOfTexture
                });
                texture.userFlavorName = 'Texture_Diffuse_index_' + baseColorTexture.index + '_of_' + gltfMaterial.instanceNameWithUserFlavor;
                gltfMaterial.setTexture(texture, GLBoost$1.TEXTURE_PURPOSE_DIFFUSE);
              }

              var metallicRoughnessTexture = materialJson.pbrMetallicRoughness.metallicRoughnessTexture;
              if (metallicRoughnessTexture) {
                var _sampler = metallicRoughnessTexture.texture.sampler;
                var _texture = glBoostContext.createTexture(metallicRoughnessTexture.texture.image.image, '', {
                  'TEXTURE_MAG_FILTER': _sampler === void 0 ? GLBoost$1.LINEAR : _sampler.magFilter,
                  'TEXTURE_MIN_FILTER': _sampler === void 0 ? GLBoost$1.LINEAR_MIPMAP_LINEAR : _sampler.minFilter,
                  'TEXTURE_WRAP_S': _sampler === void 0 ? GLBoost$1.REPEAT : _sampler.wrapS,
                  'TEXTURE_WRAP_T': _sampler === void 0 ? GLBoost$1.REPEAT : _sampler.wrapT
                });
                _texture.userFlavorName = 'Texture_MetallicRoughness_index_' + metallicRoughnessTexture.index + '_of_' + gltfMaterial.instanceNameWithUserFlavor;
                gltfMaterial.setTexture(_texture, GLBoost$1.TEXTURE_PURPOSE_METALLIC_ROUGHNESS);
              }

              var normalTexture = materialJson.normalTexture;
              if (normalTexture) {
                var _sampler2 = normalTexture.texture.sampler;
                var _texture2 = glBoostContext.createTexture(normalTexture.texture.image.image, '', {
                  'TEXTURE_MAG_FILTER': _sampler2 === void 0 ? GLBoost$1.LINEAR : _sampler2.magFilter,
                  'TEXTURE_MIN_FILTER': _sampler2 === void 0 ? GLBoost$1.LINEAR_MIPMAP_LINEAR : _sampler2.minFilter,
                  'TEXTURE_WRAP_S': _sampler2 === void 0 ? GLBoost$1.REPEAT : _sampler2.wrapS,
                  'TEXTURE_WRAP_T': _sampler2 === void 0 ? GLBoost$1.REPEAT : _sampler2.wrapT
                });
                _texture2.userFlavorName = 'Texture_MetallicRoughness_index_' + normalTexture.index + '_of_' + gltfMaterial.instanceNameWithUserFlavor;
                gltfMaterial.setTexture(_texture2, GLBoost$1.TEXTURE_PURPOSE_NORMAL);
              }

              var occlusionTexture = materialJson.occlusionTexture;
              if (occlusionTexture) {
                var _sampler3 = occlusionTexture.texture.sampler;
                var _texture3 = glBoostContext.createTexture(occlusionTexture.texture.image.image, '', {
                  'TEXTURE_MAG_FILTER': _sampler3 === void 0 ? GLBoost$1.LINEAR : _sampler3.magFilter,
                  'TEXTURE_MIN_FILTER': _sampler3 === void 0 ? GLBoost$1.LINEAR_MIPMAP_LINEAR : _sampler3.minFilter,
                  'TEXTURE_WRAP_S': _sampler3 === void 0 ? GLBoost$1.REPEAT : _sampler3.wrapS,
                  'TEXTURE_WRAP_T': _sampler3 === void 0 ? GLBoost$1.REPEAT : _sampler3.wrapT
                });
                _texture3.userFlavorName = 'Texture_Occlusion_index_' + occlusionTexture.index + '_of_' + gltfMaterial.instanceNameWithUserFlavor;
                gltfMaterial.setTexture(_texture3, GLBoost$1.TEXTURE_PURPOSE_OCCLUSION);
              }

              var emissiveTexture = materialJson.emissiveTexture;
              if (emissiveTexture) {
                var _sampler4 = normalTexture.texture.sampler;
                var _texture4 = glBoostContext.createTexture(emissiveTexture.texture.image.image, '', {
                  'TEXTURE_MAG_FILTER': _sampler4 === void 0 ? GLBoost$1.LINEAR : _sampler4.magFilter,
                  'TEXTURE_MIN_FILTER': _sampler4 === void 0 ? GLBoost$1.LINEAR_MIPMAP_LINEAR : _sampler4.minFilter,
                  'TEXTURE_WRAP_S': _sampler4 === void 0 ? GLBoost$1.REPEAT : _sampler4.wrapS,
                  'TEXTURE_WRAP_T': _sampler4 === void 0 ? GLBoost$1.REPEAT : _sampler4.wrapT
                });
                _texture4.userFlavorName = 'Texture_Emissive_index_' + emissiveTexture.index + '_of_' + gltfMaterial.instanceNameWithUserFlavor;
                gltfMaterial.setTexture(_texture4, GLBoost$1.TEXTURE_PURPOSE_EMISSIVE);
              }

              var enables = [];
              if (options.isBlend) {
                enables.push(3042);
              }
              if (options.isDepthTest) {
                enables.push(2929);
              }
              gltfMaterial.states.enable = enables;
              if (options.isBlend && options.isNeededToMultiplyAlphaToColorOfPixelOutput) {
                gltfMaterial.states.functions.blendFuncSeparate = [1, 771, 1, 771];
              }
              gltfMaterial.globalStatesUsage = GLBoost$1.GLOBAL_STATES_USAGE_IGNORE;
            }
          };
          setTextures(materialJson);
        } else {
          if (typeof vertexData.components.texcoord !== 'undefined') {
            var emptyTexcoords = [];
            var componentN = vertexData.components.position;
            var length = _positions[i].length / componentN;
            for (var k = 0; k < length; k++) {
              emptyTexcoords.push(0);
              emptyTexcoords.push(0);
            }
            additional['texcoord'][i] = new Float32Array(emptyTexcoords);
            vertexData.components.texcoord = 2;
            vertexData.componentBytes.texcoord = 4;
            dataViewMethodDic.texcoord = 'getFloat32';
          }
        }

        var pmr = materialJson.pbrMetallicRoughness;
        if (pmr != null) {
          if (pmr.baseColorFactor) {
            gltfMaterial.baseColor = new Vector4$1(pmr.baseColorFactor);
          }
          if (pmr.metallicFactor) {
            gltfMaterial.metallic = pmr.metallicFactor;
          }
          if (pmr.roughnessFactor) {
            gltfMaterial.roughness = pmr.roughnessFactor;
          }
          if (materialJson.emissiveFactor) {
            gltfMaterial.emissive = new Vector3(materialJson.emissiveFactor);
          }
        }

        if (indices !== null) {
          gltfMaterial.setVertexN(geometry, indices.length);
        }

        var defaultShader = this._getDefaultShader(options);
        if (defaultShader) {
          gltfMaterial.shaderClass = defaultShader;
        }
      }
    }, {
      key: '_adjustByteAlign',
      value: function _adjustByteAlign(typedArrayClass, arrayBuffer, alignSize, byteOffset, length) {
        if (byteOffset % alignSize != 0) {
          return new typedArrayClass(arrayBuffer.slice(byteOffset), 0, length);
        } else {
          return new typedArrayClass(arrayBuffer, byteOffset, length);
        }
      }
    }, {
      key: '_checkBytesPerComponent',
      value: function _checkBytesPerComponent(accessor) {

        var bytesPerComponent = 0;
        switch (accessor.componentType) {
          case 5120:
            bytesPerComponent = 1;
            break;
          case 5121:
            bytesPerComponent = 1;
            break;
          case 5122:
            bytesPerComponent = 2;
            break;
          case 5123:
            bytesPerComponent = 2;
            break;
          case 5124:
            bytesPerComponent = 4;
            break;
          case 5125:
            bytesPerComponent = 4;
            break;
          case 5126:
            bytesPerComponent = 4;
            break;
          default:
            break;
        }
        return bytesPerComponent;
      }
    }, {
      key: '_checkComponentNumber',
      value: function _checkComponentNumber(accessor) {

        var componentN = 0;
        switch (accessor.type) {
          case 'SCALAR':
            componentN = 1;
            break;
          case 'VEC2':
            componentN = 2;
            break;
          case 'VEC3':
            componentN = 3;
            break;
          case 'VEC4':
            componentN = 4;
            break;
          case 'MAT4':
            componentN = 16;
            break;
        }

        return componentN;
      }
    }, {
      key: '_checkDataViewMethod',
      value: function _checkDataViewMethod(accessor) {
        var dataViewMethod = '';
        switch (accessor.componentType) {
          case 5120:
            dataViewMethod = 'getInt8';
            break;
          case 5121:
            dataViewMethod = 'getUint8';
            break;
          case 5122:
            dataViewMethod = 'getInt16';
            break;
          case 5123:
            dataViewMethod = 'getUint16';
            break;
          case 5124:
            dataViewMethod = 'getInt32';
            break;
          case 5125:
            dataViewMethod = 'getUint32';
            break;
          case 5126:
            dataViewMethod = 'getFloat32';
            break;
          default:
            break;
        }
        return dataViewMethod;
      }
    }, {
      key: '_accessBinaryWithAccessor',
      value: function _accessBinaryWithAccessor(accessor) {
        var bufferView = accessor.bufferView;
        var byteOffset = bufferView.byteOffset + (accessor.byteOffset !== void 0 ? accessor.byteOffset : 0);
        var buffer = bufferView.buffer;
        var arrayBuffer = buffer.buffer;

        var componentN = this._checkComponentNumber(accessor);
        var componentBytes = this._checkBytesPerComponent(accessor);
        var dataViewMethod = this._checkDataViewMethod(accessor);
        if (accessor.extras === void 0) {
          accessor.extras = {};
        }

        accessor.extras.componentN = componentN;
        accessor.extras.componentBytes = componentBytes;
        accessor.extras.dataViewMethod = dataViewMethod;

        var byteLength = componentBytes * componentN * accessor.count;

        var vertexAttributeArray = [];

        if (accessor.extras && accessor.extras.toGetAsTypedArray) {
          if (ModelConverter._isSystemLittleEndian()) {
            if (dataViewMethod === 'getFloat32') {
              vertexAttributeArray = this._adjustByteAlign(Float32Array, arrayBuffer, 4, byteOffset, byteLength / componentBytes);
            } else if (dataViewMethod === 'getInt8') {
              vertexAttributeArray = new Int8Array(arrayBuffer, byteOffset, byteLength / componentBytes);
            } else if (dataViewMethod === 'getUint8') {
              vertexAttributeArray = new Uint8Array(arrayBuffer, byteOffset, byteLength / componentBytes);
            } else if (dataViewMethod === 'getInt16') {
              vertexAttributeArray = this._adjustByteAlign(Int16Array, arrayBuffer, 2, byteOffset, byteLength / componentBytes);
            } else if (dataViewMethod === 'getUint16') {
              vertexAttributeArray = this._adjustByteAlign(Uint16Array, arrayBuffer, 2, byteOffset, byteLength / componentBytes);
            } else if (dataViewMethod === 'getInt32') {
              vertexAttributeArray = this._adjustByteAlign(Int32Array, arrayBuffer, 4, byteOffset, byteLength / componentBytes);
            } else if (dataViewMethod === 'getUint32') {
              vertexAttributeArray = this._adjustByteAlign(Uint32Array, arrayBuffer, 4, byteOffset, byteLength / componentBytes);
            }
          } else {
            var dataView = new DataView(arrayBuffer, byteOffset, byteLength);
            var byteDelta = componentBytes * componentN;
            var littleEndian = true;
            for (var pos = 0; pos < byteLength; pos += byteDelta) {
              switch (accessor.type) {
                case 'SCALAR':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  break;
                case 'VEC2':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes, littleEndian));
                  break;
                case 'VEC3':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes * 2, littleEndian));
                  break;
                case 'VEC4':
                  vertexAttributeArray.push(dataView[dataViewMethod](pos, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes * 2, littleEndian));
                  vertexAttributeArray.push(dataView[dataViewMethod](pos + componentBytes * 3, littleEndian));
                  break;
              }
            }
            if (dataViewMethod === 'getInt8') {
              vertexAttributeArray = new Int8Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getUint8') {
              vertexAttributeArray = new Uint8Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getInt16') {
              vertexAttributeArray = new Int16Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getUint16') {
              vertexAttributeArray = new Uint16Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getInt32') {
              vertexAttributeArray = new Int32Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getUint32') {
              vertexAttributeArray = new Uint32Array(vertexAttributeArray);
            } else if (dataViewMethod === 'getFloat32') {
              vertexAttributeArray = new Float32Array(vertexAttributeArray);
            }
          }
        } else {
          var _dataView = new DataView(arrayBuffer, byteOffset, byteLength);
          var _byteDelta = componentBytes * componentN;
          var _littleEndian = true;
          for (var _pos = 0; _pos < byteLength; _pos += _byteDelta) {

            switch (accessor.type) {
              case 'SCALAR':
                vertexAttributeArray.push(_dataView[dataViewMethod](_pos, _littleEndian));
                break;
              case 'VEC2':
                vertexAttributeArray.push(new Vector2(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes, _littleEndian)));
                break;
              case 'VEC3':
                vertexAttributeArray.push(new Vector3(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes * 2, _littleEndian)));
                break;
              case 'VEC4':
                if (accessor.extras && accessor.extras.quaternionIfVec4) {
                  vertexAttributeArray.push(new Quaternion(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes * 2, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes * 3, _littleEndian)));
                } else {
                  vertexAttributeArray.push(new Vector4$1(_dataView[dataViewMethod](_pos, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes * 2, _littleEndian), _dataView[dataViewMethod](_pos + componentBytes * 3, _littleEndian)));
                }
                break;
              case 'MAT4':
                var matrixComponents = [];
                for (var i = 0; i < 16; i++) {
                  matrixComponents[i] = _dataView[dataViewMethod](_pos + componentBytes * i, _littleEndian);
                }
                vertexAttributeArray.push(new Matrix44$1(matrixComponents, true));
                break;
            }
          }
        }

        accessor.extras.vertexAttributeArray = vertexAttributeArray;

        return vertexAttributeArray;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this[singleton$7]) {
          this[singleton$7] = new ModelConverter(singletonEnforcer$4);
        }
        return this[singleton$7];
      }
    }, {
      key: '_isSystemLittleEndian',
      value: function _isSystemLittleEndian() {
        return !!new Uint8Array(new Uint16Array([0x00ff]).buffer)[0];
      }
    }]);
    return ModelConverter;
  }();


  GLBoost$1["ModelConverter"] = ModelConverter;

  if (typeof phina !== 'undefined') {

    phina.namespace(function () {
      phina.define('phina.display.GLBoostLayer', {
        superClass: 'phina.display.Layer',

        scene: null,
        expression: null,
        camera: null,
        light: null,
        glBoostContext: null,
        renderer: null,
        canvas: null,

        renderChildBySelf: true,

        init: function init(params) {
          this.superInit(params);
          this.originX = 0;
          this.originY = 0;

          this.canvas = document.createElement("canvas");
          this.canvas.id = 'glboost_world';
          this.canvas.width = params.width;
          this.canvas.height = params.height;
          var bodyElm = document.getElementsByTagName("body").item(0);
          bodyElm.appendChild(this.canvas);
          this.canvas.style.display = "none";

          this.glBoostContext = new GLBoostMiddleContext(this.canvas);

          this.renderer = this.glBoostContext.createRenderer({ clearColor: { red: 1, green: 1, blue: 1, alpha: 1 } });
          this.scene = this.glBoostContext.createScene();
          this.expression = this.glBoostContext.createExpressionAndRenderPasses(1);
          this.expression.renderPasses[0].scene = this.scene;

          this.on('enterframe', function () {
            if (this.scene) {
              this.renderer.clearCanvas();
              this.renderer.draw(this.expression);
            }
          });

          this.domElement = this.canvas;
        }
      });

      phina.define("phina.display.OffScreenLayer", {
        superClass: 'phina.display.Layer',

        renderChildBySelf: true,

        canvas2d: null,

        renderer2d: null,

        width: 0,
        height: 0,

        init: function init(params) {
          this.superInit();

          this.width = params.width;
          this.height = params.height;

          if (params.fillStyle instanceof Vector3) {
            this.fillStyle = 'rgb(' + params.fillStyle.x * 255 + ',' + params.fillStyle.y * 255 + ',' + params.fillStyle.z * 255 + ',1)';
          } else if (params.fillStyle instanceof Vector4$1) {
            this.fillStyle = 'rgba(' + params.fillStyle.x * 255 + ',' + params.fillStyle.y * 255 + ',' + params.fillStyle.z * 255 + ',' + params.fillStyle.w + ')';
          } else {
            this.fillStyle = params.fillStyle;
          }

          this.canvas2d = phina.graphics.Canvas();
          this.canvas2d.setSize(this.width, this.height);

          this.renderer2d = phina.display.CanvasRenderer(this.canvas2d);
        },

        reset: function reset() {
          this.canvas2d.clearColor('white', 0, 0, this.width, this.height);
          this.canvas2d.clearColor(this.fillStyle, 0, 0, this.width, this.height);
        },

        renderObject: function renderObject(obj) {
          var layer = DisplayElement();
          obj.flare('enterframe');
          obj.addChildTo(layer);
          this.renderer2d.renderObject(layer);
        },

        getImageDataURL: function getImageDataURL() {
          return this.canvas2d.domElement.toDataURL('image/png');
        }
      });
    });
  }

  var BlinnPhongShaderSource = function () {
    function BlinnPhongShaderSource() {
      babelHelpers.classCallCheck(this, BlinnPhongShaderSource);
    }

    babelHelpers.createClass(BlinnPhongShaderSource, [{
      key: 'FSDefine_BlinnPhongShaderSource',
      value: function FSDefine_BlinnPhongShaderSource(in_, f, lights) {
        var shaderText = '';
        shaderText += 'uniform vec3 viewPosition;\n';
        shaderText += 'uniform vec4 Kd;\n';
        shaderText += 'uniform vec4 Ks;\n';
        shaderText += 'uniform float power;\n';
        shaderText += 'uniform vec4 ambient;\n';

        var sampler2D = this._sampler2DShadow_func();

        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;
        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform highp ' + sampler2D + ' uDepthTexture[' + lightNumExceptAmbient + '];\n';
          shaderText += in_ + ' vec4 v_shadowCoord[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform int isShadowCasting[' + lightNumExceptAmbient + '];\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSShade_BlinnPhongShaderSource',
      value: function FSShade_BlinnPhongShaderSource(f, gl, lights) {
        var shaderText = '';
        shaderText += '  float depthBias = 0.005;\n';
        shaderText += '  vec4 surfaceColor = rt0;\n';
        shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];
          var isShadowEnabledAsTexture = light.camera && light.camera.texture ? true : false;
          shaderText += '  {\n';
          shaderText += Shader._generateLightStr(i);
          shaderText += Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
          shaderText += '    float diffuse = max(dot(lightDirection, normal), 0.0);\n';
          shaderText += '    rt0 += spotEffect * vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[' + i + '] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
          shaderText += '    vec3 viewDirection = normalize(viewPosition_world - v_position_world);\n';
          shaderText += '    vec3 halfVec = normalize(lightDirection + viewDirection);\n';
          shaderText += '    float specular = pow(max(dot(halfVec, normal), 0.0), power);\n';
          shaderText += '    rt0 += spotEffect * vec4(visibilitySpecular, visibilitySpecular, visibilitySpecular, 1.0) * Ks * lightDiffuse[' + i + '] * vec4(specular, specular, specular, 1.0);\n';
          shaderText += '  }\n';
        }

        shaderText += '  rt0.xyz += ambient.xyz;\n';

        return shaderText;
      }
    }, {
      key: 'prepare_BlinnPhongShaderSource',
      value: function prepare_BlinnPhongShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
        material.setUniform(shaderProgram, 'uniform_Ks', this._glContext.getUniformLocation(shaderProgram, 'Ks'));
        material.setUniform(shaderProgram, 'uniform_power', this._glContext.getUniformLocation(shaderProgram, 'power'));
        material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));

        return vertexAttribsAsResult;
      }
    }]);
    return BlinnPhongShaderSource;
  }();

  var BlinnPhongShader = function (_DecalShader) {
    babelHelpers.inherits(BlinnPhongShader, _DecalShader);

    function BlinnPhongShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, BlinnPhongShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (BlinnPhongShader.__proto__ || Object.getPrototypeOf(BlinnPhongShader)).call(this, glBoostContext, basicShader));

      BlinnPhongShader.mixin(BlinnPhongShaderSource);

      _this._power = 64.0;

      return _this;
    }

    babelHelpers.createClass(BlinnPhongShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(BlinnPhongShader.prototype.__proto__ || Object.getPrototypeOf(BlinnPhongShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var Kd = material.diffuseColor;
        var Ks = material.specularColor;
        var Ka = material.ambientColor;
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Ks'), Ks.x, Ks.y, Ks.z, Ks.w, true);
        this._glContext.uniform1f(material.getUniform(glslProgram, 'uniform_power'), this._power, true);

        var ambient = Vector4$1.multiplyVector(Ka, scene.getAmountOfAmbientLightsIntensity());
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);
      }
    }, {
      key: 'Kd',
      set: function set(value) {
        this._Kd = value;
      },
      get: function get() {
        return this._Kd;
      }
    }, {
      key: 'Ks',
      set: function set(value) {
        this._Ks = value;
      },
      get: function get() {
        return this._Ks;
      }
    }, {
      key: 'power',
      set: function set(value) {
        this._power = value;
      },
      get: function get() {
        return this._power;
      }
    }]);
    return BlinnPhongShader;
  }(DecalShader);


  GLBoost['BlinnPhongShader'] = BlinnPhongShader;

  var HalfLambertShaderSource = function () {
    function HalfLambertShaderSource() {
      babelHelpers.classCallCheck(this, HalfLambertShaderSource);
    }

    babelHelpers.createClass(HalfLambertShaderSource, [{
      key: 'FSDefine_HalfLambertShaderSource',
      value: function FSDefine_HalfLambertShaderSource(in_, f, lights) {
        var sampler2D = this._sampler2DShadow_func();
        var shaderText = '';
        shaderText += 'uniform vec4 Kd;\n';
        shaderText += 'uniform vec4 ambient;\n';

        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;
        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform highp ' + sampler2D + ' uDepthTexture[' + lightNumExceptAmbient + '];\n';
          shaderText += in_ + ' vec4 v_shadowCoord[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform int isShadowCasting[' + lightNumExceptAmbient + '];\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSShade_HalfLambertShaderSource',
      value: function FSShade_HalfLambertShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  vec4 surfaceColor = rt0;\n';
        shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];
          var isShadowEnabledAsTexture = light.camera && light.camera.texture ? true : false;
          shaderText += '  {\n';
          shaderText += Shader._generateLightStr(i);
          shaderText += Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
          shaderText += '    float diffuse = max(dot(lightDirection, normal), 0.0)*0.5+0.5;\n';
          shaderText += '    diffuse *= diffuse;\n';
          shaderText += '    rt0 += spotEffect * vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[' + i + '] * vec4(diffuse, diffuse, diffuse, 1.0) * surfaceColor;\n';
          shaderText += '  }\n';
        }
        shaderText += '  rt0.xyz += ambient.xyz;\n';


        return shaderText;
      }
    }, {
      key: 'prepare_HalfLambertShaderSource',
      value: function prepare_HalfLambertShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
        material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));

        return vertexAttribsAsResult;
      }
    }]);
    return HalfLambertShaderSource;
  }();

  var HalfLambertShader = function (_DecalShader) {
    babelHelpers.inherits(HalfLambertShader, _DecalShader);

    function HalfLambertShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, HalfLambertShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (HalfLambertShader.__proto__ || Object.getPrototypeOf(HalfLambertShader)).call(this, glBoostContext, basicShader));

      HalfLambertShader.mixin(HalfLambertShaderSource);
      return _this;
    }

    babelHelpers.createClass(HalfLambertShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(HalfLambertShader.prototype.__proto__ || Object.getPrototypeOf(HalfLambertShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var Kd = material.diffuseColor;
        var Ka = material.ambientColor;
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);

        var ambient = Vector4$1.multiplyVector(Ka, scene.getAmountOfAmbientLightsIntensity());
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);
      }
    }]);
    return HalfLambertShader;
  }(DecalShader);


  GLBoost['HalfLambertShader'] = HalfLambertShader;

  var HalfLambertAndWrapLightingShaderSource = function () {
    function HalfLambertAndWrapLightingShaderSource() {
      babelHelpers.classCallCheck(this, HalfLambertAndWrapLightingShaderSource);
    }

    babelHelpers.createClass(HalfLambertAndWrapLightingShaderSource, [{
      key: 'FSDefine_HalfLambertAndWrapLightingShaderSource',
      value: function FSDefine_HalfLambertAndWrapLightingShaderSource(in_, f, lights) {
        var sampler2D = this._sampler2DShadow_func();
        var shaderText = '';
        shaderText += 'uniform vec4 Kd;\n';
        shaderText += 'uniform vec3 wrap;\n';
        shaderText += 'uniform vec4 ambient;\n';

        var lightNumExceptAmbient = lights.filter(function (light) {
          return !light.isTypeAmbient();
        }).length;
        if (lightNumExceptAmbient > 0) {
          shaderText += 'uniform highp ' + sampler2D + ' uDepthTexture[' + lightNumExceptAmbient + '];\n';
          shaderText += in_ + ' vec4 v_shadowCoord[' + lightNumExceptAmbient + '];\n';
          shaderText += 'uniform int isShadowCasting[' + lightNumExceptAmbient + '];\n';
        }
        return shaderText;
      }
    }, {
      key: 'FSShade_HalfLambertAndWrapLightingShaderSource',
      value: function FSShade_HalfLambertAndWrapLightingShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  vec4 surfaceColor = rt0;\n';
        shaderText += '  rt0 = vec4(0.0, 0.0, 0.0, 0.0);\n';

        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];
          var isShadowEnabledAsTexture = light.camera && light.camera.texture ? true : false;
          shaderText += '  {\n';
          shaderText += Shader._generateLightStr(i);
          shaderText += Shader._generateShadowingStr(gl, i, isShadowEnabledAsTexture);
          shaderText += '    float diffuse = max(dot(lightDirection, normal), 0.0)*0.5+0.5;\n';
          shaderText += '    diffuse *= diffuse;\n';
          shaderText += '    vec3 diffuseVec = vec3(diffuse, diffuse, diffuse);\n';
          shaderText += '    diffuseVec = (diffuseVec+wrap) / (1.0 + wrap);\n';
          shaderText += '    rt0 += spotEffect * vec4(visibility, visibility, visibility, 1.0) * Kd * lightDiffuse[' + i + '] * vec4(diffuseVec, 1.0) * surfaceColor;\n';
          shaderText += '  }\n';
        }
        shaderText += '  rt0.xyz += ambient.xyz;\n';

        return shaderText;
      }
    }, {
      key: 'prepare_HalfLambertAndWrapLightingShaderSource',
      value: function prepare_HalfLambertAndWrapLightingShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        material.setUniform(shaderProgram, 'uniform_Kd', this._glContext.getUniformLocation(shaderProgram, 'Kd'));
        material.setUniform(shaderProgram, 'uniform_wrap', this._glContext.getUniformLocation(shaderProgram, 'wrap'));
        material.setUniform(shaderProgram, 'uniform_ambient', this._glContext.getUniformLocation(shaderProgram, 'ambient'));

        return vertexAttribsAsResult;
      }
    }]);
    return HalfLambertAndWrapLightingShaderSource;
  }();

  var HalfLambertAndWrapLightingShader = function (_DecalShader) {
    babelHelpers.inherits(HalfLambertAndWrapLightingShader, _DecalShader);

    function HalfLambertAndWrapLightingShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, HalfLambertAndWrapLightingShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (HalfLambertAndWrapLightingShader.__proto__ || Object.getPrototypeOf(HalfLambertAndWrapLightingShader)).call(this, glBoostContext, basicShader));

      HalfLambertAndWrapLightingShader.mixin(HalfLambertAndWrapLightingShaderSource);

      _this._wrap = new Vector3(0.6, 0.3, 0.0);
      return _this;
    }

    babelHelpers.createClass(HalfLambertAndWrapLightingShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(HalfLambertAndWrapLightingShader.prototype.__proto__ || Object.getPrototypeOf(HalfLambertAndWrapLightingShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);

        var Kd = material.diffuseColor;
        var Ka = material.ambientColor;
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_Kd'), Kd.x, Kd.y, Kd.z, Kd.w, true);
        this._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_wrap'), this._wrap.x, this._wrap.y, this._wrap.z, true);

        var ambient = Vector4$1.multiplyVector(Ka, scene.getAmountOfAmbientLightsIntensity());
        this._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_ambient'), ambient.x, ambient.y, ambient.z, ambient.w, true);
      }
    }, {
      key: 'wrap',
      set: function set(value) {
        this._wrap = value;
      },
      get: function get() {
        return this._wrap;
      }
    }]);
    return HalfLambertAndWrapLightingShader;
  }(DecalShader);


  GLBoost['HalfLambertAndWrapLightingShader'] = HalfLambertAndWrapLightingShader;

  var DepthDisplayShaderSource = function () {
    function DepthDisplayShaderSource() {
      babelHelpers.classCallCheck(this, DepthDisplayShaderSource);
    }

    babelHelpers.createClass(DepthDisplayShaderSource, [{
      key: 'VSTransform_DepthDisplayShaderSource',
      value: function VSTransform_DepthDisplayShaderSource(existCamera_f, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost$1.TEXCOORD)) {
          shaderText += '  texcoord.y = 1.0 - texcoord.y;\n';
        }
        return shaderText;
      }
    }, {
      key: 'FSShade_DepthDisplayShaderSource',
      value: function FSShade_DepthDisplayShaderSource(f, gl, lights) {
        var shaderText = '';

        shaderText += '  vec4 surfaceColor = rt0;\n';
        shaderText += '  rt0 = vec4(surfaceColor.r, surfaceColor.r, surfaceColor.r, 1.0);\n';

        return shaderText;
      }
    }]);
    return DepthDisplayShaderSource;
  }();

  var DepthDisplayShader = function (_DecalShader) {
    babelHelpers.inherits(DepthDisplayShader, _DecalShader);

    function DepthDisplayShader(glBoostContext, basicShader) {
      babelHelpers.classCallCheck(this, DepthDisplayShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (DepthDisplayShader.__proto__ || Object.getPrototypeOf(DepthDisplayShader)).call(this, glBoostContext, basicShader));

      DepthDisplayShader.mixin(DepthDisplayShaderSource);
      return _this;
    }

    return DepthDisplayShader;
  }(DecalShader);


  GLBoost$1['DepthDisplayShader'] = DepthDisplayShader;

  var PassThroughShaderSource = function () {
    function PassThroughShaderSource() {
      babelHelpers.classCallCheck(this, PassThroughShaderSource);
    }

    babelHelpers.createClass(PassThroughShaderSource, [{
      key: 'VSDefine_PassThroughShaderSource',
      value: function VSDefine_PassThroughShaderSource(in_, out_, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.COLOR)) {
          shaderText += in_ + ' vec4 aVertex_color;\n';
          shaderText += out_ + ' vec4 color;\n';
        }
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += in_ + ' vec2 aVertex_texcoord;\n';
          shaderText += out_ + ' vec2 texcoord;\n';
        }

        shaderText += in_ + ' vec3 aVertex_barycentricCoord;\n';
        shaderText += out_ + ' vec3 barycentricCoord;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_PassThroughShaderSource',
      value: function VSTransform_PassThroughShaderSource(existCamera_f, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.COLOR)) {
          shaderText += '  color = aVertex_color;\n';
        }
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += '  texcoord = aVertex_texcoord;\n';
        }

        if (existCamera_f) {
          shaderText += '  gl_Position = projectionMatrix * viewMatrix * position_world;\n';
        } else {
          shaderText += '  gl_Position = position_world;\n';
        }

        shaderText += '  barycentricCoord = aVertex_barycentricCoord;\n';

        return shaderText;
      }
    }, {
      key: 'VSTransform_FragmentSimpleShaderSource',
      value: function VSTransform_FragmentSimpleShaderSource(existCamera_f, f) {
        var shaderText = '';

        return shaderText;
      }
    }, {
      key: 'FSDefine_PassThroughShaderSource',
      value: function FSDefine_PassThroughShaderSource(in_, f) {
        var shaderText = '';
        if (Shader._exist(f, GLBoost.COLOR)) {
          shaderText += in_ + ' vec4 color;\n';
        }
        if (Shader._exist(f, GLBoost.TEXCOORD)) {
          shaderText += in_ + ' vec2 texcoord;\n\n';
        }

        return shaderText;
      }
    }, {
      key: 'FSShade_PassThroughShaderSource',
      value: function FSShade_PassThroughShaderSource(f, gl) {

        var shaderText = '    rt0 = vec4(1.0, 0.0, 0.0, 1.0);\n';
        return shaderText;
      }
    }, {
      key: 'prepare_PassThroughShaderSource',
      value: function prepare_PassThroughShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];

        return vertexAttribsAsResult;
      }
    }]);
    return PassThroughShaderSource;
  }();

  var PassThroughShader = function (_Shader) {
    babelHelpers.inherits(PassThroughShader, _Shader);

    function PassThroughShader(glBoostContext) {
      var basicShader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VertexWorldShaderSource;
      babelHelpers.classCallCheck(this, PassThroughShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (PassThroughShader.__proto__ || Object.getPrototypeOf(PassThroughShader)).call(this, glBoostContext));

      PassThroughShader.mixin(basicShader);
      PassThroughShader.mixin(PassThroughShaderSource);
      return _this;
    }

    babelHelpers.createClass(PassThroughShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(PassThroughShader.prototype.__proto__ || Object.getPrototypeOf(PassThroughShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);
      }
    }]);
    return PassThroughShader;
  }(Shader);


  GLBoost['PassThroughShader'] = PassThroughShader;

  var EnvironmentMapShaderSource = function () {
    function EnvironmentMapShaderSource() {
      babelHelpers.classCallCheck(this, EnvironmentMapShaderSource);
    }

    babelHelpers.createClass(EnvironmentMapShaderSource, [{
      key: 'VSDefine_EnvironmentMapShaderSource',
      value: function VSDefine_EnvironmentMapShaderSource(in_, out_, f) {
        var shaderText = out_ + ' vec3 vPosition_world;\n';
        shaderText += 'uniform mat4 worldMatrix;\n';
        shaderText += 'uniform mat4 viewMatrix;\n';
        shaderText += 'uniform mat4 projectionMatrix;\n';
        return shaderText;
      }
    }, {
      key: 'VSTransform_EnvironmentMapShaderSource',
      value: function VSTransform_EnvironmentMapShaderSource(existCamera_f, f) {
        var shaderText = '';

        if (existCamera_f) {
          shaderText += '  gl_Position = projectionMatrix * viewMatrix * worldMatrix * position_local;\n';
        } else {
          shaderText += '  gl_Position = worldMatrix * position_local;\n';
        }
        shaderText += '  vPosition_world = normalize(worldMatrix * position_local).xyz;\n';

        return shaderText;
      }
    }, {
      key: 'FSDefine_EnvironmentMapShaderSource',
      value: function FSDefine_EnvironmentMapShaderSource(in_, f) {
        var shaderText = in_ + ' vec3 vPosition_world;\n';
        shaderText += 'uniform samplerCube uEnvTexture;\n';

        return shaderText;
      }
    }, {
      key: 'FSShade_EnvironmentMapShaderSource',
      value: function FSShade_EnvironmentMapShaderSource(f, gl) {
        var shaderText = "";

        shaderText += 'rt0 = textureCube(uEnvTexture, normalize(vPosition_world));\n';


        return shaderText;
      }
    }, {
      key: 'prepare_EnvironmentMapShaderSource',
      value: function prepare_EnvironmentMapShaderSource(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData) {

        var vertexAttribsAsResult = [];
        vertexAttribs.forEach(function (attribName) {
          if (attribName === 'position' || attribName === 'normal' || attribName === 'tangent') {
            shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
            if (shaderProgram['vertexAttribute_' + attribName] !== -1) {
              gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
              vertexAttribsAsResult.push(attribName);
            }
          }
        });
        material.setUniform(shaderProgram, 'uniform_worldMatrix', this._glContext.getUniformLocation(shaderProgram, 'worldMatrix'));
        material._semanticsDic['WORLD'] = 'worldMatrix';
        if (existCamera_f) {
          material.setUniform(shaderProgram, 'uniform_viewMatrix', this._glContext.getUniformLocation(shaderProgram, 'viewMatrix'));
          material._semanticsDic['VIEW'] = 'viewMatrix';
          material.setUniform(shaderProgram, 'uniform_projectionMatrix', this._glContext.getUniformLocation(shaderProgram, 'projectionMatrix'));
          material._semanticsDic['PROJECTION'] = 'projectionMatrix';
        }

        material.registerTextureUnitToUniform(GLBoost$1.TEXTURE_PURPOSE_ENV_CUBE, shaderProgram, 'uEnvTexture');

        return vertexAttribsAsResult;
      }
    }]);
    return EnvironmentMapShaderSource;
  }();

  var EnvironmentMapShader = function (_Shader) {
    babelHelpers.inherits(EnvironmentMapShader, _Shader);

    function EnvironmentMapShader(glBoostContext) {
      babelHelpers.classCallCheck(this, EnvironmentMapShader);

      var _this = babelHelpers.possibleConstructorReturn(this, (EnvironmentMapShader.__proto__ || Object.getPrototypeOf(EnvironmentMapShader)).call(this, glBoostContext));

      EnvironmentMapShader.mixin(EnvironmentMapShaderSource);

      return _this;
    }

    babelHelpers.createClass(EnvironmentMapShader, [{
      key: 'setUniforms',
      value: function setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(EnvironmentMapShader.prototype.__proto__ || Object.getPrototypeOf(EnvironmentMapShader.prototype), 'setUniforms', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);
        material.updateTextureInfo(GLBoost$1.TEXTURE_PURPOSE_ENV_CUBE, 'uEnvTexture');
      }
    }, {
      key: 'setUniformsAsTearDown',
      value: function setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
        babelHelpers.get(EnvironmentMapShader.prototype.__proto__ || Object.getPrototypeOf(EnvironmentMapShader.prototype), 'setUniformsAsTearDown', this).call(this, gl, glslProgram, scene, material, camera, mesh, lights);
      }
    }]);
    return EnvironmentMapShader;
  }(Shader);


  GLBoost$1['EnvironmentMapShader'] = EnvironmentMapShader;

  var JointGizmoUpdater = function () {
    function JointGizmoUpdater() {
      babelHelpers.classCallCheck(this, JointGizmoUpdater);
    }

    babelHelpers.createClass(JointGizmoUpdater, null, [{
      key: 'update',
      value: function update() {}
    }]);
    return JointGizmoUpdater;
  }();


  if (GLBoost['JointGizmoUpdater'] === void 0) {
    GLBoost['JointGizmoUpdater'] = JointGizmoUpdater;
  }

  var AnimationPlayer = function () {
    function AnimationPlayer() {
      babelHelpers.classCallCheck(this, AnimationPlayer);
    }

    babelHelpers.createClass(AnimationPlayer, [{
      key: 'init',
      value: function init(group) {
        this.__FpsForPlaying = group.animationFps !== void 0 ? group.animationFps : 60;

        this.__animationStartTime = group.getStartAnimationInputValue('time');
        this.__animationEndTime = group.getEndAnimationInputValue('time');
        this.__animationStartRange = this.__animationStartTime;
        this.__animationEndRange = this.__animationEndTime;
        this.__animationCurrentTime = this.__animationStartTime;
        this.__animationLength = group.getEndAnimationInputValue('time');
        this.__animationLastTime = 0;

        this.__currentMillisecondAtStart = 0;
        this.__isPlaying = false;
        this.__currentMotion = "All";
        this.__animationMotions = [];

        this.__setupMultiMotions(group);
      }
    }, {
      key: 'play',
      value: function play() {
        this.__isPlaying = true;
        this.__currentMillisecondAtStart = Date.now();
      }
    }, {
      key: 'calcAnimationTime',
      value: function calcAnimationTime() {
        var speedRatio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (!this.__isPlaying) {
          this.__currentMillisecondAtStart = Date.now();
          return this.__animationCurrentTime;
        }

        var currentMillisecondFromStart = Date.now();
        this.__animationCurrentTime = (currentMillisecondFromStart - this.__currentMillisecondAtStart) / 1000 + this.__animationLastTime;
        var localAnimationCurrentTime = this.__animationCurrentTime * speedRatio;

        if (localAnimationCurrentTime > this.__animationEndRange) {
          this.moveToTheTime(this.__animationStartRange);
        } else if (localAnimationCurrentTime < this.__animationStartRange) {
          this.moveToTheTime(this.__animationStartRange);
        }

        if (this.__animationStartRange > this.__animationLength) {
          this.moveToTheTime(this.__animationStartRange);
        }

        this.__animationCurrentTime = localAnimationCurrentTime / speedRatio;

        return localAnimationCurrentTime;
      }
    }, {
      key: '__setupMultiMotions',
      value: function __setupMultiMotions(group) {
        var json = {
          "name": "All",
          "start": group.getStartAnimationInputValue('time') * this.__FpsForPlaying,
          "end": group.getEndAnimationInputValue('time') * this.__FpsForPlaying
        };

        this.animationMotions.push(json);

        if (!group.animationTracks) {
          return;
        }

        if (group.animationTracks) {
          Array.prototype.push.apply(this.animationMotions, group.animationTracks);
        }

        this.__currentMotion = group.animationTracks[0].name;
      }
    }, {
      key: 'moveToTheTime',
      value: function moveToTheTime(time) {
        this.__currentMillisecondAtStart = Date.now();
        this.__animationCurrentTime = time;
        this.__animationLastTime = this.__animationCurrentTime;
      }
    }, {
      key: 'changeMotion',
      value: function changeMotion(motionName) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.__animationMotions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var motion = _step.value;

            if (motion.name === motionName) {
              this.changeRange(motion.start / this.__FpsForPlaying, motion.end / this.__FpsForPlaying);
              this.moveToTheTime(motion.start / this.__FpsForPlaying);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'changeRange',
      value: function changeRange(start, end) {
        this.__animationStartRange = start;
        this.__animationEndRange = end;
        var time = this.__animationCurrentTime;
        this.moveToTheTime(time);
      }
    }, {
      key: 'animationMotions',
      get: function get() {
        return this.__animationMotions;
      },
      set: function set(motions) {
        this.__animationMotions = motions;
      }
    }]);
    return AnimationPlayer;
  }();


  GLBoost$1['AnimationPlayer'] = AnimationPlayer;

  (function () {
    var _ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(uri, files) {
      var _loop, fileName, _ret, splitted, fileExtension;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!files) {
                _context.next = 10;
                break;
              }

              _loop = function _loop(fileName) {
                var splitted = fileName.split('.');
                var fileExtension = splitted[splitted.length - 1];

                if (fileExtension === 'gltf' || fileExtension === 'glb') {
                  return {
                    v: new Promise(function (resolve, reject) {
                      checkArrayBufferOfGltf(files[fileName], resolve);
                    })
                  };
                }
              };

              _context.t0 = regeneratorRuntime.keys(files);

            case 3:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 10;
                break;
              }

              fileName = _context.t1.value;
              _ret = _loop(fileName);

              if (!((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object")) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', _ret.v);

            case 8:
              _context.next = 3;
              break;

            case 10:
              splitted = uri.split('.');
              fileExtension = splitted[splitted.length - 1];

              if (!(fileExtension === 'efk')) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', new Promise(function (resolve, reject) {
                resolve('Effekseer');
              }));

            case 14:
              return _context.abrupt('return', DataUtil.loadResourceAsync(uri, true, function (resolve, response) {
                var arrayBuffer = response;
                checkArrayBufferOfGltf(arrayBuffer, resolve);
              }));

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function formatDetector(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return formatDetector;
  })();

  function checkArrayBufferOfGltf(arrayBuffer, resolve) {
    var isLittleEndian = true;

    var dataView = new DataView(arrayBuffer, 0, 20);

    var magic = dataView.getUint32(0, isLittleEndian);

    if (magic !== 0x46546C67) {
      var gotText = DataUtil.arrayBufferToString(arrayBuffer);

      var gltfJson = JSON.parse(gotText);

      var _glTFVer = checkGLTFVersion(gltfJson);

      resolve("glTF" + _glTFVer);

      return;
    }

    var glTFVer = dataView.getUint32(4, isLittleEndian);
    resolve("glTF" + glTFVer);
  }

  function checkGLTFVersion(gltfJson) {
    var glTFVer = 1.0;
    if (gltfJson.asset && gltfJson.asset.version) {
      glTFVer = parseFloat(gltfJson.asset.version);
    }
    return glTFVer;
  }

  GLBoost$1["formatDetector"] = formatDetector;

})));

(0,eval)('this').GLBoost.VERSION='version: 0.0.4-269-g2a4b-mod branch: develop';
