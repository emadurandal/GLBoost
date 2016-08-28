import M_PointLight from '../elements/lights/M_PointLight';
import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import Vector4 from '../../low_level/math/Vector4';

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

  draw(gl, glem, glContext, mesh, materials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {
    var isVAOBound = false;
    if (DrawKickerLocal._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    for (let i=0; i<materials.length;i++) {
      let materialUpdateStateString = materials[i].getUpdateStateString();
      if (materialUpdateStateString !== DrawKickerLocal._lastMaterialUpdateStateString) {
        this._glslProgram = materials[i].shaderInstance.glslProgram;
        gl.useProgram(this._glslProgram);
      }
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerLocal._lastGeometry !== geometryName) {
          gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[geometryName]);
          geometry.setUpVertexAttribs(gl, glslProgram, geometry._allVertexAttribs(vertices));
        }
      }

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      gl.uniform1f(glslProgram.opacity, opacity);

      if (camera) {
        var viewMatrix = camera.lookAtRHMatrix();
        var projectionMatrix = camera.projectionRHMatrix();
        var m_m = mesh.transformMatrixAccumulatedAncestry;
        var pvm_m = projectionMatrix.multiply(viewMatrix).multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(m_m);
        gl.uniformMatrix4fv(glslProgram.modelViewProjectionMatrix, false, pvm_m.flatten());
      }

      if (glslProgram['lightPosition_0']) {
        lights = materials[i].shaderInstance.getDefaultPointLightIfNotExist(gl, lights, glContext.canvas);
        if (glslProgram['viewPosition']) {
          let cameraPosInLocalCoord = null;
          if (camera) {
            let cameraPos = new Vector4(0, 0, 0, 1);
            cameraPos = camera.transformMatrixAccumulatedAncestry.multiplyVector(cameraPos);
            cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(cameraPos.x, cameraPos.y, cameraPos.z, 1));
          } else {
            cameraPosInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(new Vector4(0, 0, 1, 1));
          }
          gl.uniform3f(glslProgram['viewPosition'], cameraPosInLocalCoord.x, cameraPosInLocalCoord.y, cameraPosInLocalCoord.z);
        }

        for (let j = 0; j < lights.length; j++) {
          if (glslProgram[`lightPosition_${j}`] && glslProgram[`lightDiffuse_${j}`]) {
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

            let lightVecInLocalCoord = mesh.inverseTransformMatrixAccumulatedAncestry.multiplyVector(lightVec);
            gl.uniform4f(glslProgram[`lightPosition_${j}`], lightVecInLocalCoord.x, lightVecInLocalCoord.y, lightVecInLocalCoord.z, isPointLight);

            gl.uniform4f(glslProgram[`lightDiffuse_${j}`], lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0);
          }
        }
      }

      let isMaterialSetupDone = true;

      if (materials[i].shaderInstance.dirty || materialUpdateStateString !== DrawKickerLocal._lastMaterialUpdateStateString) {
        var needTobeStillDirty = materials[i].shaderInstance.setUniforms(gl, glslProgram, materials[i], camera, mesh);
        materials[i].shaderInstance.dirty = needTobeStillDirty ? true : false;
      }

      if (materialUpdateStateString !== DrawKickerLocal._lastMaterialUpdateStateString || DrawKickerLocal._lastRenderPassIndex !== renderPassIndex) {
        if (materials[i]) {
          isMaterialSetupDone = materials[i].setUp();
        }
      }
      if (!isMaterialSetupDone) {
        return;
      }

      if (iboArrayDic[geometryName].length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName][i]);
        gl.drawElements(gl[primitiveType], materials[i].getVertexN(geometry), glem.elementIndexBitSize(gl), 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(gl[primitiveType], 0, vertexN);
      }


      DrawKickerLocal._lastMaterialUpdateStateString = isMaterialSetupDone ? materialUpdateStateString : null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    DrawKickerLocal._lastGeometry = geometryName;
    DrawKickerLocal._lastRenderPassIndex = renderPassIndex;
  }
}

DrawKickerLocal._lastMaterialUpdateStateString = null;
DrawKickerLocal._lastGeometry = null;
DrawKickerLocal._lastRenderPassIndex = -1;
