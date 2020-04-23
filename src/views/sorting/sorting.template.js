// Constants and utils
import {SearchRegExp} from '../../constants/enums';
import Router from '../../utils/router';

const createSortingTemplate = () => {
  const isSortingByDefault = window.location.search === ``;
  const isSortingByDate = Router.matchSearch(SearchRegExp.SORTING_DATE);
  const isSortingByRating = Router.matchSearch(SearchRegExp.SORTING_RATING);

  return (
    `<ul class="sort">
      <li><a href="${window.location.pathname}" class="sort__button ${isSortingByDefault ? `sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="${window.location.pathname}?sorting=date" class="sort__button ${isSortingByDate ? `sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="${window.location.pathname}?sorting=rating" class="sort__button ${isSortingByRating ? `sort__button--active` : ``}">Sort by rating</a></li>
    </ul>`
  );
};

export default createSortingTemplate;
