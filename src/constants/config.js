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
  END_POINT: `https://11.ecmascript.pages.academy/cinemaddict`,
  AUTHORIZATION: `Basic dXNlckBwYXN`,
  LOCAL_STORE_PREFIX: `cinemaddict-local-storage`,
  LOCAL_STORE_VER: `v1`,
  SESSION_STORE_PREFIX: `cinemaddict-session-storage`,
  SESSION_STORE_VER: `v1`
};

Config.LOCAL_STORE_NAME = `${Config.LOCAL_STORE_PREFIX}-${Config.LOCAL_STORE_VER}`;
Config.SESSION_STORE_NAME = `${Config.SESSION_STORE_PREFIX}-${Config.SESSION_STORE_VER}`;

export default Config;
