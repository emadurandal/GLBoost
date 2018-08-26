import Component from '../core/Component';
import is from '../misc/IsUtil';

export default class AnimationComponent extends Component {
  _animationLine: Object;
  _activeAnimationLineName: string;

  constructor() {
    super();

    this._animationLine = {};
    this._activeAnimationLineName = 'time';
  }

  static get componentTID() {
    return 3;
  }

  _getAnimatedTransformValue(value, animation, type) {
    if (is.exist(animation) && animation[type] && is.exist(value)) {
      return AnimationUtil.interpolate(
        animation[type].input,
        animation[type].output,
        value,
        animation[type].outputComponentN,
        animation[type].interpolationMethod
      );
    } else {
      return null;
    }
  }

  getAnimationInfo(lineName: string) {
    if (lineName !== void 0) {
      
    }
  }
}
