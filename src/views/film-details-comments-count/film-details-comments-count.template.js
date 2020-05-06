const createFilmDetailsCommentsCountTemplate = (commentsCount) => {
  return `<h3 class="film-details__comments-title">Comments: <span class="film-details__comments-count">${commentsCount}</span></h3>`;
};

export default createFilmDetailsCommentsCountTemplate;
