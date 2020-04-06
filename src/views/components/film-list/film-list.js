function createFilmListTemplate(children, isExtra = false) {
  const {heading, films, showMoreButton} = children;

  return (
    `<section class="${isExtra ? `films-list--extra` : `films-list`}">
      <h2 class="films-list__title ${isExtra ? `` : `visually-hidden`}">${heading}</h2>

      <div class="films-list__container">${films}</div>

      ${isExtra ? `` : showMoreButton}
    </section>`
  );
}

export default createFilmListTemplate;
