import SortingView from '../views/sorting/sorting';
import FilmsView from '../views/films/films';
import FilmListView from '../views/film-list/film-list';
import FilmDetailsView from '../views/film-details/film-details';
import LayoutPresenter from './layout';

export default class FilmCatalogPagePresenter extends LayoutPresenter {
  constructor(container, filmsModel) {
    super(container, filmsModel);

    // Views
    this._sortingView = new SortingView();
    this._filmsView = new FilmsView();
    this._filmListView = new FilmListView(null, `All movies. Upcoming`, false);
    this._filmDetailsView = new FilmDetailsView(null);
  }

  render() {
    super.render();

    this._filmListView.films = this.__filmsModel.handledState;

    if (this.__filmsModel.state && this.__filmsModel.state.length) {
      this._sortingView.render(this._mainView.element);
    }

    this._filmsView.render(this._mainView.element);
    this._filmListView.render(this._filmsView.element);
  }

  remove() {
    super.remove();

    this._sortingView .remove();
    this._filmsView.remove();
    this._filmListView.remove();
  }
}
