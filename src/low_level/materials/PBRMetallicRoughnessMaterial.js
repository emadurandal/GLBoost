// @flow

import GLBoost from '../../globals';
import glBoostSystem from '../core/GLBoostSystem';
import L_AbstractMaterial from './L_AbstractMaterial';
import Vector2 from '../math/Vector2';
import Vector3 from '../math/Vector3';
import PBRPrincipledShader from '../../middle_level/shaders/PBRPrincipledShader';

export default class PBRMetallicRoughnessMaterial extends L_AbstractMaterial {
  _wireframeWidthRelativeScale: number;
  _baseColorFactor: Vector3;
  _metallicRoughnessFactors: Vector2;
  _occlusionFactor: number;
  _emissiveFactor: Vector3;
  _occlusionRateForDirectionalLight: number;
  _IBLSpecularTextureMipmapCount: number;
  _IBLDiffuseContribution: number;
  _IBLSpecularContribution: number;
  _shaderClass: PBRPrincipledShader;

  constructor(glBoostSystem: glBoostSystem) {
    super(glBoostSystem);

    this._wireframeWidthRelativeScale = 1.0;

    this._baseColorFactor = new Vector3(1.0, 1.0, 1.0);
    this._metallicRoughnessFactors = new Vector2(1.0, 1.0);
    this._occlusionFactor = 1.0;
    this._emissiveFactor = new Vector3(0.0, 0.0, 0.0);
    this._occlusionRateForDirectionalLight = 0.2;
    this._IBLSpecularTextureMipmapCount = 9;
    this._IBLDiffuseContribution = 0.2;
    this._IBLSpecularContribution = 0.2;

    this._shaderClass = PBRPrincipledShader;
  }

  get wireframeWidthRelativeScale() {
    return this._wireframeWidthRelativeScale;
  }

  set baseColor(val: Vector3) {
    this._baseColorFactor = val.clone();
  }

  get baseColor() {
    return this._baseColorFactor.clone();
  }

  set metallic(val: number) {
    this._metallicRoughnessFactors.x = val;
  }

  get metallic() {
    return this._metallicRoughnessFactors.x;
  }

  set roughness(val: number) {
    this._metallicRoughnessFactors.y = val;
  }

  get roughness() {
    return this._metallicRoughnessFactors.y;
  }

  set emissive(val: Vector3) {
    this._emissiveFactor = val;
  }

  get emissive() {
    return this._emissiveFactor;
  }
  
  set occlusion(val: number) {
    this._occlusionFactor = val;
  }

  get occlusion() {
    return this._occlusionFactor;
  }

  set occlusionRateForDirectionalLight(val: number) {
    this._occlusionRateForDirectionalLight = val;
  }

  get occlusionRateForDirectionalLight() {
    return this._occlusionRateForDirectionalLight;
  }

  set IBLSpecularTextureMipmapCount(val: number) {
    this._IBLSpecularTextureMipmapCount = val;
  }

  get IBLSpecularTextureMipmapCount() {
    return this._IBLSpecularTextureMipmapCount;
  }

  set IBLDiffuseContribution(val: number) {
    this._IBLDiffuseContribution = val;
  }

  get IBLDiffuseContribution() {
    return this._IBLDiffuseContribution;
  }

  set IBLSpecularContribution(val: number) {
    this._IBLSpecularContribution = val;
  }

  get IBLSpecularContribution() {
    return this._IBLSpecularContribution;
  }
}

GLBoost['PBRMetallicRoughnessMaterial'] = PBRMetallicRoughnessMaterial;
