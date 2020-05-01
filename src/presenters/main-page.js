// Constants and utils
import {convertMapToArray} from '../utils/objects';
import {selectMostCommentedFilms, selectTopRatedFilms} from '../utils/selectors';
import {bind} from '../utils/components';
//
import FilmListView from '../views/film-list/film-list';
import FilmCatalogPresenter from './film-catalog-page';

export default class MainPagePresenter extends FilmCatalogPresenter {
  constructor(container, filmsModel, notificationModel) {
    super(container, filmsModel, notificationModel);

    this.__topRatedFilmListView = new FilmListView(null, `Top rated`, true);
    this.__mostCommentedFilmListView = new FilmListView(null, `Most commented`, true);

    bind(this, this.__handleFilmsModelChange);
  }

  render() {
    super.render();

    const films = convertMapToArray(this.__filmsModel.state);

    this.__topRatedFilmListView.films = selectTopRatedFilms(films);
    this.__mostCommentedFilmListView.films = selectMostCommentedFilms(films);
    this.__topRatedFilmListView.onWatchlistButtonClick = this.__handleWatchlistButtonClick;
    this.__topRatedFilmListView.onWatchedButtonClick = this.__handleWatchedButtonClick;
    this.__topRatedFilmListView.onFavoriteButtonClick = this.__handleFavoriteButtonClick;
    this.__mostCommentedFilmListView.onWatchlistButtonClick = this.__handleWatchlistButtonClick;
    this.__mostCommentedFilmListView.onWatchedButtonClick = this.__handleWatchedButtonClick;
    this.__mostCommentedFilmListView.onFavoriteButtonClick = this.__handleFavoriteButtonClick;

    this.__topRatedFilmListView.render(this.__filmsView.element);
    this.__mostCommentedFilmListView.render(this.__filmsView.element);
  }

  remove() {
    super.remove();

    this.__topRatedFilmListView.remove();
    this.__mostCommentedFilmListView.remove();
  }

  __handleFilmsModelChange() {
    super.__handleFilmsModelChange();

    const films = convertMapToArray(this.__filmsModel.state);

    this.__topRatedFilmListView.films = selectTopRatedFilms(films);
    this.__mostCommentedFilmListView.films = selectMostCommentedFilms(films);
  }
}
