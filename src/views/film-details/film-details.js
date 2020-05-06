// Constants and utils
import {KeyCode, RenderPosition} from '../../constants/enums';
import Router from '../../utils/router';
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createFilmDetailsTemplate from './film-details.template';

export default class FilmDetailsView extends View {
  constructor(film) {
    super();

    this._film = film;

    bind(this,
        this._handleWindowKeyDown
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

    this.element.scrollTop = scrollTop;
  }

  remove() {
    super.remove();

    document.body.style.overflow = ``;
  }

  __selectElements() {
    this.title = this.element.querySelector(`.film-details__comments-title`);
    this.commentsWrap = this.element.querySelector(`.film-details__comments-wrap`);
    this.topContainer = this.element.querySelector(`.form-details__top-container`);
  }

  __addEventListeners() {
    window.addEventListener(`keydown`, this._handleWindowKeyDown);
  }

  __removeEventListeners() {
    window.removeEventListener(`keydown`, this._handleWindowKeyDown);
  }

  _handleWindowKeyDown(evt) {
    if (evt.code === KeyCode.ESCAPE) {
      Router.push(`/`);

      window.removeEventListener(`keydown`, this._handleWindowKeyDown);
    }
  }
}

