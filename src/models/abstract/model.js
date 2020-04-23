// Constants and utils
import {compose} from '../../utils/common';

class Model {
  constructor() {
    this._state = null;
    this._stateHandlers = new Set();
    this._observers = new Set();

    if (new.target === Model) {
      throw new Error(`Can't instantiate Model, only concrete one.`);
    }
  }

  set state(state) {
    this._state = state;

    this._notifyObservers();
  }

  get state() {
    return this._state;
  }

  get handledState() {
    return compose(...this._stateHandlers)(this._state);
  }

  addStateHandler(stateHandler) {
    this._stateHandlers.add(stateHandler);
  }

  removeStateHandler(stateHandler) {
    this._stateHandlers.delete(stateHandler);
  }

  registerObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  _notifyObservers() {
    this._observers.forEach((observer) => observer.update(this._state));
  }
}

export default Model;
