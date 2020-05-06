// Constants and utils
import {Comment, Film} from './adapters';
import {convertArrayToMapByID, mergeObjects} from './objects';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  readFilms() {
    if (window.navigator.onLine) {
      return this._api.readFilms()
        .then((films) => {
          this._store.setItems(convertArrayToMapByID(films.map((film) => film.getRaw())));

          return films;
        });
    }

    const films = Object.values(this._store.getItems()).map((film) => {
      const currentFilm = new Film(film);

      const areCommentsLoaded = !Array.isArray(currentFilm.comments);

      if (areCommentsLoaded) {
        currentFilm.comments = convertArrayToMapByID(Object.values(currentFilm.comments).map((comment) => new Comment(comment)));
      }

      return currentFilm;
    });

    return Promise.resolve(films);
  }

  updateFilm(filmID, film) {
    if (window.navigator.onLine) {
      return this._api.updateFilm(filmID, film)
        .then((newFilm) => {
          this._store.setItem(filmID, newFilm.getRaw());

          return newFilm;
        });
    }

    const oldFilm = this._store.getItem(filmID);
    const newFilm = mergeObjects(oldFilm, film.getRaw());

    this._store.setItem(filmID, newFilm);

    return Promise.resolve(new Film(newFilm));
  }

  createComment(filmID, comment) {
    if (window.navigator.onLine) {
      return this._api.createComment(filmID, comment)
        .then((comments) => {
          const film = this._store.getItem(filmID);

          film.comments = convertArrayToMapByID(comments);
          this._store.setItem(filmID, film);

          return comments;
        });
    }

    const film = this._store.getItem(filmID);

    film.comments[comment.id] = comment;
    this._store.setItem(filmID, film);

    return Promise.resolve(Object.values(film.comments));
  }

  readComments(filmID) {
    if (window.navigator.onLine) {
      return this._api.readComments(filmID)
        .then((comments) => {
          const film = this._store.getItem(filmID);

          this._store.setItem(filmID, mergeObjects(film, {comments: convertArrayToMapByID(comments)}));

          return comments;
        });
    }

    const comments = this._store.getItem(filmID).comments;
    const areCommentsLoaded = !Array.isArray(comments);

    if (!areCommentsLoaded) {
      return Promise.reject();
    }

    return Promise.resolve(Object.values(comments));
  }

  deleteComment(filmID, commentID) {
    if (window.navigator.onLine) {
      return this._api.deleteComment(commentID)
        .then(() => {
          const film = this._store.getItem(filmID);

          delete film.comments[commentID];
          this._store.setItem(filmID, film);
        });
    }

    const film = this._store.getItem(filmID);

    delete film.comments[commentID];
    this._store.setItem(filmID, film);

    return Promise.resolve();
  }

  sync() {
    if (window.navigator.onLine) {
      return this._api.sync(Object.values(this._store.getItems()).map((film) => new Film(film)))
        .then((updatedFilms) => {
          const films = mergeObjects(this._store.getItems(), convertArrayToMapByID(updatedFilms));

          this._store.setItems(films);

          return Object.values(films);
        });
    }

    return Promise.reject();
  }
}
