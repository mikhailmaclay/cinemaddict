// Libraries
import he from 'he';
// Constants and utils
import {Notification, NotificationTimeValue, TimeValue} from '../constants/enums';
import {Comment} from '../utils/adapters';
import {bind} from '../utils/components';
import {cloneObject, reduceArrayToMapByID} from '../utils/objects';
//
import FilmDetailsView from '../views/film-details/film-details';
import FilmDetailsNewCommentView from '../views/film-details-new-comment/film-details-new-comment';
import FilmDetailsCommentListView from '../views/film-details-comments-list/film-details-comment-list';
import RootPresenter from './root';
import createMockComments from '../mocks/comments';

const FAKE_REQUEST_TIME_VALUE = TimeValue.MILLISECOND.SECOND * 0.5;

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
        this._handleCommentDeleteButtonClick
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
    this.__filmDetailsCommentListView.render(() => this.__filmDetailsView.commentsWrap);
    this.__filmDetailsNewCommentView.render(() => this.__filmDetailsView.commentsWrap);

    const areCommentsLoaded = !film.comments.hasOwnProperty(`length`);

    if (!areCommentsLoaded) {
      const newFilm = cloneObject(this.__filmsModel.state[this._filmID]);

      newFilm.comments = createMockComments(film.comments.length).map((comment) => new Comment(comment)).reduce(reduceArrayToMapByID, {});

      setTimeout(() => this.__filmsModel.updateFilm(filmID, newFilm), FAKE_REQUEST_TIME_VALUE);
    }
  }

  remove() {
    super.remove();

    this.__filmsModel.removeChangeHandler(this.__handleFilmsModelChange);
    this.__filmDetailsView.remove();
    this.__filmDetailsCommentListView.remove();
    this.__filmDetailsNewCommentView.remove();
  }

  __handleFilmsModelChange() {
    const film = this.__filmsModel.state[this._filmID];

    this.__filmDetailsView.film = film;
    this.__filmDetailsCommentListView.comments = film.comments;
    this.__filmDetailsNewCommentView.rerender();
  }

  _handleWatchlistCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    return new Promise((resolve) => {
      setTimeout(() => {
        const userDetails = cloneObject(this.__filmsModel.state[this._filmID].userDetails);

        userDetails.isInWatchlist = value;

        this.__filmsModel.updateFilm(this._filmID, {userDetails});

        resolve();
      }, FAKE_REQUEST_TIME_VALUE);
    });
  }

  _handleWatchedCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    return new Promise((resolve) => {
      setTimeout(() => {
        const userDetails = cloneObject(this.__filmsModel.state[this._filmID].userDetails);

        userDetails.isAlreadyWatched = value;
        userDetails.watchingDate = value ? new Date().toISOString() : null;

        this.__filmsModel.updateFilm(this._filmID, {userDetails});

        resolve();
      }, FAKE_REQUEST_TIME_VALUE);
    });
  }

  _handleFavoriteCheckboxChange(evt) {
    const {target} = evt;
    const {checked: value} = target;

    return new Promise((resolve) => {
      setTimeout(() => {
        const userDetails = cloneObject(this.__filmsModel.state[this._filmID].userDetails);

        userDetails.isFavorite = value;

        this.__filmsModel.updateFilm(this._filmID, {userDetails});

        resolve();
      }, FAKE_REQUEST_TIME_VALUE);
    });
  }

  _handleCommentSubmit(evt) {
    const {target} = evt;

    const formData = new FormData(target);
    const comments = cloneObject(this.__filmsModel.state[this._filmID].comments);
    const comment = new Comment({text: he.encode(formData.get(`comment-text`)), emotion: he.encode(formData.get(`comment-emotion`))});

    comments[comment.id] = comment;

    return new Promise((resolve) => {
      setTimeout(() => {
        this.__filmsModel.updateFilm(this._filmID, {comments});
        resolve();
      }, FAKE_REQUEST_TIME_VALUE);
    })
      .catch((reason) => {
        this.__notificationModel.set(NotificationTimeValue.LONG, ...Notification.ADD_COMMENT_FAILURE);

        throw reason;
      });
  }

  _handleCommentDeleteButtonClick(evt) {
    const {target} = evt;
    const {commentId: commentID} = target.dataset;
    const comments = cloneObject(this.__filmsModel.state[this._filmID].comments);
    delete comments[commentID];

    return new Promise((resolve) => {
      setTimeout(() => {
        this.__filmsModel.updateFilm(this._filmID, {comments});

        resolve();
      }, FAKE_REQUEST_TIME_VALUE);
    })
      .catch((reason) => {
        this.__notificationModel.set(NotificationTimeValue.LONG, ...Notification.DELETE_COMMENT_FAILURE);

        throw reason;
      });
  }
}
