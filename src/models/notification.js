import Model from './abstract/model';

export default class NotificationModel extends Model {
  constructor() {
    super();

    this.__removeTimeout = null;
  }

  set state(value) {
    this.__state = value;

    this.__callChangeHandlers();
  }

  get state() {
    return this.__state;
  }

  set(timeout, heading, text) {
    this.state = {heading, text};

    if (timeout && this.__state) {
      clearTimeout(this.__removeTimeout);

      this.__removeTimeout = setTimeout(() => {
        this.state = null;
      }, timeout);
    }
  }

  unset() {
    this.state = null;

    if (this.__removeTimeout) {
      clearTimeout(this.__removeTimeout);
    }
  }
}
