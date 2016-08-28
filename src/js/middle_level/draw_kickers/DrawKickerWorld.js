import M_PointLight from '../elements/lights/M_PointLight';
import M_DirectionalLight from '../elements/lights/M_DirectionalLight';
import Vector4 from '../../low_level/math/Vector4';

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

  draw(gl, glem, glContext, mesh, materials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, vertexN, renderPassIndex) {
    var isVAOBound = false;
    if (DrawKickerWorld._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    for (let i=0; i<materials.length;i++) {
      let materialUpdateStateString = materials[i].getUpdateStateString();
      if (materialUpdateStateString !== DrawKickerWorld._lastMaterialUpdateStateString) {
        this._glslProgram = materials[i].shaderInstance.glslProgram;
        gl.useProgram(this._glslProgram);
      }
      let glslProgram = this._glslProgram;

      if (!isVAOBound) {
        if (DrawKickerWorld._lastGeometry !== geometryName) {
          gl.bindBuffer(gl.ARRAY_BUFFER, vboDic[geometryName]);
          geometry.setUpVertexAttribs(gl, glslProgram, geometry._allVertexAttribs(vertices));
        }
      }

      let opacity = mesh.opacityAccumulatedAncestry * scene.opacity;
      gl.uniform1f(glslProgram.opacity, opacity);

      let world_m = mesh.transformMatrixAccumulatedAncestry;
      gl.uniformMatrix4fv(glslProgram.worldMatrix, false, world_m.flatten());
      let normal_m = mesh.normalMatrixAccumulatedAncestry;
      gl.uniformMatrix3fv(glslProgram.normalMatrix, false, normal_m.flatten());
      if (camera) {
        let cameraMatrix = camera.lookAtRHMatrix();
        let viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf);
        let projectionMatrix = camera.projectionRHMatrix();
        gl.uniformMatrix4fv(glslProgram.viewMatrix, false, viewMatrix.flatten());
        gl.uniformMatrix4fv(glslProgram.projectionMatrix, false, projectionMatrix.flatten());
      }

      if (glslProgram['lightPosition_0']) {
        lights = materials[i].shaderInstance.getDefaultPointLightIfNotExist(gl, lights, glContext.canvas);
        if (glslProgram['viewPosition']) {
          let cameraPos = new Vector4(0, 0, 1, 1);
          if (camera) {
            cameraPos = camera.transformMatrixAccumulatedAncestry.multiplyVector(cameraPos);
          }
          gl.uniform3f(glslProgram['viewPosition'], cameraPos.x, cameraPos.y, cameraPos.z);
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

            gl.uniform4f(glslProgram[`lightPosition_${j}`], lightVec.x, lightVec.y, lightVec.z, isPointLight);
            gl.uniform4f(glslProgram[`lightDiffuse_${j}`], lights[j].intensity.x, lights[j].intensity.y, lights[j].intensity.z, 1.0);
          }
        }
      }

      let isMaterialSetupDone = true;

      if (materials[i].shaderInstance.dirty || materialUpdateStateString !== DrawKickerWorld._lastMaterialUpdateStateString) {
        var needTobeStillDirty = materials[i].shaderInstance.setUniforms(gl, glslProgram, materials[i], camera, mesh, lights);
        materials[i].shaderInstance.dirty = needTobeStillDirty ? true : false;
      }

      if (materialUpdateStateString !== DrawKickerWorld._lastMaterialUpdateStateString || DrawKickerWorld._lastRenderPassIndex !== renderPassIndex) {
        if (materials[i]) {
          isMaterialSetupDone = materials[i].setUp();
        }
      }

      if (!isMaterialSetupDone) {
        return;
      }

      this._setupOtherTextures(lights);

      if (iboArrayDic[geometryName].length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboArrayDic[geometryName][i]);
        gl.drawElements(gl[primitiveType], materials[i].getVertexN(geometry), glem.elementIndexBitSize(gl), 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(gl[primitiveType], 0, vertexN);
      }

      this._tearDownOtherTextures(lights);

      DrawKickerWorld._lastMaterialUpdateStateString = isMaterialSetupDone ? materialUpdateStateString : null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    DrawKickerWorld._lastRenderPassIndex = renderPassIndex;
    DrawKickerWorld._lastGeometry = geometryName;
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
