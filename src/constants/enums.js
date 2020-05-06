export const RenderPosition = {
  START: `START`,
  END: `END`,
  BEFORE: `BEFORE`,
  AFTER: `AFTER`
};

export const DateFormat = {
  FILM_CARD_DATE: `YYYY`,
  FILM_DETAILS_DATE: `DD MMMM YYYY`,
  FILM_RUNTIME: `H[h] mm[m]`,
  COMMENT_DATE: `YYYY[/]MM[/]DD HH[:]mm`,
  FROM_NOW: `FROM_NOW`,
  STATISTIC_TOTAL_DURATION_MINUTES: `mm[<span class="statistic__item-description">m</span>]`
};

export const TimeValue = {
  MILLISECOND: {
    SECOND: 1000,
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
  FILM_DETAILS_MODAL: /\/films\/([0-9]+)$/,
  STATISTIC_PAGE: /\/stats\/?$/,
  NOT_FOUND_PAGE: /\/404\/?$/
};

export const TimePeriodName = {
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const SearchRegExp = {
  SORTING: /sorting=([a-z0-9]+)/,
  SORTING_DATE: /sorting=date/,
  SORTING_RATING: /sorting=rating/,
  PERIOD: /period=([a-z0-9]+)/,
  PERIOD_TODAY: /period=today/,
  PERIOD_WEEK: /period=week/,
  PERIOD_MONTH: /period=month/,
  PERIOD_YEAR: /period=year/,
};

export const SortingType = {
  DATE: `date`,
  RATING: `rating`
};

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

PageTitle.WATCHLIST_PAGE = `Watchlist - ${PageTitle.MAIN_PAGE}`;
PageTitle.HISTORY_PAGE = `History - ${PageTitle.MAIN_PAGE}`;
PageTitle.FAVORITES_PAGE = `Favorites - ${PageTitle.MAIN_PAGE}`;
PageTitle.STATISTIC_PAGE = `Statistic - ${PageTitle.MAIN_PAGE}`;
PageTitle.NOT_FOUND_PAGE = `Not found - ${PageTitle.MAIN_PAGE}`;

export const Notification = {
  WELCOME: [`Welcome!`, `Welcome to the Cinemaddict. Glad to see you. We inform you that we do not collect any cookies.`],
  CONNECTION_LOST: [`Connection lost`, `The connection is lost, but don’t worry, you can continue to use the site, and we will notify you when everything is working out.`],
  CONNECTION_RESTORED: [`Connection restored`, `Connection restored. Do not worry, now all data is synchronized. Thank you for staying with us.`],
  READ_FILMS_FAILURE: [`Something went wrong`, `Films was not loaded due to some server problems.`],
  CREATE_COMMENT_FAILURE: [`Something went wrong`, `Your comment was not added due to some server problem.`],
  DELETE_COMMENT_FAILURE: [`Something went wrong`, `The comment was not deleted due to some server problems.`]
};

export const NotificationTimeValue = {
  SHORT: TimeValue.MILLISECOND.SECOND,
  MEDIUM: TimeValue.MILLISECOND.SECOND * 2,
  LONG: TimeValue.MILLISECOND.SECOND * 5
};

export const KeyCode = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};
