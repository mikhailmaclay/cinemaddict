export const pluralize = (number, wordForms) => {
  const [one, two, many] = wordForms;

  const mod10 = number % 10;
  const mod100 = number % 100;

  switch (true) {
    case mod100 >= 11 && mod100 <= 20:
      return many || two;

    case mod10 > 5:
      return many || two;

    case mod10 === 1:
      return one;

    case mod10 >= 2 && mod10 <= 4:
      return two;

    default:
      return many || two;
  }
};

