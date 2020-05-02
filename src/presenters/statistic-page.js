// Constants and utils
import {RenderPosition} from '../constants/enums';
import {reduceFilmsToCountsByGenres, reduceFilmsToRank, reduceFilmsToStatistic} from '../utils/reducing';
import {convertMapToArray} from '../utils/objects';
//
import LayoutPresenter from './layout';
import StatisticView from '../views/statistic/statistic';
import StatisticRankView from '../views/statistic-rank/statistic-rank';
import StatisticChartView from '../views/statistic-chart/statistic-chart';

export default class StatisticPagePresenter extends LayoutPresenter {
  constructor(container, filmsModel, notificationModel) {
    super(container, filmsModel, notificationModel);

    this.__statisticView = new StatisticView();
    this.__statisticRankView = new StatisticRankView();
    this.__statisticChartView = new StatisticChartView();
  }

  render() {
    super.render();

    this.__statisticView.data = reduceFilmsToStatistic(this.__filmsModel.handledState);
    this.__statisticRankView.rank = reduceFilmsToRank(convertMapToArray(this.__filmsModel.state));
    this.__statisticChartView.watchedFilmsCountsByGenres = reduceFilmsToCountsByGenres(this.__filmsModel.handledState);

    this.__statisticView.render(this.__mainView.element);
    this.__statisticRankView.render(() => this.__statisticView.element, RenderPosition.START);
    this.__statisticChartView.render(() => this.__statisticView.chart);
  }

  remove() {
    super.remove();

    this.__statisticView.remove();
    this.__statisticRankView.remove();
    this.__statisticChartView.remove();
  }

  __handleFilmsModelChange() {
    super.__handleFilmsModelChange();

    this.__statisticView.data = reduceFilmsToStatistic(this.__filmsModel.handledState);
    this.__statisticRankView.rank = reduceFilmsToRank(convertMapToArray(this.__filmsModel.state));
    this.__statisticChartView.watchedFilmsCountsByGenres = reduceFilmsToCountsByGenres(this.__filmsModel.handledState);
  }
}
