import GLBoost from '../../../globals';
import M_Element from '../M_Element';
import Vector3 from '../../../low_level/math/Vector3';
import Vector4 from '../../../low_level/math/Vector4';
import Matrix44 from '../../../low_level/math/Matrix44';
import AABB from '../../../low_level/math/AABB';

export default class M_Mesh extends M_Element {
  constructor(glBoostContext, geometry, material) {
    super(glBoostContext);
    this.geometry = geometry;
    this.material = material;
    this._transformedDepth = 0;
  }

  prepareToRender(existCamera_f, lights) {
    this._geometry.prepareToRender(existCamera_f, lights, this._material, this);
    if (this._geometry._materials.length === 0 && this._material) {
      this._material = this._geometry.prepareGLSLProgramAndSetVertexNtoMaterial(this._material, 0, existCamera_f, lights);
    }
  }

  draw(lights, camera, scene, renderPassIndex) {
    this._geometry.draw(lights, camera, this, scene, renderPassIndex);
  }

  set geometry(geometry) {
    this._geometry = geometry;
    geometry._parent = this;
    M_Mesh._geometries[geometry.toString()] = geometry;
  }

  get geometry() {
    return this._geometry;
  }

  set material(material) {
    this._material = material;
  }

  get material() {
    return this._material;
  }

  bakeTransformToGeometry() {
    var positions = this._geometry._vertices.position;
    var mat = this.transformMatrixAccumulatedAncestry;
    for (let i=0; i<positions.length; i++) {
      let posVector4 = new Vector4(positions[i].x, positions[i].y, positions[i].z, 1);
      let transformedPosVec = mat.multiplyVector(posVector4);
      positions[i] = new Vector3(transformedPosVec.x, transformedPosVec.y, transformedPosVec.z);
    }
    this._geometry._vertices.position = positions;


    if (this._geometry._vertices.normal) {
      var normals = this._geometry._vertices.normal;
      for (let i=0; i<normals.length; i++) {
        let normalVector3 = normals[i];
        let transformedNormalVec = Matrix44.invert(mat).transpose().toMatrix33().multiplyVector(normalVector3).normalize();
        normals[i] = new Vector3(transformedNormalVec.x, transformedNormalVec.y, transformedNormalVec.z);
      }
      this._geometry._vertices.normal = normals;
    }

  }

  bakeInverseTransformToGeometry() {
    var positions = this._geometry._vertices.position;
    var invMat = this.inverseTransformMatrixAccumulatedAncestry;
    for (let i=0; i<positions.length; i++) {
      let posVector4 = new Vector4(positions[i].x, positions[i].y, positions[i].z, 1);
      let transformedPosVec = invMat.multiplyVector(posVector4);
      positions[i] = new Vector3(transformedPosVec.x, transformedPosVec.y, transformedPosVec.z);
    }
    this._geometry._vertices.position = positions;

    let mat = this.transformMatrixAccumulatedAncestry;
    if (this._geometry._vertices.normal) {
      var normals = this._geometry._vertices.normal;
      for (let i=0; i<normals.length; i++) {
        let normalVector3 = normals[i];
        let transformedNormalVec = Matrix44.invert(mat).transpose().invert().toMatrix33().multiplyVector(normalVector3).normalize();
        normals[i] = new Vector3(transformedNormalVec.x, transformedNormalVec.y, transformedNormalVec.z);
      }
      this._geometry._vertices.normal = normals;
    }

  }

  _copyMaterials() {
    if (this.geometry._indicesArray.length !== this.geometry._materials.length) {
      for (let i=0; i<this.geometry._indicesArray.length;i++) {
        this.geometry._materials[i] = this._material;//.clone();
        this.geometry._materials[i].setVertexN(this.geometry, this.geometry._indicesArray[i].length);
      }
    }
  }

  merge(meshOrMeshes) {
    if (Array.isArray(meshOrMeshes)) {
      this.bakeTransformToGeometry();

      let meshes = meshOrMeshes;
      for (let i=0; i<meshes.length; i++) {
        meshes[i].bakeTransformToGeometry();
        this.geometry.merge(meshes[i].geometry);
        delete meshes[i];
      }

      this._copyMaterials();

      this.bakeInverseTransformToGeometry();

    } else { //
      let mesh = meshOrMeshes;
      mesh.bakeTransformToGeometry();
      this.bakeTransformToGeometry();
      this.geometry.merge(mesh.geometry);

      this._copyMaterials();

      this.bakeInverseTransformToGeometry();
    }
  }

  mergeHarder(meshOrMeshes) {

    if (Array.isArray(meshOrMeshes)) {

      this.bakeTransformToGeometry();

      let meshes = meshOrMeshes;
      for (let i=0; i<meshes.length; i++) {
        meshes[i].bakeTransformToGeometry();
        this.geometry.mergeHarder(meshes[i].geometry);
        delete meshes[i];
      }

      this.bakeInverseTransformToGeometry();

    } else { //
      let mesh = meshOrMeshes;
      mesh.bakeTransformToGeometry();
      this.bakeTransformToGeometry();
      this.geometry.mergeHarder(mesh.geometry);

      this.bakeInverseTransformToGeometry();
    }
  }

  calcTransformedDepth(camera) {
    var viewMatrix = camera.lookAtRHMatrix();
    var m_m = this.transformMatrixAccumulatedAncestry;
    var mv_m = viewMatrix.multiply(camera.inverseTransformMatrixAccumulatedAncestryWithoutMySelf).multiply(m_m);

    var centerPosition = this.geometry.centerPosition.toVector4();
    var transformedCenterPosition = mv_m.multiplyVector(centerPosition);

    this._transformedDepth = transformedCenterPosition.z;
  }

  get transformedDepth() {
    return this._transformedDepth;
  }

  get AABB() {
    var world_m = this.transformMatrixAccumulatedAncestry;
    return AABB.multiplyMatrix(world_m, this._geometry.AABB);
  }

}
M_Mesh._geometries = {};

GLBoost['M_Mesh'] = M_Mesh;
