import GLBoost from '../../globals';
import Geometry from '../../low_level/geometries/Geometry';
import Vector4 from '../../low_level/math/Vector4';
import Vector3 from '../../low_level/math/Vector3';
import Vector2 from '../../low_level/math/Vector2';
import ArrayUtil from '../../low_level/misc/ArrayUtil';
import ParticleShaderSource from '../../middle_level/shaders/ParticleShader';
import MathUtil from '../../low_level/math/MathUtil';

/**
 * This Particle class handles particles expressions.
 * You can define particles behaviors in a custom vertex shader.
 * These particles are processed in GPU, so this is a very fast solution of particles expressions.
 */
export default class Particle extends Geometry {

  /**
   * This is Particle class's constructor
   *
   * @param {Object} centerPointData [en] a JSON object consisted of position (by the particle) array and the other data (by the particle) array.
   * @param {Number} particleWidth Width of each particle
   * @param {Number} particleHeight Height of each particle
   * @param {Object} [en] a JSON which has other vertex attribute arrays you want (by the vertex of quad particle).
   * @param {CanvasElement or String} Canvas Element which is generation source of WebGL context in current use or String which indicates the Canvas Element in jQuery like query string
   */
  constructor(glBoostContext, centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint) {
    super(glBoostContext);

    this._setupVertexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes, performanceHint);
  }

  _setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, needDefaultWhiteColor) {
    let indices = this.indices;
    indices = [];
    const positionArray = centerPointData.position;

    for (let i=0; i<positionArray.length; i++) {
      var offset = i*4;
      indices.push(offset);   // start Quad
      indices.push(offset+1); //
      indices.push(offset+2); // end Quad
      indices.push(offset+3); //
      if (i === positionArray.length - 1) {
        break;
      }
      indices.push(offset+3); // degenerated
      indices.push(offset+4); // move another Particle
    }

    this.positions = [];
    let positions = this.positions;

    // if array, convert to vector[2/3/4]
    for (let i=0; i<positionArray.length; i++) {
      positionArray[i] = MathUtil.arrayToVector(positionArray[i]);
    }

    for (let i=0; i<positionArray.length; i++) {
      positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
    }
    this.centerPositions = [];
    let centerPositions = this.centerPositions;

    for (let i=0; i<positionArray.length; i++) {
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
    }
    this.texcoords = [];
    let texcoords = this.texcoords;
    for (let i=0; i<positionArray.length; i++) {
      texcoords.push(new Vector2(0, 0));
      texcoords.push(new Vector2(0, 1));
      texcoords.push(new Vector2(1, 0));
      texcoords.push(new Vector2(1, 1));
    }

    this.normals = [];
    let normals = this.normals;
    var normal = new Vector3(0, 0, 1);
    for (let i=0; i<positionArray.length; i++) {
      for (let j=0; j<4; j++) {
        normals.push(normal);
      }
    }
    this.pointData = {};
    let pointData = this.pointData;

    for (let type in centerPointData) {
      if (type !== 'position') {
        pointData[type] = [];
        for (let i=0; i<positionArray.length; i++) {
          for (let j=0; j<4; j++) {
            pointData[type].push(centerPointData[type][i]);
          }
        }
      }
    }

    var object = {
      position: positions,
      texcoord: texcoords,
      normal: normals,
      particleCenterPos: centerPositions
    };

    if (needDefaultWhiteColor) {
      this.colors = [];
      let colors = this.colors;
      var vertexColor = new Vector4(1, 1, 1, 1);
      for (let i=0; i<positionArray.length; i++) {
        for (let j=0; j<4; j++) {
          colors.push(vertexColor);
        }
      }
      object.color = colors;
    }

    var tempAttributes = ArrayUtil.merge(object, pointData);
    var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

    return {
      vertexAttributes: completeAttributes,
      indexArray: [indices]
    };
  }

  _updateVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, needDefaultWhiteColor) {
    let positionArray = centerPointData.position;
    let idx=0;
    let positions = this.positions;
    for (let i=0; i<positionArray.length; i++) {
      positions[idx+0].x = positionArray[i].x - pHalfWidth;
      positions[idx+0].y = positionArray[i].y + pHalfHeight;
      positions[idx+0].z = positionArray[i].z;
      positions[idx+1].x = positionArray[i].x - pHalfWidth;
      positions[idx+1].y = positionArray[i].y - pHalfHeight;
      positions[idx+1].z = positionArray[i].z;
      positions[idx+2].x = positionArray[i].x + pHalfWidth;
      positions[idx+2].y = positionArray[i].y + pHalfHeight;
      positions[idx+2].z = positionArray[i].z;
      positions[idx+3].x = positionArray[i].x + pHalfWidth;
      positions[idx+3].y = positionArray[i].y - pHalfHeight;
      positions[idx+3].z = positionArray[i].z;
      idx+=4;
    }

    let centerPositions = this.centerPositions;
    idx = 0;
    for (let i=0; i<positionArray.length; i++) {
      centerPositions[idx].x = positionArray[i].x;
      centerPositions[idx].y = positionArray[i].y;
      centerPositions[idx].z = positionArray[i].z;
      centerPositions[idx+1].x = positionArray[i].x;
      centerPositions[idx+1].y = positionArray[i].y;
      centerPositions[idx+1].z = positionArray[i].z;
      centerPositions[idx+2].x = positionArray[i].x;
      centerPositions[idx+2].y = positionArray[i].y;
      centerPositions[idx+2].z = positionArray[i].z;
      centerPositions[idx+3].x = positionArray[i].x;
      centerPositions[idx+3].y = positionArray[i].y;
      centerPositions[idx+3].z = positionArray[i].z;
      idx+=4;
    }
    idx = 0;
    let pointData = this.pointData;
    for (let type in centerPointData) {
      if (type !== 'position') {
        pointData[type] = [];
        for (let i=0; i<positionArray.length; i++) {
          for (let j=0; j<4; j++) {
            pointData[type][idx].x = centerPointData[type][i].x;
            pointData[type][idx].y = centerPointData[type][i].y;
            pointData[type][idx].z = centerPointData[type][i].z;
            idx++;
          }
        }
      }
    }

    var object = {
      position: positions,
      texcoord: this.texcoords,
      normal: this.normals,
      particleCenterPos: centerPositions
    };

    if (needDefaultWhiteColor) {
      object.color = this.colors;
    }

    var tempAttributes = ArrayUtil.merge(object, pointData);
    var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

    return {
      vertexAttributes: completeAttributes,
      indexArray: [this.indices]
    }
  }
  _setupVertexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, performanceHint) {
    var result = this._setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes, true);

    this.setVerticesData(result.vertexAttributes, result.indexArray, GLBoost.TRIANGLE_STRIP, performanceHint);
  }

  updateVerticesData(centerPointData, particleWidth, particleHeight, customVertexAttributes) {
    //var result = this._setupVertexAndIndexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes, false);
    const result = this._updateVertexAndIndexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes, false);
    super.updateVerticesData(result.vertexAttributes);
  }

  prepareToRender(existCamera_f, pointLight, meshMaterial, renderPasses, mesh) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
    var canvas = this._canvas;

    if (meshMaterial) {
      this._materialForBillboard = meshMaterial;
    } else {
      this._materialForBillboard = this._defaultMaterial;
    }

    class ParticleShader extends this._materialForBillboard.shaderClass {
      constructor(glBoostContext, basicShader) {
        super(glBoostContext, basicShader, ParticleShaderSource);
        ParticleShader.mixin(ParticleShaderSource);

        this._meshTransformUpdateCount = -9999;
        this._cameraViewUpdateCount = -9999;
        this._cameraProjectionUpdateCount = -9999;
      }

      setUniforms(gl, glslProgram, material, camera, mesh) {
        super.setUniforms(gl, glslProgram, material, camera, mesh);

        if (this._cameraProjectionUpdateCount !== mesh.updateCountAsCameraProjection) {
          gl.uniformMatrix4fv(glslProgram.projectionMatrix, false, camera.projectionRHMatrix().flatten());
        }

        if (this._cameraViewUpdateCount !== mesh.updateCountAsCameraView || this._meshTransformUpdateCount !== mesh.updateCountAsElement) {
          gl.uniformMatrix4fv(glslProgram.modelViewMatrix, false, camera.lookAtRHMatrix().multiply(mesh.transformMatrix).flatten());
        }

        this._meshTransformUpdateCount = mesh.updateCountAsElement;
        this._cameraViewUpdateCount = camera.updateCountAsCameraView;
        this._cameraProjectionUpdateCount = camera.updateCountAsCameraProjection;

        return true; // still dirty
      }
    }

    if (meshMaterial) {
      meshMaterial.shaderClass = ParticleShader;
    } else {
      this._defaultMaterial.shaderClass = ParticleShader;
    }

    /*
     let materials = this._materials;
     if (materials) {
     for (let i=0; i<materials.length;i++) {
     materials[i].shader = new BlendShapeShader(this._canvas);
     }
     }
     */

    super.prepareToRender(existCamera_f, pointLight, meshMaterial, renderPasses, mesh);
  }

}

GLBoost["Particle"] = Particle;
