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
