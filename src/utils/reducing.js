// Constants and utils
import Config from '../constants/config';
import {FIRST_ARRAY_ELEMENT_INDEX} from '../constants/common';
import {filterHistoryFilms} from './filtering';

export const reduceFilmsToStatistic = (films) => {
  if (!films) {
    return null;
  }

  return {
    totalDuration: reduceFilmsToTotalDuration(films),
    topGenre: reduceFilmsToMostPopularGenre(films),
    watchedFilmsCount: (films && films.length) || 0
  };
};

export const reduceFilmsToTotalDuration = (films) => films ? films.reduce((totalDuration, film) => totalDuration + film.filmInfo.runtime, 0) : 0;

export const reduceFilmsToMostPopularGenre = (films) => {
  if (!films || !films.length) {
    return null;
  }

  const genresWithCounts = reduceFilmsToCountsByGenres(films);

  return Object.keys(genresWithCounts)
    .map((key) => ({genre: key, count: genresWithCounts[key]}))
    .sort((genreWithCountA, genreWithCountB) => genreWithCountB.count - genreWithCountA.count)[FIRST_ARRAY_ELEMENT_INDEX].genre;
};

export const reduceFilmsToRank = (films) => {
  let rank = null;
  const watchedFilms = filterHistoryFilms(films);

  for (let rankConfig of Config.PROFILE_RANK) {
    const {name, fromWatchedFilmsCount} = rankConfig;

    if (watchedFilms.length > fromWatchedFilmsCount) {
      rank = name;
    }
  }

  return rank;
};

export const reduceFilmsToCountsByGenres = (films) => {
  if (!films) {
    return null;
  }

  return films.reduce((genres, film) => {
    const currentFilmGenre = film.filmInfo.genres[FIRST_ARRAY_ELEMENT_INDEX];

    if (genres[currentFilmGenre]) {
      ++genres[currentFilmGenre];
    } else {
      genres[currentFilmGenre] = 1;
    }

    return genres;
  }, {});
};
