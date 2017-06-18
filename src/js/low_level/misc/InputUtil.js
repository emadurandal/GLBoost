export default class InputUtil {

  constructor() {

  }


  static whichButton(evt) {
    if (typeof evt.which !== `undefined`) {
      return (evt.which === 1) ? "left" : ((evt.which === 3) ? "right" : "middle");
    } else {
      return (evt.button === 1) ? "left" : ((evt.button === 4) ? "middle" : "right");
    }
  }
}
