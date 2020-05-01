import View from '../abstract/view';
import createMainNavigationTemplate from './main-navigation.template';

export default class MainNavigationView extends View {
  constructor(filterCategories) {
    super();

    this._filmCountsByFilterCategories = filterCategories;
  }

  get template() {
    if (this._filmCountsByFilterCategories) {
      const {watchlist, history, favorites} = this._filmCountsByFilterCategories;

      return createMainNavigationTemplate(watchlist, history, favorites);
    }

    return createMainNavigationTemplate();
  }

  set filmCountsByFilterCategories(filterCategories) {
    this._filmCountsByFilterCategories = filterCategories;

    this.rerender();
  }
}
