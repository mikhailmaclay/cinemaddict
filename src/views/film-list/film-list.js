// Constants and utils
import Config from '../../constants/config';
import {RenderPosition} from '../../constants/enums';
import {bind} from '../../utils/components';
// Views
import View from '../abstract/view';
import createFilmListTemplate from './film-list.template';

export default class FilmListView extends View {
  constructor(films, heading, isExtra) {
    super();

    this._films = films;
    this._heading = heading;
    this._isExtra = isExtra;
    this._filmCardsCount = null;

    bind(this, this.__handleShowMoreClick);
  }

  get template() {
    const filmsToRender = this._isExtra ? this._films : this._films.slice(0, this._filmCardsCount);
    const isShowMoreVisible = !this._isExtra && this._filmCardsCount !== this._films.length;

    return createFilmListTemplate(filmsToRender, this._heading, isShowMoreVisible, this._isExtra);
  }

  set films(films) {
    this._films = films;

    this.__rerender();
  }

  set filmCardsCount(count) {
    this._filmCardsCount = count;

    this.__rerender();
  }

  render(targetElement, position = RenderPosition.END) {
    this.filmCardsCount = this._isExtra ? Math.min(this._films.length, Config.EXTRA_FILM_CARDS_COUNT) : Math.min(this._films.length, Config.FILM_CARDS_COUNT_AT_START);

    super.render(targetElement, position);
  }

  __selectElements() {
    this._showMoreElement = this.element.querySelector(`.films-list__show-more`);
  }

  __addEventListeners() {
    if (this._showMoreElement) {
      this._showMoreElement.addEventListener(`click`, this.__handleShowMoreClick);
    }
  }

  __removeEventListeners() {
    if (this._showMoreElement) {
      this._showMoreElement.removeEventListener(`click`, this.__handleShowMoreClick);
    }
  }

  __handleShowMoreClick() {
    this.filmCardsCount = Math.min(this._films.length, this._filmCardsCount + Config.FILM_CARDS_COUNT_BY_LOAD);
  }
}

/*
  Данное представление реализовано в рамках идеи Надзиратель, авторами которой являются Энди Бауэр и Блэр МакГлашан.
  Суть заключается в том, что представление само определяет свою логику, с сохранением у представителя, выступающего в качестве надзирателя,
  возможности влиять на логику представления в сложных сценариях.

  Считаю, что добавление карточек на страницу, при нажатии на кнопку "Show more", является
  UI-логикой этого представления, поэтому решил описать ее именно здесь.
 */
