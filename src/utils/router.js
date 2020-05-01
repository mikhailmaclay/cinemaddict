import {bind} from './components';

const ROOT_PATH_NAME = `/`;

const Router = {
  init() {
    this._addEventListeners();
  },

  push(url, title = ``, state = {}) {
    if (this._lastURL) {
      this._handleLeave(state);
    }

    window.history.pushState(state, title, url);

    if (title) {
      document.title = title;
    }

    this._handleEnter(state);

    this._lastURL = window.location.href;
  },

  replace(url, state = {}) {
    window.history.replaceState(state, ``, url);

    this._handleLeave(state);
    this._handleEnter(state);

    this._lastURL = window.location.href;
  },

  addRoute(regExp, onEnterHandler) {
    this._routes.add({regExp, onEnterHandler});
  },

  _addEventListeners() {
    window.addEventListener(`load`, this._handleWindowLoad);
    window.addEventListener(`popstate`, this._handleWindowPopState);
    document.body.addEventListener(`DOMSubtreeModified`, this._handleBodyDOMSubtreeModified);

    const links = document.querySelectorAll(`a`);

    links.forEach((link) => {
      if (this._links.has(link)) {
        return;
      }

      const {href} = link;

      if (!this.matchOrigin(href)) {
        return;
      }

      link.addEventListener(`click`, this._handleLinkClick);

      this._links.add(link);
    });
  },

  matchURL(regExp) {
    return regExp.test(window.location.href);
  },

  matchOrigin(url) {
    const {origin} = new URL(url);
    const {origin: currentOrigin} = window.location;

    return origin === currentOrigin;
  },

  matchPathName(regExp) {
    return regExp.test(window.location.pathname);
  },

  matchSearch(regExp) {
    return regExp.test(window.location.search);
  },

  _handleEnter(state) {
    let isHandled = false;

    for (let route of this._routes) {
      const {regExp, onEnterHandler} = route;
      const regExpResult = window.location.href.match(regExp);

      if (regExp.test(window.location.pathname)) {
        if (!this._currentRoutes.has(route)) {
          const onLeaveHandler = onEnterHandler(state, regExpResult);

          if (onLeaveHandler) {
            this._currentRoutes.add({regExp, onLeaveHandler});
          }

          isHandled = true;
        }
      }
    }

    if (!isHandled) {
      this._handleNotFound();
    }
  },

  _handleLeave(state) {
    for (let route of this._currentRoutes) {
      const {regExp, onLeaveHandler} = route;
      const {pathname: pathName} = new URL(this._lastURL);
      const regExpResult = pathName.match(regExp);

      if (regExp.test(pathName)) {
        if (onLeaveHandler) {
          /*
            Обработка обещаний.
          */
          // eslint-disable-next-line no-proto
          if (onLeaveHandler.__proto__.constructor.name === `Promise`) {
            onLeaveHandler.then((clearFunction) => clearFunction && clearFunction());
          } else {
            onLeaveHandler(state, regExpResult);
          }
        }

        this._currentRoutes.delete(route);
      }
    }
  },

  _handleNotFound() {
    if (!this.notFoundRoute) {
      this.replace(ROOT_PATH_NAME);
    }

    this.replace(this.notFoundRoute);
  },

  _handleWindowLoad() {
    this._handleEnter();

    this._lastURL = window.location.href;
  },

  _handleWindowPopState(evt) {
    const {state} = evt;

    this._handleLeave(state);
    this._handleEnter(state);

    this._lastURL = window.location.href;
  },

  _handleBodyDOMSubtreeModified() {
    this._addEventListeners();
  },

  _handleLinkClick(evt) {
    const {currentTarget} = evt;
    const {href, title} = currentTarget;

    evt.preventDefault();

    if (this.matchURL(new RegExp(`${href.replace(/\//g, `\\/`).replace(/\?/, `\\?`)}$`))) {
      return;
    }

    this.push(href, title ? title : ``);
  }
};

Router._links = new Set();
Router._routes = new Set();
Router._currentRoutes = new Set();
Router.notFoundRoute = null;
Router._lastURL = null;

bind(Router,
    Router._handleBodyDOMSubtreeModified,
    Router._handleEnter,
    Router._handleLeave,
    Router._handleLinkClick,
    Router._handleNotFound,
    Router._handleWindowLoad,
    Router._handleWindowPopState
);

Router._currentRoutes.has = function (route) {
  for (let currentRoute of this) {
    if (currentRoute.regExp.toString() === route.regExp.toString()) {
      return true;
    }
  }

  return false;
};

export default Router;
