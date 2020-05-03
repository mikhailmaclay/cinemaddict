// Constants and utils
import {DateFormat} from '../../constants/enums';
import {formatDate} from '../../utils/date';
//

const createCommentTemplate = (comment) => {
  const {id, author, text, date, emotion} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="/images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDate(date, DateFormat.FROM_NOW)}</span>
          <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createFilmDetailsCommentListTemplate = (comments) => {
  const areCommentsRead = !comments.hasOwnProperty(`length`);
  comments = areCommentsRead ? Object.values(comments) : comments;

  if (!areCommentsRead) {
    return `<p>Loading...</p>`;
  }

  if (!comments.length) {
    return ``;
  }

  return (
    `<ul class="film-details__comments-list">
      ${comments.map(createCommentTemplate).join(`\n`)}
    </ul>`
  );
};

export default createFilmDetailsCommentListTemplate;
