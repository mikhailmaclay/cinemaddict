import FilmDetailsView from '../views/film-details/film-details';

export default class FilmDetailsModalPresenter {
  constructor(container, filmsModel) {
    this._container = container;

    // Models
    this._filmsModel = filmsModel;

    // Views
    this._filmDetailsView = new FilmDetailsView(null);
  }

  render(filmID) {
    const filmIndex = filmID - 1;

    this._filmDetailsView.film = this._filmsModel.state[filmIndex];

    this._filmDetailsView.render(this._container);
  }

  remove() {
    this._filmDetailsView.remove();
  }
}
