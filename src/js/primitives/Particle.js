import GLBoost from './../globals'
import Element from './../Element'
import GLContext from './../GLContext'
import GLExtentionsManager from './../GLExtentionsManager'
import Geometry from './../Geometry'
import Camera from '../Camera'
import Vector4 from './../math/Vector4'
import Vector3 from './../math/Vector3'
import Vector2 from './../math/Vector2'
import ArrayUtil from '.././misc/ArrayUtil'
import ParticleShaderSource from '../shaders/ParticleShader'

/**
 * This Particle class handles particles expressions.
 * You can define particles behaviors in a custom vertex shader.
 * These particles are processed in GPU, so this is a very fast solution of particles expressions.
 */
export default class Particle extends Geometry {

  /**
   * This is Particle class's constructor
   *
   * @param {Array} centerPointData position array and the other data
   * @param {Number} particleWidth Width of each particle
   * @param {Number} particleHeight Height of each particle
   * @param {Object} JSON which has other vertex attribute arrays you want
   * @param {CanvasElement or String} Canvas Element which is generation source of WebGL context in current use or String which indicates the Canvas Element in jQuery like query string
   */
  constructor(centerPointData, particleWidth, particleHeight, customVertexAttributes, canvas) {
    super(canvas);

    this._setupVertexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes);
  }

  _setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes) {
    var indices = [];
    var positionArray = centerPointData.position;

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

    var positions = [];
    for (let i=0; i<positionArray.length; i++) {
      positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x - pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y + pHalfHeight, positionArray[i].z));
      positions.push(new Vector3(positionArray[i].x + pHalfWidth, positionArray[i].y - pHalfHeight, positionArray[i].z));
    }

    var centerPositions = [];
    for (let i=0; i<positionArray.length; i++) {
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
      centerPositions.push(new Vector3(positionArray[i].x, positionArray[i].y, positionArray[i].z));
    }

    var colors = [];
    var vertexColor = new Vector4(1, 1, 1, 1);
    for (let i=0; i<positionArray.length; i++) {
      for (let j=0; j<4; j++) {
        colors.push(vertexColor);
      }
    }

    var texcoords = [];
    for (let i=0; i<positionArray.length; i++) {
      texcoords.push(new Vector2(0, 0));
      texcoords.push(new Vector2(0, 1));
      texcoords.push(new Vector2(1, 0));
      texcoords.push(new Vector2(1, 1));
    }

    var normals = [];
    var normal = new Vector3(0, 0, 1);
    for (let i=0; i<positionArray.length; i++) {
      for (let j=0; j<4; j++) {
        normals.push(normal);
      }
    }

    var pointData = {};
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
      color: colors,
      texcoord: texcoords,
      normal: normals,
      particleCenterPos: centerPositions
    };

    var tempAttributes = ArrayUtil.merge(object, pointData);
    var completeAttributes = ArrayUtil.merge(tempAttributes, customVertexAttributes);

    return {
      vertexAttributes: completeAttributes,
      indexArray: [indices]
    }
  }

  _setupVertexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes) {
    var result = this._setupVertexAndIndexData(centerPointData, pHalfWidth, pHalfHeight, customVertexAttributes);

    this.setVerticesData(result.vertexAttributes, result.indexArray, GLBoost.TRIANGLE_STRIP);
  }

  updateVerticesData(centerPointData, particleWidth, particleHeight, customVertexAttributes) {
    var result = this._setupVertexAndIndexData(centerPointData, particleWidth/2.0, particleHeight/2.0, customVertexAttributes);

    super.updateVerticesData(result.vertexAttributes);
  }

  prepareForRender(existCamera_f, pointLight, meshMaterial) {
    // before prepareForRender of 'Geometry' class, a new 'BlendShapeShader'(which extends default shader) is assigned.
    var canvas = this._canvas;

    if (meshMaterial) {
      this._materialForBillboard = meshMaterial;
    } else {
      this._materialForBillboard = this._defaultMaterial;
    }

    class ParticleShader extends this._materialForBillboard.shader.constructor {
      constructor(canvas) {
        super(canvas, ParticleShaderSource);
        ParticleShader.mixin(ParticleShaderSource);

        this._meshTransformUpdateCount = -9999;
        this._cameraViewUpdateCount = -9999;
        this._cameraProjectionUpdateCount = -9999;
      }

      setUniforms(gl, glslProgram, material, camera, mesh) {
        super.setUniforms(gl, glslProgram, material, camera, mesh);

        if (this._cameraProjectionUpdateCount !== mesh.updateCountAsCameraProjection) {
          gl.uniformMatrix4fv(glslProgram.projectionMatrix, false, new Float32Array(camera.perspectiveRHMatrix().transpose().flatten()));
        }

        if (this._cameraViewUpdateCount !== mesh.updateCountAsCameraView || this._meshTransformUpdateCount !== mesh.updateCountAsElement) {
          gl.uniformMatrix4fv(glslProgram.modelViewMatrix, false, new Float32Array(camera.lookAtRHMatrix().multiply(mesh.transformMatrix).transpose().flatten()));
        }

        this._meshTransformUpdateCount = mesh.updateCountAsElement;
        this._cameraViewUpdateCount = camera.updateCountAsCameraView;
        this._cameraProjectionUpdateCount = camera.updateCountAsCameraProjection;

        return true; // still dirty
      }
    }

    if (meshMaterial) {
      meshMaterial.shader = new ParticleShader(canvas);
    } else {
      this._defaultMaterial.shader = new ParticleShader(canvas);
    }

    /*
     let materials = this._materials;
     if (materials) {
     for (let i=0; i<materials.length;i++) {
     materials[i].shader = new BlendShapeShader(this._canvas);
     }
     }
     */

    super.prepareForRender(existCamera_f, pointLight, meshMaterial);
  }

}

GLBoost["Particle"] = Particle;
