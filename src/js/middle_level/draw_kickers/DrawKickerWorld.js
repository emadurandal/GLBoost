import M_PointLight from '../elements/lights/M_PointLight';
import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import Vector4 from '../../low_level/math/Vector4';
import Matrix44 from '../../low_level/math/Matrix44';
import Geometry from '../../low_level/geometries/Geometry';
import Shader from '../../low_level/shaders/Shader';
import MiscUtil from '../../low_level/misc/MiscUtil';

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

  draw(gl, glem, expression, mesh, materials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {    var isVAOBound = false;
    var isVAOBound = false;
    if (DrawKickerWorld._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    for (let i=0; i<materials.length;i++) {
      let material = materials[i];
      let materialUpdateStateString = material.getUpdateStateString();
      this._glslProgram = material.shaderInstance.glslProgram;
      gl.useProgram(this._glslProgram);
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerWorld._lastGeometry !== geometryName) {
          for (let attribName in vboDic) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[attribName]);
            geometry.setUpVertexAttribs(gl, glslProgram, Geometry._allVertexAttribs(vertices));
          }
        }
      }

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      gl.uniform1f(material.getUniform(glslProgram.hashId, 'opacity'), opacity);

      let world_m = mesh.transformMatrixAccumulatedAncestry;
      Shader.trySettingMatrix44ToUniform(gl, glslProgram.hashId, material, material._semanticsDic, 'WORLD', world_m.flatten());
      let normal_m = mesh.normalMatrixAccumulatedAncestry;
      Shader.trySettingMatrix33ToUniform(gl, glslProgram.hashId, material, material._semanticsDic, 'MODELVIEWINVERSETRANSPOSE', normal_m.flatten());
      if (camera) {
        let cameraMatrix = camera.lookAtRHMatrix();
        let viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf);
        let projectionMatrix = camera.projectionRHMatrix();
        Shader.trySettingMatrix44ToUniform(gl, glslProgram.hashId, material, material._semanticsDic, 'VIEW', viewMatrix.flatten());
        Shader.trySettingMatrix44ToUniform(gl, glslProgram.hashId, material, material._semanticsDic, 'PROJECTION', projectionMatrix.flatten());
        Shader.trySettingMatrix44ToUniform(gl, glslProgram.hashId, material, material._semanticsDic, 'MODELVIEW', Matrix44.multiply(viewMatrix, world_m).flatten());
      }

      if (material.getUniform(glslProgram.hashId, 'uniform_lightPosition_0')) {
        lights = material.shaderInstance.getDefaultPointLightIfNotExist(lights);
        if (material.getUniform(glslProgram.hashId, 'uniform_viewPosition')) {
          let cameraPos = new Vector4(0, 0, 0, 1);
          if (camera) {
            cameraPos = camera.transformMatrixAccumulatedAncestryWithoutMySelf.multiplyVector(new Vector4(camera.eyeInner.x, camera.eyeInner.y, camera.eyeInner.z, 1.0));
          //  console.log(cameraPos);
          } else {
            let cameraPos = new Vector4(0, 0, 1, 1);
          }
          gl.uniform3f(material.getUniform(glslProgram.hashId, 'uniform_viewPosition'), cameraPos.x, cameraPos.y, cameraPos.z);
        }

        for (let j = 0; j < lights.length; j++) {
          if (material.getUniform(glslProgram.hashId, `uniform_lightPosition_${j}`) && material.getUniform(glslProgram.hashId, `uniform_lightDiffuse_${j}`)) {
            let lightVec = null;
            let isPointLight = -9999;
            if (lights[j] instanceof M_PointLight) {
              lightVec = new Vector4(0, 0, 0, 1);
              lightVec = lights[j].transformMatrixAccumulatedAncestry.multiplyVector(lightVec);
              isPointLight = 1.0;
            } else if (lights[j] instanceof M_DirectionalLight) {
              lightVec = new Vector4(-lights[j].direction.x, -lights[j].direction.y, -lights[j].direction.z, 1);
              lightVec = lights[j].rotateMatrixAccumulatedAncestry.multiplyVector(lightVec);
              lightVec.w = 0.0;
              isPointLight = 0.0;
            }

            gl.uniform4f(material.getUniform(glslProgram.hashId, `uniform_lightPosition_${j}`), lightVec.x, lightVec.y, lightVec.z, isPointLight);
            gl.uniform4f(material.getUniform(glslProgram.hashId, `uniform_lightDiffuse_${j}`), lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0);
          }
        }
      }

      let isMaterialSetupDone = true;

      if (material.shaderInstance.dirty || materialUpdateStateString !== DrawKickerWorld._lastMaterialUpdateStateString) {
        var needTobeStillDirty = material.shaderInstance.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);
        material.shaderInstance.dirty = needTobeStillDirty ? true : false;
      }

      if (materialUpdateStateString !== DrawKickerWorld._lastMaterialUpdateStateString || DrawKickerWorld._lastRenderPassIndex !== renderPassIndex) {
        if (material) {
          material.setUpStates();

          this._setUpOrTearDownTextures(false, material);
          if (!this._setUpOrTearDownTextures(true, material)) {
            MiscUtil.consoleLog(GLBoost.LOG_GLBOOST, 'Textures are not ready yet.');
            return;
          }
        }
      }


      this._setupOtherTextures(lights);

      if (geometry.isIndexed()) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName][i]);
        gl.drawElements(gl[primitiveType], material.getVertexN(geometry), glem.elementIndexBitSize(gl), 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(gl[primitiveType], 0, vertexN);
      }

      material.shaderInstance.setUniformsAsTearDown(gl, glslProgram, expression, material, camera, mesh, lights);

      this._tearDownOtherTextures(lights);

      material.tearDownStates();

      DrawKickerWorld._lastMaterialUpdateStateString = isMaterialSetupDone ? materialUpdateStateString : null;
    }

  //  gl.bindBuffer(gl.ARRAY_BUFFER, null);

    DrawKickerWorld._lastRenderPassIndex = renderPassIndex;
    DrawKickerWorld._lastGeometry = geometryName;
  }

  _setUpOrTearDownTextures(isSetUp, material) {
    let methodName = 'tearDownTexture';
    if (isSetUp) {
      methodName = 'setUpTexture';
    }

    let isTextureProcessDone = true;
    if (typeof material._semanticsDic['TEXTURE'] === 'undefined') {
      // do nothing
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
      if (lights[i].camera && lights[i].camera.texture) {
        lights[i].camera.texture.setUp();
      }
    }
  }

  _tearDownOtherTextures(lights) {
    for(let i=0; i<lights.length; i++) {
      if (lights[i].camera && lights[i].camera.texture) {
        lights[i].camera.texture.tearDown();
      }
    }
  }
}

DrawKickerWorld._lastMaterialUpdateStateString = null;
DrawKickerWorld._lastGeometry = null;
DrawKickerWorld._lastRenderPassIndex = -1;
