import GLBoost from '../../../globals';
import M_Element from '../M_Element';
import Vector3 from '../../../low_level/math/Vector3';
import Vector4 from '../../../low_level/math/Vector4';
import Matrix44 from '../../../low_level/math/Matrix44';
import AABB from '../../../low_level/math/AABB';

export default class M_Mesh extends M_Element {
  constructor(glBoostContext, geometry, material) {
    super(glBoostContext);

    if (geometry) {
      this.geometry = geometry;
    }
    if (material) {
      this.material = material;
    }
    this._transformedDepth = 0;
    this._outlineGizmo = null;
  }

  prepareToRender(expression, existCamera_f, lights) {
    this._geometry.prepareToRender(expression, existCamera_f, lights, this._material, this);
    /*
    if (this._geometry._materials.length === 0 && this._material) {
      let shaderInstance = this._geometry.prepareGLSLProgramAndSetVertexNtoMaterial(expression, this._material, 0, existCamera_f, lights);
      this._geometry._setVertexNtoSingleMaterial(this._material, 0);
      this._material.shaderInstance = shaderInstance;      
      this._material.shaderInstance.vao = this._geometry._getVAO();
      this._geometry.setUpVertexAttribs(this._glContext.gl, shaderInstance._glslProgram, this._geometry._getAllVertexAttribs());
    }
    */
  }

  draw(data) {
    this._geometry.draw(
      {
        expression: data.expression,
        lights: data.lights,
        camera: data.camera,
        scene: data.renderPass.scene,
        renderPassIndex: data.renderPassIndex,
        mesh: this,
        viewport: data.viewport,
        isWebVRMode: data.isWebVRMode,
        webvrFrameData: data.webvrFrameData,
        forceThisMaterial: data.forceThisMaterial,
      }
    );
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
    var mat = this.worldMatrix;
    let componentN = this._geometry._vertices.components.position;
    let length = positions.length / componentN;
    for (let i=0; i<length; i++) {
      let posVector4 = new Vector4(positions[i*componentN], positions[i*componentN+1], positions[i*componentN+2], 1);
      let transformedPosVec = mat.multiplyVector(posVector4);
      positions[i*componentN] = transformedPosVec.x;
      positions[i*componentN+1] = transformedPosVec.y;
      positions[i*componentN+2] = transformedPosVec.z;
      if (componentN > 3) {
        positions[i * componentN+3] = transformedPosVec.w;
      }
    }
    this._geometry._vertices.position = positions;

    if (this._geometry._vertices.normal) {
      var normals = this._geometry._vertices.normal;
      length = normals.length / 3;
      for (let i=0; i<length; i++) {
        let normalVector3 = new Vector3(normals[i*3], normals[i*3+1], normals[i*3+2]);
        let transformedNormalVec = Matrix44.invert(mat).transpose().toMatrix33().multiplyVector(normalVector3).normalize();
        normals[i*3] = transformedNormalVec.x;
        normals[i*3+1] = transformedNormalVec.y;
        normals[i*3+2] = transformedNormalVec.z;
      }
      this._geometry._vertices.normal = normals;
    }

  }

  bakeInverseTransformToGeometry() {
    var positions = this._geometry._vertices.position;
    var invMat = this.inverseWorldMatrix;
    let componentN = this._geometry._vertices.components.position;
    let length = positions.length / componentN;
    for (let i=0; i<length; i++) {
      let posVector4 = new Vector4(positions[i*componentN], positions[i*componentN+1], positions[i*componentN+2], 1);
      let transformedPosVec = invMat.multiplyVector(posVector4);
      positions[i*componentN] = transformedPosVec.x;
      positions[i*componentN+1] = transformedPosVec.y;
      positions[i*componentN+2] = transformedPosVec.z;
      if (componentN > 3) {
        positions[i * componentN+3] = transformedPosVec.w;
      }
    }
    this._geometry._vertices.position = positions;

    let mat = this.worldMatrix;
    if (this._geometry._vertices.normal) {
      var normals = this._geometry._vertices.normal;
      length = normals.length / 3;
      for (let i=0; i<length; i++) {
        let normalVector3 = new Vector3(normals[i*3], normals[i*3+1], normals[i*3+2]);
        let transformedNormalVec = Matrix44.invert(mat).transpose().invert().toMatrix33().multiplyVector(normalVector3).normalize();
        normals[i*3] = transformedNormalVec.x;
        normals[i*3+1] = transformedNormalVec.y;
        normals[i*3+2] = transformedNormalVec.z;
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
      let geometries = [];
      for (let i=0; i<meshes.length; i++) {
        meshes[i].bakeTransformToGeometry();
        geometries.push(meshes[i].geometry);
      }

      this.geometry.merge(geometries);

      for (let i=0; i<meshes.length; i++) {
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
      let geometries = [];
      for (let i=0; i<meshes.length; i++) {
        meshes[i].bakeTransformToGeometry();
        geometries.push(meshes[i].geometry);
      }

      this.geometry.mergeHarder(geometries);

      for (let i=0; i<meshes.length; i++) {
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
    var m_m = null;
    if (this.bindShapeMatrix) {
      m_m = Matrix44.multiply(this.worldMatrix, this.bindShapeMatrix);
    } else {
      m_m = this.worldMatrix;
    }
    var mv_m = viewMatrix.multiply(camera.inverseWorldMatrix).multiply(m_m);

    var centerPosition = this.geometry.centerPosition.toVector4();
    //console.log(this.userFlavorName + " centerPosition: " + centerPosition);
    var transformedCenterPosition = mv_m.multiplyVector(centerPosition);

    this._transformedDepth = transformedCenterPosition.z;//transformedCenterPosition.length();// //
  }

  get transformedDepth() {
    return this._transformedDepth;
  }

  get isTransparent() {
    let isTransparent = (this._opacity < 1.0 || this._transparentByUser) ? true : false;
    isTransparent |= this.geometry.isTransparent(this);
    return isTransparent;
  }

  set isTransparent(flg) {
    this._transparentByUser = flg;
  }

  get AABBInWorld() {
    var world_m = this.worldMatrix;
    return AABB.multiplyMatrix(world_m, this._geometry.rawAABB);
  }

  get AABBInLocal() {
    return this._geometry.rawAABB;//.clone();
  }

  get rawAABBInLocal() {
    return this._geometry.rawAABB;
  }

  getAppropriateMaterials() {
    return this.geometry._getAppropriateMaterials(this);
  }

  rayCast(x, y, camera, viewport) {

    const invPVW = GLBoost.Matrix44.multiply(camera.projectionRHMatrix(), GLBoost.Matrix44.multiply(camera.lookAtRHMatrix(), this.worldMatrix)).invert();
    const origVecInLocal = GLBoost.MathUtil.unProject(new GLBoost.Vector3(x, y, 0), invPVW, viewport);
    const distVecInLocal = GLBoost.MathUtil.unProject(new GLBoost.Vector3(x, y, 1), invPVW, viewport);
    const dirVecInLocal = GLBoost.Vector3.subtract(distVecInLocal, origVecInLocal).normalize();

    const result = this.geometry.rayCast(origVecInLocal, dirVecInLocal);
    let intersectPositionInWorld = null;
    if (result[0]) {
      intersectPositionInWorld = this.worldMatrix.multiplyVector(result[0].toVector4()).toVector3();
    }
    return [intersectPositionInWorld, result[1]];
  }

  get gizmos() {
    if (this.isOutlineVisible) {
      return this._gizmos.concat([this._outlineGizmo]);
    } else {
      return this._gizmos;
    }
  }

  set isOutlineVisible(flg) {
    if (flg && this._outlineGizmo === null) {
      this._outlineGizmo = this._glBoostContext.createOutlineGizmo(this);
    }

    if (this._outlineGizmo) {
      this._outlineGizmo.isVisible = flg;
    }
  }

  get isOutlineVisible() {
    if (this._outlineGizmo === null) {
      return false;
    }
    return this._outlineGizmo.isVisible;
  }

  set isVisible(flg) {
    super.isVisible = flg;
    if (this._outlineGizmo) {
      this._outlineGizmo.isVisible = flg;
    }
  }

  get isVisible() {
    return super.isVisible;
  }

  clone() {
    let instance = new M_Mesh(this._glBoostContext, this.geometry, this.material);
    this._copy(instance);

    return instance;
  }

  _copy(instance) {
    super._copy(instance);
    instance._transformedDepth = this._transformedDepth;
  }

  _needUpdate() {
    super._needUpdate();
  }
}
M_Mesh._geometries = {};

GLBoost['M_Mesh'] = M_Mesh;
