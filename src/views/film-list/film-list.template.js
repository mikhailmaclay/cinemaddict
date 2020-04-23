import createFilmCardTemplate from '../film-card/film-card.template';

const createFilmListShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createFilmCardTemplates = (films) => {
  if (!films) {
    return `<h2 class="films-list__title">Loading</h2>`;
  }

  if (!films.length) {
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }

  return films.map(createFilmCardTemplate).join(`\n`);
};

const createFilmListTemplate = (films, heading, isShowMoreVisible, isExtra = false) => {
  return (
    `<section class="${isExtra ? `films-list--extra` : `films-list`}">
      <h2 class="films-list__title ${isExtra ? `` : `visually-hidden`}">${heading}</h2>
      <div class="films-list__container">
        ${createFilmCardTemplates(films)}
      </div>
      ${isShowMoreVisible ? createFilmListShowMoreTemplate() : ``}
    </section>`
  );
};

export default createFilmListTemplate;
