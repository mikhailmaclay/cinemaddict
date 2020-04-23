import View from '../abstract/view';
import createSortingTemplate from './sorting.template';

export default class SortingView extends View {
  get template() {
    return createSortingTemplate();
  }
}
