import Shader from '../shaders/Shader';
import PointLight from '../lights/PointLight';
import DirectionalLight from '../lights/DirectionalLight';
import Vector4 from '../math/Vector4';
import Matrix44 from '../math/Matrix44';
import Matrix33 from '../math/Matrix33';

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

  draw(gl, glem, glContext, mesh, materials, camera, lights, scene, vertices, vaoDic, vboDic, iboArrayDic, geometry, geometryName, primitiveType, renderPass_index, vertexN) {
    var isVAOBound = false;
    if (DrawKickerWorld._lastGeometry !== geometryName) {
      isVAOBound = glem.bindVertexArray(gl, vaoDic[geometryName]);
    }

    for (let i=0; i<materials.length;i++) {
      let materialName = materials[i].toString();
      if (materialName !== DrawKickerWorld._lastMaterial) {
        this._glslProgram = materials[i].glslProgramOfPasses[renderPass_index];
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
      gl.uniformMatrix4fv(glslProgram.worldMatrix, false, new Float32Array(world_m.flatten()));
      let normal_m = mesh.normalMatrixAccumulatedAncestry;
      gl.uniformMatrix3fv(glslProgram.normalMatrix, false, new Float32Array(normal_m.flatten()));
      if (camera) {
        let cameraMatrix = camera.lookAtRHMatrix();
        let viewMatrix = cameraMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf);
        let projectionMatrix = camera.perspectiveRHMatrix();
        gl.uniformMatrix4fv(glslProgram.viewMatrix, false, new Float32Array(viewMatrix.flatten()));
        gl.uniformMatrix4fv(glslProgram.projectionMatrix, false, new Float32Array(projectionMatrix.flatten()));
      }

      if (glslProgram['lightPosition_0']) {
        lights = Shader.getDefaultPointLightIfNotExsist(gl, lights, glContext.canvas);
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
            if (lights[j] instanceof PointLight) {
              lightVec = new Vector4(0, 0, 0, 1);
              lightVec = lights[j].transformMatrixAccumulatedAncestry.multiplyVector(lightVec);
              isPointLight = 1.0;
            } else if (lights[j] instanceof DirectionalLight) {
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

      if (materials[i].shaderInstance.dirty || materialName !== DrawKickerWorld._lastMaterial) {
        var needTobeStillDirty = materials[i].shaderInstance.setUniforms(gl, glslProgram, materials[i], camera, mesh);
        materials[i].shaderInstance.dirty = needTobeStillDirty ? true : false;
      }

      if (materialName !== DrawKickerWorld._lastMaterial) {
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


      DrawKickerWorld._lastMaterial = isMaterialSetupDone ? materialName : null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    DrawKickerWorld._lastGeometry = geometryName;
  }
}

DrawKickerWorld._lastMaterial = null;
DrawKickerWorld._lastGeometry = null;