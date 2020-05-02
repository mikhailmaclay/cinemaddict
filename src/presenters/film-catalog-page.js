// Constants and utils
import {RenderPosition} from '../constants/enums';
import {bind} from '../utils/components';
import {cloneObject, convertMapToArray} from '../utils/objects';
//
import SortingView from '../views/sorting/sorting';
import FilmsView from '../views/films/films';
import FilmListView from '../views/film-list/film-list';
import LayoutPresenter from './layout';

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
        this.__handleFavoriteButtonClick
    );
  }

  render() {
    super.render();

    const handledState = this.__filmsModel.handledState;
    const isSortable = handledState && convertMapToArray(handledState).length > 1;

    this.__filmListView.films = handledState;
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

    const handledState = this.__filmsModel.handledState;
    const isSortable = handledState && convertMapToArray(handledState).length > 1;

    this.__filmListView.films = handledState;

    if (isSortable) {
      this.__sortingView.render(this.__mainNavigationView.element, RenderPosition.AFTER);
    } else {
      this.__sortingView.remove();
    }
  }

  __handleWatchlistButtonClick(evt) {
    const {target} = evt;
    const filmID = target.dataset.filmId;

    return new Promise((resolve) => {
      setTimeout(() => {
        const userDetails = cloneObject(this.__filmsModel.state[filmID].userDetails);

        userDetails.isInWatchlist = !userDetails.isInWatchlist;

        this.__filmsModel.updateFilm(filmID, {userDetails});

        resolve();
      }, 500);
    });
  }

  __handleWatchedButtonClick(evt) {
    const {target} = evt;
    const filmID = target.dataset.filmId;

    return new Promise((resolve) => {
      setTimeout(() => {
        const userDetails = cloneObject(this.__filmsModel.state[filmID].userDetails);

        userDetails.isAlreadyWatched = !userDetails.isAlreadyWatched;
        userDetails.watchingDate = userDetails.isAlreadyWatched ? new Date().toISOString() : null;

        this.__filmsModel.updateFilm(filmID, {userDetails});

        resolve();
      }, 500);
    });
  }

  __handleFavoriteButtonClick(evt) {
    const {target} = evt;
    const filmID = target.dataset.filmId;

    return new Promise((resolve) => {
      setTimeout(() => {
        const userDetails = cloneObject(this.__filmsModel.state[filmID].userDetails);

        userDetails.isFavorite = !userDetails.isFavorite;

        this.__filmsModel.updateFilm(filmID, {userDetails});

        resolve();
      }, 500);
    });
  }
}
