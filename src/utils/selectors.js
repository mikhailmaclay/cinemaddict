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

  if (films.every((film) => film.filmInfo.totalRating === 0)) {
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

  const filmsWithComments = films.filter((film) => {
    const areCommentsLoaded = !film.comments.hasOwnProperty(`length`);

    return areCommentsLoaded ? Object.values(film.comments).length > 0 : film.comments.length > 0;
  });

  if (!filmsWithComments.length) {
    return [];
  }

  const sortedFilmsByCommentsCount = sortFilmsByCommentsCount(filmsWithComments);

  return sortedFilmsByCommentsCount.slice(0, Math.min(sortedFilmsByCommentsCount.length, Config.EXTRA_FILM_CARDS_COUNT));
};

export const selectFilmCountsByFilterCategories = (films) => {
  if (!films) {
    return null;
  }

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
