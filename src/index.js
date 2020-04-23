// Constants and utils
import Config from './constants/config';
import {PageTitle, PathName, PathNameRegExp} from './constants/enums';
import Router from './utils/router';
//
import FilmsModel from './models/films';
import MainPagePresenter from './presenters/main-page';
import FilmCatalogPagePresenter from './presenters/film-catalog-page';
import FilmDetailsModalPresenter from './presenters/film-details-modal';
import StatisticPagePresenter from './presenters/statistic-page';
import NotFoundPagePresenter from './presenters/not-found-page';
import {FilmAdapter} from './utils/adapters';
import createMockFilms from './mocks/films';
import {filterFavoritesFilms, filterHistoryFilms, filterWatchlistFilms} from './utils/filtering';
import {getSortingFunctionFromSearch} from './utils/url';

const MOCK_FILMS_COUNT = 20;

const filmsModel = new FilmsModel();
filmsModel.state = createMockFilms(MOCK_FILMS_COUNT).map((film) => new FilmAdapter(film));

const mainPagePresenter = new MainPagePresenter(Config.ROOT, filmsModel);
const filmCatalogPagePresenter = new FilmCatalogPagePresenter(Config.ROOT, filmsModel);
const filmDetailsModalPresenter = new FilmDetailsModalPresenter(Config.ROOT, filmsModel);
const statisticPagePresenter = new StatisticPagePresenter(Config.ROOT, filmsModel);
const notFoundPagePresenter = new NotFoundPagePresenter(Config.ROOT, filmsModel);

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

Router.addRoute(PathNameRegExp.FILM_DETAILS_MODAL, (_, regExpResult) => {
  const {filmID} = regExpResult.groups;
  const filmIndex = filmID - 1;
  const film = filmsModel.state[filmIndex];

  if (!film) {
    Router.replace(PathName.NOT_FOUND_PAGE);

    return;
  }

  const filmTitle = film.filmInfo.title;

  document.title = `${filmTitle} / ${PageTitle.MAIN_PAGE}`;

  filmDetailsModalPresenter.render(filmID);

  // eslint-disable-next-line consistent-return
  return () => {
    filmDetailsModalPresenter.remove();
  };
});

Router.addRoute(PathNameRegExp.STATISTIC_PAGE, () => {
  document.title = PageTitle.STATISTIC_PAGE;

  statisticPagePresenter.render();

  return () => statisticPagePresenter.remove();
});

Router.addRoute(PathNameRegExp.NOT_FOUND_PAGE, () => {
  document.title = PageTitle.NOT_FOUND_PAGE;

  notFoundPagePresenter.render();

  return () => notFoundPagePresenter.remove();
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
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
