import CubeAbsolute from '../../../low_level/primitives/CubeAbsolute';
import M_Mesh from '../meshes/M_Mesh';
import ClassicMaterial from '../../../low_level/materials/ClassicMaterial';

export default class M_AABBGizmo extends M_Mesh {
  constructor(glBoostContext) {
    super(glBoostContext, new CubeAbsolute(glBoostContext), new ClassicMaterial(glBoostContext));
  }

  updateGizmoDisplay(minPosition, maxPosition) {
    this.geometry.update(minPosition, maxPosition);
  }


}
