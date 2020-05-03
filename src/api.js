// Constants and utils
import {HTTPMethod, HTTPResponseStatus} from './constants/enums';
import {Comment, Film} from './utils/adapters';

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  readFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((rawFilms) => rawFilms.map((rawFilm) => new Film(rawFilm)));
  }

  updateFilm(filmID, film) {
    return this._load({
      url: `movies/${filmID}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(film.getRaw()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((rawFilm) => new Film(rawFilm));
  }

  readComments(filmID) {
    return this._load({url: `comments/${filmID}`})
      .then((response) => response.json())
      .then((rawComments) => rawComments.map((rawComment) => new Comment(rawComment)));
  }

  createComment(filmID, comment) {
    return this._load({
      url: `comments/${filmID}`,
      method: HTTPMethod.POST,
      body: JSON.stringify(comment.getRaw()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(({movie: rawFilm}) => new Film(rawFilm));
  }

  deleteComment(commentID) {
    return this._load({
      url: `comments/${commentID}`,
      method: HTTPMethod.DELETE
    });
  }

  _load({url, method = HTTPMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(API.checkStatus)
      .catch((error) => {
        throw error;
      });
  }

  static checkStatus(response) {
    const {status, statusText} = response;

    if (status >= HTTPResponseStatus.OK && status < HTTPResponseStatus.MULTIPLE_CHOICE) {
      return response;
    }

    throw new Error(`${status}: ${statusText}`);
  }
}

