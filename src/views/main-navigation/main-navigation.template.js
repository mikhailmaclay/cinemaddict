// Constants and utils
import {PathNameRegExp} from '../../constants/enums';
import Router from '../../utils/router';
//
import './main-navigation.styles.scss';

const createMainNavigationTemplate = (watchlistCount, historyCount, favoritesCount) => {
  const isMainPage = Router.matchPathName(PathNameRegExp.MAIN_PAGE);
  const isWatchlistPage = Router.matchPathName(PathNameRegExp.WATCHLIST_PAGE);
  const isHistoryPage = Router.matchPathName(PathNameRegExp.HISTORY_PAGE);
  const isFavoritesPage = Router.matchPathName(PathNameRegExp.FAVORITES_PAGE);
  const isStatisticPage = Router.matchPathName(PathNameRegExp.STATISTIC_PAGE);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="/" class="main-navigation__item ${isMainPage ? `main-navigation__item--active` : ``}">All items</a>
        <a href="/watchlist" class="main-navigation__item ${isWatchlistPage ? `main-navigation__item--active` : ``}">Watchlist ${watchlistCount ? `<span class="main-navigation__item-count">${watchlistCount}</span>` : ``}</a>
        <a href="/history" class="main-navigation__item ${isHistoryPage ? `main-navigation__item--active` : ``}">History ${historyCount ? `<span class="main-navigation__item-count">${historyCount}</span>` : ``}</a>
        <a href="/favorites" class="main-navigation__item ${isFavoritesPage ? `main-navigation__item--active` : ``}">Favorites ${favoritesCount ? `<span class="main-navigation__item-count">${favoritesCount}</span>` : ``}</a>
      </div>
      <a href="/stats" class="main-navigation__additional ${isStatisticPage ? `main-navigation__item--active` : ``}">Stats</a>
    </nav>`
  );
};

export default createMainNavigationTemplate;
