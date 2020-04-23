// Constants and utils
import {selectFilmCountsByFilterCategories} from '../utils/selectors';
//
import HeaderView from '../views/header/header';
import FooterView from '../views/footer/footer';
import MainView from '../views/main/main';
import ProfileView from '../views/profile/profile';
import MainNavigationView from '../views/main-navigation/main-navigation';

/*
  Общий представитель, целью которого являются отрисовать общие представления для всех страниц, а также сформировать данные
  для меню сайта.
*/

export default class LayoutPresenter {
  constructor(container, filmsModel) {
    this._container = container;

    // Models
    this._filmsModel = filmsModel;

    // Views
    this._headerView = new HeaderView();
    this._profileView = new ProfileView();
    this._mainView = new MainView();
    this._mainNavigationView = new MainNavigationView(null);
    this._footerView = new FooterView(null);
  }

  render() {
    this._mainNavigationView.filmCountsByFilterCategories = selectFilmCountsByFilterCategories(this._filmsModel.state);
    this._footerView.filmsCount = Array.isArray(this._filmsModel.state) ? this._filmsModel.state.length : null;

    this._headerView.render(this._container);
    this._profileView.render(this._headerView.element);
    this._mainView.render(this._container);
    this._mainNavigationView.render(this._mainView.element);
    this._footerView.render(this._container);
  }

  remove() {
    this._headerView.remove();
    this._profileView.remove();
    this._mainView.remove();
    this._mainNavigationView.remove();
    this._footerView.remove();
  }
}
