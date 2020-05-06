// Libraries
import he from 'he';
// Constants and utils
import {Comment} from '../utils/adapters';
import {bind} from '../utils/components';
import {cloneObject} from '../utils/objects';
//
import FilmDetailsView from '../views/film-details/film-details';
import FilmDetailsNewCommentView from '../views/film-details-new-comment/film-details-new-comment';
import FilmDetailsCommentListView from '../views/film-details-comments-list/film-details-comment-list';
import RootPresenter from './root';
import FilmDetailsControlsView from '../views/film-details-controls/film-details-controls';
import FilmDetailsInfoWrapView from '../views/film-details-info-wrap/film-details-info-wrap';
import FilmDetailsCommentsCountView from '../views/film-details-comments-count/film-details-comments-count';
import {provider} from '../index';

export default class FilmDetailsModalPresenter extends RootPresenter {
  constructor(container, filmsModel, notificationModel) {
    super(container, notificationModel);

    this._filmID = null;

    this.__filmsModel = filmsModel;

    this.__filmDetailsView = new FilmDetailsView(null);
    this.__filmDetailsInfoWrapView = new FilmDetailsInfoWrapView(null);
    this.__filmDetailsControlsView = new FilmDetailsControlsView({});
    this.__filmDetailsCommentsCountView = new FilmDetailsCommentsCountView(null);
    this.__filmDetailsCommentListView = new FilmDetailsCommentListView(null);
    this.__filmDetailsNewCommentView = new FilmDetailsNewCommentView();

    bind(this,
        this.__handleFilmCommentsFilmsModelChange,
        this.__handleFilmUserDetailsFilmsModelChange,
        this._handleOnline,
        this._handleOffline,
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

    this.__filmsModel.addFilmCommentsChangeHandler(this.__handleFilmCommentsFilmsModelChange);
    this.__filmsModel.addFilmUserDetailsChangeHandler(this.__handleFilmUserDetailsFilmsModelChange);
    window.addEventListener(`online`, this._handleOnline);
    window.addEventListener(`offline`, this._handleOffline);

    if (filmID) {
      this._filmID = filmID; // Записываю в свойства экземпляра класса, чтобы можно было использовать при перерисовке (rerender).
    }

    const film = this.__filmsModel.readFilm(this._filmID);
    const areCommentsRead = !Array.isArray(this.__filmsModel.readComments(this._filmID));

    this.__filmDetailsView.film = film;
    this.__filmDetailsInfoWrapView.filmInfo = film.filmInfo;
    this.__filmDetailsControlsView.userDetails = film.userDetails;
    this.__filmDetailsCommentsCountView.commentsCount = areCommentsRead ? Object.values(film.comments).length : film.comments.length;
    this.__filmDetailsCommentListView.comments = film.comments;
    this.__filmDetailsCommentListView.isOnlyReadMode = !window.navigator.onLine;

    this.__filmDetailsControlsView.onWatchlistCheckboxChange = this._handleWatchlistCheckboxChange;
    this.__filmDetailsControlsView.onWatchedCheckboxChange = this._handleWatchedCheckboxChange;
    this.__filmDetailsControlsView.onFavoriteCheckboxChange = this._handleFavoriteCheckboxChange;

    this.__filmDetailsNewCommentView.onCommentSubmit = this._handleCommentSubmit;
    this.__filmDetailsCommentListView.onCommentDeleteButtonClick = this._handleCommentDeleteButtonClick;

    this.__filmDetailsView.render(this.__container);
    this.__filmDetailsInfoWrapView.render(this.__filmDetailsView.topContainer);
    this.__filmDetailsControlsView.render(this.__filmDetailsView.topContainer);
    this.__filmDetailsCommentsCountView.render(this.__filmDetailsView.commentsWrap);
    this.__filmDetailsCommentListView.render(this.__filmDetailsView.commentsWrap);

    if (window.navigator.onLine) {
      this.__filmDetailsNewCommentView.render(this.__filmDetailsView.commentsWrap);
    }

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
    const areCommentsRead = !Array.isArray(this.__filmsModel.readComments(this._filmID));

    if (!areCommentsRead) {
      provider.readComments(this._filmID)
        .then(this._handleReadCommentsFulfilled)
        .catch(this._handleReadCommentsRejected);
    }

    this.__filmDetailsCommentListView.placeholder = null;
  }

  __handleFilmUserDetailsFilmsModelChange() {
    const film = this.__filmsModel.readFilm(this._filmID);

    this.__filmDetailsControlsView.userDetails = film.userDetails;
  }

  __handleFilmCommentsFilmsModelChange() {
    const film = this.__filmsModel.readFilm(this._filmID);

    this.__filmDetailsCommentListView.comments = film.comments;
    this.__filmDetailsCommentsCountView.commentsCount = Object.values(film.comments).length;

    this._readComments();
  }

  _handleOnline() {
    this.__filmDetailsNewCommentView.render(this.__filmDetailsView.commentsWrap);
    this.__filmDetailsCommentListView.isOnlyReadMode = !window.navigator.onLine;
  }

  _handleOffline() {
    this.__filmDetailsNewCommentView.remove();
    this.__filmDetailsCommentListView.isOnlyReadMode = !window.navigator.onLine;
  }

  _handleWatchlistCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    const film = cloneObject(this.__filmsModel.readFilm(this._filmID), true);
    film.userDetails.isInWatchlist = value;

    return provider.updateFilm(this._filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  _handleWatchedCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    const film = cloneObject(this.__filmsModel.readFilm(this._filmID), true);
    film.userDetails.isAlreadyWatched = value;
    film.userDetails.watchingDate = value ? new Date() : null;

    return provider.updateFilm(this._filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  _handleFavoriteCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    const film = cloneObject(this.__filmsModel.readFilm(this._filmID), true);
    film.userDetails.isFavorite = value;

    return provider.updateFilm(this._filmID, film)
      .then(this._handleUpdateFilmFulfilled);
  }

  _handleCommentSubmit(evt) {
    const {target} = evt;
    const formData = new FormData(target);
    const comment = new Comment({text: he.encode(formData.get(`comment-text`)), emotion: he.encode(formData.get(`comment-emotion`))});

    return provider.createComment(this._filmID, comment)
      .then(this._handleCreateCommentFulfilled);
  }

  _handleCommentDeleteButtonClick(evt) {
    const {target} = evt;
    const {commentId: commentID} = target.dataset;


    return provider.deleteComment(this._filmID, commentID)
      .then(() => {
        this.__filmsModel.deleteComment(this._filmID, commentID);
      });
  }

  _handleReadCommentsFulfilled(comments) {
    this.__filmDetailsCommentListView.placeholder = null;

    this.__filmsModel.updateComments(this._filmID, comments);
  }

  _handleReadCommentsRejected(reason) {
    this.__filmDetailsCommentListView.placeholder = `<p>An error occurred while loading comments. Please try again later.</p>`;

    throw reason;
  }

  _handleUpdateFilmFulfilled(film) {
    this.__filmsModel.updateFilm(this._filmID, film);
  }

  _handleCreateCommentFulfilled(comments) {
    this.__filmsModel.updateComments(this._filmID, comments);
  }
}
