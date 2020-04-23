import LayoutPresenter from './layout';
import MessageView from '../views/message/message';

export default class NotFoundPagePresenter extends LayoutPresenter {
  constructor(container, filmsModel) {
    super(container, filmsModel);

    this._messageView = new MessageView(null);
  }
  render() {
    super.render();

    this._messageView.message = `There is no any result.`;

    this._messageView.render(this._mainView.element);
  }
}
