// Constants and utils
import {SearchRegExp, SortingType} from '../constants/enums';
import {sortFilmsByDate, sortFilmsByRating} from './sorting';

export const getSortingFunctionFromSearch = () => {
  const sortingType = window.location.search.match(SearchRegExp.SORTING) && window.location.search.match(SearchRegExp.SORTING).groups && window.location.search.match(SearchRegExp.SORTING).groups.sortingType;

  switch (sortingType) {
    case SortingType.DATE:
      return sortFilmsByDate;

    case SortingType.RATING:
      return sortFilmsByRating;

    default:
      return null;
  }
};
