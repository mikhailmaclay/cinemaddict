import './film-details.styles.scss';

const createFilmDetailsTemplate = (film) => {
  let {comments} = film;

  const areCommentsRead = !comments.hasOwnProperty(`length`);
  comments = areCommentsRead ? Object.values(comments) : comments;

  return (
    `<section class="film-details">
      <div class="film-details__inner">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <a href="/" class="film-details__close-btn">close</a>
          </div>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">

          </section>
        </div>
      </div>
    </section>`
  );
};

export default createFilmDetailsTemplate;
