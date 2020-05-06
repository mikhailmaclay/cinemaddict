// Constants and utils
import {RenderPosition} from '../constants/enums';
import {bind} from '../utils/components';
import {cloneObject} from '../utils/objects';
//
import SortingView from '../views/sorting/sorting';
import FilmsView from '../views/films/films';
import FilmListView from '../views/film-list/film-list';
import LayoutPresenter from './layout';
import {provider} from '../index';

export default class FilmCatalogPagePresenter extends LayoutPresenter {
  constructor(container, filmsModel, notificationModel) {
    super(container, filmsModel, notificationModel);

    this.__sortingView = new SortingView();
    this.__filmsView = new FilmsView();
    this.__filmListView = new FilmListView(null, `All movies. Upcoming`, false);

    bind(this,
        this.__handleFilmsModelChange,
        this.__handleWatchlistButtonClick,
        this.__handleWatchedButtonClick,
        this.__handleFavoriteButtonClick,
        this._handleUpdateFilmFulfilled
    );
  }

  render() {
    super.render();

    const handledFilms = this.__filmsModel.handledState;
    const isSortable = handledFilms && handledFilms.length > 1;

    this.__filmListView.films = handledFilms;
    this.__filmListView.onWatchlistButtonClick = this.__handleWatchlistButtonClick;
    this.__filmListView.onWatchedButtonClick = this.__handleWatchedButtonClick;
    this.__filmListView.onFavoriteButtonClick = this.__handleFavoriteButtonClick;


    if (isSortable) {
      this.__sortingView.render(this.__mainView.element);
    }

    this.__filmsView.render(this.__mainView.element);
    this.__filmListView.render(this.__filmsView.element);
  }

  remove() {
    super.remove();

    this.__sortingView .remove();
    this.__filmsView.remove();
    this.__filmListView.remove();
  }

  __handleFilmsModelChange() {
    super.__handleFilmsModelChange();

    const handledFilms = this.__filmsModel.handledState;
    const isSortable = handledFilms && handledFilms.length > 1;

    this.__filmListView.films = handledFilms;

    if (isSortable) {
      this.__sortingView.render(this.__mainNavigationView.element, RenderPosition.AFTER);
    } else {
      this.__sortingView.remove();
    }
  }

  __handleWatchlistButtonClick(evt) {
    const {target} = evt;
    const filmID = target.dataset.filmId;

    const film = cloneObject(this.__filmsModel.readFilm(filmID), true);
    film.userDetails.isInWatchlist = !film.userDetails.isInWatchlist;

    return provider.updateFilm(filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  __handleWatchedButtonClick(evt) {
    const {target} = evt;
    const filmID = target.dataset.filmId;

    const film = cloneObject(this.__filmsModel.readFilm(filmID), true);
    const value = !film.userDetails.isAlreadyWatched;

    film.userDetails.isAlreadyWatched = value;
    film.userDetails.watchingDate = value ? new Date() : null;

    return provider.updateFilm(filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  __handleFavoriteButtonClick(evt) {
    const {target} = evt;
    const filmID = target.dataset.filmId;

    const film = cloneObject(this.__filmsModel.readFilm(filmID), true);
    film.userDetails.isFavorite = !film.userDetails.isFavorite;

    return provider.updateFilm(filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  _handleUpdateFilmFulfilled(film) {
    this.__filmsModel.updateFilm(film.id, film);
  }
}

