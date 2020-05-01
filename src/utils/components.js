export const bind = (thisArg, ...functions) => {
  functions.forEach((currentFunction) => {
    thisArg[currentFunction.name] = currentFunction.bind(thisArg);
  });
};

export const callSafely = (...functions) => {
  functions.forEach((func) => {
    try {
      func();
    } catch (_) {
      return;
    }
  });
};
