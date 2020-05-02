// Constants and utils
import {bind} from '../utils/components';
//
import NotificationView from '../views/notification/notification';

export default class RootPresenter {
  constructor(container, notificationModel) {
    this.__container = container;

    this.__notificationModel = notificationModel;

    this.__notificationView = new NotificationView(null);

    bind(this,
        this.__handleNotificationModelChange,
        this._handleNotificationCloseButtonClick
    );
  }

  render() {
    this.__notificationModel.addChangeHandler(this.__handleNotificationModelChange);

    this.__notificationView.notification = this.__notificationModel.state;
    this.__notificationView.onCloseButtonClick = this._handleNotificationCloseButtonClick;

    this.__notificationView.render(this.__container);
  }

  remove() {
    this.__notificationModel.removeChangeHandler(this.__handleNotificationModelChange);
    this.__notificationView.remove();
  }

  __handleNotificationModelChange() {
    this.__notificationView.notification = this.__notificationModel.state;
  }

  _handleNotificationCloseButtonClick() {
    this.__notificationModel.unset();
  }
}
