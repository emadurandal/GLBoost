
export default {

  defined(val) {
    return val !== void 0;
  }

  undefined(val) {
    return val === void 0;
  }

  null(val) {
    return === null;
  }

  // is NOT null or undefined
  exist(val) {
    return value != null;
  }

  function(val) {
    return typeof val === 'function';
  }

}
