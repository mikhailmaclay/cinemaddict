export const castLots = (eagle, tails) => {
  let result = Math.random() > 0.5;

  if (eagle && tails) {
    result = Math.random() > 0.5 ? eagle : tails;
  }

  return result;
};

export const getRandomNumberFromRange = (min, max) => Math.abs(min + Math.round(max * Math.random()));

export const getRandomArrayValue = (array, repetitions) => {
  let value = null;

  do {
    value = array[getRandomNumberFromRange(0, array.length - 1)];

    if (!repetitions || array === repetitions) {
      return value;
    }
  } while (repetitions.includes(value));

  return value;
};

export const getRandomObjectValue = (object) => {
  const objectValues = Object.values(object);

  return getRandomArrayValue(objectValues);
};
