import View from '../abstract/view';
import createFooterTemplate from './footer.template';

export default class FooterView extends View {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  get template() {
    return createFooterTemplate(this._filmsCount);
  }

  set filmsCount(filmsCount) {
    this._filmsCount = filmsCount;

    this.rerender();
  }
}

