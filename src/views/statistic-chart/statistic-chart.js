// Libraries
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

export default class StatisticChartView {
  constructor(watchedFilmsCountByGenres) {
    this._chart = null;

    this._watchedFilmsCountsByGenres = watchedFilmsCountByGenres;

    this._targetElement = null;
  }

  set watchedFilmsCountsByGenres(value) {
    this._watchedFilmsCountsByGenres = value;

    this.rerender();
  }

  render(targetElement) {
    this._render(targetElement);
  }

  remove() {
    if (!this._chart) {
      return;
    }

    this._chart.destroy();
  }

  rerender() {
    if (!this._chart) {
      this._render(this._targetElement);

      return;
    }

    this.remove();
    this._render(this._targetElement);
  }

  _render(targetElement) {
    if (typeof targetElement === `function`) {
      this._targetElement = targetElement;

      targetElement = this._targetElement();
    }

    if (!targetElement || !this._watchedFilmsCountsByGenres) {
      return;
    }

    const genres = Object.keys(this._watchedFilmsCountsByGenres);
    const counts = Object.values(this._watchedFilmsCountsByGenres);

    targetElement.height = BAR_HEIGHT * genres.length;

    this._chart = new Chart(targetElement, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: genres,
        datasets: [{
          data: counts,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}
