const Config = {
  ROOT: document.getElementById(`root`),
  FILM_CARDS_COUNT_AT_START: 5,
  EXTRA_FILM_CARDS_COUNT: 2,
  FILM_CARDS_COUNT_BY_LOAD: 5,
  FILM_CARD_DESCRIPTION_MAX_LENGTH: 140,
  PROFILE_RANK: [
    {name: `Novice`, fromWatchedFilmsCount: 1},
    {name: `Fan`, fromWatchedFilmsCount: 11},
    {name: `Movie buff`, fromWatchedFilmsCount: 21},
  ],
  END_POINT: `https://htmlacademy-es-10.appspot.com/cinemaddict`,
  STORE_PREFIX: `cinemaddict-localstorage`,
  STORE_VER: `v1`,
  AUTHORIZATION: `Basic dXNlckBwYXNzd29yZAo=`
};

Config.STORE_NAME = `${Config.STORE_PREFIX}-${Config.STORE_VER}`;

export default Config;
