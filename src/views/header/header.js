import View from '../abstract/view';
import createHeaderTemplate from './header.template';

export default class HeaderView extends View {
  get template() {
    return createHeaderTemplate();
  }
}

