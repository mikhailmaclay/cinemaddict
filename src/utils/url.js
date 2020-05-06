// Constants and utils
import {SearchRegExp, SortingType} from '../constants/enums';
import {sortFilmsByDate, sortFilmsByRating} from './sorting';

const SORTING_TYPE_ARRAY_INDEX = 1;

export const getSortingFunctionFromSearch = () => {
  const searchRegExpResult = window.location.search.match(SearchRegExp.SORTING);
  const sortingType = searchRegExpResult && searchRegExpResult[SORTING_TYPE_ARRAY_INDEX];

  switch (sortingType) {
    case SortingType.DATE:
      return sortFilmsByDate;

    case SortingType.RATING:
      return sortFilmsByRating;

    default:
      return null;
  }
};
