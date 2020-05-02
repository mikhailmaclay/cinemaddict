// Constants and utils
import Router from '../../utils/router';
import {DateFormat, SearchRegExp} from '../../constants/enums';
import {pluralize} from '../../utils/numbers';
import {formatDuration} from '../../utils/date';
//
import './statistic.styles.scss';

const createStatisticTemplate = (data) => {
  const isDefaultPeriod = window.location.search === ``;
  const isTodayPeriod = Router.matchSearch(SearchRegExp.PERIOD_TODAY);
  const isWeekPeriod = Router.matchSearch(SearchRegExp.PERIOD_WEEK);
  const isMonthPeriod = Router.matchSearch(SearchRegExp.PERIOD_MONTH);
  const isYearPeriod = Router.matchSearch(SearchRegExp.PERIOD_YEAR);

  if (!data) {
    return `<h2>Loading...</h2>`;
  }

  const {watchedFilmsCount, totalDuration, topGenre} = data;

  return (
    `<section class="statistic">
      <div class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        <a class="statistic__filters-label ${isDefaultPeriod ? `statistic__filters-label--active` : ``}" href="${window.location.pathname}">All time</a>
        <a class="statistic__filters-label ${isTodayPeriod ? `statistic__filters-label--active` : ``}" href="${window.location.pathname}?period=today">Today</a>
        <a class="statistic__filters-label ${isWeekPeriod ? `statistic__filters-label--active` : ``}" href="${window.location.pathname}?period=week">Week</a>
        <a class="statistic__filters-label ${isMonthPeriod ? `statistic__filters-label--active` : ``}" href="${window.location.pathname}?period=month">Month</a>
        <a class="statistic__filters-label ${isYearPeriod ? `statistic__filters-label--active` : ``}" href="${window.location.pathname}?period=year">Year</a>
      </div>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">${pluralize(watchedFilmsCount, [`movie`, `movies`])}</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${Math.floor(totalDuration / 60)}<span class="statistic__item-description">h</span> ${formatDuration(totalDuration, DateFormat.STATISTIC_TOTAL_DURATION_MINUTES)}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre ? topGenre : `-`}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default createStatisticTemplate;
