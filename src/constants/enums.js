export const InsertAdjacentHTMLPosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

export const RenderPosition = {
  START: `START`,
  END: `END`
};

export const Emotion = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

export const DateFormat = {
  FILM_CARD_DATE: `YYYY`,
  FILM_DETAILS_DATE: `DD MMMM YYYY`,
  FILM_RUNTIME: `H[h] mm[m]`,
  COMMENT_DATE: `YYYY[/]MM[/]DD HH[:]mm`
};

export const TimeValue = {
  MILLISECOND: {
    MINUTE: 1000 * 60
  }
};

export const PathName = {
  NOT_FOUND_PAGE: `/404`
};

export const PathNameRegExp = {
  MAIN_PAGE: /\/$/,
  WATCHLIST_PAGE: /\/watchlist\/?$/,
  HISTORY_PAGE: /\/history\/?$/,
  FAVORITES_PAGE: /\/favorites\/?$/,
  FILM_DETAILS_MODAL: new RegExp(`\\/films\\/(?<filmID>[0-9]+)$`), // Из-за Eslint пришлось сотворить эту ахинею.
  STATISTIC_PAGE: /\/stats\/?$/,
  NOT_FOUND_PAGE: /\/404\/?$/
};

export const SearchRegExp = {
  SORTING: new RegExp(`sorting=(?<sortingType>[a-z0-9]+)`), // Из-за Eslint пришлось сотворить эту ахинею.
  SORTING_DATE: /sorting=date/,
  SORTING_RATING: /sorting=rating/
};

// export const SortingType = {
//   DATE: `date`,
//   RATING: `rating`
// };

export const HTTPMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const HTTPResponseStatus = {
  OK: 200,
  MULTIPLE_CHOICE: 300
};

export const PageTitle = {
  MAIN_PAGE: `Cinemaddict`,
};

PageTitle.WATCHLIST_PAGE = `Watchlist / ${PageTitle.MAIN_PAGE}`;
PageTitle.HISTORY_PAGE = `History / ${PageTitle.MAIN_PAGE}`;
PageTitle.FAVORITES_PAGE = `Favorites / ${PageTitle.MAIN_PAGE}`;
PageTitle.STATISTIC_PAGE = `Statistic / ${PageTitle.MAIN_PAGE}`;
PageTitle.NOT_FOUND_PAGE = `Not found / ${PageTitle.MAIN_PAGE}`;
