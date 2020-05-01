// Constants and utils
import {compose} from '../../utils/common';

export default class Model {
  constructor() {
    this.__state = null;
    this._stateHandlers = new Set();
    this._changeHandlers = new Set();

    if (new.target === Model) {
      throw new Error(`Can't instantiate Model, only concrete one.`);
    }
  }

  set state(value) {
    this.__state = value;

    this.__callChangeHandlers();
  }

  get state() {
    return this.__state;
  }

  get handledState() {
    if (!this.__state) {
      return null;
    }

    return compose(...this._stateHandlers)(this.__state);
  }

  addStateHandler(stateHandler) {
    this._stateHandlers.add(stateHandler);
  }

  removeStateHandler(stateHandler) {
    this._stateHandlers.delete(stateHandler);
  }

  addChangeHandler(callback) {
    this._changeHandlers.add(callback);
  }

  removeChangeHandler(callback) {
    this._changeHandlers.delete(callback);
  }

  __callChangeHandlers() {
    for (let changeHandler of this._changeHandlers) {
      changeHandler();
    }
  }
}
