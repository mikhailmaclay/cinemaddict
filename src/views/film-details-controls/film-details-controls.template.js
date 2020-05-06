const createFilmDetailsControlsTemplate = (userDetails) => {
  const {isInWatchlist, isAlreadyWatched, isFavorite} = userDetails;

  return (
    `<form class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${isInWatchlist ? `In watchlist` : `Add to watchlist`}</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">${isAlreadyWatched ? `Already watched` : `Not watched`}</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${isFavorite ? `Favorite` : `Add to favorites`}</label>
    </form>`
  );
};

export default createFilmDetailsControlsTemplate;
