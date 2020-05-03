// Constants and utils
import Config from '../../constants/config';
import {DateFormat, PathNameRegExp} from '../../constants/enums';
import Router from '../../utils/router';
import {FIRST_ARRAY_ELEMENT_INDEX} from '../../constants/common';
import {formatDate, formatDuration} from '../../utils/date';
import {pluralize} from '../../utils/numbers';
import {cutText} from '../../utils/strings';

const createFilmCardTemplate = (film) => {
  const {id, filmInfo, userDetails} = film;
  let {comments} = film;
  const {title, totalRating, poster, release, runtime, genres, description} = filmInfo;
  const {date} = release;
  const {isInWatchlist, isAlreadyWatched, isFavorite} = userDetails;

  const areCommentsRead = !comments.hasOwnProperty(`length`);
  comments = areCommentsRead ? Object.values(comments) : comments;

  return (
    `<article class="film-card">
      <h3 class="film-card__title"><a href="/films/${id}" style="color: inherit;">${title}</a></h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(date, DateFormat.FILM_CARD_DATE)}</span>
        <span class="film-card__duration">${formatDuration(runtime, DateFormat.FILM_RUNTIME).replace(/^0h | 0m/, ``)}</span>
        ${genres[FIRST_ARRAY_ELEMENT_INDEX] ? `<span class="film-card__genre">${genres[FIRST_ARRAY_ELEMENT_INDEX]}</span>` : ``}
      </p>
      <a href="/films/${id}">
        <img src="${poster}" alt="${title}" class="film-card__poster">
      </a>
      <p class="film-card__description">${cutText(description, Config.FILM_CARD_DESCRIPTION_MAX_LENGTH)}</p>
      <a href="/films/${id}" class="film-card__comments">${comments.length} ${pluralize(comments.length, [`comment`, `comments`])}</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}" type="button" data-film-id="${id}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched ? `film-card__controls-item--active` : ``}" type="button" data-film-id="${id}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}" type="button" data-film-id="${id}">Mark as favorite</button>
      </div>
    </article>`
  );
};

const createFilmListTemplate = (films, heading, isShowMoreVisible, isExtra = false) => {
  const noFilmsMessage = Router.matchPathName(PathNameRegExp.MAIN_PAGE) ? `There are no movies in our database` : `You have not added movies to this category yet`;

  if (isExtra) {
    return (films && !films.length) ? `` : (
      `<section class="films-list--extra">
        <h2 class="films-list__title">${heading}</h2>
        <div class="films-list__container">
            ${films.map(createFilmCardTemplate).join(`\n`)}
        </div>
      </section>`
    );
  }

  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">${heading}</h2>
      <div class="films-list__container">
        ${(!films && `<h2 class="films-list__title">Loading...</h2>`) || (!films.length && `<h2 class="films-list__title">${noFilmsMessage}</h2>`) || films.map(createFilmCardTemplate).join(`\n`)}
      </div>
      ${isShowMoreVisible ? `<button class="films-list__show-more">Show more</button>` : ``}
    </section>`
  );
};

export default createFilmListTemplate;
