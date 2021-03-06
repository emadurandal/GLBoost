import GLBoost from '../../globals';
import Hash from '../misc/Hash';
import GLBoostObject from '../core/GLBoostObject';
import MiscUtil from '../misc/MiscUtil';
import GLExtensionsManager from '../core/GLExtensionsManager';

export default class Shader extends GLBoostObject {
  constructor(glBoostContext) {
    super(glBoostContext);

    this._glslProgram = null;
    this._dirty = true;
  }

  static initMixinMethodArray() {
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

  static mixin(source) {

    // create mixin method Array
    this.initMixinMethodArray();

    // register mixin methods to Array
    if(this.prototype._classNamesOfVSDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSDefine.push(source.name);
    }
    if(this.prototype._classNamesOfVSMethodDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSMethodDefine.push(source.name);
    }
    if(this.prototype._classNamesOfVSPreProcess.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSPreProcess.push(source.name);
    }
    if(this.prototype._classNamesOfVSTransform.indexOf(source.name) === -1){
      this.prototype._classNamesOfVSTransform.push(source.name);
    }
    if(this.prototype._classNamesOfFSDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSDefine.push(source.name);
    }
    if(this.prototype._classNamesOfFSMethodDefine.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSMethodDefine.push(source.name);
    }
    if(this.prototype._classNamesOfFSShade.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSShade.push(source.name);
    }
    if(this.prototype._classNamesOfFSPostEffect.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSPostEffect.push(source.name);
    }
    if(this.prototype._classNamesOfFSFinalize.indexOf(source.name) === -1){
      this.prototype._classNamesOfFSFinalize.push(source.name);
    }
    if(this.prototype._classNamesOfPrepare.indexOf(source.name) === -1){
      this.prototype._classNamesOfPrepare.push(source.name);
    }

    // mixin
    var target = this.prototype; source = source.prototype;
    Object.getOwnPropertyNames(source).forEach(function (name) {
      if (name !== 'constructor') Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
    });
  }

  static swapMixin(current, newone) {
    // register mixin methods to Array
    let matchIdx = this.prototype._classNamesOfVSDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfVSMethodDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSMethodDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfVSPreProcess.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSPreProcess[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfVSTransform.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSTransform[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSMethodDefine.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSMethodDefine[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSShade.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSShade[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSPostEffect.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSPostEffect[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfFSFinalize.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSFinalize[matchIdx] = newone.name;
    }
    matchIdx = this.prototype._classNamesOfPrepare.indexOf(current.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfPrepare[matchIdx] = newone.name;
    }

    // mixin
    var target = this.prototype; newone = newone.prototype;
    Object.getOwnPropertyNames(newone).forEach(function (name) {
      if (name !== 'constructor') Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(newone, name));
    });
  }

  static removeMixin(source) {
    let matchIdx = this.prototype._classNamesOfVSDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSDefine.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfVSMethodDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSMethodDefineVSPreProcess.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfVSPreProcess.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSPreProcess.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfVSTransform.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfVSTransform.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSDefine.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSMethodDefine.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSMethodDefine.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSShade.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSShade.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSPostEffect.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSPostEffect.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfFSFinalize.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfFSFinalize.splice(matchIdx, 1);
    }
    matchIdx = this.prototype._classNamesOfPrepare.indexOf(source.name);
    if(matchIdx !== -1){
      this.prototype._classNamesOfPrepare.splice(matchIdx, 1);
    }
  }

  static isMixin(source) {

    // create mixin method Array
    this.initMixinMethodArray();

    // register mixin methods to Array
    if (this.prototype._classNamesOfVSDefine.indexOf(source.name) === -1) {
      return false;
    } else {
      return true;
    }
  }

  _removeDuplicatedLine(shaderString) {
    var splittedShaderLines = shaderString.split('\n');
    for (let i=0; i<splittedShaderLines.length; i++) {
      splittedShaderLines[i] += '\n';
      for (let j=0; j<i; j++) {
        if (splittedShaderLines[j] === splittedShaderLines[i]) {
          splittedShaderLines[j] = '//                                                            commented out because of duplicated: ' + splittedShaderLines[i];
        }
      }
    }

    let processedShaderString = '';
    for (let i=0; i<splittedShaderLines.length; i++) {
      processedShaderString += splittedShaderLines[i];
    }

    return processedShaderString;
  }

  _addLineNumber(shaderString) {
    let shaderTextLines = shaderString.split(/\r\n|\r|\n/);
    let shaderTextWithLineNumber = '';
    for (let i=0; i<shaderTextLines.length; i++) {
      let lineIndex = i+1;
      let splitter = ' : ';
      if (lineIndex<10) {
        splitter = '  : ';
      } else if (lineIndex>=100) {
        splitter = ': ';
      }
      shaderTextWithLineNumber += lineIndex + splitter + shaderTextLines[i] + '\n';
    }

    return shaderTextWithLineNumber;
  }

  _getVertexShaderString(gl, functions, existCamera_f, lights, material, extraData) {
    var f = functions;
    var shaderText = '';

    var in_ = Shader._in_onVert(gl);
    var out_ = Shader._out_onVert(gl);

    shaderText =   Shader._glslVer(gl);
    shaderText +=   'precision highp float;\n';
    shaderText +=   `${in_} vec3 aVertex_position;\n`;
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += `attribute vec3 aVertex_normal;\n`;
    
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += `attribute vec3 aVertex_tangent;\n`;
      }
    }


    /// define variables
    // start defining variables. first, sub class Shader, ...
    // seconds, define variables as mixin shaders
    let vsDefineShaderText = '';
    this._classNamesOfVSDefine.forEach((className)=> {
      var method = this['VSDefine_' + className];
      if (method) {
        vsDefineShaderText += '//                                                            VSDefine_' + className + ' //\n';
        vsDefineShaderText += method.bind(this, in_, out_, f, lights, material, extraData)();
      }
    });
    shaderText += this._removeDuplicatedLine(vsDefineShaderText);

    /// define methods
    // start defining methods. first, sub class Shader, ...
    // seconds, define methods as mixin Shaders
    this._classNamesOfVSMethodDefine.forEach((className)=> {
      var method = this['VSMethodDefine_' + className];
      if (method) {
        shaderText += '//                                                            VSMethodDefine_' + className + ' //\n';
        shaderText += method.bind(this, existCamera_f, f, lights, material, extraData)();
      }
    });

    // begin of main function
    shaderText +=   'void main(void) {\n';
    shaderText +=   'vec4 position_local = vec4(aVertex_position, 1.0);\n';
    if (Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += 'vec3 normal_local = aVertex_normal;\n';
      if (Shader._exist(f, GLBoost.TANGENT)) {
        shaderText += 'vec3 tangent_local = aVertex_tangent;\n';
      }
    }
    shaderText +=   'bool isSkinning = false;\n';

    /// PreProcess
    // start pre-processing. first, sub class Shader, ...
    // seconds, pre-process as mixin Shaders
    this._classNamesOfVSPreProcess.forEach((className)=> {
      var method = this['VSPreProcess_' + className];
      if (method) {
        shaderText += '//                                                            VSPreProcess_' + className + ' //\n';
        shaderText += method.bind(this, existCamera_f, f, lights, material, extraData)();
      }
    });

    /// Transform
    // start transforming. first, sub class Shader, ...
    // seconds, transform as mixin Shaders
    this._classNamesOfVSTransform.forEach((className)=> {
      var method = this['VSTransform_' + className];
      if (method) {
        shaderText += '//                                                            VSTransform_' + className + ' //\n';
        shaderText += method.bind(this, existCamera_f, f, lights, material, extraData)();
      }
    });

    // end of main function
    shaderText +=   '}';

    return shaderText;
  }


  _getFragmentShaderString(gl, functions, lights, material, extraData) {
    var f = functions;
    var shaderText = '';

    var in_ = Shader._in_onFrag(gl);

    shaderText +=   Shader._glslVer(gl);
    var maxDrawBuffers = this._getMaxDrawBuffers();
    if (maxDrawBuffers > 1) {
      shaderText += Shader._glsl1DrawBufferExt(gl);
    }
    shaderText += Shader._glsl1StdDerivativeExt(gl);
    shaderText += Shader._glsl1ShaderTextureLodExt(gl);
    shaderText +=   'precision highp float;\n';

    for (let i=0; i<maxDrawBuffers; i++) {
      shaderText +=   Shader._set_outColor_onFrag(gl, i);
    }

    /// define variables
    // start defining variables. first, sub class Shader, ...
    // seconds, define variables as mixin shaders
    let fsDefineShaderText = '';
    this._classNamesOfFSDefine.forEach((className)=> {
      var method = this['FSDefine_' + className];
      if (method) {
        fsDefineShaderText += '//                                                            FSDefine_' + className + ' //\n';
        fsDefineShaderText += method.bind(this, in_, f, lights, material, extraData)();
      }
    });
    shaderText += this._removeDuplicatedLine(fsDefineShaderText);


    /// define methods
    // start defining methods. first, sub class Shader, ...
    // seconds, define methods as mixin Shaders
    this._classNamesOfFSMethodDefine.forEach((className)=> {
      var method = this['FSMethodDefine_' + className];
      if (method) {
        shaderText += '//                                                            FSMethodDefine_' + className + ' //\n';
        shaderText += method.bind(this, f, lights, material, extraData)();
      }
    });


    // begin of main function
    shaderText +=   'void main(void) {\n';


    /// Shading
    // start shading. first, sub class Shaders, ...
    // second, shade as mixin Shaders
    this._classNamesOfFSShade.forEach((className)=> {
      var method = this['FSShade_' + className];
      if (method) {
        shaderText += '//                                                            FSShade_' + className + ' //\n';
        shaderText += method.bind(this, f, gl, lights, material, extraData)();
      }
    });

    /// PostEffect
    // start posteffect. first, sub class Shaders, ...
    // second, shade as mixin Shaders
    this._classNamesOfFSPostEffect.forEach((className)=> {
      let method = this['FSPostEffect_' + className];
      if (method) {
        shaderText += '//                                                            FSPostEffect_' + className + ' //\n';
        shaderText += method.bind(this, f, gl, lights, material, extraData)();
      }
    });

    /// Finalize
    // start finalize. first, sub class Shaders, ...
    // second, shade as mixin Shaders
    this._classNamesOfFSFinalize.forEach((className)=> {
      let method = this['FSFinalize_' + className];
      if (method) {
        shaderText += '//                                                            FSFinalize_' + className + ' //\n';
        shaderText += method.bind(this, f, gl, lights, material, extraData)();
      }
    });

    // end of main function
    if (maxDrawBuffers > 1) {
      for (let i=0; i<maxDrawBuffers; i++) {
        shaderText += Shader._set_glFragData_inGLVer1(gl, i);
      }
    } else {
      shaderText += Shader._set_glFragColor_inGLVer1(gl);
    }
    shaderText +=   '}';

    return shaderText;
  }

  _prepareAssetsForShaders(gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData, canvas) {
    var temp = [];

    this._glContext.useProgram(shaderProgram);
    this._classNamesOfPrepare.forEach((className)=> {
      var method = this['prepare_' + className];
      if (method) {
        var verAttirbs = method.bind(this, gl, shaderProgram, expression, vertexAttribs, existCamera_f, lights, material, extraData, canvas)();
        temp = temp.concat(verAttirbs);
      }
    });
    let set = new Set(temp);

    let vertexAttribsAsResult = [];
    for (let elem of set) {
      vertexAttribsAsResult.push(elem);
    }

    return vertexAttribsAsResult;
  }

  get dirty() {
    return this._dirty;
  }

  set dirty(flg) {
    this._dirty = flg;
  }

  setUniforms(gl, glslProgram, scene, material, camera, mesh, lights) {
    //super.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);
  }

  setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights) {
    //super.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);
  }

  _getShader(gl, theSource, type) {
    var shader;

    if (type == 'x-shader/x-fragment') {
      shader = this._glContext.createShader(this, gl.FRAGMENT_SHADER);
    } else if (type == 'x-shader/x-vertex') {
      shader = this._glContext.createShader(this, gl.VERTEX_SHADER);
    } else {
      // Unknown shader type
      shader = null;
    }

    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      console.error(gl.getShaderInfoLog(shader));

      shader = null;
    }
  

    return shader;
  }

  _initShaders(gl, vertexShaderStr, fragmentShaderStr) {
    let vertexShaderStrWithLineNumber = this._addLineNumber(vertexShaderStr);
    let fragmentShaderStrWithLineNumber = this._addLineNumber(fragmentShaderStr);
    MiscUtil.consoleLog(GLBoost.LOG_SHADER_CODE, 'Vertex Shader:');
    MiscUtil.consoleLog(GLBoost.LOG_SHADER_CODE, vertexShaderStrWithLineNumber);
    MiscUtil.consoleLog(GLBoost.LOG_SHADER_CODE, 'Fragment Shader:');
    MiscUtil.consoleLog(GLBoost.LOG_SHADER_CODE, fragmentShaderStrWithLineNumber);

    var vertexShader = this._getShader(gl, vertexShaderStr, 'x-shader/x-vertex');
    var fragmentShader = this._getShader(gl, fragmentShaderStr, 'x-shader/x-fragment');

    if (vertexShader === null || fragmentShader === null) {
      return null;
    }

    // Create the shader program
    var shaderProgram = this._glContext.createProgram(this);
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    this._glContext.deleteShader(this, vertexShader);
    this._glContext.deleteShader(this, fragmentShader);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      console.error(gl.getProgramInfoLog(shaderProgram));
    }

    this._glContext.useProgram(shaderProgram);


    shaderProgram.vertexShaderSource = vertexShaderStrWithLineNumber;
    shaderProgram.fragmentShaderSource = fragmentShaderStrWithLineNumber;

    return shaderProgram;
  }

  getShaderProgram(expression, vertexAttribs, existCamera_f, lights_, material, extraData = {}) {
    var gl = this._glContext.gl;
    var canvasId = this._glContext.belongingCanvasId;

    let programToReturn = null;
    let lights = null;
    
    do {
      lights = this.getDefaultPointLightIfNotExist(lights_);
      lights = lights.filter((light)=>{return !light.isTypeAmbient();});

      var vertexShaderText = this._getVertexShaderString(gl, vertexAttribs, existCamera_f, lights, material, extraData);
      var fragmentShaderText = this._getFragmentShaderString(gl, vertexAttribs, lights, material,  extraData);

      // lookup shaderHashTable
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
          for (let i=0; i<hashTable[hash].collisionN; i++) {
            if (hashTable[hash + '_' + i].code === baseText) {
              programToReturn = hashTable[hash + '_' + i].program;
              break;
            }
          }
          hashTable[hash].collisionN++;
        }
      }

      if (programToReturn === null || !gl.isProgram(programToReturn)) {
      // if the current shader codes is not in shaderHashTable, create GLSL Shader Program.

        // register it to shaderHashTable.
        let indexStr = null;
        if (typeof hashTable[hash] !== 'undefined' && hashTable[hash].collisionN > 0) {
          indexStr = hash + '_' + hashTable[hash].collisionN;
        } else {
          indexStr = hash;
        }

        MiscUtil.consoleLog(GLBoost.LOG_SHADER_CODE, 'ShaderInstance: ' + material.shaderInstance + '   ShaderHashId: ' + indexStr);
        programToReturn = this._initShaders(gl, vertexShaderText, fragmentShaderText);
        if (programToReturn !== null) {
          programToReturn.createdAt = performance.now();
          programToReturn.hashId = indexStr;
          programToReturn.glslProgramsSelfUsageCount = -1;

          hashTable[indexStr] = {code:baseText, program:programToReturn, collisionN:0};
          Shader._shaderHashTable[canvasId] = hashTable;
        } else if (this.className === "SkeletalShader") {
          GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL++;
          console.log('GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL was changed to : '+GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL);
        }

      }
    } while (programToReturn === null && this.className === "SkeletalShader" && GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL < 3);

    this._glslProgram = programToReturn;

    material._semanticsDic = {_glslProgram:programToReturn};
    material.uniformTextureSamplerDic = {};
    programToReturn._material = material;
    programToReturn.optimizedVertexAttribs = this._prepareAssetsForShaders(gl, programToReturn, expression, vertexAttribs, existCamera_f, lights, material, extraData);

    return programToReturn;
  }

  getDefaultPointLightIfNotExist(lights) {

    if (lights.length === 0) {
      if (Shader._defaultLight === null) {
        Shader._defaultLight = this._glBoostSystem._glBoostContext.createPointLight(GLBoost.VALUE_DEFAULT_POINTLIGHT_INTENSITY);
      }
      return [Shader._defaultLight];
    } else {
      return lights;
    }
  }

  static _exist(functions, glboostConstantForAttributeType) {
    let attribute = GLBoost.getValueOfGLBoostConstant(glboostConstantForAttributeType);
    return functions.indexOf(attribute) >= 0;
  }

  _getMaxDrawBuffers() {
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

  static isThisGLVersion_2(gl) {
    if (typeof WebGL2RenderingContext === 'undefined') {
      return false;
    }
    return gl instanceof WebGL2RenderingContext;
  }

  static _glslVer(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? '#version 300 es\n' : '';
  }

  static _glsl1DrawBufferExt(gl) {
    return !GLBoost.isThisGLVersion_2(gl) ? '#extension GL_EXT_draw_buffers : require\n' : '';
  }
  static _glsl1StdDerivativeExt(gl) {
    return !GLBoost.isThisGLVersion_2(gl) ? '#extension GL_OES_standard_derivatives : require\n' : '';
  }
  static _glsl1ShaderTextureLodExt(gl) {
    return (!GLBoost.isThisGLVersion_2(gl) && gl.getExtension("EXT_shader_texture_lod"))? '#extension GL_EXT_shader_texture_lod : require\n' : '';
  }

  static _in_onVert(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'in' : 'attribute';
  }
  static _out_onVert(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'out' : 'varying';
  }
  static _in_onFrag(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'in' : 'varying';
  }

  static _texture_func(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'texture' : 'texture2D';
  }

  static _textureProj_func(gl) {
    return GLBoost.isThisGLVersion_2(gl) ? 'shadowProj' : 'texture2DProj';
  }

  static _generateLightStr(i) {
    let shaderText = '';
    
    shaderText += `    vec3 lightDirection = lightDirection_world[${i}];\n`;    
    shaderText += `    if (0.4 < lightSpotInfo[${i}].x) {\n`; // is pointlight or spotlight
    shaderText += `      lightDirection = normalize(lightPosition_world[${i}] - v_position_world.xyz);\n`;
    shaderText += `    }\n`;
    shaderText += `    float spotEffect = 1.0;\n`;
    shaderText += `    if (lightSpotInfo[${i}].x > 0.8) {\n`; // is spotlight
    shaderText += `      spotEffect = dot(lightDirection_world[${i}], lightDirection);\n`;
    shaderText += `      if (spotEffect > lightSpotInfo[${i}].y) {\n`; // lightSpotInfo[${i}].y == spotCosCutoff
    shaderText += `        spotEffect = pow(spotEffect, lightSpotInfo[${i}].z);\n`; // lightSpotInfo[${i}].z == spotExponent
    shaderText += `      } else {\n`;
    shaderText += `        spotEffect = 0.0;\n`;
    shaderText += `      }\n`;
    shaderText += `    }\n`;

    return shaderText;
  }

  static _generateShadowingStr(gl, i, isShadowEnabledAsTexture) {
    let shadowingText = '';
    shadowingText += `float visibilityForShadow = 0.75;\n`;
    shadowingText += `float visibility = 1.0;\n`;
    shadowingText += `float visibilitySpecular = 1.0;\n`;
    shadowingText += `if (isShadowCasting[${i}] == 1) {// ${i}\n`;
    shadowingText += `vec4 shadowCoord_i = shadowCoord[${i}];\n`;
    shadowingText += `shadowCoord_i.z -= depthBias;\n`;

    if (GLBoost.isThisGLVersion_2(gl)) {
      if (isShadowEnabledAsTexture) {
        shadowingText += `visibilitySpecular = textureProj(uDepthTexture[${i}], shadowCoord_i);\n`;
        shadowingText += `visibility = visibilitySpecular + visibilityForShadow;\n`;
      }
    } else {
      if (isShadowEnabledAsTexture) {
//        shadowingText += `  shadowCoord_i.y = 1.0 - shadowCoord_i.y;\n`;
        shadowingText += `float depth = texture2DProj(uDepthTexture[${i}], shadowCoord_i).r;\n`;
        shadowingText += `if (depth < shadowCoord_i.z) {\n`;
//        shadowingText += `if (depth < 0.9) {\n`;
        shadowingText += `  visibility = visibilityForShadow;\n`;
        shadowingText += `  visibilitySpecular = 0.0;\n`;
//        shadowingText += `  visibilityLevel = 0.0;\n`;
        shadowingText += `}\n`;
      }
    }
    shadowingText += `}\n`;

    return shadowingText;
  };

  static _getNormalStr(gl, material, f) {
    let shaderText = '';
    let normalTexture = material.getTextureFromPurpose(GLBoost.TEXTURE_PURPOSE_NORMAL);
    if (!normalTexture && Shader._exist(f, GLBoost.NORMAL)) {
      shaderText += '  vec3 normal = normalize(v_normal_world);\n';
      shaderText += '  vec3 normal_world = normal;\n';
    } else if (material.isFlatShading || !Shader._exist(f, GLBoost.NORMAL)) {
      if (!GLBoost.VALUE_SKELETAL_SHADER_OPITIMIZATION_LEVEL) {
        shaderText += '  vec3 dx = dFdx(v_position_world);\n';
        shaderText += '  vec3 dy = dFdy(v_position_world);\n';

  //      shaderText += '  normal = dot(viewDirection_world, cross(dx, dy)) >= 0.0 ? normalize(cross(dx, dy)) : normalize(cross(dy, dx));\n';
        shaderText += '  vec3 normal = normalize(cross(dx, dy));\n';
        shaderText += '  vec3 normal_world = normal;\n';
      }
      //      shaderText += '  normal *= -1.0;\n';
    } else if (normalTexture && Shader._exist(f, GLBoost.TANGENT)) {
      let textureFunc = Shader._texture_func(gl);
      shaderText += `  vec3 normal = ${textureFunc}(uNormalTexture, texcoord).xyz*2.0 - 1.0;\n`;
      shaderText += `  vec3 tangent_world = normalize(v_tangent_world);\n`;
      shaderText += `  vec3 binormal_world = normalize(v_binormal_world);\n`;
      shaderText += `  vec3 normal_world = normalize(v_normal_world);\n`;      

      shaderText += `  mat3 tbnMat_tangent_to_world = mat3(
        tangent_world.x, tangent_world.y, tangent_world.z,
        binormal_world.x, binormal_world.y, binormal_world.z,
        normal_world.x, normal_world.y, normal_world.z
      );\n`;
      
      shaderText += `  normal = normalize(tbnMat_tangent_to_world * normal);\n`;
      shaderText += `  normal_world = normal;\n`;

    }

    return shaderText;
  }

  _multiplyAlphaToColorOfTexel(gl) {
    var gl = this._glContext.gl;
    let shaderText = "";
    let textureFunc = Shader._texture_func(gl);
    shaderText += `vec4 multiplyAlphaToColorOfTexel(sampler2D texture, vec2 texcoord, int toMultiplyAlphaFlag) {\n`;
    shaderText += `  vec4 texel = ${textureFunc}(texture, texcoord);\n`;
    shaderText += `  if (toMultiplyAlphaFlag == 1) {\n`;      
    shaderText += `    texel.rgb *= texel.a;\n`;
    shaderText += `  }\n`;
    shaderText += `  return texel;\n`;
    shaderText += `}\n`;

    return shaderText;
  }

  _sampler2DShadow_func() {
    var gl = this._glContext.gl;
    return GLBoost.isThisGLVersion_2(gl) ? 'sampler2DShadow' : 'sampler2D';
  }

  static _set_outColor_onFrag(gl, i) {
    return GLBoost.isThisGLVersion_2(gl) ? `layout(location = ${i}) out vec4 rt${i};\n` : `vec4 rt${i};\n`;
  }

  static _set_glFragColor_inGLVer1(gl) {
    return !GLBoost.isThisGLVersion_2(gl) ? '  gl_FragColor = rt0;\n' : '';
  }
  static _set_glFragData_inGLVer1(gl, i) {
    return !GLBoost.isThisGLVersion_2(gl) ? `  gl_FragData[${i}] = rt${i};\n` : '';
  }

  static trySettingMatrix44ToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, matrixArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniformMatrix4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), false, matrixArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniformMatrix4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), false, matrixArray);
    });
  }

  static trySettingMatrix33ToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, matrixArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniformMatrix3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), false, matrixArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniformMatrix3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), false, matrixArray);
    });
  }

  static trySettingVec4ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniform4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), vecArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniform4fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), vecArray);
    });
  }  

  static trySettingVec3ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniform3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), vecArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniform3fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), vecArray);
    });
  }  

  static trySettingVec2ArrayToUniform(gl, hashIdOfGLSLProgram, material, semanticsDir, semantics, vecArray) {
    if (typeof semanticsDir[semantics] === 'undefined') {
      return;
    }
    if (typeof semanticsDir[semantics] === 'string') {
      gl.uniform2fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+semanticsDir[semantics]), vecArray);
      return;
    }

    // it must be an Array...
    semanticsDir[semantics].forEach((uniformName)=>{
      gl.uniform2fv(material.getUniform(hashIdOfGLSLProgram, 'uniform_'+uniformName), vecArray);
    });
  } 

  get glslProgram() {
    return this._glslProgram;
  }

  readyForDiscard() {
    if (this._glslProgram) {
      this._glContext.deleteProgram(this, this._glslProgram);
    }
    super.readyForDiscard();
  }

  getShaderParameter(material, parameterName, defaultValue) {
    if (typeof this[parameterName] !== 'undefined') {
      return this[parameterName];
    } else if (typeof material.shaderParameters[parameterName] !== 'undefined') {
      return material.shaderParameters[parameterName];
    }
    return defaultValue;
  }
}

Shader._instances = new Object();
Shader._shaderHashTable = {};
Shader._defaultLight = null;
