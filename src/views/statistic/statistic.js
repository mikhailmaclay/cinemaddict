import View from '../abstract/view';
import createStatisticTemplate from './statistic.template';

export default class StatisticView extends View {
  constructor(data) {
    super();

    this._data = data;
  }

  set data(value) {
    this._data = value;

    this.rerender();
  }

  get template() {
    return createStatisticTemplate(this._data);
  }

  __selectElements() {
    this.chart = this.element.querySelector(`.statistic__chart`);
  }
}
