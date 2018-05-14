import M_PointLight from '../elements/lights/M_PointLight';
//import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import Vector3 from '../../low_level/math/Vector3';
import Vector4 from '../../low_level/math/Vector4';
import Matrix44 from '../../low_level/math/Matrix44';
import Matrix33 from '../../low_level/math/Matrix33';
import Shader from '../../low_level/shaders/Shader';
import MiscUtil from '../../low_level/misc/MiscUtil';
import Geometry from '../../low_level/geometries/Geometry';

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class DrawKickerWorld {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }
    this._glslProgram = null;
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new DrawKickerWorld(singletonEnforcer);
    }
    return this[singleton];
  }

  draw(gl, glem, expression, mesh, originalMaterials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {

    var isVAOBound = false;
    if (DrawKickerWorld._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    let input = mesh._getCurrentAnimationInputValue('time');

    for (let i=0; i<originalMaterials.length;i++) {
      let material = originalMaterials[i];
      if (!material.isVisible) {
        continue;
      }

      let renderpassSpecificMaterial = material['renderpassSpecificMaterial_' + expression.renderPasses[renderPassIndex].instanceName + '_material_' + i];
      if (renderpassSpecificMaterial) {
        material = renderpassSpecificMaterial;
      }
      this._glslProgram = material.shaderInstance.glslProgram;

      material._glContext.useProgram(this._glslProgram);
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerWorld._lastGeometry !== geometryName) {
          for (let attribName in vboDic) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[attribName]);
            geometry.setUpVertexAttribs(gl, glslProgram, Geometry._allVertexAttribs(vertices));
          }
        }
      }

      material._glContext.uniform2i(material.getUniform(glslProgram, 'uniform_objectIds'), mesh.objectIndex, 0, true);

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      let query_result_uniform_opacity = material.getUniform(glslProgram, 'uniform_opacity');
      material._glContext.uniform1f(query_result_uniform_opacity, opacity, true);

      let world_m;
      let normal_m;
      if (mesh.isAffectedByWorldMatrix) {
        if (mesh.isAffectedByWorldMatrixAccumulatedAncestry) {
          world_m = mesh.getWorldMatrixAt(input);
          normal_m = mesh.normalMatrix;
        } else {
          world_m = mesh.matrix;
          normal_m = mesh.normalMatrix;
        }
      } else {
        world_m = Matrix44.identity();
        normal_m = Matrix33.identity();
      }

      Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'WORLD', world_m.flatten());
      Shader.trySettingMatrix33ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEWINVERSETRANSPOSE', normal_m.flatten());
      if (camera) {
        let viewMatrix;
        if (mesh.isAffectedByViewMatrix) {
          let cameraMatrix = camera.lookAtRHMatrix();
//          viewMatrix = cameraMatrix.multiply(camera.inverseWorldMatrixWithoutMySelf);
          viewMatrix = cameraMatrix.multiply(camera.inverseWorldMatrix);
        } else {
          viewMatrix = Matrix44.identity();
        }

        let projectionMatrix;
        if (mesh.isAffectedByProjectionMatrix) {
          projectionMatrix = camera.projectionRHMatrix();
        } else {
          projectionMatrix = Matrix44.identity();
        }

        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'VIEW', viewMatrix.flatten());
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'PROJECTION', projectionMatrix.flatten());
        Shader.trySettingMatrix44ToUniform(gl, glslProgram, material, material._semanticsDic, 'MODELVIEW', Matrix44.multiply(viewMatrix, world_m).flatten());

        camera._lastPVMatrixFromLight = Matrix44.multiply(projectionMatrix, viewMatrix);
      }

      if (material.getUniform(glslProgram, 'uniform_lightPosition_0')) {
        lights = material.shaderInstance.getDefaultPointLightIfNotExist(lights);
        
        if (material.getUniform(glslProgram, 'uniform_viewPosition')) {
          let cameraPos = new Vector4(0, 0, 1, 1);
          if (camera) {
            cameraPos = camera.worldMatrixWithoutMySelf.multiplyVector(new Vector4(camera.eyeInner.x, camera.eyeInner.y, camera.eyeInner.z, 1.0));
          //  console.log(cameraPos);
          }
          material._glContext.uniform3f(material.getUniform(glslProgram, 'uniform_viewPosition'), cameraPos.x, cameraPos.y, cameraPos.z, true);
        }

        for (let j = 0; j < lights.length; j++) {
          let light = lights[j];
          if (material.getUniform(glslProgram, `uniform_lightPosition_${j}`) && material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`)) {
            let lightPosition = new Vector4(0, 0, 0, 1);            
            let lightDirection = new Vector4(0, 0, 0, 1);
            // Directional: [0.0, 0.4), Point:[0.4, 0.6), Spot:[0.6, 1.0]
            let lightType = 0.0; // M_DirectionalLight
            if (light.className === 'M_PointLight') {
              lightType = 0.5;
            } else if (light.className === 'M_SpotLight') {
              lightType = 1.0;
            }
            if (light.className === 'M_PointLight' || light.className === 'M_SpotLight') {
              lightPosition = light.worldMatrix.multiplyVector(lightPosition);
            }
            if (light.className === 'M_DirectionalLight' || light.className === 'M_SpotLight') {
              lightDirection = new Vector3(-light.direction.x, -light.direction.y, -light.direction.z);
              //lightDirection = light.rotateMatrixAccumulatedAncestry.multiplyVector(lightDirection).toVector3();
              lightDirection.normalize();
            }
            material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightPosition_${j}`), lightPosition.x, lightPosition.y, lightPosition.z, true);
            material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightDirection_${j}`), lightDirection.x, lightDirection.y, lightDirection.z, true);
            material._glContext.uniform4f(material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`), light.intensity.x, light.intensity.y, light.intensity.z, 1.0, true);
            if (light.className === 'M_SpotLight') {
              material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightSpotInfo_${j}`), lightType, light.spotCosCutoff, light.spotExponent, true);              
            } else {
              material._glContext.uniform3f(material.getUniform(glslProgram, `uniform_lightSpotInfo_${j}`), lightType, 0, 0, true);              
            }
          }
        }
      }

      let isMaterialSetupDone = true;

      {
        let needTobeStillDirty = material.shaderInstance.setUniforms(gl, glslProgram, scene, material, camera, mesh, lights);
        material.shaderInstance.dirty = needTobeStillDirty ? true : false;

        material.setUpStates();

        this._setUpOrTearDownTextures(true, material);
      }
      
      this._setupOtherTextures(lights);

      geometry.drawIntermediate(gl, glslProgram, mesh, material);


      if (geometry.isIndexed()) {
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName]);
        let vertexN = material.getVertexN(geometry);
        let indexBitSizeGLConstant = glem.elementIndexBitSizeGLConstant(gl);
        let indexByteSizeNumber = glem.elementIndexByteSizeNumber(gl);
        let offset = geometry.getIndexStartOffsetArrayAtMaterial(i);
        gl.drawElements(primitiveType, vertexN, indexBitSizeGLConstant, offset*indexByteSizeNumber);
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(primitiveType, 0, vertexN);
      }

      material.shaderInstance.setUniformsAsTearDown(gl, glslProgram, scene, material, camera, mesh, lights);

      this._tearDownOtherTextures(lights);

      material.tearDownStates();

      //DrawKickerWorld._lastMaterialUpdateStateString = isMaterialSetupDone ? materialUpdateStateString : null;
    }
    //glem.bindVertexArray(gl, null);

  //  gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //DrawKickerWorld._lastRenderPassIndex = renderPassIndex;
    DrawKickerWorld._lastGeometry = geometryName;
  }

  _setUpOrTearDownTextures(isSetUp, material) {
    let methodName = 'tearDownTexture';
    if (isSetUp) {
      methodName = 'setUpTexture';
    }

    let isTextureProcessDone = true;
    if (typeof material._semanticsDic['TEXTURE'] === 'undefined') {
    } else if (typeof material._semanticsDic['TEXTURE'] === 'string') {
      let textureSamplerDic = material.uniformTextureSamplerDic[material._semanticsDic['TEXTURE']];
      let textureName = textureSamplerDic.textureName;
      let textureUnitIndex = textureSamplerDic.textureUnitIndex;
      isTextureProcessDone = material[methodName](textureName, textureUnitIndex);
    } else {
      // it must be an Array...
      material._semanticsDic['TEXTURE'].forEach((uniformName) => {
        let textureSamplerDic = material.uniformTextureSamplerDic[uniformName];
        let textureName = textureSamplerDic.textureName;
        let textureUnitIndex = textureSamplerDic.textureUnitIndex;
        isTextureProcessDone = material[methodName](textureName, textureUnitIndex);
      });
    }

    return isTextureProcessDone;
  }

  _setupOtherTextures(lights) {
    for(let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {// && lights[i].isCastingShadow) {
        lights[i].camera.texture.setUp();
      }
    }
  }

  _tearDownOtherTextures(lights) {
    for(let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture)  {// && lights[i].isCastingShadow) {
        lights[i].camera.texture.tearDown();
      }
    }
  }
}

//DrawKickerWorld._lastMaterialUpdateStateString = null;
//DrawKickerWorld._lastGeometry = null;
//DrawKickerWorld._lastRenderPassIndex = -1;
