// Constants and utils
import {RenderPosition} from '../../constants/enums';

export default class View {
  constructor() {
    if (new.target === View) {
      throw new Error(`Can't instantiate View, only concrete one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`Abstract getter not implemented: getTemplate`);
  }

  get element() {
    if (!this._element) {
      this.__createElement();
    }

    return this._element;
  }

  render(targetElement, position = RenderPosition.END) {
    switch (position) {
      case RenderPosition.START:
        targetElement.prepend(this.element);

        break;

      case RenderPosition.END:
        targetElement.append(this.element);

        break;

      default:
        return;
    }

    this._selectElements();
    this._addEventListeners();
  }

  remove() {
    this._removeEventListeners();
    this.element.remove();
    this.__removeElement();
  }

  _rerender() {
    if (!this._element) {
      return;
    }

    const oldElement = this._element;
    const parent = oldElement.parentElement;

    this._removeEventListeners();
    this.__removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, oldElement);

    this._selectElements();
    this._addEventListeners();
  }

  _selectElements() {
    return;
  }

  _addEventListeners() {
    return;
  }

  _removeEventListeners() {
    return;
  }

  __createElement() {
    const element = document.createElement(`div`);

    element.innerHTML = this.template;

    this._element = element.firstElementChild;
  }

  __removeElement() {
    this._element = null;
  }
}
