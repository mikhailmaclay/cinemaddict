// Constants and utils
import Config from '../../constants/config';
import {DateFormat} from '../../constants/enums';
import {formatDate, formatDuration} from '../../utils/date';
import {pluralize} from '../../utils/numbers';
import {cutText} from '../../utils/strings';

const FIRST_GENRE = 0;

const createFilmCardTemplate = (film) => {
  const {id, comments, filmInfo, userDetails} = film;
  const {title, totalRating, poster, release, runtime, genres, description} = filmInfo;
  const {date} = release;
  const {isInWatchlist, isAlreadyWatched, isFavorite} = userDetails;

  return (
    `<article class="film-card">
      <h3 class="film-card__title"><a href="/films/${id}" style="color: inherit;">${title}</a></h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(date, DateFormat.FILM_CARD_DATE)}</span>
        <span class="film-card__duration">${formatDuration(runtime, DateFormat.FILM_RUNTIME).replace(/^0h | 0m/, ``)}</span>
        <span class="film-card__genre">${genres[FIRST_GENRE]}</span>
      </p>
      <a href="/films/${id}">
        <img src="${poster}" alt="${title}" class="film-card__poster">
      </a>
      <p class="film-card__description">${cutText(description, Config.FILM_CARD_DESCRIPTION_MAX_LENGTH)}</p>
      <a href="/films/${id}" class="film-card__comments">${comments.length} ${pluralize(comments.length, [`comment`, `comments`])}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default createFilmCardTemplate;
