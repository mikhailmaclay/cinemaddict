// Constants and utils
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createFilmDetailsCommentListTemplate from './film-details-comment-list.template';
import {TimeValue} from '../../constants/enums';

export default class FilmDetailsCommentListView extends View {
  constructor(comments) {
    super();

    this._comments = comments;
    this._placeholder = null;
    this._isOnlyReadMode = true;

    this._errorTimeout = null;

    this.onCommentDeleteButtonClick = null;

    bind(this,
        this._handleCommentDeleteButtonClick,
        this._handleBeforeOnCommentDeleteButtonClick
    );
  }

  get template() {
    if (this._placeholder) {
      return this._placeholder;
    }

    return createFilmDetailsCommentListTemplate(this._comments, this._isOnlyReadMode);
  }

  set comments(comments) {
    this._comments = comments;

    this.rerender();
  }

  set placeholder(value) {
    this._placeholder = value;

    this.rerender();
  }

  set isOnlyReadMode(value) {
    this._isOnlyReadMode = Boolean(value);

    this.rerender();
  }

  __selectElements() {
    this._deleteCommentButtons = this.element.querySelectorAll(`.film-details__comment-delete`);
  }

  __addEventListeners() {
    for (let deleteCommentButton of this._deleteCommentButtons) {
      deleteCommentButton.addEventListener(`click`, this._handleCommentDeleteButtonClick);
    }
  }

  __removeEventListeners() {
    for (let deleteCommentButton of this._deleteCommentButtons) {
      deleteCommentButton.removeEventListener(`click`, this._handleCommentDeleteButtonClick);
    }
  }

  _handleCommentDeleteButtonClick(evt) {
    this._handleBeforeOnCommentDeleteButtonClick(evt);

    if (this.onCommentDeleteButtonClick) {
      this.onCommentDeleteButtonClick(evt)
        .catch(this._handleRejectedOnCommentDeleteButtonClick.bind(this, evt))
        .finally(this._handleFulfilledOnCommentDeleteButtonClick.bind(this, evt));
    }
  }

  _handleBeforeOnCommentDeleteButtonClick(evt) {
    const {target} = evt;

    target.disabled = true;
    target.innerText = `Deleting...`;
    target.style.textDecoration = `none`;
    target.style.cursor = `wait`;
    target.style.opacity = `1`;

    const comment = target.closest(`.film-details__comment`);

    comment.style.opacity = `0.3`;
    comment.style.userSelect = `none`;
    comment.style.cursor = `wait`;
  }

  _handleFulfilledOnCommentDeleteButtonClick(evt) {
    const {target} = evt;

    target.disabled = false;
    target.innerText = `Delete`;
    target.style.textDecoration = ``;
    target.style.cursor = ``;
    target.style.opacity = ``;

    const comment = target.closest(`.film-details__comment`);

    comment.style.opacity = ``;
    comment.style.userSelect = ``;
    comment.style.cursor = ``;
  }

  _handleRejectedOnCommentDeleteButtonClick(evt) {
    const {target} = evt;
    const comment = target.closest(`.film-details__comment`);

    comment.classList.add(`film-details__comment--error`);

    clearTimeout(this._errorTimeout);

    this._errorTimeout = setTimeout(() => comment.classList.remove(`film-details__comment--error`), TimeValue.MILLISECOND.SECOND * 0.5);

  }
}
