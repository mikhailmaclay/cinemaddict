export const compose = (...functions) => {
  return (argument) => functions.reduce((accumulator, currentFunction) => currentFunction(accumulator), argument);
};

export const isNull = (value) => !value && typeof value === `object`;
