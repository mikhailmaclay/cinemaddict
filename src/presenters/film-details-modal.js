// Libraries
import he from 'he';
// Constants and utils
import {Notification, NotificationTimeValue, RenderPosition} from '../constants/enums';
import {Comment} from '../utils/adapters';
import {bind} from '../utils/components';
import {cloneObject, reduceArrayToMapByID} from '../utils/objects';
//
import FilmDetailsView from '../views/film-details/film-details';
import FilmDetailsNewCommentView from '../views/film-details-new-comment/film-details-new-comment';
import FilmDetailsCommentListView from '../views/film-details-comments-list/film-details-comment-list';
import RootPresenter from './root';
import {api} from '../index';

export default class FilmDetailsModalPresenter extends RootPresenter {
  constructor(container, filmsModel, notificationModel) {
    super(container, notificationModel);

    this._filmID = null;

    this.__filmsModel = filmsModel;

    this.__filmDetailsView = new FilmDetailsView(null);
    this.__filmDetailsCommentListView = new FilmDetailsCommentListView(null);
    this.__filmDetailsNewCommentView = new FilmDetailsNewCommentView();

    bind(this,
        this.__handleFilmsModelChange,
        this._handleWatchlistCheckboxChange,
        this._handleWatchedCheckboxChange,
        this._handleFavoriteCheckboxChange,
        this._handleCommentSubmit,
        this._handleCommentDeleteButtonClick,
        this._handleReadCommentsFulfilled,
        this._handleReadCommentsRejected,
        this._handleUpdateFilmFulfilled,
        this._handleCreateCommentFulfilled
    );
  }

  render(filmID) {
    super.render();

    this.__filmsModel.addChangeHandler(this.__handleFilmsModelChange);

    if (filmID) {
      this._filmID = filmID; // Записываю в свойства экземпляра класса, чтобы можно было использовать при перерисовке (rerender).
    }

    const film = this.__filmsModel.state[this._filmID];

    this.__filmDetailsView.film = film;
    this.__filmDetailsCommentListView.comments = film.comments;
    this.__filmDetailsView.onWatchlistCheckboxChange = this._handleWatchlistCheckboxChange;
    this.__filmDetailsView.onWatchedCheckboxChange = this._handleWatchedCheckboxChange;
    this.__filmDetailsView.onFavoriteCheckboxChange = this._handleFavoriteCheckboxChange;
    this.__filmDetailsNewCommentView.onCommentSubmit = this._handleCommentSubmit;
    this.__filmDetailsCommentListView.onCommentDeleteButtonClick = this._handleCommentDeleteButtonClick;

    this.__filmDetailsView.render(this.__container);
    this.__filmDetailsCommentListView.render(() => this.__filmDetailsView.title, RenderPosition.AFTER);
    this.__filmDetailsNewCommentView.render(() => this.__filmDetailsView.commentsWrap);

    this._readComments();
  }

  remove() {
    super.remove();

    this.__filmsModel.removeChangeHandler(this.__handleFilmsModelChange);
    this.__filmDetailsView.remove();
    this.__filmDetailsCommentListView.remove();
    this.__filmDetailsNewCommentView.remove();
  }

  _readComments() {
    const film = this.__filmsModel.state[this._filmID];
    const areCommentsRead = !film.comments.hasOwnProperty(`length`);

    if (!areCommentsRead) {
      api.readComments(this._filmID)
        .then(this._handleReadCommentsFulfilled)
        .catch(this._handleReadCommentsRejected);
    }
  }

  __handleFilmsModelChange() {
    const film = this.__filmsModel.state[this._filmID];

    this.__filmDetailsView.film = film;
    this.__filmDetailsCommentListView.comments = film.comments;
    this.__filmDetailsNewCommentView.rerender();

    this._readComments();
  }

  _handleWatchlistCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    const film = cloneObject(this.__filmsModel.state[this._filmID], true);
    film.userDetails.isInWatchlist = value;

    return api.updateFilm(this._filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  _handleWatchedCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    const film = cloneObject(this.__filmsModel.state[this._filmID], true);
    film.userDetails.isAlreadyWatched = value;

    return api.updateFilm(this._filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  _handleFavoriteCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    const film = cloneObject(this.__filmsModel.state[this._filmID], true);
    film.userDetails.isFavorite = value;

    return api.updateFilm(this._filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  _handleCommentSubmit(evt) {
    const {target} = evt;
    const formData = new FormData(target);
    const comment = new Comment({text: he.encode(formData.get(`comment-text`)), emotion: he.encode(formData.get(`comment-emotion`))});

    return api.createComment(this._filmID, comment)
      .then(this._handleCreateCommentFulfilled)
      .catch((reason) => {
        this.__notificationModel.set(NotificationTimeValue.LONG, ...Notification.CREATE_COMMENT_FAILURE);

        throw reason;
      });
  }

  _handleCommentDeleteButtonClick(evt) {
    const {target} = evt;
    const {commentId: commentID} = target.dataset;


    return api.deleteComment(commentID)
      .then(() => {
        const comments = cloneObject(this.__filmsModel.state[this._filmID].comments);
        delete comments[commentID];

        this.__filmsModel.updateFilm(this._filmID, {comments});
      })
      .catch((reason) => {
        this.__notificationModel.set(NotificationTimeValue.LONG, ...Notification.DELETE_COMMENT_FAILURE);

        throw reason;
      });
  }

  _handleReadCommentsFulfilled(comments) {
    this.__filmDetailsCommentListView.placeholder = null;

    const newFilm = cloneObject(this.__filmsModel.state[this._filmID]);

    newFilm.comments = comments.reduce(reduceArrayToMapByID, {});
    this.__filmsModel.updateFilm(this._filmID, newFilm);
  }

  _handleReadCommentsRejected(reason) {
    this.__filmDetailsCommentListView.placeholder = `<p>An error occurred while loading comments. Please try again later.</p>`;

    throw reason;
  }

  _handleUpdateFilmFulfilled(film) {
    this.__filmsModel.updateFilm(this._filmID, film);
  }

  _handleCreateCommentFulfilled(film) {
    this.__filmsModel.updateFilm(this._filmID, film);
  }
}
