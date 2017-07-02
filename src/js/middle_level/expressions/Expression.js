import GLBoost from '../../globals';
import GLBoostObject from '../../low_level/core/GLBoostObject';

export default class Expression extends GLBoostObject {

  constructor(glBoostContext) {
    super(glBoostContext);

    this._renderPasses = [];
  }

  addRenderPasses(renderPasses) {
    renderPasses.forEach((renderPass)=>{
      renderPass._expression = this;
    });
    
    this._renderPasses = this._renderPasses.concat(renderPasses);
  }

  addRenderPass(renderPass) {
    renderPath._expression = this;
    this._renderPasses.push(renderPass);
  }

  clearRenderPasses() {
    this._renderPasses.forEach((renderPass)=>{
      renderPass._expression = null;
    });
    this._renderPasses.length = 0;
  }

  get renderPasses() {
    return this._renderPasses;
  }

  setCurrentAnimationValue(inputName, inputValue) {
    for (let renderPass of this.renderPasses) {
      if (renderPass.scene) {
        renderPass.scene.setCurrentAnimationValue(inputName, inputValue);
      }
    }
  }

  prepareToRender() {
    this._renderPasses.forEach((renderPass, index)=>{
      renderPass.prepareToRender(this);
    });
  }

}

GLBoost['Expression'] = Expression;
