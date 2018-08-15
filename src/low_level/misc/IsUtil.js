
const IsUtil = {
  not: {},
  all: {},
  any: {},

  _not(fn) {
    return function() {
      return !fn.apply(null, [...arguments]);
    };
  },

  _all(fn) {
    return function() {
      return [...arguments].every(fn);
    };
  },

  _any(fn) {
    return function() {
      return [...arguments].some(fn);
    };
  },

  defined(val) {
    return val !== void 0;
  },

  undefined(val) {
    return val === void 0;
  },

  null(val) {
    return val === null;
  },

  // is NOT null or undefined
  exist(val) {
    return val != null;
  },

  function(val) {
    return typeof val === 'function';
  }

}

for (let fn in IsUtil) {
  if (IsUtil.hasOwnProperty(fn)) {
    const interfaces = ['not', 'all', 'any'];
    if (fn.indexOf('_') === -1 && !interfaces.includes(fn)) {
      interfaces.forEach((itf)=>{
        const op = '_' + itf;
        IsUtil[itf][fn] = IsUtil[op](IsUtil[fn]);
      });
    }
  }
}

export default IsUtil;
