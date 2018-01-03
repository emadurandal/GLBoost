import M_Mesh from '../elements/meshes/M_Mesh';
import M_Element from '../elements/M_Element';
import M_Group from '../elements/M_Group';
import GLBoostObject from '../../low_level/core/GLBoostObject';
import Vector4 from '../../low_level/math/Vector4';

export default class RenderPass extends GLBoostObject {

  constructor(glBoostContext) {
    super(glBoostContext);

    this._scene = null;
    this._meshes = [];
    this._gizmos = [];
    this._opacityMeshes = [];
    this._transparentMeshes = [];
    this._drawBuffers = [this._glContext.gl.NONE];
    this._clearColor = null;
    this._clearDepth = null;  // default is 1.0
    this._renderTargetColorTextures = [];
    this._renderTargetDepthTexture = [];
    this._expression = null;
    this._viewport = null;
    this._isRenderTargetAttachedTextures = false;
    this._isEnableToDraw = true;

    this._customFunctionWhenPrepareToRender = null;
    this._customFunctionWhenPreRender = null;
    this._customFunctionWhenPostRender = null;

    this._webglStatesAssignDictionaries = [];
    this._backupWebGLStatesOfMaterials = [];
    this._shaderParametersAssignDictionaries = [];
    this._backupShaderParametersOfMaterials = [];
    this._shaderAssignDictionaries = [];
    this._backupShadersOfInstances = [];

    this._newShaderInstance = null;
    this._oldShaderClass = null;
    this._backupShaderClassDic = {};

    this._doPreRender = true;
    this._doPostRender = true;
    this._tag = '';

  }

  set tag(name) {
    this._tag = name;
  }

  get tag() {
    return this._tag;
  }

  get doPreRender() {
    return this._doPreRender;
  }

  set doPreRender(flg) {
    this._doPreRender = flg;
  }

  get doPostRender() {
    return this._doPostRender;
  }

  set doPostRender(flg) {
    this._doPostRender = flg;
  }

  get expression() {
    return this._expression;
  }

  set scene(scene) {
    this._scene = scene;
  }

  get scene() {
    return this._scene;
  }

  get meshes() {
    return this._meshes;
  }

  get opacityMeshes() {
    return this._opacityMeshes;
  }

  get transparentMeshes() {
    return this._transparentMeshes;
  }

  get gizmos() {
    return this._gizmos;
  }

  specifyRenderTargetTextures(renderTargetTextures) {
    var gl = this._glContext.gl;
    
    var colorRenderTargetTextures = renderTargetTextures.filter((renderTargetTexture)=>{
      if (renderTargetTexture.colorAttachment) {
        return true;
      } else {
        return false;
      }
    });


    if (colorRenderTargetTextures.length > 0) {
      this._drawBuffers = [];
      colorRenderTargetTextures.forEach((texture)=>{
        var attachment = texture.colorAttachment;
        this._drawBuffers.push(attachment);
      });
      this._renderTargetColorTextures = colorRenderTargetTextures;
    } else {
      this._drawBuffers = [gl.NONE];
    }

    var depthRenderTargetTextures = renderTargetTextures.filter((renderTargetTexture)=>{
      if (renderTargetTexture.depthAttachment) {
        return true;
      } else {
        return false;
      }
    });

    this._renderTargetDepthTexture = depthRenderTargetTextures[0];

    this._isRenderTargetAttachedTextures = true;

  }

  get buffersToDraw() {
    return this.isRenderTargetAttachedTextures ? this._drawBuffers : [this._glContext.gl.BACK];
  }

  set isRenderTargetAttachedTextures(flg) {
    this._isRenderTargetAttachedTextures = flg;
  }

  get isRenderTargetAttachedTextures() {
    return this._isRenderTargetAttachedTextures;
  }

  get fbo() {
    if (this._renderTargetColorTextures.length > 0) {
      return this._renderTargetColorTextures[0].fbo;
    } else if (this._renderTargetDepthTexture) {
      return this._renderTargetDepthTexture.fbo;
    } else {
      return null;
    }
  }

  get viewport() {
    return this._viewport;
  }

  set viewport(vec4) {
    this._viewport = vec4;
  }

  setViewportAsFittingToRenderTarget() {
    let width;
    let height;
    if (this._renderTargetColorTextures.length > 0) {
      width = this._renderTargetColorTextures[0].width;
      height = this._renderTargetColorTextures[0].height;
    }
    if (this._renderTargetDepthTexture) {
      width = this._renderTargetDepthTexture.width;
      height = this._renderTargetDepthTexture.height;
    }
    if (typeof width !== 'undefined' && typeof height !== 'undefined') {
      this._viewport = new Vector4(0, 0, width, height);
      return true;
    } else {
      return false;
    }
  }

  get renderTargetColorTextures() {
    return this._renderTargetColorTextures;
  }

  get renderTargetDepthTexture() {
    return this._renderTargetDepthTexture;
  }

  setClearColor(color) {
    this._clearColor = color;
  }

  get clearColor() {
    return this._clearColor;
  }

  setClearDepth(depth) {
    this._clearDepth = depth;
  }

  get clearDepth() {
    return this._clearDepth;
  }

  setWebGLStatesAssignDictionaries(dictionaries) {
    this._webglStatesAssignDictionaries = dictionaries;

  }

  setShaderParametersAssignDictionaries(dictionaries) {
    this._shaderParametersAssignDictionaries = dictionaries;
  }

  setShaderAssignDictionaries(dictionaries) {
    this._newShaderInstance = null;
    this._backupShaderClassDic = {};
    this._shaderAssignDictionaries = dictionaries;
    
  }

  _assignWebGLStates() {
    if (this._webglStatesAssignDictionaries.length === 0) {
      return;
    }

    for (let dic of this._webglStatesAssignDictionaries) {
      for (let material of dic.materials) {
        this._backupWebGLStatesOfMaterials.push({
          material: material,
          states: material.states
        });
        material.states = dic.states;
      }
    }
  }

  _restoreWebGLStates() {
    if (this._backupWebGLStatesOfMaterials.length === 0) {
      return;
    }
    for (let dic of this._backupWebGLStatesOfMaterials) {
      dic.material.states = dic.states;
    }
  }

  _assignShaderParameters() {
    if (this._shaderParametersAssignDictionaries.length === 0) {
      return;
    }


    for (let dic of this._shaderParametersAssignDictionaries) {
      for (let mesh of this._meshes) {
        let materials = mesh.getAppropriateMaterials();
        for (let material of materials) {
          this._backupShaderParametersOfMaterials.push({
            mesh: mesh,
            shaderParameters: material.shaderParameters
          });
          material.shaderParameters = dic.shaderParameters;
        }
      }
    }
  }

  _restoreShaderParameters() {
    if (this._backupShaderParametersOfMaterials.length === 0) {
      return;
    }
    /*
    for (let dic of this._backupShaderParametersOfMaterials) {
      let materials = dic.mesh.getAppropriateMaterials();
      for (let i=0; i<materials.length; i++) {
        materials[i].shaderParameters = dic.shaderParameters;
      }
    }
    */
    for (let i=0; i<this._backupShaderParametersOfMaterials.length; i++) {
      for (let mesh of this._meshes) {
        let materials = mesh.getAppropriateMaterials();
        for (let j=0; j<materials.length; j++) {
          materials[j].shaderParameters = this._backupShaderParametersOfMaterials[i].shaderParameters;
        }
      }
    }

  }

  _assignShaders(existCamera_f, lights, assumeThatAllMaterialsAreSame = true) {
    if (this._shaderAssignDictionaries.length === 0) {
      return;
    }
    //this.clearAssignShaders();

    if (assumeThatAllMaterialsAreSame) {
      for (let dic of this._shaderAssignDictionaries) {
        for (let obj of dic.instances) {
          obj.getAppropriateMaterials().forEach((material, index) => {
            this._backupShadersOfInstances.push({
              instance: obj,
              backupShaderClass: material.shaderClass,
              backupShaderInstance: material.shaderInstance
            });

            if (this._newShaderInstance &&  material.shaderClass.name !== this._oldShaderClass.name) {
              this._newShaderInstance.readyForDiscard();
              this._newShaderInstance = void 0;
//              material.shaderInstance.readyForDiscard();
//              material.shaderInstance = void 0;
            }

            if (!this._newShaderInstance) {
//              let materials = obj.geometry.prepareToRender(this.expression, existCamera_f, lights, null, obj, dic.shaderClass);
//              this._newShaderInstance = materials.filter((mat)=>{return mat.instanceName === material.instanceName})[0].shaderInstance;
              let glslProgram = obj.geometry.prepareGLSLProgramAndSetVertexNtoMaterial(this.expression, material, 0, existCamera_f, lights, false, dic.shaderClass);
              this._oldShaderClass = material.shaderClass;
              this._newShaderInstance = material.shaderInstance;
            }

//            material.shaderInstance = this._newShaderInstance;
          });
        }
      }
    }

  }

  _restoreShaders(existCamera_f, lights) {
    if (this._backupShadersOfInstances.length === 0) {
      return;
    }

    for (let dic of this._backupShadersOfInstances) {
      dic.instance.getAppropriateMaterials().forEach((material,index)=>{
//        material.shaderClass = (dic.backupShaderClass);
//        material.shaderInstance = dic.backupShaderInstance;

//        if (typeof this._backupShaderClassDic[dic.backupShaderClass.name] === 'undefined') {
        let shaderInstance = dic.backupShaderInstance;


        if(!shaderInstance) {
//          let materials = obj.geometry.prepareToRender(this.expression, existCamera_f, lights, null, obj, dic.shaderClass);
//          shaderInstance = materials.filter((mat)=>{return mat.instanceName === material.instanceName})[0].shaderInstance;
          material.shaderInstance = obj.geometry.prepareGLSLProgramAndSetVertexNtoMaterial(this.expression, material, 0, existCamera_f, lights, false, dic.shaderClass);
          
        }

//        material.shaderInstance = shaderInstance;// this._backupShaderClassDic[dic.backupShaderClass.name];


      });

    }

  }

  clearAssignShaders() {
    for (let dic of this._shaderAssignDictionaries) {
      if (dic._newShaderInstance) {
        dic._newShaderInstance.readyForDiscard();
      }
      dic._newShaderInstance = void 0;
    }
  }

  /**
   * this function is called final part of prepareToRender
   */
  set customFunctionWhenPrepareToRender(func) {
    this._customFunctionWhenPrepareToRender = func;
  }

  get customFunctionWhenPrepareToRender() {
    return this._customFunctionWhenPrepareToRender;
  }

  set customFunctionWhenPreRender(func) {
    this._customFunctionWhenPreRender = func;
  }

  get customFunctionWhenPreRender() {
    return this._customFunctionWhenPreRender;
  }

  set customFunctionWhenPostRender(func) {
    this._customFunctionWhenPostRender = func;
  }

  get customFunctionWhenPostRender() {
    return this._customFunctionWhenPostRender;
  }

  prepareToRender(expression) {
    let collectElements = function(elem, elementsType) {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();
        var meshes = [];
        children.forEach(function(child) {
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
    this._gizmos = [];
    if (this._scene) {
      let elements = [];
      this._scene.getChildren().forEach((elm)=> {
        // collect meshes
        this._meshes = this._meshes.concat(collectElements(elm, M_Mesh));

        // collect meshes
        elements = elements.concat(collectElements(elm, M_Element));

        // collect gizmos from elements
        for (let element of elements) {
          Array.prototype.push.apply(this._gizmos, element._gizmos);
        }
      });
    }

    this._opacityMeshes = [];
    this._transparentMeshes = [];
    this._meshes.forEach((mesh)=>{
      if (mesh.isTransparent) {
        this._transparentMeshes.push(mesh);
      } else {
        this._opacityMeshes.push(mesh);
      }
    });

    this._skeletalMeshes = [];    
    this._meshes.forEach((mesh)=>{
      if (mesh.instanceName.indexOf('SkeletalMesh') !== -1) {
        this._skeletalMeshes.push(mesh);
      }
    });
      

    if (this._scene) {
      this._scene.prepareToRender(expression);
    }


    // Setting RenderPass Specific Shader
    var camera = this.scene.getMainCamera(this);    
    let lights = this.scene.lightsExceptAmbient;
    for (let dic of this._shaderAssignDictionaries) {
      for (let obj of dic.instances) {
        let renderSpecificMaterials = [];
        obj.getAppropriateMaterials().forEach((material, index) => {
          let newMaterial = this._glBoostContext.createClassicMaterial();
          //newMaterial._originalMaterial = material;
          renderSpecificMaterials.push(newMaterial);
        });
        let materials = obj.geometry.prepareToRender(this.expression, camera ? true : false, lights, null, obj, dic.shaderClass, renderSpecificMaterials);
        obj.getAppropriateMaterials().forEach((material, index) => {
          material['renderpassSpecificMaterial_' + this.instanceName + '_material_' + index] = materials[index];
        });
      }
    }

    if (this._customFunctionWhenPrepareToRender) {
      this._customFunctionWhenPrepareToRender();
    }
  }

  sortTransparentMeshes(camera) {

    this._transparentMeshes.forEach((mesh)=> {
      mesh.calcTransformedDepth(camera);
    });

    this._transparentMeshes.sort(function(a,b){
      if( a.transformedDepth < b.transformedDepth ) return -1;
      if( a.transformedDepth > b.transformedDepth ) return 1;
      return 0;
    });

  }

  set isEnableToDraw(flg) {
    this._isEnableToDraw = flg;
  }

  get isEnableToDraw() {
    return this._isEnableToDraw;
  }

  preRender(existCamera_f, lights) {
    if (!this.doPreRender) {
      return;
    }

    if (this._customFunctionWhenPreRender) {
      this._customFunctionWhenPreRender();
    }

    this._assignWebGLStates();
   // this._assignShaderParameters();
//    this._assignShaders(existCamera_f, lights);
    // And call functions registered by user.
  }

  postRender(existCamera_f, lights) {
    if (!this.doPostRender) {
      return;
    }

    if (this._customFunctionWhenPostRender) {
      this._customFunctionWhenPostRender();
    }
//    this._restoreShaders(existCamera_f, lights);
    this._restoreWebGLStates();
    //this._restoreShaderParameters();
    // And call functions registered by user.
  }

}

