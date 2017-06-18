export default class InputUtil {

  constructor() {

  }


  static whichButton(evt) {
    if (evt.which) {
      return (evt.which < 2) ? "left" : ((evt.which == 2) ? "middle" : "right");
    } else {
      return (evt.button < 2) ? "left" : ((evt.button == 4) ? "middle" : "right");
    }
  }
}
