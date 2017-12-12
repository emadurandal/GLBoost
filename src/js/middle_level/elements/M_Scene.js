/* @flow */

import M_Element from './M_Element';
import M_AbstractCamera from '../elements/cameras/M_AbstractCamera';
import M_AbstractLight from './lights/M_AbstractLight';
import M_Mesh from './meshes/M_Mesh';
import M_Group from './M_Group';
import AABB from '../../low_level/math/AABB';
import Vector4 from '../../low_level/math/Vector4';


/**
 * [en] This M_Scene class is the top level element of scene graph hierarchy.
 *       To render scene, pass this scene element to Renderer.draw method.<br>
 * [ja] このSceneクラスはシーングラフ階層のトップレベルに位置する要素です。
 *       シーンをレンダリングするには、このscene要素をRenderer.drawメソッドに渡します。
 */
export default class M_Scene extends M_Group {

  /**
   * [en] constructor
   * [ja] コンストラクタ
   * @param {HTMLCanvas|string} canvas [en] canvas or canvas' id string. [ja] canvasまたはcanvasのid文字列
   */
  constructor(glBoostContext:any) {
    super(glBoostContext);
    this._gl = this._glContext.gl;
    this._reset();
  }

  _reset() {
    this._meshes = [];
    this._lights = [];
    this._lightsExceptAmbient = [];
    this._ambientLights = [];    
    this._cameras = [];
    this._accumulatedAmbientIntensity = Vector4.zero();
    ;
  }

  _getCurrentAnimationInputValue(inputName:string) {
    let value = this._currentAnimationInputValues[inputName];
    if (typeof value === 'undefined') {
      return (void 0);
    } else {
      return value;
    }
  }

  /**
   * [en] Prepare for Rendering. You have to call this method before Renderer.draw method.
   * [ja] レンダリングのための前処理を行います。Renderer.drawメソッドの前にこのメソッドを呼ぶ必要があります。
   */
  prepareToRender(expression:any) {
    this._reset();

    var aabb = (function setParentAndMergeAABBRecursively(elem) {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();
        for(let i=0; i<children.length; i++) {
          children[i]._parent = elem;
          var aabb = setParentAndMergeAABBRecursively(children[i]);
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
    })(this);
    this.AABB.mergeAABB(aabb);

    let collectLights = function(elem) {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();
        var lights = [];
        children.forEach(function(child) {
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
    this._elements.forEach((elm)=> {
      this._lights = this._lights.concat(collectLights(elm));
      this._lightsExceptAmbient = this._lights.filter((light)=>{return !light.isTypeAmbient();});
      this._ambientLights = this._lights.filter((light)=>{return light.isTypeAmbient();});
    });

    let existCamera_f = false;
    let collectCameras = function(elem) {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();
        var cameras = [];
        children.forEach(function(child) {
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
    this._elements.forEach((elm)=> {
      this._cameras = this._cameras.concat(collectCameras(elm));
    });
    if (this._cameras.length === 0) {
    } else if (this._cameras.length === 1) {
      this._cameras[0].setAsMainCamera(this);
    } else {
      // If there are two or more cameras present in the scene and the main camera is not explicitly specified,
      // a camera chosen to be irresponsible is made the main camera.
      let isNotMainCameraFound = true;
      for (let camera of this._cameras) {
        if (camera.isMainCamera(this)) {
          isNotMainCameraFound = false;
          break;
        }
      }
      if (isNotMainCameraFound) {
        this._cameras[0].setAsMainCamera(this); //
      }
    }


    let collectMeshes = function(elem) {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();
        var meshes = [];
        children.forEach(function(child) {
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
    this._elements.forEach((elm)=> {
      this._meshes = this._meshes.concat(collectMeshes(elm));
    });

    let callPrepareToRenderMethodOfAllElements = (elem)=> {
      if (elem instanceof M_Group) {
        var children = elem.getChildren();

        children.forEach(function (child) {
          callPrepareToRenderMethodOfAllElements(child);
        });

        for (let meshGizmo of elem._gizmos) {
          meshGizmo.prepareToRender(expression, existCamera_f, []);
        }
      } else if (elem instanceof M_Mesh) {
        elem.prepareToRender(expression, existCamera_f, this._lights);
        for (let gizmo of elem._gizmos) {
          gizmo.mesh.prepareToRender(expression, existCamera_f, this._lights);
        }
      } else if (elem instanceof M_Element) {
        elem.prepareToRender();
        for (let gizmo of elem._gizmos) {
          gizmo.mesh.prepareToRender(expression, existCamera_f, []);
        }
      } else {
        return;
      }
    };
    callPrepareToRenderMethodOfAllElements(this);
  }

  get lightsExceptAmbient() {
    return this._lightsExceptAmbient;
  }

  updateAmountOfAmbientLightsIntensity() {
    this._accumulatedAmbientIntensity = Vector4.zero();
    for (let light of this._ambientLights) {
      this._accumulatedAmbientIntensity.add(light.intensity);
    }
  }

  getAmountOfAmbientLightsIntensity() {
    return this._accumulatedAmbientIntensity.clone();
  }    

  /**
   * [en] Get child elements which belong to this scene.<br>
   * [ja] このシーンに属していた子供の要素の配列を返します。
   * @return {Array<Element>} [en] child elements of this scene. [ja] このシーンの子供の要素
   */
  getChildren() {
    return this._elements;
  }

  /**
   * [en] Get child elements which belong to this scene.<br>
   * [ja] このシーンに属していた子供の要素の配列を返します。
   * @return {Array<Element>} [en] child elements of this scene. [ja] このシーンの子供の要素
   */
  get elements():Array<any> {
    return this._elements;
  }

  /**
   * [en] Get child meshes which belong to this scene.<br>
   * [ja] このシーンに属していた子供のMesh要素の配列を返します。
   * @return {Array<M_Mesh>} [en] child meshes of this scene. [ja] このシーンの子供のMesh要素
   */
  get meshes() {
    return this._meshes;
  }

  /**
   * [en] Get child lights which belong to this scene.<br>
   * [ja] このシーンに属していた子供のLight要素の配列を返します。
   * @return {Array<M_AbstractLight>} [en] child lights of this scene. [ja] このシーンの子供のLight要素
   */
  get lights() {
    return this._lights;
  }

  get lightsExceptAmbient() {
    return this._lightsExceptAmbient;
  }

  /**
   * [en] Get child cameras which belong to this scene.<br>
   * [ja] このシーンに属していた子供のCamera要素の配列を返します。
   * @return {Array<PerspectiveCamera>} [en] child cameras of this scene. [ja] このシーンの子供のCamera要素
   */
  get cameras() {
    return this._cameras;
  }

}
