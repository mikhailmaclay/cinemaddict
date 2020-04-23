// Constants and utils
import {selectMostCommentedFilms, selectTopRatedFilms} from '../utils/selectors';
//
import FilmListView from '../views/film-list/film-list';
import FilmCatalogPresenter from './film-catalog-page';

export default class MainPagePresenter extends FilmCatalogPresenter {
  constructor(container, filmsModel) {
    super(container, filmsModel);

    // Views
    this._topRatedFilmListView = new FilmListView(null, `Top rated`, true);
    this._mostCommentedFilmListView = new FilmListView(null, `Most commented`, true);
  }

  render() {
    super.render();

    const topRatedFilms = selectTopRatedFilms(this.__filmsModel.state);
    const mostCommentedFilms = selectMostCommentedFilms(this.__filmsModel.state);

    if (topRatedFilms && topRatedFilms.length) {
      this._topRatedFilmListView.films = topRatedFilms;

      this._topRatedFilmListView.render(this._filmsView.element);
    }

    if (mostCommentedFilms && mostCommentedFilms.length) {
      this._mostCommentedFilmListView.films = mostCommentedFilms;

      this._mostCommentedFilmListView.render(this._filmsView.element);
    }
  }

  remove() {
    super.remove();

    this._topRatedFilmListView.remove();
    this._mostCommentedFilmListView.remove();
  }
}
