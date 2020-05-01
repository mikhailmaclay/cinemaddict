import './film-details-new-comment.styles.scss';

const createFilmDetailsNewCommentTemplate = (emoji) => {
  return (
    `<form class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${emoji ? `<img src="/images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ``}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment-text" required></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emotion" type="radio" id="emoji-smile" value="smile" required>
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="/images/emoji/smile.png" width="30  " height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emotion" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="/images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emotion" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="/images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emotion" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="/images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </form>`
  );
};

export default createFilmDetailsNewCommentTemplate;
