// Constants and utils
import {formatDate, formatDuration} from '../../utils/date';
import {DateFormat} from '../../constants/enums';
//
import './film-details.styles.scss';

const createFilmDetailsTemplate = (film) => {
  const {filmInfo, userDetails} = film;
  let {comments} = film;
  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genres, description} = filmInfo;
  const {date, country} = release;
  const {isInWatchlist, isAlreadyWatched, isFavorite} = userDetails;

  const areCommentsLoaded = !comments.hasOwnProperty(`length`);
  comments = areCommentsLoaded ? Object.values(comments) : comments;

  return (
    `<section class="film-details">
      <div class="film-details__inner">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <a href="/" class="film-details__close-btn">close</a>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
    ${title !== alternativeTitle ? (
      `<p class="film-details__title-original">Original: ${alternativeTitle}</p>`
    ) : ``}
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatDate(date, DateFormat.FILM_DETAILS_DATE)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatDuration(runtime, DateFormat.FILM_RUNTIME)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`)}
                </tr>
              </tbody></table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <form class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${isInWatchlist ? `In watchlist` : `Add to watchlist`}</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">${isAlreadyWatched ? `Already watched` : `Not watched`}</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${isFavorite ? `Favorite` : `Add to favorites`}</label>
          </form>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments: <span class="film-details__comments-count">${comments.length}</span></h3>
          </section>
        </div>
      </div>
    </section>`
  );
};

export default createFilmDetailsTemplate;
