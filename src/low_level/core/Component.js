// @flow

export default class Component {
  _component_sid: number;

  constructor() {
    this._component_sid = 0;
  }

  static get componentTID() {
    return 0;
  }

  get componentSID() {
    return this._component_sid;
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
