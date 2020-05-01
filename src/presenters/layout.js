// Constants and utils
import {isNull} from '../utils/common';
import {convertMapToArray} from '../utils/objects';
import {selectFilmCountsByFilterCategories} from '../utils/selectors';
import {bind} from '../utils/components';
//
import HeaderView from '../views/header/header';
import FooterView from '../views/footer/footer';
import MainView from '../views/main/main';
import ProfileView from '../views/profile/profile';
import MainNavigationView from '../views/main-navigation/main-navigation';
import NotificationView from '../views/notification/notification';

/*
  Общий представитель, целью которого являются отрисовать общие представления для всех страниц, а также сформировать данные
  для меню сайта.
*/

export default class LayoutPresenter {
  constructor(container, filmsModel, notificationModel) {
    this.__container = container;

    this.__filmsModel = filmsModel;
    this.__notificationModel = notificationModel;

    this.__headerView = new HeaderView();
    this.__profileView = new ProfileView();
    this.__mainView = new MainView();
    this.__mainNavigationView = new MainNavigationView(null);
    this.__footerView = new FooterView(null);
    this.__notificationView = new NotificationView(null);

    bind(this,
        this.__handleFilmsModelChange,
        this.__handleNotificationModelChange,
        this._handleNotificationCloseButtonClick
    );
  }

  render() {
    this.__filmsModel.addChangeHandler(this.__handleFilmsModelChange);
    this.__notificationModel.addChangeHandler(this.__handleNotificationModelChange);

    this.__mainNavigationView.filmCountsByFilterCategories = selectFilmCountsByFilterCategories(convertMapToArray(this.__filmsModel.state));
    this.__footerView.filmsCount = isNull(this.__filmsModel.state) ? null : convertMapToArray(this.__filmsModel.state).length;
    this.__notificationView.notification = this.__notificationModel.state;
    this.__notificationView.onCloseButtonClick = this._handleNotificationCloseButtonClick;

    this.__headerView.render(this.__container);
    this.__profileView.render(this.__headerView.element);
    this.__mainView.render(this.__container);
    this.__mainNavigationView.render(this.__mainView.element);
    this.__footerView.render(this.__container);
    this.__notificationView.render(this.__container);
  }

  remove() {
    this.__filmsModel.removeChangeHandler(this.__handleFilmsModelChange);
    this.__notificationModel.removeChangeHandler(this.__handleNotificationModelChange);
    this.__headerView.remove();
    this.__profileView.remove();
    this.__mainView.remove();
    this.__mainNavigationView.remove();
    this.__footerView.remove();
    this.__notificationView.remove();
  }

  __handleFilmsModelChange() {
    this.__mainNavigationView.filmCountsByFilterCategories = selectFilmCountsByFilterCategories(convertMapToArray(this.__filmsModel.state));
    this.__footerView.filmsCount = isNull(this.__filmsModel.state) ? null : convertMapToArray(this.__filmsModel.state).length;
  }

  __handleNotificationModelChange() {
    this.__notificationView.notification = this.__notificationModel.state;
  }

  _handleNotificationCloseButtonClick() {
    this.__notificationModel.unset();
  }
}
