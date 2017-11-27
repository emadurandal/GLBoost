import M_PointLight from '../elements/lights/M_PointLight';
//import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import Vector4 from '../../low_level/math/Vector4';
import Matrix44 from '../../low_level/math/Matrix44';
import Matrix33 from '../../low_level/math/Matrix33';
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

  draw(gl, glem, expression, mesh, materials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {

    var isVAOBound = false;
    if (DrawKickerWorld._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    for (let i=0; i<materials.length;i++) {
      let material = materials[i];
      if (!material.isVisible) {
        continue;
      }

      let materialUpdateStateString = material.getUpdateStateString();
      this._glslProgram = material.shaderInstance.glslProgram;
      material._glContext.useProgram(this._glslProgram);
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerWorld._lastGeometry !== geometryName) {
          for (let attribName in vboDic) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[attribName]);
            geometry.setUpVertexAttribs(gl, glslProgram, geometry._allVertexAttribs(vertices));
          }
        }
      }

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      let query_result_uniform_opacity = material.getUniform(glslProgram, 'uniform_opacity');
      material._glContext.uniform1f(query_result_uniform_opacity, opacity, true);

      let world_m;
      let normal_m;
      if (mesh.isAffectedByWorldMatrix) {
        if (mesh.isAffectedByWorldMatrixAccumulatedAncestry) {
          world_m = mesh.transformMatrixAccumulatedAncestry;
          normal_m = mesh.normalMatrixAccumulatedAncestry;
        } else {
          world_m = mesh.transformMatrix;
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
//          viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf);
          viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestry);
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
            cameraPos = camera.transformMatrixAccumulatedAncestryWithoutMySelf.multiplyVector(new Vector4(camera.eyeInner.x, camera.eyeInner.y, camera.eyeInner.z, 1.0));
          //  console.log(cameraPos);
          }
          material._glContext.uniform4f(material.getUniform(glslProgram, 'uniform_viewPosition'), cameraPos.x, cameraPos.y, cameraPos.z, 1, true);
        }

        for (let j = 0; j < lights.length; j++) {
          if (material.getUniform(glslProgram, `uniform_lightPosition_${j}`) && material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`)) {
            let lightVec = null;
            let isPointLight = -9999;
            if (lights[j] instanceof M_PointLight) {
              lightVec = new Vector4(0, 0, 0, 1);
              lightVec = lights[j].transformMatrixAccumulatedAncestry.multiplyVector(lightVec);
              isPointLight = 1.0;
            } else if (lights[j].className === 'M_DirectionalLight') {
              lightVec = new Vector4(-lights[j].direction.x, -lights[j].direction.y, -lights[j].direction.z, 1);
              lightVec = lights[j].rotateMatrixAccumulatedAncestry.multiplyVector(lightVec);
              lightVec.w = 0.0;
              isPointLight = 0.0;
            }

            material._glContext.uniform4f(material.getUniform(glslProgram, `uniform_lightPosition_${j}`), lightVec.x, lightVec.y, lightVec.z, isPointLight, true);
            material._glContext.uniform4f(material.getUniform(glslProgram, `uniform_lightDiffuse_${j}`), lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0, true);
          }
        }
      }

      let isMaterialSetupDone = true;

      {
        let needTobeStillDirty = material.shaderInstance.setUniforms(gl, glslProgram, expression, material, camera, mesh, lights);
        material.shaderInstance.dirty = needTobeStillDirty ? true : false;

        material.setUpStates();

        this._setUpOrTearDownTextures(true, material);
      }



      this._setupOtherTextures(lights);

      if (geometry.isIndexed()) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName][i]);
        let vertexN = material.getVertexN(geometry);
        let indexBitSize = glem.elementIndexBitSize(gl);
        gl.drawElements(primitiveType, vertexN, indexBitSize, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(primitiveType, 0, vertexN);
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

DrawKickerWorld._lastMaterialUpdateStateString = null;
DrawKickerWorld._lastGeometry = null;
DrawKickerWorld._lastRenderPassIndex = -1;
