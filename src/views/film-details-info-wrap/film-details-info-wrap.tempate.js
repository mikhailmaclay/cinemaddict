// Constants and utils
import {DateFormat} from '../../constants/enums';
import {formatDate, formatDuration} from '../../utils/date';

const createFilmDetailsInfoWrapTemplate = (filmInfo) => {
  if (!filmInfo) {
    return ``;
  }

  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genres, description} = filmInfo;
  const {date, country} = release;

  return (
    `<div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="/${poster}" alt="${title}">

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
          <tbody>
          <tr class="film-details__row">
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
    ${genres.length ? (
      `<tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
          ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`)}
      </tr>`
    ) : ``}
          </tbody>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>`
  );
};

export default createFilmDetailsInfoWrapTemplate;
