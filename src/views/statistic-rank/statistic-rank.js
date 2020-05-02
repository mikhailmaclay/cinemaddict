import View from '../abstract/view';
import createStatisticRankTemplate from './statistic-rank.template';

export default class StatisticRankView extends View {
  constructor() {
    super();

    this._rank = null;
  }

  set rank(value) {
    this._rank = value;

    this.rerender();
  }

  get template() {
    return createStatisticRankTemplate(this._rank);
  }
}
