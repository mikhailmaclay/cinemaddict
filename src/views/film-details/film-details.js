// Constants and utils
import {RenderPosition} from '../../constants/enums';
import Router from '../../utils/router';
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createFilmDetailsTemplate from './film-details.template';

export default class FilmDetailsView extends View {
  constructor(film) {
    super();

    this._film = film;

    bind(this, this.__handleWindowKeyDown);
  }

  get template() {
    return createFilmDetailsTemplate(this._film);
  }

  set film(film) {
    this._film = film;

    this._rerender();
  }

  render(targetElement, position = RenderPosition.END) {
    super.render(targetElement, position);

    document.body.style.overflow = `hidden`;
  }

  remove() {
    super.remove();

    document.body.style.overflow = ``;
  }

  _addEventListeners() {
    window.addEventListener(`keydown`, this.__handleWindowKeyDown);
  }

  __handleWindowKeyDown(evt) {
    if (evt.code === `Escape`) {
      Router.push(`/`);

      window.removeEventListener(`keydown`, this.__handleWindowKeyDown);
    }
  }
}

