import View from '../abstract/view';
import createFilmDetailsCommentsCountTemplate from './film-details-comments-count.template';

export default class FilmDetailsCommentsCountView extends View {
  constructor() {
    super();

    this._commentsCount = null;
  }

  get template() {
    return createFilmDetailsCommentsCountTemplate(this._commentsCount);
  }

  set commentsCount(value) {
    this._commentsCount = value;

    this.rerender();
  }
}
