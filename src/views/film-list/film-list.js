// Constants and utils
import Config from '../../constants/config';
import {RenderPosition} from '../../constants/enums';
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createFilmListTemplate from './film-list.template';

export default class FilmListView extends View {
  constructor(films, heading, isExtra) {
    super();

    this._films = films;
    this._heading = heading;
    this._isExtra = isExtra;
    this._filmCardsCount = Config.FILM_CARDS_COUNT_AT_START;

    this._onWatchlistButtonClick = null;
    this._onWatchedButtonClick = null;
    this._onFavoriteButtonClick = null;

    bind(this,
        this.__handleShowMoreClick,
        this._handleWatchlistButtonClick,
        this._handleWatchedButtonClick,
        this._handleFavoriteButtonClick
    );
  }

  set onWatchlistButtonClick(callback) {
    this._onWatchlistButtonClick = callback;
  }

  set onWatchedButtonClick(callback) {
    this._onWatchedButtonClick = callback;
  }

  set onFavoriteButtonClick(callback) {
    this._onFavoriteButtonClick = callback;
  }

  get template() {
    const filmsToRender = this._isExtra ? this._films : Array.isArray(this._films) && this._films.slice(0, this._filmCardsCount);
    const isShowMoreVisible = !this._isExtra && this._filmCardsCount < (this._films && this._films.length);

    return createFilmListTemplate(filmsToRender, this._heading, isShowMoreVisible, this._isExtra);
  }

  set films(films) {
    this._films = films;

    this.rerender();
  }

  set filmCardsCount(count) {
    this._filmCardsCount = count;

    this.rerender();
  }

  render(targetElement, position = RenderPosition.END) {
    if (this._films) {
      this.filmCardsCount = this._isExtra ? Math.min(this._films.length, Config.EXTRA_FILM_CARDS_COUNT) : Math.min(this._films.length, Config.FILM_CARDS_COUNT_AT_START);
    }

    super.render(targetElement, position);
  }

  __selectElements() {
    this._showMoreElement = this.element.querySelector(`.films-list__show-more`);
    this._watchlistButtons = Array.from(this.element.querySelectorAll(`.film-card__controls-item--add-to-watchlist`));
    this._watchedButtons = Array.from(this.element.querySelectorAll(`.film-card__controls-item--mark-as-watched`));
    this._favoriteButtons = Array.from(this.element.querySelectorAll(`.film-card__controls-item--favorite`));
  }

  __addEventListeners() {
    if (this._showMoreElement) {
      this._showMoreElement.addEventListener(`click`, this.__handleShowMoreClick);
    }

    this._watchlistButtons.forEach((watchlistButton) => {
      watchlistButton.addEventListener(`click`, this._handleWatchlistButtonClick);
    });

    this._watchedButtons.forEach((watchedButton) => {
      watchedButton.addEventListener(`click`, this._handleWatchedButtonClick);
    });

    this._favoriteButtons.forEach((favoriteButton) => {
      favoriteButton.addEventListener(`click`, this._handleFavoriteButtonClick);
    });
  }

  __removeEventListeners() {
    if (this._showMoreElement) {
      this._showMoreElement.removeEventListener(`click`, this.__handleShowMoreClick);
    }

    this._watchlistButtons.forEach((watchlistButton) => {
      watchlistButton.removeEventListener(`click`, this._handleWatchlistButtonClick);
    });

    this._watchedButtons.forEach((watchedButton) => {
      watchedButton.removeEventListener(`click`, this._handleWatchedButtonClick);
    });

    this._favoriteButtons.forEach((favoriteButton) => {
      favoriteButton.removeEventListener(`click`, this._handleFavoriteButtonClick);
    });
  }

  __handleShowMoreClick() {
    this.filmCardsCount = Math.min(this._films.length, this._filmCardsCount + Config.FILM_CARDS_COUNT_BY_LOAD);
  }

  _handleWatchlistButtonClick(evt) {
    const {target} = evt;

    if (this._onWatchlistButtonClick) {
      target.disabled = true;
      target.style.opacity = `0.3`;
      target.style.cursor = `wait`;

      this._onWatchlistButtonClick(evt)
        .finally(this._handleOnSomeButtonClickFinally.bind(this, evt));
    }
  }

  _handleWatchedButtonClick(evt) {
    const {target} = evt;

    if (this._onWatchedButtonClick) {
      target.disabled = true;
      target.style.opacity = `0.3`;
      target.style.cursor = `wait`;

      this._onWatchedButtonClick(evt)
        .finally(this._handleOnSomeButtonClickFinally.bind(this, evt));
    }
  }

  _handleFavoriteButtonClick(evt) {
    const {target} = evt;

    if (this._onFavoriteButtonClick) {
      target.disabled = true;
      target.style.opacity = `0.3`;
      target.style.cursor = `wait`;

      this._onFavoriteButtonClick(evt)
        .finally(this._handleOnSomeButtonClickFinally.bind(this, evt));
    }
  }

  _handleOnSomeButtonClickFinally(evt) {
    const {target} = evt;

    target.disabled = false;
    target.style.opacity = ``;
    target.style.cursor = ``;
  }
}

/*
  Данное представление реализовано в рамках идеи Надзиратель, авторами которой являются Энди Бауэр и Блэр МакГлашан.
  Суть заключается в том, что представление само определяет свою логику, с сохранением у представителя, выступающего в качестве надзирателя,
  возможности влиять на логику представления в сложных сценариях.

  Считаю, что добавление карточек на страницу, при нажатии на кнопку "Show more", является
  UI-логикой этого представления, поэтому решил описать ее именно здесь.
 */
