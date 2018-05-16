import Matrix44 from '../../../low_level/math/Matrix44';
import Vector4 from '../../../low_level/math/Vector4';

export default class SPVJointGizmoUpdater {
  static update(joints, jointZeroTransformMatrixAccumulatedAncestry) {
    if (joints[0].isVisible) {
      for (let i=0; i<joints.length; i++) {

        let backOfJointMatrix = Matrix44.identity();
        let tipOfJointMatrix = null;


        tipOfJointMatrix = joints[i].jointPoseMatrix;
        if (i > 0) {
          let backOfJoint = joints[i].jointsOfParentHierarchies[joints[i].jointsOfParentHierarchies.length - 1];
          if (backOfJoint) {
            backOfJointMatrix = backOfJoint.jointPoseMatrix;
          } else {
            joints[i].isVisible = false;
          }
        } else {
          backOfJointMatrix = jointZeroTransformMatrixAccumulatedAncestry;
        }

        let backOfJointPos = backOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();
        let tipOfJointPos = tipOfJointMatrix.multiplyVector(Vector4.zero()).toVector3();

        joints[i].worldPositionOfThisJoint = tipOfJointPos.clone();
        joints[i].worldPositionOfParentJoint = backOfJointPos.clone();


        joints[i].updateGizmoDisplay();
      }
    }
  }
}

GLBoost['JointGizmoUpdater'] = SPVJointGizmoUpdater;
