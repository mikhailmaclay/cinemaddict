import View from '../abstract/view';
import createFilmDetailsInfoWrapTemplate from './film-details-info-wrap.tempate';

export default class FilmDetailsInfoWrapView extends View {
  constructor(filmInfo) {
    super();

    this._filmInfo = filmInfo;
  }

  set filmInfo(value) {
    this._filmInfo = value;

    this.rerender();
  }

  get template() {
    return createFilmDetailsInfoWrapTemplate(this._filmInfo);
  }
}
