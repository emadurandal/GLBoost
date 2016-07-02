import Vector3 from '../../math/Vector3';
import Element from '../Element';
import Matrix44 from '../../math/Matrix44';

export default class OrthoCamera extends Element {
  constructor(glBoostContext, lookat, ortho) {
    super(glBoostContext);
  }
}
