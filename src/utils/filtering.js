// Constants and utils
import {TimePeriodName} from '../constants/enums';

export const filterWatchlistFilms = (films) => {
  const watchlistFilms = [];

  films.forEach((film) => {
    const {userDetails} = film;
    const {isInWatchlist} = userDetails;

    if (isInWatchlist) {
      watchlistFilms.push(film);
    }
  });

  return watchlistFilms;
};

export const filterHistoryFilms = (films) => {
  const historyFilms = [];

  films.forEach((film) => {
    const {userDetails} = film;
    const {isAlreadyWatched} = userDetails;

    if (isAlreadyWatched) {
      historyFilms.push(film);
    }
  });

  return historyFilms;
};

export const filterFavoritesFilms = (films) => {
  const favoritesFilms = [];

  films.forEach((film) => {
    const {userDetails} = film;
    const {isFavorite} = userDetails;

    if (isFavorite) {
      favoritesFilms.push(film);
    }
  });

  return favoritesFilms;
};

export const filterFilmsByWatchingDate = (films, timePeriod) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentMonthDay = currentDate.getDate();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();
  const currentMilliseconds = currentDate.getMilliseconds();
  let dateToCompare;

  switch (timePeriod) {
    case TimePeriodName.TODAY:
      dateToCompare = new Date(currentYear, currentMonth, currentMonthDay);

      break;

    case TimePeriodName.WEEK:
      dateToCompare = new Date(currentYear, currentMonth, currentMonthDay - 7, currentHours, currentMinutes, currentSeconds, currentMilliseconds);

      break;

    case TimePeriodName.MONTH:
      dateToCompare = new Date(currentYear, currentMonth - 1, currentMonthDay, currentHours, currentMinutes, currentSeconds, currentMilliseconds);

      break;

    case TimePeriodName.YEAR:
      dateToCompare = new Date(currentYear - 1, currentMonth, currentMonthDay, currentHours, currentMinutes, currentSeconds, currentMilliseconds);

      break;

    default:
      dateToCompare = null;
  }

  if (!dateToCompare) {
    return films;
  }

  return films.filter((film) => {
    const watchingDate = film.userDetails.watchingDate ? new Date(film.userDetails.watchingDate) : null;

    if (!watchingDate) {
      return null;
    }

    return watchingDate >= dateToCompare;
  });
};
