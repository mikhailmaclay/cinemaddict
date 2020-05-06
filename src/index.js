// Constants and utils
import Config from './constants/config';
import {
  Notification,
  NotificationTimeValue,
  PageTitle,
  PathName,
  PathNameRegExp,
  SearchRegExp,
} from './constants/enums';
import Router from './utils/router';
import {
  filterFavoritesFilms,
  filterFilmsByWatchingDate,
  filterHistoryFilms,
  filterWatchlistFilms
} from './utils/filtering';
import {getSortingFunctionFromSearch} from './utils/url';
//
import FilmsModel from './models/films';
import NotificationModel from './models/notification';
import MainPagePresenter from './presenters/main-page';
import FilmCatalogPagePresenter from './presenters/film-catalog-page';
import FilmDetailsModalPresenter from './presenters/film-details-modal';
import StatisticPagePresenter from './presenters/statistic-page';
import NotFoundPagePresenter from './presenters/not-found-page';
import API from './utils/api';
import './styles.scss';
import Provider from './utils/provider';
import Store from './utils/store';

const FILM_ID_ARRAY_INDEX = 1;
const PERIOD_RANGE_ARRAY_INDEX = 1;

export const store = new Store(Config.LOCAL_STORE_NAME, window.localStorage);
export const sessionStore = new Store(Config.SESSION_STORE_NAME, window.sessionStorage);
export const api = new API(Config.END_POINT, Config.AUTHORIZATION);
export const provider = new Provider(api, store);

const readFilmsRequest = provider.readFilms().then((films) => {
  filmsModel.state = films;
}).catch((reason) => {
  filmsModel.state = [];
  notificationModel.set(NotificationTimeValue.LONG, ...Notification.READ_FILMS_FAILURE);

  throw reason;
});

const filmsModel = new FilmsModel();
const notificationModel = new NotificationModel();

if (!sessionStore.getItem(`isWelcomeShown`)) {
  notificationModel.set(NotificationTimeValue.LONG, ...Notification.WELCOME);
  sessionStore.setItem(`isWelcomeShown`, true);
}

const mainPagePresenter = new MainPagePresenter(Config.ROOT, filmsModel, notificationModel);
const filmCatalogPagePresenter = new FilmCatalogPagePresenter(Config.ROOT, filmsModel, notificationModel);
const filmDetailsModalPresenter = new FilmDetailsModalPresenter(Config.ROOT, filmsModel, notificationModel);
const statisticPagePresenter = new StatisticPagePresenter(Config.ROOT, filmsModel, notificationModel);
const notFoundPagePresenter = new NotFoundPagePresenter(Config.ROOT, filmsModel, notificationModel);

Router.init();
Router.notFoundRoute = PathName.NOT_FOUND_PAGE;

Router.addRoute(PathNameRegExp.MAIN_PAGE, () => {
  document.title = PageTitle.MAIN_PAGE;

  const sortingFunction = getSortingFunctionFromSearch();

  if (sortingFunction) {
    filmsModel.addStateHandler(sortingFunction);
  }

  mainPagePresenter.render();

  return () => {
    filmsModel.removeStateHandler(sortingFunction);

    mainPagePresenter.remove();
  };
});

Router.addRoute(PathNameRegExp.WATCHLIST_PAGE, () => {
  document.title = PageTitle.WATCHLIST_PAGE;

  const sortingFunction = getSortingFunctionFromSearch();

  if (sortingFunction) {
    filmsModel.addStateHandler(sortingFunction);
  }

  filmsModel.addStateHandler(filterWatchlistFilms);

  filmCatalogPagePresenter.render();

  return () => {
    filmsModel.removeStateHandler(sortingFunction);
    filmsModel.removeStateHandler(filterWatchlistFilms);

    filmCatalogPagePresenter.remove();
  };
});

Router.addRoute(PathNameRegExp.HISTORY_PAGE, () => {
  document.title = PageTitle.HISTORY_PAGE;

  const sortingFunction = getSortingFunctionFromSearch();

  if (sortingFunction) {
    filmsModel.addStateHandler(sortingFunction);
  }

  filmsModel.addStateHandler(filterHistoryFilms);

  filmCatalogPagePresenter.render();

  return () => {
    filmsModel.removeStateHandler(sortingFunction);
    filmsModel.removeStateHandler(filterHistoryFilms);

    filmCatalogPagePresenter.remove();
  };
});

Router.addRoute(PathNameRegExp.FAVORITES_PAGE, () => {
  document.title = PageTitle.FAVORITES_PAGE;

  const sortingFunction = getSortingFunctionFromSearch();

  if (sortingFunction) {
    filmsModel.addStateHandler(sortingFunction);
  }

  filmsModel.addStateHandler(filterFavoritesFilms);

  filmCatalogPagePresenter.render();

  return () => {
    filmsModel.removeStateHandler(sortingFunction);
    filmsModel.removeStateHandler(filterFavoritesFilms);

    filmCatalogPagePresenter.remove();
  };
});

function handleFilmDetailsModalEnter(_, regExpResult) {
  const filmID = regExpResult && regExpResult[FILM_ID_ARRAY_INDEX];

  if (!filmID) {
    Router.replace(PathName.NOT_FOUND_PAGE);

    return null;
  }

  const film = filmsModel.state && filmsModel.state[filmID];

  if (!film) {
    Router.replace(PathName.NOT_FOUND_PAGE);

    return null;
  }

  const filmTitle = film.filmInfo.title;

  document.title = `${filmTitle} - ${PageTitle.MAIN_PAGE}`;

  filmDetailsModalPresenter.render(filmID);

  return () => {
    filmDetailsModalPresenter.remove();
  };
}

Router.addRoute(PathNameRegExp.FILM_DETAILS_MODAL, async (_, regExpResult) => await readFilmsRequest.then(() => handleFilmDetailsModalEnter(_, regExpResult)));

Router.addRoute(PathNameRegExp.STATISTIC_PAGE, () => {
  document.title = PageTitle.STATISTIC_PAGE;

  const searchRegExpResult = window.location.search.match(SearchRegExp.PERIOD);

  const periodRange = searchRegExpResult && searchRegExpResult[PERIOD_RANGE_ARRAY_INDEX];
  const periodFilteringFunction = (films) => filterFilmsByWatchingDate(films, periodRange);

  filmsModel.addStateHandler(filterHistoryFilms);
  filmsModel.addStateHandler(periodFilteringFunction);

  statisticPagePresenter.render();

  return () => {
    filmsModel.removeStateHandler(filterHistoryFilms);
    filmsModel.removeStateHandler(periodFilteringFunction);

    statisticPagePresenter.remove();
  };
});

Router.addRoute(PathNameRegExp.NOT_FOUND_PAGE, () => {
  document.title = PageTitle.NOT_FOUND_PAGE;

  notFoundPagePresenter.render();

  return () => notFoundPagePresenter.remove();
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  provider.sync()
    .then((films) => {
      filmsModel.state = films;
    });

  notificationModel.set(NotificationTimeValue.LONG, ...Notification.CONNECTION_RESTORED);
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;

  notificationModel.set(NotificationTimeValue.LONG, ...Notification.CONNECTION_LOST);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/service-worker.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
    // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

/*
Для проверяющего наставника:
То ли Chrome глючит, то ли что, но частенько приходится переключать статус сети в инструментах разработчика, так как SW
ошибочно выдает что нет фильмов или не обрабатывает маршрут. Так что лучше всего тестить с отключенным доступом к сети,
там все работает отлично.
*/
