// Constants and utils
import {bind} from '../../utils/components';
//
import View from '../abstract/view';
import createNotificationTemplate from './notification.template';

export default class NotificationView extends View {
  constructor(notification) {
    super();

    this._notification = notification;

    this.onCloseButtonClick = null;

    bind(this, this._handleCloseButtonClick);
  }

  set notification(notification) {
    this._notification = notification;

    this.rerender();
  }

  get template() {
    return createNotificationTemplate(this._notification);
  }

  __selectElements() {
    this._closeButton = this.element.querySelector(`.notification__close`);
  }

  __addEventListeners() {
    this._closeButton.addEventListener(`click`, this._handleCloseButtonClick);
  }

  __removeEventListeners() {
    this._closeButton.removeEventListener(`click`, this._handleCloseButtonClick);
  }

  _handleCloseButtonClick(evt) {
    if (this.onCloseButtonClick) {
      this.onCloseButtonClick(evt);
    }
  }
}
