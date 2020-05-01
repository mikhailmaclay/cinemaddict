// Libraries
import he from 'he';
// Constants and utils
import {Notification, NotificationTimeValue, TimeValue} from '../constants/enums';
import {FIRST_ARRAY_ELEMENT_INDEX} from '../constants/common';
import {Comment} from '../utils/adapters';
import {bind} from '../utils/components';
import {cloneObject, reduceArrayToMapByID} from '../utils/objects';
//
import FilmDetailsView from '../views/film-details/film-details';
import FilmDetailsNewCommentView from '../views/film-details-new-comment/film-details-new-comment';
import FilmDetailsCommentListView from '../views/film-details-comments-list/film-details-comment-list';
import NotificationView from '../views/notification/notification';
import createMockComments from '../mocks/comments';

const FAKE_REQUEST_TIME_VALUE = TimeValue.MILLISECOND.SECOND * 0.5;

export default class FilmDetailsModalPresenter {
  constructor(container, filmsModel, notificationModel) {
    this.__container = container;

    this._filmID = null;

    this.__filmsModel = filmsModel;
    this.__notificationModel = notificationModel;

    this.__filmDetailsView = new FilmDetailsView(null);
    this.__filmDetailsCommentListView = new FilmDetailsCommentListView(null);
    this.__filmDetailsNewCommentView = new FilmDetailsNewCommentView();
    this.__notificationView = new NotificationView(null);

    bind(this,
        this.__handleFilmsModelChange,
        this.__handleNotificationModelChange,
        this._handleWatchlistCheckboxChange,
        this._handleWatchedCheckboxChange,
        this._handleFavoriteCheckboxChange,
        this._handleCommentSubmit,
        this._handleNotificationCloseButtonClick,
        this._handleCommentDeleteButtonClick
    );
  }

  render(filmID) {
    this.__filmsModel.addChangeHandler(this.__handleFilmsModelChange);
    this.__notificationModel.addChangeHandler(this.__handleNotificationModelChange);

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
    this.__notificationView.onCloseButtonClick = this._handleNotificationCloseButtonClick;
    this.__filmDetailsCommentListView.onCommentDeleteButtonClick = this._handleCommentDeleteButtonClick;

    this.__filmDetailsView.render(this.__container);
    this.__filmDetailsCommentListView.render(() => this.__filmDetailsView.commentsWrap);
    this.__filmDetailsNewCommentView.render(() => this.__filmDetailsView.commentsWrap);
    this.__notificationView.render(this.__container);

    const areCommentsLoaded = Boolean(film.comments[FIRST_ARRAY_ELEMENT_INDEX]);

    if (!areCommentsLoaded) {
      const newFilm = cloneObject(this.__filmsModel.state[this._filmID]);

      newFilm.comments = createMockComments(film.comments.length).map((comment) => new Comment(comment)).reduce(reduceArrayToMapByID, {});

      this.__filmsModel.updateFilm(filmID, newFilm);
    }
  }

  remove() {
    this.__filmsModel.removeChangeHandler(this.__handleFilmsModelChange);
    this.__filmDetailsView.remove();
    this.__filmDetailsCommentListView.remove();
    this.__filmDetailsNewCommentView.remove();
    this.__notificationView.remove();
  }

  __handleFilmsModelChange() {
    const film = this.__filmsModel.state[this._filmID];

    this.__filmDetailsView.film = film;
    this.__filmDetailsCommentListView.comments = film.comments;
    this.__filmDetailsNewCommentView.rerender();
  }

  _handleNotificationCloseButtonClick() {
    this.__notificationModel.unset();
  }

  __handleNotificationModelChange() {
    this.__notificationView.notification = this.__notificationModel.state;
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
