// Constants and utils
import {DateFormat} from '../../constants/enums';
import {formatDate} from '../../utils/date';
//
import createMockComments from '../../mocks/comments';

const createCommentTemplate = (comment) => {
  const {author, text, date, emotion} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="/images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDate(date, DateFormat.COMMENT_DATE)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createFilmDetailsCommentListTemplate = (comments) => {
  comments = createMockComments(comments.length);

  if (comments.length) {
    const isLoaded = comments[0] !== undefined;

    return isLoaded ? (
      `<ul class="film-details__comments-list">
        ${comments.map(createCommentTemplate).join(`\n`)}
      </ul>`
    ) : `<p>Loading...</p>`;
  } else {
    return ``;
  }
};

export default createFilmDetailsCommentListTemplate;
