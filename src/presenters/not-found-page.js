import LayoutPresenter from './layout';
import MessageView from '../views/message/message';

export default class NotFoundPagePresenter extends LayoutPresenter {
  constructor(container, filmsModel, notificationModel) {
    super(container, filmsModel, notificationModel);

    this.__messageView = new MessageView(null);
  }

  render() {
    super.render();

    this.__messageView.message = `There is no any result.`;

    this.__messageView.render(this.__mainView.element);
  }
}
