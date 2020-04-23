import View from '../abstract/view';
import createFilmCardTemplate from './film-card.template';

export default class FilmCardView extends View {
  constructor(film) {
    super();

    this._film = film;
  }

  get template() {
    return createFilmCardTemplate(this._film);
  }
}

