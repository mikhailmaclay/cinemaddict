import View from '../abstract/view';
import createFilmDetailsCommentListTemplate from './film-details-comment-list.template';

export default class FilmDetailsCommentListView extends View {
  constructor(comments) {
    super();

    this._comments = comments;
  }
  get template() {
    return createFilmDetailsCommentListTemplate(this._comments);
  }
}
