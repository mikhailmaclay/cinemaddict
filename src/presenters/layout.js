// Constants and utils
import {convertMapToArray} from '../utils/objects';
import {selectFilmCountsByFilterCategories} from '../utils/selectors';
import {bind} from '../utils/components';
//
import HeaderView from '../views/header/header';
import FooterView from '../views/footer/footer';
import MainView from '../views/main/main';
import ProfileView from '../views/profile/profile';
import MainNavigationView from '../views/main-navigation/main-navigation';
import RootPresenter from './root';
import {reduceFilmsToRank} from '../utils/reducing';

/*
  Общий представитель, целью которого являются отрисовать общие представления для всех страниц, а также сформировать данные
  для меню сайта.
*/

export default class LayoutPresenter extends RootPresenter {
  constructor(container, filmsModel, notificationModel) {
    super(container, notificationModel);

    this.__filmsModel = filmsModel;

    this.__headerView = new HeaderView();
    this.__profileView = new ProfileView();
    this.__mainView = new MainView();
    this.__mainNavigationView = new MainNavigationView(null);
    this.__footerView = new FooterView(null);

    bind(this,
        this.__handleFilmsModelChange
    );
  }

  render() {
    super.render();

    this.__filmsModel.addChangeHandler(this.__handleFilmsModelChange);

    const films = convertMapToArray(this.__filmsModel.state);

    this.__mainNavigationView.filmCountsByFilterCategories = selectFilmCountsByFilterCategories(films);
    this.__footerView.filmsCount = films && films.length;
    this.__profileView.rank = reduceFilmsToRank(films);

    this.__headerView.render(this.__container);
    this.__profileView.render(this.__headerView.element);
    this.__mainView.render(this.__container);
    this.__mainNavigationView.render(this.__mainView.element);
    this.__footerView.render(this.__container);
  }

  remove() {
    super.remove();

    this.__filmsModel.removeChangeHandler(this.__handleFilmsModelChange);
    this.__notificationModel.removeChangeHandler(this.__handleNotificationModelChange);
    this.__headerView.remove();
    this.__profileView.remove();
    this.__mainView.remove();
    this.__mainNavigationView.remove();
    this.__footerView.remove();
  }

  __handleFilmsModelChange() {
    const isLoaded = Boolean(this.__filmsModel.state);

    if (isLoaded) {
      this.__profileView.rank = reduceFilmsToRank(convertMapToArray(this.__filmsModel.state));
      this.__profileView.render(this.__headerView.element);
    } else {
      this.__profileView.remove();
    }

    this.__mainNavigationView.filmCountsByFilterCategories = selectFilmCountsByFilterCategories(convertMapToArray(this.__filmsModel.state));
    this.__footerView.filmsCount = this.__filmsModel.state && convertMapToArray(this.__filmsModel.state).length;
  }
}
