import View from '../abstract/view';
import createFilmsTemplate from './films.template';

export default class FilmsView extends View {
  get template() {
    return createFilmsTemplate();
  }
}

