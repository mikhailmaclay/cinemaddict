// Constants and utils
import {KeyCode, TimeValue} from '../../constants/enums';
import {FIRST_ARRAY_ELEMENT_INDEX} from '../../constants/common';
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createFilmDetailsNewCommentTemplate from './film-details-new-comment.template';

export default class FilmDetailsNewCommentView extends View {
  constructor() {
    super();

    this._text = null;
    this._emotion = null;

    this.onCommentSubmit = null;

    this._commentTextFieldErrorTimeout = null;

    bind(this,
        this._handleWindowKeyDown,
        this._handleCommentTextFieldInput,
        this._handleEmojiRadioChange,
        this._handleCommentSubmit,
        this._handleBeforeOnCommentSubmit,
        this._handleFulfilledOnCommentSubmit,
        this._handleRejectedOnCommentSubmit,
        this._handleFinallyOnCommentSubmit
    );
  }

  get template() {
    return createFilmDetailsNewCommentTemplate(this._emotion);
  }

  set emotion(value) {
    this._emotion = value;

    this.rerender();
  }

  remove() {
    super.remove();

    this._text = null;
    this._emotion = null;
  }

  rerender() {
    super.rerender();

    this._commentTextField.value = this._text;
    this._emotionRadios.value = this._emotion;
  }

  __selectElements() {
    this._commentTextField = this.element.elements[`comment-text`];
    this._emotionRadios = this.element.elements[`comment-emotion`];
  }

  __addEventListeners() {
    window.addEventListener(`keydown`, this._handleWindowKeyDown);

    this.element.addEventListener(`submit`, this._handleCommentSubmit);
    this._commentTextField.addEventListener(`input`, this._handleCommentTextFieldInput);
    this._emotionRadios.forEach((emotionRadio) => {
      emotionRadio.addEventListener(`change`, this._handleEmojiRadioChange);
    });
  }

  __removeEventListeners() {
    window.addEventListener(`remove`, this._handleWindowKeyDown);

    this.element.__removeEventListeners(`submit`, this._handleCommentSubmit);
    this._commentTextField.removeEventListener(`input`, this._handleCommentTextFieldInput);
    this._emotionRadios.forEach((emotionRadios) => {
      emotionRadios.removeEventListener(`change`, this._handleEmojiRadioChange);
    });
  }

  _handleWindowKeyDown(evt) {
    const {code, ctrlKey} = evt;

    if (code === KeyCode.ENTER && ctrlKey) {
      this.element.dispatchEvent(new Event(`submit`));
    }
  }

  _handleCommentSubmit(evt) {
    evt.preventDefault();

    const isValid = this.element.checkValidity();

    if (!isValid) {
      this.element.reportValidity();

      return;
    }

    if (this.onCommentSubmit) {
      this._handleBeforeOnCommentSubmit();

      this.onCommentSubmit(evt)
        .then(this._handleFulfilledOnCommentSubmit)
        .catch(this._handleRejectedOnCommentSubmit)
        .finally(this._handleFinallyOnCommentSubmit);
    }
  }

  _handleCommentTextFieldInput() {
    this._text = this._commentTextField.value;
  }

  _handleEmojiRadioChange() {
    this.emotion = this._emotionRadios.value;
  }

  _handleBeforeOnCommentSubmit() {
    for (let element of this.element.elements) {
      element.readonly = true;

      const label = element.labels[FIRST_ARRAY_ELEMENT_INDEX];

      if (label && element.classList.contains(`visually-hidden`)) {
        label.style.cursor = `wait`;
      } else {
        element.style.cursor = `wait`;
      }
    }

    this.element.style.opacity = `0.3`;
  }

  _handleFulfilledOnCommentSubmit() {
    this.element.reset();

    this._text = null;
    this.emotion = null;
  }

  _handleRejectedOnCommentSubmit() {
    this._commentTextField.classList.add(`film-details__comment-input--error`);

    clearTimeout(this._commentTextFieldErrorTimeout);

    this._commentTextFieldErrorTimeout = setTimeout(() => this._commentTextField.classList.remove(`film-details__comment-input--error`), TimeValue.MILLISECOND.SECOND * 0.5);
  }

  _handleFinallyOnCommentSubmit() {
    for (let element of this.element.elements) {
      element.readonly = false;

      const label = element.labels[FIRST_ARRAY_ELEMENT_INDEX];

      if (label && element.classList.contains(`visually-hidden`)) {
        label.style.cursor = ``;
      } else {
        element.style.cursor = ``;
      }
    }

    this.element.style.opacity = ``;
  }
}
