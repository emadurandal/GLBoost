import GLBoost from './globals';
import Element from './Element';
import Camera from './Camera';
import GLContext from './GLContext';
import AbstractLight from './lights/AbstractLight';
import Mesh from './Mesh';
import Group from './Group';
import RenderPass from './RenderPass';


/**
 * en: This Scene class is the top level element of scene graph hierarchy.
 *       To render scene, pass this scene element to Renderer.draw method.<br>
 * ja: このSceneクラスはシーングラフ階層のトップレベルに位置する要素です。
 *       シーンをレンダリングするには、このscene要素をRenderer.drawメソッドに渡します。
 */
export default class Scene extends Element {
  constructor(canvas = GLBoost.CURRENT_CANVAS_ID) {
    super();
    this._gl = GLContext.getInstance(canvas).gl;
    this._elements = [];
    this._meshes = [];
    this._lights = [];
    this._cameras = [];
    this._renderPasses = [new RenderPass(this._gl)];
    this._currentAnimationInputValues = {};

    Scene._instanceCount = (typeof Scene._instanceCount === 'undefined') ? 0 : (Scene._instanceCount + 1);
    this._instanceName = Scene.name + '_' + Scene._instanceCount;
  }

  /**
   * en: Add the element to this scene as a child.<br>
   * ja: このシーンにelementを子供として追加します。
   * @param element a instance of Element class
   */
  add(element) {
    this._elements.push(element);
    element._parent = this;
  }

  /**
   * en: Add the element to this scene as a child.<br>
   * ja: このシーンにelementを子供として追加します。
   * @param element a instance of Element class
   */
  addChild(element) {
    this._elements.push(element);
    element._parent = this;
  }

  removeChild(element) {
    this._elements = this._elements.filter(function(elem) {
      if (elem === element) {
        element._parent = null;
      }
      return elem !== element;
    });
  }

  removeAll() {
    this._elements.length = 0;
  }

  /**
   * en: Get child elements which belong to this scene.<br>
   * ja: このシーンに属していた子供の要素の配列を返します。
   * @return {Array} en: child elements of this scene. ja: このシーンの子供の要素
   */
  getChildren() {
    return this._elements;
  }


  _setDirtyToAnimatedElement(inputName, element = this) {
    if (element.hasAnimation(inputName)) {
      element._needUpdate();
    }

    if (element instanceof Group || element instanceof Scene) {
      let children = element.getChildren();
      for (let i = 0; i < children.length; i++) {
        this._setDirtyToAnimatedElement(inputName, children[i]);
      }
    }
  }

  _getCurrentAnimationInputValue(inputName) {
    return this._currentAnimationInputValues[inputName];
  }

  /**
   * en: Set animation input value (for instance frame value), This value affect all child elements in this scene graph (recursively).<br>
   * ja: アニメーションのための入力値（例えばフレーム値）をセットします。この値はシーングラフに属する全ての子孫に影響します。
   * @param {string} inputName en: inputName name of input value. ja: 入力値の名前
   * @param {any} inputValue en: input value of animation. ja: アニメーションの入力値
   */
  setCurrentAnimationValue(inputName, inputValue) {
    this._setDirtyToAnimatedElement(inputName);
    this._currentAnimationInputValues[inputName] = inputValue;
  }

  /**
   * en: Prepare for Rendering. You have to call this method before Renderer.draw method.
   * ja: レンダリングのための前処理を行います。Renderer.drawメソッドの前にこのメソッドを呼ぶ必要があります。
   */
  prepareForRender() {

    let collectMeshes = function(elem) {
      if (elem instanceof Group) {
        var children = elem.getChildren();
        var meshes = [];
        children.forEach(function(child) {
          var childMeshes = collectMeshes(child);
          meshes = meshes.concat(childMeshes);
        });
        return meshes;
      } else if (elem instanceof Mesh) {
        return [elem];
      } else {
        return [];
      }
    };

    this._meshes = [];
    this._elements.forEach((elm)=> {
      this._meshes = this._meshes.concat(collectMeshes(elm));
    });

    let collectLights = function(elem) {
      if (elem instanceof Group) {
        var children = elem.getChildren();
        var lights = [];
        children.forEach(function(child) {
          var childLights = collectLights(child);
          lights = lights.concat(childLights);
        });
        return lights;
      } else if (elem instanceof AbstractLight) {
        return [elem];
      } else {
        return [];
      }
    };

    this._lights = [];
    this._elements.forEach((elm)=> {
      this._lights = this._lights.concat(collectLights(elm));
    });

    let existCamera_f = false;
    let collectCameras = function(elem) {
      if (elem instanceof Group) {
        var children = elem.getChildren();
        var cameras = [];
        children.forEach(function(child) {
          var childCameras = collectCameras(child);
          cameras = cameras.concat(childCameras);
        });
        return cameras;
      } else if (elem instanceof Camera) {
        existCamera_f = true;
        return [elem];
      } else {
        return [];
      }
    };

    this._cameras = [];
    this._elements.forEach((elm)=> {
      this._cameras = this._cameras.concat(collectCameras(elm));
    });
    if (this._cameras.length !== 0) {
      this._cameras[0].setAsMainCamera(this);
    }

    // If there is only one renderPass, register meshes to the renderPass automatically.
    if (this._renderPasses.length === 1) {
      this._renderPasses[0].clearElements();
      this._renderPasses[0].addElements(this._meshes);
    }

    this._renderPasses.forEach((renderPass)=> {
      renderPass.prepareForRender();
    });

    this._meshes.forEach((mesh)=> {
      mesh.prepareForRender(existCamera_f, this._lights, this._renderPasses);
    });


  }

  set renderPasses(renderPasses) {
    this._renderPasses = renderPasses;
  }

  get renderPasses() {
    return this._renderPasses;
  }

  /**
   * en: Get child elements which belong to this scene.<br>
   * ja: このシーンに属していた子供の要素の配列を返します。
   * @return {Array} en: child elements of this scene. ja: このシーンの子供の要素
   */
  get elements() {
    return this._elements;
  }

  /**
   * en: Get child meshes which belong to this scene.<br>
   * ja: このシーンに属していた子供のMesh要素の配列を返します。
   * @return {Array} en: child meshes of this scene. ja: このシーンの子供のMesh要素
   */
  get meshes() {
    return this._meshes;
  }

  /**
   * en: Get child lights which belong to this scene.<br>
   * ja: このシーンに属していた子供のLight要素の配列を返します。
   * @return {Array} en: child lights of this scene. ja: このシーンの子供のLight要素
   */
  get lights() {
    return this._lights;
  }

  /**
   * en: Get child cameras which belong to this scene.<br>
   * ja: このシーンに属していた子供のCamera要素の配列を返します。
   * @return {Array} en: child cameras of this scene. ja: このシーンの子供のCamera要素
   */
  get cameras() {
    return this._cameras;
  }

  toString() {
    return this._instanceName;
  }
}

GLBoost['Scene'] = Scene;
