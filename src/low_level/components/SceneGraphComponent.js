import Component from '../core/Component';
import TransformComponent from './TransformComponent';

export default class SceneGraphComponent extends Component {

  constructor() {

  }

  static get componentTID() {
    return 1;
  }

  $create() {
    // Define process dependencies with other components.
    // If circular depenencies are detected, the error will be repoated.

    this.registerDependency(AnimationComponent.componentTID, false);
  }
}
