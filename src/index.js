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
import {convertMapToArray, reduceArrayToMapByID} from './utils/objects';
import {reduceFilmsToStatistic} from './utils/reducing';
//
import FilmsModel from './models/films';
import NotificationModel from './models/notification';
import MainPagePresenter from './presenters/main-page';
import FilmCatalogPagePresenter from './presenters/film-catalog-page';
import FilmDetailsModalPresenter from './presenters/film-details-modal';
import StatisticPagePresenter from './presenters/statistic-page';
import NotFoundPagePresenter from './presenters/not-found-page';
import API from './api';
import './styles.scss';

export const api = new API(Config.END_POINT, Config.AUTHORIZATION);

const readFilmsRequest = api.readFilms().then((films) => {
  filmsModel.state = films.reduce(reduceArrayToMapByID, {});
}).catch((reason) => {
  filmsModel.state = {};
  notificationModel.set(NotificationTimeValue.LONG, ...Notification.READ_FILMS_FAILURE);

  throw reason;
});

const filmsModel = new FilmsModel();
filmsModel.addStateHandler(convertMapToArray);

const notificationModel = new NotificationModel();

notificationModel.set(NotificationTimeValue.LONG, ...Notification.WELCOME);

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
  const {filmID} = regExpResult.groups;

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

  const periodRange = window.location.search.match(SearchRegExp.PERIOD) && window.location.search.match(SearchRegExp.PERIOD).groups && window.location.search.match(SearchRegExp.PERIOD).groups.periodRange;
  const periodFilteringFunction = (films) => filterFilmsByWatchingDate(films, periodRange);

  filmsModel.addStateHandler(filterHistoryFilms);
  filmsModel.addStateHandler(periodFilteringFunction);

  statisticPagePresenter.render();

  return () => {
    filmsModel.removeStateHandler(periodFilteringFunction);
    filmsModel.removeStateHandler(reduceFilmsToStatistic);

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

  notificationModel.set(NotificationTimeValue.LONG, ...Notification.CONNECTION_RESTORED);
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;

  notificationModel.set(NotificationTimeValue.LONG, ...Notification.CONNECTION_LOST);
});

/*
  Пока что после закрытия FilmDetailsView осуществляется переход на главную страницу.

  Если зайти на страницу, удалить запись о ней из истории и обновить, то в истории появится запись без заголовка.
  P. S. Судя по всему это со всеми сайтами так, пробовал на fortnite.com.

  Запрос несуществущей страницы переадресуется на NOT_FOUND_PAGE, но в history создаются две записи, одна для MAIN_PAGE,
  вторая для NOT_FOUND.
  P. S. В моем прошлом проекте с react-router-dom такой же эффект.
*/

/* TODO
     Можно поколдовать с закрытием FilmDetailsView, чтобы был переход по истории назад, в случае, если предыдущая запись
     соответствуют MAIN_PAGE, WATCHLIST_PAGE и т. п., или на MAIN_PAGE, в случае, если нет.
*/
