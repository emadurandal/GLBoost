

export default class Component {
  constructor() {

  }

  static get componentUID() {
    return 0;
  }

  registerDependency(component, isMust) {

  }

  $create() {
    // Define process dependencies with other components.
    // If circular depenencies are detected, the error will be repoated.

    // this.registerDependency(TransformComponent);
  }

  $load() {
    
  }

  $mount() {

  }

  $updateLogic() {

  }

  $updateForRendering() {

  }

  $render() {

  }

  $discard() {
    
  }
}
