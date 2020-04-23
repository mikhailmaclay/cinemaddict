import View from '../abstract/view';
import createMainTemplate from './main.template';

export default class MainView extends View {
  get template() {
    return createMainTemplate();
  }
}
