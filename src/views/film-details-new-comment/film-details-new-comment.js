import View from '../abstract/view';
import createFilmDetailsNewCommentTemplate from './film-details-new-comment.template';

export default class FilmDetailsNewCommentView extends View {
  get template() {
    return createFilmDetailsNewCommentTemplate();
  }
}
