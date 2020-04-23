const ROOT_PATH_NAME = `/`;

class Router {
  static init() {
    Router.addEventListeners();
  }

  static push(url, title = ``, state = {}) {
    if (Router._lastURL) {
      Router.handleLeave(state);
    }

    window.history.pushState(state, title, url);

    if (title) {
      document.title = title;
    }

    Router.handleEnter(state);

    Router._lastURL = window.location.href;
  }

  static replace(url, state = {}) {
    window.history.replaceState(state, ``, url);

    Router.handleLeave(state);
    Router.handleEnter(state);

    Router._lastURL = window.location.href;
  }

  static addRoute(regExp, onEnterHandler) {
    Router._routes.add({regExp, onEnterHandler});
  }

  static addEventListeners() {
    window.addEventListener(`load`, Router.handleWindowLoad);
    window.addEventListener(`popstate`, Router.handleWindowPopState);
    document.body.addEventListener(`DOMSubtreeModified`, Router.handleBodyDOMSubtreeModified);

    const links = document.querySelectorAll(`a`);

    links.forEach((link) => {
      if (Router._links.has(link)) {
        return;
      }

      const {href} = link;

      if (!Router.matchOrigin(href)) {
        return;
      }

      link.addEventListener(`click`, Router.handleLinkClick);

      Router._links.add(link);
    });
  }

  static matchURL(regExp) {
    return regExp.test(window.location.href);
  }

  static matchOrigin(url) {
    const {origin} = new URL(url);
    const {origin: currentOrigin} = window.location;

    return origin === currentOrigin;
  }

  static matchPathName(regExp) {
    return regExp.test(window.location.pathname);
  }

  static matchSearch(regExp) {
    return regExp.test(window.location.search);
  }

  static handleEnter(state) {
    let isHandled = false;

    for (let route of Router._routes) {
      const {regExp, onEnterHandler} = route;
      const regExpResult = window.location.href.match(regExp);

      if (regExp.test(window.location.pathname)) {
        if (!Router._currentRoutes.has(route)) {
          const onLeaveHandler = onEnterHandler(state, regExpResult);

          if (onLeaveHandler) {
            Router._currentRoutes.add({regExp, onLeaveHandler});
          }

          isHandled = true;
        }
      }
    }

    if (!isHandled) {
      Router.handleNotFound();
    }
  }

  static handleLeave(state) {
    for (let route of Router._currentRoutes) {
      const {regExp, onLeaveHandler} = route;
      const {pathname: pathName} = new URL(Router._lastURL);
      const regExpResult = pathName.match(regExp);

      if (regExp.test(pathName)) {
        if (onLeaveHandler) {
          onLeaveHandler(state, regExpResult);
        }

        Router._currentRoutes.delete(route);

        Router._previousURL = window.location.href;
      }
    }
  }

  static handleNotFound() {
    if (!Router.notFoundRoute) {
      Router.replace(ROOT_PATH_NAME);
    }

    Router.replace(Router.notFoundRoute);
  }

  static handleWindowLoad() {
    Router.handleEnter();

    Router._lastURL = window.location.href;
  }

  static handleWindowPopState(evt) {
    const {state} = evt;

    Router.handleLeave(state);
    Router.handleEnter(state);

    Router._lastURL = window.location.href;
  }

  static handleBodyDOMSubtreeModified() {
    Router.addEventListeners();
  }

  static handleLinkClick(evt) {
    const {currentTarget} = evt;
    const {href, title} = currentTarget;

    evt.preventDefault();

    if (Router.matchURL(new RegExp(`${href.replace(/\//g, `\\/`).replace(/\?/, `\\?`)}$`))) {
      return;
    }

    Router.push(href, title ? title : ``);
  }

  constructor() {
    if (new.target) {
      throw new Error(`Can't instantiate Router.`);
    }
  }
}

Router._links = new Set();
Router._routes = new Set();
Router._currentRoutes = new Set();
Router.notFoundRoute = null;
Router._lastURL = null;

Router._currentRoutes.has = function (route) {
  for (let currentRoute of this) {
    if (currentRoute.regExp.toString() === route.regExp.toString()) {
      return true;
    }
  }

  return false;
};

export default Router;
