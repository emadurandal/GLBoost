import M_PointLight from '../elements/lights/M_PointLight';
//import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import Vector4 from '../../low_level/math/Vector4';
import Shader from '../../low_level/shaders/Shader';

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class DrawKickerLocal {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('This is a Singleton class. get the instance using \'getInstance\' static method.');
    }
    this._glslProgram = null;
  }

  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new DrawKickerLocal(singletonEnforcer);
    }
    return this[singleton];
  }

  draw(gl, glem, expression, mesh, materials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {
    var isVAOBound = false;
    if (DrawKickerLocal._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    for (let i=0; i<materials.length;i++) {
      let material = materials[i];
      if (!material.isVisible) {
        continue;
      }

      let materialUpdateStateString = material.getUpdateStateString();
      if (materialUpdateStateString !== DrawKickerLocal._lastMaterialUpdateStateString) {
        this._glslProgram = material.shaderInstance.glslProgram;
        material._glContext.useProgram(this._glslProgram);
      }
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerLocal._lastGeometry !== geometryName) {
          for (let attribName in vboDic) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[attribName]);
            geometry.setUpVertexAttribs(gl, glslProgram, geometry._allVertexAttribs(vertices));
          }
        }
      }

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      material._glContext.uniform1f(material.getUniform(glslProgram.hashId, 'uniform_opacity'), opacity, true);

      if (camera) {
        let world_m;
        if (mesh.isAffectedByWorldMatrix) {
          if (mesh.isAffectedByWorldMatrixAccumulatedAncestry) {
            world_m = mesh.transformMatrixAccumulatedAncestry;
          } else {
            world_m = mesh.transformMatrix;
          }
        } else {
          world_m = Matrix44.identity();
        }
        let viewMatrix;
        if (mesh.isAffectedByViewMatrix) {
          viewMatrix = camera.lookAtRHMatrix();
        } else {
          viewMatrix = Matrix44.identity();
        }
        let projectionMatrix;
        if (mesh.isAffectedByProjectionMatrix) {
          projectionMatrix = camera.projectionRHMatrix();
        } else {
          projectionMatrix = Matrix44.identity();
        }
        let pvm_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(world_m);
        Shader.trySettingMatrix44ToUniform(gl, glslProgram.hashId, material, glslProgram._semanticsDic, 'MODELVIEW', Matrix44.multiply(viewMatrix, world_m.flatten()));
        Shader.trySettingMatrix44ToUniform(gl, glslProgram.hashId, material, glslProgram._semanticsDic, 'MODELVIEWPROJECTION',pvm_m.flatten());
      }

      if (material.getUniform(glslProgram.hashId, 'uniform_lightPosition_0')) {
        lights = material.shaderInstance.getDefaultPointLightIfNotExist(lights);
        if (material.getUniform(glslProgram.hashId, 'uniform_viewPosition')) {
          let cameraPosInLocalCoord = null;
          if (camera) {
            let cameraPos = camera.transformMatrixAccumulatedAncestryWithoutMySelf.multiplyVector(new Vector4(camera.eyeInner.x, camera.eyeInner.y, camera.eyeInner.z, 1.0));
            cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(cameraPos.x, cameraPos.y, cameraPos.z, 1));
          } else {
            cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(0, 0, 1, 1));
          }
          material._glContext.uniform4f(material.getUniform(glslProgram.hashId, 'uniform_viewPosition'), cameraPosInLocalCoord.x, cameraPosInLocalCoord.y, cameraPosInLocalCoord.z, 1, true);
        }

        for (let j = 0; j < lights.length; j++) {
          if (material.getUniform(glslProgram.hashId, `uniform_lightPosition_${j}`) && material.getUniform(glslProgram.hashId, `uniform_lightDiffuse_${j}`)) {
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

            let lightVecInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(lightVec);
            material._glContext.uniform4f(material.getUniform(glslProgram.hashId, `uniform_lightPosition_${j}`), lightVecInLocalCoord.x, lightVecInLocalCoord.y, lightVecInLocalCoord.z, isPointLight, true);

            material._glContext.uniform4f(material.getUniform(glslProgram.hashId, `uniform_lightDiffuse_${j}`), lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0, true);
          }
        }
      }

      let isMaterialSetupDone = true;

      {
        var needTobeStillDirty = material.shaderInstance.setUniforms(gl, glslProgram, expression, material, camera, mesh);
        material.shaderInstance.dirty = needTobeStillDirty ? true : false;

        isMaterialSetupDone = material.setUpTexture();
        return;
      }

      if (geometry.isIndexed()) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName][i]);
        gl.drawElements(primitiveType, material.getVertexN(geometry), glem.elementIndexBitSize(gl), 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(primitiveType, 0, vertexN);
      }


      DrawKickerLocal._lastMaterialUpdateStateString = isMaterialSetupDone ? materialUpdateStateString : null;
    }

    //gl.bindBuffer(gl.ARRAY_BUFFER, null);

    DrawKickerLocal._lastGeometry = geometryName;
    DrawKickerLocal._lastRenderPassIndex = renderPassIndex;
  }
}

DrawKickerLocal._lastMaterialUpdateStateString = null;
DrawKickerLocal._lastGeometry = null;
DrawKickerLocal._lastRenderPassIndex = -1;
