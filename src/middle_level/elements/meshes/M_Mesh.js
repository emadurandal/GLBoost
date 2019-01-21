// @flow

import GLBoost from "../../../globals";
import M_Element from "../M_Element";
import Vector3 from "../../../low_level/math/Vector3";
import Vector4 from "../../../low_level/math/Vector4";
import Matrix44 from "../../../low_level/math/Matrix44";
import AABB from "../../../low_level/math/AABB";
import Matrix33 from "../../../low_level/math/Matrix33";
import MathClassUtil from "../../../low_level/math/MathClassUtil";
import is from "../../../low_level/misc/IsUtil";

export default class M_Mesh extends M_Element {
  _isPickable: boolean;
  _transformedDepth: number;
  _opacity: number;
  _gizmos: Array<M_Mesh>;
  _geometry: any;
  _isOutlineVisible: boolean;
  _outlineWidth: number;
  _outlineColor: Vector4;
  _material: M_Mesh;
  _glBoostSystem: GLBoostSystem;
  bindShapeMatrix: Matrix44;
  _isTransparentForce: boolean;

  constructor(glBoostContext: glBoostContext, geometry: any, material: any) {
    super(glBoostContext);

    if (geometry) {
      this.geometry = geometry;
    }
    if (material) {
      this.material = material;
    }
    this._transformedDepth = 0;
    this._outlineGizmo = null;
    this._isPickable = true;
    this._isTransparentForce = false;
    this._isOutlineVisible = false;
    this._outlineWidth = 100;
    this._outlineColor = new Vector4(0, 1, 0, 1);
  }

  prepareToRender(expression: any, existCamera_f: any, lights: any) {
    this._geometry.prepareToRender(
      expression,
      existCamera_f,
      lights,
      this._material,
      this
    );
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

  draw(data: any) {
    this._geometry.draw({
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
      isOutlineMode: data.isOutlineMode
    });
  }

  set geometry(geometry: any) {
    this._geometry = geometry;
    geometry._parent = this;
    M_Mesh._geometries[geometry.toString()] = geometry;
  }

  get geometry() {
    return this._geometry;
  }

  set material(material: any) {
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
    for (let i = 0; i < length; i++) {
      let posVector4 = new Vector4(
        positions[i * componentN],
        positions[i * componentN + 1],
        positions[i * componentN + 2],
        1
      );
      let transformedPosVec = mat.multiplyVector(posVector4);
      positions[i * componentN] = transformedPosVec.x;
      positions[i * componentN + 1] = transformedPosVec.y;
      positions[i * componentN + 2] = transformedPosVec.z;
      if (componentN > 3) {
        positions[i * componentN + 3] = transformedPosVec.w;
      }
    }
    this._geometry._vertices.position = positions;

    if (this._geometry._vertices.normal) {
      var normals = this._geometry._vertices.normal;
      length = normals.length / 3;
      for (let i = 0; i < length; i++) {
        let normalVector3 = new Vector3(
          normals[i * 3],
          normals[i * 3 + 1],
          normals[i * 3 + 2]
        );
        let transformedNormalVec = this.normalMatrix
          .multiplyVector(normalVector3)
          .normalize();
        normals[i * 3] = transformedNormalVec.x;
        normals[i * 3 + 1] = transformedNormalVec.y;
        normals[i * 3 + 2] = transformedNormalVec.z;
      }
      this._geometry._vertices.normal = normals;
    }
  }

  bakeInverseTransformToGeometry() {
    var positions = this._geometry._vertices.position;
    var invMat = this.inverseWorldMatrix;
    let componentN = this._geometry._vertices.components.position;
    let length = positions.length / componentN;
    for (let i = 0; i < length; i++) {
      let posVector4 = new Vector4(
        positions[i * componentN],
        positions[i * componentN + 1],
        positions[i * componentN + 2],
        1
      );
      let transformedPosVec = invMat.multiplyVector(posVector4);
      positions[i * componentN] = transformedPosVec.x;
      positions[i * componentN + 1] = transformedPosVec.y;
      positions[i * componentN + 2] = transformedPosVec.z;
      if (componentN > 3) {
        positions[i * componentN + 3] = transformedPosVec.w;
      }
    }
    this._geometry._vertices.position = positions;

    let mat = this.worldMatrix;
    if (this._geometry._vertices.normal) {
      var normals = this._geometry._vertices.normal;
      length = normals.length / 3;
      for (let i = 0; i < length; i++) {
        let normalVector3 = new Vector3(
          normals[i * 3],
          normals[i * 3 + 1],
          normals[i * 3 + 2]
        );
        const invNormalMat = new Matrix33(
          Matrix44.invert(mat)
            .transpose()
            .invert()
        );
        let transformedNormalVec = invNormalMat
          .multiplyVector(normalVector3)
          .normalize();
        normals[i * 3] = transformedNormalVec.x;
        normals[i * 3 + 1] = transformedNormalVec.y;
        normals[i * 3 + 2] = transformedNormalVec.z;
      }
      this._geometry._vertices.normal = normals;
    }
  }

  _copyMaterials() {
    if (
      this.geometry._indicesArray.length !== this.geometry._materials.length
    ) {
      for (let i = 0; i < this.geometry._indicesArray.length; i++) {
        this.geometry._materials[i] = this._material; //.clone();
        this.geometry._materials[i].setVertexN(
          this.geometry,
          this.geometry._indicesArray[i].length
        );
      }
    }
  }

  merge(meshOrMeshes: M_Mesh | Array<M_Mesh>) {
    if (Array.isArray(meshOrMeshes)) {
      this.bakeTransformToGeometry();

      let meshes = meshOrMeshes;
      let geometries = [];
      for (let i = 0; i < meshes.length; i++) {
        meshes[i].bakeTransformToGeometry();
        geometries.push(meshes[i].geometry);
      }

      this.geometry.merge(geometries);

      for (let i = 0; i < meshes.length; i++) {
        delete meshes[i];
      }

      this._copyMaterials();

      this.bakeInverseTransformToGeometry();
    } else {
      //
      let mesh = meshOrMeshes;
      mesh.bakeTransformToGeometry();
      this.bakeTransformToGeometry();
      this.geometry.merge(mesh.geometry);

      this._copyMaterials();

      this.bakeInverseTransformToGeometry();
    }
  }

  mergeHarder(meshOrMeshes: M_Mesh | Array<M_Mesh>) {
    if (Array.isArray(meshOrMeshes)) {
      this.bakeTransformToGeometry();

      let meshes = meshOrMeshes;
      let geometries = [];
      for (let i = 0; i < meshes.length; i++) {
        meshes[i].bakeTransformToGeometry();
        geometries.push(meshes[i].geometry);
      }

      this.geometry.mergeHarder(geometries);

      for (let i = 0; i < meshes.length; i++) {
        delete meshes[i];
      }

      this.bakeInverseTransformToGeometry();
    } else {
      //
      let mesh = meshOrMeshes;
      mesh.bakeTransformToGeometry();
      this.bakeTransformToGeometry();
      this.geometry.mergeHarder(mesh.geometry);

      this.bakeInverseTransformToGeometry();
    }
  }

  calcTransformedDepth(camera: any) {
    var viewMatrix = camera.lookAtRHMatrix();
    var m_m = null;
    if (this.bindShapeMatrix) {
      m_m = Matrix44.multiply(this.worldMatrix, this.bindShapeMatrix);
    } else {
      m_m = this.worldMatrix;
    }
    var mv_m = viewMatrix.multiply(camera.inverseWorldMatrix).multiply(m_m);

    var centerPosition = new Vector4(this.geometry.centerPosition);
    //console.log(this.userFlavorName + " centerPosition: " + centerPosition);
    var transformedCenterPosition = mv_m.multiplyVector(centerPosition);

    this._transformedDepth = transformedCenterPosition.z; //transformedCenterPosition.length();// //
  }

  get transformedDepth() {
    return this._transformedDepth;
  }

  get isTransparent() {
    let isTransparent = this._opacity < 1.0 ? true : false;
    isTransparent = isTransparent || this._isTransparentForce;
    isTransparent = isTransparent || this._isTransparentForce;
    return isTransparent;
  }

  set isTransparent(flg: boolean) {
    this._isTransparentForce = flg;
  }

  get AABBInWorld() {
    var world_m = this.worldMatrix;
    return AABB.multiplyMatrix(world_m, this._geometry.rawAABB);
  }

  get AABBInLocal() {
    return this._geometry.rawAABB; //.clone();
  }

  get rawAABBInLocal() {
    return this._geometry.rawAABB;
  }

  getAppropriateMaterials() {
    return this.geometry._getAppropriateMaterials(this);
  }

  rayCast(
    arg1: Vector3,
    arg2: number,
    camera: any,
    viewport: any,
    dotThreshold: number = 0
  ) {
    let origVecInLocal = null;
    let dirVecInLocal = null;
    if (arg1 instanceof Vector3 && arg2 instanceof Vector3) {
      const origVecInWorld = arg1;
      const dirVec = arg2;
      const invWorldMatrix = Matrix44.invert(this.worldMatrix);
      origVecInLocal = new Vector3(
        invWorldMatrix.multiplyVector(new Vector4(origVecInWorld))
      );
      const distVecInWorld = Vector3.add(origVecInWorld, dirVec);
      const distVecInLocal = new Vector3(
        invWorldMatrix.multiplyVector(new Vector4(distVecInWorld))
      );
      dirVecInLocal = Vector3.subtract(
        distVecInLocal,
        origVecInLocal
      ).normalize();
    } else {
      const x = arg1;
      const y = arg2;
      const invPVW = Matrix44.multiply(
        camera.projectionRHMatrix(),
        Matrix44.multiply(camera.lookAtRHMatrix(), this.worldMatrix)
      ).invert();
      origVecInLocal = MathClassUtil.unProject(
        new Vector3(x, y, 0),
        invPVW,
        viewport
      );
      const distVecInLocal = MathClassUtil.unProject(
        new Vector3(x, y, 1),
        invPVW,
        viewport
      );
      dirVecInLocal = Vector3.subtract(
        distVecInLocal,
        origVecInLocal
      ).normalize();
    }

    const material = this.getAppropriateMaterials()[0];

    const gl = this._glContext.gl;
    const isCulling = material.states.enable.includes(gl.CULL_FACE);
    const cullMode = is.exist(material.states.functions.cullFace)
      ? material.states.functions.cullFace
      : gl.BACK;

    let isFrontFacePickable = true;
    let isBackFacePickable = true;
    if (isCulling) {
      if (cullMode === gl.FRONT) {
        isFrontFacePickable = false;
      } else if (cullMode === gl.BACK) {
        isBackFacePickable = false;
      } else {
        isFrontFacePickable = false;
        isBackFacePickable = false;
      }
    }
    const result = this.geometry.rayCast(
      origVecInLocal,
      dirVecInLocal,
      isFrontFacePickable,
      isBackFacePickable,
      dotThreshold
    );
    let intersectPositionInWorld = null;
    if (result[0]) {
      intersectPositionInWorld = new Vector3(
        this.worldMatrix.multiplyVector(new Vector4(result[0]))
      );
    }
    return [intersectPositionInWorld, result[1]];
  }

  get gizmos() {
    return this._gizmos;
  }

  set isOutlineVisible(flg: boolean) {
    this._isOutlineVisible = flg;
  }

  get isOutlineVisible() {
    return this._isOutlineVisible;
  }

  get outlineWidth() {
    return this._outlineWidth;
  }

  set outlineWidth(val: number) {
    this._outlineWidth = val;
  }

  get outlineColor() {
    return this._outlineColor;
  }

  set outlineColor(vec: Vector4) {
    this._outlineColor = vec;
  }

  set isVisible(flg: boolean) {
    super.isVisible = flg;
    if (this._outlineGizmo) {
      this._outlineGizmo.isVisible = flg;
    }
  }

  get isVisible() {
    return super.isVisible;
  }

  clone() {
    let instance = new M_Mesh(
      this._glBoostSystem,
      this.geometry,
      this.material
    );
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

  set isPickable(flag: boolean) {
    this._isPickable = flag;
  }

  get isPickable() {
    return this._isPickable;
  }

  readyForDiscard() {
    const materials = this.getAppropriateMaterials();
    for (let material of materials) {
      material.readyForDiscard();
    }
  }
}
M_Mesh._geometries = {};

GLBoost["M_Mesh"] = M_Mesh;
