// Constants and utils
import {KeyCode, RenderPosition} from '../../constants/enums';
import {FIRST_ARRAY_ELEMENT_INDEX} from '../../constants/common';
import Router from '../../utils/router';
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createFilmDetailsTemplate from './film-details.template';

export default class FilmDetailsView extends View {
  constructor(film) {
    super();

    this._film = film;

    this.onWatchedCheckboxChange = null;
    this.onWatchlistCheckboxChange = null;
    this.onFavoriteCheckboxChange = null;

    bind(this,
        this._handleWindowKeyDown,
        this._handleWatchlistCheckboxChange,
        this._handleWatchedCheckboxChange,
        this._handleFavoriteCheckboxChange
    );
  }

  get template() {
    return createFilmDetailsTemplate(this._film);
  }

  set film(film) {
    this._film = film;

    this.rerender();
  }

  render(targetElement, position = RenderPosition.END) {
    super.render(targetElement, position);

    document.body.style.overflow = `hidden`;
  }

  rerender() {
    const {scrollTop} = this.element;

    super.rerender();

    queueMicrotask(() => {
      this.element.scrollTop = scrollTop;
    });
  }

  remove() {
    super.remove();

    document.body.style.overflow = ``;
  }

  __selectElements() {
    this._form = this.element.querySelector(`.film-details__controls`);
    this._watchlistCheckbox = this._form.elements.watchlist;
    this._watchedCheckbox = this._form.elements.watched;
    this._favoriteCheckbox = this._form.elements.favorite;
    this.commentsWrap = this.element.querySelector(`.film-details__comments-wrap`);
  }

  __addEventListeners() {
    window.addEventListener(`keydown`, this._handleWindowKeyDown);

    this._watchlistCheckbox.addEventListener(`change`, this._handleWatchlistCheckboxChange);
    this._watchedCheckbox.addEventListener(`change`, this._handleWatchedCheckboxChange);
    this._favoriteCheckbox.addEventListener(`change`, this._handleFavoriteCheckboxChange);
  }

  __removeEventListeners() {
    window.removeEventListener(`keydown`, this._handleWindowKeyDown);

    this._watchlistCheckbox.removeEventListener(`change`, this._handleWatchlistCheckboxChange);
    this._watchedCheckbox.removeEventListener(`change`, this._handleWatchedCheckboxChange);
    this._favoriteCheckbox.removeEventListener(`change`, this._handleFavoriteCheckboxChange);
  }

  _handleWindowKeyDown(evt) {
    if (evt.code === KeyCode.ESCAPE) {
      Router.push(`/`);

      window.removeEventListener(`keydown`, this._handleWindowKeyDown);
    }
  }

  _handleWatchlistCheckboxChange(evt) {
    if (this.onWatchlistCheckboxChange) {
      this._watchlistCheckbox.disabled = true;
      this._watchlistCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.opacity = `0.3`;
      this._watchlistCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.cursor = `wait`;

      this.onWatchlistCheckboxChange(evt);
    }
  }

  _handleWatchedCheckboxChange(evt) {
    if (this.onWatchedCheckboxChange) {
      this._watchedCheckbox.disabled = true;
      this._watchedCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.opacity = `0.3`;
      this._watchedCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.cursor = `wait`;

      this.onWatchedCheckboxChange(evt);
    }
  }

  _handleFavoriteCheckboxChange(evt) {
    if (this.onFavoriteCheckboxChange) {
      this._favoriteCheckbox.disabled = true;
      this._favoriteCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.opacity = `0.3`;
      this._favoriteCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.cursor = `wait`;

      this.onFavoriteCheckboxChange(evt);
    }
  }
}

