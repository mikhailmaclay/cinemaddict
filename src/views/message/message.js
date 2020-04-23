import View from '../abstract/view';
import createMessageTemplate from './message.template';

export default class MessageView extends View {
  constructor(message) {
    super();

    this._message = message;
  }

  get template() {
    return createMessageTemplate(this._message);
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;

    this._rerender();
  }
}

