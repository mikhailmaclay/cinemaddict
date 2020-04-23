// Constants and utils
import Config from '../constants/config';
import {sortFilmsByCommentsCount, sortFilmsByRating} from './sorting';

export const selectTopRatedFilms = (films) => {
  if (!films) {
    return null;
  }

  if (!films.length) {
    return [];
  }

  return sortFilmsByRating(films).slice(0, Config.EXTRA_FILM_CARDS_COUNT);
};

export const selectMostCommentedFilms = (films) => {
  if (!films) {
    return null;
  }

  if (!films.length) {
    return [];
  }

  return sortFilmsByCommentsCount(films).slice(0, Config.EXTRA_FILM_CARDS_COUNT);
};

export const selectFilmCountsByFilterCategories = (films) => {
  return films.reduce((filmCountsByFilterCategories, film) => {
    const {userDetails} = film;
    const {isInWatchlist, isAlreadyWatched, isFavorite} = userDetails;

    if (isInWatchlist) {
      filmCountsByFilterCategories.watchlist += 1;
    }

    if (isAlreadyWatched) {
      filmCountsByFilterCategories.history += 1;
    }

    if (isFavorite) {
      filmCountsByFilterCategories.favorites += 1;
    }

    return filmCountsByFilterCategories;
  }, {watchlist: 0, history: 0, favorites: 0});
};
