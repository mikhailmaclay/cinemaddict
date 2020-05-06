// Constants and utils
import {FIRST_ARRAY_ELEMENT_INDEX} from '../../constants/common';
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createFilmDetailsControlsTemplate from './film-details-controls.template';

export default class FilmDetailsControlsView extends View {
  constructor({isInWatchlist = false, isAlreadyWatched = false, isFavorite = false}) {
    super();

    this._userDetails = {isInWatchlist, isAlreadyWatched, isFavorite};

    this.onWatchedCheckboxChange = null;
    this.onWatchlistCheckboxChange = null;
    this.onFavoriteCheckboxChange = null;

    bind(this,
        this._handleWatchlistCheckboxChange,
        this._handleWatchedCheckboxChange,
        this._handleFavoriteCheckboxChange,
        this._handleOnSomeCheckboxChangeFinally
    );
  }

  set userDetails(userDetails) {
    this._userDetails = userDetails;

    this.rerender();
  }

  get template() {
    return createFilmDetailsControlsTemplate(this._userDetails);
  }

  __selectElements() {
    this._watchlistCheckbox = this.element.elements.watchlist;
    this._watchedCheckbox = this.element.elements.watched;
    this._favoriteCheckbox = this.element.elements.favorite;
  }

  __addEventListeners() {
    this._watchlistCheckbox.addEventListener(`change`, this._handleWatchlistCheckboxChange);
    this._watchedCheckbox.addEventListener(`change`, this._handleWatchedCheckboxChange);
    this._favoriteCheckbox.addEventListener(`change`, this._handleFavoriteCheckboxChange);
  }

  __removeEventListeners() {
    this._watchlistCheckbox.removeEventListener(`change`, this._handleWatchlistCheckboxChange);
    this._watchedCheckbox.removeEventListener(`change`, this._handleWatchedCheckboxChange);
    this._favoriteCheckbox.removeEventListener(`change`, this._handleFavoriteCheckboxChange);
  }

  _handleWatchlistCheckboxChange(evt) {
    if (this.onWatchlistCheckboxChange) {
      this._watchlistCheckbox.disabled = true;
      this._watchlistCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.opacity = `0.3`;
      this._watchlistCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.cursor = `wait`;

      this.onWatchlistCheckboxChange(evt)
        .catch(() => {
          this._watchlistCheckbox.checked = !this._watchlistCheckbox.checked;
        })
        .finally(this._handleOnSomeCheckboxChangeFinally);
    }
  }

  _handleWatchedCheckboxChange(evt) {
    if (this.onWatchedCheckboxChange) {
      this._watchedCheckbox.disabled = true;
      this._watchedCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.opacity = `0.3`;
      this._watchedCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.cursor = `wait`;

      this.onWatchedCheckboxChange(evt)
        .catch(() => {
          this._watchedCheckbox.checked = !this._watchedCheckbox.checked;
        })
        .finally(this._handleOnSomeCheckboxChangeFinally);
    }
  }

  _handleFavoriteCheckboxChange(evt) {
    if (this.onFavoriteCheckboxChange) {
      this._favoriteCheckbox.disabled = true;
      this._favoriteCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.opacity = `0.3`;
      this._favoriteCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.cursor = `wait`;

      this.onFavoriteCheckboxChange(evt)
        .catch(() => {
          this._favoriteCheckbox.checked = !this._favoriteCheckbox.checked;
        })
        .finally(this._handleOnSomeCheckboxChangeFinally);
    }
  }

  _handleOnSomeCheckboxChangeFinally() {
    this._watchlistCheckbox.disabled = false;
    this._watchlistCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.opacity = ``;
    this._watchlistCheckbox.labels[FIRST_ARRAY_ELEMENT_INDEX].style.cursor = ``;
  }
}
