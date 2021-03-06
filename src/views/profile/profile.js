import View from '../abstract/view';
import createProfileTemplate from './profile.template';

export default class ProfileView extends View {
  constructor() {
    super();

    this._rank = null;
  }

  set rank(value) {
    this._rank = value;

    this.rerender();
  }

  get template() {
    return createProfileTemplate(this._rank);
  }
}

