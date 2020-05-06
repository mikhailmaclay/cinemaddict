// Constants and utils
import {convertArrayToMapByID, convertMapToArray, mergeObjects} from '../utils/objects';
//
import Model from './abstract/model';

export default class FilmsModel extends Model {
  constructor() {
    super();

    this._filmCommentsChangeHandlers = new Set();
    this._filmUserDetailsChangeHandlers = new Set();
  }

  set state(value) {
    this.__state = convertArrayToMapByID(value);

    this.__callChangeHandlers();
    this.__callFilmUserDetailsChangeHandlers();
  }

  get state() {
    return convertMapToArray(this.__state);
  }

  readFilm(filmID) {
    return this.__state[filmID];
  }

  updateFilm(filmID, film) {
    this.__state[filmID] = mergeObjects(this.__state[filmID], film, true);

    this.__callChangeHandlers();
    this.__callFilmUserDetailsChangeHandlers();
  }

  readComments(filmID) {
    return this.__state[filmID].comments;
  }

  updateComments(filmID, comments) {
    this.__state[filmID].comments = convertArrayToMapByID(comments);

    this.__callChangeHandlers();
    this.__callFilmCommentsChangeHandlers();
  }

  deleteComment(filmID, commentID) {
    delete this.__state[filmID].comments[commentID];

    this.__callChangeHandlers();
    this.__callFilmCommentsChangeHandlers();
  }

  addFilmCommentsChangeHandler(callback) {
    this._filmCommentsChangeHandlers.add(callback);
  }

  removeFilmCommentsChangeHandler(callback) {
    this._filmCommentsChangeHandlers.delete(callback);
  }

  __callFilmCommentsChangeHandlers() {
    for (let filmCommentsChangeHandler of this._filmCommentsChangeHandlers) {
      filmCommentsChangeHandler();
    }
  }

  addFilmUserDetailsChangeHandler(callback) {
    this._filmUserDetailsChangeHandlers.add(callback);
  }

  removeFilmUserDetailsChangeHandler(callback) {
    this._filmUserDetailsChangeHandlers.delete(callback);
  }

  __callFilmUserDetailsChangeHandlers() {
    for (let filmUserDetailsChangeHandler of this._filmUserDetailsChangeHandlers) {
      filmUserDetailsChangeHandler();
    }
  }
}
