// Constants and utils
import {cloneObject, mergeObjects} from './objects';

export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._key = key;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._key));
    } catch (_) {
      return {};
    }
  }

  getItem(key) {
    try {
      return JSON.parse(this._storage.getItem(this._key))[key];
    } catch (_) {
      return null;
    }
  }

  setItems(items) {
    this._storage.setItem(this._key, JSON.stringify(items));
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._key,
        JSON.stringify(
            mergeObjects(store, {[key]: value})
        )
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._key,
        JSON.stringify(cloneObject(store))
    );
  }
}
